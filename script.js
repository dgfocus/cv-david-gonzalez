// CV8 — page built from DATA (data.js) after the "How it works" reference (18.11.2026).
// Texts of the new layout live in S (fr/en); the CV itself stays in DATA.
const $ = (s, r = document) => r.querySelector(s);
const esc = (s) => String(s).replace(/[&<>"]/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" }[c]));
const reduce = matchMedia("(prefers-reduced-motion: reduce)").matches;

// Outline icons from Lucide (lucide.dev, ISC licence), copied as plain SVG
const I = {
  globe: '<circle cx="12" cy="12" r="10"/><path d="M12 2a14.5 14.5 0 0 0 0 20 14.5 14.5 0 0 0 0-20"/><path d="M2 12h20"/>',
  megaphone: '<path d="m3 11 18-5v12L3 14v-3z"/><path d="M11.6 16.8a3 3 0 1 1-5.8-1.6"/>',
  clapper: '<path d="M20.2 6 3 11l-.9-2.4c-.3-1.1.3-2.2 1.3-2.5l13.5-4c1.1-.3 2.2.3 2.5 1.3Z"/><path d="m6.2 5.3 3.1 3.9"/><path d="m12.4 3.4 3.1 4"/><path d="M3 11h18v8a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2Z"/>',
  pen: '<path d="M15.707 21.293a1 1 0 0 1-1.414 0l-1.586-1.586a1 1 0 0 1 0-1.414l5.586-5.586a1 1 0 0 1 1.414 0l1.586 1.586a1 1 0 0 1 0 1.414z"/><path d="m18 13-1.375-6.874a1 1 0 0 0-.746-.776L3.235 2.028a1 1 0 0 0-1.207 1.207L5.35 15.879a1 1 0 0 0 .776.746L13 18"/><path d="m2.3 2.3 7.286 7.286"/><circle cx="11" cy="11" r="2"/>',
  kanban: '<path d="M6 5v11"/><path d="M12 5v6"/><path d="M18 5v14"/>',
  landmark: '<line x1="3" x2="21" y1="22" y2="22"/><line x1="6" x2="6" y1="18" y2="11"/><line x1="10" x2="10" y1="18" y2="11"/><line x1="14" x2="14" y1="18" y2="11"/><line x1="18" x2="18" y1="18" y2="11"/><polygon points="12 2 20 7 4 7"/>',
  check: '<path d="M20 6 9 17l-5-5"/>'
};
const icon = (k, cls = "ico") => `<svg class="${cls}" viewBox="0 0 24 24" aria-hidden="true">${I[k]}</svg>`;

