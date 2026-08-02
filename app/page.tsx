import Hero from '@/components/sections/Hero';
import Features from '@/components/sections/Features';
import PvSection from '@/components/sections/PvSection';
import Partners from '@/components/sections/Partners';
import CompanySection from '@/components/sections/CompanySection';
import ContactSection from '@/components/sections/ContactSection';

export default function HomePage() {
  return (
    <>
      <Hero variant="home" />
      {/* 両立版(1:08)。学校/企業の二択を出すHeroの直下に置き、分岐の前に「何のサービスか」を1分で見せる */}
      <PvSection variant="crossover" />
      <Features />
      <Partners />
      <CompanySection />
      <ContactSection />
    </>
  );
}
