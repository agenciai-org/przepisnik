# Przepis na Domowy przepiśnik

Plan budowy w trzech etapach. Claude buduje jeden etap naraz („Zbuduj etap 1 z przepisu”), a Ty sprawdzasz wynik
w podglądzie według punktów „Jak sprawdzić”. Gdy etap nie wyjdzie, polecenie `/przywroc-etap` z numerem etapu wstawi
gotowy stan z repozytorium agenciai-org/przepisnik.

**Co budujemy:** domową książkę kucharską, którą otwierasz w przeglądarce. Każdy przepis ma swoją stronę, która
wygląda jak strona prawdziwej książki. Wzór wyglądu: `przyklady/wzor-strony.png` w repozytorium (rysunek „po” ze
strony agenciai.org).

**Gdzie co leży:**
- `aplikacja/` – strona przepiśnika: `index.html` (strona), `styl.css` (wygląd), `przepisnik.js` (działanie);
- `materialy/przepisy.js` – wszystkie przepisy; strona je tylko czyta;
- `zrodla/` – zdjęcia kartek, oryginały.

**Zasady na całą budowę:**
- strona działa po otwarciu pliku `aplikacja/index.html` z dysku, bez serwera i bez internetu, w Chrome, Edge i Safari;
- przepisy wczytuje znacznik `<script src="../materialy/przepisy.js">` (strona otwarta z dysku nie może czytać
  plików w inny sposób);
- tylko czcionki z komputera (tytuły Georgia, reszta systemowa); żadnych adresów z internetu, ciasteczek ani śledzenia;
- prosty kod z krótkimi komentarzami po polsku;
- budowa zmienia tylko `aplikacja/`; przepisów w `materialy/` i zdjęć w `zrodla/` nie rusza;
- liczby po polsku: przecinek dziesiętny (0,5 kg), ułamki ½, ¼, ¾ przy łyżkach, szklankach i sztukach, odmiana
  (1 łyżka, 2 łyżki, 5 łyżek; 4 porcje, 12 porcji).

## Etap 1 – Strona przepisu

**Po co:** żeby jeden przepis wyglądał jak strona z prawdziwej książki kucharskiej.

**Co ma powstać:**
- folder `aplikacja/` z trzema plikami: `index.html`, `styl.css`, `przepisnik.js`;
- strona przepisu jak na wzorze: biała kartka z cieniem na ciepłym, beżowym tle;
- u góry mały szary wiersz „Rozdział 3 · Obiady”, a po prawej numer strony;
- duży tytuł (Georgia, pogrubiony, granatowy), pod nim szary podtytuł;
- plakietki: liczba porcji, czas i trudność („4 porcje”, „60 min”, „łatwe”);
- dwie kolumny: „Składniki” (lista) i „Przygotowanie” (ponumerowane kroki);
- na dole „Skąd: od babci Zosi” i notatka kursywą; zdjęcie potrawy, jeśli jest;
- słowa, których nie udało się odczytać z kartki (`[?]`), wyróżnione na żółto;
- na telefonie jedna kolumna: składniki nad przygotowaniem;
- numer strony liczony jak w spisie z etapu 2: strona 1 to spis treści, więc pierwszy przepis ma stronę 2.

**Dane:** przepisy w `materialy/przepisy.js`, na początek jeden: „Pierogi babci Zosi”. Plik ustawia dwie listy:
`window.ROZDZIALY` (Zupy, Przystawki i sałatki, Obiady, Ciasta i desery, Przetwory, Napoje i inne) i `window.PRZEPISY`.
Każdy przepis ma: `id` (np. `pierogi-babci-zosi`), `tytul`, `podtytul`, `rozdzial`, `porcje`, `czas_min`, `trudnosc`
(łatwe, średnie, trudne), `skladniki` (każdy z polami `ilosc`, `jednostka`, `nazwa` i `dzial`, czyli dział sklepu),
`kroki`, `pochodzenie`, `notatki`, `zdjecie`, `kartka` i `niepewne`. Zawartość obu list to poprawny JSON (podwójne
cudzysłowy, bez przecinka po ostatniej pozycji), żeby Claude mógł bezpiecznie dopisywać przepisy.

**Jak sprawdzić:**
1. Otwieram `aplikacja/index.html` w podglądzie i widzę stronę „Pierogi babci Zosi”, podobną do wzoru.
2. U góry jest „Rozdział 3 · Obiady” i numer strony, pod tytułem plakietki „4 porcje”, „60 min”, „łatwe”.
3. Składniki mają ilości po polsku: „500 g mąki pszennej”, „1 jajko”, „2 łyżki masła”.
4. Na dole widzę „Skąd: od babci Zosi” i „Lepić cienko!”.
5. Gdy zwężę okno albo otworzę stronę na telefonie, kolumny stają jedna pod drugą.

