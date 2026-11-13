import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { SunflowerSVG } from './SunflowerSVG';
import { WildflowerSVG } from './WildflowerSVG';
import { Sparkles } from 'lucide-react';
import { audioManager } from '../utils/audio';

/**
 * SunflowerGarden
 * Jardín botánico panorámico optimizado para móvil y escritorio:
 * - Escala inteligente: en móvil los girasoles tienen proporciones armoniosas que dejan ver las montañas
 * - En móvil se muestran 11 flores clave bien espaciadas para evitar saturación
 * - En escritorio se expanden las 16 flores y las 8 silvestres en vista panorámica completa
 */
export const SunflowerGarden = ({ onSelectSunflower, bloomKey = 0 }) => {
  const [bouncingId, setBouncingId] = useState(null);

  // Configuración de los 16 girasoles con control de visibilidad en móvil para composición limpia
  const sunflowerConfigs = [
    // FONDO (Pequeños, dan profundidad y lejanía)
    { id: 1, name: "Flor 1", stemHeight: 270, stemCurve: -12, headAngle: -7, scale: 0.68, zIndex: 4, bottomOffset: '-4px', leftPercent: '3%', swayClass: 'animate-sway-left', bloomDelay: 0.05, hideOnMobile: false },
    { id: 2, name: "Flor 2", stemHeight: 290, stemCurve: 8, headAngle: 5, scale: 0.72, zIndex: 5, bottomOffset: '-5px', leftPercent: '14%', swayClass: 'animate-sway-gentle', bloomDelay: 0.12, hideOnMobile: true },
    { id: 3, name: "Flor 3", stemHeight: 265, stemCurve: -6, headAngle: -4, scale: 0.65, zIndex: 4, bottomOffset: '-4px', leftPercent: '25%', swayClass: 'animate-sway-right', bloomDelay: 0.18, hideOnMobile: false },
    { id: 4, name: "Flor 4", stemHeight: 300, stemCurve: 10, headAngle: 6, scale: 0.74, zIndex: 6, bottomOffset: '-6px', leftPercent: '36%', swayClass: 'animate-sway-left', bloomDelay: 0.22, hideOnMobile: true },
    { id: 5, name: "Flor 5", stemHeight: 280, stemCurve: -8, headAngle: -5, scale: 0.70, zIndex: 5, bottomOffset: '-5px', leftPercent: '48%', swayClass: 'animate-sway-gentle', bloomDelay: 0.28, hideOnMobile: false },
    { id: 6, name: "Flor 6", stemHeight: 295, stemCurve: 7, headAngle: 4, scale: 0.73, zIndex: 6, bottomOffset: '-5px', leftPercent: '62%', swayClass: 'animate-sway-right', bloomDelay: 0.15, hideOnMobile: true },
    { id: 7, name: "Flor 7", stemHeight: 275, stemCurve: -8, headAngle: -6, scale: 0.66, zIndex: 4, bottomOffset: '-4px', leftPercent: '74%', swayClass: 'animate-sway-left', bloomDelay: 0.1, hideOnMobile: false },
    { id: 8, name: "Flor 8", stemHeight: 285, stemCurve: 12, headAngle: 8, scale: 0.69, zIndex: 5, bottomOffset: '-4px', leftPercent: '97%', swayClass: 'animate-sway-gentle', bloomDelay: 0.08, hideOnMobile: false },

    // PLANO MEDIO (Medianos, cuerpo frondoso del jardín)
    { id: 9, name: "Flor 9", stemHeight: 340, stemCurve: -10, headAngle: -4, scale: 0.88, zIndex: 9, bottomOffset: '-14px', leftPercent: '8%', swayClass: 'animate-sway-gentle', bloomDelay: 0.32, hideOnMobile: false },
    { id: 10, name: "Flor 10", stemHeight: 360, stemCurve: 9, headAngle: 5, scale: 0.92, zIndex: 10, bottomOffset: '-16px', leftPercent: '32%', swayClass: 'animate-sway-right', bloomDelay: 0.38, hideOnMobile: false },
    { id: 11, name: "Flor 11", stemHeight: 345, stemCurve: -6, headAngle: -3, scale: 0.86, zIndex: 9, bottomOffset: '-14px', leftPercent: '44%', swayClass: 'animate-sway-left', bloomDelay: 0.42, hideOnMobile: true },
    { id: 12, name: "Flor 12", stemHeight: 355, stemCurve: 8, headAngle: 4, scale: 0.90, zIndex: 10, bottomOffset: '-15px', leftPercent: '68%', swayClass: 'animate-sway-gentle', bloomDelay: 0.35, hideOnMobile: false },
    { id: 13, name: "Flor 13", stemHeight: 340, stemCurve: -9, headAngle: -5, scale: 0.85, zIndex: 9, bottomOffset: '-14px', leftPercent: '88%', swayClass: 'animate-sway-right', bloomDelay: 0.25, hideOnMobile: false },

    // PRIMER PLANO (Grandes y majestuosos protagonistas)
    { id: 14, name: "Flor 14", stemHeight: 380, stemCurve: -8, headAngle: -3, scale: 1.02, zIndex: 14, bottomOffset: '-22px', leftPercent: '19%', swayClass: 'animate-sway-gentle', bloomDelay: 0.45, hideOnMobile: false },
    { id: 15, name: "Flor 15", stemHeight: 410, stemCurve: 6, headAngle: 2, scale: 1.12, zIndex: 18, bottomOffset: '-28px', leftPercent: '56%', swayClass: 'animate-sway-right', bloomDelay: 0.55, hideOnMobile: false },
    { id: 16, name: "Flor 16", stemHeight: 390, stemCurve: 10, headAngle: 5, scale: 1.05, zIndex: 15, bottomOffset: '-24px', leftPercent: '81%', swayClass: 'animate-sway-left', bloomDelay: 0.48, hideOnMobile: false },
  ];

  // Florecillas silvestres campestres en la base
  const wildflowerConfigs = [
    { id: 'wf1', leftPercent: '5%', height: 100, curve: -5, scale: 0.80, zIndex: 20, delay: 0.6, colorType: 'cream', hideOnMobile: false },
    { id: 'wf2', leftPercent: '18%', height: 115, curve: 6, scale: 0.85, zIndex: 21, delay: 0.72, colorType: 'yellow', hideOnMobile: true },
    { id: 'wf3', leftPercent: '28%', height: 95, curve: -4, scale: 0.75, zIndex: 19, delay: 0.65, colorType: 'cream', hideOnMobile: false },
    { id: 'wf4', leftPercent: '42%', height: 120, curve: 5, scale: 0.88, zIndex: 22, delay: 0.82, colorType: 'yellow', hideOnMobile: false },
    { id: 'wf5', leftPercent: '54%', height: 105, curve: -4, scale: 0.80, zIndex: 20, delay: 0.7, colorType: 'cream', hideOnMobile: true },
    { id: 'wf6', leftPercent: '67%', height: 115, curve: 7, scale: 0.84, zIndex: 21, delay: 0.78, colorType: 'cream', hideOnMobile: false },
    { id: 'wf7', leftPercent: '79%', height: 100, curve: -5, scale: 0.78, zIndex: 20, delay: 0.74, colorType: 'yellow', hideOnMobile: true },
    { id: 'wf8', leftPercent: '92%', height: 118, curve: 5, scale: 0.84, zIndex: 22, delay: 0.68, colorType: 'cream', hideOnMobile: false },
  ];

  const handleFlowerTap = (id, idx, e) => {
    if (e) e.stopPropagation();
    audioManager.playSunflowerChime(idx);
    setBouncingId(id);
    setTimeout(() => setBouncingId(null), 550);

    if (onSelectSunflower) {
      onSelectSunflower(id, idx);
    }
  };

  return (
    <div className="relative w-full h-[370px] sm:h-[500px] max-w-5xl mx-auto overflow-visible select-none flex items-end justify-center px-2">
      {/* Indicador sutil de interacción adaptado a móvil */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.4, duration: 0.8 }}
        className="absolute -top-3 sm:top-2 left-1/2 -translate-x-1/2 z-30 flex items-center gap-1 sm:gap-1.5 px-3 py-1 sm:px-3.5 sm:py-1.5 rounded-full glass-pill text-[10px] sm:text-xs font-medium text-amber-950 dark:text-amber-200 shadow-sm whitespace-nowrap max-w-[88vw] truncate"
      >
        <Sparkles className="w-3 h-3 sm:w-3.5 sm:h-3.5 text-amber-500 animate-pulse flex-shrink-0" />
        <span>Toca cualquier flor para ver el mensaje</span>
      </motion.div>

      {/* Escenario completo del jardín botánico */}
      <div key={bloomKey} className="relative w-full h-full">
        {/* 1. Girasoles multicapa */}
        {sunflowerConfigs.map((cfg, idx) => {
          const isBouncing = bouncingId === cfg.id;

          return (
            <motion.div
              key={`${bloomKey}-sf-${cfg.id}`}
              initial={{ scale: 0, opacity: 0 }}
              animate={{
                scale: isBouncing ? cfg.scale * 1.12 : cfg.scale,
                y: isBouncing ? -12 : 0,
                opacity: 1,
              }}
              transition={{
                type: 'spring',
                stiffness: 90,
                damping: 15,
                delay: cfg.bloomDelay,
              }}
              style={{
                left: cfg.leftPercent,
                bottom: cfg.bottomOffset,
                zIndex: cfg.zIndex,
                transformOrigin: 'bottom center',
              }}
              className={`absolute -translate-x-1/2 cursor-pointer touch-manipulation group ${
                cfg.hideOnMobile ? 'hidden sm:block' : 'block'
              }`}
              onClick={(e) => handleFlowerTap(cfg.id, idx, e)}
            >
              {/* Contenedor del balanceo con dimensiones responsivas para móvil y escritorio */}
              <div
                className={`w-[85px] sm:w-[150px] h-[260px] sm:h-[430px] origin-stem-base ${cfg.swayClass}`}
              >
                {/* Aura de pulso cálida al interactuar */}
                <div className="absolute top-6 sm:top-8 left-1/2 -translate-x-1/2 w-16 sm:w-24 h-16 sm:h-24 rounded-full bg-amber-400/15 filter blur-lg pointer-events-none group-hover:bg-amber-400/35 transition-all" />

                {/* SVG Vectorial con florecimiento orgánico multicapa */}
                <SunflowerSVG
                  flowerId={cfg.id}
                  stemHeight={cfg.stemHeight}
                  stemCurve={cfg.stemCurve}
                  headAngle={cfg.headAngle}
                  isSelected={false}
                />
              </div>
            </motion.div>
          );
        })}

        {/* 2. Manto de florecillas silvestres campestres */}
        {wildflowerConfigs.map((wf, idx) => {
          const isBouncing = bouncingId === wf.id;

          return (
            <motion.div
              key={`${bloomKey}-${wf.id}`}
              initial={{ scale: 0, opacity: 0 }}
              animate={{
                scale: isBouncing ? wf.scale * 1.25 : wf.scale,
                y: isBouncing ? -8 : 0,
                opacity: 1,
              }}
              transition={{
                type: 'spring',
                stiffness: 100,
                damping: 14,
                delay: wf.delay,
              }}
              style={{
                left: wf.leftPercent,
                bottom: '-2px',
                zIndex: wf.zIndex,
                transformOrigin: 'bottom center',
              }}
              className={`absolute -translate-x-1/2 cursor-pointer touch-manipulation group ${
                wf.hideOnMobile ? 'hidden sm:block' : 'block'
              }`}
              onClick={(e) => handleFlowerTap(wf.id, idx + 10, e)}
            >
              <div className="w-[42px] sm:w-[60px] h-[100px] sm:h-[135px] origin-stem-base animate-sway-gentle">
                <WildflowerSVG
                  flowerId={wf.id}
                  height={wf.height}
                  curve={wf.curve}
                  colorType={wf.colorType}
                />
              </div>
            </motion.div>
          );
        })}
      </div>

      {/* Sombra suave y césped difuminado de suelo */}
      <div className="absolute bottom-0 left-0 right-0 h-10 sm:h-12 bg-gradient-to-t from-stone-950/70 via-stone-950/30 to-transparent pointer-events-none z-25" />
    </div>
  );
};
