// src/components/dashboard/IssueCategoriesChart.jsx

import React, { useEffect, useRef } from 'react';
import { Card } from '../ui/Card';
import styles from './IssueCategoriesChart.module.css';

function IssueBar({ name, count, pct, color, maxCount }) {
  const fillRef = useRef(null);
  const widthPct = Math.round((count / maxCount) * 100);

  useEffect(() => {
    const timer = setTimeout(() => {
      if (fillRef.current) fillRef.current.style.width = `${widthPct}%`;
    }, 100);
    return () => clearTimeout(timer);
  }, [widthPct]);

  return (
    <div className={styles.bar}>
      <div className={styles.barLabel}>
        <span>{name}</span>
        <span className={styles.barCount}>
          {count} ticket{count !== 1 ? 's' : ''} ({pct}%)
        </span>
      </div>
      <div className={styles.track}>
        <div
          ref={fillRef}
          className={styles.fill}
          style={{ width: '0%', background: color }}
        />
      </div>
    </div>
  );
}

export function IssueCategoriesChart({ categories = [] }) {
  const maxCount = Math.max(...categories.map((c) => c.count), 1);

  return (
    <Card title="📊 Top Issue Categories">
      {categories.map((cat) => (
        <IssueBar key={cat.name} {...cat} maxCount={maxCount} />
      ))}
    </Card>
  );
}
