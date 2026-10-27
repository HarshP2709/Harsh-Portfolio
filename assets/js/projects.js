/* ============================================================
   PROJECTS.JS — Project Data & Rendering  (FIXED)
   Must load before main.js so window.PROJECTS is available
   ============================================================ */

'use strict';

/* ── PROJECT DATA ───────────────────────────────────────────── */
window.PROJECTS = [
  {
    id: 1,
    title: 'Compare Kart — Price Comparison Platform',
    desc: 'Web-based application that allows users to compare product prices across multiple online shopping platforms with a user-friendly interface and real-time price comparison features.',
    emoji: '🛒',
    tags: ['TypeScript', 'HTML', 'CSS', 'JavaScript', 'Web Scraping'],
    cat: 'fullstack',
    badge: 'Featured', badgeClass: 'badge--featured',
    live: '#', github: 'https://github.com/HarshP2709/PriceComapre-main',
    features: ['Compare prices across multiple shopping platforms', 'User-friendly product search interface', 'Real-time price data retrieval', 'Clean and responsive UI', 'Product detail display'],
    challenges: ['Integrating data from multiple e-commerce sources', 'Building a consistent UI across varied data formats', 'Optimising real-time data fetch performance'],
  },
  {
    id: 2,
    title: 'E-Commerce Project',
    desc: 'Full-featured e-commerce web application with product listings, shopping cart, order management, and a clean modern shopping experience built with JavaScript.',
    emoji: '🏪',
    tags: ['JavaScript', 'HTML5', 'CSS3', 'DOM Manipulation'],
    cat: 'fullstack',
    badge: 'Full Stack', badgeClass: 'badge--fullstack',
    live: '#', github: 'https://github.com/HarshP2709/E-cmmecrce-Project',
    features: ['Product listing & search', 'Shopping cart management', 'Order summary & checkout flow', 'Responsive design', 'Dynamic DOM rendering'],
    challenges: ['Managing cart state across pages', 'Building a smooth checkout UX', 'Keeping UI consistent on mobile'],
  },
  {
    id: 3,
    title: 'Social Media App',
    desc: 'A social media platform with user feeds, post creation, likes, follows, and real-time interaction features — built with JavaScript.',
    emoji: '📱',
    tags: ['JavaScript', 'HTML5', 'CSS3', 'LocalStorage'],
    cat: 'fullstack',
    badge: 'Full Stack', badgeClass: 'badge--fullstack',
    live: '#', github: 'https://github.com/HarshP2709/Social-Media',
    features: ['User posts & feeds', 'Like and comment system', 'Follow / unfollow users', 'Responsive mobile-first layout', 'Dynamic content rendering'],
    challenges: ['Managing user state without a backend', 'Building a smooth feed update experience', 'Handling UI interactions efficiently'],
  },
  {
    id: 4,
    title: 'Music Player',
    desc: 'A feature-rich browser-based music player with playlist management, playback controls, progress bar, and a sleek modern UI.',
    emoji: '🎵',
    tags: ['JavaScript', 'HTML5', 'CSS3', 'Web Audio API'],
    cat: 'frontend',
    badge: 'Frontend', badgeClass: 'badge--frontend',
    live: '#', github: 'https://github.com/HarshP2709/Music-Player',
    features: ['Play / pause / skip controls', 'Playlist management', 'Song progress bar with seek', 'Volume control', 'Responsive UI with album art'],
    challenges: ['Syncing audio state with UI controls', 'Cross-browser Web Audio API compatibility', 'Building a smooth playlist navigation experience'],
  },
  {
    id: 5,
    title: 'Connect Pro — Communication App',
    desc: 'A real-time communication application enabling users to connect, chat, and collaborate — built with modern JavaScript.',
    emoji: '💬',
    tags: ['JavaScript', 'HTML5', 'CSS3', 'Real-time'],
    cat: 'realtime',
    badge: 'Real-time', badgeClass: 'badge--realtime',
    live: '#', github: 'https://github.com/HarshP2709/Connect-Pro-Communication-App-',
    features: ['Real-time messaging interface', 'User connection management', 'Clean chat UI', 'Responsive layout', 'Fast message rendering'],
    challenges: ['Handling real-time message updates', 'Keeping UI in sync with live data', 'Building a smooth mobile chat experience'],
  },
  {
    id: 6,
    title: 'Developer Portfolio Website',
    desc: 'This very website — built with Three.js, GSAP, 3D effects, glassmorphism, and a premium dark UI to showcase projects and skills. Deployed on Vercel.',
    emoji: '🌐',
    tags: ['HTML5', 'CSS3', 'JavaScript', 'Three.js', 'GSAP', 'EmailJS', 'Vercel'],
    cat: 'frontend',
    badge: 'Frontend', badgeClass: 'badge--frontend',
    live: 'https://harsh-portfolio-three-liart.vercel.app/', github: 'https://github.com/HarshP2709',
    features: ['Three.js 3D animated sphere', 'GSAP scroll-triggered animations', 'Glassmorphism design system', 'Custom cursor & mouse glow', 'Particles.js interactive background'],
    challenges: ['Three.js performance on mobile', 'Smooth GSAP + Lenis scroll integration', 'Maintaining high Lighthouse score with all effects'],
  },
];

