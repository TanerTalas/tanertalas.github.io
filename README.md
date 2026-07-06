# Taner Talas — Full-stack Developer Portfolio

Personal portfolio website of **Taner Talas**, a front-end / fullstack-oriented developer.
Designed, built, and maintained entirely by myself.

🔗 **Live:** [tanertalas-portfolio.vercel.app](https://tanertalas-portfolio.vercel.app)

## Tech Stack

- **React 19** — component-based UI
- **Vite** — dev server and build tooling
- **Tailwind CSS 4** — utility-first styling
- **React Router** — client-side routing
- **Lenis** — smooth scrolling

## Features

- Single-page app with a dedicated projects route
- Light / dark theme toggle (persisted)
- Smooth scrolling powered by Lenis
- Scroll-spy navigation highlighting the active section
- Typewriter effect in the hero
- Reveal-on-scroll animations
- Decorative cloud, wind, and character animations
- Fully responsive layout

## Getting Started

```bash
# Install dependencies
npm install

# Start the dev server
npm run dev

# Build for production
npm run build

# Preview the production build
npm run preview
```

## Project Structure

```
src/
├── components/
│   ├── effects/     # Decorative animations (clouds, wind, mini-me)
│   ├── layout/      # Navbar, Footer
│   ├── sections/    # Hero, About, Services, Stack, Projects, Contact
│   └── ui/          # Reusable UI (ProjectCard, SectionHeading, Reveal)
├── data/            # Content data (projects, services, skills, nav links)
├── hooks/           # Custom hooks (theme, Lenis, scroll-spy, typewriter, in-view)
├── pages/           # HomePage, ProjectsPage
├── App.jsx          # Routes and layout
└── main.jsx         # Entry point
```

## Deployment

The site is deployed on Vercel. A `vercel.json` rewrite serves `index.html` for all
routes so client-side routing works on direct visits and page refreshes.

## License

This project is licensed under the [MIT License](LICENSE).
