/**
 * Constructor for a Ball
 * 
 * @param {number}
 *            x The x coordinate of the ball's centre point
 * @param {number}
 *            y The y coordinate of the ball's centre point
 * @param {number}
 *            dx The velocity of the ball in the x direction
 * @param {number}
 *            dy The velocity of the ball in the y direction
 * @param {number}
 *            radius The radius of the ball
 */
function Ball(x, y, dx, dy, radius) {
	this.x = x;
	this.y = y;
	this.dx = dx;
	this.dy = dy;
	this.radius = radius;
}

/**
 * Checks to see if the ball has collided with a wall or player's paddle. Then
 * updates the balls position based on its velocity
 * 
 * @this {Ball}
 */
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

/**
 * Checks if the ball has collided with a wall in the X plane. Plays sound if
 * true
 * 
 * @returns {Boolean} true if the ball has collided with a wall, otherwise false
 */
Ball.prototype._checkXWallCollision = function() {
	if (this.x > CANVAS_WIDTH - this.radius || this.x < this.radius) {

		this.playSound();

		return true;
	}
	return false;

}

/**
 * Checks if the ball has collided with a wall in the Y plane. Plays sound if
 * true
 * 
 * @returns {Boolean} true if the ball has collided with a wall, otherwise false
 */
Ball.prototype._checkYWallCollision = function() {
	if (this.y > CANVAS_HEIGHT - this.radius || this.y < this.radius) {

		this.playSound();

		return true;
	}
	return false;

}

/**
 * Plays the balls sound if it is available to be played
 * 
 * @this {Ball}
 */
Ball.prototype.playSound = function() {
	if (WALL_SOUND) {
		WALL_SOUND.currentTime = 0;
		WALL_SOUND.play();
	}
}
/**
 * Draws the ball on the screen
 * 
 * @this {Ball}
 */
Ball.prototype.draw = function() {

	ctx.beginPath();
	ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
	ctx.fillStyle = "#FFFFFF";
	ctx.fill();
	ctx.closePath();
}