import Link from 'next/link';
import Image from 'next/image';
import MobileNav from './MobileNav';
import NavLinks from './NavLinks';
import styles from '@/styles/sections/header.module.css';

export default function Header() {
  return (
    <>
      <header className={styles.header} id="header">
        <div className={styles.headerInner}>
          <Link href="/" className={styles.logo}>
            <Image src="/logo-text.png" alt="キミテラス" width={140} height={36} priority />
          </Link>
          <nav className={styles.navLinks}>
            <NavLinks />
            <Link href="/contact" className={`btn btn-primary ${styles.headerCta}`}>
              お問い合わせ
            </Link>
          </nav>
          <MobileNav />
        </div>
      </header>
    </>
  );
}
