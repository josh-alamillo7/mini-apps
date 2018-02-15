const React = require('react')
const {render} = require('react-dom')



//***************Pin components********************
const Pin = (props) => {
	return <span className={props.number}>{props.number} </span>
}

//********Pinboard child component*****************
const PinBoard = (props) => {
	{const newPins = []
	{for (var i = 1; i <= 10; i++){
		newPins.push(<Pin number={i}/>)
		if (i === 3 || i === 6 || i === 9) {
			newPins.push(<br/>)
		}
	}
	return newPins.map(pin => {
		return pin
	})
	}
}
}

//****************Main component*******************
class BowlingAlley extends React.Component {
	constructor(props) {
		super(props)
		this.state = {
			score: 0,
			currentPlayer: 1,
			pinsSelected: [],
			round: 0
		}
	}

	handleBowlingPinClick() {

	}

	render() {
		return (
			<div>
			<PinBoard />
			</div>
		)
	}
}

render(<BowlingAlley />, document.getElementById('bowling'));

//**************Bowling pin board*****************








//************Individual bowling points***********
