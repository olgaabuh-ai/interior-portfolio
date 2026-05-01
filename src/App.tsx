import React, { useState, useRef } from 'react';

const translations = {
  RU: {
    heroSub: 'АРХИТЕКТУРА ИНТЕРЬЕРА И АТМОСФЕРА', heroTop: 'ИНТЕРЬЕР', heroBottom: 'АТМОСФЕРА',
    stats: [{ l: 'ПРОЕКТОВ', v: '50+' }, { l: 'ГОДА ОПЫТА', v: '3+' }],
    portfolioTitle: 'ПОРТФОЛИО',
    pricingTitle: 'ТАРИФЫ',
    pricing: [
      { n: 'МИНИ', p: '600 ₽/м²', d: 'Обмерный план, планировка' },
      { n: 'СТАНДАРТ', p: '1 800 ₽/м²', d: 'Концепция, чертежи сетей' },
      { n: 'МАКСИ', p: '2 500 ₽/м²', d: 'Полный проект, 3D визуализация' }
    ],
    aboutTitle: 'ОБО МНЕ',
    aboutText: 'Я — ОЛЬГА АБУ ХЕЙБА, ПРОФЕССИОНАЛЬНЫЙ ДИЗАЙНЕР ИНТЕРЬЕРОВ. МОЯ РАБОТА — ЭТО СОЗДАНИЕ АТМОСФЕРЫ, КОТОРАЯ ОТРАЖАЕТ ВАШУ ИНДИВИДУАЛЬНОСТЬ.',
    contact: 'СВЯЗАТЬСЯ С ДИЗАЙНЕРОМ'
  },
  EN: {
    heroSub: 'INTERIOR ARCHITECTURE & ATMOSPHERE', heroTop: 'INTERIOR', heroBottom: 'ATMOSPHERE',
    stats: [{ l: 'PROJECTS', v: '50+' }, { l: 'YEARS EXP.', v: '3+' }],
    portfolioTitle: 'PORTFOLIO',
    pricingTitle: 'PRICING',
    pricing: [
      { n: 'MINI', p: '$10/m²', d: 'Layout, measurements' },
      { n: 'STANDARD', p: '$30/m²', d: 'Concept, technical sheets' },
      { n: 'MAXI', p: '$45/m²', d: 'Full design set, 3D visuals' }
    ],
    aboutTitle: 'ABOUT ME',
    aboutText: 'I AM OLGA ABU HAIBEH, A PROFESSIONAL DESIGNER. MY WORK IS ABOUT CREATING ATMOSPHERES THAT REFLECT YOUR PERSONALITY.',
    contact: 'CONTACT DESIGNER'
  }
};

const projects = [
  { t: 'СОБЫТИЕ В ВИНЕ', i: "https://storage.googleapis.com/producer-app-public/producer/96d16483-a0bc-45e5-b62c-ef61e2a50f5b" },
  { t: 'ЛОФТ ОФИС', i: "https://storage.googleapis.com/producer-app-public/producer/cfedf59d-b0c9-45ea-b86b-8c182c328194" },
  { t: 'МИНИМАЛИЗМ', i: "https://storage.googleapis.com/producer-app-public/producer/8ebe08a0-e28c-48d1-a726-1cd45de1bc64" }
];

