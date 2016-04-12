function Ball(x, y, dx, dy, radius) {
	this.x = x;
	this.y = y;
	this.dx = dx;
	this.dy = dy;
	this.radius = radius;
}

Ball.prototype.move = function() {
	if (this._checkXWallCollision() || playerCollision()) {
		this.dx = -this.dx;
		this.x += this.dx;
	} else {
		this.x += this.dx;
	}

	if (this._checkYWallCollision()) {
		this.dy = -this.dy;
		this.y += this.dy;
	} else {
		this.y += this.dy;
	}

}

Ball.prototype._checkXWallCollision = function() {
	if (this.x > CANVAS_WIDTH - this.radius || this.x < this.radius) {
		WALL_SOUND.currentTime = 0;
		WALL_SOUND.play();
		return true;
	}
	return false;

}

Ball.prototype._checkYWallCollision = function() {
	if (this.y > CANVAS_HEIGHT - this.radius || this.y < this.radius) {
		WALL_SOUND.currentTime = 0;
		WALL_SOUND.play();
		return true;
	}
	return false;

}

Ball.prototype.draw = function() {

	ctx.beginPath();
	ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
	ctx.fillStyle = "#FFFFFF";
	ctx.fill();
	ctx.closePath();
}