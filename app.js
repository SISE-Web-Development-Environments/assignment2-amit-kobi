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
var princessPeachPosition = null;
var atePrincessPeach = false;

// Settings
var controlKeys = [38, 40, 37, 39];
var numberOfBalls = 50;
var ballsColors = ['copper', 'silver', 'yellow'];
var totalGameTime = 60;
var numberOfGhosts = 1;

$(document).ready(function () {
	context = canvas.getContext("2d");
});

function setParameters(_controlKeys, _numberOfBalls, _ballsColors, _totalGameTime, _numberOfGhosts) {

}

function Start() {
	board = new Array();
	direction = 'right';
	score = 0;
	lives = 5;
	pac_color = "yellow";
	ghostsPositions = [[0, 0], [0, 9], [9, 0], [9, 9]];
	isGhostDead = [false, false, false, false];
	var cnt = 100;
	var food_remain = 50;
	var pacman_remain = 1;
	start_time = new Date();
	for (var i = 0; i < 10; i++) {
		board[i] = new Array();
		//put obstacles in (i=3,j=3) and (i=3,j=4) and (i=3,j=5), (i=6,j=1) and (i=6,j=2)
		for (var j = 0; j < 10; j++) {
			if (
				(i == 3 && j == 3) ||
				(i == 3 && j == 4) ||
				(i == 3 && j == 5) ||
				(i == 6 && j == 1) ||
				(i == 6 && j == 2)
			) {
				board[i][j] = 4;
			} else {
				var randomNum = Math.random();
				if (randomNum <= (1.0 * food_remain) / cnt) {
					food_remain--;
					board[i][j] = 1;
				} else if (randomNum < (1.0 * (pacman_remain + food_remain)) / cnt && i <= 7 && i >= 3 && j <= 7 && j >= 3) {
					shape.i = i;
					shape.j = j;
					pacman_remain--;
					board[i][j] = 2;
					pacmanPosition = [i, j];
				} else {
					board[i][j] = 0;
				}
				cnt--;
			}
		}
	}
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
	interval = setInterval(UpdatePosition, 150);
	console.log(interval);
}

function findRandomEmptyCell(board) {
	var i = Math.floor(Math.random() * 9 + 1);
	var j = Math.floor(Math.random() * 9 + 1);
	while (board[i][j] != 0) {
		i = Math.floor(Math.random() * 9 + 1);
		j = Math.floor(Math.random() * 9 + 1);
	}
	return [i, j];
}

function GetKeyPressed() {
	if (keysDown[38]) {
		return 1;
	}
	if (keysDown[40]) {
		return 2;
	}
	if (keysDown[37]) {
		return 3;
	}
	if (keysDown[39]) {
		return 4;
	}
}

function Draw() {
	canvas.width = canvas.width; //clean board
	lblScore.value = score;
	lblLives.value = lives;
	let addTime = ateClock ? 5 : 0;
	lblTime.value = Math.floor(totalGameTime - time_elapsed + addTime);
	for (var i = 0; i < 10; i++) {
		for (var j = 0; j < 10; j++) {
			var center = new Object();
			center.x = i * 60 + 30;
			center.y = j * 60 + 30;
			if (board[i][j] == 2) { // Pacman
				DrawPacMan(center);
				DrawEye(center);
			} else if (board[i][j] == 1) {
				context.beginPath();
				context.arc(center.x, center.y, 15, 0, 2 * Math.PI); // circle
				context.fillStyle = "black"; //color
				context.fill();
			} else if (board[i][j] == 4) { // Wall
				context.beginPath();
				context.rect(center.x - 30, center.y - 30, 60, 60);
				context.fillStyle = "grey"; //color
				context.fill();
			} else if (board[i][j] == 5) { // Life pill
				context.beginPath();
				context.arc(center.x, center.y, 15, 0, Math.PI);
				context.fillStyle = "red";
				context.fill();
				context.beginPath();
				context.arc(center.x, center.y, 15, 0, Math.PI, true);
				context.fillStyle = "blue";
				context.fill();
			} else if (board[i][j] == 6) { // Power pill
				context.beginPath();
				context.arc(center.x, center.y, 15, 0, Math.PI);
				context.fillStyle = "blue";
				context.fill();
				context.beginPath();
				context.arc(center.x, center.y, 15, 0, Math.PI, true);
				context.fillStyle = "green";
				context.fill();
			} else if (board[i][j] == 7) { // Clock
				let clockImage = document.getElementById("clock");
				context.drawImage(clockImage, center.x - 30, center.y - 30, 60, 60);
			}
		}
	}
	drawGhosts();
	if (!atePrincessPeach) {
		drawPrincessPeach();
	}
}

