export const locales = [
  { code: 'en', label: 'English', short: 'EN', flag: 'gb', available: true },
  { code: 'tr', label: 'Türkçe', short: 'TR', flag: 'tr', available: true },
  { code: 'et', label: 'Eesti', short: 'ET', flag: 'ee', available: false },
  { code: 'es', label: 'Español', short: 'ES', flag: 'es', available: false },
  { code: 'fi', label: 'Suomi', short: 'FI', flag: 'fi', available: false },
]

export const translations = {
  tr: {
    nav: {
      work: 'İşlerimiz',
      services: 'Hizmetler',
      about: 'Hakkımızda',
      contact: 'İletişim',
      cta: 'Bize ulaşın',
    },
    seo: {
      home: {
        title: 'AI İçerik Ajansı',
        description:
          'ekiworks — markalar, oyunlar ve uygulamalar için yapay zeka destekli filmler, reklamlar ve yaratıcı video içerikleri.',
      },
      work: {
        title: 'İşlerimiz',
        description:
          'ekiworks portföyü — kısa format ve sinematik AI video işlerimizi keşfedin.',
      },
      services: {
        title: 'Hizmetler',
        description:
          'Oyun ve uygulama reklamları, AI reklamlar, UGC, sosyal medya içerikleri, görseller ve hesap yönetimi.',
      },
      about: {
        title: 'Hakkımızda',
        description:
          'ekiworks hakkında — 2021’ten beri pazarlama ve yaratıcı üretim deneyimi; AI video ve sosyal medya.',
      },
      contact: {
        title: 'İletişim',
        description: 'ekiworks ile iletişime geçin — projenizi anlatın, birlikte başlayalım.',
      },
      blog: {
        title: 'Blog',
        description: 'Yaratıcı süreç, AI içerik ve marka hikâyeleri üzerine yazılar.',
      },
    },
    hero: {
      label: 'Yapay Zeka İçerik Ajansı',
      titleBefore: 'Fikirleri',
      titleAccent: 'izlenmeye değer hikâyelere',
      titleAfter: 'dönüştürüyoruz.',
      description: 'Markanız için yapay zeka destekli filmler ve yaratıcı video içerikleri.',
      explore: 'İşlerimizi keşfedin',
      showreel: 'Showreel izle',
      strip: ['Oyun & Uygulama', 'AI Reklamlar', 'Sosyal Medya'],
    },
    portfolio: {
      label: 'İşlerimiz',
      title: 'Öne Çıkanlar',
      subtitle: 'Yapay zeka ile üretilmiş, öne çıkan hikâyeler.',
      viewAll: 'Tüm işler',
      shortTitle: 'Kısa format hikâyeler',
      filmTitle: 'Sinematik filmler',
    },
    workPage: {
      label: 'Portföy',
      title: 'İşlerimiz',
      subtitle: 'Tüm video ve görsel işlerimiz — kısa format, sinematik filmler ve görseller.',
      all: 'Tümü',
      images: 'Görseller',
      empty: 'Henüz içerik yok.',
      showMore: 'Daha fazla',
    },
    services: {
      label: 'Hizmetler',
      title: 'Ne Yapıyoruz',
      viewAll: 'Tüm hizmetler',
      items: [
        {
          title: 'Oyun & Uygulama Reklamları',
          description:
            'Trailer’lar, gameplay kreatifleri ve özellik odaklı videolar. Güçlü hook’lar ve net hikâye anlatımı.',
        },
        {
          title: 'AI Reklam & Ürün Videoları',
          description:
            'Konseptten son kurguya sinematik marka filmleri ve ürün videoları — hikâyenizi öne çıkaran görseller.',
        },
        {
          title: 'Sosyal Medya Yönetimi',
          description:
            'Hesap kurulumu, içerik planı, yayın ve sürekli yönetim — kitlenizle bağ kuran tutarlı bir varlık.',
        },
      ],
    },
    servicesPage: {
      label: 'Ne Yapıyoruz',
      titleBefore: 'Yaratıcı hizmetler.',
      titleAccent: 'Markanıza özel.',
      subtitle: 'Birlikte çalışan videolar, görseller ve sosyal medya desteği.',
      discuss: 'Projeni konuşalım',
      footerTitle: 'İzlenmeye değer bir şey yaratalım.',
      cta: 'Projenizi anlatın',
      items: [
        {
          id: 'game-app-ads',
          title: 'Oyun & Uygulama Reklamları',
          description:
            'Oyunlar ve uygulamalar için trailer’lar, gameplay kreatifleri ve özellik odaklı videolar. İnsanlara denemek için bir neden veren güçlü hook’lar ve net hikâye anlatımı.',
          details: [
            'İnsanlara kaydırmayı bırakıp ne yarattığınızı keşfetmek için bir neden verin. Oyununuzun veya uygulamanızın cazibesini öne çıkaran trailer’lar, gameplay editleri, özellik vitrinleri ve reklam kreatifleri üretiyoruz. Her konsept net bir soruyla başlar: bu kitleyi denemeye ne ikna eder?',
            'Açılış hook’undan son harekete geçirme çağrısına kadar görselleri, temposu ve mesajı bu cevaba göre şekillendiriyoruz. Gameplay görüntüleri, uygulama ekranları ve AI ile üretilmiş sahneler farklı yaklaşımlarda bir araya gelebilir; böylece kitleler ve yerleşimler arasında test edebileceğiniz varyasyonlar oluşur. Her videoyu kampanyanızın ihtiyaç duyduğu formatlara uyarırken ürününüzün deneyimini ve kişiliğini merkeze alırız.',
          ],
        },
        {
          id: 'ai-commercials',
          title: 'AI Reklamlar & Ürün Videoları',
          description:
            'Konseptten son kurguya sinematik marka filmleri ve ürün videoları. Hikâyenizi hayata geçiren, ürünlerinizi öne çıkaran özenli görseller.',
          details: [
            'Markanızın hikâyesini insanların izlemek isteyeceği bir filme dönüştürün. Düşünülmüş konseptler, sinematik görseller ve amaçlı kurguyu birleştiren AI destekli reklamlar ve ürün videoları üretiyoruz. Ürün tanıtıyor, kampanya başlatıyor veya sizi farklı kılanı anlatıyor olun; kreatifı net bir mesaj etrafında kurarız.',
            'İşimiz konsept geliştirme, senaryo, görsel yön, sahne üretimi ve son kurguyu kapsar. Ürününüzün nasıl göründüğüne, faydalarının nasıl anlatıldığına ve her sahnenin hikâyeye nasıl katkı verdiğine dikkat ederiz. Sonuç, markanızla bağlı hisseden ve reklam, sosyal medya veya web siteniz için uyarlanabilen özenli bir içeriktir.',
          ],
        },
        {
          id: 'ai-ugc',
          title: 'AI UGC Videolar',
          description:
            'Doğal anlatım ve samimi senaryolarla AI üretimi, creator tarzı videolar. Kitlenize özel ürün tanıtımları, demolar ve reklam varyasyonları.',
          details: [
            'AI üretimi, creator tarzı videolarla mesajınızı daha samimi kılın. İlişkilendirilebilir durumlar, doğal anlatım ve net ürün iletişimi etrafında içerik geliştiriyoruz — kısa tanıtımlardan demolar, açıklayıcılar ve problem–çözüm reklamlarına kadar.',
            'Senaryoyu, sunucu stilini, ortamı ve temposu kitlenize ve videonun görüneceği platforma göre şekillendiriyoruz. Sohbet tarzı bir cilt bakımı tanıtımı, mobil oyun önerisi veya uygulama walkthrough’undan farklı bir yaklaşım ister. Aynı teklifi farklı yollarla anlatmanıza yardımcı olmak için alternatif hook’lar, senaryolar ve CTA’lar da üretiriz. Süreç boyunca inandırıcı sunum, anlaşılır dil ve takip edilmesi kolay bir mesaja odaklanırız.',
          ],
        },
        {
          id: 'social-content',
          title: 'Sosyal Medya İçerikleri',
          description:
            'Markanızın günlük varlığı için Reels, Shorts ve TikTok videoları. Taze konseptler, etkileyici hook’lar ve kanallarınızda tutarlı bir ses.',
          details: [
            'Kitlenize izleyecek taze bir şey ve geri dönmek için bir neden verin. Markanızın kişiliğini yansıtan, her platforma doğal oturan Reels, Shorts, TikTok videoları ve destekleyici sosyal içerikler üretiyoruz.',
            'Yaklaşımımız fikirlerle başlar: tekrarlayan seriler, ürün spotları, eğitici klipler, eğlenceli hikâyeler ve zamanında duyurular. Ardından bu fikirleri hayata geçirmek için hook’lar, senaryolar, görseller, caption’lar ve kurgular geliştiririz. AI, hayal gücü yüksek sahneler ve farklı yaratıcı yönler keşfetmemize alan açarken tutarlı bir görsel dil içeriğinizi tanınır kılar. Tekil gönderiler veya sürekli kreatif akış ihtiyacınız olsun, çeşitlilik, amaç ve net bir marka sesiyle bir feed kurmanıza yardımcı oluruz.',
          ],
        },
        {
          id: 'ai-visuals',
          title: 'AI Görseller & Ürün İmajları',
          description:
            'Özel ürün görselleri, kampanya artwork’leri ve markalı görseller. Sosyal akışlar, e-ticaret, web siteleri ve reklamlar için ayırt edici imajlar.',
          details: [
            'Ürünlerinizi ve fikirlerinizi öne çıkaran ortamlarda gösterin. Kampanyalar, online mağazalar, web siteleri ve sosyal medya için özel AI destekli görseller üretiyoruz — özenle stillendirilmiş ürün kompozisyonlarından hayal gücü yüksek editoryal sahnelere ve markalı artwork’lere kadar.',
            'Her görsel, ürününüz, kitleniz ve kullanım amacına göre şekillenen bir görsel yönle başlar. Tutarlı bir görünüm için kompozisyon, ışık, renk, malzeme ve arka plan stilini düşünürüz. Referanslarınız ve ürün varlıklarınızdan yola çıkarak imajın markanıza bağlı hissettirmesini sağlayan detaylara dikkat ederiz. Kanallarınızda kullanabileceğiniz koordineli bir set için farklı sahneler, kompozisyonlar ve en-boy oranları da geliştirebiliriz.',
          ],
        },
        {
          id: 'social-mgmt',
          title: 'Sosyal Medya Yönetimi',
          description:
            'Hesap kurulumu, içerik planlama, yayın ve sürekli yönetim. Kitlenizle bağ kurmanıza yardımcı olan net bir strateji ve tutarlı varlık.',
          details: [
            'Aktif, düzenli ve tutarlı hissettiren bir sosyal varlık kurun. Markaların ve işletmelerin hesaplarını oluşturmasına, pratik bir içerik yönü geliştirmesine ve kanallarını hareket ettiren süregelen işi yönetmesine yardımcı oluyoruz.',
            'Desteğimiz profil kurulumu ve optimizasyonu, içerik planlama, zamanlama, yayın ve kitle etkileşimini kapsar. Fikirleri net bir takvime yerleştirir, kreatif üretimi koordine eder ve gönderiler ile sohbetlerde tutarlı bir ton koruruz. İçerik yayına girdikçe neyin dikkat çektiğini ve kitlenin nasıl yanıt verdiğini inceler, bu gözlemleri sonraki planlamaya taşırız. Sıfırdan başlıyor veya mevcut varlığınızı iyileştiriyor olun, sosyal medya faaliyetinize yapı ve süreklilik katarız.',
          ],
        },
      ],
    },
    feedback: {
      label: 'Müşteri Yorumları',
      titleBefore: 'Güçlü hikâyeler.',
      titleAccent: 'Daha güçlü ortaklıklar.',
      subtitle: 'Yaratıcı süreç hakkında birkaç söz.',
      caption: 'Gerçek müşteri sesleri · İsimler önizleme için kullanılmıştır',
    },
    cta: {
      label: 'Konuşalım',
      title: 'Bir fikrin mi var? Birlikte izlenmeye değer hale getirelim.',
      button: 'Bize anlatın',
    },
    footer: {
      tagline: 'Yaratıcı fikirler. Etkileyici videolar.',
    },
    about: {
      label: 'Hakkımızda',
      title: 'Hikâye anlatan,',
      titleAccent: 'iş bilen bir ekip.',
      paragraphs: [
        'Ekiworks, 2021’e uzanan pazarlama, sosyal medya, e-ticaret ve yazılım deneyimini bir araya getiriyor. Yolculuğumuz Türkiye’de başladı; bugün Estonya ve Amerika Birleşik Devletleri’ndeki ofislerimizle, yaratıcı düşünceyi iş dünyasına dair pratik bir anlayışla birleştirerek devam ediyor.',
        'Yapay zeka araçları yeni yaratıcı olanaklar açtıkça, yapay zeka destekli video ve görsel içeriği işimizin merkezine aldık. Bugün her markanın kişiliğine, kitlesine ve hedeflerine özel reklam filmleri, ürün görselleri, sinematik hikâyeler ve sosyal içerikler üretiyoruz. Ayrıca işletmelerin sosyal medya varlıklarını kurmasına, büyütmesine ve yönetmesine yardımcı oluyoruz.',
        'Dijital sektörlerdeki yılların deneyimi, dikkati nasıl kazanacağımızı ve bunu nasıl değerlendireceğimizi öğretti. Açılış kancasını, hikâyeyi, temposunu ve birini izlemeye veya paylaşmaya neyin teşvik ettiğini dikkatle düşünüyoruz. Bu bakış açısını her projeye taşıyor; yeni fikirleri denemeye ve keşfetmeye açık kalıyoruz.',
        'Küçük, uygulamaya dönük bir ekibiz; net iletişimi ve özenli iş birliğini önemsiyoruz. İşinizi anlamaya zaman ayırıyor, masaya fikirler getiriyor ve ilk sohbetten son kurguya kadar sürecin içinde kalıyoruz. Yeni bir şey lansmanı yapıyor veya markanıza taze bir enerji katmak istiyorsanız, insanların hatırlayacağı bir şey yaratmanıza yardımcı olmaktan mutluluk duyarız.',
      ],
      stats: [
        { value: '2021', label: 'Başlangıç' },
        { value: '3', label: 'Ülke' },
        { value: 'AI', label: 'Odak' },
      ],
      cta: 'Birlikte çalışalım',
    },
    contact: {
      label: 'İletişim',
      title: 'İyi fikirler bir',
      titleAccent: 'sohbetle başlar.',
      subtitle:
        'Aklındakini bize anlat. Bir sonraki adımı birlikte şekillendirelim.',
      whatsappLabel: 'WhatsApp',
      whatsappCta: 'WhatsApp’tan yaz',
      emailLabel: 'E-posta',
      email: 'hello@ekiworks.com',
      formTitle: 'Projenizi anlatın',
      formSubtitle: 'Başlamak için birkaç detay yeterli.',
      name: 'Ad Soyad',
      namePlaceholder: 'Adın',
      company: 'Şirket',
      companyOptional: 'Şirket (isteğe bağlı)',
      companyPlaceholder: 'Şirket veya marka',
      emailField: 'E-posta',
      emailPlaceholder: 'you@company.com',
      projectType: 'Hangi konuda yardımcı olabiliriz?',
      projectTypes: ['AI Video', 'Görsel İçerik', 'Sosyal Medya'],
      message: 'Fikriniz',
      messagePlaceholder: 'Ne yaratmak istersiniz?',
      send: 'Talep gönder',
      privacy: 'Bilgilerinizi yalnızca talebinize yanıt vermek için kullanacağız.',
      hqLabel: 'Merkezler',
      hqSubtitle: 'Üç ülkede, tek ekip.',
      offices: [
        { city: 'Wyoming', country: 'United States' },
        { city: 'Tallinn', country: 'Estonia' },
        { city: 'Ankara', country: 'Türkiye' },
      ],
    },
    blog: {
      label: 'Blog',
      title: 'Yazılar & fikirler',
      subtitle: 'Yaratıcı süreç, AI içerik ve marka hikâyeleri üzerine notlar.',
      empty: 'Henüz yayınlanmış yazı yok.',
      notFound: 'Yazı bulunamadı.',
      back: 'Tüm yazılara dön',
      footerLink: 'Blog',
    },
    lang: {
      label: 'Dil',
      soon: 'Yakında',
    },
  },
  en: {
    nav: {
      work: 'Our Work',
      services: 'Services',
      about: 'About',
      contact: 'Contact',
      cta: 'Get in touch',
    },
    seo: {
      home: {
        title: 'AI Content Agency',
        description:
          'ekiworks — AI-powered films, commercials, and creative video content for brands, games, and apps.',
      },
      work: {
        title: 'Our Work',
        description:
          'Explore the ekiworks portfolio — short-form and cinematic AI video projects.',
      },
      services: {
        title: 'Services',
        description:
          'Game and app ads, AI commercials, UGC, social content, product imagery, and social media management.',
      },
      about: {
        title: 'About',
        description:
          'About ekiworks — marketing and creative experience since 2021; AI video and social media.',
      },
      contact: {
        title: 'Contact',
        description: 'Get in touch with ekiworks — tell us about your project and let’s start.',
      },
      blog: {
        title: 'Blog',
        description: 'Notes on creative process, AI content, and brand storytelling.',
      },
    },
    hero: {
      label: 'AI Content Agency',
      titleBefore: 'Turning ideas into',
      titleAccent: 'stories worth watching.',
      titleAfter: '',
      description: 'AI-powered films and creative video content for your brand.',
      explore: 'Explore our work',
      showreel: 'Watch showreel',
      strip: ['Game & App Ads', 'AI Commercials', 'Social Media'],
    },
    portfolio: {
      label: 'Our Work',
      title: 'Featured Work',
      subtitle: 'AI-powered stories. Made to stand out.',
      viewAll: 'View all work',
      shortTitle: 'Short-form stories',
      filmTitle: 'Cinematic films',
    },
    workPage: {
      label: 'Portfolio',
      title: 'Our Work',
      subtitle: 'Every video and image we’ve made — short-form, cinematic, and stills.',
      all: 'All',
      images: 'Images',
      empty: 'Nothing here yet.',
      showMore: 'Show more',
    },
    services: {
      label: 'Services',
      title: 'What We Do',
      viewAll: 'All services',
      items: [
        {
          title: 'Game & App Ads',
          description:
            'Trailers, gameplay creatives, and feature-led videos for games and apps. Strong hooks and clear storytelling.',
        },
        {
          title: 'AI Commercials & Product Videos',
          description:
            'Cinematic brand films and product videos, from concept to final edit. Thoughtful visuals that bring your story to life.',
        },
        {
          title: 'Social Media Management',
          description:
            'Account setup, content planning, publishing, and ongoing management — a consistent presence for your audience.',
        },
      ],
    },
    servicesPage: {
      label: 'What We Do',
      titleBefore: 'Creative services. Built around',
      titleAccent: 'your brand.',
      subtitle: 'Videos, visuals, and social media support that work together.',
      discuss: 'Discuss your project',
      footerTitle: 'Let’s create something worth watching.',
      cta: 'Tell us about your project',
      items: [
        {
          id: 'game-app-ads',
          title: 'Game & App Ads',
          description:
            'Trailers, gameplay creatives, and feature-led videos for games and apps. Strong hooks and clear storytelling that give people a reason to try.',
          details: [
            'Give people a reason to stop scrolling and discover what you’ve built. We create trailers, gameplay edits, feature showcases, and advertising creatives that bring out the appeal of your game or app. Each concept starts with a clear question: what will make this audience want to try it?',
            'From the opening hook to the final call to action, we shape the visuals, pacing, and messaging around that answer. Gameplay footage, app screens, and AI-generated scenes can come together in different creative approaches, giving you variations to test across audiences and placements. We adapt each video to the formats your campaign needs while keeping the experience and personality of your product at the centre.',
          ],
        },
        {
          id: 'ai-commercials',
          title: 'AI Commercials & Product Videos',
          description:
            'Cinematic brand films and product videos, from concept to final edit. Thoughtful visuals that bring your story to life and put your products in focus.',
          details: [
            'Turn your brand’s story into a film people want to watch. We create AI-powered commercials and product videos that combine thoughtful concepts, cinematic visuals, and purposeful editing. Whether you’re introducing a product, launching a campaign, or communicating what makes your business different, we build the creative around a clear message.',
            'Our work covers concept development, scripting, visual direction, scene creation, and the final edit. We pay attention to how your product looks, how its benefits are communicated, and how each scene contributes to the story. The result is a considered piece of content that feels connected to your brand and can be adapted for advertising, social media, or your website.',
          ],
        },
        {
          id: 'ai-ugc',
          title: 'AI UGC Videos',
          description:
            'AI-generated, creator-style videos with natural delivery and relatable scenarios. Product introductions, demonstrations, and ad variations tailored to your audience.',
          details: [
            'Make your message feel approachable with AI-generated, creator-style videos. We develop content built around relatable situations, natural delivery, and clear product communication, from quick introductions and demonstrations to explainers and problem–solution ads.',
            'We shape the script, presenter style, setting, and pacing to suit your audience and the platform where the video will appear. A conversational skincare introduction calls for a different approach than a mobile game recommendation or an app walkthrough. We also create alternative hooks, scripts, and calls to action, helping you explore different ways to communicate the same offer. Throughout the process, we focus on believable presentation, accessible language, and a message that feels easy to follow.',
          ],
        },
        {
          id: 'social-content',
          title: 'Social Media Content',
          description:
            'Reels, Shorts, and TikTok videos made for your brand’s everyday presence. Fresh concepts, engaging hooks, and a consistent voice across your channels.',
          details: [
            'Give your audience something fresh to watch and a reason to come back. We create Reels, Shorts, TikTok videos, and supporting social content that reflect your brand’s personality while fitting naturally into each platform.',
            'Our approach starts with ideas: recurring series, product spotlights, educational clips, entertaining stories, and timely announcements. We then develop the hooks, scripts, visuals, captions, and edits needed to bring those ideas to life. AI gives us room to explore imaginative scenes and different creative directions, while a consistent visual style keeps your content recognisable. Whether you need individual posts or an ongoing stream of creative work, we help build a feed with variety, purpose, and a clear brand voice.',
          ],
        },
        {
          id: 'ai-visuals',
          title: 'AI Visuals & Product Imagery',
          description:
            'Custom product images, campaign artwork, and branded visuals. Distinctive imagery for social feeds, online stores, websites, and advertising campaigns.',
          details: [
            'Show your products and ideas in settings that make them stand out. We create custom AI-powered imagery for campaigns, online stores, websites, and social media, from carefully styled product compositions to imaginative editorial scenes and branded artwork.',
            'Each image begins with a visual direction shaped around your product, audience, and intended use. We consider composition, lighting, colour, materials, and background styling to create a coherent look. Working from your references and product assets, we pay close attention to the details that make the imagery feel connected to your brand. We can also develop different scenes, compositions, and aspect ratios, giving you a coordinated set of visuals to use across your channels.',
          ],
        },
        {
          id: 'social-mgmt',
          title: 'Social Media Management',
          description:
            'Account setup, content planning, publishing, and ongoing management. A clear strategy and consistent presence that help you connect with your audience.',
          details: [
            'Build a social presence that feels active, organised, and consistent. We help brands and businesses establish their accounts, develop a practical content direction, and manage the ongoing work that keeps their channels moving.',
            'Our support includes profile setup and optimisation, content planning, scheduling, publishing, and audience interaction. We organise ideas into a clear calendar, coordinate creative production, and maintain a consistent tone across posts and conversations. As content goes live, we review what attracts attention and how audiences respond, using those observations to inform future planning. Whether you’re starting from scratch or improving an existing presence, we bring structure and continuity to your social media activity.',
          ],
        },
      ],
    },
    feedback: {
      label: 'Client Feedback',
      titleBefore: 'Great stories. Even better',
      titleAccent: 'partnerships.',
      subtitle: 'A few words about the creative process.',
      caption: 'Real client voices · Names used with permission for preview',
    },
    cta: {
      label: "Let's Talk",
      title: "Have an idea? Let's make it worth watching.",
      button: 'Tell us about it',
    },
    footer: {
      tagline: 'Creative ideas. Compelling videos.',
    },
    about: {
      label: 'About',
      title: 'Storytellers with',
      titleAccent: 'business sense.',
      paragraphs: [
        'Ekiworks brings together experience in marketing, social media, e-commerce, and software dating back to 2021. Our journey began in Türkiye and now continues with offices in Estonia and the United States, combining creative thinking with a practical understanding of business.',
        'As AI tools opened up new creative possibilities, we made AI-powered video and visual content a central part of our work. Today, we create commercials, product visuals, cinematic stories, and social content tailored to each brand’s personality, audience, and goals. We also help businesses establish, grow, and manage their social media presence.',
        'Years of working across digital industries have taught us how to earn attention and make it count. We think carefully about the opening hook, the story, the pacing, and what makes someone want to keep watching or share. We bring that thinking to every project, alongside a willingness to experiment and explore fresh ideas.',
        'We’re a small, hands-on team that values clear communication and thoughtful collaboration. We take the time to understand your business, bring ideas to the table, and stay involved from the first conversation to the final edit. Whether you’re launching something new or giving your brand fresh energy, we’d love to help you create something people remember.',
      ],
      stats: [
        { value: '2021', label: 'Since' },
        { value: '3', label: 'Countries' },
        { value: 'AI', label: 'Focus' },
      ],
      cta: "Let's work together",
    },
    contact: {
      label: 'Contact',
      title: 'Good ideas start with a',
      titleAccent: 'conversation.',
      subtitle:
        "Tell us what you have in mind. We'll help you shape the next step.",
      whatsappLabel: 'WhatsApp',
      whatsappCta: 'Message on WhatsApp',
      emailLabel: 'Email',
      email: 'hello@ekiworks.com',
      formTitle: 'Tell us about your project',
      formSubtitle: 'A few details are enough to get started.',
      name: 'Full name',
      namePlaceholder: 'Your name',
      company: 'Company',
      companyOptional: 'Company (optional)',
      companyPlaceholder: 'Company or brand',
      emailField: 'Email',
      emailPlaceholder: 'you@company.com',
      projectType: 'What can we help with?',
      projectTypes: ['AI Video', 'Visual Content', 'Social Media'],
      message: 'Your idea',
      messagePlaceholder: 'What would you like to create?',
      send: 'Send enquiry',
      privacy: 'We’ll only use your details to respond to your enquiry.',
      hqLabel: 'Headquarters',
      hqSubtitle: 'Three countries. One team.',
      offices: [
        { city: 'Wyoming', country: 'United States' },
        { city: 'Tallinn', country: 'Estonia' },
        { city: 'Ankara', country: 'Türkiye' },
      ],
    },
    blog: {
      label: 'Blog',
      title: 'Notes & ideas',
      subtitle: 'Thoughts on creative process, AI content and brand storytelling.',
      empty: 'No published posts yet.',
      notFound: 'Post not found.',
      back: 'Back to all posts',
      footerLink: 'Blog',
    },
    lang: {
      label: 'Language',
      soon: 'Soon',
    },
  },
}
