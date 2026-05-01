className="text-5xl font-extralight">{s.value}</div>
            <div className="text-[10px] uppercase tracking-widest opacity-50">{s.label}</div>
          </div>
        ))}
      </section>

      {/* Portfolio Grid */}
      <section className="py-32 px-6 lg:px-10">
        <h2 className="text-7xl lg:text-9xl font-black opacity-5 uppercase tracking-tighter mb-10 leading-none">{t.portfolioTitle}</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {projects.map(p => (
            <div key={p.id} className="group relative aspect-video overflow-hidden rounded-[30px] border border-white/5">
              <img src={p.image} className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-700" alt="Project" />
              <div className="absolute inset-0 bg-black/40 group-hover:bg-transparent transition-all" />
              <div className="absolute bottom-8 left-8">
                <h3 className="text-2xl uppercase tracking-tighter">{lang === 'RU' ? p.titleRU : p.titleEN}</h3>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Pricing Section */}
      <section className="py-32 px-6 lg:px-10 bg-white/5">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-6xl font-black uppercase tracking-tighter mb-20 opacity-20">{t.pricingTitle}</h2>
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {t.pricingPlans.map((plan, i) => (
              <div key={i} className={`p-10 rounded-[40px] border transition-all ${i === 1 ? 'bg-white text-black scale-105' : 'border-white/10'}`}>
                <h3 className="text-xl mb-2">{plan.name}</h3>
                <div className="text-4xl font-bold mb-10">{plan.price}</div>
                <ul className="space-y-4 mb-16">
                  {plan.features.map(f => <li key={f} className="text-[10px] uppercase tracking-widest opacity-70">◇ {f}</li>)}
                </ul>
                <a href="https://t.me/Ola1ABU" target="_blank" className={`block w-full py-5 rounded-full text-center text-[10px] font-bold uppercase tracking-widest ${i === 1 ? 'bg-black text-white' : 'bg-white/10 text-white'}`}>{plan.cta}</a>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Footer / About */}
      <section className="py-32 px-6 lg:px-10 text-center">
        <div className="max-w-2xl mx-auto">
          <h2 className="text-5xl font-black uppercase tracking-tighter mb-6">{t.whyUs}</h2>
          <p className="text-sm uppercase tracking-[0.2em] opacity-60 leading-relaxed mb-10">{t.expertiseDesc}</p>
          <a href="https://t.me/Ola1ABU" target="_blank" className="inline-block px-12 py-5 bg-white text-black rounded-full font-bold uppercase tracking-widest text-xs">{t.contactBtn}</a>
        </div>
      </section>
    </div>
  );
}
