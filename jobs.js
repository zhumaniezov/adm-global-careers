(() => {
  "use strict";

  const search = document.querySelector("#vacancy-search");
  const citySelect = document.querySelector("#vacancy-city");
  const filters = document.querySelector("#vacancy-filters");
  const list = document.querySelector("#vacancy-list");
  const count = document.querySelector("#vacancy-count");
  const status = document.querySelector("#vacancy-status");
  const more = document.querySelector("#show-more");
  const source = window.ADM_VACANCIES;
  const employerUrl = "https://hh.uz/employer/3769561";  // fallback link
  const pageSize = 8;
  const colors = {
    "Производство": "#7b5cf0", "Продажи и сервис": "#2f8bff",
    "Маркетинг": "#ff5c9a", "IT": "#f5a623", "Офис": "#2fae4e"
  };
  let selected = "Все";
  let limit = pageSize;

  function element(tag, className, text) {
    const node = document.createElement(tag);
    if (className) node.className = className;
    if (text !== undefined) node.textContent = text;
    return node;
  }

  function externalLink(href, className, label) {
    const link = element("a", className, label);
    link.href = href;
    link.target = "_blank";
    link.rel = "noopener noreferrer";
    return link;
  }

  if (!source || !Array.isArray(source.jobs)) {
    status.textContent = "Актуальные позиции доступны на странице работодателя.";
    list.replaceChildren(externalLink(employerUrl, "jobs-reset", "Вакансии на hh.uz ↗"));
    count.textContent = "";
    filters.hidden = true;
    more.hidden = true;
    search.disabled = true;
    citySelect.disabled = true;
    return;
  }

  const jobs = source.jobs;
  const categories = ["Все", "Производство", "Продажи и сервис", "Маркетинг", "IT", "Офис"];
  const plurals = new Intl.PluralRules("ru");
  const vacancyWords = { one: "вакансия", few: "вакансии", many: "вакансий", other: "вакансии" };
  const plural = n => n + " " + vacancyWords[plurals.select(n)];
  const checked = new Date(source.updated + "T12:00:00Z").toLocaleDateString("ru-RU", {
    day: "numeric", month: "long", year: "numeric", timeZone: "UTC"
  });
  status.textContent = "Обновлено по данным hh.uz " + checked;

  // Total counter in the stats block
  for (const node of document.querySelectorAll("[data-total-jobs]")) node.textContent = String(jobs.length);

  // City dropdown, most frequent first
  const cityTotals = new Map();
  for (const job of jobs) cityTotals.set(job.city, (cityTotals.get(job.city) || 0) + 1);
  [...cityTotals.entries()].sort((a, b) => b[1] - a[1] || a[0].localeCompare(b[0], "ru"))
    .forEach(([city, total]) => {
      const option = element("option", "", city + " · " + total);
      option.value = city;
      citySelect.append(option);
    });

  function normalize(text) {
    return String(text || "").trim().toLocaleLowerCase("ru").replaceAll("ё", "е");
  }

  function jobCard(job) {
    const card = externalLink("https://hh.uz/vacancy/" + job.id, "job-card");
    card.style.setProperty("--dot", colors[job.category] || "#999");
    const main = element("div", "job-card-main");
    const group = element("span", "job-category", job.category);
    const title = element("h3", "job-title", job.title);
    const meta = element("div", "job-meta");
    if (job.company) meta.append(element("span", "job-company", job.company));
    meta.append(element("span", "", job.city));
    if (job.experience) meta.append(element("span", "", job.experience));
    const arrow = element("span", "job-arrow", "↗");
    arrow.setAttribute("aria-hidden", "true");
    main.append(group, title, meta);
    card.append(main, arrow);
    return card;
  }

  function reset() {
    selected = "Все";
    search.value = "";
    citySelect.value = "";
    limit = pageSize;
    render();
    search.focus();
  }

  function selectCategory(category) {
    selected = category;
    limit = pageSize;
    render();
  }

  function emptyState() {
    const box = element("div", "jobs-empty");
    if (jobs.length === 0) {
      box.append(element("p", "", "Сейчас открытых позиций нет — загляните позже."),
        externalLink(employerUrl, "jobs-reset", "Проверить на hh.uz ↗"));
    } else {
      const button = element("button", "jobs-reset", "Сбросить фильтры");
      button.type = "button";
      button.addEventListener("click", reset);
      box.append(element("p", "", "По вашему запросу ничего не нашлось."), button);
    }
    return box;
  }

  function matchesText(job, words) {
    const haystack = normalize([job.title, job.city, job.category, job.experience, job.company].join(" "));
    return words.every(word => haystack.includes(word));
  }

  function render() {
    const words = normalize(search.value).split(/\s+/).filter(Boolean);
    const city = citySelect.value;
    const base = jobs.filter(job => (!city || job.city === city) && matchesText(job, words));
    const matches = base.filter(job => selected === "Все" || selected === job.category);

    for (const button of filters.children) {
      const category = button.dataset.category;
      button.setAttribute("aria-pressed", String(category === selected));
      const n = category === "Все" ? base.length : base.filter(job => job.category === category).length;
      button.querySelector("small").textContent = String(n);
      button.classList.toggle("is-empty", n === 0);
    }
    count.textContent = plural(matches.length);
    const cards = matches.slice(0, limit).map(jobCard);
    list.replaceChildren(...(cards.length ? cards : [emptyState()]));
    more.hidden = matches.length <= limit;
    if (!more.hidden) more.textContent = "Показать ещё " + Math.min(pageSize, matches.length - limit);
  }

  for (const category of categories) {
    const button = element("button", "job-filter", category);
    button.type = "button";
    button.dataset.category = category;
    button.append(element("small", ""));
    button.addEventListener("click", () => selectCategory(category));
    filters.append(button);
  }

  for (const link of document.querySelectorAll("[data-job-direction]")) {
    const category = link.dataset.jobDirection;
    const total = jobs.filter(job => job.category === category).length;
    const label = link.querySelector("[data-direction-count]");
    if (label) label.textContent = total ? plural(total) : "Скоро новые вакансии";
    link.addEventListener("click", () => {
      search.value = "";
      citySelect.value = "";
      selectCategory(category);
    });
  }

  search.addEventListener("input", () => { limit = pageSize; render(); });
  citySelect.addEventListener("change", () => { limit = pageSize; render(); });
  more.addEventListener("click", () => {
    const previous = limit;
    limit += pageSize;
    render();
    list.children[previous]?.focus({ preventScroll: true });
  });
  render();
})();
