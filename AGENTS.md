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
| SEO | @unhead/vue |
| Hosting | Cloudflare Pages (via GitHub Pages) |
| Forms | Fillout |

---

## Run Commands

```bash
npm run dev      # Start local development server
npm run build    # Build for production (outputs to dist/)
npm run preview  # Preview production build locally
```

**Deployment:** Push to GitHub — Cloudflare Pages auto-deploys from `dist/` folder.

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

## SEO Optimization (Vue.js)

### Core SEO Principles

All Vue views use `@unhead/vue` for meta tag management. Every page MUST include:

#### 1. Title Tags
- Format: `Page Name — Zentor` or `Page Name | Zentor`
- Length: 50-60 characters
- Unique per page (no duplicates)
- Include primary keyword

```vue
useSeoMeta({
  title: 'Admissions 2026 — Apply Now | Zentor',
})
```

#### 2. Meta Descriptions
- Length: 120-160 characters
- Include primary & secondary keywords
- Clear call-to-action when appropriate
- Unique per page

```vue
useSeoMeta({
  description: 'Apply for direct admissions to top colleges in Chennai & Bengaluru...',
})
```

#### 3. Open Graph Tags (Social Sharing)
```vue
useSeoMeta({
  ogTitle: 'Page Title',
  ogDescription: 'Description for social sharing',
  ogImage: 'https://zentor.in/logos/zentor_for_darkbg.png',
  ogUrl: 'https://zentor.in/page/',
  ogType: 'website',
  ogSiteName: 'Zentor',
})
```

#### 4. Twitter Card Tags
```vue
useSeoMeta({
  twitterCard: 'summary_large_image',
  twitterTitle: 'Page Title',
  twitterDescription: 'Description (max 200 chars)',
  twitterImage: 'https://zentor.in/logos/zentor_for_darkbg.png',
  twitterSite: '@zentoredu',
})
```

#### 5. Canonical URLs
```vue
useSeoMeta({
  canonical: 'https://zentor.in/page/',
})
```

#### 6. Robots Directives
```vue
useSeoMeta({
  robots: 'index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1',
})
```

#### 7. 404 Pages (Noindex)
```vue
useSeoMeta({
  robots: 'noindex, nofollow',
  googlebot: 'noindex, nofollow',
})
```

### Schema.org Structured Data

Add JSON-LD in `App.vue` for Organization and WebSite schema:

```vue
useHead({
  script: [
    {
      type: 'application/ld+json',
      children: JSON.stringify({
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
            potentialAction: {
              '@type': 'SearchAction',
              target: 'https://zentor.in/admissions/?q={search_term_string}',
              'query-input': 'required name=search_term_string'
            }
          }
        ]
      })
    }
  ]
})
```

### SEO Meta Template (Copy-Paste for New Pages)

```vue
<script setup>
import { useSeoMeta } from '@unhead/vue'

const route = useRoute()
const currentUrl = `https://zentor.in${route.path}`

useSeoMeta({
  title: 'Page Title | Zentor',
  ogTitle: 'Page Title',
  description: 'Unique description for this page (120-160 chars)...',
  ogDescription: 'Social sharing description...',
  ogImage: 'https://zentor.in/logos/zentor_for_darkbg.png',
  ogUrl: currentUrl,
  ogType: 'website',
  ogSiteName: 'Zentor',
  twitterCard: 'summary_large_image',
  twitterTitle: 'Page Title',
  twitterDescription: 'Twitter description...',
  twitterImage: 'https://zentor.in/logos/zentor_for_darkbg.png',
  twitterSite: '@zentoredu',
  canonical: currentUrl,
  robots: 'index, follow, max-image-preview:large, max-snippet:-1',
  'article:published_time': '2025-01-01',
  'article:modified_time': new Date().toISOString(),
  'article:author': 'https://zentor.in/#organization',
  'article:section': 'Section Name',
  'article:tag': ['tag1', 'tag2', 'tag3']
})
</script>
```

### Accessibility Requirements (Critical for SEO)

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

### Performance for SEO

Core Web Vitals targets (Google ranking factors):
- **LCP** (Largest Contentful Paint): < 2.5s
- **INP** (Interaction to Next Paint): < 200ms
- **CLS** (Cumulative Layout Shift): < 0.1

Best practices:
- Lazy load below-fold images with `loading="lazy"`
- Preload critical fonts
- Minimize JavaScript bundle size
- Use `will-change` sparingly for animations

---

## Reusable Components

### 1. Navigation Bar
```html
<nav>
  <router-link to="/" class="nav-logo">Zentor</router-link>
  <div class="nav-links">
    <router-link to="/admissions/" class="nav-link">Admissions</router-link>
    <router-link to="/referrals/" class="nav-pill">Refer & Earn</router-link>
  </div>
