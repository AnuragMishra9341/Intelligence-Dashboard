// src/hooks/useTicketAnalysis.js

import { useState, useCallback } from 'react';
import { parseCSV, computeLocalStats } from '../utils/csvParser';
import { analyzeTicketsWithAI } from '../services/anthropicService';
import { CATEGORY_COLORS } from '../constants/sampleData';

/**
 * Custom hook that encapsulates all ticket analysis state and logic.
 */
export function useTicketAnalysis() {
  const [isLoading, setIsLoading] = useState(false);
  const [results, setResults] = useState(null);
  const [error, setError] = useState(null);

  const analyze = useCallback(async (csvText) => {
    if (!csvText.trim()) {
      return { success: false, message: 'Please paste CSV data first' };
    }

    const tickets = parseCSV(csvText);
    if (tickets.length === 0) {
      return { success: false, message: 'Could not parse CSV. Check format.' };
    }

    setIsLoading(true);
    setError(null);

    const localStats = computeLocalStats(tickets);

    try {
      const aiResult = await analyzeTicketsWithAI(csvText);
      setResults({
        source: 'ai',
        aiData: aiResult,
        stats: {
          total: localStats.total,
          unresolved: localStats.unresolved.length,
          avgDays: localStats.avgDays,
          resRate: localStats.resRate,
        },
        tickets,
      });
    } catch (err) {
      console.warn('AI analysis failed, falling back to local:', err);
      // Build a fallback result from local data
      const fallback = buildFallbackResult(localStats, tickets);
      setResults({
        source: 'fallback',
        aiData: fallback,
        stats: {
          total: localStats.total,
          unresolved: localStats.unresolved.length,
          avgDays: localStats.avgDays,
          resRate: localStats.resRate,
        },
        tickets,
      });
      setError('AI unavailable — showing local statistics.');
    } finally {
      setIsLoading(false);
    }

    return { success: true };
  }, []);

  return { isLoading, results, error, analyze };
}

/**
 * Builds a basic result object from locally computed stats when AI is unavailable.
 */
function buildFallbackResult(localStats, tickets) {
  const { total, unresolved, avgDays, resRate, catCounts } = localStats;
  const topCat = Object.entries(catCounts).sort((a, b) => b[1] - a[1])[0];

  const top_categories = Object.entries(catCounts)
    .sort((a, b) => b[1] - a[1])
    .map(([name, count], i) => ({
      name,
      count,
      pct: Math.round((count / total) * 100),
      color: CATEGORY_COLORS[i % CATEGORY_COLORS.length],
    }));

  const unresolved_reasons = unresolved.map((t) => ({
    ticket_id: t.ticket_id,
    issue: t.issue_category,
    product: t.product,
    priority: t.priority,
    days_open: t.days_open,
    status: t.status || 'Open',
    why_stuck: t.description || '—',
  }));

  return {
    manager_summary: `This week: ${total} tickets received, ${unresolved.length} unresolved. Average resolution time: ${avgDays} days. Resolution rate: ${resRate}%. Top issue: ${topCat?.[0] || 'N/A'}. High priority tickets require immediate attention. Review unresolved list below for action items.`,
    risk_score: Math.round((unresolved.length / total) * 100),
    risk_description: `${unresolved.length} of ${total} tickets are unresolved this week.`,
    top_categories,
    unresolved_reasons,
    patterns: [
      {
        icon: '⚠️',
        title: 'Manual Analysis Mode',
        description:
          'AI analysis unavailable. Showing locally computed statistics. Check API connection for full insights.',
      },
    ],
    escalation_recommendations:
      'Escalate all High priority tickets open for more than 5 days immediately.',
    full_analysis: `${total} tickets analyzed. ${unresolved.length} remain unresolved. Average days open: ${avgDays}. Resolution rate: ${resRate}%.`,
  };
}
