# Documentation Overview

## Pages

- `index.html`: Primary homepage with hero banner, waitlist CTA, metrics, product storytelling, social proof, and launch-focused conversion sections.
- `home-2.html`: Alternate homepage with a richer story-first layout, comparison content, integrations, and supporting CTA sections.
- `about.html`: Brand story, mission, timeline, team, achievements, and press.
- `features.html`: Feature breakdown, product capabilities, visual highlights, and feature CTA content.
- `blog.html`: Blog listing layout with cards, categories, and content discovery sections.
- `blog-details.html`: Single article page with long-form content, related context, and editorial layout elements.
- `pricing.html`: Plan comparison, pricing toggle, FAQ content, and plan CTA sections.
- `reviews.html`: Testimonials, customer proof, review cards, and supporting trust sections.
- `contact.html`: Contact form, support information, location visuals, and response-oriented CTA content.
- `coming-soon.html`: Countdown-focused launch holding page.
- `login.html`: Auth-style login and signup interface used as a static demo page.
- `404.html`: Not found page with return paths back into the site.

## Shared Assets

- `assets/css/style.css`: Main layout, components, responsive design, hero treatments, cards, buttons, and animation styles.
- `assets/css/dark-mode.css`: Dark theme variable overrides and dark-surface adjustments.
- `assets/css/rtl.css`: Direction-specific layout overrides for RTL mode.
- `assets/js/main.js`: Theme switching, RTL toggle, mobile navigation, dropdowns, sliders, countdowns, form validation, FAQ accordion behavior, and reveal animations.

## Deployment Notes

- Source HTML files live in `pages/`.
- GitHub Pages deployment is handled by `.github/workflows/deploy-pages.yml`.
- The workflow publishes the `pages/` HTML files, a generated root redirect `index.html`, a generated root `404.html`, `assets/`, `robots.txt`, and `sitemap.xml`.
- `pages/live_index_snapshot.html` is a local reference file and is not included in the deployment artifact.
