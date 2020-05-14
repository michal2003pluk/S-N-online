var rows = 7;
var columns = 7;
var asc;
let path = [];

function setup() {
  createCanvas(700, 700)
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
}

function draw() {
  for (var x = 0; x < rows; x++) {
    for (var y = 0; y < columns; y++) {
      path[x * rows + y].show()
    }
  }
}