**Stan gotowy:** `etapy/etap-1/` w repozytorium agenciai-org/przepisnik (polecenie `/przywroc-etap 1`).

## Etap 2 – Spis przepisów

**Po co:** żeby szybko znaleźć przepis, kiedy będzie ich dużo.

**Co ma powstać:**
- nowa strona startowa: spis treści na takiej samej białej kartce, z wierszem „Spis treści” i stroną 1,
  nagłówkiem „Domowy przepiśnik” i liczbą przepisów;
- pole „Szukaj przepisu…”, które szuka w tytułach, składnikach i w tym, od kogo jest przepis; wielkie litery
  i polskie znaki nie mają znaczenia („twarog” znajdzie „twaróg”);
- przyciski rozdziałów („Wszystkie”, „Obiady”, „Ciasta i desery”…), które zawężają listę;
- lista jak w książce: „Rozdział 3 · Obiady”, pod nim tytuły z kropkami prowadzącymi do numeru strony; strony idą
  rozdział po rozdziale, a w rozdziale alfabetycznie;
- kliknięcie tytułu otwiera stronę przepisu, a „Spis przepisów” nad kartką wraca do spisu (przycisk „wstecz”
  przeglądarki też działa);
- adresy: `#spis` dla spisu i `#przepis/<id>` dla przepisu (np. `#przepis/pierogi-babci-zosi`).

**Dane:** ten sam plik `materialy/przepisy.js`, teraz z trzema przepisami: pierogi, „Sernik cioci Heli” (Ciasta
i desery) i „Placki ziemniaczane mamy” (Obiady).

**Jak sprawdzić:**
1. Strona startowa to spis: „Rozdział 3 · Obiady” (pierogi – 2, placki – 3) i „Rozdział 4 · Ciasta i desery”
   (sernik – 4).
2. Wpisuję „twaróg” i zostają pierogi i sernik; po wpisaniu „TWAROG” wynik jest ten sam.
3. Klikam „Ciasta i desery” i zostaje sernik; „Wszystkie” znów pokazuje trzy przepisy.
4. Klikam „Placki ziemniaczane mamy” i otwiera się ich strona; „Spis przepisów” wraca do spisu.

**Stan gotowy:** `etapy/etap-2/` w repozytorium agenciai-org/przepisnik (polecenie `/przywroc-etap 2`).

## Etap 3 – Kuchnia i druk

**Po co:** żeby z przepiśnika wygodnie się gotowało i żeby przepis dało się wydrukować.

**Co ma powstać:**
- nad kartką przepisu przelicznik porcji z przyciskami „×½”, „×1” i „×2”: ilości i plakietka porcji zmieniają się
  razem, zaokrąglenia są rozsądne (gramy i mililitry powyżej 50 do pełnych piątek, sztuki do połówek), a nazwy się
  odmieniają („1 jajko” – „2 jajka”);
- przycisk „Duże litery” do kuchni: tekst ok. 1,4 raza większy, jedna kolumna; strona pamięta ten wybór;
- przycisk „Drukuj”: jeden przepis na jednej kartce A5, bez przycisków i bez tła.

**Dane:** bez zmian; przelicznik niczego nie zapisuje w `materialy/przepisy.js`.

**Jak sprawdzić:**
1. Na stronie pierogów klikam „×2” i widzę „1 kg mąki pszennej”, „2 jajka” i plakietkę „8 porcji”.
2. Klikam „×½” i widzę „250 g mąki pszennej”, „½ jajka” i „2 porcje”; „×1” wraca do ilości z przepisu.
3. Klikam „Duże litery”: litery rosną, składniki stają nad przygotowaniem, a po odświeżeniu strony zostają duże.
4. Klikam „Drukuj” i w oknie drukowania wybieram A5: podgląd pokazuje jedną stronę, bez przycisków.

**Stan gotowy:** `etapy/etap-3/` w repozytorium agenciai-org/przepisnik (polecenie `/przywroc-etap 3`).

## Potem: własne polecenia

W module 4 powstają polecenia `/przepis` (nowy przepis ze zdjęcia kartki) i `/zakupy` (lista zakupów na telefon).
Ich wzorcowa wersja i przykładowa lista zakupów są w `etapy/gotowe/` (polecenie `/przywroc-etap gotowe`).
