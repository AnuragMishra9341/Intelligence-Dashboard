// src/components/dashboard/AnalyzeButton.jsx

import React from 'react';
import styles from './AnalyzeButton.module.css';

export function AnalyzeButton({ onClick, disabled }) {
  return (
    <button className={styles.btn} onClick={onClick} disabled={disabled}>
      <span className={styles.shine} />
      🔍 Generate Weekly Insights Report
    </button>
  );
}
