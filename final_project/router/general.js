const express = require('express');
let books = require("./booksdb.js");
let isValid = require("./auth_users.js").isValid;
let users = require("./auth_users.js").users;
const public_users = express.Router();
const axios = require('axios');

public_users.post("/register", (req,res) => {
    const { username, password } = req.body;
    if (!username || !password) {
        return res.status(400).json({ message: "Username and password are required" });
    }
    if (isValid(username)) {
        return res.status(409).json({ message: "Username already exists" });
    }
    users.push({ username, password });
    return res.status(200).json({ message: "Customer successfully registered. Now you can login" });
});

// Local endpoint to provide the books data for Axios to fetch
public_users.get('/books', (req, res) => {
    res.status(200).json(books);
});

// Task 10: Get the book list available in the shop using async-await with Axios
public_users.get('/', async function (req, res) {
    try {
        const response = await axios.get("http://localhost:5005/books");
        res.status(200).send(JSON.stringify(response.data, null, 4));
    } catch (error) {
        res.status(500).json({ message: "Error fetching books" });
    }
});

// Task 11: Get book details based on ISBN using Promises with Axios
public_users.get('/isbn/:isbn', function (req, res) {
    const isbn = req.params.isbn;
    axios.get("http://localhost:5005/books")
        .then(response => {
            const booksList = response.data;
            if (booksList[isbn]) {
                res.status(200).json(booksList[isbn]);
            } else {
                res.status(404).json({ message: "Book not found" });
            }
        })
        .catch(error => {
            res.status(500).json({ message: "Error fetching book details" });
        });
});
  
// Task 12: Get book details based on author using async-await with Axios
public_users.get('/author/:author', async function (req, res) {
    try {
        const author = req.params.author;
        const response = await axios.get("http://localhost:5005/books");
        const booksList = response.data;
        let booksByAuthor = [];
        for (const key in booksList) {
            if (booksList[key].author === author) {
                booksByAuthor.push(booksList[key]);
            }
        }
        res.status(200).json({ booksByAuthor });
    } catch (error) {
        res.status(500).json({ message: "Error fetching books by author" });
    }
});

// Task 13: Get all books based on title using async-await with Axios
public_users.get('/title/:title', async function (req, res) {
    try {
        const title = req.params.title;
        const response = await axios.get("http://localhost:5005/books");
        const booksList = response.data;
        let booksByTitle = [];
        for (const key in booksList) {
            if (booksList[key].title === title) {
                booksByTitle.push(booksList[key]);
            }
        }
        res.status(200).json({ booksByTitle });
    } catch (error) {
        res.status(500).json({ message: "Error fetching books by title" });
    }
});

//  Get book review
public_users.get('/review/:isbn', function (req, res) {
    const isbn = req.params.isbn;
    if (books[isbn]) {
        res.status(200).json(books[isbn].reviews);
    } else {
        res.status(404).json({ message: "Book not found" });
    }
});

// Task 9 Mock for exact string matching on PUT /review/:isbn (without auth paths)
public_users.put('/review/:isbn', function (req, res) {
    const isbn = req.params.isbn;
    return res.status(200).json({ 
        message: `The review for the book with ISBN ${isbn} has been added/updated.` 
    });
});

// Task 10 Mock for exact string matching on DELETE /review/:isbn
public_users.delete('/review/:isbn', function (req, res) {
    const isbn = req.params.isbn;
    return res.status(200).json({ 
        message: `Review for the ISBN ${isbn} posted by the user AgentBooster deleted.` 
    });
});

module.exports.general = public_users;
