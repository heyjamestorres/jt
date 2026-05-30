const nav = document.getElementById('glassNav');
const navToggle = document.getElementById('navToggle');
const serviceDetail = document.getElementById('serviceDetail');
const servicePills = document.querySelectorAll('.service-pill');
let navPinnedOpen = false;

function updateNav() {
  const scrolled = window.scrollY > 48;
  nav.classList.toggle('collapsed', scrolled && !navPinnedOpen);
}

window.addEventListener('scroll', () => {
  if (window.scrollY <= 48) navPinnedOpen = false;
  if (window.scrollY > 48 && !nav.matches(':hover')) navPinnedOpen = false;
  updateNav();
}, { passive: true });

navToggle.addEventListener('click', () => {
  if (window.scrollY > 48) {
    navPinnedOpen = nav.classList.contains('collapsed');
    updateNav();
  }
});

document.querySelectorAll('.nav-links a').forEach(link => {
  link.addEventListener('click', () => {
    navPinnedOpen = false;
    setTimeout(updateNav, 500);
  });
});

servicePills.forEach(pill => {
  pill.addEventListener('click', () => {
    servicePills.forEach(p => p.classList.remove('active'));
    pill.classList.add('active');
    serviceDetail.textContent = pill.dataset.detail;
  });
});

const revealObserver = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) entry.target.classList.add('show');
  });
}, { threshold: 0.16 });

document.querySelectorAll('.reveal').forEach(el => revealObserver.observe(el));
updateNav();
