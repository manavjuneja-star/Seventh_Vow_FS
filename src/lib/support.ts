/**
 * Behaviour for the Seventh Vow landing page.
 *
 * Ported from the original Claude Design `support.js` (a single
 * `componentDidMount`). The logic is unchanged; it has only been split into
 * small, single-purpose helpers so each stays within the lint complexity
 * budget. Every helper keys off the same `data-*` attributes as the design.
 */

/** Design-panel props from the original component, with their defaults. */
const CONFIG: { accent: string; slideSeconds: number; petals: boolean } = {
  accent: "#A9782B",
  slideSeconds: 5.5,
  petals: true,
};

type Cleanup = () => void;

const q = (s: string): HTMLElement[] =>
  Array.from(document.querySelectorAll<HTMLElement>(s));
const one = (s: string): HTMLElement | null =>
  document.querySelector<HTMLElement>(s);

const prefersReduce = (): boolean =>
  window.matchMedia("(prefers-reduced-motion: reduce)").matches;

/** Wire an element's hover handlers at most once (guards Strict Mode double
 *  runs; fresh elements after a client navigation get wired normally). */
const wired = new WeakSet<Element>();
const firstTime = (el: Element): boolean =>
  wired.has(el) ? false : (wired.add(el), true);

/** Crossfade pacing for a slideshow stack (CSS keyframes drive the fade). */
function pace(nodes: HTMLElement[], per: number): void {
  const n = nodes.length;
  if (!n) return;
  const dur = per * n;
  nodes.forEach((el, k) => {
    el.style.animationDuration = dur.toFixed(2) + "s";
    el.style.animationDelay = (((-dur * ((n - k) % n)) / n)).toFixed(2) + "s";
  });
}

function initLook(): void {
  if (CONFIG.accent) {
    document.documentElement.style.setProperty("--gold", CONFIG.accent);
  }
  if (!CONFIG.petals) {
    q("[data-petal]").forEach((p) => {
      p.style.display = "none";
    });
  }
  pace(q("[data-hs]"), CONFIG.slideSeconds * 1.3);
  pace(q("[data-is-a]"), CONFIG.slideSeconds);
}

const HEADER_TOP: Partial<CSSStyleDeclaration> = {
  background: "transparent",
  backdropFilter: "none",
  paddingTop: "14px",
  paddingBottom: "12px",
  boxShadow: "none",
};
const HEADER_SCROLLED: Partial<CSSStyleDeclaration> = {
  background: "rgba(58,37,35,0.9)",
  backdropFilter: "blur(12px)",
  paddingTop: "9px",
  paddingBottom: "9px",
  boxShadow: "0 1px 0 var(--line)",
};
const CTA_TOP: Partial<CSSStyleDeclaration> = {
  background: "transparent",
  borderColor: "rgba(255,253,251,0.55)",
  boxShadow: "none",
};
const CTA_SCROLLED: Partial<CSSStyleDeclaration> = {
  background: "var(--gold)",
  borderColor: "var(--gold)",
  boxShadow: "0 6px 16px -8px rgba(74,48,45,.5)",
};

/** Tint the phone hamburger to match the scroll state (unless the menu is open). */
function paintToggle(color: string): void {
  const toggle = one("[data-navtoggle]");
  if (!toggle || toggle.getAttribute("aria-expanded") === "true") return;
  toggle.style.color = color;
}

/** Header: transparent over the hero, a solid dark bar once scrolled. The nav
    stays in its ivory-on-dark palette throughout; only the backing changes. */
