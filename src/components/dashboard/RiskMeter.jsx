// src/components/dashboard/RiskMeter.jsx

import React, { useEffect, useState } from 'react';
import { Card } from '../ui/Card';
import styles from './RiskMeter.module.css';

export function RiskMeter({ score = 50, description = '' }) {
  const [needlePos, setNeedlePos] = useState(50);

  useEffect(() => {
    const clamped = Math.min(100, Math.max(0, score));
    const timer = setTimeout(() => setNeedlePos(clamped), 100);
    return () => clearTimeout(timer);
  }, [score]);

  return (
    <Card title="⚠️ Overall Risk Level" className={styles.wrap}>
      <div className={styles.meter}>
        <div className={styles.needle} style={{ left: `${needlePos}%` }} />
      </div>
      <div className={styles.labels}>
        <span>LOW RISK</span>
        <span>MEDIUM</span>
        <span>HIGH RISK</span>
      </div>
      {description && <p className={styles.desc}>{description}</p>}
    </Card>
  );
}
