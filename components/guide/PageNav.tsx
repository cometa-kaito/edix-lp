import Link from 'next/link';
import styles from '@/styles/sections/guide.module.css';

interface PageNavProps {
  prev?: { label: string; href: string };
  next?: { label: string; href: string };
}

export default function PageNav({ prev, next }: PageNavProps) {
  return (
    <div className={styles.pageNav}>
      {prev ? (
        <Link href={prev.href} className={styles.navBtn}>
          ← {prev.label}
        </Link>
      ) : <span />}
      {next ? (
        <Link href={next.href} className={`${styles.navBtn} ${styles.primary}`}>
          {next.label} →
        </Link>
      ) : <span />}
    </div>
  );
}
