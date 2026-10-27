/* ============================================================
   MAIN.JS — Core Portfolio Functionality  (FIXED)
   Cursor · Navbar · Loader · Theme · Contact Form · Misc
   ============================================================ */

'use strict';

/* ── Helpers ─────────────────────────────────────────────────── */
function $(sel, ctx) { return (ctx || document).querySelector(sel); }
function $$(sel, ctx) { return Array.from((ctx || document).querySelectorAll(sel)); }
function qs(id) { return document.getElementById(id); }

/* ═══════════════════════════════════════════════════════════════
   Run everything inside DOMContentLoaded so elements exist
   ═══════════════════════════════════════════════════════════════ */
document.addEventListener('DOMContentLoaded', () => {

  /* ── 1. LOADER ─────────────────────────────────────────────── */
  const loader = qs('loader');

  const hideLoader = () => {
    if (loader) loader.classList.add('hidden');
    document.body.style.overflow = '';
    document.dispatchEvent(new CustomEvent('portfolioReady'));
  };

  // Hide after assets load; fallback after 2.5 s
  window.addEventListener('load', () => setTimeout(hideLoader, 1600));
  setTimeout(hideLoader, 2600);           // safety fallback

  const isTouchDevice = () => window.matchMedia('(pointer: coarse)').matches;

  /* ── 3. MOUSE GLOW ─────────────────────────────────────────── */
  const mouseGlow = qs('mouseGlow');
  if (mouseGlow && !isTouchDevice()) {
    document.addEventListener('mousemove', (e) => {
      mouseGlow.style.left = e.clientX + 'px';
      mouseGlow.style.top = e.clientY + 'px';
    });
  }

  /* ── 4. SMOOTH SCROLL (Lenis) ──────────────────────────────── */
  let lenis = null;
  try {
    if (typeof Lenis !== 'undefined') {
      lenis = new Lenis({
        duration: 1.2,
        easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
        smooth: true,
        smoothTouch: false,
      });
      function rafLenis(time) { lenis.raf(time); requestAnimationFrame(rafLenis); }
      requestAnimationFrame(rafLenis);
    }
  } catch (e) {
    console.warn('Lenis init failed, using native scroll.');
  }

  /* ── 5. SCROLL PROGRESS BAR ────────────────────────────────── */
  const progressBar = qs('scrollProgress');
  const backToTop = qs('backToTop');
  const navbar = qs('navbar');

  function onScroll() {
    const scrollTop = window.scrollY;
    const docHeight = document.documentElement.scrollHeight - window.innerHeight;
    const pct = docHeight > 0 ? (scrollTop / docHeight) * 100 : 0;

    if (progressBar) progressBar.style.width = Math.min(pct, 100) + '%';

    if (navbar) navbar.classList.toggle('scrolled', scrollTop > 80);

    if (backToTop) backToTop.classList.toggle('visible', scrollTop > 400);

    updateActiveNavLink();
  }

  window.addEventListener('scroll', onScroll, { passive: true });

  /* ── 6. ACTIVE NAV LINK ────────────────────────────────────── */
  const navLinkEls = $$('.nav-link[data-section]');
  const sectionEls = $$('section[id]');

  function updateActiveNavLink() {
    const scrollY = window.scrollY + 140;
    sectionEls.forEach(sec => {
      const top = sec.offsetTop;
      const height = sec.offsetHeight;
      const id = sec.getAttribute('id');
      if (scrollY >= top && scrollY < top + height) {
        navLinkEls.forEach(link => {
          link.classList.toggle('active', link.dataset.section === id);
        });
      }
    });
  }

  /* ── 7. NAVBAR HAMBURGER ───────────────────────────────────── */
  const hamburger = qs('hamburger');
  const navLinksEl = qs('navLinks');

  if (hamburger && navLinksEl) {
    hamburger.addEventListener('click', () => {
      const isOpen = hamburger.classList.toggle('open');
      navLinksEl.classList.toggle('open', isOpen);
      document.body.style.overflow = isOpen ? 'hidden' : '';
    });

    $$('.nav-link', navLinksEl).forEach(link => {
      link.addEventListener('click', () => {
        hamburger.classList.remove('open');
        navLinksEl.classList.remove('open');
        document.body.style.overflow = '';
      });
    });
  }

  /* ── 8. SMOOTH ANCHOR SCROLL ───────────────────────────────── */
  $$('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', (e) => {
      const href = anchor.getAttribute('href');
      if (href === '#' || href === '#!') return;
      const target = document.querySelector(href);
      if (!target) return;
      e.preventDefault();
      const offset = 80;
      const top = target.getBoundingClientRect().top + window.scrollY - offset;
      if (lenis) {
        lenis.scrollTo(top, { duration: 1.4 });
      } else {
        window.scrollTo({ top, behavior: 'smooth' });
      }
    });
  });

  /* ── 9. BACK TO TOP ────────────────────────────────────────── */
  if (backToTop) {
    backToTop.addEventListener('click', () => {
      if (lenis) lenis.scrollTo(0, { duration: 1.4 });
      else window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  }

  /* ── 10. THEME TOGGLE ──────────────────────────────────────── */
  const themeToggle = qs('themeToggle');
  const themeIcon = qs('themeIcon');
  const body = document.body;

  function applyTheme(theme) {
    body.classList.toggle('light-theme', theme === 'light');
    body.classList.toggle('dark-theme', theme !== 'light');
    if (themeIcon) themeIcon.className = theme === 'light' ? 'fas fa-sun' : 'fas fa-moon';
    localStorage.setItem('hp-theme', theme);
  }

  applyTheme(localStorage.getItem('hp-theme') || 'dark');

  if (themeToggle) {
    themeToggle.addEventListener('click', () => {
      applyTheme(body.classList.contains('light-theme') ? 'dark' : 'light');
    });
  }

  /* ── 11. TYPED.JS ──────────────────────────────────────────── */
  const typedEl = qs('typedText');
  if (typedEl && typeof Typed !== 'undefined') {
    new Typed(typedEl, {
      strings: [
        'Software Developer',
        'AI / ML Enthusiast',
        'Full Stack Developer',
        'Python Developer',
        'Data Analyst',
        'Problem Solver',
      ],
      typeSpeed: 60,
      backSpeed: 38,
      backDelay: 2200,
      loop: true,
      showCursor: false,
    });
  }

  /* ── 12. COUNTERS (vanilla fallback when GSAP absent) ───────── */
  function animateCounter(el) {
    if (el._counted) return;
    el._counted = true;
    const target = parseInt(el.getAttribute('data-count'), 10) || 0;
    const duration = 2000;
    const steps = Math.ceil(duration / 16);
    let frame = 0;
    const timer = setInterval(() => {
      frame++;
      el.textContent = Math.floor((frame / steps) * target);
      if (frame >= steps) { el.textContent = target; clearInterval(timer); }
    }, 16);
  }

  function initCounters() {
    if (typeof gsap !== 'undefined') return; // GSAP handles it in animations.js
    const obs = new IntersectionObserver((entries) => {
      entries.forEach(e => { if (e.isIntersecting) animateCounter(e.target); });
    }, { threshold: 0.5 });
    $$('.stat-num[data-count]').forEach(el => obs.observe(el));
  }
  initCounters();

  /* ── 13. SKILL BARS (triggered by IntersectionObserver) ─────── */
  function animateSkillBars() {
    $$('.skill-card__fill').forEach(fill => {
      const pct = fill.getAttribute('data-pct') || '80';
      fill.style.transition = 'width 1.4s cubic-bezier(.4,0,.2,1)';
      // small delay so CSS transition plays
      requestAnimationFrame(() => {
        requestAnimationFrame(() => { fill.style.width = pct + '%'; });
      });
    });
  }

  const stackSection = qs('stack');
  if (stackSection) {
    let barsAnimated = false;
    const stackObs = new IntersectionObserver((entries) => {
      if (entries[0].isIntersecting && !barsAnimated) {
        barsAnimated = true;
        setTimeout(animateSkillBars, 400);
        stackObs.disconnect();
      }
    }, { threshold: 0.1 });
    stackObs.observe(stackSection);
  }

  /* ── 14. SERVICES RENDER ───────────────────────────────────── */
  const SERVICES = [
    { icon: 'fas fa-layer-group', title: 'Full Stack Development', desc: 'End-to-end web apps from database design to polished UI. Scalable, secure, and performant.' },
    { icon: 'fas fa-palette', title: 'Frontend Development', desc: 'Pixel-perfect interfaces with smooth animations, responsive layouts, and great UX.' },
    { icon: 'fas fa-server', title: 'Backend Development', desc: 'Robust REST APIs, microservices, and server architectures with Node.js & Express.' },
    { icon: 'fas fa-database', title: 'Database Design', desc: 'Optimised schemas for MongoDB and MySQL, with efficient queries and data modeling.' },
    { icon: 'fas fa-mobile-alt', title: 'UI/UX Design', desc: 'Mobile-first design systems, Figma prototypes, and accessible component libraries.' },
  ];

  const servicesGrid = qs('servicesGrid');
  if (servicesGrid) {
    servicesGrid.innerHTML = SERVICES.map((s, i) => `
      <div class="service-card" data-aos="fade-up" data-aos-delay="${100 + i * 60}">
        <div class="service-card__icon"><i class="${s.icon}"></i></div>
        <h3>${s.title}</h3>
        <p>${s.desc}</p>
      </div>
    `).join('');
  }

  /* ── 15. CERTIFICATES SLIDER ──────────────────────────────── */
  const CERTIFICATES = [
    // ── 2026 ──────────────────────────────────────────────────
    {
      issuer: 'SAM AI Technologies',
      logo: 'fas fa-laptop-code',
      title: 'Web Development Internship — Certificate of Completion',
      date: 'Jul 2026',
      type: 'Certificate of Completion',
      file: 'assets/certificates/Certificate_ SamAI_Prajapati Harsh Ashwinbhai .pdf',
    },
    {
      issuer: 'SAM AI Technologies',
      logo: 'fas fa-file-alt',
      title: 'Web Development Internship — Letter of Recommendation',
      date: 'Jul 2026',
      type: 'Letter of Recommendation',
      file: 'assets/certificates/LOR_SamAI_ Prajapati Harsh Ashwinbhai .pdf',
    },
    {
      issuer: 'SmartBridge',
      logo: 'fas fa-chart-line',
      title: 'Virtual Internship — Certificate of Completion',
      date: 'Jul 2026',
      type: 'Certificate of Completion',
      file: 'assets/certificates/Smart bridge_Harsh Prajapati _certificate.pdf',
    },
    {
      issuer: 'CodeAlpha',
      logo: 'fas fa-certificate',
      title: 'Internship Certificate of Completion',
      date: 'Jul 2026',
      type: 'Certificate of Completion',
      file: 'assets/certificates/Certificate_Prajapati Harsh Ashwinbhai.pdf',
    },
    {
      issuer: 'CodeAlpha',
      logo: 'fas fa-file-signature',
      title: 'Internship Letter of Recommendation',
      date: 'Jul 2026',
      type: 'Letter of Recommendation',
      file: 'assets/certificates/LOR_Prajapati Harsh Ashwinbhai.pdf',
    },
    {
      issuer: 'CSRBOX – AICTE IBM SkillsBuild',
      logo: 'fab fa-ibm',
      title: 'IBM SkillsBuild AI Strategy & Business Intelligence Internship',
      date: 'Mar–Apr 2026',
      type: 'Certificate of Achievement',
      file: 'assets/certificates/Certificate_IBM_Mar2026.pdf',
    },
    // ── Sep 2024 ───────────────────────────────────────────────
    {
      issuer: 'SVIT Vasad – MECIA Hacks 2.0',
      logo: 'fas fa-trophy',
      title: 'MECIA Hacks 2.0 — 24-Hour Hackathon (Team: Tech Explorer)',
      date: 'Sep 2024',
      type: 'Certificate of Participation',
      file: 'assets/certificates/mecia_hacks.pdf',
    },
    // ── Aug 2024 ───────────────────────────────────────────────
    {
      issuer: 'TOPS Technologies',
      logo: 'fas fa-layer-group',
      title: 'Trends and Future of Full Stack Development',
      date: 'Aug 2024',
      type: 'Webinar Certificate',
      file: 'assets/certificates/DOC-20240810-WA0000..pdf',
    },
    {
      issuer: 'TOPS Technologies',
      logo: 'fas fa-mobile-alt',
      title: 'Building and Publishing Mobile Apps',
      date: 'Aug 2024',
      type: 'Webinar Certificate',
      file: 'assets/certificates/DOC-20240810-WA0002..pdf',
    },
    {
      issuer: 'TOPS Technologies',
      logo: 'fas fa-vial',
      title: 'Automated vs. Manual Testing',
      date: 'Aug 2024',
      type: 'Webinar Certificate',
      file: 'assets/certificates/Tops certificate..pdf',
    },
    // ── Apr 2024 ───────────────────────────────────────────────
    {
      issuer: 'Event Participation',
      logo: 'fas fa-certificate',
      title: 'Certificate of Participation',
      date: 'Apr 2024',
      type: 'ID: 30385-171-300-2014',
      file: 'assets/certificates/certificate.pdf',
    },
    // ── Feb 2024 ───────────────────────────────────────────────
    {
      issuer: 'SVIT Vasad – Coding Club',
      logo: 'fab fa-github',
      title: 'Git and GitHub Seminar',
      date: 'Feb 2024',
      type: 'Certificate of Participation',
      file: 'assets/certificates/PRAJAPATI HARSH ASHWINBHAI.pdf_1.jpg',
    },
    {
      issuer: 'SVIT Vasad – PRAKARSH\'24',
      logo: 'fas fa-star',
      title: 'Stellar Cosmos — National Level Technical Symposium',
      date: 'Feb 2024',
      type: 'Certificate of Participation',
      file: 'assets/certificates/Harsh Prajapati _Stellar cosmos.pdf',
    },
    // ── 2024 (no exact month) ──────────────────────────────────
    {
      issuer: 'SVIT Vasad',
      logo: 'fas fa-code',
      title: 'Codemania',
      date: '2024',
      type: 'Certificate of Participation',
      file: 'assets/certificates/Harsh Ashvinbhai Prajapati_Codemania.pdf',
    },
    {
      issuer: 'SVIT Vasad',
      logo: 'fas fa-camera',
      title: 'Dark Room Event',
      date: '2024',
      type: 'Certificate of Participation',
      file: 'assets/certificates/Harsh Ashvinbhai Prajapati_DARK ROOM.pdf',
    },
    {
      issuer: 'SVIT Vasad – Webverse',
      logo: 'fas fa-globe',
      title: 'Webverse Part One — Event 1',
      date: '2024',
      type: 'Certificate of Participation',
      file: 'assets/certificates/Prajapati Harsh Ashwinbhai_webverse_part_one_event_1_certificate.pdf',
    },
    {
      issuer: 'SVIT Vasad – Webverse',
      logo: 'fas fa-globe',
      title: 'Webverse Part One — Event 2',
      date: '2024',
      type: 'Certificate of Participation',
      file: 'assets/certificates/prajapati-harsh-ashwinbhai_webverse_part_one_event_2_certificate (1).pdf',
    },
    {
      issuer: 'SVIT Vasad – Designiti',
      logo: 'fas fa-paint-brush',
      title: 'Designiti — Design Event',
      date: '2024',
      type: 'Certificate of Participation',
      file: 'assets/certificates/prajapati-harsh-ashwinbhai_designiti_certificate.pdf',
    },
    {
      issuer: 'SVIT Vasad – Converge',
      logo: 'fas fa-project-diagram',
      title: 'Converge Event',
      date: '2024',
      type: 'Certificate of Participation',
      file: 'assets/certificates/Prajapati Harsh Ashwinbhai_converge_certificate.pdf',
    },
    {
      issuer: 'SVIT Vasad – Computer Dept.',
      logo: 'fas fa-university',
      title: 'Computer Department — Certificate of Participation',
      date: '2024',
      type: 'Certificate of Participation',
      file: 'assets/certificates/Prajapati Harsh Ashwinbhai.pdf',
    },
    // ── 2023 ──────────────────────────────────────────────────
    {
      issuer: 'TEDxSVIT Vasad',
      logo: 'fas fa-microphone-alt',
      title: 'TEDxSVIT Vasad 2023 — The Unrevealed Realm',
      date: 'Sep 2023',
      type: 'Certificate of Appreciation',
      file: 'assets/certificates/Harsh Prajapati.pdf',
    },
  ];

  const certsTrack = qs('certsTrack');
  if (certsTrack) {
    certsTrack.innerHTML = CERTIFICATES.map(c => `
      <div class="cert-card">
        <div class="cert-card__issuer">
          <div class="cert-card__issuer-logo"><i class="${c.logo}"></i></div>
          <div>
            <span class="cert-card__issuer-name">${c.issuer}</span>
            <span class="cert-card__issuer-type">${c.type}</span>
          </div>
        </div>
        <h3>${c.title}</h3>
        <p class="cert-card__date"><i class="fas fa-calendar"></i> ${c.date}</p>
        <a href="${c.file}" target="_blank" class="cert-card__verify">
          <i class="fas fa-external-link-alt"></i> View Certificate
        </a>
      </div>
    `).join('');

    // Slider
    let certIndex = 0;
    const certPrev = qs('certPrev');
    const certNext = qs('certNext');

    function updateSlider() {
      const cards = $$('.cert-card', certsTrack);
      if (!cards.length) return;
      const cardW = cards[0].getBoundingClientRect().width || 340;
      const gap = 24;
      const trackW = certsTrack.parentElement.offsetWidth;
      const visible = Math.max(1, Math.floor(trackW / (cardW + gap)));
      const maxIdx = Math.max(0, cards.length - visible);
      certIndex = Math.max(0, Math.min(certIndex, maxIdx));
      certsTrack.style.transform = `translateX(-${certIndex * (cardW + gap)}px)`;
    }

    if (certPrev) certPrev.addEventListener('click', () => { certIndex = Math.max(0, certIndex - 1); updateSlider(); });
    if (certNext) certNext.addEventListener('click', () => { certIndex++; updateSlider(); });
    window.addEventListener('resize', updateSlider);
  }

  /* ── 18. CONTACT FORM ─────────────────────────────────────── */
  const contactForm = qs('contactForm');
  const submitBtn = qs('submitBtn');
  const submitText = qs('submitText');
  const submitIcon = qs('submitIcon');
  const formSuccess = qs('formSuccess');

  function validateField(id, errorId, rules) {
    const el = qs(id);
    const err = qs(errorId);
    const val = el ? el.value.trim() : '';
    let msg = '';

    if (rules.required && !val) msg = 'This field is required.';
    else if (rules.email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(val)) msg = 'Enter a valid email address.';
    else if (rules.minLen && val.length < rules.minLen) msg = `Minimum ${rules.minLen} characters required.`;

    if (err) err.textContent = msg;
    if (el) el.parentElement.style.borderColor = msg ? 'rgba(239,68,68,.6)' : '';
    return !msg;
  }

  if (contactForm) {
    contactForm.addEventListener('submit', async (e) => {
      e.preventDefault();

      const v1 = validateField('name', 'nameError', { required: true, minLen: 2 });
      const v2 = validateField('email', 'emailError', { required: true, email: true });
      const v3 = validateField('subject', 'subjectError', { required: true });
      const v4 = validateField('message', 'messageError', { required: true, minLen: 10 });
      if (!v1 || !v2 || !v3 || !v4) return;

      if (submitBtn) submitBtn.disabled = true;
      if (submitText) submitText.textContent = 'Sending…';
      if (submitIcon) submitIcon.className = 'fas fa-spinner fa-spin';

      try {
        // ── EmailJS send ──────────────────────────────────────
        // Replace SERVICE_ID and TEMPLATE_ID with your EmailJS values
        await emailjs.send(
          'service_k7m3x2p',
          'template_dnzry1d',
          {
            from_name: document.getElementById('name').value.trim(),
            from_email: document.getElementById('email').value.trim(),
            phone: document.getElementById('phone') ? document.getElementById('phone').value.trim() : '',
            subject: document.getElementById('subject').value.trim(),
            message: document.getElementById('message').value.trim(),
            to_email: 'harshashvinbhai27@gmail.com',
          }
        );

        // ── Success ───────────────────────────────────────────
        if (submitText) submitText.textContent = 'Send Message';
        if (submitIcon) submitIcon.className = 'fas fa-paper-plane';
        if (formSuccess) {
          formSuccess.classList.add('show');
          setTimeout(() => formSuccess.classList.remove('show'), 5000);
        }
        contactForm.reset();
        $$('.input-wrap', contactForm).forEach(w => w.style.borderColor = '');

      } catch (err) {
        // ── Error ─────────────────────────────────────────────
        if (submitText) submitText.textContent = 'Failed — Try Again';
        if (submitIcon) submitIcon.className = 'fas fa-exclamation-triangle';
        console.error('EmailJS error:', err);
      } finally {
        if (submitBtn) submitBtn.disabled = false;
      }
    });

    // Live validation on blur
    ['name', 'email', 'subject', 'message'].forEach(id => {
      const el = qs(id);
      if (el) {
        el.addEventListener('blur', () => {
          const rules = id === 'email' ? { required: true, email: true }
            : id === 'message' ? { required: true, minLen: 10 }
              : { required: true };
          validateField(id, id + 'Error', rules);
        });
        el.addEventListener('input', () => {
          const errEl = qs(id + 'Error');
          if (errEl && errEl.textContent) validateField(id, id + 'Error',
            id === 'email' ? { required: true, email: true }
              : id === 'message' ? { required: true, minLen: 10 }
                : { required: true }
          );
        });
      }
    });
  }

  /* ── 19. PROJECT MODAL ────────────────────────────────────── */
  const modalOverlay = qs('projectModal');
  const modalInner = qs('modalInner');
  const modalClose = qs('modalClose');

  function openModal(project) {
    if (!project || !modalOverlay || !modalInner) return;
    modalInner.innerHTML = `
      <div class="modal__gallery">
        <span style="font-size:5rem">${project.emoji || '🚀'}</span>
      </div>
      <h2 class="modal__title">${project.title}</h2>
      <p class="modal__subtitle">${project.desc}</p>
      <div class="modal__grid">
        <div class="modal__section">
          <h4>✦ Key Features</h4>
          <ul>${(project.features || []).map(f => `<li>${f}</li>`).join('')}</ul>
        </div>
        <div class="modal__section">
          <h4>✦ Challenges & Solutions</h4>
          <ul>${(project.challenges || []).map(c => `<li>${c}</li>`).join('')}</ul>
        </div>
      </div>
      <div class="modal__section" style="margin-bottom:20px">
        <h4>✦ Tech Stack</h4>
        <div class="modal__tech-tags">${(project.tags || []).map(t => `<span class="tag">${t}</span>`).join('')}</div>
      </div>
      <div class="modal__actions">
        ${project.live ? `<a href="${project.live}"   target="_blank" rel="noopener" class="btn btn--primary btn--glow"><i class="fas fa-external-link-alt"></i> Live Demo</a>` : ''}
        ${project.github ? `<a href="${project.github}" target="_blank" rel="noopener" class="btn btn--outline"><i class="fab fa-github"></i> View Code</a>` : ''}
      </div>
    `;
    modalOverlay.classList.add('open');
    document.body.style.overflow = 'hidden';
  }

  function closeModal() {
    if (modalOverlay) modalOverlay.classList.remove('open');
    document.body.style.overflow = '';
  }

  if (modalClose) modalClose.addEventListener('click', closeModal);
  if (modalOverlay) modalOverlay.addEventListener('click', (e) => { if (e.target === modalOverlay) closeModal(); });
  document.addEventListener('keydown', (e) => { if (e.key === 'Escape') closeModal(); });

  // Expose globally for onclick in dynamically rendered project cards
  window.openProjectModal = openModal;

  /* ── 20. AOS INIT ─────────────────────────────────────────── */
  if (typeof AOS !== 'undefined') {
    AOS.init({ duration: 700, easing: 'ease-out-cubic', once: true, offset: 60 });
  }

  /* ── 21. VANILLA TILT (on project cards after render) ───────── */
  function initTilt() {
    if (typeof VanillaTilt !== 'undefined') {
      VanillaTilt.init($$('.project-card'), {
        max: 6, speed: 400, glare: true, 'max-glare': 0.06, scale: 1.02,
      });
    }
  }
  // Wait until projects are rendered
  document.addEventListener('contentRendered', initTilt);
  // Also try after a delay
  setTimeout(initTilt, 2000);

  /* ── 22. STACK FILTER ─────────────────────────────────────── */
  // Use event delegation so it works even after re-render
  const stackSection2 = qs('stack');
  if (stackSection2) {
    stackSection2.addEventListener('click', (e) => {
      const btn = e.target.closest('.filter-btn');
      if (!btn) return;
      $$('.filter-btn', stackSection2).forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      const filter = btn.dataset.filter;
      $$('#stackGrid .skill-card').forEach(card => {
        const show = filter === 'all' || card.dataset.cat === filter;
        card.style.display = show ? '' : 'none';
        card.style.animation = show ? 'scaleIn .35s ease both' : '';
      });
    });
  }

  /* ── 23. PROJECTS FILTER ──────────────────────────────────── */
  const projectsSection = qs('projects');
  if (projectsSection) {
    projectsSection.addEventListener('click', (e) => {
      const btn = e.target.closest('.filter-btn');
      if (!btn) return;
      $$('.filter-btn', projectsSection).forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      const filter = btn.dataset.filter;
      $$('#projectsGrid .project-card').forEach(card => {
        const cats = (card.dataset.cat || '').split(' ');
        const show = filter === 'all' || cats.includes(filter);
        card.style.display = show ? '' : 'none';
        card.style.animation = show ? 'fadeInUp .4s ease both' : '';
      });
    });
  }

  /* ── 24. INTERSECTION OBSERVER for CSS animations ───────────── */
  const ioOpts = { threshold: 0.12, rootMargin: '0px 0px -40px 0px' };
  const io = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('in-view');
        io.unobserve(entry.target);
      }
    });
  }, ioOpts);

  $$('.anim-from-bottom, .anim-from-left, .anim-from-right, .anim-scale').forEach(el => io.observe(el));

  /* ── 25. PARTICLES.JS ─────────────────────────────────────── */
  if (typeof particlesJS !== 'undefined' && qs('particles-js')) {
    particlesJS('particles-js', {
      particles: {
        number: { value: 55, density: { enable: true, value_area: 900 } },
        color: { value: ['#7c3aed', '#00e5ff', '#ff4d9d'] },
        shape: { type: 'circle' },
        opacity: { value: 0.3, random: true, anim: { enable: true, speed: 0.8, opacity_min: 0.05, sync: false } },
        size: { value: 2.2, random: true },
        line_linked: { enable: true, distance: 130, color: '#7c3aed', opacity: 0.1, width: 1 },
        move: { enable: true, speed: 0.6, direction: 'none', random: true, out_mode: 'out' },
      },
      interactivity: {
        detect_on: 'canvas',
        events: {
          onhover: { enable: true, mode: 'grab' },
          onclick: { enable: true, mode: 'push' },
        },
        modes: {
          grab: { distance: 150, line_linked: { opacity: 0.45 } },
          push: { particles_nb: 3 },
        },
      },
      retina_detect: true,
    });
  }

  /* ── 26. LAZY IMAGES ──────────────────────────────────────── */
  const imgObs = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const img = entry.target;
        if (img.dataset.src) { img.src = img.dataset.src; img.removeAttribute('data-src'); }
        imgObs.unobserve(img);
      }
    });
  });
  $$('img[data-src]').forEach(img => imgObs.observe(img));

  /* ── 27. MAGNETIC BUTTONS (desktop only) ─────────────────── */
  if (!isTouchDevice()) {
    $$('.btn--primary, .btn--glow').forEach(btn => {
      btn.addEventListener('mousemove', (e) => {
        const r = btn.getBoundingClientRect();
        const x = ((e.clientX - r.left) / r.width - 0.5) * 14;
        const y = ((e.clientY - r.top) / r.height - 0.5) * 14;
        btn.style.transform = `translate(${x}px, ${y}px) scale(1.03)`;
      });
      btn.addEventListener('mouseleave', () => {
        btn.style.transform = '';
      });
    });
  }

  console.log('%c HP Portfolio ✓', 'background:#7c3aed;color:#fff;font-size:16px;font-weight:bold;padding:8px 16px;border-radius:6px;');

}); // end DOMContentLoaded
