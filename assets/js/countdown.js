/**
 * ========================================================
 * CONTADOR REGRESIVO EN TIEMPO REAL
 * ========================================================
 * Calcula los días, horas, minutos y segundos restantes
 * para el evento y los muestra con diseño moderno.
 */

class CountdownTimer {
  constructor() {
    this.targetDate = new Date(window.EVENT_CONFIG?.eventDate || "2026-11-21T21:00:00").getTime();

    this.daysEl = document.getElementById('count-days');
    this.hoursEl = document.getElementById('count-hours');
    this.minutesEl = document.getElementById('count-minutes');
    this.secondsEl = document.getElementById('count-seconds');
    this.container = document.getElementById('countdown-container');

    this.intervalId = null;
    this.init();
  }

  init() {
    if (!this.daysEl) return;
    this.update();
    this.intervalId = setInterval(() => this.update(), 1000);
  }

  update() {
    const now = new Date().getTime();
    const distance = this.targetDate - now;

    if (distance <= 0) {
      if (this.daysEl) this.daysEl.textContent = '00';
      if (this.hoursEl) this.hoursEl.textContent = '00';
      if (this.minutesEl) this.minutesEl.textContent = '00';
      if (this.secondsEl) this.secondsEl.textContent = '00';

      const banner = document.getElementById('countdown-celebration-banner');
      if (banner) {
        banner.style.display = 'block';
        banner.innerHTML = '✨ ¡Llegó el gran día! ¡A celebrar los 15 de Mily! ✨';
      }
      if (this.intervalId) clearInterval(this.intervalId);
      return;
    }

    const days = Math.floor(distance / (1000 * 60 * 60 * 24));
    const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((distance % (1000 * 60)) / 1000);

    const pad = (num) => String(num).padStart(2, '0');

    this.setNumber(this.daysEl, pad(days));
    this.setNumber(this.hoursEl, pad(hours));
    this.setNumber(this.minutesEl, pad(minutes));
    this.setNumber(this.secondsEl, pad(seconds));
  }

  setNumber(element, val) {
    if (!element) return;
    if (element.textContent !== val) {
      element.classList.remove('pulse-num');
      // trigger reflow
      void element.offsetWidth;
      element.textContent = val;
      element.classList.add('pulse-num');
    }
  }
}

document.addEventListener('DOMContentLoaded', () => {
  window.countdownInstance = new CountdownTimer();
});
