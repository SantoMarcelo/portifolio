// npx ts-node src/load-tests/shared/report.ts [inputDir=reports/load] [--out reports/load-test-report.html]
//
// Aggregates one or more Artillery `-o` JSON result files into a single
// self-contained HTML report (CSS bar charts + comparative insights).
import fs from 'fs';
import path from 'path';
import {
  parseFile,
  detectPrefixes,
  buildEndpointMetrics,
  buildMalformedEndpoint,
  buildDegradedEndpoint,
  isBrokenEndpoint,
} from './report/parsing';
import { buildInsights } from './report/insights';
import { buildOverview } from './report/overview';
import { renderHtml } from './report/render';
import { formatMs } from './report/formatting';
import { EndpointMetrics } from './report/types';

// ---------------------------------------------------------------------------
// CLI argument parsing
// ---------------------------------------------------------------------------

function parseArgs(argv: string[]): { inputs: string[]; out: string } {
  const inputs: string[] = [];
  let out = 'reports/load-test-report.html';

  for (let i = 0; i < argv.length; i++) {
    const arg = argv[i];
    if (arg === '--out') {
      const next = argv[i + 1];
      if (next) {
        out = next;
        i++;
      }
    } else if (arg.startsWith('--out=')) {
      out = arg.slice('--out='.length);
    } else {
      inputs.push(arg);
    }
  }

  if (inputs.length === 0) {
    inputs.push('reports/load');
  }

  return { inputs, out };
}

/**
 * Resolves the CLI input paths into a flat list of `.json` file paths.
 * A directory is scanned (non-recursively) for `*.json`; a file path is
 * included as-is if it ends with `.json`.
 */
function resolveJsonFiles(inputs: string[]): string[] {
  const resolved: string[] = [];

  for (const input of inputs) {
    if (!fs.existsSync(input)) {
      continue;
    }

    const stat = fs.statSync(input);

    if (stat.isDirectory()) {
      const entries = fs.readdirSync(input);
      for (const entry of entries) {
        if (entry.toLowerCase().endsWith('.json')) {
          resolved.push(path.join(input, entry));
        }
      }
    } else if (stat.isFile() && input.toLowerCase().endsWith('.json')) {
      resolved.push(input);
    }
  }

  return resolved;
}

// ---------------------------------------------------------------------------
// Main
// ---------------------------------------------------------------------------

async function main() {
  const { inputs, out } = parseArgs(process.argv.slice(2));
  const jsonFiles = resolveJsonFiles(inputs);

  if (jsonFiles.length === 0) {
    console.error(
      `No .json files found from input(s): ${inputs.join(', ')}. Provide a directory of Artillery -o outputs or explicit file paths.`
    );
    process.exit(1);
    return;
  }

  const parsedFiles = jsonFiles.map(parseFile);
  const endpoints: EndpointMetrics[] = [];

  for (const file of parsedFiles) {
    if (file.malformed) {
      endpoints.push(buildMalformedEndpoint(file));
      continue;
    }

    const counters = file.aggregate?.counters ?? {};
    const prefixes = detectPrefixes(counters);

    if (prefixes.length === 0) {
      endpoints.push(buildDegradedEndpoint(file));
      continue;
    }

    const multiplePrefixesInFile = prefixes.length > 1;
    for (const prefix of prefixes) {
      endpoints.push(buildEndpointMetrics(file, prefix, multiplePrefixesInFile));
    }
  }

  const insights = buildInsights(endpoints);
  const overview = buildOverview(parsedFiles, endpoints);
  const html = renderHtml(endpoints, insights, overview);

  const outDir = path.dirname(out);
  fs.mkdirSync(outDir, { recursive: true });
  fs.writeFileSync(out, html, 'utf-8');

  const absoluteOut = path.resolve(out);
  console.log(`Load test report written to: ${absoluteOut}`);

  const validEndpoints = endpoints.filter((e) => !e.malformed);
  const withP95 = validEndpoints.filter((e) => e.latency.p95 !== null);
  const brokenCount = validEndpoints.filter(isBrokenEndpoint).length;

  if (brokenCount > 0) {
    console.log(`Headline: ${brokenCount} endpoint(s) appear broken — see insights in the report.`);
  } else if (withP95.length > 0) {
    const slowest = withP95.reduce((a, b) => (b.latency.p95! > a.latency.p95! ? b : a));
    console.log(`Headline: slowest endpoint is "${slowest.label}" at p95 ${formatMs(slowest.latency.p95)}.`);
  } else {
    console.log('Headline: no latency data available across the aggregated endpoints.');
  }
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
