import { EndpointMetrics, Insight, Overview, ScoreboardEntry, Severity, SMALL_SAMPLE } from './types';
import {
  formatMs,
  formatPct,
  formatRps,
  formatBytes,
  formatNumber,
  escapeHtml,
  formatCountMap,
  sortableCell,
} from './formatting';
import { getSampleSize, isSmallSample } from './parsing';
import { REPORT_CSS, SORT_SCRIPT } from './html-assets';

// ---------------------------------------------------------------------------
// HTML rendering
// ---------------------------------------------------------------------------

function renderBarChart(
  title: string,
  entries: { label: string; value: number }[],
  formatValue: (value: number) => string
): string {
  if (entries.length === 0) {
    return '';
  }

  const max = Math.max(...entries.map((e) => e.value));
  const rows = entries
    .map((entry) => {
      const pct = max > 0 ? Math.min(100, (entry.value / max) * 100) : 0;
      const safePct = Number.isFinite(pct) ? pct : 0;
      const barAriaLabel = `${entry.label}: ${formatValue(entry.value)}`;
      return `
        <div class="bar-row" role="img" aria-label="${escapeHtml(barAriaLabel)}">
          <div class="bar-label">${escapeHtml(entry.label)}</div>
          <div class="bar-track">
            <div class="bar-fill" style="width: ${safePct.toFixed(2)}%"></div>
          </div>
          <div class="bar-value">${escapeHtml(formatValue(entry.value))}</div>
        </div>`;
    })
    .join('\n');

  return `
    <section class="chart">
      <h3>${escapeHtml(title)}</h3>
      <div class="bar-chart" role="group" aria-label="${escapeHtml(title)} by endpoint">
        ${rows}
      </div>
    </section>`;
}

function renderStatCard(label: string, value: string, severity: Severity = 'info'): string {
  return `
    <div class="stat-card stat-${escapeHtml(severity)}">
      <div class="stat-label">${escapeHtml(label)}</div>
      <div class="stat-value">${escapeHtml(value)}</div>
    </div>`;
}

function renderOverview(overview: Overview): string {
  const cards: string[] = [];

  cards.push(renderStatCard('Source Files', formatNumber(overview.sourceFileCount)));
  cards.push(renderStatCard('Endpoints', formatNumber(overview.endpointCount)));
  cards.push(renderStatCard('Total Requests', formatNumber(overview.totalRequests)));
  cards.push(renderStatCard('Total Success', formatNumber(overview.totalSuccess), 'good'));
  cards.push(
    renderStatCard('Total Errors', formatNumber(overview.totalError), overview.totalError > 0 ? 'critical' : 'good')
  );
  cards.push(
    renderStatCard(
      'Overall Error Rate',
      formatPct(overview.errorRatePct),
      overview.errorRatePct !== null && overview.errorRatePct > 0 ? 'warn' : 'good'
    )
  );
  cards.push(
    renderStatCard(
      'Broken / Auth-Failed Endpoints',
      formatNumber(overview.brokenCount),
      overview.brokenCount > 0 ? 'critical' : 'good'
    )
  );
  cards.push(
    renderStatCard(
      'Approx. Data Downloaded',
      overview.approxTotalDownloadBytes === null ? 'n/a' : `≈ ${formatBytes(overview.approxTotalDownloadBytes)}`
    )
  );

  if (
    overview.totalVusersCreated !== null ||
    overview.totalVusersCompleted !== null ||
    overview.totalVusersFailed !== null
  ) {
    const created = formatNumber(overview.totalVusersCreated);
    const completed = formatNumber(overview.totalVusersCompleted);
    const failed = formatNumber(overview.totalVusersFailed);
    cards.push(
      renderStatCard(
        'Virtual Users (created / completed / failed)',
        `${created} / ${completed} / ${failed}`,
        overview.totalVusersFailed !== null && overview.totalVusersFailed > 0 ? 'critical' : 'good'
      )
    );
  }

  if (overview.smallSampleCount > 0) {
    cards.push(
      renderStatCard(
        'Small-sample endpoints (<' + SMALL_SAMPLE + ' reqs)',
        formatNumber(overview.smallSampleCount),
        'info'
      )
    );
  }

  const scoreboardConfig: { label: string; entry: ScoreboardEntry | null; formatValue: (value: number) => string }[] = [
    { label: 'Fastest', entry: overview.fastest, formatValue: (v) => `p95 ${formatMs(v)}` },
    { label: 'Slowest', entry: overview.slowest, formatValue: (v) => `p95 ${formatMs(v)}` },
    { label: 'Most reliable', entry: overview.mostReliable, formatValue: (v) => `${formatPct(v)} errors` },
    { label: 'Least reliable', entry: overview.leastReliable, formatValue: (v) => `${formatPct(v)} errors` },
  ];

  const scoreboardItems: string[] = [];
  if (overview.showScoreboard) {
    for (const { label, entry, formatValue } of scoreboardConfig) {
      if (entry) {
        scoreboardItems.push(
          `<li><strong>${label}:</strong> ${escapeHtml(entry.label)} (${formatValue(entry.value)})</li>`
        );
      }
    }
  }

  const scoreboard =
    scoreboardItems.length > 0
      ? `
      <div class="scoreboard">
        <h3>Scoreboard</h3>
        <ul>
          ${scoreboardItems.join('\n')}
        </ul>
      </div>`
      : '';

  return `
    <section class="overview">
      <h2>Overview</h2>
      <div class="stat-grid">
        ${cards.join('\n')}
      </div>
      ${scoreboard}
    </section>`;
}

