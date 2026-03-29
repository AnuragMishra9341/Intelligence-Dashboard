// src/components/dashboard/PatternsPanel.jsx

import React from 'react';
import { Card } from '../ui/Card';
import styles from './PatternsPanel.module.css';

function PatternItem({ icon, title, description }) {
  return (
    <div className={styles.item}>
      <div className={styles.icon}>{icon}</div>
      <div>
        <div className={styles.title}>{title}</div>
        <div className={styles.desc}>{description}</div>
      </div>
    </div>
  );
}

export function PatternsPanel({ patterns = [] }) {
  return (
    <Card title="🔍 Key Patterns & Risks">
      {patterns.map((p, i) => (
        <PatternItem key={i} {...p} />
      ))}
    </Card>
  );
}
