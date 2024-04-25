const crab = require('express').Router();

crab.get('/crabs', (_, res) => {
  res.json({
    status : "success",
    message : "Method GET success!"
  })
});

crab.post('/crabs', (_, res) => {
  res.json({
    status : "success",
    message : "Method POST success!"
  })
});

crab.put('/crabs', (_, res) => {
  res.json({
    status : "success",
    message : "Method PUT success!"
  })
});

crab.delete('/crabs', (_, res) => {
  res.json({
    status : "success",
    message : "Method DELETE success!"
  })
});

module.exports = crab;