/**
 * Icon/text token shown alongside each severity's color, so meaning is never
 * conveyed by color alone (accessibility for color-blind / grayscale
 * viewing).
 */
const SEVERITY_ICON: Record<Severity, string> = {
  critical: '\u{1F534}', // red circle
  warn: '⚠️', // warning sign
  info: 'ℹ️', // information source
  good: '✅', // check mark
};

function renderInsights(insights: Insight[]): string {
  const items = insights
    .map(
      (insight) =>
        `<li class="insight insight-${escapeHtml(insight.severity)}"><span aria-hidden="true">${SEVERITY_ICON[insight.severity]}</span> ${escapeHtml(insight.message)}</li>`
    )
    .join('\n');

  return `
    <section class="insights">
      <h2>Insights</h2>
      <ul>
        ${items}
      </ul>
      ${renderSeverityKey()}
    </section>`;
}

/**
 * Small legend mapping each insight severity class to its meaning + color,
 * reusing the existing `.insight-*` classes so the swatches match the cards.
 * Also carries the icon/text token used in the insight list, so the key
 * documents both encodings (color + icon).
 */
function renderSeverityKey(): string {
  const entries: { severity: Severity; meaning: string }[] = [
    { severity: 'critical', meaning: 'Critical — must fix' },
    { severity: 'warn', meaning: 'Warn — worth attention' },
    { severity: 'info', meaning: 'Info — context' },
    { severity: 'good', meaning: 'Good — healthy' },
  ];

  const items = entries
    .map(
      (entry) =>
        `<li class="severity-key-item"><span class="severity-swatch insight-${escapeHtml(entry.severity)}"></span><span aria-hidden="true">${SEVERITY_ICON[entry.severity]}</span> ${escapeHtml(entry.meaning)}</li>`
    )
    .join('\n');

  return `
    <ul class="severity-key">
      ${items}
    </ul>`;
}

/**
 * Static, authored glossary explaining every per-endpoint metric. Rendered as
 * a collapsed `<details>` block right below the per-endpoint table so the
 * report is self-explanatory without needing to read the source code.
 */
