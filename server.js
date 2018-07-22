// *****************************************************************************
// Server.js - This file is the initial starting point for the Node/Express server.
//
// ******************************************************************************
// *** Dependencies
// =============================================================
require("dotenv").config();
var express = require("express");
var bodyParser = require("body-parser");
var session = require("express-session");

///https:
// var https = require('https');
// var fs = require('fs');
// require("")
// var options = {
//     key: fs.readFileSync('./etc/key.pem'),
//     cert: fs.readFileSync('./etc/cert.pem'),
//     requestCert: false,
//     rejectUnauthorized: false
// };

// var app = express();
// var server = https.createServer(options, app).listen(3000, function(){
//     console.log("server started at port 3000");
// });

// Sets up the Express App
// =============================================================
var app = express();

var PORT = process.env.PORT || 3000;



// Requiring passport as we've configured it
// var passport = require("./config/passport");
var passport = require("passport");
var social = require("./config/passportfb")(app,passport);

// Requiring our models for syncing
var db = require("./models");

// Sets up the Express app to handle data parsing

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }));
// parse application/json
app.use(bodyParser.json());

// Static directory
app.use(express.static("public"));



// Set Handlebars.
var exphbs = require("express-handlebars");


// We need to use sessions to keep track of our user's login status
app.use(session({ secret: "keyboard cat", resave: true, saveUninitialized: true }));
app.use(passport.initialize());
app.use(passport.session());


app.engine("handlebars", exphbs({ defaultLayout: "main" }));
app.set("view engine", "handlebars");


// Routes
// =============================================================
require("./routes/html-routes.js")(app);
require("./routes/api-routes.js")(app);

// Syncing our sequelize models and then starting our Express app
// =============================================================
db.sequelize.sync({ force: false }).then(function() {
  app.listen(PORT, function() {
    console.log("App listening on PORT " + PORT);
    // console.log(process.env.FOOD_2_FORK_KEY);
  });
});
