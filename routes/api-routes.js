var db = require("../models");

module.exports = function(app) {

	// Get all the burgers from the DB
	app.get("/burgers", function(req, res) {
		db.Burger.findAll({}).then(function(results) {
			res.json(results);
		});	
	});

	// Get all the burgers from the DB and return json objects to display
	// in the same format under the /api url page.
	app.get("/burgers/api", function(req, res) {
		db.Burger.findAll({}).then(function(results) {
			res.json(results);
		});
	});

	// Create a new burger in the DB
	app.post("/burgers/post", function(req, res) {
		console.log("POST");
		console.log(req.body);
		db.Burger.create(req.body).then(function(results) {
			console.log(req.body);
			res.json(results);
		});
	});

	// Update an existing burger in the DB
	app.put("/burgers/:id", function(req, res) {
		console.log("PUT");
		console.log(req.params.id);
		var postData = {
			devoured: true
		}
		db.Burger.update(postData, { where: {id: req.params.id}}).then(function(results) {
			res.json(results);
		});
	});
};