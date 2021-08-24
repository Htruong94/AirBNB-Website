
//WEB322 Assignment 3
//Hung Truong - 147779193
//Email: htruong19@myseneca.ca
//Date: July 25, 2021


const express = require('express')
const router = express.Router();
const path = require("path");
var multer = require("multer");
var upload = multer();
const bcrypt = require("bcryptjs");

const app = express();

const User = require('../model/user');

function ensureNotLogin(req, res, next){
    if(req.session.user) {
        res.redirect("/dashboard");
    }
    else{
        next();
    }
}

router.get("",ensureNotLogin, (req,res) => {
    var valid = {
        invalid_flag: true,
        errormsg: ""
    }
    res.render("login", {
        data: valid,
        layout: "main"
    })
})

router.post("/", upload.none(), (req,res)=>{
    var valid = {
        invalid_flag: false,
        errormsg: ""
    }

    const Username = req.body.username;
    const Password = req.body.password;

    if(Username == '' || Password == ''){
        valid.invalid_flag = true;
        valid.errormsg = "Please fill in all the fields.";
    }

    else if(!/^[0-9a-zA-Z]{6,12}$/.test(Password)){
        valid.invalid_flag = true;
        valid.errormsg = "Please enter a password with a length of 6 to 12.";
    }

    if(!valid.invalid_flag){
        User.findOne({username: Username}).then(user => {
            if(user){
                if(bcrypt.compareSync(Password, user.pword)){
                    req.session.user = {
                        username: user.username,
                        email: user.email,
                        fname: user.fname,
                        lname: user.lname,
                        admin: user.admin
                    }
                    res.redirect("/dashboard");
                }
                else{
                    valid.invalid_flag = true;
                    valid.errormsg = "Password is incorrect.";
                    res.render("login", {
                        data: valid,
                        layout: "main"
                    }) 
                }
            }
            else{
                valid.invalid_flag = true;
                valid.errormsg = "Username does not exist.";
                res.render("login", {
                    data: valid,
                    layout: "main"
                })
            }
        })
    }

    else{
        console.log(valid.errormsg);
        res.render("login", {
            data: valid,
            layout: "main"
        })
    }
})

router.get("/logout", function(req,res){
    req.session.reset();
    res.redirect("/login");
})

module.exports = router;