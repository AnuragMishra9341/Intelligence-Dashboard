// src/components/dashboard/ExportActions.jsx

import React from 'react';
import styles from './ExportActions.module.css';

export function ExportActions({ onExport, onCopy }) {
  return (
    <div className={styles.wrap}>
      <button className={styles.btn} onClick={onExport}>
        📥 Export Summary as TXT
      </button>
      <button className={styles.btn} onClick={onCopy}>
        📋 Copy Manager Report
      </button>
    </div>
  );
}
