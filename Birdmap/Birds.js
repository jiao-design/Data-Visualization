var max_ball = 600;
var d_min = 12;
var d_max = 12;

var hoveredInfo = {};
var hoveredCanvas = {};
var clickedInfo = {};
var clickedBirds = [];


/*
Category (E.g. Issf)
	- dom (html div that contains the p5 canvas)
	- balls (An array to store all the Ball objects)
		For each ball in balls array:
			- x (center x pos)
			- y (center y pos)
			- d (diameter)
			- h (Boolean of is currently hovered?)
			- pinned (Boolean of is currently pinned?)
			- visible (Boolean of is currently visible?)
			- color (color value of the ball)
			- obj (the Category it belongs to)
	- data (An array of all the Bird objects within this category)
	- color (color value of all the balls)
	- name (name string of the category)
	- canvas (the P5 canvas this category is drawn on)
*/

var species = {};
var issf = {};
var hybrid = {};
var spuh = {};
var domestic = {};
var intergrade = {};
var form = {};
var slash = {};

species.dom = document.getElementById('p5_species');
issf.dom = document.getElementById('p5_issf');
hybrid.dom = document.getElementById('p5_hybrid');
spuh.dom = document.getElementById('p5_spuh');
domestic.dom = document.getElementById('p5_domestic');
intergrade.dom = document.getElementById('p5_intergrade');
form.dom = document.getElementById('p5_form');
slash.dom = document.getElementById('p5_slash');

species.balls = [];
issf.balls = [];
hybrid.balls = [];
spuh.balls = [];
domestic.balls = [];
intergrade.balls = [];
form.balls = [];
slash.balls = [];

species.data = [];
issf.data = [];
hybrid.data = [];
spuh.data = [];
domestic.data = [];
intergrade.data = [];
form.data = [];
slash.data = [];

species.color = '#EF9175';
issf.color = '#597BAE';
hybrid.color = '#AC72C8';
spuh.color = '#6EAAAA';
domestic.color = '#ACA95B';
intergrade.color = '#D45959';
form.color = '#A18F72';
slash.color = '#D27FA2';

species.name = 'species';
issf.name = 'issf';
hybrid.name = 'hybrid';
spuh.name = 'spuh';
domestic.name = 'domestic';
intergrade.name = 'intergrade';
form.name = 'form';
slash.name = 'slash';


