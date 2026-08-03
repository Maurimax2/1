export const SITE = {
  name: 'MOORTV',
  nameSpaced: 'MOOR TV',
  taglineAr: 'أكبر منصة ترفيهية في موريتانيا',
  taglineEn: 'Mauritania’s largest entertainment platform',
  domain: 'https://maurimax.store',
  currency: 'MRU',
  /** Displayed exactly as the brand prints it on its artwork. */
  whatsappDisplay: '43 04 24 04',
  /** Full international form (Mauritania +222) used for wa.me deep links. */
  whatsappE164: '22243042404',
  snapchat: 'moor.view',
  snapchatUrl: 'https://www.snapchat.com/add/moor.view',
} as const;

export function waLink(message: string) {
  return `https://wa.me/${SITE.whatsappE164}?text=${encodeURIComponent(message)}`;
}

export function formatPrice(value: number) {
  return `${new Intl.NumberFormat('en-US').format(value)} ${SITE.currency}`;
}
