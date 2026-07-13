import Image from 'next/image';
import { PARTNER_COMPANIES } from '@/lib/constants';
import styles from '@/styles/sections/partners-strip.module.css';

// ヒーロー直下のコンパクトなロゴ帯（ファーストビュー内に取引先を出す）。
// 詳細な見出し付きセクションは別途 Partners を下部に置く。
export default function PartnersStrip() {
  return (
    <section className={styles.strip} aria-label="取引先企業">
      <div className={`container ${styles.inner}`}>
        <span className={styles.label}>取引先企業</span>
        <ul className={styles.logos}>
          {PARTNER_COMPANIES.map((partner) => {
            const content = partner.logoSrc ? (
              <Image
                src={partner.logoSrc}
                alt={partner.name}
                width={partner.logoWidth ?? 160}
                height={partner.logoHeight ?? 40}
                className={styles.logo}
              />
            ) : (
              <span className={styles.name}>{partner.name}</span>
            );
            return (
              <li key={partner.name}>
                {partner.url ? (
                  <a
                    href={partner.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={styles.link}
                    aria-label={`${partner.name}のサイトを開く（新しいタブ）`}
                  >
                    {content}
                  </a>
                ) : (
                  content
                )}
              </li>
            );
          })}
        </ul>
      </div>
    </section>
  );
}
