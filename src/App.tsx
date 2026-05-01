import React, { useState, useRef, useEffect } from 'react';
import { Volume2, VolumeX, ExternalLink, FileText, Download, X } from 'lucide-react';

const translations = {
  RU: {
    nav: ['Концепция', 'Визуализация', 'Чертежи', 'Прайс', 'Контакты'],
    heroTitleTop: 'ИНТЕРЬЕР',
    heroTitleBottom: 'АТМОСФЕРА',
    stats: [{ label: 'ПРОЕКТОВ', value: '50+' }, { label: 'ГОДА ОПЫТА', value: '3+' }],
    philosophy: 'СОВРЕМЕННАЯ ПЛАТФОРМА ДИЗАЙНА, ОБЪЕДИНЯЮЩАЯ ИНЖЕНЕРНУЮ ТОЧНОСТЬ И ЭСТЕТИКУ ВЫСОКОГО КЛАССА.',
    portfolioTitle: 'ПОРТФОЛИО',
    portfolioDesc: 'Бесконечная лента наших последних проектов. Наведите, чтобы остановить.',
    explore: 'Смотреть проект',
    pricingTitle: 'ТАРИФЫ',
    pricingPlans: [
      { name: 'МИНИ', price: '600 ₽/м²', features: ['Обмерный план', '3 варианта планировки', 'План монтажа/демонтажа'] },
      { name: 'СТАНДАРТ', price: '1 800 ₽/м²', features: ['Концепция', 'Подбор материалов', 'Основные чертежи (5+ листов)'] },
      { name: 'МАКСИ', price: '2 500 ₽/м²', features: ['Полный пакет чертежей', '3D визуализации', 'Спецификации оборудования'] }
    ],
    whyUs: 'ОБО МНЕ',
    contactBtn: 'Связаться с дизайнером'
  },
  EN: {
    nav: ['Concept', 'Visualization', 'Blueprints', 'Price', 'Contact'],
    heroTitleTop: 'INTERIOR',
    heroTitleBottom: 'ATMOSPHERE',
    stats: [{ label: 'Projects', value: '50+' }, { label: 'Years Exp.', value: '3+' }],
    philosophy: 'A MODERN DESIGN PLATFORM INCORPORATING ADVANCED TECHNICAL TOOLS AND ELITE AESTHETIC EXPERTISE.',
    portfolioTitle: 'PORTFOLIO',
    portfolioDesc: 'Infinite scroll of our projects. Hover to pause.',
    explore: 'Explore Project',
    pricingTitle: 'PRICING',
    pricingPlans: [
      { name: 'MINI', price: '$10/m²', features: ['Measurements', '3 Layout solutions', 'Plans'] },
      { name: 'STANDARD', price: '$30/m²', features: ['Concept', 'Materials', 'Key technical plans'] },
      { name: 'MAXI', price: '$45/m²', features: ['Full package', '3D visualizations', 'Specifications'] }
    ],
    whyUs: 'ABOUT ME',
    contactBtn: 'Contact Designer'
  }
};

const PROJECTS = [
  {
    id: 'event-in-wine',
    titleRU: 'Событие в вине',
    titleEN: 'Event in Wine',
    image: "https://storage.googleapis.com/producer-app-public/producer/96d16483-a0bc-45e5-b62c-ef61e2a50f5b",
    images: ["https://storage.googleapis.com/producer-app-public/producer/96d16483-a0bc-45e5-b62c-ef61e2a50f5b", "https://storage.googleapis.com/producer-app-public/producer/8b5d58db-995c-4f9f-88fb-30614a17f377", "https://storage.googleapis.com/producer-app-public/producer/dcad3c80-1b11-4b53-a291-582b54c662dd"],
    tourURL: "https://olgaabuh1.github.io/Melior/",
    descRU: "Элегантный интерьер, вдохновленный глубокими винными оттенками и эстетикой ар-деко.",
    descEN: "Elegant interior inspired by deep wine tones and Art Deco aesthetics."
  },
  {
    id: 'authentic-loft-office',
    titleRU: 'Лофт офис',
    titleEN: 'Loft Office',
    image: "https://storage.googleapis.com/producer-app-public/producer/cfedf59d-b0c9-45ea-b86b-8c182c328194",
    images: ["https://storage.googleapis.com/producer-app-public/producer/cfedf59d-b0c9-45ea-b86b-8c182c328194", "https://storage.googleapis.com/producer-app-public/producer/9217f68a-8af3-4e76-be6e-9cd90897a5ec"],
    conceptPDF: "https://drive.google.com/file/d/1VKJc4B1KjkiWobqHVSSY6fFIG_m192zv/view?usp=sharing",
    tourURL: "https://olgaabuh1.github.io/Olimpic_office/"
  }
];

