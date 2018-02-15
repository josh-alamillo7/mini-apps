const React = require('react')
const {render} = require('react-dom')



//**********Individual Pin components**************
const Pin = (props) => {
	if (props.pinsRemaining.includes(props.number)) {
		return <span className="pin" onClick={function() {props.handleBowlingPinClick(props.number)}}>{props.number} </span>
	} else {
	return <span className="pin" onClick={function() {props.handleBowlingPinClick(props.number)}}>X </span>
}
}

//***********Pinboard child component***************
const PinBoard = (props) => {
	{const newPins = []
	{for (var i = 1; i <= 10; i++){
		newPins.push(<Pin number={i} handleBowlingPinClick={props.handleBowlingPinClick} pinsRemaining={props.pinsRemaining}/>)
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
const TrackerBoard = (props) => {
	return (
	<div>
	<div>SCORE:{props.score}</div>
	<div>PINS SELECTED:{props.pinsSelected.join(", ")}</div>
	</div>
	)
}



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
			strike: false,
			spare: false
		}
		this.round = 1
		this.trial = 1
		this.currentRoll = 1
		//"rollOneHit" is necessary for keeping track of roll one's score during round two
		this.rollOneHit = 0;
		this.scoreTracker = {};
		for (var i = 1; i <= 10; i++) {
			this.scoreTracker[i] = 0
		}
		this.strikeSpareTracker = {};
		for (var i = 1; i <= 10; i++) {
			this.strikeSpareTracker[i] = 0;
		}
		this.handleBowlingPinClick = this.handleBowlingPinClick.bind(this);
		this.handleBowlButtonClick = this.handleBowlButtonClick.bind(this);
	}

	handleBowlingPinClick(pinNumber) {
		if (!this.state.pinsSelected.includes(pinNumber) && this.state.pinsRemaining.includes(pinNumber)) {
			this.setState({pinsSelected: this.state.pinsSelected.concat([pinNumber])})
		} else if (this.state.pinsRemaining.includes(pinNumber)) {
			this.setState({pinsSelected: this.state.pinsSelected.filter(pin => {
				return pin !== pinNumber
			})})
		}
		
	}

	handleBowlButtonClick() {
		//all scoring logic here(and probably in some helper functions)
		
		const numberPinsHit = this.state.pinsSelected.length
		this.setState({pinsSelected: []})
		this.setState({pinsRemaining: this.state.pinsRemaining.filter(pin => {
			return (!this.state.pinsSelected.includes(pin))
		})})
		this.updateScore(numberPinsHit)
		
	}

	updateScore(numberPinsHit) {
		console.log("ROUND:", this.round)
		console.log("TRIAL:", this.trial)
		//add the number of pins hit to this round's tracker(always)
		console.log("PINS HIT:", numberPinsHit)
		console.log("STRIKES AND SPARES:", this.strikeSpareTracker)
		if (this.trial === 1) {

			if (this.round > 1 && this.round < 10) {
				//check the SS tracker for the last two bowls.
				this.scoreTracker[this.round] = this.scoreTracker[this.round - 1] + numberPinsHit

				if (this.state.pinsSelected.length === 10) {
					this.handleStrike()
					return
				}

				this.trial = 2
			}

			//do the following if it's round 1 trial 1.
			else if (this.round === 1) {
				this.scoreTracker[this.round] += numberPinsHit
				
				if (this.state.pinsSelected.length === 10) {
					this.handleStrike()
					return
				}

				this.trial = 2
			}
			//if the user hit a strike, update the strike spare tracker
			
			


		} else if (this.trial === 2) {
			if (this.state.pinsRemaining.length === numberPinsHit) {
				console.log("u got a spare")
			}
			this.scoreTracker[this.round] += numberPinsHit





			this.setState({pinsRemaining: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]})
			this.trial = 1
			this.round++
		}


		
		console.log(this.state.pinsRemaining)
		console.log("SCORES:", this.scoreTracker)
		//check if the last round had a strike
	}

	handleStrike() {
		this.strikeSpareTracker[this.round] = 2;
		this.round++;
		this.setState({pinsRemaining: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]})
	}

	handleSpare() {
		this.strikeSpareTracker[this.round] = 1;
		this.round++;
		this.setState({pinsRemaining: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]})
	}

	render() {
		return (
			<div>
			<PinBoard handleBowlingPinClick={this.handleBowlingPinClick} pinsRemaining={this.state.pinsRemaining}/><br/>
			<BowlButton handleBowlButtonClick={this.handleBowlButtonClick}/>
			<TrackerBoard pinsSelected={this.state.pinsSelected} score={this.state.score}/> 
			</div>
		)
	}
}


render(<BowlingAlley />, document.getElementById('bowling'));
