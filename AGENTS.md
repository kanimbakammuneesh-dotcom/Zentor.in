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
| Database | RDS (PostgreSQL) |
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
| `NavBar` | Navigation with PNG logo | Already in App.vue |
| `Footer` | Footer with UDYAM code | Already in App.vue |

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

1. **@.agent/skills/vue-best-practices** - For any Vue.js work
   - Use Composition API with `<script setup>`
   - Create reusable components, avoid duplicate code
   - Split large components into smaller focused ones

2. **@.agent/skills/ui-ux-pro-max** - For UI/UX decisions
   - Design system, colors, typography
   - Accessibility (contrast, touch targets, ARIA)
   - Layout and responsive behavior

3. **@.agent/skills/best-practices** - For prompt transformation
   - When unclear about requirements
   - For complex multi-step tasks

### When to Use Skills

| Task | Skill(s) | Notes |
|------|----------|-------|
| Create new component | vue-best-practices | Follow component patterns |
| Design new page section | ui-ux-pro-max | Match design system |
| Fix accessibility issues | ui-ux-pro-max | Check contrast, ARIA |
| Complex refactoring | vue + best-practices | Plan first, then implement |
| SEO improvements | ui-ux-pro-max | Meta tags, structured data |

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
├── AGENTS.md
└── src/
    └── workers/
        └── jobs-api/          # Jobs API worker
            ├── index.ts       # Worker logic (pg client)
            ├── schema.sql     # RDS SQL schema + dummy data
            ├── wrangler.toml  # Worker config
            └── package.json   # Worker dependencies
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

### Avoid
1. New fonts
2. Light backgrounds
3. `@unhead/vue` - Use vanilla JS
4. Vue router for primary CTAs - Use external URLs
5. Duplicate CSS in views - Use components

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