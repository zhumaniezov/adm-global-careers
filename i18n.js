/* RU/UZ language support.
   Static Russian text lives in index.html; elements marked with data-i18n get the
   Uzbek string from UZ below. Strings built in JavaScript use I18N.t(key). */
(() => {
  "use strict";

  const UZ = {
    "skip": "Vakansiyalarga o‘tish",
    "brand.aria": "ADM GLOBAL, bosh sahifa",
    "nav.aria": "Asosiy navigatsiya",
    "nav.directions": "Yo‘nalishlar",
    "nav.vacancies": "Vakansiyalar",
    "nav.companies": "Kompaniyalar",
    "nav.life": "Ish haqida",
    "cta.find": "Vakansiya topish",
    "menu.open": "Menyuni ochish",
    "totop": "Yuqoriga",

    "hero.title": "ADM jamoasining<br>bir qismi bo‘ling",
    "hero.text": "Avtomobillar yig‘amiz, dilerlik tarmog‘ini rivojlantiramiz va&nbsp;O‘zbekiston avtosanoatini oldinga olib boramiz.",
    "hero.btn": "Vakansiyalarni ko‘rish",

    "dir.title": "Oltita yo‘nalish —<br>o‘zingiznikini toping",
    "dir.lead": "Biz avtomobillar ishlab chiqaramiz, sotamiz, ularga xizmat ko‘rsatamiz va&nbsp;lizingga beramiz. Buning uchun turli xil odamlar kerak — o‘zingizga yaqinini tanlang.",
    "dir.production": "Muhandislar, texnologlar, sifat nazorati va&nbsp;ta’minot — ADM Jizzakh zavodida",
    "dir.sales": "Avtosalonlar, servis, kafolat va&nbsp;call-markaz",
    "dir.it": "Dasturlash, 1C, qo‘llab-quvvatlash va&nbsp;infratuzilma",
    "dir.marketing": "Brendlar, tahlil, dizayn va&nbsp;tadbirlar",
    "dir.leasing": "FINCOM va&nbsp;FINCOM RENT kompaniyalarida avtolizing va&nbsp;avtomobil ijarasi",
    "dir.office": "Moliya, kadrlar, hujjat aylanishi va&nbsp;xaridlar",

    "cat.all": "Barchasi",
    "cat.production": "Ishlab chiqarish",
    "cat.sales": "Savdo va servis",
    "cat.marketing": "Marketing",
    "cat.it": "IT",
    "cat.leasing": "Lizing",
    "cat.office": "Ofis",

    "stats.title": "Biz faol o‘syapmiz",
    "stats.year": "tashkil etilgan yil —<br>o‘shandan beri faqat oldinga",
    "stats.companies": "guruh kompaniyalari —<br>zavoddan lizinggacha",
    "stats.dealers": "dilerlik markazlari<br>butun O‘zbekiston bo‘ylab",
    "stats.brands": "avtomobil brendi: Kia, Chery,<br>Haval, Changan, Tank va Geely",
    "stats.jobs": "ta ochiq vakansiya hozirning o‘zida",

    "vac.title": "Ochiq vakansiyalar",
    "vac.hh": "Guruhning barcha vakansiyalari hh.uz’da",
    "vac.search": "Lavozim yoki kalit so‘z",
    "vac.search.aria": "Vakansiyalar bo‘yicha qidiruv",
    "vac.city.aria": "Shahar",
    "vac.filters.aria": "Vakansiya yo‘nalishlari",
    "vac.found": "Topildi:",
    "vac.share": "Tanlov havolasi",

    "life.title": "ADMda ishlash — bu haqiqiy<br>ishlab chiqarish va&nbsp;jonli vazifalar",
    "slide.prev": "Oldingi slayd",
    "slide.next": "Keyingi slayd",

    "comp.title": "Guruh kompaniyalari",
    "comp.lead": "26&nbsp;ta kompaniya — zavodlar va&nbsp;dilerlik markazlari, lizing va&nbsp;moliya, IT, logistika va&nbsp;boshqalar.",
    "form.ooo": "MCHJ",
    "form.sp": "QK MCHJ",
    "form.ao": "AJ",
    "form.assoc": "Uyushma",
    "comp.cta": "<span data-total-jobs>—</span> ta ochiq vakansiya",
    "comp.cta.small": "guruh kompaniyalarida — ko‘rish",

    "steps.title": "Saralash qanday o‘tadi",
    "steps.1.h": "Vakansiyani tanlang",
    "steps.1.p": "Yuqoridagi qidiruv va filtrlardan foydalaning — yo‘nalish, shahar yoki kalit so‘z bo‘yicha.",
    "steps.2.h": "hh.uz’da javob yuboring",
    "steps.2.p": "Vakansiya kartochkasi hh.uz sahifasini ochadi — u yerda bir bosishda rezyume yuborish mumkin.",
    "steps.3.h": "HR bilan suhbatlashing",
    "steps.3.p": "Tajribangiz mos kelsa, rekruter siz bilan bog‘lanib, jamoa va vazifalar haqida aytib beradi.",
    "steps.4.h": "Taklif oling",
    "steps.4.p": "Rahbar bilan suhbatdan so‘ng — ishga taklif va jamoaga qo‘shilish.",

    "brands.aria": "Guruh brendlari",
    "cta.title": "Mos vakansiya topmadingizmi?",
    "cta.text": "Yangi vakansiyalarni ADM Jobs Telegram-botida va hh.uz’da kuzatib boring — ro‘yxat har kuni yangilanadi.",
    "cta.tg": "ADM Jobs Telegram-boti",
    "cta.hh": "hh.uz’dagi vakansiyalar",
    "cta.site": "ADM GLOBAL sayti",
    "foot.aria": "Pastki navigatsiya",
    "foot.copy": "© ADM GLOBAL. Arizalar hh.uz orqali qabul qilinadi",

    "meta.title": "ADM GLOBAL’da karyera — O‘zbekistondagi vakansiyalar",
    "meta.desc": "ADM GLOBAL avtomobil guruhida karyera: yo‘nalishlar, guruh kompaniyalari va hh.uz orqali javob berish mumkin bo‘lgan ochiq vakansiyalar."
  };

  // Strings used only from JavaScript (both languages)
  const JS = {
    ru: {
      "count": n => plural(n, "вакансия", "вакансии", "вакансий"),
      "count.short": n => String(n),
      "dir.count": n => plural(n, "вакансия", "вакансии", "вакансий"),
      "dir.soon": "Скоро новые вакансии",
      "status": d => "Обновлено по данным hh.uz " + d,
      "status.none": "Актуальные позиции доступны на hh.uz.",
      "more": n => "Показать ещё " + n,
      "empty.none": "Сейчас открытых позиций нет — загляните позже.",
      "empty.check": "Проверить на hh.uz ↗",
      "empty.filter": "По вашему запросу ничего не нашлось.",
      "empty.reset": "Сбросить фильтры",
      "city.all": "Все города",
      "new": "Новая",
      "share.done": "Ссылка скопирована",
      "salary.range": (a, b) => a + "–" + b + " млн сум",
      "salary.from": a => "от " + a + " млн сум",
      "salary.to": b => "до " + b + " млн сум",
      "salary.gross": "до вычета налогов",
      "salary.net": "на руки",
      "menu.close": "Закрыть меню",
      "menu.open": "Открыть меню",
      "cat.all": "Все",
      "cat.production": "Производство",
      "cat.sales": "Продажи и сервис",
      "cat.marketing": "Маркетинг",
      "cat.it": "IT",
      "cat.leasing": "Лизинг",
      "cat.office": "Офис",
      "slides": [
        "Собираем автомобили на собственном заводе ADM Jizzakh — от кузова до финального контроля качества",
        "Работаем по всему Узбекистану: заводы в Джизаке, Андижане и Нукусе, офисы и салоны в Ташкенте и регионах",
        "Выпускаем, продаём и обслуживаем автомобили шести мировых брендов — Kia, Chery, Haval, Changan, Tank и Geely",
        "26 компаний группы — от заводов и дилерских центров до лизинга и IT: есть где расти и куда двигаться"
      ],
      "slides.alt": ["Сборочная линия завода ADM Jizzakh", "Завод ADM Jizzakh с высоты", "Команда на сборочной линии", "Сотрудник ADM на производстве"]
    },
    uz: {
      "count": n => n + " ta vakansiya",
      "dir.count": n => n + " ta vakansiya",
      "dir.soon": "Tez orada yangi vakansiyalar",
      "status": d => "hh.uz ma’lumotlari bo‘yicha yangilandi: " + d,
      "status.none": "Dolzarb vakansiyalar hh.uz’da mavjud.",
      "more": n => "Yana " + n + " tasini ko‘rsatish",
      "empty.none": "Hozircha ochiq vakansiyalar yo‘q — keyinroq qarang.",
      "empty.check": "hh.uz’da tekshirish ↗",
      "empty.filter": "So‘rovingiz bo‘yicha hech narsa topilmadi.",
      "empty.reset": "Filtrlarni tozalash",
      "city.all": "Barcha shaharlar",
      "new": "Yangi",
      "share.done": "Havola nusxalandi",
      "salary.range": (a, b) => a + "–" + b + " mln so‘m",
      "salary.from": a => a + " mln so‘mdan",
      "salary.to": b => b + " mln so‘mgacha",
      "salary.gross": "soliqlar ushlanmasdan oldin",
      "salary.net": "qo‘lga",
      "menu.close": "Menyuni yopish",
      "menu.open": "Menyuni ochish",
      "cat.all": UZ["cat.all"],
      "cat.production": UZ["cat.production"],
      "cat.sales": UZ["cat.sales"],
      "cat.marketing": UZ["cat.marketing"],
      "cat.it": UZ["cat.it"],
      "cat.leasing": UZ["cat.leasing"],
      "cat.office": UZ["cat.office"],
      "slides": [
        "ADM Jizzakh zavodida avtomobillarni o‘zimiz yig‘amiz — kuzovdan yakuniy sifat nazoratigacha",
        "Butun O‘zbekiston bo‘ylab ishlaymiz: Jizzax, Andijon va Nukusdagi zavodlar, Toshkent va viloyatlardagi ofis va salonlar",
        "Oltita jahon brendi — Kia, Chery, Haval, Changan, Tank va Geely avtomobillarini ishlab chiqaramiz, sotamiz va ularga xizmat ko‘rsatamiz",
        "Guruhda 26 ta kompaniya — zavodlar va dilerlik markazlaridan lizing va IT’gacha: o‘sish uchun imkoniyat ko‘p"
      ],
      "slides.alt": ["ADM Jizzakh zavodining yig‘uv liniyasi", "ADM Jizzakh zavodi yuqoridan", "Yig‘uv liniyasidagi jamoa", "Ishlab chiqarishdagi ADM xodimi"]
    }
  };

  const EXPERIENCE_UZ = {
    "Без опыта": "Tajribasiz",
    "1–3 года": "1–3 yil",
    "3–6 лет": "3–6 yil",
    "Более 6 лет": "6 yildan ortiq"
  };
  const CITY_UZ = {
    "Ташкент": "Toshkent", "Джизак": "Jizzax", "Самарканд": "Samarqand", "Наманган": "Namangan",
    "Нурафшон": "Nurafshon", "Фергана": "Farg‘ona", "Андижан": "Andijon", "Нукус": "Nukus",
    "Бухара": "Buxoro", "Алматы": "Almati", "Карши": "Qarshi", "Навои": "Navoiy", "Ургенч": "Urganch"
  };
  const MONTHS_UZ = ["yanvar", "fevral", "mart", "aprel", "may", "iyun", "iyul", "avgust", "sentabr", "oktabr", "noyabr", "dekabr"];

  function plural(n, one, few, many) {
    const r = new Intl.PluralRules("ru").select(n);
    return n + " " + (r === "one" ? one : r === "few" ? few : many);
  }

  function readLang() {
    const fromUrl = new URLSearchParams(location.search).get("lang");
    if (fromUrl === "uz" || fromUrl === "ru") return fromUrl;
    try { const saved = localStorage.getItem("adm-lang"); if (saved === "uz" || saved === "ru") return saved; } catch (e) { /* ignore */ }
    return "ru";
  }

  let lang = readLang();
  const listeners = [];
  const originals = new Map();

  function remember(node, key) {
    if (!originals.has(node)) originals.set(node, {});
    const store = originals.get(node);
    if (!(key in store)) store[key] = key === "html" ? node.innerHTML : node.getAttribute(key);
    return store[key];
  }

  function applyStatic() {
    document.documentElement.lang = lang === "uz" ? "uz" : "ru";
    for (const node of document.querySelectorAll("[data-i18n]")) {
      const ru = remember(node, "html");
      node.innerHTML = lang === "uz" ? (UZ[node.dataset.i18n] ?? ru) : ru;
    }
    for (const node of document.querySelectorAll("[data-i18n-attr]")) {
      for (const pair of node.dataset.i18nAttr.split(";")) {
        const [attr, key] = pair.split(":").map(s => s.trim());
        const ru = remember(node, attr);
        node.setAttribute(attr, lang === "uz" ? (UZ[key] ?? ru) : ru);
      }
    }
    const title = document.querySelector("title");
    const ruTitle = remember(title, "html");
    document.title = lang === "uz" ? UZ["meta.title"] : ruTitle.replace(/&amp;/g, "&");
    const desc = document.querySelector('meta[name="description"]');
    const ruDesc = remember(desc, "content");
    desc.setAttribute("content", lang === "uz" ? UZ["meta.desc"] : ruDesc);
    for (const b of document.querySelectorAll("[data-lang]")) b.setAttribute("aria-pressed", String(b.dataset.lang === lang));
  }

  function setLang(next) {
    if (next === lang) return;
    lang = next;
    try { localStorage.setItem("adm-lang", lang); } catch (e) { /* ignore */ }
    const url = new URL(location.href);
    if (lang === "ru") url.searchParams.delete("lang"); else url.searchParams.set("lang", lang);
    history.replaceState(null, "", url);
    applyStatic();
    listeners.forEach(fn => fn(lang));
  }

  window.I18N = {
    get lang() { return lang; },
    t(key, ...args) {
      const value = JS[lang][key] ?? JS.ru[key];
      return typeof value === "function" ? value(...args) : value;
    },
    experience: text => (lang === "uz" ? EXPERIENCE_UZ[text] || text : text),
    city: name => (lang === "uz" ? CITY_UZ[name] || name : name),
    date(iso) {
      const d = new Date(iso + "T12:00:00Z");
      if (lang === "uz") return d.getUTCFullYear() + "-yil " + d.getUTCDate() + "-" + MONTHS_UZ[d.getUTCMonth()];
      return d.toLocaleDateString("ru-RU", { day: "numeric", month: "long", year: "numeric", timeZone: "UTC" });
    },
    onChange(fn) { listeners.push(fn); },
    set: setLang
  };

  // Loaded with defer before the other scripts: the DOM is ready, other scripts not yet run.
  applyStatic();
  for (const b of document.querySelectorAll("[data-lang]")) b.addEventListener("click", () => setLang(b.dataset.lang));
})();