// Preload data & any functions that uses the data
$.getJSON( "ebird_taxonomy_v2022.json", function(data) {
	
	// Data processing
	for (var i = 0; i < data.length; i++)
	{
		switch (data[i].CATEGORY){
		case "species":
			species.data.push(data[i]);
			break;
		case "issf":
			issf.data.push(data[i]);
			break;
		case "hybrid":
			hybrid.data.push(data[i]);
			break;
		case "spuh":
			spuh.data.push(data[i]);
			break;
		case "domestic":
			domestic.data.push(data[i]);
			break;
		case "intergrade":
			intergrade.data.push(data[i]);
			break;
		case "form":
			form.data.push(data[i]);
			break;
		case "slash":
			slash.data.push(data[i]);
			break;
		}
	}
	
	//set container DOM height
	species.dom.style.height = getHeight(species) + "px";
	issf.dom.style.height = getHeight(issf) + "px";
	hybrid.dom.style.height = getHeight(hybrid) + "px";
	spuh.dom.style.height = getHeight(spuh) + "px";
	domestic.dom.style.height = getHeight(domestic) + "px";
	intergrade.dom.style.height = getHeight(intergrade) + "px";
	form.dom.style.height = getHeight(form) + "px";
	slash.dom.style.height = getHeight(slash) + "px";
	
	var current;

	// Define p5 canvas instance
	var c = function (p){
		p.objIndex = 0;
		
		// Setup function
		p.setup = function()
		{
			// A function that can be called after the instance is created. Goal is to create the complete balls array for each category.
			p.createballs = function(obj){
				p.createCanvas(obj.dom.offsetWidth, obj.dom.offsetHeight);
				p.fill('#FFFFFF');
				p.strokeWeight(0);
				
				for (var i = 0; i < (obj.data.length > max_ball ? max_ball : obj.data.length); i++)
				{
					current = new Ball(
						p.int(p.random(d_max, obj.dom.offsetWidth - d_max)),
						p.int(p.random(d_max, obj.dom.offsetHeight - d_max)),
						p.int(p.random(d_min, d_max)),
						obj
					);
					
					while(current.hasCollision(p)){
						current.x = p.int(p.random(d_max, obj.dom.offsetWidth - d_max));
						current.y = p.int(p.random(d_max, obj.dom.offsetHeight - d_max));
					}
					
					obj.balls.push(current);
				}
				
				
				//Get object name
				switch (obj.name){
				case 'species':
					p.objIndex = 1;
					break;
				case 'issf':
					p.objIndex = 2;
					break;
				case 'hybrid':
					p.objIndex = 3;
					break;
				case 'spuh':
					p.objIndex = 4;
					break;
				case 'domestic':
					p.objIndex = 5;
					break;
				case 'intergrade':
					p.objIndex = 6;
					break;
				case 'form':
					p.objIndex = 7;
					break;
				case 'slash':
					p.objIndex = 8;
					break;
				}
			}
		};
		
		// Draw function
		p.draw = function()
		{
			// Clean canvas at the beginning of each iteration
			p.clear();
			
			// Draw balls and detect their hover states for each category
			switch (p.objIndex)
			{
			case 0:
				break;
			case 1:
				species.balls.forEach(element => {
					element.checkHover(p, p.mouseX, p.mouseY);
					element.show(p);
				});
				break;
			case 2:
				issf.balls.forEach(element => {
					element.checkHover(p, p.mouseX, p.mouseY);
					element.show(p);
				});
				break;
			case 3:
			    hybrid.balls.forEach(element => {
					element.checkHover(p, p.mouseX, p.mouseY);
					element.show(p);
				});
				break;
			case 4:
			    spuh.balls.forEach(element => {
					element.checkHover(p, p.mouseX, p.mouseY);
					element.show(p);
				});
				break;
			case 5:
			    domestic.balls.forEach(element => {
					element.checkHover(p, p.mouseX, p.mouseY);
					element.show(p);
				});
				break;
			case 6:
			    intergrade.balls.forEach(element => {
					element.checkHover(p, p.mouseX, p.mouseY);
					element.show(p);
				});
				break;
			case 7:
			    form.balls.forEach(element => {
					element.checkHover(p, p.mouseX, p.mouseY);
					element.show(p);
				});
				break;
			case 8:
			    slash.balls.forEach(element => {
					element.checkHover(p, p.mouseX, p.mouseY);
					element.show(p);
				});
				break;
			}
			
			// Show/hide balls according to filter select states
			var caprimulgiformes = $('input[type="checkbox"][name="Caprimulgiformes"]').is(':checked') ? true : false;
			var charadriiformes = $('input[type="checkbox"][name="Charadriiformes"]').is(':checked') ? true : false;
			var passeriformes = $('input[type="checkbox"][name="Passeriformes"]').is(':checked') ? true : false;
			var piciformes = $('input[type="checkbox"][name="Piciformes"]').is(':checked') ? true : false;
			var psittaciformes = $('input[type="checkbox"][name="Psittaciformes"]').is(':checked') ? true : false;
			filterOrder(species, caprimulgiformes, charadriiformes, passeriformes, piciformes, psittaciformes);
			filterOrder(issf, caprimulgiformes, charadriiformes, passeriformes, piciformes, psittaciformes);
			filterOrder(hybrid, caprimulgiformes, charadriiformes, passeriformes, piciformes, psittaciformes);
			filterOrder(spuh, caprimulgiformes, charadriiformes, passeriformes, piciformes, psittaciformes);
			filterOrder(domestic, caprimulgiformes, charadriiformes, passeriformes, piciformes, psittaciformes);
			filterOrder(intergrade, caprimulgiformes, charadriiformes, passeriformes, piciformes, psittaciformes);
			filterOrder(form, caprimulgiformes, charadriiformes, passeriformes, piciformes, psittaciformes);
			filterOrder(slash, caprimulgiformes, charadriiformes, passeriformes, piciformes, psittaciformes);
		};
	};
	
	// Using the above defined P5 template to draw the 8 canvas
	species.canvas = new p5(c, 'p5_species');
	issf.canvas = new p5(c, 'p5_issf');
	hybrid.canvas = new p5(c, 'p5_hybrid');
	spuh.canvas = new p5(c, 'p5_spuh');
	domestic.canvas = new p5(c, 'p5_domestic');
	intergrade.canvas = new p5(c, 'p5_intergrade');
	form.canvas = new p5(c, 'p5_form');
	slash.canvas = new p5(c, 'p5_slash');
	
	// For each drawed canvas, create the balls array
	species.canvas.createballs(species);
	issf.canvas.createballs(issf);
	hybrid.canvas.createballs(hybrid);
	spuh.canvas.createballs(spuh);
	domestic.canvas.createballs(domestic);
	intergrade.canvas.createballs(intergrade);
	form.canvas.createballs(form);
	slash.canvas.createballs(slash);
});

