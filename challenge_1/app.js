//The board must be an object.
//The board will have a property that keeps track of all squares.
//The board will have a property that tracks its game state.
	//Specifically, the board will need to have a property that keeps track of how many of its squares are filled
	//This can probably be in the form of an object.
	//It will probably have to be a grid.
//The squares will have an on click handler.

//********THE BOARD*********
var Board = function(size) {

	//max size
	//for now, assume all boards are 3 X 3
	this.size = size
	this.numberOfSquares = size * size;
	this.squaresFilled = 0;
	this.squares = {};
	for (var i = 0; i < this.size; i++) {
		//we may have to refactor so that square is its own object, but for now, represent them as a grid.
		for (var j = 0; j < this.size; j++) {
			this.squares[[i, j]] = 0
		}
	}
	//zero will mean it's not filled, 1 will mean it belongs to X, 2 will mean it belongs to O.
	this.currentPlayer = 1;
	this.previousWinner = 1;
	this.XWins = 0;
	this.OWins = 0;
	this.buildBoard();

	//we also need to somehow keep track of which player's turn it is.
}

Board.prototype.checkWin = function() {

	//check the win status of the board.
	//eventually, this will have to correspond to the win status in a different object.
	//will need to check rows, diagonals and columns. Check for equality.
		//this will likely be a for-loop.

	//check all rows for a win;
	for (var i = 0; i < this.size; i++) {
		var rowValues = []
		for (var j = 0; j < this.size; j++) {
			rowValues.push(this.squares[[i, j]])
		}
		if (rowValues.every(rowValue => {
			return rowValue === 1;
		})) {
			return "X WINS!";
		}
		else if (rowValues.every(rowValue => {
			return rowValue === 2;
		})) {
			return "O WINS!";
		}
	}

	//check for a column win
	for (var i = 0; i < this.size; i++) {
		var columnValues = []
		for (var j = 0; j < this.size; j++) {
			columnValues.push(this.squares[[j, i]])
		}
		if (columnValues.every(columnValue => {
			return columnValue === 1;
		})) {
			return "X WINS!";
		}
		else if (columnValues.every(columnValue => {
			return columnValue === 2;
		})) {
			return "O WINS!";
		}
	}

	//check for a downward diagonal win
	var diagDownValues = []
	for (var i = 0; i < this.size; i++) {
		diagDownValues.push(this.squares[[i, i]]);
	}
		if (diagDownValues.every(diagDownValue => {
			return diagDownValue === 1;
		})) {
			return "X WINS!";
		}
		else if (diagDownValues.every(diagDownValue => {
			return diagDownValue === 2;
		})) {
			return "O WINS!";
		}

	//check for an upward diagonal win
	var diagUpValues = []
	for (var i = 0; i < this.size; i++) {			
			diagUpValues.push(this.squares[[i, this.size - 1 - i]]);
		}
			if (diagUpValues.every(diagUpValue => {
				return diagUpValue === 1;
			})) {
				return "X WINS!";
			}
			else if (diagUpValues.every(diagUpValue => {
				return diagUpValue === 2;
			})) {
				return "O WINS!";
		}

	if (this.squaresFilled === this.numberOfSquares) {
		return "Tie game";
	}



	return "Game in progress...";
}

Board.prototype.toggleSquare = function(square) {
	//this will have to be called by a click handler.
	//we can possibly make new objects/divs out of each component in the grid.
	if (this.checkWin() !== "Game in progress...") {
		return
	}

	//this is necessary for comparing the array to the div string.
	if (typeof square === 'string') {
		square = JSON.parse(square)
	}

	//
	if (this.squares[square] === 0) {
		//change that element to the appropriate text if we did not click on a used square.
		this.squares[square] = this.currentPlayer;
		this.squaresFilled++;
		if (this.currentPlayer === 1) {
			document.getElementById("[" + square.toString() + "]").textContent = "X"
		this.currentPlayer = 2;
		}
		else {
			document.getElementById("[" + square.toString() + "]").textContent = "O"
			this.currentPlayer = 1};
		}

	document.body.children[5].textContent = this.checkWin()
	if (this.checkWin() === "X WINS!") {
		this.previousWinner = 1;
		this.XWins++;
	}
	else if (this.checkWin() === "O WINS!") {
		this.previousWinner = 2;
		this.OWins++;
	}
}

Board.prototype.reset = function() {
	//a reset function for tests.

	for (var i = 0; i < this.size; i++) {
		for (var j = 0; j < this.size; j++) {
			this.squares[[i, j]] = 0
			document.getElementById("[" + i + "," + j + "]").textContent = "*"
		}
	}
	this.currentPlayer = this.previousWinner;
	this.squaresFilled = 0;
	document.body.children[5].textContent = "Game in progress...";
}

Board.prototype.buildBoard = function() {
	//required for binding click handler to each square
	var theBoard = this;

	//initialize the tic tac toe table values and click handler.
	var ticTacToeTable = document.createElement("table");
	for (var i = 0; i < this.size; i++) {
		var newRow = document.createElement("tr");
		for (var j = 0; j < this.size; j++) {
			var newSquare = document.createElement("td");
			newSquare.id = "[" + i + "," + j + "]";
			newSquare.append ("*")
			newSquare.onclick = function() {
				theBoard.toggleSquare(this.id);

			};
			newRow.appendChild(newSquare)
		}
		ticTacToeTable.appendChild(newRow)
	}

	var resetButton = document.createElement("button");
	document.body.appendChild(resetButton);
	document.body.children[6].textContent = "Reset the board!";
	resetButton.onclick = function() {
		theBoard.reset();
	}
	document.body.children[3].appendChild(ticTacToeTable);
	//this may have to be changed(above line)
}

