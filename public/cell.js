class Cell {
	constructor(row, col, size, num) {
		this.row = row;
		this.col = col;
		this.size = size;
		this.num = num

		this.x = this.col * this.size;
		this.y = this.row * this.size;

	}

	show() {
		stroke(0);
		strokeWeight(4);
		fill(255);
		rect(this.x, this.y, this.size, this.size);
		textSize(40)
		textAlign(CENTER, CENTER)
		text(this.num, this.x + this.size / 2, this.y + this.size / 4)
	}

}