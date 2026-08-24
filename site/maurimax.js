/* ==========================================================
   MAURIMAX — single-file runtime
   Arabic default (RTL); English via the header toggle.
   No dependencies, no build step.
   ========================================================== */
(function () {
'use strict';

/* Current language. Declared up here because num() below reads it. */
var lang = 'ar';

/* ---------------- Contact ---------------- */
var WA_DISPLAY = '46 26 17 21';
var WA_E164 = '22246261721';          // Mauritania +222
var SNAP = 'moor.view';
function wa(m){ return 'https://wa.me/' + WA_E164 + '?text=' + encodeURIComponent(m); }
// French groups thousands with a space, Arabic Mauritania uses the comma.
// Every figure on the page runs through this, including the WhatsApp order.
function num(n){ return new Intl.NumberFormat(lang === 'fr' ? 'fr-FR' : 'en-US').format(n); }
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
          {n:'15,000+',l:'مسلسل',h:'مواسم كاملة، تُحدَّث دائماً'},
          {n:'20,000+',l:'قناة مباشرة',h:'من كل قارات العالم'},
          {n:'4K UHD',l:'جودة البث',h:'وضوح تام على كل شاشة'} ],
  statsLead:{ eyebrow:'المكتبة', titleA:'اشتراك واحد', titleB:'يفتح كل هذا.',
    body:'مكتبة كاملة تُحدَّث كل أسبوع، وبث مباشر لكل ما يهمّك — بنفس السعر مهما طالت المدة.' },
  plans:{ eyebrow:'الأسعار', titleA:'اشتراك واحد،', titleB:'أربعة خيارات.',
    subtitle:'نفس المحتوى الكامل في كل الاشتراكات — الفرق في المدة فقط. كلما طالت المدة قلّت التكلفة الشهرية.',
    footnote:'الأسعار بالأوقية الموريتانية. التفعيل والدعم عبر واتساب، ولا يُخصم أي مبلغ عبر الموقع.',
    perMonth:function(n){ return num(n) + ' أوقية شهرياً'; },
    save:function(p){ return 'وفّر ' + p + '%'; },
    popular:'الأكثر طلباً', best:'أفضل قيمة', add:'اشترك الآن',
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
    subtitle:'مكتبة تُحدَّث باستمرار — تصفّحها وشاهد ما يفتحه لك اشتراك واحد.',
  },
  faces:{ eyebrow:'شخصيات', titleA:'وجوه', titleB:'تعرفها جيداً.' },
  why:{ eyebrow:'لماذا موريماكس', titleA:'تجربة', titleB:'تستحق الاشتراك.',
    subtitle:'ليست مجرد مكتبة أكبر — بل خدمة أفضل من البداية إلى النهاية.',
    items:[
      {t:'جودة فائقة',b:'بث 4K مع معدل متكيّف، فتبقى الصورة واضحة حتى عندما يضعف الاتصال.'},
      {t:'تفعيل خلال دقائق',b:'اطلب عبر واتساب ويُفعَّل اشتراكك في الحال — لا انتظار حتى الغد.'},
      {t:'مكتبة ضخمة',b:'أكثر من 20 ألف فيلم و15 ألف مسلسل و20 ألف قناة في مكان واحد.'},
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
  pick:{ eyebrow:'الاشتراك', title:'اختر مدّتك',
    sub:'كل الاشتراكات تفتح نفس المحتوى بالكامل — الفرق في المدة وحدها.',
    forCat:function(c){ return 'اشتراك واحد يفتح قسم ' + c + ' وكل شيء آخر في المكتبة.'; },
    note:'لا يُخصم أي مبلغ على الموقع. يُفتح طلبك كرسالة واتساب جاهزة.',
    back:'العودة إلى الاشتراكات' },
  checkout:{ titleA:'أكمل', titleB:'طلبك', hint:'نستخدم بياناتك فقط لتأكيد الطلب وتفعيله.',
    name:'الاسم', nameError:'الرجاء إدخال اسمك.', phone:'رقم الهاتف',
    phoneHint:'رقم موريتاني من 8 أرقام', phoneError:'الرجاء إدخال رقم هاتف صحيح.',
    notes:'ملاحظات', optional:'اختياري', submit:'أرسل الطلب عبر واتساب',
    note:function(p){ return 'لا يُخصم منك شيء على هذا الموقع. يُفتح طلبك كرسالة واتساب جاهزة إلى '+p+'، حيث نؤكّد الدفع ونفعّل اشتراكك.'; },
    ph:{name:'محمد ولد أحمد',phone:'44 00 00 00',notes:'أي شيء ينبغي أن نعرفه…'},
    msg:{greeting:'مرحباً موريماكس،',intro:'أرغب في الاشتراك.',name:'الاسم',phone:'الهاتف',
      plan:'الاشتراك',total:'الإجمالي',notes:'ملاحظات',closing:'الرجاء التواصل معي.'} },
  footer:{ ctaEyebrow:'ابدأ الآن', ctaA:'جاهز للمشاهدة؟', ctaB:'ابدأ اليوم.',
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
fr: {
  dir:'ltr',
  nav:{ plans:'Abonnements', football:'Football', browse:'Contenu', why:'Pourquoi nous', faq:'FAQ',
        cta:'S’abonner', skip:'Aller au contenu' },
  hero:{ kicker:'MAURIMAX', titleA:'Tout ce que vous aimez.', titleB:'Un seul abonnement.',
    subtitle:'Films, séries, chaînes en direct et toutes les grandes compétitions de football en 4K — sur tous vos écrans.',
    from:'À partir de', ctaPrimary:'Choisir mon abonnement', ctaSecondary:'Voir les compétitions',
    pills:['Activation en minutes','Sur tous vos appareils','4K Ultra HD'] },
  band:['Toutes les ligues de football','Films et séries','Chaînes en direct','Qualité 4K','Activation immédiate','Assistance WhatsApp'],
  stats:[ {n:'20,000+',l:'Films',h:'Des blockbusters aux pépites'},
          {n:'15,000+',l:'Séries',h:'Saisons complètes, toujours à jour'},
          {n:'20,000+',l:'Chaînes en direct',h:'De tous les continents'},
          {n:'4K UHD',l:'Qualité de diffusion',h:'Une image nette sur chaque écran'} ],
  statsLead:{ eyebrow:'La bibliothèque', titleA:'Un seul abonnement', titleB:'ouvre tout cela.',
    body:'Une bibliothèque complète enrichie chaque semaine et le direct de tout ce qui compte — au même prix, quelle que soit la durée.' },
  plans:{ eyebrow:'Tarifs', titleA:'Un abonnement,', titleB:'quatre durées.',
    subtitle:'Tous les abonnements donnent accès à la même bibliothèque complète — seule la durée change. Plus elle est longue, moins le mois revient cher.',
    footnote:'Prix en ouguiya mauritanienne. Activation et assistance sur WhatsApp ; aucun montant n’est prélevé sur ce site.',
    perMonth:function(n){ return num(n) + ' MRU / mois'; },
    save:function(p){ return 'Économisez ' + p + ' %'; },
    popular:'Le plus choisi', best:'Meilleure offre', add:'S’abonner',
    months:function(n){ return n===1?'1 mois':n+' mois'; },
    features:[
      'La bibliothèque complète',
      'Toutes les ligues, en direct',
      'Films, séries, animés, documentaires',
      'Chaînes jeunesse et information',
      '4K sur tous vos appareils',
      'Assistance WhatsApp rapide' ] },
  football:{ eyebrow:'Sport', titleA:'Chaque match qui compte,', titleB:'en direct.',
    subtitle:'Les grands championnats européens, les compétitions continentales et la Saudi Pro League — en haute qualité, sans coupure.',
    bandTitle:'Compétitions incluses', bandSub:'En direct, jusqu’à la 4K',
    bandCta:'S’abonner', liveTag:'DIRECT',
    leagues:[
      ['Premier League','Angleterre'],
      ['UEFA Champions League','Europe'],
      ['LaLiga','Espagne'],
      ['Serie A','Italie'],
      ['Bundesliga','Allemagne'],
      ['Ligue 1','France'],
      ['Saudi Pro League','Arabie saoudite'],
      ['CAF & Coupe du monde','International'] ] },
  categories:{ eyebrow:'Contenu', titleA:'Tout,', titleB:'au même endroit.',
    subtitle:'Une bibliothèque enrichie chaque semaine — parcourez ce qu’un seul abonnement débloque.'
  },
  why:{ eyebrow:'Pourquoi MAURIMAX', titleA:'Une expérience', titleB:'qui vaut l’abonnement.',
    subtitle:'Pas seulement un catalogue plus large — un meilleur service, du début à la fin.',
    items:[
      {t:'Qualité Ultra HD',b:'4K à débit adaptatif : l’image reste nette même quand la connexion faiblit.'},
      {t:'Actif en quelques minutes',b:'Commandez sur WhatsApp et votre accès est activé aussitôt — sans attendre demain.'},
      {t:'Bibliothèque immense',b:'Plus de 20 000 films, 15 000 séries et 20 000 chaînes au même endroit.'},
      {t:'Tous vos appareils',b:'Smart TV, Android, iPhone, iPad ou ordinateur. Un compte suffit pour toute la maison.'},
      {t:'Vraiment abordable',b:'À partir de 125 MRU par mois — une fraction du prix des plateformes prises séparément.'},
      {t:'Une vraie assistance',b:'Des personnes sur WhatsApp qui répondent vite et règlent le problème.'},
      {t:'Sans coupure',b:'Des serveurs stables réglés pour les réseaux mauritaniens, même les soirs de grand match.'},
      {t:'Enrichi chaque semaine',b:'Nouveaux films, saisons et chaînes ajoutés chaque semaine, sans supplément.'} ] },
  reviews:{ eyebrow:'Témoignages', titleA:'La confiance de', titleB:'milliers d’abonnés.',
    subtitle:'Voici ce qu’en disent quelques abonnés.' },
  faq:{ eyebrow:'FAQ', title:'Questions fréquentes',
    subtitle:'Tout ce qu’il faut savoir avant de s’abonner. Pour le reste, écrivez-nous.',
    helpBody:'Encore un doute ? Écrivez-nous sur WhatsApp, nous répondons en quelques minutes.',
    waMessage:'Bonjour MAURIMAX, j’ai une question sur vos abonnements.' },
  pick:{ eyebrow:'Abonnement', title:'Choisissez votre durée',
    sub:'Tous les abonnements donnent accès à la même bibliothèque — seule la durée change.',
    forCat:function(c){ return 'Un seul abonnement ouvre ' + c + ' et tout le reste de la bibliothèque.'; },
    note:'Aucun montant n’est prélevé sur le site. Votre commande s’ouvre dans WhatsApp, déjà rédigée.',
    back:'Retour aux abonnements' },
  checkout:{ titleA:'Finalisez votre', titleB:'commande', hint:'Vos informations servent uniquement à confirmer et activer la commande.',
    name:'Nom complet', nameError:'Merci d’indiquer votre nom.', phone:'Numéro de téléphone',
    phoneHint:'Numéro mauritanien, 8 chiffres', phoneError:'Merci d’indiquer un numéro valide.',
    notes:'Remarques', optional:'Facultatif', submit:'Envoyer la commande sur WhatsApp',
    note:function(p){ return 'Aucun montant n’est prélevé sur ce site. Votre commande s’ouvre dans WhatsApp vers le '+p+', déjà rédigée — nous y confirmons le paiement et activons votre accès.'; },
    ph:{name:'Mohamed Ould Ahmed',phone:'44 00 00 00',notes:'Quelque chose à nous signaler…'},
    msg:{greeting:'Bonjour MAURIMAX,',intro:'Je souhaite m’abonner.',name:'Nom',phone:'Téléphone',
      plan:'Abonnement',total:'Total',notes:'Remarques',closing:'Merci de me recontacter.'} },
  footer:{ ctaEyebrow:'Commencer', ctaA:'Prêt à regarder ?', ctaB:'Commencez aujourd’hui.',
    ctaSub:'Un seul abonnement débloque tout — à partir de 350 MRU.',
    ctaPrimary:'Choisir mon abonnement', ctaWhatsApp:'Nous écrire sur WhatsApp', orderNow:'Commander',
    about:'MAURIMAX réunit films, séries, chaînes en direct et toutes les grandes compétitions de football dans un seul abonnement — pensé pour la Mauritanie.',
    explore:'Explorer', support:'Assistance', contact:'Contact',
    links:{plans:'Abonnements',football:'Football',cats:'Contenu',why:'Pourquoi MAURIMAX',
      faq:'FAQ',reviews:'Avis'},
    waLine:'WhatsApp — commandes et assistance', snapLine:'Snapchat — offres du jour',
    country:'Mauritanie', countryLine:'Service dans tout le pays', rights:'Tous droits réservés.',
    trademarks:'Les noms de compétitions servent uniquement à décrire le contenu disponible et restent la propriété de leurs détenteurs. MAURIMAX est un service indépendant, sans affiliation avec aucun d’entre eux.',
    waGreeting:'Bonjour MAURIMAX,',
    waLearn:'Bonjour MAURIMAX, je voudrais en savoir plus sur vos abonnements.',
    waOrder:'Bonjour MAURIMAX, je souhaite m’abonner.' }
}
};

/* ---------------- Plans ----------------
   350 / 700 / 1000 / 1500 MRU. The monthly rate (350) is the reference the
   savings percentages are measured against. */
var BASE = 350;
var PLANS = [
  { id:'p1',  months:1,  price:350,  art:'m1',  photo:'p-haaland' },
  { id:'p3',  months:3,  price:700,  art:'m3',  photo:'x-tyrion',  badge:'popular' },
  { id:'p6',  months:6,  price:1000, art:'m6',  photo:'x-punisher' },
  { id:'p12', months:12, price:1500, art:'m12', photo:'p-messi', photo2:'x-walter',
    badge:'best', best:true }
];
PLANS.forEach(function (p) {
  p.ref = BASE * p.months;
  p.per = Math.round(p.price / p.months);
  p.savePct = Math.round((1 - p.price / p.ref) * 100);
});
function find(id){ for(var i=0;i<PLANS.length;i++) if(PLANS[i].id===id) return PLANS[i]; return null; }

/* Key art as moving background texture behind the closing call to action —
   never as a list of titles. */
var DRIFT = ['m-oppenheimer','m-got','m-batman','m-breakingbad','m-odyssey',
             'm-lacasa','m-spiderman','m-walkingdead','m-fury',
             'po-epl','po-ucl','po-seriea','po-laliga','po-bundesliga','po-ligue1'];

var CATS = [
  {art:'movies',   photo:'m-fury',        ar:['أفلام','أكثر من 20,000 فيلم'],    fr:['Films','Plus de 20 000 films']},
  {art:'series',   photo:'m-walkingdead', ar:['مسلسلات','أكثر من 15,000 مسلسل'], fr:['Séries','Plus de 15 000 séries']},
  {art:'football', photo:'c-football', ar:['كرة القدم','كل الدوريات الكبرى'], fr:['Football','Tous les grands championnats']},
  {art:'sports',   photo:'c-sports',   ar:['رياضة','أكثر من 900 قناة'],       fr:['Sports','Plus de 900 chaînes']},
  {art:'kids',     photo:'c-kids',  ar:['أطفال','آمن وممتع'],      fr:['Enfants','Sûr et amusant']},
  {art:'anime',    photo:'c-anime', ar:['أنمي','مترجم ومدبلج'],   fr:['Animés','Sous-titrés et doublés']},
  {art:'docs',     photo:'c-docs', ar:['وثائقيات','قصص حقيقية'],  fr:['Documentaires','Des histoires vraies']},
  {art:'news',     photo:'c-news', logo:true, ar:['أخبار','على مدار الساعة'], fr:['Actualités','24 h/24, partout']},
  {art:'series2',  photo:'c-drama', ar:['دراما عربية وتركية','مواسم كاملة'], fr:['Drames arabes et turcs','Saisons complètes']},
  {art:'live',     photo:'c-live',     ar:['قنوات مباشرة','أكثر من 20,000 قناة'], fr:['Chaînes en direct','Plus de 20 000 chaînes']}
];

/* Illustrative examples, not verified customer reviews — replace before launch. */
var REVIEWS = [
  {i:'MA',ar:['محمد ولد أحمد','نواكشوط','أتابع كل مباريات دوري الأبطال بجودة عالية دون أي تقطيع، والتفعيل استغرق دقائق فقط.'],
        fr:['Mohamed Ould Ahmed','Nouakchott','Je suis tous les matchs de Ligue des champions en haute qualité, sans une seule coupure, et l’activation a pris quelques minutes.']},
  {i:'FS',ar:['فاطمتو منت سيدي','نواذيبو','قسم الأطفال ممتاز وزوجي يجد كل مبارياته. اشتراك واحد عوّض ثلاثة كنا ندفعها.'],
        fr:['Fatimetou Mint Sidi','Nouadhibou','La section jeunesse est parfaite et mon mari a tout son football. Un abonnement en a remplacé trois.']},
  {i:'CD',ar:['الشيخ ديالو','روصو','اشتركت سنة كاملة بـ1500 أوقية. أرخص بكثير من أي خيار آخر جربته.'],
        fr:['Cheikh Diallo','Rosso','J’ai pris l’année complète à 1 500 MRU. Bien moins cher que tout ce que j’avais essayé.']},
  {i:'AB',ar:['أمينتو منت بابا','كيفة','كل المسلسلات التي أتابعها موجودة، والحلقات الجديدة تظهر في نفس الأسبوع.'],
        fr:['Aminetou Mint Baba','Kiffa','Toutes les séries que je suis sont là, et les nouveaux épisodes arrivent dans la semaine.']},
  {i:'SV',ar:['سيدي محمد فال','أطار','ما أقنعني هو الدعم — أرسلت رسالة ليلاً فردّ عليّ أحدهم وحلّ المشكلة فوراً.'],
        fr:['Sidi Mohamed Vall','Atar','Ce qui m’a convaincu, c’est l’assistance — j’ai écrit le soir et quelqu’un a réglé ça tout de suite.']}
];

var FAQS = [
  {ar:['كيف أحصل على اشتراكي؟','اختر المدة وأدخل اسمك ورقمك — سيفتح الموقع واتساب وطلبك مكتوب بالفعل. أرسله ونرد ببيانات التفعيل خلال دقائق.'],
   fr:['Comment obtenir mon abonnement ?','Choisissez une durée, indiquez votre nom et votre numéro — le site ouvre WhatsApp avec votre commande déjà rédigée. Envoyez-la et nous répondons avec vos accès en quelques minutes.']},
  {ar:['ما الفرق بين الاشتراكات؟','لا فرق في المحتوى إطلاقاً — كل الاشتراكات تفتح المكتبة كاملة. الفرق في المدة فقط: كلما طالت المدة انخفضت التكلفة الشهرية، من 350 أوقية للشهر إلى 125 أوقية شهرياً في اشتراك السنة.'],
   fr:['Quelle est la différence entre les abonnements ?','Aucune sur le contenu — chaque abonnement ouvre la bibliothèque complète. Seule la durée change : plus elle est longue, moins le mois revient cher, de 350 MRU pour un mois à 125 MRU par mois sur l’année.']},
  {ar:['على أي الأجهزة يعمل؟','الشاشات الذكية (سامسونج، إل جي، أندرويد تي في)، هواتف وأجهزة أندرويد، الآيفون والآيباد، وحواسيب ويندوز وماك. حساب واحد يكفي البيت كله ونساعدك في الإعداد.'],
   fr:['Sur quels appareils cela fonctionne-t-il ?','Smart TV (Samsung, LG, Android TV), téléphones et boîtiers Android, iPhone et iPad, ordinateurs Windows et Mac. Un compte suffit pour toute la maison et nous vous aidons à l’installer.']},
  {ar:['هل أحتاج إنترنت سريع؟','لجودة 4K ننصح بحوالي 25 ميجابت. الجودة الكاملة HD تعمل بسلاسة من 10 ميجابت، والبث يتكيّف تلقائياً إذا ضعف الاتصال فلا تتوقف المشاهدة.'],
   fr:['Faut-il une connexion rapide ?','Pour la 4K, comptez environ 25 Mb/s. La Full HD passe très bien à partir de 10 Mb/s, et le flux s’adapte automatiquement si la connexion faiblit.']},
  {ar:['كيف أدفع؟','نرتّب الدفع مباشرة عبر واتساب بالوسائل المتداولة في موريتانيا — بنكيلي أو مصرفي أو سداد أو نقداً. لا يُخصم أي مبلغ عبر الموقع.'],
   fr:['Comment payer ?','Le paiement se règle directement sur WhatsApp avec les moyens courants en Mauritanie — Bankily, Masrvi, Sedad ou espèces. Rien n’est prélevé via le site.']},
  {ar:['ماذا يحدث عند انتهاء الاشتراك؟','نراسلك قبل تاريخ الانتهاء حتى لا ينقطع البث. التجديد برسالة واحدة وتحتفظ بنفس الإعدادات.'],
   fr:['Que se passe-t-il à l’expiration ?','Nous vous écrivons avant la date de fin pour éviter toute coupure. Le renouvellement tient en un message et vous gardez vos réglages.']},
  {ar:['ماذا لو توقف شيء عن العمل؟','راسلنا على واتساب في أي وقت. معظم المشاكل تُحل بتعديل بسيط، وإذا احتاج الخادم إلى تغيير ننقلك فوراً وبدون تكلفة.'],
   fr:['Et si quelque chose ne marche plus ?','Écrivez-nous sur WhatsApp à tout moment. La plupart des soucis se règlent par un réglage ; si un serveur doit changer, nous vous basculons aussitôt, sans frais.']}
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
try { var st = localStorage.getItem('maurimax.lang'); if (st==='ar'||st==='fr') lang = st; } catch(e){}
// One subscription per order, so there is nothing to accumulate — just the
// plan the visitor picked in the order sheet.
var chosen = null;

function t(){ return T[lang]; }
function $(s,r){ return (r||document).querySelector(s); }
function $$(s,r){ return Array.prototype.slice.call((r||document).querySelectorAll(s)); }
var REDUCED = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

/* ---------------- Render ---------------- */
function render() {
  var d = t();
  document.documentElement.lang = lang;
  document.documentElement.dir = d.dir;
  $('#langTxt').textContent = lang === 'ar' ? 'FR' : 'ع';
  $('#lang').setAttribute('aria-label', lang==='ar' ? 'Passer au français' : 'التبديل إلى العربية');

  $$('[data-i]').forEach(function (el) {
    var v = d, parts = el.getAttribute('data-i').split('.');
    for (var i=0;i<parts.length && v!=null;i++) v = v[parts[i]];
    if (typeof v === 'string') el.textContent = v;
  });

  var links = [['plans','#plans'],['football','#football'],['browse','#categories'],['why','#why'],['faq','#faq']];
  $('#nav').innerHTML = links.map(function(l){ return '<a href="'+l[1]+'">'+esc(d.nav[l[0]])+'</a>'; }).join('');
  $('#menuList').innerHTML = links.map(function(l,i){
    return '<a href="'+l[1]+'" data-close>'+esc(d.nav[l[0]])+'<span>0'+(i+1)+'</span></a>'; }).join('');

  $('#heroPills').innerHTML = d.hero.pills.map(function(p){ return '<span><i></i>'+esc(p)+'</span>'; }).join('');
  // Football in the middle, screen titles either side; a footballer and a
  // character in front. The hero states both halves of the offer at once.
  var star = photo('p-alvarez'), star2 = photo('x-homelander');
  var fan = ['m-got','po-epl','m-oppenheimer'].map(photo).filter(Boolean);
  $('#heroStage').innerHTML =
    (fan.length === 3
      ? '<div class="fan">' + fan.map(function(src,i){
          return '<span class="pc pc-'+(i+1)+'"><img src="'+src+'" alt="" decoding="async"></span>'; }).join('') + '</div>'
      : '<div style="border-radius:26px;overflow:hidden;aspect-ratio:4/3.4;box-shadow:0 40px 80px -40px rgba(78,13,131,.55)">'+scene('hero')+'</div>') +
    (star2 ? '<img class="star2" src="'+star2+'" alt="" decoding="async">' : '') +
    (star ? '<img class="star" src="'+star+'" alt="" decoding="async">' : '');
  $('#fromPrice').textContent = num(BASE);

  // Crests ride along in the marquee so the strip reads as football, not
  // as a generic band of feature words.
  var crestPool = ['l-epl','l-ucl','l-laliga','l-seriea','l-bundesliga','l-spl'].map(photo).filter(Boolean);
  var band = d.band.concat(d.band);
  $('#bandTrack').innerHTML = band.map(function(b,i){
    var c = crestPool.length ? crestPool[i % crestPool.length] : '';
    return '<span class="it">'+(c ? '<img src="'+c+'" alt="" loading="lazy" decoding="async">' : '')+
      esc(b)+'<em></em></span>'; }).join('');

  // Figures as hairline rows with counters, not a grid of identical boxes.
  $('#statRow').innerHTML = d.stats.map(function(s){
    var f = figure(s.n);
    return '<div class="figRow"><span class="n" data-count="'+f.to+'" data-pre="'+esc(f.pre)+
      '" data-post="'+esc(f.post)+'">'+esc(f.pre)+(f.to ? '0' : '')+esc(f.post)+'</span>'+
      '<span class="tx"><b>'+esc(s.l)+'</b><span>'+esc(s.h)+'</span></span></div>'; }).join('');

  var leadPlan = PLANS.filter(function(p){ return p.best; })[0];
  $('#leadPlan').innerHTML = leadPlanHtml(leadPlan, d);
  $('#planCards').innerHTML = PLANS.filter(function(p){ return !p.best; })
    .map(function(p){ return planRow(p,d); }).join('');

  pFan = undefined;   // the hero was just rebuilt; drop the parallax cache

  // Players anchoring the football, why and closing sections.
  setImg('#fbAnchor', 'p-ronaldo');
  setImg('#catAnchor', 'x-jane');
  setImg('#whyAnchor', 'p-haaland');
  setImg('#closeArt', 'p-yamal');

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
    return '<div class="lg">'+
      (crest ? '<img class="crest" src="'+crest+'" alt="" loading="lazy" decoding="async">' : '')+
      '<span class="nm keep" dir="ltr">'+esc(l[0])+'</span>'+
      '<span class="sub">'+esc(l[1])+'</span></div>'; }).join('');

  $('#catA').innerHTML = CATS.slice(0,5).map(function(c,i){ return catCard(c,i); }).join('');
  $('#catB').innerHTML = CATS.slice(5).map(function(c,i){ return catCard(c,i+5); }).join('');

  $('#whyGrid').innerHTML = d.why.items.map(function(w,i){
    return '<div class="feat"><span class="ix">'+(i<9?'0':'')+(i+1)+'</span>'+
      '<div><h3>'+esc(w.t)+'</h3><p>'+esc(w.b)+'</p></div></div>'; }).join('');

  $('#rvRail').innerHTML = REVIEWS.map(function(r){
    var x = r[lang];
    return '<figure class="rv"><div class="qm" aria-hidden="true">”</div>'+
      '<blockquote class="q">'+esc(x[2])+'</blockquote>'+
      '<figcaption class="who"><span class="av">'+r.i+'</span><span>'+
      '<span style="display:block;font-size:13.5px;font-weight:600">'+esc(x[0])+'</span>'+
      '<span style="display:block;font-size:12px;color:var(--muted)">'+esc(x[1])+'</span></span>'+
      '<span class="st" style="margin-inline-start:auto">'+rep(5,function(){return STAR;})+'</span>'+
      '</figcaption></figure>'; }).join('');

  $('#faqList').innerHTML = FAQS.map(function(f,i){
    var x = f[lang];
    return '<div class="acc'+(i===0?' on':'')+'"><button type="button" aria-expanded="'+(i===0)+'">'+
      '<span class="ix">'+(i<9?'0':'')+(i+1)+'</span>'+
      '<span class="qq">'+esc(x[0])+'</span><span class="pm"></span></button>'+
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

  $('#faqWaNum').textContent = WA_DISPLAY;
  $('#faqWa').href = wa(d.faq.waMessage);
  $('#footWa').href = wa(d.footer.waLearn);
  $('#socWa').href = wa(d.footer.waGreeting);
  $('#fab').href = wa(d.footer.waOrder);
  $('#fab').setAttribute('aria-label', d.footer.orderNow + ' — ' + WA_DISPLAY);
  $('#coNote').textContent = d.checkout.note(WA_DISPLAY);
  $('#cName').placeholder = d.checkout.ph.name;
  $('#cPhone').placeholder = d.checkout.ph.phone;
  $('#cNotes').placeholder = d.checkout.ph.notes;

  renderDrift();
  renderPicker(d);
  fitWordmarks();
  if (document.fonts && document.fonts.ready) document.fonts.ready.then(fitWordmarks);
  reveal();
  counters();
  accordions();
  railArrows();
}

/* The one plan that carries the section: a dark block with the player
   standing out of the top of it, and the full feature list. */
function leadPlanHtml(p, d) {
  var src = photo(p.photo), src2 = photo(p.photo2);
  return '<article class="lead">'+
    '<span class="bgfill" aria-hidden="true"></span>'+
    (src ? '<img class="hero-img" src="'+src+'" alt="" decoding="async">' : '')+
    (src2 ? '<img class="hero-img2" src="'+src2+'" alt="" decoding="async">' : '')+
    '<span class="tagline keep">'+esc(d.plans.best)+'</span>'+
    '<h3 class="dur">'+esc(d.plans.months(p.months))+'</h3>'+
    '<div class="amt"><b dir="ltr">'+num(p.price)+'</b><s>MRU</s></div>'+
    '<div class="meta"><span>'+esc(d.plans.perMonth(p.per))+'</span>'+
      '<span class="save">'+esc(d.plans.save(p.savePct))+'</span></div>'+
    '<ul>'+d.plans.features.map(function(f){ return '<li>'+TICK+'<span>'+esc(f)+'</span></li>'; }).join('')+'</ul>'+
    '<div class="go"><button class="btn btn-o btn-lg btn-full" data-pick="'+p.id+'">'+
      '<span>'+esc(d.plans.add)+'</span></button></div>'+
    '</article>';
}

/* The shorter terms: one hairline row each, with a cropped player at the
   head of the row so the imagery still runs through the section. */
function planRow(p, d) {
  var src = photo(p.photo);
  return '<div class="prow">'+
    '<span class="crop">'+(src ? '<img src="'+src+'" alt="" loading="lazy" decoding="async">' : '')+'</span>'+
    '<span class="info"><b>'+esc(d.plans.months(p.months))+'</b>'+
      '<span>'+esc(d.plans.perMonth(p.per))+
      (p.badge==='popular' ? ' · <em class="pop" style="font-style:normal">'+esc(d.plans.popular)+'</em>' : '')+
      (p.savePct>0 ? ' · '+esc(d.plans.save(p.savePct)) : '')+'</span></span>'+
    '<span class="price" dir="ltr"><b>'+num(p.price)+'</b><span>MRU</span></span>'+
    '<button class="plus" data-pick="'+p.id+'" aria-label="'+esc(d.plans.add)+'">'+
      '<svg viewBox="0 0 16 16" width="15" height="15" fill="none" aria-hidden>'+
      '<path d="M8 3.5v9M3.5 8h9" stroke="currentColor" stroke-width="1.7" stroke-linecap="round"/></svg>'+
    '</button></div>';
}

/* Shrinks each typographic poster's wordmark until it fits its tile.
   Measured rather than calculated: the display face may not have loaded, and
   the fallback's metrics are much wider, so any size derived from character
   counts overflows for one of the two. */
function fitWordmarks() {
  $$('.typo .wm').forEach(function (el) {
    var box = el.parentNode;
    var maxW = box.clientWidth * .88, maxH = box.clientHeight * .60;
    if (!maxW) return;
    var size = Math.round(box.clientWidth * .42);
    el.style.fontSize = size + 'px';
    while (size > 11 && (el.scrollWidth > maxW || el.scrollHeight > maxH)) {
      size -= 2;
      el.style.fontSize = size + 'px';
    }
  });
}

/* Splits a figure like "20,000+" or "4K UHD" into a countable number plus
   whatever sits around it. Non-numeric figures come back with to = 0 and are
   printed as-is. */
function figure(text) {
  var m = String(text).match(/^([^\d]*)([\d,.]+)(.*)$/);
  if (!m) return { pre:'', to:0, post:String(text) };
  var n = parseInt(m[2].replace(/[,.]/g,''), 10);
  return isNaN(n) ? { pre:'', to:0, post:String(text) } : { pre:m[1], to:n, post:m[3] };
}

function setImg(sel, key) {
  var el = $(sel), src = photo(key);
  if (!el) return;
  if (src) { el.src = src; el.style.display = ''; } else { el.style.display = 'none'; }
}

/* Categories with real photography use it. The rest become typographic
   posters — the category name set large and cropped by the frame — rather
   than a drawn icon on a coloured rectangle, which is the one thing on the
   page that still read as filler. */
function catCard(c, i) {
  var x = c[lang], shot = photo(c.photo);
  var art = shot
    ? '<div class="artimg'+(c.logo ? ' logo' : '')+'">'+
      '<img src="'+shot+'" alt="" loading="lazy" decoding="async"><span class="vig"></span></div>'
    : '<div class="typo'+(i % 3 === 1 ? ' alt' : '')+'">'+
        '<span class="wm keep" aria-hidden="true">'+esc(c.fr[0])+'</span>'+
        '<span class="vig"></span></div>';
  // Tapping a genre opens the order sheet — every plan unlocks every genre,
  // so the sheet just names which one brought you there.
  return '<button type="button" class="cat rev" data-cat="'+esc(x[0])+'">'+
    '<div class="fr">'+art+
    '<div class="meta"><h3>'+esc(x[0])+'</h3><p class="c">'+esc(x[1])+'</p></div></div></button>';
}

/* Two rows of key art crossing behind the closing call to action. Each row is
   duplicated so the -50% translate loops seamlessly. */
function renderDrift(){
  var box = $('#drift'); if (!box) return;
  var art = DRIFT.map(photo).filter(Boolean);
  if (art.length < 6){ box.innerHTML = ''; return; }
  var half = Math.ceil(art.length / 2);
  function row(list, cls){
    var twice = list.concat(list);
    return '<div class="pdRow'+cls+'">' + twice.map(function(src){
      return '<img src="'+src+'" alt="" loading="lazy" decoding="async">'; }).join('') + '</div>';
  }
  box.innerHTML = row(art.slice(0, half), '') + row(art.slice(half), ' b');
}

/* ---------------- Order sheet ----------------
   Step one lists the plans, step two takes the details. */
function renderPicker(d){
  $('#pickList').innerHTML = PLANS.map(function(p){
    var bits = [d.plans.perMonth(p.per)];
    if (p.badge === 'popular') bits.push('<em>' + esc(d.plans.popular) + '</em>');
    if (p.savePct > 0) bits.push(esc(d.plans.save(p.savePct)));
    return '<button type="button" class="pk'+(p.best?' best':'')+'" data-pick="'+p.id+'">'+
      '<span><span class="nm">'+esc(d.plans.months(p.months))+
        (p.best ? ' · ' + esc(d.plans.best) : '')+'</span>'+
        '<span class="sub">'+bits.join(' · ')+'</span></span>'+
      '<span class="amt" dir="ltr">'+num(p.price)+'<s>MRU</s></span>'+
      '<span class="go" aria-hidden="true">'+
        '<svg viewBox="0 0 16 16" width="14" height="14" fill="none">'+
        '<path d="M6 3.5 10.5 8 6 12.5" stroke="currentColor" stroke-width="1.8" '+
        'stroke-linecap="round" stroke-linejoin="round"/></svg></span>'+
      '</button>';
  }).join('');
}

function renderChosen(){
  var d = t(), p = find(chosen);
  if (!p) return;
  $('#chosenBox').innerHTML =
    '<span class="cbody"><b>'+esc(d.plans.months(p.months))+'</b>'+
    '<span>'+esc(d.plans.perMonth(p.per))+
      (p.savePct>0 ? ' · '+esc(d.plans.save(p.savePct)) : '')+'</span></span>'+
    '<span class="cnum" dir="ltr">'+num(p.price)+'<s>MRU</s></span>';
}

function orderMessage(){
  var d=t(), m=d.checkout.msg, p=find(chosen);
  var name=$('#cName').value.trim(), phone=$('#cPhone').value.trim(), notes=$('#cNotes').value.trim();
  var out=[m.greeting,'',m.intro,'',m.name+': '+(name||'—'),m.phone+': '+(phone||'—'),'',
           m.plan+': '+d.plans.months(p.months),
           m.total+': '+money(p.price)];
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
  },{threshold:.01, rootMargin:'0px 0px -40px 0px'});
  els.forEach(function(e){ io.observe(e); });

  // A flick-scroll can carry a section past the viewport without the observer
  // ever getting a frame on it, which would leave it stuck at opacity 0. Sweep
  // on scroll-end and reveal anything that is in view or already behind us.
  var timer;
  function sweep(){
    var rest = els.filter(function(e){ return !e.classList.contains('in'); });
    rest.forEach(function(e){
      if (e.getBoundingClientRect().top < window.innerHeight - 40){
        e.classList.add('in'); io.unobserve(e);
      }
    });
    if (!rest.length) window.removeEventListener('scroll', onScroll);
  }
  function onScroll(){ clearTimeout(timer); timer = setTimeout(sweep, 180); }
  window.addEventListener('scroll', onScroll, {passive:true});
}
/* Figures count up the first time they come into view. */
function counters(){
  var els = $$('.figRow .n[data-count]');
  if (REDUCED || !('IntersectionObserver' in window)){
    els.forEach(function(el){ paint(el, +el.dataset.count); });
    return;
  }
  var io = new IntersectionObserver(function(ents){
    ents.forEach(function(e){
      if (!e.isIntersecting) return;
      var el = e.target, to = +el.dataset.count;
      io.unobserve(el);
      if (!to){ return; }
      var t0 = performance.now(), DUR = 1100;
      (function step(now){
        var k = Math.min(1, (now - t0) / DUR);
        // ease-out so it settles rather than stopping dead
        paint(el, Math.round(to * (1 - Math.pow(1 - k, 3))));
        if (k < 1) requestAnimationFrame(step);
      })(t0);
    });
  }, {threshold:.4});
  els.forEach(function(el){ if (+el.dataset.count) io.observe(el); });
}
function paint(el, v){ el.textContent = el.dataset.pre + num(v) + el.dataset.post; }

/* Slow parallax on the hero: the posters and the player drift at different
   rates so the composition has depth as it leaves. */
var pFan, pStar, pTick = false;
function parallax(y){
  if (REDUCED || pTick) return;
  pTick = true;
  requestAnimationFrame(function(){
    pTick = false;
    if (pFan === undefined){ pFan = $('#heroStage .fan'); pStar = $('#heroStage .star'); }
    if (!pFan || !pStar) return;
    if (y > window.innerHeight * 1.2) return;
    pFan.style.transform = 'translate3d(0,' + (y * 0.11) + 'px,0)';
    pStar.style.transform = 'translate3d(0,' + (y * -0.05) + 'px,0)';
  });
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
function step(which){
  $('#stepPick').classList.toggle('on', which === 'pick');
  $('#stepForm').classList.toggle('on', which === 'form');
}
function openSheet(planId, catName){
  var forCat = $('#forCat');
  if (catName){
    forCat.textContent = t().pick.forCat(catName);
    forCat.style.display = '';
  } else {
    forCat.style.display = 'none';
  }
  if (planId && find(planId)){ chosen = planId; renderChosen(); step('form'); }
  else { step('pick'); }
  $('#modal').classList.add('on');
  document.body.style.overflow = 'hidden';
  setTimeout(function(){ (planId ? $('#cName') : $('.pk')).focus(); }, 90);
}
function closeSheet(){
  $('#modal').classList.remove('on');
  document.body.style.overflow = '';
}

document.addEventListener('click', function(e){
  var el;
  if ((el = e.target.closest('[data-pick]'))){
    chosen = el.getAttribute('data-pick');
    renderChosen(); step('form');
    if (!$('#modal').classList.contains('on')) openSheet(chosen);
    else setTimeout(function(){ $('#cName').focus(); }, 60);
    return;
  }
  if ((el = e.target.closest('[data-cat]'))){ openSheet(null, el.getAttribute('data-cat')); return; }
  if (e.target.closest('[data-open-plans]')){ openSheet(null); return; }
  if (e.target.closest('[data-close-modal]')){ closeSheet(); return; }
  if (e.target.closest('[data-close]')){ $('#menu').classList.remove('on'); document.body.style.overflow='';
    document.querySelector('header').classList.remove('menu-open');
    $('#burger').setAttribute('aria-expanded','false'); }
});
$('#moBack').addEventListener('click', function(){ step('pick'); });

if (!REDUCED) document.addEventListener('pointerdown', function(e){
  var btn=e.target.closest('.btn'); if(!btn) return;
  var r=btn.getBoundingClientRect(), sp=document.createElement('span');
  sp.className='rip'; sp.style.left=(e.clientX-r.left)+'px'; sp.style.top=(e.clientY-r.top)+'px';
  btn.appendChild(sp); setTimeout(function(){ sp.remove(); },600);
});
$('#burger').addEventListener('click', function(){
  var m=$('#menu'), on=m.classList.toggle('on');
  document.body.style.overflow = on?'hidden':'';
  document.querySelector('header').classList.toggle('menu-open', on);
  this.setAttribute('aria-expanded', on?'true':'false');
});
document.addEventListener('keydown', function(e){
  if (e.key!=='Escape') return;
  closeSheet();
  $('#menu').classList.remove('on'); document.querySelector('header').classList.remove('menu-open');
  document.body.style.overflow=''; $('#burger').setAttribute('aria-expanded','false');
});
$('#lang').addEventListener('click', function(){
  lang = lang==='ar' ? 'fr' : 'ar';
  try{ localStorage.setItem('maurimax.lang', lang); }catch(e){}
  render();
  if (chosen) renderChosen();
});
$('#coForm').addEventListener('submit', function(e){
  e.preventDefault();
  if (!find(chosen)) { step('pick'); return; }
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

var fitTimer;
window.addEventListener('resize', function(){
  clearTimeout(fitTimer); fitTimer = setTimeout(fitWordmarks, 150);
});

var headerEl = document.querySelector('header');
window.addEventListener('scroll', function(){
  var y = window.pageYOffset;
  // White bar only once the header has left the dark hero; over the hero it
  // stays transparent with white type.
  var hero = $('#hero');
  headerEl.classList.toggle('stuck', y > (hero ? hero.offsetHeight - 70 : 16));
  $('#fab').classList.toggle('on', y>560);
  var max = document.documentElement.scrollHeight - window.innerHeight;
  $('#prog').style.transform = 'scaleX(' + (max>0 ? y/max : 0) + ')';
  parallax(y);
}, {passive:true});

render();
preloader();
})();
