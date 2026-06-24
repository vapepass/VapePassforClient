export function Card({ children, className = '', hover = false, padding = true, ...props }) {
  return (
    <div
      className={[
        'bg-surface rounded-2xl border border-line shadow-xs',
        hover && 'transition-all duration-[var(--duration-normal)] hover:shadow-md hover:border-[#d8d9e0] hover:-translate-y-0.5',
        padding && 'p-6',
        className,
      ].filter(Boolean).join(' ')}
      {...props}
    >
      {children}
    </div>
  );
}

export function CardHeader({ children, className = '' }) {
  return <div className={`mb-5 ${className}`}>{children}</div>;
}

export function CardTitle({ children, className = '' }) {
  return <h3 className={`text-base font-semibold text-ink tracking-tight ${className}`}>{children}</h3>;
}

export function CardDescription({ children, className = '' }) {
  return <p className={`text-sm text-body mt-1 ${className}`}>{children}</p>;
}
