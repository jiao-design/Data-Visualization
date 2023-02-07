let planetsData = {};
let font = {};
let images = {};
let mercury, venus, earth, mars, jupiter, saturn, uranus, neptune;
let fr = 30;
let p = true;
let ballStates = [0,0,0,0,0,0,0,0];

function preload(){
	//Data
	planetsData = loadJSON('./planets.json');
	
	//Fonts
	font.r = loadFont('./Orbitron-Regular.ttf');
	font.m = loadFont('./Orbitron-Medium.ttf');
	font.b = loadFont('./Orbitron-Bold.ttf');
	
	//Images
	images.mercury = loadImage("./Mercury.png");
	images.venus = loadImage("./Venus.png");
	images.earth = loadImage("./Earth.png");
	images.mars = loadImage("./Mars.png");
	images.jupiter = loadImage("./Jupiter.png");
	images.saturn = loadImage("./Saturn.png");
	images.uranus = loadImage("./Uranus.png");
	images.neptune = loadImage("./Neptune.png");
}

function setup(){
	createCanvas(windowWidth, windowHeight);
	mercury = new Ball(0);
	venus = new Ball(1);
	earth = new Ball(2);
	mars = new Ball(3);
	jupiter = new Ball(4);
	saturn = new Ball(5);
	uranus = new Ball(6);
	neptune = new Ball(7);
	frameRate(fr);
}

function draw(){
	//Initial styles
	background(0,0,0);
	stroke('#FFFFFF');
	strokeWeight(0);
	textFont(font.b);
	textSize(22);
    textAlign(CENTER);
	textLeading(22 * 1.4);
    fill("#FFFFFF");
	
	
	/**********************
	Draw static UI elements
	***********************/
	//Page title
	push();
	textFont(font.b);
	textSize(40);
    fill("#FFFFFF");
	text('GRAVITY SIMULATION', 0, 88, width, 56);
	pop();
	
	//Page subtitle
	push();
	textFont(font.m);
	textSize(20);
    fill("#FFFFFF");
	text('Drop a ball from 1km above planet surface.', 0, 120, width, 34);
	pop();
	
	//1km mark
	push();
	textFont(font.r);
	textSize(12);
    textAlign(RIGHT);
    fill("#EEEEEE");
	text('1 km', 0, 188, width - 20, 17);
	pop();
	
	// First horizontal line
	push();
	stroke('#FFFFFF');
	strokeWeight(2);
	line(
		0,
		168,
		width,
		168
	);
	pop();
	
	//Ground mark
	push();
	textFont(font.r);
	textSize(12);
    textAlign(RIGHT);
    fill("#EEEEEE");
	text('Ground', 0, height - 40 - 32 - 18 - 12 - 32 - 24 - 70 - 40 - 12, width - 20, 17);
	pop();
	
	// Second horitontal line
	push();
	stroke('#FFFFFF');
	strokeWeight(2);
	line(
		0,
		height - 40 - 32 - 18 - 12 - 32 - 24 - 70 - 40,
		width,
		height - 40 - 32 - 18 - 12 - 32 - 24 - 70 - 40
	);
	pop();
	
	// Planets
	var column = {};
	column.h = height;
	column.w = (width - 200) / 8;
	
	for (var i = 0; i < 8; i++)
	{
		PlanetColumn(i, column.w, column.h);
	}
	
	
	/**********************
	Draw Dynamic Content
	***********************/
	if (!p)
	{
		mercury.update();
		venus.update();
		earth.update();
		mars.update();
		jupiter.update();
		saturn.update();
		uranus.update();
		neptune.update();
	
		mercury.show();
		venus.show();
		earth.show();
		mars.show();
		jupiter.show();
		saturn.show();
		uranus.show();
		neptune.show();
		
		var count = 0;
		for (var i = 0; i < 8 ; i++)
		{
			count += ballStates[i];
		}
		if (count == 8)
		{
			setTimeout(() => {
				mercury.v = 0;
				venus.v = 0;
				earth.v = 0;
				mars.v = 0;
				jupiter.v = 0;
				saturn.v = 0;
				uranus.v = 0;
				neptune.v = 0;
	
				mercury.pos.y = 168;
				venus.pos.y = 168;
				earth.pos.y = 168;
				mars.pos.y = 168;
				jupiter.pos.y = 168;
				saturn.pos.y = 168;
				uranus.pos.y = 168;
				neptune.pos.y = 168;
	
				for (var i = 0; i < 8 ; i++)
				{
					ballStates[i] = 0;
				}
	
				p = true;
			}, 1000)
		}
	}else
	{
		var b = circle(width/2, height/2 - 48, 240);
		push();
		textFont(font.b);
		textSize(40);
	    fill("#000000");
		text('START', 0, height/2 + 14 - 48, width, 56);
		pop();
	}
		
	
	/**********************
	Draw Dynamic Content
	***********************/
	
}

