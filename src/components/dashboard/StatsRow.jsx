// src/components/dashboard/StatsRow.jsx

import React from 'react';
import styles from './StatsRow.module.css';

function StatCard({ value, label, variant }) {
  return (
    <div className={`${styles.card} ${styles[variant]}`}>
      <div className={styles.value}>{value}</div>
      <div className={styles.label}>{label}</div>
    </div>
  );
}

export function StatsRow({ total, unresolved, avgDays, resRate }) {
  return (
    <div className={styles.row}>
      <StatCard value={total} label="Total Tickets" variant="danger" />
      <StatCard value={unresolved} label="Unresolved" variant="warning" />
      <StatCard value={`${avgDays}d`} label="Avg Days Open" variant="primary" />
      <StatCard value={`${resRate}%`} label="Resolution Rate" variant="success" />
    </div>
  );
}
