
import React, { useState } from 'react';
import { Instagram, Facebook, Twitter, ShieldCheck, Clock, Utensils, Globe, Key, Coffee, Sparkles, Wifi, Baby, Car, Plane, Ship, Check, Loader2, ArrowRight } from 'lucide-react';

interface FooterProps {
  isNightMode?: boolean;
}

// --- COMPONENT: LOCATION SECTION ---
const LocationSection: React.FC<{ isNightMode?: boolean }> = ({ isNightMode }) => {
  return (
    <div className="w-full relative bg-navy-950 text-white border-b border-white/5 transition-colors duration-1000">
       <div className="grid md:grid-cols-12 min-h-[450px]">
          
          {/* Text Content */}
          <div className="md:col-span-4 bg-navy-950 p-10 md:p-16 flex flex-col justify-center relative z-10 border-r border-white/5">
             <span className="text-gold-500 font-bold tracking-[0.2em] text-xs uppercase block mb-4">Localisation</span>
             <h2 className="text-3xl md:text-4xl font-serif text-white mb-6">Pointe de Belle Vue</h2>
             
             <p className="text-gray-400 font-light text-sm leading-loose mb-8 text-justify hyphens-auto">
               Posé délicatement sur la côte Sud-Ouest de l'île Sainte-Marie, le Boraha Sanctuary fait face au soleil couchant. Un emplacement stratégique offrant le calme absolu, loin de l'agitation, mais proche de l'essentiel.
             </p>

             <div className="space-y-6 pt-4 border-t border-white/5">
                <div className="flex items-center gap-4">
                   <div className="w-8 h-8 rounded-full border border-white/10 flex items-center justify-center text-gold-500">
                     <Plane className="w-3 h-3" />
                   </div>
                   <div>
                      <span className="block text-white font-serif text-sm">Aéroport Ravoraha</span>
                      <span className="text-[10px] text-gray-500 uppercase tracking-widest">5 Minutes (Navette Privée)</span>
                   </div>
                </div>

                <div className="flex items-center gap-4">
                   <div className="w-8 h-8 rounded-full border border-white/10 flex items-center justify-center text-gold-500">
                     <Ship className="w-3 h-3" />
                   </div>
                   <div>
                      <span className="block text-white font-serif text-sm">Le Port</span>
                      <span className="text-[10px] text-gray-500 uppercase tracking-widest">15 Minutes (Accès Bateau)</span>
                   </div>
                </div>
             </div>
          </div>

          {/* Map - Style "Architecte Muet" (Interactif mais sans texte visible) */}
          <div className="md:col-span-8 relative bg-navy-1000 h-[350px] md:h-auto overflow-hidden group">
             
             <iframe 
               src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3780.366436494239!2d49.82956797585698!3d-17.027059728514136!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x21da69d6c7030805%3A0x6b90710609659345!2sH%C3%B4tel%20Le%20Boraha%20Village!5e1!3m2!1sfr!2smg!4v1740669146205!5m2!1sfr!2smg" 
               width="100%" 
               height="100%" 
               style={{ 
                 border: 0, 
                 // ASTUCE : blur(0.8px) + contrast élevé masque le texte (trop fin) mais garde les routes (épaisses)
                 filter: isNightMode 
                    ? 'grayscale(100%) invert(100%) contrast(125%) brightness(80%) blur(0.8px)' 
                    : 'grayscale(100%) contrast(120%) brightness(105%) blur(0.8px) opacity(0.7)'
               }} 
               allowFullScreen={true}
               loading="lazy" 
               referrerPolicy="no-referrer-when-downgrade"
               className="w-full h-full transition-all duration-1000"
             ></iframe>
             
             {/* Vignettage pour le style - pointer-events-none est CRUCIAL pour laisser passer les clics vers la carte */}
             <div className={`absolute inset-0 pointer-events-none transition-colors duration-1000 z-10 ${isNightMode ? 'bg-navy-950/20 shadow-[inset_0_0_100px_rgba(0,0,0,0.8)]' : 'bg-white/0'}`}></div>
          </div>
       </div>
    </div>
  );
};

