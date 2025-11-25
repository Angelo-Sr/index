import React, { useState } from 'react';
import { Mail, CheckCircle, Loader2 } from 'lucide-react';

export const Newsletter: React.FC = () => {
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

  return (
    <section id="club" className="w-full py-24 flex items-center justify-center bg-green-50/90 dark:bg-navy-1000/90 backdrop-blur-2xl px-6 relative overflow-hidden transition-colors duration-1000 z-10">
      {/* Background Decor */}
      <div className="absolute -left-20 -bottom-20 w-96 h-96 bg-green-100/50 dark:bg-navy-900/50 rounded-full blur-3xl pointer-events-none transition-colors duration-1000"></div>
      
      <div className="bg-white/95 dark:bg-navy-950/95 p-8 md:p-12 max-w-4xl w-full shadow-2xl dark:shadow-[0_0_80px_rgba(212,175,55,0.15)] rounded-[3rem] border-t-4 border-gold-500 text-center relative z-10 transition-colors duration-1000 backdrop-blur-sm">
        
        {status === 'success' ? (
          <div className="animate-fade-in py-8">
            <div className="w-20 h-20 bg-green-100 dark:bg-navy-900 rounded-full flex items-center justify-center mx-auto mb-6 transition-colors">
              <CheckCircle className="w-10 h-10 text-green-600 dark:text-green-400" />
            </div>
            <h3 className="text-3xl font-serif font-bold text-navy-900 dark:text-white mb-2 transition-colors">Bienvenue au Club</h3>
            <p className="text-gray-600 dark:text-gray-300 transition-colors">Vous recevrez bientôt nos invitations exclusives.</p>
            <button 
              onClick={() => setStatus('idle')}
              className="mt-6 text-sm text-gold-600 hover:text-gold-800 dark:hover:text-gold-400 underline"
            >
              Inscrire une autre adresse
            </button>
          </div>
        ) : (
          <>
            <h3 className="text-3xl md:text-4xl font-serif font-bold text-navy-900 dark:text-white mb-4 transition-colors duration-1000">Club Privé</h3>
            <p className="text-gray-600 dark:text-gray-300 mb-8 max-w-lg mx-auto leading-relaxed transition-colors duration-1000">
              Le Boraha Sanctuary est un lieu secret. Rejoignez notre cercle pour recevoir nos invitations exclusives et nos offres réservées aux membres.
            </p>
            
            <form className="flex flex-col md:flex-row gap-4 max-w-lg mx-auto" onSubmit={handleSubmit}>
              <div className="flex-1 relative">
                <Mail className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <input 
                  type="email" 
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Votre adresse email" 
                  className="w-full pl-12 pr-4 py-4 bg-gray-50/50 dark:bg-navy-1000/50 dark:text-white dark:border-navy-800 border border-gray-200 focus:border-gold-500 outline-none transition-colors rounded-full"
                  required
                />
              </div>
              <button 
                disabled={status === 'loading'}
                className="bg-navy-900 dark:bg-gold-500 hover:bg-navy-800 dark:hover:bg-gold-400 text-white dark:text-navy-950 font-bold uppercase tracking-widest px-8 py-4 transition-all rounded-full min-w-[160px] flex justify-center items-center disabled:opacity-80 shadow-lg dark:shadow-[0_0_30px_rgba(212,175,55,0.4)]"
              >
                {status === 'loading' ? <Loader2 className="animate-spin w-5 h-5"/> : "S'inscrire"}
              </button>
            </form>
            <p className="text-xs text-gray-400 mt-4">
              Nous respectons la tranquillité de nos membres comme celle de nos clients.
            </p>
          </>
        )}
      </div>
    </section>
  );
};