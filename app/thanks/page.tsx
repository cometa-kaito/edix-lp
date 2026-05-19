import type { Metadata } from 'next';
import Link from 'next/link';
import { siteMetadata } from '@/lib/metadata';
import styles from '@/styles/sections/thanks.module.css';

export const metadata: Metadata = siteMetadata.thanks;

interface ThanksPageProps {
  searchParams: Promise<{ type?: string }>;
}

export default async function ThanksPage({ searchParams }: ThanksPageProps) {
  const { type } = await searchParams;
  const isApplication = type === 'application';

  const heading = isApplication
    ? '広告掲載のお申し込みを\n承りました'
    : 'お問い合わせを\n受け付けました';

  const lead = isApplication
    ? 'お申し込みありがとうございます。担当者より2営業日以内にご連絡し、契約書をお送りいたします。'
    : 'お問い合わせありがとうございます。担当者より2営業日以内にご返信いたします。';

  return (
    <>
      <div style={{ paddingTop: 'var(--header-h)' }} />
      <section className={styles.section}>
        <div className="container">
          <div className={styles.card}>
            <div className={styles.iconWrap}>
              <svg
                className={styles.icon}
                viewBox="0 0 64 64"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                aria-hidden="true"
              >
                <circle cx="32" cy="32" r="30" fill="var(--accent-biz)" opacity="0.12" />
                <circle cx="32" cy="32" r="22" fill="var(--accent-biz)" />
                <path
                  d="M22 32.5l7 7 13-15"
                  stroke="white"
                  strokeWidth="3.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </div>

            <h1 className={styles.heading}>
              {heading.split('\n').map((line, i) => (
                <span key={i}>{line}</span>
              ))}
            </h1>

            <p className={styles.lead}>{lead}</p>

            <div className={styles.note}>
              <p className={styles.noteTitle}>このあとの流れ</p>
              <ol className={styles.steps}>
                <li>担当者よりメールにて折り返しご連絡いたします（2営業日以内）</li>
                <li>
                  ご質問内容に応じて、オンライン面談（30分）または資料送付の形でご対応いたします
                </li>
                {isApplication && (
                  <li>契約書を電子送付し、ご署名後に正式受付となります</li>
                )}
              </ol>
            </div>

            <div className={styles.contact}>
              <p>お急ぎの場合はメールでも直接ご連絡いただけます：</p>
              <p>
                <a href="mailto:rebounder@googlegroups.com" className={styles.contactLink}>
                  rebounder@googlegroups.com
                </a>
              </p>
            </div>

            <div className={styles.actions}>
              <Link href="/" className="btn btn-primary">
                トップページへ戻る
              </Link>
              <Link href="/faq" className="btn btn-secondary">
                よくあるご質問を見る
              </Link>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
