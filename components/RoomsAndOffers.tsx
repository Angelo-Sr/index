import React, { useState, useEffect, useRef } from 'react';
import { ROOMS, GUEST_ROOMS, OFFERS, EVENTS } from '../constants';
import { ChevronLeft, ChevronRight, ArrowRight, Waves, Map, Martini, Briefcase, Plus, Utensils, Wine, Sparkles, Calendar, Camera, X, Star, Quote } from 'lucide-react';
import { Room } from '../types';

// Mapping des icônes pour les activités
const ACTIVITY_ICONS: Record<string, React.ReactNode> = {
  'baleine': <Waves className="w-5 h-5" />,
  'tour-ile': <Map className="w-5 h-5" />,
  'cocktail': <Martini className="w-5 h-5" />,
  'seminaire': <Briefcase className="w-5 h-5" />
};

interface RoomShowcaseProps {
  title: string;
  subtitle: string;
  rooms: Room[];
  reverse?: boolean;
  isNightMode?: boolean;
}

const RoomShowcase: React.FC<RoomShowcaseProps> = ({ title, subtitle, rooms, reverse = false, isNightMode }) => {
  const [activeRoomIndex, setActiveRoomIndex] = useState(0);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [touchStart, setTouchStart] = useState(0);
  const [touchEnd, setTouchEnd] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  
  const activeRoom = rooms[activeRoomIndex];
  const nextRoom = rooms[(activeRoomIndex + 1) % rooms.length];

  // Helper to get correct images based on mode
  const getRoomImages = (room: Room) => {
    return (isNightMode && room.nightImages && room.nightImages.length > 0) ? room.nightImages : room.images;
  };

  const activeImages = getRoomImages(activeRoom);
  const nextImages = getRoomImages(nextRoom);

  // Reset image index when room changes
  useEffect(() => {
    setCurrentImageIndex(0);
  }, [activeRoomIndex, isNightMode]); // Reset when mode changes too

  // Auto-play for images
  useEffect(() => {
    const timer = setInterval(() => {
      if (!isPaused) {
        setCurrentImageIndex((prev) => (prev + 1) % activeImages.length);
      }
    }, 4000); 

    return () => clearInterval(timer);
  }, [activeImages.length, isPaused]);

  const handleNextRoom = () => {
    setActiveRoomIndex((prev) => (prev + 1) % rooms.length);
  };

  const handlePrevRoom = () => {
    setActiveRoomIndex((prev) => (prev - 1 + rooms.length) % rooms.length);
  };

  const nextImage = (e?: React.MouseEvent) => {
    e?.stopPropagation();
    setCurrentImageIndex((prev) => (prev + 1) % activeImages.length);
  };

  const prevImage = (e?: React.MouseEvent) => {
    e?.stopPropagation();
    setCurrentImageIndex((prev) => (prev - 1 + activeImages.length) % activeImages.length);
  };

  const handleTouchStart = (e: React.TouchEvent) => {
    setTouchStart(e.targetTouches[0].clientX);
    setIsPaused(true);
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    setTouchEnd(e.targetTouches[0].clientX);
  };

  const handleTouchEnd = () => {
    setIsPaused(false);
    if (!touchStart || !touchEnd) return;
    const distance = touchStart - touchEnd;
    const isLeftSwipe = distance > 50;
    const isRightSwipe = distance < -50;

    if (isLeftSwipe) {
      setCurrentImageIndex((prev) => (prev + 1) % activeImages.length);
    }
    if (isRightSwipe) {
      setCurrentImageIndex((prev) => (prev - 1 + activeImages.length) % activeImages.length);
    }
    
    setTouchStart(0);
    setTouchEnd(0);
  };

  const animationClass = reverse ? 'reveal-right' : 'reveal-left';

  return (
    <div className="w-full mb-16 md:mb-32">
        {/* Header Text - Align right if reverse is true */}
        <div className={`w-[96%] max-w-[1920px] mx-auto px-4 mb-8 relative z-10 flex flex-col ${reverse ? 'items-end text-right' : 'items-start text-left'}`}>
            <span className="text-gold-600 font-serif italic text-sm md:text-xl block mb-2">{subtitle}</span>
            <h3 className="text-3xl md:text-6xl font-serif font-bold text-navy-900 dark:text-white reveal transition-colors duration-700">{title}</h3>
        </div>

        <div className="relative w-[96%] max-w-[1920px] mx-auto h-[500px] md:h-[650px] group/container">
            {/* MAIN IMAGE CONTAINER */}
            <div 
                className={`absolute 
                  left-0 right-0 top-0 h-[70%] 
                  md:w-[60%] md:h-[90%] md:top-1/2 md:-translate-y-1/2
                  ${reverse 
                    ? 'md:right-0 md:left-auto shadow-[-30px_0_60px_rgba(0,0,0,0.3)] dark:shadow-[0_0_50px_rgba(212,175,55,0.15)]' 
                    : 'md:left-0 md:right-auto shadow-[30px_0_60px_rgba(0,0,0,0.3)] dark:shadow-[0_0_50px_rgba(212,175,55,0.15)]'
                  }
                  z-20 overflow-hidden group select-none 
                  rounded-2xl
                  transition-all duration-700 ease-out`}
                onMouseEnter={() => setIsPaused(true)}
                onMouseLeave={() => setIsPaused(false)}
                onTouchStart={handleTouchStart}
                onTouchMove={handleTouchMove}
                onTouchEnd={handleTouchEnd}
            >
                <div 
                    key={activeRoom.id} 
                    className="flex w-full h-full transition-transform duration-[1500ms] cubic-bezier(0.25, 1, 0.5, 1)"
                    style={{ transform: `translateX(-${currentImageIndex * 100}%)` }}
                >
                    {activeImages.map((img, idx) => (
                        <div key={`${activeRoom.id}-${idx}`} className="w-full h-full shrink-0 relative">
                             <img 
                                src={img} 
                                alt={`${activeRoom.name} view ${idx + 1}`}
                                className="w-full h-full object-cover animate-ken-burns"
                            />
                            {/* Gradient Overlay on Image */}
                            <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent opacity-60"></div>
                        </div>
                    ))}
                </div>

                {/* Navigation Arrows (Desktop) */}
                <div className="hidden md:flex absolute inset-0 justify-between items-center px-8 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none">
                    <button 
                        onClick={prevImage} 
                        className="pointer-events-auto w-14 h-14 rounded-full bg-white/10 backdrop-blur-md hover:bg-white text-white hover:text-navy-900 flex items-center justify-center transition-all duration-300 border border-white/20 shadow-xl dark:shadow-[0_0_15px_rgba(255,255,255,0.3)]"
                    >
                        <ChevronLeft className="w-6 h-6" />
                    </button>
                    <button 
                        onClick={nextImage} 
                        className="pointer-events-auto w-14 h-14 rounded-full bg-white/10 backdrop-blur-md hover:bg-white text-white hover:text-navy-900 flex items-center justify-center transition-all duration-300 border border-white/20 shadow-xl dark:shadow-[0_0_15px_rgba(255,255,255,0.3)]"
                    >
                        <ChevronRight className="w-6 h-6" />
                    </button>
                </div>

                {/* Pagination Dots */}
                <div className="absolute bottom-6 md:bottom-8 left-6 md:left-10 flex gap-3 z-30 pointer-events-none">
                    {activeImages.map((_, idx) => (
                        <div
                            key={idx}
                            className={`h-1.5 rounded-full transition-all duration-700 shadow-sm ${
                                idx === currentImageIndex 
                                ? 'w-12 bg-gold-400' 
                                : 'w-2.5 bg-white/40'
                            }`}
                        />
                    ))}
                </div>
            </div>

            {/* PREVIEW NEXT ROOM (Colored Blur Effect) */}
            <div className={`hidden md:block absolute top-0 h-full w-[65%] z-10 
                 transition-all duration-1000 ease-[cubic-bezier(0.25,1,0.5,1)] 
                 select-none overflow-hidden
                ${reverse ? 'left-0' : 'right-0'}`}
            >
                 {/* The "Colored Blur" Overlay */}
                 <div className="absolute inset-0 bg-navy-900/60 dark:bg-black/70 backdrop-blur-md z-20 transition-all duration-700"></div>
                 
                 <div key={nextRoom.id} className="w-full h-full animate-fade-in">
                   <img 
                    src={nextImages[0]} 
                    alt="Next Room"
                    className="w-full h-full object-cover grayscale-[30%] transition-all duration-[1500ms] scale-105 ease-out"
                  />
                 </div>
                
                <div className={`absolute bottom-10 z-30 text-white transition-transform duration-500
                   ${reverse ? 'left-10' : 'right-10 text-right'} 
                `}>
                   <span className="uppercase tracking-widest text-xs font-bold mb-2 block text-gold-400">Suivant</span>
                   <h4 className="text-3xl font-serif">{nextRoom.name}</h4>
                </div>
            </div>

            {/* INFO CARD WRAPPER - Animation Slide from Image (Horizontal) */}
            <div className={`absolute 
              bottom-0 left-4 right-4 h-[230px]
              md:top-1/2 md:-translate-y-1/2 md:bottom-auto md:w-[400px] md:h-[420px]
              ${reverse ? 'md:left-[4%] md:right-auto' : 'md:right-[4%] md:left-auto'}
              z-30`}
            >
                {/* Apply dynamic class here: reveal-left or reveal-right */}
                <div className={`${animationClass} w-full h-full`}>
                    <div className={`w-full h-full
                        bg-white/95 dark:bg-navy-900/95 md:bg-white/95 
                        backdrop-blur-2xl shadow-[0_8px_32px_rgba(0,0,0,0.15)] dark:shadow-[0_0_30px_rgba(255,255,255,0.1)]
                        border border-white/50 dark:border-white/10
                        rounded-2xl 
                        flex flex-col justify-between p-6 md:p-10 transition-all duration-700 hover:scale-[1.02]`}
                    >
                        <div key={activeRoom.id} className="flex flex-col h-full">
                        <div className="shrink-0">
                            <div className="flex justify-between items-start mb-2">
                                <h2 className="text-xl md:text-3xl font-serif text-navy-900 dark:text-white truncate pr-2 transition-colors duration-700">{activeRoom.name}</h2>
                                <span className="md:hidden text-lg text-gold-600 font-serif font-bold">{activeRoom.price}€</span>
                            </div>
                            <div className="hidden md:flex items-baseline gap-3 mb-6">
                            <span className="text-3xl text-gold-600 font-serif font-bold">{activeRoom.price}€</span>
                            <span className="text-xs text-navy-800 dark:text-gray-300 uppercase tracking-widest font-bold">Par Nuit</span>
                            </div>
                        </div>

                        <div className="flex-1 overflow-y-auto pr-2 my-2 scrollbar-none md:scrollbar-thin scrollbar-thumb-gold-400 scrollbar-track-transparent mask-image-b scroll-smooth">
                            <p className="text-navy-900/80 dark:text-gray-300 mb-6 leading-relaxed font-medium text-xs md:text-sm text-justify hyphens-auto transition-colors duration-700">
                            {activeRoom.description}
                            </p>
                            
                            <div className="flex flex-wrap gap-2">
                            {activeRoom.amenities.map((am, i) => (
                                <span key={i} className="text-[10px] md:text-[11px] font-bold uppercase tracking-wider text-navy-900 dark:text-white bg-green-50/50 dark:bg-navy-800/50 border border-green-100 dark:border-navy-700 px-3 py-1.5 rounded-full whitespace-nowrap shadow-sm dark:shadow-[0_0_10px_rgba(255,255,255,0.2)] transition-colors duration-700">
                                    {am}
                                </span>
                            ))}
                            </div>
                        </div>

                        <div className="shrink-0 pt-4 md:pt-6 border-t border-navy-900/10 dark:border-white/10 flex justify-between items-center transition-colors duration-700">
                            <button className="group text-navy-950 dark:text-white font-bold uppercase tracking-[0.2em] text-[10px] md:text-xs flex items-center gap-2 hover:text-gold-600 transition-colors">
                                Réserver
                                <ArrowRight className="w-3 h-3 group-hover:translate-x-1 transition-transform duration-300" />
                            </button>

                            <div className="flex gap-2">
                                <button onClick={handlePrevRoom} className="w-9 h-9 md:w-11 md:h-11 rounded-full border border-navy-900/20 dark:border-white/20 bg-transparent flex items-center justify-center text-navy-900 dark:text-white hover:bg-navy-900 dark:hover:bg-white dark:hover:text-navy-900 hover:text-white transition-all duration-300 active:scale-95"><ChevronLeft className="w-4 h-4"/></button>
                                <button onClick={handleNextRoom} className="w-9 h-9 md:w-11 md:h-11 rounded-full border border-navy-900/20 dark:border-white/20 bg-transparent flex items-center justify-center text-navy-900 dark:text-white hover:bg-navy-900 dark:hover:bg-white dark:hover:text-navy-900 hover:text-white transition-all duration-300 active:scale-95"><ChevronRight className="w-4 h-4"/></button>
                            </div>
                        </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
  );
};