// Click ball
$(document).on("click",".column", function () {
	getClickedBallInfo(hoveredCanvas);
	
	if(clickedInfo.pri_name !== ''){
		let exist = false;
		
		for (var i = 0; i < clickedBirds.length; i++){
			if (clickedBirds[i].pri_name == clickedInfo.pri_name){
				exist = true;
				break;
			}
		}
		
		if (!exist){
			let copiedObject = Object.assign({}, clickedInfo);
			clickedBirds.unshift(copiedObject);
			$("#pinnedList").empty();
			$("#pinnedListHeaderTitle").text('Pinned birds (' + clickedBirds.length + '):');
			$("#clearButton").removeClass('disabledClearButton');
			for (var i = 0; i < clickedBirds.length; i++){
				$("<div class = 'pinnedBird'>").append(
					$("<p class = 'birdName'>").text(clickedBirds[i].pri_name),
					$("<p class = 'birdDetail'>").text(clickedBirds[i].sci_name),
					$("<p class = 'birdDetail'>").text('Order: ' + clickedBirds[i].order),
					$("<p class = 'birdDetail'>").text('Family: ' + clickedBirds[i].family)
				).appendTo("#pinnedList");
			}
		}
	}
});

// Click clear button
$(document).on("click","#clearButton", function () {
	species.balls.forEach(element => element.pinned = false)
	issf.balls.forEach(element => element.pinned = false)
	hybrid.balls.forEach(element => element.pinned = false)
	spuh.balls.forEach(element => element.pinned = false)
	domestic.balls.forEach(element => element.pinned = false)
	intergrade.balls.forEach(element => element.pinned = false)
	form.balls.forEach(element => element.pinned = false)
	slash.balls.forEach(element => element.pinned = false)
	
	clickedBirds = [];
	$("#pinnedList").empty();
	$("#pinnedListHeaderTitle").text('No Bird has been pinned yet.');
	$("#clearButton").addClass('disabledClearButton');
});

// Calculate height of each canvase
function getHeight(obj) {
	var ballCount = obj.data.length > max_ball ? max_ball : obj.data.length;
	var width = obj.dom.offsetWidth;
	var height = (ballCount / Math.floor((width - d_max * 2) / (d_max * 1.2))) * d_max * 2 + d_max * 2;
	
	return height;
}

// Get info to draw the hover window
function getHoveredBallInfo(obj, x, y) {
	var index = obj.balls.findIndex(element => element.h === true);
	
	if (index !== -1) {
		hoveredInfo.pri_name = obj.data[index].PRIMARY_COM_NAME;
		hoveredInfo.sci_name = obj.data[index].SCI_NAME;
		hoveredInfo.order = obj.data[index].ORDER1;
		hoveredInfo.family = obj.data[index].FAMILY;
		hoveredInfo.x = x + obj.dom.offsetLeft + 8;
		hoveredInfo.y = y + obj.dom.offsetTop + 16;
	} else {
		hoveredInfo.pri_name = '';
		hoveredInfo.sci_name = '';
		hoveredInfo.order = '';
		hoveredInfo.family = '';
		hoveredInfo.x = -10000;
		hoveredInfo.y = -10000;
	}
	
	$("#hoverBox").css({top: hoveredInfo.y, left: hoveredInfo.x, visibility: 'visible'});
	$("#hoverBoxName").text(hoveredInfo.pri_name);
	$("#hoverBoxSciName").text(hoveredInfo.sci_name);
	$("#hoverBoxOrder").text('Order: ' + hoveredInfo.order);
	$("#hoverBoxFamily").text('Family: ' + hoveredInfo.family);
}

// Get the bird info according to the associate ball click event
function getClickedBallInfo(obj) {
	var index = obj.balls.findIndex(element => element.h === true);
	
	if (index !== -1) {
		obj.balls[index].pinned = true;
		
		clickedInfo.pri_name = obj.data[index].PRIMARY_COM_NAME;
		clickedInfo.sci_name = obj.data[index].SCI_NAME;
		clickedInfo.order = obj.data[index].ORDER1;
		clickedInfo.family = obj.data[index].FAMILY;
	} else {
		clickedInfo.pri_name = '';
		clickedInfo.sci_name = '';
		clickedInfo.order = '';
		clickedInfo.family = '';
	}
}

// Show/hide balls for each category according to the filter states
function filterOrder(obj, a, b, c, d, e) {
	for (var i = 0; i < obj.balls.length; i++){
		switch (obj.data[i].ORDER1){
		case "Caprimulgiformes":
			a ? obj.balls[i].visible = true : obj.balls[i].visible = false;
			break;
		case "Charadriiformes":
			b ? obj.balls[i].visible = true : obj.balls[i].visible = false;
			break;
		case "Passeriformes":
			c ? obj.balls[i].visible = true : obj.balls[i].visible = false;
			break;
		case "Piciformes":
			d ? obj.balls[i].visible = true : obj.balls[i].visible = false;
			break;
		case "Psittaciformes":
			e ? obj.balls[i].visible = true : obj.balls[i].visible = false;
			break;
		}
	}
}
