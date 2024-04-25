const cow = require('express').Router();

cow.get('/cows', (_, res) => {
  res.json({
    status : "success",
    message : "Method GET success!"
  })
});

cow.post('/cows', (_, res) => {
  res.json({
    status : "success",
    message : "Method POST success!"
  })
});

cow.put('/cows', (_, res) => {
  res.json({
    status : "success",
    message : "Method PUT success!"
  })
});

cow.delete('/cows', (_, res) => {
  res.json({
    status : "success",
    message : "Method DELETE success!"
  })
});

module.exports = cow;