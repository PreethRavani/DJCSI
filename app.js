const loader = document.getElementById("loader"),
  loaderFill = document.getElementById("loaderFill");
let lp = 0;
const li = setInterval(() => {
  lp += Math.random() * 35 + 10;
  if (lp >= 100) {
    lp = 100;
    clearInterval(li);
  }
  loaderFill.style.width = lp + "%";
  if (lp >= 100) setTimeout(() => loader.classList.add("done"), 200);
}, 120);

let lenis;
const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
if (typeof Lenis !== "undefined" && !reduced) {
  lenis = new Lenis({ duration: 1.15, smoothWheel: true });
  lenis.on("scroll", ScrollTrigger.update);
  gsap.ticker.add((t) => lenis.raf(t * 1000));
  gsap.ticker.lagSmoothing(0);
}
function scrollToId(id) {
  const el = document.getElementById(id);
  if (lenis) lenis.scrollTo(el, { offset: -60 });
  else el.scrollIntoView({ behavior: "smooth" });
}

const nav = document.getElementById("nav");
window.addEventListener("scroll", () =>
  nav.classList.toggle("scrolled", window.scrollY > 50),
);
document.getElementById("navToggle").onclick = () =>
  document.getElementById("mobileMenu").classList.add("open");
document.getElementById("closeMenu").onclick = () =>
  document.getElementById("mobileMenu").classList.remove("open");
document
  .querySelectorAll(".m-link")
  .forEach(
    (a) =>
      (a.onclick = () =>
        document.getElementById("mobileMenu").classList.remove("open")),
  );
const typeText =
  "BrickCraft is a 24-hour offline hackathon where ideas come to life, teams build innovative solutions and creativity meets technology.\n\nAre you ready to craft the future?";
const typeEl = document.getElementById("typewriter");
let tIdx = 0,
  tStarted = false;
function typeWriter() {
  if (tIdx < typeText.length) {
    typeEl.textContent += typeText[tIdx];
    tIdx++;
    setTimeout(typeWriter, 22);
  } else typeEl.style.borderRight = "none";
}

let teamSize = 2;
const chars = document.querySelectorAll(".char");
document.querySelectorAll(".size-opt").forEach((btn) => {
  btn.onclick = () => {
    document
      .querySelectorAll(".size-opt")
      .forEach((b) => b.classList.remove("active"));
    btn.classList.add("active");
    teamSize = +btn.dataset.size;
    chars.forEach((c, i) => c.classList.toggle("selected", i < teamSize));
  };
});
function handleReg(e) {
  e.preventDefault();
  const btn = document.querySelector(".reg-summary .btn");
  btn.textContent = "Party Assembled!";
  btn.style.background = "var(--yellow)";
  setTimeout(() => {
    btn.textContent = "Register Now";
    btn.style.background = "";
    alert("Registration received, Stay Tuned For Updates!");
  }, 1400);
}

document.querySelectorAll(".faq-q").forEach((btn) => {
  btn.onclick = () => {
    const item = btn.parentElement;
    const open = item.classList.contains("open");
    document
      .querySelectorAll(".faq-item")
      .forEach((i) => i.classList.remove("open"));
    if (!open) item.classList.add("open");
  };
});

gsap.registerPlugin(ScrollTrigger);
ScrollTrigger.config({ ignoreMobileResize: true });
gsap.from(".hero-badge", { y: 24, opacity: 0, duration: 0.7, delay: 0.3 });
gsap.from(".hero-line", {
  y: 36,
  opacity: 0,
  duration: 0.7,
  stagger: 0.15,
  delay: 0.5,
});
gsap.from(".hero-sub", { y: 20, opacity: 0, duration: 0.6, delay: 1.0 });
gsap.from(".hero-ctas", { y: 16, opacity: 0, duration: 0.6, delay: 1.15 });
if (!reduced) {
  gsap.to(".hero-bg-img", {
    y: 60,
    ease: "none",
    scrollTrigger: { trigger: ".hero", scrub: true },
  });
}

ScrollTrigger.create({
  trigger: ".about",
  start: "top 60%",
  onEnter: () => {
    if (!tStarted) {
      tStarted = true;
      typeWriter();
    }
  },
});
gsap.from(".steve-img", {
  x: -40,
  opacity: 0,
  duration: 0.8,
  scrollTrigger: { trigger: ".about", start: "top 65%" },
});
gsap.from(".feat", {
  y: 20,
  opacity: 0,
  duration: 0.5,
  stagger: 0.08,
  scrollTrigger: { trigger: ".features", start: "top 80%" },
});

const dCards = gsap.utils.toArray(".domain-card");

function setupDomainsPin(endMultiplier) {
  ScrollTrigger.create({
    trigger: "#domainsPin",
    start: "top top",
    end: () => `+=${dCards.length * endMultiplier}`,
    pin: true,
    scrub: 0.5,
    anticipatePin: 1,
    invalidateOnRefresh: true,
    onUpdate: (self) => {
      const p = self.progress;
      const step = 1 / dCards.length;
      dCards.forEach((card, i) => {
        if (p >= i * step * 0.9 || p > 0.92) {
          card.classList.add("visible");
          gsap.to(card, {
            opacity: 1,
            scale: 1,
            y: 0,
            duration: 0.3,
            overwrite: "auto",
          });
        } else {
          card.classList.remove("visible");
          gsap.to(card, {
            opacity: 0,
            scale: 0.5,
            y: 50,
            duration: 0.2,
            overwrite: "auto",
          });
        }
      });
    },
  });
}

