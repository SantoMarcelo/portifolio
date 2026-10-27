import fs from 'fs';
import path from 'path';
import {
  RESERVED_PREFIXES,
  SMALL_SAMPLE,
  ArtilleryAggregate,
  ParsedFile,
  LatencyStats,
  PayloadStats,
  EndpointMetrics,
  HistogramStats,
} from './types';

// ---------------------------------------------------------------------------
// Parsing
// ---------------------------------------------------------------------------

function parseFile(filePath: string): ParsedFile {
  const fileStem = path.basename(filePath).replace(/\.json$/i, '');

  let raw: string;
  try {
    raw = fs.readFileSync(filePath, 'utf-8');
  } catch (err) {
    console.warn(`Warning: unable to read "${filePath}": ${(err as Error).message}`);
    return { filePath, fileStem, malformed: true };
  }

  try {
    const json = JSON.parse(raw);
    const aggregate: ArtilleryAggregate = json?.aggregate ?? {};
    return { filePath, fileStem, malformed: false, aggregate };
  } catch (err) {
    console.warn(`Warning: malformed JSON in "${filePath}": ${(err as Error).message}`);
    return { filePath, fileStem, malformed: true };
  }
}

/**
 * Detects custom metric prefixes in a set of counters by finding keys
 * ending in `.success` or `.error`, stripping the suffix, and ignoring
 * reserved/built-in Artillery namespaces.
 */
function detectPrefixes(counters: Record<string, number>): string[] {
  const prefixes = new Set<string>();

  for (const key of Object.keys(counters)) {
    let prefix: string | null = null;
    if (key.endsWith('.success')) {
      prefix = key.slice(0, -'.success'.length);
    } else if (key.endsWith('.error')) {
      prefix = key.slice(0, -'.error'.length);
    }

    if (!prefix) {
      continue;
    }

    const isReserved = RESERVED_PREFIXES.some((reserved) => `${prefix}.`.startsWith(reserved));
    if (isReserved) {
      continue;
    }

    prefixes.add(prefix);
  }

  return Array.from(prefixes);
}

function safeDivide(numerator: number, denominator: number): number | null {
  if (!Number.isFinite(numerator) || !Number.isFinite(denominator) || denominator <= 0) {
    return null;
  }
  const result = numerator / denominator;
  return Number.isFinite(result) ? result : null;
}

function buildLatencyStats(histograms: Record<string, HistogramStats>, prefix: string): LatencyStats {
  const hist = histograms[`${prefix}.latency_ms`];
  if (!hist) {
    return { min: null, mean: null, p50: null, p90: null, p95: null, p99: null, max: null, count: null };
  }

  return {
    min: Number.isFinite(hist.min) ? hist.min : null,
    mean: Number.isFinite(hist.mean) ? hist.mean : null,
    p50: Number.isFinite(hist.p50) ? hist.p50 : null,
    p90: Number.isFinite(hist.p90) ? hist.p90 : null,
    p95: Number.isFinite(hist.p95) ? hist.p95 : null,
    p99: Number.isFinite(hist.p99) ? hist.p99 : null,
    max: Number.isFinite(hist.max) ? hist.max : null,
    count: Number.isFinite(hist.count) ? hist.count : null,
  };
}

/**
 * Reads the server-side p95 from Artillery's built-in `http.response_time`
 * histogram, for comparison against the end-to-end `<prefix>.latency_ms` p95.
 */
function buildServerP95(histograms: Record<string, HistogramStats>): number | null {
  const hist = histograms['http.response_time'];
  if (!hist || !Number.isFinite(hist.p95)) {
    return null;
  }
  return hist.p95;
}

function buildPayloadStats(histograms: Record<string, HistogramStats>, prefix: string): PayloadStats {
  const hist = histograms[`${prefix}.response_size_bytes`];
  if (!hist) {
    return { mean: null, max: null };
  }

  return {
    mean: Number.isFinite(hist.mean) ? hist.mean : null,
    max: Number.isFinite(hist.max) ? hist.max : null,
  };
}

function buildErrorsByStatus(counters: Record<string, number>, prefix: string): Record<string, number> {
  const byStatus: Record<string, number> = {};
  const errorPrefix = `${prefix}.error.`;

  for (const [key, value] of Object.entries(counters)) {
    if (key.startsWith(errorPrefix)) {
      const status = key.slice(errorPrefix.length);
      byStatus[status] = value;
    }
  }

  return byStatus;
}

/**
 * Reads Artillery's built-in `http.codes.<status>` counters into a
 * status → count map, independent of the custom success/error prefix.
 */
