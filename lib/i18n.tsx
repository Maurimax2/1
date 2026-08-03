'use client';

import { createContext, useCallback, useContext, useEffect, useMemo, useState } from 'react';

export type Lang = 'ar' | 'en';

/** Arabic is the default. English is the secondary language. */
export const DEFAULT_LANG: Lang = 'ar';
const STORAGE_KEY = 'moortv.lang';

/* ------------------------------------------------------------------ *
 * Dictionary
 * ------------------------------------------------------------------ */

const ar = {
  dir: 'rtl' as const,
  langName: 'العربية',
  switchTo: 'English',
  switchLabel: 'تغيير اللغة إلى الإنجليزية',

  nav: {
    label: 'التنقل الرئيسي',
    plans: 'الاشتراكات',
    boxes: 'الأجهزة',
    browse: 'تصفّح',
    why: 'لماذا نحن',
    faq: 'الأسئلة',
    cta: 'ابدأ المشاهدة',
    home: 'موور تي في — الصفحة الرئيسية',
    openMenu: 'فتح القائمة',
    closeMenu: 'إغلاق القائمة',
    openCart: 'فتح السلة',
    openCartCount: (n: number) =>
      n === 1 ? 'فتح السلة، منتج واحد' : `فتح السلة، ${n} منتجات`,
    skip: 'تخطَّ إلى المحتوى',
  },

  hero: {
    saleBadge: 'تخفيضات الصيف',
    salePitch: 'وفّر حتى 37% — لفترة محدودة',
    titleA: 'كل ما تحب.',
    titleB: 'اشتراك واحد.',
    subtitle:
      'شاهد آلاف الأفلام والمسلسلات والقنوات المباشرة والرياضة ومحتوى الأطفال وأكثر من ذلك بكثير، من منصة ترفيهية واحدة.',
    ctaPrimary: 'ابدأ المشاهدة',
    ctaSecondary: 'شاهد العروض',
    chips: ['تفعيل فوري', 'يعمل على كل الأجهزة', 'جودة 4K فائقة'],
    scroll: 'مرّر',
    aria: 'موور تي في — كل ما تحب، باشتراك واحد',
    tiles: {
      action: 'أكشن',
      football: 'كرة القدم',
      docs: 'وثائقيات',
      comedy: 'كوميديا',
      scifi: 'خيال علمي',
      kids: 'أطفال',
      anime: 'أنمي',
      drama: 'دراما',
    },
  },

  logos: {
    title: 'كل ما تعرفه من ترفيه — في مكان واحد',
    disclaimer:
      'جميع الأسماء والعلامات التجارية المعروضة ملك لأصحابها، وقد ذُكرت هنا فقط لوصف أنواع المحتوى المتاح. موور تي في خدمة مستقلة وغير تابعة لأي منها أو معتمدة أو مدعومة من قِبلها.',
  },

  stats: {
    srTitle: 'موور تي في بالأرقام',
    movies: { label: 'فيلم', hint: 'من أضخم الأعمال إلى الكنوز المخفية' },
    shows: { label: 'مسلسل', hint: 'مواسم كاملة، تُحدَّث دائماً' },
    channels: { label: 'قناة مباشرة', hint: 'من كل قارات العالم' },
    quality: { value: '4K UHD', label: 'جودة البث', hint: 'وضوح تام على كل شاشة' },
    everywhere: 'يعمل في كل مكان',
    everywhereHint: 'حساب واحد. كل شاشة في بيتك.',
    devices: ['شاشة ذكية', 'أندرويد', 'آيفون', 'جهاز لوحي', 'كمبيوتر'],
  },

  sale: {
    limited: 'لفترة محدودة فقط',
    title: 'تخفيضات الصيف',
    body: 'كل الاشتراكات وكل الأجهزة عليها خصم الآن.',
    bodyStrong: 'هذه الأسعار لن تبقى متاحة دائماً.',
    ctaPrimary: 'احصل على العرض',
    ctaSecondary: 'شاهد الأجهزة',
    endsIn: 'ينتهي العرض خلال',
    units: { days: 'أيام', hours: 'ساعات', minutes: 'دقائق', seconds: 'ثوانٍ' },
  },

  plans: {
    eyebrow: 'الاشتراكات',
    titleA: 'اختر اشتراكك.',
    titleB: 'شاهد كل شيء.',
    subtitle:
      'اشتراك واحد يفتح لك مكتبة موور تي في بالكامل — كل فيلم، كل مسلسل، كل قناة مباشرة، على كل شاشة تملكها.',
    footnote: 'كل الاشتراكات تشمل التفعيل الفوري والدعم عبر واتساب. الأسعار بالأوقية الموريتانية.',
    save: (pct: number) => `وفّر ${pct}%`,
    badges: { popular: 'الأكثر طلباً', best: '🔥 أفضل عرض' },
  },

  devices: {
    eyebrow: 'أجهزة الاستقبال',
    titleA: 'حوّل أي شاشة إلى',
    titleB: 'تلفاز ذكي',
    arHeadline: 'حول شاشتك لتلفاز ذكي',
    subtitle: 'كلا الجهازين يصلك جاهزاً مع تطبيق موور تي في مثبّتاً و',
    subtitleStrong: 'سنة كاملة من الاشتراك مجاناً',
    subtitleEnd: '. وصّل الجهاز، اربطه بالواي فاي، وابدأ المشاهدة.',
    yearIncluded: 'سنة كاملة مجاناً',
    badgeSeller: 'الأكثر مبيعاً',
    badgeStrong: 'الأقوى',
    oneTime: 'دفعة واحدة، تشمل سنة',
    inStock: 'متوفر',
    delivery: 'التوصيل متاح في كل موريتانيا. ونساعدك في التركيب عبر واتساب — مجاناً.',
  },

  categories: {
    eyebrow: 'تصفّح',
    titleA: 'كل شيء، مُرتَّب بالطريقة',
    titleB: 'التي تشاهد بها',
    subtitle: 'عشرة عوالم من المحتوى تُحدَّث باستمرار. تصفّحها وشاهد ما يفتحه لك اشتراكك.',
    explore: 'استكشف',
    footballEyebrow: 'كرة القدم',
    footballTitle: 'جميع البطولات الكروية',
    footballBody: 'كل البطولات الكبرى، مباشرة وبجودة 4K.',
    rowOne: 'فئات المحتوى، الصف الأول',
    rowTwo: 'فئات المحتوى، الصف الثاني',
  },

  why: {
    eyebrow: 'لماذا موور تي في',
    titleA: 'صُنعت لتكون',
    titleB: 'الأفضل في موريتانيا',
    subtitle: 'ليست مجرد مكتبة أكبر — بل تجربة أفضل من البداية إلى النهاية.',
    items: [
      'جودة 4K حقيقية مع معدل بث متكيّف، فتبقى الصورة واضحة حتى عندما يضعف الاتصال.',
      'اطلب عبر واتساب ويُفعَّل اشتراكك خلال دقائق — لا ساعات ولا انتظار حتى الغد.',
      'أكثر من 20 ألف فيلم و10 آلاف مسلسل و9 آلاف قناة مباشرة في مكان واحد.',
      'شاشة ذكية، أندرويد، آيفون، آيباد، حاسوب، أو جهازنا الخاص. حساب واحد يغطيها كلها.',
      'جزء بسيط من تكلفة الاشتراك في كل منصة على حدة، وبدون رسوم خفية.',
      'أشخاص حقيقيون على واتساب يردّون بسرعة ويحلّون المشكلة فعلاً.',
      'خوادم مستقرة بتقنية مانعة للتقطيع، مهيّأة للشبكات الموريتانية.',
      'أفلام جديدة ومواسم جديدة وقنوات جديدة تُضاف كل أسبوع.',
    ],
  },

  reviews: {
    eyebrow: 'آراء العملاء',
    titleA: 'محبوب في',
    titleB: 'كل موريتانيا',
    subtitle: 'آلاف البيوت تشاهد بالفعل مع موور تي في. إليك ما يقوله بعضهم.',
    stars: '5 من 5 نجوم',
    trust: [
      { value: '4.9/5', label: 'متوسط التقييم' },
      { value: '+5000', label: 'مشترك نشط' },
      { value: 'أقل من 5 دقائق', label: 'مدة التفعيل عادةً' },
    ],
  },

  faq: {
    eyebrow: 'الأسئلة الشائعة',
    title: 'أسئلة وأجوبة',
    subtitle: 'كل ما قد تريد معرفته قبل الاشتراك. وأي شيء آخر — اسألنا مباشرة.',
    helpBody: 'ما زلت متردداً؟ راسلنا على واتساب ونرد عليك خلال دقائق.',
    waMessage: 'مرحباً موور تي في، عندي سؤال حول الاشتراكات.',
  },

  cart: {
    title: 'سلّتك',
    empty: 'لا يوجد شيء بعد',
    itemCount: (n: number) => {
      if (n === 1) return 'منتج واحد';
      if (n === 2) return 'منتجان';
      if (n <= 10) return `${n} منتجات`;
      return `${n} منتجاً`;
    },
    close: 'إغلاق السلة',
    remove: (name: string) => `احذف ${name}`,
    increase: (name: string) => `زد كمية ${name}`,
    decrease: (name: string) => `أنقص كمية ${name}`,
    emptyTitle: 'سلّتك فارغة',
    emptyBody: 'أضف اشتراكاً أو جهازاً وسيظهر هنا.',
    browsePlans: 'تصفّح الاشتراكات',
    subtotal: 'المجموع الفرعي',
    savings: 'وفّرت من تخفيضات الصيف',
    total: 'الإجمالي',
    checkout: 'إتمام الطلب',
    noCharge: 'تؤكّد وتدفع عبر واتساب — لا يُخصم منك شيء هنا.',
    addToCart: 'أضف إلى السلة',
    added: 'أُضيف',
    addAria: (name: string) => `أضف ${name} إلى السلة`,
    label: 'سلة التسوق',
    kindPlan: 'اشتراك',
    kindDevice: 'جهاز',
  },

  checkout: {
    back: 'العودة إلى الاشتراكات',
    titleA: 'أكمل',
    titleB: 'طلبك',
    intro:
      'املأ بياناتك وسنفتح لك واتساب وطلبك مكتوب بالفعل. أرسله لنا ويُفعَّل اشتراكك خلال دقائق.',
    detailsTitle: 'بياناتك',
    detailsHint: 'نستخدمها فقط لتأكيد طلبك وتفعيله.',
    name: 'الاسم',
    namePlaceholder: 'محمد ولد أحمد',
    nameError: 'الرجاء إدخال اسمك.',
    phone: 'رقم الهاتف',
    phonePlaceholder: '44 00 00 00',
    phoneHint: 'رقم موريتاني من 8 أرقام',
    phoneError: 'الرجاء إدخال رقم هاتف صحيح.',
    address: 'العنوان',
    addressPlaceholder: 'نواكشوط، تفرغ زينة',
    addressHint: 'مطلوب فقط عند طلب جهاز',
    notes: 'ملاحظات',
    notesPlaceholder: 'أي شيء ينبغي أن نعرفه — الجهاز المفضّل، وقت التوصيل…',
    optional: 'اختياري',
    submit: 'أرسل الطلب عبر واتساب',
    noCharge: (phone: string) =>
      `لا يُخصم منك شيء على هذا الموقع. يُفتح طلبك كرسالة واتساب جاهزة إلى ${phone}، حيث نؤكّد الدفع ونفعّل اشتراكك.`,
    sentTitle: 'فُتح واتساب ومعه طلبك',
    sentBody: 'إذا لم يُفتح،',
    sentLink: 'اضغط هنا لإرساله يدوياً',
    summary: 'ملخّص الطلب',
    activation: 'التفعيل',
    free: 'مجاني',
    preview: 'معاينة رسالة واتساب',
    emptyTitle: 'سلّتك فارغة',
    emptyBody: 'اختر اشتراكاً أو جهازاً أولاً، ثم عد إلى هنا لإرسال طلبك.',
    emptyPlans: 'تصفّح الاشتراكات',
    emptyBoxes: 'شاهد الأجهزة',
    /** The WhatsApp order message itself. */
    msg: {
      greeting: 'مرحباً موور تي في،',
      intro: 'أرغب في تقديم طلب.',
      name: 'الاسم',
      phone: 'الهاتف',
      address: 'العنوان',
      products: 'المنتجات:',
      qty: 'الكمية',
      savings: 'الخصم من تخفيضات الصيف',
      total: 'الإجمالي',
      notes: 'ملاحظات',
      closing: 'الرجاء التواصل معي.',
      emptyList: '— (فارغة)',
    },
  },

  footer: {
    ctaTitleA: 'جاهز لمشاهدة',
    ctaTitleB: 'كل شيء؟',
    ctaSub: 'اشترك الآن واستمتع بكل المحتوى في مكان واحد',
    ctaPrimary: 'ابدأ المشاهدة',
    ctaWhatsApp: 'راسلنا على واتساب',
    about:
      'موور تي في يجمع الأفلام والمسلسلات والقنوات المباشرة وكل البطولات الكروية الكبرى في اشتراك واحد — مصمَّم لموريتانيا.',
    explore: 'تصفّح',
    support: 'الدعم',
    contact: 'تواصل معنا',
    links: {
      subscriptions: 'الاشتراكات',
      boxes: 'الأجهزة',
      categories: 'الفئات',
      why: 'لماذا موور تي في',
      faq: 'الأسئلة الشائعة',
      reviews: 'آراء العملاء',
      sale: 'تخفيضات الصيف',
      checkout: 'إتمام الطلب',
    },
    waLine: 'واتساب — الطلبات والدعم',
    snapLine: 'سناب شات — عروض يومية',
    country: 'موريتانيا',
    countryLine: 'توصيل في كل البلاد',
    rights: 'جميع الحقوق محفوظة.',
    trademarks:
      'أسماء العلامات التجارية الأخرى ملك لأصحابها وتُستخدم لأغراض وصفية فقط.',
    waGreeting: 'مرحباً موور تي في،',
    waLearnMore: 'مرحباً موور تي في، أريد معرفة المزيد عن الاشتراكات.',
    waOrder: 'مرحباً موور تي في، أرغب في تقديم طلب.',
    orderNow: 'اطلب الآن',
    orderAria: (phone: string) => `اطلب عبر واتساب — ${phone}`,
  },

  notFound: {
    title: 'هذه القناة غير موجودة',
    body: 'الصفحة التي تبحث عنها ليست هنا. كل ما يستحق المشاهدة موجود في الصفحة الرئيسية.',
    home: 'العودة للرئيسية',
    plans: 'شاهد الاشتراكات',
  },

  common: {
    scrollLeft: 'مرّر لليسار',
    scrollRight: 'مرّر لليمين',
  },
};

