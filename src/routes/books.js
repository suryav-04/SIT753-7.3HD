const express = require('express');
const router = express.Router();

let books = [];
let idCounter = 1;

router.get('/', (req, res) => {
  res.json(books);
});

router.post('/', (req, res) => {
  const { title, author } = req.body;
  const newBook = { id: idCounter++, title, author };
  books.push(newBook);
  res.status(201).json(newBook);
});

router.put('/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const { title, author } = req.body;
  const book = books.find(b => b.id === id);
  if (!book) return res.status(404).send('Not Found');
  book.title = title;
  book.author = author;
  res.json(book);
});

router.delete('/:id', (req, res) => {
  const id = parseInt(req.params.id);
  books = books.filter(b => b.id !== id);
  res.status(204).send();
});

module.exports = router;
