/**
 * BLUEBERRY DIGITAL - INTERACTIVE ENGINE
 * Graduation EETA 2026 Platform
 */

document.addEventListener('DOMContentLoaded', () => {
  initIntroSequence();
  initHeroVideo();
  initNavbar();
  initGallery();
  initLightbox();
  initVideoPlayer();
  initContactActions();
});

/* ==========================================================================
   1. INTRO SEQUENCE (3 Seconds Video & Floating Focus/Blur Logo)
   ========================================================================== */
function initIntroSequence() {
  const introOverlay = document.getElementById('intro-overlay');
  const skipBtn = document.getElementById('skip-intro-btn');
  const introVideo = document.getElementById('intro-video');

  if (!introOverlay) return;

  // Attempt autoplay muted (browser compliant)
  if (introVideo) {
    introVideo.muted = true;
    introVideo.play().catch(err => {
      console.warn('Autoplay prevented or interrupted:', err);
    });
  }

  let introTimeout = null;

  const dismissIntro = () => {
    if (introOverlay.classList.contains('fade-out')) return;
    introOverlay.classList.add('fade-out');
    if (introTimeout) clearTimeout(introTimeout);
    
    // Cleanup video after fade out to free GPU/memory
    setTimeout(() => {
      if (introVideo) introVideo.pause();
      introOverlay.style.display = 'none';
    }, 900);
  };

  // Skip button listener
  if (skipBtn) {
    skipBtn.addEventListener('click', dismissIntro);
  }

  // Auto transition after 3.2 seconds
  introTimeout = setTimeout(dismissIntro, 3200);
}

/* ==========================================================================
   HERO VIDEO:
   fondo01.jpg se muestra SOLAMENTE mientras carga el video.
   Al cargar y reproducir, se oculta el fondo y se muestra ÚNICAMENTE el video.
   ========================================================================== */
function initHeroVideo() {
  const heroVideo = document.getElementById('hero-video');
  const heroPoster = document.getElementById('hero-poster');

  if (!heroVideo) return;

  const onVideoActive = () => {
    heroVideo.classList.add('is-playing');
    if (heroPoster) {
      heroPoster.classList.add('fade-out');
    }
  };

  if (heroVideo.readyState >= 3) {
    onVideoActive();
  } else {
    heroVideo.addEventListener('playing', onVideoActive, { once: true });
    heroVideo.addEventListener('canplay', onVideoActive, { once: true });
    heroVideo.addEventListener('loadeddata', onVideoActive, { once: true });
  }

  // Fallback seguro: después de 1.5s activar video si ya arrancó
  setTimeout(() => {
    if (heroVideo.currentTime > 0 && !heroVideo.paused) {
      onVideoActive();
    }
  }, 1500);
}

/* ==========================================================================
   2. NAVBAR & NAVIGATION
   ========================================================================== */
function initNavbar() {
  const header = document.querySelector('.site-header');
  const menuToggle = document.querySelector('.menu-toggle');
  const navLinks = document.querySelector('.nav-links');

  window.addEventListener('scroll', () => {
    if (window.scrollY > 40) {
      header.style.background = 'rgba(8, 8, 8, 0.95)';
      header.style.borderBottomColor = 'rgba(255, 255, 255, 0.12)';
    } else {
      header.style.background = 'rgba(10, 10, 10, 0.85)';
      header.style.borderBottomColor = 'rgba(255, 255, 255, 0.08)';
    }
  });

  if (menuToggle && navLinks) {
    menuToggle.addEventListener('click', () => {
      navLinks.classList.toggle('mobile-open');
    });

    navLinks.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', () => {
        navLinks.classList.remove('mobile-open');
      });
    });
  }
}

/* ==========================================================================
   3. GALLERY ENGINE (Instagram Feed & Grid)
   ========================================================================== */
let currentPhotos = typeof GALLERY_DATA !== 'undefined' ? GALLERY_DATA : [];
let currentLayout = 'grid'; // 'grid' | 'masonry'

function initGallery() {
  const container = document.getElementById('gallery-grid');
  const countBadge = document.getElementById('photo-counter');
  const btnGrid = document.getElementById('btn-view-grid');
  const btnMasonry = document.getElementById('btn-view-masonry');

  if (!container) return;

  if (countBadge) {
    countBadge.textContent = `${currentPhotos.length} fotos`;
  }

  // Render photo cards
  renderGallery(container);

  // Layout switcher
  if (btnGrid && btnMasonry) {
    btnGrid.addEventListener('click', () => {
      btnGrid.classList.add('active');
      btnMasonry.classList.remove('active');
      container.classList.remove('view-masonry');
      currentLayout = 'grid';
    });

    btnMasonry.addEventListener('click', () => {
      btnMasonry.classList.add('active');
      btnGrid.classList.remove('active');
      container.classList.add('view-masonry');
      currentLayout = 'masonry';
    });
  }
}

