/*
  Domowy przepiśnik — silnik strony.
  Etap 2: spis z wyszukiwarką i strona przepisu.

  Dane: ../materialy/przepisy.js ustawia window.ROZDZIALY i window.PRZEPISY
  (index.html wczytuje ten plik przed silnikiem). Silnik tylko czyta przepisy, niczego w nich nie zapisuje.
  Widoki (adres po #): #spis (domyślny) i #przepis/<id>, np. #przepis/pierogi-babci-zosi.
*/
(function () {
  "use strict";

  function el(id) { return document.getElementById(id); }

  // ===== Dane z materialy/przepisy.js =====

  // Tekst albo pusty napis, gdy pola brak.
  function tekst(wartosc) { return wartosc === null || wartosc === undefined ? "" : String(wartosc).trim(); }

  // Liczba z danych (500, "500", 0.5, "1,5", "½", "1½", "1/2", "1 1/2") albo null, gdy jej brak.
  const ULAMKI = { "½": 0.5, "¼": 0.25, "¾": 0.75 };
  function liczba(wartosc) {
    if (wartosc === null || wartosc === undefined || wartosc === "") return null;
    const napis = String(wartosc).trim().replace(",", ".");
    const ulamek = /^(\d*)\s*([½¼¾])$/.exec(napis);             // „½”, „1½”
    const kreska = /^(?:(\d+)\s+)?(\d+)\/(\d+)$/.exec(napis);  // „1/2”, „1 1/2”
    let n = Number(napis);
    if (ulamek) n = Number(ulamek[1]) + ULAMKI[ulamek[2]];
    if (kreska) n = Number(kreska[1] || 0) + Number(kreska[2]) / Number(kreska[3]);
    return n > 0 && isFinite(n) ? n : null;
  }

  // Składnik zapisany jako napis („2 jajka”) pokazujemy tak, jak jest zapisany.
  function skladnik(s) {
    return typeof s === "object" ? s : { ilosc: null, jednostka: "", nazwa: tekst(s), dzial: "inne" };
  }

  // Przepis z uzupełnionymi brakami, żeby literówka w danych nie psuła strony.
  function uporzadkuj(p) {
    const kroki = Array.isArray(p.kroki) ? p.kroki : typeof p.kroki === "string" ? p.kroki.split("\n") : [];
    return {
      id: tekst(p.id),
      tytul: tekst(p.tytul) || "Przepis bez tytułu",
      podtytul: tekst(p.podtytul),
      rozdzial: tekst(p.rozdzial) || "Bez rozdziału",
      porcje: liczba(p.porcje),
      czas_min: liczba(p.czas_min),
      trudnosc: tekst(p.trudnosc),
      skladniki: Array.isArray(p.skladniki) ? p.skladniki.filter(Boolean).map(skladnik) : [],
      kroki: kroki.map(tekst).filter(Boolean),
      pochodzenie: tekst(p.pochodzenie),
      notatki: tekst(p.notatki),
      zdjecie: tekst(p.zdjecie),
      niepewne: Array.isArray(p.niepewne) ? p.niepewne : []
    };
  }

  // Adres przepisu z tytułu, gdy w danych nie ma „id”: „Sernik cioci Heli” → „sernik-cioci-heli”.
  const BEZ_OGONKOW = { "ą": "a", "ć": "c", "ę": "e", "ł": "l", "ń": "n", "ó": "o", "ś": "s", "ź": "z", "ż": "z" };
  function idZTytulu(tytul) {
    return tytul.toLowerCase()
      .replace(/[ąćęłńóśźż]/g, function (znak) { return BEZ_OGONKOW[znak]; })
      .replace(/[^a-z0-9]+/g, "-").replace(/^-+|-+$/g, "") || "przepis";
  }

  // Każdy przepis potrzebuje własnego adresu (id): brakujący bierzemy z tytułu, a powtórzony dostaje „-2”, „-3”…
  const ZAJETE_ID = Object.create(null);
  function wlasneId(p) {
    const baza = p.id || idZTytulu(p.tytul);
    let id = baza;
    for (let n = 2; ZAJETE_ID[id]; n++) id = baza + "-" + n;
    ZAJETE_ID[id] = true;
    p.id = id;
    return p;
  }

  const ROZDZIALY = Array.isArray(window.ROZDZIALY) ? window.ROZDZIALY.map(tekst) : [];
  const PRZEPISY = (Array.isArray(window.PRZEPISY) ? window.PRZEPISY : [])
    .filter(function (p) { return p && typeof p === "object"; })
    .map(uporzadkuj)
    .map(wlasneId);

  // ===== Kolejność w książce: rozdziały i numery stron =====

  // Rozdziały w kolejności z ROZDZIALY; rozdział spoza listy trafia na koniec.
  const KOLEJNOSC_ROZDZIALOW = ROZDZIALY.slice();
  PRZEPISY.forEach(function (p) {
    if (KOLEJNOSC_ROZDZIALOW.indexOf(p.rozdzial) === -1) KOLEJNOSC_ROZDZIALOW.push(p.rozdzial);
  });

  // Polska kolejność alfabetyczna (ą po a, ł po l).
  const porownaj = window.Intl && Intl.Collator ? new Intl.Collator("pl").compare
    : function (a, b) { return a.localeCompare(b); };

  // Przepisy w kolejności książki: rozdziały po kolei, w rozdziale alfabetycznie.
  const KSIAZKA = PRZEPISY.slice().sort(function (a, b) {
    return KOLEJNOSC_ROZDZIALOW.indexOf(a.rozdzial) - KOLEJNOSC_ROZDZIALOW.indexOf(b.rozdzial) ||
      porownaj(a.tytul, b.tytul);
  });

  // Numer rozdziału to jego miejsce na liście (Obiady = 3).
  function numerRozdzialu(nazwa) { return KOLEJNOSC_ROZDZIALOW.indexOf(nazwa) + 1; }

  // Numer strony = pozycja w spisie + 1, bo strona 1 to spis treści (pierwszy przepis ma stronę 2).
  function numerStrony(przepis) { return KSIAZKA.indexOf(przepis) + 2; }

  function znajdzPrzepis(id) {
    for (let i = 0; i < KSIAZKA.length; i++) if (KSIAZKA[i].id === id) return KSIAZKA[i];
    return null;
  }

  // ===== Liczby i odmiana (1 łyżka, 2 łyżki, 5 łyżek, ½ łyżki) =====

  // Która forma słowa pasuje do liczby: 0 → „1 łyżka”, 1 → „2 łyżki”, 2 → „5 łyżek”, 3 → „½ łyżki”.
  function formaDlaLiczby(n) {
    if (n % 1 !== 0) return 3;
    if (n === 1) return 0;
    const jednosci = n % 10;
    const dziesiatki = n % 100;
    if (jednosci >= 2 && jednosci <= 4 && (dziesiatki < 12 || dziesiatki > 14)) return 1;
    return 2;
  }

  // Jednostki, które się odmieniają. Skróty (g, kg, ml, l, szt., opak.) zostają bez zmian.
  const ODMIANA_JEDNOSTEK = {
    "łyżka": ["łyżka", "łyżki", "łyżek", "łyżki"],
    "łyżeczka": ["łyżeczka", "łyżeczki", "łyżeczek", "łyżeczki"],
    "szklanka": ["szklanka", "szklanki", "szklanek", "szklanki"],
    "szczypta": ["szczypta", "szczypty", "szczypt", "szczypty"],
    "ząbek": ["ząbek", "ząbki", "ząbków", "ząbka"],
    "pęczek": ["pęczek", "pęczki", "pęczków", "pęczka"]
  };
  const FORMY_PORCJI = ["porcja", "porcje", "porcji", "porcji"];
  const FORMY_PRZEPISU = ["przepis", "przepisy", "przepisów", "przepisu"];

  // Liczba ze słowem w dobrej formie, np. „4 porcje”, „12 porcji”, „1½ porcji”.
  function ileCzego(n, formy) { return zUlamkiem(n) + "\u00A0" + formy[formaDlaLiczby(n)]; }

  // Waga i objętość z przecinkiem (0,5 kg), reszta z ułamkami (½ szklanki).
  const MIARY = ["g", "kg", "ml", "l"];

  function zPrzecinkiem(n) { return String(Math.round(n * 100) / 100).replace(".", ","); }

  function zUlamkiem(n) {
    const cale = Math.floor(n);
    const znak = { 25: "¼", 50: "½", 75: "¾" }[Math.round((n - cale) * 100)];
    if (znak) return (cale > 0 ? cale : "") + znak;
    return zPrzecinkiem(n);
  }

  // Ilość z jednostką, np. „500 g”, „2 łyżki”, „1”; pusty napis, gdy ilości nie ma.
  // Przy sztukach nie piszemy „szt.”: „1 jajko”, nie „1 szt. jajko”.
  function opisIlosci(ilosc, jednostka) {
    if (ilosc === null) return "";
    if (MIARY.indexOf(jednostka) !== -1) return zPrzecinkiem(ilosc) + "\u00A0" + jednostka;
    if (jednostka === "szt." || jednostka === "") return zUlamkiem(ilosc);
    const formy = ODMIANA_JEDNOSTEK[jednostka];
    return zUlamkiem(ilosc) + "\u00A0" + (formy ? formy[formaDlaLiczby(ilosc)] : jednostka);
  }

  // Składnik bez liczby: sama nazwa („sól do smaku”) albo szczypta („szczypta soli”).
  // Inna jednostka bez liczby znaczy, że liczby nie udało się odczytać: „[?] łyżki mąki”
  // (gdy nazwa sama zaczyna się od „[?]”, zostaje bez zmian).
  function opisBezIlosci(jednostka, nazwa) {
    if (!jednostka || jednostka === "szt." || nazwa.indexOf("[?]") === 0) return nazwa;
    if (jednostka === "szczypta") return "szczypta " + nazwa;
    const formy = ODMIANA_JEDNOSTEK[jednostka];
    return "[?] " + (formy ? formy[1] : jednostka) + " " + nazwa;
  }

  // ===== Tekst na stronie =====

  // Twarda spacja po jednoliterowych słowach (a, i, o, u, w, z) i po liczbach („3 minuty”),
  // żeby nie zostawały same na końcu wiersza. Dwa przebiegi, bo takie słowa bywają obok siebie („i z cebulą”).
  function bezSierotek(napis) {
    const wzor = /(^|[\s\u00A0])([aiouwzAIOUWZ]) /g;
    return napis.replace(wzor, "$1$2\u00A0").replace(wzor, "$1$2\u00A0").replace(/(\d) /g, "$1\u00A0");
  }

  // Wstawia tekst do elementu; „[?]” (słowo nieodczytane z kartki) dostaje żółte wyróżnienie.
  function wpiszTekst(element, napis) {
    element.textContent = "";
    tekst(napis).split("[?]").forEach(function (kawalek, i) {
      if (i > 0) {
        const znak = document.createElement("mark");
        znak.className = "niepewne";
        znak.title = "Tego nie udało się odczytać z kartki";
        znak.textContent = "[?]";
        element.appendChild(znak);
      }
      element.appendChild(document.createTextNode(bezSierotek(kawalek)));
    });
  }

  // Czy w przepisie zostało coś nieodczytanego z kartki (pole „niepewne” albo „[?]” w tekście).
  function czyNiepewny(p) {
    const skladniki = p.skladniki.map(function (s) {
      return liczba(s.ilosc) === null ? opisBezIlosci(tekst(s.jednostka), tekst(s.nazwa)) : tekst(s.nazwa);
    });
    const wszystko = [p.tytul, p.podtytul, p.pochodzenie, p.notatki].concat(p.kroki).concat(skladniki);
    return p.niepewne.length > 0 || wszystko.join(" ").indexOf("[?]") !== -1;
  }

  // Adres zdjęcia potrawy. W danych ścieżka jest względem pracowni (materialy/zdjecia/…),
  // a strona leży w aplikacja/, więc dokładamy „../”. Adresów z internetu nie wczytujemy.
  function adresZdjecia(sciezka) {
    if (!sciezka) return "";
    if (/^data:image\//.test(sciezka)) return sciezka;   // zdjęcie wklejone w plik (np. do udostępnienia)
    if (/^[a-z][a-z0-9+.-]*:|^[\/\\]/i.test(sciezka)) return "";
    return "../" + sciezka;
  }

  // ===== Strona przepisu =====

  let biezacy = null;   // przepis, który teraz widać

  // Jedna pozycja listy składników, np. „<b>500 g</b> mąki pszennej”.
  function pozycjaSkladnika(s) {
    const li = document.createElement("li");
    const jednostka = tekst(s.jednostka);
    const ilosc = opisIlosci(liczba(s.ilosc), jednostka);
    const nazwa = document.createElement("span");

    if (ilosc) {
      li.appendChild(znacznikIlosci(ilosc));
      li.appendChild(document.createTextNode(" "));
      wpiszTekst(nazwa, s.nazwa);
    } else {
      wpiszTekst(nazwa, opisBezIlosci(jednostka, tekst(s.nazwa)));
    }
    li.appendChild(nazwa);
    return li;
  }

  function znacznikIlosci(napis) {
    const b = document.createElement("b");
    b.className = "ilosc";
    b.textContent = napis;
    return b;
  }

  function rysujPrzepis(p) {
    document.title = p.tytul + " · Domowy przepiśnik";

    // Mały szary wiersz u góry: rozdział i numer strony
    el("przepis-rozdzial").textContent = "Rozdział " + numerRozdzialu(p.rozdzial) + " · " + p.rozdzial;
    el("przepis-numer").textContent = numerStrony(p);
    wpiszTekst(el("przepis-tytul"), p.tytul);
    wpiszTekst(el("przepis-podtytul"), p.podtytul);

    // Plakietki: porcje, czas, trudność
    el("przepis-porcje").textContent = p.porcje ? ileCzego(p.porcje, FORMY_PORCJI) : "";
    el("przepis-czas").textContent = p.czas_min ? p.czas_min + "\u00A0min" : "";
    el("przepis-trudnosc").textContent = p.trudnosc;
    el("przepis-plakietki").hidden = !p.porcje && !p.czas_min && !p.trudnosc;

    // Zdjęcie potrawy, jeśli jest
    const zdjecie = el("przepis-zdjecie");
    const adres = adresZdjecia(p.zdjecie);
    zdjecie.hidden = !adres;
    if (adres) {
      zdjecie.onerror = function () { zdjecie.hidden = true; };
      zdjecie.alt = "Zdjęcie: " + p.tytul;
      zdjecie.src = adres;
    } else {
      zdjecie.removeAttribute("src");
    }

    // Składniki i kroki
    const skladniki = el("przepis-skladniki");
    skladniki.textContent = "";
    p.skladniki.forEach(function (s) { skladniki.appendChild(pozycjaSkladnika(s)); });

    const kroki = el("przepis-kroki");
    kroki.textContent = "";
    p.kroki.forEach(function (krok) {
      const li = document.createElement("li");
      wpiszTekst(li, krok);
      kroki.appendChild(li);
    });

    // Stopka: skąd przepis i notatki
    const skad = el("przepis-skad");
    skad.textContent = "";
    if (p.pochodzenie) {
      const etykieta = document.createElement("span");
      etykieta.className = "skad__etykieta";
      etykieta.textContent = "Skąd: ";
      const wartosc = document.createElement("span");
      wpiszTekst(wartosc, p.pochodzenie);
      skad.appendChild(etykieta);
      skad.appendChild(wartosc);
    }
    wpiszTekst(el("przepis-notatki"), p.notatki);
    const niepewny = czyNiepewny(p);
    el("przepis-niepewne").hidden = !niepewny;
    el("przepis-stopka").hidden = !p.pochodzenie && !p.notatki && !niepewny;
  }

  // ===== Spis przepisów z wyszukiwarką (etap 2) =====

  let wybranyRozdzial = "";   // "" = wszystkie rozdziały

  // Do porównań: małe litery i bez polskich znaków (ą → a, ł → l), więc „TWAROG” znajdzie „twaróg”.
  function doSzukania(napis) {
    return tekst(napis).toLowerCase().replace(/ł/g, "l").normalize("NFD").replace(/[\u0300-\u036f]/g, "");
  }

  // Szukamy w tytule, składnikach i pochodzeniu.
  const TEKST_DO_SZUKANIA = {};
  KSIAZKA.forEach(function (p) {
    const nazwy = p.skladniki.map(function (s) { return tekst(s.nazwa); });
    TEKST_DO_SZUKANIA[p.id] = doSzukania([p.tytul, p.pochodzenie].concat(nazwy).join(" "));
  });

  // Każde słowo zapytania musi się znaleźć. Polskie końcówki się zmieniają (jajko – jajek, mąka – mąki,
  // ziemniaki – ziemniaków), więc słowom od 5 liter obcinamy dwie ostatnie litery, a słowom z 4 liter
  // zakończonym samogłoską – tę samogłoskę.
  function pasuje(p, zapytanie) {
    return doSzukania(zapytanie).split(/\s+/).filter(Boolean).every(function (slowo) {
      if (slowo.length >= 5) slowo = slowo.slice(0, -2);
      else if (slowo.length === 4 && /[aeiouy]$/.test(slowo)) slowo = slowo.slice(0, -1);
      return TEKST_DO_SZUKANIA[p.id].indexOf(slowo) !== -1;
    });
  }

  // Przyciski rozdziałów: „Wszystkie” i rozdziały, w których są przepisy.
  function przygotujSpis() {
    el("spis-licznik").textContent = ileCzego(KSIAZKA.length, FORMY_PRZEPISU);

    const miejsce = el("rozdzialy");
    const nazwy = [""].concat(KOLEJNOSC_ROZDZIALOW.filter(function (r) {
      return KSIAZKA.some(function (p) { return p.rozdzial === r; });
    }));
    nazwy.forEach(function (nazwa) {
      const przycisk = document.createElement("button");
      przycisk.type = "button";
      przycisk.textContent = nazwa || "Wszystkie";
      przycisk.setAttribute("data-rozdzial", nazwa);
      przycisk.addEventListener("click", function () {
        wybranyRozdzial = nazwa;
        rysujSpis();
      });
      miejsce.appendChild(przycisk);
    });

    el("szukaj").addEventListener("input", rysujSpis);
    rysujSpis();
  }

  // Jedna pozycja spisu: tytuł, kropki i numer strony (kropki rysuje styl.css), pod spodem podtytuł.
  function pozycjaSpisu(p) {
    const li = document.createElement("li");
    const link = document.createElement("a");
    link.className = "pozycja";
    link.href = "#przepis/" + encodeURIComponent(p.id);

    const wiersz = document.createElement("span");
    wiersz.className = "pozycja__wiersz";
    const tytul = document.createElement("span");
    tytul.className = "pozycja__tytul";
    wpiszTekst(tytul, p.tytul);
    const strona = document.createElement("span");
    strona.className = "pozycja__strona";
    strona.textContent = numerStrony(p);
    wiersz.appendChild(tytul);
    wiersz.appendChild(strona);
    link.appendChild(wiersz);

    if (p.podtytul) {
      const pod = document.createElement("span");
      pod.className = "pozycja__pod";
      wpiszTekst(pod, p.podtytul);
      link.appendChild(pod);
    }
    li.appendChild(link);
    return li;
  }

  function rysujSpis() {
    const zapytanie = el("szukaj").value.trim();
    const widoczne = KSIAZKA.filter(function (p) {
      return (!wybranyRozdzial || p.rozdzial === wybranyRozdzial) && pasuje(p, zapytanie);
    });

    document.querySelectorAll("[data-rozdzial]").forEach(function (przycisk) {
      przycisk.setAttribute("aria-pressed", String(przycisk.getAttribute("data-rozdzial") === wybranyRozdzial));
    });

    // Lista jak spis treści: rozdział po rozdziale
    const lista = el("spis-lista");
    lista.textContent = "";
    KOLEJNOSC_ROZDZIALOW.forEach(function (rozdzial) {
      const wRozdziale = widoczne.filter(function (p) { return p.rozdzial === rozdzial; });
      if (!wRozdziale.length) return;
      const sekcja = document.createElement("section");
      sekcja.className = "spis__rozdzial";
      const naglowek = document.createElement("h2");
      naglowek.textContent = "Rozdział " + numerRozdzialu(rozdzial) + " · " + rozdzial;
      const ol = document.createElement("ol");
      ol.className = "spis__lista";
      ol.setAttribute("role", "list");
      wRozdziale.forEach(function (p) { ol.appendChild(pozycjaSpisu(p)); });
      sekcja.appendChild(naglowek);
      sekcja.appendChild(ol);
      lista.appendChild(sekcja);
    });

    // Wynik wyszukiwania albo podpowiedź, gdy nic nie pasuje
    const wynik = el("spis-wynik");
    wynik.textContent = zapytanie || wybranyRozdzial ? "Znaleziono: " + ileCzego(widoczne.length, FORMY_PRZEPISU) : "";
    if (!widoczne.length) {
      const pusto = document.createElement("div");
      pusto.className = "spis__pusto";
      const napis = document.createElement("p");
      napis.textContent = zapytanie ? "Nie ma przepisu ze słowem „" + zapytanie + "”." : "W tym rozdziale nie ma jeszcze przepisów.";
      const wszystkie = document.createElement("button");
      wszystkie.type = "button";
      wszystkie.className = "przycisk";
      wszystkie.textContent = "Pokaż wszystkie przepisy";
      wszystkie.addEventListener("click", function () {
        el("szukaj").value = "";
        wybranyRozdzial = "";
        rysujSpis();
        el("szukaj").focus();
      });
      pusto.appendChild(napis);
      pusto.appendChild(wszystkie);
      lista.appendChild(pusto);
    }
  }

  // ===== Widoki: #spis i #przepis/<id> =====

  let przewiniecieSpisu = 0;   // dokąd był przewinięty spis, żeby po powrocie wrócić w to samo miejsce

  function pokazKomunikat(napis) {
    const komunikat = el("komunikat");
    komunikat.textContent = "";
    const p = document.createElement("p");
    p.textContent = napis;
    komunikat.appendChild(p);
    if (KSIAZKA.length) {
      const link = document.createElement("a");
      link.href = "#spis";
      link.textContent = "Wróć do spisu przepisów";
      komunikat.appendChild(link);
    }
    komunikat.hidden = false;
    el("spis").hidden = true;
    el("przepis").hidden = true;
  }

  function pokazWidok(poKliknieciu) {
    let adres = "";
    try { adres = decodeURIComponent(location.hash.replace(/^#/, "")); } catch (e) { /* zły adres: pokaż spis */ }
    el("komunikat").hidden = true;

    if (adres.indexOf("przepis/") === 0) {
      const p = znajdzPrzepis(adres.slice("przepis/".length));
      if (!p) {
        pokazKomunikat("Nie ma przepisu o adresie „" + adres.slice("przepis/".length) + "”.");
        return;
      }
      if (!el("spis").hidden) przewiniecieSpisu = window.scrollY;
      biezacy = p;
      rysujPrzepis(p);
      el("spis").hidden = true;
      el("przepis").hidden = false;
      window.scrollTo(0, 0);
      if (poKliknieciu) el("przepis-tytul").focus({ preventScroll: true });
      return;
    }

    document.title = "Domowy przepiśnik";
    el("przepis").hidden = true;
    el("spis").hidden = false;
    window.scrollTo(0, przewiniecieSpisu);
    // Po powrocie z przepisu klawiatura wraca na jego pozycję w spisie
    const ostatni = biezacy && document.querySelector('.pozycja[href="#przepis/' + encodeURIComponent(biezacy.id) + '"]');
    if (poKliknieciu && ostatni) ostatni.focus({ preventScroll: true });
  }

  // ===== Start =====

  if (!Array.isArray(window.PRZEPISY)) {
    pokazKomunikat("Nie widzę przepisów. Plik materialy/przepisy.js nie istnieje, ma błąd albo inny układ, " +
      "niż czyta ta strona (folder materialy leży obok folderu aplikacja). " +
      "Napisz Claude'owi: „Sprawdź plik z przepisami”.");
    return;
  }
  if (!KSIAZKA.length) {
    pokazKomunikat("W pliku materialy/przepisy.js nie ma jeszcze żadnego przepisu.");
    return;
  }

  przygotujSpis();
  window.addEventListener("hashchange", function () { pokazWidok(true); });
  pokazWidok(false);
})();
