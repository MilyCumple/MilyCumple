/**
 * ========================================================
 * MOTOR DE VUELO DE MARIPOSAS PLATEADAS (BUTTERFLIES.JS)
 * ========================================================
 * Gestiona el vuelo orgánico en 3D de mariposas plateadas
 * sobre la página, con aleteo, inclinación dinámica de giro
 * y estela de partículas de brillo plateado.
 */

class SilverButterflySystem {
  constructor() {
    this.container = document.getElementById('butterflies-container');
    if (!this.container) {
      this.container = document.createElement('div');
      this.container.id = 'butterflies-container';
      document.body.appendChild(this.container);
    }

    this.butterflies = [];
    this.width = window.innerWidth;
    this.height = window.innerHeight;
    this.sparkleTimer = 0;

    // SVG del ala plateada con filigrana y degradado plateado
    this.wingSvgLeft = `
      <svg viewBox="0 0 50 70" fill="none" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <linearGradient id="silverWingGrad" x1="100%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stop-color="#ffffff" stop-opacity="0.95"/>
            <stop offset="30%" stop-color="#e2e8f0" stop-opacity="0.85"/>
            <stop offset="70%" stop-color="#cbd5e1" stop-opacity="0.7"/>
            <stop offset="100%" stop-color="#94a3b8" stop-opacity="0.55"/>
          </linearGradient>
          <linearGradient id="silverGlint" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stop-color="#ffffff"/>
            <stop offset="50%" stop-color="#e0e7ff"/>
            <stop offset="100%" stop-color="#a5b4fc"/>
          </linearGradient>
        </defs>
        <!-- Ala superior -->
        <path d="M48 35 C42 15, 30 2, 8 6 C-4 9, 2 30, 20 40 C35 48, 45 42, 48 35 Z" fill="url(#silverWingGrad)" stroke="url(#silverGlint)" stroke-width="1"/>
        <!-- Ala inferior -->
        <path d="M46 36 C38 46, 26 68, 12 64 C2 60, 10 46, 26 40 C38 36, 44 35, 46 36 Z" fill="url(#silverWingGrad)" stroke="url(#silverGlint)" stroke-width="1" opacity="0.9"/>
        <!-- Venas / Filigrana interna -->
        <path d="M46 35 C32 28, 22 18, 14 12" stroke="#ffffff" stroke-width="0.8" opacity="0.7" fill="none"/>
        <path d="M46 35 C30 35, 18 30, 8 24" stroke="#ffffff" stroke-width="0.8" opacity="0.6" fill="none"/>
        <path d="M46 36 C34 46, 24 54, 16 58" stroke="#ffffff" stroke-width="0.8" opacity="0.6" fill="none"/>
        <circle cx="16" cy="18" r="1.5" fill="#ffffff" opacity="0.9"/>
        <circle cx="28" cy="24" r="1.5" fill="#ffffff" opacity="0.9"/>
        <circle cx="22" cy="50" r="1.2" fill="#ffffff" opacity="0.9"/>
      </svg>
    `;

    this.wingSvgRight = `
      <svg viewBox="0 0 50 70" fill="none" xmlns="http://www.w3.org/2000/svg" style="transform: scaleX(-1);">
        <defs>
          <linearGradient id="silverWingGradR" x1="100%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stop-color="#ffffff" stop-opacity="0.95"/>
            <stop offset="30%" stop-color="#e2e8f0" stop-opacity="0.85"/>
            <stop offset="70%" stop-color="#cbd5e1" stop-opacity="0.7"/>
            <stop offset="100%" stop-color="#94a3b8" stop-opacity="0.55"/>
          </linearGradient>
          <linearGradient id="silverGlintR" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stop-color="#ffffff"/>
            <stop offset="50%" stop-color="#e0e7ff"/>
            <stop offset="100%" stop-color="#a5b4fc"/>
          </linearGradient>
        </defs>
        <path d="M48 35 C42 15, 30 2, 8 6 C-4 9, 2 30, 20 40 C35 48, 45 42, 48 35 Z" fill="url(#silverWingGradR)" stroke="url(#silverGlintR)" stroke-width="1"/>
        <path d="M46 36 C38 46, 26 68, 12 64 C2 60, 10 46, 26 40 C38 36, 44 35, 46 36 Z" fill="url(#silverWingGradR)" stroke="url(#silverGlintR)" stroke-width="1" opacity="0.9"/>
        <path d="M46 35 C32 28, 22 18, 14 12" stroke="#ffffff" stroke-width="0.8" opacity="0.7" fill="none"/>
        <path d="M46 35 C30 35, 18 30, 8 24" stroke="#ffffff" stroke-width="0.8" opacity="0.6" fill="none"/>
        <path d="M46 36 C34 46, 24 54, 16 58" stroke="#ffffff" stroke-width="0.8" opacity="0.6" fill="none"/>
        <circle cx="16" cy="18" r="1.5" fill="#ffffff" opacity="0.9"/>
        <circle cx="28" cy="24" r="1.5" fill="#ffffff" opacity="0.9"/>
        <circle cx="22" cy="50" r="1.2" fill="#ffffff" opacity="0.9"/>
      </svg>
    `;

    this.init();
  }

