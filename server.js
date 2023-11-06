//importing express library/setting up port
const express = require('express');
const path = require('path');
const API = require('./controller/api-routes');

//setting up app and port
const app = express();
const PORT = 3005;

app.use(express.static('public'));
app.use(express.json())
app.use(express.urlencoded({extended:true})); // parsing urlencoded data
app.use('/api', API);  // api path 

//renders index.html w/ get request
app.get('/', (req, res) => res.render('public/index.html'));

//renders notes.html w/ get request
app.get('/notes', (req, res) =>
  res.sendFile(path.join(__dirname, 'public/notes.html'))
);


app.listen(PORT, () =>
  console.log(`App listening at http://localhost:${PORT}`)
);

