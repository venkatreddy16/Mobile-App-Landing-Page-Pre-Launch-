# LaunchPad Template

LaunchPad is a static multi-page mobile app landing site built with HTML, CSS, and JavaScript for pre-launch campaigns.

## Current Structure

```text
Mobile app Landig page (Pre-Launch)/
+-- .github/
|   +-- workflows/
|       +-- deploy-pages.yml
+-- assets/
|   +-- css/
|   |   +-- style.css
|   |   +-- dark-mode.css
|   |   +-- rtl.css
|   +-- js/
|   |   +-- main.js
|   +-- images/
+-- documentation/
|   +-- overview.md
|   +-- project-guide.md
+-- pages/
|   +-- 404.html
|   +-- about.html
|   +-- blog-details.html
|   +-- blog.html
|   +-- coming-soon.html
|   +-- contact.html
|   +-- features.html
|   +-- home-2.html
|   +-- index.html
|   +-- live_index_snapshot.html
|   +-- login.html
|   +-- pricing.html
|   +-- reviews.html
+-- robots.txt
+-- sitemap.xml
```

## Live Page Source

- All source HTML files now live in `pages/`.
- Shared assets stay at the repo root in `assets/`.
- GitHub Pages deploys the `pages/` HTML set plus `assets/`, `robots.txt`, and `sitemap.xml`.

## Main Features

- Responsive multi-page landing site
- Dark mode support through `assets/css/dark-mode.css`
- RTL layout toggle through `assets/css/rtl.css` and `assets/js/main.js`
- Mobile navigation, dropdowns, slider controls, FAQ accordions, and reveal animations
- Waitlist, contact, and auth-style form validation in `assets/js/main.js`
- GitHub Pages deployment workflow in `.github/workflows/deploy-pages.yml`

## Key Files

- `pages/index.html`: primary homepage
- `pages/home-2.html`: alternate homepage
- `pages/about.html`, `pages/features.html`, `pages/pricing.html`, `pages/reviews.html`, `pages/contact.html`: supporting marketing pages
- `pages/blog.html`, `pages/blog-details.html`: blog pages
- `pages/coming-soon.html`, `pages/404.html`, `pages/login.html`: utility pages
- `assets/css/style.css`: main visual styling
- `assets/js/main.js`: shared interactive behaviors
- `documentation/overview.md`: quick page summary
- `documentation/project-guide.md`: fuller project documentation

## Deployment

- The site is configured for GitHub Pages.
- The workflow creates a `_site` artifact containing `pages/`, a generated root redirect `index.html`, a generated root `404.html`, `assets/`, `robots.txt`, and `sitemap.xml`.
- Pushes to `main` trigger deployment.

## Notes

- `pages/live_index_snapshot.html` is currently a local reference file and is not part of the deployment workflow.
- The previous README was preserved as `README.legacy.txt`.
