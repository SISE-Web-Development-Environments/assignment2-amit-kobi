var context;
var shape = new Object();
var board;
var score;
var lives;
var pac_color;
var start_time;
var time_elapsed;
var interval;
var direction;
var pacmanPosition;
var row = 20;
var col = 20;
var canvasHeight;
var canvasWidth;
var boardBallsColors;
// Ghosts
var ghostsPositions;
var ghostsColors = ["Red", "#0D0", "Blue", "Cyan"];
var isGhostDead;
var ghostsCounter = 0;

// Functionalities
var ateClock = false;
var power = false;
var powerTimer;

// Special character
var princessPeachPosition;
var atePrincessPeach;

// Settings
var controlKeys;
var numberOfBalls;
var ballsColors;
var totalGameTime;
var numberOfGhosts;

$(document).ready(function () {
	context = canvas.getContext("2d");
	canvasHeight = canvas.height;
	canvasWidth = canvas.width;
});

function setParameters(_controlKeys, _numberOfBalls, _ballsColors, _totalGameTime, _numberOfGhosts) {
	console.log(_controlKeys, _numberOfBalls, _ballsColors, _totalGameTime, _numberOfGhosts);
	controlKeys = _controlKeys;
	numberOfBalls = _numberOfBalls;
	ballsColors = _ballsColors;
	totalGameTime = _totalGameTime;
	numberOfGhosts = _numberOfGhosts;
	window.clearInterval(interval);
	Start();
}

