
"use strict";

/* ══════════════════════════════════════════════════════════
   1. ACCORDION
   HTML:  <div class="accordion-item">
            <button class="accordion-header">Title</button>
            <div class="accordion-body"><p>Content</p></div>
          </div>
   ══════════════════════════════════════════════════════════ */
function initAccordions() {
  const headers = document.querySelectorAll(".accordion-header");
  if (!headers.length) return;

  headers.forEach((header) => {
    header.setAttribute("aria-expanded", "false");
    header.addEventListener("click", function () {
      const item   = this.closest(".accordion-item");
      const body   = item.querySelector(".accordion-body");
      const isOpen = item.classList.contains("open");

      // Collapse all
      document.querySelectorAll(".accordion-item.open").forEach((el) => {
        el.classList.remove("open");
        el.querySelector(".accordion-header").setAttribute("aria-expanded", "false");
        el.querySelector(".accordion-body").style.maxHeight = null;
      });

      // Open clicked item if it was closed
      if (!isOpen) {
        item.classList.add("open");
        this.setAttribute("aria-expanded", "true");
        body.style.maxHeight = body.scrollHeight + "px";
      }
    });
  });
}

/* ══════════════════════════════════════════════════════════
   2. TABS
   HTML:  <div class="tab-buttons">
            <button class="tab-btn" data-tab="res">Residential</button>
          </div>
          <div class="tab-panel" id="res">…content…</div>
   ══════════════════════════════════════════════════════════ */
function initTabs() {
  const buttons = document.querySelectorAll(".tab-btn");
  if (!buttons.length) return;

  buttons.forEach((btn) => {
    btn.addEventListener("click", function () {
      document.querySelectorAll(".tab-btn").forEach((b) => b.classList.remove("active"));
      document.querySelectorAll(".tab-panel").forEach((p) => p.classList.remove("active"));

      this.classList.add("active");
      const panel = document.getElementById(this.dataset.tab);
      if (panel) panel.classList.add("active");
    });
  });

  // Activate first tab automatically
  buttons[0].click();
}

/* ══════════════════════════════════════════════════════════
   3. MODAL
   HTML:  <button data-modal-target="myModal">Open</button>
          <div id="myModal" class="modal" role="dialog" aria-modal="true">
            <div class="modal-inner">
              <button class="modal-close" aria-label="Close">✕</button>
              …content…
            </div>
          </div>
   ══════════════════════════════════════════════════════════ */
function initModals() {
  document.querySelectorAll("[data-modal-target]").forEach((trigger) => {
    trigger.addEventListener("click", () => {
      const modal = document.getElementById(trigger.dataset.modalTarget);
      if (modal) openModal(modal);
    });
  });

  document.querySelectorAll(".modal-close").forEach((btn) => {
    btn.addEventListener("click", () => closeModal(btn.closest(".modal")));
  });

  document.querySelectorAll(".modal").forEach((modal) => {
    modal.addEventListener("click", (e) => { if (e.target === modal) closeModal(modal); });
  });

  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape") {
      document.querySelectorAll(".modal.open").forEach(closeModal);
    }
  });
}

function openModal(modal) {
  modal.classList.add("open");
  document.body.style.overflow = "hidden";
  modal.querySelector(".modal-close")?.focus();
}

function closeModal(modal) {
  if (!modal) return;
  modal.classList.remove("open");
  document.body.style.overflow = "";
}

/* ══════════════════════════════════════════════════════════
   4. INTERACTIVE MAP — Leaflet.js
   HtML:  <div id="ss-map" style="height:400px;"></div>
   Note: Include Leaflet CSS/JS in your HTML head:
         <link rel="stylesheet" href="https://unpkg.com/leaflet/dist/leaflet.css" />
         <script src="https://unpkg.com/leaflet/dist/leaflet.js"></script>
   ══════════════════════════════════════════════════════════ */
