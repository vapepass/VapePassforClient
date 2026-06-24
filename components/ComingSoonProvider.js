'use client';

import { createContext, useCallback, useContext, useState } from 'react';
import ComingSoonModal from './ComingSoonModal';

const ComingSoonContext = createContext(null);

export function ComingSoonProvider({ children }) {
  const [open, setOpen] = useState(false);

  const openComingSoon = useCallback(() => setOpen(true), []);
  const closeComingSoon = useCallback(() => setOpen(false), []);

  return (
    <ComingSoonContext.Provider value={{ openComingSoon, closeComingSoon, isOpen: open }}>
      {children}
      <ComingSoonModal open={open} onClose={closeComingSoon} />
    </ComingSoonContext.Provider>
  );
}

export function useComingSoon() {
  const ctx = useContext(ComingSoonContext);
  if (!ctx) {
    throw new Error('useComingSoon must be used within ComingSoonProvider');
  }
  return ctx;
}

/** Button or link that opens the coming soon modal instead of navigating to auth */
export function AuthGate({ children, className = '', as: Tag = 'button', ...props }) {
  const { openComingSoon } = useComingSoon();

  const handleClick = (e) => {
    e.preventDefault();
    openComingSoon();
  };

  if (Tag === 'button') {
    return (
      <button type="button" onClick={handleClick} className={className} {...props}>
        {children}
      </button>
    );
  }

  return (
    <a href="#" onClick={handleClick} className={className} {...props}>
      {children}
    </a>
  );
}
