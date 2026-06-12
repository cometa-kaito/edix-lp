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
      // reduced-motion でも訪問フラグは立てる（inline script の再訪非表示を効かせる）
      sessionStorage.setItem('kimiterasu-visited', '1');
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
    <>
      <div id="loading-screen" className={`loading-screen ${hidden ? 'hidden' : ''}`} suppressHydrationWarning>
        <div className="loading-logo">
          <img src="/logo-full.png" alt="キミテラス" width={120} height={120} />
        </div>
      </div>
      {/* 再訪時はhydration前の白フラッシュを出さない（ペイント前に同期で判定） */}
      <script
        dangerouslySetInnerHTML={{
          __html:
            "try{if(sessionStorage.getItem('kimiterasu-visited')){var e=document.getElementById('loading-screen');if(e)e.style.display='none';}}catch(_){}",
        }}
      />
    </>
  );
}
