const bird = require('express').Router();

bird.get('/birds', (_, res) => {
  res.json({
    status : "success",
    message : "Method GET success!"
  })
});

bird.post('/birds', (_, res) => {
  res.json({
    status : "success",
    message : "Method POST success!"
  })
});

bird.put('/birds', (_, res) => {
  res.json({
    status : "success",
    message : "Method PUT success!"
  })
});

bird.delete('/birds', (_, res) => {
  res.json({
    status : "success",
    message : "Method DELETE success!"
  })
});

module.exports = bird;