/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { Sparkles, CheckCircle } from "lucide-react";
import { useState, useEffect, memo, useRef } from "react";
import { motion, AnimatePresence } from "motion/react";

const MOCK_PURCHASES = [
  { name: "João Silva", location: "São Paulo, SP", time: "acabou de comprar" },
  { name: "Maria Oliveira", location: "Rio de Janeiro, RJ", time: "há 2 minutos" },
  { name: "Pedro Santos", location: "Belo Horizonte, MG", time: "há 5 minutos" },
  { name: "Ana Costa", location: "Curitiba, PR", time: "acabou de comprar" },
  { name: "Carlos Souza", location: "Porto Alegre, RS", time: "há 3 minutos" },
  { name: "Fernanda Lima", location: "Salvador, BA", time: "há 1 minuto" },
  { name: "Ricardo Rocha", location: "Brasília, DF", time: "há 4 minutos" },
  { name: "Juliana Alves", location: "Fortaleza, CE", time: "acabou de comprar" },
];

const VimeoPlayer = memo(() => {
  return (
    <div className="w-full max-w-[400px] bg-black rounded-2xl overflow-hidden shadow-2xl border-4 border-white">
      <div style={{ padding: '177.78% 0 0 0', position: 'relative' }}>
        <iframe 
          src="https://player.vimeo.com/video/1180374287?badge=0&amp;autopause=0&amp;player_id=0&amp;app_id=58479&amp;title=0&amp;byline=0&amp;portrait=0&amp;controls=1" 
          frameBorder="0" 
          allow="autoplay; fullscreen; picture-in-picture; clipboard-write; encrypted-media; web-share" 
          referrerPolicy="strict-origin-when-cross-origin" 
          style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%' }} 
          title="VSL"
        />
      </div>
    </div>
  );
});

VimeoPlayer.displayName = "VimeoPlayer";

export default function App() {
  const [currentDateTime, setCurrentDateTime] = useState("");
  const [showNotification, setShowNotification] = useState(false);
  const [currentPurchase, setCurrentPurchase] = useState(MOCK_PURCHASES[0]);

  useEffect(() => {
    const updateDateTime = () => {
      const now = new Date();
      const day = String(now.getDate()).padStart(2, '0');
      const month = String(now.getMonth() + 1).padStart(2, '0');
      const year = now.getFullYear();
      const hours = String(now.getHours()).padStart(2, '0');
      const minutes = String(now.getMinutes()).padStart(2, '0');
      const seconds = String(now.getSeconds()).padStart(2, '0');
      
      setCurrentDateTime(`${day}/${month}/${year} ${hours}:${minutes}:${seconds}`);
    };

    updateDateTime();
    const interval = setInterval(updateDateTime, 1000);

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const triggerNotification = () => {
      const randomIndex = Math.floor(Math.random() * MOCK_PURCHASES.length);
      setCurrentPurchase(MOCK_PURCHASES[randomIndex]);
      setShowNotification(true);

      setTimeout(() => {
        setShowNotification(false);
      }, 5000);
    };

    // Initial delay before first notification
    const initialTimeout = setTimeout(triggerNotification, 3000);
    
    const notificationInterval = setInterval(triggerNotification, 12000);

    return () => {
      clearTimeout(initialTimeout);
      clearInterval(notificationInterval);
    };
  }, []);

  return (
    <div className="min-h-screen flex flex-col items-center bg-gray-50">
      {/* Top Banner */}
      <div className="w-full bg-[#0055FF] py-2 flex items-center justify-center gap-2 text-white font-medium text-sm md:text-base shadow-md z-50">
        <Sparkles className="w-4 h-4" />
        <span>Oferta Válida Somente Hoje ({currentDateTime})</span>
        <Sparkles className="w-4 h-4" />
      </div>

      <div className="flex flex-col items-center px-4 py-12 md:py-20">
        {/* Headline Container */}
        <div className="max-w-4xl text-center mb-10">
          <h1 className="text-[#E68A00] font-serif font-bold text-3xl md:text-5xl leading-tight drop-shadow-sm">
            Volte a Comer Pão, Sobremesas e Suas Comidas Favoritas Sem Culpa e pare de viver com medo dos picos de glicose
          </h1>
        </div>

        {/* Video/Image Container (Vimeo Player) */}
        <VimeoPlayer />

        {/* Footer/CTA */}
        <div className="mt-12 text-center">
          <a 
            href="https://pay.hotmart.com/S105234531F?checkoutMode=10"
            className="inline-block bg-[#E68A00] hover:bg-[#CC7A00] text-white font-bold py-4 px-8 rounded-full text-xl shadow-lg transition-all active:scale-95 uppercase"
          >
            Quero começar agora!
          </a>
        </div>
      </div>

      {/* Social Proof Notification */}
      <AnimatePresence>
        {showNotification && (
          <motion.div
            initial={{ opacity: 0, x: -50, y: 50 }}
            animate={{ opacity: 1, x: 0, y: 0 }}
            exit={{ opacity: 0, x: -50, scale: 0.95 }}
            className="fixed bottom-4 left-4 z-[100] bg-white rounded-lg shadow-2xl p-4 flex items-center gap-4 border border-gray-100 max-w-[280px] md:max-w-sm"
          >
            <div className="bg-green-100 p-2 rounded-full">
              <CheckCircle className="w-6 h-6 text-green-600" />
            </div>
            <div className="flex flex-col">
              <p className="text-sm font-bold text-gray-800">
                {currentPurchase.name}
              </p>
              <p className="text-xs text-gray-600">
                de {currentPurchase.location}
              </p>
              <p className="text-[10px] text-green-600 font-medium mt-1 uppercase tracking-wider">
                {currentPurchase.time}
              </p>
            </div>
            <button 
              onClick={() => setShowNotification(false)}
              className="absolute top-2 right-2 text-gray-400 hover:text-gray-600"
            >
              ×
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
