# 🚀 Harsh Prajapati — Full Stack Developer Portfolio

> A FAANG-tier premium developer portfolio built with pure HTML, CSS & JavaScript.
> Featuring Three.js 3D visuals, GSAP animations, glassmorphism, and luxury UI design.

---

## 📁 Project Structure

```
Portfolio/
├── index.html                  # Main HTML entry point
├── README.md                   # Project documentation
│
├── assets/
│   ├── css/
│   │   ├── style.css           # Master stylesheet (glassmorphism, dark theme)
│   │   ├── animations.css      # Keyframes & animation utilities
│   │   └── responsive.css      # Mobile-first breakpoints
│   │
│   ├── js/
│   │   ├── projects.js         # Project data & tech stack rendering
│   │   ├── three-scene.js      # Three.js 3D sphere & particle field
│   │   ├── animations.js       # GSAP ScrollTrigger animations
│   │   └── main.js             # Core functionality (cursor, navbar, form)
│   │
│   ├── images/                 # Portfolio images (add yours here)
│   ├── icons/                  # Custom icons
│   ├── fonts/                  # Local fonts (optional)
│   └── resume/
│       └── Harsh_Prajapati_Resume.pdf   # Your resume PDF
```

---

## ⚡ Tech Stack

| Category       | Technology                                      |
|----------------|-------------------------------------------------|
| **Core**       | HTML5, CSS3, JavaScript (ES6+)                  |
| **3D**         | Three.js                                        |
| **Animations** | GSAP + ScrollTrigger, AOS                       |
| **Scroll**     | Lenis Smooth Scroll                             |
| **Particles**  | Particles.js                                    |
| **Tilt**       | Vanilla Tilt.js                                 |
| **Typing**     | Typed.js                                        |
| **Icons**      | Font Awesome 6, Devicon                         |
| **Fonts**      | Google Fonts (Poppins, Space Grotesk, Inter)    |

---

## 🎨 Design Features

- ✅ **Premium Dark Theme** — Deep space background (#050816)
- ✅ **Glassmorphism Cards** — Frosted glass with blur & border glow
- ✅ **Three.js 3D Sphere** — Interactive, mouse-following 3D orb
- ✅ **Particle Background** — Interactive colored particles
- ✅ **GSAP Animations** — ScrollTrigger reveal, magnetic buttons
- ✅ **Custom Cursor** — Dual-ring cursor with hover states
- ✅ **Mouse Glow** — Radial gradient follows cursor
- ✅ **Smooth Scrolling** — Lenis for buttery smooth scroll
- ✅ **Animated Counters** — Number count-up on scroll
- ✅ **Skill Progress Bars** — Animated on viewport entry
- ✅ **Project Modal** — Full case study modal per project
- ✅ **Dark/Light Theme** — Toggle with localStorage persistence
- ✅ **Responsive Design** — Mobile-first, 5 breakpoints
- ✅ **Parallax Effects** — Hero content & 3D element
- ✅ **Gradient Text** — Animated multi-color gradients
- ✅ **Neon Glow Effects** — Buttons, dots, borders
- ✅ **Loading Screen** — Branded loader with progress bar
- ✅ **Scroll Progress** — Top progress bar

---

## 🏗️ Sections

1. **Hero** — Full-screen with Three.js sphere, particles, typed text
2. **About** — Bio, stats counters, skills overview, timeline
3. **Tech Stack** — 22+ technologies with filterable cards & skill bars
4. **Projects** — 9 premium projects with filtering & case study modals
5. **Experience** — Timeline with internship, open source, freelance
6. **Services** — 8 service offerings with hover effects
7. **Certificates** — Sliding certificate cards with verification
8. **Testimonials** — Client testimonial cards
9. **Blog** — Article preview cards
10. **Contact** — Form with validation + social contact methods
11. **Footer** — Links, socials, tech credits

---

## 🚀 Getting Started

### Option 1 — Open Directly
```bash
# Simply open index.html in a browser
# Chrome/Edge recommended for best WebGL performance
open index.html
```

### Option 2 — Local Server (Recommended)
```bash
# Using VS Code Live Server extension
# OR
npx serve .
# OR
python -m http.server 8000
```

---

## 🔧 Customisation

### 1. Update Personal Info
Edit [`index.html`](index.html) — hero name, about text, social links, contact details

### 2. Add Your Projects
Edit [`assets/js/projects.js`](assets/js/projects.js) → `PROJECTS` array

### 3. Update Tech Stack
Edit [`assets/js/projects.js`](assets/js/projects.js) → `TECH_STACK` array

### 4. Add Resume
Replace `assets/resume/Harsh_Prajapati_Resume.pdf` with your resume PDF

### 5. Connect Contact Form
In [`assets/js/main.js`](assets/js/main.js), replace the simulated send with EmailJS:
```javascript
// Install emailjs-com, then:
emailjs.send('service_id', 'template_id', { name, email, message });
```

### 6. Change Colors
Edit CSS variables in [`assets/css/style.css`](assets/css/style.css) `:root {}` block

---

## 📊 Performance Goals

| Metric          | Target |
|-----------------|--------|
| Performance     | 90+    |
| Accessibility   | 95+    |
| Best Practices  | 100    |
| SEO             | 100    |

**Tips to maximise score:**
- Compress images to WebP
- Use `loading="lazy"` on all images below fold
- Add `rel="preload"` for critical fonts
- Host fonts locally in production

---

## 📱 Responsive Breakpoints

| Breakpoint | Screen Width  |
|------------|---------------|
| XL         | ≤ 1280px      |
| LG         | ≤ 1024px      |
| MD         | ≤ 768px       |
| SM         | ≤ 640px       |
| XS         | ≤ 480px       |

---

## 🌐 SEO

All meta tags, Open Graph, and Twitter Card tags are included in `index.html`.
Update `og:url`, `og:image`, and `twitter:image` with production values.

---

## 📄 License

MIT License — Free to use, modify, and distribute.

---

## 👤 Author

**Harsh Prajapati**
- GitHub: [@harshprajapati](https://github.com/harshprajapati)
- LinkedIn: [linkedin.com/in/harshprajapati](https://linkedin.com/in/harshprajapati)
- Email: harsh@example.com

---

*Built with ❤️ and a lot of ☕*
