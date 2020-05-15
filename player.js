class Player {
constructor(row, col, size) {
this.row = row
this.col = col
this.size = size;

}

show() {
fill(0, 127, 255);
noStroke()
ellipseMode(CENTER);
this.x = (this.row + 0.25) * this.size;
this.y = (this.col + 0.75) * this.size;
circle(this.x, this.y, this.size * 0.40)

}

}
