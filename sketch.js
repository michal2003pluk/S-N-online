var rows = 7; //row, column size of grid
var columns = 7;
let path = [];
var diceRoll;
let player1;
let player2;
var turn = true

function setup() {
  createCanvas(800, 800) //Generates canvas
  background(255); //fills canvas as white
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

  player1 = new Player(0, 6, 100, -1);
  player2 = new Player(0, 6, 100, 1); //new Player

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
    //alert("Dice rolled")
    //console.log(player1.t + ' + ' + roll + ' = ' + (player1.t + roll))
    var roll = Math.floor(2 * random(1, 6.5));
    if (turn) {
      player1.t += roll
    } else {
      player2.t += roll
    }
    if (player1.t > (rows * columns - 1)) {
      alert("Player 1 has won!")
    } else if (player2.t > (rows * columns - 1)) {
      alert("Player 2 has won!")
    } else {
      player1.update(path[player1.t]);
      player2.update(path[player2.t]);
      turn = !turn
    }
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
