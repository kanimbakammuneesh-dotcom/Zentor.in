# Zentor.in - Development Guidelines

## What is Zentor?

**Zentor** is an education platform for Gen Z students in India. It helps intermediate (12th pass) students find their dream colleges in Chennai & Bengaluru through:
- Personalized college matching
- Direct admission support
- Expert counseling
- Referral rewards program

**Target Audience:** Gen Z students (18-22 years) looking for higher education guidance in India.

---

## Tech Stack

| Component | Technology |
|-----------|-------------|
| Framework | Vue 3 (Composition API) |
| Build Tool | Vite |
| Routing | Vue Router |
| SEO | Vanilla JS (no external library) |
| Hosting | Cloudflare Workers |
| Forms | Fillout |

---

## Development

### Setup

```bash
npm install
```

### Run Commands

```bash
npm run dev      # Start local dev server (http://localhost:5173)
npm run build    # Build for production → outputs to dist/
npm run preview  # Preview production build locally
```

### Local Development Notes

- Development server includes hot module replacement (HMR)
- Changes to `.vue` files auto-reload
- No need to manually restart server
- Test in browser at `http://localhost:5173`

---

## Deployment

### Overview

Deployment uses **GitHub Actions** to build and deploy to **Cloudflare Workers** automatically on every push to `main`.

### How It Works

1. Push code to `main` branch
2. GitHub Actions workflow triggers
3. Dependencies installed (`npm ci`)
4. Production build runs (`npm run build`)
5. Cloudflare Workers deploys from `dist/` folder
6. Site live at `https://prod-zentor-in.zentor-admin.workers.dev/`

### Manual Deployment

If GitHub Actions is unavailable:

```bash
# Build locally
npm run build

# Deploy to Cloudflare (requires CLOUDFLARE_API_TOKEN)
npx wrangler deploy
```

### GitHub Actions Setup

The workflow file is at `.github/workflows/deploy.yml`.

**Required GitHub Secret:**
- `CLOUDFLARE_API_TOKEN` - Get from https://dash.cloudflare.com/profile/api-tokens
  - Template: "Edit Cloudflare Workers"
  - Account: `ddbc773e392179a7f7a4e0a2ad4dd379`

### wrangler.toml Configuration

```toml
name = "zentor"
compatibility_date = "2026-04-16"
account_id = "ddbc773e392179a7f7a4e0a2ad4dd379"

[assets]
directory = "dist"
not_found_handling = "single-page-application"
```

The `not_found_handling = "single-page-application"` setting ensures Vue Router routes work correctly.

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

## SEO Optimization

### Important: No External SEO Library

We use **vanilla JavaScript** for SEO meta tags. Do NOT use `@unhead/vue` or similar libraries - they cause context errors in Vue 3.

### How SEO Meta Works

SEO meta tags are set dynamically via `onMounted()` in each view component:

```vue
<script setup>
import { onMounted } from 'vue'

onMounted(() => {
  document.title = 'Page Title | Zentor'
  
  const metaTags = [
    { name: 'description', content: 'Your description here...' },
    { property: 'og:title', content: 'Social Share Title' },
    { property: 'og:description', content: 'Social description...' },
    { property: 'og:image', content: 'https://zentor.in/logos/zentor_for_darkbg.png' },
    { name: 'twitter:card', content: 'summary_large_image' },
    // Add more as needed
  ]
  
  metaTags.forEach(tag => {
    let meta = document.querySelector(`meta[${tag.property ? 'property' : 'name'}="${tag.property || tag.name}"]`)
    if (!meta) {
      meta = document.createElement('meta')
      if (tag.property) meta.setAttribute('property', tag.property)
      else meta.setAttribute('name', tag.name)
      document.head.appendChild(meta)
    }
    meta.setAttribute('content', tag.content)
  })
})
</script>
```

### Required Meta Tags Per Page

Every page MUST include:

1. **Title** - 50-60 chars, unique per page
2. **Description** - 120-160 chars, unique per page
3. **OG Tags** - og:title, og:description, og:image, og:url, og:type, og:site_name
4. **Twitter Cards** - twitter:card, twitter:title, twitter:description, twitter:image, twitter:site
5. **Canonical URL** - Full URL to the page

### Schema.org Structured Data

Add JSON-LD in `App.vue` via `onMounted()`:

