const root = document.documentElement;
const hero = document.querySelector('.hero');
const dock = document.getElementById('dock');
const dockLogo = document.getElementById('dockLogo');
const services = document.querySelectorAll('.service');
const detail = document.getElementById('serviceDetail');
let manualOpen = false;
function clamp(n,min,max){return Math.max(min,Math.min(max,n));}
function update(){
  const heroHeight = hero.offsetHeight - innerHeight;
  const p = clamp(scrollY / heroHeight, 0, 1);
  root.style.setProperty('--p', p.toFixed(3));
  if(scrollY > 520 && !manualOpen) dock.classList.add('collapsed');
  if(scrollY <= 520) { dock.classList.remove('collapsed'); manualOpen = false; }
}
addEventListener('scroll', update, {passive:true});
addEventListener('resize', update);
dockLogo.addEventListener('click', () => { manualOpen = !manualOpen; dock.classList.toggle('collapsed', !manualOpen && scrollY>520); });
services.forEach(btn => btn.addEventListener('click', () => { detail.textContent = btn.dataset.detail; }));
update();
