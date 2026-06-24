export default function Skeleton({ className = '', ...props }) {
  return (
    <div
      className={[
        'rounded-lg bg-gradient-to-r from-line-subtle via-line to-line-subtle',
        'bg-[length:200%_100%] animate-shimmer',
        className,
      ].join(' ')}
      aria-hidden="true"
      {...props}
    />
  );
}

export function SkeletonCard() {
  return (
    <div className="bg-surface rounded-2xl border border-line p-6 space-y-4">
      <Skeleton className="h-4 w-1/3" />
      <Skeleton className="h-8 w-1/2" />
      <Skeleton className="h-3 w-2/3" />
    </div>
  );
}

export function SkeletonTable({ rows = 5 }) {
  return (
    <div className="space-y-3">
      {Array.from({ length: rows }).map((_, i) => (
        <Skeleton key={i} className="h-14 w-full rounded-xl" />
      ))}
    </div>
  );
}