function renderGlossary(): string {
  const entries: { term: string; definition: string }[] = [
    {
      term: 'Total',
      definition:
        'Total requests attempted for the endpoint (success + error; falls back to Artillery’s http.requests when custom counters are absent).',
    },
    {
      term: 'Success',
      definition: 'Requests that completed successfully (custom <prefix>.success counter; HTTP 200).',
    },
    {
      term: 'Error',
      definition: 'Requests that failed (custom <prefix>.error counter).',
    },
    {
      term: 'Requests measured',
      definition: `How many requests had their response time measured — the latency percentiles (p50–p99) are calculated from these (the latency histogram's own count; falls back to Total when no histogram exists). Below ${SMALL_SAMPLE}, percentiles are not statistically reliable — treat the run as a smoke test rather than a load test.`,
    },
    {
      term: 'Errors by Status',
      definition: 'Failed requests grouped by HTTP status (or “unknown”), from the scenario’s own error handler.',
    },
    {
      term: 'HTTP Codes',
      definition:
        'Artillery’s built-in response count per HTTP status code (http.codes.*). Shown only when the result file contains a single scenario/prefix.',
    },
    {
      term: 'Network Errors',
      definition:
        'Transport/socket failures where no HTTP response was ever received (e.g. errors.ETIMEDOUT, errors.ECONNRESET, errors.ECONNREFUSED, errors.ENOTFOUND). Distinct from HTTP status codes and app-level errors.',
    },
    {
      term: 'Error Rate',
      definition: 'Error ÷ Total, as a percentage.',
    },
    {
      term: 'Throughput',
      definition: 'Requests per second = Total ÷ run duration (derived from Artillery’s first/last metric timestamps).',
    },
    {
      term: 'Latency (Min / Mean / p50 / p90 / p95 / p99 / Max)',
      definition:
        'End-to-end request time, measured client-side in the scenario (includes network + server). e.g. p95 = 95% of requests were at or below this value. Shown de-emphasized (thin/italic) when n < ' +
        SMALL_SAMPLE +
        '.',
    },
    {
      term: 'Server p95',
      definition:
        'Server-side response time p95 from Artillery’s http.response_time (time to first byte), for comparison with the end-to-end p95. Single-scenario files only.',
    },
    {
      term: 'Payload (mean / max)',
      definition: 'Size of the downloaded response body, scaled to the most readable unit (B/KB/MB/GB).',
    },
    {
      term: 'n/a',
      definition:
        'The metric is not available for that endpoint (e.g. no successful requests → no latency histogram; a non-download endpoint → no payload).',
    },
  ];

  const rows = entries
    .map((entry) => `<tr><th scope="row">${escapeHtml(entry.term)}</th><td>${escapeHtml(entry.definition)}</td></tr>`)
    .join('\n');

  return `
    <details class="glossary">
      <summary>&#8505;&#65039; What do these metrics mean?</summary>
      <div class="table-wrap">
        <table class="glossary-table">
          <tbody>
            ${rows}
          </tbody>
        </table>
      </div>
    </details>`;
}

/**
 * One-line versions of the glossary definitions, used as `title` tooltips on
 * the per-endpoint table's `<th>` headers. Must stay consistent with
 * `renderGlossary`'s definitions.
 */
const COLUMN_TOOLTIPS: Record<string, string> = {
  label: 'Endpoint (source file / custom metric prefix) this row summarizes.',
  total: 'Total requests attempted (success + error; falls back to Artillery’s http.requests).',
  success: 'Requests that completed successfully (custom <prefix>.success counter; HTTP 200).',
  error: 'Requests that failed (custom <prefix>.error counter).',
  n: `How many requests had their latency measured — the basis for the percentiles (p50–p99). Below ${SMALL_SAMPLE}, percentiles are unreliable (smoke test, not load test).`,
  errorsByStatus: 'Failed requests grouped by HTTP status (or “unknown”), from the scenario’s error handler.',
  httpCodes: 'Artillery’s built-in response count per HTTP status code (single-scenario files only).',
  errorsNetwork:
    'Transport/socket failures with no HTTP response (e.g. ETIMEDOUT, ECONNRESET). Single-scenario files only.',
  errorRate: 'Error ÷ Total, as a percentage.',
  throughput: 'Requests per second = Total ÷ run duration.',
  min: 'Minimum end-to-end request latency (client-side).',
  mean: 'Mean end-to-end request latency (client-side).',
  p50: '50th percentile end-to-end latency (client-side).',
  p90: '90th percentile end-to-end latency (client-side).',
  p95: '95th percentile end-to-end latency (client-side).',
  serverP95: 'Server-side p95 (time to first byte) from Artillery’s http.response_time. Single-scenario files only.',
  p99: '99th percentile end-to-end latency (client-side).',
  max: 'Maximum end-to-end request latency (client-side).',
  payloadMean: 'Mean size of the downloaded response body.',
  payloadMax: 'Max size of the downloaded response body.',
  vusers:
    'Virtual users created / completed / failed for this file (Artillery vusers.* counters). Single-scenario files only.',
};

