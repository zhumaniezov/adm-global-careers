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
  const progress = slider.querySelector("[data-slide-progress]");
  let index = 0;
  let preloaded = false;

  const bars = images.map((_, i) => {
    const bar = document.createElement("button");
    bar.type = "button";
    bar.addEventListener("click", () => step(i - index));
    return bar;
  });
  progress.replaceChildren(...bars);

  function show(next, animate) {
    index = (next + images.length) % images.length;
    const alts = I18N.t("slides.alt");
    const swap = () => {
      img.src = images[index]; img.alt = alts[index];
      num.textContent = String(index + 1);
      img.classList.remove("fading"); num.classList.remove("fading");
    };
    if (animate) { img.classList.add("fading"); num.classList.add("fading"); setTimeout(swap, 180); } else swap();
    text.textContent = I18N.t("slides")[index];
    bars.forEach((bar, i) => {
      bar.setAttribute("aria-current", String(i === index));
      bar.setAttribute("aria-label", (i + 1) + " / " + images.length);
    });
  }

  function step(delta) {
    if (!preloaded) { preloaded = true; images.forEach(src => { new Image().src = src; }); }
    if (delta) show(index + delta, true);
  }

  slider.querySelector("[data-slide-prev]").addEventListener("click", () => step(-1));
  slider.querySelector("[data-slide-next]").addEventListener("click", () => step(1));
  I18N.onChange(() => show(index, false));
  show(0, false);
})();
