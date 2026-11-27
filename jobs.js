(() => {
  "use strict";

  const I18N = window.I18N;
  const search = document.querySelector("#vacancy-search");
  const citySelect = document.querySelector("#vacancy-city");
  const filters = document.querySelector("#vacancy-filters");
  const list = document.querySelector("#vacancy-list");
  const count = document.querySelector("#vacancy-count");
  const status = document.querySelector("#vacancy-status");
  const more = document.querySelector("#show-more");
  const share = document.querySelector("#share-link");
  const source = window.ADM_VACANCIES;
  const employerUrl = "https://hh.uz/search/vacancy?employer_id=3769561&employer_id=4587957&employer_id=12456173&employer_id=11043737";
  const pageSize = 8;
  const NEW_DAYS = 3;

  // Directions: value stored in jobs-data.js -> slug used in URLs and translations
  const CATEGORIES = [
    { value: "Производство", slug: "production", color: "#7b5cf0" },
    { value: "Продажи и сервис", slug: "sales", color: "#2f8bff" },
    { value: "Маркетинг", slug: "marketing", color: "#ff5c9a" },
    { value: "IT", slug: "it", color: "#f5a623" },
    { value: "Лизинг", slug: "leasing", color: "#e75136" },
    { value: "Офис", slug: "office", color: "#2fae4e" }
  ];
  const bySlug = Object.fromEntries(CATEGORIES.map(c => [c.slug, c]));
  const byValue = Object.fromEntries(CATEGORIES.map(c => [c.value, c]));
  const CITY_SLUGS = {
    "Ташкент": "tashkent", "Джизак": "jizzakh", "Самарканд": "samarkand", "Наманган": "namangan",
    "Нурафшон": "nurafshon", "Фергана": "fergana", "Андижан": "andijan", "Нукус": "nukus",
    "Бухара": "bukhara", "Алматы": "almaty"
  };
  const citySlug = city => CITY_SLUGS[city] || city;

  let selected = "all";
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
    status.textContent = I18N.t("status.none");
    list.replaceChildren(externalLink(employerUrl, "jobs-reset", "hh.uz ↗"));
    filters.hidden = true;
    more.hidden = true;
    share.hidden = true;
    search.disabled = true;
    citySelect.disabled = true;
    return;
  }

  // Newest first
  const jobs = [...source.jobs].sort((a, b) => String(b.published || "").localeCompare(String(a.published || "")));
  const today = new Date();

  function isNew(job) {
    if (!job.published) return false;
    const days = (today - new Date(job.published + "T00:00:00+05:00")) / 864e5;
    return days >= 0 && days < NEW_DAYS;
  }

  function millions(value) {
    const m = value / 1e6;
    const rounded = m >= 10 ? Math.round(m) : Math.round(m * 10) / 10;
    return String(rounded).replace(".", ",");
  }

  function salaryText(s) {
    if (!s || (s.currency && s.currency !== "UZS")) return "";
    if (s.from && s.to && s.from !== s.to) return I18N.t("salary.range", millions(s.from), millions(s.to));
    if (s.from) return I18N.t("salary.from", millions(s.from));
    if (s.to) return I18N.t("salary.to", millions(s.to));
    return "";
  }

  function normalize(text) {
    return String(text || "").trim().toLocaleLowerCase("ru").replaceAll("ё", "е");
  }

  const catLabel = slug => I18N.t("cat." + slug);

  function jobCard(job) {
    const card = externalLink("https://hh.uz/vacancy/" + job.id, "job-card");
    const cat = byValue[job.category];
    card.style.setProperty("--dot", cat ? cat.color : "#999");
    const main = element("div", "job-card-main");
    const top = element("div", "job-top");
    top.append(element("span", "job-category", cat ? catLabel(cat.slug) : job.category));
    if (isNew(job)) top.append(element("span", "job-new", I18N.t("new")));
    const title = element("h3", "job-title", job.title);
    main.append(top, title);
    const pay = salaryText(job.salary);
    if (pay) {
      const salary = element("p", "job-salary", pay);
      salary.title = I18N.t(job.salary.gross ? "salary.gross" : "salary.net");
      main.append(salary);
    }
    const meta = element("div", "job-meta");
    if (job.company) meta.append(element("span", "job-company", job.company));
    meta.append(element("span", "", I18N.city(job.city)));
    if (job.experience) meta.append(element("span", "", I18N.experience(job.experience)));
    main.append(meta);
    const arrow = element("span", "job-arrow", "↗");
    arrow.setAttribute("aria-hidden", "true");
    card.append(main, arrow);
    return card;
  }

  // ---------- cities ----------
  const cityTotals = new Map();
  for (const job of jobs) cityTotals.set(job.city, (cityTotals.get(job.city) || 0) + 1);
  const cities = [...cityTotals.entries()].sort((a, b) => b[1] - a[1] || a[0].localeCompare(b[0], "ru"));

  // ---------- URL state ----------
  function readUrl() {
    const params = new URLSearchParams(location.search);
    const dir = params.get("dir");
    selected = dir && bySlug[dir] ? dir : "all";
    const city = params.get("city");
    const match = [...cityTotals.keys()].find(c => citySlug(c) === city || c === city);
    citySelect.value = match || "";
    search.value = params.get("q") || "";
    return Boolean(dir || city || params.get("q"));
  }

  function writeUrl() {
    const url = new URL(location.href);
    const set = (key, value) => (value ? url.searchParams.set(key, value) : url.searchParams.delete(key));
    set("dir", selected === "all" ? "" : selected);
    set("city", citySelect.value ? citySlug(citySelect.value) : "");
    set("q", search.value.trim());
    if (url.href !== location.href) history.replaceState(null, "", url);
  }

  // ---------- rendering ----------
  function renderCities() {
    const current = citySelect.value;
    const all = element("option", "", I18N.t("city.all"));
    all.value = "";
    const options = cities.map(([city, total]) => {
      const option = element("option", "", I18N.city(city) + " · " + total);
      option.value = city;
      return option;
    });
    citySelect.replaceChildren(all, ...options);
    citySelect.value = current;
  }

  function renderChips() {
    const buttons = ["all", ...CATEGORIES.map(c => c.slug)].map(slug => {
      const button = element("button", "job-filter", catLabel(slug));
      button.type = "button";
      button.dataset.slug = slug;
      button.append(element("small", ""));
      button.addEventListener("click", () => { selected = slug; limit = pageSize; render(); });
      return button;
    });
    filters.replaceChildren(...buttons);
  }

  function renderStatics() {
    status.textContent = I18N.t("status", I18N.date(source.updated));
    for (const node of document.querySelectorAll("[data-total-jobs]")) node.textContent = String(jobs.length);
    for (const link of document.querySelectorAll("[data-job-direction]")) {
      const total = jobs.filter(job => job.category === link.dataset.jobDirection).length;
      const label = link.querySelector("[data-direction-count]");
      if (label) label.textContent = total ? I18N.t("dir.count", total) : I18N.t("dir.soon");
    }
  }

  function emptyState() {
    const box = element("div", "jobs-empty");
    if (jobs.length === 0) {
      box.append(element("p", "", I18N.t("empty.none")), externalLink(employerUrl, "jobs-reset", I18N.t("empty.check")));
    } else {
      const button = element("button", "jobs-reset", I18N.t("empty.reset"));
      button.type = "button";
      button.addEventListener("click", reset);
      box.append(element("p", "", I18N.t("empty.filter")), button);
    }
    return box;
  }

  function reset() {
    selected = "all";
    search.value = "";
    citySelect.value = "";
    limit = pageSize;
    render();
    search.focus();
  }

  function render() {
    const words = normalize(search.value).split(/\s+/).filter(Boolean);
    const city = citySelect.value;
    const base = jobs.filter(job => {
      if (city && job.city !== city) return false;
      const haystack = normalize([job.title, job.city, I18N.city(job.city), job.category, job.experience, job.company].join(" "));
      return words.every(word => haystack.includes(word));
    });
    const matches = base.filter(job => selected === "all" || byValue[job.category]?.slug === selected);

    for (const button of filters.children) {
      const slug = button.dataset.slug;
      button.setAttribute("aria-pressed", String(slug === selected));
      const n = slug === "all" ? base.length : base.filter(job => byValue[job.category]?.slug === slug).length;
      button.querySelector("small").textContent = String(n);
      button.classList.toggle("is-empty", n === 0);
    }
    count.textContent = I18N.t("count", matches.length);
    const cards = matches.slice(0, limit).map(jobCard);
    list.replaceChildren(...(cards.length ? cards : [emptyState()]));
    more.hidden = matches.length <= limit;
    if (!more.hidden) more.textContent = I18N.t("more", Math.min(pageSize, matches.length - limit));
    writeUrl();
  }

  // ---------- events ----------
  for (const link of document.querySelectorAll("[data-job-direction]")) {
    link.addEventListener("click", () => {
      search.value = "";
      citySelect.value = "";
      selected = byValue[link.dataset.jobDirection]?.slug || "all";
      limit = pageSize;
      render();
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
  share.addEventListener("click", async () => {
    writeUrl();
    const label = share.querySelector("[data-i18n]");
    try {
      await navigator.clipboard.writeText(location.href);
      const before = label.innerHTML;
      label.textContent = I18N.t("share.done");
      share.classList.add("done");
      setTimeout(() => { label.innerHTML = before; share.classList.remove("done"); }, 1800);
    } catch (e) {
      window.prompt("", location.href);
    }
  });

  I18N.onChange(() => {
    renderCities();
    renderChips();
    renderStatics();
    render();
  });

  renderCities();
  const filtered = readUrl();
  renderChips();
  renderStatics();
  render();
  if (filtered && !location.hash) {
    requestAnimationFrame(() => document.querySelector("#vacancies").scrollIntoView());
  }
})();
