(() => {
  "use strict";

  // Header shadow after scrolling
  const top = document.querySelector("#top");
  const onScroll = () => top && top.classList.toggle("scrolled", window.scrollY > 8);
  window.addEventListener("scroll", onScroll, { passive: true });
  onScroll();

  // "Работа в ADM" slider
  const slider = document.querySelector("[data-slider]");
  if (!slider) return;
  const slides = [
    { img: "assets/production-line.webp", alt: "Сборочная линия завода ADM Jizzakh",
      text: "Собираем автомобили на собственном заводе ADM Jizzakh — от кузова до финального контроля качества" },
    { img: "assets/factory.webp", alt: "Завод ADM Jizzakh с высоты",
      text: "Работаем по всему Узбекистану: заводы в Джизаке, Андижане и Нукусе, офисы и салоны в Ташкенте и регионах" },
    { img: "assets/assembly-team.webp", alt: "Команда на сборочной линии",
      text: "Выпускаем, продаём и обслуживаем автомобили шести мировых брендов — Kia, Chery, Haval, Changan, Tank и Geely" },
    { img: "assets/portrait.webp", alt: "Сотрудник ADM на производстве",
      text: "26 компаний группы — от заводов и дилерских центров до лизинга и IT: есть где расти и куда двигаться" }
  ];
  const img = slider.querySelector("[data-slide-img]");
  const num = slider.querySelector("[data-slide-num]");
  const text = slider.querySelector("[data-slide-text]");
  const count = slider.querySelector("[data-slide-count]");
  let index = 0;

  function show(next) {
    index = (next + slides.length) % slides.length;
    const slide = slides[index];
    img.classList.add("fading");
    setTimeout(() => {
      img.src = slide.img;
      img.alt = slide.alt;
      img.classList.remove("fading");
    }, 180);
    num.textContent = String(index + 1);
    text.textContent = slide.text;
    count.textContent = (index + 1) + " / " + slides.length;
  }

  slider.querySelector("[data-slide-prev]").addEventListener("click", () => show(index - 1));
  slider.querySelector("[data-slide-next]").addEventListener("click", () => show(index + 1));
  slides.forEach(s => { const preload = new Image(); preload.src = s.img; });
  show(0);
})();
