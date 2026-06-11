// 共有のキー認証ヘルパ。
//
// ゼロダウンタイムな鍵ローテーションのため、現用キー（SWITCHBOT_WEBHOOK_SECRET）に
// 加えて、移行期間中だけ旧キー（SWITCHBOT_WEBHOOK_SECRET_LEGACY）も受理する。
// すべての機器（TV / BLE Recorder / SwitchBot Cloud Webhook）を新キーへ更新し終えたら、
// SWITCHBOT_WEBHOOK_SECRET_LEGACY を削除して再デプロイすれば旧キーは無効化される。
//
// LEGACY 未設定時の挙動は「SWITCHBOT_WEBHOOK_SECRET のみ受理」となり、
// 従来実装（key === secret）と完全に同一。

function validKeys(): string[] {
  return [
    process.env.SWITCHBOT_WEBHOOK_SECRET,
    process.env.SWITCHBOT_WEBHOOK_SECRET_LEGACY,
  ].filter((k): k is string => typeof k === 'string' && k.length > 0);
}

/** 有効なキーが1つ以上設定されているか（未設定 = misconfigured）。 */
export function isAuthConfigured(): boolean {
  return validKeys().length > 0;
}

/** 提供されたキーが、有効キーのいずれかに一致するか。 */
export function isAuthorizedKey(provided: string | null | undefined): boolean {
  if (!provided) return false;
  return validKeys().includes(provided);
}
