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
