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

// train robber
app.use(express.json());

// seed stuff
const mace = new User({
  email: 'mce.aviles@gmail.com',
  books: [
    {
      name: 'Lucy',
      description: 'a lovely book',
      status: '#1 Book'
    },
    {
      name: 'Lucy 2',
      description: 'a lovely book',
      status: '#1 Book'
    },
    {
      name: 'Lucy 3',
      description: 'a lovely book',
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
      description: 'a lovely book',
      status: '#1 Book'
    },
    {
      name: 'Lucy 2',
      description: 'a lovely book',
      status: '#1 Book'
    },
    {
      name: 'Lucy 3',
      description: 'a lovely book',
      status: '#1 Book'
    }
  ]
});
audrey.save();
console.log('audrey books', audrey.books);

// routes and functions for /books
// ======================================================
app.get('/books', handleGetBooks);
app.post('/books', createNewBook);
app.delete('/books/:index', deleteABook);

async function handleGetBooks(request, response) {
  // matches param call from front end
  const email = request.query.email;
  console.log('email from front', email);
  await User.find({email: email}, function (err, items) {
    if (err) return console.error(err);
    console.log(items, items[0])
    response.status(200).send(items[items.length-1]);
    console.log('items books', items);
  })
}

function createNewBook(request, response) {
  // console.log('inside of createNewBook w/ request.body', request.body);
  const email = request.body.email;
  const book = { name: request.body.name, description: request.body.description, status: request.body.status }
  // console.log('book after body', book);

  User.findOne( { email }, (err, entry) => {
    if(err) return console.error(err);
    entry.books.push(book);
    entry.save();
    console.log('new push', entry.books);
    response.status(200).send(entry.books);
  })
}

function deleteABook(request, response) {
  const index = parseInt(request.params.index);
  // const userName = request.query.name;
  const email = request.query.email;
  // { index: '5', userName: 'Brian' }
  
  User.findOne({ email }, (err, entry) => {
    const newBookArray = entry.books.filter((book, i) => {
      return i !== index;
    });
    entry.books = newBookArray;
    console.log({newBookArray});
    entry.save();
    response.status(200).send('success!')
  })

}
// ======================================================

app.listen(PORT, () => console.log(`listening on ${PORT}`));
