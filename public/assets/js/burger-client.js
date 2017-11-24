function getBurgers() {
	$.ajax({
		method: "GET",
		url: "/burgers"
	}).then(function(data){
		console.log(data);
		$("#burger-list").empty();
		$("#devoured-list").empty();
		for (var i=0; i<data.length; i++) {
			if (data[i].devoured) {
				createDevouredBurgerRow(data[i].burger_name);
			} else {
				createBurgerRow(data[i].burger_name, data[i].id);
			}
		}
	});
}

function createBurgerRow(name, id) {
	console.log("Create Row");
	var burgerId = $("#burger-list");
	var burgerRow = $("<div>");
	burgerRow.append("<span>" + name + " </span>");
	var delBtn = $("<button>");
	delBtn.attr("class", "btn btn-sm btn-primary devour");
	delBtn.attr("type", "button");
	delBtn.attr("data-id", id);
	delBtn.text("Devour It");
	burgerRow.append(delBtn);
	burgerId.append(burgerRow);
}

function createDevouredBurgerRow(name) {
	var devouredId = $("#devoured-list");
	var burgerDiv = $("<div>");
	var pBurger = $("<button>");
	pBurger.text(name);
	pBurger.attr("class", "devoured");
	burgerDiv.append(pBurger);
	devouredId.append(burgerDiv);
}

// Kick off the page
$(function() { 

	// Get all Burgers and Display them on the home page accordingly
	getBurgers();

	// Listen to new burger create events
	$(".create-burger").on("click", function() {
		event.preventDefault();
		var burgerObj = {
			burger_name: $("#name").val().trim()
		}
		$.ajax({
			method: "POST",
			url: "/burgers/post",
			data: burgerObj
		}).then(function(data) {
			location.reload();
		});
	});

	// Listen to burger devoured events
	$(document).on("click", ".devour", function() {
		event.preventDefault();
		console.log("Clicked Devour");
		var id = $(this).data().id;
		console.log("/bugers/"+id);
		$.ajax({
			method: "PUT",
			url: "/burgers/"+id
		}).then(function(data) {
			location.reload();
		});	
	});
});
