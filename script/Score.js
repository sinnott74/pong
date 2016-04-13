/**
 * Constructor for a Ball
 * 
 * @param {number}
 *            x The x coordinate of the score's centre point
 * @param {number}
 *            y The y coordinate of the score's centre point
 * @param {Array}
 *            playerList An array of player to include in the score
 */
function Score(x, y, playerList) {
	this.x = x;
	this.y = y;
	this.playerList = playerList;
}

/**
 * Draws the Score of each player onto the screen as text
 */
Score.prototype.draw = function() {
	
	var scoreString
	for(var i = 0; i < this.playerList.length; i++){
		
		if(!scoreString){
			scoreString = "" + this.playerList[i].score;
		} else {
			scoreString += "   " + this.playerList[i].score;
		}
	}
	
	ctx.beginPath();
	ctx.fillStyle = "#FFFFFF";
	ctx.fillText(scoreString, this.x, this.y);
	ctx.closePath();
}