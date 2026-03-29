// src/components/dashboard/EscalationRadar.jsx

import React from 'react';
import styles from './EscalationRadar.module.css';

export function EscalationRadar({ content }) {
  return (
    <div className={styles.card}>
      <h3 className={styles.title}>
        ⭐ Smart Escalation Radar{' '}
        <span className={styles.bonusBadge}>BONUS FEATURE</span>
      </h3>
      <p className={styles.content}>{content}</p>
    </div>
  );
}
