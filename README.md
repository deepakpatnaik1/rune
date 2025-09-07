# Rune

A full-stack TypeScript application built with Svelte 5 (with runes) and Hono.js, deployed on Cloudflare Workers with R2 storage support.

## Tech Stack

- **Frontend**: Svelte 5 with runes, Vite, TailwindCSS, TypeScript
- **Backend**: Hono.js on Cloudflare Workers, TypeScript
- **Storage**: Cloudflare R2 buckets
- **Testing**: Vitest
- **Linting**: ESLint + Prettier
- **Package Manager**: pnpm with workspaces

## Project Structure

```
rune/
├── packages/
│   ├── frontend/     # Svelte 5 application
│   └── backend/      # Hono.js API on Cloudflare Workers
└── shared configs    # ESLint, Prettier, etc.
```

## Getting Started

1. **Install dependencies**:
   ```bash
   pnpm install
   ```

2. **Environment Setup**:
   ```bash
   cp .env.example .env
   # Edit .env with your Cloudflare credentials
   ```

3. **Development**:
   ```bash
   pnpm dev    # Start both frontend and backend
   ```

   Or run individually:
   ```bash
   pnpm --filter @rune/frontend dev    # Frontend only (port 5173)
   pnpm --filter @rune/backend dev     # Backend only (port 8787)
   ```

## Available Scripts

- `pnpm dev` - Start development servers for both packages
- `pnpm build` - Build both packages for production
- `pnpm test` - Run tests in both packages
- `pnpm lint` - Lint all packages
- `pnpm format` - Format code with Prettier
- `pnpm type-check` - TypeScript type checking

## R2 Bucket Setup

1. Create an R2 bucket in your Cloudflare dashboard
2. Generate R2 API tokens
3. Update `wrangler.toml` with your bucket configuration
4. Set environment variables in `.env`

## Deployment

**Backend (Cloudflare Workers)**:
```bash
cd packages/backend
pnpm deploy
```

**Frontend**: Build and deploy to your preferred hosting platform:
```bash
cd packages/frontend
pnpm build
# Deploy the `dist/` directory
```

## Development Notes

- Frontend runs on `http://localhost:5173`
- Backend runs on `http://localhost:8787`
- API routes are prefixed with `/api`
- CORS is configured for local development
- Shared TypeScript types can be created in `packages/backend/src/types.ts`