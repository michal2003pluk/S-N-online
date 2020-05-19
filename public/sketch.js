var rows = 7; //row, column size of grid
var columns = 7;
let path = []; //array for path
var diceRoll; //roll button object
let player1, player2; //both players
var turn = false //which player's turn it is
var socket;
var user = false;



function newDrawing(data) {
	//console.log(data.x + ',' + data.y)
	//console.log(Math.floor(data.y / 100) + ',' + Math.floor(data.x / 100))


	// if (turn) {
	// 	player1.row = Math.floor(data.x / 100)
	// 	player1.col = Math.floor(data.y / 100) //All testing
	// } else {
	// 	player2.row = Math.floor(data.x / 100)
	// 	player2.col = Math.floor(data.y / 100)
	// }
	turn = !turn
}

function init(data) {
	if (user == true) {
		turn = false
		var data = {
			user: false
		}
		socket.emit('confirmation', data)
	} else {
		turn = true
		var data = {
			user: true
		}
		socket.emit('confirmation', data)
	}
}

function confirm(data) {
	if (data.user == false) {
		turn = true
	} else {
		turn = false
	}
}



function mouseDragged() {
	console.log('Sending:' + mouseX + ',' + mouseY);

	var data = {
		x: mouseX,
		y: mouseY
	}
	socket.emit('mouse', data)

	noStroke()
	fill(255, 0, 0)
	ellipse(mouseX, mouseY, 20, 20);
}


function setup() {
	createCanvas(800, 800) //Generates canvas
	background(255); //fills canvas as white

	socket = io.connect('http://localhost:3000');
	socket.on('mouse', newDrawing);
	socket.on('inituser', init)
	socket.on('confirm', confirm)


	var data = {
		user: true
	}
	socket.emit('inituser', data)



	if (rows % 2 == 1) {
		var asc = true;
	} //setup for generating grid
	for (var x = 0; x < rows; x++) {
		if (asc) {
			for (var y = 0; y < columns; y++) {
				var num = (rows - x - 1) * columns + y + 1
				path[num - 1] = new Cell(x, y, 100, num)
			}
		} else {
			for (var y = 0; y < columns; y++) {
				var num = (rows - x) * columns - y
				path[num - 1] = new Cell(x, y, 100, num)
			}
		} //generating grid
		asc = !asc
	}

	player1 = new Player(0, 6, 100, 1);
	player2 = new Player(0, 6, 100, -1); //new Player

	{
		diceRoll = new Clickable();
		diceRoll.locate(110, 710);
		diceRoll.resize(480, 80);
	} //Creates button

	diceRoll.onHover = function() {
		//This function is ran when the clickable is hovered.
		this.color = "#AAAAFF";
		this.textColor = "#FFFFFF";
		this.text = "Rolls 2 dice, each 1-6";
	}
	diceRoll.onOutside = function() {
		//This function is ran when the clickable is NOT hovered.
		this.stroke = "#000000"
		this.textSize = 40
		this.color = "#0000FF"
		this.text = "Roll";
		this.textColor = "#FFFFFF";
		this.strokeWeight = 2
	}
	diceRoll.onPress = function() {
		//This function is ran when the clickable is pressed.
		this.stroke = "#FF0000";
	}
	diceRoll.onRelease = function() {
		//This funcion is ran when the cursor was pressed and then
		//released inside the clickable. If it was pressed inside and
		//then released outside this won't work.
		console.log(turn);

		// 	var dice1 = Math.floor(random(1, 7));
		// 	var dice2 = Math.floor(random(1, 7));
		// 	var total = dice1 + dice2;
		// 	//console.log(dice1 + ',' + dice2 + ' = ' + total)
		// 	if (dice1 === dice2) {
		// 		total = -total
		// 		if (turn) {
		// 			alert("Player 1 has rolled a double and moves " + -total + ' spaces back');
		// 		} else {
		// 			alert("Player 2 has rolled a double and moves " + -total + ' spaces back');
		// 		}
		// 	}
		//
		// 	if (turn) {
		// 		player1.t += total
		// 		if (player1.t < 0) {
		// 			player1.t = 0
		// 		}
		// 	} else {
		// 		player2.t += total
		// 		if (player2.t < 0) {
		// 			player2.t = 0
		// 		}
		// 	}
		//
		// 	if (player1.t >= (rows * columns - 1)) {
		// 		alert("Player 1 has won!")
		// 		player1.t = rows * columns - 1
		// 		player1.update(path[player1.t]);
		// 	} else if (player2.t >= (rows * columns - 1)) {
		// 		alert("Player 2 has won!")
		// 		player2.t = rows * columns - 1
		// 		player2.update(path[player2.t]);
		// 	} else {
		// 		player1.update(path[player1.t]);
		// 		player2.update(path[player2.t]);
		// 		turn = !turn
		// 	}
	}
}



function draw() {
	diceRoll.draw(); //Draw button
	for (var x = 0; x < rows; x++) {
		for (var y = 0; y < columns; y++) {
			path[x * rows + y].show() //displays grid
		}
	}
	player1.show(); //displays players
	player2.show();
}