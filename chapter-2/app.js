require('dotenv').config();
const express = require('express');
const app = express();

const users = require('./routes/user.js');
const students = require('./routes/student.js');
const cats = require('./routes/cat.js');
const cars = require('./routes/car.js');
const teachers = require('./routes/teacher.js');
const books = require('./routes/book.js');
const cows = require('./routes/cow.js');
const birds = require('./routes/bird.js');
const crabs = require('./routes/crab.js');
const trains = require('./routes/train.js');

app.use(express.json());

app.use(users);
app.use(students);
app.use(cats);
app.use(cars);
app.use(teachers);
app.use(books);
app.use(cows);
app.use(birds);
app.use(crabs);
app.use(trains);

app.listen(3000, () => {
    console.log('Server is running on http://localhost:3000');
});