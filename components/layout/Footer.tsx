import Image from 'next/image';
import styles from '@/styles/sections/footer.module.css';

export default function Footer() {
  return (
    <footer className={styles.footer}>
      <div className="container">
        <div className={styles.logo}>
          <Image src="/logo-text.png" alt="キミテラス" width={160} height={42} style={{ filter: 'brightness(1.8)' }} />
        </div>
        <div className={styles.tagline}>School DX Platform — Designed for the Future of Education</div>
        <div className={styles.copyright}>
          &copy; 2026 Rebounder Inc. All Rights Reserved.
        </div>
      </div>
    </footer>
  );
}
