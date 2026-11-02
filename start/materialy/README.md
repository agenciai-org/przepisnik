Tu Claude zapisuje Twoje przepisy, listy zakupów i to, co udostępniasz linkiem.

## Dla Claude'a: układ pliku `przepisy.js`

Wszystkie przepisy są w jednym pliku `materialy/przepisy.js`, zawsze w tym układzie: czytają go strona przepiśnika,
polecenia kursu (`/przepis`, `/zakupy`, `/udostepnij`) i gotowe etapy z `/przywroc-etap`. Zawartość obu list to
poprawny JSON: podwójne cudzysłowy, bez przecinka po ostatniej pozycji. Nowy przepis dopisuj na końcu
`window.PRZEPISY`. Przykład niżej jest tylko wzorem układu, nie przepisem z kartki.

```js
// Domowy przepiśnik — przepisy.
window.ROZDZIALY = ["Zupy", "Przystawki i sałatki", "Obiady", "Ciasta i desery", "Przetwory", "Napoje i inne"];
window.PRZEPISY = [
  {
    "id": "kompot-z-jablek",
    "tytul": "Kompot z jabłek",
    "podtytul": "jak u dziadków",
    "rozdzial": "Napoje i inne",
    "porcje": 8,
    "czas_min": 30,
    "trudnosc": "łatwe",
    "skladniki": [
      {"ilosc": 1, "jednostka": "kg", "nazwa": "jabłek", "dzial": "warzywa i owoce"},
      {"ilosc": 0.5, "jednostka": "szklanka", "nazwa": "cukru", "dzial": "sypkie"},
      {"ilosc": 2, "jednostka": "l", "nazwa": "wody", "dzial": "inne"},
      {"ilosc": null, "jednostka": "", "nazwa": "[?] goździków", "dzial": "przyprawy"}
    ],
    "kroki": ["Jabłka pokrój na ćwiartki.", "Zagotuj wodę z cukrem i goździkami, wrzuć jabłka, gotuj 10 minut."],
    "pochodzenie": "od dziadka Stefana",
    "notatki": "Najlepszy schłodzony.",
    "zdjecie": "",
    "kartka": "zrodla/kompot-z-jablek.jpg",
    "niepewne": ["ilość goździków"]
  }
];
```

- `id`: tytuł małymi literami, bez polskich znaków, spacje → `-`; w każdym przepisie inny.
- `rozdzial`: jeden z `window.ROZDZIALY`. `trudnosc`: `łatwe`, `średnie` albo `trudne`. `porcje` i `czas_min`
  (minuty): liczby.
- `skladniki`: każdy składnik osobno. `ilosc`: liczba (0.5, 2, 250) albo `null`. `jednostka`: `g`, `kg`, `ml`, `l`,
  `szt.`, `łyżka`, `łyżeczka`, `szklanka`, `szczypta`, `opak.`, `ząbek`, `pęczek` albo `""`. `nazwa`: tak, jak brzmi
  po ilości („cukru”, „jajko”). `dzial` (dział sklepu): `warzywa i owoce`, `pieczywo`, `nabiał i jajka`,
  `mięso i ryby`, `sypkie`, `przyprawy`, `mrożonki`, `napoje`, `inne`.
- Słowo albo ilość nieodczytana z kartki: `[?]` w tekście i krótki opis w `niepewne`. Nieznana ilość: `"ilosc": null`,
  `"jednostka": ""`, a `nazwa` zaczyna się od `[?]`.
- `kroki`: lista zdań. `zdjecie` (zdjęcie potrawy, `materialy/zdjecia/<id>.jpg`) i `kartka` (zdjęcie kartki,
  `zrodla/<id>.jpg`): ścieżka względem pracowni albo `""`.

## Dla Claude'a: przepisy spoza spisu

Gdy kursant prosi o dodanie przepisów z pracowni do spisu (np. „Dodaj przepisy z tej pracowni do spisu przepisów”)
albo po pobraniu zestawu startowego zgodził się na to, najpierw znajdź strony przepisów i zdjęcia kartek:

- Mac: `find . \( -path ./.claude -o -path ./aplikacja -o -path ./robocze \) -prune -o -type f \( -iname '*.htm*' -o -iname '*.jpg' -o -iname '*.jpeg' -o -iname '*.png' -o -iname '*.heic' -o -iname '*.webp' \) -print`
- Windows: `$P = (Get-Location).Path; Get-ChildItem -LiteralPath $P -Recurse -File -Force -Include *.htm*, *.jpg, *.jpeg, *.png, *.heic, *.webp | Where-Object { $_.FullName.Substring($P.Length + 1) -notmatch '^(\.claude|aplikacja|robocze)\\' } | ForEach-Object { $_.FullName.Substring($P.Length + 1) }`

Pomiń to, co już jest w spisie (zdjęcie wpisane w polu `kartka` jakiegoś przepisu), i to, co nie jest przepisem
(np. listy zakupów `materialy/zakupy-*.html`, zdjęcia potraw z pola `zdjecie`). Z pozostałymi:

1. Każdy przepis (strona albo zdjęcie kartki bez strony) dopisz na końcu `window.PRZEPISY` w `materialy/przepisy.js`,
   w układzie opisanym wyżej. Gdy pliku nie ma, utwórz go według wzoru wyżej (z `window.ROZDZIALY`, bez przepisu
   przykładowego). Treść przepisz wiernie ze strony; czego na niej nie ma, zostaw puste (`null` albo `""`), niejasne
   oznacz `[?]`. Zdjęcie kartki bez strony odczytaj tak jak przy nowym przepisie: nie zgaduj, pytaj.
2. Zdjęcia kartek spoza `zrodla/` przenieś do `zrodla/` z nazwą po treści (np. `zrodla/pierogi-babci-zosi.jpg`,
   rozszerzenie bez zmian) i wpisz tę ścieżkę w pole `kartka`. Strony przepisów spoza `materialy/` przenieś do
   `materialy/`. Niczego nie usuwaj i nie nadpisuj: gdy nazwa jest zajęta, dodaj na końcu `-2`. Zawartości zdjęć nie
   zmieniaj.
3. W przeniesionych stronach popraw ścieżki do przeniesionych plików (np. `src="pierogi.jpg"` →
   `src="../zrodla/pierogi-babci-zosi.jpg"`) i sprawdź, że każdy plik, na który wskazują, istnieje.
4. Sprawdź `materialy/przepisy.js` poleceniem z kroku 2 w `.claude/skills/przywroc-etap/SKILL.md`: ma wyjść „OK”
   z liczbą przepisów w spisie. Przy błędzie popraw plik i sprawdź jeszcze raz.

Na koniec powiedz kursantowi, które przepisy są w spisie, dokąd przeniosłeś strony i zdjęcia i co jest niejasne (`[?]`).
