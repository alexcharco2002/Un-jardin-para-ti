/**
 * Audio Player con soporte para archivos locales (Novo Amor - State Lines)
 * y sintetizador ambiental Web Audio como respaldo automático.
 */
import { audioManager } from './audio';

class MusicPlayerManager {
  constructor() {
    this.audioElement = null;
    this.isPlaying = false;
    this.isMuted = false;
    this.duration = 0;
    this.currentTime = 0;
    this.songTitle = "State Lines";
    this.artist = "Novo Amor";
    this.listeners = new Set();
    this.usingFallbackSynth = false;

    // Rutas de audio potenciales. Se incluye 'state lines.mpeg' que es el archivo detectado.
    this.audioSources = [
      '/music/state lines.mpeg',
      '/music/state%20lines.mpeg',
      '/music/state-lines.mp3',
      '/music/state lines.mp3',
      '/music/State Lines.mp3',
      '/music/novo-amor.mp3',
      '/music/music.mp3',
    ];
    this.currentSourceIndex = 0;
  }

  subscribe(callback) {
    this.listeners.add(callback);
    return () => this.listeners.delete(callback);
  }

  notify() {
    this.listeners.forEach((callback) =>
      callback({
        isPlaying: this.isPlaying,
        isMuted: this.isMuted,
        duration: this.duration,
        currentTime: this.currentTime,
        songTitle: this.songTitle,
        artist: this.artist,
        usingFallbackSynth: this.usingFallbackSynth,
      })
    );
  }

  init() {
    if (this.audioElement) return;

    this.audioElement = new Audio();
    this.audioElement.preload = 'auto';
    this.audioElement.loop = true;
    this.audioElement.src = this.audioSources[this.currentSourceIndex];

    this.audioElement.addEventListener('timeupdate', () => {
      this.currentTime = this.audioElement.currentTime;
      this.notify();
    });

    this.audioElement.addEventListener('loadedmetadata', () => {
      this.duration = this.audioElement.duration || 0;
      this.notify();
    });

    this.audioElement.addEventListener('canplay', () => {
      // El audio está listo y decodificado
      this.notify();
    });

    this.audioElement.addEventListener('play', () => {
      this.isPlaying = true;
      this.usingFallbackSynth = false;
      this.notify();
    });

    this.audioElement.addEventListener('pause', () => {
      this.isPlaying = false;
      this.notify();
    });

    this.audioElement.addEventListener('error', () => {
      if (this.currentSourceIndex < this.audioSources.length - 1) {
        this.currentSourceIndex++;
        this.audioElement.src = this.audioSources[this.currentSourceIndex];
        if (this.isPlaying) {
          this.audioElement.play().catch(() => this.fallbackToSynth());
        }
      } else {
        this.fallbackToSynth();
      }
    });
  }

  fallbackToSynth() {
    this.usingFallbackSynth = true;
    this.isPlaying = true;
    audioManager.startAmbientMusic();
    this.notify();
  }

  play() {
    this.init();
    if (!this.usingFallbackSynth && this.audioElement) {
      const playPromise = this.audioElement.play();
      if (playPromise !== undefined) {
        playPromise
          .then(() => {
            this.isPlaying = true;
            this.notify();
          })
          .catch(() => {
            this.fallbackToSynth();
          });
      }
    } else {
      this.isPlaying = true;
      audioManager.startAmbientMusic();
      this.notify();
    }
  }

  pause() {
    if (this.audioElement) {
      this.audioElement.pause();
    }
    if (this.usingFallbackSynth) {
      audioManager.stopAmbientMusic();
    }
    this.isPlaying = false;
    this.notify();
  }

  togglePlay() {
    if (this.isPlaying) {
      this.pause();
    } else {
      this.play();
    }
  }

  toggleMute() {
    this.isMuted = !this.isMuted;
    if (this.audioElement) {
      this.audioElement.muted = this.isMuted;
    }
    audioManager.toggleMute();
    this.notify();
    return this.isMuted;
  }

  seek(seconds) {
    if (this.audioElement && this.duration) {
      this.audioElement.currentTime = seconds;
      this.currentTime = seconds;
      this.notify();
    }
  }
}

export const musicPlayer = new MusicPlayerManager();
