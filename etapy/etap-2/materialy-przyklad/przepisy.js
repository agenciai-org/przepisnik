// Domowy przepiśnik — przepisy. Ten plik uzupełnia polecenie /przepis.
window.ROZDZIALY = ["Zupy", "Przystawki i sałatki", "Obiady", "Ciasta i desery", "Przetwory", "Napoje i inne"];
window.PRZEPISY = [
  {
    "id": "pierogi-babci-zosi",
    "tytul": "Pierogi babci Zosi",
    "podtytul": "z ziemniakami, twarogiem i cebulką",
    "rozdzial": "Obiady",
    "porcje": 4,
    "czas_min": 60,
    "trudnosc": "łatwe",
    "skladniki": [
      {"ilosc": 500, "jednostka": "g", "nazwa": "mąki pszennej", "dzial": "sypkie"},
      {"ilosc": 1, "jednostka": "szt.", "nazwa": "jajko", "dzial": "nabiał i jajka"},
      {"ilosc": 250, "jednostka": "ml", "nazwa": "ciepłej wody", "dzial": "inne"},
      {"ilosc": 500, "jednostka": "g", "nazwa": "ziemniaków", "dzial": "warzywa i owoce"},
      {"ilosc": 250, "jednostka": "g", "nazwa": "twarogu półtłustego", "dzial": "nabiał i jajka"},
      {"ilosc": 1, "jednostka": "szt.", "nazwa": "cebula", "dzial": "warzywa i owoce"},
      {"ilosc": 2, "jednostka": "łyżka", "nazwa": "masła", "dzial": "nabiał i jajka"},
      {"ilosc": null, "jednostka": "", "nazwa": "sól do smaku", "dzial": "przyprawy"}
    ],
    "kroki": [
      "Zagnieć ciasto z mąki, jajka i ciepłej wody, odstaw na 15 minut.",
      "Ziemniaki ugotuj w osolonej wodzie i przeciśnij przez praskę.",
      "Cebulę pokrój w drobną kostkę i podsmaż na maśle na złoto.",
      "Wymieszaj ziemniaki z twarogiem i połową cebulki, dopraw solą.",
      "Rozwałkuj ciasto cienko, wykrawaj szklanką krążki, nakładaj farsz i dokładnie zlep brzegi.",
      "Gotuj partiami w osolonym wrzątku, 3 minuty od wypłynięcia. Podawaj z resztą cebulki."
    ],
    "pochodzenie": "od babci Zosi",
    "notatki": "Lepić cienko! Ilości farszu i masło do cebulki podała babcia – nie było ich na kartce.",
    "zdjecie": "",
    "kartka": "zrodla/pierogi-babci-zosi.jpg",
    "niepewne": []
  },
  {
    "id": "sernik-cioci-heli",
    "tytul": "Sernik cioci Heli",
    "podtytul": "z budyniem, na spodzie z herbatników",
    "rozdzial": "Ciasta i desery",
    "porcje": 12,
    "czas_min": 90,
    "trudnosc": "średnie",
    "skladniki": [
      {"ilosc": 1, "jednostka": "kg", "nazwa": "twarogu, 3 razy mielonego", "dzial": "nabiał i jajka"},
      {"ilosc": 5, "jednostka": "szt.", "nazwa": "jajek", "dzial": "nabiał i jajka"},
      {"ilosc": 1, "jednostka": "szklanka", "nazwa": "cukru", "dzial": "sypkie"},
      {"ilosc": 1, "jednostka": "szt.", "nazwa": "kostka masła", "dzial": "nabiał i jajka"},
      {"ilosc": 1, "jednostka": "opak.", "nazwa": "budyniu waniliowego", "dzial": "sypkie"},
      {"ilosc": 200, "jednostka": "g", "nazwa": "herbatników", "dzial": "inne"}
    ],
    "kroki": [
      "Wyłóż tortownicę papierem do pieczenia i ułóż ciasno herbatniki na dnie.",
      "Miękkie masło utrzyj z cukrem na puszystą masę.",
      "Dodawaj po jednym jajku, cały czas ucierając.",
      "Dodaj zmielony twaróg i proszek budyniowy, wymieszaj na gładką masę.",
      "Wylej masę na herbatniki i wyrównaj wierzch.",
      "Piecz 1 godzinę w 170°C. Studź w uchylonym piekarniku, żeby sernik nie opadł."
    ],
    "pochodzenie": "od cioci Heli",
    "notatki": "Twaróg koniecznie 3 razy mielony! Ilość budyniu i herbatników podała ciocia – nie było jej na kartce.",
    "zdjecie": "",
    "kartka": "zrodla/sernik-cioci-heli.jpg",
    "niepewne": []
  },
  {
    "id": "placki-ziemniaczane-mamy",
    "tytul": "Placki ziemniaczane mamy",
    "podtytul": "złociste, ze śmietaną",
    "rozdzial": "Obiady",
    "porcje": 4,
    "czas_min": 40,
    "trudnosc": "łatwe",
    "skladniki": [
      {"ilosc": 1, "jednostka": "kg", "nazwa": "ziemniaków", "dzial": "warzywa i owoce"},
      {"ilosc": 1, "jednostka": "szt.", "nazwa": "cebula", "dzial": "warzywa i owoce"},
      {"ilosc": 1, "jednostka": "szt.", "nazwa": "jajko", "dzial": "nabiał i jajka"},
      {"ilosc": 2, "jednostka": "łyżka", "nazwa": "mąki pszennej", "dzial": "sypkie"},
      {"ilosc": null, "jednostka": "", "nazwa": "sól do smaku", "dzial": "przyprawy"},
      {"ilosc": null, "jednostka": "", "nazwa": "pieprz do smaku", "dzial": "przyprawy"},
      {"ilosc": null, "jednostka": "", "nazwa": "olej do smażenia", "dzial": "inne"},
      {"ilosc": 200, "jednostka": "g", "nazwa": "kwaśnej śmietany 18%", "dzial": "nabiał i jajka"}
    ],
    "kroki": [
      "Obierz ziemniaki i cebulę, zetrzyj je na drobnych oczkach tarki.",
      "Odlej sok, który zbierze się nad startymi ziemniakami.",
      "Dodaj jajko, mąkę, sól i pieprz, dokładnie wymieszaj.",
      "Rozgrzej olej na patelni i nakładaj łyżką niewielkie placki.",
      "Smaż z obu stron na złoto, odsącz na papierowym ręczniku.",
      "Podawaj od razu, ze śmietaną."
    ],
    "pochodzenie": "od mamy",
    "notatki": "Na kartce kleks przy mące. Mama mówi: 2 łyżki, a śmietany ok. 200 g.",
    "zdjecie": "",
    "kartka": "zrodla/placki-ziemniaczane-mamy.jpg",
    "niepewne": []
  }
];
