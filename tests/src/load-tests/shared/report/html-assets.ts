export const REPORT_CSS = `
  :root {
    color-scheme: light;
  }
  * {
    box-sizing: border-box;
  }
  body {
    font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif;
    margin: 0;
    padding: 24px;
    background: #f5f6f8;
    color: #1c1e21;
    line-height: 1.4;
  }
  h1, h2, h3 {
    margin-top: 0;
  }
  header {
    background: #ffffff;
    border-radius: 8px;
    padding: 16px 24px;
    margin-bottom: 24px;
    box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
  }
  header p {
    margin: 4px 0;
    color: #555;
  }
  section {
    background: #ffffff;
    border-radius: 8px;
    padding: 16px 24px;
    margin-bottom: 24px;
    box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
  }
  .hint {
    font-size: 12px;
    color: #777;
    margin: -4px 0 12px 0;
  }
  .table-wrap {
    overflow-x: auto;
  }
  table {
    width: 100%;
    border-collapse: collapse;
    font-size: 13px;
  }
  th, td {
    text-align: left;
    padding: 8px 10px;
    border-bottom: 1px solid #e0e0e0;
    vertical-align: top;
    white-space: nowrap;
  }
  td.num, th.num {
    text-align: right;
    font-family: "SF Mono", Menlo, Consolas, "Courier New", monospace;
  }
  thead th {
    position: sticky;
    top: 0;
    background: #fafafa;
    font-weight: 600;
    cursor: pointer;
    user-select: none;
    z-index: 1;
  }
  thead th:hover {
    background: #eef0f3;
  }
  thead th.sort-asc::after {
    content: " \\25B2";
    font-size: 10px;
  }
  thead th.sort-desc::after {
    content: " \\25BC";
    font-size: 10px;
  }
  tbody tr:nth-child(even) {
    background: #fafbfc;
  }
  tbody tr:hover {
    background: #f0f4ff;
  }
  tr.malformed td {
    color: #a94442;
    font-style: italic;
  }
  td.thin {
    color: #9aa0a6;
    font-style: italic;
  }
  .small-sample-badge {
    display: inline-block;
    margin-left: 6px;
    padding: 1px 6px;
    border-radius: 4px;
    background: #fff8e1;
    color: #7a5c00;
    font-size: 11px;
    font-style: normal;
    font-weight: 600;
    white-space: normal;
  }
  ul {
    list-style: none;
    padding: 0;
    margin: 0;
  }
  .stat-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
    gap: 12px;
    margin-bottom: 16px;
  }
  .stat-card {
    border-radius: 8px;
    padding: 12px 16px;
    border-left: 4px solid transparent;
    background: #f8f9fb;
  }
  .stat-label {
    font-size: 12px;
    color: #666;
    text-transform: uppercase;
    letter-spacing: 0.03em;
    margin-bottom: 4px;
  }
  .stat-value {
    font-size: 20px;
    font-weight: 600;
    font-family: "SF Mono", Menlo, Consolas, "Courier New", monospace;
  }
  .stat-critical {
    border-left-color: #d93025;
    background: #fdecea;
  }
  .stat-warn {
    border-left-color: #f9a825;
    background: #fff8e1;
  }
  .stat-info {
    border-left-color: #1a73e8;
    background: #e8f0fe;
  }
  .stat-good {
    border-left-color: #34a853;
    background: #e6f4ea;
  }
  .scoreboard {
    margin-top: 8px;
  }
  .scoreboard ul {
    display: flex;
    flex-direction: column;
    gap: 6px;
    font-size: 14px;
  }
  .insight {
    padding: 8px 12px;
    border-radius: 6px;
    margin-bottom: 8px;
    font-size: 14px;
    border-left: 4px solid transparent;
  }
  .insight-critical {
    background: #fdecea;
    border-left-color: #d93025;
    color: #7a1f16;
  }
  .insight-warn {
    background: #fff8e1;
    border-left-color: #f9a825;
    color: #7a5c00;
  }
  .insight-info {
    background: #e8f0fe;
    border-left-color: #1a73e8;
    color: #103d8f;
  }
  .insight-good {
    background: #e6f4ea;
    border-left-color: #34a853;
    color: #14622c;
  }
  .severity-key {
    display: flex;
    flex-wrap: wrap;
    gap: 16px;
    margin-top: 12px;
    padding-top: 12px;
    border-top: 1px solid #e0e0e0;
    font-size: 12px;
    color: #555;
  }
  .severity-key-item {
    display: inline-flex;
    align-items: center;
    gap: 6px;
  }
  .severity-swatch {
    display: inline-block;
    width: 12px;
    height: 12px;
    border-radius: 3px;
    border-left: 4px solid transparent;
  }
  th[title] {
    cursor: help;
    text-decoration: underline dotted;
    text-decoration-color: #bbb;
  }
  .glossary {
    margin-top: 16px;
  }
  .glossary summary {
    cursor: pointer;
    font-weight: 600;
    font-size: 14px;
    padding: 8px 0;
  }
  .glossary summary:hover {
    color: #1a73e8;
  }
  .glossary-table {
    width: 100%;
    border-collapse: collapse;
    font-size: 13px;
    margin-top: 8px;
  }
  .glossary-table th,
  .glossary-table td {
    text-align: left;
    padding: 8px 10px;
    border-bottom: 1px solid #e0e0e0;
    white-space: normal;
    vertical-align: top;
  }
  .glossary-table th {
    font-weight: 600;
    color: #1c1e21;
    width: 220px;
    position: static;
    cursor: default;
  }
  .chart {
    margin-bottom: 24px;
  }
  .bar-chart {
    display: flex;
    flex-direction: column;
    gap: 10px;
  }
  .bar-row {
    display: grid;
    grid-template-columns: 220px 1fr 140px;
    align-items: center;
    gap: 10px;
  }
  .bar-label {
    font-size: 13px;
    color: #333;
    overflow-wrap: anywhere;
  }
  .bar-track {
    background: #eef0f3;
    border-radius: 4px;
    height: 16px;
    overflow: hidden;
  }
  .bar-fill {
    background: #1a73e8;
    height: 100%;
  }
  .bar-value {
    font-size: 12px;
    color: #555;
    text-align: right;
  }`;