function Start() {
	board = new Array();
	direction = 'right';
	score = 0;
	lives = 5;
	pac_color = "yellow";
	ghostsPositions = [[0, 0], [0, col - 1], [row - 1, 0], [row - 1, col - 1]];
	isGhostDead = [false, false, false, false];
	for (let index = 0; index < 4; index++) {
		if (index > numberOfGhosts) {
			isGhostDead[index] = true;
		}
	}
	atePrincessPeach = false;
	boardBallsColors = {};
	var cnt = row * col; // changed to fit different sizes map
	var food_remain = numberOfBalls;
	start_time = new Date();
	for (var i = 0; i < row; i++) {
		board[i] = new Array();
		//put obstacles in (i=3,j=3) and (i=3,j=4) and (i=3,j=5), (i=6,j=1) and (i=6,j=2)
		for (var j = 0; j < col; j++) {
			if (
				(i == 2 && j == 2) ||
				(i == 2 && j == 3) ||
				(i == 2 && j == 4) ||
				(i == 3 && j == 2) ||
				(i == 4 && j == 2) ||

				(i == 2 && j == col - 1 - 2) ||
				(i == 2 && j == col - 1 - 3) ||
				(i == 2 && j == col - 1 - 4) ||
				(i == 3 && j == col - 1 - 2) ||
				(i == 4 && j == col - 1 - 2) ||

				(i == row - 1 - 2 && j == 2) ||
				(i == row - 1 - 2 && j == 3) ||
				(i == row - 1 - 2 && j == 4) ||
				(i == row - 1 - 3 && j == 2) ||
				(i == row - 1 - 4 && j == 2) ||

				(i == row - 1 - 2 && j == col - 1 - 2) ||
				(i == row - 1 - 2 && j == col - 1 - 3) ||
				(i == row - 1 - 2 && j == col - 1 - 4) ||
				(i == row - 1 - 3 && j == col - 1 - 2) ||
				(i == row - 1 - 4 && j == col - 1 - 2) ||

				(i == row / 2 - 3 && j == 2) ||
				(i == row / 2 - 2 && j == 2) ||
				(i == row / 2 - 1 && j == 2) ||
				(i == row / 2 - 0 && j == 2) ||
				(i == row / 2 + 1 && j == 2) ||
				(i == row / 2 + 2 && j == 2) ||

				(i == 2 && j == col / 2 - 3) ||
				(i == 2 && j == col / 2 - 2) ||
				(i == 2 && j == col / 2 - 1) ||
				(i == 2 && j == col / 2 - 0) ||
				(i == 2 && j == col / 2 + 1) ||
				(i == 2 && j == col / 2 + 2) ||

				(i == row - 1 - 2 && j == col / 2 - 3) ||
				(i == row - 1 - 2 && j == col / 2 - 2) ||
				(i == row - 1 - 2 && j == col / 2 - 1) ||
				(i == row - 1 - 2 && j == col / 2 - 0) ||
				(i == row - 1 - 2 && j == col / 2 + 1) ||
				(i == row - 1 - 2 && j == col / 2 + 2) ||

				(i == row / 2 - 3 && j == col - 1 - 2) ||
				(i == row / 2 - 2 && j == col - 1 - 2) ||
				(i == row / 2 - 1 && j == col - 1 - 2) ||
				(i == row / 2 - 0 && j == col - 1 - 2) ||
				(i == row / 2 + 1 && j == col - 1 - 2) ||
				(i == row / 2 + 2 && j == col - 1 - 2) ||

				(i == row / 2 - 3 && j == col / 2 - 0) ||
				(i == row / 2 - 2 && j == col / 2 - 0) ||
				(i == row / 2 - 1 && j == col / 2 - 0) ||
				(i == row / 2 - 0 && j == col / 2 - 0) ||
				(i == row / 2 + 1 && j == col / 2 - 0) ||
				(i == row / 2 + 2 && j == col / 2 - 0) ||

				(i == row / 2 - 3 && j == col / 2 - 1) ||
				(i == row / 2 - 2 && j == col / 2 - 1) ||
				(i == row / 2 - 1 && j == col / 2 - 1) ||
				(i == row / 2 - 0 && j == col / 2 - 1) ||
				(i == row / 2 + 1 && j == col / 2 - 1) ||
				(i == row / 2 + 2 && j == col / 2 - 1) ||

				(i == row / 2 - 0 && j == col / 2 - 3) ||
				(i == row / 2 - 0 && j == col / 2 - 2) ||
				(i == row / 2 - 0 && j == col / 2 - 1) ||
				(i == row / 2 - 0 && j == col / 2 - 0) ||
				(i == row / 2 - 0 && j == col / 2 + 1) ||
				(i == row / 2 - 0 && j == col / 2 + 2) ||

				(i == row / 2 - 1 && j == col / 2 - 3) ||
				(i == row / 2 - 1 && j == col / 2 - 2) ||
				(i == row / 2 - 1 && j == col / 2 - 1) ||
				(i == row / 2 - 1 && j == col / 2 - 0) ||
				(i == row / 2 - 1 && j == col / 2 + 1) ||
				(i == row / 2 - 1 && j == col / 2 + 2)

			) {
				board[i][j] = 4;
			} else {
				var randomNum = Math.random();
				if (randomNum <= (1.0 * food_remain) / cnt) {
					food_remain--;
					let rand = Math.random();
					if (rand < 0.60) {
						boardBallsColors[`${i},${j}`] = ballsColors[0];
					} else if (rand >= 0.60 && rand < 0.90) {
						boardBallsColors[`${i},${j}`] = ballsColors[1];
					} else {
						boardBallsColors[`${i},${j}`] = ballsColors[2];
					}
					board[i][j] = 1;
				} else {
					board[i][j] = 0;
				}
				cnt--;
			}
		}
	}
	resetPacmanPosition();
	while (food_remain > 0) {
		var emptyCell = findRandomEmptyCell(board);
		board[emptyCell[0]][emptyCell[1]] = 1;
		food_remain--;
	}
	addPills();
	addClock();
	setPrincessPeachPosition();
	keysDown = {};
	addEventListener(
		"keydown",
		function (e) {
			keysDown[e.keyCode] = true;
		},
		false
	);
	addEventListener(
		"keyup",
		function (e) {
			keysDown[e.keyCode] = false;
		},
		false
	);
	window.clearInterval();
	interval = setInterval(UpdatePosition, 150);
}

function findRandomEmptyCell(board) {
	var i = Math.floor(Math.random() * row);
	var j = Math.floor(Math.random() * col);
	while (board[i][j] != 0) {
		i = Math.floor(Math.random() * row);
		j = Math.floor(Math.random() * col);
	}
	return [i, j];
}

function GetKeyPressed() {
	if (keysDown[controlKeys[0]]) {
		return 1;
	}
	if (keysDown[controlKeys[1]]) {
		return 2;
	}
	if (keysDown[controlKeys[2]]) {
		return 3;
	}
	if (keysDown[controlKeys[3]]) {
		return 4;
	}
}

