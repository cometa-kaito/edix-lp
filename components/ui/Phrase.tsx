import { loadDefaultJapaneseParser } from 'budoux';

const parser = loadDefaultJapaneseParser();

interface PhraseProps {
  children: string;
  as?: keyof React.JSX.IntrinsicElements;
  className?: string;
}

// Server Component（'use client' なし）: BudouX の分かち書きは静的テキストに対する
// 純関数なのでサーバー側で実行し、辞書＋パーサをクライアント bundle から外す。
// クライアントコンポーネントから import された場合もそのまま動く（API 不変）。
export default function Phrase({ children, as: Tag = 'span', className }: PhraseProps) {
  const segments = parser.parse(children);

  return (
    <Tag className={className} style={{ wordBreak: 'keep-all', overflowWrap: 'anywhere' }}>
      {segments.map((seg, i) => (
        <span key={i} style={{ display: 'inline-block' }}>
          {seg}
        </span>
      ))}
    </Tag>
  );
}