function renderGallery(container) {
  container.innerHTML = '';

  currentPhotos.forEach((photo, index) => {
    const card = document.createElement('article');
    card.className = 'photo-card';
    card.setAttribute('data-id', photo.id);
    card.setAttribute('data-index', index);

    // Apply portrait class if portrait or within first 4 photos to strictly preserve heads
    if (photo.aspect === 'portrait' || index < 4) {
      card.classList.add('is-portrait');
    }

    // Local storage like persistence
    const isLiked = localStorage.getItem(`like_${photo.id}`) === 'true';

    card.innerHTML = `
      <div class="photo-image-wrapper">
        <img 
          src="${photo.thumb}" 
          alt="${photo.title}" 
          class="photo-thumb" 
          loading="lazy" 
          decoding="async"
          style="object-position: top center;"
        />
        <div class="photo-overlay">
          <div class="overlay-top">
            <button class="overlay-icon-btn btn-open-lightbox" title="Ampliar imagen" aria-label="Ampliar imagen">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M15 3h6v6M9 21H3v-6M21 3l-7 7M3 21l7-7"/></svg>
            </button>
            <a href="${photo.full}" download="${photo.filename}" class="overlay-icon-btn" title="Descargar original" aria-label="Descargar original" onclick="event.stopPropagation()">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4M7 10l5 5 5-5M12 15V3"/></svg>
            </a>
          </div>
          <div class="overlay-bottom">
            <div class="photo-meta-info">
              <span class="photo-id-title">${photo.title}</span>
              <span class="photo-aspect-tag">${photo.aspect} &bull; ${photo.width}x${photo.height}</span>
            </div>
          </div>
        </div>
      </div>
      <div class="instagram-meta-bar">
        <div class="meta-actions">
          <button class="insta-icon-btn btn-like ${isLiked ? 'liked' : ''}" title="Me gusta">
            <svg width="17" height="17" viewBox="0 0 24 24" fill="${isLiked ? '#ffffff' : 'none'}" stroke="currentColor" stroke-width="2"><path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/></svg>
            <span class="like-label">${isLiked ? '1' : '0'}</span>
          </button>
          <button class="insta-icon-btn btn-share-photo" title="Copiar enlace directo">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="18" cy="5" r="3"/><circle cx="6" cy="12" r="3"/><circle cx="18" cy="19" r="3"/><line x1="8.59" y1="13.51" x2="15.42" y2="17.49"/><line x1="15.41" y1="6.51" x2="8.59" y2="10.49"/></svg>
          </button>
        </div>
        <a href="${photo.full}" download="${photo.filename}" class="btn-download-card" onclick="event.stopPropagation()">
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4M7 10l5 5 5-5M12 15V3"/></svg>
          <span>Descargar</span>
        </a>
      </div>
    `;

    // Click on card opens lightbox
    card.addEventListener('click', (e) => {
      if (e.target.closest('a') || e.target.closest('.btn-like') || e.target.closest('.btn-share-photo')) return;
      openLightbox(index);
    });

    // Like button interaction
    const likeBtn = card.querySelector('.btn-like');
    likeBtn.addEventListener('click', (e) => {
      e.stopPropagation();
      const current = localStorage.getItem(`like_${photo.id}`) === 'true';
      const next = !current;
      localStorage.setItem(`like_${photo.id}`, next);
      
      likeBtn.classList.toggle('liked', next);
      likeBtn.querySelector('svg').setAttribute('fill', next ? '#ffffff' : 'none');
      likeBtn.querySelector('.like-label').textContent = next ? '1' : '0';
    });

    // Share photo interaction
    const shareBtn = card.querySelector('.btn-share-photo');
    shareBtn.addEventListener('click', (e) => {
      e.stopPropagation();
      const photoUrl = window.location.origin + window.location.pathname + '#' + photo.filename;
      navigator.clipboard.writeText(photoUrl).then(() => {
        showToast('Enlace de fotografía copiado al portapapeles');
      });
    });

    container.appendChild(card);
  });
}

/* ==========================================================================
   4. LIGHTBOX MODAL ENGINE (Zoom, Gestures, Downloads)
   ========================================================================== */
let activePhotoIndex = 0;
let isZoomed = false;

