[README-deploy.md](https://github.com/user-attachments/files/29111495/README-deploy.md)
# Rooster Club — Website

A fast static marketing + content site. No build step, no dependencies — plain HTML + one CSS file + a Google Fonts link. Matches the app's interior theme (warm amber/cream, Cormorant Garamond headings + Inter body).

## Files
```
website/
├── index.html                 Landing page (hero, stats, features, how-it-works, languages, guides, CTA)
├── features.html              Every feature explained, grouped by category
├── security.html              How we protect your account & data + safe-dealing tips
├── privacy.html               Privacy Policy        (required by Google Play)
├── terms.html                 Terms of Service
├── delete-account.html        Account deletion      (required by Google Play)
├── blog/
│   ├── index.html             Guides listing (Blog JSON-LD)
│   ├── country-chicken-farming-guide.html
│   ├── avoid-rooster-buying-scams.html
│   ├── aseel-breeding-guide.html
│   └── poultry-disease-prevention.html
├── styles.css                 Shared brand styles (app theme)
├── favicon.svg                Brand logo mark (navy + gold rooster)
├── sitemap.xml
├── robots.txt
└── CNAME                       Custom domain for GitHub Pages (roosterclub.co.in)
```

## Preview locally
Open `index.html` in a browser, or run a tiny server from this folder:
```
python3 -m http.server 8080
# then visit http://localhost:8080
```

## Deploy on GitHub Pages
1. Put the **contents of this `website/` folder** at the root of your GitHub Pages repo (the repo that serves roosterclub.co.in). Keep the `CNAME` file — it sets the custom domain.
2. Commit & push. In the repo: **Settings → Pages → Source = Deploy from branch**, pick your branch and `/ (root)`.
3. GitHub Pages reads `CNAME` and serves the site at **https://roosterclub.co.in** with free SSL. DNS for the apex domain must point to GitHub Pages (A records to GitHub's IPs, or an ALIAS/ANAME); GitHub shows the exact values under Settings → Pages.

## SEO built in
- Per-page `<title>`, meta description, keywords, canonical, Open Graph + Twitter cards.
- Structured data (JSON-LD): Organization + WebSite + MobileApplication on the home page, Article on each guide, Blog on the guides index.
- `sitemap.xml` (all pages, with lastmod) + `robots.txt` pointing to it.
- Fast: static HTML, one CSS file, inline SVG logo, fonts loaded with `preconnect` + `display=swap`.

## Admin command center
The footer links to **https://admin.roosterclub.co.in** (your command center). The link is `rel="nofollow"` so search engines don't index it.

## Weekly blog automation (set up for you)
A scheduled task — **"roosterclub-weekly-blog"** — runs every **Monday 9:05 AM** and drafts a new SEO guide in `blog/`, adds it to the blog index + sitemap, and shows it to you. You then push the updated `website/` folder to publish it. Manage/run it from the **Scheduled** section in the sidebar. (Tasks run while the app is open; if closed, it runs on next launch.)

## Pre-launch state (app not on the stores yet)
The site shows **"Coming soon"** store badges — nothing implies the app is downloadable yet. When you publish, ask me to flip the site to "live" with the store URLs in one pass (hero badges → real buttons, nav/footer labels, blog CTAs).

## Google Play / App Store compliance
- **Privacy Policy URL:** `https://roosterclub.co.in/privacy.html`
- **Account deletion URL:** `https://roosterclub.co.in/delete-account.html`
Paste these into the Play Console Data Safety form and App Store Connect.

## Notes
- Legal effective dates say **18 June 2026**. Keep these legal pages in sync with the in-app copy.
- Logo source of truth is `favicon.svg`. To use your own PNG logo instead, drop it in and swap the `<img class="mark" src="favicon.svg">` references.
```
