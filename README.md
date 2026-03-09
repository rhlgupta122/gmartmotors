# GMART MOTORS static site

Single-page marketing website for GMART MOTORS, built with plain HTML, CSS, and vanilla JavaScript for GitHub Pages deployment.

## Files
- `index.html` — full single-page site
- `base.css` — reset and accessibility baseline
- `style.css` — design system and component styling
- `script.js` — theme toggle, mobile nav, and scroll reveal behavior
- `favicon.svg` — temporary favicon based on the custom workshop mark
- `robots.txt` and `sitemap.xml` — SEO support files
- `images/logo-placeholder-note.txt` — note for replacing the placeholder/logo treatment later
- `qa/` — visual QA screenshots

## Local preview
Because this is a static site, you can open `index.html` directly or serve the folder locally.

Example with `serve`:

```bash
serve . -l 3000 --single
```

## Deploy to GitHub Pages from main branch
1. Create a GitHub repository.
2. Upload the contents of this folder to the repository root.
3. In GitHub, open **Settings → Pages**.
4. Under **Build and deployment**, choose **Deploy from a branch**.
5. Select the `main` branch and `/ (root)` folder.
6. Save and wait for GitHub Pages to publish.
7. The site metadata is already set for the expected Pages URL:
   - `https://rhlgupta122.github.io/gmartmotors/`
   - `https://rhlgupta122.github.io/gmartotors/images/og-gmartmotors.svg`
8. If you publish under a different repository name, update `index.html`, `robots.txt`, and `sitemap.xml` accordingly.

## Logo replacement note
The current build uses an inline SVG logo and `favicon.svg` generated for this website. If you later receive the official brand logo file:
1. Save it as `images/logo.png` or `images/logo.svg`.
2. Update the header/footer logo markup in `index.html`.
3. Update Open Graph image references.
4. Replace the favicon if needed.

## Content assumptions
- The brief referenced an About Us paragraph but did not provide exact copy, so the page includes original workshop-appropriate copy.
- Vehicle and parts brands are shown as neutral text badges/cards rather than copied logo downloads.
