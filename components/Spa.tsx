
import React from 'react';
import { Sparkles, ArrowRight } from 'lucide-react';

export const Spa: React.FC = () => {
  return (
    <section id="spa" className="relative w-full py-24 md:py-32 bg-white/90 dark:bg-navy-950/90 backdrop-blur-2xl text-navy-950 dark:text-white overflow-hidden border-t border-navy-900/5 dark:border-white/5 transition-colors duration-1000 z-10">
       <div className="absolute top-0 left-0 w-[400px] h-[400px] bg-green-50/50 dark:bg-navy-900/50 rounded-full blur-[80px] pointer-events-none -translate-x-1/2 -translate-y-1/2 transition-colors duration-1000"></div>
       <div className="absolute bottom-0 right-0 w-[500px] h-[500px] bg-green-50/50 dark:bg-navy-900/50 rounded-full blur-[100px] pointer-events-none translate-x-1/2 translate-y-1/2 transition-colors duration-1000"></div>

       <div className="w-[90%] max-w-[1400px] mx-auto relative z-10">
          <div className="text-center mb-20 reveal">
             <span className="text-gold-600 font-bold tracking-[0.2em] text-xs uppercase block mb-4">Bien-être</span>
             <h2 className="text-4xl md:text-6xl font-serif text-navy-900 dark:text-white transition-colors duration-1000">Sanctuaire des Sens</h2>
             <div className="w-24 h-0.5 bg-gradient-to-r from-transparent via-gold-500 to-transparent mx-auto mt-6"></div>
          </div>

          <div className="grid md:grid-cols-12 gap-10 md:gap-20 items-center">
             <div className="md:col-span-5 reveal-left order-2 md:order-1">
                <div className="flex items-center gap-3 mb-4">
                  <span className="text-gold-600 font-serif italic">Soins & Rituels</span>
                  <Sparkles className="w-5 h-5 text-gold-600" />
                </div>
                <h3 className="text-4xl md:text-5xl font-serif text-navy-900 dark:text-white mb-8 transition-colors duration-1000">L'Art du Toucher</h3>
                <p className="text-navy-900/70 dark:text-gray-300 font-light text-base leading-loose mb-8 text-justify hyphens-auto transition-colors duration-1000">
                   Niché au cœur d'une végétation luxuriante, notre spa est une invitation au lâcher-prise absolu. Abandonnez-vous aux mains expertes de nos thérapeutes utilisant les huiles essentielles pures de Madagascar — Ylang-Ylang apaisant et Ravintsara vivifiant — pour un voyage sensoriel inoubliable.
                </p>

                <div className="flex flex-wrap gap-3 mb-8">
                   {['Massage Ylang-Ylang', 'Gommage Coco', 'Réflexologie', 'Yoga Matinal'].map((tag) => (
                      <span key={tag} className="text-[10px] font-bold uppercase tracking-wider text-navy-900 dark:text-white bg-white/50 dark:bg-navy-800/50 border border-green-100 dark:border-navy-700 px-3 py-1.5 rounded-full shadow-sm dark:shadow-[0_0_8px_rgba(255,255,255,0.2)] hover:bg-green-50 dark:hover:bg-navy-700 transition-colors duration-500">
                        {tag}
                      </span>
                   ))}
                </div>

                <button className="group text-gold-600 font-bold uppercase tracking-[0.2em] text-[10px] md:text-xs flex items-center gap-3 hover:text-navy-900 dark:hover:text-white transition-colors">
                   Découvrir la Carte des Soins
                   <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-300" />
                </button>
             </div>

             <div className="md:col-span-7 relative group reveal order-1 md:order-2">
                <div className="overflow-hidden rounded-2xl h-[400px] md:h-[600px] shadow-2xl dark:shadow-[0_0_60px_rgba(212,175,55,0.2)] relative border border-white/50 dark:border-white/10">
                   <img
                      src="https://images.unsplash.com/photo-1544161515-4ab6ce6db874?q=80&w=1600&auto=format&fit=crop"
                      alt="Spa Massage Relax"
                      className="w-full h-full object-cover animate-ken-burns"
                   />
                   <div className="absolute inset-0 bg-gradient-to-t from-white/20 via-transparent to-transparent"></div>
                </div>
             </div>
          </div>
       </div>
    </section>
  );
};
