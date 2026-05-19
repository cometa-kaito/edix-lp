import Link from 'next/link';
import styles from '@/styles/sections/guide.module.css';

interface Crumb {
  label: string;
  href?: string;
}

interface GuideShellProps {
  eyebrow?: string;
  title: string;
  lead?: string;
  crumbs: Crumb[];
  children: React.ReactNode;
}

export default function GuideShell({ eyebrow, title, lead, crumbs, children }: GuideShellProps) {
  return (
    <div className={styles.wrapper}>
      <div className={styles.container}>
        <nav className={styles.breadcrumb} aria-label="パンくず">
          {crumbs.map((c, i) => {
            const isLast = i === crumbs.length - 1;
            return (
              <span key={i}>
                {!isLast && c.href ? (
                  <Link href={c.href}>{c.label}</Link>
                ) : (
                  <span className={styles.current}>{c.label}</span>
                )}
                {!isLast && <span className={styles.sep}> / </span>}
              </span>
            );
          })}
        </nav>

        {eyebrow && <span className={styles.eyebrow}>{eyebrow}</span>}
        <h1 className={styles.title}>{title}</h1>
        {lead && <p className={styles.lead}>{lead}</p>}

        {children}
      </div>
    </div>
  );
}
