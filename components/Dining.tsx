
import React from 'react';
import { Utensils, Wine, ArrowRight } from 'lucide-react';

export const Dining: React.FC = () => {
  return (
    <section id="dining" className="relative w-full py-24 md:py-32 bg-navy-950/95 backdrop-blur-2xl dark:bg-black/90 text-white overflow-hidden transition-colors duration-1000 z-10">
       <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-green-900/20 rounded-full blur-[100px] pointer-events-none translate-x-1/2 -translate-y-1/2"></div>
       <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-green-900/20 rounded-full blur-[80px] pointer-events-none -translate-x-1/2 translate-y-1/2"></div>

       <div className="w-[90%] max-w-[1400px] mx-auto relative z-10">
          <div className="text-center mb-20 reveal">
             <span className="text-gold-500 font-bold tracking-[0.2em] text-xs uppercase block mb-4">Gastronomie</span>
             <h2 className="text-4xl md:text-6xl font-serif">Éveil des Sens</h2>
             <div className="w-24 h-0.5 bg-gradient-to-r from-transparent via-gold-500 to-transparent mx-auto mt-6"></div>
          </div>

          <div className="grid md:grid-cols-12 gap-10 md:gap-20 items-center mb-24 md:mb-32">
             <div className="md:col-span-7 relative group reveal">
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
