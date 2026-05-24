import { useState } from 'react';
import type { Toast } from './toastTypes';

export function useToast() {
  const [toasts, setToasts] = useState<Toast[]>([]);

  const addToast = (message: string) => {
    const id = crypto.randomUUID();

    setToasts((prev) => [...prev, { id, message }]);

    setTimeout(() => {
      setToasts((prev) =>
        prev.filter((t) => t.id !== id)
      );
    }, 2500);
  };

  return {
    toasts,
    addToast,
  };
}