/** English mirrors the Arabic shape exactly. */
const en: typeof ar = {
  dir: 'ltr' as unknown as 'rtl',
  langName: 'English',
  switchTo: 'العربية',
  switchLabel: 'Switch language to Arabic',

  nav: {
    label: 'Main',
    plans: 'Plans',
    boxes: 'Devices',
    browse: 'Browse',
    why: 'Why Us',
    faq: 'FAQ',
    cta: 'Start Watching',
    home: 'MOORTV — home',
    openMenu: 'Open menu',
    closeMenu: 'Close menu',
    openCart: 'Open cart',
    openCartCount: (n: number) => `Open cart, ${n} item${n === 1 ? '' : 's'}`,
    skip: 'Skip to content',
  },

  hero: {
    saleBadge: 'Summer Sale',
    salePitch: 'Save up to 37% — limited time',
    titleA: 'Everything You Love.',
    titleB: 'One Subscription.',
    subtitle:
      'Watch thousands of movies, TV shows, live channels, sports, kids content and much more from one premium entertainment platform.',
    ctaPrimary: 'Start Watching',
    ctaSecondary: 'View Offers',
    chips: ['Instant activation', 'Works on every device', '4K Ultra HD'],
    scroll: 'Scroll',
    aria: 'MOORTV — everything you love, one subscription',
    tiles: {
      action: 'Action',
      football: 'Football',
      docs: 'Docs',
      comedy: 'Comedy',
      scifi: 'Sci-Fi',
      kids: 'Kids',
      anime: 'Anime',
      drama: 'Drama',
    },
  },

  logos: {
    title: 'All the entertainment you know — in one place',
    disclaimer:
      'All brand names and trademarks shown are the property of their respective owners and are referenced here only to describe the categories of content available. MOORTV is an independent service and is not affiliated with, endorsed by, or sponsored by any of them.',
  },

  stats: {
    srTitle: 'MOORTV by the numbers',
    movies: { label: 'Movies', hint: 'Blockbusters to hidden gems' },
    shows: { label: 'TV Shows', hint: 'Full seasons, always updated' },
    channels: { label: 'Live Channels', hint: 'From every continent' },
    quality: { value: '4K UHD', label: 'Streaming Quality', hint: 'Crystal clear on every screen' },
    everywhere: 'Works Everywhere',
    everywhereHint: 'One account. Every screen in your home.',
    devices: ['Smart TV', 'Android', 'iPhone', 'Tablet', 'PC'],
  },

  sale: {
    limited: 'Limited Time Only',
    title: 'SUMMER SALE',
    body: 'Every subscription and every device is discounted right now.',
    bodyStrong: 'These prices won’t always be available.',
    ctaPrimary: 'Claim the offer',
    ctaSecondary: 'See devices',
    endsIn: 'Offer ends in',
    units: { days: 'Days', hours: 'Hours', minutes: 'Minutes', seconds: 'Seconds' },
  },

  plans: {
    eyebrow: 'Subscriptions',
    titleA: 'Pick your plan.',
    titleB: 'Watch everything.',
    subtitle:
      'One subscription unlocks the entire MOORTV library — every movie, every series, every live channel, on every screen you own.',
    footnote:
      'All plans include instant activation and support on WhatsApp. Prices in Mauritanian ouguiya (MRU).',
    save: (pct: number) => `Save ${pct}%`,
    badges: { popular: 'Most Popular', best: '🔥 Best Offer' },
  },

  devices: {
    eyebrow: 'TV Boxes & Sticks',
    titleA: 'Turn any screen into a',
    titleB: 'smart TV',
    arHeadline: 'حول شاشتك لتلفاز ذكي',
    subtitle: 'Both devices arrive pre-configured with MOORTV installed and a ',
    subtitleStrong: 'full year of subscription included',
    subtitleEnd: '. Plug in, connect WiFi, start watching.',
    yearIncluded: '1 Year Included',
    badgeSeller: 'Best Seller',
    badgeStrong: 'Most Powerful',
    oneTime: 'one-time, year included',
    inStock: 'In stock',
    delivery: 'Delivery available across Mauritania. We help you set it up on WhatsApp — free.',
  },

  categories: {
    eyebrow: 'Browse',
    titleA: 'Everything, sorted the way',
    titleB: 'you watch',
    subtitle:
      'Ten worlds of content, updated constantly. Scroll through and see what your subscription unlocks.',
    explore: 'Explore',
    footballEyebrow: 'Football',
    footballTitle: 'Every major competition',
    footballBody: 'All the big leagues, live and in 4K.',
    rowOne: 'Content categories, row one',
    rowTwo: 'Content categories, row two',
  },

  why: {
    eyebrow: 'Why MOORTV',
    titleA: 'Built to be the',
    titleB: 'best in Mauritania',
    subtitle: 'Not just a bigger catalogue — a better experience, end to end.',
    items: [
      'True 4K UHD with adaptive bitrate, so the picture stays sharp even when the connection dips.',
      'Order on WhatsApp and your line is live in minutes — not hours, not tomorrow.',
      'Over 20,000 movies, 10,000 series and 9,000 live channels in one single place.',
      'Smart TV, Android, iPhone, iPad, laptop or our own device. One account covers them all.',
      'A fraction of what the individual platforms cost separately, with no hidden fees.',
      'Real people on WhatsApp who answer quickly and actually fix things.',
      'Stable servers with anti-freeze technology built for Mauritanian networks.',
      'New films, new seasons and new channels added every single week.',
    ],
  },

  reviews: {
    eyebrow: 'Testimonials',
    titleA: 'Loved across',
    titleB: 'Mauritania',
    subtitle: 'Thousands of households already watch with MOORTV. Here is what a few of them say.',
    stars: '5 out of 5 stars',
    trust: [
      { value: '4.9/5', label: 'Average rating' },
      { value: '5,000+', label: 'Active subscribers' },
      { value: '< 5 min', label: 'Typical activation' },
    ],
  },

  faq: {
    eyebrow: 'FAQ',
    title: 'Questions, answered',
    subtitle:
      'Everything you might want to know before you subscribe. Anything else — just ask us directly.',
    helpBody: 'Still unsure? Message us on WhatsApp and we will answer in minutes.',
    waMessage: 'Hello MOORTV, I have a question about your subscriptions.',
  },

  cart: {
    title: 'Your Cart',
    empty: 'Nothing here yet',
    itemCount: (n: number) => `${n} item${n === 1 ? '' : 's'}`,
    close: 'Close cart',
    remove: (name: string) => `Remove ${name}`,
    increase: (name: string) => `Increase quantity of ${name}`,
    decrease: (name: string) => `Decrease quantity of ${name}`,
    emptyTitle: 'Your cart is empty',
    emptyBody: 'Add a subscription or a device and it will show up here.',
    browsePlans: 'Browse plans',
    subtotal: 'Subtotal',
    savings: 'Summer sale savings',
    total: 'Total',
    checkout: 'Proceed to Checkout',
    noCharge: 'You confirm and pay on WhatsApp — nothing is charged here.',
    addToCart: 'Add to Cart',
    added: 'Added',
    addAria: (name: string) => `Add ${name} to cart`,
    label: 'Shopping cart',
    kindPlan: 'subscription',
    kindDevice: 'device',
  },

  checkout: {
    back: 'Back to plans',
    titleA: 'Complete your',
    titleB: 'order',
    intro:
      'Fill in your details and we will open WhatsApp with your order already written out. Send it to us and your subscription is activated in minutes.',
    detailsTitle: 'Your details',
    detailsHint: 'We only use these to confirm and activate your order.',
    name: 'Customer Name',
    namePlaceholder: 'Mohamed Ould Ahmed',
    nameError: 'Please enter your name.',
    phone: 'Phone Number',
    phonePlaceholder: '44 00 00 00',
    phoneHint: 'Mauritanian number, 8 digits',
    phoneError: 'Please enter a valid phone number.',
    address: 'Address',
    addressPlaceholder: 'Nouakchott, Tevragh Zeina',
    addressHint: 'Only needed if you are ordering a device',
    notes: 'Notes',
    notesPlaceholder: 'Anything we should know — preferred device, delivery time…',
    optional: 'Optional',
    submit: 'Send order on WhatsApp',
    noCharge: (phone: string) =>
      `Nothing is charged on this site. Your order opens as a prefilled WhatsApp message to ${phone}, where we confirm payment and activate you.`,
    sentTitle: 'WhatsApp opened with your order',
    sentBody: 'If it did not open,',
    sentLink: 'tap here to send it manually',
    summary: 'Order summary',
    activation: 'Activation',
    free: 'Free',
    preview: 'Preview the WhatsApp message',
    emptyTitle: 'Your cart is empty',
    emptyBody: 'Pick a subscription or a device first, then come back here to send your order.',
    emptyPlans: 'Browse subscriptions',
    emptyBoxes: 'See devices',
    msg: {
      greeting: 'Hello MOORTV,',
      intro: 'I’d like to place an order.',
      name: 'Name',
      phone: 'Phone',
      address: 'Address',
      products: 'Products:',
      qty: 'Quantity',
      savings: 'Summer sale savings',
      total: 'Total',
      notes: 'Notes',
      closing: 'Please contact me.',
      emptyList: '— (empty)',
    },
  },

  footer: {
    ctaTitleA: 'Ready to watch',
    ctaTitleB: 'everything?',
    ctaSub: 'Subscribe now and enjoy all the content in one place',
    ctaPrimary: 'Start Watching',
    ctaWhatsApp: 'WhatsApp us',
    about:
      'MOORTV brings movies, series, live channels and every major football competition together into one premium subscription — built for Mauritania.',
    explore: 'Explore',
    support: 'Support',
    contact: 'Contact',
    links: {
      subscriptions: 'Subscriptions',
      boxes: 'Devices',
      categories: 'Categories',
      why: 'Why MOORTV',
      faq: 'FAQ',
      reviews: 'Reviews',
      sale: 'Summer Sale',
      checkout: 'Checkout',
    },
    waLine: 'WhatsApp — orders & support',
    snapLine: 'Snapchat — daily offers',
    country: 'Mauritania',
    countryLine: 'Delivery nationwide',
    rights: 'All rights reserved.',
    trademarks:
      'Third-party brand names are the property of their respective owners and are used for descriptive purposes only.',
    waGreeting: 'Hello MOORTV,',
    waLearnMore: 'Hello MOORTV, I would like to know more about your subscriptions.',
    waOrder: 'Hello MOORTV, I would like to place an order.',
    orderNow: 'Order now',
    orderAria: (phone: string) => `Order on WhatsApp — ${phone}`,
  },

  notFound: {
    title: 'This channel doesn’t exist',
    body: 'The page you were looking for isn’t here. Everything worth watching is back on the home page.',
    home: 'Back to home',
    plans: 'View plans',
  },

  common: {
    scrollLeft: 'Scroll left',
    scrollRight: 'Scroll right',
  },
};

