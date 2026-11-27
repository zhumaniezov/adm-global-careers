(() => {
  "use strict";

  const I18N = window.I18N;
  const top = document.querySelector("#top");
  const toTop = document.querySelector("#to-top");

  // Header shadow and "back to top" button
  const onScroll = () => {
    const y = window.scrollY;
    top.classList.toggle("scrolled", y > 8);
    toTop.classList.toggle("visible", y > 900);
  };
  window.addEventListener("scroll", onScroll, { passive: true });
  onScroll();

  // Mobile menu
  const burger = document.querySelector(".burger");
  const nav = document.querySelector("#main-nav");
  function setMenu(open) {
    top.classList.toggle("menu-open", open);
    burger.setAttribute("aria-expanded", String(open));
    burger.setAttribute("aria-label", I18N.t(open ? "menu.close" : "menu.open"));
    document.body.classList.toggle("no-scroll", open);
  }
  burger.addEventListener("click", () => setMenu(!top.classList.contains("menu-open")));
  nav.addEventListener("click", event => { if (event.target.closest("a")) setMenu(false); });
  document.addEventListener("keydown", event => {
    if (event.key === "Escape" && top.classList.contains("menu-open")) { setMenu(false); burger.focus(); }
  });
  window.matchMedia("(min-width: 861px)").addEventListener("change", e => { if (e.matches) setMenu(false); });

  // "Работа в ADM" slider
  const slider = document.querySelector("[data-slider]");
  if (!slider) return;
  const images = ["assets/production-line.webp", "assets/factory.webp", "assets/assembly-team.webp", "assets/portrait.webp"];
  const img = slider.querySelector("[data-slide-img]");
  const num = slider.querySelector("[data-slide-num]");
  const text = slider.querySelector("[data-slide-text]");
  const count = slider.querySelector("[data-slide-count]");
  let index = 0;
  let preloaded = false;

  function show(next, animate) {
    index = (next + images.length) % images.length;
    const alts = I18N.t("slides.alt");
    const swap = () => { img.src = images[index]; img.alt = alts[index]; img.classList.remove("fading"); };
    if (animate) { img.classList.add("fading"); setTimeout(swap, 180); } else swap();
    num.textContent = String(index + 1);
    text.textContent = I18N.t("slides")[index];
    count.textContent = (index + 1) + " / " + images.length;
  }

  function step(delta) {
    if (!preloaded) { preloaded = true; images.forEach(src => { new Image().src = src; }); }
    show(index + delta, true);
  }

  slider.querySelector("[data-slide-prev]").addEventListener("click", () => step(-1));
  slider.querySelector("[data-slide-next]").addEventListener("click", () => step(1));
  I18N.onChange(() => show(index, false));
  show(0, false);
})();
