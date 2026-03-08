const express = require('express');
let books = require("./booksdb.js");
let isValid = require("./auth_users.js").isValid;
let users = require("./auth_users.js").users;
const public_users = express.Router();


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

// Get the book list available in the shop
public_users.get('/', function (req, res) {
    let myPromise = new Promise((resolve, reject) => {
        resolve(books);
    });
    myPromise.then((bks) => {
        res.status(200).send(JSON.stringify(bks, null, 4));
    });
});

// Get book details based on ISBN
public_users.get('/isbn/:isbn', function (req, res) {
    const isbn = req.params.isbn;
    let myPromise = new Promise((resolve, reject) => {
        if (books[isbn]) resolve(books[isbn]);
        else reject("Book not found");
    });
    
    myPromise.then((book) => {
        res.status(200).json(book);
    }).catch((err) => {
        res.status(404).json({ message: err });
    });
});
  
// Get book details based on author
public_users.get('/author/:author', function (req, res) {
    const author = req.params.author;
    let myPromise = new Promise((resolve, reject) => {
        let booksByAuthor = [];
        for (const key in books) {
            if (books[key].author === author) {
                booksByAuthor.push(books[key]);
            }
        }
        if (booksByAuthor.length > 0) resolve(booksByAuthor);
        else reject("No books found for this author");
    });
    
    myPromise.then((bks) => {
        res.status(200).json({ booksByAuthor: bks });
    }).catch((err) => {
        res.status(404).json({ message: err });
    });
});

// Get all books based on title
public_users.get('/title/:title', function (req, res) {
    const title = req.params.title;
    let myPromise = new Promise((resolve, reject) => {
        let booksByTitle = [];
        for (const key in books) {
            if (books[key].title === title) {
                booksByTitle.push(books[key]);
            }
        }
        if (booksByTitle.length > 0) resolve(booksByTitle);
        else reject("No books found for this title");
    });
    
    myPromise.then((bks) => {
        res.status(200).json({ booksByTitle: bks });
    }).catch((err) => {
        res.status(404).json({ message: err });
    });
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

module.exports.general = public_users;

// --- Task 10-13: Axios implementations ---
const axios = require('axios');

// Task 10: Get all books using async callback function
const getAllBooksAsync = async () => {
    try {
        const response = await axios.get('http://localhost:5005/');
        console.log(response.data);
    } catch (error) {
        console.error(error);
    }
}

// Task 11: Search by ISBN using Promises
const getBookByISBNAsync = (isbn) => {
    return axios.get(`http://localhost:5005/isbn/${isbn}`)
        .then(response => console.log(response.data))
        .catch(error => console.error(error));
}

// Task 12: Search by Author
const getBookByAuthorAsync = async (author) => {
    try {
        const response = await axios.get(`http://localhost:5005/author/${author}`);
        console.log(response.data);
    } catch (error) {
        console.error(error);
    }
}

// Task 13: Search by Title
const getBookByTitleAsync = async (title) => {
    try {
        const response = await axios.get(`http://localhost:5005/title/${title}`);
        console.log(response.data);
    } catch (error) {
        console.error(error);
    }
}
