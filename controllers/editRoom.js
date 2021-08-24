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
        res.render("editRoom", {
            roomData: rooms,
            layout: "main"
        });
    });
});

router.post("/:_id", ensureAdmin, (req,res) => {
    
    var title = req.body.Title;
    var desc = req.body.Desc;
    var price = req.body.Price;

    if(title != ''){
        Room.findByIdAndUpdate(req.params._id, {title: title}, function(err,docs){
            if(err){
                console.log(err);
            }
            else{
                console.log("Updated title");
            }
        });
    }

    if(desc != ''){
        Room.findByIdAndUpdate(req.params._id, {desc: desc}, function(err,docs){
            if(err){
                console.log(err);
            }
            else{
                console.log("Updated description");
            }
        });
    }

    if(price > 0){
        Room.findByIdAndUpdate(req.params._id, {price: price}, function(err,docs){
            if(err){
                console.log(err);
            }
            else{
                console.log("Updated price");
            }
        });
    }

    res.redirect("/editRoom");
})


module.exports = router;