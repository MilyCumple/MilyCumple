/**
 * ========================================================
 * GALERÍA DE FOTOS Y VISOR LIGHTBOX INTERACTIVO
 * ========================================================
 * Renderiza la galería a partir de config.js,
 * permite abrir fotos en pantalla completa,
 * navegación táctil por deslizamiento (swipe) y botones.
 */

class PhotoGallery {
  constructor() {
    this.photos = window.EVENT_CONFIG?.photos || [];
    this.currentIndex = 0;

    this.galleryContainer = document.getElementById('gallery-grid');
    this.lightbox = document.getElementById('lightbox-modal');
    this.lightboxImg = document.getElementById('lightbox-img');
    this.lightboxTitle = document.getElementById('lightbox-title');
    this.lightboxCaption = document.getElementById('lightbox-caption');
    this.lightboxCounter = document.getElementById('lightbox-counter');
    this.closeBtn = document.getElementById('lightbox-close');
    this.prevBtn = document.getElementById('lightbox-prev');
    this.nextBtn = document.getElementById('lightbox-next');

    this.touchStartX = 0;
    this.touchEndX = 0;

    this.init();
  }

  init() {
    this.renderGallery();
    this.bindEvents();
  }

  renderGallery() {
    if (!this.galleryContainer) return;
    this.galleryContainer.innerHTML = '';

    this.photos.forEach((photo, index) => {
      const card = document.createElement('div');
      card.className = 'photo-card';
      card.setAttribute('data-index', index);
      card.innerHTML = `
        <div class="photo-frame">
          <img src="${photo.src}" alt="${photo.title || 'Foto de Mily'}" loading="lazy" class="photo-img" />
          <div class="photo-overlay">
            <span class="photo-zoom-icon">🔍</span>
            <h4 class="photo-card-title">${photo.title || ''}</h4>
            <p class="photo-card-sub">${photo.caption || ''}</p>
          </div>
          <div class="photo-border-glimmer"></div>
        </div>
      `;

      card.addEventListener('click', () => {
        this.openLightbox(index);
      });

      this.galleryContainer.appendChild(card);
    });
  }

  bindEvents() {
    if (this.closeBtn) {
      this.closeBtn.addEventListener('click', () => this.closeLightbox());
    }

    if (this.prevBtn) {
      this.prevBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        this.prev();
      });
    }

    if (this.nextBtn) {
      this.nextBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        this.next();
      });
    }

    // Cerrar al hacer clic fuera de la foto
    if (this.lightbox) {
      this.lightbox.addEventListener('click', (e) => {
        if (e.target === this.lightbox) {
          this.closeLightbox();
        }
      });
    }

    // Teclado
    window.addEventListener('keydown', (e) => {
      if (!this.lightbox || !this.lightbox.classList.contains('active')) return;
      if (e.key === 'Escape') this.closeLightbox();
      if (e.key === 'ArrowLeft') this.prev();
      if (e.key === 'ArrowRight') this.next();
    });

    // Soporte para gestos táctiles (Swipe en celulares)
    if (this.lightbox) {
      this.lightbox.addEventListener('touchstart', (e) => {
        this.touchStartX = e.changedTouches[0].screenX;
      }, { passive: true });

      this.lightbox.addEventListener('touchend', (e) => {
        this.touchEndX = e.changedTouches[0].screenX;
        this.handleSwipe();
      }, { passive: true });
    }
  }

  handleSwipe() {
    const diff = this.touchEndX - this.touchStartX;
    if (Math.abs(diff) > 40) {
      if (diff > 0) {
        this.prev();
      } else {
        this.next();
      }
    }
  }

  openLightbox(index) {
    this.currentIndex = index;
    this.updateLightboxContent();
    if (this.lightbox) {
      this.lightbox.classList.add('active');
      document.body.style.overflow = 'hidden';
    }
  }

  closeLightbox() {
    if (this.lightbox) {
      this.lightbox.classList.remove('active');
      document.body.style.overflow = '';
    }
  }

  prev() {
    this.currentIndex = (this.currentIndex - 1 + this.photos.length) % this.photos.length;
    this.updateLightboxContent();
  }

  next() {
    this.currentIndex = (this.currentIndex + 1) % this.photos.length;
    this.updateLightboxContent();
  }

  updateLightboxContent() {
    const item = this.photos[this.currentIndex];
    if (!item || !this.lightboxImg) return;

    this.lightboxImg.style.opacity = '0';
    this.lightboxImg.style.transform = 'scale(0.95)';

    setTimeout(() => {
      this.lightboxImg.src = item.src;
      this.lightboxImg.alt = item.title || 'Foto de Mily';
      if (this.lightboxTitle) this.lightboxTitle.textContent = item.title || '';
      if (this.lightboxCaption) this.lightboxCaption.textContent = item.caption || '';
      if (this.lightboxCounter) {
        this.lightboxCounter.textContent = `${this.currentIndex + 1} / ${this.photos.length}`;
      }

      this.lightboxImg.style.opacity = '1';
      this.lightboxImg.style.transform = 'scale(1)';
    }, 150);
  }
}

document.addEventListener('DOMContentLoaded', () => {
  window.photoGalleryInstance = new PhotoGallery();
});
