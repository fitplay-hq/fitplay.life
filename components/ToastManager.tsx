"use client";

import React, { useState, useCallback } from 'react';
import { CustomToast } from './CustomToast';

interface Toast {
  id: string;
  type: 'success' | 'info' | 'error';
  title: string;
  description?: string;
  duration?: number;
}

interface ToastManagerProps {
  toasts: Toast[];
  removeToast: (id: string) => void;
}

export function ToastManager({ toasts, removeToast }: ToastManagerProps) {
  return (
    <div className="fixed top-16 right-0 z-50 p-4 space-y-3 pointer-events-none">
      {toasts.map((toast) => (
        <div key={toast.id} className="pointer-events-auto">
          <CustomToast
            id={toast.id}
            type={toast.type}
            title={toast.title}
            description={toast.description}
            duration={toast.duration}
            onClose={removeToast}
          />
        </div>
      ))}
    </div>
  );
}

// Custom hook for toast management
export function useToast() {
  const [toasts, setToasts] = useState<Toast[]>([]);

  const addToast = useCallback((toast: Omit<Toast, 'id'>) => {
    const id = Date.now().toString() + Math.random().toString(36).substr(2, 9);
    setToasts(prev => [...prev, { ...toast, id }]);
  }, []);

  const removeToast = useCallback((id: string) => {
    setToasts(prev => prev.filter(toast => toast.id !== id));
  }, []);

  const toast = {
    success: (title: string, description?: string, duration = 3000) => 
      addToast({ type: 'success', title, description, duration }),
    info: (title: string, description?: string, duration = 3000) => 
      addToast({ type: 'info', title, description, duration }),
    error: (title: string, description?: string, duration = 3000) => 
      addToast({ type: 'error', title, description, duration }),
  };

  return { toasts, removeToast, toast };
}