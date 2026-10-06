# ByteForge Studio | Portfolio

The personal portfolio of **Muhammad Affan**, a frontend-focused developer and the founder of ByteForge Studio.
It presents his services, selected projects, tools, and a direct way to get in touch.

**Live website:** [byteforge-affan-portfolio.netlify.app](https://byteforge-affan-portfolio.netlify.app/)

---

## Overview

ByteForge Studio builds responsive websites and practical web systems for small businesses, students, startups, and
personal brands. Muhammad Affan leads with frontend design and development, backed by hands-on experience in
PHP and MySQL, WordPress setup, and MS Office work.

This repository is the studio's portfolio site. It is a single static page with no framework, no build step, and no
runtime dependencies.

## Tech stack

| Layer | Details |
| --- | --- |
| Markup | Semantic HTML5 (landmarks, one `h1`, labelled controls, skip link) |
| Styling | Hand-written CSS: design tokens (custom properties), grid and flexbox, container queries, `color-mix()` |
| Behaviour | Vanilla JavaScript: scroll reveals, scroll-spy navigation, mobile menu, interactive skill map, copy-to-clipboard |
| Fonts | Inter and JetBrains Mono (Google Fonts, with system-font fallbacks) |
| Hosting | Netlify (static) |

## Key sections

| Section | What it does |
| --- | --- |
| **Navbar** | Floating glass bar with a sliding active indicator, scroll progress line, and an accessible mobile menu |
| **Hero** | Positioning statement, a live-style developer status panel, and quick facts |
| **Services** | Six services shown as distinct illustrated cards with cursor-reactive hover |
| **Projects** | An editorial showcase: one full case study plus two staggered pairs, each with a custom-built site mockup |
| **Stack** | A skill map: ByteForge at the centre with four colour-coded groups, linked to a written list |
| **About** | Short professional introduction and the three areas of work |
| **Contact** | Direct email (with one-click copy), GitHub, LinkedIn, and availability |

## Features

- **Fully responsive** from small phones to large desktop screens. Layouts reflow rather than shrink, and the
  project mockups and skill map scale as one piece using container query units.
- **Considered motion.** Different content enters in different ways (line wipes, scale-ins, side slides, staggers).
  Hover states react to the cursor on desktop and are skipped on touch devices.
- **Reduced motion supported.** With `prefers-reduced-motion`, animations stop, content appears immediately, and
  the typing effect and skill-map cycling are turned off.
- **Works without JavaScript.** All content is visible and readable if scripts fail to load.
- **Accessible.** Visible keyboard focus, skip link, descriptive link and button names, alt text, and text
  contrast. The skill map is paired with a full written list.
- **Fast.** Static files, no dependencies, and no layout-shifting assets.
- **Share-ready.** Page title, description, canonical link, and Open Graph tags are set.

## Projects featured

| Project | Description | Links |
| --- | --- | --- |
| **Z&S Enterprises** | Corporate website for a packaging and printing company (HTML, CSS, JavaScript, responsive) | [Live](https://zandsenterprises.com/) / [Code](https://github.com/byteforge-affan/ZandS_Enterprises) |
| **Paarees Luxury Scents** | Luxury fragrance brand website (HTML, CSS, Bootstrap) | [Live](https://paarees-luxury-scents.netlify.app/) / [Code](https://github.com/byteforge-affan/E-PROJECT-PAAREES-PERFUME-) |
| **Jobix** | Role-based recruitment platform (PHP, MySQL, Bootstrap) | [Code](https://github.com/byteforge-affan/Jobix) |
| **Aurora** | Creative static website exploring atmosphere and visual rhythm | [Live](https://aurorasphere.netlify.app/) |
| **Shopping Website** | Database-driven shopping website with a cart-style interface | [Code](https://github.com/byteforge-affan/Shopping-Website) |

## Services

- **Business websites:** professional company sites with clear sections, contact flow, and responsive layouts
- **Portfolio websites:** personal portfolios that present skills, projects, and contact details cleanly
- **Landing pages:** focused one-page designs for services, campaigns, products, and offers
- **PHP/MySQL web systems:** job portals, CRUD dashboards, forms, and database-driven pages
- **WordPress setup:** clean pages, a clear content structure, and launch support
- **MS Office work:** Word documents, Excel reports, PowerPoint presentations, and business document formatting

## Project structure

```text
byteforge-portfolio/
├── index.html      # All page content and markup
├── style.css       # Design tokens, layout, components, responsive rules, motion
├── index.js        # Reveals, navigation, menu, skill map, copy button
├── README.md
└── images/
    ├── byteforge-icon.png    # Brand mark (favicon, navbar, skill-map hub)
    └── byteforge-logo.png    # Full logo (social preview image)
```

## Setup and use

No installation or build step is required.

**Open locally**

1. Download or clone the repository.
2. Open `index.html` in a browser.

**Or serve it locally** (recommended, so the clipboard button works exactly as it does online):

```bash
python3 -m http.server 8000
# then visit http://localhost:8000
```

**Deploy**

The site is static and deploys to Netlify, GitHub Pages, or any static host. For Netlify, point the site at the
repository root with no build command and `.` as the publish directory.

## Customising

- **Colours, spacing, and radii** live in the `:root` block at the top of `style.css`.
- **Contact details** (email, GitHub, LinkedIn) are in the Contact section of `index.html`. The email also appears in
  the navbar button and the hero.
- **Project text and links** are in the Projects section of `index.html`. Each project mockup is built from HTML and
  CSS, so no screenshots are required.
- **Real screenshot (optional).** To show a real Paarees screenshot instead of its built mockup, add it as
  `images/web-image.PNG`. The page uses it automatically when the file exists and falls back to the mockup when it
  does not.
- **Skill map.** Tools are placed by coordinates (`--x`, `--y`) on the `.node` elements in the Stack section. If you
  add a tool, add a matching entry to the written list beside it.

## Browser support

Current versions of Chrome, Edge, Firefox, and Safari. The design uses modern CSS (container queries, `color-mix()`,
individual transform properties) and degrades gracefully where a feature is unavailable.

## Contact

**Muhammad Affan** | ByteForge Studio | Karachi, Pakistan

- Email: [byteforgestudio.pk@gmail.com](mailto:byteforgestudio.pk@gmail.com)
- GitHub: [github.com/byteforge-affan](https://github.com/byteforge-affan)
- LinkedIn: [linkedin.com/in/muhammad-affan-27b96943b](https://www.linkedin.com/in/muhammad-affan-27b96943b)
- Website: [byteforge-affan-portfolio.netlify.app](https://byteforge-affan-portfolio.netlify.app/)

---

Design and code &copy; Muhammad Affan, ByteForge Studio.
