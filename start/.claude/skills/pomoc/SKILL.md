---
name: pomoc
description: Pokazuje polecenia tej pracowni z przykładami i podpowiada, co zrobić, gdy coś nie działa. Działa też, gdy napiszesz „jakie są polecenia”, „co mogę tu zrobić”, „pomocy”, „nie działa”, „zawiesiło się”, „skończył się limit”, „nie widzę polecenia”.
---

# /pomoc – polecenia i co robić, gdy coś nie działa

## Krok 1. Jakie polecenia są w tej pracowni

Sprawdź folder `.claude/skills/`: każdy podfolder z plikiem `SKILL.md` to jedno polecenie. Jego nazwa to pole `name`
z nagłówka `SKILL.md`, a gdy go nie ma – nazwa podfolderu. Pokaż tylko te polecenia – nie dopisuj poleceń, których tu
nie ma.

## Krok 2. Tabela w dwóch częściach

Pokaż dwie tabele: Polecenie · Co robi (jedno zdanie) · Przykład.

**Polecenia z zestawu** – te, które przyszły z zestawem startowym kursu. Opisy (pokaż tylko te, które są w pracowni):

| Polecenie | Co robi | Przykład |
|---|---|---|
| `/start` | zapisuje albo zmienia kartę kuchni | `/start` |
| `/pomoc` | pokazuje tę listę | `/pomoc` |
| `/kopia` | zapisuje całą pracownię w pliku ZIP z nazwą pracowni i datą, w folderze `Kopie-przepisnika` obok pracowni | `/kopia` |
| `/przywroc-etap` | wstawia gotowy etap budowy z kursu (najpierw robi kopię); przepisów, zdjęć ani Twoich poleceń nie rusza | `/przywroc-etap 2` |
| `/udostepnij` | robi stronę z linkiem: cały przepiśnik, jeden przepis albo listę zakupów; przed publikacją pyta | `/udostepnij lista zakupów` |

**Twoje polecenia** – wszystkie pozostałe, np. `/przepis` i `/zakupy`. Opis weź z pola `description` w ich własnym
`SKILL.md`, a gdy go nie ma, z pierwszych zdań pliku (przeczytaj plik, nie zgaduj), skróć go do jednego zdania i dopisz prosty przykład. Gdy takich poleceń nie
ma, napisz: „Jeszcze nie masz własnych poleceń.”

Pod tabelami jedno zdanie: „Każde polecenie to plik `SKILL.md` w `.claude/skills/`; zmienisz je zwykłym zdaniem,
a zmiana zadziała od nowej rozmowy.”

## Krok 3. Gdy coś nie działa

Pod tabelą pokaż tę listę (po polsku, krótko):

- **Claude kręci się w kółko albo myli fakty:** zacznij nową rozmowę („New” na górze paska bocznego zakładki
  Code). To, co ważne, zostaje w plikach pracowni.
- **Boisz się, że coś zepsujesz:** najpierw `/kopia`.
- **Budowa etapu nie wychodzi:** `/przywroc-etap` z numerem etapu, np. `/przywroc-etap 2`. Twoje przepisy i zdjęcia
  zostają.
- **Zdjęcia kartek:** wysyłaj je partiami, po kilka naraz.
- **Komunikat o limicie:** limit planu odnawia się co kilka godzin; poczekaj i wróć. Ile zostało, pokazuje kółko obok
  wyboru modelu pod polem wiadomości (kliknij je).
- **Nowego polecenia nie ma na liście `/`:** zacznij nową rozmowę albo wpisz `/reload-skills`.
- **Strona w panelu „Browser” jest pusta:** napisz „Otwórz stronę w mojej przeglądarce”. Podgląd w aplikacji
  nie wczytuje przepisów ani zdjęć.
- **Rodzina widzi „Sign in to view this page”:** strona z linkiem jest jeszcze prywatna (albo została usunięta). U góry swojej strony kliknij
  „Share”, w „General access” wybierz „Anyone with the link” i potwierdź „Share publicly”. Do oglądania konto Claude
  nie jest potrzebne.
- **Strona pisze „Nie widzę przepisów”:** napisz „Sprawdź plik z przepisami”. Claude porówna `materialy/przepisy.js`
  z układem z `materialy/README.md` i zaproponuje poprawkę.

## Krok 4. Zakończenie

Jedno zdanie: „Napisz, w czym mam pomóc.” Nie zadawaj innych pytań.
