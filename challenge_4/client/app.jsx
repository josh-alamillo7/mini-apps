const React = require('react')
const {render} = require('react-dom')



//**********Individual Pin components**************
const Pin = (props) => {
	return <span className={props.number} onClick={function() {props.handleBowlingPinClick(props.number)}}>{props.number} </span>
}

//***********Pinboard child component***************
const PinBoard = (props) => {
	{const newPins = []
	{for (var i = 1; i <= 10; i++){
		newPins.push(<Pin number={i} handleBowlingPinClick={props.handleBowlingPinClick}/>)
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
			pinsRemaining: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10],
			pinsSelected: [],
			round: 0
		}
		this.handleBowlingPinClick = this.handleBowlingPinClick.bind(this);
	}

	handleBowlingPinClick(pinNumber) {
		if (!this.state.pinsSelected.includes(pinNumber)) {
			this.setState({pinsSelected: this.state.pinsSelected.concat([pinNumber])})
		} else {
			this.setState({pinsSelected: this.state.pinsSelected.filter(pin => {
				return pin !== pinNumber
			})})
		}
		
	}

	handleBowlButtonClick() {
		//all scoring logic here
	}

	render() {
		return (
			<div>
			<PinBoard handleBowlingPinClick={this.handleBowlingPinClick}/>
			</div>
		)
	}
}


render(<BowlingAlley />, document.getElementById('bowling'));
