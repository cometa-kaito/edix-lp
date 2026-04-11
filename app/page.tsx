import Image from 'next/image';
import Hero from '@/components/sections/Hero';
import FadeIn from '@/components/ui/FadeIn';
import Features from '@/components/sections/Features';
import LiveDemo from '@/components/sections/LiveDemo';
import ContactSection from '@/components/sections/ContactSection';

export default function HomePage() {
  return (
    <>
      <Hero variant="home" />
      <section style={{ padding: '64px 0 0' }}>
        <div className="container">
          <FadeIn style={{ maxWidth: 800, margin: '0 auto', borderRadius: 16, overflow: 'hidden', boxShadow: '0 8px 32px rgba(0,0,0,0.10)' }}>
            <Image
              src="/poc.png"
              alt="キミテラス 教室設置型デジタルサイネージ"
              width={800}
              height={450}
              priority
              style={{ width: '100%', height: 'auto', display: 'block' }}
            />
          </FadeIn>
          <p style={{ textAlign: 'center', color: 'var(--text-sub)', fontSize: 14, marginTop: 16 }}>
            岐南工業高等学校 電子工学科で実証実験中のサイネージ画面
          </p>
        </div>
      </section>
      <Features />
      <LiveDemo />
      <ContactSection />
    </>
  );
}
