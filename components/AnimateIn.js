'use client';

import { useEffect, useRef, useState } from 'react';

const ANIMATION_CLASS = {
  'fade-in': 'animate-fade-in',
  'slide-up': 'animate-slide-up',
  'slide-down': 'animate-slide-down',
  'scale-in': 'animate-scale-in',
};

export default function AnimateIn({
  children,
  className = '',
  animation = 'slide-up',
  delay = 0,
  duration = 500,
  once = true,
  immediate = false,
  as: Component = 'div',
  ...props
}) {
  const ref = useRef(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (immediate) {
      const timer = setTimeout(() => setVisible(true), 50);
      return () => clearTimeout(timer);
    }

    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          if (once) observer.unobserve(el);
        } else if (!once) {
          setVisible(false);
        }
      },
      { threshold: 0.12, rootMargin: '0px 0px -32px 0px' },
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [immediate, once]);

  return (
    <Component
      ref={ref}
      className={[
        className,
        visible ? ANIMATION_CLASS[animation] : 'opacity-0',
      ].filter(Boolean).join(' ')}
      style={{
        animationDelay: visible ? `${delay}ms` : undefined,
        animationDuration: `${duration}ms`,
        animationFillMode: 'both',
      }}
      {...props}
    >
      {children}
    </Component>
  );
}
