import React, { useState, useRef, useEffect } from 'react';
import { Volume2, VolumeX } from 'lucide-react';

const YANDEX_METRICA_ID = "108995288"; 

const translations = {
  RU: {
    nav: ['Концепция', 'Визуализация', 'Чертежи', 'Прайс', 'Контакты'],
    heroTitleTop: 'ИНТЕРЬЕР',
    heroTitleBottom: 'АТМОСФЕРА',
    stats: [{ label: 'ПРОЕКТОВ', value: '50+' }, { label: 'ГОДА ОПЫТА', value: '3+' }],
    philosophy: 'СОВРЕМЕННАЯ ПЛАТФОРМА ДИЗАЙНА, ОБЪЕДИНЯЮЩАЯ ИНЖЕНЕРНУЮ ТОЧНОСТЬ И ЭСТЕТИКУ ВЫСОКОГО КЛАССА.',
    portfolioTitle: 'ПОРТФОЛИО',
    explore: 'Смотреть проект',
    pricingTitle: 'ТАРИФЫ'
  },
  EN: {
    nav: ['Concept', 'Visualization', 'Blueprints', 'Price', 'Contact'],
    heroTitleTop: 'INTERIOR',
    heroTitleBottom: 'ATMOSPHERE',
    stats: [{ label: 'Projects', value: '50+' }, { label: 'Years Exp.', value: '3+' }],
    philosophy: 'A MODERN DESIGN PLATFORM INCORPORATING ADVANCED TECHNICAL TOOLS AND ELITE AESTHETIC EXPERTISE.',
    portfolioTitle: 'PORTFOLIO',
    explore: 'Explore Project',
    pricingTitle: 'PRICING'
  }
};

export default function InteriorPortfolio() {
  const [lang, setLang] = useState<'RU' | 'EN'>('RU');
  const t = translations[lang];
  const [isPlaying, setIsPlaying] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  const toggleAudio = () => {
    if (audioRef.current) {
      if (isPlaying) audioRef.current.pause();
      else audioRef.current.play().catch(() => {});
      setIsPlaying(!isPlaying);
    }
  };

  return (
    <div className="min-h-screen bg-[#0f172a] text-white font-light selection:bg-white selection:text-black">
      <audio ref={audioRef} src="https://storage.googleapis.com/producer-app-public/clips/3be82d58-11e9-4390-974b-5f36fc84a7a7.m4a" loop />
      
      <nav className="fixed top-0 w-full z-50 flex justify-between items-center px-10 py-6 bg-[#0f172a]/80 backdrop-blur-md border-b border-white/10">
        <div className="text-xl font-bold tracking-tighter">OLGA ABU HAIBEH</div>
        <div className="flex gap-8 text-[11px] uppercase tracking-widest">
          <button onClick={() => setLang(lang === 'RU' ? 'EN' : 'RU')} className="font-bold border border-white/20 px-4 py-1 rounded-full">{lang}</button>
        </div>
      </nav>

      <section className="relative h-screen flex flex-col justify-center items-center text-center px-6">
        <h1 className="text-[12vw] leading-none font-extralight tracking-tighter uppercase">
          {t.heroTitleTop}<br/><span className="opacity-40">{t.heroTitleBottom}</span>
        </h1>
        <p className="mt-12 max-w-2xl text-xl md:text-2xl opacity-80 uppercase">{t.philosophy}</p>
        <button onClick={toggleAudio} className="mt-12 p-4 rounded-full border border-white/20 hover:bg-white/10 transition-all">
          {isPlaying ? <Volume2 size={24} /> : <VolumeX size={24} />}
        </button>
      </section>

      <section className="py-32 px-10">
        <h2 className="text-8xl font-black opacity-10 uppercase tracking-tighter mb-20">{t.pricingTitle}</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
           <div className="p-10 rounded-[40px] border border-white/10 bg-white/5">
              <h3 className="text-2xl mb-4">MINI</h3>
              <div className="text-4xl font-bold mb-8">600 ₽/м²</div>
              <a href="https://t.me/Ola1ABU" className="block w-full py-4 bg-white text-black text-center rounded-full font-bold uppercase text-xs">Выбрать</a>
           </div>
           <div className="p-10 rounded-[40px] border border-white bg-white text-black scale-105">
              <h3 className="text-2xl mb-4">STANDARD</h3>
              <div className="text-4xl font-bold mb-8">1 800 ₽/м²</div>
              <a href="https://t.me/Ola1ABU" className="block w-full py-4 bg-black text-white text-center rounded-full font-bold uppercase text-xs">Популярный</a>
           </div>
           <div className="p-10 rounded-[40px] border border-white/10 bg-white/5">
              <h3 className="text-2xl mb-4">MAXI</h3>
              <div className="text-4xl font-bold mb-8">2 500 ₽/м²</div>
              <a href="https://t.me/Ola1ABU" className="block w-full py-4 bg-white text-black text-center rounded-full font-bold uppercase text-xs">Премиум</a>
           </div>
        </div>
      </section>
    </div>
  );
}
