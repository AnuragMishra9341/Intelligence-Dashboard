// src/hooks/useToast.js

import { useState, useCallback } from 'react';

/**
 * Custom hook that manages a single ephemeral toast notification.
 * Returns the current toast message and a show function.
 */
export function useToast(duration = 2500) {
  const [toast, setToast] = useState({ message: '', visible: false });

  const showToast = useCallback(
    (message) => {
      setToast({ message, visible: true });
      setTimeout(() => {
        setToast((prev) => ({ ...prev, visible: false }));
      }, duration);
    },
    [duration]
  );

  return { toast, showToast };
}