```vue
<script setup>
import { onMounted } from 'vue'

onMounted(() => {
  const schemaScript = document.createElement('script')
  schemaScript.type = 'application/ld+json'
  schemaScript.text = JSON.stringify({
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'Organization',
        '@id': 'https://zentor.in/#organization',
        name: 'Zentor',
        url: 'https://zentor.in',
        // ... additional properties
      },
      {
        '@type': 'WebSite',
        '@id': 'https://zentor.in/#website',
        url: 'https://zentor.in',
        name: 'Zentor — Mentor for GenZ',
        publisher: { '@id': 'https://zentor.in/#organization' },
        potentialAction: {
          '@type': 'SearchAction',
          target: 'https://zentor.in/admissions/?q={search_term_string}',
          'query-input': 'required name=search_term_string'
        }
      }
    ]
  })
  document.head.appendChild(schemaScript)
})
</script>
```

### Static SEO Meta (index.html)

Fallback SEO meta is in `index.html` - this is the static HTML that search engines and social media crawlers see before JavaScript executes.

Update these tags in `index.html` for default page values:
- Title
- Meta description
- OG image
- Schema.org JSON-LD

---

## Accessibility Requirements

1. **Semantic HTML** - Use proper heading hierarchy (h1 → h2 → h3)
2. **Skip Links** - Include `#main-content` for keyboard navigation
3. **Alt Text** - All images must have descriptive alt text
4. **ARIA Labels** - Add `aria-label` to icon-only buttons
5. **Focus States** - Visible focus rings on all interactive elements
6. **Reduced Motion** - Respect `prefers-reduced-motion`

```vue
<nav>
  <router-link to="/" class="nav-logo">Zentor</router-link>
</nav>

<main id="main-content">
  <h1>Page Title</h1>
  <section aria-labelledby="section-heading">
    <h2 id="section-heading">Section Heading</h2>
  </section>
</main>
```

---

## Performance Targets

- **LCP** (Largest Contentful Paint): < 2.5s
- **INP** (Interaction to Next Paint): < 200ms
- **CLS** (Cumulative Layout Shift): < 0.1

Best practices:
- Lazy load below-fold images with `loading="lazy"`
- Preload critical fonts
- Minimize JavaScript bundle size
- Use `will-change` sparingly

---

## Reusable Components

### Navigation Bar
```html
<nav>
  <router-link to="/" class="nav-logo">Zentor</router-link>
  <div class="nav-links">
    <router-link to="/admissions/" class="nav-link">Admissions</router-link>
    <router-link to="/referrals/" class="nav-pill">Refer & Earn</router-link>
  </div>
</nav>
```

### Hero Section
- Eyebrow text with glassmorphism pill (e.g., `/ Admissions 2026`)
- Large headline with accent words
- Tagline in cyan monospace
- Subheadline in muted text

### Glass Cards (Grid)
```html
<div class="motivational-grid">
  <article class="motif-card">
    <div class="motif-icon">
      <!-- SVG icon, NOT emoji -->
    </div>
    <h3 class="motif-title">Title</h3>
    <p class="motif-text">Description</p>
  </article>
</div>
```

### Form Container (Fillout)
```html
<section class="form-section" aria-labelledby="form-heading">
  <h2 id="form-heading" class="sr-only">Form Title</h2>
  <div class="form-container">
    <iframe src="..." title="Form"></iframe>
  </div>
</section>
```

### Footer
```html
<footer>
  <p>Zentor — Mentor for GenZ</p>
  <router-link to="/referrals/" class="secret-refer">Refer & Earn</router-link>
</footer>
```

---

## Page Structure Template

```vue
<template>
  <section class="hero">
    <span class="eyebrow">
      <span class="eyebrow-slash">/</span>Page Name
    </span>
    <h1>Page <span class="hl-accent">Headline</span></h1>
    <p class="tagline">Key Message</p>
    <p class="sub-headline">Description...</p>
  </section>
  
  <section aria-labelledby="features-heading">
    <h2 id="features-heading" class="sr-only">Section Name</h2>
    <!-- Cards grid -->
  </section>
</template>

<script setup>
import { onMounted } from 'vue'

onMounted(() => {
  document.title = 'Page Title | Zentor'
  
  const metaTags = [
    { name: 'description', content: 'Unique description...' },
    { property: 'og:title', content: 'Page Title' },
    // ... other tags
  ]
  
  metaTags.forEach(tag => {
    let meta = document.querySelector(`meta[${tag.property ? 'property' : 'name'}="${tag.property || tag.name}"]`)
    if (!meta) {
      meta = document.createElement('meta')
      if (tag.property) meta.setAttribute('property', tag.property)
      else meta.setAttribute('name', tag.name)
      document.head.appendChild(meta)
    }
    meta.setAttribute('content', tag.content)
  })
})
</script>

<style scoped>
/* Mobile-first styles */
</style>
```

---

## Development Rules

