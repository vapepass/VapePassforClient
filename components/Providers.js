'use client';
import { ToastProvider } from '@/components/ui/Toast';
import { ComingSoonProvider } from '@/components/ComingSoonProvider';

export default function Providers({ children }) {
  return (
    <ComingSoonProvider>
      <ToastProvider>{children}</ToastProvider>
    </ComingSoonProvider>
  );
}
