//WEB322 Assignment 3
//Hung Truong - 147779193
//Email: htruong19@myseneca.ca
//Date: July 25, 2021

const mongoose = require('mongoose');
const Schema = mongoose.Schema;
mongoose.set('useCreateIndex', true);

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

var User = mongoose.model("User", userSchema);
module.exports = User;
