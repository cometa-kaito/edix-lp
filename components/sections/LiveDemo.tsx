'use client';

import { useEffect, useRef, useState } from 'react';
import SectionHeader from '@/components/ui/SectionHeader';
import FadeIn from '@/components/ui/FadeIn';
import { DEMO_URL } from '@/lib/constants';
import styles from '@/styles/sections/demo.module.css';

export default function LiveDemo() {
  const iframeRef = useRef<HTMLIFrameElement>(null);
  const [loaded, setLoaded] = useState(false);
  const [error, setError] = useState(false);

  useEffect(() => {
    const iframe = iframeRef.current;
    if (!iframe || !('IntersectionObserver' in window)) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            iframe.src = DEMO_URL;
            observer.unobserve(entry.target);
          }
        });
      },
      { rootMargin: '200px' }
    );

    observer.observe(iframe);

    return () => observer.disconnect();
  }, []);

  return (
    <section className={styles.section} id="demo">
      <div className="container">
        <SectionHeader
          label="Live Demo"
          title="実際に動いているサイネージ画面をご覧ください"
          labelColor="#22C55E"
          titleColor="#fff"
        />
        <FadeIn className={styles.wrapper}>
          <div className={styles.demoHeader}>
            <div className={styles.liveDot} />
            <span className={styles.demoLabel}>LIVE DEMO - 実証実験中のサイネージ画面</span>
          </div>
          <div className={styles.monitorFrame}>
            <iframe
              ref={iframeRef}
              src="about:blank"
              title="Edix サイネージ ライブデモ"
              loading="lazy"
              allow="autoplay"
              className={styles.iframe}
              onLoad={() => setLoaded(true)}
              onError={() => setError(true)}
            />
            {error && (
              <div className={styles.fallback} style={{ display: 'block' }}>
                <p className={styles.fallbackText}>デモ画面の読み込みに失敗しました</p>
                <a href={DEMO_URL} target="_blank" rel="noopener" className="btn btn-white">
                  実際のデモはこちら →
                </a>
              </div>
            )}
          </div>
          <div className={styles.notes}>
            <p className={styles.note}>※ 岐南工業高等学校で実際に稼働中のシステムです</p>
            <p className={styles.note}>※ データはリアルタイムで更新されます</p>
          </div>
        </FadeIn>
      </div>
    </section>
  );
}
