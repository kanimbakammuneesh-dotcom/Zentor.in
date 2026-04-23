# Zentor.in - Development Guidelines

## What is Zentor?

**Zentor** is an education platform for Gen Z students in India. It offers:
- Tech courses for placement (AI, Fullstack, Data Analytics, Python)
- College admissions guidance (Chennai & Bengaluru)
- Internship programs with certifications
- Referral rewards program

**Target Audience:** Gen Z students (18-22 years) looking for higher education and tech skills in India.

---

## Tech Stack

| Component | Technology |
|-----------|-------------|
| Framework | Vue 3 (Composition API + `<script setup>`) |
| Build Tool | Vite |
| Routing | Vue Router |
| SEO | Vanilla JS |
| Hosting | Cloudflare Workers |
| Forms | Fillout (direct iframe) |

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

## Reusable Components

Zentor uses a component-based architecture. Use existing components before creating new ones.

### Available Components

| Component | Purpose | Usage |
|-----------|---------|-------|
| `HeroSection` | Hero with eyebrow, headline, tagline, CTA | Pass props for content |
| `CardGrid` | Grid of feature/benefit cards | Pass `cards` array + `accentColor` |
| `FormContainer` | Fillout iframe wrapper | Pass `src` for form URL |
| `ProcessSteps` | Step-by-step process flow | Pass `steps` array |
| `BenefitGrid` | Benefits with emoji icons | Pass `cards` array |
**NavBar:**
- `NavBar` component includes mobile hamburger menu
- Mobile menu uses `IntersectionObserver` for lazy-loading when menu is open
- Logo sizing: `56px` desktop, `44px` scrolled, `40px` mobile
- `z-index: 1002` for nav, `1001` for mobile menu overlay

**Mobile Menu Pattern:**
```vue
<button class="burger-btn" @click="toggleMenu" aria-label="Menu">
  <span class="burger-line"></span>
  <span class="burger-line"></span>
  <span class="burger-line"></span>
</button>

<div class="mobile-menu" :class="{ 'open': isMenuOpen }">
  <div class="mobile-menu-overlay" @click="closeMenu"></div>
  <div class="mobile-menu-panel">
    <router-link to="/courses/" @click="closeMenu">Courses</router-link>
    ...
  </div>
</div>
```
| `Footer` | Footer with UDYAM code | Already in App.vue |
| `JobCard` | Responsive job tile with animations | Pass `job` object |
| `JobFilters` | Glassmorphism job search/filter bar | Pass props for search/filter |
| `JobDescription` | Markdown renderer for job details | Pass `description` string |

### Component Usage Example

```vue
<script setup>
import HeroSection from '@/components/HeroSection.vue'
import CardGrid from '@/components/CardGrid.vue'
import FormContainer from '@/components/FormContainer.vue'

const features = [
  { icon: '<svg...>', title: 'Feature', text: 'Description' }
]
</script>

<template>
  <HeroSection
    eyebrow="Page Name"
    eyebrow-slash="/"
    headline="Main"
    headline-highlight="Text"
    tagline="Tagline"
    subheadline="Description..."
    cta-text="Click Me"
    cta-link="https://zentor.in/"
  />
  
  <CardGrid
    title="Section Title"
    :cards="features"
    accent-color="acid"
  />
  
  <FormContainer
    title="Form Title"
    intro="Intro text"
    src="https://zentor.fillout.com/form"
  />
</template>
```

### Component Props

**HeroSection:**
- `eyebrow`, `eyebrowSlash`, `headline`, `headlineHighlight`
- `tagline`, `subheadline`, `ctaText`, `ctaLink`, `ctaAria`

**CardGrid:**
- `title` - Section heading
- `cards` - Array of `{ icon, title, text }`
- `accentColor` - "acid", "magenta", or "cyan"

**FormContainer:**
- `title`, `intro`, `src`, `ariaLabel`

---

## Skill Usage Guidelines

### Always Use These Skills

1. **@.agent/skills/caveman** — For ALL communication
   - Active mode: full (default)
   - Response pattern: `[thing] [action] [reason]. [next step].`
   - No: filler, articles (a/an/the), hedging, pleasantries
   - Yes: concise, technical, fragments OK
   - Invoke: "caveman mode" or auto-triggered

