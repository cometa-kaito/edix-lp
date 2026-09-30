'use client';

import { useId, useState } from 'react';
import SectionHeader from '@/components/ui/SectionHeader';
import FadeIn from '@/components/ui/FadeIn';
import { FAQ_ITEMS } from '@/lib/constants';
import type { FaqItem } from '@/lib/types';
import styles from '@/styles/sections/faq.module.css';

interface FaqProps {
  filter?: FaqItem['target'][];
}

const TARGET_LABELS: Record<string, { label: string; className: string }> = {
  school: { label: '学校', className: styles.targetSchool },
  biz: { label: '企業', className: styles.targetBiz },
  investor: { label: '投資家', className: styles.targetInvestor },
  all: { label: '全体', className: styles.targetAll },
};

// /faq（絞り込み無し）で出す切替。学校と企業で知りたいことが違うので、読み手が自分の分だけに絞れる
const VIEWS = [
  { key: 'all', label: 'すべて' },
  { key: 'school', label: '学校の方' },
  { key: 'biz', label: '広告主の方' },
] as const;
type ViewKey = (typeof VIEWS)[number]['key'];

export default function Faq({ filter }: FaqProps) {
  const [activeKey, setActiveKey] = useState<string | null>(null);
  const [view, setView] = useState<ViewKey>('all');
  const baseId = useId();

  // ページ側で絞り込み済み（学校ページ・広告主ページ）なら切替は出さない
  const showSwitch = !filter;
  const targets: FaqItem['target'][] | null = filter ?? (view === 'all' ? null : [view]);
  const items = targets ? FAQ_ITEMS.filter((item) => targets.includes(item.target)) : FAQ_ITEMS;
  // 1種類に絞れているときは「学校」「企業」バッジは情報にならないので出さない
  const showBadges = new Set(items.map((i) => i.target)).size > 1;

  // 表示順を維持しつつカテゴリでグループ化
  const groups = new Map<string, FaqItem[]>();
  items.forEach((item) => {
    const cat = item.category ?? 'その他';
    if (!groups.has(cat)) groups.set(cat, []);
    groups.get(cat)!.push(item);
  });

  const toggle = (key: string) => {
    setActiveKey(activeKey === key ? null : key);
  };

  return (
    <section className="section-padding" id="faq">
      <div className="container">
        <SectionHeader title="よくあるご質問" />
        {showSwitch && (
          <div className={styles.switch} role="group" aria-label="質問の絞り込み">
            {VIEWS.map((v) => (
              <button
                key={v.key}
                type="button"
                className={`${styles.switchBtn} ${view === v.key ? styles.switchOn : ''}`}
                aria-pressed={view === v.key}
                onClick={() => {
                  setView(v.key);
                  setActiveKey(null);
                }}
              >
                {v.label}
              </button>
            ))}
          </div>
        )}
        <FadeIn className={styles.list}>
          {Array.from(groups.entries()).map(([category, catItems]) => (
            <div key={category} className={styles.group}>
              <h3 className={styles.categoryHeader}>{category}</h3>
              {catItems.map((item, i) => {
                const target = TARGET_LABELS[item.target];
                const key = `${category}-${i}`;
                const isActive = activeKey === key;
                const qId = `${baseId}-q-${category}-${i}`;
                const aId = `${baseId}-a-${category}-${i}`;
                return (
                  <div key={key} className={`${styles.item} ${isActive ? styles.active : ''}`}>
                    {/* 以前は div の onClick で、キーボードで開けず開閉状態も伝わらなかった */}
                    <button
                      type="button"
                      id={qId}
                      className={styles.question}
                      aria-expanded={isActive}
                      aria-controls={aId}
                      onClick={() => toggle(key)}
                    >
                      <span className={styles.questionText}>
                        {showBadges && (
                          <span className={`${styles.targetBadge} ${target.className}`}>
                            {target.label}
                          </span>
                        )}
                        {item.question}
                      </span>
                      <svg className={styles.arrow} viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                        <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
                      </svg>
                    </button>
                    <div
                      id={aId}
                      role="region"
                      aria-labelledby={qId}
                      aria-hidden={!isActive}
                      className={styles.answer}
                      style={{ maxHeight: isActive ? 600 : 0 }}
                    >
                      <div className={styles.answerInner}>{item.answer}</div>
                    </div>
                  </div>
                );
              })}
            </div>
          ))}
        </FadeIn>
      </div>
    </section>
  );
}
