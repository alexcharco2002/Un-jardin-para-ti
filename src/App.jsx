import React, { useState, useEffect } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { gardenContent } from './data/content';
import { IntroScreen } from './components/IntroScreen';
import { SunflowerGarden } from './components/SunflowerGarden';
import { LetterModal } from './components/LetterModal';
import { FloatingControls } from './components/FloatingControls';
import { MiniMusicPlayer } from './components/MiniMusicPlayer';
import { PollenParticles } from './components/PollenParticles';
import { audioManager } from './utils/audio';
import { Sparkles, MailOpen } from 'lucide-react';

export default function App() {
  const [hasStarted, setHasStarted] = useState(false);
  const [isLetterModalOpen, setIsLetterModalOpen] = useState(false);
  const [bloomKey, setBloomKey] = useState(0);
  const [tapEffect, setTapEffect] = useState(null);

  // MODO CLARO / OSCURO
  const [isDarkMode, setIsDarkMode] = useState(() => {
    return localStorage.getItem('garden_dark_mode') === 'true';
  });

  useEffect(() => {
    // Limpiar restos antiguos de localStorage para asegurar que solo se use el mensaje configurado
    localStorage.removeItem('garden_custom_letter');
    localStorage.removeItem('garden_recipient');

    if (isDarkMode) {
      document.documentElement.classList.add('dark');
      localStorage.setItem('garden_dark_mode', 'true');
    } else {
      document.documentElement.classList.remove('dark');
      localStorage.setItem('garden_dark_mode', 'false');
    }
  }, [isDarkMode]);

  const toggleTheme = (e) => {
    if (e) e.stopPropagation();
    setIsDarkMode((prev) => !prev);
  };

  const handleStart = () => {
    setHasStarted(true);
  };

  const handleRebloom = (e) => {
    if (e) e.stopPropagation();
    audioManager.playSunflowerChime(2);
    setBloomKey((prev) => prev + 1);
  };

  const handleOpenModal = (e) => {
    if (e) e.stopPropagation();
    audioManager.playSunflowerChime(3);
    setIsLetterModalOpen(true);
  };

  const handleScreenClick = (e) => {
    if (isLetterModalOpen) return;

    setTapEffect({
      x: e.clientX,
      y: e.clientY,
      id: Date.now(),
    });

    audioManager.playSunflowerChime(Math.floor(Math.random() * 5));
  };

  return (
    <div
      className="relative min-h-screen text-garden-body dark:text-garden-darkBody selection:bg-amber-200 dark:selection:bg-amber-900/60 cursor-pointer overflow-x-hidden flex flex-col justify-between"
      onClick={hasStarted ? handleScreenClick : undefined}
    >
      {/* Partículas de polen y luz dorada flotante */}
      <PollenParticles />

      {/* Efecto visual al tocar la pantalla */}
      {tapEffect && (
        <motion.div
          key={tapEffect.id}
          initial={{ scale: 0, opacity: 1 }}
          animate={{ scale: 2.2, opacity: 0 }}
          transition={{ duration: 0.65, ease: "easeOut" }}
          style={{
            position: 'fixed',
            left: tapEffect.x - 20,
            top: tapEffect.y - 20,
            pointerEvents: 'none',
            zIndex: 9999,
          }}
          className="w-10 h-10 rounded-full border-2 border-amber-400 bg-amber-300/30 shadow-[0_0_15px_rgba(251,191,36,0.8)]"
        />
      )}

      {/* Pantalla inicial de bienvenida */}
      <AnimatePresence>
        {!hasStarted && (
          <IntroScreen
            buttonText={gardenContent.introButtonText}
            subtitle={gardenContent.introSubtitle}
            onStart={handleStart}
          />
        )}
      </AnimatePresence>

      {/* Experiencia principal tras presionar abrir */}
      {hasStarted && (
        <div className="relative z-10 flex flex-col min-h-screen justify-between pb-24">
          {/* Controles discretos en esquina superior derecha */}
          <div onClick={(e) => e.stopPropagation()}>
            <FloatingControls
              isDarkMode={isDarkMode}
              onToggleTheme={toggleTheme}
              onRebloom={handleRebloom}
              onOpenMessage={handleOpenModal}
            />
          </div>

          {/* Encabezado limpio */}
          <header className="pt-8 sm:pt-12 pb-1 text-center px-4 max-w-md mx-auto">
            <motion.h1
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7 }}
              className="font-serif italic text-3xl sm:text-4xl text-garden-title dark:text-garden-darkTitle font-medium tracking-tight"
            >
              Un jardín de flores para ti
            </motion.h1>
          </header>

          {/* Sección de los 5 girasoles floreciendo */}
          <main className="flex-1 flex flex-col items-center justify-center my-auto">
            <SunflowerGarden
              onSelectSunflower={() => setIsLetterModalOpen(true)}
              bloomKey={bloomKey}
            />

            {/* Botón táctil para abrir el Modal Único de Mensaje */}
            <div className="flex flex-col items-center gap-3 mt-4" onClick={(e) => e.stopPropagation()}>
              <motion.button
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.8 }}
                whileHover={{ scale: 1.04 }}
                whileTap={{ scale: 0.96 }}
                onClick={handleOpenModal}
                className="py-3 px-6 rounded-2xl glass-modal border border-amber-300/60 dark:border-amber-600/50 text-amber-900 dark:text-amber-200 font-medium text-sm shadow-md flex items-center gap-2 group hover:bg-white dark:hover:bg-stone-900 transition-all"
              >
                <MailOpen className="w-4 h-4 text-amber-600 dark:text-amber-400 group-hover:scale-110 transition-transform" />
                <span className="font-serif italic font-semibold">Ver mensaje especial</span>
                <Sparkles className="w-3.5 h-3.5 text-amber-400" />
              </motion.button>
            </div>
          </main>

          {/* Pie de página delicado */}
          <footer className="text-center text-xs text-stone-500 dark:text-stone-400 px-4 mt-2 mb-2">
            <p className="font-serif italic">
              Un jardín de flores para ti 🌻
            </p>
          </footer>

          {/* Mini Controlador de Música en la esquina derecha */}
          <MiniMusicPlayer />
        </div>
      )}

      {/* Modal Único de Mensaje */}
      <LetterModal
        isOpen={isLetterModalOpen}
        onClose={() => setIsLetterModalOpen(false)}
        messageData={gardenContent.modalMessage}
      />
    </div>
  );
}
