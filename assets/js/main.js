(function () {
  "use strict";

  /* ── Intro screen ────────────────────────── */
  const body      = document.body;
  const introBtn  = document.getElementById("intro-enter");
  const hero      = document.getElementById("hero");

  function revealSite() {
    if (!body.classList.contains("intro-active")) return;
    body.classList.remove("intro-active");
    body.classList.add("intro-complete");
    setTimeout(() => {
      if (hero) hero.scrollIntoView({ behavior: "smooth", block: "start" });
    }, 300);
  }

  if (introBtn) introBtn.addEventListener("click", (e) => { e.preventDefault(); revealSite(); });

  window.addEventListener("load", () => {
    if (window.location.hash && window.location.hash !== "#intro") revealSite();
  });

  /* ── Preloader ───────────────────────────── */
  const preloader = document.getElementById("preloader");
  if (preloader) window.addEventListener("load", () => preloader.remove());

  /* ── Header: transparent ↔ solid ────────── */
  const header = document.getElementById("header");
  let heroSwitchPoint = 0;

  function refreshMeasurements() {
    if (!header || !hero) return;
    heroSwitchPoint = Math.max(0, hero.offsetTop + hero.offsetHeight - header.offsetHeight - 10);
  }

  function syncHeader() {
    if (!header || !hero) return;
    header.classList.toggle("scrolled", window.scrollY >= heroSwitchPoint);
  }

  window.addEventListener("load", () => {
    refreshMeasurements();
    syncHeader();
  });

  /* ── Mobile nav toggle ───────────────────── */
  const navToggle = document.getElementById("navToggle");
  const navmenu   = document.getElementById("navmenu");
  const navClose  = document.getElementById("navClose");
  const navBackdrop = document.getElementById("navBackdrop");
  const toggleIcon = navToggle ? navToggle.querySelector("i") : null;

  function closeNav() {
    if (!navmenu) return;
    navmenu.classList.remove("open");
    if (navBackdrop) navBackdrop.classList.remove("open");
    body.classList.remove("nav-open");
    if (toggleIcon) { toggleIcon.classList.add("bi-list"); toggleIcon.classList.remove("bi-x"); }
  }

  function openNav() {
    if (!navmenu) return;
    navmenu.classList.add("open");
    if (navBackdrop) navBackdrop.classList.add("open");
    body.classList.add("nav-open");
    if (toggleIcon) { toggleIcon.classList.add("bi-x"); toggleIcon.classList.remove("bi-list"); }
  }

  if (navToggle) {
    navToggle.addEventListener("click", () => {
      if (navmenu && navmenu.classList.contains("open")) closeNav();
      else openNav();
    });
  }

  if (navClose) navClose.addEventListener("click", closeNav);
  if (navBackdrop) navBackdrop.addEventListener("click", closeNav);

  /* Close mobile nav on link click */
  document.querySelectorAll("#navmenu a").forEach((link) =>
    link.addEventListener("click", closeNav)
  );

  /* ── Scroll-top button ───────────────────── */
  const scrollTop = document.getElementById("scroll-top");

  if (scrollTop) {
    scrollTop.addEventListener("click", (e) => {
      e.preventDefault();
      window.scrollTo({ top: 0, behavior: "smooth" });
    });

    function toggleScrollTop() {
      scrollTop.classList.toggle("active", window.scrollY > 120);
    }

    window.addEventListener("load", toggleScrollTop);
  }

  /* ── AOS ─────────────────────────────────── */
  window.addEventListener("load", () => {
    if (typeof AOS !== "undefined") {
      AOS.init({ duration: 550, easing: "ease-out", once: true, offset: 60 });
    }
  });

  /* ── GLightbox ───────────────────────────── */
  window.addEventListener("load", () => {
    if (typeof GLightbox !== "undefined") GLightbox({ selector: ".glightbox" });
  });

  /* ── Navmenu scrollspy ───────────────────── */
  const navLinks = document.querySelectorAll(".navmenu a[href^='#']");
  let navItems = [];

  function refreshNavItems() {
    navItems = Array.from(navLinks).map((link) => {
      const sec = document.querySelector(link.hash);
      if (!sec) return null;
      return {
        link,
        top: sec.offsetTop,
        bottom: sec.offsetTop + sec.offsetHeight
      };
    }).filter(Boolean);
  }

  function scrollspy() {
    const pos = window.scrollY + 80;
    navItems.forEach((item) => {
      const active = pos >= item.top && pos < item.bottom;
      item.link.classList.toggle("active", active);
    });
  }

  window.addEventListener("load", () => {
    refreshNavItems();
    scrollspy();
  });

  let ticking = false;

  function onScroll() {
    if (ticking) return;
    ticking = true;
    window.requestAnimationFrame(() => {
      syncHeader();
      if (scrollTop) scrollTop.classList.toggle("active", window.scrollY > 120);
      scrollspy();
      ticking = false;
    });
  }

  window.addEventListener("scroll", onScroll, { passive: true });
  window.addEventListener("resize", () => {
    refreshMeasurements();
    refreshNavItems();
    onScroll();
  }, { passive: true });

})();
