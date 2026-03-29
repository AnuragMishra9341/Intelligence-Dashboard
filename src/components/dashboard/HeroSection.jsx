// src/components/dashboard/HeroSection.jsx

import React from 'react';
import styles from './HeroSection.module.css';

export function HeroSection() {
  return (
    <div className={styles.hero}>
      <h1 className={styles.heading}>
        Weekly Support<br />
        <span className={styles.gradient}>Intelligence Dashboard</span>
      </h1>
      <p className={styles.sub}>
        Paste your CSV ticket data or upload a file. Get a manager-ready summary
        in seconds — no spreadsheet digging needed.
      </p>
    </div>
  );
}
