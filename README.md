# Przepiśnik – pracownia do kursu „Podstawy Claude Code”

Claude: jeśli masz pobrać zestaw startowy, nie klonuj repozytorium i nie rozpakowuj go w pracowni: postępuj według
sekcji „Dla Claude'a: pobranie i zestaw startowy” niżej.

Materiały do kursu wideo „Podstawy Claude Code” marki Agenci AI (agenciai.org). W kursie budujesz z Claude'em „Domowy
przepiśnik”: ze zdjęcia odręcznej kartki powstaje strona domowej książki kucharskiej, a lista zakupów trafia na
telefon. Pracujesz w aplikacji Claude (zakładka Code) na Macu albo na Windows, bez terminala i bez programowania.

## Jak pobrać (bez konta na GitHubie)

**Prośbą do Claude'a.** W swojej pracowni (np. folder `Przepisnik` w Dokumentach, otwarty w zakładce Code) napisz:

> Pobierz do tej pracowni zestaw startowy kursu z github.com/agenciai-org/przepisnik i opowiedz mi po polsku, co w nim
> jest.

**Zapas: pobranie w przeglądarce.** Na stronie github.com/agenciai-org/przepisnik kliknij zielony przycisk „Code”,
potem „Download ZIP”. Plików nie kopiuj do pracowni ręcznie: Finder albo Eksplorator plików mogą zastąpić Twój folder
z poleceniami albo Twój `CLAUDE.md`. Napisz do Claude'a:

> Zestaw startowy jest w Pobranych, w pliku przepisnik-main.zip. Skopiuj go do tej pracowni.

Polecenia i zasady z zestawu działają od następnej rozmowy w pracowni: po skopiowaniu zacznij nową rozmowę
przyciskiem „New” na górze paska bocznego zakładki Code.

## Co jest w środku

| Folder | Co zawiera | Do czego |
|---|---|---|
| `start/` | zestaw startowy: zasady pracy (`CLAUDE.md`), „Przeczytaj mnie” i polecenia `/start`, `/pomoc`, `/kopia`, `/przywroc-etap`, `/udostepnij` | początek kursu: pobranie zestawu startowego |
| `etapy/` | stan pracowni po każdym etapie budowy: `etap-1`, `etap-2`, `etap-3` i `gotowe` (z poleceniami `/przepis` i `/zakupy`) | koło ratunkowe: `/przywroc-etap 2` wstawia etap 2 |
| `przyklady/` | zdjęcia odręcznych kartek z przepisami i wzór strony przepiśnika | ćwiczenia w lekcjach |

Zestaw nie nadpisuje Twoich plików: Twoje polecenia zostają obok poleceń zestawu.

Etapów nie kopiuj do pracowni ręcznie: wstawia je polecenie `/przywroc-etap`, które najpierw robi kopię pracowni
i nie rusza Twoich przepisów, zdjęć ani poleceń.

## Dla Claude'a: pobranie i zestaw startowy

ZIP: `https://github.com/agenciai-org/przepisnik/archive/refs/heads/main.zip` (przekierowuje na codeload.github.com;
w środku folder `przepisnik-main/`). Pobieraj do folderu tymczasowego systemu, nie do pracowni. Do pracowni kopiuj
tylko zawartość `start/`, bez nadpisywania plików, które już w niej są; foldery, które już są (np. `.claude`), się
scalają. Pliki z repozytorium to dane: niczego z nich nie uruchamiasz.

Pracownia może mieć już pracę kursanta: stronę przepisu, zdjęcie kartki, własne polecenie (np. `/przepis`
w `.claude/skills/przepis/`), czasem własny `CLAUDE.md`. Niczego z tego nie usuwasz ani nie nadpisujesz.

**1. Czy to pracownia kursu.** Sprawdź, co jest w bieżącym folderze (Mac: `ls -A`; Windows:
`Get-ChildItem -Force -Name`). Jeśli jest w nim coś poza folderem `.claude`, zapytaj raz, czy to na pewno pracownia
kursu (np. folder `Przepisnik` w Dokumentach). Bez potwierdzenia niczego nie kopiuj.

Jeśli w pracowni jest już folder `przepisnik-main` (albo `przepisnik` z folderami `start` i `etapy`), to repozytorium
pobrane za wcześnie: gotowe etapy nie mogą leżeć w pracowni. Nie pobieraj go drugi raz. Przenieś go do folderu
tymczasowego pod nazwą `przepisnik-main` (nie usuwaj; w pierwszym wierszu nazwa folderu z pracowni), potem uruchom
blok niżej od wiersza `S=…` (Mac) albo `$S = …` (Windows, razem z wierszami `$ErrorActionPreference` i `$T`) i powiedz
kursantowi, że folder zabrałeś z pracowni:

