const variants = {
  default: 'bg-line-subtle text-body',
  brand: 'bg-brand-50 text-brand-700',
  success: 'bg-success-50 text-success-600',
  warning: 'bg-warning-50 text-warning-600',
  danger: 'bg-danger-50 text-danger-600',
  active: 'bg-success-50 text-success-600',
  rewarded: 'bg-warning-50 text-warning-600',
};

export default function Badge({ children, variant = 'default', className = '' }) {
  const resolved = variants[variant] || variants[variant?.toLowerCase?.()] || variants.default;
  return (
    <span
      className={[
        'inline-flex items-center px-2.5 py-0.5 rounded-full',
        'text-xs font-semibold tracking-wide',
        resolved,
        className,
      ].join(' ')}
    >
      {children}
    </span>
  );
}
