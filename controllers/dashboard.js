    //WEB322 Assignment 4
    //Hung Truong - 147779193
    //Email: htruong19@myseneca.ca
    //Date: August 06, 2021

const express = require('express')
const router = express.Router();
const path = require("path");

function ensureLogin(req, res, next){
    if(!req.session.user) {
        res.redirect("/login");
    }
    else{
        next();
    }
}

router.get("", ensureLogin, (req,res) => {
    res.render("dashboard", {
        user: req.session.user, 
        layout: "main"
    });
})

router.get("/add", ensureLogin, (req,res) => {
    res.redirect("/addRoom");
})

router.get("/edit", ensureLogin, (req,res) => {
    res.redirect("/editRoom");
})

router.get("/list", ensureLogin, (req,res) => {
    res.redirect("/listRoom");
})

module.exports = router;