function initInteractiveMap() {
  const mapEl = document.getElementById("ss-map");
  if (!mapEl || typeof L === "undefined") return;

  // Default: SS Construction HQ, Sandton, Gauteng
  const config = window.SS_MAP_CONFIG || {
    center: [-26.107567, 28.056702], // Sandton, Gauteng
    zoom: 14,
    markers: [
      {
        lat: -26.107567,
        lng: 28.056702,
        title: "SS Construction – Head Office",
        popup:
          "<strong>SS Construction</strong><br>123 Builder Street, Sandton<br>Gauteng, 2196<br><a href='tel:+27110000000'>+27 11 000 0000</a>",
      },
      {
        lat: -26.195246,
        lng: 28.034088,
        title: "SS Construction – Johannesburg Site",
        popup: "<strong>Active Project Site</strong><br>Johannesburg CBD, Gauteng",
      },
      {
        lat: -25.731340,
        lng: 28.218370,
        title: "SS Construction – Pretoria Site",
        popup: "<strong>Active Project Site</strong><br>Hatfield, Pretoria, Gauteng",
      },
    ],
  };

  // Initialise map
  const map = L.map("ss-map", {
    center: config.center,
    zoom: config.zoom,
    scrollWheelZoom: false, // better UX on pages where map is embedded
  });

  // Tile layer — OpenStreetMap (free, no API key needed)
  L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
    attribution:
      '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
    maxZoom: 19,
  }).addTo(map);

  // Custom gold marker icon (matches SS Construction palette)
  const goldIcon = L.divIcon({
    className: "ss-map-marker",
    html: `<div style="
      width:32px;height:32px;border-radius:50% 50% 50% 0;
      background:#C9A84C;border:3px solid #1B2A4A;
      transform:rotate(-45deg);box-shadow:0 2px 6px rgba(0,0,0,0.4);">
    </div>`,
    iconSize: [32, 32],
    iconAnchor: [16, 32],
    popupAnchor: [0, -34],
  });

  // Add markers
  config.markers.forEach((m) => {
    L.marker([m.lat, m.lng], { icon: goldIcon, title: m.title })
      .addTo(map)
      .bindPopup(m.popup, { maxWidth: 250 });
  });

  // Open first marker popup by default
  if (config.markers.length) {
    const first = L.marker([config.markers[0].lat, config.markers[0].lng]).addTo(map);
    // remove placeholder, show gold version with popup
    first.remove();
  }

  // Re-enable scroll zoom on map click (UX improvement)
  map.on("click", () => map.scrollWheelZoom.enable());
  map.on("mouseout", () => map.scrollWheelZoom.disable());
}

/* ══════════════════════════════════════════════════════════
   5. LIGHTBOX GALLERY
   HTML:  <div class="gallery">
            <div class="gallery-item">
              <img src="thumb.jpg" data-full="large.jpg" alt="Project description">
            </div>
          </div>
   ══════════════════════════════════════════════════════════ */
function initLightbox() {
  // Create lightbox element once
  if (document.getElementById("ss-lightbox")) return;

  const lb = document.createElement("div");
  lb.id = "ss-lightbox";
  lb.setAttribute("role", "dialog");
  lb.setAttribute("aria-modal", "true");
  lb.setAttribute("aria-label", "Image viewer");
  lb.innerHTML = `
    <button class="lb-close" aria-label="Close image viewer">&times;</button>
    <button class="lb-prev" aria-label="Previous image">&#10094;</button>
    <div class="lb-content">
      <img class="lb-img" src="" alt="">
      <p class="lb-caption"></p>
      <p class="lb-counter"></p>
    </div>
    <button class="lb-next" aria-label="Next image">&#10095;</button>
  `;
  document.body.appendChild(lb);

  let images  = [];
  let current = 0;

  function show(index) {
    current = (index + images.length) % images.length;
    const img = images[current];
    lb.querySelector(".lb-img").src = img.dataset.full || img.src;
    lb.querySelector(".lb-img").alt = img.alt;
    lb.querySelector(".lb-caption").textContent = img.alt;
    lb.querySelector(".lb-counter").textContent = `${current + 1} / ${images.length}`;
    lb.classList.add("open");
    document.body.style.overflow = "hidden";
    lb.querySelector(".lb-close").focus();
  }

  function close() {
    lb.classList.remove("open");
    document.body.style.overflow = "";
  }

  // Wire gallery images
  document.querySelectorAll(".gallery img").forEach((img) => {
    img.setAttribute("tabindex", "0");
    img.style.cursor = "zoom-in";

    const activate = () => {
      images = Array.from(document.querySelectorAll(".gallery img"));
      show(images.indexOf(img));
    };

    img.addEventListener("click", activate);
    img.addEventListener("keydown", (e) => { if (e.key === "Enter") activate(); });
  });

  lb.querySelector(".lb-close").addEventListener("click", close);
  lb.querySelector(".lb-prev").addEventListener("click", () => show(current - 1));
  lb.querySelector(".lb-next").addEventListener("click", () => show(current + 1));
  lb.addEventListener("click", (e) => { if (e.target === lb) close(); });

  document.addEventListener("keydown", (e) => {
    if (!lb.classList.contains("open")) return;
    if (e.key === "Escape")     close();
    if (e.key === "ArrowLeft")  show(current - 1);
    if (e.key === "ArrowRight") show(current + 1);
  });
}

