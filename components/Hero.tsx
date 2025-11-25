import React, { useEffect, useState } from 'react';
import { ChevronDown } from 'lucide-react';

interface HeroProps {
  isNightMode?: boolean;
}

export const Hero: React.FC<HeroProps> = ({ isNightMode }) => {
  const [offset, setOffset] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      setOffset(window.scrollY);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <>
      {/* 
        GLOBAL FIXED BACKGROUND VIDEO 
        Cette div est sortie du flux (fixed) et reste en arrière-plan permanent.
        z-0 pour être derrière tout le contenu qui aura un z-index supérieur.
      */}
      <div className="fixed inset-0 w-full h-full z-0 pointer-events-none overflow-hidden">
        
        {/* Day Video */}
        <div className={`absolute inset-0 w-full h-full transition-opacity duration-[2000ms] ease-in-out ${isNightMode ? 'opacity-0' : 'opacity-100'}`}>
             <video 
                autoPlay 
                muted 
                loop 
                playsInline 
                className="w-full h-full object-cover scale-105" // Scale légers pour éviter les bords blancs
              >
                <source src="https://assets.mixkit.co/videos/preview/mixkit-aerial-view-of-a-beautiful-tropical-beach-4254-large.mp4" type="video/mp4" />
              </video>
              <div className="absolute inset-0 bg-navy-950/10"></div>
        </div>

        {/* Night Video */}
        <div className={`absolute inset-0 w-full h-full transition-opacity duration-[2000ms] ease-in-out ${isNightMode ? 'opacity-100' : 'opacity-0'}`}>
             <video 
                autoPlay 
                muted 
                loop 
                playsInline 
                className="w-full h-full object-cover scale-105"
              >
                <source src="https://assets.mixkit.co/videos/preview/mixkit-starry-sky-over-a-field-at-night-34440-large.mp4" type="video/mp4" />
              </video>
               <div className="absolute inset-0 bg-navy-950/40"></div>
        </div>
      </div>

      {/* 
        HERO CONTENT SECTION 
        C'est la section qui contient le titre. Elle est relative pour passer au-dessus de la vidéo fixe.
        Le fond est transparent ici pour voir la vidéo clairement.
      */}
      <section id="home" className="relative h-screen w-full flex items-center justify-center z-10">
        
        {/* Main Content - Minimalist & Elegant */}
        <div className="text-center text-white px-4" style={{ transform: `translateY(${offset * 0.5}px)` }}>
          <div className="animate-fade-in-up flex flex-col items-center gap-4 md:gap-6">
              <h2 className="text-white/90 tracking-[0.4em] uppercase text-[10px] md:text-xs font-medium bg-black/20 backdrop-blur-sm px-4 py-2 rounded-full border border-white/10">
                Île Sainte-Marie
              </h2>
              <h1 className="text-5xl md:text-7xl lg:text-8xl font-serif font-light tracking-wide text-white drop-shadow-2xl">
                Le Boraha
              </h1>
              <div className="w-12 h-[1px] bg-gold-400/80 my-2 shadow-[0_0_10px_rgba(212,175,55,0.8)]"></div>
              <span className="text-gold-400 tracking-[0.4em] uppercase text-[10px] md:text-xs font-bold drop-shadow-lg">
                Sanctuary
              </span>
          </div>
        </div>

        {/* Scroll Indicator */}
        <div 
          className="absolute bottom-12 z-20 animate-bounce cursor-pointer text-white/70 hover:text-white transition-colors"
          onClick={() => window.scrollTo({ top: window.innerHeight, behavior: 'smooth' })}
        >
          <ChevronDown className="w-6 h-6" strokeWidth={1} />
        </div>

      </section>
    </>
  );
};