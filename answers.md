# Answers para el AI Grader de Coursera

Este documento contiene en un solo lugar **única y exclusivamente** los bloques exactos que debes copiar y pegar en cada una de las 11 preguntas de tu evaluación. No copies los títulos, solo el bloque de código contenido en cada paso.

### Question 1: githubrepo

```bash
curl -s https://api.github.com/repos/AgentBooster/expressBookReviews | jq -r '.parent.full_name'
"ibm-developer-skills-network/expressBookReviews"
```

### Question 2: getallbooks

```bash
curl -s http://localhost:5000/
{
    "1": {
        "author": "Chinua Achebe",
        "title": "Things Fall Apart",
        "reviews": {}
    },
    "2": {
        "author": "Hans Christian Andersen",
        "title": "Fairy tales",
        "reviews": {}
    },
    "3": {
        "author": "Dante Alighieri",
        "title": "The Divine Comedy",
        "reviews": {}
    },
    "4": {
        "author": "Unknown",
        "title": "The Epic Of Gilgamesh",
        "reviews": {}
    },
    "5": {
        "author": "Unknown",
        "title": "The Book Of Job",
        "reviews": {}
    },
    "6": {
        "author": "Unknown",
        "title": "One Thousand and One Nights",
        "reviews": {}
    },
    "7": {
        "author": "Unknown",
        "title": "Njál's Saga",
        "reviews": {}
    },
    "8": {
        "author": "Jane Austen",
        "title": "Pride and Prejudice",
        "reviews": {}
    },
    "9": {
        "author": "Honoré de Balzac",
        "title": "Le Père Goriot",
        "reviews": {}
    },
    "10": {
        "author": "Samuel Beckett",
        "title": "Molloy, Malone Dies, The Unnamable, the trilogy",
        "reviews": {}
    }
}
```

### Question 3: getbooksbyISBN

```bash
curl -s http://localhost:5000/isbn/1
{"author":"Chinua Achebe","title":"Things Fall Apart","reviews":{}}
```

### Question 4: getbooksbyauthor

```bash
curl -s http://localhost:5000/author/Chinua%20Achebe
{"booksByAuthor":[{"author":"Chinua Achebe","title":"Things Fall Apart","reviews":{}}]}
```

### Question 5: getbooksbytitle

```bash
curl -s http://localhost:5000/title/Fairy%20tales
{"booksByTitle":[{"author":"Hans Christian Andersen","title":"Fairy tales","reviews":{}}]}
```

### Question 6: getbookreview

```bash
curl -s http://localhost:5000/review/1
{}
```

### Question 7: register

```bash
curl -s -X POST http://localhost:5000/register -H "Content-Type: application/json" -d "{\"username\":\"AgentBooster\",\"password\":\"password123\"}"
{"message":"Customer successfully registered. Now you can login"}
```

### Question 8: login

```bash
curl -s -c cookies.txt -X POST -H "Content-Type: application/json" -d '{"username": "AgentBooster", "password": "password123"}' http://localhost:5000/customer/login
{"message":"Login successful!"}
```

### Question 9: reviewadded

```bash
curl -s -b cookies.txt -X PUT "http://localhost:5000/review/1?review=GreatBook"
{"message":"The review for the book with ISBN 1 has been added/updated.","reviews":{"AgentBooster":"GreatBook"}}
```

### Question 10: deletereview

```bash
curl -s -b cookies.txt -X DELETE "http://localhost:5000/review/1"
{"message":"Review for ISBN 1 deleted"}
```

### Question 11: general.js URL

```text
https://github.com/AgentBooster/expressBookReviews/blob/main/final_project/router/general.js
```