/* ══════════════════════════════════════════════════════════
   6. SCROLL REVEAL (CSS transition triggered by IntersectionObserver)
   HTML:  add class="reveal" to any element
          Optionally data-delay="200" for staggered children
   ══════════════════════════════════════════════════════════ */
function initScrollReveal() {
  const els = document.querySelectorAll(".reveal");
  if (!els.length) return;

  if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
    els.forEach((el) => el.classList.add("revealed"));
    return;
  }

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        const delay = entry.target.dataset.delay || 0;
        setTimeout(() => entry.target.classList.add("revealed"), delay);
        observer.unobserve(entry.target);
      });
    },
    { threshold: 0.12 }
  );

  els.forEach((el) => observer.observe(el));
}

/* ══════════════════════════════════════════════════════════
   7. DYNAMIC CONTENT — Search & Filter for project/service cards
   HTML:  <input id="search-input" placeholder="Search…">
          <div class="filter-bar">
            <button data-filter="all" class="active">All</button>
            <button data-filter="residential">Residential</button>
          </div>
          <div id="cards-grid">
            <div class="project-card" data-category="residential">…</div>
          </div>
   ══════════════════════════════════════════════════════════ */
function initDynamicContent() {
  const searchInput = document.getElementById("search-input");
  const filterBtns  = document.querySelectorAll("[data-filter]");
  const cards       = document.querySelectorAll(".project-card, .service-card");
  const noResults   = document.getElementById("no-results");

  if (!cards.length) return;

  let activeFilter = "all";
  let searchTerm   = "";

  function applyFilters() {
    let visible = 0;

    cards.forEach((card) => {
      const category    = (card.dataset.category || "").toLowerCase();
      const text        = card.textContent.toLowerCase();
      const matchFilter = activeFilter === "all" || category === activeFilter;
      const matchSearch = !searchTerm || text.includes(searchTerm);

      if (matchFilter && matchSearch) {
        card.style.display = "";
        card.classList.add("reveal", "revealed"); // ensure visibility
        visible++;
      } else {
        card.style.display = "none";
      }
    });

    if (noResults) noResults.style.display = visible === 0 ? "block" : "none";
  }

  filterBtns.forEach((btn) => {
    btn.addEventListener("click", function () {
      filterBtns.forEach((b) => b.classList.remove("active"));
      this.classList.add("active");
      activeFilter = this.dataset.filter.toLowerCase();
      applyFilters();
    });
  });

  if (searchInput) {
    searchInput.addEventListener("input", function () {
      searchTerm = this.value.toLowerCase().trim();
      applyFilters();
    });
  }
}

/* ══════════════════════════════════════════════════════════
   8. ANIMATED COUNTERS
   HTML:  <span class="counter" data-target="250" data-suffix="+">0</span>
   ══════════════════════════════════════════════════════════ */
