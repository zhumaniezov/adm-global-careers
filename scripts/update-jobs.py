"""Refresh the careers catalogue from the public ROODELL vacancy search on hh.uz."""

import datetime
import json
import math
import re
import tempfile
from html.parser import HTMLParser
from pathlib import Path
from urllib.parse import urlencode
from urllib.request import Request, urlopen

EMPLOYER_ID = 3769561
DESTINATION = Path(__file__).resolve().parent.parent / "jobs-data.js"
EXPERIENCE = {
    "noExperience": "Без опыта",
    "between1And3": "1–3 года",
    "between3And6": "3–6 лет",
    "moreThan6": "Более 6 лет",
}


class SearchPage(HTMLParser):
    def __init__(self):
        super().__init__()
        self.capturing = False
        self.state = []

    def handle_starttag(self, tag, attributes):
        if tag == "template" and dict(attributes).get("id") == "HH-Lux-InitialState":
            self.capturing = True

    def handle_data(self, data):
        if self.capturing:
            self.state.append(data)

    def handle_endtag(self, tag):
        if tag == "template":
            self.capturing = False


def fetch_page(page=0):
    query = urlencode({"employer_id": EMPLOYER_ID, "items_on_page": 100, "page": page})
    request = Request(
        "https://hh.uz/search/vacancy?" + query,
        headers={"Accept-Language": "ru", "User-Agent": "ADM-Careers/1.0"},
    )
    with urlopen(request, timeout=30) as response:
        body = response.read().decode("utf-8")
    parser = SearchPage()
    parser.feed(body)
    result = json.loads("".join(parser.state))["vacancySearchResult"]
    if result["proxiedSearchFormParams"]["employer_id"] != [EMPLOYER_ID]:
        raise ValueError("HeadHunter returned a different employer filter")
    return result


def category(title):
    title = title.casefold()
    if re.search(r"\bit\b|\bит\b|qa engineer|helpdesk|1с|разработчик|программист", title):
        return "IT"
    if re.search("маркет|бренд|дизайн|product manager|ивент", title):
        return "Маркетинг"
    if re.search("бухгалтер|финансового отдела|экономист", title):
        return "Офис"
    if re.search("инженер|производств|поставщик|охране труда", title):
        return "Производство"
    if re.search("продаж|продавец|автосалон|сервис|гаранти|мастер-приемщик", title):
        return "Продажи и сервис"
    return "Офис"


def catalogue_row(vacancy):
    if vacancy["company"]["id"] != EMPLOYER_ID or vacancy["closedForApplicants"]:
        raise ValueError("Unexpected employer or closed vacancy")
    return {
        "id": str(int(vacancy["vacancyId"])),
        "title": vacancy["name"].strip(),
        "city": vacancy["area"]["name"],
        "experience": EXPERIENCE.get(vacancy.get("workExperience"), ""),
        "category": category(vacancy["name"]),
    }


def write_catalogue(rows):
    payload = {
        "updated": datetime.datetime.now(datetime.timezone.utc).date().isoformat(),
        "jobs": rows,
    }
    source = "window.ADM_VACANCIES = " + json.dumps(payload, ensure_ascii=False, indent=2) + ";\n"
    with tempfile.NamedTemporaryFile(dir=DESTINATION.parent, mode="w", encoding="utf-8", delete=False) as tmp:
        tmp.write(source)
    Path(tmp.name).replace(DESTINATION)


def main():
    first = fetch_page()
    total = first["totalResults"]
    rows = list(first["vacancies"])
    for page in range(1, math.ceil(total / 100)):
        rows.extend(fetch_page(page)["vacancies"])
    jobs = [catalogue_row(row) for row in rows]
    if len({job["id"] for job in jobs}) != total or len(jobs) != total:
        raise ValueError("Incomplete search results. The previous file has been retained.")
    write_catalogue(jobs)
    print(f"Saved {len(jobs)} ROODELL vacancies.")


if __name__ == "__main__":
    main()
