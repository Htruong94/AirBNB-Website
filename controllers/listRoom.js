    //WEB322 Assignment 4
    //Hung Truong - 147779193
    //Email: htruong19@myseneca.ca
    //Date: August 06, 2021

const express = require('express')
const router = express.Router();
const Room = require("../model/room");
const path = require("path");

function ensureAdmin(req, res, next){
    if(!req.session.user) {
        if(!req.session.user.admin){
            res.redirect("/");
        }
    }
    else{
        next();
    }
}

router.get("", ensureAdmin, (req,res) => {
    Room.find()
    .lean()
    .exec()
    .then(rooms => {
        res.render("listRoom", {
            roomData: rooms,
            layout: "main"
        });
    });
})

module.exports = router;