import React, { useState, useRef, useEffect } from 'react';

const YANDEX_METRICA_ID = "108995288"; 

const translations = {
  RU: {
    heroTitleTop: 'ИНТЕРЬЕР', heroTitleBottom: 'АТМОСФЕРА', heroSub: 'Архитектура интерьера и атмосфера',
    stats: [{ label: 'ПРОЕКТОВ', value: '50+' }, { label: 'ГОДА ОПЫТА', value: '3+' }],
    philosophy: 'СОВРЕМЕННАЯ ПЛАТФОРМА ДИЗАЙНА, ОБЪЕДИНЯЮЩАЯ ИНЖЕНЕРНУЮ ТОЧНОСТЬ И ЭСТЕТИКУ ВЫСОКОГО КЛАССА.',
    portfolioTitle: 'ПОРТФОЛИО', explore: 'Смотреть проект',
    pricingTitle: 'ТАРИФЫ',
    pricingPlans: [
      { name: 'МИНИ', price: '600 ₽/м²', features: ['Обмерный план', '3 варианта планировки', 'Монтаж/демонтаж'] },
      { name: 'СТАНДАРТ', price: '1 800 ₽/м²', features: ['Все пункты МИНИ', 'Концепция + ИИ референсы', 'Чертежи сетей'] },
      { name: 'МАКСИ', price: '2 500 ₽/м²', features: ['Полный пакет (15+ л)', '3D визуализации', 'Спецификации'] }
    ],
    aboutTitle: 'ОБО МНЕ', aboutText: 'Я — ОЛЬГА АБУ ХЕЙБА, ДИЗАЙНЕР ИНТЕРЬЕРОВ. МОЯ РАБОТА — ЭТО СОЗДАНИЕ АТМОСФЕРЫ, КОТОРАЯ ОТРАЖАЕТ ВАШУ ИНДИВИДУАЛЬНОСТЬ.',
    contactBtn: 'СВЯЗАТЬСЯ С ДИЗАЙНЕРОМ'
  },
  EN: {
    heroTitleTop: 'INTERIOR', heroTitleBottom: 'ATMOSPHERE', heroSub: 'Interior Architecture & Atmosphere',
    stats: [{ label: 'Projects', value: '50+' }, { label: 'Years Exp.', value: '3+' }],
    philosophy: 'A MODERN DESIGN PLATFORM INCORPORATING TECHNICAL PRECISION AND ELITE AESTHETICS.',
    portfolioTitle: 'PORTFOLIO', explore: 'Explore Project',
    pricingTitle: 'PRICING',
    pricingPlans: [
      { name: 'MINI', price: '$10/m²', features: ['Measurements', '3 Layouts', 'Basic plans'] },
      { name: 'STANDARD', price: '$30/m²', features: ['Includes MINI', 'AI References', 'Core sheets'] },
      { name: 'MAXI', price: '$45/m²', features: ['Full technical set', '3D Visuals', 'Spec list'] }
    ],
    aboutTitle: 'ABOUT ME', aboutText: 'I AM OLGA ABU HAIBEH. MY WORK IS ABOUT CREATING ATMOSPHERES THAT REFLECT YOUR PERSONALITY.',
    contactBtn: 'CONTACT DESIGNER'
  }
};

const projects = [
  { id: '1', title: 'Событие в вине', img: "https://storage.googleapis.com/producer-app-public/producer/96d16483-a0bc-45e5-b62c-ef61e2a50f5b" },
  { id: '2', title: 'Лофт офис', img: "https://storage.googleapis.com/producer-app-public/producer/cfedf59d-b0c9-45ea-b86b-8c182c328194" },
  { id: '3', title: 'Минимализм', img: "https://storage.googleapis.com/producer-app-public/producer/8ebe08a0-e28c-48d1-a726-1cd45de1bc64" }
];