// --- SECTION SPA (New) ---
const SpaSection: React.FC = () => {
  return (
    <section id="spa" className="relative w-full py-24 md:py-32 bg-white/90 dark:bg-navy-950/90 backdrop-blur-2xl text-navy-950 dark:text-white overflow-hidden border-t border-navy-900/5 dark:border-white/5 transition-colors duration-1000 z-10">
       {/* Decor */}
       <div className="absolute top-0 left-0 w-[400px] h-[400px] bg-green-50/50 dark:bg-navy-900/50 rounded-full blur-[80px] pointer-events-none -translate-x-1/2 -translate-y-1/2 transition-colors duration-1000"></div>
       <div className="absolute bottom-0 right-0 w-[500px] h-[500px] bg-green-50/50 dark:bg-navy-900/50 rounded-full blur-[100px] pointer-events-none translate-x-1/2 translate-y-1/2 transition-colors duration-1000"></div>

       <div className="w-[90%] max-w-[1400px] mx-auto relative z-10">
          {/* Header */}
          <div className="text-center mb-20 reveal">
             <span className="text-gold-600 font-bold tracking-[0.2em] text-xs uppercase block mb-4">Bien-être</span>
             <h2 className="text-4xl md:text-6xl font-serif text-navy-900 dark:text-white transition-colors duration-1000">Sanctuaire des Sens</h2>
             <div className="w-24 h-0.5 bg-gradient-to-r from-transparent via-gold-500 to-transparent mx-auto mt-6"></div>
          </div>

          {/* Content */}
          <div className="grid md:grid-cols-12 gap-10 md:gap-20 items-center">
             {/* Text - Left -> reveal-left */}
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

             {/* Image - Right */}
             <div className="md:col-span-7 relative group reveal order-1 md:order-2">
                <div className="overflow-hidden rounded-2xl h-[400px] md:h-[600px] shadow-2xl dark:shadow-[0_0_60px_rgba(212,175,55,0.2)] relative border border-white/50 dark:border-white/10">
                   <img
                      src="https://images.unsplash.com/photo-1544161515-4ab6ce6db874?q=80&w=1600&auto=format&fit=crop"
                      alt="Spa Massage Relax"
                      className="w-full h-full object-cover animate-ken-burns"
                   />
                   {/* Light Overlay */}
                   <div className="absolute inset-0 bg-gradient-to-t from-white/20 via-transparent to-transparent"></div>
                </div>
             </div>
          </div>
       </div>
    </section>
  );
};

