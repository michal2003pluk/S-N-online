var rows = 7;
var columns = 7;

let path = [];

function setup() {
  createCanvas(700, 700)
  background(255);
  for (var x = 0; x < rows; x++) {
    for (var y = 0; y < columns; y++) {
      path[x * rows + y] = new Cell(x, y, 100)
    }
  }
}

function draw() {
  for (var x = 0; x < rows; x++) {
    for (var y = 0; y < columns; y++) {
      path[x * rows + y].show()
    }
  }
}
