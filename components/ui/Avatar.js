export default function Avatar({ name, src, size = 'md', color, className = '' }) {
  const sizes = {
    sm: 'w-8 h-8 text-xs',
    md: 'w-10 h-10 text-sm',
    lg: 'w-12 h-12 text-base',
    xl: 'w-16 h-16 text-xl',
  };
  const initial = name?.charAt(0)?.toUpperCase() || '?';

  if (src) {
    return (
      <img
        src={src}
        alt={name ? `${name}'s avatar` : 'Avatar'}
        className={[
          'rounded-full object-cover flex-shrink-0',
          sizes[size] || sizes.md,
          className,
        ].join(' ')}
        loading="lazy"
      />
    );
  }

  return (
    <div
      className={[
        'rounded-full flex items-center justify-center font-bold text-white flex-shrink-0',
        !color && 'gradient-brand',
        sizes[size] || sizes.md,
        className,
      ].join(' ')}
      style={color ? { background: color } : undefined}
      aria-hidden={!name}
    >
      {initial}
    </div>
  );
}
