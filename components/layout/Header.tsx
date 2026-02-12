import Link from 'next/link';
import { NAV_LINKS } from '@/lib/constants';
import MobileNav from './MobileNav';
import styles from '@/styles/sections/header.module.css';

export default function Header() {
  return (
    <>
      <header className={styles.header} id="header">
        <div className={styles.headerInner}>
          <Link href="/" className={styles.logo}>
            Edi<span className={styles.logoAccent}>x</span>
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
