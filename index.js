/* ByteForge Studio — index.js */

const root = document.documentElement;
const header = document.getElementById("siteHeader");
const menuToggle = document.getElementById("menuToggle");
const siteNav = document.getElementById("siteNav");
const navTrack = document.getElementById("navTrack");
const navIndicator = navTrack.querySelector(".nav-indicator");
const navLinks = Array.from(navTrack.querySelectorAll("a"));
const typeTarget = document.getElementById("typeTarget");
const cursorGlow = document.querySelector(".cursor-glow");

const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
const desktopQuery = window.matchMedia("(min-width: 901px)");

/* ------------------------------------------------------------
   Reveal on scroll
   The "js" class is added in <head>, so content is only hidden when
   this script can actually reveal it. Runs first so a later error
   can never leave content invisible.
------------------------------------------------------------ */
function showReveal(el) {
  el.classList.add("is-visible");
  // After the entrance finishes, hand transitions back to the element's own hover styles.
  window.setTimeout(() => el.classList.add("is-revealed"), 1200);
}

const revealItems = document.querySelectorAll(".reveal");

if ("IntersectionObserver" in window) {
  const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) return;
      showReveal(entry.target);
      revealObserver.unobserve(entry.target);
    });
  }, { threshold: 0.12, rootMargin: "0px 0px -40px 0px" });

  revealItems.forEach((item) => revealObserver.observe(item));

  // Section dividers draw themselves in once, as each section arrives.
  const dividerObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) return;
      entry.target.classList.add("is-inview");
      dividerObserver.unobserve(entry.target);
    });
  }, { rootMargin: "0px 0px -12% 0px" });

  document.querySelectorAll("main > section:not(.hero)").forEach((section) => dividerObserver.observe(section));
} else {
  revealItems.forEach(showReveal);
  document.querySelectorAll("main > section").forEach((section) => section.classList.add("is-inview"));
}

/* ------------------------------------------------------------
   Hero typing line
------------------------------------------------------------ */
const commands = [
  "building responsive websites",
  "developing PHP/MySQL web systems",
  "setting up WordPress sites",
  "formatting MS Office documents"
];

let commandIndex = 0;
let letterIndex = 0;
let removing = false;

function typeLoop() {
  const current = commands[commandIndex];

  if (!removing) {
    letterIndex += 1;
    typeTarget.textContent = current.slice(0, letterIndex);

    if (letterIndex === current.length) {
      removing = true;
      setTimeout(typeLoop, 1200);
      return;
    }
  } else {
    letterIndex -= 1;
    typeTarget.textContent = current.slice(0, letterIndex);

    if (letterIndex === 0) {
      removing = false;
      commandIndex = (commandIndex + 1) % commands.length;
    }
  }

  setTimeout(typeLoop, removing ? 38 : 68);
}

if (reduceMotion) {
  // no typing animation: show one steady status line
  typeTarget.textContent = commands[0];
} else {
  typeLoop();
}

/* ------------------------------------------------------------
   Header: compact state + scroll progress
------------------------------------------------------------ */
let scrollTicking = false;

function updateScroll() {
  const y = window.scrollY;
  const maxScroll = root.scrollHeight - window.innerHeight;

  header.classList.toggle("is-scrolled", y > 24);
  header.style.setProperty("--progress", maxScroll > 0 ? Math.min(y / maxScroll, 1).toFixed(4) : "0");

  // The contact block is short, so it can never reach the middle of the screen.
  // At the very bottom of the page, treat it as the current section.
  if (maxScroll > 0 && y >= maxScroll - 8) setActive("contact");

  scrollTicking = false;
}

window.addEventListener("scroll", () => {
  if (scrollTicking) return;
  scrollTicking = true;
  window.requestAnimationFrame(updateScroll);
}, { passive: true });

/* ------------------------------------------------------------
   Nav: sliding indicator + active section
------------------------------------------------------------ */
function placeIndicator(link, hover = false) {
  if (!link || !desktopQuery.matches) {
    navIndicator.classList.remove("is-visible", "is-hover");
    return;
  }

  const wasHidden = !navIndicator.classList.contains("is-visible");

  if (wasHidden) {
    // Appear in place instead of sliding in from the left edge.
    navIndicator.classList.add("no-anim");
  }

  navIndicator.style.setProperty("--ind-x", `${link.offsetLeft}px`);
  navIndicator.style.setProperty("--ind-w", `${link.offsetWidth}px`);

  if (wasHidden) {
    void navIndicator.offsetWidth;
    navIndicator.classList.remove("no-anim");
  }

  navIndicator.classList.add("is-visible");
  navIndicator.classList.toggle("is-hover", hover && !link.classList.contains("is-active"));
}

