
import React, { useState, useEffect } from 'react';
import { ROOMS, GUEST_ROOMS } from '../constants';
import { ChevronLeft, ChevronRight, ArrowRight, X } from 'lucide-react';
import { Room } from '../types';

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

  const getRoomImages = (room: Room) => {
    return (isNightMode && room.nightImages && room.nightImages.length > 0) ? room.nightImages : room.images;
  };

  const activeImages = getRoomImages(activeRoom);
  const nextImages = getRoomImages(nextRoom);

  useEffect(() => {
    setCurrentImageIndex(0);
  }, [activeRoomIndex, isNightMode]);

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
        <div className={`w-[96%] max-w-[1920px] mx-auto px-4 mb-8 relative z-10 flex flex-col ${reverse ? 'items-end text-right' : 'items-start text-left'}`}>
            <span className="text-gold-600 font-serif italic text-sm md:text-xl block mb-2">{subtitle}</span>
            <h3 className="text-3xl md:text-6xl font-serif font-bold text-navy-900 dark:text-white reveal transition-colors duration-700">{title}</h3>
        </div>

        <div className="relative w-[96%] max-w-[1920px] mx-auto h-[500px] md:h-[650px] group/container">
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
                            <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent opacity-60"></div>
                        </div>
                    ))}
                </div>

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

            <div className={`hidden md:block absolute top-0 h-full w-[65%] z-10 
                 transition-all duration-1000 ease-[cubic-bezier(0.25,1,0.5,1)] 
                 select-none overflow-hidden
                ${reverse ? 'left-0' : 'right-0'}`}
            >
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

            <div className={`absolute 
              bottom-0 left-4 right-4 h-[230px]
              md:top-1/2 md:-translate-y-1/2 md:bottom-auto md:w-[400px] md:h-[420px]
              ${reverse ? 'md:left-[4%] md:right-auto' : 'md:right-[4%] md:left-auto'}
              z-30`}
            >
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

export const Accommodation: React.FC<{ isNightMode?: boolean }> = ({ isNightMode }) => {
  return (
    <section id="accommodation" className="relative w-full py-16 md:py-24 bg-white/90 dark:bg-navy-950/90 backdrop-blur-2xl overflow-hidden flex flex-col justify-center transition-colors duration-1000 z-10">
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
  );
};