export default function App() {
  const [lang, setLang] = useState('RU');
  const [isPlaying, setIsPlaying] = useState(false);
  const audioRef = useRef<HTMLAudioElement>(null);
  const t = translations[lang === 'RU' ? 'RU' : 'EN'];

  // Динамическая тема (точно как в Space)
  const hour = new Date().getHours();
  const theme = {
    bg: hour >= 5 && hour < 10 ? 'bg-[#95a6bb]' : hour >= 10 && hour < 17 ? 'bg-[#5b8fbc]' : hour >= 17 && hour < 21 ? 'bg-[#fee2e2]' : 'bg-[#0f172a]',
    img: hour >= 5 && hour < 10 ? "https://storage.googleapis.com/producer-app-public/producer/87495dc4-ce9b-4541-b793-eeade58fb829" :
         hour >= 10 && hour < 17 ? "https://storage.googleapis.com/producer-app-public/producer/90de8fe9-973c-4024-8549-0723b1c4a8b9" :
         hour >= 17 && hour < 21 ? "https://storage.googleapis.com/producer-app-public/producer/ee083db0-7b32-4806-887c-88866b8b3b33" :
         "https://storage.googleapis.com/producer-app-public/producer/97c1c5fe-1509-440a-82ad-eba3cf75b854"
  };
  const isNight = hour >= 21 || hour < 5;

  return (
    <div className={`min-h-screen ${theme.bg} ${isNight ? 'text-white' : 'text-neutral-900'} transition-all duration-1000`}>
      <link href="https://fonts.googleapis.com/css2?family=Inter:wght@100;300;900&display=swap" rel="stylesheet" />
      <style>{`
        body { font-family: 'Inter', sans-serif; margin: 0; }
        @keyframes scroll { 0% { transform: translateY(0); } 100% { transform: translateY(-50%); } }
        .animate-scroll { animation: scroll 35s linear infinite; }
      `}</style>
      
      <audio ref={audioRef} loop src="https://storage.googleapis.com/producer-app-public/clips/3be82d58-11e9-4390-974b-5f36fc84a7a7.m4a" crossOrigin="anonymous" />

      {/* Навигация с вашим логотипом */}
      <nav className="fixed top-0 w-full z-50 backdrop-blur-md px-10 py-5 flex justify-between items-center border-b border-current/10">
        <img src="https://storage.googleapis.com/producer-app-public/producer/9a9edc8e-efa4-489f-add7-df602feaf4d7" 
             className={`h-10 ${isNight ? 'invert' : ''}`} alt="OLGA ABU" />
        <button onClick={() => setLang(lang === 'RU' ? 'EN' : 'RU')} className="text-[10px] border border-current/20 px-4 py-1 rounded-full font-bold">{lang}</button>
      </nav>

      {/* Hero */}
      <section className="relative h-screen flex items-center px-10 lg:px-20 overflow-hidden">
        <img src={theme.img} className="absolute inset-0 w-full h-full object-cover z-0" alt="Hero" />
        <div className="absolute inset-0 bg-black/20 z-10" />
        <div className="relative z-20 text-white w-full">
          <p className="text-[10px] uppercase tracking-[0.5em] mb-4">{t.heroSub}</p>
          <h1 className="text-[14vw] lg:text-[10vw] font-thin leading-[0.8] tracking-tighter uppercase">
            {t.heroTitleTop}<br/><span className="ml-[10vw] font-normal">{t.heroTitleBottom}</span>
          </h1>
          <div className="mt-12 flex gap-12 lg:gap-20">
            {t.stats.map((s, i) => (
              <div key={i}><div className="text-5xl lg:text-7xl font-thin">{s.value}</div><div className="text-[8px] tracking-widest opacity-60 uppercase font-bold">{s.label}</div></div>
            ))}
          </div>
        </div>
      </section>

      {/* Philosophy */}
      <section className="py-32 px-10 text-center max-w-5xl mx-auto">
        <h2 className="text-2xl lg:text-4xl font-light uppercase leading-tight tracking-tight italic opacity-80">{t.philosophy}</h2>
      </section>

      {/* Portfolio */}
      <section className="py-32 px-10 grid grid-cols-1 lg:grid-cols-12 gap-10">
        <div className="lg:col-span-8 h-[600px] bg-black/5 rounded-[40px] overflow-hidden relative border border-current/10">
          <div className="animate-scroll p-8 flex flex-col gap-8">
            {[...projects, ...projects].map((p, i) => (
              <div key={i} className="h-[400px] rounded-[30px] overflow-hidden relative group cursor-pointer">
                <img src={p.img} className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-700" alt="Work" />
                <div className="absolute bottom-8 left-8 text-white"><h3 className="text-3xl font-light uppercase tracking-tighter">{p.title}</h3></div>
              </div>
            ))}
          </div>
        </div>
        <div className="lg:col-span-4 flex flex-col justify-center">
          <h2 className="text-xl uppercase tracking-widest mb-6 border-b border-current/10 pb-4 inline-block">{t.portfolioTitle}</h2>
          <p className="text-[10px] opacity-50 leading-relaxed uppercase tracking-widest">{lang === 'RU' ? 'Бесконечная лента проектов. Наведите, чтобы остановить.' : 'Infinite scroll. Hover to pause.'}</p>
        </div>
      </section>

      {/* About */}
      <section className="py-32 px-10">
        <div className={`rounded-[60px] p-10 lg:p-20 flex flex-col lg:flex-row gap-20 items-center border border-current/5 ${isNight ? 'bg-white/5' : 'bg-black/5'}`}>
          <div className="lg:w-1/2 aspect-[3/4] rounded-[40px] overflow-hidden shadow-2xl border-4 border-current/10">
            <img src="https://storage.googleapis.com/producer-app-public/producer/6c4aa510-08b0-4299-b51b-0c8fb188ccac" className="w-full h-full object-cover" alt="Olga" />
          </div>
          <div className="lg:w-1/2">
            <h2 className="text-7xl lg:text-9xl font-black uppercase tracking-tighter mb-12 leading-none">{t.aboutTitle}</h2>
            <p className="text-xl lg:text-2xl font-light uppercase tracking-tight mb-12 opacity-80">{t.aboutText}</p>
            <a href="https://t.me/Ola1ABU" target="_blank" className="inline-block bg-current text-white invert px-12 py-5 rounded-full text-[10px] font-bold tracking-widest uppercase">{t.contactBtn}</a>
          </div>
        </div>
      </section>

      {/* Audio Button */}
      <button onClick={() => { if(audioRef.current){ isPlaying ? audioRef.current.pause() : audioRef.current.play(); setIsPlaying(!isPlaying); } }}
        className="fixed bottom-10 right-10 z-[60] p-5 rounded-full bg-white/10 backdrop-blur-xl border border-white/20 flex items-center gap-3">
        <span className="text-lg">{isPlaying ? '🔊' : '🔇'}</span>
        <span className={`text-[9px] font-bold tracking-widest transition-all ${isPlaying ? 'w-16 opacity-100' : 'w-0 opacity-0'} overflow-hidden whitespace-nowrap text-white`}>ON AIR</span>
      </button>
    </div>
  );
}