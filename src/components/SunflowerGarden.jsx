import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { SunflowerSVG } from './SunflowerSVG';
import { WildflowerSVG } from './WildflowerSVG';
import { Sparkles } from 'lucide-react';
import { audioManager } from '../utils/audio';

/**
 * SunflowerGarden
 * Auténtico jardín botánico multicapa:
 * - 16 girasoles (pequeños de fondo, medianos en plano medio y majestuosos en primer plano)
 * - Manto de florecillas silvestres / margaritas campestres en la base
 * - Balanceo orgánico continuo con la brisa
 * - Interacción táctil con sonidos armónicos y apertura del mensaje
 */
export const SunflowerGarden = ({ onSelectSunflower, bloomKey = 0 }) => {
  const [bouncingId, setBouncingId] = useState(null);

  // 16 girasoles en 3 planos de profundidad (fondo, medio y frente)
  const sunflowerConfigs = [
    // FONDO (Pequeños, dan profundidad de campo y perspectiva de pradera)
    { id: 1, name: "Flor 1", stemHeight: 285, stemCurve: -14, headAngle: -7, scale: 0.68, zIndex: 4, bottomOffset: '-5px', leftPercent: '2%', swayClass: 'animate-sway-left', bloomDelay: 0.05 },
    { id: 2, name: "Flor 2", stemHeight: 305, stemCurve: 8, headAngle: 5, scale: 0.72, zIndex: 5, bottomOffset: '-6px', leftPercent: '13%', swayClass: 'animate-sway-gentle', bloomDelay: 0.12 },
    { id: 3, name: "Flor 3", stemHeight: 275, stemCurve: -6, headAngle: -4, scale: 0.65, zIndex: 4, bottomOffset: '-4px', leftPercent: '27%', swayClass: 'animate-sway-right', bloomDelay: 0.18 },
    { id: 4, name: "Flor 4", stemHeight: 315, stemCurve: 10, headAngle: 6, scale: 0.74, zIndex: 6, bottomOffset: '-7px', leftPercent: '38%', swayClass: 'animate-sway-left', bloomDelay: 0.22 },
    { id: 5, name: "Flor 5", stemHeight: 295, stemCurve: -9, headAngle: -5, scale: 0.70, zIndex: 5, bottomOffset: '-5px', leftPercent: '51%', swayClass: 'animate-sway-gentle', bloomDelay: 0.28 },
    { id: 6, name: "Flor 6", stemHeight: 310, stemCurve: 7, headAngle: 4, scale: 0.73, zIndex: 6, bottomOffset: '-6px', leftPercent: '64%', swayClass: 'animate-sway-right', bloomDelay: 0.15 },
    { id: 7, name: "Flor 7", stemHeight: 280, stemCurve: -8, headAngle: -6, scale: 0.66, zIndex: 4, bottomOffset: '-4px', leftPercent: '77%', swayClass: 'animate-sway-left', bloomDelay: 0.1 },
    { id: 8, name: "Flor 8", stemHeight: 290, stemCurve: 12, headAngle: 8, scale: 0.69, zIndex: 5, bottomOffset: '-5px', leftPercent: '97%', swayClass: 'animate-sway-gentle', bloomDelay: 0.08 },

    // PLANO MEDIO (Medianos, cuerpo frondoso del jardín)
    { id: 9, name: "Flor 9", stemHeight: 370, stemCurve: -12, headAngle: -4, scale: 0.92, zIndex: 9, bottomOffset: '-18px', leftPercent: '7%', swayClass: 'animate-sway-gentle', bloomDelay: 0.32 },
    { id: 10, name: "Flor 10", stemHeight: 385, stemCurve: 9, headAngle: 5, scale: 0.96, zIndex: 10, bottomOffset: '-20px', leftPercent: '32%', swayClass: 'animate-sway-right', bloomDelay: 0.38 },
    { id: 11, name: "Flor 11", stemHeight: 365, stemCurve: -6, headAngle: -3, scale: 0.90, zIndex: 9, bottomOffset: '-16px', leftPercent: '46%', swayClass: 'animate-sway-left', bloomDelay: 0.42 },
    { id: 12, name: "Flor 12", stemHeight: 380, stemCurve: 8, headAngle: 4, scale: 0.94, zIndex: 10, bottomOffset: '-19px', leftPercent: '70%', swayClass: 'animate-sway-gentle', bloomDelay: 0.35 },
    { id: 13, name: "Flor 13", stemHeight: 360, stemCurve: -10, headAngle: -5, scale: 0.88, zIndex: 9, bottomOffset: '-16px', leftPercent: '88%', swayClass: 'animate-sway-right', bloomDelay: 0.25 },

    // PRIMER PLANO (Grandes y majestuosos protagonistas)
    { id: 14, name: "Flor 14", stemHeight: 415, stemCurve: -9, headAngle: -3, scale: 1.08, zIndex: 14, bottomOffset: '-28px', leftPercent: '20%', swayClass: 'animate-sway-gentle', bloomDelay: 0.45 },
    { id: 15, name: "Flor 15", stemHeight: 455, stemCurve: 7, headAngle: 2, scale: 1.22, zIndex: 18, bottomOffset: '-38px', leftPercent: '58%', swayClass: 'animate-sway-right', bloomDelay: 0.55 },
    { id: 16, name: "Flor 16", stemHeight: 425, stemCurve: 11, headAngle: 5, scale: 1.12, zIndex: 15, bottomOffset: '-30px', leftPercent: '80%', swayClass: 'animate-sway-left', bloomDelay: 0.48 },
  ];

  // Florecillas silvestres campestres en la base
  const wildflowerConfigs = [
    { id: 'wf1', leftPercent: '5%', height: 115, curve: -6, scale: 0.85, zIndex: 20, delay: 0.6, colorType: 'cream' },
    { id: 'wf2', leftPercent: '16%', height: 130, curve: 7, scale: 0.90, zIndex: 21, delay: 0.72, colorType: 'yellow' },
    { id: 'wf3', leftPercent: '27%', height: 105, curve: -5, scale: 0.78, zIndex: 19, delay: 0.65, colorType: 'cream' },
    { id: 'wf4', leftPercent: '40%', height: 135, curve: 6, scale: 0.92, zIndex: 22, delay: 0.82, colorType: 'yellow' },
    { id: 'wf5', leftPercent: '52%', height: 120, curve: -4, scale: 0.84, zIndex: 20, delay: 0.7, colorType: 'cream' },
    { id: 'wf6', leftPercent: '65%', height: 128, curve: 8, scale: 0.86, zIndex: 21, delay: 0.78, colorType: 'cream' },
    { id: 'wf7', leftPercent: '76%', height: 112, curve: -6, scale: 0.80, zIndex: 20, delay: 0.74, colorType: 'yellow' },
    { id: 'wf8', leftPercent: '91%', height: 132, curve: 5, scale: 0.88, zIndex: 22, delay: 0.68, colorType: 'cream' },
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
    <div className="relative w-full h-[470px] sm:h-[530px] max-w-5xl mx-auto overflow-visible select-none flex items-end justify-center px-2">
      {/* Indicador sutil de interacción */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.4, duration: 0.8 }}
        className="absolute top-2 left-1/2 -translate-x-1/2 z-30 flex items-center gap-1.5 px-3.5 py-1.5 rounded-full glass-pill text-xs font-medium text-amber-900 dark:text-amber-200 shadow-sm whitespace-nowrap"
      >
        <Sparkles className="w-3.5 h-3.5 text-amber-500 animate-pulse flex-shrink-0" />
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
                y: isBouncing ? -14 : 0,
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
              className="absolute -translate-x-1/2 cursor-pointer touch-manipulation group"
              onClick={(e) => handleFlowerTap(cfg.id, idx, e)}
            >
              {/* Contenedor del balanceo continuo suave con la brisa */}
              <div
                className={`w-[125px] sm:w-[155px] h-[370px] sm:h-[440px] origin-stem-base ${cfg.swayClass}`}
              >
                {/* Aura de pulso cálida al interactuar */}
                <div className="absolute top-8 left-1/2 -translate-x-1/2 w-24 h-24 rounded-full bg-amber-400/15 filter blur-lg pointer-events-none group-hover:bg-amber-400/35 transition-all" />

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
              className="absolute -translate-x-1/2 cursor-pointer touch-manipulation group"
              onClick={(e) => handleFlowerTap(wf.id, idx + 10, e)}
            >
              <div className="w-[50px] sm:w-[65px] h-[120px] sm:h-[145px] origin-stem-base animate-sway-gentle">
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
      <div className="absolute bottom-0 left-0 right-0 h-12 bg-gradient-to-t from-amber-950/15 via-emerald-950/10 to-transparent pointer-events-none z-25" />
    </div>
  );
};
