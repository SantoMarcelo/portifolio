// ---------------------------------------------------------------------------
// Formatting helpers
// ---------------------------------------------------------------------------

function formatMs(value: number | null): string {
  if (value === null || !Number.isFinite(value)) {
    return 'n/a';
  }
  const rounded = Math.round(value);
  if (rounded >= 1000) {
    return `${(rounded / 1000).toFixed(2)} s`;
  }
  return `${rounded} ms`;
}

function formatPct(value: number | null): string {
  return value === null ? 'n/a' : `${value.toFixed(2)}%`;
}

function formatRps(value: number | null): string {
  return value === null ? 'n/a' : `${value.toFixed(2)} req/s`;
}

/**
 * Scales a byte count to the most readable unit (B/KB/MB/GB, base 1024,
 * 1 decimal place), e.g. `160.5 MB`. Returns `n/a` for null/non-finite input.
 */
function formatBytes(value: number | null): string {
  if (value === null || !Number.isFinite(value)) {
    return 'n/a';
  }
  if (value < 1024) {
    return `${Math.round(value)} B`;
  }

  const units = ['KB', 'MB', 'GB'];
  let scaled = value / 1024;
  let unitIndex = 0;
  while (scaled >= 1024 && unitIndex < units.length - 1) {
    scaled /= 1024;
    unitIndex++;
  }

  return `${scaled.toFixed(1)} ${units[unitIndex]}`;
}

function formatNumber(value: number | null): string {
  return value === null ? 'n/a' : value.toLocaleString('en-US');
}

function escapeHtml(input: string): string {
  return input
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
}

/**
 * Formats a name→count map (e.g. errors by status, http codes, network
 * errors) as a comma-separated "key: count" list, escaping both key and
 * value. Returns an empty string for an empty map (caller decides the
 * "n/a" fallback).
 */
function formatCountMap(map: Record<string, number>): string {
  return Object.entries(map)
    .map(([key, value]) => `${escapeHtml(key)}: ${escapeHtml(String(value))}`)
    .join(', ');
}

/**
 * Renders a numeric table cell with a `data-sort` attribute holding the raw
 * number so the inline sort script can order rows numerically. `null` sorts
 * as `-1` (treated as "worst"/"lowest", consistent with "n/a" meaning no data).
 * An optional extra `className` (e.g. `thin`) is appended to the `num` class.
 */
function sortableCell(value: number | null, formatted: string, className = ''): string {
  const sortValue = value === null ? -1 : value;
  const classAttr = className ? `num ${className}` : 'num';
  return `<td class="${classAttr}" data-sort="${sortValue}">${escapeHtml(formatted)}</td>`;
}

export { formatMs, formatPct, formatRps, formatBytes, formatNumber, escapeHtml, formatCountMap, sortableCell };
