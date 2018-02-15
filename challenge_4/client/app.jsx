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

//****************The scoreboard*******************




//****************Bowl Button**********************
const BowlButton = (props) => {
	return <button className="bowlbutton" onClick={function() {props.handleBowlButtonClick()}}>Knock them down!</button>
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
			round: 1
		}
		this.handleBowlingPinClick = this.handleBowlingPinClick.bind(this);
		this.handleBowlButtonClick = this.handleBowlButtonClick.bind(this);
	}

	handleBowlingPinClick(pinNumber) {
		if (!this.state.pinsSelected.includes(pinNumber) && this.state.pinsRemaining.includes(pinNumber)) {
			this.setState({pinsSelected: this.state.pinsSelected.concat([pinNumber])})
			console.log(this.state)
		} else if (this.state.pinsRemaining.includes(pinNumber)) {
			this.setState({pinsSelected: this.state.pinsSelected.filter(pin => {
				return pin !== pinNumber
			})})
			console.log(this.state)
		}
		
	}

	handleBowlButtonClick() {
		//all scoring logic here(and probably in some helper functions)
		this.setState({pinsSelected: []})
		this.setState({pinsRemaining: this.state.pinsRemaining.filter(pin => {
			return (!this.state.pinsSelected.includes(pin))
		})})
		console.log(this.state)
	}

	updateScore() {

	}

	render() {
		return (
			<div>
			<PinBoard handleBowlingPinClick={this.handleBowlingPinClick}/><br/>
			<BowlButton handleBowlButtonClick={this.handleBowlButtonClick}/>
			</div>
		)
	}
}


render(<BowlingAlley />, document.getElementById('bowling'));
