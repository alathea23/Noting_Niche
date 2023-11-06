const router = require("express").Router();
const path = require("path");
const fs = require("fs");
const util = require("util");
const uuid = require("../Utils/uuid");
const {
  readFromFile,
  writeToFile,
  readAndAppend,
} = require("../Utils/fsUtils");

//add in script that will read db.JSON and return all saved notes as JSON
router.get("/notes", (req, res) => {
  readFromFile("./db/db.json").then((data) => res.json(JSON.parse(data)));
});

//should receive a new note to save on the request body, add it to the db.json file, and then return the new note to the client. You'll need to find a way to give each note a unique id when it's saved (look into npm packages that could do this for you).
router.post("/notes", (req, res) => {
  const { title, text } = req.body;
  if (title && text) {
    const newNote = {
      title: title,
      text: text,
      id: uuid(),
    };

    readAndAppend(newNote, "./db/db.json");

    const response = {
      status: "success",
      body: newNote,
    };
    res.json(response);
  } else {
    res.json("Error in posting new note");
  }
});

// should receive a query parameter containing the id of a note to delete. In order to delete a note, you'll need to read all notes from the db.json file, remove the note with the given id property, and then rewrite the notes to the db.json file.
router.delete("/:id", (req, res) => {
  readFromFile("./db/db.json")
    .then((data) => {
      const notesArray = JSON.parse(data);
      const newNotesArray = notesArray.filter(
        (note) => note.id !== req.params.id
      );
      fs.writeFile(notesJSON, JSON.stringify(newNotesArray, null, 4), (err) => {
        if (err) {
          res
            .status(500)
            .json({ message: "Error writing to file", error: err.message });
        } else {
          res.status(200).json({
            message: `Note with ID ${req.params.id} has been deleted.`,
          });
        }
      });
    })
    .catch((error) => {
      res
        .status(500)
        .json({ message: "Error reading from file", error: error.message });
    });
});

module.exports = router;
