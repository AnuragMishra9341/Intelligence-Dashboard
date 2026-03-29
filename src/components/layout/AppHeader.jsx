// src/components/layout/AppHeader.jsx

import React from 'react';
import styles from './AppHeader.module.css';

/**
 * Sticky top navigation header with logo and version badge.
 */
export function AppHeader() {
  return (
    <header className={styles.header}>
      <div className={styles.inner}>
        <div className={styles.logo}>
          <div className={styles.logoCube}>🧩</div>
          <div>
            <div className={styles.logoText}>
              <span>Cube</span>lelo
            </div>
            <div className={styles.logoSub}>SUPPORT INSIGHTS</div>
          </div>
        </div>
        <div className={styles.badge}>INTERNAL TOOL v1.0</div>
      </div>
    </header>
  );
}
