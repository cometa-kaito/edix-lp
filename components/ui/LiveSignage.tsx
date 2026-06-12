'use client';

import { useEffect, useState } from 'react';
import styles from '@/styles/sections/live-signage.module.css';

interface LiveSignageProps {
  /** ページごとに最初に見せたい場面（広告主ページ=広告の場面から） */
  startIndex?: number;
}

const ROTATE_MS = 4200;

/** 教室の一日（朝→昼→放課後）を3場面でローテーションする製品デモ。
 *  実データではなく表示イメージ。誇大な数値・実在企業名は使わない。 */
const SCENES = [
  {
    time: '8:25 朝のHR',
    body: (
      <>
        <div className={styles.colMain}>
          <div className={styles.blockLabel}>連絡事項</div>
          <div className={`${styles.noticeCard} ${styles.noticeHot}`}>3限 体育 → 体育館に変更</div>
          <div className={styles.noticeCard}>6/20（土）進路説明会 14:00</div>
          <div className={styles.blockLabel}>提出物</div>
          <div className={styles.noticeCard}>実習レポート — 明日まで</div>
        </div>
        <div className={styles.colSide}>
          <div className={styles.blockLabel}>今日の時間割</div>
          <table className={styles.timetable} aria-hidden="true">
            <tbody>
              <tr><th>1</th><td>数学Ⅰ</td></tr>
              <tr><th>2</th><td>電子実習</td></tr>
              <tr className={styles.timetableHot}><th>3</th><td>体育（体育館）</td></tr>
              <tr><th>4</th><td>英語</td></tr>
            </tbody>
          </table>
        </div>
      </>
    ),
  },
  {
    time: '10:35 休み時間',
    body: (
      <>
        <div className={styles.colMain}>
          <div className={styles.blockLabel}>行事</div>
          <div className={styles.countdown}>
            <span className={styles.countdownNum}>35</span>
            <span className={styles.countdownUnit}>日</span>
            <span className={styles.countdownLabel}>文化祭まで</span>
          </div>
          <div className={styles.noticeCard}>実行委員は放課後 視聴覚室へ</div>
          <div className={styles.noticeCard}>4限は移動教室（CAD室）</div>
        </div>
        <div className={styles.colSide}>
          <div className={styles.blockLabel}>進路</div>
          <div className={styles.noticeCard}>岐阜高専 オープンキャンパス<br />申込は今週中</div>
          <div className={styles.noticeCard}>求人票の閲覧は進路指導室で</div>
          <div className={styles.noticeCard}>三者懇談 希望調査 6/18まで</div>
        </div>
      </>
    ),
  },
  {
    time: '15:40 放課後',
    body: (
      <>
        <div className={styles.colMain}>
          <div className={styles.blockLabel}>連絡事項</div>
          <div className={styles.noticeCard}>明日の持ち物: 実習服</div>
          <div className={styles.noticeCard}>部活動は17:30 完全下校</div>
          <div className={styles.coexistNote}>校内連絡が主役。広告は枠の中だけ・音声OFF</div>
        </div>
        <div className={`${styles.colSide} ${styles.adSlot}`}>
          <span className={styles.adBadge}>広告・審査済み</span>
          <span className={styles.adCopy}>地元で働く、<br />ものづくりの先輩。</span>
          <span className={styles.adMeta}>地元企業の採用情報</span>
          <span className={styles.adQr} aria-hidden="true">QR</span>
        </div>
      </>
    ),
  },
];

export default function LiveSignage({ startIndex = 0 }: LiveSignageProps) {
  const total = SCENES.length;
  const [active, setActive] = useState(() => ((startIndex % total) + total) % total);
  // WCAG 2.2.2: hover/focus 中はローテーションを一時停止できる
  const [paused, setPaused] = useState(false);

  useEffect(() => {
    if (paused) return;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    const id = setInterval(() => setActive((a) => (a + 1) % total), ROTATE_MS);
    return () => clearInterval(id);
  }, [total, paused]);

  return (
    <div
      className={styles.wrap}
      role="img"
      aria-label="教室サイネージの表示イメージ。校内連絡・時間割・行事と、審査済みの企業広告が切り替わって表示されます"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      onFocus={() => setPaused(true)}
      onBlur={() => setPaused(false)}
    >
      <div className={styles.frame}>
        <div className={styles.screen}>
          <div className={styles.screenBody}>
            {SCENES.map((scene, i) => (
              <div
                key={i}
                className={`${styles.scene} ${i === active ? styles.sceneActive : ''}`}
                aria-hidden={i !== active}
              >
                <div className={styles.screenHeader}>
                  <span>{scene.time}</span>
                  <span>1年A組</span>
                </div>
                <div className={styles.sceneGrid}>{scene.body}</div>
              </div>
            ))}
          </div>
          <div className={styles.ticker}>
            <span className={styles.tickerText}>
              3限 体育は体育館 ・ 実習レポートは明日まで ・ 文化祭まであと35日 ・ オープンキャンパス申込は今週中
            </span>
          </div>
        </div>
        <div className={styles.dots} aria-hidden="true">
          {SCENES.map((_, i) => (
            <span key={i} className={i === active ? styles.dotActive : styles.dot} />
          ))}
        </div>
      </div>
      <span className={`${styles.chip} ${styles.chipLive}`}>
        <span className={styles.liveDot} aria-hidden="true" />
        いま教室に配信中
      </span>
      <span className={`${styles.chip} ${styles.chipSpeed}`}>先生の入力は最短10秒</span>
    </div>
  );
}
