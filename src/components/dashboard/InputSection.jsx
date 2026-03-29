// src/components/dashboard/InputSection.jsx

import React, { useRef } from 'react';
import styles from './InputSection.module.css';

export function InputSection({ csvValue, onChange, onLoadSample }) {
  const dropRef = useRef(null);

  function handleFileRead(file) {
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (e) => onChange(e.target.result);
    reader.readAsText(file);
  }

  function handleFileInput(e) {
    handleFileRead(e.target.files[0]);
  }

  function handleDragOver(e) {
    e.preventDefault();
    dropRef.current?.classList.add(styles.dragOver);
  }

  function handleDragLeave() {
    dropRef.current?.classList.remove(styles.dragOver);
  }

  function handleDrop(e) {
    e.preventDefault();
    dropRef.current?.classList.remove(styles.dragOver);
    handleFileRead(e.dataTransfer.files[0]);
  }

  return (
    <div className={styles.grid}>
      {/* Left: drop zone + sample */}
      <div>
        <div
          ref={dropRef}
          className={styles.dropZone}
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          onDrop={handleDrop}
        >
          <input
            type="file"
            accept=".csv,.txt"
            className={styles.fileInput}
            onChange={handleFileInput}
          />
          <div className={styles.dropIcon}>📂</div>
          <h3 className={styles.dropTitle}>Drop CSV file here</h3>
          <p className={styles.dropSub}>or click to browse</p>
        </div>

        <div className={styles.orDivider}>OR</div>

        <button className={styles.sampleBtn} onClick={onLoadSample}>
          ⚡ Load Sample Dataset (12 tickets)
        </button>
      </div>

      {/* Right: textarea */}
      <div>
        <textarea
          className={styles.textarea}
          value={csvValue}
          onChange={(e) => onChange(e.target.value)}
          placeholder={
            'Paste CSV data here...\n\nFormat: ticket_id,date,customer,issue_category,product,status,priority,days_open,description\n\nOr click \'Load Sample Dataset\' to try it instantly →'
          }
        />
      </div>
    </div>
  );
}