function restIndicator() {
  placeIndicator(navLinks.find((link) => link.classList.contains("is-active")));
}

let activeId = null;

function setActive(id) {
  if (id === activeId) return;
  activeId = id;

  navLinks.forEach((link) => {
    const isActive = link.hash === `#${id}`;
    link.classList.toggle("is-active", isActive);

    if (isActive) {
      link.setAttribute("aria-current", "location");
    } else {
      link.removeAttribute("aria-current");
    }
  });

  restIndicator();
}

navTrack.addEventListener("pointerover", (event) => {
  const link = event.target.closest("a");
  if (link) placeIndicator(link, true);
});

navTrack.addEventListener("pointerleave", restIndicator);

navTrack.addEventListener("focusin", (event) => {
  const link = event.target.closest("a");
  if (link) placeIndicator(link, true);
});

navTrack.addEventListener("focusout", restIndicator);

if ("IntersectionObserver" in window) {
  // A section is "current" while it crosses a thin band just above the middle of the screen.
  const spy = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) return;
      setActive(entry.target.id === "home" ? null : entry.target.id);
    });
  }, { rootMargin: "-40% 0px -55% 0px" });

  document.querySelectorAll("main > section[id]").forEach((section) => spy.observe(section));
}

window.addEventListener("resize", restIndicator);

if (document.fonts && document.fonts.ready) {
  document.fonts.ready.then(restIndicator);
}

/* ------------------------------------------------------------
   Mobile menu
------------------------------------------------------------ */
function setMenu(open, returnFocus = false) {
  siteNav.classList.toggle("is-open", open);
  header.classList.toggle("menu-open", open);
  menuToggle.setAttribute("aria-expanded", String(open));
  menuToggle.setAttribute("aria-label", open ? "Close menu" : "Open menu");

  if (!open && returnFocus) menuToggle.focus();
}

menuToggle.addEventListener("click", () => {
  setMenu(menuToggle.getAttribute("aria-expanded") !== "true");
});

siteNav.addEventListener("click", (event) => {
  if (event.target.closest("a")) setMenu(false);
});

document.addEventListener("keydown", (event) => {
  if (event.key === "Escape" && siteNav.classList.contains("is-open")) {
    setMenu(false, true);
  }
});

document.addEventListener("pointerdown", (event) => {
  if (siteNav.classList.contains("is-open") && !header.contains(event.target)) {
    setMenu(false);
  }
});

desktopQuery.addEventListener("change", (event) => {
  if (event.matches) setMenu(false);
  restIndicator();
});

/* ------------------------------------------------------------
   Pointer effects (mouse only, skipped for reduced motion)
------------------------------------------------------------ */
if (!reduceMotion) {
  // Project stages: gentle parallax on the mock, and a pill that follows the cursor.
  document.querySelectorAll(".proj-stage").forEach((stage) => {
    stage.addEventListener("pointermove", (event) => {
      if (event.pointerType !== "mouse") return;

      const bounds = stage.getBoundingClientRect();
      const x = event.clientX - bounds.left;
      const y = event.clientY - bounds.top;

      stage.style.setProperty("--px", ((x / bounds.width - 0.5) * 2).toFixed(3));
      stage.style.setProperty("--py", ((y / bounds.height - 0.5) * 2).toFixed(3));
      stage.style.setProperty("--cx", `${x.toFixed(0)}px`);
      stage.style.setProperty("--cy", `${y.toFixed(0)}px`);
    });

    stage.addEventListener("pointerleave", () => {
      stage.style.setProperty("--px", "0");
      stage.style.setProperty("--py", "0");
    });
  });

  // Buttons set two custom properties; the CSS combines them with the hover lift.
  document.querySelectorAll(".magnetic").forEach((button) => {
    button.addEventListener("pointermove", (event) => {
      if (event.pointerType !== "mouse") return;

      const bounds = button.getBoundingClientRect();
      const x = (event.clientX - bounds.left - bounds.width / 2) * 0.18;
      const y = (event.clientY - bounds.top - bounds.height / 2) * 0.18;

      button.style.setProperty("--mx", `${x.toFixed(1)}px`);
      button.style.setProperty("--my", `${y.toFixed(1)}px`);
    });

    button.addEventListener("pointerleave", () => {
      button.style.removeProperty("--mx");
      button.style.removeProperty("--my");
    });
  });

  // Service cards: a soft light follows the cursor across the card.
  document.querySelectorAll(".service-tile").forEach((tile) => {
    tile.addEventListener("pointermove", (event) => {
      if (event.pointerType !== "mouse") return;

      const bounds = tile.getBoundingClientRect();
      tile.style.setProperty("--sx", `${(event.clientX - bounds.left).toFixed(0)}px`);
      tile.style.setProperty("--sy", `${(event.clientY - bounds.top).toFixed(0)}px`);
    });
  });

  window.addEventListener("pointermove", (event) => {
    if (!cursorGlow || event.pointerType !== "mouse") return;

    cursorGlow.classList.add("is-on");
    cursorGlow.style.setProperty("--gx", `${event.clientX}px`);
    cursorGlow.style.setProperty("--gy", `${event.clientY}px`);
  }, { passive: true });
}