export default function App() {
  const [lang, setLang] = useState('RU');
  const [activeProject, setActiveProject] = useState(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const audioRef = useRef(null);
  const t = translations[lang];

  const hour = new Date().getHours();
  const theme = 
    hour >= 5 && hour < 10 ? { bg: "bg-[#95a6bb]", img: "https://storage.googleapis.com/producer-app-public/producer/87495dc4-ce9b-4541-b793-eeade58fb829" } :
    hour >= 10 && hour < 17 ? { bg: "bg-[#5b8fbc]", img: "https://storage.googleapis.com/producer-app-public/producer/90de8fe9-973c-4024-8549-0723b1c4a8b9" } :
    hour >= 17 && hour < 21 ? { bg: "bg-[#fee2e2]", img: "https://storage.googleapis.com/producer-app-public/producer/ee083db0-7b32-4806-887c-88866b8b3b33" } :
    { bg: "bg-[#0f172a]", img: "https://storage.googleapis.com/producer-app-public/producer/97c1c5fe-1509-440a-82ad-eba3cf75b854" };

  const isNight = hour >= 21 || hour < 5;

  return (
    <div className={`min-h-screen ${theme.bg} ${isNight ? 'text-white' : 'text-slate-900'} transition-all duration-1000 font-light overflow-x-hidden`}>
      <style>{`
        @keyframes v-scroll { 0% { transform: translateY(0); } 100% { transform: translateY(-50%); } }
        .animate-v-scroll { animation: v-scroll 45s linear infinite; }
        .animate-v-scroll:hover { animation-play-state: paused; }
      `}</style>

      <audio ref={audioRef} src="https://storage.googleapis.com/producer-app-public/clips/3be82d58-11e9-4390-974b-5f36fc84a7a7.m4a" loop crossOrigin="anonymous" />
      
      {/* HEADER */}
      <nav className="sticky top-0 z-[100] flex justify-between items-center px-6 lg:px-10 py-6 border-b border-current/10 backdrop-blur-xl">
        <img src="https://storage.googleapis.com/producer-app-public/producer/9a9edc8e-efa4-489f-add7-df602feaf4d7" alt="Logo" className={`h-10 ${isNight ? 'invert' : ''}`} />
        <div className="hidden lg:flex gap-8 text-[10px] uppercase tracking-[0.3em]">
          {t.nav.map(item => <button key={item} className="hover:opacity-40 transition-opacity">{item}</button>)}
        </div>
        <button onClick={() => setLang(lang === 'RU' ? 'EN' : 'RU')} className="text-[10px] font-bold border px-3 py-1 rounded-full">{lang}</button>
      </nav>

      {/* HERO */}
      <section className="relative h-[90vh] flex flex-col justify-end overflow-hidden">
        <img src={theme.img} className="absolute inset-0 w-full h-full object-cover" alt="Hero" />
        <div className="absolute inset-0 bg-black/30"></div>
        <div className="relative z-10 px-6 lg:px-16 pb-20 text-white">
           <h1 className="text-[15vw] lg:text-[10vw] leading-[0.8] font-extralight tracking-tighter uppercase mb-10">
             {t.heroTitleTop}<br/><span className="opacity-60">{t.heroTitleBottom}</span>
           </h1>
           <div className="flex justify-between items-end">
             <a href="https://t.me/Ola1ABU" target="_blank" className="bg-white text-black px-12 py-5 rounded-full text-[10px] uppercase font-bold tracking-widest">Contact</a>
             <div className="flex gap-12 text-right">
                {t.stats.map(s => <div key={s.label}><div className="text-5xl font-extralight">{s.value}</div><div className="text-[8px] tracking-widest opacity-50">{s.label}</div></div>)}
             </div>
           </div>
        </div>
      </section>

      {/* PHILOSOPHY */}
      <section className="py-32 px-6 text-center max-w-5xl mx-auto">
        <h2 className="text-3xl lg:text-5xl uppercase leading-tight tracking-tight opacity-90">{t.philosophy}</h2>
      </section>

      {/* PORTFOLIO SECTION */}
      <section className="px-6 lg:px-10 grid lg:grid-cols-12 gap-8">
        <div className="lg:col-span-8 bg-black/5 rounded-[50px] h-[700px] overflow-hidden relative border border-current/5">
           <div className="animate-v-scroll p-8 flex flex-col gap-8">
             {[...PROJECTS, ...PROJECTS].map((p, i) => (
               <div key={i} className="relative h-[450px] rounded-[40px] overflow-hidden group cursor-pointer" onClick={() => setActiveProject(p)}>
                 <img src={p.image} className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-1000" alt="Work" />
                 <div className="absolute bottom-10 left-10 text-white">
                   <h4 className="text-3xl font-light uppercase">{lang === 'RU' ? p.titleRU : p.titleEN}</h4>
                   <p className="text-[10px] tracking-widest opacity-0 group-hover:opacity-100 transition-all">{t.explore}</p>
                 </div>
               </div>
             ))}
           </div>
        </div>
        <div className="lg:col-span-4 flex flex-col gap-6">
          <div className="p-10 rounded-[50px] bg-white/5 border border-current/10 flex-1">
            <h3 className="text-xl uppercase tracking-widest mb-6">{t.portfolioTitle}</h3>
            <p className="text-[11px] uppercase tracking-widest opacity-50 leading-relaxed">{t.portfolioDesc}</p>
          </div>
          <div className="p-10 rounded-[50px] bg-white/5 border border-current/10 flex-1">
            <h3 className="text-xl uppercase tracking-widest mb-6">{t.pricingTitle}</h3>
            {t.pricingPlans.map(p => (
              <div key={p.name} className="flex justify-between py-4 border-b border-current/5">
                <span className="text-[10px] tracking-widest uppercase">{p.name}</span>
                <span className="text-[10px] font-bold">{p.price}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ABOUT ME */}
      <section className="px-6 lg:px-10 mt-32">
        <div className="bg-[#b4b8bf] text-black rounded-[60px] p-12 lg:p-24 flex flex-col lg:grid lg:grid-cols-12 gap-16 items-center">
          <div className="lg:col-span-8">
            <h2 className="text-7xl lg:text-9xl font-black uppercase tracking-tighter mb-12 leading-none">{t.whyUs}</h2>
            <p className="text-2xl font-light uppercase mb-8">{lang === 'RU' ? 'Ольга Абу Хейба — Профессиональный дизайнер.' : 'Olga Abu Haibeh — Professional designer.'}</p>
            <div className="grid md:grid-cols-2 gap-10 text-[11px] tracking-[0.2em] uppercase opacity-70 leading-relaxed">
              <p>Создаю пространства, где эстетика встречается с инженерной точностью.</p>
              <p>Работаю по всему миру, привнося уникальность в каждый проект.</p>
            </div>
            <a href="https://t.me/Ola1ABU" target="_blank" className="inline-block mt-12 bg-black text-white px-12 py-5 rounded-full text-[10px] font-bold uppercase tracking-widest">Connect</a>
          </div>
          <div className="lg:col-span-4 aspect-[3/4] w-full rounded-[40px] overflow-hidden shadow-2xl">
            <img src="https://storage.googleapis.com/producer-app-public/producer/6c4aa510-08b0-4299-b51b-0c8fb188ccac" className="w-full h-full object-cover" alt="Me" />
          </div>
        </div>
      </section>

      {/* MODAL WINDOW */}
      {activeProject && (
        <div className="fixed inset-0 z-[1000] bg-black/95 backdrop-blur-3xl overflow-y-auto p-6 lg:p-20">
          <div className="max-w-6xl mx-auto">
            <button onClick={() => setActiveProject(null)} className="text-white mb-10 flex items-center gap-2 text-[10px] tracking-widest uppercase opacity-50 hover:opacity-100 transition-opacity"><X size={16}/> Close</button>
            <h2 className="text-5xl text-white font-extralight uppercase tracking-tighter mb-10">{lang === 'RU' ? activeProject.titleRU : activeProject.titleEN}</h2>
            <div className="flex flex-wrap gap-6 mb-16">
              {activeProject.tourURL && <a href={activeProject.tourURL} className="bg-white text-black px-8 py-3 rounded-full text-[9px] font-bold uppercase tracking-widest">3D TOUR</a>}
              {activeProject.conceptPDF && <a href={activeProject.conceptPDF} className="border border-white/20 text-white px-8 py-3 rounded-full text-[9px] font-bold uppercase tracking-widest">CONCEPT</a>}
            </div>
            <div className="grid gap-6">
              {activeProject.images.map(img => <img key={img} src={img} className="w-full rounded-3xl" alt="Interior" />)}
            </div>
          </div>
        </div>
      )}

      {/* FOOTER */}
      <footer className="mt-32 py-12 text-center opacity-20 text-[8px] tracking-[0.5em] uppercase">
        © {new Date().getFullYear()} Olga Abu Haibeh / Built with Producer
      </footer>
    </div>
  );
}
