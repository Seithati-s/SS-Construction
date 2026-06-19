# SS Construction Website
 
---
 
## Student Information
Seithati Seanego
ST10524260
Rosebank International

 
---
 
## Project Overview
 
This project is a multi-page static website built for **SS Construction**, a construction company based in Limpopo, South Africa, founded in 2017. The website was developed as part of a web development assignment and demonstrates the use of HTML5, CSS3, and responsive design techniques.
 
SS Construction has completed over 340 residential and commercial projects across Limpopo and North West. The website serves as their digital presence, providing potential clients with information about the company, its services, and a way to get in touch.
- **Live Site:** 
- **Storyline:** SS Construction offers residential, commercial, and industrial building services across Gauteng. The site promotes their services, showcases completed projects, and allows potential clients to submit enquiries and general messages.
- **Colour Palette:** Navy (#1B2A4A) and Gold (#C9A84C)
- **Technology:** Pure HTML5, CSS3, and Vanilla JavaScript — no frameworks


## Website Goals and Objectives
 
- Present SS Construction as a credible, professional construction company.
- Provide clear information about the company's background, services, and contact details.
- Allow potential clients to submit a project enquiry directly through the website.
- Ensure the website is fully responsive and accessible across desktop, tablet, and mobile devices.
- Apply consistent branding (colour palette, typography, and layout) across all pages.

- ## Key Features and Functionality
 
- **Responsive Navigation** — Sticky header with a hamburger menu that collapses on tablet and mobile screens.
- **Scroll Reveal Animations** — Sections fade in as the user scrolls using the Intersection Observer API.
- **Hero Section (Home)** — Full-height banner with headline, subtext, and call-to-action buttons.
- **Services Page** — Alternating image/text layout for three service categories (Residential, Commercial, Project Management), each with a bullet list and quote link.
- **About Page** — Company overview with a Mission and Vision card grid.
- **Enquiry Form** — Fully styled contact form with fields for name, email, phone, service selection, and project description. Includes hover and focus states.
- **Contact Page** — Office location card with address, phone, email, and business hours.
- **Responsive Images** — `srcset` and `sizes` attributes applied to all service images for optimised loading across screen sizes.
- **Consistent Footer** — Shared footer with copyright across all pages.

- ## Timeline and Milestones

- Part 1: HTML structure
- Part 2: Css styling
- Part 3: Javascripot

 ## Part 1 Details
 
### Pages Completed
 
| File | Page | Description |
|---|---|---|
| `index.html` | Home | Hero with animated stats, services preview, testimonials, why-us section, CTA banner |
| `about.html` | About Us | Founding story, mission & vision, team profiles, accreditation section |
| `services.html` | Services | Photo-driven service showcase (6 services), portfolio photo grid, 5-step process |
| `enquiry.html` | Enquiry | Three-tab form (Construction / Volunteer / Sponsorship), sidebar info, success state |
| `contact.html` | Contact | Contact info strip, two Google Maps embeds, business hours, contact form |
 ## Part 2 Details
 
- CSS custom properties (design tokens) for colour, typography, spacing, and layout consistency.
- Base styles and CSS reset for cross-browser consistency.
- Typography using **Oswald** (display/headings) and **Barlow** (body text) from Google Fonts.
- Layout built with CSS Flexbox and CSS Grid.
- Three responsive breakpoints: desktop (default), tablet (≤768px), and mobile (≤480px).
- Responsive images using `srcset` and `sizes`.
- Scroll reveal animations using the native Intersection Observer API (no external libraries).
- Hover, focus, and active pseudo-class states applied to all interactive elements.
### — Part 3
2. New JavaScript File: `js/main.js`
 
**Purpose:** Adds all interactive elements, dynamic content features, and DOM manipulation to the website.
 

## Sitemap
 
```
SS Construction Website
│
├── index.html          → Home (Hero + Services Preview)
├── about.html          → About (Company Overview + Mission & Vision)
├── services.html       → Services (Residential, Commercial, Project Management)
├── enquiry.html        → Enquiry (Sidebar + Contact Form)
├── contact.html        → Contact (Head Office Location Card)
│
└── style.css           → Shared stylesheet (all pages)
├── js/
│   ├── main.js            # All interactive JS (Part 3)
│   ├── forms.js           # Form validation and email sending (Part 3)
│   └── interactive.css    # CSS for all JS-powered components (Part 3)
│
└── images/
    ├── ss-construction-logo.png          # Company logo
    ├── hero-construction-site.jpg        # Home page hero background
    ├── residential-project-sandton.jpg   # Gallery image – Sandton residence
    ├── commercial-office-midrand.jpg     # Gallery image – Midrand office block
    ├── industrial-warehouse-boksburg.jpg # Gallery image – Boksburg warehouse
    ├── about-team-photo.jpg              # About page team photograph
    └── services-banner.jpg              # Services page banner
```
 
---
 
## Changelog
 

 
**Added**

- CSS Grid layout for services grid, mission/vision cards, and enquiry form.
- CSS Flexbox layout for header, nav, hero, and info list.
- Responsive breakpoints at 768px and 480px using media queries.
- Responsive images with `srcset` and `sizes` on Services page.
- Form field styles including hover, focus ring, and submit button states.
- Yellow/grey/blue colour palette applied consistently across all pages.
- Accessible focus rings on all interactive elements.
**Fixed**
- Corrected unclosed HTML tags and invalid nesting in original source files.
- Standardised heading hierarchy (`h1` → `h2` → `h3`) across all pages.
- Replaced inline `height` attributes on `<img>` tags with CSS-controlled responsive sizing.
---
2. New JavaScript File: `js/main.js`
 
**Purpose:** Adds all interactive elements, dynamic content features, and DOM manipulation to the website.
 
| Feature | Function | Pages Used On | Details |
|---|---|---|---|
| **Accordion** | `initAccordions()` | services.html | Collapsible FAQ and service detail panels. Smooth `max-height` CSS transition. ARIA `aria-expanded` toggled on open/close. Only one panel open at a time. |
| **Tabs** | `initTabs()` | services.html, projects.html | Category tab buttons switch between Residential / Commercial / Industrial content panels. First tab activated automatically on load. CSS fade animation on panel switch. |
| **Modal** | `initModals()` | projects.html | Project detail pop-up overlays triggered by `data-modal-target` attribute. Closes on backdrop click, close button, or Escape key. Focus moves to close button on open. Body scroll locked while open. |
| **Interactive Map** | `initInteractiveMap()` | contact.html | Leaflet.js map centred on Sandton, Gauteng. Three custom gold-coloured markers for head office and two active project sites. OpenStreetMap tile layer (no API key required). Clickable popups with address and phone. Scroll zoom disabled by default, re-enabled on map click for better page UX. |
| **Lightbox Gallery** | `initLightbox()` | projects.html | Full-screen image viewer. Click gallery thumbnails to open. Navigate with Previous / Next buttons, left/right arrow keys, or swipe. Image counter shown (e.g. "2 / 6"). Caption pulled from `alt` attribute. Escape key or backdrop click closes. Fully keyboard-accessible (tabindex on images, Enter key to open). |
| **Scroll Reveal** | `initScrollReveal()` | All pages | `IntersectionObserver` adds `.revealed` class when elements with `.reveal` class enter the viewport. CSS opacity + transform transition creates fade-in-up effect. `prefers-reduced-motion` media query respected — no animation shown if user has motion sensitivity. Optional `data-delay` attribute staggers multiple items. |
| **Counter Animation** | `initCounters()` | index.html, about.html | Elements with `.counter` class and `data-target` attribute animate from 0 to the target number when scrolled into view. Supports optional `data-suffix` (e.g. "+"). Uses `setInterval` at ~60 fps for smooth animation. `IntersectionObserver` ensures animation only runs once. |
| **Search & Filter** | `initDynamicContent()` | projects.html | Live text search filters project/service cards by their visible text content. Category filter buttons filter by `data-category` attribute. Both work simultaneously. "No results" message displayed when no cards match. |
| **Mobile Nav Toggle** | `initNavToggle()` | All pages | Hamburger button (`id="nav-toggle"`) toggles vertical nav menu on screens ≤ 768 px. Button icon changes from ☰ to ✕. `aria-expanded` updated for accessibility. Menu closes automatically when a nav link is clicked. |
| **Back to Top** | `initBackToTop()` | All pages | Fixed button appears after scrolling 400 px. Smooth scroll to top on click. CSS opacity transition for show/hide. |
 
---
 
#### 3. New JavaScript File: `js/forms.js`
 
**Purpose:** Full client-side form validation and email processing for `enquiry.html` and `contact.html`.
 
##### 3a. Enquiry Form (`enquiry.html`)
 
| Aspect | Detail |
|---|---|
| **Form Controls** | `<input type="text">` (name), `<input type="email">`, `<input type="tel">`, `<input type="date">` (start date), three `<select>` dropdowns (service, enquiry type, budget, referral source), `<textarea>` (message), radio buttons (contact preference), checkbox (terms agreement) |
| **Validation — Name** | Required. Minimum 2 characters. Letters, spaces, hyphens, apostrophes only. |
| **Validation — Email** | Required. Regex check for valid email format (e.g. name@example.com). |
| **Validation — Phone** | Required. South African format: 10-digit starting with 0, or +27 format. Spaces and hyphens stripped before validation. |
| **Validation — Select** | Required. Checks value is not empty or "default". |
| **Validation — Message** | Required. Minimum 10 characters, maximum 1 000 characters. |
| **Validation — Checkbox** | Required. Must be checked to submit. |
| **Real-time feedback** | Errors displayed on `blur` event (when user leaves field). Cleared on `input` / `change` event (as user types). |
| **Error display** | Error message `<span>` inserted after invalid field. `aria-invalid="true"` and `aria-describedby` set for screen readers. |
| **Submit behaviour** | All fields validated on submit. If invalid, first error field scrolled into view. Submit button disabled and shows "Sending…" while processing. |
| **Process Response** | On successful submission, form is replaced with a personalised response panel. The panel includes: user's name, the selected service, a tailored timeframe (e.g. 2–3 days for quotes, 1 day for availability), the preferred contact method (email address or phone number), and a unique reference number (ENQ-XXXXXX). |
| **Character counter** | Live counter below message textarea shows current / maximum characters. Turns red above 90% of limit. |
 
##### 3b. Contact Form (`contact.html`)
 
| Aspect | Detail |
|---|---|
| **Form Controls** | `<input type="text">` (name), `<input type="email">`, `<input type="tel">`, `<select>` (message type), `<textarea>` (message), radio buttons (urgency level), checkbox (newsletter opt-in), checkbox (privacy agreement, required) |
| **Validation** | Same rules as enquiry form for name, email, phone, select, message, and required checkbox. |
| **Real-time feedback** | Same as enquiry form. |
| **Email Send** | On valid submission, form data is sent via **EmailJS** using `emailjs.send()`. Template variables: `{{from_name}}`, `{{from_email}}`, `{{phone}}`, `{{message_type}}`, `{{message}}`, `{{reply_to}}`. If EmailJS is not configured or the call fails, a graceful fallback success message is shown. |
| **Process Response** | On successful send, form replaced with confirmation panel showing: user's name, their email address (where reply will be sent), and a unique reference number (MSG-XXXXXX). |
| **Character counter** | Same as enquiry form. |
 
---
 
#### 4. New Stylesheet: `js/interactive.css`
 
Provides all styles for Part 3 components. Key sections:
 
- Accordion open/close states with CSS `max-height` transition
- Tab button active states and panel fade-in animation
- Modal overlay, inner panel, and close button
- Lightbox overlay, navigation arrows, caption, and image counter
- Gallery grid (CSS Grid, hover zoom, zoom-icon overlay)
- Leaflet map container sizing and border
- Scroll reveal initial hidden state and revealed transition
- Stats counter layout and gold number styling
- Search input and category filter buttons
- All form input, select, textarea, radio, and checkbox styles
- Validation error state (red border, error message)
- Success panel (green border, check icon, personalised message)
- Mobile navigation toggle and vertical menu
- Back-to-top button
- `@keyframes fadeIn` animation
---
 
#### 5. SEO Improvements Applied to All Pages
 
| SEO Element | Implementation |
|---|---|
| **Title Tags** | Unique, descriptive `<title>` on every page. Format: `Page Name \| SS Construction – Gauteng Building Contractors`. Under 60 characters. |
| **Meta Description** | Unique, 140–160 character descriptions on all pages. Include primary keyword and a call to action. |
| **Meta Keywords** | Locally-relevant keyword phrases on all pages (e.g. "construction quote Gauteng", "residential builder Johannesburg"). |
| **Heading Structure** | Single `<h1>` per page. `<h2>` for major sections. `<h3>` for subsections. No skipped levels. |
| **Image Filenames** | Descriptive, lowercase, hyphenated (e.g. `residential-project-sandton.jpg`). No generic names like `image1.jpg`. |
| **Image Alt Text** | All `<img>` elements have meaningful, keyword-appropriate `alt` attributes. Decorative images use `alt=""`. |
| **Internal Links** | All six pages are linked from every other page via the navigation. |
| **Mobile Friendly** | `<meta name="viewport">` set. Responsive CSS with mobile nav toggle. |
| **Canonical Tags** | `<link rel="canonical">` added to all pages to prevent duplicate content issues. |
| **Semantic HTML** | `<header>`, `<nav>`, `<main>`, `<section>`, `<footer>`, `<article>` used appropriately. |
 
---
 
#### 6. Interactive Map (contact.html)
 
- **Library:** Leaflet.js v1.9.4 (loaded via CDN — no API key required)
- **Tile Provider:** OpenStreetMap (free, open licence)
- **Markers:** Three custom gold-coloured div markers matching SS Construction brand palette
- **Popups:** Each marker opens a popup with name, address, and contact information
- **UX:** Scroll zoom disabled on page load (prevents accidental zoom while scrolling the page). Re-enabled when user clicks the map.
- **Accessibility:** Map container has `role="region"` and `aria-label`
---
 
#### 7. GitHub Repository Updates
 
- All Part 3 files committed with descriptive commit messages
- Suggested commit messages used:
  - `feat: add interactive map with Leaflet.js on contact page`
  - `feat: add lightbox gallery to projects page`
  - `feat: add accordion and tabs to services page`
  - `feat: add enquiry form with full JS validation and process response`
  - `feat: add contact form with EmailJS email sending`
  - `feat: add scroll reveal, counter animation, and search/filter`
  - `seo: add title tags, meta descriptions, and meta keywords to all pages`
  - `seo: update all image filenames and alt attributes`
  - `style: add interactive.css for all Part 3 components`
  - `docs: update README with Part 3 changelog and references`
- Remote repository pushed: `git push origin main`
- Site deployed to Netlify
---
## References
 
> All sources must be cited using the recognised referencing style of your institution. The examples below use APA 7th edition format. Replace with your actual sources.
 
- Google Fonts. (2024). *Oswald* [Typeface]. Google LLC. https://fonts.google.com/specimen/Oswald
- Google Fonts. (2024). *Barlow* [Typeface]. Google LLC. https://fonts.google.com/specimen/Barlow
- Mozilla Developer Network. (2024). *CSS custom properties (variables)*. MDN Web Docs. https://developer.mozilla.org/en-US/docs/Web/CSS/Using_CSS_custom_properties
- Mozilla Developer Network. (2024). *Intersection Observer API*. MDN Web Docs. https://developer.mozilla.org/en-US/docs/Web/API/Intersection_Observer_API
- Mozilla Developer Network. (2024). *Responsive images*. MDN Web Docs. https://developer.mozilla.org/en-US/docs/Learn/HTML/Multimedia_and_embedding/Responsive_images
- W3Schools. (2024). *CSS grid layout*. https://www.w3schools.com/css/css_grid.asp
- NHBRC. (2024). *National Home Builders Registration Council*. https://www.nhbrc.org.za
- CIDB. (2024). *Construction Industry Development Board*. https://www.cidb.org.za
---
Cloudflare. (2024). *What is on-page SEO?* https://www.cloudflare.com/learning/performance/what-is-on-page-seo/
 
EmailJS. (2024). *EmailJS documentation: Getting started.* https://www.emailjs.com/docs/
 
Google Developers. (2024). *Search Engine Optimisation (SEO) Starter Guide.* https://developers.google.com/search/docs/fundamentals/seo-starter-guide
 
Leaflet. (2024). *Leaflet — an open-source JavaScript library for mobile-friendly interactive maps.* https://leafletjs.com/reference.html
 
Mozilla Developer Network. (2024). *CSS: Cascading Style Sheets — MDN Web Docs.* https://developer.mozilla.org/en-US/docs/Web/CSS
 
Mozilla Developer Network. (2024). *HTML: HyperText Markup Language — MDN Web Docs.* https://developer.mozilla.org/en-US/docs/Web/HTML
