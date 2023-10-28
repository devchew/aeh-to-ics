# Aeh To ics
en: Simple tool to convert school calendar to more readable format

Narzędzie do konwertowania kalendarza planu zajęć AEH to ics

## Instrukcja

## Pobierz kalendarz

- log in: `mojeaeh.vizja.pl`
- "Dydaktyka" > "Plan zajęć"
- "wydrukuj Kalendarz"
- "Drukuj XLS"
- zapisz plik w tym samym katalogu co ten skrypt

## Uruchom aplikacje
- `npm run start`

## Wrzucanie kalendarza tak, aby był widoczny w teams

- musisz być zalogowany do szkolnego office
- https://outlook.office.com/calendar/addcalendar
- "przekaż z pliki"
- zaimportuj wygenerowany plik

## develop

install node 18

```
npm ci
npm run
```

## run prod

```
npm ci
npm run build
```
or use docker

```
docker build -t aehcalendarconverter:latest .
docker run --rm -d -p 8080:8080/tcp aehcalendarconverter:latest 
```

## publish docker image

```
docker build -t aehcalendarconverter:latest .
docker image push devchew/aehcalendarconverter:latest
```
