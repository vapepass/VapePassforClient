export default function Spinner({ size = 'md', className = '' }) {
  const sizes = { sm: 'w-5 h-5', md: 'w-8 h-8', lg: 'w-12 h-12' };
  return (
    <div
      role="status"
      aria-label="Loading"
      className={[
        sizes[size] || sizes.md,
        'rounded-full border-2 border-brand-200 border-t-brand-600 animate-spin',
        className,
      ].join(' ')}
    />
  );
}

export function SpinnerOverlay({ label = 'Loading…' }) {
  return (
    <div className="flex flex-col items-center justify-center gap-3 py-12">
      <Spinner size="lg" />
      <p className="text-sm text-body">{label}</p>
    </div>
  );
}
