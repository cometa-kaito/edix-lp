import type { Metadata } from 'next';
import { siteMetadata } from '@/lib/metadata';
import Hero from '@/components/sections/Hero';
import SchoolBenefits from '@/components/sections/SchoolBenefits';
import LiveDemo from '@/components/sections/LiveDemo';
import Faq from '@/components/sections/Faq';
import ContactSection from '@/components/sections/ContactSection';

export const metadata: Metadata = siteMetadata.schools;

export default function ForSchoolsPage() {
  return (
    <>
      <Hero variant="schools" />
      <SchoolBenefits />
      <LiveDemo />
      <Faq filter={['school']} />
      <ContactSection defaultCategory="学校関係者" />
    </>
  );
}
