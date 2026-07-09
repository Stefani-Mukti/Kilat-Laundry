/* ==========================================================================
   Main site behavior
   ========================================================================== */
(function () {
  /* Scroll-reveal for elements with .reveal */
  function initReveal() {
    const items = document.querySelectorAll(".reveal");
    if (!items.length) return;
    if (!("IntersectionObserver" in window)) {
      items.forEach((el) => el.classList.add("is-visible"));
      return;
    }
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
            io.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.15, rootMargin: "0px 0px -40px 0px" }
    );
    items.forEach((el) => io.observe(el));
  }

  /* Navbar background elevation on scroll */
  function initHeaderScroll() {
    const header = document.querySelector(".navbar");
    if (!header) return;
    const toggle = () => {
      header.style.boxShadow = window.scrollY > 8 ? "var(--shadow-sm)" : "none";
    };
    document.addEventListener("scroll", toggle, { passive: true });
    toggle();
  }

  /* FAQ accordion */
  function initAccordion() {
    document.querySelectorAll(".accordion-item__q").forEach((btn) => {
      btn.addEventListener("click", () => {
        const item = btn.closest(".accordion-item");
        const wasOpen = item.classList.contains("is-open");
        item.parentElement
          .querySelectorAll(".accordion-item")
          .forEach((i) => i.classList.remove("is-open"));
        if (!wasOpen) item.classList.add("is-open");
      });
    });
  }

  /* Contact form -> builds a WhatsApp message from the filled fields */
  function initContactForm() {
    const form = document.querySelector("[data-contact-form]");
    if (!form) return;

    form.addEventListener("submit", (e) => {
      e.preventDefault();
      let valid = true;

      form.querySelectorAll("[required]").forEach((field) => {
        const wrapper = field.closest(".form-field");
        if (!field.value.trim()) {
          wrapper.classList.add("has-error");
          valid = false;
        } else {
          wrapper.classList.remove("has-error");
        }
      });

      if (!valid) return;

      const name = form.querySelector("#name")?.value.trim() || "";
      const phone = form.querySelector("#phone")?.value.trim() || "";
      const address = form.querySelector("#address")?.value.trim() || "";
      const service = form.querySelector("#service")?.value.trim() || "";
      const message = form.querySelector("#message")?.value.trim() || "";

      const lines = [
        "Halo KilatLaundry, saya ingin memesan layanan antar-jemput.",
        `Nama: ${name}`,
        phone && `No. HP: ${phone}`,
        address && `Alamat: ${address}`,
        service && `Layanan: ${service}`,
        message && `Catatan: ${message}`,
      ].filter(Boolean);

      const text = encodeURIComponent(lines.join("\n"));
      const number = window.SITE_CONFIG?.whatsappNumber || "";
      window.open(`https://wa.me/${number}?text=${text}`, "_blank", "noopener");
    });
  }

  function init() {
    initReveal();
    initHeaderScroll();
    initAccordion();
    initContactForm();
  }

  document.addEventListener("components:ready", init);
})();
