'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { NAV_LINKS } from '@/lib/constants';
import styles from '@/styles/sections/header.module.css';

// 現在地の判定。ページ内リンク（/#features）は対象外。
// 「広告出稿」は出稿ガイド（/for-advertisers/guide…）では点けない（ガイドは別項目があるため）
export function isCurrentNav(href: string, pathname: string): boolean {
  if (href.includes('#')) return false;
  if (href === '/for-advertisers') return pathname === '/for-advertisers';
  return pathname === href || pathname.startsWith(`${href}/`);
}

// PC ヘッダーのナビ。以前は「広告出稿」だけが常にオレンジのピルで、
// /for-schools にいても広告出稿が選択中に見えていた。現在地は下線で示す
export default function NavLinks() {
  const pathname = usePathname() || '/';
  return (
    <>
      {NAV_LINKS.map((link) => {
        const current = isCurrentNav(link.href, pathname);
        return (
          <Link
            key={link.href}
            href={link.href}
            aria-current={current ? 'page' : undefined}
            className={`${link.highlight ? styles.navHighlight : styles.navLink}${
              current ? ` ${styles.navCurrent}` : ''
            }`}
          >
            {link.label}
          </Link>
        );
      })}
    </>
  );
}
