import React, { useState, useRef, useEffect } from 'react';
import { Volume2, VolumeX } from 'lucide-react';

const YANDEX_METRICA_ID = "108995288"; 

const translations = {
  RU: {
    nav: ['Концепция', 'Визуализация', 'Чертежи', 'Прайс', 'Контакты'],
    heroTitleTop: 'ИНТЕРЬЕР', heroTitleBottom: 'АТМОСФЕРА', heroSub: 'Архитектура интерьера и атмосфера',
    stats: [{ label: 'ПРОЕКТОВ', value: '50+' }, { label: 'ГОДА ОПЫТА', value: '3+' }],
    contactBtn: 'СВЯЗАТЬСЯ С ДИЗАЙНЕРОМ', portfolioTitle: 'ПОРТФОЛИО',
    aboutTitle: 'ОБО МНЕ', aboutText: 'Я — ОЛЬГА АБУ ХЕЙБА, ПРОФЕССИОНАЛЬНЫЙ ДИЗАЙНЕР ИНТЕРЬЕРОВ. МОЯ РАБОТА — ЭТО СОЗДАНИЕ АТМОСФЕРЫ.'
  },
  EN: {
    nav: ['Concept', 'Visualization', 'Technical', 'Price', 'Contact'],
    heroTitleTop: 'INTERIOR', heroTitleBottom: 'ATMOSPHERE', heroSub: 'Interior Architecture & Atmosphere',
    stats: [{ label: 'Projects', value: '50+' }, { label: 'Years Exp.', value: '3+' }],
    contactBtn: 'CONTACT DESIGNER', portfolioTitle: 'PORTFOLIO',
    aboutTitle: 'ABOUT ME', aboutText: 'I AM OLGA ABU HAIBEH, A PROFESSIONAL DESIGNER. MY WORK IS CREATING ATMOSPHERE.'
  }
};

