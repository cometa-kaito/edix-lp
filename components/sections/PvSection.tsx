import SectionHeader from '@/components/ui/SectionHeader';
import FadeIn from '@/components/ui/FadeIn';
import styles from '@/styles/sections/pv-section.module.css';

/**
 * サービス紹介ムービー。読者ごとに別の版を1本ずつ置く（1ページ1本。並べると迷わせるため）。
 *  - 広告主向け（2:24） … /for-advertisers の Hero 直下・AdvertiserBenefits の上（2026-07-31 公開）
 *  - 学校向け（2:21）   … /for-schools の Hero 直下・SchoolBenefits の上（2026-08-02 追加）
 *  - 両立版（1:08）     … トップ / の Hero 直下・Features の上（2026-08-02 追加）
 * 動画はいずれも kimiteras-pv リポジトリの配布原本（先頭0.5秒にサムネを焼き込み済み）。
 */
type PvVariant = 'advertisers' | 'schools' | 'crossover';

const PV: Record<PvVariant, { label: string; title: string; src: string; poster: string }> = {
  advertisers: {
    label: 'サービス紹介ムービー',
    title: '2分半でわかる、キミテラス',
    src: '/pv/kimiteras-pv-web.mp4',
    poster: '/pv/thumbnail.png',
  },
  schools: {
    label: '先生向け サービス紹介',
    title: '2分半でわかる、キミテラス',
    src: '/pv/kimiteras-pv-school.mp4',
    poster: '/pv/thumbnail-school.png',
  },
  crossover: {
    label: 'サービス紹介ムービー',
    title: '1分でわかる、キミテラス',
    src: '/pv/kimiteras-pv-crossover.mp4',
    poster: '/pv/thumbnail-crossover.png',
  },
};

export default function PvSection({ variant = 'advertisers' }: { variant?: PvVariant }) {
  const pv = PV[variant];
  return (
    <section className="section-padding" id="movie">
      <div className="container">
        <SectionHeader label={pv.label} title={pv.title} labelColor="var(--accent-text)" />
        <FadeIn className={styles.videoWrap}>
          <video
            className={styles.video}
            controls
            preload="metadata"
            playsInline
            poster={pv.poster}
            src={pv.src}
          >
            お使いのブラウザは動画再生に対応していません。
          </video>
        </FadeIn>
      </div>
    </section>
  );
}
