import React, { useState, useEffect } from 'react';
import { Users, Loader2, CalendarCheck, Calendar, X, ChevronRight } from 'lucide-react';

interface BookingBarProps {
  onSearch: () => void;
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
}

export const BookingBar: React.FC<BookingBarProps> = ({ onSearch, isOpen, setIsOpen }) => {
  const [checkIn, setCheckIn] = useState('');
  const [checkOut, setCheckOut] = useState('');
  const [isSearching, setIsSearching] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      // Trigger transformation relative to Hero height
      setIsScrolled(window.scrollY > 150);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleSearch = () => {
    setIsSearching(true);
    setTimeout(() => {
      setIsSearching(false);
      setIsOpen(false); // Close sidebar on search
      onSearch();
    }, 1500);
  };

  return (
    <>
      {/* 1. OVERLAY (Background dimmer when sidebar is open) */}
      <div 
        className={`fixed inset-0 bg-navy-950/60 backdrop-blur-sm z-[60] transition-opacity duration-500 ${
          isOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
        }`}
        onClick={() => setIsOpen(false)}
      />

      {/* 2. TRIGGER A: HERO SIDE BAR (Vertical) 
          Disparaît vers la droite au scroll
      */}
      <button 
        onClick={() => setIsOpen(true)}
        className={`hidden md:flex fixed z-50 top-1/2 right-0 -translate-y-1/2 flex-col gap-6 py-10 px-3 rounded-l-2xl
          bg-white/10 backdrop-blur-md border border-white/20 text-white hover:bg-gold-500 hover:border-gold-500 hover:text-navy-950 shadow-2xl dark:shadow-[0_0_20px_rgba(212,175,55,0.3)]
          h-[300px] w-[50px] items-center justify-center transition-all duration-500 ease-in-out
          ${isScrolled ? 'translate-x-full opacity-0 pointer-events-none' : 'translate-x-0 opacity-100'}
        `}
      >
        <div className="rotate-0 scale-110">
          <CalendarCheck className="w-5 h-5" />
        </div>
        <span className="uppercase tracking-[0.25em] text-[10px] font-bold whitespace-nowrap [writing-mode:vertical-rl] rotate-180">
          Réserver
        </span>
      </button>

      {/* NOTE: TRIGGER B (Horizontal) a été déplacé dans Navbar.tsx pour un alignement parfait */}

      {/* 3. THE SIDEBAR DRAWER (Actual Form) */}
      {/* Suppression de shadow-2xl pour supprimer l'ombre latérale */}
      <div className={`fixed inset-y-0 right-0 z-[70] w-[350px] bg-navy-950 transform transition-transform duration-500 ease-[cubic-bezier(0.76,0,0.24,1)] border-l border-white/10 flex flex-col
          ${isOpen ? 'translate-x-0' : 'translate-x-full'}
      `}>
          
          {/* Drawer Header */}
          <div className="p-8 flex items-center justify-between border-b border-white/10">
            <div>
              <span className="text-gold-500 text-xs font-bold uppercase tracking-widest block mb-1">Votre Séjour</span>
              <h3 className="font-serif text-2xl text-white italic">Réservation</h3>
            </div>
            <button 
              onClick={() => setIsOpen(false)}
              className="w-10 h-10 rounded-full bg-white/5 hover:bg-white/20 flex items-center justify-center text-white transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Drawer Content */}
          <div className="p-8 flex-1 flex flex-col gap-8 overflow-y-auto">
             <p className="text-gray-400 font-light leading-relaxed">
               Configurez votre escapade idéale au Boraha Sanctuary. Nos concierges vous recontacteront pour personnaliser votre expérience.
             </p>

             <div className="space-y-6">
                {/* Dates */}
                <div className="space-y-4">
                    <div className="space-y-2">
                      <label className="text-xs uppercase tracking-widest text-gold-500 font-bold">Arrivée</label>
                      <div className="flex items-center bg-white/5 border border-white/10 rounded-lg p-3 hover:border-gold-500/50 transition-colors">
                          <Calendar className="w-4 h-4 text-gray-400 mr-3 shrink-0" />
                          <input 
                          type="date"
                          className="bg-transparent w-full text-white outline-none text-sm font-sans placeholder-gray-500"
                          value={checkIn}
                          onChange={(e) => setCheckIn(e.target.value)}
                          />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <label className="text-xs uppercase tracking-widest text-gold-500 font-bold">Départ</label>
                      <div className="flex items-center bg-white/5 border border-white/10 rounded-lg p-3 hover:border-gold-500/50 transition-colors">
                          <CalendarCheck className="w-4 h-4 text-gray-400 mr-3 shrink-0" />
                          <input 
                          type="date"
                          className="bg-transparent w-full text-white outline-none text-sm font-sans placeholder-gray-500"
                          value={checkOut}
                          onChange={(e) => setCheckOut(e.target.value)}
                          />
                      </div>
                    </div>
                </div>

                {/* Guests */}
                <div className="space-y-2">
                  <label className="text-xs uppercase tracking-widest text-gold-500 font-bold">Voyageurs</label>
                  <div className="flex items-center bg-white/5 border border-white/10 rounded-lg p-3 hover:border-gold-500/50 transition-colors">
                    <Users className="w-4 h-4 text-gray-400 mr-3 shrink-0" />
                    <select className="bg-transparent w-full text-white outline-none text-sm cursor-pointer [&>option]:text-navy-950">
                      <option>2 Adultes</option>
                      <option>1 Adulte</option>
                      <option>2 Adultes + 1 Enfant</option>
                      <option>2 Adultes + 2 Enfants</option>
                    </select>
                  </div>
                </div>
             </div>
          </div>

          {/* Drawer Footer */}
          <div className="p-8 border-t border-white/10 bg-navy-900/50">
            <button 
              onClick={handleSearch}
              disabled={isSearching}
              className="w-full h-14 bg-gold-500 hover:bg-gold-400 text-navy-950 rounded-full transition-all flex items-center justify-between px-6 shadow-lg shadow-gold-500/20 dark:shadow-[0_0_30px_rgba(212,175,55,0.4)] group font-bold uppercase tracking-widest text-xs"
            >
              {isSearching ? (
                <div className="w-full flex justify-center"><Loader2 className="w-5 h-5 animate-spin" /></div>
              ) : (
                <>
                  <span>Vérifier les disponibilités</span>
                  <div className="bg-navy-950/10 rounded-full p-1 group-hover:bg-navy-950/20 transition-colors">
                    <ChevronRight className="w-4 h-4" />
                  </div>
                </>
              )}
            </button>
            <p className="text-center text-[10px] text-gray-500 mt-4 uppercase tracking-wider">Meilleur tarif garanti</p>
          </div>
      </div>
    </>
  );
};