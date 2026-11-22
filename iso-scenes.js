// Isometric scenes for the French "Domaines d'expertise" cards (section 01).
// Inline SVG drawn by code, after David's reference board (thin lines, white faces, pale grid, blue accent).
// Prototype: pistes/iso-domaines.html. Exposes window.isoScene(i) for i = 0..3.
(() => {
  // Lucide icons (lucide.dev, ISC licence)
  const ICON = {
    building: '<path d="M6 22V4a2 2 0 0 1 2-2h8a2 2 0 0 1 2 2v18Z"/><path d="M6 12H4a2 2 0 0 0-2 2v6a2 2 0 0 0 2 2h2"/><path d="M18 9h2a2 2 0 0 1 2 2v9a2 2 0 0 1-2 2h-2"/><path d="M10 6h4"/><path d="M10 10h4"/><path d="M10 14h4"/><path d="M10 18h4"/>',
    users: '<path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M22 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/>',
    globe: '<circle cx="12" cy="12" r="10"/><path d="M12 2a14.5 14.5 0 0 0 0 20 14.5 14.5 0 0 0 0-20"/><path d="M2 12h20"/>',
    lock: '<rect width="18" height="11" x="3" y="11" rx="2" ry="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/>',
    mail: '<rect width="20" height="16" x="2" y="4" rx="2"/><path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"/>',
    share: '<circle cx="18" cy="5" r="3"/><circle cx="6" cy="12" r="3"/><circle cx="18" cy="19" r="3"/><line x1="8.59" x2="15.42" y1="13.51" y2="17.49"/><line x1="15.41" x2="8.59" y1="6.51" y2="10.49"/>',
    target: '<circle cx="12" cy="12" r="10"/><circle cx="12" cy="12" r="6"/><circle cx="12" cy="12" r="2"/>',
    megaphone: '<path d="m3 11 18-5v12L3 14v-3z"/><path d="M11.6 16.8a3 3 0 1 1-5.8-1.6"/>',
    wallet: '<path d="M19 7V4a1 1 0 0 0-1-1H5a2 2 0 0 0 0 4h15a1 1 0 0 1 1 1v4h-3a2 2 0 0 0 0 4h3a1 1 0 0 0 1-1v-2a1 1 0 0 0-1-1"/><path d="M3 5v14a2 2 0 0 0 2 2h15a1 1 0 0 0 1-1v-4"/>',
    wrench: '<path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z"/>'
  };

  // ---------- Isometric drawing kit ----------
  // World axes: x goes down-right, y goes down-left, z goes up. Pieces are drawn back to front.
  function makeKit(uid) {
    const C = 0.866, out = [], B = { x0: 1e9, y0: 1e9, x1: -1e9, y1: -1e9 };
    let track = true, gi = 0, pulses = 0;
    const grow = (x, y) => { B.x0 = Math.min(B.x0, x); B.x1 = Math.max(B.x1, x); B.y0 = Math.min(B.y0, y); B.y1 = Math.max(B.y1, y); };
    const P = (x, y, z = 0) => { const p = [(x - y) * C, (x + y) / 2 - z]; if (track) grow(...p); return p; };
    const f = (n) => n.toFixed(1);
    const pts = (a) => a.map((p) => P(...p).map(f).join(",")).join(" ");
    const k = {
      out, P, f,
      poly: (a, cls) => out.push(`<polygon class="${cls}" points="${pts(a)}"/>`),
      pl: (a, cls, extra = "") => out.push(`<polyline class="${cls}" points="${pts(a)}" ${extra}/>`),
      box(x, y, z, w, d, h, o = {}) {
        k.poly([[x, y, z + h], [x + w, y, z + h], [x + w, y + d, z + h], [x, y + d, z + h]], o.top || "t");
        k.poly([[x + w, y, z], [x + w, y + d, z], [x + w, y + d, z + h], [x + w, y, z + h]], o.right || "r");
        k.poly([[x, y + d, z], [x + w, y + d, z], [x + w, y + d, z + h], [x, y + d, z + h]], o.left || "l");
      },
      // One piece of the build-up animation
      G(fn, cls = "") { out.push(`<g class="pc" style="--i:${gi++}"><g class="${cls}">`); fn(gi - 1); out.push("</g></g>"); },
      // Flat content planes: top face with text rising to the right, top face along x/y, and the front-left face
      onTop: (x, y, z) => { const [a, b] = P(x, y, z); return `matrix(${C},-0.5,${C},0.5,${f(a)},${f(b)})`; },
      onTopXY: (x, y, z) => { const [a, b] = P(x, y, z); return `matrix(${C},0.5,${-C},0.5,${f(a)},${f(b)})`; },
      onLeft: (x, y, z) => { const [a, b] = P(x, y, z); return `matrix(${C},0.5,0,1,${f(a)},${f(b)})`; },
      winR: (X, y, z, w, h) => k.poly([[X, y, z], [X, y + w, z], [X, y + w, z + h], [X, y, z + h]], "win"),
      winL: (x, Y, z, w, h, cls = "win") => k.poly([[x, Y, z], [x + w, Y, z], [x + w, Y, z + h], [x, Y, z + h]], cls),
      sq: (x, y, z, s, cls = "acc") => k.poly([[x - s, y - s, z], [x + s, y - s, z], [x + s, y + s, z], [x - s, y + s, z]], cls),
      wire(a) { k.pl(a, "iwire"); k.pl(a, "pulse", `pathLength="1" style="--pd:${(pulses++ * 0.9).toFixed(1)}s"`); },
      tree(x, y, z = 5) {
        const [sx, sy] = P(x, y, z);
        out.push(`<ellipse class="shadow" cx="${f(sx + 2)}" cy="${f(sy)}" rx="8" ry="4"/>`);
        k.pl([[x, y, z], [x, y, z + 9]], "trunk");
        const [cx, cy] = P(x, y, z + 16);
        out.push(`<circle class="crown" cx="${f(cx)}" cy="${f(cy)}" r="7"/><path class="crown2" d="M${f(cx - 4)} ${f(cy + 1)} a5 5 0 0 0 7 3.5"/>`);
      },
      // Flat tile with an icon and a label on its top face
      tile(x, y, z, w, d, h, icon, label) {
        k.box(x, y, z, w, d, h);
        out.push(`<g transform="${k.onTop(x + 4, y + d - 4, z + h)}"><g class="ico" transform="translate(0,1) scale(.38)">${ICON[icon]}</g><text class="lbl" x="13" y="7.6">${label}</text></g>`);
      },
      // Standing panel facing front-left, with flat content drawn in local units (u to the right, v downwards)
      panel(x, y, z, w, h, content) {
        if (z > 0) k.poly([[x, y - 4, 0], [x + w, y - 4, 0], [x + w, y, 0], [x, y, 0]], "shadow");
        k.box(x, y - 4, z, w, 4, h);
        out.push(`<g transform="${k.onLeft(x, y, z + h)}">${content}</g>`);
      },
      // Flat, screen-facing label pill (right edge at sx), with a dotted leader to (tx, sy)
      pill(sx, sy, tx, text, step) {
        const w = text.length * 3.75 + 14;
        grow(sx - w, sy - 7); grow(tx, sy + 7);
        out.push(`<line class="lead" x1="${f(sx)}" y1="${f(sy)}" x2="${f(tx - 2)}" y2="${f(sy)}"/>
          <rect class="accf" x="${f(tx - 9)}" y="${f(sy - 1.6)}" width="3.2" height="3.2"/>
          <g class="ipill${step != null ? ` ipill--cycle" style="--hl:${step}` : ""}"><rect x="${f(sx - w)}" y="${f(sy - 6.5)}" width="${f(w)}" height="13" rx="6.5"/>
          <text x="${f(sx - w / 2)}" y="${f(sy + 2.1)}" text-anchor="middle">${text.toUpperCase()}</text></g>`);
      },
      // Wrap up: pale isometric grid behind, faded at the edges
      finish(label) {
        track = false;
        const pad = 14, vb = [B.x0 - pad, B.y0 - pad, B.x1 - B.x0 + pad * 2, B.y1 - B.y0 + pad * 2];
        const grid = [];
        for (let x = -240; x <= 300; x += 12) grid.push(`<polyline class="grid" points="${pts([[x, -240, 0], [x, 300, 0]])}"/>`);
        for (let y = -240; y <= 300; y += 12) grid.push(`<polyline class="grid" points="${pts([[-240, y, 0], [300, y, 0]])}"/>`);
        return `<svg class="iso" viewBox="${vb.map(f).join(" ")}" preserveAspectRatio="xMidYMid meet" role="img" aria-label="${label}">
          <defs><radialGradient id="fade${uid}"><stop offset=".4" stop-color="#fff"/><stop offset="1" stop-color="#000"/></radialGradient>
          <mask id="m${uid}"><rect x="${f(vb[0])}" y="${f(vb[1])}" width="${f(vb[2])}" height="${f(vb[3])}" fill="url(#fade${uid})"/></mask></defs>
          <g mask="url(#m${uid})">${grid.join("")}</g>${out.join("")}</svg>`;
      }
    };
    return k;
  }

  // Small reusable panel header: three dots and a title
  const head = (w, title) => `<line x1="0" y1="8" x2="${w}" y2="8" stroke="#3a3a3a" stroke-width=".8"/>
    <circle cx="4.5" cy="4" r="1.2" fill="#cfcfcf"/><circle cx="8.5" cy="4" r="1.2" fill="#cfcfcf"/><circle cx="12.5" cy="4" r="1.2" fill="#cfcfcf"/>
    ${title ? `<text x="17" y="5.7" font-size="4.4" font-weight="600">${title}</text>` : ""}`;

  // ---------- 01 Contenus: three content layers stacked, plus a video panel ----------
  function sceneContenus(k) {
    const S = 64, Z = [0, 26, 52];
    const plates = [
      // CMS: a page layout
      `<rect class="pf" x="5" y="5" width="54" height="7" rx="1"/><rect class="pb" x="5" y="16" width="25" height="22" rx="1"/>
       <rect class="pf" x="34" y="16" width="25" height="9" rx="1"/><rect class="pf" x="34" y="29" width="25" height="9" rx="1"/>
       <rect class="bar" x="5" y="43" width="54" height="2" rx="1"/><rect class="bar" x="5" y="48" width="44" height="2" rx="1"/>
       <rect class="accf" x="5" y="54" width="15" height="5" rx="1"/>`,
      // Rédaction web: type and lines, with a blinking caret
      `<text x="6" y="24" font-size="17" font-weight="600">Aa</text>
       <rect class="bar" x="6" y="32" width="52" height="2" rx="1"/><rect class="bar" x="6" y="37" width="46" height="2" rx="1"/>
       <rect class="bar" x="6" y="42" width="50" height="2" rx="1"/><rect class="bar" x="6" y="47" width="30" height="2" rx="1"/>
       <rect class="accf caret" x="38" y="45.5" width="1.4" height="5"/>`,
      // Graphisme: a picture with mountains and a blue sun
      `<rect class="pf" x="6" y="6" width="52" height="52" rx="2"/>
       <polygon class="mtn" points="10,52 25,31 34,42 43,33 55,52"/><circle class="accf" cx="44" cy="19" r="6"/>`
    ];
    const labels = ["CMS", "Rédaction web", "Graphisme"];
    Z.forEach((z, i) => k.G(() => {
      const [cx, cy] = k.P(0, S, z + 1.5);
      k.pill(cx - 30, cy, cx, labels[i], 2 - i); // lit in turn, top to bottom: Graphisme, Rédaction web, CMS
      if (i > 0) [[0, 0], [S, 0], [S, S], [0, S]].forEach(([x, y]) => k.pl([[x, y, Z[i - 1] + 3], [x, y, z]], "drop"));
      k.box(0, 0, z, S, S, 3);
      k.out.push(`<g transform="${k.onTopXY(0, 0, z + 3)}">${plates[i]}</g>`);
    }));
    // Ghost layer above: room for what comes next
    k.G(() => {
      [[0, 0], [S, 0], [S, S], [0, S]].forEach(([x, y]) => k.pl([[x, y, 55], [x, y, 76]], "drop"));
      k.poly([[0, 0, 76], [S, 0, 76], [S, S, 76], [0, S, 76]], "ghostp");
    }, "float");
    // Video panel, wired to the bottom layer
    k.G(() => {
      k.wire([[64, 34, 0], [84, 34, 0], [84, 20, 0], [116, 20, 0]]);
      k.sq(67, 34, 0, 1.6);
      k.pl([[116, 20, 0], [116, 20, 10]], "drop");
      k.panel(92, 20, 10, 56, 44, `${head(56, "Vidéo")}
        <rect class="pb" x="5" y="12" width="46" height="21" rx="1.5"/>
        <circle class="whitef" cx="28" cy="22.5" r="6.5" stroke="#a0a0a0" stroke-width=".6"/>
        <polygon class="accf" points="26,19 26,26 32,22.5"/>
        <rect class="bar" x="5" y="37.5" width="46" height="1.8" rx=".9"/>
        <rect class="accf prog" x="5" y="37.5" width="46" height="1.8" rx=".9"/>`);
    });
    return k.finish("Trois couches de contenu empilées : mise en page CMS, rédaction web et graphisme, reliées à un panneau vidéo");
  }

  // ---------- 02 Communication digitale: a hub wired to channels and to analytics ----------
  function sceneDigital(k) {
    const tiles = [["mail", "Newsletters"], ["share", "Réseaux sociaux"], ["target", "Campagnes"]];
    tiles.forEach(([ic, lb], i) => k.G(() => {
      const x = 56 + i * 26, cx = x + 9;
      k.tile(x, -110, 0, 18, 70, 5, ic, lb);
      k.wire([[48, 12 + i * 12, 0], [cx, 12 + i * 12, 0], [cx, -40, 0]]);
      k.sq(cx, -37, 0, 1.6);
    }));
    // Hub: three layers, the top one blue with a megaphone
    k.G(() => k.box(0, 0, 0, 48, 48, 5));
    k.G(() => {
      [[6, 6], [42, 6], [42, 42], [6, 42]].forEach(([x, y]) => k.pl([[x, y, 5], [x, y, 13]], "drop"));
      k.box(6, 6, 13, 36, 36, 3);
      k.out.push(`<g transform="${k.onTopXY(6, 6, 16)}">
        <path class="circ" d="M4 10 H12 V4 M32 6 H26 V12 M4 28 H10 V32 M32 30 H27 V24"/>
        <circle class="inode" cx="12" cy="4" r="1.3"/><circle class="inode" cx="26" cy="12" r="1.3"/><circle class="inode" cx="10" cy="32" r="1.3"/><circle class="inode" cx="27" cy="24" r="1.3"/></g>`);
    });
    k.G(() => {
      [[12, 12], [36, 12], [36, 36], [12, 36]].forEach(([x, y]) => k.pl([[x, y, 16], [x, y, 26]], "drop"));
      k.box(12, 12, 26, 24, 24, 7, { top: "acc" });
      k.out.push(`<g transform="${k.onTopXY(12, 12, 33)}"><g class="ico icow" transform="translate(4,4) scale(.66)">${ICON.megaphone}</g></g>`);
    }, "float");
    // Analytics panel in front
    k.G((i) => {
      k.wire([[20, 48, 0], [20, 92, 0]]);
      k.sq(20, 51, 0, 1.6);
      k.pl([[20, 92, 0], [20, 92, 6]], "drop");
      k.panel(-38, 92, 6, 62, 46, `${head(62, "Analytics")}
        <line x1="5" y1="30" x2="57" y2="30" stroke="#e2e2e2" stroke-width=".6"/><line x1="5" y1="21" x2="57" y2="21" stroke="#e2e2e2" stroke-width=".6"/>
        <polyline class="chart" style="--i:${i}" pathLength="1" points="6,29 16,24 26,26 36,18 46,20 56,12"/>
        <circle class="dot" cx="36" cy="18" r="1.3"/><circle class="dot" cx="56" cy="12" r="1.3"/>
        <rect class="bar" x="6" y="38" width="6" height="4"/><rect class="bar" x="15" y="36" width="6" height="6"/>
        <rect class="bar" x="24" y="37" width="6" height="5"/><rect class="bar" x="33" y="34" width="6" height="8"/>
        <rect class="accf" x="42" y="33" width="6" height="9"/><rect class="bar" x="51" y="35" width="6" height="7"/>`);
    });
    return k.finish("Un hub surmonté d'un mégaphone, relié aux newsletters, aux réseaux sociaux, aux campagnes et à un panneau de statistiques");
  }

  // ---------- 03 Projets web: board → screen → partners, budget, maintenance ----------
  function sceneProjets(k) {
    // Kanban board lying on the ground
    k.G(() => {
      k.box(0, 0, 0, 72, 52, 4);
      const counts = [3, 2, 1];
      let cols = "";
      counts.forEach((n, c) => {
        const u = 5 + c * 22;
        cols += `<rect class="pf" x="${u}" y="5" width="18" height="4" rx="1"/>`;
        for (let j = 0; j < n; j++) cols += `<rect class="${c === 1 && j === 0 ? "accf" : "pb"}" x="${u}" y="${12 + j * 9}" width="18" height="7" rx="1"/>`;
      });
      k.out.push(`<g transform="${k.onTopXY(0, 0, 4)}">${cols}<text x="5" y="47" font-size="5.4" font-weight="500">Coordination</text></g>`);
    });
    k.G(() => {
      k.wire([[72, 22, 0], [124, 22, 0]]);
      k.sq(75, 22, 0, 1.6);
    });
    // Screen on its stand, showing the site being built
    k.G(() => {
      k.box(124, 18, 0, 28, 18, 2);
      k.box(135, 20, 2, 6, 4, 24);
      k.panel(110, 30, 22, 76, 52, `
        <rect class="pf" x="3" y="3" width="70" height="46" rx="1.5"/>
        <circle cx="7" cy="7" r="1.1" fill="#cfcfcf"/><circle cx="10.5" cy="7" r="1.1" fill="#cfcfcf"/><circle cx="14" cy="7" r="1.1" fill="#cfcfcf"/>
        <rect x="19" y="5.3" width="40" height="3.4" rx="1.7" fill="#fff" stroke="#c4c4c4" stroke-width=".5"/>
        <rect class="accf" x="7" y="12" width="62" height="14" rx="1"/>
        <rect class="whitef" x="11" y="16" width="28" height="2.4" rx="1.2"/><rect class="whitef" x="11" y="20.5" width="18" height="1.6" rx=".8" opacity=".7"/>
        <rect class="pb" x="7" y="29.5" width="18.5" height="10" rx="1"/><rect class="pb" x="28.8" y="29.5" width="18.5" height="10" rx="1"/><rect class="pb" x="50.5" y="29.5" width="18.5" height="10" rx="1"/>
        <rect class="bar" x="7" y="42.5" width="62" height="1.6" rx=".8"/><rect class="bar" x="7" y="45.5" width="40" height="1.6" rx=".8"/>`);
    });
    // Partners, budget and maintenance, on a shared line
    const tiles = [["users", "Prestataires"], ["wallet", "Budget"], ["wrench", "Maintenance"]];
    k.G(() => {
      k.wire([[138, 36, 0], [138, 42, 0], [129, 42, 0], [129, 50, 0]]);
      k.wire([[138, 42, 0], [155, 42, 0], [155, 50, 0]]);
      k.wire([[155, 42, 0], [181, 42, 0], [181, 50, 0]]);
      [129, 155, 181].forEach((x) => k.sq(x, 47, 0, 1.6));
    });
    tiles.forEach(([ic, lb], i) => k.G(() => k.tile(120 + i * 26, 50, 0, 18, 62, 5, ic, lb)));
    return k.finish("Un tableau de suivi relié à un écran qui affiche un site, puis aux prestataires, au budget et à la maintenance");
  }

  // ---------- 04 Institutionnel (the first prototype) ----------
  function sceneInstitutionnel(k) {
    const tiles = [["building", "Services"], ["users", "Équipes"], ["globe", "Publics"]];
    const routes = [[[-40, 25], [-24, 25], [-24, 32], [10, 32]], [[-40, 81], [-14, 81], [-14, 56], [10, 56]], [[-40, 137], [-4, 137], [-4, 80], [10, 80]]];
    tiles.forEach(([ic, lb], i) => k.G(() => {
      k.tile(-62, i * 56, 0, 22, 50, 5, ic, lb);
      k.wire(routes[i].map(([x, y]) => [x, y, 0]));
      k.sq(-38, routes[i][0][1], 0, 1.6);
    }));
    k.G(() => { k.box(10, 10, 0, 120, 90, 5); k.tree(18, 18); });
    k.G(() => {
      k.box(30, 25, 5, 60, 45, 60);
      [29, 39.5, 50, 60.5].forEach((y) => [13, 21, 29, 37, 45, 53].forEach((z) => k.winR(90, y, z, 6, 5)));
      [34, 43, 52, 61, 70, 79].forEach((x) => [13, 21, 29, 37, 45, 53].forEach((z) => {
        if (x > 40 && x < 76 && z < 44) return;
        k.winL(x, 70, z, 6, 5);
      }));
      k.winL(48, 70, 36.5, 24, 4, "acc");
    });
    k.G(() => {
      k.box(28, 23, 65, 64, 49, 2);
      k.box(40, 32, 67, 20, 16, 8);
      k.pl([[82, 30, 67], [82, 30, 96]], "trunk");
      k.poly([[82, 30, 96], [94, 30, 96], [94, 30, 89], [82, 30, 89]], "acc");
    });
    k.G(() => {
      k.box(90, 35, 5, 32, 30, 30);
      [39, 48, 57].forEach((y) => [11, 20].forEach((z) => k.winR(122, y, z, 6, 5)));
      [94, 103, 112].forEach((x) => [11, 20].forEach((z) => k.winL(x, 65, z, 6, 5)));
      k.box(89, 34, 35, 34, 32, 2);
    });
    k.G(() => {
      k.box(40, 70, 5, 40, 10, 2);
      k.winL(55, 70, 7, 10, 15, "door");
      [44, 54, 64, 74].forEach((x) => k.box(x, 74, 7, 3, 3, 22));
      k.box(40, 70, 29, 40, 9, 3);
    });
    k.G(() => { k.tree(22, 90); k.tree(112, 90); k.tree(126, 76); });
    k.G((i) => {
      k.wire([[130, 46, 0], [150, 46, 0], [150, 60, 0], [176, 60, 0]]);
      k.sq(132, 46, 0, 1.6);
      k.pl([[176, 60, 0], [176, 60, 10]], "drop");
      k.panel(158, 60, 10, 54, 70, `${head(54, "")}
        <text x="5" y="17.5" font-size="5.2" font-weight="600">Communications</text>
        <text x="5" y="23.5" font-size="5.2" font-weight="600">officielles</text>
        <rect class="bar" x="5" y="29" width="44" height="1.6" rx=".8"/><rect class="bar" x="5" y="33.5" width="40" height="1.6" rx=".8"/>
        <rect class="bar" x="5" y="38" width="43" height="1.6" rx=".8"/><rect class="bar" x="5" y="42.5" width="28" height="1.6" rx=".8"/>
        <path class="sig" d="M6 57 c3 -6 5 -6 5 0 s3 4 5 -2 s3 -3 4 1 s2 1 4 -1"/>
        <line x1="5" y1="60" x2="27" y2="60" stroke="#bdbdbd" stroke-width=".7"/>
        <g class="stamp" style="--i:${i}"><circle cx="40" cy="55" r="8.5"/><circle class="in2" cx="40" cy="55" r="6.2"/><path d="M36.6 55.2 l2.4 2.4 l4.6 -5"/></g>`);
    });
    k.G(() => {
      k.pl([[70, 52, 67], [70, 52, 112]], "drop");
      k.tile(46, 16, 112, 24, 66, 5, "lock", "Confidentialité");
    }, "float");
    return k.finish("Bâtiment institutionnel relié aux services, aux équipes et aux publics, avec une lettre officielle tamponnée et un cadenas pour la confidentialité");
  }

  const SCENES = [sceneContenus, sceneDigital, sceneProjets, sceneInstitutionnel];
  window.isoScene = (i) => SCENES[i](makeKit("dom" + i));
})();
