const React = require('react')
const {render} = require('react-dom')

class BowlingAlley extends React.Component {
	constructor(props) {
		super(props)
	}

	render() {
		return (
			<div>Hi there world</div>
			)
	}
}

if (typeof window !== 'undefined') {
	render(<BowlingAlley />, document.getElementById('bowling'));
}

