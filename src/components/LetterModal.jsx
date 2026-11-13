import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Flower2 } from 'lucide-react';

/**
 * LetterModal
 * Modal único para mostrar el mensaje especial con la ilustración de psicóloga.
 */
export const LetterModal = ({
  isOpen,
  onClose,
  messageData
}) => {
  if (!isOpen || !messageData) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-5">
        {/* Backdrop desenfocado */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.25 }}
          onClick={onClose}
          className="absolute inset-0 bg-stone-950/55 backdrop-blur-sm"
        />

        {/* Contenedor del Modal */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.9, y: 15 }}
          transition={{ type: 'spring', damping: 25, stiffness: 300 }}
          onClick={(e) => e.stopPropagation()}
          className="relative w-full max-w-lg max-h-[88vh] overflow-y-auto glass-modal rounded-[32px] p-6 sm:p-8 z-10 shadow-2xl flex flex-col text-center"
          role="dialog"
          aria-modal="true"
        >
          {/* Botón cerrar */}
          <button
            onClick={onClose}
            aria-label="Cerrar mensaje"
            className="absolute top-4 right-4 p-2 rounded-full text-stone-500 hover:text-stone-800 dark:hover:text-stone-200 hover:bg-amber-100/60 dark:hover:bg-amber-900/40 active:scale-95 transition-all z-20"
          >
            <X className="w-5 h-5" />
          </button>

          {/* Ícono decorativo superior */}
          <div className="text-center mb-2">
            <div className="inline-flex items-center justify-center w-11 h-11 rounded-full bg-gradient-to-tr from-amber-500 to-amber-300 text-white shadow-md shadow-amber-500/25 mb-1.5">
              <Flower2 className="w-5 h-5 animate-pulse" />
            </div>
            <p className="text-[11px] font-semibold tracking-widest uppercase text-amber-700 dark:text-amber-400">
              Un mensaje para ti
            </p>
          </div>

          {/* Título */}
          <h2 className="font-serif italic text-2xl sm:text-3xl text-garden-title dark:text-garden-darkTitle font-semibold leading-tight text-center mb-3">
            {messageData.title}
          </h2>

          {/* Retrato ilustrado de psicóloga con halo cálido y marco elegante */}
          <div className="relative mx-auto my-2 group flex flex-col items-center">
            <div className="absolute -inset-1 rounded-2xl bg-gradient-to-r from-amber-400 via-amber-300 to-yellow-500 opacity-60 blur-sm group-hover:opacity-95 transition duration-500" />
            <div className="relative overflow-hidden rounded-2xl border-2 border-amber-300/80 dark:border-amber-500/70 shadow-xl bg-white dark:bg-stone-900">
              <img
                src="/psicologa.jpg"
                alt="Ilustración de la futura psicóloga"
                className="w-44 sm:w-52 h-60 sm:h-68 object-cover object-top select-none transition-transform duration-500 group-hover:scale-105"
                loading="eager"
              />
            </div>
          </div>

          <div className="w-20 h-0.5 bg-gradient-to-r from-transparent via-amber-400 to-transparent mx-auto my-4" />

          {/* Párrafos del mensaje */}
          <div className="space-y-4 text-garden-body dark:text-garden-darkBody font-sans text-sm sm:text-base leading-relaxed text-left sm:text-justify px-1">
            {messageData.paragraphs.map((p, idx) => (
              <p key={idx} className="leading-relaxed">
                {p}
              </p>
            ))}
          </div>

          {/* Cierre / Despedida */}
          {messageData.closing && (
            <div className="mt-6 pt-5 border-t border-amber-200/60 dark:border-amber-700/40 flex flex-col items-center text-center">
              <span className="font-serif italic text-xl sm:text-2xl font-bold text-amber-900 dark:text-amber-300 tracking-wide">
                {messageData.closing}
              </span>
            </div>
          )}

          {/* Botón de cierre */}
          <div className="mt-6 pt-2">
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
