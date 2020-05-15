var rows = 7;
var columns = 7;
var asc;
let path = [];
var diceRoll;
let player;

function setup() {
  createCanvas(800, 800)
  background(255);
  if (rows % 2 == 1) {
    asc = true;
  }
  for (var x = 0; x < rows; x++) {
    if (asc) {
      for (var y = 0; y < columns; y++) {
        var num = (rows - x - 1) * columns + y + 1
        path[x * rows + y] = new Cell(x, y, 100, num)
      }
    } else {
      for (var y = 0; y < columns; y++) {
        var num = (rows - x) * columns - y
        path[x * rows + y] = new Cell(x, y, 100, num)
      }
    }
    asc = !asc
  }

  diceRoll = new Clickable();
  diceRoll.locate(110, 710);
  diceRoll.resize(480, 80);

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
    alert("Dice rolled")
  }

  player = new Player(3, 2, 100);
}

function draw() {
  diceRoll.draw();
  for (var x = 0; x < rows; x++) {
    for (var y = 0; y < columns; y++) {
      path[x * rows + y].show()
    }
  }
    player.show();
}
