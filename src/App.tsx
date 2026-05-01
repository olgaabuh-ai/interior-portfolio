import React, { useState, useRef, useEffect } from 'react';
2import { Volume2, VolumeX } from 'lucide-react';
3
4// Analytics Config
5const YANDEX_METRICA_ID = "108995288"; 
6
7const translations = {
8  RU: {
9    seoTitle: 'Ольга Абу Хейба — Дизайн интерьера и архитектурная атмосфера',
10    seoDesc: 'Профессиональный дизайн интерьеров в Москве и по всему миру. Аутентичные офисы, современные квартиры и премиальные решения от Ольги Абу Хейба.',
11    nav: ['Концепция', 'Визуализация', 'Чертежи', 'Прайс', 'Контакты'],
12    // ... rest stays same
13    heroTitleTop: 'ИНТЕРЬЕР',
14    heroTitleBottom: 'АТМОСФЕРА',
15    stats: [
16      { label: 'ПРОЕКТОВ', value: '50+' },
17      { label: 'ГОДА ОПЫТА', value: '3+' }
18    ],
19    philosophy: 'СОВРЕМЕННАЯ ПЛАТФОРМА ДИЗАЙНА, ОБЪЕДИНЯЮЩАЯ ИНЖЕНЕРНУЮ ТОЧНОСТЬ И ЭСТЕТИКУ ВЫСОКОГО КЛАССА.',
20    services: [
21      { id: '01', title: 'КОНЦЕПЦИЯ', desc: 'Разработка уникальной идеи пространства.' },
22      { id: '02', title: 'ВИЗУАЛИЗАЦИЯ', desc: 'Фотореалистичное погружение в будущий дом.' },
23      { id: '03', title: 'ЧЕРТЕЖИ', desc: 'Техническая документация для реализации.' }
24    ],
25    whyUs: 'ОБО МНЕ',
26    portfolioTitle: 'ПОРТФОЛИО',
27    portfolioDesc: 'Бесконечная лента наших последних проектов в области архитектуры интерьера. Наведите, чтобы остановить и изучить детали.',
28    selectedWorks: 'ИЗБРАННЫЕ\nРАБОТЫ',
29    explore: 'Смотреть проект',
30    pricingTitle: 'ТАРИФЫ',
31    pricingPlans: [
32      {
33        name: 'МИНИ',
34        price: '600 ₽/м²',
35        features: ['Обмерный план', '3 варианта планировочного решения', 'План монтажа', 'План демонтажа'],
36        cta: 'ВЫБРАТЬ ПЛАН'
37      },
38      {
39        name: 'СТАНДАРТ',
40        price: '1 800 ₽/м²',
41        features: [
42          'Все пункты "МИНИ"',
43          'Концепция + подбор материалов + ИИ референсы',
44          'Основные чертежи по электрике и сантехнике (5+ листов)'
45        ],
46        cta: 'ПОПУЛЯРНЫЙ'
47      },
48      {
49        name: 'МАКСИ',
50        price: '2 500 ₽/м²',
51        features: [
52          'Все пункты "МИНИ" и "СТАНДАРТ"',
53          'Полный пакет чертежей (15+ листов)',
54          'Фотореалистичные 3D визуализации',
55          'Развертки всех стен',
56          'Спецификации оборудования'
57        ],
58        cta: 'ПРЕМИУМ'
59      }
60    ],
61    caseStudy: 'КЕЙС',
62    residential: 'Жилые',
63    commercial: 'Коммерческие',
64    hospitality: 'Отели и рестораны',
65    aboutExpertise: 'О моей работе',
66    expertiseDesc: 'Я — Ольга Абу Хейба, профессиональный дизайнер интерьеров, предлагаю полный спектр услуг для создания уникальных и функциональных пространств. Моя работа — это не просто дизайн, это создание атмосферы, которая отражает вашу индивидуальность.'
67  },
68  EN: {
69    nav: ['Concept', 'Visualization', 'Blueprints', 'Price', 'Contact'],
70    heroTitleTop: 'INTERIOR',
71    heroTitleBottom: 'ATMOSPHERE',
72    stats: [
73      { label: 'Projects', value: '50+' },
74      { label: 'Years Exp.', value: '3+' }
75    ],
76    philosophy: 'A MODERN DESIGN PLATFORM INCORPORATING ADVANCED TECHNICAL TOOLS AND ELITE AESTHETIC EXPERTISE.',
77    services: [
78      { id: '01', title: 'CONCEPT', desc: 'Developing a unique spatial idea.' },
79      { id: '02', title: 'VISUALIZATION', desc: 'Photorealistic immersion into your future home.' },
80      { id: '03', title: 'TECHNICAL', desc: 'Detailed blueprints for construction.' }
81    ],
82    whyUs: 'ABOUT ME',
83    portfolioTitle: 'PORTFOLIO',
84    portfolioDesc: 'Infinite scroll of our latest interior architecture projects. Hover to pause and explore the details.',
85    selectedWorks: 'SELECTED\nWORKS',
86    explore: 'Explore Project',
87    pricingTitle: 'PRICING',
88    pricingPlans: [
89      {
90        name: 'MINI',
91        price: '$10/m²',
92        features: ['Measurements', '3 Layout solutions', 'Mounting plan', 'Demolition plan'],
93        cta: 'SELECT PLAN'
94      },
95      {
96        name: 'STANDARD',
97        price: '$30/m²',
98        features: [
99          'Includes MINI',
100          'Concept + Materials + AI References',
101          'Key electric & plumbing plans (5+ sheets)'
102        ],
103        cta: 'MOST POPULAR'
104      },
105      {
106        name: 'MAXI',
107        price: '$45/m²',
108        features: [
109          'Includes MINI & STANDARD',
110          'Full technical package (15+ sheets)',
111          'Photorealistic 3D visualisations',
112          'Wall elevations for all rooms',
113          'Equipment specifications'
114        ],
115        cta: 'PREMIUM'
116      }
117    ],
118    caseStudy: 'CASE STUDY',
119    residential: 'Residential',
120    commercial: 'Commercial',
121    hospitality: 'Hospitality',
122    aboutExpertise: 'About my work',
123    expertiseDesc: 'I am Olga Abu Haibeh, a professional interior designer offering a full range of services for creating unique and functional spaces.'
124  }
125};
126
127export default function ModernistPortfolio() {
128  const [lang, setLang] = useState<'RU' | 'EN'>('RU');
129  const [showProject, setShowProject] = useState(false);
130  const t = translations[lang];
131
132  const projects = [
133    {
134      id: 'event-in-wine',
135      titleRU: 'Событие в вине',
136      titleEN: 'Event in Wine',
137      image: "https://storage.googleapis.com/producer-app-public/producer/96d16483-a0bc-45e5-b62c-ef61e2a50f5b",
138      images: [
139        "https://storage.googleapis.com/producer-app-public/producer/96d16483-a0bc-45e5-b62c-ef61e2a50f5b",
140        "https://storage.googleapis.com/producer-app-public/producer/8b5d58db-995c-4f9f-88fb-30614a17f377",
141        "https://storage.googleapis.com/producer-app-public/producer/dcad3c80-1b11-4b53-a291-582b54c662dd",
142        "https://storage.googleapis.com/producer-app-public/producer/83525572-c68e-48fe-8093-aea9ac37ed2d",
143        "https://storage.googleapis.com/producer-app-public/producer/867b78d5-a06e-448d-a9a9-53ea48d0a036",
144        "https://storage.googleapis.com/producer-app-public/producer/ae1aae4f-3169-494f-84ff-580ef2e39db5"
145      ],
146      conceptPDF: null,
147      tourURL: "https://olgaabuh1.github.io/Melior/",
148      blueprintsPDF: null
149    },
150    {
151      id: 'authentic-loft-office',
152      titleRU: 'Аутентичный лофт офис',
153      titleEN: 'Authentic Loft Office',
154      image: "https://storage.googleapis.com/producer-app-public/producer/cfedf59d-b0c9-45ea-b86b-8c182c328194",
155      images: [
156        "https://storage.googleapis.com/producer-app-public/producer/9217f68a-8af3-4e76-be6e-9cd90897a5ec",
157        "https://storage.googleapis.com/producer-app-public/producer/a244dc0f-25c5-4703-bdfe-6d20cb88b62f",
158        "https://storage.googleapis.com/producer-app-public/producer/f85159f8-c48e-45b7-b0cb-54b0e3f82c05",
159        "https://storage.googleapis.com/producer-app-public/producer/96073ddd-b4f5-42d6-abfe-1b85064732ba",
160        "https://storage.googleapis.com/producer-app-public/producer/cfedf59d-b0c9-45ea-b86b-8c182c328194",
161        "https://storage.googleapis.com/producer-app-public/producer/f7662ea9-be03-4a88-a38a-2ba40b4dbc8e",
162        "https://storage.googleapis.com/producer-app-public/producer/2cf704b8-645f-4fe5-a07f-a977423a95ec",
163        "https://storage.googleapis.com/producer-app-public/producer/5253219c-1024-41e5-bb56-6085fcc23981",
164        "https://storage.googleapis.com/producer-app-public/producer/16f3b201-995f-4688-84e9-fa21f64c0494"
165      ],
166      conceptPDF: "https://drive.google.com/file/d/1VKJc4B1KjkiWobqHVSSY6fFIG_m192zv/view?usp=sharing",
167      tourURL: "https://olgaabuh1.github.io/Olimpic_office/",
168      blueprintsPDF: null
169    },
170    {
171      id: 'soul-minimalism',
172      titleRU: 'Минимализм с душой',
173      titleEN: 'Minimalism with Soul',
174      image: "https://storage.googleapis.com/producer-app-public/producer/8ebe08a0-e28c-48d1-a726-1cd45de1bc64",
175      images: [
176        "https://storage.googleapis.com/producer-app-public/producer/aba72f0e-c582-4f9f-9488-0a9db552be68",
177        "https://storage.googleapis.com/producer-app-public/producer/6ad5548d-a74e-4090-9d5e-04f0435cbba6",
178        "https://storage.googleapis.com/producer-app-public/producer/ae8eb924-3eaf-42e0-bbf6-a7ed5b6d17b4",
179        "https://storage.googleapis.com/producer-app-public/producer/24aecfcf-ecbd-46e2-b25d-302f67e27557",
180        "https://storage.googleapis.com/producer-app-public/producer/034cab74-5f79-4c2e-9468-4784b53600e3",
181        "https://storage.googleapis.com/producer-app-public/producer/8ebe08a0-e28c-48d1-a726-1cd45de1bc64",
182        "https://storage.googleapis.com/producer-app-public/producer/8afa279b-9799-4593-8bfd-3661fdb71a9f",
183        "https://storage.googleapis.com/producer-app-public/producer/22be2fac-bba5-4d5d-a7d6-c7474a841940"
184      ],
185      conceptPDF: "https://drive.google.com/file/d/1JDxiQUwIt0oaizvl6uV3dygz5p6Ji-0F/view?usp=sharing",
186      blueprintsPDF: "https://drive.google.com/file/d/1vmhwuCYFbQCqEjaZFZk8PD3ccn3AR5F3/view?usp=sharing"
187    },
188    {
189      id: 'warm-geometry',
190      titleRU: 'Теплая геометрия',
191      titleEN: 'Warm Geometry',
192      image: "https://storage.googleapis.com/producer-app-public/producer/a2eb1dc3-e86d-4ebd-b575-322e8d5c63f2",
193      images: [
194        "https://storage.googleapis.com/producer-app-public/producer/a2eb1dc3-e86d-4ebd-b575-322e8d5c63f2",
195        "https://storage.googleapis.com/producer-app-public/producer/16551c2b-b471-4992-ae04-df0eca766956",
196        "https://storage.googleapis.com/producer-app-public/producer/22a83468-ab52-4ccb-bf0a-9bd30d2a7e48",
197        "https://storage.googleapis.com/producer-app-public/producer/14fd2e1d-49a8-4b79-9c85-f813153eaed3",
198        "https://storage.googleapis.com/producer-app-public/producer/d76cc011-2b66-423c-a659-6604cba64944",
199        "https://storage.googleapis.com/producer-app-public/producer/ef17813d-3b67-4d04-a5fb-92e5801566d8",
200        "https://storage.googleapis.com/producer-app-public/producer/84c92b0e-9299-4fad-89a4-0d611f1879ce"
201      ],
202      conceptPDF: null,
203      blueprintsPDF: "https://drive.google.com/file/d/1NfyCb-XCANRJeJFgG-8wecThoihtuesF/view?usp=sharing"
204    }
205  ];
206
207  const [activeProject, setActiveProject] = useState(null);
208  const [hoveredService, setHoveredService] = useState('02');
209  const [isPlaying, setIsPlaying] = useState(false);
210  const audioRef = useRef<HTMLAudioElement | null>(null);
211
212  const toggleAudio = () => {
213    if (audioRef.current) {
214      if (isPlaying) {
215        audioRef.current.pause();
216      } else {
217        audioRef.current.play().catch(e => console.log("Autoplay blocked, user interaction needed"));
218      }
219      setIsPlaying(!isPlaying);
220    }
221  };
222
223  const serviceShowcase = {
224    '01': {
225      title: 'КОНЦЕПЦИЯ',
226      imagesDesktop: [
227        "https://storage.googleapis.com/producer-app-public/producer/227a18e1-4dbc-4aea-bd58-a2fcd2fdb9b6",
228        "https://storage.googleapis.com/producer-app-public/producer/e2d21bd8-0531-4682-9253-79152a72a956",
229        "https://storage.googleapis.com/producer-app-public/producer/9505e285-78da-44d6-8564-121151c702eb"
230      ],
231      imagesMobile: [
232        "https://storage.googleapis.com/producer-app-public/producer/b2a66d19-3d42-4e77-a655-aa6fde86b251",
233        "https://storage.googleapis.com/producer-app-public/producer/3c134d76-0cb2-40de-b98c-a41a06184e8a",
234        "https://storage.googleapis.com/producer-app-public/producer/c08a4900-b96f-40af-8e78-a833d2f4dcb0"
235      ]
236    },
237    '02': {
238      title: 'ВИЗУАЛИЗАЦИЯ',
239      images: [
240        "https://storage.googleapis.com/producer-app-public/producer/407e173a-3205-4425-b01e-3e548bae863c",
241        "https://storage.googleapis.com/producer-app-public/producer/239297ff-abf4-45dc-9966-ea141bad4f47",
242        "https://storage.googleapis.com/producer-app-public/producer/8ebe08a0-e28c-48d1-a726-1cd45de1bc64",
243        "https://storage.googleapis.com/producer-app-public/producer/6ad5548d-a74e-4090-9d5e-04f0435cbba6"
244      ]
245    },
246    '03': {
247      title: 'ЧЕРТЕЖИ',
248      images: [
249        "https://storage.googleapis.com/producer-app-public/producer/f405b57e-ee33-4813-ab55-0c67f197b62a",
250        "https://storage.googleapis.com/producer-app-public/producer/6c10a584-4633-429a-8423-d8aa4f08d9e8",
251        "https://storage.googleapis.com/producer-app-public/producer/ae1c3e77-692f-4d11-bb95-704690d0c5a7",
252        "https://storage.googleapis.com/producer-app-public/producer/999a20e2-0c87-4ee9-a78d-b06f5784040c"
253      ]
254    }
255  };
256
257  const [currentSlide, setCurrentSlide] = useState(0);
258
259  // Auto-slide effect for the showcase
260  useEffect(() => {
261    const service = serviceShowcase[hoveredService as keyof typeof serviceShowcase];
262    const images = 'imagesDesktop' in service ? service.imagesDesktop : service.images;
263    const imagesCount = images.length;
264    const timer = setInterval(() => {
265      setCurrentSlide(prev => (prev + 1) % imagesCount);
266    }, 4000);
267    return () => clearInterval(timer);
268  }, [hoveredService]);
269
270  // Dynamic image and background color logic based on current hour
271  const getDynamicTheme = () => {
272    const hour = new Date().getHours();
273    if (hour >= 5 && hour < 10) {
274      return {
275        image: "https://storage.googleapis.com/producer-app-public/producer/87495dc4-ce9b-4541-b793-eeade58fb829",
276        bg: "bg-[#95a6bb]" // Updated early morning color as requested
277      };
278    }
279    if (hour >= 10 && hour < 17) {
280      return {
281        image: "https://storage.googleapis.com/producer-app-public/producer/90de8fe9-973c-4024-8549-0723b1c4a8b9",
282        bg: "bg-[#5b8fbc]" // Updated daytime color
283      };
284    }
285    if (hour >= 17 && hour < 21) {
286      return {
287        image: "https://storage.googleapis.com/producer-app-public/producer/ee083db0-7b32-4806-887c-88866b8b3b33",
288        bg: "bg-[#fee2e2]" // Soft warm sunset/pink for evening
289      };
290    }
291    return {
292      image: "https://storage.googleapis.com/producer-app-public/producer/97c1c5fe-1509-440a-82ad-eba3cf75b854",
293      bg: "bg-[#0f172a]" // Deep navy/blue for night
294    };
295  };
296
297  const theme = getDynamicTheme();
298  const heroImage = theme.image;
299  const isNight = new Date().getHours() >= 21 || new Date().getHours() < 5;
300
301  const carouselImages = [
302    "https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?q=80&w=800",
303    "https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?q=80&w=800",
304    "https://images.unsplash.com/photo-1617104424032-b9bd6972d0e4?q=80&w=800",
305    "https://images.unsplash.com/photo-1631679706909-1844bbd07221?q=80&w=800",
306    "https://images.unsplash.com/photo-1616137422495-1e9e46e2aa77?q=80&w=800",
307  ];
308
309  // Yandex Metrica Initialization
310  useEffect(() => {
311    if (typeof window !== 'undefined' && YANDEX_METRICA_ID) {
312      const id = parseInt(YANDEX_METRICA_ID);
313      (function(m,e,t,r,i,k,a){m[i]=m[i]||function(){(m[i].a=m[i].a||[]).push(arguments)};
314      // @ts-ignore
315      m[i].l=1*new Date();
316      for (var j = 0; j < document.scripts.length; j++) {if (document.scripts[j].src === r) { return; }}
317      // @ts-ignore
318      k=e.createElement(t),a=e.getElementsByTagName(t)[0],k.async=1,k.src=r,a.parentNode.insertBefore(k,a)})
319      (window, document, "script", "https://mc.yandex.ru/metrika/tag.js", "ym");
320
321      // @ts-ignore
322      window.ym(id, "init", {
323        clickmap:true,
324        trackLinks:true,
325        accurateTrackBounce:true,
326        webvisor:true,
327        ecommerce:"dataLayer"
328      });
329    }
330  }, []);
331
332  return (
333    <div className={`min-h-screen ${theme.bg} ${isNight ? 'text-white' : 'text-[#1a1a1a]'} transition-colors duration-1000 selection:bg-black selection:text-white pb-20 font-light tracking-tight`} style={{ fontFamily: 'system-ui, -apple-system, sans-serif' }}>
334      {/* SEO & Meta Tags */}
335      <style>{`
336        /* SEO Helper - hidden but readable by bots */
337        .seo-hidden { position: absolute; left: -9999px; top: auto; width: 1px; height: 1px; overflow: hidden; }
338      `}</style>
339      <div className="seo-hidden">
340        <h1>{t.seoTitle || 'Olga Abu Haibeh Interior Design'}</h1>
341        <p>{t.seoDesc}</p>
342      </div>
343      <style>{`
344        @keyframes vertical-scroll {
345          0% { transform: translateY(0); }
346          100% { transform: translateY(-50%); }
347        }
348        .animate-vertical-scroll {
349          animation: vertical-scroll 30s linear infinite;
350        }
351        .animate-vertical-scroll:hover {
352          animation-play-state: paused;
353        }
354        .custom-scrollbar::-webkit-scrollbar {
355          width: 2px;
356        }
357        .custom-scrollbar::-webkit-scrollbar-track {
358          background: transparent;
359        }
360        .custom-scrollbar::-webkit-scrollbar-thumb {
361          background: currentColor;
362          border-radius: 10px;
363          opacity: 0.2;
364        }
365      `}</style>
366      {/* Audio Player */}
367      <audio 
368        ref={audioRef} 
369        src="https://storage.googleapis.com/producer-app-public/clips/3be82d58-11e9-4390-974b-5f36fc84a7a7.m4a" 
370        loop 
371        crossOrigin="anonymous"
372      />
373      
374      {/* Audio Control Floating Button */}
375      <div className="fixed bottom-8 right-8 z-[60]">
376        <button 
377          onClick={toggleAudio}
378          className={`p-4 rounded-full backdrop-blur-xl border transition-all duration-500 flex items-center gap-3 group ${
379            isPlaying ? 'bg-white/20 border-white/40' : 'bg-black/20 border-black/10'
380          }`}
381        >
382          <div className="relative">
383            {isPlaying ? <Volume2 size={16} className="text-white" /> : <VolumeX size={16} className={isNight ? 'text-white' : 'text-black'} />}
384          </div>
385          <span className={`text-[9px] uppercase tracking-[0.3em] font-bold overflow-hidden transition-all duration-500 whitespace-nowrap ${
386            isPlaying ? 'w-16 opacity-100' : 'w-0 opacity-0'
387          } ${isNight ? 'text-white' : 'text-black'}`}>
388            ON AIR
389          </span>
390        </button>
391      </div>
392
393      {/* Top Header Bar */}
394      <nav className={`w-full flex justify-between items-center px-10 py-6 border-b ${isNight ? 'border-white/10' : 'border-black/10'} text-[11px] uppercase tracking-[0.2em] font-light ${theme.bg}/80 backdrop-blur-md sticky top-0 z-50`}>
395        <div className="h-16 cursor-pointer flex items-center" onClick={() => setShowProject(false)}>
396          <img 
397            src="https://storage.googleapis.com/producer-app-public/producer/9a9edc8e-efa4-489f-add7-df602feaf4d7" 
398            alt="Olga Abu Haibeh Logo" 
399            className={`h-full w-auto object-contain transition-all duration-500 ${isNight ? 'brightness-0 invert' : 'brightness-0'}`}
400          />
401        </div>
402        <div className="hidden lg:flex gap-10">
403          <button 
404            onClick={() => document.getElementById('ПОРТФОЛИО')?.scrollIntoView({ behavior: 'smooth' })} 
405            className="hover:opacity-40 transition-opacity uppercase tracking-[0.2em]"
406          >
407            {lang === 'RU' ? 'Проекты' : 'Projects'}
408          </button>
409          <button 
410            onClick={() => { setHoveredService('01'); document.getElementById('СЕРВИСЫ')?.scrollIntoView({ behavior: 'smooth' }); }} 
411            className="hover:opacity-40 transition-opacity uppercase tracking-[0.2em]"
412          >
413            {t.nav[0]}
414          </button>
415          <button 
416            onClick={() => { setHoveredService('02'); document.getElementById('СЕРВИСЫ')?.scrollIntoView({ behavior: 'smooth' }); }} 
417            className="hover:opacity-40 transition-opacity uppercase tracking-[0.2em]"
418          >
419            {t.nav[1]}
420          </button>
421          <button 
422            onClick={() => { setHoveredService('03'); document.getElementById('СЕРВИСЫ')?.scrollIntoView({ behavior: 'smooth' }); }} 
423            className="hover:opacity-40 transition-opacity uppercase tracking-[0.2em]"
424          >
425            {t.nav[2]}
426          </button>
427          <a href="#ТАРИФЫ" className="hover:opacity-40 transition-opacity uppercase tracking-[0.2em]">{t.nav[3]}</a>
428          <a href="https://t.me/Ola1ABU" target="_blank" rel="noopener noreferrer" className="hover:opacity-40 transition-opacity uppercase tracking-[0.2em]">{t.nav[4]}</a>
429        </div>
430        <div className="flex gap-6 items-center">
431          <button onClick={() => setLang(lang === 'RU' ? 'EN' : 'RU')} className="opacity-60 hover:opacity-100 transition-opacity text-[10px]">
432            {lang}
433          </button>
434        </div>
435      </nav>
436
437      {/* Hero Section */}
438      <section className="relative min-h-[85vh] lg:min-h-[95vh] flex flex-col justify-between overflow-hidden">
439        {/* Background Image */}
440        <div className="absolute inset-0 z-0 bg-[#1c1917]">
441          <img 
442            src={heroImage} 
443            className="w-full h-full object-cover transition-all duration-1000"
444            style={{ filter: 'none', WebkitFilter: 'none' }}
445            alt="Interior Atmosphere"
446          />
447          {/* Subtle gradient for text readability, no grayscale */}
448          <div className="absolute inset-0 bg-gradient-to-b from-black/20 via-transparent to-black/60 lg:from-black/10 lg:to-black/30 pointer-events-none"></div>
449        </div>
450
451        <div className="px-6 lg:px-10 py-12 lg:py-16 relative z-20 w-full flex flex-col lg:flex-row justify-between items-start text-white h-full grow">
452          <div className="lg:w-2/3 mt-12 lg:mt-0 mb-12 lg:mb-0">
453             <div className="text-[10px] uppercase tracking-[0.4em] mb-4 lg:mb-12 opacity-100 text-white font-medium">Архитектура интерьера и атмосфера</div>
454             <h1 className="text-[15vw] lg:text-[10vw] leading-[0.85] font-extralight tracking-tighter uppercase">
455               {t.heroTitleTop}<br/>
456               <span className="ml-[10vw] lg:ml-[15vw]">{t.heroTitleBottom}</span>
457             </h1>
458             <div className="mt-8 lg:mt-12">
459                <a 
460                  href="https://t.me/Ola1ABU" 
461                  target="_blank" 
462                  rel="noopener noreferrer"
463                  className="inline-block bg-white text-black px-8 lg:px-10 py-3 lg:py-4 rounded-full text-[10px] uppercase tracking-[0.3em] font-bold hover:bg-neutral-200 transition-all shadow-lg text-center"
464                >
465                  {lang === 'RU' ? 'Связаться с дизайнером' : 'Contact Designer'}
466                </a>
467             </div>
468          </div>
469          
470          <div className="w-full lg:w-1/3 flex justify-start lg:justify-end gap-12 lg:gap-16 text-left lg:text-right">
471            {t.stats.map(stat => (
472              <div key={stat.label} className="flex flex-col items-start lg:items-end">
473                <div className="text-5xl lg:text-6xl font-extralight mb-1 leading-none">{stat.value}</div>
474                <div className="text-[8px] uppercase tracking-[0.3em] opacity-80 whitespace-nowrap">{stat.label}</div>
475              </div>
476            ))}
477          </div>
478        </div>
479      </section>
480
481      {/* Project Detail Modal Overlay */}
482      {showProject && (
483        <div className={`fixed inset-0 z-[100] overflow-y-auto ${isNight ? 'bg-[#0f172a]' : 'bg-[#f8fafc]'} animate-in fade-in duration-500`}>
484          <div className="max-w-7xl mx-auto px-6 lg:px-10 py-12 lg:py-20">
485            <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center mb-12 lg:mb-20 gap-8">
486              <h2 className="text-3xl lg:text-5xl font-extralight tracking-tighter uppercase">{lang === 'RU' ? (activeProject?.titleRU || 'Проект') : (activeProject?.titleEN || 'Project')} <span className="opacity-30">/ {lang === 'RU' ? 'Детали проекта' : 'Project Details'}</span></h2>
487              <button 
488                onClick={() => setShowProject(false)}
489                className="text-[10px] uppercase tracking-[0.4em] border border-current px-8 py-3 rounded-full hover:bg-current hover:text-white transition-all order-first lg:order-last self-end lg:self-auto"
490                style={{ color: isNight ? 'white' : 'black' }}
491              >
492                {lang === 'RU' ? 'Закрыть' : 'Close'}
493              </button>
494            </div>
495
496            {activeProject ? (
497              <div className="space-y-40">
498                {/* Concept */}
499                <section id="project-concept">
500                  <div className="text-[10px] uppercase tracking-[0.4em] mb-8 opacity-40">{lang === 'RU' ? '01 Концепция' : '01 Concept'}</div>
501                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-end">
502                    <h3 className="text-4xl lg:text-6xl font-extralight tracking-tight leading-none uppercase">
503                      {lang === 'RU' 
504                        ? (activeProject.id === 'warm-geometry' ? 'Геометрический баланс и мягкое освещение.' : activeProject.id === 'authentic-loft-office' ? 'Индустриальный шик и комфорт современного офиса.' : activeProject.id === 'event-in-wine' ? 'Элегантный интерьер и винная эстетика.' : 'Минимализм, вдохновленный природными текстурами и светом.') 
505                        : (activeProject.id === 'warm-geometry' ? 'Geometric balance and soft lighting.' : activeProject.id === 'authentic-loft-office' ? 'Industrial chic and modern office comfort.' : activeProject.id === 'event-in-wine' ? 'Elegant interior and wine aesthetics.' : 'Minimalism inspired by natural textures and light.')}
506                    </h3>
507                    <div className="flex flex-col gap-6">
508                      <p className="text-sm uppercase tracking-widest opacity-60 leading-loose">
509                        {lang === 'RU'
510                          ? (activeProject.id === 'warm-geometry' ? 'Сочетание строгих линий и теплых оттенков дерева создает уютное, но современное пространство для жизни.' : activeProject.id === 'authentic-loft-office' ? 'Проект объединяет в себе брутальность лофта с индустриальным аутентичным стилем, изысканными деталями отделки, создавая вдохновляющую рабочую атмосферу.' : activeProject.id === 'event-in-wine' ? 'Элегантный интерьер, вдохновленный глубокими винными оттенками и эстетикой ар-деко. Пространство, где каждая деталь подчеркивает статус и вкус владельца.' : 'Проект нацелен на создание бесшовного пространства, где функциональность скрыта за эстетикой чистоты. Мы использовали натуральный камень, шпон дуба и сложные сценарии освещения.')
511                          : (activeProject.id === 'warm-geometry' ? 'The combination of sharp lines and warm wood tones creates a cozy yet modern living space.' : activeProject.id === 'authentic-loft-office' ? 'The project combines loft brutality with an industrial authentic style and refined finishing details, creating an inspiring work atmosphere.' : activeProject.id === 'event-in-wine' ? 'An elegant interior inspired by deep wine tones and Art Deco aesthetics. A space where every detail emphasizes the owner\'s status and taste.' : 'The project aims to create a seamless space where functionality is hidden behind an aesthetic of purity. We used natural stone, oak veneer, and complex lighting scenarios.')}
512                      </p>
513                      <div className="flex flex-wrap gap-8">
514                        {activeProject.conceptPDF && (
515                          <a 
516                            href={activeProject.conceptPDF} 
517                            target="_blank" 
518                            rel="noopener noreferrer"
519                            className="inline-flex items-center gap-4 text-[10px] uppercase tracking-[0.3em] font-bold border-b border-current pb-2 self-start hover:opacity-50 transition-opacity"
520                          >
521                            <span>{lang === 'RU' ? 'Смотреть PDF концепции' : 'View Concept PDF'}</span>
522                            <span className="text-lg">↗</span>
523                          </a>
524                        )}
525                        {activeProject.tourURL && (
526                          <a 
527                            href={activeProject.tourURL} 
528                            target="_blank" 
529                            rel="noopener noreferrer"
530                            className="inline-flex items-center gap-4 text-[10px] uppercase tracking-[0.3em] font-bold border-b border-current pb-2 self-start hover:opacity-50 transition-opacity"
531                          >
532                            <span>{lang === 'RU' ? 'Смотреть 3D ТУР' : 'View 3D TOUR'}</span>
533                            <span className="text-lg">↗</span>
534                          </a>
535                        )}
536                      </div>
537                    </div>
538                  </div>
539                </section>
540
541                {/* Visualization Gallery */}
542                <section id="project-viz">
543                  <div className="text-[10px] uppercase tracking-[0.4em] mb-8 opacity-40">{lang === 'RU' ? '02 Визуализация' : '02 Visualization'}</div>
544                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
545                     {activeProject.images?.map((src, i) => (
546                       <div key={i} className={`overflow-hidden rounded-2xl group bg-neutral-900 ${i % 3 === 0 ? 'md:col-span-2 aspect-video' : 'aspect-square'}`}>
547                          <img 
548                            src={src} 
549                            className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105" 
550                            alt={`Viz ${i}`}
551                          />
552                       </div>
553                     ))}
554                  </div>
555                </section>
556
557                {/* Blueprints */}
558                <section id="project-drawings" className="pb-20">
559                  <div className="text-[10px] uppercase tracking-[0.4em] mb-8 opacity-40">{lang === 'RU' ? '03 Чертежи' : '03 Blueprints'}</div>
560                  <div className={`p-16 rounded-[40px] border ${isNight ? 'border-white/10' : 'border-black/5'} flex flex-col items-center justify-center text-center gap-6`}>
561                     <div className="w-20 h-20 rounded-full border border-dashed border-current animate-spin-slow flex items-center justify-center opacity-30">
562                       <span className="text-xs">DWG</span>
563                     </div>
564                     <h4 className="text-2xl font-light uppercase tracking-widest">
565                       {lang === 'RU' ? 'Техническая документация проекта' : 'Project technical documentation'}
566                     </h4>
567                     {activeProject.blueprintsPDF && (
568                       <a 
569                          href={activeProject.blueprintsPDF} 
570                          target="_blank" 
571                          rel="noopener noreferrer"
572                          className={`mt-4 px-10 py-4 rounded-full text-[10px] uppercase tracking-[0.3em] font-bold transition-all ${isNight ? 'bg-white text-black hover:bg-neutral-200' : 'bg-black text-white hover:bg-neutral-800'}`}
573                        >
574                          {lang === 'RU' ? 'Открыть альбом чертежей' : 'Open Blueprints Album'}
575                        </a>
576                     )}
577                  </div>
578                </section>
579              </div>
580            ) : (
581              <div className="h-[60vh] flex items-center justify-center">
582                <p className="text-xl uppercase tracking-widest opacity-30 italic">{lang === 'RU' ? 'Контент проекта скоро появится' : 'Project content coming soon'}</p>
583              </div>
584            )}
585          </div>
586        </div>
587      )}
588
589      {/* Philosophy Text */}
590      <section id="КОНЦЕПЦИЯ" className="px-6 lg:px-10 py-16 lg:py-32 text-center max-w-5xl mx-auto scroll-mt-24">
591        <h2 className={`text-2xl md:text-5xl font-extralight uppercase leading-tight tracking-tight ${isNight ? 'text-white' : 'text-neutral-800'}`}>
592          {t.philosophy}
593        </h2>
594      </section>
595
596      {/* Vertical Carousel Works Section */}
597      <section id="ПОРТФОЛИО" className="px-6 grid grid-cols-1 lg:grid-cols-12 gap-6 mt-10 lg:mt-20 scroll-mt-24">
598        <div className="lg:col-span-8 bg-black rounded-[40px] h-[600px] overflow-hidden relative border border-white/5">
599           <div className="absolute inset-0 z-10 pointer-events-none bg-gradient-to-b from-black via-transparent to-black opacity-60"></div>
600           
601           <div className="flex flex-col gap-6 animate-vertical-scroll p-6">
602             {/* Double the array for seamless infinite scroll */}
603             {[...projects, ...projects].map((project, idx) => (
604               <div key={idx} className="w-full h-[400px] flex-shrink-0 rounded-[30px] overflow-hidden group relative">
605                 <img src={project.image} className="w-full h-full object-cover grayscale lg:group-hover:grayscale-0 transition-all duration-700 scale-105 group-hover:scale-100 lg:block hidden" alt={project.titleRU} />
606                 <img src={project.image} className="w-full h-full object-cover lg:hidden block" alt={project.titleRU} />
607                 <div className="absolute inset-0 bg-black/20 lg:group-hover:bg-transparent transition-colors"></div>
608                 
609                 {/* Title Overlay for mobile and desktop */}
610                 <div className="absolute top-8 left-8 text-white lg:opacity-0 lg:group-hover:opacity-100 transition-opacity translate-y-[-10px] lg:group-hover:translate-y-0 duration-500">
611                    <h5 className="text-2xl font-extralight uppercase tracking-tighter">{lang === 'RU' ? project.titleRU : project.titleEN}</h5>
612                 </div>
613
614                 {/* Clickable Action */}
615                 <div 
616                   className="absolute inset-0 z-30 cursor-pointer flex items-end p-8"
617                   onClick={(e) => { 
618                     e.stopPropagation();
619                     setActiveProject(project); 
620                     setShowProject(true); 
621                   }}
622                 >
623                    <span className="text-[10px] uppercase tracking-widest font-bold bg-white/20 backdrop-blur-md px-6 py-3 rounded-full text-white lg:opacity-0 lg:group-hover:opacity-100 transition-all transform lg:translate-y-4 lg:group-hover:translate-y-0">
624                      {t.explore || 'Explore'}
625                    </span>
626                 </div>
627               </div>
628             ))}
629           </div>
630
631           <div className="absolute top-12 left-12 z-20">
632             <h4 className="text-white text-5xl font-black uppercase tracking-tighter leading-none mix-blend-difference whitespace-pre-line">{t.selectedWorks || 'Selected\nWorks'}</h4>
633           </div>
634        </div>
635
636        <div className="lg:col-span-4 flex flex-col gap-4">
637          <div className={`p-8 rounded-3xl h-full flex flex-col justify-between transition-all border ${isNight ? 'border-white/10' : 'border-black/5'} ${isNight ? 'bg-white/5' : 'bg-white/40'}`}>
638            <h3 className="text-xl font-light uppercase tracking-[0.2em]">{t.portfolioTitle || 'Portfolio'}</h3>
639            <p className="text-[11px] uppercase tracking-[0.2em] opacity-50 leading-relaxed font-light mt-4">
640              {t.portfolioDesc}
641            </p>
642            <div className="mt-12 h-[1px] w-full bg-current opacity-10"></div>
643            <div className="mt-6 flex flex-col gap-4 max-h-[280px] overflow-y-auto pr-2 custom-scrollbar">
644               {projects.map((project) => (
645                 <div 
646                   key={project.id} 
647                   className="flex items-center gap-4 group cursor-pointer"
648                   onClick={() => { setActiveProject(project); setShowProject(true); }}
649                 >
650                   <div className="w-10 h-10 rounded-lg overflow-hidden flex-shrink-0 border border-current/10">
651                     <img src={project.image} className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all" alt={project.titleRU} />
652                   </div>
653                   <div className="flex flex-col">
654                     <span className="text-[10px] uppercase tracking-widest font-medium group-hover:opacity-60 transition-opacity">
655                       {lang === 'RU' ? project.titleRU : project.titleEN}
656                     </span>
657                     <span className="text-[8px] uppercase tracking-[0.2em] opacity-40">
658                       {lang === 'RU' ? 'Смотреть детали' : 'View details'}
659                     </span>
660                   </div>
661                 </div>
662               ))}
663            </div>
664          </div>
665        </div>
666      </section>
667
668      {/* Grid Services Section */}
669      <section id="СЕРВИСЫ" className="px-6 grid grid-cols-1 lg:grid-cols-12 gap-6 mt-12 lg:mt-20 scroll-mt-24">
670        {/* Desktop Layout - Left Side (Visible only on LG) */}
671        <div className="hidden lg:flex lg:col-span-4 flex-col gap-4">
672          {t.services.map((s, i) => (
673            <div 
674              key={s.id} 
675              onMouseEnter={() => { setHoveredService(s.id); setCurrentSlide(0); }}
676              className={`p-8 rounded-3xl transition-all duration-500 border cursor-pointer group ${
677                hoveredService === s.id 
678                ? (isNight ? 'bg-white text-black border-white' : 'bg-black text-white border-black') 
679                : (isNight ? 'bg-white/5 border-white/10' : 'bg-white/40 border-black/5')
680              }`}
681            >
682              <div className="flex justify-between items-start mb-16">
683                <span className={`text-[9px] font-light tracking-[0.4em] transition-opacity ${hoveredService === s.id ? 'opacity-100' : 'opacity-40'}`}>{s.id}</span>
684                <span className={`text-lg font-extralight transition-transform duration-500 ${hoveredService === s.id ? 'translate-x-2' : ''}`}>→</span>
685              </div>
686              <h3 className="text-xl font-light uppercase tracking-[0.2em] mb-2">{s.title}</h3>
687              <p className={`text-[9px] uppercase tracking-[0.2em] transition-opacity duration-500 leading-relaxed font-light ${hoveredService === s.id ? 'opacity-100' : 'opacity-50'}`}>
688                {s.desc}
689              </p>
690            </div>
691          ))}
692        </div>
693
694        {/* Image Display Area */}
695        <div 
696          className="lg:col-span-8 bg-black rounded-[40px] overflow-hidden relative border-4 border-white/10 group h-[350px] lg:h-auto order-first lg:order-last"
697        >
698           {Object.entries(serviceShowcase).map(([id, data]) => {
699             const desktopImages = 'imagesDesktop' in data ? data.imagesDesktop : data.images;
700             const mobileImages = 'imagesMobile' in data ? data.imagesMobile : data.images;
701             
702             return (
703               <div 
704                  key={id}
705                  className={`absolute inset-0 transition-opacity duration-700 ${
706                    hoveredService === id ? 'opacity-100 z-10' : 'opacity-0 z-0'
707                  }`}
708               >
709                 {/* Desktop Image */}
710                 <img 
711                  src={desktopImages[currentSlide % desktopImages.length]} 
712                  className="hidden md:block w-full h-full object-cover lg:grayscale transition-all duration-1000 lg:group-hover:grayscale-0"
713                  alt={data.title}
714                />
715                {/* Mobile Image */}
716                <img 
717                  src={mobileImages[currentSlide % mobileImages.length]} 
718                  className="block md:hidden w-full h-full object-cover"
719                  alt={data.title}
720                />
721                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent pointer-events-none"></div>
722                <div className="absolute bottom-10 left-10 text-white pointer-events-none">
723                  <div className="text-[10px] uppercase tracking-[0.4em] mb-2 opacity-60 font-bold">{data.title}</div>
724                </div>
725               </div>
726             );
727           })}
728           
729           <div className="absolute top-10 right-10 flex gap-2">
730              {(() => {
731                const activeData = serviceShowcase[hoveredService as keyof typeof serviceShowcase];
732                const imagesToDot = 'imagesDesktop' in activeData ? activeData.imagesDesktop : activeData.images;
733                return imagesToDot.map((_, idx) => (
734                  <div key={idx} className={`h-1 w-6 rounded-full transition-all duration-500 ${currentSlide % imagesToDot.length === idx ? 'bg-white w-10' : 'bg-white/20'}`}></div>
735                ));
736              })()}
737           </div>
738        </div>
739
740        {/* Mobile Tabs Layout - Below Image (Visible only on Mobile/Tablet) */}
741        <div className="lg:hidden flex flex-col gap-3 mt-4">
742           {t.services.map((s) => (
743             <button 
744               key={s.id}
745               onClick={() => { setHoveredService(s.id); setCurrentSlide(0); }}
746               className={`w-full p-5 rounded-2xl flex items-center justify-between border transition-all ${
747                 hoveredService === s.id 
748                 ? (isNight ? 'bg-white text-black border-white' : 'bg-black text-white border-black') 
749                 : (isNight ? 'bg-white/5 border-white/10' : 'bg-black/5 border-black/5')
750               }`}
751             >
752               <div className="flex flex-col items-start gap-1">
753                 <span className="text-[8px] tracking-[0.3em] opacity-40">{s.id}</span>
754                 <span className="text-sm font-light uppercase tracking-[0.1em]">{s.title}</span>
755               </div>
756               <span className={`text-xs transition-transform ${hoveredService === s.id ? 'rotate-90' : ''}`}>→</span>
757             </button>
758           ))}
759        </div>
760      </section>
761
762      {/* Pricing Section */}
763      <section id="ТАРИФЫ" className="px-6 lg:px-10 py-12 lg:py-20 scroll-mt-24 min-h-screen flex flex-col justify-center">
764        <div className="max-w-7xl mx-auto">
765          <div className="flex flex-col lg:flex-row justify-between items-end mb-12 gap-8">
766            <h2 className="text-6xl lg:text-9xl font-black uppercase tracking-tighter leading-none opacity-20">{t.pricingTitle}</h2>
767            <div className="text-[10px] uppercase tracking-[0.4em] opacity-60 mb-4">{lang === 'RU' ? 'Гибкие решения под ваши задачи' : 'Flexible solutions for your needs'}</div>
768          </div>
769          
770          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
771            {t.pricingPlans.map((plan, i) => (
772              <div 
773                key={i} 
774                className={`p-10 rounded-[40px] border transition-all duration-500 flex flex-col justify-between group ${
775                  i === 1 
776                  ? (isNight ? 'bg-white text-black border-white' : 'bg-black text-white border-black scale-105 shadow-2xl z-10') 
777                  : (isNight ? 'bg-white/5 border-white/10 hover:border-white/30' : 'bg-white/40 border-black/5 hover:border-black/20')
778                }`}
779              >
780                <div>
781                  <h3 className="text-2xl font-light uppercase tracking-widest mb-2">{plan.name}</h3>
782                  <div className="text-4xl font-extralight tracking-tighter mb-10">{plan.price}</div>
783                  <ul className="space-y-4">
784                    {plan.features.map((feature, idx) => (
785                      <li key={idx} className="flex items-start gap-3 text-[10px] uppercase tracking-widest opacity-70 leading-tight">
786                        <span className="text-lg mt-[-4px]">◇</span>
787                        <span>{feature}</span>
788                      </li>
789                    ))}
790                  </ul>
791                </div>
792                
793                <a 
794                  href="https://t.me/Ola1ABU" 
795                  target="_blank" 
796                  rel="noopener noreferrer"
797                  className={`mt-16 py-5 rounded-full text-[10px] uppercase tracking-[0.4em] font-bold text-center transition-all ${
798                    i === 1 
799                    ? (isNight ? 'bg-black text-white hover:bg-neutral-800' : 'bg-white text-black hover:bg-neutral-200') 
800                    : (isNight ? 'bg-white/10 text-white hover:bg-white/20' : 'bg-black/5 text-black hover:bg-black/10')
801                  }`}
802                >
803                  {plan.cta}
804                </a>
805              </div>
806            ))}
807          </div>
808        </div>
809      </section>
810
811      {/* About Me Section */}
812      <section className="px-6 mt-12 lg:mt-20">
813        <div className="bg-[#b4b8bf] rounded-[50px] p-8 lg:p-20 flex flex-col gap-12">
814           <div className="flex flex-col lg:flex-row justify-between items-start gap-12">
815             <h3 className="text-6xl lg:text-8xl font-black uppercase tracking-tighter leading-none">{t.whyUs}</h3>
816             <div className="max-w-2xl">
817               <p className="text-lg lg:text-xl font-medium uppercase tracking-tight mb-6">
818                 {lang === 'RU' 
819                  ? 'Я — Ольга Абу Хейба, профессиональный дизайнер интерьеров, предлагаю полный спектр услуг для создания уникальных и функциональных пространств как для частных клиентов, так и для коммерческих объектов.'
820                  : 'I am Olga Abu Haibeh, a professional interior designer, offering a full range of services for creating unique and functional spaces.'}
821               </p>
822               <p className="text-sm uppercase tracking-widest opacity-70 leading-relaxed mb-8">
823                 {lang === 'RU'
824                  ? 'Моя работа — это не просто дизайн, это создание атмосферы, которая отражает вашу индивидуальность и усиливает идентичность вашего бренда.'
825                  : 'My work is not just design, it is the creation of an atmosphere that reflects your individuality and strengthens your brand identity.'}
826               </p>
827               
828               <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-12 border-t border-black/10 pt-12">
829                 {[
830                   {
831                     ru: "Я формирую концептуальный дизайн, который не только радует глаз, но и создает комфорт и уют.",
832                     en: "I create conceptual designs that are not only pleasing to the eye but also provide comfort and coziness."
833                   },
834                   {
835                     ru: "Мои проекты становятся инструментом для инвестиций и помогают выделиться на фоне конкурентов.",
836                     en: "My projects become investment tools and help you stand out from the competition."
837                   },
838                   {
839                     ru: "Успешно работаю удаленно, что позволяет мне сотрудничать с клиентами из разных уголков мира.",
840                     en: "I successfully work remotely, allowing me to collaborate with clients from all over the world."
841                   }
842                 ].map((item, i) => (
843                   <div key={i} className="flex flex-col gap-4">
844                     <div className="text-xl font-medium">◇</div>
845                     <p className="text-[10px] uppercase font-bold tracking-wider leading-relaxed opacity-80">
846                       {lang === 'RU' ? item.ru : item.en}
847                     </p>
848                   </div>
849                 ))}
850               </div>
851             </div>
852             
853             <div className="w-full lg:w-1/3 aspect-[3/4] rounded-[40px] overflow-hidden border-4 border-white/20 shadow-2xl">
854               <img 
855                 src="https://storage.googleapis.com/producer-app-public/producer/6c4aa510-08b0-4299-b51b-0c8fb188ccac" 
856                 className="w-full h-full object-cover" 
857                 alt="Ольга Абу Хейба" 
858               />
859             </div>
860           </div>
861
862           <div className="flex justify-center lg:justify-end border-t border-black/10 pt-12">
863             <a 
864                href="https://t.me/Ola1ABU" 
865                target="_blank" 
866                rel="noopener noreferrer"
867                className="bg-black text-white px-12 py-5 rounded-full text-[11px] uppercase tracking-[0.3em] font-bold hover:bg-neutral-800 transition-all shadow-xl text-center w-full sm:w-auto"
868              >
869                {lang === 'RU' ? 'Связаться с дизайнером' : 'Contact Designer'}
870              </a>
871           </div>
872        </div>
873      </section>
874    </div>
875  );
876}
