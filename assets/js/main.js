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

  function syncHeader() {
    if (!header || !hero) return;
    const heroBottom = hero.getBoundingClientRect().bottom;
    header.classList.toggle("scrolled", heroBottom <= header.offsetHeight + 10);
  }

  window.addEventListener("scroll", syncHeader, { passive: true });
  window.addEventListener("load", syncHeader);

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

    window.addEventListener("scroll", toggleScrollTop, { passive: true });
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

  function scrollspy() {
    const pos = window.scrollY + 80;
    navLinks.forEach((link) => {
      const sec = document.querySelector(link.hash);
      if (!sec) return;
      const active = pos >= sec.offsetTop && pos < sec.offsetTop + sec.offsetHeight;
      link.classList.toggle("active", active);
    });
  }

  window.addEventListener("scroll", scrollspy, { passive: true });
  window.addEventListener("load", scrollspy);

})();