function initLightbox() {
  const modal = document.getElementById('lightbox-modal');
  const closeBtn = document.getElementById('lightbox-close');
  const prevBtn = document.getElementById('lightbox-prev');
  const nextBtn = document.getElementById('lightbox-next');
  const zoomBtn = document.getElementById('lightbox-zoom');
  const imgElement = document.getElementById('lightbox-image');

  if (!modal) return;

  closeBtn.addEventListener('click', closeLightbox);
  prevBtn.addEventListener('click', () => navigateLightbox(-1));
  nextBtn.addEventListener('click', () => navigateLightbox(1));

  if (zoomBtn && imgElement) {
    zoomBtn.addEventListener('click', () => {
      isZoomed = !isZoomed;
      imgElement.style.transform = isZoomed ? 'scale(1.75)' : 'scale(1)';
      imgElement.style.cursor = isZoomed ? 'zoom-out' : 'zoom-in';
    });

    imgElement.addEventListener('click', () => {
      isZoomed = !isZoomed;
      imgElement.style.transform = isZoomed ? 'scale(1.75)' : 'scale(1)';
      imgElement.style.cursor = isZoomed ? 'zoom-out' : 'zoom-in';
    });
  }

  // Keyboard navigation
  window.addEventListener('keydown', (e) => {
    if (!modal.classList.contains('active')) return;
    if (e.key === 'Escape') closeLightbox();
    if (e.key === 'ArrowLeft') navigateLightbox(-1);
    if (e.key === 'ArrowRight') navigateLightbox(1);
  });

  // Touch Swipe for mobile
  let touchStartX = 0;
  let touchEndX = 0;

  modal.addEventListener('touchstart', (e) => {
    touchStartX = e.changedTouches[0].screenX;
  }, { passive: true });

  modal.addEventListener('touchend', (e) => {
    touchEndX = e.changedTouches[0].screenX;
    handleSwipe();
  }, { passive: true });

  function handleSwipe() {
    const diff = touchEndX - touchStartX;
    if (Math.abs(diff) > 60) {
      if (diff > 0) navigateLightbox(-1); // swipe right -> prev
      else navigateLightbox(1); // swipe left -> next
    }
  }
}

function openLightbox(index) {
  const modal = document.getElementById('lightbox-modal');
  if (!modal) return;

  activePhotoIndex = index;
  isZoomed = false;
  updateLightboxContent();

  modal.classList.add('active');
  document.body.style.overflow = 'hidden';
}

function closeLightbox() {
  const modal = document.getElementById('lightbox-modal');
  if (!modal) return;

  modal.classList.remove('active');
  document.body.style.overflow = '';
  const imgElement = document.getElementById('lightbox-image');
  if (imgElement) {
    imgElement.style.transform = 'scale(1)';
  }
}

function navigateLightbox(direction) {
  activePhotoIndex = (activePhotoIndex + direction + currentPhotos.length) % currentPhotos.length;
  isZoomed = false;
  const imgElement = document.getElementById('lightbox-image');
  if (imgElement) {
    imgElement.style.transform = 'scale(1)';
  }
  updateLightboxContent();
}

function updateLightboxContent() {
  const photo = currentPhotos[activePhotoIndex];
  if (!photo) return;

  const titleEl = document.getElementById('lightbox-title');
  const counterEl = document.getElementById('lightbox-counter');
  const imgEl = document.getElementById('lightbox-image');
  const downloadBtn = document.getElementById('lightbox-download');
  const infoEl = document.getElementById('lightbox-info');

  if (titleEl) titleEl.textContent = photo.title;
  if (counterEl) counterEl.textContent = `${activePhotoIndex + 1} de ${currentPhotos.length}`;
  if (imgEl) {
    imgEl.src = photo.full;
    imgEl.alt = photo.title;
  }
  if (downloadBtn) {
    downloadBtn.href = photo.full;
    downloadBtn.download = photo.filename;
  }
  if (infoEl) {
    infoEl.textContent = `${photo.filename} (${photo.width} × ${photo.height} px)`;
  }
}

/* ==========================================================================
   5. VIDEO PLAYER LOGIC (YouTube Embed & Google Drive Player Switcher)
   ========================================================================== */
function initVideoPlayer() {
  const tabBtns = document.querySelectorAll('.source-tab-btn');
  const iframe = document.getElementById('video-player-frame');

  if (!tabBtns.length || !iframe) return;

  tabBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      tabBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      const sourceSrc = btn.getAttribute('data-src');
      if (sourceSrc) {
        iframe.src = sourceSrc;
      }
    });
  });
}

/* ==========================================================================
   6. CONTACT & SHARE ACTIONS
   ========================================================================== */
function initContactActions() {
  const copyMailBtn = document.getElementById('btn-copy-mail');
  if (copyMailBtn) {
    copyMailBtn.addEventListener('click', (e) => {
      e.preventDefault();
      navigator.clipboard.writeText('luisblueberry@gmail.com').then(() => {
        showToast('Correo luisblueberry@gmail.com copiado al portapapeles');
      });
    });
  }

  const copyLinkBtn = document.getElementById('btn-copy-site');
  if (copyLinkBtn) {
    copyLinkBtn.addEventListener('click', (e) => {
      e.preventDefault();
      navigator.clipboard.writeText(window.location.href).then(() => {
        showToast('Enlace de la galería copiado al portapapeles');
      });
    });
  }
}

/* ==========================================================================
   7. TOAST NOTIFICATIONS
   ========================================================================== */
function showToast(message) {
  let toast = document.getElementById('toast-notice');
  if (!toast) {
    toast = document.createElement('div');
    toast.id = 'toast-notice';
    toast.className = 'toast-notice';
    document.body.appendChild(toast);
  }

  toast.textContent = message;
  toast.classList.add('show');

  setTimeout(() => {
    toast.classList.remove('show');
  }, 3200);
}
