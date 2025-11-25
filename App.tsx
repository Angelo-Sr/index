import React, { useState, useEffect, useRef } from 'react';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { Introduction } from './components/Introduction';
import { BookingBar } from './components/BookingBar';
import { Accommodation } from './components/Accommodation';
import { Dining } from './components/Dining';
import { Spa } from './components/Spa';
import { Experiences } from './components/Experiences';
import { Footer } from './components/Footer';
import { JojoChat } from './components/JojoChat';
import { FloatingDock } from './components/FloatingDock';
import { Check } from 'lucide-react';

const LoadingScreen: React.FC<{ onComplete: () => void }> = ({ onComplete }) => {
  const [fadeOut, setFadeOut] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setFadeOut(true);
      setTimeout(onComplete, 1000); 
    }, 2000); 
    return () => clearTimeout(timer);
  }, [onComplete]);

  return (
    <div className={`fixed inset-0 z-[100] bg-navy-950 flex flex-col items-center justify-center transition-opacity duration-1000 ${fadeOut ? 'opacity-0 pointer-events-none' : 'opacity-100'}`}>
      <div className="text-4xl md:text-6xl font-serif text-gold-400 font-bold mb-4 animate-pulse">
        Le Boraha Sanctuary
      </div>
      <div className="w-32 h-0.5 bg-gold-400/30 overflow-hidden relative">
        <div className="absolute top-0 left-0 h-full w-1/2 bg-gold-500 animate-[ping_1.5s_cubic-bezier(0,0,0.2,1)_infinite]" />
      </div>
    </div>
  );
};

const Toast: React.FC<{ message: string; onClose: () => void }> = ({ message, onClose }) => {
  useEffect(() => {
    const timer = setTimeout(onClose, 4000);
    return () => clearTimeout(timer);
  }, [onClose]);

  return (
    <div className="fixed top-24 right-6 z-[90] bg-navy-900 text-white pl-4 pr-6 py-4 rounded-2xl shadow-2xl flex items-center gap-3 animate-fade-in border border-gold-500/30 max-w-sm">
      <div className="bg-gold-500 rounded-full p-1">
        <Check className="w-4 h-4 text-navy-900" />
      </div>
      <div>
        <h4 className="font-serif font-bold text-gold-400 text-sm">Notification</h4>
        <p className="text-xs text-gray-300 mt-0.5">{message}</p>
      </div>
    </div>
  );
};

const App: React.FC = () => {
  const [loading, setLoading] = useState(true);
  const [toastMessage, setToastMessage] = useState<string | null>(null);
  const [isBookingOpen, setIsBookingOpen] = useState(false);
  const [isNightMode, setIsNightMode] = useState(false);
  
  // Routing State
  const [currentRoute, setCurrentRoute] = useState(window.location.hash || '#/');

  useEffect(() => {
    const handleHashChange = () => {
       const hash = window.location.hash || '#/';
       setCurrentRoute(hash);
       window.scrollTo(0, 0); // Reset scroll on route change
    };

    window.addEventListener('hashchange', handleHashChange);
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, []);

  const observerRef = useRef<IntersectionObserver | null>(null);

  useEffect(() => {
    if (loading) return;

    // Reset observer on route change to re-trigger animations
    observerRef.current = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('active');
        }
      });
    }, { threshold: 0.1 });

    const hiddenElements = document.querySelectorAll('.reveal, .reveal-left, .reveal-right');
    hiddenElements.forEach((el) => observerRef.current?.observe(el));

    return () => observerRef.current?.disconnect();
  }, [loading, isNightMode, currentRoute]); // Re-run when route changes

  const showToast = (msg: string) => {
    setToastMessage(msg);
  };

  const toggleNightMode = () => {
    setIsNightMode(prev => !prev);
  };

  // --- ROUTER LOGIC ---
  const renderContent = () => {
    switch(currentRoute) {
        case '#/hebergement':
            return (
                <div className="pt-32 min-h-screen bg-white dark:bg-navy-1000">
                    <Accommodation isNightMode={isNightMode} />
                    <Footer isNightMode={isNightMode} />
                </div>
            );
        case '#/restaurant':
             return (
                <div className="pt-32 min-h-screen bg-navy-950 dark:bg-black">
                    <Dining />
                    <Footer isNightMode={isNightMode} />
                </div>
            );
        case '#/spa':
             return (
                <div className="pt-32 min-h-screen bg-white dark:bg-navy-1000">
                    <Spa />
                    <Footer isNightMode={isNightMode} />
                </div>
            );
        case '#/experiences':
             return (
                <div className="pt-32 min-h-screen bg-white dark:bg-navy-1000">
                    <Experiences isNightMode={isNightMode} />
                    <Footer isNightMode={isNightMode} />
                </div>
            );
        case '#/contact':
        case '#/galerie': // Fallback to experiences for gallery for now or create distinct
             return (
                <div className="pt-32 min-h-screen bg-white dark:bg-navy-1000">
                   <div className="py-20 text-center">
                     <h2 className="text-4xl font-serif text-navy-900 dark:text-white">Page en construction</h2>
                     <p className="text-gray-500 mt-4">Nos artisans travaillent sur cette section.</p>
                   </div>
                   <Footer isNightMode={isNightMode} />
                </div>
            );
        case '#/':
        default:
            return (
                <>
                  <Hero isNightMode={isNightMode} />
                  <div className="bg-white dark:bg-navy-950 transition-colors duration-1000 relative z-10">
                    <Introduction />
                    <Accommodation isNightMode={isNightMode} />
                    <Dining />
                    <Spa />
                    <Experiences isNightMode={isNightMode} />
                    <Footer isNightMode={isNightMode} />
                  </div>
                </>
            );
    }
  };

  return (
    <div className={isNightMode ? 'dark' : ''}>
      {loading && <LoadingScreen onComplete={() => setLoading(false)} />}
      
      {toastMessage && (
        <Toast message={toastMessage} onClose={() => setToastMessage(null)} />
      )}
      
      <div className={`min-h-screen flex flex-col bg-white dark:bg-navy-1000 transition-colors duration-1000 ${loading ? 'opacity-0' : 'opacity-100'}`}>
        <Navbar 
          onOpenBooking={() => setIsBookingOpen(true)} 
          isNightMode={isNightMode}
          toggleNightMode={toggleNightMode}
          currentRoute={currentRoute}
        />
        
        <main className="flex-grow">
           {renderContent()}
        </main>
        
        {/* Fixed Elements */}
        <BookingBar 
          isOpen={isBookingOpen}
          setIsOpen={setIsBookingOpen}
          onSearch={() => showToast("Recherche de disponibilités en cours...")} 
        />
        <JojoChat />
        <FloatingDock onOpenBooking={() => setIsBookingOpen(true)} />
      </div>
    </div>
  );
};

export default App;