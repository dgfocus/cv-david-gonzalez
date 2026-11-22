// Content, in both languages
const DATA = {
  fr: {
    ui: {
      "nav.skills": "Compétences", "nav.path": "Parcours", "nav.edu": "Formation", "nav.cta": "Me contacter",
      "hero.title": "Des sites utiles,<br>des messages qui portent.",
      "hero.lead": "Spécialiste en communication digitale, je possède une solide expérience dans la gestion de sites web, la production de contenus multimédias et la coordination de projets numériques. Cette expertise s’est construite au cours de plus de 20 ans d’activité dans des environnements académiques, institutionnels, touristiques et culturels à Genève.",
      "band.eyebrow": "Communication digitale · Sites web · Multimédia",
      "band.quote": "20 ans d'expérience entre université, culture et tourisme à Genève.",
      "stats.years": "ans d'expérience", "stats.cms": "CMS maîtrisés", "stats.langs": "langues", "stats.city": "basé à Genève",
      "skills.eyebrow": "Compétences clés", "skills.title": "Savoir-faire et outils du quotidien.",
      "path.eyebrow": "Expériences professionnelles", "path.title": "Des institutions qui m'ont fait confiance.",
      "edu.eyebrow": "Formations", "edu.title": "Formations et certifications.",
      "lang.eyebrow": "Langues", "lang.title": "Trois langues de travail.",
      "contact.title": "Un projet web, une équipe à renforcer ?<br>Parlons-en.",
      "contact.meta": "Genève · Nationalité espagnole · Permis C (Suisse)",
      "contact.top": "Haut de page ↑",
      now: "En poste", title: "David Gonzalez · Communication digitale", photo: "Portrait de David Gonzalez"
    },
    skills: [
      { t: "Production de contenus", items: [
        ["Content management (CMS)", ["Concrete5", "Drupal", "Typo3", "WordPress"]],
        ["Rédaction web et éditoriale", ["ChatGPT", "Claude", "Gemini", "Perplexity", "NotebookLM", "Google AI Studio"]],
        ["Production graphique et vidéo", ["Photoshop", "Illustrator", "InDesign", "Premiere Pro", "After Effects", "DaVinci Resolve", "CapCut", "Canva", "Midjourney"]]
      ]},
      { t: "Communication digitale", items: [
        ["Stratégie de communication digitale", ["Google Analytics", "Google Ads"]],
        ["Marketing digital B2B / B2C", ["Facebook", "LinkedIn", "X", "Instagram", "YouTube"]],
        ["Newsletters et campagnes d'information", ["Outlook", "Outils CMS"]]
      ]},
      { t: "Gestion de projets web", items: [
        ["Coordination de projets digitaux", ["Word", "Excel", "PowerPoint", "Outlook"]],
        ["Gestion de prestataires et suivi budgétaire", []],
        ["Déploiement et maintenance de sites web", ["HTML5", "CSS3", "JavaScript (notions)", "FTP"]]
      ]},
      { t: "Communication institutionnelle", items: [
        ["Interface entre services, équipes et publics variés", []],
        ["Rédaction de communications officielles et internes", []],
        ["Gestion d'informations confidentielles et sensibles", []]
      ]}
    ],
    jobs: [
      { d: "02.2018 — aujourd'hui", now: true, r: "Concepteur en communication web · 40 %", o: "Faculté de théologie, Université de Genève", p: [
        "Conception, développement et gestion des sites de la Faculté et de ses entités associées (Collège de théologie, instituts de recherche, projets spécifiques)",
        "Gestion, mise à jour et animation éditoriale des contenus web",
        "Rédaction web et retouche d'images",
        "Communication, promotion et information en ligne de la Faculté, pour sa visibilité numérique",
        "Création et gestion de contenus pour les réseaux sociaux (Facebook, LinkedIn, YouTube)",
        "Conception et suivi de campagnes de publicité en ligne",
        "Gestion de la newsletter électronique",
        "Création de formulaires d'inscription et d'enquête en ligne (LimeSurvey)",
        "Montage vidéo de conférences",
        "Conseil, assistance et formation des collaborateurs aux outils numériques"] },
      { d: "05.2018 — 04.2026", r: "Concepteur en communication web · 50 %", o: "Global Studies Institute (GSI), Université de Genève", p: [
        "Architecture des sites, conception graphique et infographie",
        "Publication des contenus, programmation et gestion des bases de données",
        "Sécurité et maintenance des sites",
        "Création de sites pour des centres de recherche (Centre Dusan Sidjanski, Geneva Africa Lab)",
        "Promotion des programmes d'études et gestion des comptes Facebook et Twitter de l'institut",
        "Conception d'affiches pour des conférences et tables rondes (Photoshop, Illustrator, InDesign)",
        "Conception et animation de formations aux outils numériques (BeeFree, Concrete5), adaptées au personnel académique et administratif",
        "Coordination avec la Division STIC, le service NTICE et le webmaster central de l'UNIGE",
        "Coordination avec les services de communication et les prestataires externes"] },
      { d: "11.2015 — 04.2018", r: "Commis administratif", o: "Global Studies Institute (GSI), Université de Genève", p: [
        "Rédaction de courriers officiels (attestations, avis d'absence, dérogations) avec les conseillères aux études",
        "Préparation des examens de Bachelor et de Master",
        "Gestion administrative des candidatures aux Masters : réception des dossiers et correspondance",
        "Accueil des étudiants et permanences téléphoniques",
        "Mise à jour des archives étudiantes, classement des documents et des courriers",
        "Utilisation des logiciels de gestion de l'UNIGE et participation au programme ECTS",
        "Création de tutoriels sur les procédures et les logiciels internes, de ma propre initiative",
        "Traitement discret et méthodique des données des étudiants"] },
      { d: "09.2014 — 02.2015", r: "Assistant communication / webmaster-designer", o: "Théâtre de Carouge", p: [
        "Veille et mise à jour du site internet",
        "Animation et optimisation des réseaux sociaux",
        "Analyse statistique de la fréquentation du site",
        "Mise à jour des agendas culturels en ligne",
        "Production de contenus multimédias",
        "Revue de presse (web et print)",
        "Recherches pour préparer les documents de communication",
        "Gestion autonome de dossiers multiples et variés"] },
      { d: "01.2013 — 12.2013", r: "Assistant de production", o: "Haute École de Gestion (HEG), Laboratoire des Technologies de l'Information", p: [
        "Permanence de la rédaction technique du site de l'État de Genève (ge.ch), avec la Chancellerie d'État",
        "Validation des contenus selon la charte éditoriale de ge.ch",
        "Production et intégration de contenus web pour l'État de Genève et la HES-SO",
        "Création, saisie et mise à jour de sites statiques (HTML, PHP, ASP)",
        "Travail sur les CMS WordPress, TYPO3 et Drupal",
        "Conception graphique de maquettes et création de logos",
        "Relations avec la Chancellerie d'État et les clients du laboratoire",
        "Respect du secret de fonction"] },
      { d: "11.2005 — 07.2012", r: "Webmaster - design", o: "Genève Tourisme & Congrès", p: [
        "Animation, gestion et développement du site de Genève Tourisme & Congrès",
        "Gestion de projet pour le nouveau site de Genève Tourisme & Congrès",
        "Gestion des sites de promotion de la destination, dont celui des Fêtes de Genève",
        "Conception des interfaces web et des outils e-marketing, avec des maquettes adaptées aux différents terminaux",
        "Gestion des contenus, de l'arborescence et de l'architecture interactionnelle, avec une attention à l'ergonomie et à l'accessibilité",
        "Création et développement des newsletters « Coups de cœur » et « Marketing »",
        "Création de bannières publicitaires pour le site et pour des sites partenaires",
        "Participation à des campagnes de communication pour promouvoir la destination Genève",
        "Gestion budgétaire de l'ensemble des projets suivis",
        "Mise en place d'un processus d'acheminement et de validation des contenus entre les départements"] },
      { d: "01.2004 — 10.2005", r: "Assistant de production", o: "Haute École de Gestion (HEG), Laboratoire des Technologies de l'Information", p: [
        "Mise en production des pages de la communication web officielle de l'État de Genève",
        "Mises à jour avec Dreamweaver et Photoshop",
        "Contrôle de la qualité technique du site",
        "Transfert des fichiers entre serveurs (FTP)",
        "Participation au développement de sites web pour des clients du laboratoire",
        "Conception graphique de maquettes et création de logos",
        "Réception et traitement des demandes de mise à jour, par e-mail et par téléphone",
        "Excellentes relations avec les clients du laboratoire"] },
      { d: "03.1998 — 07.2001", r: "Collaborateur technique - Services généraux", o: "Richemont Int. SA · Cartier Int. SA · Berkeley Int. SA", p: [
        "Gestion du fonctionnement de trois immeubles au boulevard James-Fazy",
        "Coordination d'importants travaux de rénovation, en lien avec l'architecte",
        "Appels d'offres, suivi budgétaire et suivi du chantier",
        "Suivi et maintenance des contrats avec les prestataires externes",
        "Organisation et supervision des déménagements",
        "Gestion des commandes de mobilier",
        "Contrôle de la sécurité des immeubles du groupe",
        "Gestion des situations de stress, avec un devoir de discrétion"] }
    ],
    edu: [
      ["2026", "Certificat de module Adobe Premiere · Montage vidéo", "École Cadschool"],
      ["2013 — 2014", "Certificat de postproduction", "École Cadschool · Adobe After Effects CC et Adobe Premiere CC"],
      ["2002", "Diplôme de webdesigner & diplôme de webmaster", "École Nomades"],
      ["1994", "Baccalauréat A2 en philosophie et lettres", "Académie de Grenoble"],
      ["1993", "Diplôme de l'École supérieure de commerce", "École de commerce de Malagnou"]
    ],
    langs: [
      ["Français", 5, "Langue maternelle"],
      ["Espagnol", 5, "Langue maternelle, baccalauréat"],
      ["Anglais", 3, "Bonnes connaissances, parlé et écrit · B2"]
    ]
  },
  en: {
    ui: {
      "nav.skills": "Skills", "nav.path": "Experience", "nav.edu": "Education", "nav.cta": "Get in touch",
      "hero.title": "Useful websites,<br>messages that land.",
      "hero.lead": "A digital communication specialist, I have solid experience in website management, multimedia content production and digital project coordination. This expertise was built over more than 20 years in academic, institutional, tourism and cultural settings in Geneva.",
      "band.eyebrow": "Digital communication · Websites · Multimedia",
      "band.quote": "20 years of experience across academia, culture and tourism in Geneva.",
      "stats.years": "years of experience", "stats.cms": "CMS mastered", "stats.langs": "languages", "stats.city": "based in Geneva",
      "skills.eyebrow": "Key skills", "skills.title": "Know-how and everyday tools.",
      "path.eyebrow": "Professional experience", "path.title": "Institutions that have placed their trust in me.",
      "edu.eyebrow": "Education", "edu.title": "Education and certifications.",
      "lang.eyebrow": "Languages", "lang.title": "Three working languages.",
      "contact.title": "A web project, a team to strengthen?<br>Let's talk.",
      "contact.meta": "Geneva · Spanish citizen · Swiss C permit",
      "contact.top": "Back to top ↑",
      now: "Current", title: "David Gonzalez · Digital communication", photo: "Portrait of David Gonzalez"
    },
    skills: [
      { t: "Content production", items: [
        ["Content management (CMS)", ["Concrete5", "Drupal", "Typo3", "WordPress"]],
        ["Web and editorial writing", ["ChatGPT", "Claude", "Gemini", "Perplexity", "NotebookLM", "Google AI Studio"]],
        ["Graphic and video production", ["Photoshop", "Illustrator", "InDesign", "Premiere Pro", "After Effects", "DaVinci Resolve", "CapCut", "Canva", "Midjourney"]]
      ]},
      { t: "Digital communication", items: [
        ["Digital communication strategy", ["Google Analytics", "Google Ads"]],
        ["B2B / B2C digital marketing", ["Facebook", "LinkedIn", "X", "Instagram", "YouTube"]],
        ["Newsletters and information campaigns", ["Outlook", "CMS tools"]]
      ]},
      { t: "Web project management", items: [
        ["Digital project coordination", ["Word", "Excel", "PowerPoint", "Outlook"]],
        ["Vendor management and budget tracking", []],
        ["Website deployment and maintenance", ["HTML5", "CSS3", "JavaScript (basics)", "FTP"]]
      ]},
      { t: "Institutional communication", items: [
        ["Liaison between departments, teams and diverse audiences", []],
        ["Writing official and internal communications", []],
        ["Handling confidential and sensitive information", []]
      ]}
    ],
    jobs: [
      { d: "02.2018 — present", now: true, r: "Web communication designer · 40%", o: "Faculty of Theology, University of Geneva", p: [
        "Design, development and management of the websites of the Faculty and its affiliated bodies (Collège de théologie, research institutes, special projects)",
        "Management, updating and editorial curation of web content",
        "Web writing and image editing",
        "Online communication, promotion and information for the Faculty, building its digital visibility",
        "Creation and management of social media content (Facebook, LinkedIn, YouTube)",
        "Design and monitoring of online advertising campaigns",
        "Management of the e-newsletter",
        "Online registration and survey forms (LimeSurvey)",
        "Video editing of conferences",
        "Advice, support and training for colleagues on digital tools"] },
      { d: "05.2018 — 04.2026", r: "Web communication designer · 50%", o: "Global Studies Institute (GSI), University of Geneva", p: [
        "Site architecture, graphic design and computer graphics",
        "Content publishing, programming and database management",
        "Website security and maintenance",
        "Websites for research centres (Centre Dusan Sidjanski, Geneva Africa Lab)",
        "Promotion of study programmes and management of the institute's Facebook and Twitter accounts",
        "Posters for conferences and round tables (Photoshop, Illustrator, InDesign)",
        "Design and delivery of training on digital tools (BeeFree, Concrete5), tailored to academic and administrative staff",
        "Coordination with the University's IT division (STIC), the NTICE service and the central webmaster",
        "Coordination with communication services and external providers"] },
      { d: "11.2015 — 04.2018", r: "Administrative clerk", o: "Global Studies Institute (GSI), University of Geneva", p: [
        "Official letters (certificates, absence notices, exemptions) with the study advisers",
        "Preparation of Bachelor and Master examinations",
        "Administration of Master's applications: receiving files and correspondence",
        "Student front desk and telephone help line",
        "Updating student archives, filing documents and mail",
        "Use of the University's management software and ECTS credit administration",
        "Tutorials on internal procedures and software, on my own initiative",
        "Discreet and methodical handling of student data"] },
      { d: "09.2014 — 02.2015", r: "Communication assistant / webmaster-designer", o: "Théâtre de Carouge", p: [
        "Monitoring and updating the website",
        "Running and optimising social media",
        "Statistical analysis of website traffic",
        "Updating online cultural listings",
        "Multimedia content production",
        "Press review (web and print)",
        "Research for communication documents",
        "Independent handling of many varied files"] },
      { d: "01.2013 — 12.2013", r: "Production assistant", o: "Geneva School of Business Administration (HEG), Information Technology Lab", p: [
        "Technical editing desk for the State of Geneva website (ge.ch), with the State Chancellery",
        "Content validation against the ge.ch editorial charter",
        "Web content production and integration for the State of Geneva and HES-SO",
        "Building, entering and updating static sites (HTML, PHP, ASP)",
        "Work on the WordPress, TYPO3 and Drupal CMS",
        "Mock-up design and logo creation",
        "Relations with the State Chancellery and the lab's clients",
        "Professional secrecy"] },
      { d: "11.2005 — 07.2012", r: "Webmaster - design", o: "Geneva Tourism & Conventions", p: [
        "Running, managing and developing the Geneva Tourism & Conventions website",
        "Project management of the new Geneva Tourism & Conventions website",
        "Management of the destination's promotional sites, including the Geneva Festival",
        "Design of web interfaces and e-marketing tools, with mock-ups for every device",
        "Content, site structure and interaction architecture, with attention to usability and accessibility",
        "Creation and development of the « Coups de cœur » and « Marketing » newsletters",
        "Advertising banners for the site and partner sites",
        "Contribution to campaigns promoting Geneva as a destination",
        "Budget management for every project I followed",
        "Setting up a routing and approval process for content between departments"] },
      { d: "01.2004 — 10.2005", r: "Production assistant", o: "Geneva School of Business Administration (HEG), Information Technology Lab", p: [
        "Publishing the pages of the State of Geneva's official web communication",
        "Updates with Dreamweaver and Photoshop",
        "Technical quality control of the website",
        "File transfers between servers (FTP)",
        "Contribution to website development for the lab's clients",
        "Mock-up design and logo creation",
        "Receiving and handling update requests by e-mail and phone",
        "Excellent relations with the lab's clients"] },
      { d: "03.1998 — 07.2001", r: "Technical staff - General services", o: "Richemont Int. SA · Cartier Int. SA · Berkeley Int. SA", p: [
        "Running three buildings on boulevard James-Fazy",
        "Coordination of major renovation works, with the architect",
        "Tenders, budget tracking and site supervision",
        "Follow-up and maintenance of contracts with external providers",
        "Organisation and supervision of office moves",
        "Furniture ordering",
        "Security checks of the group's buildings",
        "Handling stressful situations, with a duty of discretion"] }
    ],
    edu: [
      ["2026", "Adobe Premiere module certificate · Video editing", "Cadschool"],
      ["2013 — 2014", "Post-production certificate", "Cadschool · Adobe After Effects CC and Adobe Premiere CC"],
      ["2002", "Web designer & webmaster diplomas", "École Nomades"],
      ["1994", "Baccalaureate A2, philosophy and literature", "Académie de Grenoble"],
      ["1993", "Higher School of Commerce diploma", "École de commerce de Malagnou"]
    ],
    langs: [
      ["French", 5, "Native"],
      ["Spanish", 5, "Native, baccalaureate"],
      ["English", 3, "Good command, spoken and written · B2"]
    ]
  }
};