### Must Follow
1. **Clean URLs** - Use trailing slashes: `/page/`
2. **Mobile-first** - Test on 375px first, then scale up
3. **Touch targets** - Minimum 44px for buttons/links
4. **SEO meta** - Every page needs unique title, description, OG tags
5. **Accessibility** - Proper heading hierarchy, alt text, keyboard nav
6. **Reduced motion** - Add `@media (prefers-reduced-motion)` support
7. **SVG icons** - Use SVG components, NOT emojis for icons
8. **Schema.org** - Add JSON-LD structured data for rich snippets

### Keep Consistent
1. Same header/footer across all pages
2. Same color scheme (never add new colors)
3. Same spacing rhythm (8px base)
4. Same animation durations (150-300ms)
5. Same border-radius values (6px cards, 16px forms)

### Avoid
1. **New fonts** - Stick to Unbounded, JetBrains Mono, DM Sans
2. **Light backgrounds** - Dark mode only
3. **Emojis as icons** - Use SVG instead
4. **Duplicate meta** - Every page needs unique tags
5. **Blocking renders** - Load third-party scripts async/defer
6. **@unhead/vue** - Use vanilla JS for SEO instead

---

## File Structure

```
/
├── index.html              # Entry HTML with fallback SEO meta
├── src/
│   ├── main.js            # Vue app initialization + router
│   ├── App.vue            # Root component + Schema.org JSON-LD
│   ├── views/             # Page components
│   │   ├── Home.vue
│   │   ├── Admissions.vue
│   │   ├── Referrals.vue
│   │   └── Error.vue      # 404 page
│   ├── components/        # Reusable components
│   │   ├── NavBar.vue
│   │   └── Footer.vue
│   └── assets/
│       └── main.css
├── public/
│   ├── logos/             # OG images
│   ├── sitemap.xml        # XML sitemap
│   └── robots.txt         # Crawler directives
├── dist/                  # Build output (deployed to Cloudflare)
├── .github/
│   └── workflows/
│       └── deploy.yml     # GitHub Actions deployment
├── wrangler.toml          # Cloudflare Workers config
├── vite.config.js         # Vite build config
├── package.json
└── AGENTS.md              # This file
```

---

## SEO Files Reference

### sitemap.xml
- Update `{{lastmod}}` before deployment with current date (ISO 8601)
- Include image tags for OG images
- Add hreflang for language variants

### robots.txt
- Allows all AI crawlers (GPTBot, Claude, Perplexity)
- Blocks known scrapers
- Points to sitemap

### index.html
- Contains static fallback SEO meta tags
- Search engines see this before JavaScript executes
- Update for default page values

---

## Pre-Launch SEO Checklist

Before deploying, verify:

- [ ] Unique title tags on every page (< 60 chars)
- [ ] Unique meta descriptions on every page (120-160 chars)
- [ ] Open Graph tags set correctly
- [ ] Twitter Card tags set correctly
- [ ] Schema.org JSON-LD validates (test at https://validator.schema.org/)
- [ ] sitemap.xml accessible at `/sitemap.xml`
- [ ] robots.txt accessible at `/robots.txt`
- [ ] OG images exist and are 1200x630px minimum
- [ ] `<html lang="en-IN">` set correctly
- [ ] `<main id="main-content">` exists for skip links
- [ ] Headings follow h1 → h2 → h3 hierarchy
- [ ] All images have alt text
- [ ] No duplicate meta descriptions

---

## Testing Checklist

- [ ] Works on mobile (375px)
- [ ] Works on tablet (768px)
- [ ] Works on desktop (1024px+)
- [ ] Forms render at correct height
- [ ] Navigation links work correctly
- [ ] No horizontal scroll
- [ ] Touch targets ≥44px
- [ ] Browser console has no errors
- [ ] Vue devtools shows components mounting correctly
- [ ] Lighthouse SEO score > 90

---

## External Resources

### SEO Testing
- [Google Search Console](https://search.google.com/search-console)
- [Schema.org Validator](https://validator.schema.org/)
- [Google Rich Results Test](https://search.google.com/test/rich-results)
- [Lighthouse](https://developer.chrome.com/docs/lighthouse/)
- [Facebook Debugger](https://developers.facebook.com/tools/debug/)

### Vue.js
- [Vue 3 Documentation](https://vuejs.org/)
- [Vue Router Documentation](https://router.vuejs.org/)
- [Vite Documentation](https://vitejs.dev/)

### Cloudflare
- [Cloudflare Workers Docs](https://developers.cloudflare.com/workers/)
- [Wrangler CLI](https://developers.cloudflare.com/workers/wrangler/)
