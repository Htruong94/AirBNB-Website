//manual adding for populating/testing, not part of assignment

const mongoose = require("mongoose");
require('dotenv').config();
mongoose.connect(`mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@senecaweb.nakqg.mongodb.net/WEB322Assignment?retryWrites=true&w=majority`);
const bcrypt = require("bcryptjs");

var Schema = mongoose.Schema;

const userSchema = new Schema({
    "username":{
        type: String,
        required: true
    },
    "email": {
        type: String,
        required: true
    },
    "fname": {
        type: String,
        required: true
    },
    "lname": {
        type: String,
        required: true
    },
    "pword": {
        type: String,
        required: true
    },
    "bday": {
        type: String,
        required: true
    },
    "admin": {
        type: Boolean,
        required: true
    }
});

var user = mongoose.model("User", userSchema);

var userCreate = new user({
    username: "htruong19",
    email: "htruong19@myseneca.ca",
    fname: "Hung",
    lname: "Truong",
    pword: bcrypt.hashSync('abc123', 10),
    bday: "June 3 1994",
    admin: true
})

user.findOne(username= userCreate.username);

userCreate.save((err) => {
    if(err) {
      console.log("There was an error saving the User");
    } else {
      console.log("The user was saved to the user collection");
    }
    // exit the program after saving
    process.exit();
  });