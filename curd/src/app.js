const express = require("express");
const app = express();
const noteModel = require("./models/note.model.js")
const cors = require("cors");
const path = require("path");


app.use(cors());
app.use(express.json());
app.use(express.static('./public')); 

// POST METHOD
app.post("/notes", async (req, res) => {
    const {title, description} = req.body;
    const note = new noteModel({title, description});
    await note.save();
    res.status(200).send("Note created successfully");
})
// GET METHOD
app.get("/notes", async (req, res) => {
    try {
        const notes = await noteModel.find();
        res.status(200).json(notes);
    } catch (err) {
        res.status(500).send("Error fetching notes");
    }
});
// DELETE METHOD
app.delete("/notes/:id", async (req, res) => {
    const id = req.params.id;
    try {
        await noteModel.findByIdAndDelete(id);
        res.status(200).send("Note deleted successfully");
    } catch (err) {
        res.status(500).send("Error deleting note");
    }
});
// UPDATE METHOD
app.put("/notes/:id", async (req, res) => {
    const id = req.params.id;
    const {title, description} = req.body;

    try {
        await noteModel.findByIdAndUpdate(id, {title, description});
        res.status(200).send("Note updated successfully");
    } catch (err) {
        res.status(500).send("Error updating note");
    }
});

app.use('*name', (req, res) => {
    res.sendFile(path.join(__dirname,"..", '/public/index.html'));
});

module.exports = app; 

