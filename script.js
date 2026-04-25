// ============================================
// MENNA ABDELKADER · PORTFOLIO
// ============================================

// Year in footer
document.getElementById('year').textContent = new Date().getFullYear();

// Nav shrink on scroll
const nav = document.getElementById('nav');
const onScroll = () => {
  if (window.scrollY > 20) nav.classList.add('scrolled');
  else nav.classList.remove('scrolled');
};
window.addEventListener('scroll', onScroll, { passive: true });
onScroll();

// Mobile nav toggle
const toggle = document.getElementById('navToggle');
const links  = document.querySelector('.nav-links');
toggle.addEventListener('click', () => {
  toggle.classList.toggle('open');
  links.classList.toggle('open');
});
links.addEventListener('click', (e) => {
  if (e.target.tagName === 'A') {
    toggle.classList.remove('open');
    links.classList.remove('open');
  }
});

// Reveal on scroll via IntersectionObserver
const revealEls = document.querySelectorAll('.reveal');
const io = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        io.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.12, rootMargin: '0px 0px -60px 0px' }
);
revealEls.forEach((el) => io.observe(el));

// Gentle parallax on profile card
const card = document.querySelector('.profile-card');
if (card && window.matchMedia('(pointer: fine)').matches) {
  const hero = document.querySelector('.hero');
  hero.addEventListener('mousemove', (e) => {
    const rect = hero.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top)  / rect.height - 0.5;
    card.style.transform = `perspective(900px) rotateY(${x * 6}deg) rotateX(${-y * 6}deg)`;
  });
  hero.addEventListener('mouseleave', () => {
    card.style.transform = '';
  });
}

// Animate stat numbers once in view
const stats = document.querySelectorAll('.stat-num');
const statObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) return;
      const el = entry.target;
      const target = parseInt(el.textContent, 10);
      const suffix = el.textContent.replace(/[0-9]/g, '');
      let current = 0;
      const duration = 1200;
      const start = performance.now();

      const step = (now) => {
        const progress = Math.min((now - start) / duration, 1);
        const eased = 1 - Math.pow(1 - progress, 3);
        current = Math.floor(target * eased);
        el.textContent = current + suffix;
        if (progress < 1) requestAnimationFrame(step);
        else el.textContent = target + suffix;
      };
      requestAnimationFrame(step);
      statObserver.unobserve(el);
    });
  },
  { threshold: 0.5 }
);
stats.forEach((s) => statObserver.observe(s));
