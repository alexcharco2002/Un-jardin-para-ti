import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Sun, Sparkles, Flower2, Star, X } from 'lucide-react';

const iconMap = {
  sun: Sun,
  sparkles: Sparkles,
  flower2: Flower2,
  star: Star,
};

/**
 * FloatingNote
 * Modal con un solo mensaje sin frases melosas de pareja.
 */
export const FloatingNote = ({ note, onClose }) => {
  if (!note) return null;

  const IconComponent = iconMap[note.icon] || Sparkles;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6">
        {/* Backdrop desenfocado */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.25 }}
          onClick={onClose}
          className="absolute inset-0 bg-stone-950/40 backdrop-blur-sm"
        />

        {/* Tarjeta flotante central */}
        <motion.div
          initial={{ opacity: 0, scale: 0.88, y: 25 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.92, y: 15 }}
          transition={{ type: 'spring', damping: 24, stiffness: 300 }}
          onClick={(e) => e.stopPropagation()}
          className="relative w-full max-w-sm glass-modal rounded-3xl p-6 sm:p-7 z-10 text-center"
          role="dialog"
          aria-modal="true"
        >
          {/* Botón cerrar */}
          <button
            onClick={onClose}
            aria-label="Cerrar mensaje"
            className="absolute top-4 right-4 p-2 rounded-full text-stone-500 hover:text-stone-800 dark:hover:text-stone-200 hover:bg-amber-100/60 dark:hover:bg-amber-900/40 active:scale-95 transition-all"
          >
            <X className="w-5 h-5" />
          </button>

          {/* Insignia / Ícono superior */}
          <div className="mx-auto w-14 h-14 rounded-2xl bg-gradient-to-tr from-amber-400 to-amber-200 p-0.5 shadow-md shadow-amber-500/20 mb-4 flex items-center justify-center">
            <div className="w-full h-full rounded-[14px] bg-white/95 dark:bg-stone-900/95 flex items-center justify-center">
              <IconComponent className="w-7 h-7 text-amber-600 dark:text-amber-400 animate-pulse" />
            </div>
          </div>

          {/* Indicador de pensamiento */}
          <span className="inline-block px-3 py-1 text-xs font-semibold tracking-wider uppercase text-amber-800 dark:text-amber-300 bg-amber-100/70 dark:bg-amber-900/50 rounded-full mb-2">
            Detalle
          </span>

          {/* Título */}
          <h3 className="font-serif italic font-semibold text-2xl text-garden-title dark:text-garden-darkTitle mb-3">
            {note.title}
          </h3>

          {/* Frase especial */}
          <p className="font-sans text-garden-body dark:text-garden-darkBody text-base leading-relaxed mb-6 font-normal">
            "{note.text}"
          </p>

          {/* Botón de acción */}
          <div className="pt-2 border-t border-amber-200/50 dark:border-amber-700/40">
            <button
              onClick={onClose}
              className="w-full py-3 px-4 rounded-xl text-sm font-semibold text-white bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-600 hover:to-amber-700 active:scale-95 shadow-md shadow-amber-500/20 transition-all flex items-center justify-center gap-1.5"
            >
              <span>Cerrar</span>
            </button>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