export const SORT_SCRIPT = `
  (function () {
    var table = document.getElementById('endpoint-table');
    if (!table) {
      return;
    }
    var headers = table.querySelectorAll('thead th');
    var tbody = table.querySelector('tbody');

    function clearIndicators(except) {
      headers.forEach(function (h) {
        if (h !== except) {
          h.classList.remove('sort-asc', 'sort-desc');
        }
      });
    }

    function cellSortValue(cell, type) {
      if (!cell) {
        return type === 'num' ? -1 : '';
      }
      if (type === 'num') {
        var attr = cell.getAttribute('data-sort');
        var parsed = attr === null ? NaN : parseFloat(attr);
        return isNaN(parsed) ? -1 : parsed;
      }
      return (cell.textContent || '').toLowerCase();
    }

    headers.forEach(function (header) {
      header.addEventListener('click', function () {
        var colIndex = parseInt(header.getAttribute('data-col'), 10);
        if (isNaN(colIndex)) {
          return;
        }
        var type = header.getAttribute('data-type') || 'text';
        var ascending = !header.classList.contains('sort-asc');

        var rows = Array.prototype.slice.call(tbody.querySelectorAll('tr'));
        rows.sort(function (rowA, rowB) {
          var cellA = rowA.children[colIndex];
          var cellB = rowB.children[colIndex];
          var valueA = cellSortValue(cellA, type);
          var valueB = cellSortValue(cellB, type);

          if (valueA < valueB) {
            return ascending ? -1 : 1;
          }
          if (valueA > valueB) {
            return ascending ? 1 : -1;
          }
          return 0;
        });

        rows.forEach(function (row) {
          tbody.appendChild(row);
        });

        clearIndicators(header);
        header.classList.toggle('sort-asc', ascending);
        header.classList.toggle('sort-desc', !ascending);
      });
    });
  })();`;
