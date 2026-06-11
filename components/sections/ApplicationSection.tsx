import FadeIn from '@/components/ui/FadeIn';
import ApplicationForm from '@/components/ui/ApplicationForm';
import { PORTAL_APPLY_URL } from '@/lib/constants';

export default function ApplicationSection() {
  return (
    <section className="section-padding bg-alt" id="apply">
      <div className="container">
        {/* 主導線: ポータルで空き枠を見てその場で申し込む（摩擦最小） */}
        <FadeIn>
          <div
            style={{
              maxWidth: 720,
              margin: '0 auto var(--space-xl)',
              padding: 'var(--space-lg)',
              background: 'var(--white)',
              border: '2px solid var(--accent-biz)',
              borderRadius: 'var(--radius-xl)',
              boxShadow: 'var(--shadow-md)',
              textAlign: 'center',
            }}
          >
            <p
              style={{
                fontSize: 'var(--font-xs)',
                fontWeight: 700,
                letterSpacing: '0.08em',
                color: 'var(--accent-biz)',
                marginBottom: 'var(--space-xs)',
              }}
            >
              いちばん早いお申し込み
            </p>
            <h3
              style={{
                fontSize: 'var(--font-2xl)',
                fontWeight: 800,
                marginBottom: 'var(--space-xs)',
              }}
            >
              空き枠を見て、その場で申し込む
            </h3>
            <p
              style={{
                fontSize: 'var(--font-sm)',
                color: 'var(--text-sub)',
                marginBottom: 'var(--space-md)',
              }}
            >
              募集中の枠・価格・入稿規格を確認しながら、1分でお申し込みが完了します。
            </p>
            <a href={PORTAL_APPLY_URL} target="_blank" rel="noopener" className="btn btn-accent">
              空き枠を確認して申し込む →
            </a>
          </div>
        </FadeIn>

        {/* 相談しながら進めたい方: 従来フォーム */}
        <FadeIn>
          <p
            style={{
              textAlign: 'center',
              fontSize: 'var(--font-sm)',
              color: 'var(--text-sub)',
              marginBottom: 'var(--space-md)',
            }}
          >
            ご質問や相談しながら進めたい方は、こちらのフォームからどうぞ。
          </p>
          <ApplicationForm />
        </FadeIn>
      </div>
    </section>
  );
}