function Draw() {
	canvas.width = canvas.width; //clean board
	lblScore.value = score;
	lblLives.value = lives;
	let addTime = ateClock ? 5 : 0;
	lblTime.value = Math.floor(totalGameTime - time_elapsed + addTime);
	var sizeX = (canvasWidth / row);
	var sizeY = (canvasHeight / col);
	for (var i = 0; i < row; i++) {
		for (var j = 0; j < col; j++) {
			var center = new Object();
			center.x = i * sizeX + (sizeX / 2);
			center.y = j * sizeY + (sizeY / 2);
			if (board[i][j] == 2) { // Pacman
				DrawPacMan(center,sizeX / 2);
				DrawEye(center,(sizeX / 12));
			} else if (board[i][j] == 1) {
				context.beginPath();
				context.arc(center.x, center.y, (sizeX / 4), 0, 2 * Math.PI); // circle
				context.fillStyle = boardBallsColors[`${i},${j}`]; //color
				context.fill();
			} else if (board[i][j] == 4) { // Wall
				context.beginPath();
				context.rect(center.x - (sizeX / 2), center.y - (sizeY / 2), sizeX, sizeY);
				context.fillStyle = "grey"; //color
				context.fill();
			} else if (board[i][j] == 5) { // Life pill
				context.beginPath();
				context.arc(center.x, center.y, (sizeX / 4), 0, Math.PI);
				context.fillStyle = "red";
				context.fill();
				context.beginPath();
				context.arc(center.x, center.y, (sizeX / 4), 0, Math.PI, true);
				context.fillStyle = "blue";
				context.fill();
			} else if (board[i][j] == 6) { // Power pill
				context.beginPath();
				context.arc(center.x, center.y, (sizeX / 4), 0, Math.PI);
				context.fillStyle = "blue";
				context.fill();
				context.beginPath();
				context.arc(center.x, center.y, (sizeX / 4), 0, Math.PI, true);
				context.fillStyle = "green";
				context.fill();
			} else if (board[i][j] == 7) { // Clock
				let clockImage = document.getElementById("clock");
				context.drawImage(clockImage, center.x - (sizeX / 2), center.y - (sizeY / 2), sizeX, sizeY);
			}
		}
	}
	drawGhosts();
	if (!atePrincessPeach) {
		drawPrincessPeach(sizeX,sizeY);
	}
}

function DrawPacMan(center,size) {
	context.beginPath();
	if (direction == 'right')
		context.arc(center.x, center.y, size, 0.15 * Math.PI, 1.85 * Math.PI); // half circle
	if (direction == 'left')
		context.arc(center.x, center.y, size, (0.15 + 1) * Math.PI, (1.85 + 1) * Math.PI); // half circle
	if (direction == 'down')
		context.arc(center.x, center.y, size, (0.15 + 0.5) * Math.PI, (1.85 + 0.5) * Math.PI); // half circle
	if (direction == 'up')
		context.arc(center.x, center.y, size, (0.15 - 0.5) * Math.PI, (1.85 - 0.5) * Math.PI); // half circle
	context.lineTo(center.x, center.y);
	context.fillStyle = pac_color; //color
	context.fill();
}

function DrawEye(center,size) {
	context.beginPath();
	if (direction == 'right')
		context.arc(center.x + (size * 2), center.y - (size * 3), size, 0, 2 * Math.PI); // circle
	if (direction == 'left')
		context.arc(center.x - (size * 2), center.y - (size * 3), size, 0, 2 * Math.PI); // circle
	if (direction == 'down')
		context.arc(center.x + (size * 3), center.y, size, 0, 2 * Math.PI); // circle
	if (direction == 'up')
		context.arc(center.x + (size * 3), center.y, size, 0, 2 * Math.PI); // circle
	context.fillStyle = "black"; //color
	context.fill();
}

