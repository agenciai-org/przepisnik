---
name: kopia
description: Zapisuje kopię całej pracowni, z poleceniami i kartą kuchni, w pliku z datą w folderze Kopie-przepisnika obok pracowni. Przydaje się przed dużą zmianą. Także gdy napiszesz „zrób kopię”, „kopia zapasowa”, „zabezpiecz pracownię”, „zapisz wszystko na wszelki wypadek”.
---

# /kopia – kopia całej pracowni

Wynik: plik `przepisnik-RRRR-MM-DD-GGMM.zip` (kolejna kopia w tej samej minucie: `…-2.zip`, `…-3.zip`) w folderze
`Kopie-przepisnika`, który leży obok pracowni (w tym samym folderze, w którym jest pracownia, np. w Dokumentach). W środku cała pracownia: `CLAUDE.md`, `.claude/`, `materialy/`,
`zrodla/` i reszta. W samej pracowni niczego nie zmieniasz ani nie usuwasz.

## Krok 1. Zapowiedź

Jedno zdanie: „Zapiszę całą pracownię w jednym pliku ZIP z dzisiejszą datą, w folderze Kopie-przepisnika obok
pracowni; w pracowni niczego nie zmieniam.” Nie pytaj o zgodę osobno – jeśli trzeba, poprosi o nią aplikacja.

## Krok 2. Rozmiar pracowni

Uruchamiaj polecenia w folderze pracowni (to folder bieżący; nie zmieniaj go). Najpierw sprawdź, ile waży pracownia:

- Mac: `du -sh .`
- Windows: `"{0:N1} MB" -f ((Get-ChildItem -LiteralPath . -Recurse -Force -File | Measure-Object -Property Length -Sum).Sum / 1MB)`

Ponad 1 GB to podejrzanie dużo jak na pracownię (może to cały folder Dokumenty albo zdjęcia z wakacji): powiedz, ile
waży, i zapytaj, czy to na pewno pracownia kursu i czy pakować (tak · nie). Bez „tak” zakończ.

## Krok 3. ZIP

Mac:

```sh
KOPIE="$(dirname "$PWD")/Kopie-przepisnika"
mkdir -p "$KOPIE"
BAZA="$KOPIE/przepisnik-$(date +%Y-%m-%d-%H%M)"
PLIK="$BAZA.zip"; n=2
while [ -e "$PLIK" ]; do PLIK="$BAZA-$n.zip"; n=$((n + 1)); done
ditto -c -k --sequesterRsrc --keepParent "$PWD" "$PLIK"
echo "Plik: $PLIK"
echo "Rozmiar: $(du -h "$PLIK" | cut -f1)"
echo "Pozycji z .claude: $(unzip -l "$PLIK" | grep -v __MACOSX | grep -c '/\.claude/')"
```

Windows (PowerShell):

```powershell
$ErrorActionPreference = 'Stop'
$ProgressPreference = 'SilentlyContinue'
Add-Type -AssemblyName System.IO.Compression, System.IO.Compression.FileSystem
$prac = (Get-Location).Path
$kopie = Join-Path (Split-Path $prac -Parent) 'Kopie-przepisnika'
New-Item -ItemType Directory -Force -Path $kopie | Out-Null
$baza = Join-Path $kopie ('przepisnik-' + (Get-Date -Format 'yyyy-MM-dd-HHmm'))
$plik = "$baza.zip"; $n = 2
while (Test-Path -LiteralPath $plik) { $plik = "$baza-$n.zip"; $n++ }
function IleClaude($p) {
  $z = [IO.Compression.ZipFile]::OpenRead($p)
  try { @($z.Entries | Where-Object { $_.FullName -match '(^|[\\/])\.claude[\\/]' }).Count } finally { $z.Dispose() }
}
Compress-Archive -LiteralPath $prac -DestinationPath $plik
$ile = IleClaude $plik
if ($ile -eq 0) {
  # zapas: Compress-Archive pominal .claude, wiec ZIP narzedziem .NET (bierze wszystkie pliki)
  Remove-Item -LiteralPath $plik
  [IO.Compression.ZipFile]::CreateFromDirectory($prac, $plik, [IO.Compression.CompressionLevel]::Optimal, $true)
  $ile = IleClaude $plik
}
"Plik: $plik"
"Rozmiar: {0:N1} MB" -f ((Get-Item -LiteralPath $plik).Length / 1MB)
"Pozycji z .claude: $ile"
```

## Krok 4. Sprawdzenie

- „Pozycji z .claude” musi być większe od zera. Jeśli jest 0, kopia jest niepełna: powiedz o tym wprost.
- Jeśli polecenie się nie udało, powiedz po polsku, co się stało (bez kodów błędów), i spróbuj najwyżej jeszcze raz.

## Krok 5. Podsumowanie

- Co zrobione i gdzie: „Kopia gotowa: `przepisnik-2026-10-31-1015.zip` (8,8 MB) w folderze `Kopie-przepisnika` obok
  pracowni. Jest w niej wszystko, także polecenia i karta kuchni.”
- Jedno pytanie: „Otworzyć folder z kopiami w Finderze?” (na Windows: „w Eksploratorze plików?”) – tak · nie. Po
  „tak”: Mac `open "<folder z kopiami>"`, Windows `Invoke-Item -LiteralPath "<folder z kopiami>"`.
- Co dalej: „Kopię możesz przenieść na pendrive albo do chmury (np. iCloud Drive, OneDrive, Dysk Google).”

Gdy kopię robisz w ramach innego polecenia (np. `/przywroc-etap`), pomiń pytanie o folder, podaj tylko nazwę pliku
i rozmiar, i wróć do tamtego polecenia.
