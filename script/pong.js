var CANVAS_HEIGHT_DEFAULT = 700;
var CANVAS_WIDTH_DEFAULT = 700;
var LEFT_ARROW_KEY = 37;
var RIGHT_ARROW_KEY = 39;
var A_KEY = 65;
var S_KEY = 83;
var PADDLE_WIDTH = 10;
var PADDLE_HEIGHT = 100;
var PADDLE_MOVE_DISTANCE = 5;
var BALL_RADIUS = 5;
var PADDLE_PADDING = 50;
var NUM_POINTS_TO_WIN = 5;
var gameOver = false;
var SCORE_FONT = "50px Arial";
var CANVAS_COLOR = "#000000";

var isCanvasSupported = !!window.HTMLCanvasElement;

if (typeof window.Audio != 'undefined') {
	var WALL_SOUND = new Audio("sound/ping_pong_8bit_plop.mp3");
	var PADDLE_SOUND = new Audio("sound/ping_pong_8bit_plop.mp3");
	var SCORE_SOUND = new Audio("sound/ping_pong_8bit_peeeeeep.mp3");
}

var CANVAS_UNSUPPORTED_MESSAGE = "Unfortunately you're using a browser which does not support canvas. Consider downloading a modern browser."

var CANVAS_HEIGHT = window.innerHeight || CANVAS_HEIGHT_DEFAULT;
var CANVAS_WIDTH = window.innerWidth || CANVAS_WIDTH_DEFAULT;

var playerList = [];
var keys = [];

var canvas = document.createElement("canvas");
var canvasUnsupportedTxtNode = document.createTextNode(CANVAS_UNSUPPORTED_MESSAGE);
canvas.height = CANVAS_HEIGHT;
canvas.width = CANVAS_WIDTH;
canvas.style.background = CANVAS_COLOR;
canvas.style.color = "white";

canvas.appendChild(canvasUnsupportedTxtNode);

document.body.appendChild(canvas);

if (isCanvasSupported) {
	var ctx = canvas.getContext("2d");
	ctx.fillStyle = CANVAS_COLOR;
	ctx.font = SCORE_FONT;
	ctx.textAlign = "center";

	var playerYInit = (CANVAS_HEIGHT - PADDLE_HEIGHT) / 2;

	var player2XInit = (CANVAS_WIDTH - PADDLE_PADDING - PADDLE_WIDTH);

	var player1 = new Player(PADDLE_PADDING, playerYInit, PADDLE_WIDTH,
			PADDLE_HEIGHT, PADDLE_MOVE_DISTANCE, LEFT_ARROW_KEY,
			RIGHT_ARROW_KEY);
	var player2 = new Player(player2XInit, playerYInit, PADDLE_WIDTH,
			PADDLE_HEIGHT, PADDLE_MOVE_DISTANCE, S_KEY, A_KEY);

	var playerList = new Array();
	playerList.push(player1);
	playerList.push(player2);

	var score = new Score(CANVAS_WIDTH / 2, 50, playerList);

	var ball = new Ball(CANVAS_WIDTH / 2, CANVAS_HEIGHT / 2, 5, 3, BALL_RADIUS);

	document.addEventListener("keydown", keyDown, false);
	document.addEventListener("keyup", keyUp, false);

	function keyDown(e) {
		keys[e.keyCode] = true;
	}

	function keyUp(e) {
		keys[e.keyCode] = false;
	}

	function playerCollision() {

		if (player1.x + PADDLE_WIDTH === (ball.x - BALL_RADIUS)
				&& ball.y > (player1.y) && ball.y < player1.y + PADDLE_HEIGHT) {

			if (PADDLE_SOUND) {
				PADDLE_SOUND.currentTime = 0;
				PADDLE_SOUND.play();
			}

			return true;
		}

		if (player2.x === (ball.x + BALL_RADIUS) && ball.y > (player2.y)
				&& ball.y < player2.y + PADDLE_HEIGHT) {

			if (PADDLE_SOUND) {
				PADDLE_SOUND.currentTime = 0;
				PADDLE_SOUND.play();
			}

			return true;
		}

		return false;

	}

	function checkScored() {

		if (ball.x <= BALL_RADIUS) {
			player2.score++;

			if (SCORE_SOUND) {
				SCORE_SOUND.currentTime = 0;
				SCORE_SOUND.play();
			}

			score.draw();
			if (player2.score === NUM_POINTS_TO_WIN) {
				gameOver();
			} else {
				gameReset();
			}

		}

		if (ball.x >= CANVAS_WIDTH - BALL_RADIUS) {
			player1.score++;

			if (SCORE_SOUND) {
				SCORE_SOUND.currentTime = 0;
				SCORE_SOUND.play();
			}

			score.draw();
			if (player1.score === NUM_POINTS_TO_WIN) {
				endGame();
			} else {
				gameReset();
			}
		}

		score.draw();
	}

	function gameReset() {
		player1.x = PADDLE_PADDING;
		player1.y = playerYInit;

		player2.x = player2XInit;
		player2.y = playerYInit;

		ball.x = CANVAS_WIDTH / 2;
		ball.y = CANVAS_HEIGHT / 2;
		ball.dx = -(Math.floor(Math.random() * 5) + 1);
		ball.dy = Math.floor(Math.random() * 5) + 1;

	}

	function drawCentreLine() {
		ctx.strokeStyle = "#FFFFFF";
		ctx.setLineDash([ 30, 45 ]);
		ctx.lineWidth = 5;
		ctx.beginPath();
		ctx.moveTo(CANVAS_WIDTH / 2, 0);
		ctx.lineTo(CANVAS_WIDTH / 2, CANVAS_HEIGHT);
		ctx.stroke();
	}

	function endGame() {
		ball.dx = 0;
		ball.dy = 0;
		gameOver = true;

	}

	function play() {

		if (!gameOver) {
			ctx.clearRect(0, 0, canvas.width, canvas.height);

			player1.move();
			player2.move();
			ball.move();

			player1.draw();
			player2.draw();
			ball.draw();
			drawCentreLine();

			checkScored();

			requestAnimationFrame(play);
		}
	}

	document.onload = play();
}