export default function App() {
  const [lang, setLang] = useState<'RU' | 'EN'>('RU');
  const [isPlaying, setIsPlaying] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const t = translations[lang];

  const hour = new Date().getHours();
  const isNight = hour >= 21 || hour < 5;
  const theme = {
    bg: hour >= 5 && hour < 10 ? 'bg-[#95a6bb]' : hour >= 10 && hour < 17 ? 'bg-[#5b8fbc]' : hour >= 17 && hour < 21 ? 'bg-[#fee2e2]' : 'bg-[#0f172a]',
    img: hour >= 5 && hour < 10 ? "https://storage.googleapis.com/producer-app-public/producer/87495dc4-ce9b-4541-b793-eeade58fb829" :
         hour >= 10 && hour < 17 ? "https://storage.googleapis.com/producer-app-public/producer/90de8fe9-973c-4024-8549-0723b1c4a8b9" :
         "https://storage.googleapis.com/producer-app-public/producer/ee083db0-7b32-4806-887c-88866b8b3b33" :
         "https://storage.googleapis.com/producer-app-public/producer/97c1c5fe-1509-440a-82ad-eba3cf75b854"
  };

  return (
    <div className={`min-h-screen ${theme.bg} ${isNight ? 'text-white' : 'text-black'} antialiased selection:bg-black selection:text-white`}>
      <link href="https://fonts.googleapis.com/css2?family=Inter:wght@100;300;400;700;900&display=swap" rel="stylesheet" />
      <style>{`
        body { font-family: 'Inter', sans-serif; margin: 0; }
        .nav-link { letter-spacing: 0.25em; text-transform: uppercase; font-size: 11px; font-weight: 500; }
        .hero-title { line-height: 0.8; letter-spacing: -0.04em; }
      `}</style>
      
      <audio ref={audioRef} loop src="https://storage.googleapis.com/producer-app-public/clips/3be82d58-11e9-4390-974b-5f36fc84a7a7.m4a" crossOrigin="anonymous" />

      {/* Шапка (Навигация) */}
      <nav className={`fixed top-0 w-full z-50 backdrop-blur-xl border-b ${isNight ? 'border-white/10' : 'border-black/5'} px-10 py-6 flex justify-between items-center`}>
        <img 
          src="https://storage.googleapis.com/producer-app-public/producer/9a9edc8e-efa4-489f-add7-df602feaf4d7" 
          className={`h-12 w-auto ${isNight ? 'invert' : ''}`} // Лого крупнее и подстраивается под время
          alt="Logo" 
        />
        <div className="hidden lg:flex gap-10">
          {t.nav.map((item, i) => (
            <span key={i} className="nav-link cursor-pointer hover:opacity-50 transition-opacity">{item}</span>
          ))}
        </div>
        <button onClick={() => setLang(lang === 'RU' ? 'EN' : 'RU')} className="text-[10px] border border-current px-4 py-1 rounded-full font-bold uppercase tracking-widest">{lang}</button>
      </nav>

      {/* Главный экран */}
      <section className="relative h-screen flex items-center px-10 lg:px-20 overflow-hidden">
        {/* Картинка без серого фильтра */}
        <img src={theme.img} className="absolute inset-0 w-full h-full object-cover z-0 opacity-100" alt="Hero" />
        <div className={`absolute inset-0 z-10 ${isNight ? 'bg-black/40' : 'bg-white/10'}`} />
        
        <div className={`relative z-20 w-full ${isNight ? 'text-white' : 'text-white' /* Текст на картинке всегда белый для контраста */}`}>
          <p className="text-[10px] uppercase tracking-[0.5em] mb-6 opacity-80 font-bold">{t.heroSub}</p>
          <h1 className="hero-title text-[15vw] lg:text-[11vw] font-light uppercase">
            {t.heroTitleTop}<br/><span className="ml-[10vw] font-black">{t.heroTitleBottom}</span>
          </h1>
          
          <div className="mt-20 flex justify-between items-end w-full">
            <div className="flex gap-16 lg:gap-24">
              {t.stats.map((s, i) => (
                <div key={i}>
                  <div className="text-6xl lg:text-8xl font-thin tracking-tighter leading-none">{s.value}</div>
                  <div className="text-[9px] tracking-[0.4em] opacity-60 uppercase font-bold mt-2">{s.label}</div>
                </div>
              ))}
            </div>
            <a href="https://t.me/Ola1ABU" target="_blank" className="hidden lg:block bg-white text-black px-12 py-5 rounded-full text-[10px] font-black tracking-widest uppercase hover:bg-neutral-200 transition-all shadow-2xl mb-4">
               {t.contactBtn}
            </a>
          </div>
        </div>
      </section>

      {/* Обо мне (улучшенный блок) */}
      <section className="py-40 px-10 lg:px-20 max-w-7xl mx-auto flex flex-col lg:flex-row gap-20 items-center">
        <div className="lg:w-1/2 aspect-[4/5] rounded-[50px] overflow-hidden shadow-2xl border-4 border-current/10 relative group">
          <img src="https://storage.googleapis.com/producer-app-public/producer/6c4aa510-08b0-4299-b51b-0c8fb188ccac" className="w-full h-full object-cover" alt="Olga" />
        </div>
        <div className="lg:w-1/2">
           <h2 className="text-8xl lg:text-9xl font-black uppercase tracking-tighter mb-12 leading-none">{t.aboutTitle}</h2>
           <p className="text-xl lg:text-3xl font-light uppercase tracking-tight mb-16 leading-tight opacity-80 italic">{t.aboutText}</p>
           <a href="https://t.me/Ola1ABU" target="_blank" className="inline-block bg-current text-white invert px-12 py-5 rounded-full text-[10px] font-black tracking-[0.4em] uppercase shadow-xl">
             {t.contactBtn}
           </a>
        </div>
      </section>

      {/* Звук */}
      <button onClick={() => { if(audioRef.current){ isPlaying ? audioRef.current.pause() : audioRef.current.play(); setIsPlaying(!isPlaying); } }}
        className="fixed bottom-10 right-10 z-[60] p-6 rounded-full bg-white/10 backdrop-blur-3xl border border-white/20 flex items-center gap-4 group">
        {isPlaying ? <Volume2 size={20} className="text-white" /> : <VolumeX size={20} className="text-white" />}
        <span className={`text-[10px] font-bold tracking-widest transition-all ${isPlaying ? 'w-24 opacity-100' : 'w-0 opacity-0'} overflow-hidden whitespace-nowrap text-white`}>ON AIR</span>
      </button>
    </div>
  );
}
