'use client';

import { useState } from 'react';
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

export default function Faq({ filter }: FaqProps) {
  const [activeKey, setActiveKey] = useState<string | null>(null);

  const items = filter
    ? FAQ_ITEMS.filter((item) => filter.includes(item.target))
    : FAQ_ITEMS;

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
    <section className="section-padding bg-alt" id="faq">
      <div className="container">
        <SectionHeader title="よくあるご質問" />
        <FadeIn className={styles.list}>
          {Array.from(groups.entries()).map(([category, catItems]) => (
            <div key={category} className={styles.group}>
              <h3 className={styles.categoryHeader}>{category}</h3>
              {catItems.map((item, i) => {
                const target = TARGET_LABELS[item.target];
                const key = `${category}-${i}`;
                const isActive = activeKey === key;
                return (
                  <div key={key} className={`${styles.item} ${isActive ? styles.active : ''}`}>
                    <div className={styles.question} onClick={() => toggle(key)}>
                      <div>
                        <span className={`${styles.targetBadge} ${target.className}`}>
                          {target.label}
                        </span>
                        {item.question}
                      </div>
                      <svg className={styles.arrow} viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
                      </svg>
                    </div>
                    <div
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
