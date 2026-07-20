/* ============================================================
   ANIMATIONS.JS — GSAP ScrollTrigger Animations  (FIXED)
   All wrapped in DOMContentLoaded + GSAP guard
   ============================================================ */

'use strict';

document.addEventListener('DOMContentLoaded', () => {

  if (typeof gsap === 'undefined') {
    console.warn('GSAP not loaded — JS animations skipped, CSS fallbacks active.');
    return;
  }

  // Register plugins
  gsap.registerPlugin(ScrollTrigger);

  /* ── Hero Entry (fired after loader hides) ───────────────── */
  document.addEventListener('portfolioReady', () => {
    const tl = gsap.timeline({ defaults: { ease: 'power3.out' } });
    tl
      .from('.hero__badge',    { opacity: 0, y: -20, duration: 0.6 },                 0.1)
      .from('.title__line',    { opacity: 0, y:  30, duration: 0.7 },                 0.25)
      .from('.title__name',    { opacity: 0, y:  40, duration: 0.8, scale: 0.95 },    0.4)
      .from('.hero__subtitle', { opacity: 0, y:  20, duration: 0.6 },                 0.55)
      .from('.hero__desc',     { opacity: 0, y:  20, duration: 0.6 },                 0.65)
      .from('.hero__actions .btn',
        { opacity: 0, y: 20, stagger: 0.1, duration: 0.5 },                          0.75)
      .from('.hero__socials .social-icon',
        { opacity: 0, scale: 0.4, stagger: 0.07, duration: 0.4, ease: 'back.out(2)' }, 0.9)
      .from('.hero__scroll-hint', { opacity: 0, y: 20, duration: 0.5 },               1.1);
  });

  /* ── About Section ──────────────────────────────────────── */
  gsap.from('.about__avatar', {
    scrollTrigger: { trigger: '#about', start: 'top 78%', once: true },
    scale: 0.75, opacity: 0, duration: 1, ease: 'back.out(1.6)',
  });

  gsap.from('.about__bio, .about__details, .about__cta', {
    scrollTrigger: { trigger: '#about', start: 'top 75%', once: true },
    opacity: 0, x: 50, stagger: 0.15, duration: 0.8, ease: 'power3.out',
  });

  /* ── Stat Counter (GSAP version) ────────────────────────── */
  document.querySelectorAll('.stat-num[data-count]').forEach(el => {
    const target = parseInt(el.dataset.count, 10) || 0;
    // Guard against double-count
    if (el._gsapCounted) return;
    el._gsapCounted = true;

    gsap.from({ val: 0 }, {
      val: target,
      scrollTrigger: { trigger: el, start: 'top 88%', once: true },
      duration: 2,
      ease: 'power2.out',
      onUpdate() { el.textContent = Math.floor(this.targets()[0].val); },
      onComplete() { el.textContent = target; },
    });
  });

  /* ── Section Headings ───────────────────────────────────── */
  document.querySelectorAll('.section-header').forEach(header => {
    gsap.from(header.children, {
      scrollTrigger: { trigger: header, start: 'top 85%', once: true },
      opacity: 0, y: 24, stagger: 0.12, duration: 0.7, ease: 'power3.out',
    });
  });

  /* ── Tech Stack Cards ───────────────────────────────────── */
  ScrollTrigger.create({
    trigger: '#stack',
    start: 'top 90%',
    once: true,
    onEnter() {
      gsap.fromTo('#stackGrid .skill-card',
        { opacity: 0, y: 36, scale: 0.82 },
        { opacity: 1, y: 0, scale: 1, stagger: { amount: 0.7, from: 'start' }, duration: 0.45, ease: 'back.out(1.4)' }
      );
    },
  });

  /* ── Projects ───────────────────────────────────────────── */
  ScrollTrigger.create({
    trigger: '#projects',
    start: 'top 90%',
    once: true,
    onEnter() {
      gsap.fromTo('#projectsGrid .project-card',
        { opacity: 0, y: 48 },
        { opacity: 1, y: 0, stagger: 0.1, duration: 0.6, ease: 'power3.out' }
      );
    },
  });

  /* ── Timeline ───────────────────────────────────────────── */
  document.querySelectorAll('.timeline__item').forEach((item) => {
    const card = item.querySelector('.timeline__card');
    const dot  = item.querySelector('.timeline__dot');
    const isR  = item.classList.contains('timeline__item--right');

    if (card) {
      gsap.from(card, {
        scrollTrigger: { trigger: item, start: 'top 82%', once: true },
        opacity: 0, x: isR ? 60 : -60, duration: 0.75, ease: 'power3.out',
      });
    }
    if (dot) {
      gsap.from(dot, {
        scrollTrigger: { trigger: item, start: 'top 82%', once: true },
        scale: 0, duration: 0.45, delay: 0.2, ease: 'back.out(2)',
      });
    }
  });

  /* ── Services ───────────────────────────────────────────── */
  ScrollTrigger.create({
    trigger: '#services',
    start: 'top 90%',
    once: true,
    onEnter() {
      gsap.fromTo('#servicesGrid .service-card',
        { opacity: 0, y: 38 },
        { opacity: 1, y: 0, stagger: 0.07, duration: 0.5, ease: 'power3.out' }
      );
    },
  });

  /* ── Contact ────────────────────────────────────────────── */
  gsap.from('.contact__info-card', {
    scrollTrigger: { trigger: '#contact', start: 'top 78%', once: true },
    opacity: 0, x: -50, duration: 0.8, ease: 'power3.out',
  });
  gsap.from('.contact__form', {
    scrollTrigger: { trigger: '#contact', start: 'top 78%', once: true },
    opacity: 0, x: 50, duration: 0.8, ease: 'power3.out',
  });

  /* ── Footer ─────────────────────────────────────────────── */
  gsap.from('.footer__grid > *', {
    scrollTrigger: { trigger: '.footer', start: 'top 88%', once: true },
    opacity: 0, y: 24, stagger: 0.08, duration: 0.55, ease: 'power3.out',
  });

  /* ── Hero Parallax on scroll ────────────────────────────── */
  gsap.to('.hero__content', {
    scrollTrigger: { trigger: '#hero', start: 'top top', end: 'bottom top', scrub: 1.2 },
    y: -70, opacity: 0.4, ease: 'none',
  });

  gsap.to('.hero__3d', {
    scrollTrigger: { trigger: '#hero', start: 'top top', end: 'bottom top', scrub: 1.2 },
    y: 55, ease: 'none',
  });

  /* ── Magnetic nav links ─────────────────────────────────── */
  document.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('mouseenter', () => gsap.to(link, { y: -2, duration: 0.18, ease: 'power2.out' }));
    link.addEventListener('mouseleave', () => gsap.to(link, { y:  0, duration: 0.18, ease: 'power2.out' }));
  });

  /* ── Service card icon wiggle ───────────────────────────── */
  document.addEventListener('mouseover', (e) => {
    const card = e.target.closest('.service-card');
    if (!card) return;
    const icon = card.querySelector('.service-card__icon');
    if (icon) gsap.to(icon, { scale: 1.12, rotation: -8, duration: 0.28, ease: 'back.out(2)' });
  });
  document.addEventListener('mouseout', (e) => {
    const card = e.target.closest('.service-card');
    if (!card) return;
    const icon = card.querySelector('.service-card__icon');
    if (icon) gsap.to(icon, { scale: 1, rotation: 0, duration: 0.28, ease: 'power2.out' });
  });

  /* ── Social icon hover bounce ───────────────────────────── */
  document.querySelectorAll('.social-icon').forEach(icon => {
    icon.addEventListener('mouseenter', () => gsap.to(icon, { scale: 1.2, y: -4, duration: 0.25, ease: 'back.out(2)' }));
    icon.addEventListener('mouseleave', () => gsap.to(icon, { scale: 1,   y:  0, duration: 0.25, ease: 'power2.out' }));
  });

  console.log('%c GSAP Animations ✓', 'color:#7c3aed;font-weight:bold;font-family:monospace');
});
