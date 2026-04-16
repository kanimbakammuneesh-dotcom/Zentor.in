# Zentor Deployment Guide

Complete step-by-step instructions for deploying Zentor to Cloudflare Pages.

---

## Quick Start

```bash
npm run dev      # Local development (http://localhost:5173)
npm run build    # Build for production → dist/
npm run preview  # Preview production build locally
```

---

## Step 1: Push to GitHub

```bash
# Navigate to project
cd /home/muneeshk/Zentor.in

# Stage all changes
git add .

# Commit with descriptive message
git commit -m "Your commit message"

# Push to main branch
git push origin main
```

Cloudflare Pages will automatically detect the push and start building.

---

## Step 2: Setup Cloudflare Pages

### 2.1 Create Cloudflare Account
1. Go to: https://dash.cloudflare.com/
2. Sign up / Log in

### 2.2 Create a Pages Project
1. Click **"Workers & Pages"** in the sidebar
2. Click **"Create application"**
3. Select **"Pages"** tab
4. Click **"Connect to Git"**

### 2.3 Connect GitHub Repository
1. Select your `zentor` repository
2. Click **"Connect"**

### 2.4 Configure Build Settings

| Setting | Value |
|---------|-------|
| **Production branch** | `main` |
| **Build command** | `npm run build` |
| **Build output directory** | `dist` |
| **Root directory** | `/` (leave empty) |

### 2.5 Add Environment Variables
Click **"Environment variables"** and add:

| Variable | Value |
|----------|-------|
| `NODE_VERSION` | `18` |

### 2.6 Deployment Settings
✅ Enable **"Build from pull request"**  
✅ Enable **"Deploy preview deployments"**

### 2.7 Save and Deploy
Click **"Save and Deploy"**

---

## Step 3: Setup Custom Domain (zentor.in)

### 3.1 In Cloudflare Pages
1. Go to your project's **"Settings"**
2. Click **"Custom domains"**
3. Click **"Set up a custom domain"**
4. Enter: `zentor.in`
5. Click **"Continue"**

### 3.2 Configure DNS at Your Registrar
Go to where you registered `zentor.in` (e.g., GoDaddy, Namecheap) and add:

```
Type: CNAME
Name: zentor
Target: your-project.pages.dev
TTL: Auto
Proxy status: DNS only (grey cloud)
```

### 3.3 Wait for SSL
Cloudflare auto-provisions SSL certificates. This takes 1-5 minutes.

---

## Step 4: Google Search Console Setup

### 4.1 Create Property
1. Go to: https://search.google.com/search-console
2. Click **"Add property"**
3. Choose **"Domain"** type
4. Enter: `zentor.in`
5. Click **"Continue"**

### 4.2 Verify Ownership
- **If using Cloudflare DNS:** Automatic verification
- **Otherwise:** Add the TXT record shown by Google

### 4.3 Submit Sitemap
1. In GSC sidebar, click **"Sitemaps"**
2. Enter: `sitemap.xml`
3. Click **"Submit"**

### 4.4 Request Indexing
1. Go to **"URL Inspection"**
2. Enter each URL and click **"Request indexing"**:

```
https://zentor.in/
https://zentor.in/admissions/
https://zentor.in/referrals/
```

---

## Step 5: SEO Verification

Test your site at these tools:

| Tool | URL | What to Check |
|------|-----|---------------|
| **Schema.org Validator** | https://validator.schema.org/ | JSON-LD structured data |
| **Google Rich Results** | https://search.google.com/test/rich-results | Rich snippets eligibility |
| **Facebook Debugger** | https://developers.facebook.com/tools/debug/ | Open Graph tags |
| **Twitter Card Validator** | https://cards-dev.twitter.com/validator | Twitter Card display |
| **Lighthouse** | Chrome DevTools → Lighthouse | SEO score, Performance |
| **Mobile-Friendly Test** | https://search.google.com/test/mobile-friendly | Mobile usability |

