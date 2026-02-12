import Hero from '@/components/sections/Hero';
import PocBanner from '@/components/sections/PocBanner';
import Problems from '@/components/sections/Problems';
import Features from '@/components/sections/Features';
import LiveDemo from '@/components/sections/LiveDemo';
import ContactSection from '@/components/sections/ContactSection';

export default function HomePage() {
  return (
    <>
      <Hero variant="home" />
      <PocBanner variant="compact" />
      <Problems />
      <Features />
      <LiveDemo />
      <ContactSection />
    </>
  );
}