// --- SECTION RESTAURANT & BAR (Updated Design) ---
const DiningSection: React.FC = () => {
  return (
    <section id="dining" className="relative w-full py-24 md:py-32 bg-navy-950/95 backdrop-blur-2xl dark:bg-black/90 text-white overflow-hidden transition-colors duration-1000 z-10">
       {/* Background Decoration */}
       <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-green-900/20 rounded-full blur-[100px] pointer-events-none translate-x-1/2 -translate-y-1/2"></div>
       <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-green-900/20 rounded-full blur-[80px] pointer-events-none -translate-x-1/2 translate-y-1/2"></div>

       <div className="w-[90%] max-w-[1400px] mx-auto relative z-10">
          
          {/* Section Header */}
          <div className="text-center mb-20 reveal">
             <span className="text-gold-500 font-bold tracking-[0.2em] text-xs uppercase block mb-4">Gastronomie</span>
             <h2 className="text-4xl md:text-6xl font-serif">Éveil des Sens</h2>
             <div className="w-24 h-0.5 bg-gradient-to-r from-transparent via-gold-500 to-transparent mx-auto mt-6"></div>
          </div>

          {/* Restaurant Block - "La Crique" */}
          <div className="grid md:grid-cols-12 gap-10 md:gap-20 items-center mb-24 md:mb-32">
             <div className="md:col-span-7 relative group reveal">
                {/* Image Container */}
                <div className="overflow-hidden rounded-2xl h-[400px] md:h-[550px] shadow-2xl dark:shadow-[0_0_60px_rgba(212,175,55,0.2)] relative border border-white/10">
                   <img 
                      src="https://images.unsplash.com/photo-1595159040375-7b50f75e74c8?q=80&w=1600&auto=format&fit=crop" 
                      alt="Restaurant La Crique" 
                      className="w-full h-full object-cover animate-ken-burns"
                   />
                   <div className="absolute inset-0 bg-gradient-to-t from-navy-950/80 via-transparent to-transparent opacity-60"></div>
                </div>
             </div>
             
             <div className="md:col-span-5 reveal-left">
                <div className="flex items-center gap-3 mb-4">
                  <Utensils className="w-5 h-5 text-gold-400" />
                  <span className="text-gold-400 font-serif italic">Table d'Hôte</span>
                </div>
                <h3 className="text-4xl md:text-5xl font-serif text-white mb-8">La Crique</h3>
                <p className="text-gray-300 font-light text-base leading-loose mb-8 text-justify hyphens-auto">
                   Surplombant l'Océan Indien, notre restaurant propose une cuisine fusion où les épices de Madagascar rencontrent le savoir-faire français. Langoustes grillées, carpaccio de thon jaune et vanille de l'île : chaque assiette est une fenêtre ouverte sur les saveurs locales.
                </p>
                
                {/* Tags / Amenities Style */}
                <div className="flex flex-wrap gap-3 mb-8">
                   {['Produits Frais', 'Vue Panoramique', 'Pêche du Jour'].map((tag) => (
                      <span key={tag} className="text-[10px] font-bold uppercase tracking-wider text-white bg-white/10 border border-white/20 px-3 py-1.5 rounded-full">
                        {tag}
                      </span>
                   ))}
                </div>

                <button className="group text-gold-400 font-bold uppercase tracking-[0.2em] text-[10px] md:text-xs flex items-center gap-3 hover:text-white transition-colors">
                   Découvrir le Menu
                   <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-300" />
                </button>
             </div>
          </div>

          {/* Bar Block - "Le Note Rétro" */}
          <div className="grid md:grid-cols-12 gap-10 md:gap-20 items-center">
             
             <div className="md:col-span-5 order-2 md:order-1 reveal-right text-left md:text-right flex flex-col items-start md:items-end">
                <div className="flex items-center gap-3 mb-4">
                  <span className="text-gold-400 font-serif italic">Lounge Bar</span>
                  <Wine className="w-5 h-5 text-gold-400" />
                </div>
                <h3 className="text-4xl md:text-5xl font-serif text-white mb-8">Le Note Rétro</h3>
                <p className="text-gray-300 font-light text-base leading-loose mb-8 text-justify hyphens-auto" dir="ltr">
                   Lorsque le soleil plonge dans la mer, le Note Rétro s'éveille. Dans une ambiance feutrée mêlant jazz et bruits des vagues, nos mixologues créent des cocktails signatures à base de rhums arrangés maison et de fruits exotiques. L'endroit idéal pour refaire le monde.
                </p>

                {/* Tags / Amenities Style */}
                <div className="flex flex-wrap gap-3 mb-8 justify-start md:justify-end">
                   {['Rhums Arrangés', 'Jazz Live', 'Sunset View'].map((tag) => (
                      <span key={tag} className="text-[10px] font-bold uppercase tracking-wider text-white bg-white/10 border border-white/20 px-3 py-1.5 rounded-full">
                        {tag}
                      </span>
                   ))}
                </div>

                 <button className="group text-gold-400 font-bold uppercase tracking-[0.2em] text-[10px] md:text-xs flex items-center gap-3 hover:text-white transition-colors">
                   Carte des Cocktails
                   <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-300" />
                </button>
             </div>

             <div className="md:col-span-7 order-1 md:order-2 relative group reveal">
                 <div className="overflow-hidden rounded-2xl h-[400px] md:h-[550px] shadow-2xl dark:shadow-[0_0_60px_rgba(212,175,55,0.2)] relative border border-white/10">
                   <img 
                      src="https://images.unsplash.com/photo-1543007630-9710e4a00a20?q=80&w=1600&auto=format&fit=crop" 
                      alt="Bar Lounge Cocktail" 
                      className="w-full h-full object-cover animate-ken-burns"
                   />
                   <div className="absolute inset-0 bg-gradient-to-t from-navy-950/80 via-transparent to-transparent opacity-60"></div>
                </div>
             </div>

          </div>
       </div>
    </section>
  );
};

