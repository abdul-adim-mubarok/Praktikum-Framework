const train = require('express').Router();

train.get('/trains', (_, res) => {
  res.json({
    status : "success",
    message : "Method GET success!"
  })
});

train.post('/trains', (_, res) => {
  res.json({
    status : "success",
    message : "Method POST success!"
  })
});

train.put('/trains', (_, res) => {
  res.json({
    status : "success",
    message : "Method PUT success!"
  })
});

train.delete('/trains', (_, res) => {
  res.json({
    status : "success",
    message : "Method DELETE success!"
  })
});

module.exports = train;