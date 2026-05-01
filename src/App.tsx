import React, { useState, useRef, useEffect } from 'react';
import { Volume2, VolumeX } from 'lucide-react';

const YANDEX_METRICA_ID = "108995288"; 

const translations = {
  RU: {
    nav: ['Концепция', 'Визуализация', 'Чертежи', 'Прайс', 'Контакты'],
    heroTitleTop: 'ИНТЕРЬЕР', heroTitleBottom: 'АТМОСФЕРА', heroSub: 'Архитектура интерьера и атмосфера',
    stats: [{ label: 'ПРОЕКТОВ', value: '50+' }, { label: 'ГОДА ОПЫТА', value: '3+' }],
    philosophy: 'СОВРЕМЕННАЯ ПЛАТФОРМА ДИЗАЙНА, ОБЪЕДИНЯЮЩАЯ ИНЖЕНЕРНУЮ ТОЧНОСТЬ И ЭСТЕТИКУ ВЫСОКОГО КЛАССА.',
    portfolioTitle: 'ПОРТФОЛИО', 
    pricingTitle: 'ТАРИФЫ',
    pricingPlans: [
      { name: 'МИНИ', price: '600 ₽/м²', desc: 'Обмерный план, планировка' },
      { name: 'СТАНДАРТ', price: '1 800 ₽/м²', desc: 'Концепция, чертежи сетей' },
      { name: 'МАКСИ', price: '2 500 ₽/м²', desc: 'Полный проект, 3D визуализация' }
    ],
    aboutTitle: 'ОБО МНЕ', 
    aboutText: 'Я — ОЛЬГА АБУ ХЕЙБА, ПРОФЕССИОНАЛЬНЫЙ ДИЗАЙНЕР ИНТЕРЬЕРОВ. МОЯ РАБОТА — ЭТО СОЗДАНИЕ АТМОСФЕРЫ, КОТОРАЯ ОТРАЖАЕТ ВАШУ ИНДИВИДУАЛЬНОСТЬ.',
    contactBtn: 'СВЯЗАТЬСЯ С ДИЗАЙНЕРОМ'
  },
  EN: {
    nav: ['Concept', 'Visualization', 'Technical', 'Price', 'Contact'],
    heroTitleTop: 'INTERIOR', heroTitleBottom: 'ATMOSPHERE', heroSub: 'Interior Architecture & Atmosphere',
    stats: [{ label: 'Projects', value: '50+' }, { label: 'Years Exp.', value: '3+' }],
    philosophy: 'A MODERN DESIGN PLATFORM INCORPORATING TECHNICAL PRECISION AND ELITE AESTHETICS.',
    portfolioTitle: 'PORTFOLIO', 
    pricingTitle: 'PRICING',
    pricingPlans: [
      { name: 'MINI', price: '$10/m²', desc: 'Layout, measurements' },
      { name: 'STANDARD', price: '$30/m²', desc: 'Concept, technical sheets' },
      { name: 'MAXI', price: '$45/m²', desc: 'Full design set, 3D visuals' }
    ],
    aboutTitle: 'ABOUT ME', 
    aboutText: 'I AM OLGA ABU HAIBEH, A PROFESSIONAL DESIGNER. MY WORK IS ABOUT CREATING ATMOSPHERES THAT REFLECT YOUR PERSONALITY.',
    contactBtn: 'CONTACT DESIGNER'
  }
};

const projects = [
  { id: '1', title: 'СОБЫТИЕ В ВИНЕ', img: "https://storage.googleapis.com/producer-app-public/producer/96d16483-a0bc-45e5-b62c-ef61e2a50f5b" },
  { id: '2', title: 'ЛОФТ ОФИС', img: "https://storage.googleapis.com/producer-app-public/producer/cfedf59d-b0c9-45ea-b86b-8c182c328194" },
  { id: '3', title: 'МИНИМАЛИЗМ', img: "https://storage.googleapis.com/producer-app-public/producer/8ebe08a0-e28c-48d1-a726-1cd45de1bc64" }
];