function renderTable(endpoints: EndpointMetrics[]): string {
  const columns = [
    { key: 'label', label: 'Endpoint', type: 'text' },
    { key: 'total', label: 'Total', type: 'num' },
    { key: 'success', label: 'Success', type: 'num' },
    { key: 'error', label: 'Error', type: 'num' },
    { key: 'n', label: 'Requests measured', type: 'num' },
    { key: 'errorsByStatus', label: 'Errors by Status', type: 'text' },
    { key: 'httpCodes', label: 'HTTP Codes', type: 'text' },
    { key: 'errorsNetwork', label: 'Network Errors', type: 'text' },
    { key: 'vusers', label: 'VUs (created/completed/failed)', type: 'text' },
    { key: 'errorRate', label: 'Error Rate', type: 'num' },
    { key: 'throughput', label: 'Throughput', type: 'num' },
    { key: 'min', label: 'Min', type: 'num' },
    { key: 'mean', label: 'Mean', type: 'num' },
    { key: 'p50', label: 'p50', type: 'num' },
    { key: 'p90', label: 'p90', type: 'num' },
    { key: 'p95', label: 'p95', type: 'num' },
    { key: 'serverP95', label: 'Server p95', type: 'num' },
    { key: 'p99', label: 'p99', type: 'num' },
    { key: 'max', label: 'Max', type: 'num' },
    { key: 'payloadMean', label: 'Payload (mean)', type: 'num' },
    { key: 'payloadMax', label: 'Payload (max)', type: 'num' },
  ] as const;

  const rows = endpoints
    .map((endpoint) => {
      if (endpoint.malformed) {
        return `
          <tr class="malformed">
            <td>${escapeHtml(endpoint.label)}</td>
            <td colspan="${columns.length - 1}">malformed source file — skipped</td>
          </tr>`;
      }

      const errorsByStatus = formatCountMap(endpoint.errorsByStatus);
      const httpCodes = formatCountMap(endpoint.httpCodes);
      const errorsNetwork = formatCountMap(endpoint.errorsNetwork);

      const vusers = `${formatNumber(endpoint.vusersCreated)} / ${formatNumber(endpoint.vusersCompleted)} / ${formatNumber(
        endpoint.vusersFailed
      )}`;

      const sampleSize = getSampleSize(endpoint);
      const smallSample = isSmallSample(endpoint);
      const thinClass = smallSample ? 'thin' : '';
      const nCellContent = smallSample
        ? `${escapeHtml(formatNumber(sampleSize))} <span class="small-sample-badge" title="Fewer than ${SMALL_SAMPLE} requests measured — percentiles are not statistically reliable">⚠️ small sample — only ${escapeHtml(
            formatNumber(sampleSize)
          )} requests measured; percentiles unreliable</span>`
        : escapeHtml(formatNumber(sampleSize));
      const nSortValue = sampleSize === null ? -1 : sampleSize;

      return `
        <tr>
          <td>${escapeHtml(endpoint.label)}</td>
          ${sortableCell(endpoint.totalRequests, formatNumber(endpoint.totalRequests))}
          ${sortableCell(endpoint.success, formatNumber(endpoint.success))}
          ${sortableCell(endpoint.error, formatNumber(endpoint.error))}
          <td class="num" data-sort="${nSortValue}">${nCellContent}</td>
          <td>${errorsByStatus || 'n/a'}</td>
          <td>${httpCodes || 'n/a'}</td>
          <td>${errorsNetwork || 'n/a'}</td>
          <td>${escapeHtml(vusers)}</td>
          ${sortableCell(endpoint.errorRatePct, formatPct(endpoint.errorRatePct))}
          ${sortableCell(endpoint.throughputRps, formatRps(endpoint.throughputRps))}
          ${sortableCell(endpoint.latency.min, formatMs(endpoint.latency.min), thinClass)}
          ${sortableCell(endpoint.latency.mean, formatMs(endpoint.latency.mean), thinClass)}
          ${sortableCell(endpoint.latency.p50, formatMs(endpoint.latency.p50), thinClass)}
          ${sortableCell(endpoint.latency.p90, formatMs(endpoint.latency.p90), thinClass)}
          ${sortableCell(endpoint.latency.p95, formatMs(endpoint.latency.p95), thinClass)}
          ${sortableCell(endpoint.serverP95, formatMs(endpoint.serverP95))}
          ${sortableCell(endpoint.latency.p99, formatMs(endpoint.latency.p99), thinClass)}
          ${sortableCell(endpoint.latency.max, formatMs(endpoint.latency.max), thinClass)}
          ${sortableCell(endpoint.payload.mean, formatBytes(endpoint.payload.mean))}
          ${sortableCell(endpoint.payload.max, formatBytes(endpoint.payload.max))}
        </tr>`;
    })
    .join('\n');

  const headerCells = columns
    .map((col, idx) => {
      const tooltip = COLUMN_TOOLTIPS[col.key] ?? '';
      const titleAttr = tooltip ? ` title="${escapeHtml(tooltip)}"` : '';
      return `<th data-col="${idx}" data-type="${col.type}"${titleAttr}>${escapeHtml(col.label)}</th>`;
    })
    .join('\n');

  return `
    <section class="summary">
      <h2>Per-Endpoint Summary</h2>
      <p class="hint">Click a column header to sort. Hover a header for its definition.</p>
      <div class="table-wrap">
        <table id="endpoint-table">
          <thead>
            <tr>
              ${headerCells}
            </tr>
          </thead>
          <tbody>
            ${rows}
          </tbody>
        </table>
      </div>
      ${renderGlossary()}
    </section>`;
}