// --- NEW SECTION: EVENTS & PROMOTIONS ---
const EventsSection: React.FC<{ isNightMode?: boolean }> = ({ isNightMode }) => {
  return (
    <section id="events" className="relative w-full py-24 bg-white/90 dark:bg-navy-950/90 backdrop-blur-2xl text-navy-950 dark:text-white overflow-hidden transition-colors duration-1000 z-10">
        <div className="w-[90%] max-w-[1400px] mx-auto relative z-10">
            {/* Header */}
            <div className="text-center mb-16 reveal">
                 <span className="text-gold-600 font-bold tracking-[0.2em] text-xs uppercase block mb-4">Agenda</span>
                 <h2 className="text-4xl md:text-5xl font-serif text-navy-900 dark:text-white transition-colors duration-1000">Événements & Promotions</h2>
                 <div className="w-24 h-0.5 bg-gradient-to-r from-transparent via-gold-500 to-transparent mx-auto mt-6"></div>
            </div>

            {/* Events Grid / Scrollable on Mobile with Snap */}
            <div className="flex md:grid md:grid-cols-3 gap-6 md:gap-8 overflow-x-auto md:overflow-visible snap-x snap-mandatory -mx-4 px-4 md:mx-0 md:px-0 pb-8 md:pb-0 scrollbar-none items-stretch">
               {EVENTS.map((event, index) => {
                 const imageSrc = (isNightMode && event.nightImage) ? event.nightImage : event.image;

                 return (
                   <div key={event.id} className="group reveal flex flex-col h-full min-w-[85vw] md:min-w-0 snap-center transition-all duration-500">
                      {/* Image with Aesthetic Radius */}
                      <div className="relative h-64 overflow-hidden rounded-2xl shadow-lg dark:shadow-[0_0_30px_rgba(255,255,255,0.1)] mb-6 group-hover:-translate-y-2 transition-transform duration-500 border border-black/5 dark:border-white/5">
                         <img 
                           src={imageSrc} 
                           alt={event.title}
                           className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110"
                         />
                         <div className="absolute top-4 left-4 bg-white/90 dark:bg-navy-900/90 backdrop-blur-sm px-4 py-1.5 rounded-full shadow-md dark:shadow-[0_0_10px_rgba(255,255,255,0.2)]">
                            <span className="text-[10px] font-bold uppercase tracking-widest text-navy-950 dark:text-white">{event.tag}</span>
                         </div>
                      </div>

                      {/* Content */}
                      <div className="flex flex-col flex-1 px-2">
                         <div className="flex items-center gap-2 text-gold-600 mb-3">
                            <Calendar className="w-4 h-4" />
                            <span className="text-xs font-bold uppercase tracking-wider">{event.date}</span>
                         </div>
                         <h3 className="text-2xl font-serif text-navy-900 dark:text-white mb-4 group-hover:text-gold-600 transition-colors">{event.title}</h3>
                         <p className="text-gray-600 dark:text-gray-400 text-sm leading-relaxed mb-6 flex-1 text-justify hyphens-auto transition-colors duration-1000">
                            {event.description}
                         </p>
                         <button className="self-start text-navy-900 dark:text-white font-bold text-xs uppercase tracking-widest border-b border-gold-400 pb-1 hover:text-gold-600 transition-colors">
                            En savoir plus
                         </button>
                      </div>
                   </div>
                 )
               })}
            </div>
        </div>
    </section>
  )
}

