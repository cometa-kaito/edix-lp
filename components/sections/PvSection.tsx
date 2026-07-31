import SectionHeader from '@/components/ui/SectionHeader';
import FadeIn from '@/components/ui/FadeIn';
import styles from '@/styles/sections/pv-section.module.css';

/** サービス紹介ムービー（2026-07-31 公開・kimiteras-pv v11.4）。
 *  /for-advertisers の Hero 直下・AdvertiserBenefits（広告主の方へ）の上に置く。 */
export default function PvSection() {
  return (
    <section className="section-padding" id="movie">
      <div className="container">
        <SectionHeader
          label="サービス紹介ムービー"
          title="2分半でわかる、キミテラス"
          labelColor="var(--accent-text)"
        />
        <FadeIn className={styles.videoWrap}>
          <video
            className={styles.video}
            controls
            preload="metadata"
            playsInline
            poster="/pv/thumbnail.png"
            src="/pv/kimiteras-pv-web.mp4"
          >
            お使いのブラウザは動画再生に対応していません。
          </video>
        </FadeIn>
      </div>
    </section>
  );
}
