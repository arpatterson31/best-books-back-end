'use strict';

require('dotenv').config();
const express = require('express');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 3002;
const DATABASE = process.env.DATABASE_URL;

const mongoose = require('mongoose');

mongoose.connect(`${DATABASE}`, {useNewUrlParser: true, useUnifiedTopology: true});

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
  console.log('connected to the database!');
});

app.use(cors());

// model stuff

// routes and function

app.listen(PORT, () => console.log(`listening on ${PORT}`));
