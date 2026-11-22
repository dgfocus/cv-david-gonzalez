/* Animated engraving of Geneva for the footer (22.11.2026) — generated from pistes/footer-anime.html.
   WebGL canvas drawn over the still image (which stays as fallback): the lake ripples, the Jet d'Eau rises,
   falls as a veil to the east and foams at its base. Settings chosen by David: lake speed 1.4, amplitude 0.45,
   jet speed 0.2, veil and foam 0.9. Exposes window.footAnime(img, canvas, watchEl) -> stop(). */
(() => {
  const LAKE = [[.455,.545],[.65,.535],[.75,.575],[.88,.62],[1,.655],[1,1],[.085,1],[.375,.778],[.355,.728],[.25,.705],[.205,.66],[.505,.652],[.505,.636],[.462,.632]];
  const HOLES = [ // parties fixes posées sur l'eau
    [[.692,.746],[.722,.68],[.752,.632],[.80,.632],[.91,.662],[.918,.69],[.87,.706],[.75,.722],[.708,.75]], // Bains des Pâquis + phare
  ];
  const BOATS = [[.463,.842,.014,.022],[.862,.892,.04,.014],[.962,.722,.011,.03],[.495,.638,.012,.01]]; // ellipses : x, y, rx, ry
  // Jet d'eau : la colonne, du sommet à la gerbe
  const JET = [[.424,.368],[.434,.368],[.444,.47],[.455,.57],[.462,.628],[.402,.628],[.405,.57],[.414,.47]];

  const P = { ls: 1.4, la: .45, js: .2, jw: .9, showMask: 0 };

  window.footAnime = function (img, canvas, watchEl) {
    const gl = canvas.getContext("webgl", { premultipliedAlpha: false, antialias: false });
    if (!gl || matchMedia("(prefers-reduced-motion: reduce)").matches) return () => {};
    let alive = true, visible = false, t = 0, last = 0, U = {};

  function makeMask() {
    const W = 1200, H = Math.round(W * img.naturalHeight / img.naturalWidth);
    const layer = (fill) => {
      const c = document.createElement("canvas"); c.width = W; c.height = H;
      const x = c.getContext("2d"); x.filter = "blur(5px)"; fill(x, W, H); return c;
    };
    const poly = (x, pts, W, H) => { x.beginPath(); pts.forEach(([u, v], i) => (i ? x.lineTo(u * W, v * H) : x.moveTo(u * W, v * H))); x.closePath(); x.fill(); };
    const lake = layer((x, W, H) => {
      x.fillStyle = "#f00"; poly(x, LAKE, W, H);
      x.globalCompositeOperation = "destination-out";
      HOLES.forEach((h) => poly(x, h, W, H));
      BOATS.forEach(([u, v, rx, ry]) => { x.beginPath(); x.ellipse(u * W, v * H, rx * W, ry * H, 0, 0, 7); x.fill(); });
    });
    const jet = layer((x, W, H) => { x.fillStyle = "#0f0"; poly(x, JET, W, H); });
    const out = document.createElement("canvas"); out.width = W; out.height = H;
    const o = out.getContext("2d"); o.fillStyle = "#000"; o.fillRect(0, 0, W, H);
    o.globalCompositeOperation = "lighter"; o.drawImage(lake, 0, 0); o.drawImage(jet, 0, 0);
    return out;
  }

  const VS = `attribute vec2 p; varying vec2 uv; void main(){ uv = vec2(p.x*.5+.5, .5-p.y*.5); gl_Position = vec4(p,0.,1.); }`;
  const FS = `precision highp float;
  varying vec2 uv;
  uniform sampler2D img, mask;
  uniform float t, ls, la, js, jw, showMask;
  float h(vec2 p){ return fract(sin(dot(p, vec2(127.1,311.7)))*43758.5453); }
  float n(vec2 p){ vec2 i=floor(p), f=fract(p); f=f*f*(3.-2.*f);
    return mix(mix(h(i),h(i+vec2(1,0)),f.x), mix(h(i+vec2(0,1)),h(i+vec2(1,1)),f.x), f.y); }
  void main(){
    vec4 m = texture2D(mask, uv);
    vec2 d = vec2(0.);
    // --- Lac : petites vagues irrégulières, plus fortes au premier plan (perspective)
    if (m.r > .001) {
      float near = smoothstep(.53, 1., uv.y);           // 0 à l'horizon, 1 en bas
      float sc = mix(5., 1., near);                      // vagues plus serrées au loin
      float tt = t * ls;
      vec2 q = vec2(uv.x * 18. * sc, uv.y * 70. * sc);
      float w = n(q + vec2(tt * .9, tt * .35)) + .5 * n(q * 2.1 - vec2(tt * .6, -tt * .5));
      float sw = sin(uv.y * 260. * sc + tt * 2.2 + w * 4.);
      d.x += (w - .75) * .0026 * la * (.25 + near);
      d.y += sw * .0011 * la * (.25 + near);
      d *= m.r;
    }
    // --- Jet d'eau, comme un vrai : l'eau part vite de la base et ralentit jusqu'au sommet,
    //     retombe en voile d'un côté (vent vers l'est), écume qui bouillonne à la base, débit qui pulse
    float tt = t * js;
    float pulse = .8 + .4 * n(vec2(t * .35, 7.));               // débit irrégulier
    float H0 = .645, H1 = .368;                                  // base et sommet (y de l'image)
    float hj = clamp((H0 - uv.y) / (H0 - H1), 0., 1.);           // 0 base, 1 sommet
    float age = 1. - sqrt(1. - hj * .985);                       // temps de vol : grand près du sommet
    float vel = sqrt(1. - hj * .985);                            // vitesse : 1 à la base, ~0 au sommet
    float sway = (sin(t * .9) * .5 + n(vec2(t * .6, 3.)) - .5) * .004 * jw * hj * hj;
    float cx = .4312 + sway;
    float hw = .005 + .035 * pow(1. - hj, 1.5);                  // demi-largeur de la colonne
    float xl = (uv.x - cx) / hw;                                 // -1..1 dans la colonne
    float j = m.g;
    vec4 col;
    if (j > .001) {
      // l'image d'origine glisse vers le haut, vite en bas, lentement en haut (deux phases fondues)
      float L = .03 * smoothstep(.02, .14, hj);                 // rien ne glisse au ras de la jetée
      float p1 = fract(tt * .9), p2 = fract(tt * .9 + .5);
      float edge = (n(vec2(xl * 3., age * 10. - tt * 2.)) - .5) * .003 * (1. - hj * .5);
      vec2 base = uv + d + vec2(edge + sway * j, 0.);
      vec4 a = texture2D(img, base + vec2(0., p1 * L * vel * j));
      vec4 b = texture2D(img, base + vec2(0., p2 * L * vel * j));
      col = mix(texture2D(img, uv + d), mix(a, b, abs(1. - 2. * p1)), j);
      // filets d'eau qui montent (traits clairs et traits bleus, dans le style de la gravure)
      float s = n(vec2(xl * 7. + n(vec2(age * 4., tt)) * 2., age * 26. - tt * 3.2 * pulse))
              + .5 * n(vec2(xl * 15., age * 50. - tt * 5.));
      float inside = (1. - smoothstep(.55, 1.05, abs(xl))) * j * smoothstep(.02, .12, hj);
      col.rgb = mix(col.rgb, vec3(1.), smoothstep(.95, 1.35, s) * .55 * inside * pulse);
      col.rgb = mix(col.rgb, vec3(.122, .31, .878), smoothstep(.55, .25, s) * .22 * inside * (1. - hj * .6));
    } else {
      col = texture2D(img, uv + d);
    }
    // voile qui retombe à l'est du sommet, de plus en plus large et transparent en descendant
    float f = (uv.y - .35) / .3;
    if (f > 0. && f < 1. && jw > 0.) {
      float px = .434 + .05 * pow(f, .7) + sway;
      float pw = .006 + .03 * f;
      float dx = (uv.x - px) / pw;
      float dens = (1. - smoothstep(.1, 1.2, abs(dx))) * pow(1. - f, .6) * smoothstep(0., .05, f);
      float fall = n(vec2(dx * 2.5 + n(vec2(f * 3., tt * .5)) * 1.5, f * 12. - tt * 1.8))
                 + .5 * n(vec2(dx * 6., f * 26. - tt * 3.));
      float veil = dens * (.3 + .7 * smoothstep(.6, 1.2, fall)) * jw * smoothstep(.628, .585, uv.y); // s'efface avant la jetée
      col.rgb = mix(col.rgb, vec3(1.), clamp(veil, 0., .9));
    }
    // écume serrée au pied du jet (comme sur la photo), un peu poussée vers l'est, au-dessus de la jetée
    vec2 mb = (uv - vec2(.438, .614)) / vec2(.03, .02);
    float md = 1. - length(mb);
    if (md > 0. && jw > 0.) {
      vec2 q = vec2(uv.x * 90. - tt * .5, uv.y * 130. + tt * 1.8);
      float cloud = n(q) * .55 + n(q * 2.03 + 5.) * .3 + n(q * 4.1 + 9.) * .15;
      float puff = smoothstep(.4, .75, cloud) * smoothstep(0., .6, md) * smoothstep(.632, .62, uv.y) * (.75 + .25 * pulse);
      col.rgb = mix(col.rgb, vec3(1.), clamp(puff * .95 * jw, 0., 1.));
    }
    // léger scintillement des traits clairs de l'eau
    if (m.r > .001) {
      float near = smoothstep(.53, 1., uv.y);
      float sp = n(vec2(uv.x * 400., uv.y * 900. - t * ls * 6.));
      col.rgb = mix(col.rgb, vec3(1.), m.r * smoothstep(.82, 1., sp) * .18 * la * (.3 + near) * smoothstep(.35, .9, dot(col.rgb, vec3(.33))));
    }
    if (showMask > .5) col.rgb = mix(col.rgb, vec3(1., .25, .1) * m.r + vec3(.1, 1., .3) * m.g + col.rgb * (1. - max(m.r, m.g)), .55);
    gl_FragColor = vec4(col.rgb, 1.);
  }`;

    function sh(type, s) { const o = gl.createShader(type); gl.shaderSource(o, s); gl.compileShader(o); if (!gl.getShaderParameter(o, gl.COMPILE_STATUS)) throw new Error(gl.getShaderInfoLog(o)); return o; }
    function tex(unit, source) {
      const tx = gl.createTexture(); gl.activeTexture(gl.TEXTURE0 + unit); gl.bindTexture(gl.TEXTURE_2D, tx);
      gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, source);
      gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR); gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.LINEAR);
      gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE); gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);
    }
    function size() {
      const r = canvas.getBoundingClientRect(), dpr = Math.min(devicePixelRatio || 1, 2);
      canvas.width = Math.max(1, Math.round(r.width * dpr)); canvas.height = Math.max(1, Math.round(r.height * dpr));
      gl.viewport(0, 0, canvas.width, canvas.height);
    }
    function draw() {
      gl.uniform1f(U.t, t); ["ls", "la", "js", "jw", "showMask"].forEach((k) => gl.uniform1f(U[k], P[k]));
      gl.drawArrays(gl.TRIANGLE_STRIP, 0, 4);
    }
    function frame(now) {
      if (!alive || !visible) return;
      t += Math.min(.05, (now - last) / 1000 || 0); last = now;
      draw(); requestAnimationFrame(frame);
    }
    let io, onResize;
    function start() {
      if (!alive) return;
      try {
        const prog = gl.createProgram();
        gl.attachShader(prog, sh(gl.VERTEX_SHADER, VS)); gl.attachShader(prog, sh(gl.FRAGMENT_SHADER, FS)); gl.linkProgram(prog); gl.useProgram(prog);
        gl.bindBuffer(gl.ARRAY_BUFFER, gl.createBuffer());
        gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([-1,-1, 1,-1, -1,1, 1,1]), gl.STATIC_DRAW);
        const loc = gl.getAttribLocation(prog, "p"); gl.enableVertexAttribArray(loc); gl.vertexAttribPointer(loc, 2, gl.FLOAT, false, 0, 0);
        ["img", "mask", "t", "ls", "la", "js", "jw", "showMask"].forEach((k) => (U[k] = gl.getUniformLocation(prog, k)));
        tex(0, img); tex(1, makeMask());
        gl.uniform1i(U.img, 0); gl.uniform1i(U.mask, 1);
      } catch (e) { console.warn("footAnime:", e); return; } // e.g. page opened from disk: the still image stays
      size(); draw(); canvas.classList.add("ready");
      onResize = () => { size(); draw(); };
      addEventListener("resize", onResize);
      io = new IntersectionObserver(([e]) => {
        const was = visible; visible = e.isIntersecting;
        if (visible && !was) { last = performance.now(); requestAnimationFrame(frame); }
      });
      io.observe(watchEl || canvas);
    }
    // the image is lazy-loaded: start once it is decoded (load event or decode(), whichever comes first)
    let started = false;
    const go = () => { if (!started && img.naturalWidth) { started = true; start(); } };
    if (img.complete && img.naturalWidth) go();
    else {
      img.addEventListener("load", go, { once: true });
      // native lazy-loading sometimes never fires (e.g. page in a hidden pane when the footer came into view):
      // force the load ourselves when the footer gets near the screen
      const near = new IntersectionObserver(([e]) => {
        if (!e.isIntersecting) return;
        near.disconnect();
        if (!img.naturalWidth) { img.loading = "eager"; if (img.complete) { const s = img.src; img.src = ""; img.src = s; } }
        img.decode && img.decode().then(go, () => {});
      }, { rootMargin: "800px 0px" });
      near.observe(watchEl || img);
    }
    return () => { alive = false; io && io.disconnect(); onResize && removeEventListener("resize", onResize); };
  };
})();
