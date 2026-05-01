import React, { useState, useRef, useEffect } from 'react';
import { Volume2, VolumeX, ArrowRight, Instagram, Send } from 'lucide-react';

const YANDEX_METRICA_ID = "108995288";

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
    bg: isNight ? 'bg-[#0f172a]' : 'bg-[#95a6bb]',
    img: isNight ? "https://storage.googleapis.com/producer-app-public/producer/97c1c5fe-1509-440a-82ad-eba3cf75b854" : "https://storage.googleapis.com/producer-app-public/producer/90de8fe9-973c-4024-8549-0723b1c4a8b9"
  };

  return (
    <div className={`min-h-screen ${theme.bg} text-white font-light selection:bg-white selection:text-black antialiased`}>
      <link href="https://fonts.googleapis.com/css2?family=Inter:wght@100;300;400;900&display=swap" rel="stylesheet" />
      <style>{`
        @keyframes scroll { 0% { transform: translateY(0); } 100% { transform: translateY(-50%); } }
        .animate-scroll { animation: scroll 40s linear infinite; }
        .animate-scroll:hover { animation-play-state: paused; }
      `}</style>
      
      <audio ref={audioRef} loop src="https://storage.googleapis.com/producer-app-public/clips/3be82d58-11e9-4390-974b-5f36fc84a7a7.m4a" crossOrigin="anonymous" />

      <nav className="fixed top-0 w-full z-50 backdrop-blur-md border-b border-white/10 px-10 py-5 flex justify-between items-center">
        <img src="https://storage.googleapis.com/producer-app-public/producer/9a9edc8e-efa4-489f-add7-df602feaf4d7" className={`h-10 ${isNight ? 'invert' : ''}`} alt="Logo" />
        <button onClick={() => setLang(lang === 'RU' ? 'EN' : 'RU')} className="text-[10px] border border-white/20 px-4 py-1 rounded-full font-bold uppercase">{lang}</button>
      </nav>

      <section className="relative h-screen flex items-center px-10 lg:px-20 overflow-hidden">
        <img src={theme.img} className="absolute inset-0 w-full h-full object-cover z-0 opacity-40 scale-105" alt="Hero" />
        <div className="absolute inset-0 bg-black/20 z-10" />
        <div className="relative z-20 w-full">
          <p className="text-[10px] uppercase tracking-[0.5em] mb-6 opacity-60 font-bold">{t.heroSub}</p>
          <h1 className="text-[15vw] lg:text-[10vw] font-thin leading-[0.8] tracking-tighter uppercase">
            {t.heroTop}<br/><span className="ml-[10vw] font-black">{t.heroBottom}</span>
          </h1>
          <div className="mt-12 flex gap-12 lg:gap-20">
            {t.stats.map((s, i) => (
              <div key={i}>
                <div className="text-5xl lg:text-7xl font-thin">{s.value}</div>
                <div className="text-[8px] tracking-widest opacity-40 uppercase font-bold">{s.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-40 px-10 grid grid-cols-1 lg:grid-cols-12 gap-10">
        <div className="lg:col-span-8 h-[600px] bg-black/10 rounded-[40px] overflow-hidden relative border border-white/10 group">
          <div className="animate-scroll p-8 flex flex-col gap-8">
            {[...projects, ...projects].map((p, i) => (
              <div key={i} className="h-[400px] rounded-[30px] overflow-hidden relative group cursor-pointer border border-white/5">
                <img src={p.img} className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-1000 scale-110 group-hover:scale-100" alt="Work" />
                <div className="absolute inset-0 bg-black/40 group-hover:bg-transparent transition-all" />
                <div className="absolute bottom-8 left-8 text-white"><h3 className="text-3xl font-light uppercase tracking-tighter">{p.title}</h3></div>
              </div>
            ))}
          </div>
          <div className="absolute top-10 left-10 pointer-events-none mix-blend-difference">
            <h2 className="text-white text-5xl font-black uppercase tracking-tighter leading-none">{t.portfolioTitle}</h2>
          </div>
        </div>
        <div className="lg:col-span-4 flex flex-col justify-center">
          <h2 className="text-xl uppercase tracking-[0.3em] mb-8 font-bold border-b border-white/10 pb-4 inline-block">PORTFOLIO</h2>
          <p className="text-[11px] opacity-40 leading-relaxed uppercase tracking-[0.3em] font-light italic">Бесконечная лента проектов. Наведите, чтобы остановить.</p>
        </div>
      </section>

      <section className="py-40 px-10 bg-white/5">
        <div className="max-w-7xl mx-auto flex flex-col lg:flex-row gap-20 items-center">
          <div className="lg:w-1/2 aspect-[4/5] rounded-[50px] overflow-hidden shadow-2xl border-2 border-white/10 relative group">
            <img src="https://storage.googleapis.com/producer-app-public/producer/6c4aa510-08b0-4299-b51b-0c8fb188ccac" className="w-full h-full object-cover" alt="Olga" />
          </div>
          <div className="lg:w-1/2">
            <h2 className="text-8xl lg:text-[10rem] font-black uppercase tracking-tighter mb-12 leading-none opacity-90">{t.aboutTitle}</h2>
            <p className="text-xl lg:text-2xl font-light uppercase tracking-tight mb-16 leading-tight opacity-70 italic">{translations.RU.aboutText}</p>
            <a href="https://t.me/Ola1ABU" target="_blank" className="inline-block bg-white text-black px-12 py-5 rounded-full text-[10px] font-black tracking-[0.4em] uppercase hover:bg-neutral-200 transition-all shadow-xl">
              {t.contactBtn}
            </a>
          </div>
        </div>
      </section>

      <button onClick={() => { if(audioRef.current){ isPlaying ? audioRef.current.pause() : audioRef.current.play(); setIsPlaying(!isPlaying); } }}
        className="fixed bottom-10 right-10 z-[60] p-6 rounded-full bg-white/10 backdrop-blur-3xl border border-white/20 flex items-center gap-4 group">
        <span className="text-xl">{isPlaying ? '🔊' : '🔇'}</span>
        <span className={`text-[10px] font-bold tracking-widest transition-all ${isPlaying ? 'w-24 opacity-100' : 'w-0 opacity-0'} overflow-hidden whitespace-nowrap`}>ON AIR</span>
      </button>
    </div>
  );
}