// Brand marks from Simple Icons (CC0), in each network's official colour
const BRAND = {
  "Facebook": ["#0866FF", "M9.101 23.691v-7.98H6.627v-3.667h2.474v-1.58c0-4.085 1.848-5.978 5.858-5.978.401 0 .955.042 1.468.103a8.68 8.68 0 0 1 1.141.195v3.325a8.623 8.623 0 0 0-.653-.036 26.805 26.805 0 0 0-.733-.009c-.707 0-1.259.096-1.675.309a1.686 1.686 0 0 0-.679.622c-.258.42-.374.995-.374 1.752v1.297h3.919l-.386 2.103-.287 1.564h-3.246v8.245C19.396 23.238 24 18.179 24 12.044c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.628 3.874 10.35 9.101 11.647Z"],
  "LinkedIn": ["#0A66C2", "M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"],
  "X": ["#000000", "M18.901 1.153h3.68l-8.04 9.19L24 22.846h-7.406l-5.8-7.584-6.638 7.584H.474l8.6-9.83L0 1.154h7.594l5.243 6.932ZM17.61 20.644h2.039L6.486 3.24H4.298Z"],
  "Instagram": ["#E4405F", "M7.0301.084c-1.2768.0602-2.1487.264-2.911.5634-.7888.3075-1.4575.72-2.1228 1.3877-.6652.6677-1.075 1.3368-1.3802 2.127-.2954.7638-.4956 1.6365-.552 2.914-.0564 1.2775-.0689 1.6882-.0626 4.947.0062 3.2586.0206 3.6671.0825 4.9473.061 1.2765.264 2.1482.5635 2.9107.308.7889.72 1.4573 1.388 2.1228.6679.6655 1.3365 1.0743 2.1285 1.38.7632.295 1.6361.4961 2.9134.552 1.2773.056 1.6884.069 4.9462.0627 3.2578-.0062 3.668-.0207 4.9478-.0814 1.28-.0607 2.147-.2652 2.9098-.5633.7889-.3086 1.4578-.72 2.1228-1.3881.665-.6682 1.0745-1.3378 1.3795-2.1284.2957-.7632.4966-1.636.552-2.9124.056-1.2809.0692-1.6898.063-4.948-.0063-3.2583-.021-3.6668-.0817-4.9465-.0607-1.2797-.264-2.1487-.5633-2.9117-.3084-.7889-.72-1.4568-1.3876-2.1228C21.2982 1.33 20.628.9208 19.8378.6165 19.074.321 18.2017.1197 16.9244.0645 15.6471.0093 15.236-.005 11.977.0014 8.718.0076 8.31.0215 7.0301.0839m.1402 21.6932c-1.17-.0509-1.8053-.2453-2.2287-.408-.5606-.216-.96-.4771-1.3819-.895-.422-.4178-.6811-.8186-.9-1.378-.1644-.4234-.3624-1.058-.4171-2.228-.0595-1.2645-.072-1.6442-.079-4.848-.007-3.2037.0053-3.583.0607-4.848.05-1.169.2456-1.805.408-2.2282.216-.5613.4762-.96.895-1.3816.4188-.4217.8184-.6814 1.3783-.9003.423-.1651 1.0575-.3614 2.227-.4171 1.2655-.06 1.6447-.072 4.848-.079 3.2033-.007 3.5835.005 4.8495.0608 1.169.0508 1.8053.2445 2.228.408.5608.216.96.4754 1.3816.895.4217.4194.6816.8176.9005 1.3787.1653.4217.3617 1.056.4169 2.2263.0602 1.2655.0739 1.645.0796 4.848.0058 3.203-.0055 3.5834-.061 4.848-.051 1.17-.245 1.8055-.408 2.2294-.216.5604-.4763.96-.8954 1.3814-.419.4215-.8181.6811-1.3783.9-.4224.1649-1.0577.3617-2.2262.4174-1.2656.0595-1.6448.072-4.8493.079-3.2045.007-3.5825-.006-4.848-.0608M16.953 5.5864A1.44 1.44 0 1 0 18.39 4.144a1.44 1.44 0 0 0-1.437 1.4424M5.8385 12.012c.0067 3.4032 2.7706 6.1557 6.173 6.1493 3.4026-.0065 6.157-2.7701 6.1506-6.1733-.0065-3.4032-2.771-6.1565-6.174-6.1498-3.403.0067-6.156 2.771-6.1496 6.1738M8 12.0077a4 4 0 1 1 4.008 3.9921A3.9996 3.9996 0 0 1 8 12.0077"],
  "YouTube": ["#FF0000", "M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"]
};

const EMAIL = "gonzalez.david@protonmail.com";
const LINKEDIN = "https://www.linkedin.com/in/dagonzalez/";

