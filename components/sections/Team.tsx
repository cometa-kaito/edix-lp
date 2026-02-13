import FadeIn from '@/components/ui/FadeIn';
import SectionHeader from '@/components/ui/SectionHeader';
import { TEAM_MEMBERS, COMPANY_URL } from '@/lib/constants';
import styles from '@/styles/sections/team.module.css';

export default function Team() {
  return (
    <section className={`section-padding ${styles.section}`} id="team">
      <div className="container">
        <SectionHeader label="Team" title="学生が学校DXする！" />
        <FadeIn className="text-center">
          <div className={styles.awardBanner}>
            <div className={styles.awardIcon}>🏆</div>
            <div className={styles.awardText}>
              <h3 className={styles.awardTitle}>DigiTechQuest 2025 最優秀賞 受賞</h3>
              <p className={styles.awardDesc}>高専・工業高校発のイノベーションプロジェクト</p>
            </div>
          </div>
        </FadeIn>
        <FadeIn className={styles.grid}>
          {TEAM_MEMBERS.map((member, i) => (
            <div key={i} className={styles.card}>
              <div className={styles.avatar}>{member.initial}</div>
              <h3 className={styles.name}>{member.name}</h3>
              <p className={styles.role}>{member.role}</p>
            </div>
          ))}
        </FadeIn>
        <FadeIn className="text-center">
          <div className={styles.companyInfo}>
            <p>
              <a href={COMPANY_URL} target="_blank" rel="noopener">
                <strong>株式会社Rebounder</strong>
              </a>（岐阜工業高等専門学校発ベンチャー）
            </p>
          </div>
        </FadeIn>
      </div>
    </section>
  );
}