function DrawPacMan(center) {
	context.beginPath();
	if (direction == 'right')
		context.arc(center.x, center.y, 30, 0.15 * Math.PI, 1.85 * Math.PI); // half circle
	if (direction == 'left')
		context.arc(center.x, center.y, 30, (0.15 + 1) * Math.PI, (1.85 + 1) * Math.PI); // half circle
	if (direction == 'down')
		context.arc(center.x, center.y, 30, (0.15 + 0.5) * Math.PI, (1.85 + 0.5) * Math.PI); // half circle
	if (direction == 'up')
		context.arc(center.x, center.y, 30, (0.15 - 0.5) * Math.PI, (1.85 - 0.5) * Math.PI); // half circle
	context.lineTo(center.x, center.y);
	context.fillStyle = pac_color; //color
	context.fill();
}

function DrawEye(center) {
	context.beginPath();
	if (direction == 'right')
		context.arc(center.x + 5, center.y - 15, 5, 0, 2 * Math.PI); // circle
	if (direction == 'left')
		context.arc(center.x - 5, center.y - 15, 5, 0, 2 * Math.PI); // circle
	if (direction == 'down')
		context.arc(center.x + 15, center.y, 5, 0, 2 * Math.PI); // circle
	if (direction == 'up')
		context.arc(center.x + 15, center.y, 5, 0, 2 * Math.PI); // circle
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
		if (shape.j < 9 && board[shape.i][shape.j + 1] != 4) {
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
		if (shape.i < 9 && board[shape.i + 1][shape.j] != 4) {
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
		score++;
	}
	if (getGhostId(shape.i, shape.j) != -1 && !isGhostDead[getGhostId(shape.i, shape.j)]) {
		if (power) {
			score += 10;
			removeGhost(shape.i, shape.j);
		} else {
			lives--;
			score -= 10;
			window.clearInterval(interval);
			window.alert("You died!");
			ghostsPositions = [[0, 0], [0, 9], [9, 0], [9, 9]];
			resetPacmanPosition();
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
	coordinates.x = i * 60 + 30;
	coordinates.y = j * 60 + 30;

	context.beginPath();
	context.arc(coordinates.x, coordinates.y, 15, 0, Math.PI, true);
	context.fillStyle = color;
	context.fill();

	context.beginPath();
	context.rect(coordinates.x - 15, coordinates.y, 30, 15);
	context.fillStyle = color;
	context.fill();

	context.beginPath();
	context.moveTo(coordinates.x - 15, coordinates.y + 15);
	context.lineTo(coordinates.x - 15, coordinates.y + 20);
	context.lineTo(coordinates.x - 10, coordinates.y + 15);
	context.lineTo(coordinates.x - 5, coordinates.y + 20);
	context.lineTo(coordinates.x, coordinates.y + 15);
	context.lineTo(coordinates.x + 5, coordinates.y + 20);
	context.lineTo(coordinates.x + 10, coordinates.y + 15);
	context.lineTo(coordinates.x + 15, coordinates.y + 20);
	context.lineTo(coordinates.x + 15, coordinates.y + 15);
	context.fillStyle = color;
	context.fill();

	context.beginPath();
	context.arc(coordinates.x - 7.5, coordinates.y, 5, 0, 2 * Math.PI, true);
	context.fillStyle = "white";
	context.fill();

	context.beginPath();
	context.arc(coordinates.x + 7.5, coordinates.y, 5, 0, 2 * Math.PI, true);
	context.fillStyle = "white";
	context.fill();

	context.beginPath();
	context.arc(coordinates.x - 7.5, coordinates.y, 2.5, 0, 2 * Math.PI, true);
	context.fillStyle = "black";
	context.fill();

	context.beginPath();
	context.arc(coordinates.x + 7.5, coordinates.y, 2.5, 0, 2 * Math.PI, true);
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
		if (distance.x > 0 && x + 1 <= 9 && board[x + 1][y] != 4 && getGhostId(x + 1, y) == -1) {
			ghostsPositions[ghostID][0]++;
		} else if (distance.x < 0 && x - 1 >= 0 && board[x - 1][y] != 4 && getGhostId(x - 1, y) == -1) {
			ghostsPositions[ghostID][0]--;
		} else if (distance.y > 0 && y + 1 <= 9 && board[x][y + 1] != 4 && getGhostId(x, y + 1) == -1) {
			ghostsPositions[ghostID][1]++;
		} else if (distance.y < 0 && y - 1 >= 0 && board[x][y - 1] != 4 && getGhostId(x, y - 1) == -1) {
			ghostsPositions[ghostID][1]--;
		}
	} else {
		if (distance.x > 0 && x - 1 >= 0 && board[x - 1][y] != 4 && getGhostId(x - 1, y) == -1) {
			// clearGhostPosition(ghostsPositions[ghostID][0], ghostsPositions[ghostID][1]);
			ghostsPositions[ghostID][0]--;
		} else if (distance.x < 0 && x + 1 <= 9 && board[x + 1][y] != 4 && getGhostId(x + 1, y) == -1) {
			// clearGhostPosition(ghostsPositions[ghostID][0], ghostsPositions[ghostID][1]);
			ghostsPositions[ghostID][0]++;
		} else if (distance.y > 0 && y - 1 >= 0 && board[x][y - 1] != 4 && getGhostId(x, y - 1) == -1) {
			// clearGhostPosition(ghostsPositions[ghostID][0], ghostsPositions[ghostID][1]);
			ghostsPositions[ghostID][1]--;
		} else if (distance.y < 0 && y + 1 <= 9 && board[x][y + 1] != 4 && getGhostId(x, y + 1) == -1) {
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
	x = i * 60 + 30;
	y = j * 60 + 30;

	context.beginPath();
	context.rect(x - 15, y - 15, 30, 50);
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
	while(!(position[0] <= 7 && position[0] >= 3 && position[1] <= 7 && position[1] >= 3)){
		position = findRandomEmptyCell(board);
	}
	shape.i = position[0];
	shape.j = position[1];
}

function setPrincessPeachPosition() {
	if (isGhostDead[3]){
		princessPeachPosition = [9,9];
	} else {
		princessPeachPosition = findRandomEmptyCell(board);
	}
}

function drawPrincessPeach() {
	let princessPeachImage = document.getElementById("princessPeach");
	context.drawImage(princessPeachImage, princessPeachPosition[0] * 60, princessPeachPosition[1] * 60, 60, 60);
}

function movePrincessPeach() {
	if (!atePrincessPeach) {
		let moved = false;
		while (!moved) {
			let random = Math.floor(Math.random() * 4 + 1);
			if (random == 1) { // Right
				if (princessPeachPosition[0] + 1 > 9 || board[princessPeachPosition[0] + 1][princessPeachPosition[1]] == 4) {
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
				if (princessPeachPosition[1] + 1 > 9 || board[princessPeachPosition[0]][princessPeachPosition[1] + 1] == 4) {
					continue;
				}
				princessPeachPosition[1]++;
				moved = true;
			}
		}
	}
}