// ---------- Texts of the layout ----------
const S = {
  fr: {
    nav: [["#domaines", "Domaines"], ["#parcours", "Parcours"], ["#competences", "Compétences"], ["#formation", "Formation"]],
    cta: "Me contacter", navContact: "Contact", lang: "EN",
    hero: { kicker: "Communication digitale · Sites web · Multimédia", h1: "David Gonzalez · Communication digitale", linkedin: "LinkedIn ↗" },
    dom: {
      kicker: "Domaines d'expertise", title: "Chaque message,<br>bien orchestré.",
      side: "Des contenus aux canaux, des projets web aux communications officielles : quatre domaines nourris par plus de 20 ans de pratique à Genève.",
      items: [
        ["Contenus", "Des contenus clairs, sur tous les supports.", "Je gère et fais évoluer des sites web, je rédige pour le web et je produis visuels et vidéos qui rendent l'information claire et attractive.", ["CMS", "Rédaction web", "Graphisme", "Vidéo"]],
        ["Communication digitale", "Toucher les bons publics, puis mesurer.", "Je conçois newsletters, publications et campagnes d'information pour toucher les bons publics, puis j'en mesure les résultats pour ajuster le tir.", ["Newsletters", "Réseaux sociaux", "Campagnes", "Analytics"]],
        ["Projets web", "Du cahier des charges à la mise en ligne.", "Je coordonne les projets numériques de bout en bout, avec les équipes et les prestataires, dans le respect des délais et du budget.", ["Coordination", "Prestataires", "Budget", "Maintenance"]],
        ["Institutionnel", "La rigueur des communications officielles.", "Je rédige communications officielles et internes, et je fais le lien entre services, équipes et publics, avec rigueur et discrétion.", ["Communications officielles", "Interne", "Confidentialité"]]
      ],
    },
    path: { kicker: "Expériences professionnelles", title: "Des institutions qui m'ont fait confiance.",
      side: (n, y) => `De Cartier à l'Université de Genève, en passant par Genève Tourisme, la HEG et le Théâtre de Carouge.`,
      now: "En poste" },
    skills: { kicker: "Compétences clés", title: "Savoir-faire et outils du quotidien.",
      side: "",
      tools: "Outils du quotidien", count: (n) => `${n} outils`, toolsLbl: "Outils",
      families: ["CMS & web", "Adobe, image & vidéo", "Intelligence artificielle", "Réseaux sociaux & mesure", "Bureautique"], other: "Autres" },
    edu: { kicker: "Formations · Langues", title: "Formations et certifications.",
      side: "",
      bar: "Formations", langs: "Trois langues de travail" },
    contact: { mail: "Écrire un e-mail",
      card: { h1: "Contact", h2: "David Gonzalez", badge: "Disponible",
        cells: [["Expérience", "20+ ans"], ["Langues", "FR · ES · EN"], ["Permis", "C (Suisse)"], ["Nationalité", "Espagnole"]],
        list: "Me joindre" } },
    foot: ["© 2026 David Gonzalez", "Haut de page ↑"],
    footer: { kicker: "Contact", title: "Un projet web, une équipe à renforcer&nbsp;?<br><em>Parlons&#8209;en.</em>", secs: "Sections", photo: "Portrait de David Gonzalez",
      alt: "Gravure bleue de la rade de Genève avec le jet d'eau, le port et les montagnes" }
  },
  en: {
    nav: [["#domaines", "Expertise"], ["#parcours", "Experience"], ["#competences", "Skills"], ["#formation", "Education"]],
    cta: "Get in touch", navContact: "Contact", lang: "FR",
    hero: { kicker: "Digital communication · Websites · Multimedia", h1: "David Gonzalez · Digital communication", linkedin: "LinkedIn ↗" },
    dom: {
      kicker: "Areas of expertise", title: "Every message,<br>well orchestrated.",
      side: "From content to channels, from web projects to official communications: four areas built on more than 20 years of practice in Geneva.",
      items: [
        ["Content", "Clear content, on every medium.", "I manage and develop websites, write for the web and produce visuals and videos that make information clear and engaging.", ["CMS", "Web writing", "Graphic design", "Video"]],
        ["Digital communication", "Reach the right audiences, then measure.", "I design newsletters, posts and information campaigns to reach the right audiences, then measure the results to adjust course.", ["Newsletters", "Social media", "Campaigns", "Analytics"]],
        ["Web projects", "From the brief to going live.", "I coordinate digital projects end to end, with teams and vendors, on time and on budget.", ["Coordination", "Vendors", "Budget", "Maintenance"]],
        ["Institutional", "The rigour of official communications.", "I write official and internal communications, and link departments, teams and audiences, with rigour and discretion.", ["Official communications", "Internal", "Confidentiality"]]
      ],
    },
    path: { kicker: "Professional experience", title: "Institutions that have placed their trust in me.",
      side: (n, y) => `From Cartier to the University of Geneva, by way of Geneva Tourism, HEG and Théâtre de Carouge.`,
      now: "Current" },
    skills: { kicker: "Key skills", title: "Know-how and everyday tools.",
      side: "", toolsLbl: "Tools",
      tools: "Everyday tools", count: (n) => `${n} tools`,
      families: ["CMS & web", "Adobe, image & video", "Artificial intelligence", "Social media & analytics", "Office"], other: "Other" },
    edu: { kicker: "Education · Languages", title: "Education and certifications.",
      side: "",
      bar: "Education", langs: "Three working languages" },
    contact: { mail: "Send an e-mail",
      card: { h1: "Contact", h2: "David Gonzalez", badge: "Available",
        cells: [["Experience", "20+ yrs"], ["Languages", "FR · ES · EN"], ["Permit", "C (Swiss)"], ["Citizenship", "Spanish"]],
        list: "Reach me" } },
    foot: ["© 2026 David Gonzalez", "Back to top ↑"],
    footer: { kicker: "Contact", title: "A web project, a team to strengthen?<br><em>Let's talk.</em>", secs: "Sections", photo: "Portrait of David Gonzalez",
      alt: "Blue engraving of Geneva's harbour with the Jet d'Eau, the marina and the mountains" }
  }
};

