import React from 'react';
import { Compass, Anchor, Leaf, Castle, History } from 'lucide-react';

export const Introduction: React.FC = () => {
  return (
    <section id="spirit" className="relative w-full py-24 md:py-32 bg-white/90 dark:bg-navy-950/90 backdrop-blur-2xl text-navy-950 dark:text-white overflow-hidden transition-colors duration-1000 z-10 shadow-2xl">
      {/* Filigrane décoratif d'arrière-plan */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none opacity-[0.03]">
         <div className="absolute -top-[10%] -left-[10%] w-[50%] h-[50%] bg-navy-900 rounded-full blur-[100px]"></div>
         <div className="absolute top-[40%] right-[-10%] w-[40%] h-[60%] bg-gold-500 rounded-full blur-[120px]"></div>
      </div>

      <div className="max-w-[94%] md:max-w-[1700px] mx-auto px-4 md:px-8 relative z-10">
        
        {/* Header Centré */}
        <div className="text-center mb-20 md:mb-32 reveal">
            <span className="text-gold-500 font-bold uppercase tracking-[0.25em] text-xs mb-4 block">L'Esprit du Lieu</span>
            <h2 className="text-4xl md:text-6xl font-serif text-navy-900 dark:text-white mb-6 transition-colors duration-1000">Deux mondes, une âme</h2>
            <div className="w-20 h-0.5 bg-gold-400 mx-auto rounded-full opacity-50"></div>
            <p className="md:hidden text-xs text-gray-400 mt-4 italic animate-pulse">(Glissez pour découvrir)</p>
        </div>

        {/* Partie 1 : Narration (2 Colonnes) */}
        <div className="
            relative
            flex md:grid md:grid-cols-2 
            gap-8 md:gap-12 
            items-start
            overflow-x-auto md:overflow-visible 
            snap-x snap-mandatory 
            -mx-4 px-4 md:mx-0 md:px-0 
            pb-8 md:pb-0
            mb-20 md:mb-32
            scrollbar-none
        ">
            
            {/* Ligne verticale style "Corde Torsadée" : Jaune Or et Transparent */}
            <div 
              className="hidden md:block absolute left-1/2 -top-10 bottom-0 w-[6px] -translate-x-1/2 z-0"
              style={{
                backgroundImage: 'repeating-linear-gradient(45deg, #D4AF37 0px, #D4AF37 6px, transparent 6px, transparent 12px)'
              }}
            ></div>

            {/* Colonne 1: L'Hôtel - Décalage vers le HAUT */}
            <div className="reveal flex flex-col gap-6 snap-center min-w-[85vw] md:min-w-0 md:-mt-12 transition-all duration-700">
                <div className="flex items-center gap-3 md:justify-end text-gold-600 mb-2 px-2">
                    <span className="uppercase tracking-widest text-xs font-bold">Le Sanctuaire</span>
                    <Compass className="w-5 h-5" />
                </div>
                
                <div className="text-navy-900/80 dark:text-gray-300 text-base md:text-xl leading-loose font-light text-justify hyphens-auto md:text-justify md:pl-10 transition-colors duration-1000">
                    <p className="mb-6 relative">
                      {/* Lettrine L - Positionnement précis "devant le e" */}
                      <span className="text-6xl md:text-7xl font-serif text-gold-500 float-left mr-1.5 mt-1 md:mt-0 leading-[0.8]">L</span>
                      e Boraha Sanctuary n'est pas simplement un hôtel, c'est une promesse de silence. 
                      Conçu comme un refuge invisible niché dans une végétation luxuriante, chaque bungalow 
                      est une fenêtre ouverte sur l'infini de l'Océan Indien. 
                    </p>
                    <p>
                      Ici, l'architecture s'efface devant la nature. Le bois de rose, la pierre taillée et les toitures traditionnelles en ravinala créent une harmonie parfaite avec la forêt tropicale. Le luxe ne réside pas dans l'ostentation, mais dans l'espace, le temps retrouvé et l'intimité absolue d'un service discret.
                    </p>
                </div>
            </div>

            {/* Colonne 2: L'Île - Décalage vers le BAS */}
            <div className="reveal flex flex-col gap-6 snap-center min-w-[85vw] md:min-w-0 md:mt-12 transition-all duration-700">
                <div className="flex items-center gap-3 md:justify-start text-gold-600 mb-2 px-2">
                    <Anchor className="w-5 h-5" />
                    <span className="uppercase tracking-widest text-xs font-bold">L'Île Sainte-Marie</span>
                </div>
                 
                <div className="text-navy-900/80 dark:text-gray-300 text-base md:text-xl leading-loose font-light text-justify hyphens-auto md:text-justify md:pr-10 transition-colors duration-1000">
                    <p className="mb-6">
                      <span className="text-6xl md:text-7xl font-serif text-gold-500 float-left mr-1.5 mt-1 md:mt-0 leading-[0.8]">N</span>
                      osy Boraha, terre de légendes. Ancien repaire des pirates de l'Océan Indien, 
                      cette île conserve une aura mystique indélébile. De ses criques sauvages aux ballets majestueux 
                      des baleines à bosse qui viennent y donner la vie chaque hiver austral.
                    </p>
                    <p>
                      Au-delà des cartes postales, Sainte-Marie est une expérience sensorielle. C'est l'odeur du girofle séchant au soleil, la couleur rouge de la latérite contrastant avec le vert émeraude du lagon, et l'hospitalité légendaire d'un peuple qui a fait du sourire un art de vivre.
                    </p>
                </div>
            </div>
        </div>

        {/* Partie 2 : Les Piliers (3 Blocs) */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10 md:gap-8 reveal mb-16 px-4">
            
            {/* Pilier 1 */}
            <div className="flex flex-col items-center text-center group">
                <Castle className="w-8 h-8 text-gold-500 mb-4 opacity-80 group-hover:opacity-100 transition-opacity" strokeWidth={1} />
                <h3 className="font-serif text-lg text-navy-900 dark:text-white mb-2 transition-colors duration-1000">Architecture Vernaculaire</h3>
                <p className="text-xs text-gray-500 dark:text-gray-400 leading-relaxed max-w-[250px] font-light transition-colors duration-1000">
                  Matériaux nobles de Madagascar et respect des savoir-faire ancestraux pour une intégration totale.
                </p>
            </div>

            {/* Pilier 2 */}
            <div className="flex flex-col items-center text-center group">
                <History className="w-8 h-8 text-gold-500 mb-4 opacity-80 group-hover:opacity-100 transition-opacity" strokeWidth={1} />
                <h3 className="font-serif text-lg text-navy-900 dark:text-white mb-2 transition-colors duration-1000">28 Ans d'Expérience</h3>
                <p className="text-xs text-gray-500 dark:text-gray-400 leading-relaxed max-w-[250px] font-light transition-colors duration-1000">
                  Depuis 1996, nous cultivons l'art de recevoir avec passion, authenticité et discrétion.
                </p>
            </div>

            {/* Pilier 3 */}
            <div className="flex flex-col items-center text-center group">
                <Leaf className="w-8 h-8 text-gold-500 mb-4 opacity-80 group-hover:opacity-100 transition-opacity" strokeWidth={1} />
                <h3 className="font-serif text-lg text-navy-900 dark:text-white mb-2 transition-colors duration-1000">Éco-Conscience</h3>
                <p className="text-xs text-gray-500 dark:text-gray-400 leading-relaxed max-w-[250px] font-light transition-colors duration-1000">
                  Autonomie solaire et préservation du lagon pour que la nature reste reine.
                </p>
            </div>

        </div>

        {/* Ligne de séparation */}
        <div className="w-full h-px bg-gradient-to-r from-transparent via-gold-200 to-transparent mb-16 reveal opacity-60"></div>

        {/* Signature Finale */}
        <div className="text-center">
           <p className="font-serif italic text-2xl md:text-3xl text-gold-600 opacity-80">
             "Ici, le temps n'a plus d'emprise."
           </p>
        </div>

      </div>
    </section>
  );
};