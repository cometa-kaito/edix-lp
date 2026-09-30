import type { Metadata } from 'next';
import { siteMetadata } from '@/lib/metadata';
import Results from '@/components/sections/Results';
import Partners from '@/components/sections/Partners';
import CompanySection from '@/components/sections/CompanySection';
import AudienceCta from '@/components/sections/AudienceCta';

export const metadata: Metadata = siteMetadata.about;

export default function AboutPage() {
  return (
    <div style={{ paddingTop: 'var(--header-h)' }}>
      <Results />
      <Partners band />
      <CompanySection />
      <AudienceCta />
    </div>
  );
}
