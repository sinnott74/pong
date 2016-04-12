function Player(x, y, width, height, movementDistance, leftKey, rightKey) {

	this.x = x;
	this.y = y;

	this.width = width;
	this.height = height;

	this.movementDistance = movementDistance;

	this.upKey = leftKey;
	this.downKey = rightKey;

	this.score = 0;
}

Player.prototype.move = function() {
	if (keys[this.upKey]) {
		if (this.y > 0) {
			this.y -= this.movementDistance;
		}
	}

	if (keys[this.downKey]) {
		if (this.y < CANVAS_HEIGHT - this.height) {
			this.y += this.movementDistance;
		}
	}
}

Player.prototype.draw = function() {
	ctx.beginPath();
	ctx.rect(this.x, this.y, this.width, this.height);
	ctx.fillStyle = "#FFFFFF";
	ctx.fill();
	ctx.closePath();
}