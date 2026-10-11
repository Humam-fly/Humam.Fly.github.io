/* =========================================================
   HUMAM FLAYYES — portfolio runtime
   Content lives in /projects.js. This file only renders it
   and drives the motion.
   ========================================================= */
(() => {
  "use strict";

  const D = document;
  const html = D.documentElement;
  const $ = (s, c = D) => c.querySelector(s);
  const $$ = (s, c = D) => Array.from(c.querySelectorAll(s));
  const mq = (q) => window.matchMedia(q).matches;

  const SITE = window.SITE || {};
  const PROJECTS = window.PROJECTS || [];
  const REELS = window.REELS || [];
  const BREAKDOWN = window.BREAKDOWN || {};
  const SERVICES = window.SERVICES || [];

  const REDUCE = mq("(prefers-reduced-motion: reduce)");
  const FINE = mq("(hover: hover) and (pointer: fine)");
  const SMALL = mq("(max-width: 640px)");
  const SAVE_DATA = !!(navigator.connection && navigator.connection.saveData);
  const HAS_GSAP = !!window.gsap;
  const gsap = window.gsap;
  const ScrollTrigger = window.ScrollTrigger;
  const SplitText = window.SplitText;

  if (HAS_GSAP) {
    const plugins = [ScrollTrigger, SplitText].filter(Boolean);
    gsap.registerPlugin(...plugins);
  }

  /* ---------- helpers ---------- */
  const FPS = 25;
  const pad = (n) => String(n).padStart(2, "0");
  const tc = (frames) => {
    const f = Math.max(0, Math.floor(frames));
    const s = Math.floor(f / FPS);
    return `${pad(Math.floor(s / 3600))}:${pad(Math.floor(s / 60) % 60)}:${pad(s % 60)}:${pad(f % FPS)}`;
  };
  const esc = (s = "") =>
    String(s).replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]));
  const clamp = (v, a, b) => Math.min(b, Math.max(a, v));
  const HUES = [12, 200, 280, 38, 165, 330];

  if (FINE) html.classList.add("has-cursor");

  /* =========================================================
     FILM GRAIN — generate one small noise tile, animate via CSS
     ========================================================= */
  (() => {
    const c = D.createElement("canvas");
    c.width = c.height = 160;
    const ctx = c.getContext("2d");
    const img = ctx.createImageData(160, 160);
    for (let i = 0; i < img.data.length; i += 4) {
      const v = (Math.random() * 255) | 0;
      img.data[i] = img.data[i + 1] = img.data[i + 2] = v;
      img.data[i + 3] = 255;
    }
    ctx.putImageData(img, 0, 0);
    $(".grain").style.backgroundImage = `url(${c.toDataURL("image/png")})`;
  })();

  /* =========================================================
     RENDER CONTENT FROM projects.js
     ========================================================= */
  function waveSVG(seed) {
    let r = (seed + 1) * 7919;
    const rnd = () => ((r = (r * 9301 + 49297) % 233280) / 233280);
    let d = "";
    const n = 90;
    for (let i = 0; i < n; i++) {
      const env = 0.35 + 0.65 * Math.abs(Math.sin((i / n) * Math.PI * 2.4 + seed));
      const h = Math.max(1.5, (0.2 + rnd() * 0.8) * env * 40);
      d += `M${i * 2} ${24 - h / 2}h1.2v${h}h-1.2z`;
    }
    return `<svg class="clip__wave" viewBox="0 0 180 48" preserveAspectRatio="none" aria-hidden="true"><path d="${d}" fill="currentColor"/></svg>`;
  }

  const CLIP_SECONDS = 30; // each clip "represents" 30s on the timeline ruler

  function renderWork() {
    const track = $("[data-tl-track]");
    track.innerHTML = PROJECTS.map((p, i) => {
      const h = HUES[i % HUES.length];
      return `
      <li class="clip">
        <button class="clip__btn" type="button" data-cursor="play" data-youtube="${esc(p.youtube)}" data-title="${esc(p.title)}" aria-label="Play ${esc(p.title)}">
          <span class="clip__media media" style="display:block">
            <span class="ph" style="--h:${h}">
              <span class="ph__label mono">No signal · ${esc(p.preview)}</span>
              <span class="ph__title">${esc(p.title)}</span>
            </span>
            <video class="lazy-video" data-src="${esc(p.preview)}" muted loop playsinline preload="none" aria-hidden="true"></video>
            <span class="clip__label mono">C${pad(i + 1)} · ${tc(i * CLIP_SECONDS * FPS)}</span>
            <span class="clip__info">
              <span class="clip__title" role="heading" aria-level="3">${esc(p.title)}</span>
              <span class="clip__meta mono"><b>${esc(p.category)}</b><span>${esc(p.year || "")}</span></span>
            </span>
          </span>
        </button>
        ${waveSVG(i)}
      </li>`;
    }).join("");
  }

  function renderReels() {
    $("[data-reels]").innerHTML = REELS.map((r, i) => {
      const h = HUES[(i + 2) % HUES.length];
      const tag = r.url ? "a" : "div";
      const attrs = r.url ? `href="${esc(r.url)}" target="_blank" rel="noopener" aria-label="${esc(r.title)} on Instagram"` : "";
      return `
      <${tag} class="phone" ${attrs} data-cursor="play" data-cursor-label="VIEW">
        <span class="phone__notch"></span>
        <span class="phone__screen media" style="display:block">
          <span class="ph" style="--h:${h}">
            <span class="ph__label mono">No signal</span>
            <span class="ph__title">${esc(r.title)}</span>
          </span>
          <video class="lazy-video" data-src="${esc(r.preview)}" muted loop playsinline preload="none" aria-hidden="true"></video>
        </span>
        <span class="phone__ui mono"><span>@humam.fly</span><span>9:16</span></span>
      </${tag}>`;
    }).join("");
  }

  function renderMarquees() {
    $$("[data-marquee]").forEach((row, r) => {
      const group = SERVICES.map((s) => `<span class="marquee__item">${esc(s)}</span><span class="marquee__sep" aria-hidden="true"></span>`).join("") +
        (r === 0 ? `<span class="marquee__sep--ar marquee__sep" lang="ar" aria-hidden="true">مونتاج</span>` : "");
      const inner = $(".marquee__inner", row);
      inner.innerHTML = `<span class="marquee__group">${group}</span><span class="marquee__group" aria-hidden="true">${group}</span>`;
      if (r > 0) row.setAttribute("aria-hidden", "true");
    });
  }

  function renderStatic() {
    const heroVid = $(".hero video");
    heroVid.dataset.src = (SITE.showreel && SITE.showreel.preview) || "";

    $("[data-ba-before]").dataset.src = BREAKDOWN.before || "";
    $("[data-ba-after]").dataset.src = BREAKDOWN.after || "";
    if (BREAKDOWN.title) $("[data-vfx-title]").textContent = `${BREAKDOWN.title} — drag to compare`;

    const stat = SITE.reelsStat || {};
    const link = $("[data-stat-link]");
    if (stat.url) link.href = stat.url;
    $("[data-stat-label]").textContent = stat.label || "views";

    const email = $("[data-email]");
    email.href = `mailto:${SITE.email || ""}`;
    email.setAttribute("aria-label", `Email ${SITE.email || ""}`);

    $("[data-socials]").innerHTML = (SITE.socials || []).map((s) => `
      <li><a href="${esc(s.url)}" target="_blank" rel="noopener" data-magnetic>
        <span class="mono">${esc(s.label)} ↗</span><span class="mono">${esc(s.handle)}</span>
      </a></li>`).join("");

    $$("[data-year]").forEach((el) => (el.textContent = new Date().getFullYear()));
  }

  renderWork();
  renderReels();
  renderMarquees();
  renderStatic();

  /* =========================================================
     LAZY VIDEOS — load near the viewport, play only when visible
     ========================================================= */
  const AUTOPLAY = !REDUCE && !SAVE_DATA;

  function loadVideo(v) {
    if (v.dataset.loaded) return;
    v.dataset.loaded = "1";
    const src = v.dataset.src;
    const media = v.closest(".media");
    if (!src) { media && media.classList.add("is-missing"); return; }
    v.addEventListener("loadeddata", () => {
      media && media.classList.add("is-loaded");
      if (v.dataset.visible && AUTOPLAY) playVideo(v);
    }, { once: true });
    v.addEventListener("error", () => media && media.classList.add("is-missing"), { once: true });
    v.preload = AUTOPLAY ? "auto" : "metadata";
    v.src = AUTOPLAY ? src : `${src}#t=0.1`;
  }
  function playVideo(v) {
    if (!v.closest(".media")?.classList.contains("is-loaded")) return;
    const p = v.play();
    if (p && p.catch) p.catch(() => {});
  }

  const lazyVideos = $$("video.lazy-video");
  if ("IntersectionObserver" in window) {
    const loadIO = new IntersectionObserver((entries) => {
      entries.forEach((e) => { if (e.isIntersecting) { loadVideo(e.target); loadIO.unobserve(e.target); } });
    }, { rootMargin: "300px 300px" });
    const playIO = new IntersectionObserver((entries) => {
      entries.forEach((e) => {
        const v = e.target;
        if (e.isIntersecting) {
          v.dataset.visible = "1";
          loadVideo(v);
          if (AUTOPLAY) playVideo(v);
        } else {
          delete v.dataset.visible;
          v.pause();
        }
      });
    }, { threshold: 0.15 });
    lazyVideos.forEach((v) => { loadIO.observe(v); playIO.observe(v); });
  } else {
    lazyVideos.forEach(loadVideo);
  }

  // Reduced motion / save-data: play previews only on hover (desktop)
  if (!AUTOPLAY && FINE) {
    $$(".media").forEach((m) => {
      const v = $("video", m);
      if (!v) return;
      m.addEventListener("mouseenter", () => playVideo(v));
      m.addEventListener("mouseleave", () => v.pause());
    });
  }

  // Pause everything when the tab is hidden
  D.addEventListener("visibilitychange", () => {
    lazyVideos.forEach((v) => {
      if (D.hidden) v.pause();
      else if (v.dataset.visible && AUTOPLAY) playVideo(v);
    });
  });

  /* =========================================================
     FULL-SCREEN PLAYER (YouTube embed)
     ========================================================= */
  const player = $(".player");
  const frame = $("[data-player-frame]");
  const inertTargets = [$("main"), $(".bar--top"), $(".bar--bottom")];
  let lastFocus = null;
  let lenis = null;

  function ytId(url = "") {
    const m = String(url).match(/(?:youtu\.be\/|youtube\.com\/(?:watch\?(?:.*&)?v=|embed\/|shorts\/|live\/))([\w-]{11})/);
    return m ? m[1] : null;
  }

  function openPlayer(url, title) {
    const id = ytId(url);
    if (!id) { if (url) window.open(url, "_blank", "noopener"); return; }
    lastFocus = D.activeElement;
    frame.innerHTML = `<iframe src="https://www.youtube-nocookie.com/embed/${id}?autoplay=1&rel=0&modestbranding=1&playsinline=1"
      title="${esc(title || "Video")}" allow="autoplay; encrypted-media; fullscreen; picture-in-picture"></iframe>`;
    $("[data-player-title]").textContent = `▶ NOW PLAYING — ${title || "Showreel"}`;
    player.hidden = false;
    inertTargets.forEach((el) => el && (el.inert = true));
    lenis && lenis.stop();
    html.style.overflow = "hidden";
    lazyVideos.forEach((v) => v.pause());
    if (HAS_GSAP && !REDUCE) {
      gsap.fromTo(player, { clipPath: "inset(50% 0 50% 0)" }, { clipPath: "inset(0% 0 0% 0)", duration: 0.7, ease: "expo.inOut" });
    }
    $("[data-player-close]").focus();
    history.pushState({ player: 1 }, "");
  }

  let closing = false;
  function closePlayer(fromPop) {
    if (player.hidden || closing) return;
    closing = true;
    const done = () => {
      closing = false;
      player.hidden = true;
      frame.innerHTML = "";
      inertTargets.forEach((el) => el && (el.inert = false));
      html.style.overflow = "";
      lenis && lenis.start();
      lazyVideos.forEach((v) => v.dataset.visible && AUTOPLAY && playVideo(v));
      lastFocus && lastFocus.focus && lastFocus.focus({ preventScroll: true });
    };
    if (HAS_GSAP && !REDUCE) {
      gsap.to(player, { clipPath: "inset(50% 0 50% 0)", duration: 0.5, ease: "expo.inOut", onComplete: done });
    } else done();
    if (!fromPop && history.state && history.state.player) history.back();
  }

  window.addEventListener("popstate", () => closePlayer(true));
  $("[data-player-close]").addEventListener("click", () => closePlayer());
  D.addEventListener("keydown", (e) => { if (e.key === "Escape") closePlayer(); });

  const reelURL = (SITE.showreel && SITE.showreel.youtube) || "";
  $$("[data-play-reel]").forEach((el) => {
    // On touch, the whole hero shouldn't hijack taps — only the button opens the reel
    if (el.classList.contains("hero__media") && !FINE) return;
    el.addEventListener("click", () => openPlayer(reelURL, "Showreel"));
  });
  $("[data-tl-track]").addEventListener("click", (e) => {
    const b = e.target.closest(".clip__btn");
    if (b) openPlayer(b.dataset.youtube, b.dataset.title);
  });

  /* =========================================================
     CUSTOM CURSOR + MAGNETIC BUTTONS (fine pointers only)
     ========================================================= */
  if (FINE) {
    const cur = $(".cursor");
    const label = $(".cursor__label");
    let mx = innerWidth / 2, my = innerHeight / 2, cx = mx, cy = my, raf = 0;
    const loop = () => {
      cx += (mx - cx) * 0.22;
      cy += (my - cy) * 0.22;
      cur.style.transform = `translate3d(${cx}px, ${cy}px, 0)`;
      raf = Math.abs(mx - cx) + Math.abs(my - cy) > 0.1 ? requestAnimationFrame(loop) : 0;
    };
    D.addEventListener("pointermove", (e) => {
      if (e.pointerType !== "mouse") return;
      mx = e.clientX; my = e.clientY;
      if (!raf) raf = requestAnimationFrame(loop);
    }, { passive: true });
    D.addEventListener("pointerover", (e) => {
      const play = e.target.closest("[data-cursor]");
      const link = !play && e.target.closest("a, button, [role=slider]");
      cur.classList.toggle("is-play", !!play);
      cur.classList.toggle("is-link", !!link);
      if (play) label.textContent = play.dataset.cursorLabel || "PLAY";
    });
    D.documentElement.addEventListener("mouseleave", () => cur.classList.add("is-hidden"));
    D.documentElement.addEventListener("mouseenter", () => cur.classList.remove("is-hidden"));

    if (HAS_GSAP && !REDUCE) {
      $$("[data-magnetic]").forEach((el) => {
        const strength = el.closest(".bar") ? 0.25 : 0.4;
        const xTo = gsap.quickTo(el, "x", { duration: 0.5, ease: "power3.out" });
        const yTo = gsap.quickTo(el, "y", { duration: 0.5, ease: "power3.out" });
        el.addEventListener("pointermove", (e) => {
          const r = el.getBoundingClientRect();
          xTo((e.clientX - (r.left + r.width / 2)) * strength);
          yTo((e.clientY - (r.top + r.height / 2)) * strength);
        });
        el.addEventListener("pointerleave", () => {
          gsap.to(el, { x: 0, y: 0, duration: 0.9, ease: "elastic.out(1, 0.35)" });
        });
      });
    }
  }

  /* =========================================================
     LIVE TIMECODE in the HUD
     ========================================================= */
  const liveTCs = $$("[data-live-tc]");
  const t0 = performance.now();
  setInterval(() => {
    if (D.hidden) return;
    const t = tc(((performance.now() - t0) / 1000) * FPS);
    liveTCs.forEach((el) => (el.textContent = t));
  }, 1000 / FPS);

  /* =========================================================
     BEFORE / AFTER SLIDER
     ========================================================= */
  const ba = $("[data-ba]");
  const handle = $("[data-ba-handle]");
  const baState = { pos: 50 };
  const setPos = (p) => {
    baState.pos = clamp(p, 0, 100);
    ba.style.setProperty("--pos", `${baState.pos}%`);
    handle.setAttribute("aria-valuenow", Math.round(baState.pos));
  };
  const posFromEvent = (e) => {
    const r = ba.getBoundingClientRect();
    return ((e.clientX - r.left) / r.width) * 100;
  };
  let dragging = false;
  ba.addEventListener("pointerdown", (e) => {
    // touch: only the handle drags, so vertical swipes over the frame still scroll the page
    if (e.pointerType !== "mouse" && !handle.contains(e.target)) return;
    dragging = true;
    ba.classList.add("is-dragging");
    HAS_GSAP && gsap.killTweensOf(baState);
    setPos(posFromEvent(e));
  });
  window.addEventListener("pointermove", (e) => { if (dragging) setPos(posFromEvent(e)); }, { passive: true });
  const stopDrag = () => { dragging = false; ba.classList.remove("is-dragging"); };
  window.addEventListener("pointerup", stopDrag);
  window.addEventListener("pointercancel", stopDrag);
  handle.addEventListener("keydown", (e) => {
    const step = e.shiftKey ? 10 : 4;
    if (e.key === "ArrowLeft") { setPos(baState.pos - step); e.preventDefault(); }
    if (e.key === "ArrowRight") { setPos(baState.pos + step); e.preventDefault(); }
    if (e.key === "Home") { setPos(0); e.preventDefault(); }
    if (e.key === "End") { setPos(100); e.preventDefault(); }
  });
  // keep the two clips frame-synced
  (() => {
    const a = $("[data-ba-after]"), b = $("[data-ba-before]");
    setInterval(() => {
      if (a.paused || b.paused || !a.readyState || !b.readyState) return;
      if (Math.abs(a.currentTime - b.currentTime) > 0.08) b.currentTime = a.currentTime;
    }, 1000);
  })();

  /* =========================================================
     TIMELINE — playhead, timecode, active clip
     ========================================================= */
  const tl = $(".tl");
  const tlViewport = $("[data-tl-viewport]");
  const tlTrack = $("[data-tl-track]");
  const playheadTC = $("[data-playhead-tc]");
  const playheadEl = $(".playhead");
  const ruler = $("[data-ruler]");
  const clips = $$(".clip", tlTrack);
  let activeClip = null;

  function updateTimeline() {
    const phX = playheadEl.getBoundingClientRect().left;
    const trackX = tlTrack.getBoundingClientRect().left;
    const clipW = clips[0] ? clips[0].offsetWidth : 1;
    playheadTC.textContent = tc(((phX - trackX) / clipW) * CLIP_SECONDS * FPS);
    let hit = null;
    for (const c of clips) {
      const r = c.getBoundingClientRect();
      if (phX >= r.left && phX < r.right) { hit = c; break; }
    }
    if (hit !== activeClip) {
      activeClip && activeClip.classList.remove("is-active");
      hit && hit.classList.add("is-active");
      activeClip = hit;
    }
  }
  const sizeRuler = () => { ruler.style.width = `${tlTrack.scrollWidth}px`; };
  sizeRuler();

  let nativeBound = false;
  function nativeTimeline() {
    tl.classList.add("is-native");
    if (nativeBound) return updateTimeline();
    nativeBound = true;
    let ticking = false;
    tlViewport.addEventListener("scroll", () => {
      ruler.style.transform = `translate3d(${-tlViewport.scrollLeft}px,0,0)`;
      if (!ticking) { ticking = true; requestAnimationFrame(() => { updateTimeline(); ticking = false; }); }
    }, { passive: true });
    updateTimeline();
  }

  /* =========================================================
     NO-GSAP FALLBACK — everything still works, just calmer
     ========================================================= */
  if (!HAS_GSAP) {
    html.classList.remove("is-loading");
    html.classList.add("is-ready");
    nativeTimeline();
    const n = $("[data-counter]");
    n.textContent = compact((SITE.reelsStat || {}).value || 0);
    return;
  }

  function compact(v) {
    if (v >= 1e6) return `${+(v / 1e6).toFixed(1)}M+`;
    if (v >= 1e3) return `${+(v / 1e3).toFixed(1)}K+`;
    return String(v);
  }

  /* =========================================================
     SMOOTH SCROLL (Lenis) — off for reduced motion
     ========================================================= */
  if (!REDUCE && window.Lenis) {
    lenis = new window.Lenis({ lerp: 0.1, smoothWheel: true });
    lenis.on("scroll", ScrollTrigger.update);
    gsap.ticker.add((t) => lenis.raf(t * 1000));
    gsap.ticker.lagSmoothing(0);
    lenis.stop();
  }

  $$('a[href^="#"]').forEach((a) => {
    a.addEventListener("click", (e) => {
      if (!lenis) return; // native anchor jump
      const id = a.getAttribute("href");
      const target = id === "#top" ? 0 : $(id);
      if (target === null) return;
      e.preventDefault();
      lenis.scrollTo(target, { duration: 1.6 });
    });
  });

  /* =========================================================
     PRELOADER — timecode count-up, then a hard cut
     ========================================================= */
  const loaderTC = $("[data-loader-tc]");
  const loaderBar = $("[data-loader-bar]");
  const loaderPct = $("[data-loader-pct]");
  let seen = false;
  try { seen = sessionStorage.getItem("hf-seen") === "1"; sessionStorage.setItem("hf-seen", "1"); } catch (e) { /* storage blocked */ }

  const TARGET_FRAMES = 2 * FPS + 12; // 00:00:02:12
  const counter = { f: 0 };
  const fontsReady = Promise.race([
    D.fonts ? D.fonts.ready : Promise.resolve(),
    new Promise((r) => setTimeout(r, 2500)),
  ]);
  const countDone = new Promise((resolve) => {
    if (REDUCE) { loaderTC.textContent = tc(TARGET_FRAMES); return resolve(); }
    gsap.to(counter, {
      f: TARGET_FRAMES,
      duration: seen ? 0.7 : 1.9,
      ease: "power2.inOut",
      onUpdate() {
        const p = counter.f / TARGET_FRAMES;
        loaderTC.textContent = tc(counter.f);
        loaderBar.style.transform = `scaleX(${p})`;
        loaderPct.textContent = `${Math.round(p * 100)}%`;
      },
      onComplete: resolve,
    });
  });

  Promise.all([fontsReady, countDone]).then(() => {
    const flash = $(".flash");
    if (!REDUCE) {
      // flash frame: two frames of white, then cut
      gsap.set(flash, { opacity: 1 });
      gsap.to(flash, { opacity: 0, duration: 0.25, delay: 2 / FPS, ease: "power2.out" });
    }
    html.classList.remove("is-loading");
    html.classList.add("is-ready");
    lenis && lenis.start();
    init();
  });

  /* =========================================================
     MAIN INIT — after the cut
     ========================================================= */
  function init() {
    const mm = gsap.matchMedia();

    /* ---- HUD bars slide in ---- */
    if (!REDUCE) {
      gsap.from(".bar--top", { yPercent: -100, duration: 0.9, ease: "expo.out", delay: 0.15 });
      gsap.from(".bar--bottom", { yPercent: 100, duration: 0.9, ease: "expo.out", delay: 0.15 });
    }


    heroIntro();
    kineticHero();
    splitHeadings();
    timeline(mm);
    reelsCounter();
    reelsIntro(mm);
    baHint();
    marquee();
    contactDistort();

    /* ---- section indicator in the bottom bar (created after the pin so it sees its spacing) ---- */
    const seqEl = $(".bar__seq");
    $$("section[data-seq]").forEach((sec) => {
      ScrollTrigger.create({
        trigger: sec, start: "top 50%", end: "bottom 50%",
        onToggle: (self) => { if (self.isActive) seqEl.textContent = sec.dataset.seq; },
      });
    });

    if (D.fonts && D.fonts.ready) D.fonts.ready.then(() => { sizeRuler(); ScrollTrigger.refresh(); });
    window.addEventListener("load", () => ScrollTrigger.refresh());
  }

  /* ---------- hero ---------- */
  let heroChars = [];
  let heroReady = null; // set by kineticHero, called when the intro lands

  function heroIntro() {
    const lines = $$("[data-kinetic]");
    if (SplitText) {
      lines.forEach((l) => {
        const s = SplitText.create(l, { type: "chars", charsClass: "char" });
        heroChars.push(...s.chars);
      });
    }
    gsap.set(heroChars, { "--w": 62, "--g": 800 });
    if (REDUCE) return;

    const tlHero = gsap.timeline({ defaults: { ease: "expo.out" }, onComplete: () => heroReady && heroReady() });
    tlHero
      .from(".hero__media", { scale: 1.25, duration: 2.2, ease: "power3.out" }, 0)
      .fromTo(heroChars, { yPercent: 110, opacity: 0, "--w": 125, "--g": 100 }, {
        yPercent: 0, opacity: 1, "--w": 62, "--g": 800,
        duration: 1.3, stagger: { each: 0.045, from: "start" },
      }, 0.05)
      .from([".hero__kicker", ".hero__ar", ".hero__tag", ".hero__foot .btn"], {
        y: 30, opacity: 0, duration: 1, stagger: 0.08,
      }, 0.5)
      .from(".hero__scroll", { opacity: 0, duration: 1 }, 1);

    // scroll-out: type drifts up, footage pushes in
    gsap.to(".hero__inner", {
      yPercent: -18, opacity: 0.2, ease: "none",
      scrollTrigger: { trigger: ".hero", start: "top top", end: "bottom top", scrub: true },
    });
    gsap.to(".hero__media", {
      scale: 1.12, ease: "none",
      scrollTrigger: { trigger: ".hero", start: "top top", end: "bottom top", scrub: true },
    });
  }

  function kineticHero() {
    if (REDUCE || !heroChars.length) return;
    const hero = $(".hero");
    const state = heroChars.map(() => ({ w: 62, g: 800, y: 0, cx: 0, cy: 0 }));
    let pointer = null;
    let tapTimer = 0;
    let running = false;
    let heroVisible = true;

    const measure = () => {
      heroChars.forEach((c, i) => {
        const r = c.getBoundingClientRect();
        state[i].cx = r.left + r.width / 2;
        state[i].cy = r.top + r.height / 2 + window.scrollY;
      });
    };
    let enabled = false;
    heroReady = () => { measure(); enabled = true; };
    window.addEventListener("resize", () => enabled && gsap.delayedCall(0.2, measure));

    const tick = () => {
      if (!heroVisible) { running = false; gsap.ticker.remove(tick); return; }
      const radius = Math.max(220, innerWidth * (SMALL ? 0.45 : 0.3));
      let moving = false;
      heroChars.forEach((c, i) => {
        const s = state[i];
        let p = 0;
        if (pointer) {
          const dx = pointer.x - s.cx;
          const dy = pointer.y + window.scrollY - s.cy;
          p = clamp(1 - Math.hypot(dx, dy) / radius, 0, 1);
          p = p * p * (3 - 2 * p); // smoothstep
        }
        const tw = 62 + p * 40;   // condensed → wider
        const tg = 800 - p * 620; // heavy → hairline
        const ty = -p * 6;
        s.w += (tw - s.w) * 0.14;
        s.g += (tg - s.g) * 0.14;
        s.y += (ty - s.y) * 0.14;
        if (Math.abs(tw - s.w) + Math.abs(tg - s.g) > 0.5) moving = true;
        c.style.setProperty("--w", s.w.toFixed(1));
        c.style.setProperty("--g", s.g.toFixed(0));
        c.style.transform = `translate3d(0, ${s.y.toFixed(2)}%, 0)`;
      });
      if (!moving && !pointer) { running = false; gsap.ticker.remove(tick); }
    };
    const start = () => { if (enabled && !running) { running = true; gsap.ticker.add(tick); } };

    if (FINE) {
      hero.addEventListener("pointermove", (e) => { pointer = { x: e.clientX, y: e.clientY }; start(); });
      hero.addEventListener("pointerleave", () => { pointer = null; start(); });
    } else {
      // touch: a tap sends a ripple through the letters, then they settle
      hero.addEventListener("pointerdown", (e) => {
        pointer = { x: e.clientX, y: e.clientY };
        start();
        clearTimeout(tapTimer);
        tapTimer = setTimeout(() => { pointer = null; start(); }, 700);
      }, { passive: true });
    }
    ScrollTrigger.create({
      trigger: hero, start: "top bottom", end: "bottom top",
      onToggle: (self) => { heroVisible = self.isActive; if (heroVisible) start(); },
    });
  }

  /* ---------- section headings ---------- */
  function splitHeadings() {
    if (REDUCE || !SplitText) return;
    $$("[data-split]").forEach((el) => {
      SplitText.create(el, {
        type: "lines,chars", mask: "lines", autoSplit: true,
        onSplit(self) {
          return gsap.from(self.chars, {
            yPercent: 105, duration: 1, ease: "expo.out", stagger: 0.025,
            scrollTrigger: { trigger: el, start: "top 85%", once: true },
          });
        },
      });
    });
  }

  /* ---------- selected work timeline ---------- */
  function timeline(mm) {
    mm.add({
      pinned: "(min-width: 641px) and (prefers-reduced-motion: no-preference)",
      native: "(max-width: 640px), (prefers-reduced-motion: reduce)",
    }, (ctx) => {
      if (ctx.conditions.native) {
        nativeTimeline();
        return;
      }
      tl.classList.remove("is-native");
      tlViewport.scrollLeft = 0;
      const distance = () => Math.max(0, tlTrack.scrollWidth - tlViewport.clientWidth);
      gsap.to([tlTrack, ruler], {
        x: () => -distance(),
        ease: "none",
        onUpdate: updateTimeline, // follows the scrubbed position, not the raw scroll
        scrollTrigger: {
          trigger: ".work__pin",
          start: "top top",
          end: () => `+=${distance()}`,
          pin: true,
          scrub: 0.6,
          invalidateOnRefresh: true,
          onRefresh: () => { sizeRuler(); updateTimeline(); },
        },
      });
      updateTimeline();
      // clips glide in like they're being dropped onto the track
      gsap.from(clips, {
        y: 60, opacity: 0, duration: 1, ease: "expo.out", stagger: 0.08,
        scrollTrigger: { trigger: tl, start: "top 85%", once: true },
      });
    });
  }

  /* ---------- reels ---------- */
  function reelsCounter() {
    const el = $("[data-counter]");
    const target = (SITE.reelsStat || {}).value || 0;
    const fmt = new Intl.NumberFormat("en-US");
    if (REDUCE) { el.textContent = compact(target); return; }
    const o = { v: 0 };
    ScrollTrigger.create({
      trigger: el, start: "top 85%", once: true,
      onEnter: () => {
        gsap.to(o, {
          v: target, duration: 2.4, ease: "power3.out",
          onUpdate: () => (el.textContent = fmt.format(Math.round(o.v))),
          onComplete: () => {
            el.textContent = compact(target);
            gsap.fromTo(el, { scale: 1.08 }, { scale: 1, duration: 0.6, ease: "elastic.out(1, 0.4)", transformOrigin: "left center" });
          },
        });
      },
    });
  }

  function reelsIntro(mm) {
    if (REDUCE) return;
    gsap.from(".phone", {
      yPercent: 30, opacity: 0, rotate: (i) => (i % 2 ? 4 : -4), duration: 1.2, ease: "expo.out", stagger: 0.1,
      scrollTrigger: { trigger: ".reels__row", start: "top 85%", once: true },
    });
    mm.add("(min-width: 901px)", () => {
      $$(".phone").forEach((p, i) => {
        gsap.to(p, {
          yPercent: i % 2 ? -10 : 6, ease: "none",
          scrollTrigger: { trigger: ".reels__row", start: "top bottom", end: "bottom top", scrub: true },
        });
      });
    });
  }

  /* ---------- before/after hint ---------- */
  function baHint() {
    if (REDUCE) return;
    ScrollTrigger.create({
      trigger: ba, start: "top 70%", once: true,
      onEnter: () => {
        if (dragging) return;
        gsap.timeline()
          .to(baState, { pos: 22, duration: 0.9, ease: "power3.inOut", onUpdate: () => setPos(baState.pos) })
          .to(baState, { pos: 78, duration: 1.1, ease: "power3.inOut", onUpdate: () => setPos(baState.pos) })
          .to(baState, { pos: 50, duration: 0.8, ease: "power3.inOut", onUpdate: () => setPos(baState.pos) });
      },
    });
  }

  /* ---------- services marquee (skews with scroll speed) ---------- */
  function marquee() {
    if (REDUCE) return;
    const rows = $$("[data-marquee]").map((row) => ({
      dir: +row.dataset.marquee,
      inner: $(".marquee__inner", row),
      group: $(".marquee__group", row),
      x: 0,
    }));
    let velocity = 0;
    let skew = 0;
    let flip = 1;
    let active = false;
    const maxSkew = SMALL ? 6 : 14;

    ScrollTrigger.create({
      trigger: ".services", start: "top bottom", end: "bottom top",
      onToggle: (self) => { active = self.isActive; },
      onUpdate: (self) => {
        velocity = self.getVelocity();
        if (self.direction) flip = self.direction;
      },
    });

    gsap.ticker.add((time, dt) => {
      if (!active) return;
      const speed = (SMALL ? 50 : 70) + Math.min(Math.abs(velocity) * 0.35, 1600);
      skew += (clamp(-velocity / 220, -maxSkew, maxSkew) - skew) * 0.12;
      rows.forEach((r) => {
        const w = r.group.offsetWidth || 1;
        r.x -= (speed * r.dir * flip * dt) / 1000;
        r.x = ((r.x % w) - w) % w; // wrap into (-w, 0]
        r.inner.style.transform = `translate3d(${r.x}px,0,0) skewX(${skew.toFixed(2)}deg)`;
      });
      velocity *= 0.9;
    });
  }

  /* ---------- contact: LET'S CREATE distortion ---------- */
  function contactDistort() {
    const title = $("[data-distort]");
    const disp = $("#distort feDisplacementMap");
    const turb = $("#distort feTurbulence");
    if (!title || !disp) return;

    if (!REDUCE) {
      gsap.from($$("span", title), {
        yPercent: 60, opacity: 0, duration: 1.2, ease: "expo.out", stagger: 0.12,
        scrollTrigger: { trigger: title, start: "top 85%", once: true },
      });
    }
    if (REDUCE) return;

    const st = { scale: 0, freq: 0.012 };
    let last = null;
    let hovering = false;
    const render = () => {
      disp.setAttribute("scale", st.scale.toFixed(1));
      turb.setAttribute("baseFrequency", `${st.freq.toFixed(4)} 0.06`);
    };
    const relax = () => {
      gsap.to(st, {
        scale: 0, freq: 0.012, duration: 0.9, ease: "power3.out", onUpdate: render, overwrite: true,
        onComplete: () => { if (!hovering) title.classList.remove("is-distorting"); },
      });
    };
    const pulse = (amount) => {
      title.classList.add("is-distorting");
      gsap.to(st, {
        scale: amount, freq: 0.012 + amount / 3000, duration: 0.25, ease: "power2.out", onUpdate: render, overwrite: true,
        onComplete: relax,
      });
    };

    if (FINE) {
      title.addEventListener("pointerenter", () => { hovering = true; title.classList.add("is-distorting"); pulse(30); });
      title.addEventListener("pointermove", (e) => {
        if (last) {
          const speed = Math.hypot(e.clientX - last.x, e.clientY - last.y);
          pulse(clamp(12 + speed * 1.4, 12, 80));
        }
        last = { x: e.clientX, y: e.clientY };
      });
      title.addEventListener("pointerleave", () => { hovering = false; last = null; relax(); });
    } else {
      title.addEventListener("pointerdown", () => pulse(55), { passive: true });
    }
    // one glitch as it enters the frame
    ScrollTrigger.create({ trigger: title, start: "top 60%", once: true, onEnter: () => pulse(SMALL ? 35 : 50) });
  }
})();
