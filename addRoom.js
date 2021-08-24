//manual adding for populating/testing, not part of assignment

const mongoose = require("mongoose");
require('dotenv').config();
mongoose.connect(`mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@senecaweb.nakqg.mongodb.net/WEB322Assignment?retryWrites=true&w=majority`);

var Scema = mongoose.Schema;

var roomSchema = new Scema({
  "imgsrc": String,
  "desc": String,
  "price": Number,
  "location": String,
  "title": String
});

var room = mongoose.model("Room", roomSchema);

var roomCreate = new room({
    imgsrc: "room1.jpeg",
    desc: "Fluffy Room that is perfect for comfortness",
    price: 99.99,
    location: "Montreal",
    title: "Fluffy Montreal"
})

console.log(room.find());

roomCreate.save((err) => {
    if(err) {
      console.log("There was an error saving the Room");
    } else {
      console.log("The room was saved to the room collection");
    }
    // exit the program after saving
    process.exit();
  });