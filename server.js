/*
 * Server start up file.  This is the main file to start the server for Burger App
 */

// Dependencies
var express = require("express");
var bodyParser = require("body-parser");
var db = require("./models");

var app = express();
var PORT = process.env.PORT || 8080;

// Set up Express app to handle data-parsing
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.text());
app.use(bodyParser.json({type: "application/vnd.api+json"}));

// Set up static directory path
app.use(express.static("public"));

// Routes
require("./routes/api-routes.js")(app);
require("./routes/html-routes.js")(app);

// Initialize Database and then kick off the server on 
// successful conneciton to the database
db.sequelize.sync({force: true}).then(function(){
	console.log("CONNECTED to DB.");
	app.listen(PORT, function(){
		console.log("LISTENING on port: " + PORT);
	});
});