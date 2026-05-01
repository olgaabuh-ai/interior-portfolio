import React, { useState, useRef, useEffect } from 'react';

const translations = {
  RU: {
    heroTop: 'ИНТЕРЬЕР', heroBottom: 'АТМОСФЕРА', heroSub: 'Архитектура интерьера и атмосфера',
    stats: [{ label: 'ПРОЕКТОВ', value: '50+' }, { label: 'ГОДА ОПЫТА', value: '3+' }],
    portfolioTitle: 'ПОРТФОЛИО', pricingTitle: 'ТАРИФЫ',
    aboutTitle: 'ОБО МНЕ', contactBtn: 'СВЯЗАТЬСЯ С ДИЗАЙНЕРОМ'
  },
  EN: {
    heroTop: 'INTERIOR', heroBottom: 'ATMOSPHERE', heroSub: 'Interior Architecture & Atmosphere',
    stats: [{ label: 'Projects', value: '50+' }, { label: 'Years Exp.', value: '3+' }],
    portfolioTitle: 'PORTFOLIO', pricingTitle: 'PRICING',
    aboutTitle: 'ABOUT ME', contactBtn: 'CONTACT DESIGNER'
  }
};

export default function App() {
  const [lang, setLang] = useState('RU');
  const [isPlaying, setIsPlaying] = useState(false);
  const audioRef = useRef<HTMLAudioElement>(null);
  const t = translations[lang === 'RU' ? 'RU' : 'EN'];

  const hour = new Date().getHours();
  const isNight = hour >= 21 || hour < 5;
  const theme = {
    bg: isNight ? '#0f172a' : '#95a6bb',
    img: isNight ? "https://storage.googleapis.com/producer-app-public/producer/97c1c5fe-1509-440a-82ad-eba3cf75b854" : "https://storage.googleapis.com/producer-app-public/producer/90de8fe9-973c-4024-8549-0723b1c4a8b9"
  };

  return (
    <div style={{ backgroundColor: theme.bg, color: 'white', minHeight: '100-vh', fontFamily: '"Inter", sans-serif' }}>
      <link href="https://fonts.googleapis.com/css2?family=Inter:wght@100;400;900&display=swap" rel="stylesheet" />
      <style>{`
        @keyframes scroll { 0% { transform: translateY(0); } 100% { transform: translateY(-50%); } }
        .animate-scroll { animation: scroll 35s linear infinite; }
      `}</style>

      <audio ref={audioRef} loop src="https://storage.googleapis.com/producer-app-public/clips/3be82d58-11e9-4390-974b-5f36fc84a7a7.m4a" crossOrigin="anonymous" />

      {/* Header */}
      <nav className="fixed top-0 w-full z-50 backdrop-blur-md border-b border-white/10 px-10 py-5 flex justify-between items-center">
        <img src="https://storage.googleapis.com/producer-app-public/producer/9a9edc8e-efa4-489f-add7-df602feaf4d7" className="h-10 invert" alt="Logo" />
        <button onClick={() => setLang(lang === 'RU' ? 'EN' : 'RU')} className="text-[10px] border border-white/30 px-4 py-1 rounded-full font-bold">{lang}</button>
      </nav>

      {/* Hero */}
      <section className="relative h-screen flex items-center px-10 lg:px-20 overflow-hidden">
        <img src={theme.img} className="absolute inset-0 w-full h-full object-cover z-0 opacity-50" alt="Hero" />
        <div className="absolute inset-0 bg-black/30 z-10" />
        <div className="relative z-20 w-full pt-20">
          <p className="text-[10px] uppercase tracking-[0.5em] mb-4 opacity-70">{t.heroSub}</p>
          <h1 className="text-[12vw] font-black leading-[0.85] tracking-tighter uppercase mb-12">
            {t.heroTop}<br/><span style={{ fontWeight: 100 }} className="ml-[10vw]">{t.heroBottom}</span>
          </h1>
          <div className="flex gap-16">
            {t.stats.map((s, i) => (
              <div key={i}><div className="text-5xl font-thin">{s.value}</div><div className="text-[8px] tracking-widest opacity-50 uppercase">{s.label}</div></div>
            ))}
          </div>
        </div>
      </section>

      {/* About */}
      <section className="py-40 px-10 flex flex-col lg:flex-row gap-20 items-center max-w-7xl mx-auto">
        <img src="https://storage.googleapis.com/producer-app-public/producer/6c4aa510-08b0-4299-b51b-0c8fb188ccac" className="lg:w-1/2 rounded-[40px] shadow-2xl border-4 border-white/10" alt="Olga" />
        <div className="lg:w-1/2">
          <h2 className="text-7xl font-black uppercase mb-10 tracking-tighter">{t.aboutTitle}</h2>
          <p className="text-xl font-light leading-relaxed mb-12 opacity-80 uppercase tracking-tight">{translations.RU.aboutText}</p>
          <a href="https://t.me/Ola1ABU" target="_blank" className="inline-block bg-white text-black px-12 py-5 rounded-full text-[10px] font-black tracking-widest uppercase hover:invert transition-all">{t.contactBtn}</a>
        </div>
      </section>

      {/* Float Audio Button */}
      <button onClick={() => { if(audioRef.current){ isPlaying ? audioRef.current.pause() : audioRef.current.play(); setIsPlaying(!isPlaying); } }}
        className="fixed bottom-10 right-10 z-[60] p-5 rounded-full bg-white/10 backdrop-blur-xl border border-white/20 flex items-center gap-3">
        <span>{isPlaying ? '🔊' : '🔇'}</span>
        <span className={`text-[9px] font-bold tracking-widest transition-all ${isPlaying ? 'w-16 opacity-100' : 'w-0 opacity-0'} overflow-hidden whitespace-nowrap`}>ON AIR</span>
      </button>
    </div>
  );
}
