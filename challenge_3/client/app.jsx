//*****************import React********************
import React from 'react';
import {render} from 'react-dom';

//const React = require('react');
//const ReactDOM = require('react-dom');

//****************Components***********************

class Board extends React.Component {

	constructor(props) {
		super(props)
		//set the size of the board
		this.size = 7;
		//set a property keeping track of the win condition.
		//we will let R be player one and B be player two.
		this.state = {
			winCon: null,
			currentPlayer: "R",
			squaresFilled: 0
		}

		//initialize a grid representing the game.
		this.squareTracker = {}
		for (var i = 0; i < this.size; i++) {
			for (var j = 0; j < this.size; j++) {
				this.squareTracker[[i, j]] = null
			}
		}
		console.log(this.squareTracker)

	}

	handleColumnClick() {

	}

	render() {
		return (
			<div>
			<div>


			 {(Object.keys(this.squareTracker).map((position) => {
			// 	if (position[2] === JSON.stringify(6)) {
			// 		return (<span><span id = {position}>{position}</span>
			// 		<div></div></span>)
			// 	} else {
			// 	return <span id = {position}>{position}</span>
			// }
				<Square position={position} />
			}))
			}
			</div>
			</div>
		)

	}

}

if (typeof window !== 'undefined') {
	render(<Board />, document.getElementById('app'));
}






//******************Views**************************

//make a square component.
var Square = (props) => (
	<div>this</div>
);








//****************Tests****************************