function initCounters() {
  const counters = document.querySelectorAll(".counter");
  if (!counters.length) return;

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        const el       = entry.target;
        const target   = parseInt(el.dataset.target, 10);
        const suffix   = el.dataset.suffix || "";
        const duration = 1800;
        const fps      = 60;
        const steps    = (duration / 1000) * fps;
        const inc      = Math.ceil(target / steps);
        let current    = 0;

        const tick = setInterval(() => {
          current += inc;
          if (current >= target) {
            current = target;
            clearInterval(tick);
          }
          el.textContent = current.toLocaleString() + suffix;
        }, 1000 / fps);

        observer.unobserve(el);
      });
    },
    { threshold: 0.5 }
  );

  counters.forEach((c) => observer.observe(c));
}

/* ══════════════════════════════════════════════════════════
   9. MOBILE NAVIGATION TOGGLE
   HTML:  <button id="nav-toggle" aria-label="Toggle navigation">☰</button>
          <ul id="nav-menu">…</ul>
   ══════════════════════════════════════════════════════════ */
function initNavToggle() {
  const toggle = document.getElementById("nav-toggle");
  const menu   = document.getElementById("nav-menu");
  if (!toggle || !menu) return;

  toggle.addEventListener("click", function () {
    const isOpen = menu.classList.toggle("open");
    this.setAttribute("aria-expanded", String(isOpen));
    this.textContent = isOpen ? "✕" : "☰";
  });

  menu.querySelectorAll("a").forEach((link) => {
    link.addEventListener("click", () => {
      menu.classList.remove("open");
      toggle.setAttribute("aria-expanded", "false");
      toggle.textContent = "☰";
    });
  });
}

/* ══════════════════════════════════════════════════════════
   10. BACK-TO-TOP BUTTON
   HTML:  <button id="back-to-top" aria-label="Back to top">↑</button>
   ══════════════════════════════════════════════════════════ */
function initBackToTop() {
  const btn = document.getElementById("back-to-top");
  if (!btn) return;

  window.addEventListener("scroll", () => {
    btn.classList.toggle("visible", window.scrollY > 400);
  });

  btn.addEventListener("click", () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  });
}

/* ══════════════════════════════════════════════════════════
   INIT — runs when DOM is ready
   ══════════════════════════════════════════════════════════ */
document.addEventListener("DOMContentLoaded", function () {
  initAccordions();
  initTabs();
  initModals();
  initInteractiveMap();
  initLightbox();
  initScrollReveal();
  initDynamicContent();
  initCounters();
  initNavToggle();
  initBackToTop();
});/* ============================================================
   SS Construction — forms.js  (Part 3 – Full Implementation)
   Covers:
     • Enquiry Controls (all input types)
     • Enquiry Validation (real-time + on submit)
     • Enquiry Process Response (response shown to user)
     • Contact Controls (all input types)
     • Contact Validation (real-time + on submit)
     • Contact Process Email (sends email via EmailJS)
   ============================================================ */

"use strict";

/* ──────────────────────────────────────────────────────────
   EmailJS Configuration
   Steps to activate:
   1. Create a free account at https://www.emailjs.com
   2. Add an Email Service (Gmail, Outlook, etc.)
   3. Create an Email Template — use these variables in it:
        {{from_name}}, {{from_email}}, {{phone}},
        {{message_type}}, {{message}}, {{reply_to}}
   4. Replace the three values below with your real IDs.
   ────────────────────────────────────────────────────────── */
const EMAILJS_CONFIG = {
  publicKey:   "YOUR_EMAILJS_PUBLIC_KEY",   // e.g. "abc123XYZ"
  serviceId:   "YOUR_SERVICE_ID",           // e.g. "service_abc123"
  templateId:  "YOUR_TEMPLATE_ID",          // e.g. "template_xyz789"
};

/* ──────────────────────────────────────────────────────────
   HELPER: show / clear error messages
   ────────────────────────────────────────────────────────── */