// Skills (20.11.2026, "exemple B" chosen by David in pistes/competences-categories.html, FR + EN since 22.11.2026):
// the 4 know-how families as a list + panel, each one holding its own tools
const SKILL_CATS_ALL = { fr: [
  { t: "Production de contenus", ico: "pen",
    know: ["Gestion de contenus (CMS)", "Rédaction web et éditoriale", "Production graphique et vidéo"],
    tools: ["WordPress", "Drupal", "Typo3", "Concrete5", "Photoshop", "Illustrator", "InDesign", "Premiere Pro", "After Effects", "DaVinci Resolve", "CapCut", "Canva",
            "ChatGPT", "Claude", "Gemini", "Perplexity", "NotebookLM", "Google AI Studio", "Midjourney"] },
  { t: "Communication digitale", ico: "megaphone",
    know: ["Stratégie de communication digitale", "Marketing digital B2B / B2C", "Newsletters et campagnes d'information"],
    tools: ["Facebook", "LinkedIn", "X", "Instagram", "YouTube", "Google Analytics", "Google Ads", "Outils CMS (newsletters)"] },
  { t: "Gestion de projets web", ico: "kanban",
    know: ["Coordination de projets digitaux", "Gestion de prestataires et suivi budgétaire", "Déploiement et maintenance de sites web"],
    tools: ["HTML5", "CSS3", "JavaScript (notions)", "FTP", "Excel"] },
  { t: "Communication institutionnelle", ico: "landmark",
    know: ["Interface entre services, équipes et publics", "Communications officielles et internes", "Informations confidentielles et sensibles"],
    tools: ["Word", "Outlook", "PowerPoint", "CRM"] }
], en: [
  { t: "Content production", ico: "pen",
    know: ["Content management (CMS)", "Web and editorial writing", "Graphic and video production"],
    tools: ["WordPress", "Drupal", "Typo3", "Concrete5", "Photoshop", "Illustrator", "InDesign", "Premiere Pro", "After Effects", "DaVinci Resolve", "CapCut", "Canva",
            "ChatGPT", "Claude", "Gemini", "Perplexity", "NotebookLM", "Google AI Studio", "Midjourney"] },
  { t: "Digital communication", ico: "megaphone",
    know: ["Digital communication strategy", "B2B / B2C digital marketing", "Newsletters and information campaigns"],
    tools: ["Facebook", "LinkedIn", "X", "Instagram", "YouTube", "Google Analytics", "Google Ads", "CMS tools (newsletters)"] },
  { t: "Web project management", ico: "kanban",
    know: ["Digital project coordination", "Vendor management and budget tracking", "Website deployment and maintenance"],
    tools: ["HTML5", "CSS3", "JavaScript (basics)", "FTP", "Excel"] },
  { t: "Institutional communication", ico: "landmark",
    know: ["Interface between departments, teams and audiences", "Official and internal communications", "Confidential and sensitive information"],
    tools: ["Word", "Outlook", "PowerPoint", "CRM"] }
] };
let SKILL_CATS = SKILL_CATS_ALL.fr;

// ---------- Building blocks ----------
const head = (kicker, title, side, extra = "") => `
  <div class="head${side || extra ? "" : " head--solo"} reveal">
    <div><p class="kicker">${esc(kicker)}</p><h2>${title}</h2></div>
    ${side || extra ? `<div class="head__side">${side ? `<p>${esc(side)}</p>` : ""}${extra}</div>` : ""}
  </div>`;

function heroHTML(s) {
  return `<section class="sec hero" style="border-top:0"><div class="wrap">
    <p class="kicker">${esc(s.hero.kicker)}</p>
    <h1 class="sr-only">${esc(s.hero.h1)}</h1>
    <p class="hero__lead" id="lead"></p>
    <div class="hero__actions">
      <a class="btn btn--dark btn--lg" href="#contact">${esc(s.cta)} <span class="arr">→</span></a>
      <a class="btn btn--line btn--lg" href="${LINKEDIN}" target="_blank" rel="noopener">${esc(s.hero.linkedin)}</a>
    </div>
  </div></section>`;
}

function domainsHTML(s) {
  // Same content as CV6's "01 / DOMAINES D'EXPERTISE": number, title, description, keywords;
  // the right column shows the domain's isometric scene (iso-scenes.js), animated each time it changes
  const items = s.dom.items.map(([t, , p, tags], i) => `
    <li class="acc__item${i === 0 ? " open" : ""}" data-i="${i}">
      <button class="acc__btn" type="button" aria-expanded="${i === 0}" aria-controls="acc-${i}">
        <span class="acc__n">0${i + 1}</span><span class="acc__t">${esc(t)}</span><span class="acc__sq" aria-hidden="true"></span>
      </button>
      <div class="acc__body" id="acc-${i}"><div class="acc__inner"><div>
        <p>${esc(p)}</p>
        <ul class="checks">${tags.map((x) => `<li>${icon("check", "")}${esc(x)}</li>`).join("")}</ul>
      </div></div></div>
      <span class="acc__bar" aria-hidden="true"></span>
    </li>`).join("");
  return `<section class="sec" id="domaines"><div class="wrap">
    <p class="kicker reveal">${esc(s.dom.kicker)}</p>
    <div class="explorer frame reveal" id="explorer">
      <ol class="acc">${items}</ol>
      <div class="explorer__panel">
        <div class="stage" id="stage" aria-live="polite"></div>
      </div>
    </div>
  </div></section>`;
}

