# Zentor.in - Development Guidelines

## What is Zentor?

**Zentor** is an education platform for Gen Z students in India. It helps intermediate (12th pass) students find their dream colleges in Chennai & Bengaluru through:
- Personalized college matching
- Direct admission support
- Expert counseling
- Referral rewards program

**Target Audience:** Gen Z students (18-22 years) looking for higher education guidance in India.

---

## Design Theme

### Color Palette (CSS Variables)
```css
--acid: #D4FF00        /* Primary accent - buttons, highlights */
--magenta: #FF0055     /* Secondary accent - rewards, special elements */
--blurple: #4B00FF     /* Tertiary accent - backgrounds, depth */
--cyan: #00F0FF        /* Highlight accent - links, emphasis */
--bg: #030305          /* Dark background */
--text: #F3F4F6         /* Primary text */
--muted: rgba(243,244,246,0.6)  /* Secondary text */
--glass-border: rgba(255,255,255,0.08)
--glass-bg: rgba(20,20,25,0.4)
```

### Typography
| Element | Font | Weight |
|---------|------|--------|
| Headings | Unbounded | 700, 900 |
| Subheadings/Code | JetBrains Mono | 700, 800 |
| Body | DM Sans | 400, 500, 700 |

### Visual Style
- **Glassmorphism** - Frosted glass cards with `backdrop-filter: blur(20px)`
- **Dark mode only** - Never use light backgrounds
- **Neon accents** - Acid green and cyan glow effects on interactive elements
- **Particle backgrounds** - Animated canvas particles (purple/pink/cyan)
- **Noise texture** - Subtle SVG noise overlay for depth

---

## Reusable Components

### 1. Navigation Bar
```html
<nav>
  <a href="../" class="nav-logo">Zentor</a>
  <a href="admissions/" class="nav-pill">Admissions</a>
</nav>
```
- Fixed position, gradient background, backdrop blur
- Logo with animated acid-green dot
- Pill-shaped CTA button in acid green

### 2. Hero Section
- Eyebrow text with glassmorphism pill (e.g., `/ Admissions 2026`)
- Large headline with stroke effect on accent words (e.g., `--acid`)
- Tagline in cyan monospace
- Subheadline in muted text

### 3. Glass Cards (Grid)
```html
<div class="motivational-grid">
  <div class="motif-card">
    <div class="motif-icon">🚀</div>
    <h3 class="motif-title">Title</h3>
    <p class="motif-text">Description</p>
  </div>
</div>
```
- Use for feature/benefit sections
- Hover: border glows with `--acid`, subtle lift

### 4. Form Container (for Fillout embeds)
```html
<section class="form-section">
  <div class="form-container">
    <div style="width:100%;height:600px;" data-fillout-id="ID" ...></div>
    <script src="https://server.fillout.com/embed/v1/"></script>
  </div>
</section>
```
- Max-width: 900px, centered
- Height: 600px desktop, 500px mobile
- Glassmorphism border styling

### 5. Footer
```html
<footer>
  <p>Zentor — Mentor for GenZ</p>
  <a href="referrals/" class="secret-refer">Refer & Earn</a>
</footer>
```
- Small text, muted color
- Secret referral link (subtle styling)

---

## Page Structure Template

```html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=5.0, user-scalable=yes">
  <title>Page Title — Zentor</title>
  <meta name="description" content="...">
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Unbounded:wght@400;700;900&family=JetBrains+Mono:wght@400;700;800&family=DM+Sans:opsz,wght@9..40,400;9..40,500;9..40,700&display=swap" rel="stylesheet">
  <style>
    /* CSS variables & base styles */
  </style>
</head>
<body>
  <canvas id="bg-canvas"></canvas>
  <div class="noise-bg"></div>
  <div class="radial-glow"></div>
  <div class="orb orb-1"></div>
  <div class="orb orb-2"></div>

  <nav>
    <a href="../" class="nav-logo">Zentor</a>
    <a href="../" class="nav-pill">Home</a>
  </nav>

  <main class="page">
    <!-- Hero -->
    <section class="hero">
      <!-- Content -->
    </section>

    <!-- Features/Cards -->
    <section>
      <div class="motivational-grid">
        <!-- Cards -->
      </div>
    </section>

    <!-- Form (if needed) -->
    <section class="form-section">
      <div class="form-container">
        <!-- Fillout embed -->
      </div>
    </section>
  </main>

  <footer>
    <p>Zentor — Mentor for GenZ</p>
  </footer>

  <script>
    // Particle animation
  </script>
</body>
</html>
```

---

## Development Rules

### Must Follow
1. **Clean URLs** - Use folder structure: `page/index.html` → `site.com/page/`
2. **Mobile-first** - Test on 375px first, then scale up
3. **Touch targets** - Minimum 44px for buttons/links
4. **Responsive iframes** - Set explicit heights, use `!important` for Fillout embeds
5. **Accessibility** - Proper heading hierarchy, alt text, keyboard navigation
6. **Reduced motion** - Add `@media (prefers-reduced-motion)` support
7. **No build steps** - Plain HTML/CSS/JS only for GitHub Pages

### Keep Consistent
1. Same header/footer across all pages
2. Same color scheme (never add new colors)
3. Same spacing rhythm (8px base)
4. Same animation durations (150-300ms)
5. Same border-radius values (6px cards, 16px forms)

### Avoid
1. New fonts (stick to Unbounded, JetBrains Mono, DM Sans)
2. Light backgrounds
3. Complex JavaScript frameworks
4. Modifying `jobScraper/` directory

---

## File Structure
```
/
├── index.html          # Landing page
├── admissions/         # Admissions page
│   └── index.html
├── referrals/         # Refer & Earn page
│   └── index.html
├── sitemap.xml        # SEO
├── robots.txt         # SEO
└── AGENTS.md          # This file
```

---

## Skills to Use
- `ui-ux-pro-max` - For UI/UX decisions
- `frontend-design` - For responsive/accessible design

---

## Testing Checklist
- [ ] Works on mobile (375px)
- [ ] Works on tablet (768px)
- [ ] Works on desktop (1024px+)
- [ ] Forms render at correct height
- [ ] Navigation links work correctly
- [ ] No horizontal scroll
- [ ] Touch targets ≥44px