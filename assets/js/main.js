/**
 * ========================================================
 * CONTROLADOR PRINCIPAL DE LA APLICACIÓN (MAIN.JS)
 * ========================================================
 * - Rellena el contenido dinámico desde config.js
 * - Maneja el botón de Google Forms y WhatsApp
 * - Configura "Añadir a Google Calendar"
 * - Maneja el copiado de CBU / Alias
 * - Controla animaciones al hacer scroll (Intersection Observer)
 */

document.addEventListener('DOMContentLoaded', () => {
  const config = window.EVENT_CONFIG;
  if (!config) return;

  // 1. Rellenar datos de la Quinceañera
  const nicknameEls = document.querySelectorAll('.data-nickname');
  nicknameEls.forEach(el => el.textContent = config.quinceanera.nickname);

  const fullNameEls = document.querySelectorAll('.data-fullname');
  fullNameEls.forEach(el => el.textContent = config.quinceanera.fullName);

  const quoteEl = document.getElementById('data-quote');
  if (quoteEl && config.quinceanera.quote) {
    quoteEl.textContent = `"${config.quinceanera.quote}"`;
  }

  const parentsEl = document.getElementById('data-parents');
  if (parentsEl) {
    if (config.quinceanera.parents) {
      parentsEl.textContent = config.quinceanera.parents;
      parentsEl.style.display = 'block';
    } else {
      parentsEl.style.display = 'none';
    }
  }

  const godparentsEl = document.getElementById('data-godparents');
  if (godparentsEl) {
    if (config.quinceanera.godparents) {
      godparentsEl.textContent = config.quinceanera.godparents;
      godparentsEl.style.display = 'block';
    } else {
      godparentsEl.style.display = 'none';
    }
  }

  // 2. Rellenar Fecha
  if (config.displayDate) {
    const dayOfWeekEls = document.querySelectorAll('.data-day-of-week');
    dayOfWeekEls.forEach(el => el.textContent = config.displayDate.dayOfWeek);

    const dayEls = document.querySelectorAll('.data-day');
    dayEls.forEach(el => el.textContent = config.displayDate.day);

    const monthEls = document.querySelectorAll('.data-month');
    monthEls.forEach(el => el.textContent = config.displayDate.month);

    const yearEls = document.querySelectorAll('.data-year');
    yearEls.forEach(el => el.textContent = config.displayDate.year);

    const timeEls = document.querySelectorAll('.data-time');
    timeEls.forEach(el => el.textContent = config.displayDate.time);
  }

  // 3. Rellenar Itinerario / Ubicaciones
  if (config.locations) {
    // Ceremonia
    if (config.locations.ceremony && config.locations.ceremony.enabled) {
      const cTime = document.getElementById('ceremony-time');
      const cPlace = document.getElementById('ceremony-place');
      const cAddr = document.getElementById('ceremony-address');
      const cMapBtn = document.getElementById('ceremony-map-btn');

      if (cTime) cTime.textContent = config.locations.ceremony.time;
      if (cPlace) cPlace.textContent = config.locations.ceremony.place;
      if (cAddr) cAddr.textContent = config.locations.ceremony.address;
      if (cMapBtn && config.locations.ceremony.googleMapsUrl) {
        cMapBtn.href = config.locations.ceremony.googleMapsUrl;
      }
    } else {
      const cCard = document.getElementById('ceremony-card');
      if (cCard) cCard.style.display = 'none';
    }

    // Fiesta
    if (config.locations.party && config.locations.party.enabled) {
      const pTime = document.getElementById('party-time');
      const pPlace = document.getElementById('party-place');
      const pAddr = document.getElementById('party-address');
      const pMapBtn = document.getElementById('party-map-btn');

      if (pTime) pTime.textContent = config.locations.party.time;
      if (pPlace) pPlace.textContent = config.locations.party.place;
      if (pAddr) pAddr.textContent = config.locations.party.address;
      if (pMapBtn && config.locations.party.googleMapsUrl) {
        pMapBtn.href = config.locations.party.googleMapsUrl;
      }
    }
  }

  // 4. Configurar Enlaces de RSVP (Formulario y WhatsApp)
  const rsvpFormBtn = document.getElementById('rsvp-google-form-btn');
  if (rsvpFormBtn && config.rsvp?.googleFormUrl) {
    rsvpFormBtn.href = config.rsvp.googleFormUrl;
  }

  // 4b. Configurar Enlace a Google Drive para Fotos
  const driveBtn = document.getElementById('gallery-drive-btn');
  if (driveBtn && config.photosDriveUrl) {
    driveBtn.href = config.photosDriveUrl;
  }

  const rsvpDeadlineEl = document.getElementById('rsvp-deadline');
  if (rsvpDeadlineEl && config.rsvp?.deadline) {
    rsvpDeadlineEl.textContent = config.rsvp.deadline;
  }

  const rsvpWhatsappBtn = document.getElementById('rsvp-whatsapp-btn');
  if (rsvpWhatsappBtn) {
    if (config.rsvp?.whatsappEnabled && config.rsvp?.whatsappNumber) {
      const encodedMsg = encodeURIComponent(config.rsvp.whatsappMessage || "Hola, confirmo mi asistencia");
      rsvpWhatsappBtn.href = `https://wa.me/${config.rsvp.whatsappNumber}?text=${encodedMsg}`;
    } else {
      rsvpWhatsappBtn.style.display = 'none';
    }
  }

  // 5. Configurar Código de Vestimenta
  if (config.dressCode) {
    const dcStyle = document.getElementById('dress-code-style');
    const dcNote = document.getElementById('dress-code-note');
    if (dcStyle) dcStyle.textContent = config.dressCode.style;
    if (dcNote) dcNote.textContent = config.dressCode.note;
  }

  // 6. Regalos / Datos Bancarios
  if (config.gifts?.bankDetails) {
    const aliasEl = document.getElementById('bank-alias');
    const cbuEl = document.getElementById('bank-cbu');
    const bankEl = document.getElementById('bank-name');
    const holderEl = document.getElementById('bank-holder');

    if (aliasEl) aliasEl.textContent = config.gifts.bankDetails.alias || '';
    if (cbuEl) cbuEl.textContent = config.gifts.bankDetails.cbu || '';
    if (bankEl) bankEl.textContent = config.gifts.bankDetails.bank || '';
    if (holderEl) holderEl.textContent = config.gifts.bankDetails.holder || '';

    // Botones para copiar Alias y CBU
    setupCopyButton('btn-copy-alias', config.gifts.bankDetails.alias);
    setupCopyButton('btn-copy-cbu', config.gifts.bankDetails.cbu);
  }

  // 7. Botón para agendar en Google Calendar
  setupGoogleCalendar(config);

  // 8. Animaciones de scroll (Intersection Observer)
  setupScrollAnimations();
});

