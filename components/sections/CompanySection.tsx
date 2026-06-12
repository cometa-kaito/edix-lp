import Image from 'next/image';
import SectionHeader from '@/components/ui/SectionHeader';
import FadeIn from '@/components/ui/FadeIn';
import styles from '@/styles/sections/company.module.css';

const STORY_STEPS = [
  {
    year: '2025',
    title: 'DigiTechQuest 2025 最優秀賞を受賞',
    desc: '課題解決型DXコンテストにて、キミテラスが最優秀賞と研究奨励金を獲得。学校現場のリアルな課題に向き合ったプロダクトが高い評価を受けました。',
  },
  {
    year: '2025',
    title: '岐南工業高等学校で運用を開始',
    desc: '受賞をきっかけに、岐阜県立岐南工業高等学校の電子工学科3クラスで運用をスタート。現場の声を反映しながら改善を重ねました。',
  },
  {
    year: '2026',
    title: '株式会社Rebounderを設立',
    desc: '現場での手応えを確信に変え、2026年2月に法人化。キミテラスの本格展開に向けて事業をスタートしました。',
  },
];

const COMPANY_INFO = [
  { label: '会社名', value: '株式会社Rebounder' },
  { label: '代表取締役', value: '奥村 魁斗' },
  { label: '設立', value: '2026年2月' },
  { label: '所在地', value: '東京都文京区' },
];

export default function CompanySection() {
  return (
    <section className="section-padding" id="company">
      <div className="container">
        <SectionHeader
          label="About Us"
          title="運営会社"
        />

        {/* Story timeline */}
        <div className={styles.timeline}>
          {STORY_STEPS.map((step, i) => (
            <FadeIn key={i} className={styles.timelineItem}>
              <div className={styles.timelineDot} />
              <div className={styles.timelineContent}>
                <span className={styles.timelineYear}>{step.year}</span>
                <h4 className={styles.timelineTitle}>{step.title}</h4>
                <p className={styles.timelineDesc}>{step.desc}</p>
              </div>
            </FadeIn>
          ))}
        </div>

        <FadeIn className={styles.profile}>
          <div className={styles.logoWrap}>
            <Image
              src="/rebounder-logo.png"
              alt="株式会社Rebounder ロゴ"
              width={80}
              height={80}
              style={{ width: 80, height: 'auto' }}
            />
          </div>
          <div className={styles.profileText}>
            <h3 className={styles.companyName}>株式会社Rebounder</h3>
            <p className={styles.mission}>
              「人手に頼らない、でも人を置き去りにしない社会をつくる」
            </p>
            <p className={styles.missionDesc}>
              テクノロジーの力で現場の課題を解決しながら、人の価値を大切にする — それがRebounderのミッションです。
            </p>
          </div>
        </FadeIn>

        <FadeIn className={styles.info}>
          <h4 className={styles.infoHeading}>会社概要</h4>
          <dl className={styles.infoList}>
            {COMPANY_INFO.map((item, i) => (
              <div key={i} className={styles.infoRow}>
                <dt className={styles.infoLabel}>{item.label}</dt>
                <dd className={styles.infoValue}>{item.value}</dd>
              </div>
            ))}
          </dl>
          <a
            href="https://rebounder.jp/"
            target="_blank"
            rel="noopener"
            className={styles.siteLink}
          >
            コーポレートサイトを見る →
          </a>
        </FadeIn>
      </div>
    </section>
  );
}