2. **@.agent/skills/brainstorming** — Before ANY creative work
   - BEFORE implementing: features, components, UI changes, behavior
   - Process: Explore → Clarify → Propose → Get approval
   - NO code until design approved
   - Invoke: automatic before creative tasks

3. **@.agent/skills/frontend-design** — For ALL UI work
   - Design thinking before code
   - Typography, color, motion, spatial composition
   - No generic AI aesthetics
   - Invoke: when building/fixing UI components/pages

4. **@.agent/skills/task-breakdown** — For COMPLEX tasks
   - Break into executable tasks with acceptance criteria
   - Each task: ONE testable outcome
   - Output: `.agents/tasks.md`
   - Invoke: when task has multiple steps

5. **@.agent/skills/vue-best-practices** — For ANY Vue.js work
   - Use Composition API with `<script setup>`
   - Create reusable components, avoid duplicate code
   - Split large components into smaller focused ones

6. **@.agent/skills/ui-ux-pro-max** — For UI/UX decisions
   - Design system, colors, typography
   - Accessibility (contrast, touch targets, ARIA)
   - Layout and responsive behavior

7. **@.agent/skills/best-practices** — For prompt transformation
   - When unclear about requirements
   - For complex multi-step tasks

8. **@.agent/skills/graphify** — For CODE TRAVERSAL
   - Use to explore codebase and find symbols
   - MANDATORY: Use graphify query before manual grep search

### When to Use Skills

| Task | Skill(s) | Notes |
|------|----------|-------|
| Any communication | caveman | Terse, technical, no filler |
| Create feature | brainstorming → frontend-design → task-breakdown | Explore before code |
| Build UI component | frontend-design | Design first, get approval |
| Complex multi-step | task-breakdown | Decompose before implementing |
| Vue component | vue-best-practices | Follow patterns |
| Find code symbols | graphify | NEVER grep before graphify |
| Design new page section | ui-ux-pro-max | Match design system |
| Fix accessibility issues | ui-ux-pro-max | Check contrast, ARIA |
| SEO improvements | ui-ux-pro-max | Meta tags, structured data |

---

## Monetization / Ads Integration

### Monetag Scoped Integration
Zentor uses **Monetag** for monetization. To maintain high UX standards, ads are strictly localized to the Jobs section.

1.  **Lazy Injection**: Monetag scripts are injected via `IntersectionObserver` when user scrolls past the hero section. This prevents ad interference on page load.
2.  **Scoped Purging**: A global navigation guard in `src/main.js` (`router.afterEach`) monitors route changes. If the user leaves the `/jobs/` path, all ad scripts are physically removed from the DOM by their IDs (`monetag-tag`, `monetag-popunder`).
3.  **Initialization**: Global window flags (`_monetagInitialized`) are used to prevent duplicate script injection. These are reset by the navigation guard upon cleanup.

**Ad IDs used for cleanup:**
*   `monetag-tag`: The primary global script.
*   `monetag-popunder`: The popunder intercept script.

**Important**: Do not use standard Google AdSense or native `document.write()` as they interfere with Vue's reactive routing.

---

## SEO

### Dynamic SEO Meta (Required for Every Page)

Set via `onMounted()` in each view:

```vue
<script setup>
import { onMounted } from 'vue'

onMounted(() => {
  document.title = 'Page Title | Zentor'
  
  const metaTags = [
    { name: 'description', content: 'Unique description...' },
    { property: 'og:title', content: 'Page Title' },
    { property: 'og:description', content: 'Social description...' },
    { property: 'og:image', content: 'https://zentor.in/logos/zentor_for_darkbg.png' },
    { property: 'og:url', content: 'https://zentor.in/page/' },
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

**Important:** 
- Use vanilla JS - do NOT use `@unhead/vue`
- Every page needs unique title + description
- Include og:url for each page

---

## Fillout Form Integration

Use direct iframe (simpler, more reliable):

```vue
<script setup>
import FormContainer from '@/components/FormContainer.vue'
</script>

<template>
  <FormContainer
    title="Apply Now"
    intro="Fill out the form..."
    src="https://zentor.fillout.com/admission_interest"
  />
</template>
```

**Form URLs:**
- Admissions: `https://zentor.fillout.com/admission_interest`
- Referrals: `https://zentor.fillout.com/referral_form`