export default function App() {
  const [lang, setLang] = useState<'RU' | 'EN'>('RU');
  const [isPlaying, setIsPlaying] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const t = translations[lang];

  const hour = new Date().getHours();
  const isNight = hour >= 21 || hour < 5;

  const theme = {
    bg: hour >= 5 && hour < 10 ? 'bg-[#95a6bb]' : 
        hour >= 10 && hour < 17 ? 'bg-[#5b8fbc]' : 
        hour >= 17 && hour < 21 ? 'bg-[#fee2e2]' : 'bg-[#0f172a]',
    img: hour >= 5 && hour < 10 ? "https://storage.googleapis.com/producer-app-public/producer/87495dc4-ce9b-4541-b793-eeade58fb829" :
         hour >= 10 && hour < 17 ? "https://storage.googleapis.com/producer-app-public/producer/90de8fe9-973c-4024-8549-0723b1c4a8b9" :
         hour >= 17 && hour < 21 ? "https://storage.googleapis.com/producer-app-public/producer/ee083db0-7b32-4806-887c-88866b8b3b33" :
         "https://storage.googleapis.com/producer-app-public/producer/97c1c5fe-1509-440a-82ad-eba3cf75b854"
  };

  return (
    <div className={`min-h-screen ${theme.bg} ${isNight ? 'text-white' : 'text-black'} antialiased`}>
      <link href="https://fonts.googleapis.com/css2?family=Inter:wght@100;300;400;700;900&display=swap" rel="stylesheet" />
      <style>{`
        body { font-family: 'Inter', sans-serif; margin: 0; padding: 0; }
        .nav-link { letter-spacing: 0.25em; text-transform: uppercase; font-size: 11px; font-weight: 600; }
        @keyframes scroll { 0% { transform: translateY(0); } 100% { transform: translateY(-50%); } }
        .animate-scroll { animation: scroll 35s linear infinite; }
        .animate-scroll:hover { animation-play-state: paused; }
      `}</style>
      
      <audio ref={audioRef} loop src="https://storage.googleapis.com/producer-app-public/clips/3be82d58-11e9-4390-974b-5f36fc84a7a7.m4a" crossOrigin="anonymous" />

      {/* Навигация */}
      <nav className={`fixed top-0 w-full z-50 backdrop-blur-xl border-b ${isNight ? 'border-white/10' : 'border-black/5'} px-10 py-6 flex justify-between items-center`}>
        <img 
          src="https://storage.googleapis.com/producer-app-public/producer/9a9edc8e-efa4-489f-add7-df602feaf4d7" 
          className={`h-12 w-auto ${isNight ? 'invert' : ''}`} 
          alt="Logo" 
        />
        <div className="hidden lg:flex gap-10">
          {t.nav.map((item, i) => (
            <span key={i} className="nav-link cursor-pointer hover:opacity-40 transition-opacity">{item}</span>
          ))}
        </div>
        <button onClick={() => setLang(lang === 'RU' ? 'EN' : 'RU')} className="text-[10px] border border-current px-4 py-1 rounded-full font-bold">{lang}</button>
      </nav>

      {/* Главный экран */}
      <section className="relative h-screen flex items-center px-10 lg:px-20 overflow-hidden">
        <img src={theme.img} className="absolute inset-0 w-full h-full object-cover z-0" alt="Hero" />
        <div className={`absolute inset-0 z-10 ${isNight ? 'bg-black/30' : 'bg-white/10'}`} />
        <div className="relative z-20 w-full text-white">
          <p className="text-[10px] uppercase tracking-[0.6em] mb-6 font-bold opacity-80">{t.heroSub}</p>
          <h1 className="text-[15vw] lg:text-[10vw] font-thin leading-[0.8] tracking-tighter uppercase">
            {t.heroTitleTop}<br/><span className="ml-[10vw] font-black">{t.heroTitleBottom}</span>
          </h1>
          <div className="mt-16 flex gap-12 lg:gap-24 items-end justify-between w-full">
            <div className="flex gap-16 lg:gap-24">
               {t.stats.map((s, i) => (
                <div key={i}>
                  <div className="text-6xl lg:text-8xl font-thin tracking-tighter">{s.value}</div>
                  <div className="text-[9px] tracking-[0.3em] opacity-40 uppercase font-bold mt-2">{s.label}</div>
                </div>
               ))}
            </div>
          </div>
        </div>
      </section>

      {/* Философия */}
      <section className="py-40 px-10 text-center max-w-5xl mx-auto">
        <h2 className="text-2xl lg:text-4xl font-light uppercase leading-tight tracking-tight italic opacity-80">{t.philosophy}</h2>
      </section>

      {/* Портфолио (Слайдер) */}
      <section className="py-40 px-10 grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-20">
        <div className="lg:col-span-8 h-[650px] bg-black/10 rounded-[50px] overflow-hidden relative border border-current/10 group">
          <div className="animate-scroll p-10 flex flex-col gap-10">
            {[...projects, ...projects].map((p, i) => (
              <div key={i} className="h-[400px] rounded-[35px] overflow-hidden relative group/item cursor-pointer">
                <img src={p.img} className="w-full h-full object-cover grayscale transition-all duration-1000 group-hover:grayscale-0 scale-105 group-hover:scale-100" alt="P" />
                <div className="absolute inset-0 bg-black/30 group-hover:bg-transparent transition-all" />
                <div className="absolute bottom-10 left-10 text-white"><h3 className="text-3xl font-light uppercase tracking-tighter">{p.title}</h3></div>
              </div>
            ))}
          </div>
          <div className="absolute top-10 left-10 pointer-events-none mix-blend-difference">
            <h2 className="text-white text-5xl font-black uppercase tracking-tighter leading-none">{t.portfolioTitle}</h2>
          </div>
        </div>
        <div className="lg:col-span-4 flex flex-col justify-center">
          <h2 className="text-xl uppercase tracking-[0.3em] mb-8 font-bold border-b border-current/10 pb-4 inline-block">{t.portfolioTitle}</h2>
          <p className="text-[11px] opacity-50 leading-relaxed uppercase tracking-[0.2em] font-light italic">БЕСКОНЕЧНАЯ ЛЕНТА ПРОЕКТОВ. НАВЕДИТЕ, ЧТОБЫ ОСТАНОВИТЬ.</p>
        </div>
      </section>

      {/* Тарифы */}
      <section className="py-40 px-10 bg-white/5">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-7xl lg:text-[10rem] font-black uppercase opacity-5 mb-32 tracking-tighter leading-none">{t.pricingTitle}</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
            {t.pricingPlans.map((p, i) => (
              <div key={i} className={`p-12 rounded-[50px] border transition-all duration-500 flex flex-col justify-between ${i === 1 ? 'bg-current text-white invert' : 'border-current/10 hover:border-current/30'}`}>
                <div>
                  <h3 className="text-2xl font-light uppercase mb-4">{p.name}</h3>
                  <div className="text-5xl font-extralight tracking-tighter mb-12">{p.price}</div>
                  <p className="text-[10px] uppercase opacity-60 mb-10 tracking-widest">{p.desc}</p>
                </div>
                <a href="https://t.me/Ola1ABU" target="_blank" className={`py-5 rounded-full text-[10px] font-black tracking-widest text-center transition-all ${i === 1 ? 'bg-black text-white' : 'bg-white text-black'}`}>ВЫБРАТЬ</a>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Обо мне */}
      <section className="py-40 px-10 lg:px-20 max-w-7xl mx-auto flex flex-col lg:flex-row gap-20 items-center">
        <div className="lg:w-1/2 aspect-[4/5] rounded-[50px] overflow-hidden shadow-2xl border-4 border-current/10 relative group">
          <img src="https://storage.googleapis.com/producer-app-public/producer/6c4aa510-08b0-4299-b51b-0c8fb188ccac" className="w-full h-full object-cover" alt="Designer" />
        </div>
        <div className="lg:w-1/2">
           <h2 className="text-8xl lg:text-9xl font-black uppercase tracking-tighter mb-12 leading-none opacity-90">{t.aboutTitle}</h2>
           <p className="text-xl lg:text-2xl font-extralight uppercase tracking-tight mb-16 leading-tight opacity-70 italic">{t.aboutText}</p>
           <a href="https://t.me/Ola1ABU" target="_blank" className="inline-block bg-current text-white invert px-12 py-5 rounded-full text-[10px] font-black tracking-widest uppercase shadow-xl hover:-translate-y-1 transition-all">{t.contactBtn}</a>
        </div>
      </section>

      {/* Кнопка звука */}
      <button onClick={() => { if(audioRef.current){ isPlaying ? audioRef.current.pause() : audioRef.current.play(); setIsPlaying(!isPlaying); } }}
        className="fixed bottom-10 right-10 z-[60] p-6 rounded-full bg-white/10 backdrop-blur-3xl border border-white/20 flex items-center gap-4 group">
        {isPlaying ? <Volume2 size={20} className="text-white" /> : <VolumeX size={20} className="text-white" />}
        <span className={`text-[10px] font-bold tracking-widest transition-all ${isPlaying ? 'w-24 opacity-100' : 'w-0 opacity-0'} overflow-hidden whitespace-nowrap text-white`}>ON AIR</span>
      </button>
    </div>
  );
}