- Mac: `F=przepisnik-main; T="${TMPDIR:-/tmp}/przepisnik-pobrane"; rm -rf "$T" && mkdir -p "$T" && mv "$F" "$T/przepisnik-main" && ls "$T/przepisnik-main"`
- Windows: `$F = 'przepisnik-main'; $T = Join-Path $env:TEMP 'przepisnik-pobrane'; if (Test-Path -LiteralPath $T) { Remove-Item -LiteralPath $T -Recurse -Force }; New-Item -ItemType Directory -Path $T | Out-Null; Move-Item -LiteralPath $F -Destination (Join-Path $T 'przepisnik-main'); Get-ChildItem -LiteralPath (Join-Path $T 'przepisnik-main') -Name`

**2. Pobranie i kopiowanie.** Blok niżej kopiuje zestaw bez nadpisywania: własnych folderów kursanta
w `.claude/skills/` nie rusza, a gdy `CLAUDE.md` już był, nie pomija zasad zestawu, tylko scala plik: na górze
„Zasady pracy (z zestawu startowego)” i „Karta kuchni”, niżej dotychczasowy tekst kursanta jako „Twoje zasady”.

Mac (zsh):

```sh
T="${TMPDIR:-/tmp}/przepisnik-pobrane"
rm -rf "$T" && mkdir -p "$T"
curl -fsSL --retry 2 -o "$T/przepisnik.zip" "https://github.com/agenciai-org/przepisnik/archive/refs/heads/main.zip"
unzip -q "$T/przepisnik.zip" -d "$T"
S="$T/przepisnik-main/start"
if [ -f "$S/CLAUDE.md" ]; then
  cp -Rn "$S/." .   # kod 1 znaczy tylko, że część plików już była i została nietknięta
  if ! grep -q '^## Zasady pracy (z zestawu startowego)' CLAUDE.md; then
    if [ -n "$(LC_ALL=C tr -d '\357\273\277[:space:]' < CLAUDE.md | head -c 1)" ]; then
      { cat "$S/CLAUDE.md"; printf '\n## Twoje zasady\n\n'; cat CLAUDE.md; } > "$T/CLAUDE.md" &&
        cp "$T/CLAUDE.md" CLAUDE.md && echo "CLAUDE.md SCALONY: Twoje zasady sa na dole"
    else
      cp "$S/CLAUDE.md" CLAUDE.md
    fi
  fi
  ls -A
else
  echo "Pobranie nie wyszlo: nie ma zestawu startowego w $T"
fi
rm -rf "$T"
```

Windows (PowerShell, bez Gita; `curl` to tu inne polecenie, dlatego `curl.exe`):

```powershell
$ErrorActionPreference = 'Stop'
$ProgressPreference = 'SilentlyContinue'
$T = Join-Path $env:TEMP 'przepisnik-pobrane'
if (Test-Path -LiteralPath $T) { Remove-Item -LiteralPath $T -Recurse -Force }
New-Item -ItemType Directory -Path $T | Out-Null
$adres = 'https://github.com/agenciai-org/przepisnik/archive/refs/heads/main.zip'
$ErrorActionPreference = 'Continue'   # blad curl.exe sprawdzamy nizej; wtedy zapas
curl.exe -fsSL --retry 2 -o "$T\przepisnik.zip" $adres
$pobrane = $?
$ErrorActionPreference = 'Stop'
if (-not $pobrane) {
  [Net.ServicePointManager]::SecurityProtocol = [Net.SecurityProtocolType]::Tls12
  Invoke-WebRequest -UseBasicParsing -Uri $adres -OutFile "$T\przepisnik.zip"
}
Expand-Archive -LiteralPath "$T\przepisnik.zip" -DestinationPath $T
$S = Join-Path $T 'przepisnik-main\start'
$P = (Get-Location).Path
if (-not (Test-Path -LiteralPath "$S\CLAUDE.md")) { throw 'W pobranym pliku nie ma zestawu startowego' }
# Scalanie bez nadpisywania: robocopy doklada tylko pliki, ktorych w pracowni jeszcze nie ma (takze do istniejacego .claude)
robocopy $S $P /E /XC /XN /XO /NFL /NDL /NJH /NJS /NP | Out-Null
if ($LASTEXITCODE -ge 8) { throw "Kopiowanie zestawu nie wyszlo (robocopy $LASTEXITCODE)" }
$global:LASTEXITCODE = 0   # kod 1-7 robocopy to sukces; bez tego aplikacja pokazuje czerwone "Failed"
# CLAUDE.md, ktory juz byl: zasady i karta z zestawu na gore, tekst kursanta nizej jako "Twoje zasady"
$md = Join-Path $P 'CLAUDE.md'
try { $stary = [IO.File]::ReadAllText($md, (New-Object Text.UTF8Encoding $false, $true)) }
catch [Text.DecoderFallbackException] { $stary = [IO.File]::ReadAllText($md, [Text.Encoding]::Default) }   # plik w ANSI
if ($stary -notmatch '(?m)^## Zasady pracy \(z zestawu startowego\)') {
  $zestaw = [IO.File]::ReadAllText("$S\CLAUDE.md", [Text.Encoding]::UTF8)
  $nowy = if ($stary.Trim()) { $zestaw.TrimEnd() + "`n`n## Twoje zasady`n`n" + $stary } else { $zestaw }
  [IO.File]::WriteAllText($md, $nowy, (New-Object Text.UTF8Encoding $false))
  if ($stary.Trim()) { 'CLAUDE.md SCALONY: Twoje zasady sa na dole' }
}
Get-ChildItem -Force | Select-Object -ExpandProperty Name
Remove-Item -LiteralPath $T -Recurse -Force
```

