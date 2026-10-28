import { getFormattedCurrentDate } from '../../../shared/helpers';
import { ParsedFile, EndpointMetrics, Overview } from './types';
import { safeDivide, isBrokenEndpoint, isSmallSample } from './parsing';

// ---------------------------------------------------------------------------
// Overview
// ---------------------------------------------------------------------------

/**
 * Formats a run-window boundary timestamp (epoch ms) via `toLocaleString`,
 * which renders in the local timezone and includes it in most locales
 * (e.g. "7/15/2026, 3:04:05 PM GMT+2"). Returns `null` when absent/invalid.
 */
function formatTimestamp(epochMs: number | undefined): string | null {
  if (typeof epochMs !== 'number' || !Number.isFinite(epochMs)) {
    return null;
  }
  const date = new Date(epochMs);
  if (Number.isNaN(date.getTime())) {
    return null;
  }
  return date.toLocaleString();
}

/**
 * Builds the run-level overview: aggregate totals, approx bytes downloaded,
 * and a small scoreboard (fastest/slowest/most-reliable/least-reliable).
 * Every figure degrades gracefully (null) when no endpoint qualifies.
 * Throughput is intentionally NOT summed here — separate Artillery runs are
 * not concurrent, so their req/s figures are not additive.
 */
function buildOverview(files: ParsedFile[], endpoints: EndpointMetrics[]): Overview {
  const valid = endpoints.filter((e) => !e.malformed);

  const totalRequests = valid.reduce((sum, e) => sum + e.totalRequests, 0);
  const totalSuccess = valid.reduce((sum, e) => sum + e.success, 0);
  const totalError = valid.reduce((sum, e) => sum + e.error, 0);
  const errorRatePct = safeDivide(totalError * 100, totalRequests);

  const brokenCount = valid.filter(isBrokenEndpoint).length;

  const withDownloadBytes = valid.filter((e) => e.payload.mean !== null && e.success > 0);
  const approxTotalDownloadBytes =
    withDownloadBytes.length > 0 ? withDownloadBytes.reduce((sum, e) => sum + e.payload.mean! * e.success, 0) : null;

  // Run window: earliest firstMetricAt / latest lastMetricAt across all parsed files.
  const firstMetricAts = files
    .map((f) => f.aggregate?.firstMetricAt)
    .filter((v): v is number => typeof v === 'number' && Number.isFinite(v));
  const lastMetricAts = files
    .map((f) => f.aggregate?.lastMetricAt)
    .filter((v): v is number => typeof v === 'number' && Number.isFinite(v));
  const runWindowStart = firstMetricAts.length > 0 ? formatTimestamp(Math.min(...firstMetricAts)) : null;
  const runWindowEnd = lastMetricAts.length > 0 ? formatTimestamp(Math.max(...lastMetricAts)) : null;

  // The fastest/slowest/most-reliable/least-reliable scoreboard is only
  // meaningful when comparing 2+ endpoints; with a single endpoint every
  // slot would just point back at itself, which is redundant noise.
  const showScoreboard = valid.length >= 2;

  const withP95 = valid.filter((e) => e.latency.p95 !== null);
  const fastest =
    showScoreboard && withP95.length > 0 ? withP95.reduce((a, b) => (b.latency.p95! < a.latency.p95! ? b : a)) : null;
  const slowest =
    showScoreboard && withP95.length > 0 ? withP95.reduce((a, b) => (b.latency.p95! > a.latency.p95! ? b : a)) : null;

  const withErrorRate = valid.filter((e) => e.errorRatePct !== null);
  const mostReliable =
    showScoreboard && withErrorRate.length > 0
      ? withErrorRate.reduce((a, b) => (b.errorRatePct! < a.errorRatePct! ? b : a))
      : null;
  const leastReliable =
    showScoreboard && withErrorRate.length > 0
      ? withErrorRate.reduce((a, b) => (b.errorRatePct! > a.errorRatePct! ? b : a))
      : null;

  // Virtual-user totals, summed only across endpoints that report the field
  // (a file-level counter, so it is naturally the same across prefixes of a
  // single file — summing double-counts multi-prefix files, but since the
  // purpose here is just "were any VUs created/completed/failed at all",
  // that is an acceptable simplification for a run-level rollup).
  const withVusersCreated = valid.filter((e) => e.vusersCreated !== null);
  const totalVusersCreated =
    withVusersCreated.length > 0 ? withVusersCreated.reduce((sum, e) => sum + e.vusersCreated!, 0) : null;
  const withVusersCompleted = valid.filter((e) => e.vusersCompleted !== null);
  const totalVusersCompleted =
    withVusersCompleted.length > 0 ? withVusersCompleted.reduce((sum, e) => sum + e.vusersCompleted!, 0) : null;
  const withVusersFailed = valid.filter((e) => e.vusersFailed !== null);
  const totalVusersFailed =
    withVusersFailed.length > 0 ? withVusersFailed.reduce((sum, e) => sum + e.vusersFailed!, 0) : null;

  const smallSampleCount = valid.filter(isSmallSample).length;

  return {
    generatedAt: getFormattedCurrentDate(),
    runWindowStart,
    runWindowEnd,
    sourceFileCount: files.length,
    endpointCount: valid.length,
    totalRequests,
    totalSuccess,
    totalError,
    errorRatePct,
    brokenCount,
    approxTotalDownloadBytes,
    showScoreboard,
    fastest: fastest ? { label: fastest.label, value: fastest.latency.p95! } : null,
    slowest: slowest ? { label: slowest.label, value: slowest.latency.p95! } : null,
    mostReliable: mostReliable ? { label: mostReliable.label, value: mostReliable.errorRatePct! } : null,
    leastReliable: leastReliable ? { label: leastReliable.label, value: leastReliable.errorRatePct! } : null,
    totalVusersCreated,
    totalVusersCompleted,
    totalVusersFailed,
    smallSampleCount,
  };
}

export { buildOverview, formatTimestamp };