function initHeader(): Cleanup {
  const header = one("[data-header]");
  const brand = one("[data-brand]");
  const links = q("[data-navtext]");
  const cta = one("[data-navcta]");
  if (!header || !brand || !cta) return () => undefined;

  const apply = (s: boolean): void => {
    Object.assign(header.style, s ? HEADER_SCROLLED : HEADER_TOP);
    const c = "var(--ivory)";
    const sh = s ? "none" : "0 1px 12px rgba(0,0,0,.35)";
    brand.style.color = c;
    brand.style.textShadow = sh;
    const rule = one("[data-navrule]");
    if (rule) rule.style.opacity = s ? "0" : ".7";
    links.forEach((a) => {
      if (a.style.textDecoration !== "underline") a.style.color = c;
      a.style.textShadow = sh;
    });
    Object.assign(cta.style, s ? CTA_SCROLLED : CTA_TOP);
    cta.style.color = "var(--ivory)";
    paintToggle(c);
  };

  let last: boolean | null = null;
  const onScroll = (): void => {
    const s = window.scrollY > 40;
    if (s !== last) {
      last = s;
      apply(s);
    }
  };
  onScroll();
  window.addEventListener("scroll", onScroll, { passive: true });
  return () => window.removeEventListener("scroll", onScroll);
}

/** Envelope opens on approach (kept for design parity). */
function initEnvelope(): void {
  const env = one("[data-envelope]");
  if (!env) return;
  const io = new IntersectionObserver(
    (es) =>
      es.forEach((e) => {
        if (!e.isIntersecting) return;
        const flap = one("[data-flap]");
        const card = one("[data-card]");
        const seal = one("[data-seal]");
        if (flap) flap.style.transform = "rotateX(-178deg)";
        if (card) {
          card.style.opacity = "1";
          card.style.transform = "translateY(0) rotate(-0.3deg)";
        }
        if (seal) seal.style.transform = "translateX(-50%) scale(1)";
        io.unobserve(e.target);
      }),
    { threshold: 0.35 },
  );
  io.observe(env);
}

/** Scroll reveals: visible by default, hidden only while JS holds them. */
function initReveals(): Cleanup {
  const reveals = q("[data-reveal]");
  if (prefersReduce() || !("IntersectionObserver" in window)) {
    return () => undefined;
  }
  reveals.forEach((el) => {
    if (el.dataset.revealBase === undefined) {
      el.dataset.revealBase = el.style.transform || "";
    }
    const base = el.dataset.revealBase;
    const d = el.dataset.reveal || "0";
    el.style.transition =
      "opacity .9s cubic-bezier(.22,.61,.36,1) " +
      d +
      "s, transform 1s cubic-bezier(.22,.61,.36,1) " +
      d +
      "s";
    el.style.opacity = "0";
    el.style.transform = base ? base : "translateY(28px)";
  });
  const rio = new IntersectionObserver(
    (es) =>
      es.forEach((e) => {
        if (!e.isIntersecting) return;
        const el = e.target as HTMLElement;
        el.style.opacity = "1";
        el.style.transform = el.dataset.revealBase || "";
        rio.unobserve(e.target);
      }),
    { threshold: 0.06, rootMargin: "0px 0px -6% 0px" },
  );
  reveals.forEach((el) => rio.observe(el));
  return () => rio.disconnect();
}

/** Guest-book carousel. */
function initCarousel(): Cleanup {
  const track = one("[data-track]");
  const dots = q("[data-dot]");
  const car = one("[data-carousel]");
  if (!track || !car) return () => undefined;

  const total = track.children.length;
  let idx = 0;
  let timer: number | undefined;

  const go = (n: number): void => {
    idx = (n + total) % total;
    track.style.transform = "translateX(" + -idx * 100 + "%)";
    dots.forEach((d, k) => {
      d.style.background = k === idx ? "var(--gold)" : "var(--line)";
      d.style.transform = k === idx ? "scale(1.6)" : "scale(1)";
    });
  };
  const startAuto = (): void => {
    window.clearInterval(timer);
    timer = window.setInterval(() => go(idx + 1), 6500);
  };
  q("[data-arrow]").forEach((b) =>
    b.addEventListener("click", () => {
      go(idx + Number(b.dataset.arrow));
      startAuto();
    }),
  );
  dots.forEach((d, k) => d.addEventListener("click", () => {
    go(k);
    startAuto();
  }));
  car.addEventListener("mouseenter", () => window.clearInterval(timer));
  car.addEventListener("mouseleave", startAuto);
  go(0);
  startAuto();
  return () => window.clearInterval(timer);
}