// --- NEW SECTION: GALLERY (Instants Volés) ---
interface GalleryImage {
    id: number;
    src: string;
    alt: string;
    title: string;
    description: string;
}

const GALLERY_IMAGES: GalleryImage[] = [
    {
        id: 1,
        src: "https://images.unsplash.com/photo-1544644181-1484b3fdfc62?q=80&w=1600&auto=format&fit=crop",
        alt: "Texture Sable et Eau",
        title: "Empreintes",
        description: "Le sable blanc et fin de Sainte-Marie, caressé par les eaux cristallines du lagon, offre un spectacle de textures en perpétuel mouvement, rappelant la douceur de vivre insulaire."
    },
    {
        id: 2,
        src: "https://images.unsplash.com/photo-1573126617899-41f1dffb1821?q=80&w=1600&auto=format&fit=crop",
        alt: "Vue Aérienne Lagon",
        title: "L'Infini Bleu",
        description: "Une vue imprenable sur les nuances de turquoise qui entourent l'île. Ce dégradé naturel invite à la contemplation et à la plongée dans un monde sous-marin préservé."
    },
    {
        id: 3,
        src: "https://images.unsplash.com/photo-1519046904884-53103b34b206?q=80&w=1600&auto=format&fit=crop",
        alt: "Détail Coquillage Luxe",
        title: "Trésors Marins",
        description: "Chaque détail compte. Les coquillages, polis par les marées, deviennent des bijoux naturels qui ornent nos rivages, témoins silencieux de la vie foisonnante de l'Océan Indien."
    },
    {
        id: 4,
        src: "https://images.unsplash.com/photo-1605537964076-3891b2bf1d63?q=80&w=1600&auto=format&fit=crop",
        alt: "Intérieur Bois",
        title: "Chaleur du Bois",
        description: "L'architecture vernaculaire utilise des bois précieux locaux pour créer une atmosphère chaleureuse et intime, où la lumière filtre doucement à travers les persiennes."
    },
    {
        id: 5,
        src: "https://images.unsplash.com/photo-1510414842594-a61c69b5ae57?q=80&w=1600&auto=format&fit=crop",
        alt: "Coucher de Soleil",
        title: "Crépuscule Doré",
        description: "L'heure magique où le ciel s'embrase. Depuis votre terrasse, assistez au spectacle quotidien du soleil plongeant dans l'océan, peignant l'horizon de teintes or et pourpre."
    },
    {
        id: 6,
        src: "https://images.unsplash.com/photo-1582610116397-edb9285168b9?q=80&w=1600&auto=format&fit=crop",
        alt: "Fleur Exotique",
        title: "Flore Tropicale",
        description: "Notre jardin botanique abrite des espèces endémiques rares. Les orchidées sauvages et les fleurs de frangipanier parfument l'air d'une fragrance enivrante et sucrée."
    },
     {
        id: 7,
        src: "https://images.unsplash.com/photo-1468581264429-2548ef9eb732?q=80&w=1600&auto=format&fit=crop",
        alt: "Mer Sauvage",
        title: "Écume",
        description: "La force de l'océan Indien se brisant sur la barrière de corail au loin."
    },
    {
        id: 8,
        src: "https://images.unsplash.com/photo-1596436889106-be35e843f974?q=80&w=1600&auto=format&fit=crop",
        alt: "Lémurien",
        title: "Rencontre",
        description: "Nos voisins curieux, les lémuriens, qui visitent parfois les jardins."
    }
];

