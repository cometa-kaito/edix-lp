import SectionHeader from '@/components/ui/SectionHeader';
import PartnerLogoRow from '@/components/ui/PartnerLogoRow';
import { PARTNER_COMPANIES } from '@/lib/constants';

// band: 前後が白のページ（/about）で青の帯にして区切る。トップは前後が色付きなので白のまま
export default function Partners({ band = false }: { band?: boolean }) {
  return (
    <section className={`section-padding${band ? ' bg-band' : ''}`} id="partners">
      <div className="container">
        <SectionHeader
          title="取引先企業"
          subtitle="キミテラスに広告を掲載いただいている企業の皆さまです。<br />あたたかいご支援に心より感謝いたします。"
        />
        {/* 収まる間は中央静止、溢れたら自動でマーキー（社数・画面幅に追従） */}
        <PartnerLogoRow companies={PARTNER_COMPANIES} />
      </div>
    </section>
  );
}
