// src/components/dashboard/UnresolvedTicketsTable.jsx

import React from 'react';
import { Card } from '../ui/Card';
import styles from './UnresolvedTicketsTable.module.css';

function PriorityDot({ priority }) {
  const cls = {
    high: styles.dotHigh,
    medium: styles.dotMedium,
    low: styles.dotLow,
  }[(priority || '').toLowerCase()] || styles.dotLow;
  return <span className={`${styles.dot} ${cls}`} />;
}

function StatusBadge({ status }) {
  const cls = {
    open: styles.badgeOpen,
    pending: styles.badgePending,
    resolved: styles.badgeResolved,
  }[(status || '').toLowerCase()] || styles.badgeOpen;
  return <span className={`${styles.badge} ${cls}`}>{status}</span>;
}

function TicketRow({ ticket_id, issue, product, priority, days_open, status, why_stuck }) {
  const isOld = parseInt(days_open) > 5;
  return (
    <tr className={styles.row}>
      <td><span className={styles.ticketId}>{ticket_id}</span></td>
      <td>{issue}</td>
      <td className={styles.muted}>{product}</td>
      <td>
        <PriorityDot priority={priority} />
        {priority}
      </td>
      <td className={`${styles.days} ${isOld ? styles.daysOld : ''}`}>{days_open}d</td>
      <td><StatusBadge status={status} /></td>
      <td className={`${styles.muted} ${styles.stuckCol}`}>{why_stuck}</td>
    </tr>
  );
}

export function UnresolvedTicketsTable({ tickets = [] }) {
  return (
    <Card title="🚨 Unresolved Tickets — Needs Attention" className={styles.tableCard}>
      <div className={styles.scrollWrap}>
        <table className={styles.table}>
          <thead>
            <tr>
              <th>Ticket ID</th>
              <th>Issue</th>
              <th>Product</th>
              <th>Priority</th>
              <th>Days Open</th>
              <th>Status</th>
              <th>Why Stuck</th>
            </tr>
          </thead>
          <tbody>
            {tickets.map((t) => (
              <TicketRow key={t.ticket_id} {...t} />
            ))}
          </tbody>
        </table>
      </div>
    </Card>
  );
}
