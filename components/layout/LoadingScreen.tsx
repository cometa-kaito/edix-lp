'use client';

import { useEffect, useState } from 'react';

export default function LoadingScreen() {
  const [hidden, setHidden] = useState(false);
  const [removed, setRemoved] = useState(false);

  useEffect(() => {
    // Only show loading screen on first visit per session
    const alreadyVisited = sessionStorage.getItem('kimiterasu-visited');
    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    if (prefersReduced || alreadyVisited) {
      setRemoved(true);
      return;
    }

    sessionStorage.setItem('kimiterasu-visited', '1');

    const timer = setTimeout(() => {
      setHidden(true);
      setTimeout(() => setRemoved(true), 400);
    }, 800);

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
        <img src="/logo-full.png" alt="キミテラス" width={120} height={120} />
      </div>
    </div>
  );
}
