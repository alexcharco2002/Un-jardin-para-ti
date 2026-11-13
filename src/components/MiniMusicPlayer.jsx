import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Play, Pause, Volume2, VolumeX } from 'lucide-react';
import { musicPlayer } from '../utils/audioPlayer';

/**
 * MiniMusicPlayer
 * Controlador de música responsivo:
 * - Diseño compacto en móvil para no obstruir botones ni contenido
 * - Vinilo giratorio con animación continua
 * - Play / Pause y Mute
 */
export const MiniMusicPlayer = () => {
  const [playerState, setPlayerState] = useState({
    isPlaying: false,
    isMuted: false,
    duration: 0,
    currentTime: 0,
    songTitle: "State Lines",
    artist: "Novo Amor",
    usingFallbackSynth: false,
  });

  useEffect(() => {
    const unsubscribe = musicPlayer.subscribe((state) => {
      setPlayerState({ ...state });
    });
    return unsubscribe;
  }, []);

  return (
    <motion.div
      initial={{ y: 30, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5, ease: 'easeOut' }}
      className="fixed bottom-3 right-2.5 sm:bottom-4 sm:right-5 z-40 glass-pill pl-2 pr-2.5 sm:pl-2.5 sm:pr-3 py-1.5 sm:py-2 rounded-2xl shadow-xl border border-amber-300/50 dark:border-amber-600/40 flex items-center gap-2 sm:gap-2.5 max-w-[210px] sm:max-w-xs select-none backdrop-blur-md"
      onClick={(e) => e.stopPropagation()}
    >
      {/* Disco vinilo giratorio */}
      <div className="relative flex-shrink-0 cursor-pointer" onClick={() => musicPlayer.togglePlay()}>
        <motion.div
          animate={playerState.isPlaying ? { rotate: 360 } : { rotate: 0 }}
          transition={{ repeat: Infinity, duration: 5, ease: "linear" }}
          className="w-7 h-7 sm:w-9 sm:h-9 rounded-full bg-gradient-to-tr from-amber-800 via-stone-900 to-amber-950 flex items-center justify-center p-0.5 shadow-md shadow-stone-950/30"
        >
          <div className="w-full h-full rounded-full border border-amber-400/40 flex items-center justify-center">
            <div className="w-2.5 h-2.5 sm:w-3 sm:h-3 rounded-full bg-amber-400 flex items-center justify-center">
              <div className="w-1 h-1 sm:w-1.5 sm:h-1.5 rounded-full bg-[#451A03]" />
            </div>
          </div>
        </motion.div>
        {playerState.isPlaying && (
          <span className="absolute -top-1 -right-1 w-2 h-2 rounded-full bg-amber-400 animate-ping" />
        )}
      </div>

      {/* Info canción */}
      <div className="flex-1 min-w-0 pr-0.5">
        <p className="text-[11px] sm:text-xs font-semibold text-garden-title dark:text-garden-darkTitle truncate leading-tight">
          {playerState.songTitle}
        </p>
        <p className="text-[9px] sm:text-[10px] text-amber-800/80 dark:text-amber-300/80 truncate">
          {playerState.artist}
        </p>
      </div>

      {/* Botones de acción */}
      <div className="flex items-center gap-0.5 sm:gap-1 flex-shrink-0">
        {/* Play / Pausa */}
        <button
          onClick={() => musicPlayer.togglePlay()}
          className="w-6 h-6 sm:w-7 sm:h-7 rounded-full bg-gradient-to-tr from-amber-500 to-amber-600 text-white flex items-center justify-center hover:scale-105 active:scale-95 shadow-sm transition-all"
          aria-label={playerState.isPlaying ? "Pausar música" : "Reproducir música"}
        >
          {playerState.isPlaying ? (
            <Pause className="w-3 h-3 sm:w-3.5 sm:h-3.5 fill-white" />
          ) : (
            <Play className="w-3 h-3 sm:w-3.5 sm:h-3.5 fill-white translate-x-0.5" />
          )}
        </button>

        {/* Silenciar */}
        <button
          onClick={() => musicPlayer.toggleMute()}
          className="w-6 h-6 sm:w-7 sm:h-7 rounded-full text-stone-600 dark:text-stone-300 hover:text-amber-700 dark:hover:text-amber-300 hover:bg-amber-100/50 dark:hover:bg-stone-800 flex items-center justify-center active:scale-95 transition-all"
          aria-label={playerState.isMuted ? "Activar sonido" : "Silenciar"}
        >
          {playerState.isMuted ? (
            <VolumeX className="w-3 h-3 sm:w-3.5 sm:h-3.5 text-stone-400" />
          ) : (
            <Volume2 className="w-3 h-3 sm:w-3.5 sm:h-3.5 text-amber-700 dark:text-amber-400" />
          )}
        </button>
      </div>
    </motion.div>
  );
};
