# Aeh To ics
Narzędzie do konwertowania kalendarza planu zajęć AEH to ics

https://hub.docker.com/r/devchew/aehcalendarconverter

## Quickstart

Docker
```
docker run -d -p 8080:8080/tcp aehcalendarconverter:latest 
```

or run from source
```
npm ci
npm run build
npm run serve
```

## develop

install node 18

```
npm ci
npm run start
```

## run prod

```
npm ci
npm run build
```
or use docker

```
docker build -t aehcalendarconverter:latest .
docker run --rm -d -p 8080:80/tcp aehcalendarconverter:latest 
```

## publish docker image

```
docker build -t devchew/aehcalendarconverter:latest .
docker image push devchew/aehcalendarconverter:latest
```