function UpdatePosition() {
	board[shape.i][shape.j] = 0;
	var x = GetKeyPressed();
	if (x == 1) {
		if (shape.j > 0 && board[shape.i][shape.j - 1] != 4) {
			direction = 'up';
			shape.j--;
		}
	}
	if (x == 2) {
		if (shape.j < col -1 && board[shape.i][shape.j + 1] != 4) {
			direction = 'down';
			shape.j++;
		}
	}
	if (x == 3) {
		if (shape.i > 0 && board[shape.i - 1][shape.j] != 4) {
			direction = 'left';
			shape.i--;
		}
	}
	if (x == 4) {
		if (shape.i < row -1 && board[shape.i + 1][shape.j] != 4) {
			direction = 'right';
			shape.i++;
		}
	}
	if (ghostsCounter % 10 == 0) {
		moveGhosts();
		movePrincessPeach();
	}
	ghostsCounter++;
	if (board[shape.i][shape.j] == 1) {
		if (boardBallsColors[`${shape.i},${shape.j}`] == ballsColors[0]) {
			score += 5;
		} else if (boardBallsColors[`${shape.i},${shape.j}`] == ballsColors[1]) {
			score += 15;
		} else {
			score += 25;
		}
	}
	if (getGhostId(shape.i, shape.j) != -1 && !isGhostDead[getGhostId(shape.i, shape.j)]) {
		if (power) {
			score += 10;
			removeGhost(shape.i, shape.j);
		} else {
			lives--;
			if (lives == 0) {
				window.alert("You died! No more lives");
				window.clearInterval();
			} else {
				score -= 10;
			// window.clearInterval(interval);
			window.alert("You died!");
			ghostsPositions = [[0, 0], [0, col - 1], [row - 1, 0], [row - 1, col - 1]];
			resetPacmanPosition();
			}
		}
	}
	if (board[shape.i][shape.j] == 5) {
		lives++;
	}
	if (board[shape.i][shape.j] == 6) {
		power = true;
		powerTimer = new Date();
	}
	if (board[shape.i][shape.j] == 7) {
		ateClock = true;
	}
	if (princessPeachPosition != null && shape.i == princessPeachPosition[0] && shape.j == princessPeachPosition[1]) {
		atePrincessPeach = true;
		score += 50;
	}
	board[shape.i][shape.j] = 2;
	let currentTime = new Date();
	time_elapsed = (currentTime - start_time) / 1000;
	if (score >= 20 && time_elapsed <= 10) {
		pac_color = "green";
	}
	if (power) {
		let power_time = (currentTime - powerTimer) / 1000;
		if (power_time >= 5) {
			power = false;
		}
	}
	if (score >= 100) {
		window.clearInterval(interval);
		window.alert("Game completed");
		Start();
	} else {
		Draw();
	}
}

function getDistanceFromPacman(i, j) {
	let distance = new Object();
	distance.x = i - shape.i;
	distance.y = j - shape.j;
	return distance;
}

function getGhostId(i, j) {
	for (let id = 0; id < 4; id++) {
		if (ghostsPositions[id][0] == i && ghostsPositions[id][1] == j) {
			return id;
		}
	}
	return -1;
}

function drawGhosts() {
	for (let index = 0; index < 4; index++) {
		if (!isGhostDead[index]) {
			drawGhost(ghostsPositions[index][0], ghostsPositions[index][1])
		}
	}
}

function drawGhost(i, j) {
	let id = getGhostId(i, j);
	let color = power ? "purple" : ghostsColors[id];

	let coordinates = new Object();
	var sizeX = (canvasWidth / row);
	var sizeY = (canvasHeight / col);
	coordinates.x = i * sizeX + (sizeX / 2);
	coordinates.y = j * sizeY + (sizeY / 2);

	context.beginPath();
	context.arc(coordinates.x, coordinates.y, sizeX / 4, 0, Math.PI, true);
	context.fillStyle = color;
	context.fill();

	context.beginPath();
	context.rect(coordinates.x - sizeX / 4, coordinates.y, sizeX / 2, sizeX / 4);
	context.fillStyle = color;
	context.fill();

	context.beginPath();
	context.moveTo(coordinates.x - sizeX / 4, coordinates.y + sizeY / 4);
	context.lineTo(coordinates.x - sizeX / 4, coordinates.y + sizeY / 3);
	context.lineTo(coordinates.x - sizeX / 6, coordinates.y + sizeY / 4);
	context.lineTo(coordinates.x - sizeX / 12, coordinates.y + sizeY / 3);
	context.lineTo(coordinates.x, coordinates.y + sizeY / 4);
	context.lineTo(coordinates.x + sizeX / 12, coordinates.y + sizeY / 3);
	context.lineTo(coordinates.x + sizeX / 6, coordinates.y + sizeY / 4);
	context.lineTo(coordinates.x + sizeX / 4, coordinates.y + sizeY / 3);
	context.lineTo(coordinates.x + sizeX / 4, coordinates.y + sizeY / 4);
	context.fillStyle = color;
	context.fill();

	context.beginPath();
	context.arc(coordinates.x - sizeX / 8, coordinates.y, sizeX / 12, 0, 2 * Math.PI, true);
	context.fillStyle = "white";
	context.fill();

	context.beginPath();
	context.arc(coordinates.x + sizeX / 8, coordinates.y, sizeX / 12, 0, 2 * Math.PI, true);
	context.fillStyle = "white";
	context.fill();

	context.beginPath();
	context.arc(coordinates.x - sizeX / 8, coordinates.y, sizeX / 24, 0, 2 * Math.PI, true);
	context.fillStyle = "black";
	context.fill();

	context.beginPath();
	context.arc(coordinates.x + sizeX / 8, coordinates.y, sizeX / 24, 0, 2 * Math.PI, true);
	context.fillStyle = "black";
	context.fill();
}

