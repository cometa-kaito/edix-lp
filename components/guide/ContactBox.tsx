import styles from '@/styles/sections/guide.module.css';

export default function ContactBox() {
  return (
    <div className={styles.contactBox}>
      <h3>お問い合わせ・入稿窓口</h3>
      <dl>
        <dt>会社</dt>
        <dd><a href="https://rebounder.jp/ja" target="_blank" rel="noopener noreferrer">株式会社 Rebounder（キミテラス事業）</a></dd>
        <dt>担当</dt>
        <dd>奥村 魁斗</dd>
        <dt>TEL</dt>
        <dd>080-6748-2231</dd>
        <dt>Mail</dt>
        <dd><a href="mailto:rebounder@googlegroups.com">rebounder@googlegroups.com</a></dd>
        <dt>Web</dt>
        <dd><a href="https://www.school-signage.net/">https://www.school-signage.net/</a></dd>
      </dl>
    </div>
  );
}