function pathHTML(s, d) {
  const first = d.jobs[d.jobs.length - 1].d.match(/\d{4}/)[0];
  const dates = (x) => x.replace(/\s?—\s?/, " → ");
  const n = d.jobs.length, pad = (k) => String(k).padStart(2, "0");
  // Same principle as CV7/styleD: a sticky column (title, counter "01 / 08", progress line, dates of the card in view)
  // beside cards that stack while you scroll; the card underneath steps back (smaller, greyer)
  const cards = d.jobs.map((j, i) => {
    const rate = (j.r.match(/(\d+)\s?%/) || [])[1];
    return `<li class="xcard frame${j.now ? " xcard--now" : ""}" data-d="${esc(dates(j.d))}" style="--i:${i}">
      <div class="xcard__top"><span class="xcard__date">${esc(dates(j.d))}</span><span class="xcard__n">${pad(i + 1)}</span></div>
      <h3>${esc(j.r.replace(/\s·\s\d+\s?%/, ""))}</h3>
      <p class="xcard__org">${esc(j.o)}</p>
      <ul>${j.p.map((x) => `<li>${esc(x)}</li>`).join("")}</ul>
      ${j.now || rate ? `<div class="xcard__foot">${j.now ? `<span class="xcard__now">${esc(s.path.now)}</span>` : ""}${rate ? `<span>${rate} %</span>` : ""}</div>` : ""}
    </li>`;
  }).join("");
  // FR: title on one line above both columns (David, 20.11.2026); EN keeps it in the sticky column

  return `<section class="sec" id="parcours"><div class="wrap">
    ${head(s.path.kicker, s.path.title, "")}
    <div class="xp">
      <div class="xp__aside reveal">
        <p class="xp__side">${esc(s.path.side(n, first))}</p>
        <div class="xp__big" aria-hidden="true"><span id="xp-n">01</span><small>/ ${pad(n)}</small></div>
        <div class="xp__bar" aria-hidden="true"><i id="xp-bar"></i></div>
        <p class="xp__date" id="xp-date" aria-hidden="true">${esc(dates(d.jobs[0].d))}</p>
      </div>
      <ol class="xp__list" id="xp-list">${cards}</ol>
    </div>
  </div></section>`;
}

// Career cards: counter, progress line and the "step back" of the card underneath, driven by scroll
function setupCareer() {
  const list = $("#xp-list");
  if (!list) return;
  const cards = [...list.children], num = $("#xp-n"), date = $("#xp-date"), bar = $("#xp-bar");
  const STICK = 112; // px under the top of the screen where a card settles
  // A card taller than the screen settles higher (even partly above it), so its last line
  // is read before the next card covers it
  const place = () => {
    const vh = innerHeight;
    cards.forEach((c) => { c.style.top = Math.min(STICK, vh - c.offsetHeight - 24) + "px"; });
  };
  let ticking = false;
  const update = () => {
    ticking = false;
    const vh = innerHeight, stacked = getComputedStyle(cards[0]).position === "sticky";
    // the card in view: the last one whose top has passed 60% of the screen
    let cur = 0;
    cards.forEach((c, i) => { if (c.getBoundingClientRect().top <= vh * 0.6) cur = i; });
    num.textContent = String(cur + 1).padStart(2, "0");
    date.textContent = cards[cur].dataset.d;
    const lr = list.getBoundingClientRect();
    const p = Math.min(1, Math.max(0, (vh * 0.6 - lr.top) / Math.max(1, lr.height - vh * 0.2)));
    bar.style.transform = `scaleX(${p})`;
    // each card steps back as the next one slides over it
    cards.forEach((c, i) => {
      const next = cards[i + 1];
      let k = 0;
      if (next && stacked && !reduce) {
        const nt = next.getBoundingClientRect().top, from = vh * 0.85, end = parseFloat(next.style.top) || STICK;
        k = Math.min(1, Math.max(0, (from - nt) / Math.max(1, from - end)));
      }
      c.style.setProperty("--k", k.toFixed(3));
      c.classList.toggle("is-back", k > 0.12);
    });
  };
  const onScroll = () => { if (!ticking) { ticking = true; requestAnimationFrame(update); } };
  const onResize = () => { place(); onScroll(); };
  setupCareer.off?.();
  addEventListener("scroll", onScroll, { passive: true });
  addEventListener("resize", onResize);
  setupCareer.off = () => { removeEventListener("scroll", onScroll); removeEventListener("resize", onResize); };
  if (document.fonts) document.fonts.ready.then(onResize);
  place();
  update();
}

const toolChip = (t) => BRAND[t]
  ? `<span class="tool"><svg viewBox="0 0 24 24" aria-hidden="true"><path fill="${BRAND[t][0]}" d="${BRAND[t][1]}"/></svg>${esc(t)}</span>`
  : `<span class="tool">${esc(t)}</span>`;

