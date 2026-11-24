(() => {
  "use strict";

  const search = document.querySelector("#vacancy-search");
  const filters = document.querySelector("#vacancy-filters");
  const list = document.querySelector("#vacancy-list");
  const count = document.querySelector("#vacancy-count");
  const status = document.querySelector("#vacancy-status");
  const more = document.querySelector("#show-more");
  const source = window.ADM_VACANCIES;
  const employerUrl = "https://hh.uz/employer/3769561";
  const pageSize = 6;
  let selected = "Все";
  let limit = pageSize;

  function element(tag, className, text) {
    const node = document.createElement(tag);
    node.className = className;
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
    list.replaceChildren(externalLink(employerUrl, "jobs-reset", "Вакансии ROODELL на hh.uz ↗"));
    count.textContent = "";
    filters.hidden = true;
    more.hidden = true;
    search.disabled = true;
    return;
  }

  const jobs = source.jobs;
  const categories = ["Все", "Производство", "Продажи и сервис", "Маркетинг", "IT", "Офис"];
  const plurals = new Intl.PluralRules("ru");
  const vacancyWords = { one: "вакансия", few: "вакансии", many: "вакансий" };
  const checked = new Date(source.updated + "T12:00:00Z").toLocaleDateString("ru-RU", {
    day: "numeric", month: "long", year: "numeric", timeZone: "UTC"
  });
  status.textContent = "По данным hh.uz на " + checked;

  function normalize(text) {
    return text.trim().toLocaleLowerCase("ru").replaceAll("ё", "е");
  }

  function jobCard(job) {
    const card = externalLink("https://hh.uz/vacancy/" + job.id, "job-card");
    const main = element("div", "job-card-main");
    const title = element("h3", "job-title", job.title);
    const group = element("span", "job-category", job.category);
    const meta = element("div", "job-meta");
    meta.append(element("span", "job-location", job.city));
    if (job.experience) meta.append(element("span", "job-experience", job.experience));
    const arrow = element("span", "job-arrow", "↗");
    arrow.setAttribute("aria-hidden", "true");
    main.append(group, title, meta);
    card.append(main, arrow);
    return card;
  }

  function reset() {
    selected = "Все";
    search.value = "";
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
      box.append(element("p", "", "Сейчас в каталоге нет открытых позиций."),
        externalLink(employerUrl, "jobs-reset", "Проверить на hh.uz ↗"));
    } else {
      const button = element("button", "jobs-reset", "Сбросить фильтры");
      button.type = "button";
      button.addEventListener("click", reset);
      box.append(element("p", "", "Вакансий по вашему запросу не найдено."), button);
    }
    return box;
  }

  function render() {
    const words = normalize(search.value).split(/\s+/).filter(Boolean);
    const matches = jobs.filter(job => {
      const haystack = normalize([job.title, job.city, job.category, job.experience].join(" "));
      return (selected === "Все" || selected === job.category) && words.every(word => haystack.includes(word));
    });
    for (const button of filters.children) {
      button.setAttribute("aria-pressed", String(button.dataset.category === selected));
    }
    count.textContent = String(matches.length);
    const cards = matches.slice(0, limit).map(jobCard);
    list.replaceChildren(...(cards.length ? cards : [emptyState()]));
    more.hidden = matches.length <= limit;
  }

  for (const category of categories) {
    const button = element("button", "job-filter", category);
    button.type = "button";
    button.dataset.category = category;
    button.addEventListener("click", () => selectCategory(category));
    filters.append(button);
  }
  for (const link of document.querySelectorAll("[data-job-direction]")) {
    const category = link.dataset.jobDirection;
    const total = jobs.filter(job => job.category === category).length;
    const label = link.querySelector("[data-direction-count]");
    if (label) label.textContent = total + " " + vacancyWords[plurals.select(total)];
    link.addEventListener("click", () => {
      search.value = "";
      selectCategory(category);
    });
  }
  search.addEventListener("input", () => {
    limit = pageSize;
    render();
  });
  more.addEventListener("click", () => {
    const previous = limit;
    limit += pageSize;
    render();
    list.children[previous]?.focus({ preventScroll: true });
  });
  render();
})();