function buildHttpCodes(counters: Record<string, number>): Record<string, number> {
  const codes: Record<string, number> = {};
  const codePrefix = 'http.codes.';

  for (const [key, value] of Object.entries(counters)) {
    if (key.startsWith(codePrefix)) {
      const status = key.slice(codePrefix.length);
      codes[status] = value;
    }
  }

  return codes;
}

/**
 * Reads Artillery's built-in network/socket error counters (e.g.
 * `errors.ETIMEDOUT`, `errors.ECONNRESET`, `errors.ECONNREFUSED`,
 * `errors.ENOTFOUND`) into a name → count map, stripping the `errors.`
 * prefix. Distinct from `<prefix>.error.<status>` (app-level errors) and
 * `http.codes.*` (HTTP status codes) — these represent transport/socket
 * failures where no HTTP response was ever received.
 */
function buildErrorsNetwork(counters: Record<string, number>): Record<string, number> {
  const network: Record<string, number> = {};
  const networkPrefix = 'errors.';

  for (const [key, value] of Object.entries(counters)) {
    if (key.startsWith(networkPrefix)) {
      const name = key.slice(networkPrefix.length);
      network[name] = value;
    }
  }

  return network;
}

function buildEndpointMetrics(file: ParsedFile, prefix: string, multiplePrefixesInFile: boolean): EndpointMetrics {
  const aggregate = file.aggregate ?? {};
  const counters = aggregate.counters ?? {};
  const histograms = aggregate.histograms ?? {};

  const success = counters[`${prefix}.success`] ?? 0;
  const error = counters[`${prefix}.error`] ?? 0;
  let totalRequests = success + error;

  if (totalRequests === 0 && typeof counters['http.requests'] === 'number') {
    totalRequests = counters['http.requests'];
  }

  const errorRatePct = safeDivide(error * 100, totalRequests);

  const firstMetricAt = aggregate.firstMetricAt;
  const lastMetricAt = aggregate.lastMetricAt;
  let throughputRps: number | null = null;
  if (typeof firstMetricAt === 'number' && typeof lastMetricAt === 'number') {
    const durationSec = (lastMetricAt - firstMetricAt) / 1000;
    throughputRps = durationSec > 0 ? safeDivide(totalRequests, durationSec) : null;
  }

  const label = multiplePrefixesInFile ? `${file.fileStem} / ${prefix}` : file.fileStem;

  // http.codes.* and http.response_time are FILE-LEVEL Artillery metrics (aggregated across every
  // request in the run, not per custom prefix). For a result file with multiple custom prefixes,
  // attributing them to each prefix would misreport, so we only populate them for single-prefix files.
  return {
    label,
    fileStem: file.fileStem,
    prefix,
    malformed: false,
    totalRequests,
    success,
    error,
    errorsByStatus: buildErrorsByStatus(counters, prefix),
    httpCodes: multiplePrefixesInFile ? {} : buildHttpCodes(counters),
    errorsNetwork: multiplePrefixesInFile ? {} : buildErrorsNetwork(counters),
    errorRatePct,
    throughputRps,
    latency: buildLatencyStats(histograms, prefix),
    serverP95: multiplePrefixesInFile ? null : buildServerP95(histograms),
    payload: buildPayloadStats(histograms, prefix),
    vusersCompleted: typeof counters['vusers.completed'] === 'number' ? counters['vusers.completed'] : null,
    vusersCreated: typeof counters['vusers.created'] === 'number' ? counters['vusers.created'] : null,
    vusersFailed: typeof counters['vusers.failed'] === 'number' ? counters['vusers.failed'] : null,
  };
}

function buildMalformedEndpoint(file: ParsedFile): EndpointMetrics {
  return {
    label: file.fileStem,
    fileStem: file.fileStem,
    prefix: '',
    malformed: true,
    totalRequests: 0,
    success: 0,
    error: 0,
    errorsByStatus: {},
    httpCodes: {},
    errorsNetwork: {},
    errorRatePct: null,
    throughputRps: null,
    latency: { min: null, mean: null, p50: null, p90: null, p95: null, p99: null, max: null, count: null },
    serverP95: null,
    payload: { mean: null, max: null },
    vusersCompleted: null,
    vusersCreated: null,
    vusersFailed: null,
  };
}

/**
 * Builds a DEGRADED (non-malformed) endpoint row for a file that parsed fine
 * but has no custom `<prefix>.success`/`.error` counters — e.g. a total
 * auth-failure (only `vusers.*` + `errors.*`) or a run with only built-in
 * `http.*` metrics. Unlike `buildMalformedEndpoint`, this preserves whatever
 * file-level diagnostic data is available (VUs, http codes, network errors,
 * server p95) instead of discarding it as "malformed".
 */
