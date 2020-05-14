class Cell {
  constructor(row, col, size) {
    this.row = row;
    this.col = col;
    this.size = size;

    this.x = this.col * this.size;
    this.y = this.row * this.size;

  }

  show() {
    stroke(0);
    strokeWeight(4);
    fill(255);
    rect(this.x, this.y, this.size, this.size);
    textSize(40)
    text(this.row + '.' + this.col, this.x + this.size/4, this.y + this.size * (2/3))
  }

}
