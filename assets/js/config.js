/**
 * ========================================================
 * CONFIGURACIÓN DE LA INVITACIÓN DE 15 AÑOS - MILY
 * ========================================================
 * Puedes personalizar todos los datos de la fiesta aquí fácilmente:
 * - Nombre de la cumpleañera
 * - Fecha y horario
 * - Enlace a tu Google Form para confirmación de asistencia
 * - Lugares (Misa y Fiesta) con enlaces de Google Maps
 * - Canción y fotos
 */

const EVENT_CONFIG = {
  // Información de la Quinceañera
  quinceanera: {
    nickname: "Mily",
    fullName: "Milagros Botta",
    tagline: "Mis 15 Años",
    quote: "Hay momentos en la vida que son mágicos e inolvidables, y compartirlos con las personas que más quiero los hace eternos. Te espero para celebrar juntos una noche mágica bajo las estrellas.",
    parents: "Mis padres: Florencia Delgado & Marcos Botta",
    godparents: ""
  },

  // Fecha del evento para el contador (Formato: YYYY-MM-DDTHH:MM:SS)
  // Ejemplo: "2026-11-21T21:00:00"
  eventDate: "2026-11-21T21:00:00",

  // Texto legible de la fecha
  displayDate: {
    dayOfWeek: "Sábado",
    day: "21",
    month: "Noviembre",
    year: "2026",
    time: "21:00 HS"
  },

  // Detalles de los eventos (Ceremonia y Fiesta)
  locations: {
    ceremony: {
      enabled: true,
      title: "Ceremonia Religiosa",
      time: "19:30 hs",
      place: "Parroquia Nuestra Señora de la Merced",
      address: "Av. San Martín 1420",
      googleMapsUrl: "https://maps.google.com/?q=Parroquia+Nuestra+Señora+de+la+Merced",
      icon: "church"
    },
    party: {
      enabled: true,
      title: "Gran Fiesta de Gala",
      time: "21:00 hs",
      place: "Palacio de Cristal Eventos",
      address: "Camino de las Palmeras 3500",
      googleMapsUrl: "https://maps.google.com/?q=Palacio+de+Cristal+Eventos",
      icon: "party"
    }
  },

  // Confirmación de Asistencia (RSVP)
  rsvp: {
    deadline: "10 de Noviembre, 2026",
    // ¡PEGA AQUÍ TU ENLACE DE FORMULARIO DE GOOGLE!
    googleFormUrl: "https://forms.google.com",
    // Opcional: confirmación por WhatsApp
    whatsappEnabled: true,
    whatsappNumber: "5491123456789", // Código de país + área + teléfono
    whatsappMessage: "¡Hola Mily! Quiero confirmar mi asistencia a tus 15 años ✨"
  },

  // Código de Vestimenta
  dressCode: {
    title: "Código de Vestimenta",
    style: "Elegante / Gala",
    note: "Se reserva el color blanco y azul noche exclusivamente para la quinceañera ✨",
    recommendedColors: [
      { name: "Plata", color: "#cbd5e1" },
      { name: "Gris Perla", color: "#94a3b8" },
      { name: "Negro", color: "#111827" },
      { name: "Borgoña", color: "#581845" }
    ]
  },

  // Regalos / Lluvia de sobres
  gifts: {
    title: "Mesa de Regalos",
    subtitle: "Lluvia de Sobres",
    message: "El mejor regalo es tu presencia y alegría en esta noche mágica. Pero si deseas hacerme un presente, habrá un buzón de sobres en la entrada o puedes ayudarme a cumplir mi viaje soñado:",
    bankDetails: {
      alias: "MILY.MIS15.FIESTA",
      cbu: "0000003100012345678901",
      bank: "Banco Santander",
      holder: "Milagros Botta"
    }
  },

  // Música de fondo
  music: {
    title: "Vals Mágico - Mis 15 Años",
    artist: "Edición Especial",
    audioSrc: "assets/audio/cancion-mis-15.mp3",
    envelopeSound: "assets/audio/open-envelope.mp3",
    autoplayOnOpen: true
  },

  // Enlace a Google Drive para ver todas las fotos
  // (Pega aquí el enlace de tu carpeta de Google Drive cuando esté definido)
  photosDriveUrl: "https://drive.google.com",

  // Galería de Fotos (Foto principal destacada)
  photos: [
    {
      src: "assets/images/foto1.svg",
      title: "Mis 15 Años",
      caption: "Soñando con esta noche mágica e inolvidable"
    }
  ]
};

// Exportar para acceso global
window.EVENT_CONFIG = EVENT_CONFIG;
