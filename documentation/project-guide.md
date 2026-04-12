# Project Guide

## Overview

This project is a static marketing site for a mobile app pre-launch experience. It is built entirely with HTML, CSS, and JavaScript and is designed to be deployed through GitHub Pages without a build step.

## How The Site Is Organized

- Source HTML files live in `pages/`.
- Shared CSS lives in `assets/css/`.
- Shared JavaScript lives in `assets/js/main.js`.
- Images and illustrations live in `assets/images/`.
- Deployment is defined in `.github/workflows/deploy-pages.yml`.

## Main Behaviors

### Theme Toggle

- Theme state is stored in `localStorage` under `launchpad-theme`.
- Theme is applied by setting `data-theme` on the root `<html>` element.
- Visual dark mode overrides are handled in `assets/css/dark-mode.css`.

### RTL Toggle

- Direction state is stored in `localStorage` under `launchpad-dir`.
- Direction is applied on the root `<html>` element through the `dir` attribute.
- Layout changes for RTL mode are handled in `assets/css/rtl.css`.
- The header toggle label updates between `RTL` and `LTR` in `assets/js/main.js`.

### Navigation

- Mobile navigation is controlled by the header menu toggle.
- The home page has a dedicated mobile action slot for duplicated header controls.
- Dropdown behavior is handled in JavaScript through `data-dropdown-toggle`.

### Interactive Sections

- Countdown widgets use the `data-countdown` attribute.
- Sliders use `data-slider-controls` and slide button attributes.
- FAQ sections behave like controlled accordions.
- Reveal-on-scroll animations use `.fade-in` and `.reveal-up`.

### Forms

- Forms marked with `data-validate` use client-side validation.
- Email fields, password length, confirm-password matching, and required fields are validated in JavaScript.
- Some forms support `mailto` behavior for lightweight contact flows.

## Deployment Flow

- Pushes to `main` trigger the GitHub Pages workflow.
- The workflow builds a `_site` folder at runtime.
- The workflow publishes `pages/*.html`, copies `pages/404.html` to the root as `404.html`, generates a root redirect `index.html`, and includes `assets/`, `robots.txt`, and `sitemap.xml`.
- Local helper or snapshot files are excluded unless explicitly copied into `_site`.

## Maintenance Notes

- Make production content changes in the `pages/` HTML files.
- Keep shared interaction changes inside `assets/js/main.js`.
- Keep shared visual changes inside `assets/css/style.css`, with theme-specific or RTL-specific changes isolated in their dedicated stylesheets.
- If a new page is added, it should also be added to:
  - `sitemap.xml`
  - `documentation/overview.md`

## Reference File

- `pages/live_index_snapshot.html` exists as a local reference file and is not part of the deployment output.
