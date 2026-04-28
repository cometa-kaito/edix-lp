import Link from 'next/link';
import Image from 'next/image';
import styles from '@/styles/sections/footer.module.css';

export default function Footer() {
  return (
    <footer className={styles.footer}>
      <div className="container">
        <div className={styles.logo}>
          <Image src="/logo-text.png" alt="キミテラス" width={160} height={42} />
        </div>
        <div className={styles.tagline}>School DX Platform — Designed for the Future of Education</div>
        <nav className={styles.footerNav}>
          <Link href="/for-schools">学校の方</Link>
          <Link href="/for-advertisers">広告出稿</Link>
          <Link href="/about">実績</Link>
          <Link href="/faq">よくある質問</Link>
          <Link href="/contact">お問い合わせ</Link>
        </nav>
        <div className={styles.copyright}>
          &copy; 2026 Rebounder Inc. All Rights Reserved.
        </div>
      </div>
    </footer>
  );
}
