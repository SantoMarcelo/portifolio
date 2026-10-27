import { EndpointMetrics, Insight, SMALL_SAMPLE } from './types';
import { formatMs, formatPct, formatBytes, formatNumber } from './formatting';
import { isBrokenEndpoint, isSmallSample, getDominantNetworkError } from './parsing';

// ---------------------------------------------------------------------------
// Insights
// ---------------------------------------------------------------------------

function buildInsights(endpoints: EndpointMetrics[]): Insight[] {
  const insights: Insight[] = [];
  const valid = endpoints.filter((e) => !e.malformed);

  // Slowest by p95
  const withP95 = valid.filter((e) => e.latency.p95 !== null);
  if (withP95.length > 0) {
    const slowest = withP95.reduce((a, b) => (b.latency.p95! > a.latency.p95! ? b : a));
    insights.push({
      severity: 'warn',
      message: `Slowest endpoint: "${slowest.label}" at p95 ${formatMs(slowest.latency.p95)}`,
    });
  }

  // Highest error rate
  const withErrorRate = valid.filter((e) => e.errorRatePct !== null && e.errorRatePct > 0);
  if (withErrorRate.length > 0) {
    const worst = withErrorRate.reduce((a, b) => (b.errorRatePct! > a.errorRatePct! ? b : a));
    insights.push({
      severity: 'critical',
      message: `Highest error rate: "${worst.label}" at ${formatPct(worst.errorRatePct)}`,
    });
  }

  // Broken endpoints
  for (const endpoint of valid.filter(isBrokenEndpoint)) {
    const zeroSuccessWithTraffic = endpoint.success === 0 && endpoint.totalRequests > 0;
    const authLikelyFailed =
      endpoint.vusersCompleted === 0 && endpoint.vusersCreated !== null && endpoint.vusersCreated > 0;

    if (authLikelyFailed) {
      const dominantNetworkError = getDominantNetworkError(endpoint.errorsNetwork);
      const networkErrorSuffix = dominantNetworkError
        ? ` — errors: ${dominantNetworkError.name}×${formatNumber(dominantNetworkError.count)}`
        : '';
      insights.push({
        severity: 'critical',
        message: `Broken: "${endpoint.label}" — auth likely failed — check .env credentials/roles${networkErrorSuffix}`,
      });
    } else if (zeroSuccessWithTraffic) {
      insights.push({
        severity: 'critical',
        message: `Broken: "${endpoint.label}" — 0 successful requests out of ${endpoint.totalRequests}`,
      });
    }
  }

  // Largest payload
  const withPayload = valid.filter((e) => e.payload.mean !== null);
  if (withPayload.length > 0) {
    const largest = withPayload.reduce((a, b) => (b.payload.mean! > a.payload.mean! ? b : a));
    insights.push({
      severity: 'info',
      message: `Largest payload: "${largest.label}" averaging ${formatBytes(largest.payload.mean)}`,
    });
  }

  // Worst tail latency (p99/p50 ratio)
  const withTail = valid.filter((e) => e.latency.p99 !== null && e.latency.p50 !== null && e.latency.p50! > 0);
  if (withTail.length > 0) {
    const worstTail = withTail.reduce((a, b) => {
      const ratioA = a.latency.p99! / a.latency.p50!;
      const ratioB = b.latency.p99! / b.latency.p50!;
      return ratioB > ratioA ? b : a;
    });
    const ratio = worstTail.latency.p99! / worstTail.latency.p50!;
    if (Number.isFinite(ratio)) {
      insights.push({
        severity: ratio >= 3 ? 'warn' : 'info',
        message: `Worst tail latency: "${worstTail.label}" p99/p50 ratio of ${ratio.toFixed(2)}x`,
      });
    }
  }

  // Small sample warning
  const smallSampleEndpoints = valid.filter(isSmallSample);
  if (smallSampleEndpoints.length > 0) {
    insights.push({
      severity: 'info',
      message: `${smallSampleEndpoints.length} endpoint(s) measured fewer than ${SMALL_SAMPLE} requests — percentiles are not statistically reliable (smoke test, not load test).`,
    });
  }

  if (insights.length === 0) {
    insights.push({ severity: 'good', message: 'No anomalies detected across the aggregated endpoints.' });
  }

  return insights;
}

export { buildInsights };
