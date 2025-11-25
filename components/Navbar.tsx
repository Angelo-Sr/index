import React, { useState, useEffect, useRef } from 'react';
import { Menu, X, Sun, Moon, Calendar, ChevronRight } from 'lucide-react';
import { WeatherData, WeatherType } from '../types';

const WeatherWidget: React.FC<{ isNightMode?: boolean }> = ({ isNightMode }) => {
  const [weather] = useState<WeatherData>({
    temp: 28,
    condition: WeatherType.Sunny,
    city: 'Ste-Marie'
  });

  return (
    <div className="hidden md:flex items-center gap-3 text-white/90 font-light text-sm shrink-0">
      {isNightMode ? (
        <Moon className="w-4 h-4 text-gold-400" />
      ) : (
        <Sun className="w-4 h-4 text-gold-400" />
      )}
      <span>{isNightMode ? '22' : weather.temp}°c</span>
      <span className="opacity-50">|</span>
      <span className="uppercase tracking-wider text-xs">{weather.city}</span>
    </div>
  );
};

interface NavbarProps {
  onOpenBooking: () => void;
  isNightMode?: boolean;
  toggleNightMode?: () => void;
  currentRoute?: string;
}

const SECTIONS = [
  { id: 'home', label: 'Accueil', href: '#/' },
  { id: 'spirit', label: 'L\'Esprit', href: '#/#spirit' },
  { id: 'accommodation', label: 'Hébergement', href: '#/hebergement' },
  { id: 'dining', label: 'Gastronomie', href: '#/restaurant' },
  { id: 'spa', label: 'Bien-être', href: '#/spa' },
  { id: 'experiences', label: 'Expériences', href: '#/experiences' },
];

const PAGES = [
  { label: 'Accueil', href: '#/' },
  { label: 'Nos Villas & Suites', href: '#/hebergement' },
  { label: 'Restauration', href: '#/restaurant' },
  { label: 'Spa & Bien-être', href: '#/spa' },
  { label: 'Activités & Excursions', href: '#/experiences' },
  { label: 'Galerie Photos', href: '#/galerie' },
  { label: 'Contact & Accès', href: '#/contact' },
];

