import React from 'react';
import { Icon } from '@iconify/react';

export default function StatusBadge({ type, message, onClose }) {
  const isSuccess = type === 'success';
  const icon = isSuccess ? 'bi:check-circle-fill' : 'bi:x-circle-fill';

  return (
    <div className={`status-badge status-badge--${type}`}>
      <Icon icon={icon} className="status-badge__icon" />
      <span className="status-badge__text">{message}</span>
      <button
        className="status-badge__close"
        onClick={onClose}
        type="button"
        aria-label="Dismiss"
      >
        <Icon icon="bi:x" />
      </button>
    </div>
  );
}