// Isometric line icons, drawn from simple boxes and faces
const ISO = {
  pt: (x, y, z) => [(x - y) * 0.866, (x + y) * 0.5 - z],
  face: (pts, cls) => ({ pts, cls }),
  box(x, y, z, w, d, h, o = {}) {
    return [
      ISO.face([[x, y, z + h], [x + w, y, z + h], [x + w, y + d, z + h], [x, y + d, z + h]], o.top || "f-top"),
      ISO.face([[x + w, y, z], [x + w, y + d, z], [x + w, y + d, z + h], [x + w, y, z + h]], o.right || "f-hatch"),
      ISO.face([[x, y + d, z], [x + w, y + d, z], [x + w, y + d, z + h], [x, y + d, z + h]], o.left || "f-white")
    ];
  },
  line: (a, b) => ({ pts: [a, b], cls: "f-line" }),
  svg(shapes) {
    const all = shapes.flatMap((s) => s.pts.map((p) => ISO.pt(...p)));
    const xs = all.map((p) => p[0]), ys = all.map((p) => p[1]);
    const minX = Math.min(...xs) - 3, minY = Math.min(...ys) - 3;
    const w = Math.max(...xs) - minX + 3, h = Math.max(...ys) - minY + 3;
    const body = shapes.map((s, i) => {
      const pts = s.pts.map((p) => ISO.pt(...p).map((n) => n.toFixed(1)).join(",")).join(" ");
      const tag = s.cls === "f-line" ? "polyline" : "polygon";
      return `<${tag} class="ic ${s.cls}" points="${pts}" pathLength="1" style="--k:${i}"/>`;
    }).join("");
    return `<svg viewBox="${minX.toFixed(1)} ${minY.toFixed(1)} ${w.toFixed(1)} ${h.toFixed(1)}" aria-hidden="true">${body}</svg>`;
  }
};