const GallerySection: React.FC = () => {
    const [selectedImage, setSelectedImage] = useState<GalleryImage | null>(null);

    // Doubling images for marquee effect
    const marqueeImages = [...GALLERY_IMAGES, ...GALLERY_IMAGES];

    return (
        <section id="gallery" className="relative w-full py-24 bg-navy-50/90 dark:bg-black/90 backdrop-blur-2xl transition-colors duration-1000 overflow-hidden z-10">
             <div className="w-full relative z-10">
                {/* Header */}
                <div className="text-center mb-12 reveal px-4">
                     <span className="text-gold-600 font-bold tracking-[0.2em] text-xs uppercase block mb-4">Galerie</span>
                     <h2 className="text-4xl md:text-5xl font-serif text-navy-900 dark:text-white transition-colors duration-1000">Instants Volés</h2>
                     <div className="w-24 h-0.5 bg-gradient-to-r from-transparent via-gold-500 to-transparent mx-auto mt-6"></div>
                     <p className="text-gray-500 dark:text-gray-400 text-sm md:text-base max-w-2xl mx-auto font-light leading-relaxed mt-6 transition-colors duration-1000">
                        Glissez à travers nos souvenirs.
                     </p>
                </div>

                {/* Animated Marquee Container - Slightly Smaller Height */}
                <div className="w-full relative overflow-hidden h-[400px] md:h-[450px]">
                   <div className="flex animate-marquee hover:animation-play-state-paused w-max gap-4 px-4 h-full items-center">
                      
                      {/* Using CSS Grid within the Flex item to create the Mosaic effect */}
                      <div className="grid grid-rows-2 grid-flow-col gap-4 h-full">
                         {marqueeImages.map((img, index) => {
                             // Varied Layout Logic using modulo
                             // Index % 5 pattern:
                             // 0: Span 2 Rows (Tall)
                             // 1: Span 1 Row (Stacked Top)
                             // 2: Span 1 Row (Stacked Bottom)
                             // 3: Span 2 Rows + Wider (Wide)
                             // 4: Span 2 Rows (Tall)
                             
                             let spanClass = "row-span-2 w-[250px] md:w-[300px]"; // Default Tall
                             
                             if (index % 5 === 1 || index % 5 === 2) {
                                spanClass = "row-span-1 w-[250px] md:w-[300px]"; // Stacked
                             } else if (index % 5 === 3) {
                                spanClass = "row-span-2 w-[350px] md:w-[500px]"; // Wide
                             }

                             return (
                                <div 
                                    key={`${img.id}-${index}`}
                                    onClick={() => setSelectedImage(img)}
                                    className={`
                                        relative rounded-2xl overflow-hidden cursor-pointer group 
                                        shadow-lg dark:shadow-[0_0_20px_rgba(255,255,255,0.05)]
                                        border border-white/20 dark:border-white/5
                                        transition-all duration-500 hover:scale-[0.98] hover:shadow-2xl
                                        ${spanClass}
                                    `}
                                >
                                    <img 
                                        src={img.src} 
                                        alt={img.alt} 
                                        className="w-full h-full object-cover transition-transform duration-[1.5s] ease-[cubic-bezier(0.25,1,0.5,1)] group-hover:scale-110"
                                    />
                                    {/* Overlay Gradient on Hover */}
                                    <div className="absolute inset-0 bg-navy-950/40 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                                    
                                    {/* Center Icon on Hover */}
                                    <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                                        <div className="w-12 h-12 bg-white/20 backdrop-blur-md rounded-full flex items-center justify-center border border-white/30 text-white transform scale-75 group-hover:scale-100 transition-transform duration-500">
                                            <Camera className="w-5 h-5" strokeWidth={1.5} />
                                        </div>
                                    </div>
                                    
                                    {/* Description on Hover (No Click Required) */}
                                    <div className="absolute bottom-0 left-0 w-full p-4 md:p-6 bg-gradient-to-t from-navy-950/90 to-transparent translate-y-4 group-hover:translate-y-0 opacity-0 group-hover:opacity-100 transition-all duration-500">
                                        <span className="text-gold-400 text-[10px] md:text-xs font-bold uppercase tracking-widest block mb-1">{img.title}</span>
                                        <p className="text-white/80 text-[10px] md:text-xs line-clamp-2 leading-relaxed">{img.description}</p>
                                    </div>
                                </div>
                             );
                         })}
                      </div>
                   </div>
                </div>
             </div>

             {/* LIGHTBOX MODAL */}
             {selectedImage && (
                <div 
                  className="fixed inset-0 z-[100] flex justify-center pt-24 md:pt-32 pb-6 md:pb-10 px-4 md:px-10 animate-fade-in bg-navy-950/70 backdrop-blur-md"
                  onClick={() => setSelectedImage(null)}
                >
                    <button 
                       className="absolute top-24 right-4 md:right-10 w-10 h-10 bg-white/20 rounded-full flex items-center justify-center text-white hover:bg-gold-500 hover:text-navy-900 transition-all z-[110]"
                       onClick={(e) => { e.stopPropagation(); setSelectedImage(null); }}
                    >
                        <X className="w-5 h-5" />
                    </button>

                    <div 
                        className="relative w-full max-w-5xl h-full flex flex-col md:flex-row bg-navy-900 overflow-hidden rounded-2xl shadow-2xl dark:shadow-[0_0_80px_rgba(212,175,55,0.15)] border border-white/10"
                        onClick={(e) => e.stopPropagation()}
                    >
                         {/* Image Side */}
                         <div className="w-full md:w-2/3 h-1/2 md:h-full relative overflow-hidden bg-black">
                             <img 
                               src={selectedImage.src} 
                               alt={selectedImage.alt}
                               className="w-full h-full object-cover" 
                             />
                         </div>

                         {/* Content Side */}
                         <div className="w-full md:w-1/3 h-1/2 md:h-full bg-white dark:bg-navy-950 p-6 md:p-10 flex flex-col justify-center relative">
                             {/* Decorative Number */}
                             <span className="absolute top-4 right-6 text-7xl md:text-8xl font-serif font-bold text-navy-50 dark:text-white/5 select-none pointer-events-none">
                                0{selectedImage.id}
                             </span>

                             <div className="relative z-10">
                                <span className="text-gold-500 font-bold uppercase tracking-[0.25em] text-xs mb-3 md:mb-4 block">Galerie</span>
                                <h3 className="text-2xl md:text-4xl font-serif text-navy-900 dark:text-white mb-4 md:mb-6 leading-tight">
                                    {selectedImage.title}
                                </h3>
                                <p className="text-gray-600 dark:text-gray-300 text-sm md:text-base leading-loose font-light text-justify hyphens-auto">
                                    {selectedImage.description}
                                </p>
                             </div>

                             <div className="mt-8 md:mt-12 pt-6 border-t border-navy-900/10 dark:border-white/10 flex justify-between items-center">
                                 <span className="text-[10px] md:text-xs text-gray-400 uppercase tracking-widest">Le Boraha Sanctuary</span>
                                 <Camera className="w-4 h-4 text-gold-500" />
                             </div>
                         </div>
                    </div>
                </div>
             )}
        </section>
    );
};

// --- NEW SECTION: REVIEWS (Avis Clients) ---
const REVIEWS = [
  {
    id: 1,
    name: "Sophie & Marc",
    origin: "Paris, France",
    text: "Un rêve éveillé. La villa Baleine offre une intimité rare. Nous avons passé des heures à observer l'horizon depuis notre piscine. Le luxe ici n'est pas matériel, il est dans le temps qui s'arrête.",
    rating: 5
  },
  {
    id: 2,
    name: "Famille Dubois",
    origin: "Genève, Suisse",
    text: "Voyager avec des enfants n'est pas toujours simple, mais le Boraha a su créer de la magie pour eux aussi. La chasse au trésor pirate reste leur meilleur souvenir de Madagascar.",
    rating: 5
  },
  {
    id: 3,
    name: "Elena R.",
    origin: "Milan, Italie",
    text: "Le spa est une révélation. Après une journée de randonnée, le massage aux huiles essentielles locales était divin. Un sanctuaire qui porte bien son nom.",
    rating: 5
  },
  {
    id: 4,
    name: "Thomas W.",
    origin: "Londres, UK",
    text: "J'ai parcouru le monde, mais l'accueil ici a quelque chose d'unique. Discret, chaleureux, sincère. On ne se sent pas client, mais invité de marque dans une maison de famille.",
    rating: 5
  }
];

