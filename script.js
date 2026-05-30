const nav = document.getElementById('glassNav');
const navToggle = document.getElementById('navToggle');
const serviceDetail = document.getElementById('serviceDetail');
const serviceCards = document.querySelectorAll('.service-card');

let manuallyOpen = false;
function setNavState() {
  const shouldCollapse = window.scrollY > 80 && !manuallyOpen;
  nav.classList.toggle('collapsed', shouldCollapse);
}
window.addEventListener('scroll', () => {
  if (window.scrollY > 80) manuallyOpen = false;
  setNavState();
}, { passive: true });
navToggle.addEventListener('click', () => {
  if (window.scrollY > 80) {
    manuallyOpen = nav.classList.contains('collapsed');
    nav.classList.toggle('collapsed');
  }
});
setNavState();

document.querySelectorAll('.nav-links a').forEach(link => {
  link.addEventListener('click', () => {
    manuallyOpen = false;
    setTimeout(setNavState, 420);
  });
});

serviceCards.forEach(card => {
  card.addEventListener('click', () => {
    serviceCards.forEach(c => c.classList.remove('active'));
    card.classList.add('active');
    serviceDetail.textContent = card.dataset.detail;
  });
});

const observer = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) entry.target.classList.add('show');
  });
}, { threshold: 0.12 });

document.querySelectorAll('.section h2,.about-grid p,.service-card,.service-detail,.contact-panel').forEach(el => {
  el.classList.add('reveal');
  observer.observe(el);
});