/* ------------------------------------------------------------
   Project screenshots: if the file is missing, show the built mockup instead
------------------------------------------------------------ */
document.querySelectorAll(".mk-shot").forEach((img) => {
  const markMissing = () => img.classList.add("is-missing");

  img.addEventListener("error", markMissing);
  if (img.complete && img.naturalWidth === 0) markMissing();
});

/* ------------------------------------------------------------
   Stack map: one group lights up at a time
   Cycles on its own while in view; hovering takes over and stops it.
------------------------------------------------------------ */
const stackLab = document.querySelector(".stack-lab");

if (stackLab) {
  const groupNames = ["frontend", "backend", "workflow", "documents"];
  const groupEls = stackLab.querySelectorAll("[data-g]");
  let cycleTimer = null;
  let cycleIndex = 0;
  let userTookOver = false;

  const setGroup = (name) => {
    groupEls.forEach((el) => {
      const on = el.dataset.g === name;
      el.classList.toggle("is-on", Boolean(name) && on);
      el.classList.toggle("is-dim", Boolean(name) && !on);
    });
  };

  const stopCycle = () => {
    window.clearInterval(cycleTimer);
    cycleTimer = null;
  };

  const startCycle = () => {
    if (reduceMotion || userTookOver || cycleTimer) return;
    setGroup(groupNames[cycleIndex]);
    cycleTimer = window.setInterval(() => {
      cycleIndex = (cycleIndex + 1) % groupNames.length;
      setGroup(groupNames[cycleIndex]);
    }, 3200);
  };

  stackLab.addEventListener("pointerover", (event) => {
    const el = event.target.closest("[data-g]");
    if (!el) return;
    userTookOver = true;
    stopCycle();
    setGroup(el.dataset.g);
  });

  stackLab.addEventListener("pointerleave", (event) => {
    // on touch screens the last tap stays selected
    if (event.pointerType !== "touch") setGroup(null);
  });

  if ("IntersectionObserver" in window) {
    new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          startCycle();
        } else {
          stopCycle();
          if (!userTookOver) setGroup(null);
        }
      });
    }, { threshold: 0.35 }).observe(stackLab);
  }
}

/* ------------------------------------------------------------
   Contact: copy the email address
------------------------------------------------------------ */
const copyButton = document.getElementById("copyEmail");
const copyStatus = document.getElementById("copyStatus");

if (copyButton) {
  let copyReset = null;

  const showCopied = (ok) => {
    copyButton.dataset.tip = ok ? "Copied" : "Press Ctrl+C";
    copyButton.classList.toggle("is-copied", ok);
    if (copyStatus) copyStatus.textContent = ok ? "Email address copied" : "Copy failed";
    window.clearTimeout(copyReset);
    copyReset = window.setTimeout(() => {
      copyButton.dataset.tip = "Copy email";
      copyButton.classList.remove("is-copied");
      if (copyStatus) copyStatus.textContent = "";
    }, 2000);
  };

  const fallbackCopy = (text) => {
    const field = document.createElement("textarea");
    field.value = text;
    field.setAttribute("readonly", "");
    field.style.cssText = "position:fixed;top:-100px;opacity:0";
    document.body.appendChild(field);
    field.select();
    let ok = false;
    try {
      ok = document.execCommand("copy");
    } catch (error) {
      ok = false;
    }
    field.remove();
    return ok;
  };

  copyButton.addEventListener("click", () => {
    const text = copyButton.dataset.copy;

    if (navigator.clipboard && window.isSecureContext) {
      navigator.clipboard.writeText(text).then(() => showCopied(true), () => showCopied(fallbackCopy(text)));
    } else {
      showCopied(fallbackCopy(text));
    }
  });
}

updateScroll();
