//WEB322 Assignment 3
//Hung Truong - 147779193
//Email: htruong19@myseneca.ca
//Date: July 25, 2021

const express = require('express')
const router = express.Router();
const path = require("path");

router.get("", (req,res) => {
    res.render("home");
})

module.exports = router;