export const Navbar: React.FC<NavbarProps> = ({ onOpenBooking, isNightMode, toggleNightMode, currentRoute }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  
  // Si nous sommes sur une sous-page (pas l'accueil), la navbar doit être solide par défaut
  const isHomePage = currentRoute === '#/' || currentRoute === '' || currentRoute === '#';

  // Refs pour la gestion de la ligne fluide et du scroll auto
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const tabsRef = useRef<(HTMLButtonElement | null)[]>([]);
  const [indicatorStyle, setIndicatorStyle] = useState({ left: 0, width: 0, opacity: 0 });

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY;
      setIsScrolled(scrollPosition > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Effet pour mettre à jour la position de la ligne
  useEffect(() => {
    // Trouver l'index actif basé sur l'URL actuelle
    const activeIndex = SECTIONS.findIndex(section => {
        if (section.href === '#/') return currentRoute === '#/' || currentRoute === '';
        return currentRoute === section.href;
    });

    const currentTab = tabsRef.current[activeIndex];
    const container = scrollContainerRef.current;

    if (currentTab && container) {
      setIndicatorStyle({
        left: currentTab.offsetLeft,
        width: currentTab.offsetWidth,
        opacity: 1
      });

      const containerWidth = container.offsetWidth;
      const tabWidth = currentTab.offsetWidth;
      const tabLeft = currentTab.offsetLeft;
      const scrollLeft = tabLeft - (containerWidth / 2) + (tabWidth / 2);

      container.scrollTo({
        left: scrollLeft,
        behavior: 'smooth'
      });
    } else {
        setIndicatorStyle(prev => ({ ...prev, opacity: 0 }));
    }
  }, [currentRoute, isScrolled]);

  const handleNavigation = (href: string) => {
    window.location.hash = href;
    setIsMobileMenuOpen(false);
  };

  const navbarBackgroundClass = !isHomePage || isScrolled 
    ? 'bg-navy-950/90 shadow-xl backdrop-blur-md' 
    : 'bg-transparent pt-2';

  const logoSizeClass = !isHomePage || isScrolled
    ? 'text-2xl md:text-3xl' 
    : 'text-3xl md:text-5xl';

  const logoSubtitleClass = !isHomePage || isScrolled 
    ? 'text-[9px] mt-1' 
    : 'text-xs md:text-sm mt-1';

  const navHeightClass = !isHomePage || isScrolled 
    ? 'h-20' 
    : 'h-32 md:h-40';

  return (
    <>
      <header 
        className={`fixed top-0 w-full z-50 transition-all duration-700 flex flex-col ${navbarBackgroundClass}`}
      >
        {/* Barre Principale */}
        <nav className={`
          relative w-full px-6 md:px-12 flex justify-between items-center transition-all duration-700
          ${navHeightClass} 
        `}>
          
          {/* Menu Button */}
          <div className="flex items-center shrink-0 gap-6 z-10">
             <button 
              className="group flex items-center gap-3 text-white focus:outline-none"
              onClick={() => setIsMobileMenuOpen(true)}
            >
              <div className="space-y-1.5">
                 <span className="block w-8 h-0.5 bg-white transition-transform group-hover:translate-x-1"></span>
                 <span className="block w-6 h-0.5 bg-gold-400 transition-transform group-hover:translate-x-1"></span>
                 <span className="block w-4 h-0.5 bg-white transition-transform group-hover:translate-x-1"></span>
              </div>
              <span className="hidden md:block uppercase tracking-widest text-xs font-bold group-hover:text-gold-400 transition-colors">Menu</span>
            </button>
          </div>

          {/* Center: Logo */}
          <div className={`
            absolute inset-x-0 top-0 h-full flex flex-col items-center justify-center pointer-events-none transition-all duration-700
          `}>
            <div 
                className="flex flex-col items-center justify-center cursor-pointer pointer-events-auto"
                onClick={() => window.location.hash = '#/'}
            >
              <div className={`font-serif text-white font-bold tracking-wider transition-all duration-700 ${logoSizeClass}`}>
                LE BORAHA
              </div>
              <div className={`text-gold-400 uppercase tracking-[0.3em] font-bold transition-all duration-700 ${logoSubtitleClass}`}>
                Sanctuary
              </div>
            </div>

            {/* Switch Mode Jour/Nuit - Visible uniquement sur Accueil et non scrollé */}
            {toggleNightMode && isHomePage && (
              <div className={`
                  pointer-events-auto mt-5 flex items-center gap-6 transition-all duration-500
                  ${isScrolled 
                    ? 'opacity-0 h-0 overflow-hidden mt-0' 
                    : 'opacity-100'
                  }
              `}>
                 <button
                   onClick={() => isNightMode && toggleNightMode()}
                   className={`
                     text-[9px] uppercase tracking-[0.2em] font-medium transition-colors duration-500
                     ${!isNightMode ? 'text-gold-400' : 'text-white/30 hover:text-white/60'}
                   `}
                 >
                   Exploration Journée
                 </button>

                 <div className="w-[1px] h-3 bg-white/10"></div>

                 <button
                   onClick={() => !isNightMode && toggleNightMode()}
                   className={`
                     text-[9px] uppercase tracking-[0.2em] font-medium transition-colors duration-500
                     ${isNightMode ? 'text-gold-400' : 'text-white/30 hover:text-white/60'}
                   `}
                 >
                   Exploration Nuit
                 </button>
              </div>
            )}
          </div>

          {/* Right: Weather & Booking */}
          <div className="flex items-center justify-end z-10">
             <WeatherWidget isNightMode={isNightMode} />
             
             <div className={`
                hidden md:flex overflow-hidden transition-all duration-700 ease-[cubic-bezier(0.76,0,0.24,1)]
                ${(!isHomePage || isScrolled) ? 'max-w-[200px] opacity-100 ml-8' : 'max-w-0 opacity-0 ml-0'}
             `}>
               <button 
                onClick={onOpenBooking}
                className="flex items-center gap-3 text-white focus:outline-none group whitespace-nowrap"
               >
                 <span className="uppercase tracking-widest text-xs font-bold group-hover:text-gold-400 transition-colors">Réserver</span>
                 <Calendar className="w-5 h-5 text-gold-400 group-hover:scale-110 transition-transform" />
               </button>
             </div>
          </div>
        </nav>

        {/* Barre Secondaire (Navigation Sections) */}
        <div className={`
            w-full transition-all duration-700 ease-[cubic-bezier(0.76,0,0.24,1)] overflow-hidden
            ${(!isHomePage || isScrolled)
              ? 'max-h-[40px] opacity-100 border-t border-white/5 bg-navy-950/40'
              : 'max-h-0 opacity-0 border-none bg-transparent' 
            }
        `}>
          <div className="w-full h-full flex items-center justify-center">
            <div 
              ref={scrollContainerRef}
              className="relative w-full overflow-x-auto scrollbar-none px-6 py-1 mask-image-r flex items-center"
            >
               <div className="flex items-center gap-8 md:gap-10 mx-auto relative">
                 <div 
                    className="absolute bottom-0 h-[2px] bg-gold-400 transition-all duration-500 ease-out shadow-[0_0_10px_rgba(212,175,55,0.5)] z-0"
                    style={{
                      left: `${indicatorStyle.left}px`,
                      width: `${indicatorStyle.width}px`,
                      opacity: indicatorStyle.opacity
                    }}
                 />

                 {SECTIONS.map((section, index) => (
                   <button
                      key={section.id}
                      ref={(el) => { tabsRef.current[index] = el }}
                      onClick={() => handleNavigation(section.href)}
                      className={`
                        relative shrink-0 text-[9px] md:text-[10px] uppercase tracking-[0.2em] font-bold transition-colors duration-500 py-2 z-10
                        ${currentRoute === section.href 
                          ? 'text-white' 
                          : 'text-white/50 hover:text-white/80'
                        }
                      `}
                   >
                      {section.label}
                   </button>
                 ))}
               </div>
            </div>
          </div>
        </div>
      </header>

      {/* Mobile Drawer Overlay */}
      <div 
        className={`fixed inset-0 bg-navy-950/60 backdrop-blur-sm z-[60] transition-opacity duration-500 ${
          isMobileMenuOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
        }`}
        onClick={() => setIsMobileMenuOpen(false)}
      />

      {/* Mobile Drawer */}
      <div className={`fixed inset-y-0 left-0 z-[70] w-[350px] bg-navy-950 transform transition-transform duration-500 ease-[cubic-bezier(0.76,0,0.24,1)] border-r border-white/10 flex flex-col
          ${isMobileMenuOpen ? 'translate-x-0' : '-translate-x-full'}
      `}>
          <div className="p-8 flex items-center justify-between border-b border-white/10">
            <div>
              <span className="text-gold-500 text-xs font-bold uppercase tracking-widest block mb-1">Explorer</span>
              <h3 className="font-serif text-2xl text-white italic">Navigation</h3>
            </div>
            <button 
              onClick={() => setIsMobileMenuOpen(false)}
              className="w-10 h-10 rounded-full bg-white/5 hover:bg-white/20 flex items-center justify-center text-white transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          <div className="p-8 flex-1 flex flex-col justify-center gap-8">
            {PAGES.map((page) => (
              <button 
                key={page.label}
                onClick={() => handleNavigation(page.href)}
                className="group flex items-center justify-between text-2xl font-serif text-white/80 hover:text-gold-400 hover:italic transition-all duration-300 w-full text-left"
              >
                <span>{page.label}</span>
                <ChevronRight className="w-5 h-5 opacity-0 -translate-x-4 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300 text-gold-500" />
              </button>
            ))}
          </div>

          <div className="p-8 border-t border-white/10 bg-navy-900/50">
             <div className="text-center">
                <div className="font-serif text-white font-bold tracking-wider text-xl mb-1">LE BORAHA</div>
                <div className="text-gold-500 uppercase tracking-[0.2em] text-[10px]">Sanctuary</div>
                <p className="text-white/40 text-[10px] mt-4 uppercase tracking-wider">Île Sainte-Marie, Madagascar</p>
             </div>
          </div>
      </div>
    </>
  );
};