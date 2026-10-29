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
  let syncCarousel = () => {};
  try { off ||= localStorage.getItem('bbx-motion') === 'off'; } catch {}
  function applyMotion() {
    root.dataset.motion = off || reduced.matches ? 'off' : 'on';
    if (motion) { motion.textContent = `Motion: ${root.dataset.motion}`; motion.setAttribute('aria-pressed', String(root.dataset.motion === 'off')); }
    syncCarousel();
  }
  applyMotion();
  if (motion) { motion.hidden = false; motion.addEventListener('click', () => { off = !off; applyMotion(); try { localStorage.setItem('bbx-motion',off ? 'off' : 'on'); } catch {} }); }
  reduced.addEventListener('change',applyMotion);
  const carousel = document.querySelector('.carousel');
  if (carousel) {
    const slides = [...carousel.querySelectorAll('.carousel-slide')];
    const dots = [...carousel.querySelectorAll('.carousel-dot')];
    const viewport = carousel.querySelector('.carousel-viewport');
    const controls = carousel.querySelector('.carousel-controls');
    const toggle = carousel.querySelector('.carousel-toggle');
    const count = carousel.querySelector('.carousel-count');
    let current = 0, timer = null, paused = false, hovering = false, visible = true;
    slides.forEach(slide => { slide.hidden = false; });
    controls.hidden = false;
    function show(index) {
      current = (index + slides.length) % slides.length;
      slides.forEach((slide, i) => {
        slide.classList.toggle('is-active', i === current);
        slide.setAttribute('aria-hidden', String(i !== current));
      });
      dots.forEach((dot, i) => {
        if (i === current) dot.setAttribute('aria-current', 'true');
        else dot.removeAttribute('aria-current');
      });
      count.textContent = `${String(current + 1).padStart(2, '0')} / ${String(slides.length).padStart(2, '0')}`;
    }
    syncCarousel = () => {
      clearTimeout(timer);
      const motionOff = root.dataset.motion === 'off';
      toggle.disabled = motionOff;
      toggle.textContent = motionOff ? 'Motion off' : paused ? 'Play' : 'Pause';
      toggle.setAttribute('aria-label', motionOff ? 'Automatic slides disabled by motion preference' : paused ? 'Start automatic slides' : 'Pause automatic slides');
      viewport.setAttribute('aria-live', motionOff || paused ? 'polite' : 'off');
      if (!motionOff && !paused && !hovering && visible && !document.hidden) {
        timer = setTimeout(() => { show(current + 1); syncCarousel(); }, 6000);
      }
    };
    dots.forEach((dot, i) => dot.addEventListener('click', () => { paused = true; show(i); syncCarousel(); }));
    toggle.addEventListener('click', () => { paused = !paused; syncCarousel(); });
    // Keyboard focus stops rotation until the visitor explicitly chooses Play.
    carousel.addEventListener('focusin', event => { if (!carousel.contains(event.relatedTarget) && event.target.matches(':focus-visible')) { paused = true; syncCarousel(); } });
    carousel.addEventListener('mouseenter', () => { hovering = true; syncCarousel(); });
    carousel.addEventListener('mouseleave', () => { hovering = false; syncCarousel(); });
    document.addEventListener('visibilitychange', syncCarousel);
    if ('IntersectionObserver' in window) {
      new IntersectionObserver(entries => { visible = entries[0].isIntersecting; syncCarousel(); }, { threshold: .1 }).observe(carousel);
    }
    show(0);
    syncCarousel();
  }
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
