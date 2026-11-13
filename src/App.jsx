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

    audioManager.playSunflowerChime(Math.floor(Math.random() * 8));
  };

  return (
    <div
      className="relative min-h-screen text-garden-body dark:text-garden-darkBody selection:bg-amber-200 dark:selection:bg-amber-900/60 cursor-pointer overflow-x-hidden flex flex-col justify-between"
      onClick={hasStarted ? handleScreenClick : undefined}
    >
      {/* CAPA DE FONDO 3D PANORÁMICA: CAMPO ABIERTO DE GIRASOLES Y MONTAÑAS */}
      <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
        {/* Imagen del campo con suave movimiento de cámara cinemático */}
        <motion.div
          animate={{
            scale: [1, 1.04, 1],
            y: [0, -8, 0]
          }}
          transition={{
            repeat: Infinity,
            duration: 24,
            ease: "easeInOut"
          }}
          className="absolute inset-0 w-full h-full"
        >
          <img
            src="/campo-girasoles.jpg"
            alt="Campo infinito de girasoles"
            className="w-full h-full object-cover object-[50%_28%] select-none brightness-[0.92] contrast-[1.05] dark:brightness-[0.42] dark:contrast-[1.25] transition-all duration-700"
          />
        </motion.div>

        {/* Gradiente de luz solar y calidez del cielo en atardecer */}
        <div className="absolute inset-0 bg-gradient-to-b from-amber-200/25 via-transparent to-stone-950/75 dark:from-indigo-950/50 dark:via-transparent dark:to-stone-950/92 pointer-events-none" />

        {/* Halo resplandeciente del sol dorado en el horizonte */}
        <div className="absolute top-0 left-1/3 -translate-x-1/2 w-[600px] h-[360px] rounded-full bg-gradient-to-b from-amber-100/35 via-amber-300/18 to-transparent blur-3xl pointer-events-none dark:opacity-20" />

        {/* Neblina dorada atmosférica sobre las montañas y el fondo */}
        <div className="absolute top-[32%] left-0 right-0 h-32 bg-gradient-to-b from-amber-100/10 via-amber-200/12 to-transparent blur-lg pointer-events-none dark:opacity-10" />

        {/* Sombra de contraste inferior para fundir el suelo con las flores interactivas */}
        <div className="absolute bottom-0 left-0 right-0 h-52 bg-gradient-to-t from-stone-950/85 via-stone-950/45 to-transparent pointer-events-none" />
      </div>

      {/* Partículas de polen y chispas doradas flotando en el aire */}
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
          className="w-10 h-10 rounded-full border-2 border-amber-300 bg-amber-300/35 shadow-[0_0_20px_rgba(251,191,36,0.9)]"
        />
      )}

      {/* Pantalla inicial de bienvenida con vista del campo */}
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

          {/* Encabezado limpio con resplandor suave */}
          <header className="pt-8 sm:pt-12 pb-1 text-center px-4 max-w-md mx-auto">
            <motion.h1
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7 }}
              className="font-serif italic text-3xl sm:text-4xl text-amber-950 dark:text-amber-100 font-semibold tracking-tight drop-shadow-[0_2px_14px_rgba(255,255,255,0.7)] dark:drop-shadow-[0_2px_14px_rgba(0,0,0,0.85)]"
            >
              Un jardín de flores para ti
            </motion.h1>
          </header>

          {/* Sección del Jardín Panorámico 3D */}
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
                className="py-3 px-6 rounded-2xl glass-modal border border-amber-300/70 dark:border-amber-500/60 text-amber-950 dark:text-amber-100 font-medium text-sm shadow-[0_12px_32px_rgba(0,0,0,0.38)] flex items-center gap-2 group hover:bg-white/95 dark:hover:bg-stone-900/95 transition-all"
              >
                <MailOpen className="w-4 h-4 text-amber-600 dark:text-amber-400 group-hover:scale-110 transition-transform" />
                <span className="font-serif italic font-semibold">Ver mensaje especial</span>
                <Sparkles className="w-3.5 h-3.5 text-amber-400" />
              </motion.button>
            </div>
          </main>

          {/* Pie de página delicado */}
          <footer className="text-center text-xs text-amber-100/90 dark:text-stone-300/90 px-4 mt-2 mb-2 drop-shadow-md">
            <p className="font-serif italic">
              Un jardín de flores para ti 🌻
            </p>
          </footer>

          {/* Mini Controlador de Música en la esquina derecha */}
          <MiniMusicPlayer />
        </div>
      )}

      {/* Modal Único de Mensaje con retrato de psicóloga */}
      <LetterModal
        isOpen={isLetterModalOpen}
        onClose={() => setIsLetterModalOpen(false)}
        messageData={gardenContent.modalMessage}
      />
    </div>
  );
}
