# Zentor.in Frontend - OpenCode Guidelines

## Core Files
- UI consists of: `index.html`, `style.css`, `script.js`
- Maintain consistency across all pages

## Critical Constraints
- Static GitHub Pages site - no build steps, direct file edits
- **Do NOT modify** `jobScraper/` directory (tracking only)
- Follow existing color scheme from CSS variables:
  - `--acid: #D4FF00` | `--magenta: #FF0055`
  - `--blurple: #4B00FF` | `--cyan: #00F0FF`
  - `--bg: #030305` | `--text: #F3F4F6`
  - `--muted: rgba(243,244,246,0.6)`
  - Glass effects: `--glass-border: rgba(255,255,255,0.08)`
  - `--glass-bg: rgba(20,20,25,0.4)`

## Font Stack
- Headings: 'Unbounded', sans-serif
- Code: 'JetBrains Mono', monospace
- Body: 'DM Sans', sans-serif

## Skills to Use
- `ui-ux-pro-max` and `frontend-design` for UI work
- Follow `best-practices` for all code

## Verification
- Test changes by viewing GitHub Pages site
- Ensure responsive design works on mobile