const ReviewsSection: React.FC = () => {
  return (
    <section id="reviews" className="relative w-full py-24 bg-white/90 dark:bg-navy-950/90 backdrop-blur-2xl transition-colors duration-1000 overflow-hidden z-10 border-t border-navy-900/5 dark:border-white/5">
       <div className="w-[90%] max-w-[1400px] mx-auto relative z-10">
          
          {/* Header */}
          <div className="text-center mb-16 reveal">
             <span className="text-gold-600 font-bold tracking-[0.2em] text-xs uppercase block mb-4">Livre d'Or</span>
             <h2 className="text-4xl md:text-5xl font-serif text-navy-900 dark:text-white transition-colors duration-1000">Échos des Voyageurs</h2>
             <div className="w-24 h-0.5 bg-gradient-to-r from-transparent via-gold-500 to-transparent mx-auto mt-6"></div>
          </div>

          {/* Reviews Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
             {REVIEWS.map((review, index) => (
                <div 
                  key={review.id} 
                  className={`
                    relative group reveal 
                    p-8 rounded-2xl 
                    bg-white/50 dark:bg-navy-900/40 backdrop-blur-md
                    border border-white/40 dark:border-white/5
                    shadow-lg dark:shadow-[0_0_20px_rgba(0,0,0,0.2)]
                    hover:-translate-y-2 transition-transform duration-500
                    flex flex-col
                  `}
                  style={{ transitionDelay: `${index * 100}ms` }}
                >
                   {/* Quote Icon */}
                   <div className="absolute -top-4 -left-2 bg-gold-500 text-navy-950 p-2 rounded-full shadow-lg transform rotate-12 group-hover:rotate-0 transition-transform duration-500">
                      <Quote className="w-4 h-4 fill-current" />
                   </div>

                   {/* Stars */}
                   <div className="flex gap-1 mb-6">
                      {[...Array(review.rating)].map((_, i) => (
                        <Star key={i} className="w-3 h-3 text-gold-400 fill-current" />
                      ))}
                   </div>

                   {/* Text */}
                   <p className="text-gray-600 dark:text-gray-300 text-sm leading-loose italic mb-6 flex-1 text-justify hyphens-auto transition-colors duration-700">
                     "{review.text}"
                   </p>

                   {/* Author */}
                   <div className="mt-auto border-t border-navy-900/5 dark:border-white/5 pt-4">
                      <h4 className="font-serif text-navy-900 dark:text-white font-bold">{review.name}</h4>
                      <span className="text-[10px] text-gold-600 uppercase tracking-widest">{review.origin}</span>
                   </div>
                </div>
             ))}
          </div>
       </div>
    </section>
  );
};