---

## Navigation

### External Links (CTA buttons)
Use `<a>` tag with full URL:
```vue
<a href="https://zentor.in/admissions/" class="btn-cta">
  Get Started →
</a>
```

### Internal Links
Use Vue Router:
```vue
<router-link to="/admissions/" class="nav-link">Admissions</router-link>
```

### Routes

All routes must have trailing slashes:

| Route | Page | Description |
|-------|------|-------------|
| `/` | Home | Landing page |
| `/courses/` | Courses | Tech courses for placement |
| `/admissions/` | Admissions | College admissions form |
| `/internship/` | Internship | Fullstack & AI internships |
| `/referrals/` | Referrals | Referral program |
| `/privacy/` | PrivacyPolicy | DPDPA Privacy Policy |
| `/terms/` | Terms | Terms of Service |
| `/contact/` | Contact | Contact page |
| `/jobs/` | Jobs | Job board with search/filters |
| `/jobs/:id` | JobDetail | Individual job posting details |
| `/*` | Error | 404 page |

---

## File Structure

```
/
├── index.html              # Entry HTML with SEO fallback
├── src/
│   ├── main.js            # Vue app + router
│   ├── App.vue            # Root + NavBar + Footer + Background effects
│   ├── assets/main.css    # Global styles with gradient background
│   ├── views/
│   │   ├── Home.vue           # Hero, features, programs, CTA
│   │   ├── Courses.vue        # Tech courses for placement
│   │   ├── Admissions.vue    # College admissions form
│   │   ├── Internship.vue     # Fullstack & AI internships
│   │   ├── Referrals.vue      # Referral program
│   │   ├── PrivacyPolicy.vue  # DPDPA Privacy Policy
│   │   ├── Terms.vue          # Terms of Service
│   │   ├── Contact.vue        # Contact page
│   │   └── Error.vue          # 404 page
│   └── components/
│       ├── HeroSection.vue
│       ├── CardGrid.vue
│       ├── FormContainer.vue
│       ├── ProcessSteps.vue
│       ├── BenefitGrid.vue
│       ├── JobCard.vue
│       ├── JobFilters.vue
│       ├── JobDescription.vue
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
6. **SVG icons** - NOT emojis (except in BenefitGrid)
7. **Use existing components** - Don't duplicate code
8. **Graphify traversal** - Use graphify to find symbols/code locations before manual search
9. **Single Contiguous Edits** - Favor `replace_file_content` over `multi_replace_file_content` when possible

### Avoid
1. New fonts
2. Light backgrounds
3. `@unhead/vue` - Use vanilla JS
4. Vue router for primary CTAs - Use external URLs
5. Duplicate CSS in views - Use components
6. Manual grep without first querying graphify

---

## Best Coding Practices

1. **DRY (Don't Repeat Yourself)**
   - Extract common logic into composables in `src/composables/`
   - Use reusable components for UI consistency

2. **Clean Components**
   - Keep components under 300 lines; split if they grow too large
   - Use clear, descriptive prop names

3. **Performance & Caching**
   - Use `localStorage` for data that doesn't change often
   - Implement appropriate `Cache-Control` headers in Workers

4. **Type Safety**
   - Use JSDoc or TypeScript (if enabled) for better DX
   - Define clear interfaces for API responses

5. **Security**
   - Never commit secrets (use Wrangler secrets or `.env`)
   - Implement proper CORS and security headers in Workers

---

## Testing Checklist 

- [ ] Build passes (`npm run build`)
- [ ] Works on mobile (375px), tablet (768px), desktop (1024px+)
- [ ] Forms render correctly
- [ ] Navigation works
- [ ] No horizontal scroll
- [ ] Touch targets ≥44px
- [ ] Console has no errors
- [ ] Lighthouse SEO > 90

---

## GitHub Workflow

### Creating PRs
```bash
# Commit changes
git add . && git commit -m "feat: description"

# Push to dev
git push origin dev

# Create PR
gh pr create --base main --head dev --title "PR Title" --body "Description"
```

### Merging
```bash
# After PR approval
gh pr merge <pr-number> --admin --merge
```

---

## Contact Info

| Channel | Details |
|---------|---------|
| Email | contact.email@zentor.in |
| Instagram | @zentor.edtech |
| Website | zentor.in |