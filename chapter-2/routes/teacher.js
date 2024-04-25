const teacher = require('express').Router();

teacher.get('/teachers', (_, res) => {
  res.json({
    status : "success",
    message : "Method GET success!"
  })
});

teacher.post('/teachers', (_, res) => {
  res.json({
    status : "success",
    message : "Method POST success!"
  })
});

teacher.put('/teachers', (_, res) => {
  res.json({
    status : "success",
    message : "Method PUT success!"
  })
});

teacher.delete('/teachers', (_, res) => {
  res.json({
    status : "success",
    message : "Method DELETE success!"
  })
});

module.exports = teacher;