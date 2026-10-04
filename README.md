# 👑 Invitación Web de 15 Años - Mily ✨

Una página web elegante, moderna y 100% interactiva para invitación de 15 años, diseñada con paleta **Azul Noche, Blanco y Plateado**, optimizada para celulares y lista para publicar gratis en **GitHub Pages** (sin necesidad de backend).

---

## 🌟 Características Principales

1. **Carta / Sobre Interactivo 3D**:
   - Pantalla de bienvenida con un sobre de lujo azul noche con bordes plateados y sello real en plata con monograma "M".
   - Al tocarlo, el sello se abre con un destello de partículas plateadas, la solapa gira en 3D, la carta se desliza hacia arriba y comienza a reproducirse la música de fondo automáticamente.
2. **Cielo Nocturno con Movimiento Constante**:
   - Estrellas que aparecen y desaparecen con parpadeo senoidal suave en tonos plata y diamante.
   - Polvo estelar y partículas plateadas que flotan en ondas hacia arriba.
   - Meteoros / estrellas fugaces plateadas que cruzan la pantalla periódicamente.
   - Reacción interactiva al mover el mouse o deslizar el dedo en la pantalla táctil de celulares.
   - Mariposas plateadas en 3D que revolotean sobre la página dejando estelas de brillo.
3. **Música de Fondo Integrada**:
   - Incluye una hermosa melodía de vals / caja musical de 15 años.
   - Botón flotante siempre accesible para pausar o reanudar la música.
   - Indicador con disco de vinilo giratorio y barras de ondas ecualizadoras animadas.
4. **Galería de Fotos & Lightbox**:
   - Tarjetas con marcos plateados y efectos al pasar el cursor o tocar.
   - Visor de pantalla completa (Lightbox) con navegación táctil por deslizamiento (*swipe*) en celulares, flechas y títulos.
5. **Confirmación de Asistencia (RSVP)**:
   - Botón plateado brillante con pulso de luz y enlace directo a tu **Formulario de Google**.
   - Botón secundario para confirmar por **WhatsApp** con un mensaje predefinido.
6. **Detalles Completos del Evento**:
   - Contador regresivo en tiempo real (Días, Horas, Minutos, Segundos).
   - Botón para **Agendar en Google Calendar** con un solo toque.
   - Tarjetas para Ceremonia Religiosa y Fiesta con botón **"Cómo llegar" (Google Maps)**.
   - Código de vestimenta con muestra de colores.
   - Sección de regalos / Lluvia de sobres con datos bancarios y botones para **Copiar CBU y Alias** al portapapeles.

---

## 📁 Arquitectura del Proyecto (Limpia y Modular)

```text
Mily/
├── index.html                   # Estructura principal semántica y responsive
├── README.md                    # Esta guía de uso y despliegue
└── assets/
    ├── css/
    │   ├── style.css            # Estilos base, paleta azul noche, blanco y dorado
    │   ├── envelope.css         # Sobre 3D interactivo y animaciones de apertura
    │   └── animations.css       # Shimmer dorado, pulso, ondas y partículas
    ├── js/
    │   ├── config.js            # ⚙️ ARCHIVO DE CONFIGURACIÓN (¡Edita todo aquí!)
    │   ├── stars.js             # Motor canvas de estrellas parpadeantes y fugaces
    │   ├── music.js             # Reproductor de música y efectos
    │   ├── countdown.js         # Contador regresivo en tiempo real
    │   ├── gallery.js           # Galería interactiva y visor Lightbox
    │   ├── envelope.js          # Control de apertura del sobre
    │   └── main.js              # Integración general y animaciones de scroll
    ├── images/                  # Fotos, sello de cera, corona y favicon
    └── audio/                   # Canción de fondo y sonido del sobre
```

---

## ⚙️ Cómo Personalizar la Invitación (en 2 minutos)

