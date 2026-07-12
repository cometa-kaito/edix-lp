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
        <div className={styles.tagline}>教室設置型のサイネージで、学校の情報配信を無料に。</div>
        <nav className={styles.footerNav} aria-label="サイトナビゲーション">
          <Link href="/for-schools">学校の方</Link>
          <Link href="/for-advertisers">広告出稿</Link>
          <Link href="/about">実績</Link>
          <Link href="/faq">よくある質問</Link>
          <Link href="/contact">お問い合わせ</Link>
        </nav>
        <nav className={styles.legalNav} aria-label="法的書類">
          <Link href="/privacy">プライバシーポリシー</Link>
          <Link href="/tokutei">特定商取引法に基づく表記</Link>
        </nav>
        <div className={styles.companyMeta}>
          <span>株式会社Rebounder</span>
          <span className={styles.metaDivider} aria-hidden="true">／</span>
          <span>東京都文京区</span>
        </div>
        <div className={styles.copyright}>
          &copy; 2026 Rebounder Inc. All Rights Reserved.
        </div>
      </div>
    </footer>
  );
}
