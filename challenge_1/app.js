//The board must be an object.
//The board will have a property that keeps track of all squares.
//The board will have a property that tracks its game state.
	//Specifically, the board will need to have a property that keeps track of how many of its squares are filled
	//This can probably be in the form of an object.
	//It will probably have to be a grid.
//The squares will have an on click handler.

var Board = function(size) {

	//max size
	//for now, assume all boards are 3 X 3
	this.size = size
	this.numberOfSquares = size * size;
	this.squaresFilled = 0;
	this.squares = {};
	for (var i = 0; i < this.maxsize; i++) {

	}


}

Board.prototype.checkWin = function() {
	//check the win status of the board.
	//eventually, this will have to correspond to the win status in a different object.
	//will need to check rows, diagonals and columns. Check for a sum of 3.
		//this will likely be a for-loop.
}



//******TESTS*******//

var testingBoard = new Board(3);

var assertEqual = function(cond1, cond2, testname) {
	if (cond1 === cond2) {
		console.log("Passed: " + testname);
	}
	else {
		console.log("X FAILED: " + testname);
		console.log("---Expected " + cond1.toString() + " to equal " + cond2.toString() + ".") ;
	}
}


console.log("***Board***")
assertEqual(typeof testingBoard, 'object', 'it should be an object');
assertEqual(typeof testingBoard.size, 'number', 'it should have a property describing its size');
assertEqual(typeof testingBoard.numberOfSquares, 'number', 'it should have a property keeping track of its max size');
assertEqual(typeof testingBoard.checkWin, 'function', 'it should have a check win function');
assertEqual(typeof testingBoard.squaresFilled, 'number', 'it should have a property keeping track of its number of squares filled');

console.log("***Squares***")
