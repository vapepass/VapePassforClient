'use client';

const variants = {
  primary:
    'bg-brand-600 text-white hover:bg-brand-700 active:bg-brand-800 shadow-sm hover:shadow-brand focus-visible:ring-brand-500/30',
  secondary:
    'bg-surface text-ink border border-line hover:bg-canvas hover:border-[#d4d4dc] active:bg-line-subtle',
  outline:
    'bg-transparent text-brand-600 border border-brand-200 hover:bg-brand-50 active:bg-brand-100',
  ghost:
    'bg-transparent text-body hover:text-ink hover:bg-black/[0.04] active:bg-black/[0.06]',
  danger:
    'bg-danger-50 text-danger-600 border border-red-200 hover:bg-red-100 active:bg-red-200',
  dark:
    'bg-ink text-white hover:bg-[#1a1a24] active:bg-[#252530] shadow-sm',
};

const sizes = {
  sm: 'h-9 px-3.5 text-sm gap-1.5 rounded-lg',
  md: 'h-11 px-5 text-sm gap-2 rounded-xl',
  lg: 'h-12 px-6 text-base gap-2 rounded-xl',
  icon: 'h-11 w-11 p-0 rounded-xl',
};

export default function Button({
  children,
  variant = 'primary',
  size = 'md',
  className = '',
  disabled = false,
  type = 'button',
  as: Tag = 'button',
  ...props
}) {
  return (
    <Tag
      type={Tag === 'button' ? type : undefined}
      disabled={disabled}
      className={[
        'inline-flex items-center justify-center font-semibold',
        'transition-all duration-[var(--duration-fast)] ease-[var(--ease-out)]',
        'focus-visible:outline-none focus-visible:ring-[3px]',
        'disabled:opacity-50 disabled:pointer-events-none disabled:transform-none',
        'select-none touch-manipulation min-h-[44px]',
        size === 'icon' ? sizes.icon : sizes[size],
        variants[variant] || variants.primary,
        className,
      ].join(' ')}
      {...props}
    >
      {children}
    </Tag>
  );
}