function renderHtml(endpoints: EndpointMetrics[], insights: Insight[], overview: Overview): string {
  const validEndpoints = endpoints.filter((e) => !e.malformed);

  const p95Chart = renderBarChart(
    'p95 Latency',
    validEndpoints.filter((e) => e.latency.p95 !== null).map((e) => ({ label: e.label, value: e.latency.p95! })),
    (v) => formatMs(v)
  );

  const throughputChart = renderBarChart(
    'Throughput',
    validEndpoints.filter((e) => e.throughputRps !== null).map((e) => ({ label: e.label, value: e.throughputRps! })),
    (v) => formatRps(v)
  );

  const errorRateChart = renderBarChart(
    'Error Rate',
    validEndpoints.filter((e) => e.errorRatePct !== null).map((e) => ({ label: e.label, value: e.errorRatePct! })),
    (v) => formatPct(v)
  );

  const payloadChart = renderBarChart(
    'Payload Size (mean)',
    validEndpoints.filter((e) => e.payload.mean !== null).map((e) => ({ label: e.label, value: e.payload.mean! })),
    (v) => formatBytes(v)
  );

  const charts = [p95Chart, throughputChart, errorRateChart, payloadChart].filter(Boolean).join('\n');

  return `<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<title>Load Test Report</title>
<style>${REPORT_CSS}
</style>
</head>
<body>
  <header>
    <h1>Load Test Report</h1>
    <p>Generated: ${escapeHtml(overview.generatedAt)}</p>
    ${
      overview.runWindowStart !== null && overview.runWindowEnd !== null
        ? `<p>Run window: ${escapeHtml(overview.runWindowStart)} &rarr; ${escapeHtml(overview.runWindowEnd)}</p>`
        : ''
    }
    <p>Source files: ${formatNumber(overview.sourceFileCount)} — Endpoints: ${formatNumber(overview.endpointCount)}</p>
    <p>Aggregate totals — Requests: ${formatNumber(overview.totalRequests)}, Success: ${formatNumber(
      overview.totalSuccess
    )}, Errors: ${formatNumber(overview.totalError)}</p>
  </header>
  ${renderOverview(overview)}
  ${renderInsights(insights)}
  ${renderTable(endpoints)}
  ${charts}
  <script>${SORT_SCRIPT}
  </script>
</body>
</html>`;
}

export {
  renderBarChart,
  renderStatCard,
  renderOverview,
  SEVERITY_ICON,
  renderInsights,
  renderSeverityKey,
  renderGlossary,
  COLUMN_TOOLTIPS,
  renderTable,
  renderHtml,
};
