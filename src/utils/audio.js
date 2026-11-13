/**
 * Web Audio API Synthesizer
 * Crea una melodía ambiental procedural suave (estilo piano/arpa) y efectos
 * sonoros armónicos para las interacciones con los girasoles sin archivos externos.
 */

class RomanticAudioManager {
  constructor() {
    this.ctx = null;
    this.masterGain = null;
    this.ambientGain = null;
    this.isMuted = false;
    this.isPlayingAmbient = false;
    this.ambientTimer = null;
    this.currentStep = 0;

    // Frecuencias para la escala pentatónica cálida (Frecuencias en Hz)
    this.scale = [
      261.63, 293.66, 329.63, 392.00, 440.00,
      523.25, 587.33, 659.25, 783.99, 880.00
    ];

    // Acordes suaves arpegiados (progresión emocional estilo atardecer)
    // I (Cmaj9), vi (Am7), IV (Fmaj7), V (G6/9)
    this.chords = [
      [261.63, 329.63, 392.00, 493.88, 587.33], // Cmaj9
      [220.00, 261.63, 329.63, 392.00, 523.25], // Am7
      [174.61, 261.63, 329.63, 392.00, 440.00], // Fmaj7
      [196.00, 246.94, 293.66, 392.00, 440.00]  // G6
    ];
  }

  ensureContext() {
    if (!this.ctx) {
      const AudioCtx = window.AudioContext || window.webkitAudioContext;
      if (!AudioCtx) return false;
      this.ctx = new AudioCtx();

      // Master Gain
      this.masterGain = this.ctx.createGain();
      this.masterGain.gain.setValueAtTime(0.3, this.ctx.currentTime);
      this.masterGain.connect(this.ctx.destination);

      // Ambient Bus
      this.ambientGain = this.ctx.createGain();
      this.ambientGain.gain.setValueAtTime(0.22, this.ctx.currentTime);
      this.ambientGain.connect(this.masterGain);
    }

    if (this.ctx.state === 'suspended') {
      this.ctx.resume();
    }
    return true;
  }

  /**
   * Toca una nota individual con timbre de arpa/piano suave
   */
  playTone(freq, timeOffset = 0, duration = 2.5, gainVal = 0.18, destination = null) {
    if (!this.ctx || this.isMuted) return;

    const startTime = this.ctx.currentTime + timeOffset;
    const dest = destination || this.ambientGain || this.masterGain;

    // Oscilador principal (onda triangular cálida)
    const osc = this.ctx.createOscillator();
    osc.type = 'triangle';
    osc.frequency.setValueAtTime(freq, startTime);

    // Oscilador armónico sutil (seno puro para brillo suave)
    const harmonicOsc = this.ctx.createOscillator();
    harmonicOsc.type = 'sine';
    harmonicOsc.frequency.setValueAtTime(freq * 2, startTime);

    // Filtro pasa-bajas para suavizar agudos y darle calidez acústica
    const filter = this.ctx.createBiquadFilter();
    filter.type = 'lowpass';
    filter.frequency.setValueAtTime(1400, startTime);
    filter.frequency.exponentialRampToValueAtTime(350, startTime + duration);

    // Envolvente de volumen (ataque rápido, decaimiento suave)
    const noteGain = this.ctx.createGain();
    noteGain.gain.setValueAtTime(0.0001, startTime);
    noteGain.gain.linearRampToValueAtTime(gainVal, startTime + 0.04);
    noteGain.gain.exponentialRampToValueAtTime(0.0001, startTime + duration);

    const harmonicGain = this.ctx.createGain();
    harmonicGain.gain.setValueAtTime(0.0001, startTime);
    harmonicGain.gain.linearRampToValueAtTime(gainVal * 0.35, startTime + 0.02);
    harmonicGain.gain.exponentialRampToValueAtTime(0.0001, startTime + duration * 0.7);

    // Conexiones
    osc.connect(filter);
    filter.connect(noteGain);
    noteGain.connect(dest);

    harmonicOsc.connect(harmonicGain);
    harmonicGain.connect(dest);

    osc.start(startTime);
    osc.stop(startTime + duration + 0.1);
    harmonicOsc.start(startTime);
    harmonicOsc.stop(startTime + duration + 0.1);
  }

  /**
   * Inicia el bucle de melodía ambiental suave
   */
  startAmbientMusic() {
    if (!this.ensureContext()) return;
    if (this.isPlayingAmbient) return;
    this.isPlayingAmbient = true;

    let currentChordIndex = 0;

    const playNextBar = () => {
      if (!this.isPlayingAmbient || !this.ctx) return;

      const chord = this.chords[currentChordIndex % this.chords.length];
      currentChordIndex++;

      // Arpegio delicado de 4 notas separadas temporalmente
      const delays = [0, 0.45, 0.9, 1.45];
      const noteIndices = [0, 2, 3, 4];

      delays.forEach((delay, idx) => {
        const noteFreq = chord[noteIndices[idx] % chord.length];
        this.playTone(noteFreq, delay, 2.8, 0.16, this.ambientGain);
      });

      // Nota de bajo suave y profunda
      this.playTone(chord[0] / 2, 0, 3.5, 0.12, this.ambientGain);

      // Siguiente compás cada ~2.4 segundos
      this.ambientTimer = setTimeout(playNextBar, 2400);
    };

    playNextBar();
  }

  stopAmbientMusic() {
    this.isPlayingAmbient = false;
    if (this.ambientTimer) {
      clearTimeout(this.ambientTimer);
      this.ambientTimer = null;
    }
  }

  /**
   * Efecto especial al tocar un girasol: un acorde brillante de arpa/campana
   */
  playSunflowerChime(sunflowerIndex = 0) {
    if (!this.ensureContext() || this.isMuted) return;

    // Frecuencias base según el girasol (1 al 8)
    const basePitches = [
      [392.00, 523.25, 659.25, 783.99],  // G4, C5, E5, G5
      [440.00, 587.33, 659.25, 880.00],  // A4, D5, E5, A5
      [493.88, 659.25, 783.99, 987.77],  // B4, E5, G5, B5
      [523.25, 659.25, 783.99, 1046.50], // C5, E5, G5, C6
      [587.33, 698.46, 880.00, 1174.66], // D5, F5, A5, D6
      [659.25, 783.99, 987.77, 1318.51], // E5, G5, B5, E6
      [392.00, 493.88, 587.33, 783.99],  // G4, B4, D5, G5
      [440.00, 523.25, 659.25, 987.77]   // A4, C5, E5, B5
    ];

    const notes = basePitches[sunflowerIndex % basePitches.length];

    // Glissando ascendente rápido
    notes.forEach((freq, idx) => {
      const delay = idx * 0.08;
      this.playTone(freq, delay, 2.0, 0.22, this.masterGain);
    });
  }

  toggleMute() {
    this.isMuted = !this.isMuted;
    if (this.masterGain && this.ctx) {
      const targetGain = this.isMuted ? 0 : 0.3;
      this.masterGain.gain.setValueAtTime(this.masterGain.gain.value, this.ctx.currentTime);
      this.masterGain.gain.linearRampToValueAtTime(targetGain, this.ctx.currentTime + 0.1);
    }
    return this.isMuted;
  }
}

export const audioManager = new RomanticAudioManager();
