/* KAGAWA — interaction layer */
(() => {
  const header = document.querySelector(".site-header");
  const toggle = document.querySelector(".menu-toggle");
  const menu = document.querySelector(".nav-menu");

  // Mobile navigation
  toggle?.addEventListener("click", () => {
    const open = menu.classList.toggle("open");
    toggle.setAttribute("aria-expanded", String(open));
  });
  document.querySelectorAll(".nav-menu a").forEach(link => {
    link.addEventListener("click", () => {
      menu?.classList.remove("open");
      toggle?.setAttribute("aria-expanded", "false");
    });
  });

  // Header depth on scroll
  const updateHeader = () => header?.classList.toggle("scrolled", window.scrollY > 40);
  updateHeader();
  window.addEventListener("scroll", updateHeader, { passive: true });

  // Reveal sections/elements when entering viewport
  const revealTargets = [
    ".intro-grid > div", ".about-grid > *", ".section-head > *",
    ".service-card", ".why-grid > *", ".why-list > div",
    ".project", ".process-item", ".cta-box > *", ".contact-details > div"
  ];
  revealTargets.forEach(selector => {
    document.querySelectorAll(selector).forEach((el, index) => {
      el.classList.add(index % 2 ? "reveal-right" : "reveal");
      el.style.transitionDelay = `${Math.min(index * 55, 330)}ms`;
    });
  });

  const revealObserver = new IntersectionObserver((entries, obs) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add("is-visible");
        obs.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12, rootMargin: "0px 0px -40px" });

  document.querySelectorAll(".reveal,.reveal-left,.reveal-right").forEach(el => revealObserver.observe(el));

  // Active navigation
  const sections = [...document.querySelectorAll("main section[id]")];
  const links = [...document.querySelectorAll(".nav-menu a")];
  const navObserver = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (!entry.isIntersecting) return;
      links.forEach(link => link.classList.toggle(
        "active", link.getAttribute("href") === `#${entry.target.id}`
      ));
    });
  }, { rootMargin: "-35% 0px -55% 0px" });
  sections.forEach(section => navObserver.observe(section));

  // Subtle cursor spotlight on desktop
  if (window.matchMedia("(pointer:fine)").matches) {
    const glow = document.createElement("div");
    glow.className = "cursor-glow";
    document.body.appendChild(glow);

    let targetX = -400, targetY = -400, x = targetX, y = targetY;
    window.addEventListener("pointermove", e => {
      targetX = e.clientX; targetY = e.clientY;
    }, { passive: true });

    const move = () => {
      x += (targetX - x) * 0.12;
      y += (targetY - y) * 0.12;
      glow.style.left = `${x}px`;
      glow.style.top = `${y}px`;
      requestAnimationFrame(move);
    };
    move();
  }

  // Tiny parallax for hero content
  const hero = document.querySelector(".hero");
  const heroContent = document.querySelector(".hero-content");
  if (hero && heroContent && window.matchMedia("(pointer:fine)").matches) {
    window.addEventListener("scroll", () => {
      const y = Math.min(window.scrollY, 500);
      heroContent.style.transform = `translateY(${y * 0.08}px)`;
    }, { passive: true });
  }

  // Page loader
  const loader = document.createElement("div");
  loader.className = "page-loader";
  loader.innerHTML = `
    <div class="loader-inner">
      <div class="loader-k">K</div>
      <div class="loader-line"></div>
      <small>BENGKEL LAS KAGAWA</small>
    </div>`;
  document.body.prepend(loader);

  window.addEventListener("load", () => {
    setTimeout(() => loader.classList.add("done"), 450);
  });

  // Prevent the placeholder WhatsApp number from silently looking real.
  document.querySelectorAll('a[href*="6280000000000"]').forEach(link => {
    link.addEventListener("click", event => {
      if (link.href.includes("6280000000000")) {
        event.preventDefault();
        alert("Nomor WhatsApp Kagawa belum diisi. Ganti nomor pada index.html sebelum website dipublikasikan.");
      }
    });
  });
})();
