/* ========================
   HAMBURGER MENU — Mobile Navigation
   ======================== */
(function () {
  const hamburger = document.getElementById('hamburger');
  const navMenu   = document.querySelector('.nav-menu');
  const overlay   = document.getElementById('navOverlay');

  function openMenu() {
    navMenu.classList.add('open');
    hamburger.classList.add('open');
    overlay.classList.add('open');
    document.body.style.overflow = 'hidden';
  }

  function closeMenu() {
    navMenu.classList.remove('open');
    hamburger.classList.remove('open');
    overlay.classList.remove('open');
    document.body.style.overflow = '';
  }

  if (hamburger) hamburger.addEventListener('click', () => {
    navMenu.classList.contains('open') ? closeMenu() : openMenu();
  });

  if (overlay) overlay.addEventListener('click', closeMenu);

  // Tutup menu saat link diklik
  document.querySelectorAll('.nav-menu a').forEach(link => {
    link.addEventListener('click', closeMenu);
  });
})();

/* ========================
   TAB SWITCHER — Experience Section
   Tambahkan di dalam <script> tag, atau di file script.js kamu
   ======================== */

function switchTab(tabName, clickedBtn) {
  // Sembunyikan semua panel
  document.querySelectorAll('.exp-panel').forEach(panel => {
    panel.classList.remove('active');
  });

  // Nonaktifkan semua tombol tab
  document.querySelectorAll('.exp-tab').forEach(btn => {
    btn.classList.remove('active');
  });

  // Tampilkan panel yang dipilih
  document.getElementById('panel-' + tabName).classList.add('active');

  // Aktifkan tombol yang diklik
  clickedBtn.classList.add('active');
}

(function () {
  const track    = document.getElementById('blogsTrack');
  const prevBtn  = document.getElementById('prevBtn');
  const nextBtn  = document.getElementById('nextBtn');
  const dotsWrap = document.getElementById('blogsDots');
  const cards    = document.querySelectorAll('.blog-card');

  let currentIndex = 0;
  let cardsVisible = getCardsVisible();
  let totalSlides  = Math.ceil(cards.length / cardsVisible);

  function getCardsVisible() {
    if (window.innerWidth <= 580) return 1;
    if (window.innerWidth <= 900) return 2;
    return 3;
  }

  function buildDots() {
    cardsVisible = getCardsVisible();
    totalSlides  = Math.ceil(cards.length / cardsVisible);
    dotsWrap.innerHTML = '';
    for (let i = 0; i < totalSlides; i++) {
      const d = document.createElement('div');
      d.className = 'blog-dot' + (i === 0 ? ' active' : '');
      d.addEventListener('click', () => goTo(i));
      dotsWrap.appendChild(d);
    }
  }

  function updateDots() {
    document.querySelectorAll('.blog-dot').forEach((d, i) => {
      d.classList.toggle('active', i === currentIndex);
    });
  }

  function goTo(index) {
    currentIndex = Math.max(0, Math.min(index, totalSlides - 1));
    const cardWidth = cards[0].offsetWidth;
    const gap       = 20; /* 1.25rem */
    const offset    = currentIndex * cardsVisible * (cardWidth + gap);
    track.style.transform = `translateX(-${offset}px)`;
    prevBtn.disabled = currentIndex === 0;
    nextBtn.disabled = currentIndex === totalSlides - 1;
    updateDots();
  }

  window.scrollBlogs = function (dir) { goTo(currentIndex + dir); };

  /* Init */
  buildDots();
  goTo(0);

  /* Re-init on resize */
  window.addEventListener('resize', () => { buildDots(); goTo(0); });

  /* Touch/swipe support */
  let startX = 0;
  track.addEventListener('touchstart', e => { startX = e.touches[0].clientX; }, { passive: true });
  track.addEventListener('touchend',   e => {
    const diff = startX - e.changedTouches[0].clientX;
    if (Math.abs(diff) > 50) window.scrollBlogs(diff > 0 ? 1 : -1);
  });
})();