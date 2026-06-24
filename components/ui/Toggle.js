'use client';

export default function Toggle({ checked, onChange, label, id }) {
  const toggleId = id || 'toggle';
  return (
    <button
      id={toggleId}
      role="switch"
      aria-checked={checked}
      aria-label={label}
      onClick={() => onChange(!checked)}
      className={[
        'relative w-11 h-6 rounded-full transition-colors duration-[var(--duration-fast)] flex-shrink-0',
        'focus-visible:outline-none focus-visible:ring-[3px] focus-visible:ring-brand-500/30',
        checked ? 'bg-brand-600' : 'bg-line',
      ].join(' ')}
    >
      <span
        className={[
          'absolute top-0.5 left-0.5 w-5 h-5 rounded-full bg-white shadow-sm',
          'transition-transform duration-[var(--duration-fast)] ease-[var(--ease-out)]',
          checked ? 'translate-x-5' : 'translate-x-0',
        ].join(' ')}
      />
    </button>
  );
}