// --- COMPONENT: AT A GLANCE (Non-Interactive & Unified) ---
const AtAGlance: React.FC = () => {
  const features = [
    // Piliers Principaux
    { 
      icon: <ShieldCheck className="w-4 h-4" />, 
      title: "Expérience", 
      subtitle: "Depuis 1997",
    },
    { 
      icon: <Clock className="w-4 h-4" />, 
      title: "Service", 
      subtitle: "24/7",
    },
    { 
      icon: <Utensils className="w-4 h-4" />, 
      title: "Cuisine", 
      subtitle: "Pêche du Jour",
    },
    { 
      icon: <Globe className="w-4 h-4" />, 
      title: "Exploration", 
      subtitle: "Terre & Mer",
    },
    // Commodités (Harmonized)
    { 
      icon: <Key className="w-4 h-4" />, 
      title: "Chambres", 
      subtitle: "84 Clés",
    },
    { 
      icon: <Coffee className="w-4 h-4" />, 
      title: "Lounge", 
      subtitle: "Bar & Resto",
    },
    { 
      icon: <Sparkles className="w-4 h-4" />, 
      title: "Spa", 
      subtitle: "Massages",
    },
    { 
      icon: <Wifi className="w-4 h-4" />, 
      title: "Wi-Fi", 
      subtitle: "Gratuit",
    },
    { 
      icon: <Baby className="w-4 h-4" />, 
      title: "Famille", 
      subtitle: "-12 ans Offert",
    },
    { 
      icon: <Car className="w-4 h-4" />, 
      title: "Accès", 
      subtitle: "Transfert",
    },
  ];

  return (
    <div className="w-full bg-navy-950 relative border-t border-white/5 py-12">
      {/* Header Inside Container */}
      <div className="max-w-[95%] xl:max-w-7xl mx-auto px-6 mb-8 flex items-center justify-between">
          <div>
            <span className="text-gold-500 font-bold tracking-[0.2em] text-[9px] uppercase block mb-1">En un coup d'œil</span>
            <h3 className="font-serif text-lg text-white">L'Essentiel</h3>
          </div>
          <div className="w-24 h-[1px] bg-white/10 hidden md:block"></div>
      </div>

      <div className="max-w-[95%] xl:max-w-7xl mx-auto px-6">
        {/* Unified Grid: Non-interactive, Cursor Default */}
        <div className="grid grid-cols-2 md:grid-cols-5 gap-y-8 gap-x-4">
          {features.map((item, idx) => (
            <div key={idx} className="flex items-center gap-4 cursor-default select-none opacity-70">
                 <div className="w-8 h-8 shrink-0 rounded-full border border-white/10 bg-white/5 flex items-center justify-center text-gold-400">
                   {item.icon}
                 </div>
                 <div>
                    <span className="block font-serif text-sm text-white font-medium leading-none mb-1.5">{item.title}</span>
                    <span className="text-[8px] uppercase tracking-widest text-gray-500 whitespace-nowrap">{item.subtitle}</span>
                 </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

// --- COMPONENT: CLUB PRIVÉ FORM (Mini) ---
const ClubPriveMini: React.FC = () => {
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState<'idle' | 'loading' | 'success'>('idle');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;
    setStatus('loading');
    setTimeout(() => {
      setStatus('success');
      setEmail('');
    }, 1500);
  };

  if (status === 'success') {
    return (
      <div className="bg-white/10 rounded-xl p-6 border border-white/5 animate-fade-in text-center">
         <div className="w-10 h-10 bg-green-500/20 text-green-400 rounded-full flex items-center justify-center mx-auto mb-3">
           <Check className="w-5 h-5" />
         </div>
         <p className="text-white font-serif italic mb-2">Bienvenue au Club.</p>
         <button onClick={() => setStatus('idle')} className="text-[10px] uppercase tracking-widest text-gold-400 underline decoration-gold-400/50 hover:text-white">Réinscrire</button>
      </div>
    )
  }

  return (
    <div className="bg-white/5 rounded-xl p-6 border border-white/5 hover:border-gold-500/30 transition-colors duration-500">
       <h4 className="text-gold-500 uppercase tracking-widest text-xs font-bold mb-3 flex items-center gap-2">
         <Sparkles className="w-3 h-3" />
         Club Privé
       </h4>
       <p className="text-gray-400 text-xs leading-relaxed mb-4">
         Rejoignez le cercle pour recevoir nos invitations secrètes.
       </p>
       <form onSubmit={handleSubmit} className="relative">
          <input 
            type="email" 
            placeholder="Votre email..."
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full bg-navy-950/50 border-b border-white/20 text-white text-sm py-2 pr-10 focus:outline-none focus:border-gold-500 transition-colors placeholder-gray-600"
          />
          <button 
            disabled={status === 'loading'}
            className="absolute right-0 top-2 text-gold-400 hover:text-white transition-colors disabled:opacity-50"
          >
             {status === 'loading' ? <Loader2 className="w-4 h-4 animate-spin"/> : <ArrowRight className="w-4 h-4" />}
          </button>
       </form>
    </div>
  );
};

export const Footer: React.FC<FooterProps> = ({ isNightMode }) => {
  return (
    <footer className="w-full bg-navy-950 text-white flex flex-col justify-center relative z-10 shadow-2xl transition-colors duration-1000">
      
      {/* SECTION 0: LOCATION MAP & INFO */}
      <LocationSection isNightMode={isNightMode} />

      {/* SEPARATOR: PURE WHITE BLOCK WITH CORD */}
      {/* 
        Cette section est 'détachée' visuellement grâce au contraste absolu (Bg White vs Bg Navy).
        Padding vertical généreux pour que la corde "flotte".
      */}
      <div className="w-full bg-white relative z-20 flex justify-center items-center py-20">
          <div 
             className="w-[6px] h-32 shadow-xl" 
             style={{
               backgroundImage: 'repeating-linear-gradient(45deg, #D4AF37 0px, #D4AF37 6px, transparent 6px, transparent 12px)'
             }}
          ></div>
      </div>

      {/* SECTION 1: AT A GLANCE (Non-Interactive, Information Only) */}
      <AtAGlance />

      {/* SEPARATOR (Thin line) */}
      <div className="w-full border-t border-white/10"></div>

      {/* FOOTER MAIN CONTENT */}
      <div className="max-w-7xl mx-auto px-6 w-full py-16 bg-navy-950">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12">
          
          {/* COL 1: BRAND */}
          <div className="col-span-1 md:col-span-1">
            <div className="text-3xl font-serif font-bold text-white mb-6">Le Boraha<br/><span className="text-gold-500">Sanctuary</span></div>
            <p className="text-gray-400 text-sm leading-relaxed mb-6">
              Pointe de Belle Vue<br/>
              Ambodifotatra, Île Sainte-Marie<br/>
              Madagascar
            </p>
            <div className="flex gap-4">
              <a href="#" className="w-8 h-8 rounded-full bg-white/5 flex items-center justify-center text-gray-400 hover:bg-gold-500 hover:text-navy-900 transition-all border border-white/5"><Instagram className="w-3 h-3" /></a>
              <a href="#" className="w-8 h-8 rounded-full bg-white/5 flex items-center justify-center text-gray-400 hover:bg-gold-500 hover:text-navy-900 transition-all border border-white/5"><Facebook className="w-3 h-3" /></a>
              <a href="#" className="w-8 h-8 rounded-full bg-white/5 flex items-center justify-center text-gray-400 hover:bg-gold-500 hover:text-navy-900 transition-all border border-white/5"><Twitter className="w-3 h-3" /></a>
            </div>
          </div>

          {/* COL 2: LINKS */}
          <div>
            <h4 className="text-white font-serif text-lg mb-6">Explorer</h4>
            <ul className="space-y-3 text-sm text-gray-400">
              <li><a href="#" className="hover:text-gold-400 transition-colors flex items-center gap-2 group"><span className="w-1 h-1 bg-white/20 rounded-full group-hover:bg-gold-400"></span>Nos Villas</a></li>
              <li><a href="#" className="hover:text-gold-400 transition-colors flex items-center gap-2 group"><span className="w-1 h-1 bg-white/20 rounded-full group-hover:bg-gold-400"></span>Restaurant</a></li>
              <li><a href="#" className="hover:text-gold-400 transition-colors flex items-center gap-2 group"><span className="w-1 h-1 bg-white/20 rounded-full group-hover:bg-gold-400"></span>Spa</a></li>
              <li><a href="#" className="hover:text-gold-400 transition-colors flex items-center gap-2 group"><span className="w-1 h-1 bg-white/20 rounded-full group-hover:bg-gold-400"></span>Baleines</a></li>
            </ul>
          </div>

          {/* COL 3: CONTACT */}
          <div>
            <h4 className="text-white font-serif text-lg mb-6">Contact</h4>
            <ul className="space-y-4 text-sm text-gray-400">
              <li className="flex flex-col">
                <span className="text-[9px] uppercase tracking-widest text-gray-600 mb-1">Réception</span>
                <span className="font-serif text-lg text-white">+261 20 57 00 00</span>
              </li>
              <li className="flex flex-col">
                 <span className="text-[9px] uppercase tracking-widest text-gray-600 mb-1">Email</span>
                 <span className="hover:text-gold-400 cursor-pointer transition-colors">reservation@boraha.mg</span>
              </li>
            </ul>
          </div>

          {/* COL 4: CLUB PRIVÉ */}
          <div className="md:pl-4 border-l border-white/5 md:border-l-0">
             <ClubPriveMini />
          </div>

        </div>
      </div>
      
      {/* COPYRIGHT */}
      <div className="w-full py-6 border-t border-white/5 text-center bg-navy-950">
        <p className="text-[9px] text-gray-600 uppercase tracking-widest">
           © {new Date().getFullYear()} Le Boraha Sanctuary.
        </p>
      </div>
    </footer>
  );
};
