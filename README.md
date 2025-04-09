# SiriusBits Consulting Website

A professional website for SiriusBits consulting services built with Astro and Svelte.

## Features

- Home page with skills matrix, career summary, featured projects, and contact CTA
- Dynamic Skills and Experience pages with filtering capabilities
- Timeline view of professional experience
- Modern, responsive design

## Tech Stack

- **Astro**: For server-side rendering (SSR) and static site generation
- **Svelte**: For dynamic, client-side interactive components
- **TypeScript**: For type safety and better developer experience
- **Vitest**: For testing

## Development

```bash
# Install dependencies
pnpm install

# Start development server
pnpm dev

# Build for production
pnpm build

# Preview production build
pnpm preview

# Run tests
pnpm test
```

## Project Structure

```text
/
├── public/            # Static assets
├── src/
│   ├── components/    # Svelte components
│   ├── data/          # JSON/Markdown data files
│   ├── layouts/       # Astro layout components
│   └── pages/         # Astro pages
└── package.json       # Project dependencies and scripts
```

## Deployment

This site is configured to deploy on Vercel using the Astro Vercel adapter.
