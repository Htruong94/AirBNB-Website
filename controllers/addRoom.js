/*
    //WEB322 Assignment 4
    //Hung Truong - 147779193
    //Email: htruong19@myseneca.ca
    //Date: August 06, 2021
*/

const express = require('express')
const router = express.Router();
const Room = require("../model/room");
const path = require("path");
const multer = require("multer");
const storage = multer.diskStorage({
    destination: function(req, file, cb) {
        cb(null, 'static/images/room')
    }, 
    filename: function(req, file, cb){
        cb(null, Date.now() + path.extname(file.originalname));
    }
});

const upload = multer({storage: storage});

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
    var valid = {
        invalid_flag: false,
        errormsg: ""
    }

    res.render("addRoom", {layout: "main", data: valid});
})

router.use(express.static("./images/room"));

router.post("/", upload.single('Image'), (req,res)=>{
    var valid = {
        invalid_flag: false,
        errormsg: ""
    }

    const title = req.body.Title;
    const desc = req.body.Desc;
    const price = req.body.Price;
    const location = req.body.Location;
    const img = req.file.filename;

    if(title == '' || desc == '' || price == ''|| location == ''){
        valid.invalid_flag = true;
        valid.errormsg = "Please fill in all the fields.";
    }

    if(!valid.invalid_flag){

        var roomCreate = new Room({
            imgsrc: img,
            desc: desc,
            price: price,
            location: location,
            title: title
        })

        roomCreate.save((err) => {
            if(err) {
              console.log("There was an error saving the Room");
            } else {
              console.log("The room was saved to the room collection");
            }
        });

        valid.invalid_flag = true;
        valid.errormsg = "Added Room.";
        res.render("addRoom", {
            data: valid,
            layout: "main"
        })
    }
    else{
        res.render("addRoom", {
            data: valid,
            layout: "main"
        })
    }
})


module.exports = router;