/**
 * ========================================================
 * CONTROLADOR DE LA CARTA / SOBRE DE INVITACIÓN
 * ========================================================
 * Maneja la animación interactiva de apertura del sobre:
 * 1. Rotación 3D de la solapa
 * 2. Ruptura del sello de cera con destello de partículas
 * 3. Extracción de la carta dorada
 * 4. Activación de la música de fondo
 * 5. Transición suave hacia la interfaz principal
 */

class EnvelopeController {
  constructor() {
    this.screen = document.getElementById('envelope-screen');
    this.envelope = document.getElementById('envelope');
    this.waxSeal = document.getElementById('wax-seal');
    this.openPrompt = document.getElementById('envelope-prompt');
    this.mainContent = document.getElementById('main-invitation');
    this.musicWidget = document.getElementById('floating-music-player');

    this.isOpen = false;
    this.init();
  }

  init() {
    if (!this.screen || !this.envelope) return;

    // Abrir al hacer clic en el sobre, el sello o el texto
    const triggerOpen = (e) => {
      e.preventDefault();
      e.stopPropagation();
      this.openEnvelope();
    };

    this.envelope.addEventListener('click', triggerOpen);
    if (this.waxSeal) this.waxSeal.addEventListener('click', triggerOpen);
    if (this.openPrompt) this.openPrompt.addEventListener('click', triggerOpen);
  }

  openEnvelope() {
    if (this.isOpen) return;
    this.isOpen = true;

    // 1. Reproducir sonido de campana/arpa del sobre
    if (window.musicPlayer) {
      window.musicPlayer.playEnvelopeSound();
    }

    // 2. Destello de partículas doradas alrededor del sello
    this.spawnSealSparkles();

    // 3. Activar clases de apertura en el DOM
    this.envelope.classList.add('opened');

    // 4. Iniciar música de fondo (cumpliendo política del navegador al ser evento de usuario)
    setTimeout(() => {
      if (window.musicPlayer && window.EVENT_CONFIG?.music?.autoplayOnOpen !== false) {
        window.musicPlayer.play();
      }
    }, 400);

    // 5. Transición hacia la invitación completa
    setTimeout(() => {
      if (this.screen) {
        this.screen.classList.add('fade-out');
      }

      if (this.mainContent) {
        this.mainContent.classList.add('visible');
      }

      if (this.musicWidget) {
        this.musicWidget.classList.add('visible');
      }

      // Después de la animación, ocultar el sobre del flujo de interacción
      setTimeout(() => {
        if (this.screen) {
          this.screen.style.display = 'none';
        }
        // Desencadenar animación de entrada de los elementos
        window.dispatchEvent(new Event('envelopeOpened'));
      }, 900);

    }, 1200);
  }

  spawnSealSparkles() {
    const sealRect = this.waxSeal ? this.waxSeal.getBoundingClientRect() : this.envelope.getBoundingClientRect();
    const centerX = sealRect.left + sealRect.width / 2;
    const centerY = sealRect.top + sealRect.height / 2;

    const container = document.body;
    for (let i = 0; i < 28; i++) {
      const sparkle = document.createElement('div');
      sparkle.className = 'seal-burst-particle';

      const angle = (Math.PI * 2 / 28) * i + (Math.random() - 0.5) * 0.4;
      const distance = Math.random() * 110 + 60;
      const tx = Math.cos(angle) * distance;
      const ty = Math.sin(angle) * distance;
      const size = Math.random() * 8 + 4;

      sparkle.style.left = `${centerX}px`;
      sparkle.style.top = `${centerY}px`;
      sparkle.style.width = `${size}px`;
      sparkle.style.height = `${size}px`;
      sparkle.style.setProperty('--tx', `${tx}px`);
      sparkle.style.setProperty('--ty', `${ty}px`);

      container.appendChild(sparkle);

      setTimeout(() => {
        sparkle.remove();
      }, 1000);
    }
  }
}

document.addEventListener('DOMContentLoaded', () => {
  window.envelopeInstance = new EnvelopeController();
});
