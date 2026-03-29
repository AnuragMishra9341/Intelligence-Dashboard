// src/App.jsx

import React, { useState, useRef } from 'react';
import { AppHeader } from './components/layout/AppHeader';
import { AppFooter } from './components/layout/AppFooter';
import { HeroSection } from './components/dashboard/HeroSection';
import { InputSection } from './components/dashboard/InputSection';
import { AnalyzeButton } from './components/dashboard/AnalyzeButton';
import { ResultsDashboard } from './components/dashboard/ResultsDashboard';
import { LoadingOverlay } from './components/ui/LoadingOverlay';
import { Toast } from './components/ui/Toast';
import { SectionLabel } from './components/ui/SectionLabel';
import { useTicketAnalysis } from './hooks/useTicketAnalysis';
import { useToast } from './hooks/useToast';
import { SAMPLE_CSV } from './constants/sampleData';
import { downloadTextFile, buildReportText, copyToClipboard } from './utils/exportUtils';
import styles from './App.module.css';

export default function App() {
  const [csvValue, setCsvValue] = useState('');
  const resultsRef = useRef(null);
  const { toast, showToast } = useToast();
  const { isLoading, results, analyze } = useTicketAnalysis();

  async function handleAnalyze() {
    const outcome = await analyze(csvValue);
    if (!outcome.success) {
      showToast(`⚠️ ${outcome.message}`);
      return;
    }
    showToast('✅ Analysis complete!');
    setTimeout(() => {
      resultsRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }, 300);
  }

  function handleLoadSample() {
    setCsvValue(SAMPLE_CSV);
    showToast('⚡ Sample dataset loaded!');
  }

  function handleExport() {
    if (!results) return;
    const text = buildReportText({
      managerSummary: results.aiData.manager_summary,
      stats: results.stats,
      escalation: results.aiData.escalation_recommendations,
      fullAnalysis: results.aiData.full_analysis,
    });
    downloadTextFile(text, 'cubelelo-weekly-report.txt');
    showToast('📥 Report exported!');
  }

  async function handleCopy() {
    if (!results) return;
    await copyToClipboard(results.aiData.manager_summary);
    showToast('📋 Manager summary copied!');
  }

  return (
    <>
      <LoadingOverlay visible={isLoading} />
      <Toast message={toast.message} visible={toast.visible} />

      <AppHeader />

      <main>
        <div className={styles.container}>
          <HeroSection />

          <div className={styles.inputSection}>
            <SectionLabel>01 — INPUT DATA</SectionLabel>
            <InputSection
              csvValue={csvValue}
              onChange={setCsvValue}
              onLoadSample={handleLoadSample}
            />
            <AnalyzeButton onClick={handleAnalyze} disabled={isLoading} />
          </div>

          {results && (
            <div ref={resultsRef}>
              <ResultsDashboard
                results={results}
                onExport={handleExport}
                onCopy={handleCopy}
              />
            </div>
          )}
        </div>
      </main>

      <AppFooter />
    </>
  );
}
