/**
 * ========================================================
 * SISTEMA DE ESTRELLAS Y CONSTELACIONES INTERACTIVAS
 * ========================================================
 * Simula un cielo nocturno mágico con:
 * - Estrellas que aparecen y desaparecen (parpadeo senoidal)
 * - Estrellas y polvo estelar que flotan y se mueven en ondas
 * - Estrellas fugaces (meteoros) dorados y blancos
 * - Destellos de 4 puntas de alto brillo
 * - Interacción suave con mouse y toque en móviles
 */

class StarrySky {
  constructor(canvasId) {
    this.canvas = document.getElementById(canvasId);
    if (!this.canvas) return;
    this.ctx = this.canvas.getContext('2d');

    this.stars = [];
    this.driftingParticles = [];
    this.shootingStars = [];
    this.cursorStars = [];
    
    this.width = 0;
    this.height = 0;
    this.dpr = Math.min(window.devicePixelRatio || 1, 2);

    this.lastShootingStarTime = Date.now();
    this.shootingStarInterval = 2500 + Math.random() * 2000;

    this.mouse = { x: -1000, y: -1000, active: false };

    this.init();
  }

  init() {
    this.resize();
    window.addEventListener('resize', () => this.resize(), { passive: true });

    // Interacción táctil y mouse
    const addInteraction = (x, y) => {
      this.mouse.x = x;
      this.mouse.y = y;
      this.mouse.active = true;
      if (Math.random() < 0.4) {
        this.addCursorStar(x, y);
      }
    };

    window.addEventListener('mousemove', (e) => addInteraction(e.clientX, e.clientY), { passive: true });
    window.addEventListener('touchmove', (e) => {
      if (e.touches.length > 0) {
        addInteraction(e.touches[0].clientX, e.touches[0].clientY);
      }
    }, { passive: true });

    this.createStars();
    this.createDriftingParticles();
    this.animate();
  }

  resize() {
    this.width = window.innerWidth;
    this.height = window.innerHeight;

    this.canvas.width = this.width * this.dpr;
    this.canvas.height = this.height * this.dpr;
    this.canvas.style.width = `${this.width}px`;
    this.canvas.style.height = `${this.height}px`;

    this.ctx.scale(this.dpr, this.dpr);

    if (this.stars.length === 0) {
      this.createStars();
      this.createDriftingParticles();
    }
  }

  createStars() {
    this.stars = [];
    // Cantidad adaptativa según resolución
    const count = Math.floor((this.width * this.height) / 4500);
    const starCount = Math.min(Math.max(count, 120), 320);

    for (let i = 0; i < starCount; i++) {
      const isSilver = Math.random() < 0.35;
      const isSparkle = Math.random() < 0.15;
      this.stars.push({
        x: Math.random() * this.width,
        y: Math.random() * this.height,
        size: Math.random() * 1.8 + 0.6,
        baseAlpha: Math.random() * 0.4 + 0.2,
        amplitude: Math.random() * 0.4 + 0.3,
        frequency: Math.random() * 0.003 + 0.0015,
        phase: Math.random() * Math.PI * 2,
        color: isSilver ? '#cbd5e1' : '#ffffff',
        isSparkle: isSparkle,
        spikeSize: isSparkle ? Math.random() * 4 + 3 : 0
      });
    }
  }

  createDriftingParticles() {
    this.driftingParticles = [];
    const count = Math.min(Math.max(Math.floor(this.width / 25), 30), 70);

    for (let i = 0; i < count; i++) {
      this.driftingParticles.push({
        x: Math.random() * this.width,
        y: Math.random() * this.height,
        radius: Math.random() * 2.2 + 0.8,
        vx: (Math.random() - 0.5) * 0.3,
        vy: - (Math.random() * 0.4 + 0.15), // Flotan suavemente hacia arriba
        wobbleSpeed: Math.random() * 0.02 + 0.01,
        wobbleDist: Math.random() * 1.5 + 0.5,
        wobblePhase: Math.random() * Math.PI * 2,
        alpha: Math.random() * 0.6 + 0.2,
        color: Math.random() < 0.5 ? '#cbd5e1' : '#ffffff',
        glow: Math.random() < 0.4
      });
    }
  }

  addShootingStar() {
    const startX = Math.random() * (this.width * 0.85);
    const startY = Math.random() * (this.height * 0.45);
    const angle = (Math.PI / 4) + (Math.random() - 0.5) * 0.3; // ~45 grados diagonal
    const speed = Math.random() * 9 + 8;
    const length = Math.random() * 90 + 70;

    this.shootingStars.push({
      x: startX,
      y: startY,
      dx: Math.cos(angle) * speed,
      dy: Math.sin(angle) * speed,
      length: length,
      alpha: 1,
      decay: Math.random() * 0.018 + 0.014,
      width: Math.random() * 1.8 + 1.2,
      color: Math.random() < 0.5 ? '#e2e8f0' : '#ffffff'
    });
  }

  addCursorStar(x, y) {
    if (this.cursorStars.length > 25) return;
    this.cursorStars.push({
      x: x + (Math.random() - 0.5) * 20,
      y: y + (Math.random() - 0.5) * 20,
      vx: (Math.random() - 0.5) * 1.5,
      vy: (Math.random() - 0.5) * 1.5 - 0.5,
      size: Math.random() * 2.5 + 1,
      alpha: 1,
      decay: 0.03,
      color: Math.random() < 0.6 ? '#cbd5e1' : '#ffffff'
    });
  }

