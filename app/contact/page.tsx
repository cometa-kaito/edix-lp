import type { Metadata } from 'next';
import { siteMetadata } from '@/lib/metadata';
import ContactSection from '@/components/sections/ContactSection';
import LiveDemo from '@/components/sections/LiveDemo';

export const metadata: Metadata = siteMetadata.contact;

export default function ContactPage() {
  return (
    <>
      <div style={{ paddingTop: 'var(--header-h)' }} />
      <LiveDemo />
      <ContactSection />
    </>
  );
}
