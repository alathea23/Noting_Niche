const express = require('express');
const path = require('path');
const app = express();

const notes = require('../db.json')

app.get('/notes', (req, res) => 
//add in script that will read db.JSON and return all saved notes as JSON
res.render('public/index.html'));


app.post('/notes', (req, res) => 
//should receive a new note to save on the request body, add it to the db.json file, and then return the new note to the client. You'll need to find a way to give each note a unique id when it's saved (look into npm packages that could do this for you).
res.render('public/index.html'));

app.delete('/notes/:id', (req, res) => 
// should receive a query parameter containing the id of a note to delete. In order to delete a note, you'll need to read all notes from the db.json file, remove the note with the given id property, and then rewrite the notes to the db.json file.
res.render('public/index.html'));