function moveGhosts() {
	for (let index = 0; index < 4; index++) {
		if (!isGhostDead[index]) {
			moveGhost(index);
		}
	}
	drawGhosts();
}

function moveGhost(ghostID) {
	let x = ghostsPositions[ghostID][0];
	let y = ghostsPositions[ghostID][1];
	let distance = getDistanceFromPacman(x, y);
	if (power) {
		if (distance.x > 0 && x + 1 <= (row - 1) && board[x + 1][y] != 4 && getGhostId(x + 1, y) == -1) {
			ghostsPositions[ghostID][0]++;
		} else if (distance.x < 0 && x - 1 >= 0 && board[x - 1][y] != 4 && getGhostId(x - 1, y) == -1) {
			ghostsPositions[ghostID][0]--;
		} else if (distance.y > 0 && y + 1 <= (col - 1) && board[x][y + 1] != 4 && getGhostId(x, y + 1) == -1) {
			ghostsPositions[ghostID][1]++;
		} else if (distance.y < 0 && y - 1 >= 0 && board[x][y - 1] != 4 && getGhostId(x, y - 1) == -1) {
			ghostsPositions[ghostID][1]--;
		}
	} else {
		if (distance.x > 0 && x - 1 >= 0 && board[x - 1][y] != 4 && getGhostId(x - 1, y) == -1) {
			// clearGhostPosition(ghostsPositions[ghostID][0], ghostsPositions[ghostID][1]);
			ghostsPositions[ghostID][0]--;
		} else if (distance.x < 0 && x + 1 <= (row - 1) && board[x + 1][y] != 4 && getGhostId(x + 1, y) == -1) {
			// clearGhostPosition(ghostsPositions[ghostID][0], ghostsPositions[ghostID][1]);
			ghostsPositions[ghostID][0]++;
		} else if (distance.y > 0 && y - 1 >= 0 && board[x][y - 1] != 4 && getGhostId(x, y - 1) == -1) {
			// clearGhostPosition(ghostsPositions[ghostID][0], ghostsPositions[ghostID][1]);
			ghostsPositions[ghostID][1]--;
		} else if (distance.y < 0 && y + 1 <= (col - 1) && board[x][y + 1] != 4 && getGhostId(x, y + 1) == -1) {
			// clearGhostPosition(ghostsPositions[ghostID][0], ghostsPositions[ghostID][1]);
			ghostsPositions[ghostID][1]++;
		}
	}
}

function removeGhost(i, j) {
	let ghostID = getGhostId(i, j);
	isGhostDead[ghostID] = true;
	clearGhostPosition(i, j);
}

function clearGhostPosition(i, j) {
	let sizeX = (canvasWidth / row);
	let sizeY = (canvasHeight / col);
	x = i * sizeX + sizeX / 2;
	y = j * sizeY + sizeY / 2;

	context.beginPath();
	context.rect(x - sizeX / 4, y - sizeY / 4, sizex / 2, sizeY);
	context.fillStyle = "white";
	context.fill();
}

function addPills() {
	let lifePill = 5;
	let powerPill = 6;
	for (let index = 0; index < 4; index++) {
		let position = findRandomEmptyCell(board);
		if (index < 2) {
			board[position[0]][position[1]] = lifePill;
		}
		else {
			board[position[0]][position[1]] = powerPill;
		}
	}
}