function initThreshold(): void {
  const thr = one("[data-threshold]");
  const thrCue = one("[data-threshold-cue]");
  if (!thr || !thrCue || !firstTime(thr)) return;
  thrCue.style.transition = "transform .45s cubic-bezier(.22,.61,.36,1)";
  thr.addEventListener("mouseenter", () => {
    thrCue.style.transform = "translateX(5px)";
  });
  thr.addEventListener("mouseleave", () => {
    thrCue.style.transform = "none";
  });
}

/** Enquiry overlay open / close. */
function initEnquiry(): Cleanup {
  const ov = one("[data-enquiry]");
  const body = one("[data-scroll-body]");
  if (!ov || !body) return () => undefined;

  const openIt = (e?: Event): void => {
    if (e) e.preventDefault();
    const frm = one("[data-enquiry-form]") as HTMLFormElement | null;
    const thanks = one("[data-enquiry-thanks]");
    if (frm && frm.style.display === "none") {
      frm.reset();
      frm.style.display = "grid";
      if (thanks) thanks.style.display = "none";
    }
    ov.style.opacity = "1";
    ov.style.pointerEvents = "auto";
    document.body.style.overflow = "hidden";
    const inner = one("[data-scroll-inner]");
    if (inner) inner.scrollTop = 0;
    requestAnimationFrame(() => {
      body.style.maxHeight = "calc(92vh - 62px)";
      body.style.opacity = "1";
    });
  };
  const closeIt = (): void => {
    body.style.maxHeight = "0";
    body.style.opacity = "0";
    ov.style.opacity = "0";
    ov.style.pointerEvents = "none";
    document.body.style.overflow = "";
  };
  const onKey = (e: KeyboardEvent): void => {
    if (e.key === "Escape") closeIt();
  };

  // Delegated so links added by a later page still open the form.
  const onDocClick = (e: MouseEvent): void => {
    if ((e.target as Element | null)?.closest("[data-enquiry-open]")) openIt(e);
  };
  document.addEventListener("click", onDocClick);
  one("[data-enquiry-close]")?.addEventListener("click", closeIt);
  ov.addEventListener("click", (e) => {
    if (e.target === ov) closeIt();
  });
  window.addEventListener("keydown", onKey);
  one("[data-enquiry-form]")?.addEventListener("submit", (e) => {
    e.preventDefault();
    const frm = one("[data-enquiry-form]");
    const thanks = one("[data-enquiry-thanks]");
    if (frm) frm.style.display = "none";
    if (thanks) thanks.style.display = "block";
  });
  return () => {
    document.removeEventListener("click", onDocClick);
    window.removeEventListener("keydown", onKey);
  };
}

/** Nav scroll spy. */
function initScrollSpy(): Cleanup {
  type Spy = { h: string; el: HTMLElement; link: HTMLElement };
  const spy: Spy[] = ["about", "services", "portfolio"]
    .map((id) => ({
      h: "#" + id,
      el: document.getElementById(id),
      link: document.querySelector<HTMLElement>(
        '[data-navtext][href$="#' + id + '"]',
      ),
    }))
    .filter((s): s is Spy => Boolean(s.el && s.link));
  if (!spy.length) return () => undefined;

  const mark = (active: string): void =>
    spy.forEach((s) => {
      const on = s.h === active;
      s.link.style.opacity = on ? "1" : ".88";
      s.link.style.color = on ? "var(--gold-light)" : "var(--ivory)";
      s.link.style.textDecoration = on ? "underline" : "none";
      s.link.style.textUnderlineOffset = "6px";
      s.link.style.textDecorationColor = "var(--gold)";
      s.link.style.textDecorationThickness = "1px";
    });
  const sio = new IntersectionObserver(
    (es) => {
      const hit = es
        .filter((e) => e.isIntersecting)
        .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
      if (hit) mark("#" + hit.target.id);
    },
    { threshold: [0.2, 0.5], rootMargin: "-30% 0px -40% 0px" },
  );
  spy.forEach((s) => sio.observe(s.el));
  return () => {
    sio.disconnect();
    spy.forEach((s) => {
      s.link.style.color = "";
      s.link.style.opacity = "";
      s.link.style.textDecoration = "";
    });
  };
}