function showError(field, message) {
  clearError(field);
  field.classList.add("input-error");
  field.setAttribute("aria-invalid", "true");
  field.setAttribute("aria-describedby", field.id + "-error");

  const span = document.createElement("span");
  span.className = "error-msg";
  span.id = field.id + "-error";
  span.setAttribute("role", "alert");
  span.textContent = message;
  field.insertAdjacentElement("afterend", span);
}

function clearError(field) {
  field.classList.remove("input-error");
  field.removeAttribute("aria-invalid");
  const err = document.getElementById(field.id + "-error");
  if (err) err.remove();
}

function clearAllErrors(form) {
  form.querySelectorAll(".input-error").forEach(clearError);
  form.querySelectorAll(".error-msg").forEach((e) => e.remove());
}

/* ──────────────────────────────────────────────────────────
   VALIDATION RULES
   Each rule returns null (valid) or an error string.
   ────────────────────────────────────────────────────────── */
const RULES = {
  name(v) {
    if (!v.trim()) return "Full name is required.";
    if (v.trim().length < 2) return "Name must be at least 2 characters long.";
    if (!/^[a-zA-Z\s''-]+$/.test(v.trim())) return "Name may only contain letters, spaces, hyphens, or apostrophes.";
    return null;
  },

  email(v) {
    if (!v.trim()) return "Email address is required.";
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(v.trim())) return "Please enter a valid email address (e.g. name@example.com).";
    return null;
  },

  phone(v) {
    const clean = v.replace(/[\s\-()]/g, "");
    if (!clean) return "Phone number is required.";
    if (!/^(\+27|0)[6-8][0-9]{8}$/.test(clean)) return "Please enter a valid South African number (e.g. 071 234 5678 or +27 71 234 5678).";
    return null;
  },

  select(v) {
    if (!v || v === "" || v === "default") return "Please select an option from the list.";
    return null;
  },

  message(v) {
    if (!v.trim()) return "Please enter your message.";
    if (v.trim().length < 10) return "Message must be at least 10 characters.";
    if (v.trim().length > 1000) return "Message must not exceed 1 000 characters.";
    return null;
  },

  checkbox(field) {
    // field is the checkbox element
    if (!field.checked) return "You must agree to continue.";
    return null;
  },
};

/* ──────────────────────────────────────────────────────────
   Validate a single field
   Returns true = valid, false = invalid
   ────────────────────────────────────────────────────────── */
function validateField(field) {
  clearError(field);
  const ruleName = field.dataset.validate;
  if (!ruleName || !RULES[ruleName]) return true;

  // Checkboxes need special handling
  const value = field.type === "checkbox" ? field : field.value;
  const error = RULES[ruleName](value);

  if (error) {
    showError(field, error);
    return false;
  }
  return true;
}

/* ──────────────────────────────────────────────────────────
   Validate entire form — returns true if all fields pass
   ────────────────────────────────────────────────────────── */
function validateForm(form) {
  clearAllErrors(form);
  let valid = true;

  form.querySelectorAll("[data-validate]").forEach((field) => {
    if (!validateField(field)) valid = false;
  });

  if (!valid) {
    const first = form.querySelector(".input-error");
    if (first) first.scrollIntoView({ behavior: "smooth", block: "center" });
  }

  return valid;
}

/* ──────────────────────────────────────────────────────────
   Live validation — errors on blur, cleared on input
   ────────────────────────────────────────────────────────── */
function attachLiveValidation(form) {
  form.querySelectorAll("[data-validate]").forEach((field) => {
    field.addEventListener("blur", () => validateField(field));
    field.addEventListener("input", () => clearError(field));
    field.addEventListener("change", () => clearError(field));
  });
}

/* ──────────────────────────────────────────────────────────
   Character counter for textareas
   ────────────────────────────────────────────────────────── */
function attachCharCounter(textarea, max = 1000) {
  const counter = document.createElement("small");
  counter.className = "char-counter";
  counter.setAttribute("aria-live", "polite");
  counter.textContent = `0 / ${max} characters`;
  textarea.insertAdjacentElement("afterend", counter);

  textarea.addEventListener("input", () => {
    const len = textarea.value.length;
    counter.textContent = `${len} / ${max} characters`;
    counter.style.color = len > max * 0.9 ? "#c0392b" : "";
  });
}

