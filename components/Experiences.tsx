
import React, { useState } from 'react';
import { OFFERS, EVENTS } from '../constants';
import { Waves, Map, Martini, Briefcase, Plus, ArrowRight, Calendar, Camera, X, Star, Quote } from 'lucide-react';

const ACTIVITY_ICONS: Record<string, React.ReactNode> = {
  'baleine': <Waves className="w-5 h-5" />,
  'tour-ile': <Map className="w-5 h-5" />,
  'cocktail': <Martini className="w-5 h-5" />,
  'seminaire': <Briefcase className="w-5 h-5" />
};

const EventsSection: React.FC<{ isNightMode?: boolean }> = ({ isNightMode }) => {
  return (
    <section id="events" className="relative w-full py-24 bg-white/90 dark:bg-navy-950/90 backdrop-blur-2xl text-navy-950 dark:text-white overflow-hidden transition-colors duration-1000 z-10">
        <div className="w-[90%] max-w-[1400px] mx-auto relative z-10">
            <div className="text-center mb-16 reveal">
                 <span className="text-gold-600 font-bold tracking-[0.2em] text-xs uppercase block mb-4">Agenda</span>
                 <h2 className="text-4xl md:text-5xl font-serif text-navy-900 dark:text-white transition-colors duration-1000">Événements & Promotions</h2>
                 <div className="w-24 h-0.5 bg-gradient-to-r from-transparent via-gold-500 to-transparent mx-auto mt-6"></div>
            </div>

            <div className="flex md:grid md:grid-cols-3 gap-6 md:gap-8 overflow-x-auto md:overflow-visible snap-x snap-mandatory -mx-4 px-4 md:mx-0 md:px-0 pb-8 md:pb-0 scrollbar-none items-stretch">
               {EVENTS.map((event, index) => {
                 const imageSrc = (isNightMode && event.nightImage) ? event.nightImage : event.image;

                 return (
                   <div key={event.id} className="group reveal flex flex-col h-full min-w-[85vw] md:min-w-0 snap-center transition-all duration-500">
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
    const marqueeImages = [...GALLERY_IMAGES, ...GALLERY_IMAGES];

    return (
        <section id="gallery" className="relative w-full py-24 bg-navy-50/90 dark:bg-black/90 backdrop-blur-2xl transition-colors duration-1000 overflow-hidden z-10">
             <div className="w-full relative z-10">
                <div className="text-center mb-12 reveal px-4">
                     <span className="text-gold-600 font-bold tracking-[0.2em] text-xs uppercase block mb-4">Galerie</span>
                     <h2 className="text-4xl md:text-5xl font-serif text-navy-900 dark:text-white transition-colors duration-1000">Instants Volés</h2>
                     <div className="w-24 h-0.5 bg-gradient-to-r from-transparent via-gold-500 to-transparent mx-auto mt-6"></div>
                     <p className="text-gray-500 dark:text-gray-400 text-sm md:text-base max-w-2xl mx-auto font-light leading-relaxed mt-6 transition-colors duration-1000">
                        Glissez à travers nos souvenirs.
                     </p>
                </div>

                <div className="w-full relative overflow-hidden h-[400px] md:h-[450px]">
                   <div className="flex animate-marquee hover:animation-play-state-paused w-max gap-4 px-4 h-full items-center">
                      <div className="grid grid-rows-2 grid-flow-col gap-4 h-full">
                         {marqueeImages.map((img, index) => {
                             let spanClass = "row-span-2 w-[250px] md:w-[300px]"; 
                             
                             if (index % 5 === 1 || index % 5 === 2) {
                                spanClass = "row-span-1 w-[250px] md:w-[300px]";
                             } else if (index % 5 === 3) {
                                spanClass = "row-span-2 w-[350px] md:w-[500px]";
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
                                    <div className="absolute inset-0 bg-navy-950/40 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                                    
                                    <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                                        <div className="w-12 h-12 bg-white/20 backdrop-blur-md rounded-full flex items-center justify-center border border-white/30 text-white transform scale-75 group-hover:scale-100 transition-transform duration-500">
                                            <Camera className="w-5 h-5" strokeWidth={1.5} />
                                        </div>
                                    </div>
                                    
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
                         <div className="w-full md:w-2/3 h-1/2 md:h-full relative overflow-hidden bg-black">
                             <img 
                               src={selectedImage.src} 
                               alt={selectedImage.alt}
                               className="w-full h-full object-cover" 
                             />
                         </div>

                         <div className="w-full md:w-1/3 h-1/2 md:h-full bg-white dark:bg-navy-950 p-6 md:p-10 flex flex-col justify-center relative">
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
          <div className="text-center mb-16 reveal">
             <span className="text-gold-600 font-bold tracking-[0.2em] text-xs uppercase block mb-4">Livre d'Or</span>
             <h2 className="text-4xl md:text-5xl font-serif text-navy-900 dark:text-white transition-colors duration-1000">Échos des Voyageurs</h2>
             <div className="w-24 h-0.5 bg-gradient-to-r from-transparent via-gold-500 to-transparent mx-auto mt-6"></div>
          </div>

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
                   <div className="absolute -top-4 -left-2 bg-gold-500 text-navy-950 p-2 rounded-full shadow-lg transform rotate-12 group-hover:rotate-0 transition-transform duration-500">
                      <Quote className="w-4 h-4 fill-current" />
                   </div>

                   <div className="flex gap-1 mb-6">
                      {[...Array(review.rating)].map((_, i) => (
                        <Star key={i} className="w-3 h-3 text-gold-400 fill-current" />
                      ))}
                   </div>

                   <p className="text-gray-600 dark:text-gray-300 text-sm leading-loose italic mb-6 flex-1 text-justify hyphens-auto transition-colors duration-700">
                     "{review.text}"
                   </p>

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

export const Experiences: React.FC<{ isNightMode?: boolean }> = ({ isNightMode }) => {
  const [activeActivityId, setActiveActivityId] = useState<string | null>(null);

  return (
    <>
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
                      <div className="absolute inset-0 bg-navy-950">
                        <img 
                          src={imageSrc} 
                          alt={offer.title} 
                          className={`
                            w-full h-full object-cover transition-all duration-[1200ms]
                            ${isActive ? 'scale-100 opacity-100' : 'scale-110 opacity-40 grayscale-[50%] md:opacity-60 md:grayscale'}
                          `}
                        />
                        <div className={`
                            absolute inset-0 bg-gradient-to-t transition-colors duration-700
                            ${isActive 
                                ? 'from-navy-950/90 via-navy-950/20 to-transparent' 
                                : 'from-navy-950/80 via-navy-950/40 to-navy-950/30'}
                        `}></div>
                      </div>

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

                      <div className={`
                          hidden md:flex absolute inset-0 flex-col items-center justify-end pb-12 transition-all duration-500 z-20
                          ${isActive ? 'opacity-0 translate-y-10 pointer-events-none' : 'opacity-100 translate-y-0'}
                      `}>
                          <span className="text-white/30 font-serif text-6xl font-bold absolute top-10">{formattedNumber}</span>
                          <div className="flex flex-col items-center gap-6">
                             <span className="text-white font-serif text-2xl tracking-wide [writing-mode:vertical-rl] rotate-180 whitespace-nowrap opacity-90 group-hover:text-gold-400 transition-colors">
                                {offer.title}
                             </span>
                             <div className="w-12 h-12 rounded-full border border-white/20 flex items-center justify-center text-white/80 group-hover:bg-white group-hover:text-navy-900 transition-all">
                                {ACTIVITY_ICONS[offer.id]}
                             </div>
                          </div>
                      </div>

                      <div className={`
                          absolute inset-0 p-8 md:p-14 flex flex-col justify-end text-white transition-all duration-700
                          ${isActive ? 'opacity-100 translate-y-0 delay-100' : 'opacity-0 translate-y-8 pointer-events-none'}
                      `}>
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

      <EventsSection isNightMode={isNightMode} />
      <GallerySection />
      <ReviewsSection />
    </>
  );
};
