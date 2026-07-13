import Hero from '@/components/sections/Hero';
import Features from '@/components/sections/Features';
import Partners from '@/components/sections/Partners';
import CompanySection from '@/components/sections/CompanySection';
import ContactSection from '@/components/sections/ContactSection';

export default function HomePage() {
  return (
    <>
      <Hero variant="home" />
      <Features />
      <Partners />
      <CompanySection />
      <ContactSection />
    </>
  );
}
