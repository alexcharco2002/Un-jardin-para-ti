import React from 'react';
import { motion } from 'framer-motion';
import { Sparkles, Flower2 } from 'lucide-react';
import { musicPlayer } from '../utils/audioPlayer';

/**
 * IntroScreen
 * Pantalla de bienvenida inmersiva con vista previa difuminada del campo de girasoles y montañas.
 */
export const IntroScreen = ({
  buttonText = "Toca para abrir tu detalle",
  subtitle = "Porque a veces los recuerdos también pueden florecer con calma...",
  onStart
}) => {
  const handleOpen = () => {
    musicPlayer.play();
    if (onStart) onStart();
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0, scale: 1.05 }}
      transition={{ duration: 0.8, ease: 'easeInOut' }}
      className="fixed inset-0 z-50 flex flex-col items-center justify-center p-6 text-center select-none overflow-hidden"
    >
      {/* Fondo del campo al atardecer difuminado */}
      <div className="absolute inset-0 w-full h-full overflow-hidden">
        <img
          src="/campo-girasoles.jpg"
          alt="Paisaje de girasoles"
          className="w-full h-full object-cover object-[50%_30%] scale-110 filter blur-md brightness-90 dark:brightness-[0.4]"
        />
        {/* Velo cálido dorado */}
        <div className="absolute inset-0 bg-gradient-to-b from-amber-200/40 via-amber-950/50 to-stone-950/80 dark:from-stone-950/60 dark:to-stone-950/90" />
      </div>

      <div className="relative max-w-sm w-full flex flex-col items-center z-10">
        {/* Halo de luz cálida pulsante */}
        <div className="absolute top-1/4 -translate-y-1/2 w-48 h-48 rounded-full bg-amber-300/35 dark:bg-amber-500/25 blur-3xl pointer-events-none animate-pulse-warm" />

        {/* Semilla dorada con flor */}
        <motion.div
          animate={{
            scale: [1, 1.06, 1],
            rotate: [0, 2, -2, 0],
          }}
          transition={{
            repeat: Infinity,
            duration: 3.2,
            ease: "easeInOut"
          }}
          className="relative w-24 h-24 rounded-full bg-gradient-to-tr from-amber-500 via-amber-400 to-yellow-200 p-1 shadow-[0_10px_35px_rgba(245,158,11,0.45)] flex items-center justify-center mb-8 cursor-pointer group"
          onClick={handleOpen}
        >
          <div className="w-full h-full rounded-full bg-[#451A03] flex items-center justify-center border-2 border-amber-300/70 shadow-inner">
            <Flower2 className="w-9 h-9 text-amber-400 group-hover:scale-110 transition-transform duration-300" />
          </div>

          <motion.div
            animate={{ rotate: 360 }}
            transition={{ repeat: Infinity, duration: 10, ease: "linear" }}
            className="absolute inset-0 pointer-events-none"
          >
            <Sparkles className="w-4 h-4 text-amber-300 absolute -top-1 left-1/2 -translate-x-1/2" />
          </motion.div>
        </motion.div>

        {/* Título principal con sombra nítida */}
        <motion.h1
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="font-serif italic text-4xl sm:text-5xl text-white font-medium leading-tight mb-3 drop-shadow-[0_4px_16px_rgba(0,0,0,0.65)]"
        >
          Un jardín de flores para ti
        </motion.h1>

        {/* Subtítulo */}
        <motion.p
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="font-sans text-amber-100/90 dark:text-stone-200 text-base max-w-xs mb-9 leading-relaxed drop-shadow-md"
        >
          {subtitle}
        </motion.p>

        {/* Botón táctil elegante */}
        <motion.button
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          whileHover={{ scale: 1.04 }}
          whileTap={{ scale: 0.96 }}
          onClick={handleOpen}
          className="w-full py-4 px-6 rounded-2xl bg-gradient-to-r from-amber-500 via-amber-600 to-yellow-600 text-white font-medium text-base shadow-[0_14px_30px_rgba(217,119,6,0.45)] border border-amber-300/50 flex items-center justify-center gap-2 group transition-all"
        >
          <span>{buttonText}</span>
          <Sparkles className="w-4 h-4 text-yellow-200 group-hover:rotate-12 transition-transform" />
        </motion.button>

        <p className="mt-4 text-[11px] text-amber-200/80 dark:text-stone-300 font-sans flex items-center gap-1.5 justify-center drop-shadow-sm">
          <span>🎵</span>
          <span>Sube el volumen para escuchar "State Lines" (Novo Amor)</span>
        </p>
      </div>
    </motion.div>
  );
};
