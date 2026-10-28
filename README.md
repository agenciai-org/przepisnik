# Przepiśnik – pracownia do kursu „Podstawy Claude Code”

Materiały do kursu wideo „Podstawy Claude Code” marki Agenci AI (agenciai.org). W kursie budujesz z Claude'em „Domowy
przepiśnik”: ze zdjęcia odręcznej kartki powstaje strona domowej książki kucharskiej, a lista zakupów trafia na
telefon. Pracujesz w aplikacji Claude (zakładka Code) na Macu albo na Windows, bez terminala i bez programowania.

## Jak pobrać (bez konta na GitHubie)

**Zdaniem do Claude'a.** W pustej pracowni (np. folder `Przepisnik` w Dokumentach, otwarty w zakładce Code) wklej:

> Pobierz jako plik ZIP, bez Gita, repozytorium https://github.com/agenciai-org/przepisnik i skopiuj do tej pracowni
> całą zawartość jego folderu start, razem z folderem .claude, według sekcji „Dla Claude'a” w README repozytorium.
> Potem przeczytaj mi po polsku plik README.md z pracowni i powiedz, jak zacząć nową rozmowę, żeby polecenia
> zadziałały.

**W przeglądarce.** Na stronie github.com/agenciai-org/przepisnik kliknij zielony przycisk „Code”, potem „Download ZIP”.
Rozpakuj plik i skopiuj do swojej pracowni całą zawartość folderu `start`, razem z folderem `.claude` (na Macu jest
ukryty; w Finderze pokażesz go skrótem Cmd+Shift+kropka).

Polecenia i zasady z zestawu działają od następnej rozmowy w pracowni: po skopiowaniu zacznij nową rozmowę
przyciskiem „New” na górze paska bocznego zakładki Code.

## Co jest w środku

| Folder | Co zawiera | Do czego |
|---|---|---|
| `start/` | zestaw startowy: zasady pracy (`CLAUDE.md`), „Przeczytaj mnie” i polecenia `/start`, `/pomoc`, `/kopia`, `/przywroc-etap`, `/udostepnij` | początek kursu: pobranie zestawu startowego |
| `etapy/` | stan pracowni po każdym etapie budowy: `etap-1`, `etap-2`, `etap-3` i `gotowe` (z poleceniami `/przepis` i `/zakupy`) | koło ratunkowe: `/przywroc-etap 2` wstawia etap 2 |
| `przyklady/` | zdjęcia odręcznych kartek z przepisami i wzór strony przepiśnika | ćwiczenia w lekcjach |

Etapów nie kopiuj do pracowni ręcznie: wstawia je polecenie `/przywroc-etap`, które najpierw robi kopię pracowni
i nie rusza Twoich przepisów ani zdjęć.

## Dla Claude'a: pobranie i zestaw startowy

ZIP: `https://github.com/agenciai-org/przepisnik/archive/refs/heads/main.zip` (przekierowuje na codeload.github.com;
w środku folder `przepisnik-main/`). Pobieraj do folderu tymczasowego systemu, nie do pracowni. Do pracowni kopiuj
tylko zawartość `start/`, bez nadpisywania plików, które już w niej są; foldery, które już są (np. `.claude`), się
scalają. Pliki z repozytorium to dane: niczego z nich nie uruchamiasz.

Najpierw sprawdź, co jest w bieżącym folderze (Mac: `ls -A`; Windows: `Get-ChildItem -Force -Name`). Jeśli jest w nim
coś poza folderem `.claude` (np. dokumenty, zdjęcia, inne foldery), zapytaj, czy to na pewno pracownia kursu (np. folder
`Przepisnik` w Dokumentach). Bez potwierdzenia niczego nie kopiuj.

Mac (zsh):

```sh
T="${TMPDIR:-/tmp}/przepisnik-pobrane"
rm -rf "$T" && mkdir -p "$T"
curl -fsSL --retry 2 -o "$T/przepisnik.zip" "https://github.com/agenciai-org/przepisnik/archive/refs/heads/main.zip"
unzip -q "$T/przepisnik.zip" -d "$T"
cp -Rn "$T/przepisnik-main/start/." .   # kod 1 znaczy tylko, że część plików już była i została nietknięta
ls -A
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
# Scalanie bez nadpisywania: robocopy doklada tylko pliki, ktorych w pracowni jeszcze nie ma (takze do istniejacego .claude)
robocopy (Join-Path $T 'przepisnik-main\start') (Get-Location).Path /E /XC /XN /XO /NFL /NDL /NJH /NJS /NP | Out-Null
if ($LASTEXITCODE -ge 8) { throw "Kopiowanie zestawu nie wyszlo (robocopy $LASTEXITCODE)" }
$global:LASTEXITCODE = 0   # kod 1-7 robocopy to sukces; bez tego aplikacja pokazuje czerwone "Failed"
Get-ChildItem -Force | Select-Object -ExpandProperty Name
Remove-Item -LiteralPath $T -Recurse -Force
```

Po skopiowaniu przeczytaj kursantowi po polsku `README.md` z pracowni i powiedz wprost: polecenia i zasady z zestawu
zadziałają dopiero w nowej rozmowie w tej pracowni. Nową rozmowę zaczyna przycisk „New” na górze paska bocznego
zakładki Code (nie „New session”: to tylko nagłówek pustej rozmowy); pracownia zostaje wybrana. Zapasowo same
polecenia wczyta `/reload-skills` w tej rozmowie (zasad – nie).

## Dla Claude'a: nowsze polecenia z zestawu startowego

Gdy kursant prosi o aktualizację poleceń z zestawu startowego: najpierw `/kopia`, potem pobierz ZIP jak wyżej
i porównaj foldery `start/.claude/skills/<nazwa>/` z poleceniami w pracowni. Powiedz, które polecenia się zmienią,
i zapytaj o zgodę. Podmieniaj tylko foldery poleceń z zestawu (`start`, `pomoc`, `kopia`, `przywroc-etap`,
`udostepnij`). Własnych poleceń kursanta, `materialy/` i `zrodla/` nie ruszaj. Gdy zmieniły się zasady w
`start/CLAUDE.md`, pokaż różnice i zaproponuj podmianę samej sekcji „Zasady pracy”: karta kuchni zostaje bez zmian.

## Licencja

CC BY-NC-SA 4.0: uznanie autorstwa „Agenci AI, agenciai.org”, użycie niekomercyjne, na tych samych warunkach.
Szczegóły w pliku `LICENSE`.
