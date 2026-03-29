// src/components/ui/SectionLabel.jsx

import React from 'react';
import styles from './SectionLabel.module.css';

/**
 * Styled section heading with a decorative line.
 */
export function SectionLabel({ children }) {
  return <div className={styles.label}>{children}</div>;
}