/* ── TECH STACK DATA ────────────────────────────────────────── */
const TECH_STACK = [
  // Frontend
  { name: 'HTML5', icon: 'devicon-html5-plain colored', cat: 'frontend', pct: 90 },
  { name: 'CSS3', icon: 'devicon-css3-plain colored', cat: 'frontend', pct: 88 },
  { name: 'JavaScript', icon: 'devicon-javascript-plain colored', cat: 'frontend', pct: 85 },
  { name: 'TypeScript', icon: 'devicon-typescript-plain colored', cat: 'frontend', pct: 78 },
  { name: 'Angular', icon: 'devicon-angularjs-plain colored', cat: 'frontend', pct: 72 },
  { name: 'React.js', icon: 'devicon-react-original colored', cat: 'frontend', pct: 75 },
  { name: 'Next.js', icon: 'devicon-nextjs-plain', cat: 'frontend', pct: 70 },

  // Backend / Languages
  { name: 'C', icon: 'devicon-c-plain colored', cat: 'backend', pct: 80 },
  { name: 'Python', icon: 'devicon-python-plain colored', cat: 'backend', pct: 78 },
  { name: 'Java', icon: 'devicon-java-plain colored', cat: 'backend', pct: 72 },
  { name: 'Node.js', icon: 'devicon-nodejs-plain colored', cat: 'backend', pct: 80 },
  { name: 'Express.js', icon: 'devicon-express-original', cat: 'backend', pct: 78 },
  { name: 'Django', icon: 'devicon-django-plain colored', cat: 'backend', pct: 65 },
  { name: 'Flask', icon: 'devicon-flask-original', cat: 'backend', pct: 65 },
  { name: 'NumPy', icon: 'devicon-numpy-plain colored', cat: 'backend', pct: 70 },
  { name: 'Pandas', icon: 'devicon-pandas-plain colored', cat: 'backend', pct: 68 },

  // Database
  { name: 'MySQL', icon: 'devicon-mysql-plain colored', cat: 'database', pct: 80 },
  { name: 'PostgreSQL', icon: 'devicon-postgresql-plain colored', cat: 'database', pct: 70 },
  { name: 'MongoDB', icon: 'devicon-mongodb-plain colored', cat: 'database', pct: 72 },
  { name: 'Supabase', icon: 'devicon-supabase-plain colored', cat: 'database', pct: 68 },

  // Tools
  { name: 'Git', icon: 'devicon-git-plain colored', cat: 'tools', pct: 85 },
  { name: 'GitHub', icon: 'devicon-github-original', cat: 'tools', pct: 85 },
  { name: 'VS Code', icon: 'devicon-vscode-plain colored', cat: 'tools', pct: 92 },
  { name: 'Power BI', icon: 'fas fa-chart-bar', cat: 'tools', pct: 70, color: '#F2C811' },
  { name: 'Tableau', icon: 'fas fa-chart-area', cat: 'tools', pct: 68, color: '#E97627' },
  { name: 'Excel', icon: 'fas fa-file-excel', cat: 'tools', pct: 75, color: '#1D6F42' },
];

