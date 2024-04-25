const car = require('express').Router();

car.get('/cars', (_, res) => {
  res.json({
    status : "success",
    message : "Method GET success!"
  })
});

car.post('/cars', (_, res) => {
  res.json({
    status : "success",
    message : "Method POST success!"
  })
});

car.put('/cars', (_, res) => {
  res.json({
    status : "success",
    message : "Method PUT success!"
  })
});

car.delete('/cars', (_, res) => {
  res.json({
    status : "success",
    message : "Method DELETE success!"
  })
});

module.exports = car;