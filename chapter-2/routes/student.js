const student = require('express').Router();

student.get('/students', (_, res) => {
  res.json({
    status : "success",
    message : "Method GET success!"
  })
});

student.post('/students', (_, res) => {
  res.json({
    status : "success",
    message : "Method POST success!"
  })
});

student.put('/students', (_, res) => {
  res.json({
    status : "success",
    message : "Method PUT success!"
  })
});

student.delete('/students', (_, res) => {
  res.json({
    status : "success",
    message : "Method DELETE success!"
  })
});

module.exports = student;