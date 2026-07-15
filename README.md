# mmmeisa - vtuber 🐰

Personal link-page website for VTuber **mmmeisa** — kawaii pink theme with animations, admin panel, and Vercel-ready deployment.

## Quick Start

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000)

**Default admin password (dev):** `admin123` — change before deploying!

## Environment Variables

Copy `.env.example` to `.env.local` and fill in values:

| Variable | Required | Description |
|---|---|---|
| `ADMIN_PASSWORD` | Yes (prod) | Plain admin password |
| `ADMIN_PASSWORD_HASH` | Alt | bcrypt hash (preferred for prod) |
| `SESSION_SECRET` | Yes (prod) | Random string for JWT sessions |
| `KV_REST_API_URL` | Vercel | Vercel KV REST URL |
| `KV_REST_API_TOKEN` | Vercel | Vercel KV token |
| `BLOB_READ_WRITE_TOKEN` | Vercel | Vercel Blob token |

Without KV/Blob env vars, the app falls back to local `data/site.json` and `public/uploads/` for development.

## Audio Files

Place royalty-free audio in `public/audio/`:

- `click.mp3` — soft pop sound for button clicks
- `lofi.mp3` — background lofi music (starts muted; user toggles on)

## Deploy to Vercel

1. Push to GitHub
2. Import project in [Vercel](https://vercel.com)
3. Add **Vercel KV** and **Vercel Blob** from the Storage tab
4. Set env vars: `ADMIN_PASSWORD`, `SESSION_SECRET`
5. Deploy

Generate password hash:
```bash
node -e "console.log(require('bcryptjs').hashSync('your-password', 10))"
```

## Features

- Hero with dynamic background & avatar
- About section with floating desk props
- Social links (X, Twitch, Discord, EasyDonate)
- Floating hearts, dust particles, custom cursor
- Loading screen, lofi music toggle, click sounds
- Admin panel: edit profile, upload images, manage socials
- Retro-cute toast notifications
