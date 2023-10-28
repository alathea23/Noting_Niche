//copied in from activity 11.1 - check routes and paths!
const express = require('express');
const path = require('path');
const fs = require('fs');

const app = express();
const PORT = 3001;

app.use(express.static('public'));

//renders index.html w/ get request
app.get('/', (req, res) => res.render('public/index.html'));

//renders notes.html w/ get request
app.get('/notes', (req, res) =>
  res.sendFile(path.join(__dirname, 'public/notes.html'))
);


app.listen(PORT, () =>
  console.log(`App listening at http://localhost:${PORT}`)
);
