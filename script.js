const revealItems = document.querySelectorAll('.reveal');
const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) entry.target.classList.add('is-visible');
  });
}, { threshold: 0.16 });
revealItems.forEach((item, index) => {
  item.style.setProperty('--delay', `${Math.min(index * 45, 280)}ms`);
  observer.observe(item);
});

const movingItems = document.querySelectorAll('.parallax, .ambient');
const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
function animateScroll() {
  if (reduceMotion) return;
  const y = window.scrollY || 0;
  movingItems.forEach((item) => {
    const speed = Number(item.dataset.speed || 0.08);
    item.style.transform = `translate3d(0, ${y * speed}px, 0)`;
  });
}
window.addEventListener('scroll', animateScroll, { passive: true });
animateScroll();

const root = document.documentElement;
function updateIdentityMorph() {
  if (reduceMotion) {
    root.style.setProperty('--identity-progress', '1');
    return;
  }
  const y = window.scrollY || 0;
  const progress = Math.max(0, Math.min(1, y / 170));
  root.style.setProperty('--identity-progress', progress.toFixed(3));
}
window.addEventListener('scroll', updateIdentityMorph, { passive: true });
updateIdentityMorph();
