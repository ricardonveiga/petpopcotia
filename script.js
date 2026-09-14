// ================= HEADER SCROLL STATE =================
const header = document.getElementById('header');
function onScroll(){
  header.classList.toggle('is-scrolled', window.scrollY > 40);
}
onScroll();
window.addEventListener('scroll', onScroll, { passive: true });

// ================= MOBILE MENU =================
const menuToggle = document.getElementById('menu-toggle');
const navMobile = document.getElementById('nav-mobile');
menuToggle.addEventListener('click', () => {
  const isOpen = navMobile.classList.toggle('is-open');
  menuToggle.setAttribute('aria-expanded', String(isOpen));
  menuToggle.classList.toggle('is-open', isOpen);
});
navMobile.querySelectorAll('a').forEach(link => {
  link.addEventListener('click', () => {
    navMobile.classList.remove('is-open');
    menuToggle.setAttribute('aria-expanded', 'false');
  });
});

// ================= HERO VIDEO CROSSFADE =================
const heroVideos = [document.getElementById('hero-video-1'), document.getElementById('hero-video-2')].filter(Boolean);
if (heroVideos.length === 2) {
  let current = 0;
  const swap = () => {
    const next = current === 0 ? 1 : 0;
    heroVideos[next].currentTime = 0;
    heroVideos[next].play().catch(() => {});
    heroVideos[next].classList.add('is-active');
    heroVideos[current].classList.remove('is-active');
    current = next;
  };
  heroVideos.forEach((video, i) => {
    video.addEventListener('ended', swap);
    video.addEventListener('error', () => {
      video.style.display = 'none';
    });
  });
  heroVideos[0].play().catch(() => {});
}

// ================= TABS (SERVIÇOS) =================
const tabButtons = document.querySelectorAll('.tab-btn');
const tabPanels = document.querySelectorAll('.tab-panel');
tabButtons.forEach(btn => {
  btn.addEventListener('click', () => {
    tabButtons.forEach(b => { b.classList.remove('is-active'); b.setAttribute('aria-selected', 'false'); });
    tabPanels.forEach(p => p.classList.remove('is-active'));
    btn.classList.add('is-active');
    btn.setAttribute('aria-selected', 'true');
    document.getElementById(`panel-${btn.dataset.tab}`).classList.add('is-active');
  });
});

// ================= SUBTABS (BANHO + TOSA) =================
const subtabButtons = document.querySelectorAll('.subtab-btn');
const subtabPanels = document.querySelectorAll('.subtab-panel');
subtabButtons.forEach(btn => {
  btn.addEventListener('click', () => {
    subtabButtons.forEach(b => b.classList.remove('is-active'));
    subtabPanels.forEach(p => p.classList.remove('is-active'));
    btn.classList.add('is-active');
    document.getElementById(`subpanel-${btn.dataset.subtab}`).classList.add('is-active');
  });
});

// ================= SCROLL REVEAL =================
const animatedEls = document.querySelectorAll('[data-animate]');
const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('is-visible');
      revealObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.15 });
animatedEls.forEach(el => revealObserver.observe(el));

// ================= HERO PARALLAX =================
const heroShapes = document.querySelector('.hero-shapes');
const heroSection = document.querySelector('.hero');
window.addEventListener('scroll', () => {
  if (!heroShapes || !heroSection) return;
  const rect = heroSection.getBoundingClientRect();
  if (rect.bottom < 0 || rect.top > window.innerHeight) return;
  const offset = window.scrollY * 0.35;
  heroShapes.style.transform = `translateY(${offset}px)`;
}, { passive: true });

// ================= FOOTER YEAR =================
const yearEl = document.getElementById('year');
if (yearEl) yearEl.textContent = new Date().getFullYear();
