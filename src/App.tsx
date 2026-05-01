import React, { useState, useRef } from 'react';
import { Volume2, VolumeX } from 'lucide-react';

const translations = {
  RU: {
    heroTitleTop: 'ИНТЕРЬЕР',
    heroTitleBottom: 'АТМОСФЕРА',
    philosophy: 'СОВРЕМЕННАЯ ПЛАТФОРМА ДИЗАЙНА, ОБЪЕДИНЯЮЩАЯ ИНЖЕНЕРНУЮ ТОЧНОСТЬ И ЭСТЕТИКУ ВЫСОКОГО КЛАССА.',
    pricingTitle: 'ТАРИФЫ',
    pricingPlans: [
      { name: 'МИНИ', price: '600 ₽/м²', cta: 'ВЫБРАТЬ', features: ['Обмерный план', '3 варианта планировки'] },
      { name: 'СТАНДАРТ', price: '1 800 ₽/м²', cta: 'ПОПУЛЯРНЫЙ', features: ['Концепция', 'Чертежи'] },
      { name: 'МАКСИ', price: '2 500 ₽/м²', cta: 'ПРЕМИУМ', features: ['3D визуализации', 'Полный пакет'] }
    ]
  },
  EN: {
    heroTitleTop: 'INTERIOR',
    heroTitleBottom: 'ATMOSPHERE',
    philosophy: 'A MODERN DESIGN PLATFORM INCORPORATING ADVANCED TECHNICAL TOOLS AND ELITE AESTHETIC EXPERTISE.',
    pricingTitle: 'PRICING',
    pricingPlans: [
      { name: 'MINI', price: '$10/m²', cta: 'SELECT', features: ['Measurements', 'Layouts'] },
      { name: 'STANDARD', price: '$30/m²', cta: 'POPULAR', features: ['Concept', 'Blueprints'] },
      { name: 'MAXI', price: '$45/m²', cta: 'PREMIUM', features: ['3D Visuals', 'Full package'] }
    ]
  }
};

const projects = [
  { id: '1', titleRU: 'Событие в вине', image: "https://storage.googleapis.com/producer-app-public/producer/96d16483-a0bc-45e5-b62c-ef61e2a50f5b" },
  { id: '2', titleRU: 'Лофт офис', image: "https://storage.googleapis.com/producer-app-public/producer/cfedf59d-b0c9-45ea-b86b-8c182c328194" }
];

export default function InteriorPortfolio() {
  const [lang, setLang] = useState<'RU' | 'EN'>('RU');
  const t = translations[lang];
  const [isPlaying, setIsPlaying] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);
  
  const getDynamicTheme = () => {
    const hour = new Date().getHours();
    if (hour >= 17 && hour < 21) return { bg: "bg-[#fee2e2]", img: "https://storage.googleapis.com/producer-app-public/producer/ee083db0-7b32-4806-887c-88866b8b3b33" };
    if (hour >= 21 || hour < 5) return { bg: "bg-[#0f172a]", img: "https://storage.googleapis.com/producer-app-public/producer/97c1c5fe-1509-440a-82ad-eba3cf75b854" };
    return { bg: "bg-[#5b8fbc]", img: "https://storage.googleapis.com/producer-app-public/producer/90de8fe9-973c-4024-8549-0723b1c4a8b9" };
  };

  const theme = getDynamicTheme();

  return (
    <div className={`min-h-screen ${theme.bg} text-white font-light transition-colors duration-1000`}>
      <audio ref={audioRef} src="https://storage.googleapis.com/producer-app-public/clips/3be82d58-11e9-4390-974b-5f36fc84a7a7.m4a" loop />
      <nav className="fixed top-0 w-full z-50 flex justify-between items-center px-10 py-6 backdrop-blur-md border-b border-white/10">
        <img src="https://storage.googleapis.com/producer-app-public/producer/9a9edc8e-efa4-489f-add7-df602feaf4d7" alt="Logo" className="h-10 brightness-0 invert" />
        <button onClick={() => setLang(lang === 'RU' ? 'EN' : 'RU')} className="text-xs font-bold border border-white/20 px-4 py-1 rounded-full">{lang}</button>
      </nav>

      <section className="relative h-screen flex flex-col justify-center items-center overflow-hidden">
        <img src={theme.img} className="absolute inset-0 w-full h-full object-cover opacity-40" alt="Hero" />
        <div className="relative z-10 text-center px-6">
          <h1 className="text-[14vw] leading-[0.8] font-extralight tracking-tighter uppercase">
            {t.heroTitleTop}<br/><span className="opacity-40">{t.heroTitleBottom}</span>
          </h1>
          <p className="mt-8 max-w-xl text-xs tracking-[0.2em] uppercase opacity-80 mx-auto">{t.philosophy}</p>
          <button onClick={() => { if(audioRef.current) isPlaying ? audioRef.current.pause() : audioRef.current.play(); setIsPlaying(!isPlaying); }} className="mt-10 p-4 rounded-full border border-white/20">
             {isPlaying ? <Volume2 size={20} /> : <VolumeX size={20} />}
          </button>
        </div>
      </section>

      <section className="py-20 px-10">
        <h2 className="text-6xl font-black opacity-10 uppercase mb-10">{t.pricingTitle}</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {t.pricingPlans.map((plan, i) => (
            <div key={i} className={`p-8 rounded-[30px] border ${i === 1 ? 'bg-white text-black' : 'border-white/10'}`}>
              <h3 className="text-xl mb-2">{plan.name}</h3>
              <div className="text-4xl font-bold mb-10">{plan.price}</div>
              <a href="https://t.me/Ola1ABU" target="_blank" className="block w-full py-4 bg-current invert text-center rounded-full font-bold uppercase text-[10px]">{plan.cta}</a>
            </div>
          ))}
        </div>
      </section>

      <section className="py-20 px-10">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {projects.map(p => (
            <div key={p.id} className="group relative aspect-video overflow-hidden rounded-[20px]">
              <img src={p.image} className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-700" alt="Work" />
              <div className="absolute bottom-6 left-6 uppercase text-xl font-bold">{p.titleRU}</div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