function catPanelHTML(i) {
  const c = SKILL_CATS[i];
  return `<div class="cats__head"><span class="cats__ico">${icon(c.ico)}</span><h3>${esc(c.t)}</h3></div>
    <ul class="checks">${c.know.map((k) => `<li>${icon("check", "")}${esc(k)}</li>`).join("")}</ul>
    <div class="cats__tools"><p class="cats__lbl">${esc(S[document.documentElement.lang].skills.toolsLbl)}</p><div class="tools__list">${c.tools.map(toolChip).join("")}</div></div>`;
}

function catsHTML(s) {
  const tabs = SKILL_CATS.map((c, i) => `
    <li><button class="cats__btn" type="button" role="tab" id="cat-${i}" aria-controls="cat-panel" aria-selected="${i === 0}" tabindex="${i === 0 ? 0 : -1}" data-i="${i}">
      <span class="cats__n">0${i + 1}</span><span class="cats__t">${esc(c.t)}</span><span class="cats__c">${c.tools.length}</span>
    </button></li>`).join("");
  return `<section class="sec" id="competences"><div class="wrap">
    ${head(s.skills.kicker, s.skills.title, s.skills.side)}
    <div class="cats frame reveal">
      <ul class="cats__list" role="tablist" aria-label="${esc(s.skills.kicker)}">${tabs}</ul>
      <div class="cats__panel" id="cat-panel" role="tabpanel" aria-labelledby="cat-0">${catPanelHTML(0)}</div>
    </div>
  </div></section>`;
}

function setupCats() {
  const list = $(".cats__list"), panel = $("#cat-panel");
  if (!list) return;
  const show = (i, focus) => {
    list.querySelectorAll(".cats__btn").forEach((b) => {
      const on = +b.dataset.i === i;
      b.setAttribute("aria-selected", on); b.tabIndex = on ? 0 : -1;
      if (on && focus) b.focus();
    });
    panel.setAttribute("aria-labelledby", "cat-" + i);
    panel.innerHTML = catPanelHTML(i);
    panel.classList.remove("swap"); void panel.offsetWidth; panel.classList.add("swap");
  };
  list.addEventListener("click", (e) => { const b = e.target.closest(".cats__btn"); if (b) show(+b.dataset.i); });
  list.addEventListener("keydown", (e) => {
    const k = { ArrowDown: 1, ArrowRight: 1, ArrowUp: -1, ArrowLeft: -1 }[e.key];
    const b = e.target.closest(".cats__btn");
    if (!k || !b) return;
    e.preventDefault();
    show((+b.dataset.i + k + SKILL_CATS.length) % SKILL_CATS.length, true);
  });
}

function skillsHTML(s, d, lang) {
  SKILL_CATS = SKILL_CATS_ALL[lang];
  return catsHTML(s);
}

function eduHTML(s, d) {
  const edu = d.edu.map(([y, t, sc]) => `<li><span class="edu__y">${esc(y)}</span><div><strong>${esc(t)}</strong><em>${esc(sc)}</em></div></li>`).join("");
  const langs = d.langs.map(([n, lvl, note]) => `<li><div><strong>${esc(n)}</strong><em>${esc(note)}</em></div>
    <span class="meter" aria-label="${lvl}/5">${[1, 2, 3, 4, 5].map((k) => `<i class="${k <= lvl ? "on" : ""}"></i>`).join("")}</span></li>`).join("");
  return `<section class="sec" id="formation"><div class="wrap">
    ${head(s.edu.kicker, s.edu.title, s.edu.side)}
    <div class="split">
      <div class="box frame reveal"><div class="bar"><span>${esc(s.edu.bar)}</span>${s.edu.count ? `<span>${esc(s.edu.count(d.edu.length))}</span>` : ""}</div><ul class="edu">${edu}</ul></div>
      <div class="box frame reveal" style="--d:90ms"><div class="bar"><span>${esc(s.edu.langs)}</span>${s.edu.langCount ? `<span>${esc(s.edu.langCount)}</span>` : ""}</div><ul class="langs">${langs}</ul></div>
    </div>
  </div></section>`;
}

function contactHTML(s) {
  const c = s.contact;
  const card = { ...c.card, rows: [
    ["E-mail", "", `<a href="mailto:${EMAIL}">${EMAIL}</a>`],
    ["LinkedIn", "", `<a href="${LINKEDIN}" target="_blank" rel="noopener">/in/dagonzalez ↗</a>`]
  ] };
  return footerHTML(s, card);
}

