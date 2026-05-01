import React, { useState, useRef, useEffect } from 'react';
import { Volume2, VolumeX, ExternalLink, FileText, Download } from 'lucide-react';

const translations = {
  RU: {
    nav: ['Концепция', 'Визуализация', 'Чертежи', 'Прайс', 'Контакты'],
    heroTitleTop: 'ИНТЕРЬЕР',
    heroTitleBottom: 'АТМОСФЕРА',
    stats: [
      { label: 'ПРОЕКТОВ', value: '50+' },
      { label: 'ГОДА ОПЫТА', value: '3+' }
    ],
    philosophy: 'СОВРЕМЕННАЯ ПЛАТФОРМА ДИЗАЙНА, ОБЪЕДИНЯЮЩАЯ ИНЖЕНЕРНУЮ ТОЧНОСТЬ И ЭСТЕТИКУ ВЫСОКОГО КЛАССА.',
    portfolioTitle: 'ПОРТФОЛИО',
    portfolioDesc: 'Бесконечная лента наших последних проектов. Наведите, чтобы остановить.',
    explore: 'Смотреть проект',
    pricingTitle: 'ТАРИФЫ',
    pricingPlans: [
      { name: 'МИНИ', price: '600 ₽/м²', features: ['Обмерный план', '3 варианта планировки'] },
      { name: 'СТАНДАРТ', price: '1 800 ₽/м²', features: ['Концепция', 'Основные чертежи'] },
      { name: 'МАКСИ', price: '2 500 ₽/м²', features: ['Полный пакет', '3D визуализация'] }
    ],
    whyUs: 'ОБО МНЕ'
  },
  EN: {
    nav: ['Concept', 'Visualization', 'Blueprints', 'Price', 'Contact'],
    heroTitleTop: 'INTERIOR',
    heroTitleBottom: 'ATMOSPHERE',
    stats: [
      { label: 'Projects', value: '50+' },
      { label: 'Years Exp.', value: '3+' }
    ],
    philosophy: 'A MODERN DESIGN PLATFORM INCORPORATING ADVANCED TECHNICAL TOOLS AND ELITE AESTHETIC EXPERTISE.',
    portfolioTitle: 'PORTFOLIO',
    portfolioDesc: 'Infinite scroll of our projects. Hover to pause.',
    explore: 'Explore Project',
    pricingTitle: 'PRICING',
    pricingPlans: [
      { name: 'MINI', price: '$10/m²', features: ['Measurements', 'Layout solutions'] },
      { name: 'STANDARD', price: '$30/m²', features: ['Concept', 'Technical plans'] },
      { name: 'MAXI', price: '$45/m²', features: ['Full package', '3D visuals'] }
    ],
    whyUs: 'ABOUT ME'
  }
};

const PROJECTS = [
  {
    id: 'event-in-wine',
    titleRU: 'Событие в вине',
    titleEN: 'Event in Wine',
    image: "https://storage.googleapis.com/producer-app-public/producer/96d16483-a0bc-45e5-b62c-ef61e2a50f5b",
    images: ["https://storage.googleapis.com/producer-app-public/producer/96d16483-a0bc-45e5-b62c-ef61e2a50f5b", "https://storage.googleapis.com/producer-app-public/producer/8b5d58db-995c-4f9f-88fb-30614a17f377"],
    tourURL: "https://olgaabuh1.github.io/Melior/"
  },
  {
    id: 'soul-minimalism',
    titleRU: 'Минимализм с душой',
    titleEN: 'Minimalism with Soul',
    image: "https://storage.googleapis.com/producer-app-public/producer/8ebe08a0-e28c-48d1-a726-1cd45de1bc64",
    images: ["https://storage.googleapis.com/producer-app-public/producer/8ebe08a0-e28c-48d1-a726-1cd45de1bc64", "https://storage.googleapis.com/producer-app-public/producer/aba72f0e-c582-4f9f-9488-0a9db552be68"]
  }
];

export default function Portfolio() {
  const [lang, setLang] = useState('RU');
  const [activeProject, setActiveProject] = useState(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const audioRef = useRef(null);
  const t = translations[lang];

  const theme = (() => {
    const hour = new Date().getHours();
    if (hour >= 5 && hour < 10) return { bg: "bg-[#95a6bb]", img: "https://storage.googleapis.com/producer-app-public/producer/87495dc4-ce9b-4541-b793-eeade58fb829" };
    if (hour >= 10 && hour < 17) return { bg: "bg-[#5b8fbc]", img: "https://storage.googleapis.com/producer-app-public/producer/90de8fe9-973c-4024-8549-0723b1c4a8b9" };
    if (hour >= 17 && hour < 21) return { bg: "bg-[#fee2e2]", img: "https://storage.googleapis.com/producer-app-public/producer/ee083db0-7b32-4806-887c-88866b8b3b33" };
    return { bg: "bg-[#0f172a]", img: "https://storage.googleapis.com/producer-app-public/producer/97c1c5fe-1509-440a-82ad-eba3cf75b854" };
  })();

  const isNight = new Date().getHours() >= 21 || new Date().getHours() < 5;

  return (
    <div className={`min-h-screen ${theme.bg} ${isNight ? 'text-white' : 'text-slate-900'} transition-all duration-700 font-light pb-20`}>
      <nav className="sticky top-0 z-[80] flex justify-between items-center px-6 lg:px-10 py-6 border-b border-current/10 backdrop-blur-lg">
        <img src="https://storage.googleapis.com/producer-app-public/producer/9a9edc8e-efa4-489f-add7-df602feaf4d7" alt="Logo" className={`h-10 w-auto ${isNight ? 'invert' : ''}`} />
        <div className="hidden lg:flex gap-8 text-[10px] uppercase tracking-widest">
          {t.nav.map(item => <button key={item} className="hover:opacity-40">{item}</button>)}
        </div>
        <button onClick={() => setLang(lang === 'RU' ? 'EN' : 'RU')} className="text-[10px] font-bold">{lang}</button>
      </nav>

      <section className="relative h-[85vh] flex flex-col justify-end overflow-hidden">
        <img src={theme.img} className="absolute inset-0 w-full h-full object-cover" alt="Hero" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
        <div className="relative z-10 px-6 lg:px-10 pb-16 text-white w-full">
           <h1 className="text-[16vw] lg:text-[10vw] leading-[0.8] font-extralight tracking-tighter uppercase">
             {t.heroTitleTop}<br/><span className="ml-[10vw]">{t.heroTitleBottom}</span>
           </h1>
        </div>
      </section>

      {/* Оставшиеся блоки по такой же логике Tailwind... */}
    </div>
  );
}
