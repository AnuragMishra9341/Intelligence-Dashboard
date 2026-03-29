// src/components/ui/LoadingOverlay.jsx

import React from 'react';
import styles from './LoadingOverlay.module.css';

/**
 * Full-screen loading overlay shown during AI analysis.
 */
export function LoadingOverlay({ visible }) {
  if (!visible) return null;

  return (
    <div className={styles.overlay}>
      <div className={styles.box}>
        <div className={styles.spinner} />
        <h3>Analyzing Tickets</h3>
        <p>AI is processing your support data...</p>
      </div>
    </div>
  );
}
