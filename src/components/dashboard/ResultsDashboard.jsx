// src/components/dashboard/ResultsDashboard.jsx

import React from 'react';
import { SectionLabel } from '../ui/SectionLabel';
import { ManagerBanner } from './ManagerBanner';
import { StatsRow } from './StatsRow';
import { RiskMeter } from './RiskMeter';
import { IssueCategoriesChart } from './IssueCategoriesChart';
import { PatternsPanel } from './PatternsPanel';
import { UnresolvedTicketsTable } from './UnresolvedTicketsTable';
import { EscalationRadar } from './EscalationRadar';
import { FullAnalysisPanel } from './FullAnalysisPanel';
import { ExportActions } from './ExportActions';
import styles from './ResultsDashboard.module.css';

export function ResultsDashboard({ results, onExport, onCopy }) {
  const { aiData, stats } = results;

  return (
    <div className={styles.wrapper}>
      <SectionLabel>02 — INSIGHTS REPORT</SectionLabel>

      <ManagerBanner summary={aiData.manager_summary} />

      <StatsRow
        total={stats.total}
        unresolved={stats.unresolved}
        avgDays={stats.avgDays}
        resRate={stats.resRate}
      />

      <RiskMeter
        score={aiData.risk_score}
        description={aiData.risk_description}
      />

      <div className={styles.twoCol}>
        <IssueCategoriesChart categories={aiData.top_categories} />
        <PatternsPanel patterns={aiData.patterns} />
      </div>

      <UnresolvedTicketsTable tickets={aiData.unresolved_reasons} />

      <EscalationRadar content={aiData.escalation_recommendations} />

      <FullAnalysisPanel analysis={aiData.full_analysis} />

      <ExportActions onExport={onExport} onCopy={onCopy} />
    </div>
  );
}
