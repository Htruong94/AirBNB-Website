    //WEB322 Assignment 5
    //Hung Truong - 147779193
    //Email: htruong19@myseneca.ca
    //Date: August 10, 2021

const e = require("express");
const express = require("express");
const exphbs = require("express-handlebars");
var multer = require("multer");
const app = express();
const mongoose = require("mongoose");
require('dotenv').config();
const clientSessions = require('client-sessions');

app.use(clientSessions({
    cookieName: 'session',
    secret: 'web322ass',
    duration: 5 * 60 * 1000,
    activeDuration: 5 * 1000 * 60
}));

app.use(express.urlencoded({extended: false}));

app.use((req, res, next) => {
    res.locals.session = req.session;
    next();
});

mongoose.connect(`mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@${process.env.DB_CONN}`);

var HTTP_PORT = process.env.PORT || 8080;

app.engine('.hbs', exphbs({extname: '.hbs'}));
app.use(express.static("static"));
app.set('view engine', '.hbs');

function onHttpStart(){
    console.log("Express http server is listening on: " + HTTP_PORT);
}

const storage = multer.diskStorage({destination: "./static/images/room", filename: function(req, file, cb){
    cb(null, Date.now() + path.extname(file.originalname));
}});

const upload = multer({storage: storage});

const homeController = require("./controllers/home");
app.use("/", homeController);

const roomController = require("./controllers/room");
app.use("/room", roomController);

const dashboardController = require("./controllers/dashboard");
app.use("/dashboard", dashboardController);

const loginController = require("./controllers/login");
app.use("/login", loginController);

const registerController = require("./controllers/register");
app.use("/registration", registerController);

const addRoomController = require("./controllers/addRoom");
app.use("/addRoom", addRoomController);

const editRoomController = require("./controllers/editRoom");
app.use("/editRoom", editRoomController);

const listRoomController = require("./controllers/listRoom");
app.use("/listRoom", listRoomController);

const roomDescController = require("./controllers/roomDesc");
app.use("/roomDesc", roomDescController);

app.listen(HTTP_PORT, onHttpStart);