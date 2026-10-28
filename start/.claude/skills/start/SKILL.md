---
name: start
description: Wypełnia albo zmienia kartę kuchni (dla kogo i jak gotujesz) – kilka krótkich pytań z odpowiedziami do kliknięcia. Działa też, gdy napiszesz „wypełnij kartę kuchni”, „zmień kartę kuchni”, „gotuję teraz dla innej liczby osób”, „dopisz alergię”, „dopisz dietę”.
---

# /start – karta kuchni

Cel: zapisać w `CLAUDE.md` sekcję „Karta kuchni”. Czytasz ją na początku każdej rozmowy i stosujesz przy przepisach
i listach zakupów.

## Zasady rozmowy

- Jedno pytanie naraz. Pytania z wyborem zadawaj narzędziem pytań z odpowiedziami do kliknięcia (`AskUserQuestion`),
  z odpowiedziami podanymi niżej; własną odpowiedź kursant wpisze w polu „Other”. Gdy tego narzędzia nie ma, pokaż te
  same odpowiedzi jako ponumerowaną listę.
- Po każdym pytaniu czekaj na odpowiedź – także w trybie Auto. Nie odpowiadaj za kursanta i nie zgaduj.
- Gdy odpowiedź jest niejasna, dopytaj jednym krótkim pytaniem.
- Nie zapisuj nazwisk, adresów ani telefonów. Imiona tylko wtedy, gdy kursant sam je poda.

## Krok 1. Czy karta już jest

Przeczytaj sekcję `## Karta kuchni` w `CLAUDE.md`.

- Pusta („Jeszcze pusta…”) albo nie ma jej wcale: powiedz jednym zdaniem „Zapiszę Twoją kartę kuchni – 6 krótkich
  pytań.” i przejdź do kroku 2.
- Wypełniona: pokaż ją krótko i zapytaj: „Zadać wszystkie pytania od nowa czy zmienić jedną rzecz?” – od nowa · jedna
  rzecz. Przy jednej rzeczy zapytaj, którą (sześć możliwości, więc jako ponumerowaną listę rzeczy z karty), zadaj
  tylko to jedno pytanie z kroku 2 i przejdź do kroku 3.

## Krok 2. Pytania, po kolei

1. „Dla ilu osób zwykle gotujesz?” – jedna osoba · dwie osoby · trzy osoby · cztery osoby. Gdy więcej, kursant wpisze
   liczbę w „Other”.
2. Najpierw jedno zdanie: „Diety i alergie to dane o zdrowiu: zapiszę je tylko w karcie na Twoim komputerze i nigdy
   nie trafią na stronę z linkiem. Imię domownika podaj tylko, jeśli chcesz.” Potem pytanie: „Czy ktoś w domu ma dietę
   albo alergię?” – nie · tak. Przy „tak” zapytaj zwykłym pytaniem: „Jaką? Np. bez glutenu, bez laktozy, bez
   orzechów.” (kursant może ją też od razu wpisać w „Other”).
3. „Czego u Was nie lubicie albo nie jecie?” – nic szczególnego · napiszę, czego. Przy „napiszę” zapytaj zwykłym
   pytaniem: „Czego nie lubicie?”
4. „W jakich miarach mam pisać przepisy?” – gramy i mililitry · łyżki i szklanki · tak, jak na kartce
5. „Jak pisać kroki przygotowania?” – krótko, same najważniejsze czynności · dokładnie, krok po kroku
6. „Czy w kuchni chcesz duże litery na ekranie?” – tak · nie

## Krok 3. Zapis

Podmień w `CLAUDE.md` tylko sekcję `## Karta kuchni`: od jej nagłówka do następnego nagłówka `## ` albo do końca
pliku. Wstaw sekcję według wzoru niżej (wartości z odpowiedzi, dzisiejsza data). Zasad pracy ani innych sekcji nie
zmieniaj, także tych pod kartą. Sekcja „Karta kuchni” ma być w pliku jedna; gdy jej nie ma, dopisz ją na końcu pliku.

```markdown
## Karta kuchni

- Gotuję zwykle dla: 2 osób
- Diety i alergie: bez glutenu (Ania) – dane o zdrowiu: tylko tutaj, nigdy pod link
- Czego nie lubimy: kolendry
- Miary w przepisach: łyżki i szklanki
- Kroki przygotowania: dokładnie, krok po kroku
- Duże litery w kuchni: tak

Zapisano RRRR-MM-DD poleceniem /start. Żeby zmienić kartę, wpisz /start jeszcze raz.
```

Gdy diet i alergii nie ma, wpisz „Diety i alergie: brak” (bez dopisku o zdrowiu).

## Krok 4. Podsumowanie

Pokaż zapisaną kartę i napisz krótko:

- co zrobione: „Karta kuchni zapisana w pliku `CLAUDE.md`.”
- jak działa: „Przeczytam ją na początku każdej nowej rozmowy i będę z niej korzystać przy przepisach i listach
  zakupów.”
- co dalej: „Sprawdź: zacznij nową rozmowę (przycisk „New” na górze paska po lewej) i zapytaj mnie, dla ilu osób
  gotujesz. Gdy coś się zmieni, wpisz /start.”
