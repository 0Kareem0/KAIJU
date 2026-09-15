# 🐉 KAIJU — Anime & Manga Discovery Platform

<p align="center">
  <img src="https://img.shields.io/badge/React-19-blue?style=for-the-badge&logo=react" alt="React 19" />
  <img src="https://img.shields.io/badge/Vite-8-646CFF?style=for-the-badge&logo=vite" alt="Vite 8" />
  <img src="https://img.shields.io/badge/Tailwind_CSS-v4-38B2AC?style=for-the-badge&logo=tailwind-css" alt="Tailwind CSS 4" />
  <img src="https://img.shields.io/badge/React_Router-v6-CA4245?style=for-the-badge&logo=react-router" alt="React Router 6" />
  <img src="https://img.shields.io/badge/API-Jikan_v4-FF4B4B?style=for-the-badge&logo=myanimelist" alt="Jikan API v4" />
</p>

> **KAIJU** is a modern, high-performance, mobile-first web application for discovering anime and manga. Built with React 19, Vite 8, and Tailwind CSS v4, it provides real-time search, interactive hero spotlight carousels, genre filtering, and comprehensive detail pages powered by the **Jikan API (MyAnimeList)**.

---

## ✨ Features

- 🔍 **Real-Time Live Search**
  - Instant site-wide search with live query persistence.
  - Interactive auto-suggest dropdown with quick links to anime details.
  - One-click clear (`✖`) button and seamless search navigation.

- 📱 **Mobile-First Native Experience**
  - Glassmorphic top navigation drawer and responsive mobile drawer.
  - Fixed mobile bottom navigation bar (`md:hidden`) for ergonomic one-thumb browsing.
  - Adaptive 2-column card layout on mobile screens with touch-friendly horizontal swipe bars for genres.

- 🎬 **Hero Spotlight & Carousel**
  - Displays top trending titles in a dynamic auto-sliding banner.
  - High-res poster artwork with dark gradient overlays, ratings, episode badges, and full synopsis preview.

- 📖 **Comprehensive Detail Pages**
  - Detailed pages for both **Anime** (`/anime/:id`) and **Manga** (`/manga/:id`).
  - Score, status, episodes/chapters, broadcast info, studios, publishers, trailer embeds, and character casts.
  - Dynamic API fallback mechanism to guarantee reliable data fetching.

- 📍 **Smart Scroll Restoration**
  - Preserves exact scroll position using `sessionStorage` when navigating back from detail pages to list views.

- 🎨 **Dark Cyberpunk / Sleek Aesthetic**
  - Custom dark color palette, neon red accent highlights (`#E50914` / `#FF2E4D`), smooth micro-interactions, and glassmorphism styling.

---

## 🛠️ Tech Stack

| Technology | Purpose |
| :--- | :--- |
| **[React 19](https://react.dev/)** | Frontend UI Library |
| **[Vite 8](https://vitejs.dev/)** | Lightning-fast Build Tool & Dev Server |
| **[Tailwind CSS v4](https://tailwindcss.com/)** | Utility-First CSS Framework |
| **[React Router v6](https://reactrouter.com/)** | Declarative Client-Side Routing |
| **[Jikan API v4](https://jikan.moe/)** | Unofficial MyAnimeList REST API |

---

## 🚀 Getting Started

### Prerequisites

- **Node.js** `v18.0.0` or higher
- **npm** or **yarn** or **pnpm**

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/0Kareem0/KAIJU.git
   cd KAIJU
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start the development server**
   ```bash
   npm run dev
   ```
   Open your browser at `http://localhost:5173` (or the URL printed in your terminal).

---

## 📦 Build & Deployment

To build the application for production:

```bash
npm run build
```

To preview the production build locally:

```bash
npm run preview
```

---

## 📁 Project Structure

```text
KAIJU/
├── public/                 # Static assets
├── src/
│   ├── components/         # Reusable UI components
│   │   ├── AnimeCard.jsx       # Grid item card for anime & manga
│   │   ├── CTASection.jsx      # Call to action section
│   │   ├── Footer.jsx          # Footer section with links
│   │   ├── GenreButton.jsx     # Filter pill buttons
│   │   ├── GenresSection.jsx    # Horizontal genre browser
│   │   ├── HeroSection.jsx     # Hero slider banner
│   │   ├── Navbar.jsx          # Top navbar, desktop/mobile search & drawer
│   │   ├── ScrollToTop.jsx     # Scroll position memory & restoration
│   │   └── TrendingSection.jsx # Top trending list grid & state
│   ├── pages/              # Router view pages
│   │   ├── Anime.jsx           # Main Anime page route
│   │   ├── Manga.jsx           # Dedicated Manga exploration page
│   │   ├── OneAnime.jsx        # Anime details page
│   │   └── OneManga.jsx        # Manga details page
│   ├── App.jsx             # Main Router layout & search state hub
│   ├── App.css             # Global component styling overrides
│   ├── index.css           # Tailwind v4 import & global styles
│   └── main.jsx            # Application entry point
├── package.json            # Project dependencies & scripts
├── vite.config.js          # Vite configuration
└── README.md               # Project documentation
```

---

## 🌐 API Reference

Data is provided by the **[Jikan API v4](https://jikan.moe/)**, a free, open-source REST API for MyAnimeList.

- `GET /v4/top/anime` — Fetch top trending anime
- `GET /v4/top/manga` — Fetch top trending manga
- `GET /v4/anime` — Search anime by query or genre filter
- `GET /v4/manga` — Search manga by query or genre filter
- `GET /v4/anime/{id}` — Fetch detailed anime info
- `GET /v4/manga/{id}` — Fetch detailed manga info

---

## 👤 Author

Developed with ❤️ by **[Kareem](https://github.com/0Kareem0)**.

---

## 📄 License

This project is open source and available under the [MIT License](LICENSE).
