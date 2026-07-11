'use client';

import { ShieldAlert } from 'lucide-react';
import { SESSION_LOCKED_LABEL } from './conversation';

export default function SessionLockedBar() {
  return (
    <div
      className="sommelier-session-locked px-3.5 py-3 bg-[#fef2f2] border-t border-[#fecaca] shrink-0"
      role="status"
      aria-live="assertive"
    >
      <div className="flex items-center justify-center gap-2">
        <ShieldAlert size={15} className="text-[#dc2626] shrink-0" aria-hidden="true" />
        <p className="text-[13px] font-semibold text-[#dc2626] tracking-[-0.01em]">
          {SESSION_LOCKED_LABEL}
        </p>
      </div>
    </div>
  );
}
