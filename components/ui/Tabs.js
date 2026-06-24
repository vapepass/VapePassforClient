'use client';

export default function Tabs({ tabs, active, onChange, className = '' }) {
  return (
    <div
      role="tablist"
      aria-label="Settings sections"
      className={[
        'inline-flex gap-1 p-1 rounded-xl bg-canvas border border-line flex-wrap',
        className,
      ].join(' ')}
    >
      {tabs.map((tab) => {
        const isActive = active === tab.id;
        return (
          <button
            key={tab.id}
            role="tab"
            aria-selected={isActive}
            onClick={() => onChange(tab.id)}
            className={[
              'px-4 py-2.5 rounded-lg text-sm font-medium transition-all duration-[var(--duration-fast)]',
              'min-h-[44px] touch-manipulation',
              isActive
                ? 'bg-surface text-ink shadow-xs'
                : 'text-body hover:text-ink hover:bg-surface/60',
            ].join(' ')}
          >
            {tab.label}
          </button>
        );
      })}
    </div>
  );
}

export function FilterPills({ options, active, onChange }) {
  return (
    <div className="flex items-center gap-2 flex-wrap" role="group" aria-label="Filter options">
      {options.map((opt) => {
        const isActive = active === opt.id;
        return (
          <button
            key={opt.id}
            onClick={() => onChange(opt.id)}
            className={[
              'px-3.5 py-2 rounded-full text-xs font-semibold transition-all min-h-[36px]',
              isActive
                ? 'bg-brand-600 text-white shadow-sm'
                : 'bg-surface text-body border border-line hover:border-[#d4d4dc] hover:text-ink',
            ].join(' ')}
          >
            {opt.label}
          </button>
        );
      })}
    </div>
  );
}
