# Przeczytaj mnie

To jest Twoja pracownia „Domowy przepiśnik” z kursu „Podstawy Claude Code” (Agenci AI, agenciai.org). Tu Claude
pomoże Ci zbudować domową książkę kucharską: ze zdjęcia odręcznej kartki powstanie ładna strona z przepisem, a lista
zakupów trafi na telefon.

## Od czego zacząć

Zacznij nową rozmowę w tej pracowni: polecenia i zasady pracy wczytują się na początku rozmowy, więc w rozmowie,
w której powstał zestaw, jeszcze nie działają. Potem wpisz `/start`. Claude zada Ci kilka krótkich pytań o Twoją
kuchnię (dla ilu osób gotujesz, czego nie lubicie…) i zapisze odpowiedzi w karcie kuchni. Kartę czyta na początku
każdej rozmowy.

## Co jest w pracowni

| Co | Po co |
|---|---|
| `CLAUDE.md` | zasady pracy dla Claude'a i Twoja karta kuchni |
| `.claude/` | polecenia (folder z kropką na początku nazwy; na Macu jest ukryty, nie musisz go otwierać) |
| `materialy/` | tu Claude zapisuje przepisy, listy zakupów i to, co udostępniasz |
| `zrodla/` | tu trafiają zdjęcia kartek z przepisami (oryginały, nic ich nie zmienia) |
| `README.md` | ten plik |

W trakcie kursu dojdą `PRZEPIS.md` (plan budowy) i `aplikacja/` (Twój przepiśnik).

## Polecenia

Polecenie to jedno słowo z ukośnikiem. Wpisz `/` w polu wiadomości i wybierz je z listy albo napisz całe.

| Polecenie | Co robi | Przykład |
|---|---|---|
| `/start` | zapisuje albo zmienia kartę kuchni | `/start` |
| `/pomoc` | pokazuje polecenia i podpowiada, co zrobić, gdy coś nie działa | `/pomoc` |
| `/kopia` | zapisuje całą pracownię w jednym pliku ZIP z datą | `/kopia` |
| `/przywroc-etap` | wstawia gotowy etap budowy z kursu (koło ratunkowe); Twoich przepisów nie rusza | `/przywroc-etap 2` |
| `/udostepnij` | robi stronę z linkiem, np. listę zakupów na telefon; przed publikacją zawsze pyta | `/udostepnij lista zakupów` |

Później w kursie dojdą Twoje własne polecenia, na przykład `/przepis` i `/zakupy`.

## Gdzie co leży

- Kopie pracowni: folder `Kopie-przepisnika` obok tej pracowni (np. w Dokumentach).
- Linki do udostępnionych stron: `materialy/linki.md`.

## Gdy coś nie działa

Wpisz `/pomoc`.

---

Zestaw startowy z github.com/agenciai-org/przepisnik · licencja CC BY-NC-SA 4.0 · Agenci AI, agenciai.org
