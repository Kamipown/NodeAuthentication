var express = require("express");
var app = express();
var port = process.env.PORT || 8080;
var mongoose = require("mongoose");
var passport = require("passport");
var flash = require("connect-flash");

var morgan = require("morgan");
var cookie_parser = require("cookie-parser");
var body_parser = require("body-parser");
var session = require("express-session");

var config_db = require("./config/database.js");

mongoose.connect(config_db.url);

require("./config/passport")(passport);

app.use(morgan("dev"));
app.use(cookie_parser());
app.use(body_parser());

app.set("view engine", "ejs");

app.use(session({secret: "kamipownsecret"}));
app.use(passport.initialize());
app.use(passport.session());
app.use(flash());

require("./app/routes.js")(app, passport);

app.listen(port);
console.log("Connected on port " + port);
