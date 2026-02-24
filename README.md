# Rick & Morty Blog

A modern, server-side rendered web application for exploring characters, episodes, and locations from the Rick and Morty universe. Built with Nuxt 4, Vue 3, TypeScript, and Tailwind CSS v4.

🚀 **Live Demo:** [https://resonant-genie-c13bf1.netlify.app/](https://resonant-genie-c13bf1.netlify.app/)

📊 PageSpeed Insights

[🔍 View PageSpeed Report](https://pagespeed.web.dev/analysis/https-resonant-genie-c13bf1-netlify-app-character-rick-sanchez-1/b1wdgejv8m?form_factor=mobile)

---

## Features

- **Character Search** — Real-time search with debounced input and URL-synced query params
- **Character Detail Pages** — Full character profile including status, species, origin, and location
- **Episode Listings** — All episodes a character appears in, fetched in parallel
- **Location Info** — Detailed location data tied to each character
- **SSR (Server-Side Rendering)** — Full SSR with Nuxt 4 for fast initial loads and SEO
- **SEO Optimized** — Per-page `useSeoMeta`, Open Graph tags, Twitter cards, JSON-LD structured data, and canonical URLs
- **Page Transitions** — Smooth `out-in` transitions for pages and layouts
- **Pagination** — URL-based pagination that survives refresh and sharing
- **Skeleton Loaders** — Graceful loading states with card skeleton components
- **Error & Empty States** — Dedicated UI states for errors, empty results, and idle search
- **Docker Support** — Multi-stage Dockerfile for production-optimized container builds
- **Code Quality** — ESLint (flat config) + Prettier with Tailwind plugin

---

## Tech Stack

| Layer            | Technology                                             |
| ---------------- | ------------------------------------------------------ |
| Framework        | [Nuxt 4](https://nuxt.com)                             |
| UI Library       | [Vue 3](https://vuejs.org) (Composition API)           |
| Language         | TypeScript (strict mode)                               |
| Styling          | [Tailwind CSS v4](https://tailwindcss.com)             |
| API              | [Rick and Morty REST API](https://rickandmortyapi.com) |
| Deployment       | [Netlify](https://netlify.com)                         |
| Linting          | ESLint v9 (flat config) + Prettier                     |
| Containerization | Docker (multi-stage build)                             |

---

## Project Structure

```
app/
├── assets/css/          # Global styles (Tailwind entry)
├── components/
│   ├── charecter-detail/ # Character detail page components
│   ├── search/           # Search page components (card, bar, states, pagination)
│   └── ui/               # Shared UI primitives (skeleton loader, glow orb)
├── composables/
│   └── api/              # Data-fetching composables (character, episodes, location)
├── layouts/              # Default layout
├── pages/
│   ├── index.vue         # Character search page
│   └── character/[name]/[id].vue  # Character detail page
├── stores/               # Pinia stores
├── types/                # Shared TypeScript types
└── utils/                # SEO utilities
```

---

## Getting Started

### Prerequisites

- **Node.js** >= 20
- **npm** >= 10

### Installation

```bash
# Clone the repository
git clone https://github.com/your-username/Rick-Morty-Blog.git
cd Rick-Morty-Blog

# Install dependencies
npm install
```

### Environment Variables

Create a `.env` file in the root:

```env
NUXT_PUBLIC_API_BASE=https://rickandmortyapi.com/api
```

> The app proxies API calls through `NUXT_PUBLIC_API_BASE`. The default points to the public Rick and Morty API.

### Development

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

### Build for Production

```bash
npm run build
npm run preview
```

### Type Checking

```bash
npm run typecheck
```

### Lint & Format

```bash
npm run lint          # Check for lint errors
npm run lint:fix      # Auto-fix lint errors
npm run format        # Format all files with Prettier
npm run format:check  # Check formatting without writing
```

---

## Docker

The project includes a multi-stage Dockerfile optimized for production.

### Build & Run

```bash
# Build the image
docker build -t rick-morty-blog .

# Run the container
docker run -p 3000:3000 rick-morty-blog
```

### Static / CDN Build (pre-compressed assets)

```bash
docker build --target statics -t rick-morty-blog:static .
docker run -p 80:80 rick-morty-blog:static
```

---

## Deployment

The project is deployed on **Netlify** using the `@nuxt/nitro` Netlify preset.

Netlify build config ([netlify.toml](netlify.toml)):

```toml
[build]
  command = "npm run build"
  publish = "dist"
  functions = ".netlify/functions-internal"

[build.environment]
  NODE_VERSION = "20"
```

Every push to the main branch triggers an automatic deploy.

🌐 **Production URL:** [https://resonant-genie-c13bf1.netlify.app/](https://resonant-genie-c13bf1.netlify.app/)

---

## API Reference

This project consumes the free [Rick and Morty API](https://rickandmortyapi.com/documentation).

| Endpoint                     | Usage                            |
| ---------------------------- | -------------------------------- |
| `GET /character?name=&page=` | Character search with pagination |
| `GET /character/:id`         | Single character detail          |
| `GET /episode/:id`           | Episode data                     |
| `GET /location/:id`          | Location data                    |

---

## Scripts Reference

| Script                 | Description                |
| ---------------------- | -------------------------- |
| `npm run dev`          | Start development server   |
| `npm run build`        | Build for production       |
| `npm run generate`     | Static site generation     |
| `npm run preview`      | Preview production build   |
| `npm run typecheck`    | Run TypeScript type checks |
| `npm run lint`         | Lint codebase              |
| `npm run lint:fix`     | Lint and auto-fix          |
| `npm run format`       | Format with Prettier       |
| `npm run format:check` | Check Prettier formatting  |
| `npm run analyze`      | Run Nuxt boundle analyzer  |

---

## License

This project is open source and available under the [MIT License](LICENSE).

---

> Data provided by the [Rick and Morty API](https://rickandmortyapi.com). This project is not affiliated with Adult Swim or the creators of Rick and Morty.
