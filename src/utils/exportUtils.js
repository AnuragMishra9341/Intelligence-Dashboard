// src/utils/exportUtils.js

/**
 * Triggers a browser download of the given text content as a .txt file.
 */
export function downloadTextFile(content, filename = 'report.txt') {
  const blob = new Blob([content], { type: 'text/plain' });
  const a = document.createElement('a');
  a.href = URL.createObjectURL(blob);
  a.download = filename;
  a.click();
  URL.revokeObjectURL(a.href);
}

/**
 * Builds the full report text string from report data.
 */
export function buildReportText({ managerSummary, stats, escalation, fullAnalysis }) {
  const { total, unresolved, avgDays, resRate } = stats;
  const statsLine = `Total: ${total} | Unresolved: ${unresolved} | Avg Days: ${avgDays} | Res. Rate: ${resRate}%`;

  return [
    'CUBELELO SUPPORT INSIGHTS — WEEKLY REPORT',
    '='.repeat(50),
    '',
    'STATS',
    statsLine,
    '',
    'MANAGER SUMMARY',
    managerSummary,
    '',
    'ESCALATION RECOMMENDATIONS',
    escalation,
    '',
    'FULL ANALYSIS',
    fullAnalysis,
    '',
    `Generated: ${new Date().toLocaleString('en-IN')}`,
  ].join('\n');
}

/**
 * Copies text to clipboard. Returns a promise.
 */
export function copyToClipboard(text) {
  return navigator.clipboard.writeText(text);
}
