const mongoose = require("mongoose");

const noteSchema = mongoose.Schema({
    title: String,
    description: String
})

const noteModel = mongoose.model("notes",noteSchema);

module.exports = noteModel;