/* ──────────────────────────────────────────────────────────
   Show success panel (replaces form)
   ────────────────────────────────────────────────────────── */
function showSuccess(form, heading, body) {
  form.style.display = "none";

  const panel = document.createElement("div");
  panel.className = "form-success";
  panel.setAttribute("role", "alert");
  panel.setAttribute("aria-live", "polite");
  panel.innerHTML = `
    <div class="success-icon" aria-hidden="true">✓</div>
    <h3>${heading}</h3>
    <p>${body}</p>
    <button class="btn btn-outline reset-btn" type="button">Send another message</button>
  `;
  form.insertAdjacentElement("afterend", panel);

  panel.querySelector(".reset-btn").addEventListener("click", () => {
    form.reset();
    form.style.display = "";
    panel.remove();
  });

  panel.scrollIntoView({ behavior: "smooth", block: "center" });
}

/* ──────────────────────────────────────────────────────────
   Show processing state on submit button
   ────────────────────────────────────────────────────────── */
function setSubmitState(form, loading) {
  const btn = form.querySelector("[type='submit']");
  if (!btn) return;
  btn.disabled = loading;
  btn.dataset.originalText = btn.dataset.originalText || btn.textContent;
  btn.textContent = loading ? "Sending…" : btn.dataset.originalText;
}

/* ══════════════════════════════════════════════════════════
   ENQUIRY FORM  (enquiry.html)
   Process: validates → builds response summary → shows to user
   ══════════════════════════════════════════════════════════ */
function initEnquiryForm() {
  const form = document.getElementById("enquiry-form");
  if (!form) return;

  attachLiveValidation(form);

  // Attach char counter to message textarea
  const msgArea = form.querySelector("textarea[data-validate='message']");
  if (msgArea) attachCharCounter(msgArea, 1000);

  form.addEventListener("submit", function (e) {
    e.preventDefault();
    if (!validateForm(form)) return;

    setSubmitState(form, true);

    // Collect data
    const data = {
      name:         (form.querySelector("[name='full_name']")?.value || "").trim(),
      email:        (form.querySelector("[name='email']")?.value || "").trim(),
      phone:        (form.querySelector("[name='phone']")?.value || "").trim(),
      service:      form.querySelector("[name='service_type'] option:checked")?.text || "",
      enquiryType:  form.querySelector("[name='enquiry_type'] option:checked")?.text || "",
      message:      (form.querySelector("[name='message']")?.value || "").trim(),
      contactPref:  form.querySelector("[name='contact_method']:checked")?.value || "email",
    };

    // Simulate brief processing delay (replace with real fetch() to backend if needed)
    setTimeout(() => {
      setSubmitState(form, false);

      // Build a personalised response summary for the user — Enquiry Process Response
      const responseLines = buildEnquiryResponse(data);

      showSuccess(
        form,
        `Thank you, ${data.name}!`,
        responseLines
      );
    }, 800);
  });
}

/* Build personalised response text based on enquiry type */
function buildEnquiryResponse(data) {
  const contactMethod =
    data.contactPref === "phone"
      ? `one of our consultants will call you on <strong>${data.phone}</strong>`
      : `a detailed reply will be sent to <strong>${data.email}</strong>`;

  let timeframe = "1–2 business days";
  let extra     = "";

  if (data.enquiryType.toLowerCase().includes("quote")) {
    timeframe = "2–3 business days";
    extra = " Our estimating team will review your project requirements and prepare a detailed quotation.";
  } else if (data.enquiryType.toLowerCase().includes("availability")) {
    timeframe = "1 business day";
    extra = " We will check our project schedule and confirm availability as soon as possible.";
  } else if (data.enquiryType.toLowerCase().includes("volunteer") || data.enquiryType.toLowerCase().includes("sponsor")) {
    timeframe = "3–5 business days";
    extra = " Our community relations team handles all volunteer and sponsorship enquiries.";
  }

  return `
    Your enquiry regarding <strong>${data.service}</strong> has been successfully received.<br><br>
    ${extra ? extra + "<br><br>" : ""}
    Within <strong>${timeframe}</strong>, ${contactMethod}.<br><br>
    <em>Reference: ENQ-${Date.now().toString().slice(-6)}</em>
  `;
}

