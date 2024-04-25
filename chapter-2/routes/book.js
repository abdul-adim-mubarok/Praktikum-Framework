const book = require('express').Router();

book.get('/books', (_, res) => {
  res.json({
    status : "success",
    message : "Method GET success!"
  })
});

book.post('/books', (_, res) => {
  res.json({
    status : "success",
    message : "Method POST success!"
  })
});

book.put('/books', (_, res) => {
  res.json({
    status : "success",
    message : "Method PUT success!"
  })
});

book.delete('/books', (_, res) => {
  res.json({
    status : "success",
    message : "Method DELETE success!"
  })
});

module.exports = book;