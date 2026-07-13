import Hero from '@/components/sections/Hero';
import PartnersStrip from '@/components/sections/PartnersStrip';
import Features from '@/components/sections/Features';
import Partners from '@/components/sections/Partners';
import CompanySection from '@/components/sections/CompanySection';
import ContactSection from '@/components/sections/ContactSection';

export default function HomePage() {
  return (
    <>
      <Hero variant="home" />
      <PartnersStrip />
      <Features />
      <Partners />
      <CompanySection />
      <ContactSection />
    </>
  );
}
