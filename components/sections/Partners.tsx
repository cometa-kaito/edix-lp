import Image from 'next/image';
import SectionHeader from '@/components/ui/SectionHeader';
import { PARTNER_COMPANIES } from '@/lib/constants';
import styles from '@/styles/sections/partners.module.css';

// ループを継ぎ目なく見せるため同一リストを3周分並べる（2周目以降は読み上げ対象外）
function LogoGroup({ dup }: { dup?: boolean }) {
  return (
    <ul
      className={dup ? `${styles.group} ${styles.dup}` : styles.group}
      aria-hidden={dup || undefined}
    >
      {PARTNER_COMPANIES.map((partner) => (
        <li key={partner.name} className={styles.item}>
          {partner.logoSrc ? (
            <Image
              src={partner.logoSrc}
              alt={partner.name}
              width={partner.logoWidth ?? 160}
              height={partner.logoHeight ?? 40}
              className={styles.logo}
            />
          ) : (
            <span className={styles.name}>{partner.name}</span>
          )}
        </li>
      ))}
    </ul>
  );
}

export default function Partners() {
  return (
    <section className="section-padding" id="partners">
      <div className="container">
        <SectionHeader
          label="Partners"
          title="取引先企業"
          subtitle="キミテラスに広告を掲載いただいている企業の皆さまです（順不同・一部）。"
        />
        <div className={styles.marquee}>
          <div className={styles.track}>
            <LogoGroup />
            <LogoGroup dup />
            <LogoGroup dup />
          </div>
        </div>
      </div>
    </section>
  );
}
