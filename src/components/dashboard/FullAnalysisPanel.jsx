// src/components/dashboard/FullAnalysisPanel.jsx

import React from 'react';
import { Card } from '../ui/Card';
import styles from './FullAnalysisPanel.module.css';

export function FullAnalysisPanel({ analysis }) {
  return (
    <Card title="🤖 Full AI Analysis" className={styles.card}>
      <div className={styles.text}>{analysis}</div>
    </Card>
  );
}
