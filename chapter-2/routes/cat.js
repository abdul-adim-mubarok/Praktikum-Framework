const cat = require('express').Router();

cat.get('/cats', (_, res) => {
  res.json({
    status : "success",
    message : "Method GET success!"
  })
});

cat.post('/cats', (_, res) => {
  res.json({
    status : "success",
    message : "Method POST success!"
  })
});

cat.put('/cats', (_, res) => {
  res.json({
    status : "success",
    message : "Method PUT success!"
  })
});

cat.delete('/cats', (_, res) => {
  res.json({
    status : "success",
    message : "Method DELETE success!"
  })
});

module.exports = cat;