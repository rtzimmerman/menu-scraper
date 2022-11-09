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
### Sample Response
```json
{
    "Breakfast Menu": [
        "Cheese & Egg  Breakfast Bagel",
        "Pineapple Cup",
        "4 oz. Apple Juice Cup",
        "4 oz. Orange Juice Cup"
    ],
    "Elementary Lunch Menu": [
        "Chicken Tenders",
        "OR",
        "Sandwich Sunwise",
        "Turkey & Cheese Sub-ES (Leftover)",
        "Mandarin Orange Cup",
        "Cheesy Steamed Broccoli",
        "Grape Tomatoes"
    ],
    "After School Snack": [
        "Hawaiian Roll Turkey  Ham & Cheese",
        "Apple Slices",
        "Baby Carrots",
        "Hummus Cup"
    ]
}
```