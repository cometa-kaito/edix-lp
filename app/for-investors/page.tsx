import type { Metadata } from 'next';
import { siteMetadata } from '@/lib/metadata';
import Hero from '@/components/sections/Hero';
import InvestorScheme from '@/components/sections/InvestorScheme';
import LiveDemo from '@/components/sections/LiveDemo';
import Faq from '@/components/sections/Faq';
import ContactSection from '@/components/sections/ContactSection';

export const metadata: Metadata = siteMetadata.investors;

export default function ForInvestorsPage() {
  return (
    <>
      <Hero variant="investors" />
      <InvestorScheme />
      <LiveDemo />
      <Faq filter={['investor', 'all']} />
      <ContactSection defaultCategory="投資家" />
    </>
  );
}
