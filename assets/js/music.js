/**
 * ========================================================
 * CONTROLADOR DE MÚSICA Y EFECTOS DE SONIDO
 * ========================================================
 * Maneja la reproducción de la canción de fondo,
 * el efecto de apertura del sobre y el botón flotante
 * de control (Play/Pausa) con animación de vinilo/ondas.
 */

class MusicPlayer {
  constructor() {
    this.audio = null;
    this.envelopeAudio = null;
    this.isPlaying = false;
    this.hasStarted = false;

    this.musicButton = document.getElementById('music-toggle-btn');
    this.musicStatusText = document.getElementById('music-status-text');
    this.soundWave = document.getElementById('sound-wave');
    this.vinylIcon = document.getElementById('vinyl-disc');

    this.init();
  }

  init() {
    const config = window.EVENT_CONFIG?.music || {
      audioSrc: 'assets/audio/tema.mp3',
      envelopeSound: 'assets/audio/tema.mp3',
      autoplayOnOpen: true
    };

    // Audio principal de fondo
    this.audio = new Audio(config.audioSrc);
    this.audio.loop = true;
    this.audio.volume = 0.6;
    this.audio.preload = 'auto';

    // Audio del sobre
    if (config.envelopeSound) {
      this.envelopeAudio = new Audio(config.envelopeSound);
      this.envelopeAudio.volume = 0.8;
      this.envelopeAudio.preload = 'auto';
    }

    // Eventos del botón flotante
    if (this.musicButton) {
      this.musicButton.addEventListener('click', (e) => {
        e.stopPropagation();
        this.toggle();
      });
    }

    // Actualizar estado si el audio termina o se pausa
    this.audio.addEventListener('play', () => this.updateUI(true));
    this.audio.addEventListener('pause', () => this.updateUI(false));
    this.audio.addEventListener('error', (err) => {
      console.warn("No se pudo cargar el audio especificado:", err);
    });
  }

  playEnvelopeSound() {
    if (this.envelopeAudio) {
      try {
        this.envelopeAudio.currentTime = 0;
        this.envelopeAudio.play().catch(e => console.log("Nota sobre audio:", e));
      } catch (e) {
        // Ignorar si el navegador bloquea
      }
    }
  }

  play() {
    if (!this.audio) return;
    this.audio.play().then(() => {
      this.isPlaying = true;
      this.hasStarted = true;
      this.updateUI(true);
    }).catch((err) => {
      console.log("Autoplay esperando interacción del usuario:", err);
      this.isPlaying = false;
      this.updateUI(false);
    });
  }

  pause() {
    if (!this.audio) return;
    this.audio.pause();
    this.isPlaying = false;
    this.updateUI(false);
  }

  toggle() {
    if (this.isPlaying) {
      this.pause();
    } else {
      this.play();
    }
  }

  updateUI(playing) {
    this.isPlaying = playing;
    if (this.musicButton) {
      if (playing) {
        this.musicButton.classList.add('playing');
        this.musicButton.setAttribute('aria-label', 'Pausar música');
        this.musicButton.setAttribute('title', 'Pausar música');
      } else {
        this.musicButton.classList.remove('playing');
        this.musicButton.setAttribute('aria-label', 'Reproducir música');
        this.musicButton.setAttribute('title', 'Reproducir música');
      }
    }

    if (this.musicStatusText) {
      this.musicStatusText.textContent = playing ? 'Música activada' : 'Música en pausa';
    }

    if (this.vinylIcon) {
      if (playing) {
        this.vinylIcon.classList.add('spinning');
      } else {
        this.vinylIcon.classList.remove('spinning');
      }
    }

    if (this.soundWave) {
      this.soundWave.classList.toggle('active', playing);
    }
  }
}

// Inicializar cuando el DOM esté listo
document.addEventListener('DOMContentLoaded', () => {
  window.musicPlayer = new MusicPlayer();
});
