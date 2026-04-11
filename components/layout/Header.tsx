import Link from 'next/link';
import Image from 'next/image';
import { NAV_LINKS } from '@/lib/constants';
import MobileNav from './MobileNav';
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
            {NAV_LINKS.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={link.highlight ? styles.navHighlight : styles.navLink}
              >
                {link.label}
              </Link>
            ))}
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
