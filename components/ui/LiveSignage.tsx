'use client';

import { useEffect, useState } from 'react';
import { ShieldCheckIcon } from '@/components/ui/Icon';
import styles from '@/styles/sections/live-signage.module.css';

interface LiveSignageProps {
  /** ページごとに最初に見せたい場面（広告主ページ=放課後の場面から） */
  startIndex?: number;
}

const SCENE_MS = 4200;
const AD_MS = 3400;

/** 実運用サイネージと同じ「右 1/3 の広告枠」に載せる、岐南工業 電子工学科で実際に配信中の地元企業。
 *  出典 = キミテラス v2 の岐南広告ロスター（packages/db seed-ginan-ads / add-usjc）。
 *  LP に社名を公開できる取引先 5 社のみ（日本クロージャー=停止中／アピ=非公開 は載せない）。
 *  クリエイティブ画像は掲載許諾が社名テキストに限られるため、実データ（社名・業種）で枠を再現する。 */
const ADS = [
  { name: '京三エレコス株式会社', industry: '鉄道信号システムの工事・保守', group: '京三製作所グループ' },
  { name: '株式会社シーテック', industry: '電気・通信・土木・再生可能エネルギー', group: '中部電力グループ' },
  { name: '株式会社ギフ加藤製作所', industry: '精密加工・自動車制御機器部品の製造', group: null },
  { name: 'トーカイテック株式会社', industry: '東海道新幹線の電気設備保守', group: null },
  { name: 'USJC', industry: '半導体ファウンドリ', group: 'UMC グループ' },
] as const;

/** 教室の一日（朝→昼→放課後）を3場面でローテーションする製品デモ。
 *  校内連絡は表示イメージ（誇大な数値は使わない）。右枠の広告は実配信中の地元企業を再現。 */
const SCENES = [
  {
    time: '8:25 朝のHR',
    body: (
      <>
        <div className={styles.blockLabel}>連絡事項</div>
        <div className={`${styles.noticeCard} ${styles.noticeHot}`}>3限 体育 → 体育館に変更</div>
        <div className={styles.noticeCard}>進路説明会 14:00（土）</div>
        <div className={styles.blockLabel}>提出物</div>
        <div className={styles.noticeCard}>実習レポート — 明日まで</div>
      </>
    ),
  },
  {
    time: '10:35 休み時間',
    body: (
      <>
        <div className={styles.blockLabel}>行事</div>
        <div className={styles.countdown}>
          <span className={styles.countdownNum}>35</span>
          <span className={styles.countdownUnit}>日</span>
          <span className={styles.countdownLabel}>文化祭まで</span>
        </div>
        <div className={styles.noticeCard}>実行委員は放課後 視聴覚室へ</div>
        <div className={styles.blockLabel}>進路</div>
        <div className={styles.noticeCard}>オープンキャンパス 申込は今週中</div>
      </>
    ),
  },
  {
    time: '15:40 放課後',
    body: (
      <>
        <div className={styles.blockLabel}>連絡事項</div>
        <div className={styles.noticeCard}>明日の持ち物: 実習服</div>
        <div className={styles.blockLabel}>部活動</div>
        <div className={styles.noticeCard}>電子研究部 → CAD室</div>
        <div className={styles.noticeCard}>完全下校 17:30</div>
      </>
    ),
  },
];

export default function LiveSignage({ startIndex = 0 }: LiveSignageProps) {
  const total = SCENES.length;
  const [active, setActive] = useState(() => ((startIndex % total) + total) % total);
  const [adActive, setAdActive] = useState(0);
  // WCAG 2.2.2: hover/focus 中はローテーションを一時停止できる
  const [paused, setPaused] = useState(false);

  useEffect(() => {
    if (paused) return;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    const scene = setInterval(() => setActive((a) => (a + 1) % total), SCENE_MS);
    const ad = setInterval(() => setAdActive((a) => (a + 1) % ADS.length), AD_MS);
    return () => {
      clearInterval(scene);
      clearInterval(ad);
    };
  }, [total, paused]);

  return (
    <div
      className={styles.wrap}
      role="img"
      aria-label="教室サイネージの表示イメージ。左側に校内連絡・時間割・行事が切り替わって表示され、右側の枠には岐南工業高校で実際に配信中の地元企業（京三エレコス・シーテック・ギフ加藤製作所・トーカイテック・USJC）の審査済み広告がローテーションで表示されます"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      onFocus={() => setPaused(true)}
      onBlur={() => setPaused(false)}
    >
      <div className={styles.frame}>
        <div className={styles.screen}>
          <div className={styles.screenBody}>
            {/* 左 2/3: 校内連絡（場面クロスフェード） */}
            <div className={styles.contentZone}>
              <div className={styles.sceneStack}>
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
                    <div className={styles.sceneBody}>{scene.body}</div>
                  </div>
                ))}
              </div>
              <div className={styles.ticker}>
                <span className={styles.tickerText}>
                  3限 体育は体育館 ・ 実習レポートは明日まで ・ 文化祭まであと35日 ・ オープンキャンパス申込は今週中
                </span>
              </div>
            </div>

            {/* 右 1/3: 広告枠（実配信中の地元企業をローテーション） */}
            <aside className={styles.adZone} aria-hidden="true">
              <span className={styles.adZoneLabel}>広告</span>
              <div className={styles.adStack}>
                {ADS.map((ad, i) => (
                  <div
                    key={ad.name}
                    className={`${styles.adCard} ${i === adActive ? styles.adCardActive : ''}`}
                  >
                    <div className={styles.adCardTop}>
                      <span className={styles.adKicker}>地元企業・採用</span>
                      <span className={styles.adChecked}>
                        <ShieldCheckIcon size={11} strokeWidth={2.4} />
                        審査済み
                      </span>
                    </div>
                    <div className={styles.adCardBody}>
                      <span className={styles.adCompany}>{ad.name}</span>
                      <span className={styles.adIndustry}>{ad.industry}</span>
                      {ad.group ? <span className={styles.adGroup}>{ad.group}</span> : null}
                    </div>
                    <div className={styles.adCardFoot}>
                      <span className={styles.adQr}>QR</span>
                      <span className={styles.adCta}>詳しくはこちら</span>
                    </div>
                  </div>
                ))}
              </div>
              <div className={styles.adDots}>
                {ADS.map((ad, i) => (
                  <span
                    key={ad.name}
                    className={i === adActive ? styles.adDotActive : styles.adDot}
                  />
                ))}
              </div>
            </aside>
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
      <span className={`${styles.chip} ${styles.chipSpeed}`}>校内連絡が主役・広告は右枠だけ</span>
    </div>
  );
}
