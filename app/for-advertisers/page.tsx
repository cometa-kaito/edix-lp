import type { Metadata } from 'next';
import { siteMetadata } from '@/lib/metadata';
import Hero from '@/components/sections/Hero';
import PvSection from '@/components/sections/PvSection';
import AdvertiserBenefits from '@/components/sections/AdvertiserBenefits';
import GuidePromo from '@/components/sections/GuidePromo';
import ApplicationSection from '@/components/sections/ApplicationSection';
import Faq from '@/components/sections/Faq';
import ContactSection from '@/components/sections/ContactSection';

export const metadata: Metadata = siteMetadata.advertisers;

export default function ForAdvertisersPage() {
  return (
    <>
      <Hero variant="advertisers" />
      <PvSection variant="advertisers" />
      <AdvertiserBenefits />
      <GuidePromo />
      <ApplicationSection />
      <Faq filter={['biz']} />
      <ContactSection defaultCategory="企業（広告出稿）" />
    </>
  );
}