export type Dict = typeof ar;

const DICTS: Record<Lang, Dict> = { ar, en };

/* ------------------------------------------------------------------ *
 * Provider
 * ------------------------------------------------------------------ */

type Ctx = {
  lang: Lang;
  dir: 'rtl' | 'ltr';
  isRtl: boolean;
  t: Dict;
  setLang: (l: Lang) => void;
  toggle: () => void;
};

const LanguageContext = createContext<Ctx | null>(null);

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  // Server-renders Arabic; a stored English preference is applied on mount.
  const [lang, setLangState] = useState<Lang>(DEFAULT_LANG);

  useEffect(() => {
    let stored: string | null = null;
    try {
      stored = window.localStorage.getItem(STORAGE_KEY);
    } catch {
      /* private mode — stay on the default */
    }
    if (stored === 'en' || stored === 'ar') setLangState(stored);
  }, []);

  // Keep the document in sync so CSS `[dir]` rules and screen readers agree.
  useEffect(() => {
    const el = document.documentElement;
    el.lang = lang;
    el.dir = lang === 'ar' ? 'rtl' : 'ltr';
  }, [lang]);

  const setLang = useCallback((l: Lang) => {
    setLangState(l);
    try {
      window.localStorage.setItem(STORAGE_KEY, l);
    } catch {
      /* ignore */
    }
  }, []);

  const value = useMemo<Ctx>(() => {
    const dir = lang === 'ar' ? 'rtl' : 'ltr';
    return {
      lang,
      dir,
      isRtl: dir === 'rtl',
      t: DICTS[lang],
      setLang,
      toggle: () => setLang(lang === 'ar' ? 'en' : 'ar'),
    };
  }, [lang, setLang]);

  return <LanguageContext.Provider value={value}>{children}</LanguageContext.Provider>;
}

export function useLang() {
  const ctx = useContext(LanguageContext);
  if (!ctx) throw new Error('useLang must be used inside <LanguageProvider>');
  return ctx;
}

/** Shorthand for components that only need the dictionary. */
export function useT() {
  return useLang().t;
}
