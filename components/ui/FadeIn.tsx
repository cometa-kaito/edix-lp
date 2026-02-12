'use client';

import { useEffect, useRef } from 'react';

interface FadeInProps {
  children: React.ReactNode;
  className?: string;
  as?: keyof React.JSX.IntrinsicElements;
  id?: string;
  style?: React.CSSProperties;
}

export default function FadeIn({ children, className = '', as: Tag = 'div', id, style }: FadeInProps) {
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    if (!('IntersectionObserver' in window)) {
      el.classList.add('visible');
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('visible');
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.05, rootMargin: '50px 0px -20px 0px' }
    );

    requestAnimationFrame(() => observer.observe(el));

    return () => observer.disconnect();
  }, []);

  const Component = Tag as any;

  return (
    <Component ref={ref} className={`fade-in ${className}`} id={id} style={style}>
      {children}
    </Component>
  );
}