### View Source Verification
Open each page and verify these tags exist:

```html
<!-- In <head> -->
<title>Page Title | Zentor</title>
<meta name="description" content="...">
<meta property="og:title" content="...">
<meta property="og:image" content="...">
<link rel="canonical" href="https://zentor.in/...">
<script type="application/ld+json">...Organization...</script>
```

---

## Step 6: Social Sharing Test

### Facebook
1. Go to: https://developers.facebook.com/tools/debug/
2. Paste: `https://zentor.in/`
3. Click **"Debug"**
4. Check: Title, Description, Image preview

### Twitter
1. Go to: https://cards-dev.twitter.com/validator
2. Paste: `https://zentor.in/`
3. Click **"Preview card"**
4. Check: Large image card display

---

## Step 7: Post-Launch Monitoring

### Weekly Tasks
1. **Google Search Console → Performance**
   - Monitor: Impressions, Clicks, CTR, Average position
   - Check for any coverage issues

2. **Core Web Vitals**
   - Go to: GSC → Experience → Core Web Vitals
   - Targets: LCP < 2.5s, INP < 200ms, CLS < 0.1

3. **Indexing Status**
   - Run `site:zentor.in` in Google search
   - Verify all pages are indexed

### Monthly Tasks
- Review GSC Performance report
- Check for 404 errors in Coverage report
- Monitor search rankings for key terms:
  - "college admissions Chennai"
  - "direct admission Bengaluru"
  - "Gen Z education India"

---

## Troubleshooting

| Issue | Solution |
|-------|----------|
| **404 on routes** | Ensure Cloudflare Pages SPA routing is enabled |
| **SSL certificate error** | Wait 5 minutes, or set SSL mode to "Flexible" |
| **Schema validation fails** | Check JSON-LD at https://json-validator.com/ |
| **OG image not showing** | Verify image at `/logos/zentor_for_darkbg.png` is accessible |
| **Sitemap 404** | Ensure `public/sitemap.xml` exists before build |
| **Build fails** | Check Cloudflare Pages build logs for errors |

### Common Cloudflare Pages Issues

**"Page not found" on route change:**
- Cloudflare Pages → Settings → Builds → Add `_headers` file to `dist/`

**Build timeout:**
- Increase build timeout in project settings
- Or optimize bundle size

**Custom domain not working:**
- Verify DNS propagation: https://dnschecker.org/
- Check Cloudflare SSL mode is enabled

---

## File Structure After Build

```
dist/
├── index.html          # Main entry (with all SEO meta)
├── assets/
│   ├── index-*.js     # Vue app bundle
│   └── index-*.css    # Styles
├── sitemap.xml        # SEO sitemap
├── robots.txt         # Crawler directives
└── _headers          # Cloudflare headers
```

---

## Update Sitemap Before Major Releases

Edit `public/sitemap.xml` and update the `<lastmod>` date:

```xml
<lastmod>2026-04-16</lastmod>
```

Then rebuild and push:

```bash
npm run build
git add .
git commit -m "chore: Update sitemap date"
git push
```

---

## Important URLs

| Resource | URL |
|----------|-----|
| Cloudflare Dashboard | https://dash.cloudflare.com/ |
| Google Search Console | https://search.google.com/search-console |
| Schema.org Validator | https://validator.schema.org/ |
| Google Rich Results Test | https://search.google.com/test/rich-results |
| Facebook Debugger | https://developers.facebook.com/tools/debug/ |
| Twitter Card Validator | https://cards-dev.twitter.com/validator |
| Lighthouse (Chrome) | Chrome DevTools → Lighthouse tab |
| Mobile-Friendly Test | https://search.google.com/test/mobile-friendly |

---

## Support

- Cloudflare Pages Docs: https://developers.cloudflare.com/pages/
- Vue.js Docs: https://vuejs.org/
- @unhead/vue: https://unhead.unjs.io/
- Vue Router: https://router.vuejs.org/
