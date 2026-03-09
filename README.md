# GMART MOTORS static site

Single-page marketing website for GMART MOTORS, built with plain HTML, CSS, and vanilla JavaScript for GitHub Pages deployment.

## Files
- `index.html` — full single-page site
- `base.css` — reset and accessibility baseline
- `style.css` — design system and component styling
- `script.js` — mobile nav and scroll reveal behavior
- `robots.txt` and `sitemap.xml` — SEO support files
- `CNAME` — custom domain configuration for GitHub Pages
- `images/logo-placeholder-note.txt` — note for replacing the placeholder/logo treatment later
- `qa/` — visual QA screenshots

## Local preview
Because this is a static site, you can open `index.html` directly or serve the folder locally.

Example with `serve`:

```bash
serve . -l 3000 --single
```

## Deploy to GitHub Pages from main branch
1. Create or open the GitHub repository.
2. Upload the contents of this folder to the repository root.
3. In GitHub, open **Settings → Pages**.
4. Under **Build and deployment**, keep the site publishing from the `main` branch or the active Pages workflow.
5. Set the custom domain to `gmartmotors.shop`.
6. Ensure your DNS points the domain to GitHub Pages.
7. Save and wait for GitHub Pages to publish.
8. The site metadata is set for the live custom domain:
   - `https://gmartmotors.shop/`
   - `https://gmartmotors.shop/images/gmart-logo-round.png`

## Logo replacement note
The current build uses the provided GMART MOTORS logo assets in `images/`. If you later receive a newer official brand logo file:
1. Replace the corresponding files in `images/`.
2. Update the header/footer logo markup in `index.html` if needed.
3. Update Open Graph image references.
4. Replace the favicon if needed.

## Content assumptions
- The brief referenced an About Us paragraph but did not provide exact copy, so the page includes original workshop-appropriate copy.
- Vehicle and parts brands are shown as neutral text badges/cards rather than copied logo downloads.