function buildDegradedEndpoint(file: ParsedFile): EndpointMetrics {
  const aggregate = file.aggregate ?? {};
  const counters = aggregate.counters ?? {};
  const histograms = aggregate.histograms ?? {};

  const totalRequests = typeof counters['http.requests'] === 'number' ? counters['http.requests'] : 0;

  const firstMetricAt = aggregate.firstMetricAt;
  const lastMetricAt = aggregate.lastMetricAt;
  let throughputRps: number | null = null;
  if (totalRequests > 0 && typeof firstMetricAt === 'number' && typeof lastMetricAt === 'number') {
    const durationSec = (lastMetricAt - firstMetricAt) / 1000;
    throughputRps = durationSec > 0 ? safeDivide(totalRequests, durationSec) : null;
  }

  return {
    label: file.fileStem,
    fileStem: file.fileStem,
    prefix: '',
    malformed: false,
    totalRequests,
    success: 0,
    error: 0,
    errorsByStatus: {},
    httpCodes: buildHttpCodes(counters),
    errorsNetwork: buildErrorsNetwork(counters),
    errorRatePct: null,
    throughputRps,
    latency: { min: null, mean: null, p50: null, p90: null, p95: null, p99: null, max: null, count: null },
    serverP95: buildServerP95(histograms),
    payload: { mean: null, max: null },
    vusersCompleted: typeof counters['vusers.completed'] === 'number' ? counters['vusers.completed'] : null,
    vusersCreated: typeof counters['vusers.created'] === 'number' ? counters['vusers.created'] : null,
    vusersFailed: typeof counters['vusers.failed'] === 'number' ? counters['vusers.failed'] : null,
  };
}

/**
 * Sample size (n) for an endpoint's latency percentiles: the histogram's own
 * `count`, falling back to `totalRequests` when no latency histogram exists
 * (e.g. every request errored before a response was timed).
 *
 * Returns `null` when the endpoint has no latency signal at all
 * (`latency.p95` and `latency.count` both null) — this is the case for
 * degraded rows (parsed-but-no-custom-prefix files), where there is no
 * `<prefix>.latency_ms` histogram to speak of, so "sample size" is a
 * meaningless concept rather than a small one.
 */
function getSampleSize(endpoint: EndpointMetrics): number | null {
  if (endpoint.latency.p95 === null && endpoint.latency.count === null) {
    return null;
  }
  if (endpoint.latency.count !== null) {
    return endpoint.latency.count;
  }
  return endpoint.totalRequests > 0 ? endpoint.totalRequests : null;
}

/**
 * True when an endpoint's latency percentiles are based on fewer than
 * `SMALL_SAMPLE` requests (and thus not statistically reliable). Single
 * `getSampleSize` call, reused everywhere this predicate is needed.
 */
function isSmallSample(e: EndpointMetrics): boolean {
  const n = getSampleSize(e);
  return n !== null && n < SMALL_SAMPLE;
}

/**
 * True when an endpoint is "broken" — either zero successful requests despite
 * having traffic, or auth likely failed (VUs were created but none
 * completed). Single source of truth for both the "Broken:" insights and the
 * derived broken-count stats, so the two can never desync.
 */
function isBrokenEndpoint(e: EndpointMetrics): boolean {
  const zeroSuccessWithTraffic = e.success === 0 && e.totalRequests > 0;
  const authLikelyFailed = e.vusersCompleted === 0 && e.vusersCreated !== null && e.vusersCreated > 0;
  return zeroSuccessWithTraffic || authLikelyFailed;
}

/**
 * Picks the network error name with the highest count, for a short
 * "errors: NAME×count" suffix on the auth-fail insight.
 */
function getDominantNetworkError(errorsNetwork: Record<string, number>): { name: string; count: number } | null {
  const entries = Object.entries(errorsNetwork);
  if (entries.length === 0) {
    return null;
  }
  const [name, count] = entries.reduce((a, b) => (b[1] > a[1] ? b : a));
  return { name, count };
}

export {
  parseFile,
  detectPrefixes,
  safeDivide,
  buildLatencyStats,
  buildServerP95,
  buildPayloadStats,
  buildErrorsByStatus,
  buildHttpCodes,
  buildErrorsNetwork,
  buildEndpointMetrics,
  buildMalformedEndpoint,
  buildDegradedEndpoint,
  getSampleSize,
  isSmallSample,
  isBrokenEndpoint,
  getDominantNetworkError,
};
