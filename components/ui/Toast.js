'use client';
import { createContext, useCallback, useContext, useState } from 'react';
import { CheckCircle, AlertCircle, Info, X } from 'lucide-react';

const ToastContext = createContext(null);

const icons = {
  success: CheckCircle,
  error: AlertCircle,
  info: Info,
};

const styles = {
  success: 'border-emerald-200 bg-emerald-50 text-success-600',
  error: 'border-red-200 bg-danger-50 text-danger-600',
  info: 'border-brand-200 bg-brand-50 text-brand-600',
};

export function ToastProvider({ children }) {
  const [toasts, setToasts] = useState([]);

  const dismiss = useCallback((id) => {
    setToasts((t) => t.filter((x) => x.id !== id));
  }, []);

  const toast = useCallback((message, type = 'success', duration = 3500) => {
    const id = Date.now();
    setToasts((t) => [...t, { id, message, type }]);
    if (duration > 0) {
      setTimeout(() => dismiss(id), duration);
    }
  }, [dismiss]);

  return (
    <ToastContext.Provider value={{ toast, dismiss }}>
      {children}
      <div
        className="fixed bottom-6 right-6 z-[100] flex flex-col gap-3 pointer-events-none"
        aria-live="polite"
        aria-label="Notifications"
      >
        {toasts.map(({ id, message, type }) => {
          const Icon = icons[type] || Info;
          return (
            <div
              key={id}
              className={[
                'pointer-events-auto flex items-center gap-3 px-4 py-3.5 rounded-xl',
                'border shadow-lg animate-slide-up min-w-[280px] max-w-sm',
                'bg-surface',
                styles[type] || styles.info,
              ].join(' ')}
              role="status"
            >
              <Icon size={18} className="flex-shrink-0" />
              <p className="text-sm font-medium text-ink flex-1">{message}</p>
              <button
                onClick={() => dismiss(id)}
                className="p-1 rounded-lg text-muted hover:text-ink transition-colors"
                aria-label="Dismiss notification"
              >
                <X size={14} />
              </button>
            </div>
          );
        })}
      </div>
    </ToastContext.Provider>
  );
}

export function useToast() {
  const ctx = useContext(ToastContext);
  if (!ctx) throw new Error('useToast must be used within ToastProvider');
  return ctx;
}
