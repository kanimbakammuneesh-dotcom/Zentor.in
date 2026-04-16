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
| SEO | Vanilla JS |
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
npm run dev      # Dev server (http://localhost:5173)
npm run build    # Production build → dist/
npm run preview # Preview production locally
```

---

## Deployment

### GitHub Actions
Deploys automatically on push to `main` branch only.

1. Push to `main`
2. GitHub Actions triggers
3. `npm ci` installs dependencies
4. `npm run build` creates dist/
5. Cloudflare Workers deploys

**Manual:**
```bash
npm run build
npx wrangler deploy
```

### wrangler.toml
```toml
name = "zentor"
compatibility_date = "2026-04-16"
account_id = "ddbc773e392179a7f7a4e0a2ad4dd379"

[assets]
directory = "dist"
not_found_handling = "single-page-application"
```

---

## Design Theme

### Colors
```css
--acid: #D4FF00        /* Primary accent */
--magenta: #FF0055     /* Secondary accent */
--blurple: #4B00FF     /* Backgrounds, depth */
--cyan: #00F0FF        /* Links, emphasis */
--bg: #030305          /* Dark background */
--text: #F3F4F6       /* Primary text */
--muted: rgba(243,244,246,0.6)
--glass-border: rgba(255,255,255,0.08)
--glass-bg: rgba(20,20,25,0.4)
```

### Typography
- Headings: Unbounded (700, 900)
- Subheadings/Code: JetBrains Mono (700, 800)
- Body: DM Sans (400, 500, 700)

### Visual Style
- Glassmorphism cards
- Dark mode only
- Neon accents
- SVG icons (NOT emojis)

---

## SEO

### How SEO Meta Works
Set via `onMounted()` in each view:

```vue
<script setup>
import { onMounted } from 'vue'

onMounted(() => {
  document.title = 'Page Title | Zentor'
  
  const metaTags = [
    { name: 'description', content: 'Description here...' },
    { property: 'og:title', content: 'Social Title' },
    { property: 'og:description', content: 'Social description...' },
    { property: 'og:image', content: 'https://zentor.in/logos/zentor_for_darkbg.png' },
    { name: 'twitter:card', content: 'summary_large_image' },
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

**Important:** Use vanilla JS - do NOT use `@unhead/vue`

---

## Page Structure

```vue
<template>
  <div class="page">
    <section class="hero">
      <span class="eyebrow">
        <span class="eyebrow-slash">/</span>Page Name
      </span>
      <h1>Page <span class="hl-accent">Headline</span></h1>
      <p class="tagline">Key Message</p>
      <p class="sub-headline">Description...</p>
    </section>
  </div>
</template>

<script setup>
import { onMounted } from 'vue'

onMounted(() => {
  document.title = 'Page Title | Zentor'
  // Set meta tags
})
</script>
```

**Note:** All views must use `.page` wrapper div.

---

## Fillout Form Integration

In Admissions.vue:
```vue
<script setup>
import { onMounted, nextTick } from 'vue'

onMounted(async () => {
  // SEO meta tags
  
  await nextTick()

  // Scroll to form if hash present
  if (window.location.hash === '#apply-form') {
    setTimeout(() => {
      document.getElementById('apply-form')?.scrollIntoView({ behavior: 'smooth', block: 'start' })
    }, 100)
  }

  // Delayed script loading
  setTimeout(() => {
    if (!document.querySelector('script[src*="fillout"]')) {
      const script = document.createElement('script')
      script.src = 'https://server.fillout.com/embed/v1/'
      script.async = true
      document.body.appendChild(script)
    }
  }, 300)
})
</script>

<template>
  <section class="form-section" id="apply-form">
    <div class="form-container">
      <div 
        data-fillout-id="FORM_ID"
        data-fillout-embed-type="standard"
        data-fillout-iframe-height="900px"
      ></div>
    </div>
  </section>
</template>
```

---

## Navigation Links

### External Links (CTA buttons)
Use `<a>` tag with full URL for primary CTAs:
```vue
<a href="https://zentor.in/admissions/" class="btn-cta">
  Get Started →
</a>
```

### Internal Links
Use Vue Router for navigation within the app:
```vue
<router-link to="/admissions/" class="nav-link">Admissions</router-link>
```

---

## File Structure

```
/
├── index.html              # Entry HTML with SEO fallback
├── src/
│   ├── main.js            # Vue app + router
│   ├── App.vue            # Root + Schema.org
│   ├── views/
│   │   ├── Home.vue
│   │   ├── Admissions.vue
│   │   ├── Referrals.vue
│   │   └── Error.vue
│   └── components/
│       ├── NavBar.vue
│       └── Footer.vue
├── public/
│   ├── logos/
│   ├── sitemap.xml
│   └── robots.txt
├── dist/                  # Build output
├── .github/workflows/
│   └── deploy.yml
├── wrangler.toml
└── AGENTS.md
```

---

## Development Rules

### Must Follow
1. **Trailing slashes** - `/page/`
2. **Mobile-first** - Test on 375px
3. **Touch targets** - Minimum 44px
4. **Unique SEO meta** - Every page needs title, description, OG tags
5. **Accessibility** - Semantic HTML, heading hierarchy, alt text
6. **SVG icons** - NOT emojis

### Avoid
1. New fonts
2. Light backgrounds
3. `@unhead/vue` - Use vanilla JS
4. Vue router for primary CTAs - Use external URLs

---

## Testing Checklist

- [ ] Works on mobile (375px), tablet (768px), desktop (1024px+)
- [ ] Forms render correctly
- [ ] Navigation works
- [ ] No horizontal scroll
- [ ] Touch targets ≥44px
- [ ] Console has no errors
- [ ] Lighthouse SEO > 90