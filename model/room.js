//WEB322 Assignment 3
//Hung Truong - 147779193
//Email: htruong19@myseneca.ca
//Date: July 25, 2021

const mongoose = require('mongoose');
const Schema = mongoose.Schema;
mongoose.set('useCreateIndex', true);

const roomSchema = new Schema({
    "imgsrc": String,
    "desc": String,
    "price": Number,
    "location": String,
    "title": String
});

const Room = mongoose.model('Room', roomSchema);
module.exports = Room;