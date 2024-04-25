const user = require('express').Router();

user.get('/users', (_, res) => {
  res.json({
    status : "success",
    message : "Method GET success!"
  })
});

user.post('/users', (_, res) => {
  res.json({
    status : "success",
    message : "Method POST success!"
  })
});

user.put('/users', (_, res) => {
  res.json({
    status : "success",
    message : "Method PUT success!"
  })
});

user.delete('/users', (_, res) => {
  res.json({
    status : "success",
    message : "Method DELETE success!"
  })
});

module.exports = user;