function Score(x, y, playerList) {
	this.x = x;
	this.y = y;
	this.playerList = playerList;
}

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