  init() {
    window.addEventListener('resize', () => {
      this.width = window.innerWidth;
      this.height = window.innerHeight;
    }, { passive: true });

    // Cantidad adaptativa: 3 en móviles, 5 en escritorios
    const butterflyCount = this.width < 640 ? 3 : 5;

    for (let i = 0; i < butterflyCount; i++) {
      this.createButterfly(i);
    }

    this.animate();
  }

  createButterfly(index) {
    const el = document.createElement('div');
    el.className = 'silver-butterfly';

    const flutterSpeed = (0.26 + Math.random() * 0.12).toFixed(2);

    el.innerHTML = `
      <div class="butterfly-body-wrapper">
        <div class="butterfly-wing butterfly-wing-left" style="animation-duration: ${flutterSpeed}s;">
          ${this.wingSvgLeft}
        </div>
        <div class="butterfly-torso"></div>
        <div class="butterfly-wing butterfly-wing-right" style="animation-duration: ${flutterSpeed}s;">
          ${this.wingSvgRight}
        </div>
      </div>
    `;

    this.container.appendChild(el);

    // Estado inicial de la mariposa
    const butterfly = {
      el: el,
      x: Math.random() * this.width,
      // Se distribuyen en la parte superior y media de la pantalla
      y: Math.random() * (this.height * 0.65),
      targetX: Math.random() * this.width,
      targetY: Math.random() * (this.height * 0.65),
      speed: 1.2 + Math.random() * 1.4,
      scale: 0.75 + Math.random() * 0.45,
      angle: Math.random() * Math.PI * 2,
      wobblePhase: Math.random() * Math.PI * 2,
      wobbleSpeed: 0.04 + Math.random() * 0.03,
      wobbleAmp: 1.5 + Math.random() * 2.0,
      sparkleCooldown: Math.floor(Math.random() * 20),
      bankAngle: 0
    };

    this.butterflies.push(butterfly);
  }

  animate() {
    requestAnimationFrame(() => this.animate());

    if (document.hidden) return;

    this.sparkleTimer++;

    for (let i = 0; i < this.butterflies.length; i++) {
      const b = this.butterflies[i];

      // Calcular vector hacia el objetivo
      const dx = b.targetX - b.x;
      const dy = b.targetY - b.y;
      const dist = Math.hypot(dx, dy);

      // Si está cerca del objetivo o al azar, asignar nuevo destino
      if (dist < 50 || Math.random() < 0.005) {
        // Vuelan preferentemente por la zona superior y flotan por la pantalla
        b.targetX = Math.random() * (this.width + 100) - 50;
        b.targetY = Math.random() * (this.height * 0.75) + 20;
        b.speed = 1.2 + Math.random() * 1.5;
      }

      // Suavizar giro hacia el objetivo
      const desiredAngle = Math.atan2(dy, dx);
      let angleDiff = desiredAngle - b.angle;

      // Normalizar diferencia de ángulo
      while (angleDiff < -Math.PI) angleDiff += Math.PI * 2;
      while (angleDiff > Math.PI) angleDiff -= Math.PI * 2;

      b.angle += angleDiff * 0.04;

      // Inclinación 3D en giros (banking)
      const targetBank = angleDiff * 35;
      b.bankAngle += (targetBank - b.bankAngle) * 0.1;

      // Ondulación natural senoidal (aleteo vertical)
      b.wobblePhase += b.wobbleSpeed;
      const wobble = Math.sin(b.wobblePhase) * b.wobbleAmp;

      // Movimiento
      b.x += Math.cos(b.angle) * b.speed;
      b.y += Math.sin(b.angle) * b.speed + wobble * 0.35;

      // Reubicar suavemente si sale de los márgenes
      if (b.x < -80) b.x = this.width + 50;
      if (b.x > this.width + 80) b.x = -50;
      if (b.y < -50) b.y = this.height * 0.7;
      if (b.y > this.height * 0.85) b.y = 20;

      // Aplicar transformación 3D
      // Rotación visual: compensamos porque el SVG de la mariposa apunta hacia arriba (-90deg)
      const deg = (b.angle * 180 / Math.PI) + 90;
      b.el.style.transform = `translate3d(${b.x}px, ${b.y}px, 0) scale(${b.scale}) rotateZ(${deg}deg) rotateY(${b.bankAngle}deg)`;

      // Desprender ocasionalmente partículas plateadas de estela
      b.sparkleCooldown--;
      if (b.sparkleCooldown <= 0) {
        this.spawnTrailSparkle(b.x + 20, b.y + 20);
        b.sparkleCooldown = 15 + Math.floor(Math.random() * 25);
      }
    }
  }

  spawnTrailSparkle(x, y) {
    const sparkle = document.createElement('div');
    sparkle.className = 'silver-trail-sparkle';

    const size = Math.random() * 5 + 3;
    const dx = (Math.random() - 0.5) * 24;
    const dy = (Math.random() - 0.5) * 24 + 10; // Cae suavemente

    sparkle.style.left = `${x}px`;
    sparkle.style.top = `${y}px`;
    sparkle.style.width = `${size}px`;
    sparkle.style.height = `${size}px`;
    sparkle.style.setProperty('--dx', `${dx}px`);
    sparkle.style.setProperty('--dy', `${dy}px`);

    this.container.appendChild(sparkle);

    setTimeout(() => {
      sparkle.remove();
    }, 850);
  }
}

// Inicializar cuando el DOM esté listo
document.addEventListener('DOMContentLoaded', () => {
  window.silverButterflies = new SilverButterflySystem();
});