export const RoomsAndOffers: React.FC<{ isNightMode?: boolean }> = ({ isNightMode }) => {
  const [activeActivityId, setActiveActivityId] = useState<string | null>(null);
  const observerRef = useRef<IntersectionObserver | null>(null);

  useEffect(() => {
    observerRef.current = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('active');
        }
      });
    }, { threshold: 0.1 });

    // Include new classes in observer
    const hiddenElements = document.querySelectorAll('.reveal, .reveal-left, .reveal-right');
    hiddenElements.forEach((el) => observerRef.current?.observe(el));

    return () => observerRef.current?.disconnect();
  }, []);

  return (
    <>
      <section id="accommodation" className="relative w-full py-16 md:py-24 bg-white/90 dark:bg-navy-950/90 backdrop-blur-2xl overflow-hidden flex flex-col justify-center transition-colors duration-1000 z-10">
        
        {/* GRAND TITRE DE SECTION */}
        <div className="text-center mb-16 md:mb-24 reveal px-4">
             <span className="text-gold-600 font-bold tracking-[0.2em] text-xs uppercase block mb-4">Hébergement</span>
             <h2 className="text-4xl md:text-6xl font-serif text-navy-900 dark:text-white transition-colors duration-1000">Havres de Paix</h2>
             <div className="w-24 h-0.5 bg-gradient-to-r from-transparent via-gold-500 to-transparent mx-auto mt-6"></div>
             <p className="text-gray-500 dark:text-gray-400 text-sm md:text-base max-w-2xl mx-auto font-light leading-relaxed mt-6 text-justify hyphens-auto transition-colors duration-1000">
                Entre ciel et mer, nos villas et suites sont conçues comme des écrins de sérénité où le luxe se murmure.
             </p>
        </div>

        <RoomShowcase 
            title="Nos Refuges" 
            subtitle="Bungalows & Suites" 
            rooms={ROOMS} 
            isNightMode={isNightMode}
        />
        <RoomShowcase 
            title="Côté Jardin" 
            subtitle="Chambres & Confort" 
            rooms={GUEST_ROOMS}
            reverse={true} 
            isNightMode={isNightMode}
        />
      </section>

      {/* SECTION GASTRONOMIE */}
      <DiningSection />

      {/* SECTION SPA */}
      <SpaSection />

      {/* SECTION ACTIVITÉS */}
      <section id="experiences" className="w-full relative z-20 py-24 flex flex-col bg-white/90 dark:bg-navy-950/90 backdrop-blur-2xl text-navy-950 dark:text-white overflow-hidden transition-colors duration-1000">
        <div className="w-full md:w-[98%] max-w-[1920px] mx-auto">
            <div className="text-center mb-16 md:mb-20 reveal px-4">
                 <span className="text-gold-600 font-serif italic text-lg mb-2 block">L'Aventure sur mesure</span>
                 <h3 className="text-4xl md:text-6xl font-serif font-bold text-navy-900 dark:text-white mb-6 transition-colors duration-1000">Expériences Uniques</h3>
                 <p className="text-gray-500 dark:text-gray-400 text-sm md:text-base max-w-2xl mx-auto font-light leading-relaxed text-justify hyphens-auto transition-colors duration-1000">
                   De la danse des baleines aux secrets des pirates, chaque jour est une nouvelle page de votre histoire.
                 </p>
            </div>

            <div className="
                flex flex-col md:flex-row 
                gap-3 md:gap-4
                px-4 md:px-0 
                pb-8 md:pb-0
                h-auto md:h-[700px]
              "
              onMouseLeave={() => setActiveActivityId(null)}
            >
               {OFFERS.map((offer, index) => {
                 const isActive = activeActivityId === offer.id;
                 const formattedNumber = `0${index + 1}`;
                 
                 const verticalStagger = index % 2 !== 0 ? 'md:translate-y-16' : 'md:translate-y-0';
                 const imageSrc = (isNightMode && offer.nightImage) ? offer.nightImage : offer.image;

                 return (
                   <div 
                      key={offer.id} 
                      onMouseEnter={() => { if (window.innerWidth >= 768) setActiveActivityId(offer.id); }}
                      className={`
                        relative overflow-hidden 
                        rounded-2xl
                        
                        transition-[flex,height,transform,box-shadow,translate] duration-700 ease-[cubic-bezier(0.22,1,0.36,1)]
                        group cursor-pointer
                        border-t border-white/20
                        ${verticalStagger}
                        
                        w-full
                        ${isActive ? 'h-[550px] shadow-2xl dark:shadow-[0_0_80px_rgba(212,175,55,0.25)] z-10' : 'h-28 shadow-none'} 
                        md:h-auto
                        
                        md:w-auto
                        ${isActive ? 'md:flex-[3]' : 'md:flex-[0.8]'}
                      `}
                   >
                      {/* BACKGROUND IMAGE - Always present but styles change */}
                      <div className="absolute inset-0 bg-navy-950">
                        <img 
                          src={imageSrc} 
                          alt={offer.title} 
                          className={`
                            w-full h-full object-cover transition-all duration-[1200ms]
                            ${isActive ? 'scale-100 opacity-100' : 'scale-110 opacity-40 grayscale-[50%] md:opacity-60 md:grayscale'}
                          `}
                        />
                        {/* Overlay Gradient: Stronger when active, uniform when inactive */}
                        <div className={`
                            absolute inset-0 bg-gradient-to-t transition-colors duration-700
                            ${isActive 
                                ? 'from-navy-950/90 via-navy-950/20 to-transparent' 
                                : 'from-navy-950/80 via-navy-950/40 to-navy-950/30'}
                        `}></div>
                      </div>

                      {/* --- MOBILE: COMPACT HEADER (Visible when closed) --- */}
                      <div 
                        className={`md:hidden absolute inset-0 p-6 flex items-center justify-between z-20 transition-opacity duration-500 ${isActive ? 'opacity-0 pointer-events-none' : 'opacity-100'}`}
                        onClick={() => setActiveActivityId(offer.id)}
                      >
                         <div className="flex items-center gap-5">
                             <span className="text-white/20 font-serif text-4xl font-bold">{formattedNumber}</span>
                             <div className="flex flex-col">
                                <span className="text-gold-400 text-[10px] font-bold uppercase tracking-widest mb-1">{offer.discount}</span>
                                <span className="font-serif text-2xl text-white">{offer.title}</span>
                             </div>
                         </div>
                         <div className="w-10 h-10 rounded-full border border-white/20 flex items-center justify-center text-white">
                             <Plus className="w-5 h-5" />
                         </div>
                      </div>

                      {/* --- DESKTOP: CLOSED STATE (Spine view) --- */}
                      <div className={`
                          hidden md:flex absolute inset-0 flex-col items-center justify-end pb-12 transition-all duration-500 z-20
                          ${isActive ? 'opacity-0 translate-y-10 pointer-events-none' : 'opacity-100 translate-y-0'}
                      `}>
                          <span className="text-white/30 font-serif text-6xl font-bold absolute top-10">{formattedNumber}</span>
                          <div className="flex flex-col items-center gap-6">
                             {/* Vertical Text */}
                             <span className="text-white font-serif text-2xl tracking-wide [writing-mode:vertical-rl] rotate-180 whitespace-nowrap opacity-90 group-hover:text-gold-400 transition-colors">
                                {offer.title}
                             </span>
                             <div className="w-12 h-12 rounded-full border border-white/20 flex items-center justify-center text-white/80 group-hover:bg-white group-hover:text-navy-900 transition-all">
                                {ACTIVITY_ICONS[offer.id]}
                             </div>
                          </div>
                      </div>

                      {/* --- OPEN STATE (Content Overlay) --- */}
                      <div className={`
                          absolute inset-0 p-8 md:p-14 flex flex-col justify-end text-white transition-all duration-700
                          ${isActive ? 'opacity-100 translate-y-0 delay-100' : 'opacity-0 translate-y-8 pointer-events-none'}
                      `}>
                          {/* Close Button Mobile */}
                          <button 
                            className="md:hidden absolute top-6 right-6 w-10 h-10 bg-white/10 backdrop-blur-md rounded-full flex items-center justify-center text-white"
                            onClick={(e) => { e.stopPropagation(); setActiveActivityId(null); }}
                          >
                             <div className="rotate-45"><Plus className="w-6 h-6"/></div>
                          </button>

                          <div className="flex flex-col relative z-20">
                             <div className="flex items-baseline justify-between border-b border-white/20 pb-6 mb-6">
                                <div>
                                    <span className="text-gold-500 font-bold uppercase tracking-widest text-xs mb-2 block">{offer.discount}</span>
                                    <h4 className="font-serif text-4xl md:text-5xl font-bold leading-none text-white">
                                        {offer.title}
                                    </h4>
                                </div>
                                <span className="hidden md:block text-white/10 font-serif text-8xl font-bold -mb-4 -mr-4">{formattedNumber}</span>
                             </div>
                             
                             <div className="max-w-xl">
                                 <p className="text-gray-200 text-sm md:text-lg leading-relaxed mb-8 text-justify hyphens-auto font-light opacity-90">
                                    {offer.subtitle}
                                 </p>
                                 
                                 <button className="inline-flex items-center gap-3 text-gold-400 uppercase tracking-widest text-xs font-bold group/btn hover:text-white transition-colors pb-1 border-b border-gold-400 hover:border-white shadow-lg dark:shadow-[0_0_20px_rgba(212,175,55,0.4)]">
                                    Explorer
                                    <ArrowRight className="w-4 h-4 group-hover/btn:translate-x-2 transition-transform" />
                                 </button>
                             </div>
                          </div>
                      </div>
                   </div>
                 );
               })}
            </div>
        </div>
      </section>

      {/* NEW SECTION: EVENTS */}
      <EventsSection isNightMode={isNightMode} />
      
      {/* NEW SECTION: GALLERY */}
      <GallerySection />
      
      {/* NEW SECTION: REVIEWS */}
      <ReviewsSection />
    </>
  );
};