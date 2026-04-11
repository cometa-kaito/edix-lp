import type { Metadata } from 'next';
import { siteMetadata } from '@/lib/metadata';
import { FAQ_ITEMS } from '@/lib/constants';
import { FaqSchema } from '@/components/layout/StructuredData';
import Faq from '@/components/sections/Faq';

export const metadata: Metadata = siteMetadata.faq;

export default function FaqPage() {
  return (
    <>
      <div style={{ paddingTop: 'var(--header-h)' }} />
      <Faq />
      <FaqSchema items={FAQ_ITEMS} />
    </>
  );
}
