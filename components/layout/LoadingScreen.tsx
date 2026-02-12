'use client';

import { useEffect, useState } from 'react';

export default function LoadingScreen() {
  const [hidden, setHidden] = useState(false);
  const [removed, setRemoved] = useState(false);

  useEffect(() => {
    // Check prefers-reduced-motion
    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReduced) {
      setRemoved(true);
      return;
    }

    const timer = setTimeout(() => {
      setHidden(true);
      setTimeout(() => setRemoved(true), 400);
    }, 800);

    // Fallback: force hide after 3s
    const fallback = setTimeout(() => {
      setHidden(true);
      setTimeout(() => setRemoved(true), 400);
    }, 3000);

    return () => {
      clearTimeout(timer);
      clearTimeout(fallback);
    };
  }, []);

  if (removed) return null;

  return (
    <div className={`loading-screen ${hidden ? 'hidden' : ''}`}>
      <div className="loading-logo">
        Edi<span>x</span>
      </div>
    </div>
  );
}
