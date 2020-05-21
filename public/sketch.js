const rows = 7; //row, column size of grid
const columns = 7;
let path = []; //array for path
var diceRoll; //roll button object
let player1, player2; //both players
var turn = false //which player's turn it is
var socket;
var user = false;
var name;
var gameOver = false;
let img;

function setup() {
	createCanvas(703, 800) //Generates canvas
	background(255); //fills canvas as white
	img = loadImage('bg.jpg');

	socket = io.connect('http://localhost:3000');
	socket.on('inituser', init)
	socket.on('confirm', confirm)

	var data = {
		user: true
	}
	socket.emit('inituser', data)

	socket.on('turndata', updateTurn);


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

		if (turn) {
			var dice1 = Math.floor(random(1, 7));
			var dice2 = Math.floor(random(1, 7));
			var total = dice1 + dice2;
			//console.log(dice1 + ',' + dice2 + ' = ' + total)
			if (dice1 === dice2) {
				total = -total
				alert(name + " has rolled a double and moves " + -total + ' spaces back');
			}

			if (name == 'Player 1') {
				updatePosition(player1, total)
			} else {
				updatePosition(player2, total)
			}
		} else {
			if (gameOver) {
				alert('The game is over');
			} else {
				alert('It is not your turn')
			}
		}
	}
}

function init(data) {
	if (user == true) {
		turn = false
		name = 'Player 2'
		var data = {
			user: false
		}
		socket.emit('confirmation', data)
	} else {
		turn = true
		name = 'Player 1'
		var data = {
			user: true
		}
		socket.emit('confirmation', data)
	}
}

function confirm(data) {
	if (data.user == false) {
		turn = true
		name = 'Player 1'
	} else {
		turn = false
		name = 'Player 2'
	}
}

function updateTurn(data) {
	if (!gameOver) {
		if (name == 'Player 1') {
			player2.t = data.updatedPosition;
			player2.update(path[player2.t]);
		} else {
			player1.t = data.updatedPosition;
			player1.update(path[player1.t]);
		}
		turn = !turn
		if (data.updatedPosition == rows * columns - 1) {
			gameOver = true;
			alert(data.winner + ' has won!')
			turn = false;
		}
	}
}

function updatePosition(objectPlayer, total) {
	objectPlayer.t += total
	if (objectPlayer.t < 0) {
		objectPlayer.t = 0
	}


	if (objectPlayer.t >= (rows * columns - 1)) {
		alert(name + ' has won!')
		objectPlayer.t = rows * columns - 1;
		objectPlayer.update(path[objectPlayer.t]);
		gameOver = true;
		turn = false

		var data = {
			updatedPosition: objectPlayer.t,
			winner: name
		}
		socket.emit('turndata', data)


	} else {
		objectPlayer.update(path[objectPlayer.t]);
		turn = !turn
		var data = {
			updatedPosition: objectPlayer.t
		}
		socket.emit('turndata', data)
	}
}

function draw() {
	image(img, 0, 0);
	img.resize(703, 800);
	diceRoll.draw(); //Draw button
	for (var x = 0; x < rows; x++) {
		for (var y = 0; y < columns; y++) {
			path[x * rows + y].show() //displays grid
		}
	}
	player1.show(); //displays players
	player2.show();
}