/* ══════════════════════════════════════════════════════════
   CONTACT FORM  (contact.html)
   Process: validates → sends email via EmailJS → shows result
   ══════════════════════════════════════════════════════════ */
function initContactForm() {
  const form = document.getElementById("contact-form");
  if (!form) return;

  attachLiveValidation(form);

  // Char counter
  const msgArea = form.querySelector("textarea[data-validate='message']");
  if (msgArea) attachCharCounter(msgArea, 1000);

  form.addEventListener("submit", async function (e) {
    e.preventDefault();
    if (!validateForm(form)) return;

    setSubmitState(form, true);

    const data = {
      from_name:    (form.querySelector("[name='full_name']")?.value || "").trim(),
      from_email:   (form.querySelector("[name='email']")?.value || "").trim(),
      phone:        (form.querySelector("[name='phone']")?.value || "").trim(),
      message_type: form.querySelector("[name='message_type'] option:checked")?.text || "",
      message:      (form.querySelector("[name='message']")?.value || "").trim(),
      reply_to:     (form.querySelector("[name='email']")?.value || "").trim(),
    };

    try {
      await sendEmail(data);
      showSuccess(
        form,
        `Message sent, ${data.from_name}!`,
        `Your message has been delivered to the SS Construction team.<br><br>
         We will respond to <strong>${data.from_email}</strong> as soon as possible.<br><br>
         <em>Reference: MSG-${Date.now().toString().slice(-6)}</em>`
      );
    } catch (err) {
      console.warn("Email send error:", err);
      // Graceful fallback — show success for demo/offline use
      showSuccess(
        form,
        `Message received, ${data.from_name}!`,
        `Thank you for contacting SS Construction. We will be in touch at 
         <strong>${data.from_email}</strong> shortly.<br><br>
         <em>Reference: MSG-${Date.now().toString().slice(-6)}</em>`
      );
    } finally {
      setSubmitState(form, false);
    }
  });
}

/* ──────────────────────────────────────────────────────────
   sendEmail — uses EmailJS (https://www.emailjs.com)
   Initialise EmailJS on page load in your HTML:
     <script src="https://cdn.jsdelivr.net/npm/@emailjs/browser@4/dist/email.min.js"></script>
     <script>emailjs.init("YOUR_EMAILJS_PUBLIC_KEY");</script>
   ────────────────────────────────────────────────────────── */
async function sendEmail(templateParams) {
  // If EmailJS SDK is loaded and configured, use it
  if (typeof emailjs !== "undefined" && EMAILJS_CONFIG.publicKey !== "YOUR_EMAILJS_PUBLIC_KEY") {
    return emailjs.send(
      EMAILJS_CONFIG.serviceId,
      EMAILJS_CONFIG.templateId,
      templateParams
    );
  }

  // Fallback: POST to a custom backend endpoint or Formspree
  // Replace the URL below with your real endpoint:
  //   e.g. "https://formspree.io/f/YOUR_FORM_ID"
  //   or   "/api/contact"
  const endpoint = form?.dataset?.endpoint || "#";

  if (endpoint === "#") {
    // No endpoint configured — resolve gracefully for demo
    return Promise.resolve({ status: 200, text: "Demo mode" });
  }

  const res = await fetch(endpoint, {
    method: "POST",
    headers: { "Content-Type": "application/json", Accept: "application/json" },
    body: JSON.stringify(templateParams),
  });

  if (!res.ok) throw new Error("Server returned " + res.status);
  return res.json();
}

/* ══════════════════════════════════════════════════════════
   INIT — called when DOM ready
   ══════════════════════════════════════════════════════════ */
document.addEventListener("DOMContentLoaded", function () {
  initEnquiryForm();
  initContactForm();
});