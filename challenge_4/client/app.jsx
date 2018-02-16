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

//*******I show you what pins you've clicked*******
const TrackerBoard = (props) => {
	return (
	<div>
	<div>PINS SELECTED:{props.pinsSelected.join(", ")}</div>
	</div>
	)
}


//**************The Scoreboard*********************
const ScoreBoard = (props) => {
	return (
		<div>
		<div className = "boardtitle">This will be the scoreboard</div>
		<table>
			<tbody>
			<tr>
				<td>ROUND 1</td>
				<td>ROUND 2</td>
				<td>ROUND 3</td>
				<td>ROUND 4</td>
				<td>ROUND 5</td>
				<td>ROUND 6</td>
				<td>ROUND 7</td>
				<td>ROUND 8</td>
				<td>ROUND 9</td>
				<td>ROUND 10</td>
			</tr>
			<tr>
				<td>{console.log(props)}</td>
			</tr>
			</tbody>
		</table>
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

			if (this.round < 10) {
				//check the SS tracker for the last two bowls.
				if (this.strikeSpareTracker[this.round - 1] > 0) {
					this.handleStrikesOrSparesOnLastRound(numberPinsHit)

				} else {
				//no matter what, the current round gets updated by the pins hit
				if (this.round === 1) {
					this.scoreTracker[this.round] = numberPinsHit
				} else {
					this.scoreTracker[this.round] = this.scoreTracker[this.round - 1] + numberPinsHit
				}
				}
				if (this.state.pinsSelected.length === 10) {
					this.handleStrike()
					return
				}				
			}
			//do the following if it's round 1 trial 1.
			else if (this.round === 1) {
				this.scoreTracker[this.round] += numberPinsHit;
				
				if (this.state.pinsSelected.length === 10) {
					this.handleStrike()
					return
				}				
			}
			//if the user hit a strike, update the strike spare tracker
			this.trial = 2
			
		} else if (this.trial === 2) {

			if (this.round < 10) {
				if (this.state.pinsRemaining.length === numberPinsHit) {
					this.handleSpare(numberPinsHit)
					return
				}
				else {
					if (this.round < 10) {						
						if (this.strikeSpareTracker[this.round - 1] > 0) {
							this.handleStrikesOrSparesOnLastRound(numberPinsHit)
							this.scoreTracker[this.round] += numberPinsHit;
						}
						else {
							this.scoreTracker[this.round] += numberPinsHit
						}
					}
					this.setState({pinsRemaining: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]})
					this.trial = 1;
					this.round++;
				}
			}
		}

		this.setState({scoreTracker: this.state.scoreTracker})
		console.log("SCORETRACKER IN STATE", this.state.scoreTracker)

		console.log("STRIKES AND SPARES:", this.strikeSpareTracker)
		console.log("SCORES:", this.scoreTracker)
		//check if the last round had a strike
	}

	handleStrike() {
		console.log('hey strike')
		this.strikeSpareTracker[this.round] = 2;
		this.round++;
		this.setState({pinsRemaining: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]})
		console.log("STRIKES AND SPARES:", this.strikeSpareTracker)
		console.log("SCORES:", this.scoreTracker)
	}

	handleSpare(numberPinsHit) {
		console.log('hey spare')
		this.strikeSpareTracker[this.round] = 1;
		this.scoreTracker[this.round] += numberPinsHit;
		this.round++;
		this.trial = 1;
		this.setState({pinsRemaining: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]})
		console.log("STRIKES AND SPARES:", this.strikeSpareTracker)
		console.log("SCORES:", this.scoreTracker)
	}

	handleStrikesOrSparesOnLastRound (numberPinsHit) {
		if (this.trial === 1) {
			this.scoreTracker[this.round - 1] += numberPinsHit
			this.strikeSpareTracker[this.round - 1]--
			this.scoreTracker[this.round] = this.scoreTracker[this.round - 1] + numberPinsHit
		}
		else {
			this.scoreTracker[this.round - 1] += numberPinsHit
			this.strikeSpareTracker[this.round - 1]--
			this.scoreTracker[this.round] += numberPinsHit
		}
	}

	render() {
		return (
			<div>
			<PinBoard handleBowlingPinClick={this.handleBowlingPinClick} pinsRemaining={this.state.pinsRemaining}/><br/>
			<BowlButton handleBowlButtonClick={this.handleBowlButtonClick}/>
			<TrackerBoard pinsSelected={this.state.pinsSelected}/> 
			<div className = "boardtitle">This will be the scoreboard</div>
			<table>
				<tbody>
				<tr>
					<td>ROUND 1</td>
					<td>ROUND 2</td>
					<td>ROUND 3</td>
					<td>ROUND 4</td>
					<td>ROUND 5</td>
					<td>ROUND 6</td>
					<td>ROUND 7</td>
					<td>ROUND 8</td>
					<td>ROUND 9</td>
					<td>ROUND 10</td>
				</tr>
				<tr>
					<td>{this.scoreTracker[1]}</td>
					<td>{this.scoreTracker[2]}</td>
					<td>{this.scoreTracker[3]}</td>
					<td>{this.scoreTracker[4]}</td>
					<td>{this.scoreTracker[5]}</td>
					<td>{this.scoreTracker[6]}</td>
					<td>{this.scoreTracker[7]}</td>
					<td>{this.scoreTracker[8]}</td>
					<td>{this.scoreTracker[9]}</td>
					<td>{this.scoreTracker[10]}</td>
				</tr>
				</tbody>
			</table>
			</div>
		)
	}
}


render(<BowlingAlley />, document.getElementById('bowling'));
