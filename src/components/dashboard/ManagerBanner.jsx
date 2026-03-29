// src/components/dashboard/ManagerBanner.jsx

import React from 'react';
import styles from './ManagerBanner.module.css';

export function ManagerBanner({ summary }) {
  return (
    <div className={styles.banner}>
      <h2 className={styles.title}>📋 Manager Summary</h2>
      <p className={styles.text}>{summary}</p>
    </div>
  );
}
