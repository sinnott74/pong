/**
 * Constructor for Player. A player has contol over a single paddle in the game
 * 
 * @param {number}
 *            x The x coordinate of the upper left point of the player's paddle
 * @param {number}
 *            y The y coordinate of the upper left point of the player's paddle
 * @param {number}
 *            width The width of the player's paddle
 * @param {number}
 *            height The height of the player's paddle
 * @param {number}
 *            movementDistance The distance a player can move in each frame.
 *            Also know as player speed
 * @param {number}
 *            leftKey The keyCode value of the key which moves the paddle left
 * @param {number}
 *            rightKey The keyCode value of the key which moves the paddle right
 */
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

/**
 * Checks if the player's left or right keys have been pressed and updates the
 * coordinates of the player but the movementDistance
 * 
 * @this {Player}
 */
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

/**
 * Draws the player's paddle on the screen
 * 
 * @this {Player}
 */
Player.prototype.draw = function() {
	ctx.beginPath();
	ctx.rect(this.x, this.y, this.width, this.height);
	ctx.fillStyle = "#FFFFFF";
	ctx.fill();
	ctx.closePath();
}