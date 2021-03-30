'use strict';

require('dotenv').config();
const express = require('express');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 3002;
const DATABASE = process.env.DATABASE_URL;

const mongoose = require('mongoose');
const User = require('./models/User');

mongoose.connect(`${DATABASE}`, {useNewUrlParser: true, useUnifiedTopology: true});

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
  console.log('connected to the database!');
});

app.use(cors());

// seed stuff
const mace = new User({
  email: 'mce.aviles@gmail.com',
  books: [
    {
      name: 'Lucy',
      desription: 'a lovely book',
      status: '#1 Book'
    },
    {
      name: 'Lucy 2',
      desription: 'a lovely book',
      status: '#1 Book'
    },
    {
      name: 'Lucy 3',
      desription: 'a lovely book',
      status: '#1 Book'
    }
  ]
});
mace.save();

const audrey = new User({
  email: 'audrey.patterson31@gmail.com',
  books: [
    {
      name: 'Lucy',
      desription: 'a lovely book',
      status: '#1 Book'
    },
    {
      name: 'Lucy 2',
      desription: 'a lovely book',
      status: '#1 Book'
    },
    {
      name: 'Lucy 3',
      desription: 'a lovely book',
      status: '#1 Book'
    }
  ]
});
audrey.save();
console.log('audrey books', audrey.books);

// routes and functions for /books
// ======================================================
app.get('/books', handleGetBooks);

async function handleGetBooks(request, response) {
  // matches param call from front end
  const email = request.query.email;
  console.log({email});
  await User.find({email: email}, function (err, items) {
    if (err) return console.error(err);
    console.log(items, items[0])
    response.status(200).send(items[0].books);
    console.log('items books', items[0].books);
  })
}

// ======================================================

app.listen(PORT, () => console.log(`listening on ${PORT}`));
