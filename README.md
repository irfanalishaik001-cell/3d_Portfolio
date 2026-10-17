# Irfan Ali Shaik — Premium Interactive Developer Portfolio

> **“Building with Code. Exploring with AI. Creating with Purpose.”**  
> An award-winning, editorial white-canvas developer portfolio engineered for software engineering internships, AI/ML opportunities, recruiters, and technical collaborations.

[![React](https://img.shields.io/badge/React-19.0-61DAFB?logo=react&logoColor=black)](https://react.dev/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.x-3178C6?logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![Vite](https://img.shields.io/badge/Vite-8.x-646CFF?logo=vite&logoColor=white)](https://vite.dev/)
[![TailwindCSS](https://img.shields.io/badge/TailwindCSS-v4-38B2AC?logo=tailwindcss&logoColor=white)](https://tailwindcss.com/)
[![Three.js](https://img.shields.io/badge/Three.js-WebGL%20Shaders-black?logo=threedotjs&logoColor=white)](https://threejs.org/)
[![Node.js](https://img.shields.io/badge/Node.js-22+-339933?logo=nodedotjs&logoColor=white)](https://nodejs.org/)
[![License](https://img.shields.io/badge/License-Apache%202.0-blue.svg)](LICENSE)

---

## 🌟 Executive Overview

This repository houses the personal portfolio of **Irfan Ali Shaik**, an undergraduate B.Tech student specializing in **Artificial Intelligence and Machine Learning** at **Sagi Ramakrishnam Raju Engineering College (SRKR)**. 

Designed around a minimalist digital artboard aesthetic with frosted glassmorphism, subtle hand-drawn doodle annotations, and physical motion design, the application transcends generic web templates to deliver an engaging, tactile exploration of software engineering, data science, and creative media.

---

## 🚀 Signature Features

### 1. 🌐 3D Particle Globe Photo Morph (Hero Section)
- **Pixel Color Sampling**: The hero portrait is dynamically ingested into an offscreen buffer, extracting color values for over 14,000 discrete points.
- **Interactive Morph Animation**: Holding the photo or clicking the **"Morph 3D"** button transitions particles from a 2D planar image grid into a 3D rotating spherical globe using a **Fibonacci spiral (golden angle $\approx 2.39996$)** distribution.
- **Harmonic Turbulence**: Shaders execute multi-frequency sinusoidal perturbations to give the particle sphere a living, cosmic aesthetic.
- **Seamless Reassembly**: When released, a custom spring physics solver restores the planar layout, fading in the high-resolution photograph.
- **Accessibility**: Pointer down/up, touch gesture support, and keyboard toggle (`Space`/`Enter`).

### 2. 📋 The Signature Technology Whiteboard
- **Continuous 1200×560px Artboard**: A spacious designer's canvas with delicate dot-grid paper cues and architectural guides.
- **Draggable Technology Nodes**: 18+ technology entities (Python, Java, C, NumPy, Pandas, Scikit-learn, React, Git, etc.) with boundary clamping, authentic vector brandmarks, and ambient floating states.
- **Dynamic Curved SVG Bezier Connectors**: Visually maps relationships between complementary tools (e.g., Python ➔ NumPy ➔ Pandas ➔ Scikit-learn ➔ NLP Pipelines; Python ➔ Flask; HTML/CSS ➔ React; Git ➔ GitHub).
- **Interactive Tooling**: Live category filter pills, instant stack search, zoom/pan controls, and a one-click layout reset.
- **Deep Inspection Drawer**: Clicking any node presents official documentation links, linked projects, and descriptive proficiency context.

### 3. 🌌 Free-Space Technology Nebula (Zero-Gravity Arena)
- **Continuous Drift Physics**: Located beneath the Contact section, floating technology badges drift through open space with momentum, gentle angular rotation, and elastic boundary collisions.
- **Grab & Fling Momentum**: Users can grab any badge with their pointer, drag it, and fling it across the screen with natural release velocity.
- **Control Modes**:
  - `Zero-G Drift`: Continuous calm floating with micro-gravity regulation.
  - `Vortex Orbit`: Gravitational swirl pulling badges inward into an orbital vortex.
  - `Scatter All (Supernova)`: Radial explosive impulse blasting all badges outward.
  - `Recall`: Magnetic attraction centering all entities.

### 4. 📜 Official Internship & Recognition Section
- **Faithful EduSkills AICTE Integration**: Incorporates the official **8-Week AICTE – EduSkills Virtual Internship Program in Machine Learning & Data Science** document.
- **Interactive Multi-Page Viewer**:
  - **Page 1**: Official Selection Offer Letter with reference numbers, student ID, and evaluation terms.
  - **Page 2**: Week 1 through Week 8 complete curriculum breakdown.
- **Privacy Mode Mask**: One-click toggle that redacts the AICTE Student ID and Reference Number for public demonstrations.
- **Interactive Module Navigator**: Click through weeks 1–8 to explore specific modules (from Python/Anaconda to MLOps Capstone).

### 5. 💡 Featured Projects & Hackathon Showcase
- **FarmDirect AI (Flagship Project)**: Direct agricultural supply-chain marketplace with an ML price forecasting model eliminating exploitative intermediary markups.
- **Interactive Price Forecaster Demo**: Live simulation widget comparing traditional mandi prices against fair farm-gate pricing.
- **Customer Sentiment NLP Pipeline**: EduSkills Capstone project with TF-IDF, Naive Bayes classifier, SQL storage, and Flask REST API.
- **Crop Yield & Climate Advisor**: Ensemble regression (Random Forest & Gradient Boosting) analyzing soil nutrient indices and weather anomalies.
- **Creative Media & Tech Storytelling**: High-impact video editing, DaVinci Resolve color pipelines, and technical explainers.

### 6. 🛠️ Verified Resources & Developer Directory
- Direct, functional documentation links to verified official sources (Python.org, Dev.java, NumPy.org, Pandas, Scikit-learn.org, React.dev, MDN Web Docs, LeetCode).

### 7. 📬 Direct Communications & Printable CV
- **Direct Mailto Protocol**: One-click message draft generator without mock backend endpoints.
- **Confetti Copy Action**: Instant clipboard copy of `bj226367@gmail.com` with celebratory particle animation.
- **Printable Engineering CV**: Modal formatted with `@media print` CSS for clean, one-click PDF generation.

---

## 📁 Repository Structure

```text
├── index.html                   # HTML entry point with metadata & web fonts
├── metadata.json                # Project description & AI Studio capabilities
├── package.json                 # Project dependencies & scripts
├── tsconfig.json                # Strict TypeScript configuration
├── vite.config.ts               # Vite bundler configuration with Tailwind v4
│
├── public/
│   └── assets/                  # Publicly served image assets
│       ├── portrait.jpg         # Profile portrait
│       └── farmdirect.jpg       # Project mockup showcase
│
└── src/
    ├── main.tsx                 # React DOM mount point
    ├── App.tsx                  # Core app container & section layout
    ├── index.css                # Tailwind CSS v4 imports, typography & print rules
    │
    ├── assets/
    │   └── images/              # Local image assets
    │
    ├── components/
    │   ├── Navbar.tsx           # Floating translucent header with availability badge
    │   ├── Hero.tsx             # Editorial hero with headline, bio, CTAs & portrait frame
    │   ├── PhotoParticleGlobe.tsx # Three.js WebGL particle morphing engine
    │   ├── WhiteboardCanvas.tsx # Signature interactive draggable whiteboard
    │   ├── WhiteboardNodeCard.tsx # Draggable technology node card
    │   ├── NodeDetailModal.tsx  # Deep inspection modal for technology entities
    │   ├── SkillsSection.tsx    # Skills matrix & active learning radar
    │   ├── ProjectsSection.tsx  # Project showcase & FarmDirect price simulator
    │   ├── InternshipSection.tsx# EduSkills AICTE document viewer & syllabus explorer
    │   ├── AboutSection.tsx     # Academic pathway & creative background
    │   ├── ResourcesSection.tsx # Verified documentation directory
    │   ├── ContactSection.tsx   # Direct email composer & confetti clipboard copy
    │   ├── FreeSpaceTechStacks.tsx # Zero-gravity floating tech arena
    │   ├── ResumeModal.tsx      # Printable curriculum vitae modal
    │   ├── TechIcons.tsx        # Authentic SVG tech brand logos
    │   └── DoodleDecorations.tsx# Hand-drawn arrows, underlines & grid backgrounds
    │
    ├── data/
    │   └── portfolioData.ts     # Single source of truth for all portfolio data
    │
    └── utils/
        ├── whiteboard.ts        # Pure math for coordinates, curves, physics & filtering
        └── whiteboard.test.ts   # Node.js native unit tests (node:test)
```

---

## 🛠️ Tech Stack & Dependencies

| Category | Technology | Purpose |
| :--- | :--- | :--- |
| **Frontend Framework** | **React 19** | Component architecture and state management |
| **Language** | **TypeScript 5.x** | Static typing, interface contracts, zero linter errors |
| **Bundler** | **Vite 8.x** | Fast ESM dev server and optimized rollup production builds |
| **Styling** | **Tailwind CSS v4** | Modern utility-first CSS with `@import "tailwindcss"` |
| **3D & Graphics** | **Three.js** | Custom WebGL vertex shaders, particle systems, Fibonacci spheres |
| **Icons** | **Lucide React** + Custom SVGs | Crisp UI iconography and official brand logos |
| **Effects** | **canvas-confetti** | Celebratory particle confetti on email copy |
| **Testing** | **Node.js Test Runner** (`node:test`) | Deterministic, zero-dependency unit tests |

---

## ⚙️ Getting Started

### Prerequisites

- **Node.js**: Version `20.0.0` or higher (Node 22 recommended)
- **Package Manager**: `npm`, `pnpm`, or `bun`

### 1. Clone the Repository

```bash
git clone https://github.com/your-username/interactive-developer-portfolio.git
cd interactive-developer-portfolio
```

### 2. Install Dependencies

```bash
npm install
```

### 3. Run Development Server

```bash
npm run dev
```

Open your browser at `http://localhost:3000` to interact with the application.

### 4. Execute Unit Tests

The core mathematical layout, boundary clamping, and zero-gravity physics solvers are decoupled into pure TypeScript modules and tested via Node's native test runner:

```bash
node --test src/utils/whiteboard.test.ts
```

All 7 test suites will execute and pass in sub-second time.

### 5. Typecheck & Lint

Validate TypeScript types without emitting build artifacts:

```bash
npm run lint
```

### 6. Build for Production

```bash
npm run build
```

Generates optimized, minified production assets in the `dist/` directory. Preview the production build with:

```bash
npm run preview
```

---

## 🎨 Customization Guide

All personal and technical content is isolated in **`src/data/portfolioData.ts`** for effortless updating without touching component JSX:

### Updating Personal Information
Edit `PERSONAL_INFO` in `src/data/portfolioData.ts`:
```typescript
export const PERSONAL_INFO = {
  name: 'Irfan Ali Shaik',
  title: 'Undergraduate B.Tech Student in Artificial Intelligence & Machine Learning',
  college: 'Sagi Ramakrishnam Raju Engineering College (SRKR)',
  email: 'bj226367@gmail.com',
  github: 'https://github.com/your-handle',
  linkedin: 'https://linkedin.com/in/your-handle',
  leetcode: 'https://leetcode.com/your-handle',
  availableForWork: true,
  availabilityText: 'Available for Summer & Fall 2026 Internships',
  // ...
};
```

### Replacing Images
- **Hero Portrait**: Replace `public/assets/portrait.jpg` (or `src/assets/images/portrait.jpg`) with your own image. The particle sampling algorithm will automatically parse its color data!
- **Featured Project Image**: Replace `public/assets/farmdirect.jpg` with your project screenshot.

### Adding New Skills to the Whiteboard & Free-Space
Append objects to `INITIAL_WHITEBOARD_NODES` in `src/data/portfolioData.ts`:
```typescript
{
  id: 'docker',
  name: 'Docker',
  category: 'tools',
  proficiency: 'Currently Learning',
  x: 950,
  y: 350,
  icon: 'terminal',
  color: '#2496ED',
  accentBg: '#F0F9FF',
  description: 'Containerization and reproducible runtime environments.',
  docUrl: 'https://docs.docker.com/',
  relatedIds: ['git-github'],
  tag: 'DevOps',
}
```

---

## ♿ Accessibility & Performance

- **Semantic HTML**: Built using native `<section>`, `<nav>`, `<main>`, `<dialog>`, and `<button>` elements with accessible `aria-label` tags.
- **Hardware Fallback**: Three.js WebGL canvas detects device capabilities and limits pixel density to `Math.min(window.devicePixelRatio, 2)` to protect battery life on mobile devices.
- **Touch & Gesture Isolation**: Whiteboard and Free-Space physics containers isolate pointer events (`touch-action: none`) so vertical page scrolling outside the canvas remains fluid.
- **Keyboard Navigation**: Pressing `Enter` or `Space` on any interactive node opens its inspection modal.
- **Zero Telemetry**: No third-party tracking scripts, cookie banners, or analytics telemetry.

---

## 📄 License

This project is open-source under the [Apache License 2.0](LICENSE).

---

## 👤 Author

**Irfan Ali Shaik**  
B.Tech in Artificial Intelligence & Machine Learning  
*Sagi Ramakrishnam Raju Engineering College (SRKR)*  
- 📧 Email: [bj226367@gmail.com](mailto:bj226367@gmail.com)  
- 💼 LinkedIn: [linkedin.com/in/](https://linkedin.com/)  
- 🐙 GitHub: [github.com/](https://github.com/)  
- ⚡ LeetCode: [leetcode.com/](https://leetcode.com/)
