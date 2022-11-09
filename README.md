# Menu Scraper

## Build app locally
```bash
npm i
npm start
```

## Build Docker image
```bash
docker build . -t menu-scraper
```

## Run Docker container
```bash
docker run -p <PORT>:8081 menu-scraper
```


## Menu Scaper Endpoint
```
GET http://localhost:<PORT>/menu?date=11/09/2022
```