/**
 * Configura la acción de copiar texto al portapapeles con feedback visual
 */
function setupCopyButton(buttonId, textToCopy) {
  const btn = document.getElementById(buttonId);
  if (!btn || !textToCopy) return;

  btn.addEventListener('click', (e) => {
    e.preventDefault();
    navigator.clipboard.writeText(textToCopy).then(() => {
      const originalText = btn.innerHTML;
      btn.innerHTML = '<span>✓ ¡Copiado!</span>';
      btn.classList.add('copied');

      setTimeout(() => {
        btn.innerHTML = originalText;
        btn.classList.remove('copied');
      }, 2200);
    }).catch(err => {
      console.warn("No se pudo copiar automáticamente:", err);
    });
  });
}

/**
 * Genera el enlace dinámico para Google Calendar
 */
function setupGoogleCalendar(config) {
  const calBtn = document.getElementById('add-calendar-btn');
  if (!calBtn) return;

  try {
    const startDate = new Date(config.eventDate);
    const endDate = new Date(startDate.getTime() + (6 * 60 * 60 * 1000)); // +6 horas duración

    const formatCalDate = (d) => d.toISOString().replace(/-|:|\.\d+/g, '');

    const title = encodeURIComponent(`Mis 15 Años - ${config.quinceanera.nickname}`);
    const details = encodeURIComponent(`Gran fiesta de 15 años de ${config.quinceanera.fullName}. ¡Te esperamos para celebrar juntos!`);
    const location = encodeURIComponent(`${config.locations?.party?.place || ''}, ${config.locations?.party?.address || ''}`);
    const dates = `${formatCalDate(startDate)}/${formatCalDate(endDate)}`;

    const gcalUrl = `https://calendar.google.com/calendar/render?action=TEMPLATE&text=${title}&dates=${dates}&details=${details}&location=${location}`;
    calBtn.href = gcalUrl;
  } catch (e) {
    console.warn("Error generando enlace de calendario:", e);
  }
}

/**
 * Observador de intersección para animar elementos al aparecer en pantalla
 */
function setupScrollAnimations() {
  const elements = document.querySelectorAll('.animate-on-scroll');

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('in-view');
      }
    });
  }, {
    threshold: 0.12,
    rootMargin: '0px 0px -40px 0px'
  });

  elements.forEach(el => observer.observe(el));
}
