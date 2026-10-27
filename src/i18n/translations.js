export const locales = [
  { code: 'en', label: 'English', short: 'EN', flag: 'gb', available: true },
  { code: 'et', label: 'Eesti', short: 'ET', flag: 'ee', available: true },
  { code: 'fi', label: 'Suomi', short: 'FI', flag: 'fi', available: true },
  { code: 'ru', label: 'Русский', short: 'RU', flag: 'ru', available: true },
  { code: 'tr', label: 'Türkçe', short: 'TR', flag: 'tr', available: false },
  { code: 'es', label: 'Español', short: 'ES', flag: 'es', available: false },
]

export const availableLocaleCodes = locales.filter((l) => l.available).map((l) => l.code)

export const translations = {
  tr: {
    nav: {
      work: 'Video & Görseller',
      websites: 'Websiteler',
      services: 'Hizmetler',
      about: 'Hakkımızda',
      contact: 'İletişim',
      cta: 'Bize ulaşın',
    },
    seo: {
      home: {
        title: 'AI İçerik Ajansı',
        description:
          'ekiworks — markalar, oyunlar ve uygulamalar için yapay zeka destekli filmler, görseller, websiteler ve yaratıcı içerik.',
      },
      work: {
        title: 'Video & Görseller',
        description:
          'ekiworks video ve görsel portföyü — kısa format, sinematik filmler ve AI görseller.',
      },
      websites: {
        title: 'Websiteler',
        description:
          'ekiworks websitesi tasarımları — markalar için modern, hızlı ve amaca uygun siteler.',
      },
      services: {
        title: 'Hizmetler',
        description:
          'Oyun ve uygulama reklamları, AI reklamlar, UGC, sosyal medya, görseller, websitesi tasarımı, mobil uygulamalar ve hesap yönetimi.',
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
      label: 'Yaratıcı & Dijital Ajans',
      titleBefore: 'Fikirleri',
      titleAccent: 'dijital deneyimlere',
      titleAfter: 'dönüştürüyoruz.',
      description:
        'Yapay zeka destekli videolar, dikkat çekici görseller, websiteler ve uygulamalar — markanız için özenle üretilir.',
      explore: 'Video & görselleri keşfedin',
      exploreWebsites: 'Websiteler & uygulamaları keşfedin',
      showreel: 'Showreel izle',
      strip: ['Oyun & Uygulama', 'AI Reklamlar', 'Websiteler', 'Mobil Uygulamalar'],
    },
    portfolio: {
      label: 'Video & Görseller',
      title: 'Öne Çıkanlar',
      subtitle: 'Yapay zeka ile üretilmiş, öne çıkan hikâyeler.',
      viewAll: 'Tümünü gör',
      shortTitle: 'Kısa format hikâyeler',
      filmTitle: 'Sinematik filmler',
    },
    workPage: {
      label: 'Portföy',
      title: 'Video & Görseller',
      subtitle: 'Kısa format videolar, sinematik filmler ve AI görseller.',
      all: 'Tümü',
      images: 'Görseller',
      empty: 'Henüz içerik yok.',
      showMore: 'Daha fazla',
    },
    websitesPage: {
      label: 'Portföy',
      title: 'Websiteler',
      subtitle: 'Markalar için tasarladığımız modern websiteleri.',
      visit: 'Siteyi ziyaret et',
      empty: 'Henüz websitesi eklenmedi.',
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
          title: 'Websitesi Tasarımı',
          description:
            'Markanıza özel, hızlı ve modern websiteleri — net yapı, güçlü görseller ve dönüşüme odaklı deneyim.',
        },
        {
          title: 'Mobil Uygulamalar',
          description:
            'iOS ve Android için modern mobil uygulamalar — kullanışlı arayüzler ve markanıza uygun ürün deneyimi.',
        },
      ],
    },
    servicesPage: {
      label: 'Ne Yapıyoruz',
      titleBefore: 'Yaratıcı hizmetler.',
      titleAccent: 'Markanıza özel.',
      subtitle:
        'Videolar, görseller, websiteler, mobil uygulamalar ve sosyal medya desteği — birlikte çalışan bir bütün.',
      discuss: 'Projeni konuşalım',
      footerTitle: 'Akılda kalacak bir şey yaratalım.',
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
          id: 'website-design',
          title: 'Websitesi Tasarımı',
          description:
            'Markanıza özel, hızlı ve modern websiteleri. Net yapı, güçlü görseller ve ziyaretçiyi harekete geçiren bir deneyim.',
          details: [
            'Markanızın dijital vitrinini net, hızlı ve akılda kalır hale getirin. Kurumsal sitelerden ürün ve kampanya sayfalarına kadar; kimliğinizi yansıtan, mobil uyumlu ve dönüşüme odaklı websiteleri tasarlıyoruz.',
            'Süreç; ihtiyaç analizi, bilgi mimarisi, görsel yön, arayüz tasarımı ve yayına hazır teslimatı kapsar. Mesajınızın ilk bakışta anlaşılmasını, içeriklerin okunabilir olmasını ve sitenin hem masaüstünde hem mobilde iyi çalışmasını önemseriz. İsterseniz mevcut marka varlıklarınızı kullanır, yoksa AI destekli görseller ve içeriklerle sayfaları güçlendiririz.',
          ],
        },
        {
          id: 'mobile-apps',
          title: 'Mobil Uygulamalar',
          description:
            'iOS ve Android için modern mobil uygulamalar. Kullanışlı arayüzler, net akışlar ve markanıza uygun ürün deneyimi.',
          details: [
            'Fikirden yayına kadar mobil ürünler tasarlayıp geliştiriyoruz. Kullanıcı ihtiyaçlarını netleştirir, sade ve anlaşılır arayüzler kurar, iOS ve Android’de tutarlı çalışan uygulamalar ortaya çıkarırız.',
            'Süreç; keşif, kullanıcı akışları, UI/UX tasarımı, geliştirme ve mağaza yayınına hazır teslimatı kapsar. Performans, okunabilirlik ve dönüşüm odaklı ekranlara önem verir; mevcut marka dilinizle uyumlu bir mobil deneyim hedefleriz.',
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
      verified: 'Onaylı',
    },
    mediaTags: {
      'Game Ads': 'Oyun Reklamları',
      'Application Ads': 'Uygulama Reklamları',
      UGC: 'UGC',
      'Social Media': 'Sosyal Medya',
      'AI Visuals': 'AI Görseller',
      Other: 'Diğer',
    },
    cta: {
      label: 'Konuşalım',
      title: 'Bir fikrin mi var? Hayata geçirelim.',
      button: 'Bize anlatın',
    },
    footer: {
      tagline: 'Yaratıcı fikirler. Etkileyici videolar ve websiteler.',
    },
    about: {
      label: 'Hakkımızda',
      title: 'Hikâye anlatan,',
      titleAccent: 'iş bilen bir ekip.',
      paragraphs: [
        'Ekiworks, 2021’e uzanan pazarlama, sosyal medya, e-ticaret ve yazılım deneyimini bir araya getiriyor. Yolculuğumuz Türkiye’de başladı; bugün Estonya ve Amerika Birleşik Devletleri’ndeki ofislerimizle, yaratıcı düşünceyi iş dünyasına dair pratik bir anlayışla birleştirerek devam ediyor.',
        'Yapay zeka araçları yeni yaratıcı olanaklar açtıkça, yapay zeka destekli video ve görsel içeriği işimizin merkezine aldık. Bugün her markanın kişiliğine, kitlesine ve hedeflerine özel reklam filmleri, ürün görselleri, sinematik hikâyeler, sosyal içerikler ve websiteleri üretiyoruz. Ayrıca işletmelerin sosyal medya varlıklarını kurmasına, büyütmesine ve yönetmesine yardımcı oluyoruz.',
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
      email: 'ridvan@ekiworks.com',
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
      projectTypes: ['AI Video', 'Görsel İçerik', 'Websitesi', 'Mobil Uygulama', 'Sosyal Medya'],
      message: 'Fikriniz',
      messagePlaceholder: 'Ne yaratmak istersiniz?',
      send: 'Talep gönder',
      privacy: 'Bilgilerinizi yalnızca talebinize yanıt vermek için kullanacağız.',
      hqLabel: 'Merkezler',
      hqSubtitle: 'Üç ülkede, tek ekip.',
      offices: [
        { city: 'Tallinn', country: 'Estonia' },
        { city: 'Wyoming', country: 'United States' },
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
      work: 'Video & Visuals',
      websites: 'Websites',
      services: 'Services',
      about: 'About',
      contact: 'Contact',
      cta: 'Get in touch',
    },
    seo: {
      home: {
        title: 'AI Content Agency',
        description:
          'ekiworks — AI-powered films, visuals, websites, and creative content for brands, games, and apps.',
      },
      work: {
        title: 'Video & Visuals',
        description:
          'Explore the ekiworks video and visual portfolio — short-form, cinematic films, and AI imagery.',
      },
      websites: {
        title: 'Websites',
        description:
          'ekiworks website designs — modern, fast sites built around your brand and goals.',
      },
      services: {
        title: 'Services',
        description:
          'Game and app ads, AI commercials, UGC, social content, product imagery, website design, mobile apps, and social media management.',
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
      label: 'Creative & Digital Agency',
      titleBefore: 'Turning ideas into',
      titleAccent: 'digital experiences.',
      titleAfter: '',
      description:
        'AI-powered videos, striking visuals, websites, and apps — thoughtfully created for your brand.',
      explore: 'Explore video & visuals',
      exploreWebsites: 'Explore websites & apps',
      showreel: 'Watch showreel',
      strip: ['Game & App Ads', 'AI Commercials', 'Websites', 'Mobile Apps'],
    },
    portfolio: {
      label: 'Video & Visuals',
      title: 'Featured Work',
      subtitle: 'AI-powered stories. Made to stand out.',
      viewAll: 'View all',
      shortTitle: 'Short-form stories',
      filmTitle: 'Cinematic films',
    },
    workPage: {
      label: 'Portfolio',
      title: 'Video & Visuals',
      subtitle: 'Short-form videos, cinematic films, and AI imagery.',
      all: 'All',
      images: 'Images',
      empty: 'Nothing here yet.',
      showMore: 'Show more',
    },
    websitesPage: {
      label: 'Portfolio',
      title: 'Websites',
      subtitle: 'Modern websites we’ve designed for brands and businesses.',
      visit: 'Visit site',
      empty: 'No websites yet.',
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
          title: 'Website Design',
          description:
            'Modern, fast websites built around your brand — clear structure, strong visuals, and conversion-focused experience.',
        },
        {
          title: 'Mobile Apps',
          description:
            'Modern iOS and Android apps — clear interfaces and a product experience that fits your brand.',
        },
      ],
    },
    servicesPage: {
      label: 'What We Do',
      titleBefore: 'Creative services. Built around',
      titleAccent: 'your brand.',
      subtitle:
        'Videos, visuals, websites, mobile apps, and social media support that work together.',
      discuss: 'Discuss your project',
      footerTitle: 'Let’s create something memorable.',
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
          id: 'website-design',
          title: 'Website Design',
          description:
            'Modern, fast websites built around your brand. Clear structure, strong visuals, and an experience that moves visitors to act.',
          details: [
            'Make your brand’s digital front door clear, fast, and memorable. From company sites to product and campaign pages, we design mobile-friendly websites that reflect your identity and stay focused on conversion.',
            'The process covers discovery, information architecture, visual direction, interface design, and delivery ready for launch. We care that your message lands at a glance, that content stays readable, and that the site works well on desktop and mobile. We can work with your existing brand assets — or strengthen pages with AI-powered visuals and content when you need them.',
          ],
        },
        {
          id: 'mobile-apps',
          title: 'Mobile Apps',
          description:
            'Modern iOS and Android apps. Clear interfaces, thoughtful flows, and a product experience that fits your brand.',
          details: [
            'We design and build mobile products from idea to launch. We clarify user needs, craft simple interfaces, and deliver apps that feel consistent on iOS and Android.',
            'The process covers discovery, user flows, UI/UX design, development, and store-ready delivery. We focus on performance, clarity, and conversion-minded screens — always aligned with your brand language.',
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
      verified: 'Verified',
    },
    mediaTags: {
      'Game Ads': 'Game Ads',
      'Application Ads': 'Application Ads',
      UGC: 'UGC',
      'Social Media': 'Social Media',
      'AI Visuals': 'AI Visuals',
      Other: 'Other',
    },
    cta: {
      label: "Let's Talk",
      title: "Have an idea? Let's make it happen.",
      button: 'Tell us about it',
    },
    footer: {
      tagline: 'Creative ideas. Compelling videos and websites.',
    },
    about: {
      label: 'About',
      title: 'Storytellers with',
      titleAccent: 'business sense.',
      paragraphs: [
        'Ekiworks brings together experience in marketing, social media, e-commerce, and software dating back to 2021. Our journey began in Türkiye and now continues with offices in Estonia and the United States, combining creative thinking with a practical understanding of business.',
        'As AI tools opened up new creative possibilities, we made AI-powered video and visual content a central part of our work. Today, we create commercials, product visuals, cinematic stories, social content, and websites tailored to each brand’s personality, audience, and goals. We also help businesses establish, grow, and manage their social media presence.',
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
      email: 'ridvan@ekiworks.com',
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
      projectTypes: ['AI Video', 'Visual Content', 'Website', 'Mobile App', 'Social Media'],
      message: 'Your idea',
      messagePlaceholder: 'What would you like to create?',
      send: 'Send enquiry',
      privacy: 'We’ll only use your details to respond to your enquiry.',
      hqLabel: 'Headquarters',
      hqSubtitle: 'Three countries. One team.',
      offices: [
        { city: 'Tallinn', country: 'Estonia' },
        { city: 'Wyoming', country: 'United States' },
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
  et: {
    nav: {
      work: 'Videod ja visuaalid',
      websites: 'Veebilehed',
      services: 'Teenused',
      about: 'Meist',
      contact: 'Kontakt',
      cta: 'Võta ühendust',
    },
    seo: {
      home: {
        title: 'AI-sisuloome agentuur',
        description:
          'ekiworks — tehisintellektil põhinevad filmid, visuaalid, veebilehed ja loominguline sisu brändidele, mängudele ja äppidele.',
      },
      work: {
        title: 'Videod ja visuaalid',
        description:
          'Avasta ekiworks’i video- ja visuaalportfell — lühivorm, filmilikud videod ja AI-pildid.',
      },
      websites: {
        title: 'Veebilehed',
        description:
          'ekiworks’i veebidisain — kaasaegsed, kiired saidid, mis toetavad sinu brändi ja eesmärke.',
      },
      services: {
        title: 'Teenused',
        description:
          'Mängu- ja äpireklaamid, AI-reklaamid, UGC, sotsiaalne sisu, tootepildid, veebidisain, mobiilirakendused ja sotsiaalmeedia haldus.',
      },
      about: {
        title: 'Meist',
        description:
          'ekiworks’ist — turundus- ja loominguline kogemus alates 2021; AI-video ja sotsiaalmeedia.',
      },
      contact: {
        title: 'Kontakt',
        description: 'Võta ekiworks’iga ühendust — räägi oma projektist ja alustame koos.',
      },
      blog: {
        title: 'Blogi',
        description: 'Märkmed loomingulisest protsessist, AI-sisust ja brändilugudest.',
      },
    },
    hero: {
      label: 'Loov- ja digiagentuur',
      titleBefore: 'Muudame ideed',
      titleAccent: 'digitaalseteks kogemusteks.',
      titleAfter: '',
      description:
        'Tehisintellektil põhinevad videod, silmapaistvad visuaalid, veebilehed ja äpid — hoolikalt loodud sinu brändile.',
      explore: 'Avasta videoid ja visuaale',
      exploreWebsites: 'Avasta veebilehti ja äppe',
      showreel: 'Vaata showreeli',
      strip: ['Mängu- ja äpireklaamid', 'AI-reklaamid', 'Veebilehed', 'Mobiiliäpid'],
    },
    portfolio: {
      label: 'Videod ja visuaalid',
      title: 'Esiletõstetud tööd',
      subtitle: 'Tehisintellektil põhinevad lood. Loodud silma paistma.',
      viewAll: 'Vaata kõiki',
      shortTitle: 'Lühivormilised lood',
      filmTitle: 'Filmilikud videod',
    },
    workPage: {
      label: 'Portfell',
      title: 'Videod ja visuaalid',
      subtitle: 'Lühivideod, filmilikud videod ja AI-pildid.',
      all: 'Kõik',
      images: 'Pildid',
      empty: 'Siin pole veel midagi.',
      showMore: 'Näita rohkem',
    },
    websitesPage: {
      label: 'Portfell',
      title: 'Veebilehed',
      subtitle: 'Kaasaegsed veebilehed, mille oleme brändidele ja ettevõtetele disaininud.',
      visit: 'Külasta saiti',
      empty: 'Veebilehti pole veel lisatud.',
    },
    services: {
      label: 'Teenused',
      title: 'Mida me teeme',
      viewAll: 'Kõik teenused',
      items: [
        {
          title: 'Mängu- ja äpireklaamid',
          description:
            'Treilerid, mängupõhised kreatiivid ja funktsioonidele keskendunud videod. Tugevad hook’id ja selge loojutustus.',
        },
        {
          title: 'AI-reklaamid ja tootevideod',
          description:
            'Filmilikud brändivideod ja tootevideod ideest valmis videoni. Läbimõeldud visuaalid, mis toovad sinu loo esile.',
        },
        {
          title: 'Veebidisain',
          description:
            'Kaasaegsed, kiired veebilehed sinu brändile — selge struktuur, tugevad visuaalid ja konversioonile suunatud kogemus.',
        },
        {
          title: 'Mobiiliäpid',
          description:
            'Kaasaegsed iOS-i ja Androidi äpid — selged liidesed ja tootekogemus, mis sobib sinu brändiga.',
        },
      ],
    },
    servicesPage: {
      label: 'Mida me teeme',
      titleBefore: 'Loomingulised teenused.',
      titleAccent: 'Sinu brändile.',
      subtitle:
        'Videod, visuaalid, veebilehed, mobiiliäpid ja sotsiaalmeedia tugi — koos töötav tervik.',
      discuss: 'Räägime projektist',
      footerTitle: 'Loome midagi, mis jääb meelde.',
      cta: 'Räägi oma projektist',
      items: [
        {
          id: 'game-app-ads',
          title: 'Mängu- ja äpireklaamid',
          description:
            'Treilerid, mängupõhised kreatiivid ja funktsioonidele keskendunud videod mängudele ning äppidele. Tugevad hook’id ja selge loojutustus, mis annab inimestele põhjuse proovida.',
          details: [
            'Anna inimestele põhjus kerimise peatamiseks ja avastamiseks, mida oled loonud. Teeme treilereid, gameplay-monteeringuid, funktsioonide esitlemisi ja reklaamikreatiive, mis toovad esile sinu mängu või äpi atraktiivsuse. Iga kontseptsioon algab selge küsimusega: mis paneb selle sihtrühma proovima?',
            'Alates avahook’ist kuni lõpliku tegutsemiskutseni kujundame visuaale, tempot ja sõnumit selle vastuse ümber. Gameplay, äpiekraanid ja AI-ga loodud stseenid võivad eri lähenemistes kokku tulla, andes sulle variante erinevate sihtrühmade ja paigutuste jaoks. Kohandame iga video kampaaniale vajalikele formaatidele, hoides toote kogemuse ja iseloomu keskmes.',
          ],
        },
        {
          id: 'ai-commercials',
          title: 'AI-reklaamid ja tootevideod',
          description:
            'Filmilikud brändivideod ja tootevideod ideest valmis videoni. Läbimõeldud visuaalid, mis toovad sinu loo ellu ja panevad tooted fookusesse.',
          details: [
            'Muuda brändi lugu filmiks, mida inimesed tahavad vaadata. Loome tehisintellektil põhinevaid reklaame ja tootevideoid, mis ühendavad läbimõeldud kontseptsioonid, filmilikud visuaalid ja sihipärase montaaži. Kas tutvustad toodet, käivitad kampaaniat või räägid, mis sind eristab — ehitame kreatiivi selge sõnumi ümber.',
            'Meie töö hõlmab kontseptsiooni arendust, stsenaariumi, visuaalset suunda, stseenide loomist ja lõplikku montaaži. Pöörame tähelepanu sellele, kuidas toode välja näeb, kuidas kasud edasi antakse ja kuidas iga stseen loole kaasa aitab. Tulemuseks on brändiga seotud sisu, mida saab kohandada reklaamiks, sotsiaalmeediaks või veebilehele.',
          ],
        },
        {
          id: 'ai-ugc',
          title: 'AI UGC videod',
          description:
            'Tehisintellekti abil loodud, sisuloojate stiilis videod loomuliku esitusega ja samastatavate stsenaariumidega. Tootetutvustused, demod ja reklaamivariandid sinu publikule.',
          details: [
            'Too oma sõnum inimestele lähemale tehisintellekti abil loodud, sisuloojate stiilis videodega. Arendame sisu samastatavate olukordade, loomuliku esituse ja selge tooteteavituse ümber — lühitutvustustest demode, selgitavate videote ja probleem–lahendus reklaamideni.',
            'Kujundame stsenaariumi, esineja stiili, keskkonna ja tempo vastavalt publikule ning platvormile, kus video ilmuub. Vestluslik kosmeetikatutvustus vajab teist lähenemist kui mobiilimängu soovitus või äpi juhend. Loome ka alternatiivseid hook’e, stsenaariume ja CTA-sid, et saaksid sama pakkumist eri viisidel edasi anda. Kogu protsessi jooksul keskendume usutavale esitusele, lihtsale keelele ja kergesti jälgitavale sõnumile.',
          ],
        },
        {
          id: 'social-content',
          title: 'Sotsiaalmeedia sisu',
          description:
            'Reels’id, Shorts’id ja TikTok’i videod brändi igapäevaseks kohaloluks. Värsked kontseptsioonid, kaasahaaravad hook’id ja ühtne hääl kanalites.',
          details: [
            'Anna publikule midagi värsket vaadata ja põhjus tagasi tulla. Loome Reels’e, Shorts’e, TikTok’i videoid ja toetavat sotsiaalset sisu, mis peegeldab brändi iseloomu ning sobib loomulikult igale platvormile.',
            'Meie lähenemine algab ideedest: korduvad sarjad, tootefookused, harivad klipid, meelelahutuslikud lood ja õigeaegsed teated. Seejärel arendame hook’e, stsenaariume, visuaale, pealkirju ja montaaže. AI annab ruumi kujutlusvõimelistele stseenidele ja erinevatele loomingulistele suundadele, samas kui ühtne visuaalne keel hoiab sisu äratuntavana. Olgu vaja üksikuid postitusi või pidevat kreatiivivoogu — aitame üles ehitada mitmekesise, eesmärgipärase ja selge brändihäälega feed’i.',
          ],
        },
        {
          id: 'ai-visuals',
          title: 'AI-visuaalid ja tootepildid',
          description:
            'Kohandatud tootepildid, kampaaniavisuaalid ja bränditud visuaalid. Eristuvad kujutised sotsiaalmeedia jaoks, e-poodidele, veebilehtedele ja reklaamikampaaniatele.',
          details: [
            'Näita tooteid ja ideid keskkondades, mis paneb need silma paistma. Loome kohandatud tehisintellektil põhinevaid kujutisi kampaaniatele, e-poodidele, veebilehtedele ja sotsiaalmeediale — hoolikalt stiliseeritud tootekompositsioonidest kujutlusvõimeliste toimetuslike stseenideni ja bränditud visuaalideni.',
            'Iga pilt algab visuaalse suunaga, mis on kujundatud toote, publiku ja kasutusotstarbe ümber. Arvestame kompositsiooni, valgust, värvi, materjale ja tausta, et luua ühtne välimus. Töötades sinu viidete ja tootematerjalidega, pöörame tähelepanu detailidele, mis seovad kujutise brändiga. Saame arendada ka erinevaid stseene, kompositsioone ja kuvasuhteid, et sul oleks koordineeritud visuaalide komplekt kõikidele kanalitele.',
          ],
        },
        {
          id: 'website-design',
          title: 'Veebidisain',
          description:
            'Kaasaegsed, kiired veebilehed sinu brändile. Selge struktuur, tugevad visuaalid ja kogemus, mis paneb külastaja tegutsema.',
          details: [
            'Tee brändi digitaalne esikülg selgeks, kiireks ja meeldejäävaks. Ettevõtte saitidest toote- ja kampaania lehtedeni disainime mobiilisõbralikke veebilehti, mis peegeldavad sinu identiteeti ja keskenduvad konversioonile.',
            'Protsess hõlmab avastamist, infoarhitektuuri, visuaalset suunda, kasutajaliidese disaini ja käivitamiseks valmis tarnet. Hoolime, et sõnum jõuaks kohale esimesel pilgul, et sisu jääks loetavaks ning et sait töötaks hästi nii lauaarvutil kui mobiilis. Saame töötada olemasolevate brändivaradega — või tugevdada lehti tehisintellektil põhinevate visuaalide ja sisuga.',
          ],
        },
        {
          id: 'mobile-apps',
          title: 'Mobiiliäpid',
          description:
            'Kaasaegsed iOS-i ja Androidi äpid. Selged liidesed, läbimõeldud kasutajateekonnad ja tootekogemus, mis sobib sinu brändiga.',
          details: [
            'Disainime ja ehitame mobiilitooteid ideest käivitamiseni. Selgitame kasutajavajadused, loome lihtsad liidesed ja tarname äppe, mis tunduvad iOS-is ja Androidis ühtsed.',
            'Protsess hõlmab avastamist, kasutajavoogusid, UI/UX disaini, arendust ja poodi valmis tarnet. Keskendume jõudlusele, selgusele ja konversioonile suunatud ekraanidele — alati kooskõlas sinu brändikeelega.',
          ],
        },
        {
          id: 'social-mgmt',
          title: 'Sotsiaalmeedia haldus',
          description:
            'Konto seadistamine, sisuplaneerimine, avaldamine ja pidev haldus. Selge strateegia ja ühtne kohalolu, mis aitab publikuga ühendust luua.',
          details: [
            'Ehita sotsiaalne kohalolu, mis tundub aktiivne, korrastatud ja ühtne. Aitame brändidel ja ettevõtetel kontosid luua, praktilist sisusuunda arendada ning hallata pidevat tööd, mis hoiab kanalid liikumas.',
            'Meie tugi hõlmab profiili seadistamist ja optimeerimist, sisuplaneerimist, ajastamist, avaldamist ja publiku suhtlust. Korraldame ideed selgeks kalendriks, koordineerime kreatiivitootmist ja hoiame ühtset tooni postitustes ning vestlustes. Kui sisu on live’is, vaatame, mis tähelepanu köidab ja kuidas publik reageerib, ning kasutame neid tähelepanekuid edasiseks planeerimiseks. Olgu alustad nullist või parandad olemasolevat kohalolu — toome sotsiaalmeediategevusse struktuuri ja järjepidevuse.',
          ],
        },
      ],
    },
    feedback: {
      label: 'Klientide tagasiside',
      titleBefore: 'Head lood. Veel parem',
      titleAccent: 'koostöö.',
      subtitle: 'Paar sõna loomingulisest protsessist.',
      verified: 'Kinnitatud',
    },
    mediaTags: {
      'Game Ads': 'Mängureklaamid',
      'Application Ads': 'Äpireklaamid',
      UGC: 'UGC',
      'Social Media': 'Sotsiaalmeedia',
      'AI Visuals': 'AI-visuaalid',
      Other: 'Muu',
    },
    cta: {
      label: 'Räägime',
      title: 'On sul idee? Teeme selle teoks.',
      button: 'Räägi meile sellest',
    },
    footer: {
      tagline: 'Loomingulised ideed. Kaasakiskuvad videod ja veebilehed.',
    },
    about: {
      label: 'Meist',
      title: 'Jutuvestjad',
      titleAccent: 'ärilise tajuga.',
      paragraphs: [
        'Ekiworks ühendab turunduse, sotsiaalmeedia, e-kaubanduse ja tarkvara kogemuse alates 2021. Meie teekond algas Türgis ning jätkub nüüd kontoritega Eestis ja Ameerika Ühendriikides, ühendades loomingulise mõtlemise praktilise ärimõistmisega.',
        'Kui tehisintellekti tööriistad avasid uusi loomingulisi võimalusi, tegime tehisintellektil põhineva video- ja visuaalsisu oma töö keskseks osaks. Täna loome reklaame, tootepilte, kinolikke lugusid, sotsiaalset sisu ja veebilehti, mis on kohandatud iga brändi iseloomu, publiku ja eesmärkide järgi. Aitame ettevõtetel ka sotsiaalmeedia kohalolu luua, kasvatada ja hallata.',
        'Aastad digitaalsetes tööstustes on õpetanud, kuidas tähelepanu võita ja sellest kasu saada. Mõtleme hoolikalt avahook’ile, loole, tempole ja sellele, mis paneb kedagi edasi vaatama või jagama. Toome selle mõtteviisi igasse projekti koos valmisolekuga katsetada ja värskeid ideid uurida.',
        'Oleme väike, praktiline meeskond, kes väärtustab selget suhtlust ja läbimõeldud koostööd. Võtame aega sinu äri mõistmiseks, toome lauale ideid ja jääme kaasatuks esimesest vestlusest kuni lõpliku montaažini. Kas käivitad midagi uut või annad brändile värsket energiat — aitame hea meelega luua midagi, mida inimesed mäletavad.',
      ],
      stats: [
        { value: '2021', label: 'Alates' },
        { value: '3', label: 'Riiki' },
        { value: 'AI', label: 'Fookus' },
      ],
      cta: 'Teeme koostööd',
    },
    contact: {
      label: 'Kontakt',
      title: 'Head ideed algavad',
      titleAccent: 'vestlusest.',
      subtitle: 'Räägi, mis sul mõttes on. Aitame järgmise sammu kujundada.',
      whatsappLabel: 'WhatsApp',
      whatsappCta: 'Kirjuta WhatsAppis',
      emailLabel: 'E-post',
      email: 'ridvan@ekiworks.com',
      formTitle: 'Räägi oma projektist',
      formSubtitle: 'Paar detaili piisab alustamiseks.',
      name: 'Täisnimi',
      namePlaceholder: 'Sinu nimi',
      company: 'Ettevõte',
      companyOptional: 'Ettevõte (valikuline)',
      companyPlaceholder: 'Ettevõte või bränd',
      emailField: 'E-post',
      emailPlaceholder: 'sina@ettevote.com',
      projectType: 'Millega saame aidata?',
      projectTypes: ['AI-video', 'Visuaalne sisu', 'Veebileht', 'Mobiiliäpp', 'Sotsiaalmeedia'],
      message: 'Sinu idee',
      messagePlaceholder: 'Mida soovid luua?',
      send: 'Saada päring',
      privacy: 'Kasutame sinu andmeid ainult päringule vastamiseks.',
      hqLabel: 'Peakontorid',
      hqSubtitle: 'Kolm riiki. Üks meeskond.',
      offices: [
        { city: 'Tallinn', country: 'Eesti' },
        { city: 'Wyoming', country: 'Ameerika Ühendriigid' },
        { city: 'Ankara', country: 'Türgi' },
      ],
    },
    blog: {
      label: 'Blogi',
      title: 'Märkmed & ideed',
      subtitle: 'Mõtteid loomingulisest protsessist, AI-sisust ja brändilugudest.',
      empty: 'Avaldatud postitusi pole veel.',
      notFound: 'Postitust ei leitud.',
      back: 'Tagasi kõigi postituste juurde',
      footerLink: 'Blogi',
    },
    lang: {
      label: 'Keel',
      soon: 'Varsti',
    },
  },
  fi: {
    nav: {
      work: 'Video & visuaalit',
      websites: 'Verkkosivut',
      services: 'Palvelut',
      about: 'Meistä',
      contact: 'Yhteystiedot',
      cta: 'Ota yhteyttä',
    },
    seo: {
      home: {
        title: 'AI-sisältötoimisto',
        description:
          'ekiworks — tekoälyllä tuotetut filmit, visuaalit, verkkosivut ja luova sisältö brändeille, peleille ja sovelluksille.',
      },
      work: {
        title: 'Video & visuaalit',
        description:
          'Tutustu ekiworksin video- ja visuaaliportfolioon — lyhytmuoto, elokuvamaiset filmit ja AI-kuvat.',
      },
      websites: {
        title: 'Verkkosivut',
        description:
          'ekiworksin verkkosivusuunnittelu — modernit, nopeat sivustot brändisi ja tavoitteidesi ympärille.',
      },
      services: {
        title: 'Palvelut',
        description:
          'Peli- ja sovellusmainokset, AI-mainokset, UGC, some-sisältö, tuotekuvat, verkkosivusuunnittelu, mobiilisovellukset ja some-hallinta.',
      },
      about: {
        title: 'Meistä',
        description:
          'ekiworksista — markkinoinnin ja luovan työn kokemus vuodesta 2021; AI-video ja some.',
      },
      contact: {
        title: 'Yhteystiedot',
        description: 'Ota yhteyttä ekiworksiin — kerro projektistasi ja aloitetaan.',
      },
      blog: {
        title: 'Blogi',
        description: 'Ajatuksia luovasta prosessista, AI-sisällöstä ja bränditarinoista.',
      },
    },
    hero: {
      label: 'Luova & digitoimisto',
      titleBefore: 'Muutamme ideat',
      titleAccent: 'digitaalisiksi kokemuksiksi.',
      titleAfter: '',
      description:
        'Tekoälyllä tuotetut videot, vaikuttavat visuaalit, verkkosivut ja sovellukset — huolella brändillesi.',
      explore: 'Tutustu videoihin & visuaaleihin',
      exploreWebsites: 'Tutustu verkkosivuihin & sovelluksiin',
      showreel: 'Katso showreel',
      strip: ['Peli- & sovellusmainokset', 'AI-mainokset', 'Verkkosivut', 'Mobiilisovellukset'],
    },
    portfolio: {
      label: 'Video & visuaalit',
      title: 'Valitut työt',
      subtitle: 'Tekoälyllä tuotetut tarinat. Tehty erottumaan.',
      viewAll: 'Näytä kaikki',
      shortTitle: 'Lyhytmuotoiset tarinat',
      filmTitle: 'Elokuvamaiset filmit',
    },
    workPage: {
      label: 'Portfolio',
      title: 'Video & visuaalit',
      subtitle: 'Lyhytvideot, elokuvamaiset filmit ja AI-kuvat.',
      all: 'Kaikki',
      images: 'Kuvat',
      empty: 'Ei vielä sisältöä.',
      showMore: 'Näytä lisää',
    },
    websitesPage: {
      label: 'Portfolio',
      title: 'Verkkosivut',
      subtitle: 'Modernit verkkosivut, jotka olemme suunnitelleet brändeille.',
      visit: 'Vieraile sivustolla',
      empty: 'Verkkosivuja ei ole vielä lisätty.',
    },
    services: {
      label: 'Palvelut',
      title: 'Mitä teemme',
      viewAll: 'Kaikki palvelut',
      items: [
        {
          title: 'Peli- & sovellusmainokset',
          description:
            'Trailereita, pelivideoita ja ominaisuuksia esitteleviä videoita. Vahvat hookit ja selkeä tarinankerronta.',
        },
        {
          title: 'AI-mainokset & tuotevideot',
          description:
            'Elokuvamaiset brändifilmit ja tuotevideot ideasta valmiiseen editointiin — tarinaasi tukevat visuaalit.',
        },
        {
          title: 'Verkkosivusuunnittelu',
          description:
            'Modernit, nopeat sivustot brändisi ympärille — selkeä rakenne, vahvat visuaalit ja konversioon ohjaava kokemus.',
        },
        {
          title: 'Mobiilisovellukset',
          description:
            'Modernit iOS- ja Android-sovellukset — selkeät käyttöliittymät ja brändiisi sopiva tuotekokemus.',
        },
      ],
    },
    servicesPage: {
      label: 'Mitä teemme',
      titleBefore: 'Luovia palveluita.',
      titleAccent: 'Brändisi ympärille.',
      subtitle:
        'Videot, visuaalit, verkkosivut, mobiilisovellukset ja some-tuki — yhdessä toimiva kokonaisuus.',
      discuss: 'Keskustellaan projektista',
      footerTitle: 'Luodaan jotain, joka jää mieleen.',
      cta: 'Kerro projektistasi',
      items: [
        {
          id: 'game-app-ads',
          title: 'Peli- & sovellusmainokset',
          description:
            'Trailereita, pelivideoita ja ominaisuuksia esitteleviä videoita peleistä ja sovelluksista. Vahvat hookit ja selkeä tarinankerronta, jotka antavat syyn kokeilla.',
          details: [
            'Anna ihmisille syy lopettaa skrollaus ja tutustua siihen, mitä olet rakentanut. Luomme trailereita, pelieditointeja, ominaisuusnäyttöjä ja mainoskreativeja, jotka tuovat esiin pelisi tai sovelluksesi vetovoiman. Jokainen konsepti alkaa selkeällä kysymyksellä: mikä saa tämän yleisön kokeilemaan?',
            'Avaushookista viimeiseen toimintakehotukseen muotoilemme visuaalit, rytmin ja viestin sen vastauksen ympärille. Pelimateriaali, sovellusnäytöt ja tekoälyllä tuotetut kohtaukset voivat yhdistyä eri lähestymistavoissa, jolloin saat testattavia variaatioita eri yleisöille ja sijoitteluille. Mukautamme jokaisen videon kampanjasi tarvitsemiin formaatteihin pitäen tuotteen kokemuksen ja persoonallisuuden keskiössä.',
          ],
        },
        {
          id: 'ai-commercials',
          title: 'AI-mainokset & tuotevideot',
          description:
            'Elokuvamaiset brändifilmit ja tuotevideot ideasta valmiiseen editointiin. Harkitut visuaalit, jotka herättävät tarinasi henkiin ja nostavat tuotteesi esiin.',
          details: [
            'Muuta brändisi tarina filmiksi, jota ihmiset haluavat katsoa. Luomme tekoälyllä tuotettuja mainoksia ja tuotevideoita, joissa yhdistyvät harkitut konseptit, elokuvamaiset visuaalit ja tarkoituksellinen editointi. Esitteletkö tuotetta, lanseeraatko kampanjaa vai kerrotko erottuvuudestasi — rakennamme kreatiivin selkeän viestin ympärille.',
            'Työmme kattaa konseptikehityksen, käsikirjoituksen, visuaalisen ohjauksen, kohtausten luonnin ja lopullisen editoinnin. Kiinnitämme huomiota siihen, miltä tuotteesi näyttää, miten hyödyt viestitään ja miten jokainen kohtaus rakentaa tarinaa. Tuloksena on brändiisi sidottu sisältö, jota voi mukauttaa mainontaan, someen tai verkkosivulle.',
          ],
        },
        {
          id: 'ai-ugc',
          title: 'AI UGC -videot',
          description:
            'Tekoälyllä tuotettuja, creator-tyylisiä videoita luonnollisella esityksellä ja samaistuttavilla tilanteilla. Tuote-esittelyt, demot ja mainosvariaatiot yleisöllesi.',
          details: [
            'Tee viestistäsi lähestyttävämpi tekoälyllä tuotetuilla, creator-tyylisillä videoilla. Kehitämme sisältöä samaistuttavien tilanteiden, luonnollisen esityksen ja selkeän tuoteviestinnän ympärille — lyhyistä esittelyistä demoihin, selittäviin videoihin ja ongelma–ratkaisu-mainoksiin.',
            'Muotoilemme käsikirjoituksen, esiintyjän tyylin, ympäristön ja rytmin yleisösi ja alustan mukaan. Keskusteleva ihonhoitoesittely vaatii eri lähestymistavan kuin mobiilipelisuositus tai sovelluswalkthrough. Luomme myös vaihtoehtoisia hookeja, käsikirjoituksia ja CTA:ita, jotta voit testata eri tapoja kertoa samasta tarjouksesta. Koko prosessissa keskitymme uskottavaan esitykseen, selkeään kieleen ja helposti seurattavaan viestiin.',
          ],
        },
        {
          id: 'social-content',
          title: 'Somesisältö',
          description:
            'Reelit, Shortsit ja TikTok-videot brändisi arkeen. Tuoreita konsepteja, tarttuvia hookeja ja yhtenäinen ääni kanavillasi.',
          details: [
            'Anna yleisöllesi jotain tuoretta katsottavaa ja syy palata. Luomme Reelejä, Shortseja, TikTok-videoita ja tukevaa somesisältöä, joka heijastaa brändisi persoonallisuutta ja istuu luonnollisesti kullekin alustalle.',
            'Lähestymistapamme alkaa ideoista: toistuvat sarjat, tuote-esittelyt, opetusklipit, viihdyttävät tarinat ja ajankohtaiset ilmoitukset. Sitten kehitämme hookit, käsikirjoitukset, visuaalit, kuvatekstit ja editoinnit. Tekoäly antaa tilaa mielikuvituksellisille kohtauksille ja eri luoville suunnille, samalla kun yhtenäinen visuaalinen kieli pitää sisältösi tunnistettavana. Tarvitsetpa yksittäisiä julkaisuja tai jatkuvaa kreatiivivirtaa — autamme rakentamaan feedin, jossa on vaihtelua, tarkoitusta ja selkeä brändiääni.',
          ],
        },
        {
          id: 'ai-visuals',
          title: 'AI-visuaalit & tuotekuvat',
          description:
            'Räätälöidyt tuotekuvat, kampanjavisuaalit ja brändätyt kuvat. Erottuvaa kuvamateriaalia someen, verkkokauppaan, sivustoille ja mainontaan.',
          details: [
            'Näytä tuotteesi ja ideasi ympäristöissä, joissa ne erottuvat. Luomme räätälöityjä tekoälykuvia kampanjoihin, verkkokauppoihin, sivustoille ja someen — huolellisesti sommitelluista tuotekuvista mielikuvituksellisiin editorial-kohtauksiin ja brändättyihin artworkeihin.',
            'Jokainen kuva alkaa visuaalisesta suunnasta, joka rakentuu tuotteesi, yleisösi ja käyttötarkoituksen ympärille. Huomioimme sommittelun, valon, värin, materiaalit ja taustat yhtenäisen ilmeen luomiseksi. Työskentelemme referenssiesi ja tuoteaineistojesi pohjalta ja kiinnitämme huomiota yksityiskohtiin, jotka sitovat kuvan brändiisi. Voimme myös kehittää eri kohtauksia, sommitteluja ja kuvasuhteita koordinoitua settiä varten.',
          ],
        },
        {
          id: 'website-design',
          title: 'Verkkosivusuunnittelu',
          description:
            'Modernit, nopeat verkkosivut brändisi ympärille. Selkeä rakenne, vahvat visuaalit ja kokemus, joka saa vierailijan toimimaan.',
          details: [
            'Tee brändisi digitaalisesta etuovesta selkeä, nopea ja mieleenpainuva. Yrityssivustoista tuote- ja kampanjasivuihin suunnittelemme mobiiliystävällisiä sivustoja, jotka heijastavat identiteettiäsi ja keskittyvät konversioon.',
            'Prosessi kattaa kartoituksen, tietorakenteen, visuaalisen suunnan, käyttöliittymäsuunnittelun ja julkaisuvalmiin toimituksen. Pidämme huolta, että viesti ymmärretään ensi silmäyksellä, sisältö pysyy luettavana ja sivusto toimii hyvin sekä desktopissa että mobilissa. Voimme työskennellä olemassa olevilla brändiaineistoillasi — tai vahvistaa sivuja tekoälyvisuaaleilla ja sisällöllä.',
          ],
        },
        {
          id: 'mobile-apps',
          title: 'Mobiilisovellukset',
          description:
            'Modernit iOS- ja Android-sovellukset. Selkeät käyttöliittymät, harkitut polut ja brändiisi sopiva tuotekokemus.',
          details: [
            'Suunnittelemme ja rakennamme mobiilituotteita ideasta julkaisuun. Selkeytämme käyttäjätarpeet, rakennamme yksinkertaisia käyttöliittymiä ja toimitamme sovelluksia, jotka tuntuvat yhtenäisiltä iOS:llä ja Androidilla.',
            'Prosessi kattaa kartoituksen, käyttäjäpolut, UI/UX-suunnittelun, kehityksen ja kauppaan valmiin toimituksen. Keskitymme suorituskykyyn, selkeyteen ja konversioon ohjaaviin näyttöihin — aina brändikielesi mukaisesti.',
          ],
        },
        {
          id: 'social-mgmt',
          title: 'Some-hallinta',
          description:
            'Tilin perustaminen, sisältösuunnittelu, julkaisu ja jatkuva hallinta. Selkeä strategia ja yhtenäinen läsnäolo, joka auttaa tavoittamaan yleisösi.',
          details: [
            'Rakenna some-läsnäolo, joka tuntuu aktiiviselta, järjestelmälliseltä ja yhtenäiseltä. Autamme brändejä ja yrityksiä perustamaan tilit, kehittämään käytännöllisen sisältösuunnan ja hallitsemaan jatkuvaa työtä, joka pitää kanavat liikkeessä.',
            'Tukemme kattaa profiilin perustamisen ja optimoinnin, sisältösuunnittelun, ajoituksen, julkaisun ja yleisövuorovaikutuksen. Järjestämme ideat selkeäksi kalenteriksi, koordinoimme kreatiivituotantoa ja ylläpidämme yhtenäistä sävyä julkaisuissa ja keskusteluissa. Kun sisältö on live, tarkastelemme mikä kiinnittää huomion ja miten yleisö reagoi — ja viemme havainnot seuraavaan suunnitteluun. Aloitatpa nollasta tai parannat olemassa olevaa läsnäoloa — tuomme rakenteen ja jatkuvuuden some-toimintaasi.',
          ],
        },
      ],
    },
    feedback: {
      label: 'Asiakaspalautteet',
      titleBefore: 'Hyviä tarinoita. Vielä parempia',
      titleAccent: 'kumppanuuksia.',
      subtitle: 'Muutama sana luovasta prosessista.',
      verified: 'Vahvistettu',
    },
    mediaTags: {
      'Game Ads': 'Pelimainokset',
      'Application Ads': 'Sovellusmainokset',
      UGC: 'UGC',
      'Social Media': 'Some',
      'AI Visuals': 'AI-visuaalit',
      Other: 'Muu',
    },
    cta: {
      label: 'Jutellaan',
      title: 'Onko sinulla idea? Tehdään se todeksi.',
      button: 'Kerro siitä meille',
    },
    footer: {
      tagline: 'Luovia ideoita. Vakuuttavia videoita ja verkkosivuja.',
    },
    about: {
      label: 'Meistä',
      title: 'Tarinankertojia',
      titleAccent: 'bisnesymmärryksellä.',
      paragraphs: [
        'Ekiworks yhdistää markkinoinnin, somen, verkkokaupan ja softan kokemuksen vuodesta 2021. Matkamme alkoi Turkissa ja jatkuu nyt toimistoilla Virossa ja Yhdysvalloissa — yhdistäen luovan ajattelun käytännölliseen bisnesymmärrykseen.',
        'Kun tekoälytyökalut avasivat uusia luovia mahdollisuuksia, teimme tekoälyllä tuotetusta video- ja visuaalisisällöstä työn keskeisen osan. Tänään luomme mainoksia, tuotekuvia, elokuvamaisia tarinoita, somesisältöä ja verkkosivuja, jotka on räätälöity kunkin brändin persoonan, yleisön ja tavoitteiden mukaan. Autamme myös yrityksiä rakentamaan, kasvattamaan ja hallitsemaan some-läsnäoloaan.',
        'Vuodet digitaalisilla aloilla ovat opettaneet, miten huomio ansaitaan ja miten siitä tehdään merkityksellistä. Mietimme huolella avaushookia, tarinaa, rytmiä ja sitä, mikä saa katsomaan tai jakamaan. Tuomme tämän ajattelun jokaiseen projektiin — sekä valmiuden kokeilla ja tutkia uusia ideoita.',
        'Olemme pieni, käytännönläheinen tiimi, joka arvostaa selkeää viestintää ja harkittua yhteistyötä. Käytämme aikaa bisneksesi ymmärtämiseen, tuomme ideoita pöytään ja pysymme mukana ensimmäisestä keskustelusta viimeiseen editointiin. Lanseeraatpa jotain uutta tai haluat brändillesi tuoretta energiaa — autamme mielellämme luomaan jotain, jonka ihmiset muistavat.',
      ],
      stats: [
        { value: '2021', label: 'Alkaen' },
        { value: '3', label: 'Maata' },
        { value: 'AI', label: 'Fokus' },
      ],
      cta: 'Tehdään yhteistyötä',
    },
    contact: {
      label: 'Yhteystiedot',
      title: 'Hyvät ideat alkavat',
      titleAccent: 'keskustelulla.',
      subtitle: 'Kerro, mitä sinulla on mielessä. Autamme muotoilemaan seuraavan askeleen.',
      whatsappLabel: 'WhatsApp',
      whatsappCta: 'Viesti WhatsAppissa',
      emailLabel: 'Sähköposti',
      email: 'ridvan@ekiworks.com',
      formTitle: 'Kerro projektistasi',
      formSubtitle: 'Muutama tieto riittää alkuun.',
      name: 'Koko nimi',
      namePlaceholder: 'Nimesi',
      company: 'Yritys',
      companyOptional: 'Yritys (valinnainen)',
      companyPlaceholder: 'Yritys tai brändi',
      emailField: 'Sähköposti',
      emailPlaceholder: 'sina@yritys.com',
      projectType: 'Missä voimme auttaa?',
      projectTypes: ['AI-video', 'Visuaalinen sisältö', 'Verkkosivu', 'Mobiilisovellus', 'Some'],
      message: 'Ideasi',
      messagePlaceholder: 'Mitä haluaisit luoda?',
      send: 'Lähetä kysely',
      privacy: 'Käytämme tietojasi vain kyselyysi vastaamiseen.',
      hqLabel: 'Pääkonttorit',
      hqSubtitle: 'Kolme maata. Yksi tiimi.',
      offices: [
        { city: 'Tallinn', country: 'Viro' },
        { city: 'Wyoming', country: 'Yhdysvallat' },
        { city: 'Ankara', country: 'Turkki' },
      ],
    },
    blog: {
      label: 'Blogi',
      title: 'Muistiinpanoja & ideoita',
      subtitle: 'Ajatuksia luovasta prosessista, AI-sisällöstä ja bränditarinoista.',
      empty: 'Julkaistuja kirjoituksia ei vielä ole.',
      notFound: 'Kirjoitusta ei löytynyt.',
      back: 'Takaisin kaikkiin kirjoituksiin',
      footerLink: 'Blogi',
    },
    lang: {
      label: 'Kieli',
      soon: 'Pian',
    },
  },
  ru: {
    nav: {
      work: 'Видео и визуалы',
      websites: 'Сайты',
      services: 'Услуги',
      about: 'О нас',
      contact: 'Контакты',
      cta: 'Связаться',
    },
    seo: {
      home: {
        title: 'AI-контент агентство',
        description:
          'ekiworks — AI-фильмы, визуалы, сайты и креативный контент для брендов, игр и приложений.',
      },
      work: {
        title: 'Видео и визуалы',
        description:
          'Портфолио ekiworks — короткий формат, кинематографичные фильмы и AI-изображения.',
      },
      websites: {
        title: 'Сайты',
        description:
          'Дизайн сайтов ekiworks — современные, быстрые сайты под бренд и цели.',
      },
      services: {
        title: 'Услуги',
        description:
          'Реклама игр и приложений, AI-ролики, UGC, соцсети, продукт-визуалы, дизайн сайтов, мобильные приложения и ведение соцсетей.',
      },
      about: {
        title: 'О нас',
        description:
          'Об ekiworks — опыт в маркетинге и креативе с 2021 года; AI-видео и соцсети.',
      },
      contact: {
        title: 'Контакты',
        description: 'Свяжитесь с ekiworks — расскажите о проекте, начнём вместе.',
      },
      blog: {
        title: 'Блог',
        description: 'Заметки о креативном процессе, AI-контенте и брендовых историях.',
      },
    },
    hero: {
      label: 'Креативное и digital-агентство',
      titleBefore: 'Превращаем идеи в',
      titleAccent: 'цифровой опыт.',
      titleAfter: '',
      description:
        'AI-видео, выразительные визуалы, сайты и приложения — созданы с вниманием к вашему бренду.',
      explore: 'Смотреть видео и визуалы',
      exploreWebsites: 'Смотреть сайты и приложения',
      showreel: 'Смотреть showreel',
      strip: ['Реклама игр и приложений', 'AI-ролики', 'Сайты', 'Мобильные приложения'],
    },
    portfolio: {
      label: 'Видео и визуалы',
      title: 'Избранные работы',
      subtitle: 'Истории на базе AI. Созданы, чтобы выделяться.',
      viewAll: 'Смотреть все',
      shortTitle: 'Короткий формат',
      filmTitle: 'Кинематографичные фильмы',
    },
    workPage: {
      label: 'Портфолио',
      title: 'Видео и визуалы',
      subtitle: 'Короткие видео, кинематографичные фильмы и AI-изображения.',
      all: 'Все',
      images: 'Изображения',
      empty: 'Пока ничего нет.',
      showMore: 'Показать ещё',
    },
    websitesPage: {
      label: 'Портфолио',
      title: 'Сайты',
      subtitle: 'Современные сайты, которые мы спроектировали для брендов.',
      visit: 'Открыть сайт',
      empty: 'Сайты пока не добавлены.',
    },
    services: {
      label: 'Услуги',
      title: 'Что мы делаем',
      viewAll: 'Все услуги',
      items: [
        {
          title: 'Реклама игр и приложений',
          description:
            'Трейлеры, gameplay-креативы и видео о фичах. Сильные хуки и ясный сторителлинг.',
        },
        {
          title: 'AI-ролики и продукт-видео',
          description:
            'Кинематографичные бренд-фильмы и продукт-видео — от концепции до финального монтажа.',
        },
        {
          title: 'Дизайн сайтов',
          description:
            'Современные быстрые сайты под бренд — ясная структура, сильные визуалы и фокус на конверсию.',
        },
        {
          title: 'Мобильные приложения',
          description:
            'Современные приложения для iOS и Android — понятные интерфейсы и опыт, соответствующий бренду.',
        },
      ],
    },
    servicesPage: {
      label: 'Что мы делаем',
      titleBefore: 'Креативные услуги.',
      titleAccent: 'Под ваш бренд.',
      subtitle:
        'Видео, визуалы, сайты, мобильные приложения и поддержка соцсетей — как единая система.',
      discuss: 'Обсудим проект',
      footerTitle: 'Создадим то, что запомнится.',
      cta: 'Расскажите о проекте',
      items: [
        {
          id: 'game-app-ads',
          title: 'Реклама игр и приложений',
          description:
            'Трейлеры, gameplay-креативы и видео о фичах для игр и приложений. Сильные хуки и ясный сторителлинг, которые дают повод попробовать.',
          details: [
            'Дайте людям причину остановить скролл и узнать, что вы создали. Мы делаем трейлеры, gameplay-монтажи, обзоры фич и рекламные креативы, которые раскрывают привлекательность вашей игры или приложения. Каждая концепция начинается с вопроса: что убедит эту аудиторию попробовать?',
            'От первого хука до финального призыва к действию мы выстраиваем визуал, темп и сообщение вокруг этого ответа. Геймплей, экраны приложения и AI-сцены могут сочетаться в разных подходах — так вы получаете вариации для тестов по аудиториям и размещениям. Мы адаптируем каждое видео под нужные форматы кампании, сохраняя опыт и характер продукта в центре.',
          ],
        },
        {
          id: 'ai-commercials',
          title: 'AI-ролики и продукт-видео',
          description:
            'Кинематографичные бренд-фильмы и продукт-видео — от концепции до финального монтажа. Вдумчивые визуалы, которые оживляют историю и ставят продукт в фокус.',
          details: [
            'Превратите историю бренда в фильм, который хочется смотреть. Мы создаём AI-рекламу и продукт-видео с продуманной концепцией, кинематографичным визуалом и целенаправленным монтажом. Представляете продукт, запускаете кампанию или объясняете, чем вы отличаетесь — строим креатив вокруг ясного сообщения.',
            'Работа включает концепт, сценарий, визуальное направление, создание сцен и финальный монтаж. Мы следим за тем, как выглядит продукт, как передаются преимущества и как каждая сцена работает на историю. Результат — контент, связанный с брендом и готовый к адаптации для рекламы, соцсетей или сайта.',
          ],
        },
        {
          id: 'ai-ugc',
          title: 'AI UGC-видео',
          description:
            'AI-видео в стиле креаторов с естественной подачей и узнаваемыми ситуациями. Презентации продукта, демо и варианты рекламы под вашу аудиторию.',
          details: [
            'Сделайте сообщение ближе с помощью AI-видео в стиле креаторов. Мы развиваем контент вокруг узнаваемых ситуаций, естественной подачи и ясной коммуникации продукта — от коротких презентаций и демо до объясняющих роликов и рекламы «проблема–решение».',
            'Мы формируем сценарий, стиль ведущего, окружение и темп под аудиторию и платформу. Разговорная презентация ухода за кожей требует другого подхода, чем рекомендация мобильной игры или walkthrough приложения. Также создаём альтернативные хуки, сценарии и CTA, чтобы вы могли тестировать разные способы сказать одно и то же. Во всём процессе фокус на убедительной подаче, понятном языке и сообщении, за которым легко следить.',
          ],
        },
        {
          id: 'social-content',
          title: 'Контент для соцсетей',
          description:
            'Reels, Shorts и TikTok для повседневного присутствия бренда. Свежие концепции, цепляющие хуки и единый голос в каналах.',
          details: [
            'Дайте аудитории свежий контент и причину возвращаться. Мы создаём Reels, Shorts, TikTok и поддерживающий соцконтент, который отражает характер бренда и естественно ложится на каждую платформу.',
            'Подход начинается с идей: серии, продукт-споты, обучающие клипы, развлекательные истории и своевременные анонсы. Затем разрабатываем хуки, сценарии, визуалы, подписи и монтаж. AI даёт пространство для ярких сцен и разных креативных направлений, а единый визуальный язык делает контент узнаваемым. Нужны отдельные посты или постоянный поток — помогаем собрать ленту с разнообразием, смыслом и ясным голосом бренда.',
          ],
        },
        {
          id: 'ai-visuals',
          title: 'AI-визуалы и продукт-изображения',
          description:
            'Кастомные продукт-фото, кампанийный артворк и брендовые визуалы. Выразительные изображения для соцсетей, магазинов, сайтов и рекламы.',
          details: [
            'Покажите продукты и идеи в окружении, где они выделяются. Мы создаём кастомные AI-изображения для кампаний, онлайн-магазинов, сайтов и соцсетей — от аккуратно стилизованных продукт-композиций до editorial-сцен и брендового арта.',
            'Каждое изображение начинается с визуального направления вокруг продукта, аудитории и цели использования. Мы учитываем композицию, свет, цвет, материалы и фон для цельного вида. Работая с вашими референсами и ассетами, следим за деталями, которые связывают картинку с брендом. Также можем развивать разные сцены, композиции и соотношения сторон для согласованного набора.',
          ],
        },
        {
          id: 'website-design',
          title: 'Дизайн сайтов',
          description:
            'Современные быстрые сайты под бренд. Ясная структура, сильные визуалы и опыт, который ведёт к действию.',
          details: [
            'Сделайте цифровую витрину бренда ясной, быстрой и запоминающейся. От корпоративных сайтов до продуктовых и кампанийных страниц — проектируем сайты, адаптированные для мобильных устройств, которые отражают идентичность и фокусируются на конверсии.',
            'Процесс включает исследование, информационную архитектуру, визуальное направление, UI-дизайн и готовую к запуску поставку. Важно, чтобы сообщение считывалось сразу, контент оставался читаемым, а сайт хорошо работал на десктопе и мобильном. Можем работать с вашими брендовыми ассетами — или усилить страницы AI-визуалами и контентом.',
          ],
        },
        {
          id: 'mobile-apps',
          title: 'Мобильные приложения',
          description:
            'Современные приложения для iOS и Android. Понятные интерфейсы, продуманные сценарии и опыт, соответствующий бренду.',
          details: [
            'Проектируем и разрабатываем мобильные продукты от идеи до запуска. Уточняем потребности пользователей, создаём простые интерфейсы и поставляем приложения, которые ощущаются цельно на iOS и Android.',
            'Процесс включает исследование, пользовательские сценарии, UI/UX, разработку и готовую к стору поставку. Фокус на производительности, ясности и экранах, ориентированных на конверсию — всегда в языке вашего бренда.',
          ],
        },
        {
          id: 'social-mgmt',
          title: 'Ведение соцсетей',
          description:
            'Настройка аккаунтов, планирование контента, публикация и постоянное управление. Ясная стратегия и стабильное присутствие для связи с аудиторией.',
          details: [
            'Постройте присутствие в соцсетях, которое ощущается активным, организованным и цельным. Помогаем брендам и бизнесам запускать аккаунты, формировать практичное контент-направление и вести регулярную работу, которая держит каналы в движении.',
            'Поддержка включает настройку и оптимизацию профиля, планирование контента, расписание, публикацию и взаимодействие с аудиторией. Мы собираем идеи в ясный календарь, координируем продакшн и поддерживаем единый тон в постах и диалогах. Когда контент выходит, смотрим, что привлекает внимание и как реагирует аудитория — и переносим наблюдения в следующее планирование. Начинаете с нуля или улучшаете текущее присутствие — добавляем структуру и непрерывность.',
          ],
        },
      ],
    },
    feedback: {
      label: 'Отзывы клиентов',
      titleBefore: 'Отличные истории. Ещё лучше',
      titleAccent: 'партнёрства.',
      subtitle: 'Несколько слов о креативном процессе.',
      verified: 'Проверено',
    },
    mediaTags: {
      'Game Ads': 'Реклама игр',
      'Application Ads': 'Реклама приложений',
      UGC: 'UGC',
      'Social Media': 'Соцсети',
      'AI Visuals': 'AI-визуалы',
      Other: 'Другое',
    },
    cta: {
      label: 'Давайте поговорим',
      title: 'Есть идея? Давайте воплотим.',
      button: 'Расскажите нам',
    },
    footer: {
      tagline: 'Креативные идеи. Цепляющие видео и сайты.',
    },
    about: {
      label: 'О нас',
      title: 'Рассказчики с',
      titleAccent: 'деловым чутьём.',
      paragraphs: [
        'Ekiworks объединяет опыт в маркетинге, соцсетях, e-commerce и софте с 2021 года. Наш путь начался в Турции и продолжается офисами в Эстонии и США — соединяя креативное мышление с практичным пониманием бизнеса.',
        'Когда AI-инструменты открыли новые креативные возможности, мы сделали AI-видео и визуальный контент центральной частью работы. Сегодня создаём рекламу, продукт-визуалы, кинематографичные истории, соцконтент и сайты под характер, аудиторию и цели каждого бренда. Также помогаем бизнесам запускать, развивать и вести присутствие в соцсетях.',
        'Годы в digital научили нас, как завоевывать внимание и делать его ценным. Мы внимательно думаем о первом хуке, истории, темпе и о том, что заставляет смотреть дальше или делиться. Приносим это мышление в каждый проект — вместе с готовностью экспериментировать и искать свежие идеи.',
        'Мы небольшая практичная команда, которая ценит ясное общение и вдумчивое сотрудничество. Мы уделяем время пониманию вашего бизнеса, приносим идеи и остаёмся рядом от первого разговора до финального монтажа. Запускаете новое или хотите свежую энергию для бренда — с радостью поможем создать то, что запомнится.',
      ],
      stats: [
        { value: '2021', label: 'С' },
        { value: '3', label: 'Страны' },
        { value: 'AI', label: 'Фокус' },
      ],
      cta: 'Давайте работать вместе',
    },
    contact: {
      label: 'Контакты',
      title: 'Хорошие идеи начинаются с',
      titleAccent: 'разговора.',
      subtitle: 'Расскажите, что у вас на уме. Поможем сформировать следующий шаг.',
      whatsappLabel: 'WhatsApp',
      whatsappCta: 'Написать в WhatsApp',
      emailLabel: 'Email',
      email: 'ridvan@ekiworks.com',
      formTitle: 'Расскажите о проекте',
      formSubtitle: 'Нескольких деталей достаточно, чтобы начать.',
      name: 'Имя',
      namePlaceholder: 'Ваше имя',
      company: 'Компания',
      companyOptional: 'Компания (необязательно)',
      companyPlaceholder: 'Компания или бренд',
      emailField: 'Email',
      emailPlaceholder: 'you@company.com',
      projectType: 'Чем можем помочь?',
      projectTypes: ['AI-видео', 'Визуальный контент', 'Сайт', 'Мобильное приложение', 'Соцсети'],
      message: 'Ваша идея',
      messagePlaceholder: 'Что вы хотите создать?',
      send: 'Отправить запрос',
      privacy: 'Мы используем ваши данные только для ответа на запрос.',
      hqLabel: 'Офисы',
      hqSubtitle: 'Три страны. Одна команда.',
      offices: [
        { city: 'Tallinn', country: 'Эстония' },
        { city: 'Wyoming', country: 'США' },
        { city: 'Ankara', country: 'Турция' },
      ],
    },
    blog: {
      label: 'Блог',
      title: 'Заметки и идеи',
      subtitle: 'Мысли о креативном процессе, AI-контенте и брендовых историях.',
      empty: 'Пока нет опубликованных постов.',
      notFound: 'Пост не найден.',
      back: 'Назад ко всем постам',
      footerLink: 'Блог',
    },
    lang: {
      label: 'Язык',
      soon: 'Скоро',
    },
  },
}