// Footer contact card (22.11.2026, proposal C "Carte agrandie" of pistes/footer-contact.html, FR + EN,
// desktop + mobile since 22.11.2026): e-mail button and sections under the sentence, card with photo on the right.
function footCardHTML(s, c) {
  const left = `<div class="fdesk fdesk__left">
      <div class="btns"><a class="btn btn--dark btn--lg" href="mailto:${EMAIL}">${esc(s.contact.mail)} <span class="arr">→</span></a></div>
      <nav class="fdesk__secs" aria-label="${esc(s.footer.secs)}">${s.nav.map(([h, t]) => `<a href="${h}">${esc(t)}</a>`).join("")}</nav>
    </div>`;
  const card = `<div class="fdesk fcard frame">
      <div class="fcard__top"><div>${esc(c.h1)}<small>${esc(c.h2)}</small></div><span class="fcard__badge">${esc(c.badge)}</span></div>
      <div class="fcard__grid">
        <div class="fcard__photo"><img src="img/david-portrait.webp" width="640" height="640" alt="${esc(s.footer.photo)}" loading="lazy" decoding="async"></div>
        <div class="fcard__cells">${[c.cells[0], ...c.cells.slice(2), c.cells[1]].map(([k, v]) => `<div><span>${esc(k)}</span><b>${esc(v)}</b></div>`).join("")}</div>
      </div>
      <div class="fcard__list">${esc(c.list)}</div>
      <ul class="fcard__rows">${c.rows.map(([b, , v]) => `<li><b>${esc(b)}</b><em>${v}</em></li>`).join("")}</ul>
    </div>`;
  return { left, card };
}

// Footer "Horizon" (22.11.2026, proposal A of pistes/footers.html): links above,
// then the engraving of Geneva whose white sky melts into the page
function footerHTML(s, card) {
  const f = s.footer, fc = footCardHTML(s, card);
  return `<footer class="site-foot site-foot--card" id="contact">
    <div class="site-foot__top"><div class="wrap">
      <div class="site-foot__intro"><p class="kicker">${esc(f.kicker)}</p><h2 class="site-foot__title">${f.title}</h2>${fc.left}</div>
      ${fc.card}
    </div></div>
    <div class="site-foot__pic">
      <img id="foot-img" src="img/geneve-footer-bleu.webp" width="2400" height="1357" alt="${esc(f.alt)}" loading="lazy" decoding="async">
      <canvas id="foot-gl" aria-hidden="true"></canvas>
      <div class="site-foot__bar"><div class="wrap">
        <span>${esc(s.foot[0])}</span><span class="site-foot__coord">46°12′ N · 6°09′ E</span><a href="#top">${esc(s.foot[1])}</a>
      </div></div>
    </div>
  </footer>`;
}

// The engraving rises a little slower than the page (soft parallax)
function setupFootParallax() {
  if (reduce || setupFootParallax.on) return;
  setupFootParallax.on = true;
  let queued = false;
  const tick = () => {
    queued = false;
    const img = $("#foot-img"); if (!img) return;
    const r = img.closest(".site-foot__pic").getBoundingClientRect(), vh = innerHeight;
    if (r.top > vh || r.bottom < 0) return;
    const p = Math.min(1, Math.max(0, (vh - r.top) / (vh + r.height)));
    img.style.transform = `translateY(${((1 - p) * 12).toFixed(2)}%)`;
    const gl = $("#foot-gl"); if (gl) gl.style.transform = img.style.transform; // animated layer follows the image
  };
  const ask = () => { if (!queued) { queued = true; requestAnimationFrame(tick); } };
  addEventListener("scroll", ask, { passive: true });
  addEventListener("resize", ask);
  ask();
}

// ---------- Hero intro: typewriter, first sentence in ink, the rest in grey ----------
const LEAD_MS = 14;
// Key phrases of the intro in blue (22.11.2026)
const LEAD_BLUE = { fr: ["communication digitale", "gestion de sites web", "production de contenus multimédias", "coordination de projets numériques",
  "plus de 20 ans d’activité", "environnements académiques", "institutionnels", "touristiques", "culturels"],
  en: ["digital communication", "website management", "multimedia content production", "digital project coordination",
  "more than 20 years", "academic", "institutional", "tourism", "cultural"] };
function typeLead(el, text) {
  clearInterval(typeLead.timer); clearTimeout(typeLead.done);
  const cut = text.indexOf(". ") + 1;
  const blue = new Set();
  (LEAD_BLUE[document.documentElement.lang] || []).forEach((w) => { const at = text.indexOf(w); if (at >= 0) for (let k = at; k < at + w.length; k++) blue.add(k); });
  const part = (str, cls, off) => `<span class="${cls}">${[...str].map((ch, k) => `<span class="tc${blue.has(off + k) ? " hl" : ""}">${esc(ch)}</span>`).join("")}</span>`;
  el.innerHTML = part(text.slice(0, cut), "ink", 0) + part(text.slice(cut), "mute", cut);
  el.setAttribute("aria-label", text);
  const all = [...el.querySelectorAll(".tc")];
  if (reduce) { all.forEach((c) => c.classList.add("on")); return; }
  const cursor = document.createElement("span");
  cursor.className = "cursor"; cursor.setAttribute("aria-hidden", "true");
  el.firstChild.prepend(cursor);
  let i = 0;
  typeLead.timer = setInterval(() => {
    const c = all[i];
    c.classList.add("on"); c.after(cursor);
    if (++i >= all.length) { clearInterval(typeLead.timer); typeLead.done = setTimeout(() => cursor.classList.add("off"), 2600); }
  }, LEAD_MS);
}

