// src/utils/csvParser.js

/**
 * Parses a CSV string into an array of objects.
 * First row is treated as headers.
 */
export function parseCSV(text) {
  const lines = text.trim().split('\n');
  if (lines.length < 2) return [];

  const headers = lines[0]
    .split(',')
    .map((h) => h.trim().toLowerCase().replace(/\s+/g, '_'));

  return lines
    .slice(1)
    .map((line) => {
      const vals = line.split(',');
      const obj = {};
      headers.forEach((h, i) => {
        obj[h] = (vals[i] || '').trim();
      });
      return obj;
    })
    .filter((t) => t.ticket_id);
}

/**
 * Computes local statistics from an array of parsed ticket objects.
 */
export function computeLocalStats(tickets) {
  const total = tickets.length;
  const resolved = tickets.filter(
    (t) => (t.status || '').toLowerCase() === 'resolved'
  );
  const unresolved = tickets.filter(
    (t) => (t.status || '').toLowerCase() !== 'resolved'
  );

  const totalDays = tickets.reduce(
    (acc, t) => acc + (parseInt(t.days_open) || 0),
    0
  );
  const avgDays = total > 0 ? (totalDays / total).toFixed(1) : '0.0';
  const resRate = total > 0 ? Math.round((resolved.length / total) * 100) : 0;

  const catCounts = {};
  tickets.forEach((t) => {
    const cat = t.issue_category || 'Unknown';
    catCounts[cat] = (catCounts[cat] || 0) + 1;
  });

  return { total, resolved, unresolved, avgDays, resRate, catCounts };
}
