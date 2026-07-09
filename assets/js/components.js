/* ==========================================================================
   Component loader
   Fetches the shared navbar, footer and floating WhatsApp button fragments
   from /components and injects them into every page. Requires the site to
   be served over http(s) — see README.md if you're opening files directly.
   ========================================================================== */
(function () {
  const CURRENT_PAGE = document.body.dataset.page || "index";

  async function loadFragment(url, mountSelector) {
    const mount = document.querySelector(mountSelector);
    if (!mount) return;
    try {
      const res = await fetch(url, { cache: "no-store" });
      if (!res.ok) throw new Error(res.status);
      mount.innerHTML = await res.text();
    } catch (err) {
      console.warn(
        `[KilatLaundry] Gagal memuat ${url}. Jalankan situs lewat local server ` +
        `(mis. "npx serve" atau ekstensi Live Server), bukan langsung dari file://.`,
        err
      );
    }
  }

  function setActiveNavLinks() {
    document.querySelectorAll("[data-nav-menu] a[data-page]").forEach((link) => {
      if (link.dataset.page === CURRENT_PAGE) {
        link.classList.add("is-active");
        link.setAttribute("aria-current", "page");
      }
    });
  }

  function wireWaLinks() {
    if (!window.SITE_CONFIG) return;
    document.querySelectorAll("[data-wa-link]").forEach((el) => {
      const context = el.dataset.waLink || "default";
      el.setAttribute("href", window.SITE_CONFIG.waLink(context));
    });
  }

  function fillDynamicData() {
    if (!window.SITE_CONFIG) return;
    const c = window.SITE_CONFIG;
    document.querySelectorAll("[data-email]").forEach((el) => {
      el.textContent = c.email;
      el.setAttribute("href", `mailto:${c.email}`);
    });
    document.querySelectorAll("[data-address]").forEach((el) => (el.textContent = c.address));
    document.querySelectorAll("[data-hours-weekday]").forEach((el) => (el.textContent = c.hoursWeekday));
    document.querySelectorAll("[data-year]").forEach((el) => (el.textContent = new Date().getFullYear()));
    document.querySelectorAll('[data-social="instagram"]').forEach((el) => el.setAttribute("href", c.instagram));
    document.querySelectorAll('[data-social="facebook"]').forEach((el) => el.setAttribute("href", c.facebook));
    document.querySelectorAll('[data-social="tiktok"]').forEach((el) => el.setAttribute("href", c.tiktok));
  }

  function wireMobileMenu() {
    const burger = document.querySelector("[data-burger]");
    const drawer = document.querySelector("[data-drawer]");
    const overlay = document.querySelector("[data-overlay]");
    if (!burger || !drawer || !overlay) return;

    function openMenu() {
      drawer.classList.add("is-open");
      overlay.classList.add("is-open");
      drawer.setAttribute("aria-hidden", "false");
      burger.setAttribute("aria-expanded", "true");
      document.body.classList.add("no-scroll");
    }
    function closeMenu() {
      drawer.classList.remove("is-open");
      overlay.classList.remove("is-open");
      drawer.setAttribute("aria-hidden", "true");
      burger.setAttribute("aria-expanded", "false");
      document.body.classList.remove("no-scroll");
    }

    burger.addEventListener("click", () => {
      const isOpen = drawer.classList.contains("is-open");
      isOpen ? closeMenu() : openMenu();
    });
    overlay.addEventListener("click", closeMenu);
    drawer.querySelectorAll("a").forEach((a) => a.addEventListener("click", closeMenu));
    document.addEventListener("keydown", (e) => {
      if (e.key === "Escape") closeMenu();
    });
  }

  async function init() {
    await Promise.all([
      loadFragment("components/navbar.html", "#navbar-root"),
      loadFragment("components/footer.html", "#footer-root"),
      loadFragment("components/floating-wa.html", "#wa-float-root"),
    ]);
    setActiveNavLinks();
    wireWaLinks();
    fillDynamicData();
    wireMobileMenu();
    document.dispatchEvent(new CustomEvent("components:ready"));
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", init);
  } else {
    init();
  }
})();
