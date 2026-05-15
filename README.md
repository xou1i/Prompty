# ✨ Prompty — AI Prompt Management

![Prompty Showcase](https://img.shields.io/badge/Status-Production_Ready-success?style=for-the-badge)
![React](https://img.shields.io/badge/React-18.x-61DAFB?style=for-the-badge&logo=react)
![Vite](https://img.shields.io/badge/Vite-5.x-646CFF?style=for-the-badge&logo=vite)
![Tailwind CSS](https://img.shields.io/badge/TailwindCSS-v4.0-38B2AC?style=for-the-badge&logo=tailwind-css)
![Framer Motion](https://img.shields.io/badge/Framer_Motion-12.x-0055FF?style=for-the-badge&logo=framer)

**Prompty** is a premium, beautifully crafted AI Prompt Management SaaS application. It allows professionals to organize, save, and retrieve their most valuable AI prompts with an ultra-smooth, Apple-inspired cinematic interface.

---

## 🚀 Key Features

- **Premium Glassmorphism UI:** Sophisticated deep-navy aesthetic with cinematic radial gradients, soft blurs, and careful spacing discipline.
- **Fluid Animations:** Physics-based spring animations powered by Framer Motion for sidebars, modals, toasts, and page transitions.
- **Bilingual Support (i18n):** Seamlessly switch between English (LTR) and Arabic (RTL) with localized typography (Inter & Cairo).
- **Responsive Design:** A flawless experience across desktop, tablet, and mobile devices.
- **Client-Side Storage:** Fast, secure, and persistent data management using `localStorage` API.
- **Category Management & Search:** Instantly find prompts via full-text search and smart category filters.
- **Vercel Ready:** Fully configured with `vercel.json` for SPA routing.

---

## 🛠️ Tech Stack

- **Framework:** [React 18](https://react.dev/)
- **Build Tool:** [Vite](https://vitejs.dev/)
- **Styling:** [Tailwind CSS v4](https://tailwindcss.com/) + Custom CSS Design System (`index.css`)
- **Animations:** [Framer Motion](https://www.framer.com/motion/)
- **Icons:** [Lucide React](https://lucide.dev/)
- **Routing:** [React Router v7](https://reactrouter.com/)
- **Localization:** `i18next` + `react-i18next`

---

## 💻 Getting Started

### Prerequisites
Make sure you have [Node.js](https://nodejs.org/) installed on your machine.

### Installation

1. **Clone the repository:**
   ```bash
   git clone https://github.com/your-username/prompty.git
   cd prompty
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Start the development server:**
   ```bash
   npm run dev
   ```

4. Open your browser and navigate to `http://localhost:5173`.

---

## 📂 Project Structure

```text
prompty/
├── src/
│   ├── animations/      # Framer Motion variants & physics
│   ├── components/      # Reusable UI components
│   │   ├── dashboard/   # Dashboard specific (Sidebar, Modals, Cards)
│   │   ├── landing/     # Landing page sections (Hero, Features, CTA)
│   │   ├── layout/      # Global layout components (Navbar)
│   │   └── shared/      # Generic components (Toasts, Backgrounds)
│   ├── context/         # React Context (PromptContext for State)
│   ├── data/            # Seed data & constants
│   ├── lib/             # Utility functions
│   ├── locales/         # i18n translation files (ar, en)
│   ├── pages/           # Page routes (Landing, Dashboard)
│   ├── services/        # LocalStorage API wrappers
│   ├── App.jsx          # Root component & Routing setup
│   └── index.css        # Core Design System tokens & utilities
├── vercel.json          # Vercel SPA routing configuration
├── package.json         # Dependencies & scripts
└── vite.config.js       # Vite build configuration
```

---

## ☁️ Deployment (Vercel)

This project is pre-configured for seamless deployment to Vercel. The `vercel.json` file ensures that the React Router handles routing correctly without returning 404 errors on refresh.

1. Push your code to GitHub.
2. Go to your Vercel Dashboard and click **Add New... > Project**.
3. Import your GitHub repository.
4. Leave the Framework Preset as **Vite**.
5. Click **Deploy**.

---

## 🎨 Design Philosophy

The application interface is built strictly around **spatial rhythm, subtle depth, and intentional motion**. We avoid noisy templates and rely heavily on minimal surface treatments (`.surface-1` through `.surface-4`) to create an authentic, high-end SaaS feel that prioritizes focus and visual hierarchy.

---

Made with ❤️ by the Prompty Team.
