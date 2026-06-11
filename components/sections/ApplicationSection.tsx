import FadeIn from '@/components/ui/FadeIn';
import ApplicationForm from '@/components/ui/ApplicationForm';

const APPLY_URL = 'https://kimiteras.rebounder.jp/apply';

export default function ApplicationSection() {
  return (
    <section className="section-padding bg-alt" id="apply">
      <div className="container">
        <FadeIn>
          <div
            style={{
              maxWidth: 720,
              margin: '0 auto 28px',
              padding: '24px',
              borderRadius: 16,
              background: '#fff',
              border: '2px solid var(--primary, #0f4c81)',
              textAlign: 'center',
            }}
          >
            <p style={{ fontWeight: 700, fontSize: 'var(--font-md, 1.05rem)', marginBottom: 8 }}>
              掲載枠を選んで、その場でお申し込み
            </p>
            <p style={{ color: 'var(--text-sub)', fontSize: 'var(--font-sm)', marginBottom: 16 }}>
              空き枠の一覧から掲載したい枠を選び、オンラインでお申し込みいただけます。
              <br />
              お申し込み後、担当者より契約手続きのご案内をいたします。
            </p>
            <a href={APPLY_URL} className="btn btn-accent" target="_blank" rel="noopener noreferrer">
              空き枠を見て申し込む →
            </a>
          </div>
        </FadeIn>
        <FadeIn>
          <p style={{ textAlign: 'center', color: 'var(--text-sub)', fontSize: 'var(--font-sm)', marginBottom: 16 }}>
            枠が決まっていない・ご相談から始めたい方は、下記フォームよりお問い合わせください。
          </p>
          <ApplicationForm />
        </FadeIn>
      </div>
    </section>
  );
}
