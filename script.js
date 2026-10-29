(() => {
  'use strict';
  const root = document.documentElement;
  const menu = document.querySelector('.menu');
  const nav = document.querySelector('#navigation');
  if (menu && nav) {
    menu.hidden = false;
    root.classList.add('js-nav');
    const setMenu = open => { menu.setAttribute('aria-expanded', String(open)); nav.classList.toggle('open', open); };
    menu.addEventListener('click', () => setMenu(menu.getAttribute('aria-expanded') !== 'true'));
    nav.addEventListener('click', event => { if (event.target.closest('a')) setMenu(false); });
    document.addEventListener('keydown', event => { if (event.key === 'Escape' && menu.getAttribute('aria-expanded') === 'true') { setMenu(false); menu.focus(); } });
  }
  const target = window.BBX_CONFIG?.researchDestination;
  if (typeof target === 'string' && (target === '/research/' || target === 'https://blackboxresearch.pro/')) {
    document.querySelectorAll('[data-research]').forEach(link => link.href = target);
  }
  const reduced = matchMedia('(prefers-reduced-motion: reduce)');
  const motion = document.querySelector('.motion');
  let off = reduced.matches;
  try { off ||= localStorage.getItem('bbx-motion') === 'off'; } catch {}
  function applyMotion() {
    root.dataset.motion = off || reduced.matches ? 'off' : 'on';
    if (motion) { motion.textContent = `Motion: ${root.dataset.motion}`; motion.setAttribute('aria-pressed', String(root.dataset.motion === 'off')); }
  }
  applyMotion();
  if (motion) { motion.hidden = false; motion.addEventListener('click', () => { off = !off; applyMotion(); try { localStorage.setItem('bbx-motion',off ? 'off' : 'on'); } catch {} }); }
  reduced.addEventListener('change',applyMotion);
  if ('IntersectionObserver' in window && !document.body.classList.contains('research')) {
    const observer = new IntersectionObserver(entries => entries.forEach(entry => {
      if (!entry.isIntersecting) return;
      if (root.dataset.motion !== 'off') entry.target.classList.add('enter');
      observer.unobserve(entry.target);
    }), {threshold:.12});
    document.querySelectorAll('.reveal').forEach(item => observer.observe(item));
  }
  if (root.dataset.motion !== 'off') document.querySelector('.sheen')?.classList.add('attend');
})();
