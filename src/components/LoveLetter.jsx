import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Heart, Sparkles, Flower2 } from 'lucide-react';

/**
 * LoveLetter
 * Tarjeta de carta principal con efecto Glassmorphism y aparición en scroll.
 */
export const LoveLetter = ({ recipientName, letterData }) => {
  const [hasHearted, setHasHearted] = useState(false);

  if (!letterData) return null;

  return (
    <section className="relative w-full max-w-lg mx-auto px-4 sm:px-6 py-12">
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-60px' }}
        transition={{ duration: 0.8, ease: 'easeOut' }}
        className="glass-card rounded-[32px] p-7 sm:p-9 relative overflow-hidden"
      >
        <div className="absolute -top-16 -right-16 w-44 h-44 bg-amber-300/20 rounded-full blur-2xl pointer-events-none" />
        <div className="absolute -bottom-16 -left-16 w-44 h-44 bg-yellow-400/15 rounded-full blur-2xl pointer-events-none" />

        <div className="text-center mb-6">
          <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-gradient-to-tr from-amber-500 to-amber-300 text-white shadow-md shadow-amber-500/25 mb-4">
            <Flower2 className="w-6 h-6 animate-pulse" />
          </div>

          <p className="text-xs font-semibold tracking-widest uppercase text-amber-700/80 mb-1">
            Una carta especial
          </p>

          <h2 className="font-serif italic text-3xl sm:text-4xl text-garden-title font-medium leading-tight">
            Para ti, {recipientName}
          </h2>

          <div className="w-16 h-0.5 bg-gradient-to-r from-transparent via-amber-400 to-transparent mx-auto mt-4" />
        </div>

        <div className="space-y-4 text-garden-body font-sans text-base sm:text-lg leading-relaxed font-normal">
          {letterData.paragraphs.map((p, idx) => (
            <motion.p
              key={idx}
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.15 * idx, duration: 0.6 }}
              className="text-justify first-letter:text-2xl first-letter:font-serif first-letter:text-amber-700"
            >
              {p}
            </motion.p>
          ))}
        </div>

        <div className="mt-8 pt-6 border-t border-amber-200/60 flex flex-col items-center text-center">
          <span className="font-serif italic text-stone-600 text-sm mb-1">
            {letterData.closing}
          </span>
          <span className="font-serif italic text-2xl font-semibold text-amber-900 tracking-wide">
            {letterData.signature}
          </span>

          <button
            onClick={(e) => {
              e.stopPropagation();
              setHasHearted(!hasHearted);
            }}
            aria-label="Dar amor a la carta"
            className="mt-6 inline-flex items-center gap-2 px-4 py-2 rounded-full glass-pill hover:bg-white active:scale-95 transition-all text-xs font-medium text-amber-800"
          >
            <Heart
              className={`w-4 h-4 transition-colors ${
                hasHearted ? 'fill-red-500 text-red-500' : 'text-amber-600'
              }`}
            />
            <span>{hasHearted ? '¡Guardado en el alma!' : 'Toca para enviar un latido'}</span>
            <Sparkles className="w-3.5 h-3.5 text-amber-400" />
          </button>
        </div>
      </motion.div>
    </section>
  );
};
