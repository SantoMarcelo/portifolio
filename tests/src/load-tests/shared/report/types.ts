const RESERVED_PREFIXES = ['http.', 'vusers.', 'errors.', 'plugins.', 'artillery.'];

/**
 * Endpoints with fewer than this many latency samples get their percentile
 * cells visually de-emphasized (`.thin`) and a warning badge, since
 * percentiles computed from a handful of requests are not statistically
 * reliable (typical of a smoke test rather than a sustained load test).
 */
const SMALL_SAMPLE = 100;

interface HistogramStats {
  min: number;
  max: number;
  mean: number;
  median: number;
  p50: number;
  p75: number;
  p90: number;
  p95: number;
  p99: number;
  p999: number;
  count: number;
}

interface ArtilleryAggregate {
  counters?: Record<string, number>;
  histograms?: Record<string, HistogramStats>;
  firstMetricAt?: number;
  lastMetricAt?: number;
}

interface ParsedFile {
  filePath: string;
  fileStem: string;
  malformed: boolean;
  aggregate?: ArtilleryAggregate;
}

interface LatencyStats {
  min: number | null;
  mean: number | null;
  p50: number | null;
  p90: number | null;
  p95: number | null;
  p99: number | null;
  max: number | null;
  count: number | null;
}

interface PayloadStats {
  mean: number | null;
  max: number | null;
}

interface EndpointMetrics {
  label: string;
  fileStem: string;
  prefix: string;
  malformed: boolean;
  totalRequests: number;
  success: number;
  error: number;
  errorsByStatus: Record<string, number>;
  httpCodes: Record<string, number>;
  errorsNetwork: Record<string, number>;
  errorRatePct: number | null;
  throughputRps: number | null;
  latency: LatencyStats;
  serverP95: number | null;
  payload: PayloadStats;
  vusersCompleted: number | null;
  vusersCreated: number | null;
  vusersFailed: number | null;
}

type Severity = 'critical' | 'warn' | 'info' | 'good';

interface Insight {
  severity: Severity;
  message: string;
}

interface ScoreboardEntry {
  label: string;
  value: number;
}

interface Overview {
  generatedAt: string;
  runWindowStart: string | null;
  runWindowEnd: string | null;
  sourceFileCount: number;
  endpointCount: number;
  totalRequests: number;
  totalSuccess: number;
  totalError: number;
  errorRatePct: number | null;
  brokenCount: number;
  approxTotalDownloadBytes: number | null;
  showScoreboard: boolean;
  fastest: ScoreboardEntry | null;
  slowest: ScoreboardEntry | null;
  mostReliable: ScoreboardEntry | null;
  leastReliable: ScoreboardEntry | null;
  totalVusersCreated: number | null;
  totalVusersCompleted: number | null;
  totalVusersFailed: number | null;
  smallSampleCount: number;
}

export {
  RESERVED_PREFIXES,
  SMALL_SAMPLE,
  HistogramStats,
  ArtilleryAggregate,
  ParsedFile,
  LatencyStats,
  PayloadStats,
  EndpointMetrics,
  Severity,
  Insight,
  ScoreboardEntry,
  Overview,
};
