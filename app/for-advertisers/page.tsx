import type { Metadata } from 'next';
import { siteMetadata } from '@/lib/metadata';
import Hero from '@/components/sections/Hero';
import PocBanner from '@/components/sections/PocBanner';
import AdvertiserBenefits from '@/components/sections/AdvertiserBenefits';
import LiveDemo from '@/components/sections/LiveDemo';
import Faq from '@/components/sections/Faq';
import ContactSection from '@/components/sections/ContactSection';

export const metadata: Metadata = siteMetadata.advertisers;

export default function ForAdvertisersPage() {
  return (
    <>
      <Hero variant="advertisers" />
      <PocBanner variant="full" />
      <AdvertiserBenefits />
      <LiveDemo />
      <Faq filter={['biz']} />
      <ContactSection defaultCategory="企業（広告出稿）" />
    </>
  );
}