function initPosts(): void {
  q("[data-post]").forEach((p) => {
    if (!firstTime(p)) return;
    const img = p.querySelector<HTMLElement>("img");
    const veil = p.querySelector<HTMLElement>("[data-post-veil]");
    const cap = p.querySelector<HTMLElement>("[data-post-cap]");
    p.addEventListener("mouseenter", () => {
      if (img) img.style.transform = "scale(1.08)";
      if (veil) veil.style.opacity = "1";
      if (cap) {
        cap.style.opacity = "1";
        cap.style.transform = "none";
      }
    });
    p.addEventListener("mouseleave", () => {
      if (img) img.style.transform = "scale(1)";
      if (veil) veil.style.opacity = "0";
      if (cap) {
        cap.style.opacity = "0";
        cap.style.transform = "translateY(8px)";
      }
    });
  });
}

function initArch(): void {
  q("[data-arch]").forEach((a) => {
    if (!firstTime(a)) return;
    const img = a.querySelector<HTMLElement>("img");
    a.addEventListener("mouseenter", () => {
      if (img) img.style.transform = "scale(1.07)";
    });
    a.addEventListener("mouseleave", () => {
      if (img) img.style.transform = "scale(1)";
    });
  });
}

function initTilt(): void {
  q("[data-tilt]").forEach((card) => {
    if (!firstTime(card)) return;
    card.style.transformStyle = "preserve-3d";
    const img = card.querySelector<HTMLElement>("img");
    const cue = card.querySelector<HTMLElement>("[data-cue]");
    if (img) img.style.transition = "transform .6s cubic-bezier(.22,.61,.36,1)";
    card.addEventListener("mouseenter", () => {
      if (cue) {
        cue.style.opacity = "1";
        cue.style.transform = "none";
      }
    });
    card.addEventListener("mousemove", (e) => {
      const r = card.getBoundingClientRect();
      const px = (e.clientX - r.left) / r.width - 0.5;
      const py = (e.clientY - r.top) / r.height - 0.5;
      card.style.transition = "none";
      card.style.transform =
        "perspective(900px) rotateX(" +
        -py * 9 +
        "deg) rotateY(" +
        px * 9 +
        "deg) scale(1.02)";
      if (img) img.style.transform = "scale(1.07)";
    });
    card.addEventListener("mouseleave", () => {
      card.style.transition = "transform .6s cubic-bezier(.22,.61,.36,1)";
      card.style.transform =
        "perspective(900px) rotateX(0deg) rotateY(0deg) scale(1)";
      if (cue) {
        cue.style.opacity = "0";
        cue.style.transform = "translateY(6px)";
      }
      if (img) img.style.transform = "scale(1)";
    });
  });
}

/** Re-align to the current `#hash` target, honouring its CSS `scroll-margin-top`.
 *  Fired a few times because the first jump can land under the fixed header or
 *  overshoot while content below the fold is still settling. */
export function alignHash(): void {
  const id = decodeURIComponent(location.hash.slice(1));
  if (!id) return;
  const run = (): void => {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ block: "start" });
  };
  requestAnimationFrame(run);
  window.setTimeout(run, 220);
  window.setTimeout(run, 600);
}

/** Wire the behaviours that live for the whole session — the header (a scroll
 *  listener on a header that never unmounts) and the enquiry overlay. Guarded so
 *  a Strict Mode remount is a no-op. */
export function initOnce(): void {
  const root = document.documentElement;
  if (root.dataset.svReady) return;
  root.dataset.svReady = "1";
  initHeader();
  initEnquiry();
  window.addEventListener("hashchange", alignHash);
  if (location.hash) window.setTimeout(alignHash, 40);
}

/** Wire the behaviours tied to the current page's DOM. Re-run on every client
 *  navigation; the returned cleanup unwinds the observers first. */
export function initRoute(): Cleanup {
  initLook();
  const cleanups: Cleanup[] = [
    initReveals(),
    initCarousel(),
    initScrollSpy(),
  ];
  initEnvelope();
  initThreshold();
  initPosts();
  initArch();
  initTilt();
  if (location.hash) alignHash();
  return () => cleanups.forEach((c) => c());
}