const ICONS = [
  // Content production: a stack of sheets with text and a play button
  (() => {
    const s = [...ISO.box(0, 0, 0, 60, 44, 4), ...ISO.box(4, -4, 6, 60, 44, 4), ...ISO.box(8, -8, 12, 60, 44, 4, { top: "f-white" })];
    [0, 7, 14, 21].forEach((y) => s.push(ISO.line([14, y, 16], [34, y, 16])));
    s.push(ISO.face([[42, 2, 16], [42, 22, 16], [58, 12, 16]], "f-blue"));
    return ISO.svg(s);
  })(),
  // Digital communication: a tablet with two speech bubbles
  (() => {
    const s = [...ISO.box(0, 0, 0, 64, 46, 5, { top: "f-white" })];
    s.push(ISO.face([[5, 5, 5], [59, 5, 5], [59, 41, 5], [5, 41, 5]], "f-top"));
    s.push(...ISO.box(40, 0, 24, 20, 3, 14, { left: "f-white", top: "f-top" }));
    s.push(ISO.line([45, 3, 31], [55, 3, 31]));
    s.push(...ISO.box(12, 20, 14, 34, 4, 24, { left: "f-white" }));
    s.push(ISO.face([[16, 24, 14], [24, 24, 14], [16, 24, 7]], "f-white"));
    [32, 26, 20].forEach((z, i) => s.push(ISO.line([17, 24, z], [41 - i * 6, 24, z])));
    return ISO.svg(s);
  })(),
  // Web project management: a board of bars, like a planning chart
  (() => {
    const s = [...ISO.box(0, 0, 0, 66, 48, 4)];
    const bars = [];
    [[10, 22], [16, 32], [8, 18]].forEach((hs, i) => hs.forEach((h, j) => bars.push({ x: 6 + i * 20, y: 6 + j * 20, h, blue: i === 1 && j === 1 })));
    bars.sort((a, b) => a.x + a.y - (b.x + b.y)).forEach((b) => s.push(...ISO.box(b.x, b.y, 4, 12, 12, b.h, { top: b.blue ? "f-blue" : "f-top" })));
    return ISO.svg(s);
  })(),
  // Institutional communication: a building with columns and a pediment
  (() => {
    const s = [...ISO.box(0, 0, 0, 64, 44, 4), ...ISO.box(4, 4, 4, 56, 36, 3, { top: "f-top" })];
    const cols = [[50, 8], [50, 20], [8, 32], [20, 32], [32, 32], [44, 32]];
    cols.sort((a, b) => a[0] + a[1] - (b[0] + b[1])).forEach(([x, y]) => s.push(...ISO.box(x, y, 7, 6, 6, 22, { top: "f-top" })));
    s.push(...ISO.box(2, 2, 29, 60, 40, 4, { top: "f-top" }));
    s.push(ISO.face([[2, 2, 33], [2, 42, 33], [32, 42, 46], [32, 2, 46]], "f-top"));
    s.push(ISO.face([[32, 2, 46], [32, 42, 46], [62, 42, 33], [62, 2, 33]], "f-white"));
    s.push(ISO.face([[2, 42, 33], [62, 42, 33], [32, 42, 46]], "f-hatch"));
    return ISO.svg(s);
  })()
];
