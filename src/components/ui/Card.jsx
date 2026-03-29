// src/components/ui/Card.jsx

import React from 'react';
import styles from './Card.module.css';

/**
 * Generic card container with optional title and extra className.
 */
export function Card({ title, children, className = '', style = {} }) {
  return (
    <div className={`${styles.card} ${className}`} style={style}>
      {title && <div className={styles.title}>{title}</div>}
      {children}
    </div>
  );
}
