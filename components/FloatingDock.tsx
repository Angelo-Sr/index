import React, { useState, useEffect } from 'react';
import { CalendarCheck, Phone, MapPin } from 'lucide-react';

interface FloatingDockProps {
  onOpenBooking: () => void;
}

export const FloatingDock: React.FC<FloatingDockProps> = ({ onOpenBooking }) => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      // Apparaît uniquement après avoir scrollé plus bas que le Hero
      setIsVisible(window.scrollY > window.innerHeight * 0.8);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToBungalows = () => {
    const element = document.getElementById('bungalows');
    if (element) {
      // Offset mis à jour pour correspondre à la navbar (150px)
      const headerOffset = 150;
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
    }
  };

  return (
    <div className={`md:hidden fixed bottom-0 left-0 w-full z-40 px-5 py-2 pb-5 flex justify-between items-center
      bg-navy-950/95 backdrop-blur-md border-t border-white/10 shadow-[0_-10px_30px_rgba(0,0,0,0.5)] dark:shadow-[0_-10px_40px_rgba(212,175,55,0.2)]
      transition-all duration-500 ease-[cubic-bezier(0.32,0.72,0,1)]
      ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-full opacity-0'}
    `}>
      
      {/* Map Action - Icon Only */}
      <button 
         onClick={scrollToBungalows}
         className="p-2 text-white/50 hover:text-gold-400 active:scale-95 transition-all"
         aria-label="Voir la carte"
      >
         <MapPin strokeWidth={1.5} className="w-5 h-5" />
      </button>

      {/* Booking Action - Ultra Compact Pill */}
      <button 
        onClick={onOpenBooking}
        className="flex items-center gap-2 bg-gold-500 text-navy-950 px-5 py-2 rounded-full font-bold text-[10px] uppercase tracking-widest shadow-lg shadow-gold-500/20 dark:shadow-[0_0_20px_rgba(212,175,55,0.5)] active:scale-95 transition-transform"
      >
         <CalendarCheck className="w-3.5 h-3.5" />
         <span>Réserver</span>
      </button>
      
      {/* Phone Action - Icon Only */}
      <button 
        onClick={() => window.location.href = 'tel:+261205700000'}
        className="p-2 text-white/50 hover:text-gold-400 active:scale-95 transition-all"
        aria-label="Appeler la réception"
      >
        <Phone strokeWidth={1.5} className="w-5 h-5" />
      </button>

    </div>
  );
};