export default function App() {
  const [lang, setLang] = useState('RU');
  const [isPlaying, setIsPlaying] = useState(false);
  const audioRef = useRef<HTMLAudioElement>(null);
  const t = translations[lang === 'RU' ? 'RU' : 'EN'];

  return (
    <div style={{ backgroundColor: '#0f172a', color: 'white', fontFamily: '"Inter", sans-serif', margin: 0, padding: 0 }}>
      <link href="https://fonts.googleapis.com/css2?family=Inter:wght@100;400;900&display=swap" rel="stylesheet" />
      <style>{`
        @keyframes scroll { 0% { transform: translateY(0); } 100% { transform: translateY(-50%); } }
        .anim-scroll { animation: scroll 30s linear infinite; }
        .anim-scroll:hover { animation-play-state: paused; }
        button:hover { opacity: 0.7; }
      `}</style>

      <audio ref={audioRef} loop src="https://storage.googleapis.com/producer-app-public/clips/3be82d58-11e9-4390-974b-5f36fc84a7a7.m4a" crossOrigin="anonymous" />

      {/* Header */}
      <nav style={{ position: 'fixed', top: 0, width: '100%', zIndex: 100, display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '20px 40px', backdropFilter: 'blur(10px)', borderBottom: '1px solid rgba(255,255,255,0.1)', boxSizing: 'border-box' }}>
        <img src="https://storage.googleapis.com/producer-app-public/producer/9a9edc8e-efa4-489f-add7-df602feaf4d7" style={{ height: '40px', filter: 'invert(1)' }} alt="Logo" />
        <button onClick={() => setLang(lang === 'RU' ? 'EN' : 'RU')} style={{ background: 'transparent', border: '1px solid white', color: 'white', padding: '5px 15px', borderRadius: '20px', cursor: 'pointer', fontSize: '12px' }}>{lang}</button>
      </nav>

      {/* Hero */}
      <section style={{ height: '100vh', position: 'relative', display: 'flex', alignItems: 'center', padding: '0 10%', overflow: 'hidden' }}>
        <img src="https://storage.googleapis.com/producer-app-public/producer/97c1c5fe-1509-440a-82ad-eba3cf75b854" style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', objectCover: 'cover', zIndex: 0, opacity: 0.4 }} alt="H" />
        <div style={{ position: 'relative', zIndex: 1, width: '100%' }}>
          <p style={{ letterSpacing: '0.5em', fontSize: '10px', marginBottom: '30px', opacity: 0.6 }}>{t.heroSub}</p>
          <h1 style={{ fontSize: '10vw', fontWeight: 900, lineHeight: 0.8, margin: 0, textTransform: 'uppercase', letterSpacing: '-0.05em' }}>
            {t.heroTop}<br/><span style={{ fontWeight: 100, marginLeft: '10vw' }}>{t.heroBottom}</span>
          </h1>
          <div style={{ display: 'flex', gap: '50px', marginTop: '60px' }}>
            {t.stats.map((s, i) => (
              <div key={i}><div style={{ fontSize: '60px', fontWeight: 100 }}>{s.v}</div><div style={{ fontSize: '10px', opacity: 0.4, letterSpacing: '0.2em' }}>{s.l}</div></div>
            ))}
          </div>
        </div>
      </section>

      {/* Portfolio */}
      <section style={{ padding: '100px 10%', display: 'grid', gridTemplateColumns: '2fr 1fr', gap: '60px' }}>
        <div style={{ height: '600px', backgroundColor: 'rgba(255,255,255,0.05)', borderRadius: '40px', overflow: 'hidden', position: 'relative', border: '1px solid rgba(255,255,255,0.1)' }}>
          <div className="anim-scroll" style={{ padding: '40px', display: 'flex', flexDirection: 'column', gap: '40px' }}>
            {[...projects, ...projects].map((p, i) => (
              <div key={i} style={{ height: '400px', borderRadius: '30px', overflow: 'hidden', position: 'relative', cursor: 'pointer' }}>
                <img src={p.i} style={{ width: '100%', height: '100%', objectFit: 'cover' }} alt="P" />
                <div style={{ position: 'absolute', bottom: '30px', left: '30px', fontSize: '24px', fontWeight: 100 }}>{p.t}</div>
              </div>
            ))}
          </div>
          <h2 style={{ position: 'absolute', top: '40px', left: '40px', margin: 0, fontSize: '40px', fontWeight: 900, mixBlendMode: 'difference' }}>{lang === 'RU' ? 'ИЗБРАННОЕ' : 'SELECTED'}</h2>
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
          <h2 style={{ fontSize: '20px', letterSpacing: '0.3em', borderBottom: '1px solid white', paddingBottom: '20px', marginBottom: '30px' }}>{t.portfolioTitle}</h2>
          <p style={{ fontSize: '12px', opacity: 0.5, lineHeight: 2, letterSpacing: '0.1em' }}>БЕСКОНЕЧНАЯ ЛЕНТА ПРОЕКТОВ. НАВЕДИТЕ, ЧТОБЫ ОСТАНОВИТЬ.</p>
        </div>
      </section>

      {/* Pricing */}
      <section style={{ padding: '100px 10%', backgroundColor: 'rgba(255,255,255,0.02)' }}>
        <h2 style={{ fontSize: '8vw', fontWeight: 900, opacity: 0.05, marginBottom: '60px', margin: 0 }}>{t.pricingTitle}</h2>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '30px' }}>
          {t.pricing.map((p, i) => (
            <div key={i} style={{ padding: '40px', borderRadius: '40px', border: '1px solid rgba(255,255,255,0.1)', backgroundColor: i === 1 ? 'white' : 'transparent', color: i === 1 ? 'black' : 'white' }}>
              <h3 style={{ fontSize: '20px', marginBottom: '10px' }}>{p.n}</h3>
              <div style={{ fontSize: '36px', fontWeight: 100, marginBottom: '30px' }}>{p.p}</div>
              <p style={{ fontSize: '10px', opacity: 0.6, textTransform: 'uppercase', marginBottom: '40px' }}>{p.d}</p>
              <a href="https://t.me/Ola1ABU" target="_blank" style={{ display: 'block', textAlign: 'center', padding: '15px', borderRadius: '30px', backgroundColor: i === 1 ? 'black' : 'white', color: i === 1 ? 'white' : 'black', textDecoration: 'none', fontSize: '10px', fontWeight: 900 }}>ВЫБРАТЬ</a>
            </div>
          ))}
        </div>
      </section>

      {/* About */}
      <section style={{ padding: '100px 10%', display: 'flex', alignItems: 'center', gap: '80px' }}>
        <img src="https://storage.googleapis.com/producer-app-public/producer/6c4aa510-08b0-4299-b51b-0c8fb188ccac" style={{ width: '40%', borderRadius: '50px', boxShadow: '0 20px 50px rgba(0,0,0,0.5)' }} alt="O" />
        <div>
          <h2 style={{ fontSize: '100px', fontWeight: 900, margin: '0 0 40px 0', lineHeight: 0.8 }}>{t.aboutTitle}</h2>
          <p style={{ fontSize: '24px', fontWeight: 100, lineHeight: 1.4, marginBottom: '50px' }}>{t.aboutText}</p>
          <a href="https://t.me/Ola1ABU" target="_blank" style={{ display: 'inline-block', padding: '20px 40px', borderRadius: '40px', backgroundColor: 'white', color: 'black', textDecoration: 'none', fontWeight: 900, fontSize: '12px' }}>{t.contact}</a>
        </div>
      </section>

      {/* Audio Button */}
      <button onClick={() => { if(audioRef.current){ isPlaying ? audioRef.current.pause() : audioRef.current.play(); setIsPlaying(!isPlaying); } }}
        style={{ position: 'fixed', bottom: '40px', right: '40px', padding: '20px', borderRadius: '50%', backgroundColor: 'rgba(255,255,255,0.1)', backdropFilter: 'blur(20px)', border: '1px solid rgba(255,255,255,0.2)', color: 'white', cursor: 'pointer', zIndex: 1000, display: 'flex', alignItems: 'center', gap: '10px' }}>
        <span style={{ fontSize: '20px' }}>{isPlaying ? '🔊' : '🔇'}</span>
        {isPlaying && <span style={{ fontSize: '10px', fontWeight: 900, letterSpacing: '0.2em' }}>ON AIR</span>}
      </button>
    </div>
  );
}
