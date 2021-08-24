    //WEB322 Assignment 5
    //Hung Truong - 147779193
    //Email: htruong19@myseneca.ca
    //Date: August 10, 2021

    const express = require('express')
    const router = express.Router();
    const Room = require("../model/room");
    const path = require("path");
    var nodemailer = require('nodemailer');
    var multer = require("multer");
    var upload = multer();

    var transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: 'web322ht@gmail.com',
            pass: 'WEB322a.!'
        }
    })

    function ensureLogin(req, res, next){
        if(!req.session.user) {
            res.redirect("/login");
        }
        else{
            next();
        }
    }

    router.get("", ensureLogin, (req,res) => {
        var valid = {
            invalid_flag: false,
            errormsg: ""
        }
        var estimate = {
            estimate_flag: false
        }
        res.render("roomDesc", {
            roomData: req.session.room,
            data: valid,
            estimate: estimate,
            layout:"main"});
    })
    
    router.post("/", upload.none(), (req,res) => {
        var valid = {
            invalid_flag: false,
            errormsg: ""
        }
        var estimate_flag = false;

        var cinDate = req.body.cinDate;
        var coutDate = req.body.coutDate;
        var numGuest = req.body.guestQuantity;
        
        if(cinDate == '' || coutDate == '' || numGuest == ''){
            valid.invalid_flag = true;
            valid.errormsg = "Please fill in all the fields.";
        }

        if(cinDate > coutDate){
            valid.invalid_flag = true;
            valid.errormsg = "Please use a checkout date after the checkin date.";
        }

        if(valid.invalid_flag){
            console.log(valid.errormsg);
            res.render("roomDesc", {
                roomData: req.session.room,
                data: valid,
                estimate_flag: estimate_flag,
                layout:"main"
            });
        }
        else{

            var days = Math.round((Date.parse(coutDate) - Date.parse(cinDate)) / 86400000);
            var totalPrice = days * req.session.room.price;

            req.session.book = {
                cinDate: cinDate,
                coutDate: coutDate,
                numGuest: numGuest,
                days: days,
                totalPrice: totalPrice
            }
            
            estimate_flag = true;

            res.render("roomDesc", {
                roomData: req.session.room,
                book: req.session.book,
                data: valid,
                estimate_flag: estimate_flag,
                layout:"main"
            });
        }
    })

    router.post("/book", upload.none(), (req,res) => {
        var mailOption = {
            from: 'web322ht@gmail.com',
            to: req.session.user.email,
            subject: 'Thank you for using WEBBNB',
            text: 'Thank you for using our website! \nYou have booked the room: ' +
             req.session.room.title + ' in ' + req.session.room.location + 
            '\nThe number of guests in this room is: ' + req.session.book.numGuest + 
            '\nYou are staying from ' + req.session.book.cinDate + ' to ' + 
            req.session.book.coutDate + ' for a total of ' + req.session.book.days + ' day(s).' +
            '\nYour total price is: $' + req.session.book.totalPrice + 
            ' at a rate of $' + req.session.room.price + ' per night' +
            '\nPlease enjoy your stay!'
        }
        
        transporter.sendMail(mailOption, function(error, info){
            if(error){
                console.log(error);
            }
            else{
                console.log('Email sent to ' + email + ': ' + info.response );
            }
        })

        res.redirect("/dashboard");
    })

    router.post("/back", upload.none(), (req,res)=>{
        res.redirect("/roomDesc");
    })

    module.exports = router;