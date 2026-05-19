import Link from 'next/link';
import styles from '@/styles/sections/guide.module.css';

export default function CtaBlock() {
  return (
    <div className={styles.ctaBlock}>
      <h3 className={styles.ctaTitle}>お申込み・お問い合わせ</h3>
      <p className={styles.ctaText}>
        ガイドをお読みいただき、出稿をご検討いただける企業さまは、下記のお問い合わせフォームよりご連絡ください。担当よりすぐにご案内をお送りします。
      </p>
      <Link href="/contact" className={styles.ctaButton}>
        お問い合わせ・お申込みフォームへ →
      </Link>
      <p className={styles.ctaNote}>
        ※ すでにお申込みをいただいている企業さまへは、別途メールにてご案内をお送りしております。お手数ですが、そちらのメールにご返信いただく形でご対応をお願いいたします。
      </p>
    </div>
  );
}