//*******INITIALIZATION OF BOARD AND ALL DISPLAY ELEMENTS*******
var divOne = document.createElement("div");
document.body.appendChild(divOne);
document.body.appendChild(document.createElement("br"));
var divTwo = document.createElement("footer");
document.body.appendChild(divTwo);
document.body.children[5].textContent = "Game in progress...";


var testingBoard = new Board(5);

//*********TESTS GALORE***********

/*

var assertEqual = function(cond1, cond2, testname) {
	if (cond1 === cond2) {
		console.log("Passed: " + testname);
	}
	else {
		console.log("X FAILED: " + testname);
		console.log("---Expected " + cond1.toString() + " to equal " + cond2.toString() + ".") ;
	}
}

var assertArraysEqual = function(arr1, arr2, testName) {
	if (arr1.length !== arr2.length) {
		console.log("X FAILED: " + testname + "---Expected " + arr1 + " to equal" + arr2 + ".")
		return
	}
	for (var i = 0; i < arr1.length; i++) {
		if (arr1[i] !== arr2[i]) {
			console.log("X FAILED: " + testname + "---Expected " + arr1 + " to equal" + arr2 + ".")
			return
		}
	}
	console.log("Passed: " + testname);
}


console.log("***Board***")
var boardTests = function() {
	assertEqual(typeof testingBoard, 'object', 'it should exist');
	assertEqual(typeof testingBoard.size, 'number', 'it should have a property describing its size');
	assertEqual(typeof testingBoard.numberOfSquares, 'number', 'it should have a property keeping track of its max size');
	assertEqual(typeof testingBoard.checkWin, 'function', 'it should have a check win function');
	assertEqual(typeof testingBoard.squaresFilled, 'number', 'it should have a property keeping track of its number of squares filled');
	assertEqual(typeof testingBoard.squares, 'object', 'it have an object representing its squares');
	assertEqual(typeof testingBoard.toggleSquare, 'function', 'it sould have a function toggleSquare');
	assertEqual(testingBoard.currentPlayer, 1, 'it should initialize the current player to X');
}
boardTests();

assertEqual(Object.keys(testingBoard.squares).length, testingBoard.numberOfSquares, 'it should have an object representing the number of squares it has');
assertEqual(testingBoard.squares[Object.keys(testingBoard.squares)[0]], 0, 'it should initialize all square values to zero')

console.log("***Squares***")

var SquareTests = function() {
	testingBoard.toggleSquare([1,2]);
	assertEqual(testingBoard.squares[[1,2]], 1, 'it should set the provided square to the player\'s value');
	assertEqual(testingBoard.currentPlayer, 2, 'it should switch the current player');
	assertEqual(testingBoard.squaresFilled, 1, 'it should increase the number of squares filled');
	testingBoard.reset();

	testingBoard.toggleSquare([1,0]);
	testingBoard.toggleSquare([0,0]);
	testingBoard.toggleSquare([1,1]);
	testingBoard.toggleSquare([2,2]);
	testingBoard.toggleSquare([1,2]);
	assertEqual(testingBoard.checkWin(), "X WINS!", 'it should return the correct winner for a row win');
	testingBoard.reset();

	testingBoard.toggleSquare([0,1]);
	testingBoard.toggleSquare([0,2]);
	testingBoard.toggleSquare([0,0]);
	testingBoard.toggleSquare([1,2]);
	testingBoard.toggleSquare([1,1]);
	testingBoard.toggleSquare([2,2]);
	assertEqual(testingBoard.checkWin(), "O WINS!", 'it should return the correct winner for a column win');
	testingBoard.reset();

	testingBoard.toggleSquare([0,0]);
	testingBoard.toggleSquare([0,1]);
	testingBoard.toggleSquare([1,1]);
	testingBoard.toggleSquare([0,2]);
	testingBoard.toggleSquare([2,2]);
	assertEqual(testingBoard.checkWin(), "X WINS!", 'it should return the correct winner for a down-right diagonal win');
	testingBoard.reset();

	testingBoard.toggleSquare([0,0]);
	testingBoard.toggleSquare([2,0]);
	testingBoard.toggleSquare([0,1]);
	testingBoard.toggleSquare([1,1]);
	testingBoard.toggleSquare([2,2]);
	testingBoard.toggleSquare([0,2]);
	assertEqual(testingBoard.checkWin(), "O WINS!", 'it should return the correct winner for an up-right diagonal win');
	testingBoard.reset();

	testingBoard.toggleSquare([0,0]);
	testingBoard.toggleSquare([1,1]);
	testingBoard.toggleSquare([0,2]);
	testingBoard.toggleSquare([0,1]);
	testingBoard.toggleSquare([1,0]);
	testingBoard.toggleSquare([1,2]);
	testingBoard.toggleSquare([2,1]);
	testingBoard.toggleSquare([2,0]);
	testingBoard.toggleSquare([2,2]);
	assertEqual(testingBoard.checkWin(), "Tie game", 'it should correctly identify a tie game');
	testingBoard.reset();
}

SquareTests()
*/