class Ball{
	constructor(index){
		this.pos = p5.Vector.fromAngle(0);
		this.pos.mult(0);
		this.w = (width - 200) / 8;
		this.pos.x = 100 + this.w * (index + 0.5);
		this.pos.y = 168;
		this.v = 0;
		this.i = index;
        this.t = 0;
	}
	
	update(){
		var endPosY = height - 40 - 32 - 18 - 12 - 32 - 24 - 70 - 40;
		var distance = endPosY - 168;
		
		if(this.pos.y < endPosY)
		{
			this.v += planetsData[this.i].SurfaceGravity / fr;
			this.pos.y += this.v / fr + 0.5 * planetsData[this.i].SurfaceGravity / Math.pow(fr, 2);
            this.t += 1/fr;
		}else
		{
			ballStates[this.i] = 1;
		}
	}
	
	show(){
		push();
		fill(planetsData[this.i].Color);
		circle(this.pos.x, this.pos.y, 24);
        // textFont(font.r);
		// textSize(10);
        // textAlign(CENTER);
	    // fill("#BBBBBB");
		// text (round(this.t,2), this.pos.x -24, this.pos.y + 28, 48, 32);
		pop();
	}
}

function PlanetColumn(index, columnWidth, columnHeight){
	//Gravity Number
	push();
	textFont(font.b);
	textSize(22);
	text(planetsData[index].SurfaceGravity, 100 + columnWidth * index, columnHeight - 40 - 32, columnWidth, 32);
	pop();
	
	//Gravity Unit
	push();
	textFont(font.r);
	textSize(12);
    fill("#BBBBBB");
	text('Gravity  (m/s2)', 100 + columnWidth * index, columnHeight - 40 - 32 - 32, columnWidth, 18);
	pop();
	
	//Planet Name
	push();
	textFont(font.b);
	textSize(22);
	text(planetsData[index].Planet, 100 + columnWidth * index, columnHeight - 40 - 32 - 18 - 12 - 32, columnWidth, 32);
	pop();
	
	//line
	push();
	stroke('#FFFFFF');
	strokeWeight(1);
	line(
		100 + columnWidth * index + columnWidth / 2,
		columnHeight - 40 - 32 - 18 - 12 - 32 - 24 - 70 - 40,
		100 + columnWidth * index + columnWidth / 2,
		columnHeight - 40 - 32 - 18 - 12 - 32 - 24 - 70
	);
	pop();
	
	//Planet image
	image(
		getImageByIndex(index),
		100 + columnWidth * index + columnWidth / 2 - 98 / 2,
		columnHeight - 40 - 32 - 18 - 12 - 32 - 24 - 98,
		98,
		98
	);
	
}

function getImageByIndex(index){
	let image;
	
	if (index == 0)
	{
		image = images.mercury;
	}else if(index == 1)
	{
		image = images.venus;
	}else if(index == 2)
	{
		image = images.earth;
	}else if(index == 3)
	{
		image = images.mars;
	}else if(index == 4)
	{
		image = images.jupiter;
	}else if(index == 5)
	{
		image = images.saturn;
	}else if(index == 6)
	{
		image = images.uranus;
	}else if(index == 7)
	{
		image = images.neptune;
	}
	
	return image;
}

function mouseClicked() {
  if (dist(mouseX, mouseY, width/2, height/2) <= 120)
  {
	  p = false;
  }
}