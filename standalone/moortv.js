/* ============================================================
   MOORTV — single-file runtime
   Arabic default (RTL); English via the header toggle.
   No dependencies, no build step.
   ============================================================ */
(function () {
'use strict';

/* ---------------- Contact ---------------- */
var WA_DISPLAY = '43 04 24 04';
var WA_E164 = '22243042404';            // Mauritania +222
var SNAP = 'moor.view';
function wa(msg) { return 'https://wa.me/' + WA_E164 + '?text=' + encodeURIComponent(msg); }
function money(n) { return new Intl.NumberFormat('en-US').format(n) + ' MRU'; }
function num(n) { return new Intl.NumberFormat('en-US').format(n); }

/* ---------------- Dictionary ---------------- */
var T = {
ar: {
  dir: 'rtl',
  nav: { plans:'الاشتراكات', boxes:'الأجهزة', browse:'تصفّح', why:'لماذا نحن', faq:'الأسئلة',
         cta:'ابدأ المشاهدة', skip:'تخطَّ إلى المحتوى' },
  hero: { saleBadge:'تخفيضات الصيف', salePitch:'وفّر حتى 37% — لفترة محدودة',
    titleA:'كل ما تحب.', titleB:'اشتراك واحد.',
    subtitle:'شاهد آلاف الأفلام والمسلسلات والقنوات المباشرة والرياضة ومحتوى الأطفال وأكثر من ذلك بكثير، من منصة ترفيهية واحدة.',
    ctaPrimary:'ابدأ المشاهدة', ctaSecondary:'شاهد العروض', scroll:'مرّر',
    tagline:'أكبر منصة ترفيهية في موريتانيا',
    chips:['تفعيل فوري','يعمل على كل الأجهزة','جودة 4K فائقة'],
    tiles:{action:'أكشن',football:'كرة القدم',docs:'وثائقيات',comedy:'كوميديا',scifi:'خيال علمي',kids:'أطفال',anime:'أنمي',drama:'دراما'} },
  logos: { title:'كل ما تعرفه من ترفيه — في مكان واحد',
    disclaimer:'جميع الأسماء والعلامات التجارية المعروضة ملك لأصحابها، وقد ذُكرت هنا فقط لوصف أنواع المحتوى المتاح. موور تي في خدمة مستقلة وغير تابعة لأي منها أو معتمدة أو مدعومة من قِبلها.' },
  stats: { everywhere:'يعمل في كل مكان', everywhereHint:'حساب واحد. كل شاشة في بيتك.',
    items:[ {l:'فيلم',h:'من أضخم الأعمال إلى الكنوز المخفية'},
            {l:'مسلسل',h:'مواسم كاملة، تُحدَّث دائماً'},
            {l:'قناة مباشرة',h:'من كل قارات العالم'},
            {l:'جودة البث',h:'وضوح تام على كل شاشة'} ],
    devices:['شاشة ذكية','أندرويد','آيفون','جهاز لوحي','كمبيوتر'] },
  sale: { limited:'لفترة محدودة فقط', title:'تخفيضات الصيف',
    body:'كل الاشتراكات وكل الأجهزة عليها خصم الآن.', bodyStrong:'هذه الأسعار لن تبقى متاحة دائماً.',
    ctaPrimary:'احصل على العرض', ctaSecondary:'شاهد الأجهزة', endsIn:'ينتهي العرض خلال',
    units:['أيام','ساعات','دقائق','ثوانٍ'] },
  plans: { eyebrow:'الاشتراكات', titleA:'اختر اشتراكك.', titleB:'شاهد كل شيء.',
    subtitle:'اشتراك واحد يفتح لك مكتبة موور تي في بالكامل — كل فيلم، كل مسلسل، كل قناة مباشرة، على كل شاشة تملكها.',
    footnote:'كل الاشتراكات تشمل التفعيل الفوري والدعم عبر واتساب. الأسعار بالأوقية الموريتانية.',
    save:function(p){return 'وفّر '+p+'%';}, popular:'الأكثر طلباً', best:'🔥 أفضل عرض' },
  devices: { eyebrow:'أجهزة الاستقبال', titleA:'حوّل أي شاشة إلى', titleB:'تلفاز ذكي',
    subtitle:'كلا الجهازين يصلك جاهزاً مع تطبيق موور تي في مثبّتاً و',
    subtitleStrong:'سنة كاملة من الاشتراك مجاناً',
    subtitleEnd:'. وصّل الجهاز، اربطه بالواي فاي، وابدأ المشاهدة.',
    yearIncluded:'سنة كاملة مجاناً', seller:'الأكثر مبيعاً', strong:'الأقوى',
    oneTime:'دفعة واحدة، تشمل سنة',
    delivery:'التوصيل متاح في كل موريتانيا. ونساعدك في التركيب عبر واتساب — مجاناً.' },
  categories: { eyebrow:'تصفّح', titleA:'كل شيء، مُرتَّب بالطريقة', titleB:'التي تشاهد بها',
    subtitle:'عشرة عوالم من المحتوى تُحدَّث باستمرار. تصفّحها وشاهد ما يفتحه لك اشتراكك.',
    footballEyebrow:'كرة القدم', footballTitle:'جميع البطولات الكروية',
    footballBody:'كل البطولات الكبرى، مباشرة وبجودة 4K.' },
  why: { eyebrow:'لماذا موور تي في', titleA:'صُنعت لتكون', titleB:'الأفضل في موريتانيا',
    subtitle:'ليست مجرد مكتبة أكبر — بل تجربة أفضل من البداية إلى النهاية.',
    items:[
      {t:'جودة فائقة',b:'جودة 4K حقيقية مع معدل بث متكيّف، فتبقى الصورة واضحة حتى عندما يضعف الاتصال.'},
      {t:'تفعيل فوري',b:'اطلب عبر واتساب ويُفعَّل اشتراكك خلال دقائق — لا ساعات ولا انتظار حتى الغد.'},
      {t:'مكتبة ضخمة',b:'أكثر من 20 ألف فيلم و10 آلاف مسلسل و9 آلاف قناة مباشرة في مكان واحد.'},
      {t:'على كل الأجهزة',b:'شاشة ذكية، أندرويد، آيفون، آيباد، حاسوب، أو جهازنا الخاص. حساب واحد يغطيها كلها.'},
      {t:'أسعار مناسبة',b:'جزء بسيط من تكلفة الاشتراك في كل منصة على حدة، وبدون رسوم خفية.'},
      {t:'دعم موثوق',b:'أشخاص حقيقيون على واتساب يردّون بسرعة ويحلّون المشكلة فعلاً.'},
      {t:'جودة ممتازة',b:'خوادم مستقرة بتقنية مانعة للتقطيع، مهيّأة للشبكات الموريتانية.'},
      {t:'تحديث مستمر',b:'أفلام جديدة ومواسم جديدة وقنوات جديدة تُضاف كل أسبوع.'} ] },
  reviews: { eyebrow:'آراء العملاء', titleA:'محبوب في', titleB:'كل موريتانيا',
    subtitle:'آلاف البيوت تشاهد بالفعل مع موور تي في. إليك ما يقوله بعضهم.',
    trust:[{v:'4.9/5',l:'متوسط التقييم'},{v:'+5000',l:'مشترك نشط'},{v:'أقل من 5 دقائق',l:'مدة التفعيل عادةً'}] },
  faq: { eyebrow:'الأسئلة الشائعة', title:'أسئلة وأجوبة',
    subtitle:'كل ما قد تريد معرفته قبل الاشتراك. وأي شيء آخر — اسألنا مباشرة.',
    helpBody:'ما زلت متردداً؟ راسلنا على واتساب ونرد عليك خلال دقائق.',
    waMessage:'مرحباً موور تي في، عندي سؤال حول الاشتراكات.' },
  cart: { title:'سلّتك', empty:'لا يوجد شيء بعد', emptyTitle:'سلّتك فارغة',
    emptyBody:'أضف اشتراكاً أو جهازاً وسيظهر هنا.', browse:'تصفّح الاشتراكات',
    subtotal:'المجموع الفرعي', savings:'وفّرت من تخفيضات الصيف', total:'الإجمالي',
    checkout:'إتمام الطلب', noCharge:'تؤكّد وتدفع عبر واتساب — لا يُخصم منك شيء هنا.',
    add:'أضف إلى السلة', added:'أُضيف',
    count:function(n){ return n===1?'منتج واحد':n===2?'منتجان':(n<=10? n+' منتجات': n+' منتجاً'); } },
  checkout: { titleA:'أكمل', titleB:'طلبك', detailsHint:'نستخدمها فقط لتأكيد طلبك وتفعيله.',
    name:'الاسم', nameError:'الرجاء إدخال اسمك.', phone:'رقم الهاتف',
    phoneHint:'رقم موريتاني من 8 أرقام', phoneError:'الرجاء إدخال رقم هاتف صحيح.',
    address:'العنوان', addressHint:'مطلوب فقط عند طلب جهاز', notes:'ملاحظات', optional:'اختياري',
    submit:'أرسل الطلب عبر واتساب',
    note:function(p){ return 'لا يُخصم منك شيء على هذا الموقع. يُفتح طلبك كرسالة واتساب جاهزة إلى '+p+'، حيث نؤكّد الدفع ونفعّل اشتراكك.'; },
    ph:{name:'محمد ولد أحمد',phone:'44 00 00 00',addr:'نواكشوط، تفرغ زينة',notes:'أي شيء ينبغي أن نعرفه — الجهاز المفضّل، وقت التوصيل…'},
    msg:{greeting:'مرحباً موور تي في،',intro:'أرغب في تقديم طلب.',name:'الاسم',phone:'الهاتف',
      address:'العنوان',products:'المنتجات:',qty:'الكمية',savings:'الخصم من تخفيضات الصيف',
      total:'الإجمالي',notes:'ملاحظات',closing:'الرجاء التواصل معي.'} },
  footer: { ctaTitleA:'جاهز لمشاهدة', ctaTitleB:'كل شيء؟',
    ctaSub:'اشترك الآن واستمتع بكل المحتوى في مكان واحد', ctaPrimary:'ابدأ المشاهدة',
    ctaWhatsApp:'راسلنا على واتساب', orderNow:'اطلب الآن',
    about:'موور تي في يجمع الأفلام والمسلسلات والقنوات المباشرة وكل البطولات الكروية الكبرى في اشتراك واحد — مصمَّم لموريتانيا.',
    explore:'تصفّح', support:'الدعم', contact:'تواصل معنا',
    links:{subs:'الاشتراكات',boxes:'الأجهزة',cats:'الفئات',why:'لماذا موور تي في',
      faq:'الأسئلة الشائعة',reviews:'آراء العملاء',sale:'تخفيضات الصيف'},
    waLine:'واتساب — الطلبات والدعم', snapLine:'سناب شات — عروض يومية',
    country:'موريتانيا', countryLine:'توصيل في كل البلاد', rights:'جميع الحقوق محفوظة.',
    trademarks:'أسماء العلامات التجارية الأخرى ملك لأصحابها وتُستخدم لأغراض وصفية فقط.',
    waGreeting:'مرحباً موور تي في،',
    waLearn:'مرحباً موور تي في، أريد معرفة المزيد عن الاشتراكات.',
    waOrder:'مرحباً موور تي في، أرغب في تقديم طلب.' }
},
en: {
  dir: 'ltr',
  nav: { plans:'Plans', boxes:'Devices', browse:'Browse', why:'Why Us', faq:'FAQ',
         cta:'Start Watching', skip:'Skip to content' },
  hero: { saleBadge:'Summer Sale', salePitch:'Save up to 37% — limited time',
    titleA:'Everything You Love.', titleB:'One Subscription.',
    subtitle:'Watch thousands of movies, TV shows, live channels, sports, kids content and much more from one premium entertainment platform.',
    ctaPrimary:'Start Watching', ctaSecondary:'View Offers', scroll:'Scroll',
    tagline:'أكبر منصة ترفيهية في موريتانيا',
    chips:['Instant activation','Works on every device','4K Ultra HD'],
    tiles:{action:'Action',football:'Football',docs:'Docs',comedy:'Comedy',scifi:'Sci-Fi',kids:'Kids',anime:'Anime',drama:'Drama'} },
  logos: { title:'All the entertainment you know — in one place',
    disclaimer:'All brand names and trademarks shown are the property of their respective owners and are referenced here only to describe the categories of content available. MOORTV is an independent service and is not affiliated with, endorsed by, or sponsored by any of them.' },
  stats: { everywhere:'Works Everywhere', everywhereHint:'One account. Every screen in your home.',
    items:[ {l:'Movies',h:'Blockbusters to hidden gems'},
            {l:'TV Shows',h:'Full seasons, always updated'},
            {l:'Live Channels',h:'From every continent'},
            {l:'Streaming Quality',h:'Crystal clear on every screen'} ],
    devices:['Smart TV','Android','iPhone','Tablet','PC'] },
  sale: { limited:'Limited Time Only', title:'SUMMER SALE',
    body:'Every subscription and every device is discounted right now.',
    bodyStrong:'These prices won’t always be available.',
    ctaPrimary:'Claim the offer', ctaSecondary:'See devices', endsIn:'Offer ends in',
    units:['Days','Hours','Minutes','Seconds'] },
  plans: { eyebrow:'Subscriptions', titleA:'Pick your plan.', titleB:'Watch everything.',
    subtitle:'One subscription unlocks the entire MOORTV library — every movie, every series, every live channel, on every screen you own.',
    footnote:'All plans include instant activation and support on WhatsApp. Prices in Mauritanian ouguiya (MRU).',
    save:function(p){return 'Save '+p+'%';}, popular:'Most Popular', best:'🔥 Best Offer' },
  devices: { eyebrow:'TV Boxes & Sticks', titleA:'Turn any screen into a', titleB:'smart TV',
    subtitle:'Both devices arrive pre-configured with MOORTV installed and a ',
    subtitleStrong:'full year of subscription included',
    subtitleEnd:'. Plug in, connect WiFi, start watching.',
    yearIncluded:'1 Year Included', seller:'Best Seller', strong:'Most Powerful',
    oneTime:'one-time, year included',
    delivery:'Delivery available across Mauritania. We help you set it up on WhatsApp — free.' },
  categories: { eyebrow:'Browse', titleA:'Everything, sorted the way', titleB:'you watch',
    subtitle:'Ten worlds of content, updated constantly. Scroll through and see what your subscription unlocks.',
    footballEyebrow:'Football', footballTitle:'Every major competition',
    footballBody:'All the big leagues, live and in 4K.' },
  why: { eyebrow:'Why MOORTV', titleA:'Built to be the', titleB:'best in Mauritania',
    subtitle:'Not just a bigger catalogue — a better experience, end to end.',
    items:[
      {t:'Ultra HD Streaming',b:'True 4K UHD with adaptive bitrate, so the picture stays sharp even when the connection dips.'},
      {t:'Fast Activation',b:'Order on WhatsApp and your line is live in minutes — not hours, not tomorrow.'},
      {t:'Massive Library',b:'Over 20,000 movies, 10,000 series and 9,000 live channels in one single place.'},
      {t:'Works Everywhere',b:'Smart TV, Android, iPhone, iPad, laptop or our own device. One account covers them all.'},
      {t:'Affordable Prices',b:'A fraction of what the individual platforms cost separately, with no hidden fees.'},
      {t:'Reliable Support',b:'Real people on WhatsApp who answer quickly and actually fix things.'},
      {t:'Premium Quality',b:'Stable servers with anti-freeze technology built for Mauritanian networks.'},
      {t:'Always Growing',b:'New films, new seasons and new channels added every single week.'} ] },
  reviews: { eyebrow:'Testimonials', titleA:'Loved across', titleB:'Mauritania',
    subtitle:'Thousands of households already watch with MOORTV. Here is what a few of them say.',
    trust:[{v:'4.9/5',l:'Average rating'},{v:'5,000+',l:'Active subscribers'},{v:'< 5 min',l:'Typical activation'}] },
  faq: { eyebrow:'FAQ', title:'Questions, answered',
    subtitle:'Everything you might want to know before you subscribe. Anything else — just ask us directly.',
    helpBody:'Still unsure? Message us on WhatsApp and we will answer in minutes.',
    waMessage:'Hello MOORTV, I have a question about your subscriptions.' },
  cart: { title:'Your Cart', empty:'Nothing here yet', emptyTitle:'Your cart is empty',
    emptyBody:'Add a subscription or a device and it will show up here.', browse:'Browse plans',
    subtotal:'Subtotal', savings:'Summer sale savings', total:'Total',
    checkout:'Proceed to Checkout', noCharge:'You confirm and pay on WhatsApp — nothing is charged here.',
    add:'Add to Cart', added:'Added',
    count:function(n){ return n+' item'+(n===1?'':'s'); } },
  checkout: { titleA:'Complete your', titleB:'order', detailsHint:'We only use these to confirm and activate your order.',
    name:'Customer Name', nameError:'Please enter your name.', phone:'Phone Number',
    phoneHint:'Mauritanian number, 8 digits', phoneError:'Please enter a valid phone number.',
    address:'Address', addressHint:'Only needed if you are ordering a device', notes:'Notes', optional:'Optional',
    submit:'Send order on WhatsApp',
    note:function(p){ return 'Nothing is charged on this site. Your order opens as a prefilled WhatsApp message to '+p+', where we confirm payment and activate you.'; },
    ph:{name:'Mohamed Ould Ahmed',phone:'44 00 00 00',addr:'Nouakchott, Tevragh Zeina',notes:'Anything we should know — preferred device, delivery time…'},
    msg:{greeting:'Hello MOORTV,',intro:'I’d like to place an order.',name:'Name',phone:'Phone',
      address:'Address',products:'Products:',qty:'Quantity',savings:'Summer sale savings',
      total:'Total',notes:'Notes',closing:'Please contact me.'} },
  footer: { ctaTitleA:'Ready to watch', ctaTitleB:'everything?',
    ctaSub:'Subscribe now and enjoy all the content in one place', ctaPrimary:'Start Watching',
    ctaWhatsApp:'WhatsApp us', orderNow:'Order now',
    about:'MOORTV brings movies, series, live channels and every major football competition together into one premium subscription — built for Mauritania.',
    explore:'Explore', support:'Support', contact:'Contact',
    links:{subs:'Subscriptions',boxes:'Devices',cats:'Categories',why:'Why MOORTV',
      faq:'FAQ',reviews:'Reviews',sale:'Summer Sale'},
    waLine:'WhatsApp — orders & support', snapLine:'Snapchat — daily offers',
    country:'Mauritania', countryLine:'Delivery nationwide', rights:'All rights reserved.',
    trademarks:'Third-party brand names are the property of their respective owners and are used for descriptive purposes only.',
    waGreeting:'Hello MOORTV,',
    waLearn:'Hello MOORTV, I would like to know more about your subscriptions.',
    waOrder:'Hello MOORTV, I would like to place an order.' }
}
};

/* ---------------- Catalogue ----------------
   Subscription prices come from the brief.
   The stick (3000 MRU, year included) is the advertised product;
   the box price is a placeholder set above it — confirm before launch. */
var PLANS = [
  { id:'plan-3m', price:1200, was:1600, art:'starter', tone:['#2f7bff','#22d3ee'],
    ar:{n:'3 أشهر',b:'موسم كامل من كل شيء.',f:['المكتبة كاملة','القنوات المباشرة','الأفلام','المسلسلات','الرياضة','الأطفال','جودة 4K فائقة']},
    en:{n:'3 Months',b:'A full season of everything.',f:['Full Library','Live Channels','Movies','TV Shows','Sports','Kids','4K Ultra HD']} },
  { id:'plan-6m', price:2000, was:2800, art:'popular', tone:['#7c3aed','#2f7bff'], badge:'popular',
    ar:{n:'6 أشهر',b:'الخيار الذي يفضّله الأغلبية.',f:['كل مزايا اشتراك 3 أشهر','تفعيل ذو أولوية','يعمل على عدة أجهزة','كل الدوريات الكروية','الأنمي والوثائقيات','حسابات آمنة للأطفال','جودة 4K فائقة']},
    en:{n:'6 Months',b:'The balance most people pick.',f:['Everything in 3 Months','Priority Activation','Multi-Device Ready','All Football Leagues','Anime & Documentaries','Kids Safe Profiles','4K Ultra HD']} },
  { id:'plan-12m', price:3000, was:4800, art:'best', tone:['#ef2b47','#6b1839'], badge:'best', hi:true,
    ar:{n:'سنة + 3 أشهر مجاناً',b:'15 شهراً من الترفيه المميّز.',f:['15 شهراً كاملة — 3 أشهر هدية','كل مزايا اشتراك 6 أشهر','تفعيل فوري','دعم مميّز على مدار الساعة','كل القنوات الرياضية المباشرة','المكتبة كاملة بجودة 4K','مساعدة مجانية في التركيب']},
    en:{n:'12 Months + 3 FREE',b:'15 months of premium entertainment.',f:['15 months total — 3 on us','Everything in 6 Months','Instant Activation','Premium 24/7 Support','Every Live Sports Channel','Full 4K UHD Catalogue','Free Setup Assistance']} }
];

var DEVICES = [
  { id:'dev-stick', price:3000, art:'stick', tone:['#9c1730','#3d0c20'], accent:['#ef2b47','#f4917a'], badge:'seller',
    ar:{n:'عصا موور تي في 4K',b:'حوّل أي شاشة إلى تلفاز ذكي. وصّلها بمنفذ HDMI، اربطها بالواي فاي، وستشاهد في أقل من دقيقة.',
        f:['سنة كاملة من موور تي في مجاناً','جودة 4K فائقة','جهاز تحكم صوتي داخل العلبة','واي فاي — بدون أسلاك','بحجم الجيب، ترافقك أينما ذهبت']},
    en:{n:'MOORTV Stick 4K',b:'Turn any screen into a smart TV. Plug it into HDMI, connect WiFi, and you are watching in under a minute.',
        f:['1 full year of MOORTV included','4K Ultra HD','Voice remote in the box','WiFi — no cables to run','Pocket-sized, travels with you']} },
  { id:'dev-box', price:4500, art:'box', tone:['#1c479c','#2f1560'], accent:['#2f7bff','#a855f7'], badge:'strong', hi:true,
    ar:{n:'جهاز موور تي في 4K',b:'جهاز أندرويد كامل. أداء أقوى ومساحة أكبر ومنفذ إيثرنت سلكي لمشاهدة كرة القدم بجودة 4K بلا تقطيع.',
        f:['سنة كاملة من موور تي في مجاناً','4K HDR • ذاكرة 4 جيجا • تخزين 32 جيجا','واي فاي + منفذ إيثرنت','جهاز تحكم صوتي داخل العلبة','لا تقطيع في المباريات الكبرى']},
    en:{n:'MOORTV Box 4K',b:'The full Android TV box. More power, more storage and a wired ethernet port for flawless 4K football.',
        f:['1 full year of MOORTV included','4K HDR • 4GB RAM • 32GB storage','WiFi + Ethernet port','Voice remote in the box','Never buffers on big matches']} }
];

var ALL = PLANS.concat(DEVICES);
function find(id){ for(var i=0;i<ALL.length;i++) if(ALL[i].id===id) return ALL[i]; return null; }

var CATS = [
  {art:'movies',tone:['#2f7bff','#a855f7'],ar:['أفلام','أكثر من 20,000 فيلم'],en:['Movies','20,000+ titles']},
  {art:'series',tone:['#7c3aed','#22d3ee'],ar:['مسلسلات','أكثر من 10,000 مسلسل'],en:['TV Shows','10,000+ series']},
  {art:'football',tone:['#10b981','#2f7bff'],ar:['كرة القدم','كل الدوريات الكبرى'],en:['Football','Every major league']},
  {art:'sports',tone:['#f97316','#e879f9'],ar:['رياضة','أكثر من 900 قناة رياضية'],en:['Sports','900+ sports channels']},
  {art:'kids',tone:['#22d3ee','#a855f7'],ar:['أطفال','آمن وممتع'],en:['Kids','Safe & fun']},
  {art:'anime',tone:['#e879f9','#2f7bff'],ar:['أنمي','مترجم ومدبلج'],en:['Anime','Subbed & dubbed']},
  {art:'entertainment',tone:['#a855f7','#f97316'],ar:['ترفيه','برامج وحفلات'],en:['Entertainment','Shows & specials']},
  {art:'docs',tone:['#0ea5e9','#14b8a6'],ar:['وثائقيات','قصص حقيقية'],en:['Documentaries','Real stories']},
  {art:'news',tone:['#ef4444','#2f7bff'],ar:['أخبار','على مدار الساعة'],en:['News','24/7 worldwide']},
  {art:'live',tone:['#2f7bff','#22d3ee'],ar:['قنوات مباشرة','أكثر من 9,000 قناة'],en:['Live TV','9,000+ channels']}
];

var LEAGUES = ['Premier League','UEFA Champions League','LaLiga','Serie A','Bundesliga','Ligue 1','Europa League','CAF & World Cup'];

var SERVICES = [
  ['NETFLIX','#e50914',700],['Disney+','#4b9bff',600],['prime video','#31c8f5',500],
  ['Apple TV+','#f5f5f7',600],['HBO Max','#a855f7',800],['shahid','#00d3a7',600],
  ['OSN+','#ffb020',800],['beIN SPORTS','#7c3aed',600],['discovery+','#4fa3ff',500],['PARAMOUNT+','#3b82f6',600]
];

/* Testimonials below are illustrative examples, not verified customer
   reviews. Replace with genuine ones before publishing. */
var REVIEWS = [
  {i:'MA',tone:['#2f7bff','#a855f7'],ar:['محمد ولد أحمد','نواكشوط','أشاهد كل مباريات الدوري الإنجليزي ودوري الأبطال بجودة 4K دون أي تقطيع. والتفعيل استغرق أقل من خمس دقائق عبر واتساب.'],
   en:['Mohamed Ould Ahmed','Nouakchott','I watch every Premier League and Champions League match in 4K without a single freeze. Activation took less than five minutes on WhatsApp.']},
  {i:'FS',tone:['#ef2b47','#f4917a'],ar:['فاطمتو منت سيدي','نواذيبو','قسم الأطفال ممتاز وزوجي يجد كل مبارياته. اشتراك واحد عوّض ثلاثة اشتراكات كنا ندفعها بشكل منفصل.'],
   en:['Fatimetou Mint Sidi','Nouadhibou','The kids section is perfect and my husband gets his football. One subscription replaced three we were paying for separately.']},
  {i:'CD',tone:['#22d3ee','#2f7bff'],ar:['الشيخ ديالو','روصو','اشتريت العصا بـ 3000 أوقية مع سنة كاملة. وصّلتها بتلفاز قديم فصار تلفازاً ذكياً في الحال.'],
   en:['Cheikh Diallo','Rosso','I bought the stick for 3000 MRU with the year included. Plugged it into an old TV and it became a smart TV instantly.']},
  {i:'AB',tone:['#a855f7','#e879f9'],ar:['أمينتو منت بابا','كيفة','كل المسلسلات التركية والعربية التي أتابعها موجودة بجودة عالية، والحلقات الجديدة تظهر في نفس الأسبوع.'],
   en:['Aminetou Mint Baba','Kiffa','Every Turkish and Arabic series I follow is there, in high quality, and new episodes appear the same week.']},
  {i:'SV',tone:['#10b981','#22d3ee'],ar:['سيدي محمد فال','أطار','ما أقنعني هو الدعم. أرسلت رسالة في منتصف الليل فردّ عليّ أحدهم وحلّ المشكلة في الحال.'],
   en:['Sidi Mohamed Vall','Atar','What convinced me was the support. I sent a message at midnight and someone answered and fixed it right away.']},
  {i:'ME',tone:['#f97316','#ef2b47'],ar:['مريم منت إيلي','نواكشوط','أستعمله على هاتفي وجهازي اللوحي وتلفاز البيت. نفس الحساب، وبدون خلافات على من يأخذ الشاشة.'],
   en:['Mariem Mint Ely','Nouakchott','I use it on my phone, my tablet and the TV at home. Same account, no arguments about who gets the screen.']}
];

var FAQS = [
  {ar:['كيف أحصل على اشتراكي بعد الطلب؟','أضف اشتراكك إلى السلة وأكمل الطلب — سيفتح الموقع واتساب وطلبك مكتوب بالفعل. أرسله لنا ونرد عليك ببيانات التفعيل. معظم الاشتراكات تعمل في أقل من خمس دقائق.'],
   en:['How do I get my subscription after ordering?','Add your plan to the cart and check out — the site opens WhatsApp with your order already written out. Send it, and we reply with your activation details. Most lines are live in under five minutes.']},
  {ar:['على أي الأجهزة يعمل موور تي في؟','الشاشات الذكية (سامسونج، إل جي، أندرويد تي في)، وهواتف وأجهزة أندرويد، والآيفون والآيباد، وحواسيب ويندوز وماك، وأجهزتنا الخاصة. اشتراك واحد يكفي البيت كله.'],
   en:['Which devices does MOORTV work on?','Smart TVs (Samsung, LG, Android TV), Android phones and boxes, iPhone and iPad, Windows and Mac laptops, and our own Stick or Box. One subscription covers your household.']},
  {ar:['ماذا تشمل المكتبة؟','أكثر من 20,000 فيلم و10,000 مسلسل و9,000 قناة مباشرة: كل الدوريات الكروية الكبرى، والرياضة، وبرامج الأطفال، والأنمي، والوثائقيات، والأخبار، والدراما العربية والتركية.'],
   en:['What is included in the library?','Over 20,000 movies, 10,000 series, and 9,000 live channels: all major football leagues, sports, kids programming, anime, documentaries, news, and Arabic and Turkish drama.']},
  {ar:['هل أحتاج إلى إنترنت سريع؟','لجودة 4K ننصح بسرعة تقارب 25 ميجابت. أما الجودة الكاملة HD فتعمل بسلاسة من حوالي 10 ميجابت، والبث يتكيّف تلقائياً إذا ضعف الاتصال.'],
   en:['Do I need a fast internet connection?','For 4K we recommend around 25 Mbps. Full HD works comfortably from about 10 Mbps, and the stream adapts automatically if your connection dips.']},
  {ar:['هل أشتري العصا أم الجهاز؟','كلاهما يأتي مع سنة كاملة وجودة 4K. العصا (3000 أوقية) بحجم الجيب وتعمل بالواي فاي — مثالية للتلفاز الثاني أو للسفر. والجهاز (4500 أوقية) ذاكرته أكبر وفيه منفذ إيثرنت سلكي، وهو الأضمن للتلفاز الرئيسي والمباريات الكبرى.'],
   en:['Should I buy the Stick or the Box?','Both come with a full year included and both output 4K. The Stick (3000 MRU) is pocket-sized and runs on WiFi — perfect for a second TV or travelling. The Box (4500 MRU) has more memory and a wired ethernet port, the safer choice for your main TV and big matches.']},
  {ar:['كيف أدفع؟','نرتّب الدفع مباشرة عبر واتساب بالوسائل المتداولة في موريتانيا — بنكيلي أو مصرفي أو سداد أو نقداً. ولا يُخصم أي مبلغ عبر الموقع نفسه.'],
   en:['How do I pay?','We arrange payment directly on WhatsApp using the methods common in Mauritania — Bankily, Masrvi, Sedad or cash. Nothing is charged through the website itself.']},
  {ar:['ماذا يحدث عند انتهاء اشتراكي؟','نراسلك قبل تاريخ الانتهاء حتى لا ينقطع البث. والتجديد برسالة واحدة، وتحتفظ بنفس الاشتراك ونفس الإعدادات.'],
   en:['What happens when my subscription ends?','We message you before the end date so there is no interruption. Renewing is one message, and you keep the same line and settings.']},
  {ar:['ماذا لو توقف شيء عن العمل؟','راسلنا على واتساب في أي وقت. معظم المشاكل تُحل بتعديل بسيط في الإعدادات؛ وإذا احتاج الخادم إلى تغيير ننقلك فوراً وبدون أي تكلفة.'],
   en:['What if something stops working?','Write to us on WhatsApp at any hour. Most issues are a quick settings fix; if a server needs changing we move you across immediately, at no cost.']}
];

/* ---------------- Artwork (original SVG, nothing licensed) ---------------- */
function art(variant, a, b, w, h) {
  var uid = variant + a.replace(/#/g,'') + b.replace(/#/g,'');
  var W = 'rgba(255,255,255,.9)';
  var inner = '';
  switch (variant) {
    case 'movies': inner =
      '<g transform="rotate(-18 200 250)"><rect x="-40" y="190" width="480" height="120" rx="10" fill="#050505" opacity=".55"/>'+
      rep(14,function(i){return '<rect x="'+(-30+i*35)+'" y="200" width="18" height="14" rx="3" fill="'+W+'" opacity=".35"/><rect x="'+(-30+i*35)+'" y="286" width="18" height="14" rx="3" fill="'+W+'" opacity=".35"/>';})+
      '</g><circle cx="200" cy="250" r="46" fill="rgba(255,255,255,.14)" stroke="'+W+'" stroke-opacity=".5"/><path d="M188 230 224 250 188 270Z" fill="'+W+'"/>'; break;
    case 'series': inner =
      rep(3,function(i){return '<rect x="'+(60+i*26)+'" y="'+(170-i*16)+'" width="220" height="150" rx="16" fill="rgba(255,255,255,.08)" stroke="'+W+'" stroke-opacity="'+(.14+i*.12)+'"/>';})+
      '<rect x="112" y="138" width="220" height="150" rx="16" fill="rgba(5,5,5,.5)"/><path d="M205 190 245 213 205 236Z" fill="'+W+'"/>'; break;
    case 'football': inner =
      '<ellipse cx="200" cy="330" rx="230" ry="120" fill="'+a+'" opacity=".28"/><ellipse cx="200" cy="330" rx="230" ry="120" fill="none" stroke="'+W+'" stroke-opacity=".28"/>'+
      '<ellipse cx="200" cy="330" rx="120" ry="62" fill="none" stroke="'+W+'" stroke-opacity=".28"/><line x1="-30" y1="330" x2="430" y2="330" stroke="'+W+'" stroke-opacity=".28"/>'+
      '<g transform="translate(200 176)"><circle r="58" fill="rgba(255,255,255,.95)"/><path d="M0-34 30-12 18 24-18 24-30-12Z" fill="#0b0b12"/>'+
      [0,72,144,216,288].map(function(d){return '<path transform="rotate('+d+')" d="M0-58 14-40-14-40Z" fill="#0b0b12" opacity=".85"/>';}).join('')+'</g>'; break;
    case 'sports': inner =
      rep(5,function(i){return '<path d="M-20 '+(420-i*58)+' Q 200 '+(330-i*62)+' 420 '+(400-i*58)+'" fill="none" stroke="'+W+'" stroke-opacity="'+(.35-i*.05)+'" stroke-width="'+(3-i*.35)+'"/>';})+
      '<g transform="translate(200 240)"><path d="M-52 40-18-46 18-46 52 40Z" fill="rgba(255,255,255,.12)" stroke="'+W+'" stroke-opacity=".55"/>'+
      '<rect x="-10" y="40" width="20" height="34" fill="'+W+'" opacity=".8"/><rect x="-34" y="72" width="68" height="12" rx="6" fill="'+W+'" opacity=".8"/></g>'; break;
    case 'kids': inner =
      [[90,180,52],[280,140,40],[320,300,62],[110,340,46],[200,240,78]].map(function(c,i){
        return '<circle cx="'+c[0]+'" cy="'+c[1]+'" r="'+c[2]+'" fill="'+(i%2?a:b)+'" opacity=".55" stroke="rgba(255,255,255,.5)"/>';}).join('')+
      '<g transform="translate(200 240)" fill="#fff" opacity=".95"><path d="M0-46 13-14 48-14 20 8 31 42 0 21-31 42-20 8-48-14-13-14Z"/></g>'; break;
    case 'anime': inner =
      rep(30,function(i){var an=i/30*Math.PI*2;
        return '<line x1="'+(200+Math.cos(an)*70).toFixed(1)+'" y1="'+(240+Math.sin(an)*70).toFixed(1)+'" x2="'+(200+Math.cos(an)*330).toFixed(1)+'" y2="'+(240+Math.sin(an)*330).toFixed(1)+'" stroke="'+W+'" stroke-opacity="'+(i%3===0?.3:.12)+'" stroke-width="'+(i%3===0?3:1.5)+'"/>';})+
      '<circle cx="200" cy="240" r="76" fill="rgba(5,5,5,.55)" stroke="'+W+'" stroke-opacity=".6"/>'+
      '<ellipse cx="200" cy="240" rx="52" ry="34" fill="rgba(255,255,255,.94)"/><circle cx="200" cy="240" r="20" fill="'+b+'"/><circle cx="192" cy="232" r="7" fill="#fff"/>'; break;
    case 'entertainment': inner =
      [-1,0,1].map(function(k){return '<path d="M'+(200+k*92)+' 40 '+(140+k*150)+' 420 '+(260+k*150)+' 420Z" fill="'+(k===0?b:a)+'" opacity=".22"/>';}).join('')+
      '<g transform="translate(200 250)"><rect x="-16" y="-70" width="32" height="86" rx="16" fill="rgba(255,255,255,.92)"/>'+
      '<path d="M-34-8A34 34 0 0 0 34-8" fill="none" stroke="#fff" stroke-width="7" stroke-linecap="round"/>'+
      '<rect x="-4" y="26" width="8" height="30" fill="#fff"/><rect x="-26" y="56" width="52" height="9" rx="4.5" fill="#fff"/></g>'; break;
    case 'docs': inner =
      '<path d="M-20 400 110 250 200 330 300 190 420 300 420 560-20 560Z" fill="#050505" opacity=".55"/>'+
      '<path d="M-20 440 120 320 215 385 320 260 420 350" fill="none" stroke="'+W+'" stroke-opacity=".45" stroke-width="2"/>'+
      '<circle cx="300" cy="130" r="46" fill="rgba(255,255,255,.9)" opacity=".85"/><circle cx="286" cy="122" r="46" fill="'+b+'" opacity=".75"/>'+
      rep(20,function(i){return '<circle cx="'+((i*97)%400)+'" cy="'+((i*53)%240)+'" r="1.6" fill="#fff" opacity=".5"/>';}); break;
    case 'news': inner =
      '<circle cx="200" cy="230" r="118" fill="none" stroke="'+W+'" stroke-opacity=".35"/>'+
      '<ellipse cx="200" cy="230" rx="52" ry="118" fill="none" stroke="'+W+'" stroke-opacity=".3"/>'+
      '<ellipse cx="200" cy="230" rx="100" ry="118" fill="none" stroke="'+W+'" stroke-opacity=".18"/>'+
      '<line x1="82" y1="230" x2="318" y2="230" stroke="'+W+'" stroke-opacity=".35"/>'+
      '<rect x="60" y="382" width="280" height="44" rx="8" fill="rgba(239,68,68,.85)"/>'+
      '<rect x="76" y="398" width="150" height="12" rx="6" fill="#fff" opacity=".9"/><rect x="238" y="398" width="66" height="12" rx="6" fill="#fff" opacity=".5"/>'; break;
    case 'live': inner =
      '<rect x="52" y="140" width="296" height="186" rx="18" fill="rgba(5,5,5,.6)" stroke="'+W+'" stroke-opacity=".4"/>'+
      rep(6,function(i){return '<rect x="'+(68+(i%3)*96)+'" y="'+(156+Math.floor(i/3)*88)+'" width="80" height="72" rx="10" fill="'+(i%2?a:b)+'" opacity="'+(.35+(i%3)*.12)+'"/>';})+
      '<rect x="176" y="326" width="48" height="30" fill="'+W+'" opacity=".35"/><rect x="128" y="356" width="144" height="12" rx="6" fill="'+W+'" opacity=".55"/>'+
      '<circle cx="300" cy="118" r="9" fill="#ef4444"/>'; break;
    case 'action': inner =
      rep(7,function(i){return '<path d="M'+(-40+i*30)+' 560 '+(120+i*46)+' 0" stroke="'+W+'" stroke-opacity="'+(.1+(i%3)*.1)+'" stroke-width="'+(i%2?8:2)+'"/>';})+
      '<circle cx="210" cy="230" r="80" fill="rgba(255,255,255,.1)" stroke="'+W+'" stroke-opacity=".5"/>'+
      '<path d="M170 190 250 270M250 190 170 270" stroke="#fff" stroke-width="10" stroke-linecap="round" opacity=".85"/>'; break;
    case 'comedy': inner =
      '<circle cx="200" cy="240" r="112" fill="rgba(255,255,255,.14)" stroke="'+W+'" stroke-opacity=".5"/>'+
      '<circle cx="164" cy="212" r="12" fill="#fff"/><circle cx="236" cy="212" r="12" fill="#fff"/>'+
      '<path d="M146 262A58 58 0 0 0 254 262Z" fill="#fff" opacity=".92"/>'; break;
    case 'drama': inner =
      rep(9,function(i){return '<rect x="'+(i*46)+'" y="0" width="22" height="560" fill="'+(i%2?a:b)+'" opacity=".16"/>';})+
      '<ellipse cx="200" cy="250" rx="96" ry="128" fill="rgba(5,5,5,.55)" stroke="'+W+'" stroke-opacity=".4"/>'+
      '<ellipse cx="200" cy="212" rx="44" ry="52" fill="'+W+'" opacity=".25"/>'; break;
    case 'scifi': inner =
      rep(40,function(i){return '<circle cx="'+((i*137)%400)+'" cy="'+((i*71)%420)+'" r="'+(i%5===0?2.6:1.3)+'" fill="#fff" opacity=".6"/>';})+
      '<ellipse cx="200" cy="250" rx="120" ry="26" fill="none" stroke="'+W+'" stroke-opacity=".5"/>'+
      '<circle cx="200" cy="230" r="66" fill="'+b+'" opacity=".85"/><circle cx="180" cy="212" r="14" fill="#fff" opacity=".25"/>'; break;
    case 'starter': case 'popular': case 'best': {
      var label = variant==='starter'?'3':variant==='popular'?'6':'15';
      inner = '<circle cx="200" cy="230" r="130" fill="'+b+'" opacity=".3" filter="url(#s'+uid+')"/>';
      if (variant==='best') {
        inner += rep(12,function(i){return '<path transform="rotate('+(i*30)+' 200 230)" d="M200 74 210 130 190 130Z" fill="'+W+'" opacity="'+(i%2?.35:.6)+'"/>';});
        inner += '<circle cx="200" cy="230" r="86" fill="rgba(5,5,5,.5)" stroke="'+W+'" stroke-opacity=".55"/>';
      } else {
        inner += rep(3,function(i){return '<circle cx="200" cy="230" r="'+(62+i*26)+'" fill="none" stroke="'+W+'" stroke-opacity="'+(.4-i*.11)+'"/>';});
      }
      inner += '<text x="200" y="'+(variant==='best'?242:250)+'" text-anchor="middle" fill="#fff" font-size="'+(variant==='best'?44:54)+'" font-weight="800" font-family="Sora,sans-serif">'+label+'</text>';
      break;
    }
    case 'stick': inner = stickArt(uid, b); break;
    case 'box': inner = boxArt(uid, a, b); break;
    default: inner = '<circle cx="200" cy="230" r="120" fill="'+b+'" opacity=".35"/>';
  }
  return '<svg viewBox="0 0 400 560" preserveAspectRatio="xMidYMid slice" width="'+(w||'100%')+'" height="'+(h||'100%')+'" aria-hidden="true" focusable="false">'+
    '<defs>'+
    '<linearGradient id="bg'+uid+'" x1=".1" y1="0" x2=".9" y2="1"><stop offset="0%" stop-color="'+a+'" stop-opacity=".62"/><stop offset="42%" stop-color="'+b+'" stop-opacity=".42"/><stop offset="100%" stop-color="#040407"/></linearGradient>'+
    '<radialGradient id="gl'+uid+'" cx="50%" cy="26%" r="66%"><stop offset="0%" stop-color="#fff" stop-opacity=".26"/><stop offset="38%" stop-color="'+a+'" stop-opacity=".2"/><stop offset="100%" stop-color="#050505" stop-opacity="0"/></radialGradient>'+
    '<radialGradient id="vg'+uid+'" cx="50%" cy="46%" r="72%"><stop offset="55%" stop-color="#050505" stop-opacity="0"/><stop offset="100%" stop-color="#030305" stop-opacity=".85"/></radialGradient>'+
    '<linearGradient id="vl'+uid+'" x1="0" y1="0" x2="0" y2="1"><stop offset="38%" stop-color="#050505" stop-opacity="0"/><stop offset="100%" stop-color="#050505" stop-opacity=".95"/></linearGradient>'+
    '<filter id="s'+uid+'" x="-40%" y="-40%" width="180%" height="180%"><feGaussianBlur stdDeviation="26"/></filter>'+
    '</defs>'+
    '<rect width="400" height="560" fill="#050505"/><rect width="400" height="560" fill="url(#bg'+uid+')"/><rect width="400" height="560" fill="url(#gl'+uid+')"/>'+
    '<g opacity=".92">'+inner+'</g>'+
    '<rect width="400" height="560" fill="url(#vg'+uid+')"/><rect width="400" height="560" fill="url(#vl'+uid+')"/></svg>';
}
function rep(n, fn){ var o=''; for(var i=0;i<n;i++) o+=fn(i); return o; }

/* The remote we actually ship — reused by both hardware shots. */
function remote(accent) {
  return '<rect x="0" y="0" width="96" height="300" rx="46" fill="#0b0c12"/>'+
  '<rect x=".9" y=".9" width="94.2" height="298.2" rx="45.1" fill="none" stroke="rgba(255,255,255,.16)" stroke-width="1.8"/>'+
  '<path d="M14 26A40 40 0 0 1 48 3" fill="none" stroke="rgba(255,255,255,.3)" stroke-width="2.4" stroke-linecap="round"/>'+
  '<circle cx="27" cy="34" r="10.5" fill="none" stroke="'+accent+'" stroke-width="2.2"/><path d="M27 28.5v6" stroke="'+accent+'" stroke-width="2.2" stroke-linecap="round"/>'+
  '<circle cx="69" cy="34" r="10.5" fill="none" stroke="rgba(255,255,255,.4)" stroke-width="2.2"/><rect x="65.5" y="29.5" width="7" height="9" rx="3.5" fill="none" stroke="rgba(255,255,255,.4)" stroke-width="1.6"/>'+
  '<circle cx="48" cy="108" r="38" fill="#12141d" stroke="rgba(255,255,255,.14)" stroke-width="1.6"/>'+
  '<circle cx="48" cy="108" r="17" fill="#1b1e29" stroke="rgba(255,255,255,.26)" stroke-width="1.4"/>'+
  '<text x="48" y="113" text-anchor="middle" fill="rgba(255,255,255,.82)" font-size="12" font-weight="700" font-family="Sora,sans-serif">OK</text>'+
  '<path d="M48 76l6 8H42Z" fill="rgba(255,255,255,.5)"/><path d="M48 140l6-8H42Z" fill="rgba(255,255,255,.5)"/>'+
  '<path d="M16 108l8-6v12Z" fill="rgba(255,255,255,.5)"/><path d="M80 108l-8-6v12Z" fill="rgba(255,255,255,.5)"/>'+
  '<circle cx="27" cy="172" r="11" fill="#14161f" stroke="rgba(255,255,255,.16)" stroke-width="1.4"/>'+
  '<path d="M31 168a5 5 0 1 0-4 8" fill="none" stroke="rgba(255,255,255,.55)" stroke-width="1.8" stroke-linecap="round"/>'+
  '<circle cx="69" cy="172" r="11" fill="#14161f" stroke="rgba(255,255,255,.16)" stroke-width="1.4"/>'+
  '<path d="M64 173l5-5 5 5v5H64Z" fill="none" stroke="rgba(255,255,255,.55)" stroke-width="1.6" stroke-linejoin="round"/>'+
  '<circle cx="20" cy="214" r="10" fill="#14161f" stroke="rgba(255,255,255,.14)" stroke-width="1.3"/><path d="M16 214h8" stroke="rgba(255,255,255,.5)" stroke-width="1.7" stroke-linecap="round"/>'+
  '<circle cx="48" cy="214" r="14" fill="'+accent+'"/><rect x="44.5" y="207" width="7" height="11" rx="3.5" fill="#fff"/>'+
  '<path d="M42 216.5a6 6 0 0 0 12 0M48 222.5v3" stroke="#fff" stroke-width="1.5" stroke-linecap="round" fill="none"/>'+
  '<circle cx="76" cy="214" r="10" fill="#14161f" stroke="rgba(255,255,255,.14)" stroke-width="1.3"/><path d="M72 214h8M76 210v8" stroke="rgba(255,255,255,.5)" stroke-width="1.7" stroke-linecap="round"/>'+
  '<rect x="12" y="248" width="33" height="15" rx="7.5" fill="rgba(255,255,255,.13)"/><rect x="51" y="248" width="33" height="15" rx="7.5" fill="rgba(255,255,255,.09)"/>'+
  '<rect x="12" y="270" width="33" height="15" rx="7.5" fill="rgba(255,255,255,.09)"/><rect x="51" y="270" width="33" height="15" rx="7.5" fill="rgba(255,255,255,.13)"/>';
}
function stickArt(uid, b) {
  return '<circle cx="210" cy="250" r="165" fill="#9c1730" opacity=".34" filter="url(#s'+uid+')"/>'+
  '<ellipse cx="212" cy="452" rx="150" ry="24" fill="#000" opacity=".55"/>'+
  '<g transform="translate(104 176) rotate(-9) scale(.78)">'+remote(b)+'</g>'+
  '<g transform="translate(252 180) rotate(11) scale(.94)">'+
  '<path d="M14 0h44l-3 13H17Z" fill="#7d838e"/><path d="M14 0h44l-1 4H15Z" fill="#a4aab5"/>'+
  '<rect x="23" y="3.5" width="26" height="4.5" rx="1.2" fill="#2b2e36"/><rect x="12" y="12" width="48" height="11" rx="3" fill="#15171f"/>'+
  '<rect x="1" y="21" width="70" height="182" rx="17" fill="#0b0c12"/>'+
  '<rect x="1.9" y="21.9" width="68.2" height="180.2" rx="16.1" fill="none" stroke="rgba(255,255,255,.16)" stroke-width="1.7"/>'+
  '<path d="M1 40h70v40H1Z" fill="rgba(255,255,255,.075)"/>'+
  '<path d="M1 80q35 14 70 0v6q-35 14-70 0Z" fill="rgba(255,255,255,.035)"/>'+
  '<path d="M10 196A16 16 0 0 1 3 182V74" fill="none" stroke="rgba(255,255,255,.2)" stroke-width="1.9" stroke-linecap="round"/>'+
  '<circle cx="36" cy="166" r="4.2" fill="#22d3ee"/><circle cx="36" cy="166" r="9" fill="#22d3ee" opacity=".3"/></g>';
}
function boxArt(uid, a, b) {
  return '<circle cx="196" cy="240" r="168" fill="'+a+'" opacity=".34" filter="url(#s'+uid+')"/>'+
  '<ellipse cx="200" cy="418" rx="162" ry="26" fill="#000" opacity=".55"/>'+
  '<path d="M62 300 108 250 318 250 272 300Z" fill="#15171f"/>'+
  '<path d="M62 300 108 250 318 250 272 300Z" fill="none" stroke="rgba(255,255,255,.16)" stroke-width="1.6"/>'+
  '<path d="M78 282 118 262 214 262 174 282Z" fill="rgba(255,255,255,.07)"/>'+
  '<circle cx="196" cy="274" r="15" fill="none" stroke="rgba(255,255,255,.22)" stroke-width="1.6"/>'+
  '<path d="M190 267l12 7-12 7Z" fill="rgba(255,255,255,.3)"/>'+
  '<path d="M62 300h210v72H62Z" fill="#0b0c12"/><path d="M62 300h210v72H62Z" fill="none" stroke="rgba(255,255,255,.14)" stroke-width="1.6"/>'+
  '<path d="M272 300 318 250v72l-46 50Z" fill="#070810"/><path d="M272 300 318 250v72l-46 50Z" fill="none" stroke="rgba(255,255,255,.1)" stroke-width="1.5"/>'+
  '<rect x="84" y="326" width="86" height="20" rx="6" fill="rgba(255,255,255,.05)"/>'+
  '<rect x="93" y="333" width="52" height="6" rx="3" fill="rgba(255,255,255,.28)"/>'+
  '<circle cx="246" cy="336" r="5" fill="#22d3ee"/><circle cx="246" cy="336" r="11" fill="#22d3ee" opacity=".25"/>'+
  '<path d="M283 288l22-24v13l-22 24Z" fill="rgba(255,255,255,.2)"/>'+
  '<path d="M283 312l22-24v9l-22 24Z" fill="rgba(255,255,255,.14)"/>'+
  '<path d="M283 332l22-24v11l-22 24Z" fill="rgba(255,255,255,.14)"/>'+
  '<rect x="76" y="372" width="26" height="7" rx="3" fill="#05060a"/><rect x="232" y="372" width="26" height="7" rx="3" fill="#05060a"/>'+
  '<rect x="82" y="376" width="170" height="4" rx="2" fill="'+b+'" opacity=".85"/>'+
  '<g transform="translate(272 196) rotate(15) scale(.68)">'+remote(b)+'</g>';
}
function logoMark(size) {
  return '<svg viewBox="0 0 64 64" width="'+size+'" height="'+size+'" aria-hidden="true"><defs>'+
  '<linearGradient id="ms'+size+'" x1="0" y1="0" x2=".35" y2="1"><stop offset="0%" stop-color="#6b1839"/><stop offset="100%" stop-color="#4a1030"/></linearGradient>'+
  '<linearGradient id="md'+size+'" x1="0" y1="0" x2="1" y2="1"><stop offset="0%" stop-color="#ff4d5f"/><stop offset="100%" stop-color="#ef2b47"/></linearGradient>'+
  '<clipPath id="mc'+size+'"><rect x="9.5" y="16.5" width="45" height="33" rx="6.5"/></clipPath></defs>'+
  '<path d="M24.5 4.5 33.5 17M39.5 4.5 30.5 17" stroke="#101c18" stroke-width="3.4" stroke-linecap="round"/>'+
  '<g clip-path="url(#mc'+size+')"><rect x="9.5" y="16.5" width="45" height="33" fill="url(#ms'+size+')"/>'+
  '<circle cx="20.5" cy="23.5" r=".85" fill="#f4917a"/><circle cx="29.5" cy="26" r=".7" fill="#f4917a" opacity=".8"/>'+
  '<circle cx="45.5" cy="26" r="6" fill="#f4917a"/><circle cx="42.8" cy="23.6" r="5.9" fill="#6b1839"/>'+
  '<path d="M9.5 49.5 23 32 30 49.5Z" fill="url(#md'+size+')"/><path d="M15 49.5 29.5 27 44 49.5Z" fill="#101c18"/>'+
  '<path d="M34 49.5 45 36.5 54.5 45v4.5Z" fill="url(#md'+size+')"/>'+
  '<path d="M9.5 43.5c7.5-4 12.5 3 20.5.5 8.5-2.7 16 3.5 24.5-1v6.5h-45Z" fill="#ef2b47"/>'+
  '<path d="M9.5 45.8c8.5-4.2 14.5 2.7 23.5-.2 8-2.6 14.5 3 21.5-.2" fill="none" stroke="#101c18" stroke-width="1.5" stroke-linecap="round"/></g>'+
  '<rect x="7" y="14" width="50" height="38" rx="9" fill="none" stroke="#101c18" stroke-width="5"/>'+
  '<path d="M27.5 52v3h9v-3Z" fill="#101c18"/><rect x="24" y="54.5" width="16" height="4.6" rx="2.3" fill="#101c18"/></svg>';
}
var TICK = '<svg viewBox="0 0 12 12" width="10" height="10" fill="none" aria-hidden><path d="m2.5 6.2 2.3 2.3L9.5 3.8" stroke="#fff" stroke-width="1.9" stroke-linecap="round" stroke-linejoin="round"/></svg>';
var STAR = '<svg viewBox="0 0 20 20" width="15" height="15" aria-hidden><path d="M10 1.6l2.5 5.1 5.6.8-4 3.9 1 5.6-5.1-2.7-5 2.7 1-5.6-4.1-3.9 5.6-.8Z" fill="#fbbf24"/></svg>';
var WA_ICON = '<svg viewBox="0 0 24 24" width="17" height="17" fill="currentColor" aria-hidden><path d="M12.04 2C6.6 2 2.17 6.43 2.16 11.88c0 1.74.46 3.44 1.32 4.94L2 22l5.32-1.39a9.86 9.86 0 0 0 4.71 1.2h.01c5.44 0 9.87-4.43 9.88-9.88a9.8 9.8 0 0 0-2.89-6.99A9.8 9.8 0 0 0 12.04 2Zm5.8 15.68a8.2 8.2 0 0 1-5.8 2.4h-.01a8.2 8.2 0 0 1-4.18-1.14l-.3-.18-3.11.82.83-3.04-.2-.31a8.17 8.17 0 0 1-1.25-4.35c0-4.53 3.69-8.21 8.22-8.21a8.16 8.16 0 0 1 5.8 2.41 8.15 8.15 0 0 1 2.4 5.81c0 4.53-3.69 8.21-8.22 8.21Z"/></svg>';

var WHY_ICONS = ['#5b9dff','#c084fc','#67e8f9','#ff7a88','#34d399','#f4917a','#c4b5fd','#fdba74'];
var WHY_TONES = ['#2f7bff','#a855f7','#22d3ee','#ef2b47','#10b981','#f4917a','#7c3aed','#f97316'];
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
var DEV_PATHS = [
  'M2.5 4h19v13h-19ZM8 20.5h8M12 17v3.5',
  'M5 11.5a7 7 0 0 1 14 0M4.5 11.5h15v7.5h-15Z',
  'M6.5 2.5h11v19h-11ZM10.5 5.5h3',
  'M4 2.5h16v19H4ZM10.6 18.4h2.8',
  'M4 5h16v11H4ZM2 19h20'
];

/* ---------------- State ---------------- */
var lang = 'ar';
try { var st = localStorage.getItem('moortv.lang'); if (st==='ar'||st==='en') lang = st; } catch(e){}
var cart = [];
try { var raw = localStorage.getItem('moortv.cart'); if (raw) { var p = JSON.parse(raw);
  if (Object.prototype.toString.call(p)==='[object Array]') cart = p.filter(function(l){ return l && find(l.id) && l.q>0; }); } } catch(e){}
function saveCart(){ try{ localStorage.setItem('moortv.cart', JSON.stringify(cart)); }catch(e){} }
function t(){ return T[lang]; }
function L(p){ return p[lang]; }
function $(s,r){ return (r||document).querySelector(s); }
function $$(s,r){ return Array.prototype.slice.call((r||document).querySelectorAll(s)); }
function esc(s){ return String(s).replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;').replace(/"/g,'&quot;'); }

/* ---------------- Renderers ---------------- */
function renderStatic() {
  var d = t();
  document.documentElement.lang = lang;
  document.documentElement.dir = d.dir;
  $('#langTxt').textContent = lang === 'ar' ? 'EN' : 'ع';
  $('#lang').setAttribute('aria-label', lang === 'ar' ? 'Switch language to English' : 'تغيير اللغة إلى العربية');
  $('#tagline').textContent = d.hero.tagline;

  // Simple data-i bindings, dot-path into the dictionary.
  $$('[data-i]').forEach(function (el) {
    var v = d, parts = el.getAttribute('data-i').split('.');
    for (var i = 0; i < parts.length && v != null; i++) v = v[parts[i]];
    if (typeof v === 'string') el.textContent = v;
  });

  $('#mark').innerHTML = logoMark(40);
  $('#mark2').innerHTML = logoMark(52);

  var links = [['plans','#plans'],['boxes','#boxes'],['browse','#categories'],['why','#why'],['faq','#faq']];
  $('#nav').innerHTML = links.map(function(l){ return '<a href="'+l[1]+'">'+esc(d.nav[l[0]])+'</a>'; }).join('');
  $('#menuList').innerHTML = links.map(function(l){ return '<li><a href="'+l[1]+'" data-close>'+esc(d.nav[l[0]])+'</a></li>'; }).join('');

  $('#chips').innerHTML = d.hero.chips.map(function(c){ return '<span><i></i>'+esc(c)+'</span>'; }).join('');

  var TILES = [
    ['action','#2f7bff','#e879f9','left:-6%;top:24%;width:96px',0,-8],
    ['football','#10b981','#2f7bff','left:18%;top:54%;width:96px',1,6],
    ['docs','#0ea5e9','#14b8a6','left:-7%;top:78%;width:84px',0,-12],
    ['comedy','#f97316','#e879f9','left:21%;top:12%;width:78px',1,7],
    ['scifi','#7c3aed','#22d3ee','left:106%;top:24%;width:96px',0,9],
    ['kids','#22d3ee','#a855f7','left:82%;top:53%;width:96px',1,-6],
    ['anime','#e879f9','#2f7bff','left:107%;top:78%;width:84px',0,11],
    ['drama','#a855f7','#1450d8','left:79%;top:12%;width:78px',1,-5]
  ];
  $('#tiles').innerHTML = TILES.map(function(x,i){
    return '<div class="tile'+(x[4]?' lg':'')+'" style="'+x[3]+'">'+
      '<figure style="transform:rotate('+x[5]+'deg);animation-delay:'+(i*.4)+'s">'+
      '<div style="aspect-ratio:2/3">'+art(x[0],x[1],x[2])+'</div>'+
      '<figcaption>'+esc(d.hero.tiles[x[0]])+'</figcaption></figure></div>';
  }).join('');

  var svc = SERVICES.concat(SERVICES);
  $('#svcTrack').innerHTML = svc.map(function(s){
    return '<div class="svc glass"><span class="glow" style="background:radial-gradient(circle at 50% 60%,'+s[1]+',transparent 68%)"></span>'+
      '<span class="keep" style="font-weight:'+s[2]+'">'+esc(s[0])+'</span></div>';
  }).join('');

  var counts = [20000,10000,9000];
  $('#statGrid').innerHTML = d.stats.items.map(function(s,i){
    var val = i<3 ? '<span class="cnt" data-to="'+counts[i]+'">0</span>+' : '<span class="keep">4K UHD</span>';
    return '<div class="stat"><div class="n grad">'+val+'</div><div class="l">'+esc(s.l)+'</div><div class="h">'+esc(s.h)+'</div><span class="bar"></span></div>';
  }).join('');
  $('#devRow').innerHTML = d.stats.devices.map(function(n,i){
    return '<div class="devchip"><svg viewBox="0 0 24 24" width="18" height="18" fill="none" style="color:rgba(255,255,255,.45)" aria-hidden><path d="'+DEV_PATHS[i]+'" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"/></svg>'+esc(n)+'</div>';
  }).join('');

  $('#cd').innerHTML = d.sale.units.map(function(u){
    return '<div class="u"><div class="b">--</div><span class="lb">'+esc(u)+'</span></div>';
  }).join('');

  $('#planCards').innerHTML = PLANS.map(function(p){ return planCard(p,d); }).join('');
  $('#devCards').innerHTML = DEVICES.map(function(p){ return devCard(p,d); }).join('');

  $('#catA').innerHTML = CATS.slice(0,5).map(catCard).join('');
  $('#catB').innerHTML = CATS.slice(5).map(catCard).join('');
  $('#leagues').innerHTML = LEAGUES.map(function(l){ return '<span>'+esc(l)+'</span>'; }).join('');

  $('#whyGrid').innerHTML = d.why.items.map(function(w,i){
    var c = WHY_TONES[i];
    return '<div class="why glass"><span class="ic" style="border:1px solid '+c+'44;background:linear-gradient(145deg,'+c+'26,transparent);box-shadow:0 12px 34px -14px '+c+'">'+
      '<svg viewBox="0 0 24 24" width="22" height="22" fill="none" style="color:'+WHY_ICONS[i]+'" aria-hidden><path d="'+WHY_PATHS[i]+'" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"/></svg></span>'+
      '<h3>'+esc(w.t)+'</h3><p>'+esc(w.b)+'</p><span class="ln" style="background:linear-gradient(90deg,'+c+',transparent)"></span></div>';
  }).join('');

  var rv = REVIEWS.concat(REVIEWS);
  $('#rvTrack').innerHTML = rv.map(function(r){
    var x = L(r);
    return '<figure class="rv glass"><div style="display:flex;gap:3px">'+rep(5,function(){return STAR;})+'</div>'+
      '<blockquote class="q">“'+esc(x[2])+'”</blockquote>'+
      '<figcaption class="who"><span class="av" style="background:linear-gradient(140deg,'+r.tone[0]+','+r.tone[1]+')">'+r.i+'</span>'+
      '<span style="min-width:0"><span style="display:block;font-size:13.5px;font-weight:600;color:#fff">'+esc(x[0])+'</span>'+
      '<span style="display:block;margin-top:2px;font-size:11.5px;color:rgba(255,255,255,.35)">'+esc(x[1])+'</span></span></figcaption></figure>';
  }).join('');
  $('#trust').innerHTML = d.reviews.trust.map(function(x){
    return '<div><b>'+esc(x.v)+'</b><span>'+esc(x.l)+'</span></div>';
  }).join('');

  $('#faqList').innerHTML = FAQS.map(function(f,i){
    var x = L(f);
    return '<div class="acc glass'+(i===0?' on':'')+'"><button type="button" aria-expanded="'+(i===0)+'"><span>'+esc(x[0])+'</span>'+
      '<span class="chev"><svg viewBox="0 0 16 16" width="14" height="14" fill="none" aria-hidden><path d="M4 6.5 8 10.5 12 6.5" stroke="#fff" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round"/></svg></span></button>'+
      '<div class="panel"><div class="in"><div class="sep"></div><p>'+esc(x[1])+'</p></div></div></div>';
  }).join('');

  var fl = d.footer.links;
  $('#fExplore').innerHTML = [[fl.subs,'#plans'],[fl.boxes,'#boxes'],[fl.cats,'#categories'],[fl.why,'#why']]
    .map(function(x){ return '<li><a href="'+x[1]+'">'+esc(x[0])+'</a></li>'; }).join('');
  $('#fSupport').innerHTML = [[fl.faq,'#faq'],[fl.reviews,'#reviews'],[fl.sale,'#offers']]
    .map(function(x){ return '<li><a href="'+x[1]+'">'+esc(x[0])+'</a></li>'; }).join('');
  $('#fContact').innerHTML =
    '<li><a href="'+wa(d.footer.waGreeting)+'" target="_blank" rel="noopener"><span dir="ltr" style="display:block;font-weight:600;color:rgba(255,255,255,.8)">'+WA_DISPLAY+'</span>'+
    '<span style="font-size:12px;color:rgba(255,255,255,.35)">'+esc(d.footer.waLine)+'</span></a></li>'+
    '<li><a href="https://www.snapchat.com/add/'+SNAP+'" target="_blank" rel="noopener"><span dir="ltr" style="display:block;font-weight:600;color:rgba(255,255,255,.8)">'+SNAP+'</span>'+
    '<span style="font-size:12px;color:rgba(255,255,255,.35)">'+esc(d.footer.snapLine)+'</span></a></li>'+
    '<li><span style="display:block;font-weight:600;color:rgba(255,255,255,.8)">'+esc(d.footer.country)+'</span>'+
    '<span style="font-size:12px;color:rgba(255,255,255,.35)">'+esc(d.footer.countryLine)+'</span></li>';

  $('#faqWa').href = wa(d.faq.waMessage);
  $('#footWa').href = wa(d.footer.waLearn);
  $('#socWa').href = wa(d.footer.waGreeting);
  $('#fab').href = wa(d.footer.waOrder);
  $('#fab').setAttribute('aria-label', d.footer.orderNow + ' — ' + WA_DISPLAY);
  $('#coNote').textContent = d.checkout.note(WA_DISPLAY);
  $('#cName').placeholder = d.checkout.ph.name;
  $('#cPhone').placeholder = d.checkout.ph.phone;
  $('#cAddr').placeholder = d.checkout.ph.addr;
  $('#cNotes').placeholder = d.checkout.ph.notes;

  // Section headings sit inside .head; make sure alignment follows direction.
  $$('.head:not(.mid)').forEach(function(h){ h.style.textAlign = 'start'; });
  $('#leagueBox').style.cssText = window.innerWidth >= 1024
    ? 'display:flex;flex-direction:row;align-items:center;justify-content:space-between;gap:24px'
    : 'display:flex;flex-direction:column;gap:24px';

  renderCart();
  observeReveals();
  bindAccordions();
}

function planCard(p, d) {
  var x = L(p);
  var badge = p.badge === 'best' ? '<div style="display:flex;justify-content:center;margin-bottom:24px"><span class="badge hot">'+esc(d.plans.best)+'</span></div>'
            : p.badge === 'popular' ? '<div style="display:flex;justify-content:center;margin-bottom:24px"><span class="badge pop">'+esc(d.plans.popular)+'</span></div>' : '';
  var save = p.was ? '<p class="cmp"><span class="old" dir="ltr">'+money(p.was)+'</span><span class="sv">'+esc(d.plans.save(Math.round((1-p.price/p.was)*100)))+'</span></p>' : '';
  var grad = p.hi ? 'linear-gradient(135deg,#ef2b47,#f4917a)' : 'linear-gradient(135deg,#2f7bff,#a855f7)';
  return '<article class="card rev'+(p.hi?' hi':'')+'"'+(p.hi?' style="z-index:1"':'')+'>'+
    '<div class="body '+(p.hi?'':'glass')+'"'+(p.hi?' style="background:linear-gradient(165deg,rgba(74,16,48,.72),rgba(12,10,24,.94) 45%,rgba(8,8,14,.97))"':'')+'>'+
    badge+
    '<div style="width:100%;max-width:210px;margin:0 auto 28px;border-radius:24px;overflow:hidden;border:1px solid rgba(255,255,255,.1)">'+
    '<div style="aspect-ratio:4/3">'+art(p.art,p.tone[0],p.tone[1])+'</div></div>'+
    '<div style="text-align:center"><h3 style="font-size:22px">'+esc(x.n)+'</h3>'+
    '<p style="margin-top:8px;font-size:13px;color:rgba(255,255,255,.4)">'+esc(x.b)+'</p>'+
    '<div class="price" dir="ltr"><b>'+num(p.price)+'</b><s>MRU</s></div>'+save+'</div>'+
    '<ul class="feat">'+x.f.map(function(f){
      return '<li><span class="tick" style="background:'+grad+'">'+TICK+'</span><span>'+esc(f)+'</span></li>'; }).join('')+'</ul>'+
    '<button class="btn '+(p.hi||p.badge==='popular'?'btn-p':'btn-g')+' btn-lg btn-full" style="margin-top:28px" data-add="'+p.id+'">'+
    '<span class="sheen"></span><span>'+esc(d.cart.add)+'</span></button></div></article>';
}

function devCard(p, d) {
  var x = L(p);
  return '<article class="card rev'+(p.hi?' hi':'')+'">'+
    '<div class="body glass" style="padding:0">'+
    '<div style="position:relative;overflow:hidden;border-radius:30px 30px 0 0">'+
    '<div style="aspect-ratio:4/3">'+art(p.art,p.tone[0],p.tone[1])+'</div>'+
    '<div style="position:absolute;inset-inline:0;bottom:0;height:112px;background:linear-gradient(to top,#0b0b12,transparent)"></div>'+
    '<span class="badge" style="position:absolute;top:20px;inset-inline-start:20px;border:1px solid rgba(255,255,255,.15);background:rgba(0,0,0,.55);color:#fff;backdrop-filter:blur(8px)">'+esc(d.devices[p.badge])+'</span>'+
    '<span class="badge" style="position:absolute;top:20px;inset-inline-end:20px;border:1px solid rgba(52,211,153,.3);background:rgba(52,211,153,.12);color:#6ee7b7;backdrop-filter:blur(8px)">'+esc(d.devices.yearIncluded)+'</span>'+
    '</div>'+
    '<div style="display:flex;flex-direction:column;flex:1;padding:28px">'+
    '<div style="display:flex;flex-wrap:wrap;align-items:flex-start;justify-content:space-between;gap:16px">'+
    '<h3 style="font-size:23px">'+esc(x.n)+'</h3>'+
    '<div style="text-align:end"><div class="price" style="margin:0;justify-content:flex-end" dir="ltr"><b style="font-size:30px">'+num(p.price)+'</b><s>MRU</s></div>'+
    '<p style="margin-top:6px;font-size:11.5px;color:rgba(255,255,255,.3)">'+esc(d.devices.oneTime)+'</p></div></div>'+
    '<p style="margin-top:16px;font-size:13.5px;line-height:1.7;color:rgba(255,255,255,.45)">'+esc(x.b)+'</p>'+
    '<ul class="feat">'+x.f.map(function(f){
      return '<li><span class="tick" style="background:linear-gradient(135deg,'+p.accent[0]+','+p.accent[1]+')">'+TICK+'</span><span>'+esc(f)+'</span></li>'; }).join('')+'</ul>'+
    '<button class="btn '+(p.hi?'btn-p':'btn-g')+' btn-lg btn-full" style="margin-top:28px" data-add="'+p.id+'">'+
    '<span class="sheen"></span><span>'+esc(d.cart.add)+'</span></button></div></div></article>';
}

function catCard(c) {
  var x = L(c);
  return '<a href="#plans" class="cat rev" aria-label="'+esc(x[0])+' — '+esc(x[1])+'"><div class="fr">'+
    art(c.art,c.tone[0],c.tone[1])+
    '<div class="meta"><h3>'+esc(x[0])+'</h3><p class="c">'+esc(x[1])+'</p></div></div></a>';
}

/* ---------------- Cart ---------------- */
function totals() {
  var sub = 0, save = 0, n = 0;
  cart.forEach(function (l) {
    var p = find(l.id); if (!p) return;
    sub += p.price * l.q; n += l.q;
    if (p.was) save += (p.was - p.price) * l.q;
  });
  return { sub: sub, save: save, n: n };
}
function add(id) {
  for (var i = 0; i < cart.length; i++) if (cart[i].id === id) { cart[i].q = Math.min(20, cart[i].q + 1); saveCart(); renderCart(); return; }
  cart.push({ id: id, q: 1 }); saveCart(); renderCart();
}
function setQ(id, q) {
  for (var i = 0; i < cart.length; i++) if (cart[i].id === id) {
    if (q <= 0) cart.splice(i, 1); else cart[i].q = Math.min(20, q);
    break;
  }
  saveCart(); renderCart();
}
function renderCart() {
  var d = t(), tt = totals();
  var badge = $('#count');
  badge.textContent = tt.n;
  badge.className = tt.n > 0 ? 'on' : '';
  $('#cartBtn').setAttribute('aria-label', tt.n > 0 ? d.cart.title + ' — ' + d.cart.count(tt.n) : d.cart.title);
  $('#cartCountTxt').textContent = tt.n === 0 ? d.cart.empty : d.cart.count(tt.n);

  var box = $('#lines');
  if (!cart.length) {
    box.innerHTML = '<div class="empty"><svg viewBox="0 0 24 24" width="56" height="56" fill="none" style="color:rgba(255,255,255,.2);margin-bottom:24px" aria-hidden>'+
      '<path d="M3 4h2.2l2.1 10.4a1.8 1.8 0 0 0 1.77 1.44h7.4a1.8 1.8 0 0 0 1.76-1.4L20 8H6.2" stroke="currentColor" stroke-width="1.3" stroke-linecap="round" stroke-linejoin="round"/>'+
      '<circle cx="10" cy="19.5" r="1.3" fill="currentColor"/><circle cx="17" cy="19.5" r="1.3" fill="currentColor"/></svg>'+
      '<p style="font-size:15px;font-weight:600;color:rgba(255,255,255,.7)">'+esc(d.cart.emptyTitle)+'</p>'+
      '<p style="margin-top:8px;max-width:240px;font-size:13px;color:rgba(255,255,255,.35)">'+esc(d.cart.emptyBody)+'</p>'+
      '<a href="#plans" class="btn btn-g" style="margin-top:24px" data-close-cart><span>'+esc(d.cart.browse)+'</span></a></div>';
    $('#cartSum').style.display = 'none';
    return;
  }
  box.innerHTML = cart.map(function (l) {
    var p = find(l.id), x = L(p);
    return '<div class="line"><div class="thumb">'+art(p.art,p.tone[0],p.tone[1],74,74)+'</div>'+
      '<div style="flex:1;min-width:0">'+
      '<div style="display:flex;align-items:flex-start;justify-content:space-between;gap:8px">'+
      '<h3 style="font-size:13.5px;font-weight:600;overflow:hidden;text-overflow:ellipsis;white-space:nowrap">'+esc(x.n)+'</h3>'+
      '<button data-rm="'+p.id+'" aria-label="'+esc(x.n)+'" style="flex-shrink:0;color:rgba(255,255,255,.3);padding:2px">'+
      '<svg viewBox="0 0 16 16" width="14" height="14" fill="none" aria-hidden><path d="m4 4 8 8M12 4l-8 8" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/></svg></button></div>'+
      '<div style="display:flex;align-items:center;justify-content:space-between;gap:8px;margin-top:12px">'+
      '<div class="qty"><button data-q="'+p.id+'" data-d="-1" aria-label="-">'+
      '<svg viewBox="0 0 16 16" width="14" height="14" fill="none" aria-hidden><path d="M3.5 8h9" stroke="currentColor" stroke-width="1.6" stroke-linecap="round"/></svg></button>'+
      '<span>'+l.q+'</span>'+
      '<button data-q="'+p.id+'" data-d="1" aria-label="+">'+
      '<svg viewBox="0 0 16 16" width="14" height="14" fill="none" aria-hidden><path d="M8 3.5v9M3.5 8h9" stroke="currentColor" stroke-width="1.6" stroke-linecap="round"/></svg></button></div>'+
      '<span dir="ltr" style="font-size:13.5px;font-weight:700;color:#fff">'+money(p.price*l.q)+'</span></div></div></div>';
  }).join('');
  $('#cartSum').style.display = '';
  $('#sSub').textContent = money(tt.sub);
  $('#sTot').textContent = money(tt.sub);
  $('#coTotal').textContent = money(tt.sub);
  $('#sSaveRow').style.display = tt.save > 0 ? '' : 'none';
  $('#sSave').textContent = '−' + money(tt.save);
}

function orderMessage() {
  var d = t(), m = d.checkout.msg, tt = totals();
  var name = $('#cName').value.trim(), phone = $('#cPhone').value.trim();
  var addr = $('#cAddr').value.trim(), notes = $('#cNotes').value.trim();
  var out = [m.greeting, '', m.intro, '', m.name + ': ' + (name || '—'), m.phone + ': ' + (phone || '—')];
  if (addr) out.push(m.address + ': ' + addr);
  out.push('', m.products);
  cart.forEach(function (l) {
    var p = find(l.id);
    out.push('• ' + L(p).n + ' — ' + m.qty + ': ' + l.q + ' — ' + money(p.price * l.q));
  });
  if (tt.save > 0) out.push('', m.savings + ': ' + money(tt.save));
  out.push('', m.total + ': ' + money(tt.sub));
  if (notes) out.push('', m.notes + ': ' + notes);
  out.push('', m.closing);
  return out.join('\n');
}

/* ---------------- Behaviour ---------------- */
function observeReveals() {
  var els = $$('.rev:not(.in)');
  if (!('IntersectionObserver' in window)) { els.forEach(function(e){ e.classList.add('in'); }); return; }
  var io = new IntersectionObserver(function (ents) {
    ents.forEach(function (e, i) {
      if (!e.isIntersecting) return;
      var el = e.target;
      setTimeout(function(){ el.classList.add('in'); }, Math.min(i, 6) * 70);
      io.unobserve(el);
      if (el.querySelector && el.querySelector('.cnt')) countUp(el);
    });
  }, { threshold: 0.15, rootMargin: '0px 0px -40px 0px' });
  els.forEach(function (e) { io.observe(e); });

  var sg = $('#statGrid');
  if (sg && !sg.dataset.done) {
    var io2 = new IntersectionObserver(function (ents) {
      if (ents[0].isIntersecting) { sg.dataset.done = '1'; countUp(sg); io2.disconnect(); }
    }, { threshold: 0.4 });
    io2.observe(sg);
  }
}
function countUp(scope) {
  $$('.cnt', scope).forEach(function (el) {
    if (el.dataset.ran) return; el.dataset.ran = '1';
    var to = +el.dataset.to, start = 0, dur = 2000;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) { el.textContent = num(to); return; }
    function step(ts) {
      if (!start) start = ts;
      var k = Math.min(1, (ts - start) / dur);
      var e = k === 1 ? 1 : 1 - Math.pow(2, -10 * k);
      el.textContent = num(Math.round(e * to));
      if (k < 1) requestAnimationFrame(step);
    }
    requestAnimationFrame(step);
  });
}
function bindAccordions() {
  $$('.acc').forEach(function (acc) {
    var panel = $('.panel', acc);
    if (acc.classList.contains('on')) panel.style.maxHeight = panel.scrollHeight + 'px';
    $('button', acc).addEventListener('click', function () {
      var open = acc.classList.contains('on');
      $$('.acc').forEach(function (o) {
        o.classList.remove('on'); $('.panel', o).style.maxHeight = '0px';
        $('button', o).setAttribute('aria-expanded', 'false');
      });
      if (!open) {
        acc.classList.add('on'); panel.style.maxHeight = panel.scrollHeight + 'px';
        this.setAttribute('aria-expanded', 'true');
      }
    });
  });
}
function countdown() {
  var now = new Date();
  var end = new Date(now.getFullYear(), now.getMonth() + 1, 1).getTime();
  function tick() {
    var ms = Math.max(0, end - Date.now());
    var v = [Math.floor(ms/864e5), Math.floor(ms/36e5)%24, Math.floor(ms/6e4)%60, Math.floor(ms/1e3)%60];
    $$('#cd .b').forEach(function (b, i) {
      var s = String(v[i]); if (s.length < 2) s = '0' + s;
      if (b.textContent !== s) b.textContent = s;
    });
  }
  tick(); setInterval(tick, 1000);
}
function particles() {
  var c = $('#dust'); if (!c) return;
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
  var ctx = c.getContext('2d'); if (!ctx) return;
  var w, h, ps = [], raf = 0, live = true;
  function build() {
    var p = c.parentElement;
    w = p.clientWidth; h = p.clientHeight;
    var r = Math.min(window.devicePixelRatio || 1, 2);
    c.width = w * r; c.height = h * r; c.style.width = w + 'px'; c.style.height = h + 'px';
    ctx.setTransform(r, 0, 0, r, 0, 0);
    var n = Math.round(Math.min(90, Math.max(24, (w * h) / 18000)));
    ps = []; for (var i = 0; i < n; i++) {
      var z = Math.random() * .8 + .2;
      ps.push({ x: Math.random()*w, y: Math.random()*h, z: z, r: z*1.8+.4,
        vx: (Math.random()-.5)*.14*z, vy: -(Math.random()*.2+.05)*z,
        hue: Math.random() > .55 ? 268 : 216 });
    }
  }
  function frame() {
    if (!live) return;
    ctx.clearRect(0, 0, w, h);
    for (var i = 0; i < ps.length; i++) {
      var p = ps[i]; p.x += p.vx; p.y += p.vy;
      if (p.y < -12) { p.y = h + 12; p.x = Math.random() * w; }
      if (p.x < -12) p.x = w + 12; if (p.x > w + 12) p.x = -12;
      var a = .14 + p.z * .5;
      ctx.beginPath(); ctx.arc(p.x, p.y, p.r, 0, 6.2832);
      ctx.fillStyle = 'hsla(' + p.hue + ',100%,' + (72 + p.z * 12) + '%,' + a + ')';
      ctx.shadowBlur = 12 * p.z; ctx.shadowColor = 'hsla(' + p.hue + ',100%,68%,' + a + ')';
      ctx.fill();
    }
    ctx.shadowBlur = 0;
    raf = requestAnimationFrame(frame);
  }
  build(); frame();
  window.addEventListener('resize', build);
  document.addEventListener('visibilitychange', function () {
    if (document.hidden) { live = false; cancelAnimationFrame(raf); }
    else if (!live) { live = true; frame(); }
  });
}

/* ---------------- Wiring ---------------- */
function openCart(){ $('#cart').classList.add('on'); document.body.style.overflow='hidden'; }
function closeCart(){ $('#cart').classList.remove('on'); document.body.style.overflow=''; }
function openModal(){ closeCart(); $('#modal').classList.add('on'); document.body.style.overflow='hidden'; setTimeout(function(){ $('#cName').focus(); },80); }
function closeModal(){ $('#modal').classList.remove('on'); document.body.style.overflow=''; }

document.addEventListener('click', function (e) {
  var el;
  if ((el = e.target.closest('[data-add]'))) {
    add(el.getAttribute('data-add'));
    var span = el.querySelector('span:last-child'), old = span.textContent;
    span.textContent = t().cart.added;
    setTimeout(function () { span.textContent = old; }, 1500);
    return;
  }
  if ((el = e.target.closest('[data-rm]'))) { setQ(el.getAttribute('data-rm'), 0); return; }
  if ((el = e.target.closest('[data-q]'))) {
    var id = el.getAttribute('data-q'), d = +el.getAttribute('data-d');
    for (var i = 0; i < cart.length; i++) if (cart[i].id === id) { setQ(id, cart[i].q + d); break; }
    return;
  }
  if (e.target.closest('[data-close-cart]')) { closeCart(); return; }
  if (e.target.closest('[data-close-modal]')) { closeModal(); return; }
  if (e.target.closest('[data-close]')) { $('#menu').classList.remove('on'); document.body.style.overflow=''; $('#burger').setAttribute('aria-expanded','false'); }
});
$('#cartBtn').addEventListener('click', openCart);
$('#toCheckout').addEventListener('click', openModal);
$('#burger').addEventListener('click', function () {
  var m = $('#menu'), on = m.classList.toggle('on');
  document.body.style.overflow = on ? 'hidden' : '';
  this.setAttribute('aria-expanded', on ? 'true' : 'false');
});
document.addEventListener('keydown', function (e) {
  if (e.key !== 'Escape') return;
  closeCart(); closeModal();
  $('#menu').classList.remove('on'); $('#burger').setAttribute('aria-expanded','false');
});
$('#lang').addEventListener('click', function () {
  lang = lang === 'ar' ? 'en' : 'ar';
  try { localStorage.setItem('moortv.lang', lang); } catch (err) {}
  renderStatic();
});
$('#coForm').addEventListener('submit', function (e) {
  e.preventDefault();
  if (!cart.length) return;
  var ok = true;
  var nf = $('#fName'), pf = $('#fPhone');
  nf.classList.toggle('bad', $('#cName').value.trim().length < 2);
  if ($('#cName').value.trim().length < 2) ok = false;
  var digits = $('#cPhone').value.replace(/\D/g, '');
  pf.classList.toggle('bad', digits.length < 8);
  if (digits.length < 8) ok = false;
  if (!ok) return;
  window.open(wa(orderMessage()), '_blank', 'noopener');
});
['cName','cPhone'].forEach(function (id) {
  $('#' + id).addEventListener('input', function () { this.closest('.field').classList.remove('bad'); });
});
window.addEventListener('scroll', function () {
  var y = window.pageYOffset;
  $('#bar').classList.toggle('stuck', y > 24);
  $('#fab').classList.toggle('on', y > 700);
  var max = document.documentElement.scrollHeight - window.innerHeight;
  $('#prog').style.transform = 'scaleX(' + (max > 0 ? y / max : 0) + ')';
}, { passive: true });

renderStatic();
countdown();
particles();
})();
