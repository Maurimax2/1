/* ==========================================================
   MAURIMAX — single-file runtime
   Arabic default (RTL); English via the header toggle.
   No dependencies, no build step.
   ========================================================== */
(function () {
'use strict';

/* ---------------- Contact ---------------- */
var WA_DISPLAY = '43 04 24 04';
var WA_E164 = '22243042404';          // Mauritania +222
var SNAP = 'moor.view';
function wa(m){ return 'https://wa.me/' + WA_E164 + '?text=' + encodeURIComponent(m); }
function num(n){ return new Intl.NumberFormat('en-US').format(n); }
function money(n){ return num(n) + ' MRU'; }

/* Brand */
var V = '#4e0d83', V2 = '#7a2bc4', O = '#e86a30', O2 = '#ff8a4f', INK = '#16081f';

/* ---------------- Dictionary ---------------- */
var T = {
ar: {
  dir:'rtl',
  nav:{ plans:'الاشتراكات', football:'كرة القدم', browse:'المحتوى', why:'لماذا نحن', faq:'الأسئلة',
        cta:'اشترك الآن', skip:'تخطَّ إلى المحتوى' },
  hero:{ kicker:'موريماكس', titleA:'كل ما تحب.', titleB:'اشتراك واحد.',
    subtitle:'أفلام ومسلسلات وقنوات مباشرة وكل البطولات الكروية الكبرى بجودة 4K — على كل شاشة تملكها.',
    from:'يبدأ من', ctaPrimary:'اختر اشتراكك', ctaSecondary:'شاهد البطولات',
    pills:['تفعيل خلال دقائق','يعمل على كل الأجهزة','جودة 4K فائقة'] },
  band:['كل البطولات الكروية','أفلام ومسلسلات','قنوات مباشرة','جودة 4K','تفعيل فوري','دعم على واتساب'],
  stats:[ {n:'20,000+',l:'فيلم',h:'من أضخم الأعمال إلى الكنوز المخفية'},
          {n:'10,000+',l:'مسلسل',h:'مواسم كاملة، تُحدَّث دائماً'},
          {n:'9,000+',l:'قناة مباشرة',h:'من كل قارات العالم'},
          {n:'4K UHD',l:'جودة البث',h:'وضوح تام على كل شاشة'} ],
  plans:{ eyebrow:'الأسعار', titleA:'اشتراك واحد،', titleB:'أربعة خيارات.',
    subtitle:'نفس المحتوى الكامل في كل الاشتراكات — الفرق في المدة فقط. كلما طالت المدة قلّت التكلفة الشهرية.',
    footnote:'الأسعار بالأوقية الموريتانية. التفعيل والدعم عبر واتساب، ولا يُخصم أي مبلغ عبر الموقع.',
    perMonth:function(n){ return num(n) + ' أوقية شهرياً'; },
    save:function(p){ return 'وفّر ' + p + '%'; },
    popular:'الأكثر طلباً', best:'أفضل قيمة', add:'أضف إلى السلة',
    months:function(n){ return n===1?'شهر واحد':n===12?'سنة كاملة':n+' أشهر'; },
    features:[
      'المكتبة كاملة بلا استثناء',
      'كل البطولات الكروية مباشرة',
      'أفلام ومسلسلات وأنمي ووثائقيات',
      'قنوات الأطفال والأخبار',
      'جودة 4K على كل الأجهزة',
      'دعم فوري على واتساب' ] },
  football:{ eyebrow:'الرياضة', titleA:'كل مباراة تهمّك،', titleB:'مباشرة.',
    subtitle:'الدوريات الأوروبية الكبرى والبطولات القارية والدوري السعودي — بجودة عالية وبدون تقطيع.',
    bandTitle:'البطولات المتاحة', bandSub:'مباشرة وبجودة تصل إلى 4K',
    bandCta:'اشترك الآن', liveTag:'مباشر',
    leagues:[
      ['Premier League','الدوري الإنجليزي'],
      ['UEFA Champions League','دوري أبطال أوروبا'],
      ['LaLiga','الدوري الإسباني'],
      ['Serie A','الدوري الإيطالي'],
      ['Bundesliga','الدوري الألماني'],
      ['Ligue 1','الدوري الفرنسي'],
      ['Saudi Pro League','الدوري السعودي'],
      ['CAF & World Cup','بطولات أفريقيا والعالم'] ] },
  categories:{ eyebrow:'المحتوى', titleA:'كل شيء،', titleB:'في مكان واحد.',
    subtitle:'مكتبة تُحدَّث باستمرار — تصفّحها وشاهد ما يفتحه لك اشتراك واحد.' },
  why:{ eyebrow:'لماذا موريماكس', titleA:'تجربة', titleB:'تستحق الاشتراك.',
    subtitle:'ليست مجرد مكتبة أكبر — بل خدمة أفضل من البداية إلى النهاية.',
    items:[
      {t:'جودة فائقة',b:'بث 4K مع معدل متكيّف، فتبقى الصورة واضحة حتى عندما يضعف الاتصال.'},
      {t:'تفعيل خلال دقائق',b:'اطلب عبر واتساب ويُفعَّل اشتراكك في الحال — لا انتظار حتى الغد.'},
      {t:'مكتبة ضخمة',b:'أكثر من 20 ألف فيلم و10 آلاف مسلسل و9 آلاف قناة في مكان واحد.'},
      {t:'على كل الأجهزة',b:'شاشة ذكية، أندرويد، آيفون، آيباد أو حاسوب. حساب واحد يغطيها كلها.'},
      {t:'أسعار في المتناول',b:'من 125 أوقية شهرياً — جزء بسيط من تكلفة المنصات منفصلة.'},
      {t:'دعم حقيقي',b:'أشخاص على واتساب يردّون بسرعة ويحلّون المشكلة فعلاً.'},
      {t:'بلا تقطيع',b:'خوادم مستقرة مهيّأة للشبكات الموريتانية، حتى في المباريات الكبرى.'},
      {t:'تحديث أسبوعي',b:'أفلام ومواسم وقنوات جديدة تُضاف كل أسبوع بلا رسوم إضافية.'} ] },
  reviews:{ eyebrow:'آراء العملاء', titleA:'يثق بنا', titleB:'آلاف المشتركين.',
    subtitle:'إليك ما يقوله بعض المشتركين عن التجربة.' },
  faq:{ eyebrow:'الأسئلة', title:'أسئلة وأجوبة',
    subtitle:'كل ما قد تريد معرفته قبل الاشتراك. وأي شيء آخر — اسألنا مباشرة.',
    helpBody:'ما زلت متردداً؟ راسلنا على واتساب ونرد عليك خلال دقائق.',
    waMessage:'مرحباً موريماكس، عندي سؤال حول الاشتراكات.' },
  cart:{ title:'سلّتك', empty:'لا يوجد شيء بعد', emptyTitle:'سلّتك فارغة',
    emptyBody:'اختر اشتراكاً وسيظهر هنا.', browse:'تصفّح الاشتراكات',
    subtotal:'المجموع الفرعي', savings:'وفّرت', total:'الإجمالي', checkout:'إتمام الطلب',
    noCharge:'تؤكّد وتدفع عبر واتساب — لا يُخصم منك شيء هنا.', added:'أُضيف',
    count:function(n){ return n===1?'منتج واحد':n===2?'منتجان':(n<=10?n+' منتجات':n+' منتجاً'); } },
  checkout:{ titleA:'أكمل', titleB:'طلبك', hint:'نستخدم بياناتك فقط لتأكيد الطلب وتفعيله.',
    name:'الاسم', nameError:'الرجاء إدخال اسمك.', phone:'رقم الهاتف',
    phoneHint:'رقم موريتاني من 8 أرقام', phoneError:'الرجاء إدخال رقم هاتف صحيح.',
    notes:'ملاحظات', optional:'اختياري', submit:'أرسل الطلب عبر واتساب',
    note:function(p){ return 'لا يُخصم منك شيء على هذا الموقع. يُفتح طلبك كرسالة واتساب جاهزة إلى '+p+'، حيث نؤكّد الدفع ونفعّل اشتراكك.'; },
    ph:{name:'محمد ولد أحمد',phone:'44 00 00 00',notes:'أي شيء ينبغي أن نعرفه…'},
    msg:{greeting:'مرحباً موريماكس،',intro:'أرغب في الاشتراك.',name:'الاسم',phone:'الهاتف',
      products:'الاشتراك:',qty:'الكمية',total:'الإجمالي',notes:'ملاحظات',closing:'الرجاء التواصل معي.'} },
  footer:{ ctaA:'جاهز للمشاهدة؟', ctaB:'ابدأ اليوم.',
    ctaSub:'اشتراك واحد يفتح لك كل المحتوى — من 350 أوقية.',
    ctaPrimary:'اختر اشتراكك', ctaWhatsApp:'راسلنا على واتساب', orderNow:'اطلب الآن',
    about:'موريماكس يجمع الأفلام والمسلسلات والقنوات المباشرة وكل البطولات الكروية الكبرى في اشتراك واحد — مصمَّم لموريتانيا.',
    explore:'تصفّح', support:'الدعم', contact:'تواصل معنا',
    links:{plans:'الاشتراكات',football:'كرة القدم',cats:'المحتوى',why:'لماذا موريماكس',
      faq:'الأسئلة الشائعة',reviews:'آراء العملاء'},
    waLine:'واتساب — الطلبات والدعم', snapLine:'سناب شات — عروض يومية',
    country:'موريتانيا', countryLine:'خدمة في كل البلاد', rights:'جميع الحقوق محفوظة.',
    trademarks:'أسماء البطولات مذكورة لوصف المحتوى المتاح فقط، وهي ملك لأصحابها. موريماكس خدمة مستقلة غير تابعة لأي منها.',
    waGreeting:'مرحباً موريماكس،',
    waLearn:'مرحباً موريماكس، أريد معرفة المزيد عن الاشتراكات.',
    waOrder:'مرحباً موريماكس، أرغب في الاشتراك.' }
},
en: {
  dir:'ltr',
  nav:{ plans:'Pricing', football:'Football', browse:'Content', why:'Why Us', faq:'FAQ',
        cta:'Subscribe', skip:'Skip to content' },
  hero:{ kicker:'MAURIMAX', titleA:'Everything you love.', titleB:'One subscription.',
    subtitle:'Movies, series, live channels and every major football competition in 4K — on every screen you own.',
    from:'From', ctaPrimary:'Choose your plan', ctaSecondary:'See competitions',
    pills:['Activated in minutes','Works on every device','4K Ultra HD'] },
  band:['Every football league','Movies & series','Live channels','4K quality','Instant activation','WhatsApp support'],
  stats:[ {n:'20,000+',l:'Movies',h:'Blockbusters to hidden gems'},
          {n:'10,000+',l:'TV Shows',h:'Full seasons, always updated'},
          {n:'9,000+',l:'Live Channels',h:'From every continent'},
          {n:'4K UHD',l:'Streaming Quality',h:'Crystal clear on every screen'} ],
  plans:{ eyebrow:'Pricing', titleA:'One subscription,', titleB:'four ways to buy.',
    subtitle:'Every plan unlocks the same full library — only the length changes. The longer you go, the less each month costs.',
    footnote:'Prices in Mauritanian ouguiya. Activation and support happen on WhatsApp; nothing is charged on this site.',
    perMonth:function(n){ return num(n) + ' MRU / month'; },
    save:function(p){ return 'Save ' + p + '%'; },
    popular:'Most popular', best:'Best value', add:'Add to cart',
    months:function(n){ return n===1?'1 Month':n===12?'12 Months':n+' Months'; },
    features:[
      'The complete library',
      'Every football league, live',
      'Movies, series, anime, documentaries',
      'Kids and news channels',
      '4K on every device',
      'Fast WhatsApp support' ] },
  football:{ eyebrow:'Sport', titleA:'Every match that matters,', titleB:'live.',
    subtitle:'The big European leagues, continental competitions and the Saudi Pro League — in high quality, without buffering.',
    bandTitle:'Competitions included', bandSub:'Live, in quality up to 4K',
    bandCta:'Subscribe now', liveTag:'LIVE',
    leagues:[
      ['Premier League','England'],
      ['UEFA Champions League','Europe'],
      ['LaLiga','Spain'],
      ['Serie A','Italy'],
      ['Bundesliga','Germany'],
      ['Ligue 1','France'],
      ['Saudi Pro League','Saudi Arabia'],
      ['CAF & World Cup','International'] ] },
  categories:{ eyebrow:'Content', titleA:'Everything,', titleB:'in one place.',
    subtitle:'A library that grows every week — browse what a single subscription unlocks.' },
  why:{ eyebrow:'Why MAURIMAX', titleA:'An experience', titleB:'worth subscribing to.',
    subtitle:'Not just a bigger catalogue — a better service, end to end.',
    items:[
      {t:'Ultra HD quality',b:'4K with adaptive bitrate, so the picture stays sharp even when the connection dips.'},
      {t:'Live in minutes',b:'Order on WhatsApp and your line is activated straight away — no waiting until tomorrow.'},
      {t:'Massive library',b:'Over 20,000 movies, 10,000 series and 9,000 channels in one place.'},
      {t:'Every device',b:'Smart TV, Android, iPhone, iPad or laptop. One account covers them all.'},
      {t:'Genuinely affordable',b:'From 125 MRU a month — a fraction of the platforms bought separately.'},
      {t:'Real support',b:'People on WhatsApp who answer quickly and actually fix things.'},
      {t:'No buffering',b:'Stable servers tuned for Mauritanian networks, even on the big matches.'},
      {t:'Updated weekly',b:'New films, seasons and channels added every week at no extra cost.'} ] },
  reviews:{ eyebrow:'Testimonials', titleA:'Trusted by', titleB:'thousands.',
    subtitle:'Here is what some subscribers say about the experience.' },
  faq:{ eyebrow:'FAQ', title:'Questions, answered',
    subtitle:'Everything you might want to know before subscribing. Anything else — just ask.',
    helpBody:'Still unsure? Message us on WhatsApp and we will answer in minutes.',
    waMessage:'Hello MAURIMAX, I have a question about your subscriptions.' },
  cart:{ title:'Your cart', empty:'Nothing here yet', emptyTitle:'Your cart is empty',
    emptyBody:'Pick a subscription and it will show up here.', browse:'Browse plans',
    subtotal:'Subtotal', savings:'You save', total:'Total', checkout:'Proceed to checkout',
    noCharge:'You confirm and pay on WhatsApp — nothing is charged here.', added:'Added',
    count:function(n){ return n + ' item' + (n===1?'':'s'); } },
  checkout:{ titleA:'Complete your', titleB:'order', hint:'We only use your details to confirm and activate the order.',
    name:'Full name', nameError:'Please enter your name.', phone:'Phone number',
    phoneHint:'Mauritanian number, 8 digits', phoneError:'Please enter a valid phone number.',
    notes:'Notes', optional:'Optional', submit:'Send order on WhatsApp',
    note:function(p){ return 'Nothing is charged on this site. Your order opens as a prefilled WhatsApp message to '+p+', where we confirm payment and activate you.'; },
    ph:{name:'Mohamed Ould Ahmed',phone:'44 00 00 00',notes:'Anything we should know…'},
    msg:{greeting:'Hello MAURIMAX,',intro:'I would like to subscribe.',name:'Name',phone:'Phone',
      products:'Subscription:',qty:'Quantity',total:'Total',notes:'Notes',closing:'Please contact me.'} },
  footer:{ ctaA:'Ready to watch?', ctaB:'Start today.',
    ctaSub:'One subscription unlocks everything — from 350 MRU.',
    ctaPrimary:'Choose your plan', ctaWhatsApp:'WhatsApp us', orderNow:'Order now',
    about:'MAURIMAX brings movies, series, live channels and every major football competition together into one subscription — built for Mauritania.',
    explore:'Explore', support:'Support', contact:'Contact',
    links:{plans:'Pricing',football:'Football',cats:'Content',why:'Why MAURIMAX',
      faq:'FAQ',reviews:'Reviews'},
    waLine:'WhatsApp — orders & support', snapLine:'Snapchat — daily offers',
    country:'Mauritania', countryLine:'Service nationwide', rights:'All rights reserved.',
    trademarks:'Competition names are used to describe available content only and remain the property of their owners. MAURIMAX is an independent service, not affiliated with any of them.',
    waGreeting:'Hello MAURIMAX,',
    waLearn:'Hello MAURIMAX, I would like to know more about your subscriptions.',
    waOrder:'Hello MAURIMAX, I would like to subscribe.' }
}
};

/* ---------------- Plans ----------------
   350 / 700 / 1000 / 1500 MRU. The monthly rate (350) is the reference the
   savings percentages are measured against. */
var BASE = 350;
var PLANS = [
  { id:'p1',  months:1,  price:350,  art:'m1',  photo:'p-haaland' },
  { id:'p3',  months:3,  price:700,  art:'m3',  photo:'p-ronaldo', badge:'popular' },
  { id:'p6',  months:6,  price:1000, art:'m6',  photo:'p-yamal' },
  { id:'p12', months:12, price:1500, art:'m12', photo:'p-messi', badge:'best', best:true }
];
PLANS.forEach(function (p) {
  p.ref = BASE * p.months;
  p.per = Math.round(p.price / p.months);
  p.savePct = Math.round((1 - p.price / p.ref) * 100);
});
function find(id){ for(var i=0;i<PLANS.length;i++) if(PLANS[i].id===id) return PLANS[i]; return null; }

var CATS = [
  {art:'movies',   ar:['أفلام','أكثر من 20,000 فيلم'],        en:['Movies','20,000+ titles']},
  {art:'series',   ar:['مسلسلات','أكثر من 10,000 مسلسل'],     en:['TV Shows','10,000+ series']},
  {art:'football', photo:'c-football', ar:['كرة القدم','كل الدوريات الكبرى'], en:['Football','Every major league']},
  {art:'sports',   photo:'c-sports',   ar:['رياضة','أكثر من 900 قناة'],       en:['Sports','900+ channels']},
  {art:'kids',     ar:['أطفال','آمن وممتع'],                   en:['Kids','Safe & fun']},
  {art:'anime',    ar:['أنمي','مترجم ومدبلج'],                 en:['Anime','Subbed & dubbed']},
  {art:'docs',     ar:['وثائقيات','قصص حقيقية'],               en:['Documentaries','Real stories']},
  {art:'news',     ar:['أخبار','على مدار الساعة'],             en:['News','24/7 worldwide']},
  {art:'series2',  ar:['دراما عربية وتركية','مواسم كاملة'],    en:['Arabic & Turkish drama','Full seasons']},
  {art:'live',     photo:'c-live',     ar:['قنوات مباشرة','أكثر من 9,000 قناة'], en:['Live TV','9,000+ channels']}
];

/* Illustrative examples, not verified customer reviews — replace before launch. */
var REVIEWS = [
  {i:'MA',ar:['محمد ولد أحمد','نواكشوط','أتابع كل مباريات دوري الأبطال بجودة عالية دون أي تقطيع، والتفعيل استغرق دقائق فقط.'],
        en:['Mohamed Ould Ahmed','Nouakchott','I follow every Champions League match in high quality without a single freeze, and activation took minutes.']},
  {i:'FS',ar:['فاطمتو منت سيدي','نواذيبو','قسم الأطفال ممتاز وزوجي يجد كل مبارياته. اشتراك واحد عوّض ثلاثة كنا ندفعها.'],
        en:['Fatimetou Mint Sidi','Nouadhibou','The kids section is perfect and my husband gets his football. One subscription replaced three.']},
  {i:'CD',ar:['الشيخ ديالو','روصو','اشتركت سنة كاملة بـ1500 أوقية. أرخص بكثير من أي خيار آخر جربته.'],
        en:['Cheikh Diallo','Rosso','I took the full year for 1,500 MRU. Far cheaper than anything else I had tried.']},
  {i:'AB',ar:['أمينتو منت بابا','كيفة','كل المسلسلات التي أتابعها موجودة، والحلقات الجديدة تظهر في نفس الأسبوع.'],
        en:['Aminetou Mint Baba','Kiffa','Every series I follow is there, and new episodes appear the same week.']},
  {i:'SV',ar:['سيدي محمد فال','أطار','ما أقنعني هو الدعم — أرسلت رسالة ليلاً فردّ عليّ أحدهم وحلّ المشكلة فوراً.'],
        en:['Sidi Mohamed Vall','Atar','What convinced me was the support — I messaged at night and someone fixed it right away.']}
];

var FAQS = [
  {ar:['كيف أحصل على اشتراكي؟','اختر المدة، أضفها إلى السلة وأكمل الطلب — سيفتح الموقع واتساب وطلبك مكتوب بالفعل. أرسله ونرد ببيانات التفعيل خلال دقائق.'],
   en:['How do I get my subscription?','Pick a length, add it to the cart and check out — the site opens WhatsApp with your order already written. Send it and we reply with your activation details within minutes.']},
  {ar:['ما الفرق بين الاشتراكات؟','لا فرق في المحتوى إطلاقاً — كل الاشتراكات تفتح المكتبة كاملة. الفرق في المدة فقط: كلما طالت المدة انخفضت التكلفة الشهرية، من 350 أوقية للشهر إلى 125 أوقية شهرياً في اشتراك السنة.'],
   en:['What is the difference between the plans?','None at all in content — every plan unlocks the full library. Only the length differs: the longer the term, the lower the monthly cost, from 350 MRU for one month down to 125 MRU a month on the yearly plan.']},
  {ar:['على أي الأجهزة يعمل؟','الشاشات الذكية (سامسونج، إل جي، أندرويد تي في)، هواتف وأجهزة أندرويد، الآيفون والآيباد، وحواسيب ويندوز وماك. حساب واحد يكفي البيت كله ونساعدك في الإعداد.'],
   en:['Which devices does it work on?','Smart TVs (Samsung, LG, Android TV), Android phones and boxes, iPhone and iPad, and Windows and Mac laptops. One account covers your household and we help you set it up.']},
  {ar:['هل أحتاج إنترنت سريع؟','لجودة 4K ننصح بحوالي 25 ميجابت. الجودة الكاملة HD تعمل بسلاسة من 10 ميجابت، والبث يتكيّف تلقائياً إذا ضعف الاتصال فلا تتوقف المشاهدة.'],
   en:['Do I need fast internet?','For 4K we recommend around 25 Mbps. Full HD works comfortably from 10 Mbps, and the stream adapts automatically if your connection dips.']},
  {ar:['كيف أدفع؟','نرتّب الدفع مباشرة عبر واتساب بالوسائل المتداولة في موريتانيا — بنكيلي أو مصرفي أو سداد أو نقداً. لا يُخصم أي مبلغ عبر الموقع.'],
   en:['How do I pay?','We arrange payment directly on WhatsApp using the methods common in Mauritania — Bankily, Masrvi, Sedad or cash. Nothing is charged through the site.']},
  {ar:['ماذا يحدث عند انتهاء الاشتراك؟','نراسلك قبل تاريخ الانتهاء حتى لا ينقطع البث. التجديد برسالة واحدة وتحتفظ بنفس الإعدادات.'],
   en:['What happens when it expires?','We message you before the end date so there is no interruption. Renewing takes one message and you keep the same settings.']},
  {ar:['ماذا لو توقف شيء عن العمل؟','راسلنا على واتساب في أي وقت. معظم المشاكل تُحل بتعديل بسيط، وإذا احتاج الخادم إلى تغيير ننقلك فوراً وبدون تكلفة.'],
   en:['What if something stops working?','Message us on WhatsApp any time. Most issues are a quick settings fix; if a server needs changing we move you across immediately, at no cost.']}
];

/* ---------------- Artwork ----------------
   Original SVG, drawn for the light theme in the brand palette.
   Nothing here is licensed from anyone. */
function rep(n,fn){ var o=''; for(var i=0;i<n;i++) o+=fn(i); return o; }
function esc(s){ return String(s).replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;').replace(/"/g,'&quot;'); }

/* Photographs supplied by the brand, inlined by build-maurimax.mjs as
   { 'p-messi': 'data:image/webp;base64,…', … }. Absent when maurimax.js is
   loaded on its own during development, so every caller degrades to the
   drawn SVG rather than rendering a broken image. */
var MXIMG = window.MXIMG || {};
function photo(key){ return (key && MXIMG[key]) || ''; }

/* Parallel to football.leagues in the dictionaries; '' where no mark exists. */
var LEAGUE_CRESTS = ['l-epl','l-ucl','l-laliga','l-seriea','l-bundesliga','','l-spl',''];

/* The poster wall. `i` indexes football.leagues so the caption reads from the
   dictionary and stays translated. */
var POSTERS = [
  { i:0, shot:'po-epl',        crest:'l-epl' },
  { i:1, shot:'po-ucl',        crest:'l-ucl' },
  { i:2, shot:'po-laliga',     crest:'l-laliga' },
  { i:3, shot:'po-seriea',     crest:'l-seriea' },
  { i:4, shot:'po-bundesliga', crest:'l-bundesliga' },
  { i:5, shot:'po-ligue1',     crest:'' }
];

function scene(variant, img) {
  var id = 'g' + variant;
  if (img) {
    return '<div class="artimg cut"><span class="bed" style="background:linear-gradient(150deg,' + V + ',' + V2 + ' 55%,#2a0a49)"></span>' +
           '<img src="' + esc(img) + '" alt="" loading="lazy" decoding="async"><span class="vig"></span></div>';
  }
  var body = '';
  switch (variant) {
    case 'movies': body =
      '<g transform="rotate(-16 200 260)"><rect x="-40" y="200" width="480" height="118" rx="10" fill="#fff" opacity=".14"/>' +
      rep(14,function(i){ return '<rect x="'+(-30+i*35)+'" y="210" width="17" height="13" rx="3" fill="#fff" opacity=".4"/>' +
        '<rect x="'+(-30+i*35)+'" y="294" width="17" height="13" rx="3" fill="#fff" opacity=".4"/>'; }) + '</g>' +
      '<circle cx="200" cy="258" r="50" fill="#fff" opacity=".95"/><path d="M186 236 226 258 186 280Z" fill="'+V+'"/>'; break;
    case 'series': case 'series2': body =
      rep(3,function(i){ return '<rect x="'+(64+i*24)+'" y="'+(178-i*15)+'" width="214" height="146" rx="16" fill="#fff" opacity="'+(.16+i*.12)+'"/>'; }) +
      '<rect x="112" y="148" width="214" height="146" rx="16" fill="#fff" opacity=".95"/>' +
      '<path d="M203 198 243 221 203 244Z" fill="'+V+'"/>'; break;
    case 'football': body =
      '<ellipse cx="200" cy="340" rx="228" ry="116" fill="#fff" opacity=".1"/>' +
      '<ellipse cx="200" cy="340" rx="228" ry="116" fill="none" stroke="#fff" stroke-opacity=".35"/>' +
      '<ellipse cx="200" cy="340" rx="116" ry="60" fill="none" stroke="#fff" stroke-opacity=".35"/>' +
      '<path d="M-30 340h460" stroke="#fff" stroke-opacity=".35"/>' +
      '<g transform="translate(200 182)"><circle r="60" fill="#fff"/>' +
      '<path d="M0-36 32-13 19 25-19 25-32-13Z" fill="'+INK+'"/>' +
      [0,72,144,216,288].map(function(d){ return '<path transform="rotate('+d+')" d="M0-60 15-41-15-41Z" fill="'+INK+'" opacity=".9"/>'; }).join('') +
      '</g>'; break;
    case 'sports': body =
      rep(5,function(i){ return '<path d="M-20 '+(430-i*56)+' Q200 '+(340-i*60)+' 420 '+(410-i*56)+'" fill="none" stroke="#fff" stroke-opacity="'+(.4-i*.06)+'" stroke-width="'+(3.4-i*.4)+'"/>'; }) +
      '<g transform="translate(200 246)"><path d="M-54 42-18-48 18-48 54 42Z" fill="#fff" opacity=".2" stroke="#fff" stroke-opacity=".7"/>' +
      '<rect x="-11" y="42" width="22" height="36" fill="#fff"/><rect x="-36" y="76" width="72" height="13" rx="6.5" fill="#fff"/></g>'; break;
    case 'kids': body =
      [[92,186,54],[286,146,42],[318,304,60],[110,340,46],[200,244,80]].map(function(c,i){
        return '<circle cx="'+c[0]+'" cy="'+c[1]+'" r="'+c[2]+'" fill="#fff" opacity="'+(i===4?.9:.22)+'"/>'; }).join('') +
      '<path transform="translate(200 244)" d="M0-44 13-13 46-13 19 8 29 40 0 20-29 40-19 8-46-13-13-13Z" fill="'+O+'"/>'; break;
    case 'anime': body =
      rep(28,function(i){ var a=i/28*Math.PI*2;
        return '<line x1="'+(200+Math.cos(a)*72).toFixed(1)+'" y1="'+(244+Math.sin(a)*72).toFixed(1)+'" x2="'+(200+Math.cos(a)*330).toFixed(1)+'" y2="'+(244+Math.sin(a)*330).toFixed(1)+'" stroke="#fff" stroke-opacity="'+(i%3===0?.36:.14)+'" stroke-width="'+(i%3===0?3:1.4)+'"/>'; }) +
      '<ellipse cx="200" cy="244" rx="56" ry="37" fill="#fff"/><circle cx="200" cy="244" r="21" fill="'+V+'"/><circle cx="191" cy="236" r="7" fill="#fff"/>'; break;
    case 'docs': body =
      '<path d="M-20 410 112 258 202 336 302 196 420 306v254H-20Z" fill="#fff" opacity=".16"/>' +
      '<path d="M-20 448 122 328 216 392 322 268 420 356" fill="none" stroke="#fff" stroke-opacity=".5" stroke-width="2.4"/>' +
      '<circle cx="300" cy="136" r="44" fill="#fff" opacity=".9"/>' +
      rep(18,function(i){ return '<circle cx="'+((i*97)%400)+'" cy="'+((i*53)%230)+'" r="1.7" fill="#fff" opacity=".55"/>'; }); break;
    case 'news': body =
      '<circle cx="200" cy="234" r="116" fill="none" stroke="#fff" stroke-opacity=".45"/>' +
      '<ellipse cx="200" cy="234" rx="52" ry="116" fill="none" stroke="#fff" stroke-opacity=".38"/>' +
      '<ellipse cx="200" cy="234" rx="98" ry="116" fill="none" stroke="#fff" stroke-opacity=".24"/>' +
      '<path d="M84 234h232M96 178h208M96 290h208" stroke="#fff" stroke-opacity=".3"/>' +
      '<rect x="62" y="386" width="276" height="44" rx="9" fill="'+O+'"/>' +
      '<rect x="78" y="402" width="148" height="12" rx="6" fill="#fff"/><rect x="238" y="402" width="64" height="12" rx="6" fill="#fff" opacity=".6"/>'; break;
    case 'live': body =
      '<rect x="52" y="146" width="296" height="184" rx="18" fill="#fff" opacity=".14" stroke="#fff" stroke-opacity=".45"/>' +
      rep(6,function(i){ return '<rect x="'+(70+(i%3)*94)+'" y="'+(162+Math.floor(i/3)*86)+'" width="78" height="70" rx="10" fill="#fff" opacity="'+(.2+(i%3)*.14)+'"/>'; }) +
      '<rect x="176" y="330" width="48" height="30" fill="#fff" opacity=".4"/><rect x="128" y="360" width="144" height="12" rx="6" fill="#fff" opacity=".6"/>' +
      '<circle cx="300" cy="124" r="10" fill="'+O+'"/>'; break;

    /* Plan tiers — a numeral in a monumental ring */
    case 'm1': case 'm3': case 'm6': case 'm12': {
      var n = variant.slice(1);
      body = rep(3,function(i){ return '<circle cx="200" cy="250" r="'+(74+i*30)+'" fill="none" stroke="#fff" stroke-opacity="'+(.32-i*.09)+'" stroke-width="2"/>'; }) +
        '<circle cx="200" cy="250" r="74" fill="#fff" opacity=".12"/>' +
        '<text x="200" y="' + (n.length>1?272:274) + '" text-anchor="middle" fill="#fff" font-family="Archivo,sans-serif" font-weight="900" font-size="' + (n.length>1?86:96) + '">' + n + '</text>';
      break;
    }
    /* Hero composition — pitch, ball, floodlights */
    case 'hero': body =
      '<ellipse cx="200" cy="392" rx="250" ry="96" fill="#fff" opacity=".12"/>' +
      '<ellipse cx="200" cy="392" rx="250" ry="96" fill="none" stroke="#fff" stroke-opacity=".3"/>' +
      '<ellipse cx="200" cy="392" rx="118" ry="46" fill="none" stroke="#fff" stroke-opacity=".3"/>' +
      rep(2,function(i){ var x = i? 330 : 70;
        return '<rect x="'+(x-4)+'" y="120" width="8" height="180" rx="4" fill="#fff" opacity=".3"/>' +
               '<rect x="'+(x-34)+'" y="96" width="68" height="30" rx="8" fill="#fff" opacity=".55"/>' +
               '<path d="M'+(x-34)+' 126 L'+(x-120)+' 300 L'+(x+120)+' 300 L'+(x+34)+' 126Z" fill="#fff" opacity=".07"/>'; }) +
      '<g transform="translate(200 236)"><circle r="76" fill="#fff"/>' +
      '<path d="M0-46 41-17 24 32-24 32-41-17Z" fill="'+INK+'"/>' +
      [0,72,144,216,288].map(function(d){ return '<path transform="rotate('+d+')" d="M0-76 19-52-19-52Z" fill="'+INK+'" opacity=".92"/>'; }).join('') +
      '</g>' +
      '<g transform="translate(200 384)"><ellipse rx="70" ry="14" fill="'+INK+'" opacity=".22"/></g>'; break;
    default: body = '<circle cx="200" cy="250" r="90" fill="#fff" opacity=".2"/>';
  }
  return '<svg viewBox="0 0 400 560" preserveAspectRatio="xMidYMid slice" aria-hidden="true" focusable="false">' +
    '<defs><linearGradient id="'+id+'" x1=".1" y1="0" x2=".9" y2="1">' +
    '<stop offset="0%" stop-color="'+V2+'"/><stop offset="55%" stop-color="'+V+'"/><stop offset="100%" stop-color="#2a0a49"/></linearGradient></defs>' +
    '<rect width="400" height="560" fill="url(#'+id+')"/>' +
    '<g>'+body+'</g></svg>';
}

var TICK = '<svg viewBox="0 0 16 16" width="15" height="15" fill="none" aria-hidden><path d="m3 8.5 3.2 3.2L13 4.6" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"/></svg>';
var STAR = '<svg viewBox="0 0 20 20" width="15" height="15" aria-hidden><path d="M10 1.6l2.5 5.1 5.6.8-4 3.9 1 5.6L10 14.3l-5 2.7 1-5.6-4.1-3.9 5.6-.8Z" fill="'+O+'"/></svg>';
var WHY_PATHS = [
  'M12 3.2 13.9 9l5.9 1.9-5.9 1.9L12 18.8l-1.9-5.9L4.2 11 10.1 9Z',
  'M13.2 2.5 5 13.4h5.5l-.8 8.1L18.9 10.4H13.4Z',
  'm12 3 8.5 4.4L12 11.8 3.5 7.4ZM3.5 12l8.5 4.4 8.5-4.4M3.5 16.6 12 21l8.5-4.4',
  'M2.5 5h13v10h-13ZM16.5 9h5v10h-5ZM6.5 18.5h5M9 15v3.5',
  'M11.2 3.2H20v9.6l-7 7-9.8-9.8Z',
  'M4.5 13v-1a7.5 7.5 0 0 1 15 0v1M2.6 12.6h4v6.4h-4ZM17.4 12.6h4v6.4h-4Z',
  'M12 2.8 4.8 5.8v5.6c0 4.4 3 8.1 7.2 9.8 4.2-1.7 7.2-5.4 7.2-9.8V5.8Zm-3.2 9 2.3 2.3 4.1-4.6',
  'M20.2 11.2a8.2 8.2 0 1 0-1.3 5.6M20.6 5.6v5.6H15'
];

/* ---------------- State ---------------- */
var lang = 'ar';
try { var st = localStorage.getItem('maurimax.lang'); if (st==='ar'||st==='en') lang = st; } catch(e){}
var cart = [];
try { var raw = localStorage.getItem('maurimax.cart');
  if (raw) { var pj = JSON.parse(raw);
    if (Object.prototype.toString.call(pj)==='[object Array]') cart = pj.filter(function(l){ return l && find(l.id) && l.q>0; }); } } catch(e){}
function saveCart(){ try{ localStorage.setItem('maurimax.cart', JSON.stringify(cart)); }catch(e){} }
function t(){ return T[lang]; }
function $(s,r){ return (r||document).querySelector(s); }
function $$(s,r){ return Array.prototype.slice.call((r||document).querySelectorAll(s)); }
var REDUCED = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

/* ---------------- Render ---------------- */
function render() {
  var d = t();
  document.documentElement.lang = lang;
  document.documentElement.dir = d.dir;
  $('#langTxt').textContent = lang === 'ar' ? 'EN' : 'ع';
  $('#lang').setAttribute('aria-label', lang==='ar' ? 'Switch to English' : 'التبديل إلى العربية');

  $$('[data-i]').forEach(function (el) {
    var v = d, parts = el.getAttribute('data-i').split('.');
    for (var i=0;i<parts.length && v!=null;i++) v = v[parts[i]];
    if (typeof v === 'string') el.textContent = v;
  });

  var links = [['plans','#plans'],['football','#football'],['browse','#categories'],['why','#why'],['faq','#faq']];
  $('#nav').innerHTML = links.map(function(l){ return '<a href="'+l[1]+'">'+esc(d.nav[l[0]])+'</a>'; }).join('');
  $('#menuList').innerHTML = links.map(function(l,i){
    return '<a href="'+l[1]+'" data-close>'+esc(d.nav[l[0]])+'<span>0'+(i+1)+'</span></a>'; }).join('');

  $('#heroPills').innerHTML = d.hero.pills.map(function(p){ return '<span class="pill"><i></i>'+esc(p)+'</span>'; }).join('');
  var star = photo('p-alvarez');
  $('#heroStage').innerHTML =
    '<div style="border-radius:26px;overflow:hidden;aspect-ratio:4/3.4;box-shadow:0 40px 80px -40px rgba(78,13,131,.55)">'+scene('hero')+'</div>' +
    (star ? '<img class="star" src="'+star+'" alt="" decoding="async">' : '');
  $('#fromPrice').textContent = num(BASE);

  var band = d.band.concat(d.band);
  $('#bandTrack').innerHTML = band.map(function(b){ return '<span class="it">'+esc(b)+'<em>✦</em></span>'; }).join('');

  $('#statRow').innerHTML = d.stats.map(function(s){
    return '<div class="statCell"><div class="n keep">'+esc(s.n)+'</div><div class="l">'+esc(s.l)+'</div><div class="h">'+esc(s.h)+'</div></div>'; }).join('');

  $('#planCards').innerHTML = PLANS.map(function(p){ return planCard(p,d); }).join('');

  $('#posterWall').innerHTML = POSTERS.map(function(po){
    var shot = photo(po.shot); if (!shot) return '';
    var l = d.football.leagues[po.i], crest = photo(po.crest);
    return '<a class="po" href="#plans" aria-label="'+esc(l[0])+'">'+
      '<img class="shot" src="'+shot+'" alt="" loading="lazy" decoding="async">'+
      '<span class="scrim"></span>'+
      '<span class="live keep"><i></i>'+esc(d.football.liveTag)+'</span>'+
      '<span class="cap">'+
        (crest ? '<img src="'+crest+'" alt="" loading="lazy" decoding="async">' : '')+
        '<span><b class="keep" dir="ltr">'+esc(l[0])+'</b><s>'+esc(l[1])+'</s></span>'+
      '</span></a>'; }).join('');

  $('#leagueList').innerHTML = d.football.leagues.map(function(l,i){
    var crest = photo(LEAGUE_CRESTS[i]);
    return '<div class="lg"><span class="top">'+
      (crest ? '<img class="crest" src="'+crest+'" alt="" loading="lazy" decoding="async">'
             : '<span class="crest" aria-hidden="true"></span>')+
      '<span class="nm keep" dir="ltr">'+esc(l[0])+'</span></span>'+
      '<span class="sub">'+esc(l[1])+'</span></div>'; }).join('');

  $('#catA').innerHTML = CATS.slice(0,5).map(catCard).join('');
  $('#catB').innerHTML = CATS.slice(5).map(catCard).join('');

  $('#whyGrid').innerHTML = d.why.items.map(function(w,i){
    return '<div class="feat"><span class="ic"><svg viewBox="0 0 24 24" width="24" height="24" fill="none" aria-hidden>'+
      '<path d="'+WHY_PATHS[i]+'" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round"/></svg></span>'+
      '<h3>'+esc(w.t)+'</h3><p>'+esc(w.b)+'</p></div>'; }).join('');

  $('#rvRail').innerHTML = REVIEWS.map(function(r){
    var x = r[lang];
    return '<figure class="rv"><div style="display:flex;gap:3px">'+rep(5,function(){return STAR;})+'</div>'+
      '<blockquote class="q">“'+esc(x[2])+'”</blockquote>'+
      '<figcaption class="who"><span class="av">'+r.i+'</span><span>'+
      '<span style="display:block;font-size:14px;font-weight:700">'+esc(x[0])+'</span>'+
      '<span style="display:block;font-size:12.5px;color:var(--muted)">'+esc(x[1])+'</span></span></figcaption></figure>'; }).join('');

  $('#faqList').innerHTML = FAQS.map(function(f,i){
    var x = f[lang];
    return '<div class="acc'+(i===0?' on':'')+'"><button type="button" aria-expanded="'+(i===0)+'">'+
      '<span>'+esc(x[0])+'</span><span class="pm"></span></button>'+
      '<div class="panel"><p>'+esc(x[1])+'</p></div></div>'; }).join('');

  var fl = d.footer.links;
  $('#fExplore').innerHTML = [[fl.plans,'#plans'],[fl.football,'#football'],[fl.cats,'#categories'],[fl.why,'#why']]
    .map(function(x){ return '<li><a href="'+x[1]+'">'+esc(x[0])+'</a></li>'; }).join('');
  $('#fSupport').innerHTML = [[fl.faq,'#faq'],[fl.reviews,'#reviews']]
    .map(function(x){ return '<li><a href="'+x[1]+'">'+esc(x[0])+'</a></li>'; }).join('');
  $('#fContact').innerHTML =
    '<li><a href="'+wa(d.footer.waGreeting)+'" target="_blank" rel="noopener"><span dir="ltr" style="display:block;color:#fff;font-weight:700">'+WA_DISPLAY+'</span><span style="font-size:12.5px">'+esc(d.footer.waLine)+'</span></a></li>'+
    '<li><a href="https://www.snapchat.com/add/'+SNAP+'" target="_blank" rel="noopener"><span dir="ltr" style="display:block;color:#fff;font-weight:700">'+SNAP+'</span><span style="font-size:12.5px">'+esc(d.footer.snapLine)+'</span></a></li>'+
    '<li><span style="display:block;color:#fff;font-weight:700">'+esc(d.footer.country)+'</span><span style="font-size:12.5px;color:rgba(255,255,255,.5)">'+esc(d.footer.countryLine)+'</span></li>';

  $('#faqWa').href = wa(d.faq.waMessage);
  $('#footWa').href = wa(d.footer.waLearn);
  $('#socWa').href = wa(d.footer.waGreeting);
  $('#fab').href = wa(d.footer.waOrder);
  $('#fab').setAttribute('aria-label', d.footer.orderNow + ' — ' + WA_DISPLAY);
  $('#coNote').textContent = d.checkout.note(WA_DISPLAY);
  $('#cName').placeholder = d.checkout.ph.name;
  $('#cPhone').placeholder = d.checkout.ph.phone;
  $('#cNotes').placeholder = d.checkout.ph.notes;

  renderCart();
  reveal();
  accordions();
  railArrows();
}

function planCard(p, d) {
  var tag = p.badge ? '<span class="tag">'+esc(p.badge==='best'?d.plans.best:d.plans.popular)+'</span>' : '';
  // The monthly plan has nothing to save against, but it still reserves the
  // row so all four artwork frames line up across the grid.
  var save = p.savePct > 0
    ? '<span class="save">'+esc(d.plans.save(p.savePct))+'</span>'
    : '<span class="save" aria-hidden="true" style="visibility:hidden">'+esc(d.plans.save(0))+'</span>';
  return '<article class="plan rev'+(p.best?' best':'')+'">'+tag+
    '<div class="dur">'+esc(d.plans.months(p.months))+'</div>'+
    '<div class="amount" dir="ltr"><b class="keep">'+num(p.price)+'</b><s>MRU</s></div>'+
    '<div class="per">'+esc(d.plans.perMonth(p.per))+'</div>'+ save +
    '<div class="art">'+planArt(p)+'</div>'+
    '<ul>'+d.plans.features.map(function(f){ return '<li>'+TICK+'<span>'+esc(f)+'</span></li>'; }).join('')+'</ul>'+
    '<div class="go"><button class="btn '+(p.best?'btn-o':'btn-v')+' btn-full" data-add="'+p.id+'"><span>'+esc(d.plans.add)+'</span></button></div>'+
    '</article>';
}

/* A player standing on the plan's own violet field, with the number of months
   set behind them. Falls back to the drawn numeral when no photo is inlined. */
function planArt(p) {
  var src = photo(p.photo);
  if (!src) return scene(p.art);
  return '<div class="artimg cut">' +
    '<span class="bed" style="background:linear-gradient(150deg,' + V + ',' + V2 + ' 55%,#2a0a49)"></span>' +
    '<span class="ghost keep" aria-hidden="true">' + p.months + '</span>' +
    '<span class="glow"></span>' +
    '<img src="' + src + '" alt="" loading="lazy" decoding="async">' +
    '<span class="vig"></span></div>';
}

function catCard(c) {
  var x = c[lang], shot = photo(c.photo);
  var art = shot
    ? '<div class="artimg"><img src="'+shot+'" alt="" loading="lazy" decoding="async">'+
      '<span class="vig" style="background:linear-gradient(to top,rgba(14,4,22,.88) 6%,rgba(14,4,22,.3) 40%,rgba(78,13,131,.18))"></span></div>'
    : scene(c.art, c.img);
  return '<a href="#plans" class="cat rev" aria-label="'+esc(x[0])+'"><div class="fr">'+art+
    '<div class="meta"><h3>'+esc(x[0])+'</h3><p class="c">'+esc(x[1])+'</p></div></div></a>';
}

/* ---------------- Cart ---------------- */
function totals(){
  var sub=0, ref=0, n=0;
  cart.forEach(function(l){ var p=find(l.id); if(!p) return;
    sub += p.price*l.q; ref += p.ref*l.q; n += l.q; });
  return { sub:sub, save:Math.max(0, ref-sub), n:n };
}
function add(id){
  for (var i=0;i<cart.length;i++) if (cart[i].id===id){ cart[i].q=Math.min(20,cart[i].q+1); saveCart(); renderCart(); return; }
  cart.push({id:id,q:1}); saveCart(); renderCart();
}
function setQ(id,q){
  for (var i=0;i<cart.length;i++) if (cart[i].id===id){
    if (q<=0) cart.splice(i,1); else cart[i].q=Math.min(20,q); break; }
  saveCart(); renderCart();
}
function renderCart(){
  var d=t(), tt=totals();
  var badge=$('#count'); badge.textContent=tt.n; badge.className = tt.n>0?'on':'';
  $('#cartCount').textContent = tt.n===0 ? d.cart.empty : d.cart.count(tt.n);

  var box=$('#lines');
  if (!cart.length){
    box.innerHTML = '<div class="empty"><svg viewBox="0 0 24 24" width="52" height="52" fill="none" style="color:var(--line)" aria-hidden>'+
      '<path d="M3 4h2.2l2.1 10.4a1.8 1.8 0 0 0 1.77 1.44h7.4a1.8 1.8 0 0 0 1.76-1.4L20 8H6.2" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>'+
      '<circle cx="10" cy="19.5" r="1.4" fill="currentColor"/><circle cx="17" cy="19.5" r="1.4" fill="currentColor"/></svg>'+
      '<p style="font-size:16px;font-weight:800;margin-top:12px">'+esc(d.cart.emptyTitle)+'</p>'+
      '<p style="font-size:13.5px;color:var(--muted);max-width:240px">'+esc(d.cart.emptyBody)+'</p>'+
      '<a href="#plans" class="btn btn-ghost" style="margin-top:16px" data-close-cart><span>'+esc(d.cart.browse)+'</span></a></div>';
    $('#cartSum').style.display='none'; return;
  }
  box.innerHTML = cart.map(function(l){
    var p=find(l.id);
    return '<div class="line"><div class="th">'+scene(p.art,p.img)+'</div><div style="flex:1;min-width:0">'+
      '<div style="display:flex;align-items:flex-start;justify-content:space-between;gap:8px">'+
      '<h3 style="font-size:14.5px;font-weight:800">'+esc(d.plans.months(p.months))+'</h3>'+
      '<button data-rm="'+p.id+'" aria-label="remove" style="color:var(--muted);padding:2px">'+
      '<svg viewBox="0 0 16 16" width="14" height="14" fill="none" aria-hidden><path d="m4 4 8 8M12 4l-8 8" stroke="currentColor" stroke-width="1.7" stroke-linecap="round"/></svg></button></div>'+
      '<p style="margin-top:2px;font-size:12.5px;color:var(--muted)">'+esc(d.plans.perMonth(p.per))+'</p>'+
      '<div style="display:flex;align-items:center;justify-content:space-between;gap:8px;margin-top:12px">'+
      '<div class="qty"><button data-q="'+p.id+'" data-d="-1" aria-label="-"><svg viewBox="0 0 16 16" width="14" height="14" fill="none" aria-hidden><path d="M3.5 8h9" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"/></svg></button>'+
      '<span class="keep">'+l.q+'</span>'+
      '<button data-q="'+p.id+'" data-d="1" aria-label="+"><svg viewBox="0 0 16 16" width="14" height="14" fill="none" aria-hidden><path d="M8 3.5v9M3.5 8h9" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"/></svg></button></div>'+
      '<span dir="ltr" style="font-family:var(--lat);font-weight:900;font-size:15px">'+money(p.price*l.q)+'</span></div></div></div>';
  }).join('');
  $('#cartSum').style.display='';
  $('#sSub').textContent = money(tt.sub);
  $('#sTot').textContent = money(tt.sub);
  $('#coTotal').textContent = money(tt.sub);
  $('#sSaveRow').style.display = tt.save>0 ? '' : 'none';
  $('#sSave').textContent = '−' + money(tt.save);
}

function orderMessage(){
  var d=t(), m=d.checkout.msg, tt=totals();
  var name=$('#cName').value.trim(), phone=$('#cPhone').value.trim(), notes=$('#cNotes').value.trim();
  var out=[m.greeting,'',m.intro,'',m.name+': '+(name||'—'),m.phone+': '+(phone||'—'),'',m.products];
  cart.forEach(function(l){ var p=find(l.id);
    out.push('• '+d.plans.months(p.months)+' — '+m.qty+': '+l.q+' — '+money(p.price*l.q)); });
  out.push('', m.total+': '+money(tt.sub));
  if (notes) out.push('', m.notes+': '+notes);
  out.push('', m.closing);
  return out.join('\n');
}

/* ---------------- Behaviour ---------------- */
function reveal(){
  var els = $$('.rev:not(.in)');
  if (!('IntersectionObserver' in window) || REDUCED){ els.forEach(function(e){e.classList.add('in');}); return; }
  var io = new IntersectionObserver(function(ents){
    ents.forEach(function(e,i){
      if (!e.isIntersecting) return;
      var el=e.target; setTimeout(function(){ el.classList.add('in'); }, Math.min(i,6)*70);
      io.unobserve(el);
    });
  },{threshold:.12, rootMargin:'0px 0px -40px 0px'});
  els.forEach(function(e){ io.observe(e); });
}
function accordions(){
  $$('.acc').forEach(function(acc){
    var panel=$('.panel',acc);
    if (acc.classList.contains('on')) panel.style.maxHeight = panel.scrollHeight+'px';
    $('button',acc).addEventListener('click', function(){
      var open = acc.classList.contains('on');
      $$('.acc').forEach(function(o){ o.classList.remove('on'); $('.panel',o).style.maxHeight='0px';
        $('button',o).setAttribute('aria-expanded','false'); });
      if (!open){ acc.classList.add('on'); panel.style.maxHeight = panel.scrollHeight+'px';
        this.setAttribute('aria-expanded','true'); }
    });
  });
}
function railArrows(){
  $$('.railwrap').forEach(function(wrap){
    if (wrap.dataset.armed) return; wrap.dataset.armed='1';
    var rail = $('.rail', wrap);
    ['prev','next'].forEach(function(dir){
      var b=document.createElement('button');
      b.type='button'; b.className='railbtn '+dir;
      b.setAttribute('aria-label', dir==='next'?'Next':'Previous');
      b.innerHTML='<svg viewBox="0 0 16 16" width="17" height="17" fill="none" aria-hidden><path d="'+
        (dir==='next'?'M6 3.5 10.5 8 6 12.5':'M10 3.5 5.5 8 10 12.5')+
        '" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg>';
      b.addEventListener('click', function(){
        var rtl = document.documentElement.dir === 'rtl';
        var step = Math.max(280, rail.clientWidth*.8) * (rtl?-1:1);
        rail.scrollBy({left:(dir==='next'?1:-1)*step, behavior:'smooth'});
      });
      wrap.appendChild(b);
    });
    function sync(){
      var off = Math.abs(rail.scrollLeft);
      $('.railbtn.prev',wrap).classList.toggle('off', off<=4);
      $('.railbtn.next',wrap).classList.toggle('off', off+rail.clientWidth >= rail.scrollWidth-4);
    }
    rail.addEventListener('scroll', sync, {passive:true});
    window.addEventListener('resize', sync);
    sync();
  });
}
function preloader(){
  var seen=true;
  try { seen = sessionStorage.getItem('maurimax.intro')==='1'; } catch(e){ seen=false; }
  if (seen || REDUCED) return;
  var logo = $('.brand img').getAttribute('src');
  var el=document.createElement('div'); el.id='pre'; el.setAttribute('aria-hidden','true');
  el.innerHTML = '<img src="'+logo+'" alt=""><p class="w keep">MAURI<i>MAX</i></p><div class="bar"><i></i></div>';
  document.body.appendChild(el);
  document.body.style.overflow='hidden';
  var bar=$('.bar i',el), t0=performance.now(), DUR=1300;
  (function step(now){
    var k=Math.min(1,(now-t0)/DUR);
    bar.style.width=(k*100)+'%';
    if (k<1){ requestAnimationFrame(step); return; }
    try{ sessionStorage.setItem('maurimax.intro','1'); }catch(e){}
    el.style.opacity='0'; el.style.transform='scale(1.04)';
    document.body.style.overflow='';
    setTimeout(function(){ el.remove(); }, 650);
  })(t0);
}

/* ---------------- Wiring ---------------- */
function openCart(){ $('#cart').classList.add('on'); document.body.style.overflow='hidden'; }
function closeCart(){ $('#cart').classList.remove('on'); document.body.style.overflow=''; }
function openModal(){ closeCart(); $('#modal').classList.add('on'); document.body.style.overflow='hidden';
  setTimeout(function(){ $('#cName').focus(); },80); }
function closeModal(){ $('#modal').classList.remove('on'); document.body.style.overflow=''; }

document.addEventListener('click', function(e){
  var el;
  if ((el = e.target.closest('[data-add]'))){
    add(el.getAttribute('data-add'));
    var s = el.querySelector('span'), old = s.textContent;
    s.textContent = t().cart.added;
    setTimeout(function(){ s.textContent = old; }, 1400);
    return;
  }
  if ((el = e.target.closest('[data-rm]'))){ setQ(el.getAttribute('data-rm'),0); return; }
  if ((el = e.target.closest('[data-q]'))){
    var id=el.getAttribute('data-q'), dd=+el.getAttribute('data-d');
    for (var i=0;i<cart.length;i++) if (cart[i].id===id){ setQ(id,cart[i].q+dd); break; }
    return;
  }
  if (e.target.closest('[data-close-cart]')){ closeCart(); return; }
  if (e.target.closest('[data-close-modal]')){ closeModal(); return; }
  if (e.target.closest('[data-close]')){ $('#menu').classList.remove('on'); document.body.style.overflow='';
    $('#burger').setAttribute('aria-expanded','false'); }
});
if (!REDUCED) document.addEventListener('pointerdown', function(e){
  var btn=e.target.closest('.btn'); if(!btn) return;
  var r=btn.getBoundingClientRect(), s=document.createElement('span');
  s.className='rip'; s.style.left=(e.clientX-r.left)+'px'; s.style.top=(e.clientY-r.top)+'px';
  btn.appendChild(s); setTimeout(function(){ s.remove(); },600);
});
$('#cartBtn').addEventListener('click', openCart);
$('#toCheckout').addEventListener('click', openModal);
$('#burger').addEventListener('click', function(){
  var m=$('#menu'), on=m.classList.toggle('on');
  document.body.style.overflow = on?'hidden':'';
  this.setAttribute('aria-expanded', on?'true':'false');
});
document.addEventListener('keydown', function(e){
  if (e.key!=='Escape') return;
  closeCart(); closeModal();
  $('#menu').classList.remove('on'); $('#burger').setAttribute('aria-expanded','false');
});
$('#lang').addEventListener('click', function(){
  lang = lang==='ar' ? 'en' : 'ar';
  try{ localStorage.setItem('maurimax.lang', lang); }catch(e){}
  render();
});
$('#coForm').addEventListener('submit', function(e){
  e.preventDefault();
  if (!cart.length) return;
  var ok=true;
  var bad = $('#cName').value.trim().length < 2;
  $('#fName').classList.toggle('bad', bad); if (bad) ok=false;
  var digits = $('#cPhone').value.replace(/\D/g,'');
  $('#fPhone').classList.toggle('bad', digits.length<8); if (digits.length<8) ok=false;
  if (!ok) return;
  window.open(wa(orderMessage()), '_blank', 'noopener');
});
['cName','cPhone'].forEach(function(id){
  $('#'+id).addEventListener('input', function(){ this.closest('.field').classList.remove('bad'); });
});
window.addEventListener('scroll', function(){
  var y = window.pageYOffset;
  document.querySelector('header').classList.toggle('stuck', y>16);
  $('#fab').classList.toggle('on', y>640);
  var max = document.documentElement.scrollHeight - window.innerHeight;
  $('#prog').style.transform = 'scaleX(' + (max>0 ? y/max : 0) + ')';
}, {passive:true});

render();
preloader();
})();
