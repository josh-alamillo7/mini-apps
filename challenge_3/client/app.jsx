//*****************import React********************
import React from 'react';
import {render} from 'react-dom';

//const React = require('react');
//const ReactDOM = require('react-dom');

//****************Components***********************

class Board extends React.Component {

	constructor(props) {
		super(props)

	}

	render() {
		//test with Hello World for now
		return <div>Hello World</div>;
	}

}
console.log("hey")

if(typeof window !== 'undefined') {
	render(<Board />, document.getElementById('app'));
}


//******************Views**************************










//****************Tests****************************