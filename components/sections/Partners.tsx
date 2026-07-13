import SectionHeader from '@/components/ui/SectionHeader';
import PartnerLogoRow from '@/components/ui/PartnerLogoRow';
import { PARTNER_COMPANIES } from '@/lib/constants';

export default function Partners() {
  return (
    <section className="section-padding" id="partners">
      <div className="container">
        <SectionHeader
          title="取引先企業"
          subtitle="キミテラスに広告を掲載いただいている企業の皆さまです。あたたかいご支援に心より感謝いたします。"
        />
        {/* 収まる間は中央静止、溢れたら自動でマーキー（社数・画面幅に追従） */}
        <PartnerLogoRow companies={PARTNER_COMPANIES} />
      </div>
    </section>
  );
}