// ---------- Domains explorer: the accordion drives the isometric scene on the right; auto-advance until the visitor clicks ----------
const AUTO_MS = 8000;
function setupExplorer() {
  const box = $("#explorer"), stage = $("#stage");
  const items = [...box.querySelectorAll(".acc__item")];
  let cur = 0, timer = null, visible = false, first = true;
  box.style.setProperty("--auto", AUTO_MS + "ms");
  if (!reduce) box.classList.add("auto");

  const fill = () => {
    stage.innerHTML = `<div class="scene">${window.isoScene ? window.isoScene(cur) : ""}</div>`;
    const sc = stage.querySelector(".scene");
    if (sc) requestAnimationFrame(() => requestAnimationFrame(() => sc.classList.add("on")));
  };
  const swap = () => {
    if (first || reduce) { first = false; fill(); return; }
    stage.classList.add("swap");
    clearTimeout(swap.t);
    swap.t = setTimeout(() => { fill(); stage.classList.remove("swap"); }, 220);
  };
  const schedule = () => {
    clearTimeout(timer);
    if (box.classList.contains("auto") && visible) timer = setTimeout(() => show((cur + 1) % items.length), AUTO_MS);
  };
  const show = (i) => {
    cur = i;
    items.forEach((it, k) => {
      const on = k === i;
      it.classList.toggle("open", on);
      it.querySelector(".acc__btn").setAttribute("aria-expanded", on);
      // restart the progress line
      const bar = it.querySelector(".acc__bar"); bar.style.animation = "none"; void bar.offsetWidth; bar.style.animation = "";
    });
    swap();
    schedule();
  };
  items.forEach((it, k) => it.querySelector(".acc__btn").addEventListener("click", () => {
    box.classList.remove("auto"); clearTimeout(timer);
    show(k);
  }));

  setupExplorer.io?.disconnect();
  setupExplorer.io = new IntersectionObserver(([e]) => {
    visible = e.isIntersecting;
    if (visible) show(cur); else clearTimeout(timer);
  }, { threshold: 0.35 });
  setupExplorer.io.observe(box);
  setupExplorer.stop = () => { clearTimeout(timer); setupExplorer.io.disconnect(); };
  fill(); first = false;
}

// ---------- Reveal on scroll ----------
const io = new IntersectionObserver((entries) => {
  entries.forEach((e) => { if (e.isIntersecting) { e.target.classList.add("in"); io.unobserve(e.target); } });
}, { threshold: 0.12, rootMargin: "0px 0px -40px 0px" });

// ---------- Render ----------
function render(lang) {
  const s = S[lang], d = DATA[lang];
  document.documentElement.lang = lang;
  document.title = d.ui.title;
  $("#nav-links").innerHTML = s.nav.map(([h, t]) => `<a href="${h}">${esc(t)}</a>`).join("")
    + `<a href="#contact" class="nav__contact">${esc(s.navContact)}</a>`; // replaces the CTA button from 961 px (22.11.2026)
  $("#nav-cta").innerHTML = `${esc(s.cta)} <span class="arr">→</span>`;
  $("#lang").textContent = s.lang;
  setupExplorer.stop?.();
  $("#top").innerHTML = heroHTML(s) + domainsHTML(s) + pathHTML(s, d) + skillsHTML(s, d, lang) + eduHTML(s, d) + contactHTML(s);
  typeLead($("#lead"), d.ui["hero.lead"]);
  setupExplorer();
  setupCareer();
  setupCats();
  setupFootParallax();
  // Animated engraving (foot-anime.js) over the still image, every language and screen
  setupFootParallax.stopAnim?.(); setupFootParallax.stopAnim = null;
  if (window.footAnime && $("#foot-gl"))
    setupFootParallax.stopAnim = window.footAnime($("#foot-img"), $("#foot-gl"), $(".site-foot__pic"));
  document.querySelectorAll(".reveal").forEach((el) => (reduce ? el.classList.add("in") : io.observe(el)));
}

// Language: ?lang=, then saved choice, then browser language
function initialLang() {
  const q = new URLSearchParams(location.search).get("lang");
  if (q === "fr" || q === "en") return q;
  try { const v = localStorage.getItem("cv-lang"); if (v === "fr" || v === "en") return v; } catch (e) {}
  return navigator.language && navigator.language.startsWith("fr") ? "fr" : "en";
}
let lang = initialLang();
render(lang);
$("#lang").addEventListener("click", () => {
  lang = lang === "fr" ? "en" : "fr";
  try { localStorage.setItem("cv-lang", lang); } catch (e) {}
  render(lang);
});