  animate() {
    requestAnimationFrame(() => this.animate());

    // Si la pestaña está oculta, evitamos renderizar innecesariamente
    if (document.hidden) return;

    this.ctx.clearRect(0, 0, this.width, this.height);
    const now = Date.now();

    // 1. DIBUJAR ESTRELLAS PARPADEANTES (Aparecen y desaparecen)
    for (let i = 0; i < this.stars.length; i++) {
      const star = this.stars[i];
      // Oscilación senoidal suave entre 0.05 y 1.0
      const currentAlpha = Math.max(0.05, Math.min(1, star.baseAlpha + star.amplitude * Math.sin(now * star.frequency + star.phase)));

      this.ctx.save();
      this.ctx.globalAlpha = currentAlpha;
      this.ctx.fillStyle = star.color;

      // Estrella puntual
      this.ctx.beginPath();
      this.ctx.arc(star.x, star.y, star.size, 0, Math.PI * 2);
      this.ctx.fill();

      // Si es una estrella con destello especial y su brillo supera 0.65, dibujamos sus 4 picos
      if (star.isSparkle && currentAlpha > 0.55) {
        const s = star.spikeSize * (currentAlpha - 0.4);
        this.ctx.strokeStyle = star.color;
        this.ctx.lineWidth = 0.8;
        this.ctx.beginPath();
        this.ctx.moveTo(star.x - s, star.y);
        this.ctx.lineTo(star.x + s, star.y);
        this.ctx.moveTo(star.x, star.y - s);
        this.ctx.lineTo(star.x, star.y + s);
        this.ctx.stroke();
      }

      this.ctx.restore();
    }

    // 2. DIBUJAR ESTRELLAS FLOTANTES / POLVO ESTELAR (Se mueven de otra manera)
    for (let i = 0; i < this.driftingParticles.length; i++) {
      const p = this.driftingParticles[i];
      p.y += p.vy;
      p.wobblePhase += p.wobbleSpeed;
      p.x += Math.sin(p.wobblePhase) * p.wobbleDist * 0.4 + p.vx;

      // Reaparecen abajo si salen de pantalla
      if (p.y < -10) {
        p.y = this.height + 10;
        p.x = Math.random() * this.width;
      }
      if (p.x < -10) p.x = this.width + 10;
      if (p.x > this.width + 10) p.x = -10;

      this.ctx.save();
      this.ctx.globalAlpha = p.alpha;
      this.ctx.fillStyle = p.color;

      if (p.glow) {
        this.ctx.shadowBlur = 8;
        this.ctx.shadowColor = p.color;
      }

      this.ctx.beginPath();
      this.ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
      this.ctx.fill();
      this.ctx.restore();
    }

    // 3. ESTRELLAS FUGACES / METEOROS
    if (now - this.lastShootingStarTime > this.shootingStarInterval) {
      this.addShootingStar();
      this.lastShootingStarTime = now;
      this.shootingStarInterval = 2800 + Math.random() * 2500;
    }

    for (let i = this.shootingStars.length - 1; i >= 0; i--) {
      const s = this.shootingStars[i];
      s.x += s.dx;
      s.y += s.dy;
      s.alpha -= s.decay;

      if (s.alpha <= 0 || s.x > this.width + 100 || s.y > this.height + 100) {
        this.shootingStars.splice(i, 1);
        continue;
      }

      const tailX = s.x - (s.dx / Math.hypot(s.dx, s.dy)) * s.length;
      const tailY = s.y - (s.dy / Math.hypot(s.dx, s.dy)) * s.length;

      const grad = this.ctx.createLinearGradient(tailX, tailY, s.x, s.y);
      grad.addColorStop(0, 'rgba(255, 255, 255, 0)');
      grad.addColorStop(0.7, s.color);
      grad.addColorStop(1, '#ffffff');

      this.ctx.save();
      this.ctx.globalAlpha = s.alpha;
      this.ctx.strokeStyle = grad;
      this.ctx.lineWidth = s.width;
      this.ctx.lineCap = 'round';
      this.ctx.shadowBlur = 12;
      this.ctx.shadowColor = '#ffffff';

      this.ctx.beginPath();
      this.ctx.moveTo(tailX, tailY);
      this.ctx.lineTo(s.x, s.y);
      this.ctx.stroke();

      // Cabeza brillante del meteoro
      this.ctx.fillStyle = '#ffffff';
      this.ctx.beginPath();
      this.ctx.arc(s.x, s.y, s.width * 1.2, 0, Math.PI * 2);
      this.ctx.fill();

      this.ctx.restore();
    }

    // 4. ESTRELLAS DEL CURSOR / TOUCH
    for (let i = this.cursorStars.length - 1; i >= 0; i--) {
      const cs = this.cursorStars[i];
      cs.x += cs.vx;
      cs.y += cs.vy;
      cs.alpha -= cs.decay;

      if (cs.alpha <= 0) {
        this.cursorStars.splice(i, 1);
        continue;
      }

      this.ctx.save();
      this.ctx.globalAlpha = cs.alpha;
      this.ctx.fillStyle = cs.color;
      this.ctx.shadowBlur = 6;
      this.ctx.shadowColor = cs.color;
      this.ctx.beginPath();
      this.ctx.arc(cs.x, cs.y, cs.size, 0, Math.PI * 2);
      this.ctx.fill();
      this.ctx.restore();
    }
  }
}

// Inicializar cuando el DOM esté listo
document.addEventListener('DOMContentLoaded', () => {
  window.starrySkyInstance = new StarrySky('stars-canvas');
});
