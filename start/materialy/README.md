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