ScrollTrigger.matchMedia({
  "(min-width: 769px)": () => setupDomainsPin(200),
  "(max-width: 768px)": () => setupDomainsPin(130),
});

window.addEventListener("load", () => ScrollTrigger.refresh());

// Timeline event typewriter
let tlTwIdx = 0;
let tlTwText = "";
let tlTwTimer = null;
let tlLastNode = -1;
const tlTwEl = document.getElementById("tlTypewriter");
function tlTypeWriter(text) {
  if (tlTwTimer) clearTimeout(tlTwTimer);
  tlTwText = text;
  tlTwIdx = 0;
  if (tlTwEl) {
    tlTwEl.textContent = "";
    tlTwEl.style.borderRight = "2px solid var(--grass)";
  }
  function tick() {
    if (tlTwIdx < tlTwText.length) {
      if (tlTwEl) tlTwEl.textContent += tlTwText.charAt(tlTwIdx);
      tlTwIdx++;
      tlTwTimer = setTimeout(tick, 18);
    } else if (tlTwEl) {
      tlTwEl.style.borderRight = "2px solid var(--grass)";
    }
  }
  tick();
}

const tlNodes = gsap.utils.toArray(".tl-node");
const tlBgDay = document.getElementById("tlBgDay");
const tlBgSunset = document.getElementById("tlBgSunset");
const tlBgNight = document.getElementById("tlBgNight");
const tlContent = document.getElementById("tlContent");
const tlProgress = document.getElementById("tlProgress");
function setupTimelinePin(endMultiplier) {
  ScrollTrigger.create({
    trigger: "#timelinePin",
    start: "top top",
    end: () => `+=${window.innerHeight * endMultiplier}`,
    pin: true,
    scrub: 0.4,
    invalidateOnRefresh: true,
    anticipatePin: 1,
    onUpdate: (self) => {
      const p = self.progress;
      tlProgress.style.width = p * 100 + "%";
      let dayOp = 0, sunOp = 0, nightOp = 0;
      if (p < 0.22) {
        sunOp = 1;
      } else if (p < 0.32) {
        const t = (p - 0.22) / 0.1;
        sunOp = 1 - t;
        nightOp = t;
      } else if (p < 0.58) {
        nightOp = 1;
      } else if (p < 0.66) {
        const t = (p - 0.58) / 0.08;
        nightOp = 1 - t;
        dayOp = t;
      } else if (p < 0.78) {
        dayOp = 1;
      } else if (p < 0.9) {
        const t = (p - 0.78) / 0.12;
        dayOp = 1 - t;
        sunOp = t;
      } else {
        sunOp = 1;
      }
      if (tlBgDay) tlBgDay.style.opacity = String(dayOp);
      if (tlBgSunset) tlBgSunset.style.opacity = String(sunOp);
      if (tlBgNight) tlBgNight.style.opacity = String(nightOp);
      const isDark = nightOp > 0.5 || (sunOp > 0.5 && p > 0.7);
      tlContent.classList.toggle("night", isDark);
      const ni = Math.min(Math.floor(p * tlNodes.length), tlNodes.length - 1);
      tlNodes.forEach((n, i) => n.classList.toggle("active", i <= ni));
      if (ni !== tlLastNode && tlNodes[ni]) {
        tlLastNode = ni;
        const desc = tlNodes[ni].getAttribute("data-desc") || "";
        if (desc) tlTypeWriter(desc);
      }
    },
  });
}

ScrollTrigger.matchMedia({
  "(min-width: 769px)": () => setupTimelinePin(3.2),
  "(min-width: 421px) and (max-width: 768px)": () => setupTimelinePin(2.6),
  "(max-width: 420px)": () => setupTimelinePin(2.2),
});

gsap.to(".prize-card", {
  opacity: 1,
  x: 0,
  duration: 0.6,
  stagger: 0.15,
  ease: "power2.out",
  scrollTrigger: { trigger: "#prizeList", start: "top 75%" },
});

const sections = [
  "hero",
  "about",
  "domains",
  "timeline",
  "prizes",
  "sponsors",
  "faq",
];
sections.forEach((id) => {
  ScrollTrigger.create({
    trigger: "#" + id,
    start: "top 40%",
    end: "bottom 40%",
    onEnter: () => setActive(id),
    onEnterBack: () => setActive(id),
  });
});
function setActive(id) {
  document
    .querySelectorAll(".nav-links a")
    .forEach((a) =>
      a.classList.toggle("active", a.getAttribute("href") === "#" + id),
    );
}

ScrollTrigger.create({
  trigger: "#timelinePin",
  start: "top 80%",
  once: true,
  onEnter: () => {
    const first = document.querySelector(".tl-node[data-desc]");
    if (first && tlTwEl && !tlTwEl.textContent) {
      tlTypeWriter(first.getAttribute("data-desc") || "");
    }
  },
});
