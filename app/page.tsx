import Hero from '@/components/sections/Hero';
import Features from '@/components/sections/Features';
import CompanySection from '@/components/sections/CompanySection';
import ContactSection from '@/components/sections/ContactSection';

export default function HomePage() {
  return (
    <>
      <Hero variant="home" />
      <Features />
      <CompanySection />
      <ContactSection />
    </>
  );
}
