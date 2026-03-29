// src/components/ui/Toast.jsx

import React from 'react';
import styles from './Toast.module.css';

/**
 * Displays an ephemeral notification at the bottom of the screen.
 */
export function Toast({ message, visible }) {
  return (
    <div className={`${styles.toast} ${visible ? styles.show : ''}`}>
      {message}
    </div>
  );
}