</nav>
```

### 2. Hero Section
- Eyebrow text with glassmorphism pill (e.g., `/ Admissions 2026`)
- Large headline with stroke effect on accent words (e.g., `--acid`)
- Tagline in cyan monospace
- Subheadline in muted text

### 3. Glass Cards (Grid)
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

### 4. Form Container (for Fillout embeds)
```html
<section class="form-section" aria-labelledby="form-heading">
  <h2 id="form-heading" class="sr-only">Form Title</h2>
  <div class="form-container">
    <div data-fillout-id="ID" ...></div>
    <script src="https://server.fillout.com/embed/v1/"></script>
  </div>
</section>
```

### 5. Footer
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
import { useSeoMeta } from '@unhead/vue'

useSeoMeta({
  title: 'Page Title | Zentor',
  description: 'Unique description...',
  // ... other SEO tags
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

---

## File Structure
```
/
├── index.html          # Entry HTML with fallback SEO meta
├── src/
│   ├── main.js         # Vue app initialization + head setup
│   ├── App.vue         # Root component + Schema.org JSON-LD
│   ├── views/          # Page components
│   │   ├── Home.vue
│   │   ├── Admissions.vue
│   │   ├── Referrals.vue
│   │   └── Error.vue   # 404 page
│   ├── components/     # Reusable components
│   │   ├── NavBar.vue
│   │   └── Footer.vue
│   └── assets/
│       └── main.css
├── public/
│   └── logos/          # OG images
├── dist/               # Build output (auto-deployed)
├── sitemap.xml         # XML sitemap
├── robots.txt          # Crawler directives
├── _headers            # Cloudflare headers
├── vite.config.js      # Build configuration
├── package.json
└── AGENTS.md           # This file
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

### _headers (Cloudflare)
- Security headers (X-Frame-Options, CSP, etc.)
- Cache-Control for static assets
- Short TTL for HTML, long TTL for assets

---

## Pre-Launch SEO Checklist

Before deploying, verify:

- [ ] Unique title tags on every page (< 60 chars)
- [ ] Unique meta descriptions on every page (120-160 chars)
- [ ] Open Graph tags set correctly
- [ ] Twitter Card tags set correctly
- [ ] Canonical URLs configured
- [ ] Schema.org JSON-LD validates (test at https://validator.schema.org/)
- [ ] sitemap.xml accessible at `/sitemap.xml`
- [ ] robots.txt accessible at `/robots.txt`
- [ ] OG images exist and are 1200x630px minimum
- [ ] `<html lang="en-IN">` set correctly
- [ ] `<main id="main-content">` exists for skip links
- [ ] Headings follow h1 → h2 → h3 hierarchy
- [ ] All images have alt text
- [ ] No duplicate meta descriptions
- [ ] Google Search Console verified
- [ ] Sitemap submitted to Google Search Console

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
- [ ] SEO meta visible in "View Source"
- [ ] Lighthouse SEO score > 90
- [ ] Core Web Vitals pass (LCP < 2.5s, INP < 200ms, CLS < 0.1)

---

## External Resources

### SEO Testing
- [Google Search Console](https://search.google.com/search-console)
- [Schema.org Validator](https://validator.schema.org/)
- [Google Rich Results Test](https://search.google.com/test/rich-results)
- [Lighthouse](https://developer.chrome.com/docs/lighthouse/)
- [Facebook Debugger](https://developers.facebook.com/tools/debug/)

### Vue SEO
- [@unhead/vue Documentation](https://unhead.unjs.io/)
- [Vue.js SEO Guide](https://nuxtseo.com/learn-seo/vue)
- [2026 SEO Checklist for Vue](https://nuxtseo.com/learn-seo/checklist)
