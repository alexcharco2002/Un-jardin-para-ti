import React from 'react';
import { RotateCcw, Sparkles, Sun, Moon } from 'lucide-react';

/**
 * FloatingControls
 * Controles discretos en la parte superior derecha:
 * - Alternar modo Claro / Oscuro (Sol / Luna)
 * - Botón para abrir el mensaje especial
 * - Reiniciar florecimiento de los girasoles
 */
export const FloatingControls = ({ isDarkMode, onToggleTheme, onRebloom, onOpenMessage, onOpenNextMessage }) => {
  const handleOpen = onOpenMessage || onOpenNextMessage;

  return (
    <div className="fixed top-4 right-3 sm:right-5 z-40 flex items-center gap-2">
      {/* Botón Modo Claro / Oscuro */}
      <button
        onClick={onToggleTheme}
        title={isDarkMode ? "Cambiar a Modo Claro (Día de Sol)" : "Cambiar a Modo Oscuro (Noche Estrellada)"}
        aria-label={isDarkMode ? "Cambiar a Modo Claro" : "Cambiar a Modo Oscuro"}
        className="glass-pill p-2.5 rounded-full text-stone-700 dark:text-amber-200 hover:text-amber-700 dark:hover:text-amber-400 hover:bg-white dark:hover:bg-stone-800 active:scale-95 transition-all shadow-sm"
      >
        {isDarkMode ? (
          <Sun className="w-4 h-4 text-amber-400 animate-spin" style={{ animationDuration: '12s' }} />
        ) : (
          <Moon className="w-4 h-4 text-stone-600" />
        )}
      </button>

      {/* Botón para abrir el mensaje especial */}
      {handleOpen && (
        <button
          onClick={handleOpen}
          title="Ver mensaje especial"
          aria-label="Ver mensaje especial"
          className="glass-pill px-3 py-2 rounded-full text-stone-700 dark:text-amber-200 hover:text-amber-800 hover:bg-white dark:hover:bg-stone-800 active:scale-95 transition-all shadow-sm flex items-center gap-1.5 text-xs font-medium"
        >
          <Sparkles className="w-3.5 h-3.5 text-amber-500 animate-pulse" />
          <span className="hidden sm:inline">Ver mensaje</span>
        </button>
      )}

      {/* Botón de Re-florecer */}
      <button
        onClick={onRebloom}
        title="Volver a florecer el jardín"
        aria-label="Volver a florecer el jardín"
        className="glass-pill p-2.5 rounded-full text-stone-700 dark:text-amber-200 hover:text-amber-700 hover:bg-white dark:hover:bg-stone-800 active:scale-95 transition-all shadow-sm"
      >
        <RotateCcw className="w-4 h-4 text-amber-600 dark:text-amber-400" />
      </button>
    </div>
  );
};
