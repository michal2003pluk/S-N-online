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
		{
			stroke(150, 75, 0, 192); //colour of border
			strokeWeight(6); //thickness of border
			fill(255, 0); //filling of border
			rect(this.x, this.y, this.size, this.size); //border
		} //border
		{
			stroke(0, 255); //colour of text
			strokeWeight(3); //thickness of text
			fill(0); //filling of text
			textSize(40) //size of text
			textAlign(CENTER, CENTER) //allignment of text
			text(this.num, this.x + this.size / 2, this.y + this.size / 4) //text
		} //text
	}

}