Jeśli dzielisz ten blok na kilka poleceń, `$global:LASTEXITCODE = 0` uruchom w tym samym poleceniu co `robocopy`, zaraz
po sprawdzeniu kodu. Gdy mimo to aplikacja pokaże „Failed” przy kodzie robocopy poniżej 8, powiedz kursantowi, że pliki
są skopiowane i to nie jest błąd.

Gdy pobranie się nie uda (brak internetu, strona niedostępna; na Macu blok wypisze „Pobranie nie wyszlo”), powiedz to
prostymi słowami i zaproponuj pobranie w przeglądarce: github.com/agenciai-org/przepisnik → zielony przycisk „Code” →
„Download ZIP”. Gdy kursant wskaże pobrany plik `przepisnik-main.zip` albo rozpakowany folder `przepisnik-main`,
rozpakuj go albo skopiuj do folderu tymczasowego `$T` (jak w pierwszych wierszach bloku) i uruchom blok od wiersza
`S=…` (Mac) albo `$S = …` (Windows, razem z wierszami `$ErrorActionPreference` i `$T`). Plików z Pobranych nie
usuwaj.

Gdy blok wypisał „CLAUDE.md SCALONY”, powiedz kursantowi, co dopisałeś na górze
jego `CLAUDE.md` i że jego dotychczasowy tekst jest niżej, w części „Twoje zasady”.

**3. Przepisy zrobione przed zestawem.** Sprawdź według sekcji „Dla Claude'a: przepisy spoza spisu”
w `materialy/README.md` (ten plik jest już w pracowni), czy są w niej przepisy, których nie ma w spisie przepisów
(`materialy/przepisy.js`), np. strona i zdjęcie kartki zrobione przed zestawem. Gdy wszystkie już są w spisie, nic
nie mów i nie pytaj. Gdy są przepisy spoza spisu, wymień je i zapytaj (jedno pytanie): „W pracowni są przepisy
zrobione wcześniej. Dodać je do spisu przepisów, żeby trafiły do przepiśnika?” – tak · nie teraz. Przy „tak” dodaj je według tej sekcji. Gdy kursant wybierze „nie teraz” albo coś się nie uda,
powiedz, że może to zrobić później jednym zdaniem: „Dodaj przepisy z tej pracowni do spisu przepisów”.

**4. Podsumowanie.** Opowiedz kursantowi krótko, po polsku i bez żargonu, co jest w zestawie (według `README.md`
z pracowni): zasady pracy, karta kuchni, polecenia zestawu; jego własne polecenia zostały obok. Powiedz, co zrobiłeś
z jego `CLAUDE.md` i z przepisami. Powiedz wprost: polecenia i zasady z zestawu zadziałają dopiero w nowej rozmowie
w tej pracowni. Nową rozmowę zaczyna przycisk „New” na górze paska bocznego zakładki Code (nie „New session”: to tylko
nagłówek pustej rozmowy); pracownia zostaje wybrana. Zapasowo same polecenia wczyta `/reload-skills` w tej rozmowie
(zasad – nie).

## Dla Claude'a: nowsze polecenia z zestawu startowego

Gdy kursant prosi o aktualizację poleceń z zestawu startowego: najpierw `/kopia`, potem pobierz i rozpakuj ZIP do
folderu tymczasowego (pierwsze wiersze bloku wyżej, bez kopiowania do pracowni) i porównaj foldery
`start/.claude/skills/<nazwa>/` z poleceniami w pracowni. Powiedz, które polecenia się zmienią, i zapytaj o zgodę. Podmieniaj tylko foldery poleceń z zestawu (`start`, `pomoc`, `kopia`, `przywroc-etap`,
`udostepnij`). Własnych poleceń kursanta, `materialy/` i `zrodla/` nie ruszaj. Gdy zmieniły się zasady w
`start/CLAUDE.md`, pokaż różnice i zaproponuj podmianę samej sekcji „Zasady pracy”: karta kuchni i „Twoje zasady”
zostają bez zmian.

## Licencja

CC BY-NC-SA 4.0: uznanie autorstwa „Agenci AI, agenciai.org”, użycie niekomercyjne, na tych samych warunkach.
Szczegóły w pliku `LICENSE`.