/* ── RENDER TECH STACK ──────────────────────────────────────── */
function renderStack() {
  const grid = document.getElementById('stackGrid');
  if (!grid) return;

  grid.innerHTML = TECH_STACK.map((tech, i) => `
    <div class="skill-card"
         data-cat="${tech.cat}"
         data-aos="zoom-in"
         data-aos-delay="${(i % 6) * 50}">
      <span class="skill-card__icon">
        <i class="${tech.icon}"${tech.color ? ` style="color:${tech.color}"` : ''}></i>
      </span>
      <div class="skill-card__name">${tech.name}</div>
      <div class="skill-card__bar">
        <div class="skill-card__fill" data-pct="${tech.pct}" style="width:0%"></div>
      </div>
      <div class="skill-card__meta">${tech.pct}% Proficiency</div>
    </div>
  `).join('');
}

/* ── RENDER PROJECTS ────────────────────────────────────────── */
function renderProjects() {
  const grid = document.getElementById('projectsGrid');
  if (!grid) return;

  grid.innerHTML = window.PROJECTS.map((p, i) => `
    <div class="project-card"
         data-cat="${p.cat}"
         data-aos="fade-up"
         data-aos-delay="${(i % 3) * 80}"
         role="button"
         tabindex="0"
         aria-label="View ${p.title} case study"
         onclick="window.openProjectModal(window.PROJECTS[${i}])"
         onkeydown="if(event.key==='Enter')window.openProjectModal(window.PROJECTS[${i}])">

      <div class="project-card__image">
        <div class="project-card__placeholder">
          <span style="font-size:3rem;display:block;margin-bottom:8px">${p.emoji}</span>
          <span style="font-size:12px;color:rgba(255,255,255,.4)">${p.title}</span>
        </div>
        ${p.badge ? `<span class="project-card__badge ${p.badgeClass}">${p.badge}</span>` : ''}
        <div class="project-card__overlay">
          <div class="project-card__preview-btns">
            ${p.live !== '#' ? `<a href="${p.live}"   target="_blank" rel="noopener" class="btn btn--sm btn--primary" onclick="event.stopPropagation()"><i class="fas fa-external-link-alt"></i></a>` : ''}
            ${p.github ? `<a href="${p.github}" target="_blank" rel="noopener" class="btn btn--sm btn--glass" onclick="event.stopPropagation()"><i class="fab fa-github"></i></a>` : ''}
          </div>
        </div>
      </div>

      <div class="project-card__body">
        <h3 class="project-card__title">${p.title}</h3>
        <p class="project-card__desc">${p.desc}</p>
        <div class="project-card__tags">
          ${p.tags.slice(0, 4).map(t => `<span class="tag">${t}</span>`).join('')}
          ${p.tags.length > 4 ? `<span class="tag">+${p.tags.length - 4}</span>` : ''}
        </div>
        <div class="project-card__actions">
          <button class="project-card__link project-card__link--primary"
                  onclick="event.stopPropagation();window.openProjectModal(window.PROJECTS[${i}])">
            <i class="fas fa-info-circle"></i> Case Study
          </button>
          ${p.github ? `<a href="${p.github}" target="_blank" rel="noopener" class="project-card__link project-card__link--ghost" onclick="event.stopPropagation()"><i class="fab fa-github"></i></a>` : ''}
          ${p.live !== '#' ? `<a href="${p.live}" target="_blank" rel="noopener" class="project-card__link project-card__link--ghost" onclick="event.stopPropagation()"><i class="fas fa-external-link-alt"></i></a>` : ''}
        </div>
      </div>
    </div>
  `).join('');

  // Notify other scripts that content is rendered
  document.dispatchEvent(new CustomEvent('contentRendered'));
}

/* ── INIT on DOM ready ──────────────────────────────────────── */
document.addEventListener('DOMContentLoaded', () => {
  renderStack();
  renderProjects();
});
