# AxxonTek — Company Website

> A modern, multi-page marketing website for **AxxonTek**, a technology solutions company based in Kigali, Rwanda. The site showcases their services, values, and contact information.

---

## 🌐 Live Pages

| Page | File | Description |
|------|------|-------------|
| Home | `index.html` | Main landing page with hero, services overview, and features |
| About | `about.html` | Company vision, mission, and approach |
| Contact | `contact.html` | Contact form and company details |
| Blog | `blog.html` | Company blog and articles |
| Careers | `careers.html` | Job openings and opportunities |
| Analytics | `analytics.html` | Analytics service page |
| Security | `security.html` | Security systems service page |
| Infrastructure | `infrastructure.html` | Infrastructure service page |
| Cloud Services | `cloud.html` | Cloud solutions service page |
| Sourcing | `sourcing.html` | Talent sourcing service page |
| Interviews | `interviews.html` | Interview service page |
| Privacy Policy | `privacy.html` | Legal privacy policy |
| Terms of Service | `terms.html` | Legal terms and conditions |

---

## 🛠️ Tech Stack

This is a **plain HTML/CSS/JavaScript** website — no frameworks or build tools required.

| Technology | Purpose |
|---|---|
| HTML5 | Page structure and content |
| CSS3 (`style.css`) | All styling, layout, animations, and responsive design |
| Vanilla JavaScript (`script.js`) | Navigation interactions, scroll effects, and UI logic |
| [Three.js](https://threejs.org/) | 3D particle animation on the homepage |
| [GSAP](https://greensock.com/gsap/) | Scroll-triggered animations and transitions |
| Google Fonts (Inter) | Typography |

---

## 📁 Project Structure

```
AITEK/
│
├── index.html              # Homepage (main entry point)
├── about.html              # About Us page
├── contact.html            # Contact page
├── blog.html               # Blog page
├── careers.html            # Careers page
├── analytics.html          # Analytics service page
├── security.html           # Security service page
├── infrastructure.html     # Infrastructure service page
├── cloud.html              # Cloud services page
├── sourcing.html           # Sourcing service page
├── interviews.html         # Interviews service page
├── privacy.html            # Privacy Policy
├── terms.html              # Terms of Service
│
├── style.css               # Global stylesheet (all pages share this)
├── script.js               # Main JavaScript logic
├── particle-scene.js       # Three.js 3D particle background animation
├── generate.js             # Utility/generation script
│
└── assets/                 # Images and icons
    ├── axxontek logo.png
    ├── axxon tek icon.png
    ├── Custom Websites.png
    ├── smart-buildings.jpg
    ├── house security.jpeg
    ├── saas.avif
    └── ...
```

---

## 🚀 How to Run

This site requires **no installation** or build step.

1. **Clone or download** this repository to your computer.
2. Open the `AITEK/` folder.
3. Double-click **`index.html`** to open it in your browser.

That's it! All pages are linked to each other and will work offline.

> **Tip:** For the best experience, open the site through a local server (e.g., using the [Live Server](https://marketplace.visualstudio.com/items?itemName=ritwickdey.LiveServer) extension in VS Code) to avoid any browser restrictions on local file loading.

---

## ✨ Key Features

- **Animated Hero Section** — Full-screen landing with a 3D particle canvas background powered by Three.js.
- **Scroll Animations** — Smooth, scroll-triggered animations using GSAP and ScrollTrigger.
- **Services Showcase** — Interactive scroll-spy section that highlights each service as you scroll.
- **Split-Screen Service Panels** — Each service (Websites, Smart Buildings, Security, SaaS) has a dedicated visual panel.
- **Responsive Navigation** — Vertical sidebar navigation with mobile support.
- **Newsletter Signup** — Email subscription form in the footer.
- **Multi-Page Architecture** — 13 separate pages, all sharing one consistent CSS and JS file.

---

## 🏢 About AxxonTek

AxxonTek is a technology company headquartered at **Norrsken Kigali, 1 KN 78 St, Kigali, Rwanda**.

They provide end-to-end technology solutions across four main service areas:

- 💻 **Custom Websites & Apps** — Modern websites and web applications.
- 🏢 **Smart Building Systems** — Automated lighting, energy, and access control.
- 🔒 **Security Systems** — CCTV, alarm systems, and security infrastructure.
- ☁️ **SaaS & Hardware** — Software platforms and hardware integrations.

---

## 🎨 Design System

All visual styles are defined in `style.css`. Key design decisions:

- **Color Scheme:** Dark background with blue/cyan accent glows.
- **Font:** [Inter](https://fonts.google.com/specimen/Inter) — clean and modern sans-serif.
- **Effects:** Glassmorphism panels, glowing borders, gradient text, and smooth hover animations.
- **Animations:** Entry animations via GSAP and a rotating 3D particle sphere via Three.js.

---

## 📄 License

This project is proprietary. All rights reserved by **AxxonTek**.
