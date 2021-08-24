//WEB322 Assignment 3
//Hung Truong - 147779193
//Email: htruong19@myseneca.ca
//Date: July 25, 2021

const express = require('express')
const router = express.Router();
const path = require("path");
var multer = require("multer");
var upload = multer();
const User = require("../model/user");
const bcrypt = require("bcryptjs");
require('dotenv').config();
var nodemailer = require('nodemailer');

var transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: 'web322ht@gmail.com',
        pass: 'WEB322a.!'
    }
})

function ensureNotLogin(req, res, next){
    if(req.session.user) {
        res.redirect("/dashboard");
    }
    else{
        next();
    }
}

router.get("", ensureNotLogin, (req,res) => {
    var valid = {
        invalid_flag: true,
        errormsg: ""
    }
    res.render("registration", {
        data: valid,
        layout: "main"
    })
})

router.post("/", upload.none(), (req,res)=>{
    var valid = {
        invalid_flag: false,
        errormsg: ""
    }

    const username = req.body.Username;
    const email = req.body.Email;
    const fname = req.body.FName;
    const lname = req.body.LName;
    const pword = req.body.Password;
    const bday = req.body.Birthday;

    if(username == '' || email == '' || fname == ''|| lname == ''|| pword == ''|| bday == ''){
        valid.invalid_flag = true;
        valid.errormsg = "Please fill in all the fields.";
    }

    else if(!/@/.test(email)){
        console.log("false");
        valid.invalid_flag = true;
        valid.errormsg = "Email is not in correct format, xxxx@yyyy.com";
    }

    else if(/[0-9]/.test(fname)){
        valid.invalid_flag = true;
        valid.errormsg = "Please enter a valid first name without a number.";
    }

    else if(/[0-9]/.test(lname)){
        valid.invalid_flag = true;
        valid.errormsg = "Please enter a valid last name without a number.";
    }

    else if(!/[0-9]/.test(pword) || !/[a-zA-Z]/.test(pword)){
        valid.invalid_flag = true;
        valid.errormsg = "Please enter a password with atleast 1 letter and number.";
    }
    else if(!/^[0-9a-zA-Z]{6,12}$/.test(pword)){
        valid.invalid_flag = true;
        valid.errormsg = "Please enter a password with a length of 6 to 12.";
    }
    else{
        valid.errormsg = "";
    }

    if(!valid.invalid_flag){
        User.findOne({email: email}).then(user =>{
            if(user){
                valid.invalid_flag = true;
                valid.errormsg = "Email has been already been used. Please use a different email."
                res.render("registration", {
                    data: valid,
                    layout: "main"
                })
            }
            else{
                var mailOption = {
                    from: 'web322ht@gmail.com',
                    to: email,
                    subject: 'Welcome to WEBBNB',
                    text: 'Welcome to WEBBNB, we hope that you have a pleasant time at one of our rooms.'
                }
        
                transporter.sendMail(mailOption, function(error, info){
                    if(error){
                        console.log(error);
                    }
                    else{
                        console.log('Email sent to ' + email + ': ' + info.response );
                    }
                })
        
                var hash = bcrypt.hashSync(pword, 10);
        
                var userCreate = new User({
                    username: username,
                    email: email,
                    fname: fname,
                    lname: lname,
                    pword: hash,
                    bday: bday,
                    admin: false
                })
        
        
                userCreate.save((err) => {
                    if(err) {
                      console.log("There was an error saving the User: " + err);
                    } else {
                      console.log("The user was saved to the user collection");
                    }
                  });
                
                req.session.user = {
                    username: userCreate.username,
                    email: userCreate.email,
                    fname: userCreate.fname,
                    lname: userCreate.lname,
                    admin: userCreate.admin
                }

                res.render("dashboard");
            }
        })
    }
    else{
        console.log(valid.errormsg);
        res.render("registration", {
            data: valid,
            layout: "main"
        })
    }
})

module.exports = router;