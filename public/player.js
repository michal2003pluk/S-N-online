class Player {
	constructor(row, col, size, identif) {
		this.row = row
		this.col = col
		this.size = size;
		this.num = 0
		this.identif = identif
		// this.moving = false;
		// this.tx = 0;
		// this.ty = 0;
		this.t = 0

	}

	show() {
		fill(127.5 + -this.identif * 127.5, 0, 127.5 + this.identif * 127.5);
		noStroke()
		ellipseMode(CENTER);
		this.x = (this.row + 0.5 + this.identif * 0.25) * this.size;
		this.y = (this.col + 0.75) * this.size;
		circle(this.x, this.y, this.size * 0.40)
	}

	update(target) {
		// console.log(target)
		// console.log(this.row)
		// console.log(this.col)
		this.row = target.col;
		this.col = target.row;
		// console.log(this.row)
		// console.log(this.col)




	}
}