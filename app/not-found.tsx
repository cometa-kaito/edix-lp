import Link from 'next/link';

export default function NotFound() {
  return (
    <section style={{ paddingTop: 'calc(var(--header-h) + 100px)', paddingBottom: 100, textAlign: 'center' }}>
      <div className="container">
        <h1 style={{ fontSize: 48, fontWeight: 700, marginBottom: 16 }}>404</h1>
        <p style={{ fontSize: 18, color: 'var(--text-sub)', marginBottom: 32 }}>
          ページが見つかりませんでした
        </p>
        <Link href="/" className="btn btn-primary">
          トップページに戻る
        </Link>
      </div>
    </section>
  );
}
