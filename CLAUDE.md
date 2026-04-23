# CLAUDE.md

## What This Is
Company website for Canlah AI (canlah.ai). Dark SaaS design, bilingual (EN/ZH).

## Tech Stack
- Nuxt 4 + Tailwind CSS
- Deployed on Vercel (auto-deploy on push)

## How to Run
```bash
npm install
npm run dev
```

## No Database
Static marketing site. No Supabase needed.

## Brand Rules
- Navy #050d1a, Cyan #00d4ff, Blue #0d47e0, Green #00e5a0
- Dark theme only
- See canmarket-brand skill for guidelines

## Shared Knowledge Base — agent-kb

Before starting work, check [Canlah-AI/agent-kb](https://github.com/Canlah-AI/agent-kb) — shared memory for all Canlah AI agents:
- `decisions/` — architectural rationale
- `patterns/` — reusable how-to
- `lessons/` — known gotchas — scan before debugging
- `products/` — living product docs (including `products/AMAZON_SUITE.md`)
- `runbooks/` — incident playbooks
- `apis/` — external API quirks

**Read without cloning:**
```bash
gh api repos/Canlah-AI/agent-kb/contents/<path> --jq .content | base64 -d
```

**Read when:** starting any task here, designing a new feature, hitting non-obvious bugs.

**Write when:** you learn something non-obvious — drop a lesson in `lessons/YYYY-MM-DD_<slug>.md` (<200 lines), commit to agent-kb main directly.
