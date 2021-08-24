    //WEB322 Assignment 5
    //Hung Truong - 147779193
    //Email: htruong19@myseneca.ca
    //Date: August 10, 2021

const express = require('express')
const router = express.Router();
const Room = require("../model/room");
const path = require("path");

router.get("", (req,res) => {
    Room.find()
    .lean()
    .exec()
    .then(rooms => {
        res.render("room", {
            roomData: rooms,
            layout: "main"
        });
    });
})

router.post("/", (req,res)=>{
    var search = req.body.Search;
    if(search == "All"){
        Room.find()
        .lean()
        .exec()
        .then(rooms => {
            res.render("room", {
                roomData: rooms,
                layout: "main"
            });
        });
    }
    else {
        Room.find({location: search})
        .lean()
        .exec()
        .then(rooms => {
            res.render("room", {
                roomData: rooms,
                layout: "main"
            });
        });
    }
})

router.post("/:_id", (req,res) => {
    Room.findById(req.params._id).exec().then(room =>{
        req.session.room = {
            imgsrc: room.imgsrc,
            desc: room.desc,
            price: room.price,
            location: room.location,
            title: room.title
        }
        res.redirect('/roomDesc');
    });
})

module.exports = router;