function addClock() {
	let clock = 7;
	let position = findRandomEmptyCell(board);
	board[position[0]][position[1]] = clock;
}

function resetPacmanPosition() {
	let position = findRandomEmptyCell(board);
	while(!(position[0] <= row - 3 && position[0] >= 3 && position[1] <= col - 3 && position[1] >= 3)){
		position = findRandomEmptyCell(board);
	}
	shape.i = position[0];
	shape.j = position[1];
}

function setPrincessPeachPosition() {
	if (isGhostDead[3]){
		princessPeachPosition = [row - 1, col - 1];
	} else {
		princessPeachPosition = findRandomEmptyCell(board);
	}
}

function drawPrincessPeach(sizeX,sizeY) {
	let princessPeachImage = document.getElementById("princessPeach");
	context.drawImage(princessPeachImage, princessPeachPosition[0] * sizeX , princessPeachPosition[1] * sizeY, sizeX, sizeY);
}

function movePrincessPeach() {
	if (!atePrincessPeach) {
		let moved = false;
		while (!moved) {
			let random = Math.floor(Math.random() * 4 + 1);
			if (random == 1) { // Right
				if (princessPeachPosition[0] + 1 > row - 1 || board[princessPeachPosition[0] + 1][princessPeachPosition[1]] == 4) {
					continue;
				}
				princessPeachPosition[0]++;
				moved = true;
			} else if (random == 2) { // Left
				if (princessPeachPosition[0] - 1 < 0 || board[princessPeachPosition[0] - 1][princessPeachPosition[1]] == 4) {
					continue;
				}
				princessPeachPosition[0]--;
				moved = true;
			} else if (random == 3) { // Up
				if (princessPeachPosition[1] - 1 < 0 || board[princessPeachPosition[0]][princessPeachPosition[1] - 1] == 4) {
					continue;
				}
				princessPeachPosition[1]--;
				moved = true;
			} else { // Down
				if (princessPeachPosition[1] + 1 > col - 1 || board[princessPeachPosition[0]][princessPeachPosition[1] + 1] == 4) {
					continue;
				}
				princessPeachPosition[1]++;
				moved = true;
			}
		}
	}
}

function randomSettings(){
	_controlKeys = [38, 40, 37, 39];
	_numberOfBalls = getRandomArbitrary(50,91);
	_ballsColors = [getRandomColor(), getRandomColor(), getRandomColor()];
	_totalGameTime = getRandomArbitrary(60,360);
	_numberOfGhosts = getRandomArbitrary(1,5);
	setParameters(_controlKeys, _numberOfBalls, _ballsColors, _totalGameTime, _numberOfGhosts);
}

function setSettings(){
	var up = parseInt(document.getElementById("upKey").value);
	var down = parseInt(document.getElementById("downKey").value);
	var left = parseInt(document.getElementById("leftKey").value);
	var right = parseInt(document.getElementById("rightKey").value);
	_controlKeys = [up,down,left,right];
	console.log(up);
	var _numberOfBalls = parseInt(document.getElementById("ballCount").value);
	if (_numberOfBalls == NaN || _numberOfBalls > 90 || _numberOfBalls < 50) {
		alert("Number of balls must be between 50 to 90");
	} else {
		var color1 = document.getElementById("color1").value;
		var color2 = document.getElementById("color2").value;
		var color3 = document.getElementById("color3").value;
		_ballsColors =[color1,color2,color3];
			_totalGameTime = parseInt(document.getElementById("totalTime").value);
		if(_totalGameTime == NaN || _totalGameTime < 60){
			alert("total game time must be atleast 60 seconds");
		}else{
			_numberOfGhosts = parseInt(document.getElementById("mobCount").value);
			if (_numberOfGhosts > 4 || _numberOfGhosts < 1 || _numberOfGhosts == NaN){
				alert("Must be between 1 to 4 ghosts");
			}else{
				setParameters(_controlKeys,_numberOfBalls,_ballsColors,_totalGameTime,_numberOfGhosts);
			}
		}
	}
}

// euqal or higher then min and lower not equal to max
function getRandomArbitrary(min, max) {
	return Math.floor(Math.random() * (max - min) + min);
}

function getRandomColor() {
	var letters = '0123456789ABCDEF';
	var color = '#';
	for (var i = 0; i < 6; i++) {
		color += letters[Math.floor(Math.random() * 16)];
	}
	return color;
}