No necesitas tocar el código HTML. Todo se configura en el archivo:
👉 [`assets/js/config.js`](file:///home/varoth/Proyectos/Mily/assets/js/config.js)

### 1. Vincular tu Formulario de Google (RSVP)
En `assets/js/config.js`, busca la sección `rsvp` y reemplaza la URL por la de tu formulario:
```javascript
rsvp: {
  deadline: "10 de Noviembre, 2026",
  googleFormUrl: "https://forms.gle/TU_FORMULARIO_AQUI", // 👈 Pega aquí tu link
  whatsappNumber: "5491123456789", // 👈 Tu número de WhatsApp
  whatsappMessage: "¡Hola Mily! Quiero confirmar mi asistencia a tus 15 años ✨"
}
```

### 2. Cambiar Nombre y Fecha
```javascript
quinceanera: {
  nickname: "Mily",
  fullName: "Milagros Botta",
  quote: "Hay momentos en la vida que son mágicos e inolvidables..."
},
eventDate: "2026-11-21T21:00:00", // Formato: AAAA-MM-DDTHH:MM:SS
```

### 3. Cambiar Direcciones y Lugares (Google Maps)
```javascript
locations: {
  ceremony: {
    place: "Parroquia Nuestra Señora de la Merced",
    address: "Av. San Martín 1420",
    googleMapsUrl: "https://maps.google.com/?q=TU_DIRECCION"
  },
  party: {
    place: "Palacio de Cristal Eventos",
    address: "Camino de las Palmeras 3500",
    googleMapsUrl: "https://maps.google.com/?q=TU_DIRECCION"
  }
}
```

### 4. Foto Principal y Álbum en Google Drive
1. Para la foto principal de la portada, coloca tu foto en `assets/images/` (por ejemplo: `foto1.jpg`) y configúrala en `assets/js/config.js`:
```javascript
photos: [
  { src: "assets/images/foto1.jpg", title: "Mis 15 Años", caption: "Soñando con esta gran noche" }
]
```
2. Para que los invitados puedan ver el álbum completo de fotos en Google Drive, solo pega el enlace de tu carpeta en `assets/js/config.js`:
```javascript
photosDriveUrl: "https://drive.google.com/drive/folders/TU_CARPETA_AQUI", // 👈 Tu enlace de Drive
```

### 5. Cambiar la Canción
Si deseas usar otra canción en lugar del vals incluido:
1. Copia tu archivo de música `.mp3` dentro de `assets/audio/`.
2. Actualiza la ruta en `assets/js/config.js`:
```javascript
music: {
  title: "Nombre de tu canción",
  audioSrc: "assets/audio/tu-cancion.mp3"
}
```

---

## 🚀 Cómo Publicar Gratis en GitHub Pages

Dado que la página está hecha puramente en **HTML, CSS y JavaScript** con rutas relativas, se publica en GitHub Pages en menos de 3 minutos:

### Paso 1: Inicializar repositorio Git local
Abre la terminal en esta carpeta y ejecuta:
```bash
git init
git add .
git commit -m "Invitación de 15 años Mily"
```

### Paso 2: Crear el repositorio en GitHub
1. Ve a [GitHub](https://github.com/new) y crea un nuevo repositorio público (por ejemplo: `invitacion-mily`).
2. Conecta tu repositorio local y sube los archivos:
```bash
git remote add origin https://github.com/TU_USUARIO/invitacion-mily.git
git branch -M main
git push -u origin main
```

### Paso 3: Activar GitHub Pages
1. En tu repositorio de GitHub, haz clic en **Settings** (Configuración) en la barra superior.
2. En el menú de la izquierda, selecciona **Pages**.
3. En **Build and deployment > Branch**:
   - Selecciona la rama: **`main`**
   - Carpeta: **`/ (root)`**
   - Haz clic en **Save** (Guardar).
4. Espera 1 o 2 minutos y recarga la página. Verás un mensaje en verde con tu enlace en vivo:
   `https://TU_USUARIO.github.io/invitacion-mily/`

---

## 📱 Visualización en Celulares

El diseño fue desarrollado con enfoque **Mobile-First**:
- Todos los tamaños de fuente usan tipografía fluida (`clamp()`).
- Los botones tienen dimensiones táctiles cómodas para dedos en pantallas táctiles (mínimo 48px).
- El sobre 3D se ajusta proporcionalmente a cualquier ancho de pantalla (desde pantallas estrechas de 320px hasta iPhone / Android modernos y tablets).
- La galería cuenta con visor táctil por gestos de deslizamiento (*swipe*).
