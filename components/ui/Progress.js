export default function Progress({ value, max = 100, size = 'md', variant = 'brand', showLabel = false, className = '' }) {
  const pct = Math.min(Math.max((value / max) * 100, 0), 100);
  const complete = pct >= 100;

  const heights = { sm: 'h-1.5', md: 'h-2', lg: 'h-3' };
  const colors = {
    brand: complete ? 'bg-warning-500' : 'bg-brand-600',
    success: 'bg-success-500',
    warning: 'bg-warning-500',
  };

  return (
    <div className={className}>
      {showLabel && (
        <div className="flex justify-between mb-2 text-sm">
          <span className="text-body">Progress</span>
          <span className="font-semibold text-ink">{value}/{max}</span>
        </div>
      )}
      <div
        className={['w-full rounded-full bg-line-subtle overflow-hidden', heights[size] || heights.md].join(' ')}
        role="progressbar"
        aria-valuenow={value}
        aria-valuemin={0}
        aria-valuemax={max}
      >
        <div
          className={[
            'h-full rounded-full transition-all duration-500 ease-[var(--ease-out)]',
            colors[variant] || colors.brand,
          ].join(' ')}
          style={{ width: `${pct}%`, transform: 'translateZ(0)' }}
        />
      </div>
    </div>
  );
}

export function StampProgress({ stamps, goal }) {
  return (
    <div className="flex items-center gap-2">
      <Progress value={stamps} max={goal} size="sm" className="w-16" />
      <span className="text-xs text-body tabular-nums">{stamps}/{goal}</span>
    </div>
  );
}
