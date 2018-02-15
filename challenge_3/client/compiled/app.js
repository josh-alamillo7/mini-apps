'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactDom = require('react-dom');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; } //*****************import React********************


//const React = require('react');
//const ReactDOM = require('react-dom');

//****************Components***********************

var Board = function (_React$Component) {
	_inherits(Board, _React$Component);

	function Board(props) {
		_classCallCheck(this, Board);

		//set the size of the board
		var _this = _possibleConstructorReturn(this, (Board.__proto__ || Object.getPrototypeOf(Board)).call(this, props));

		_this.size = 7;
		//set a property keeping track of the win condition.
		//we will let R be player one and B be player two.
		_this.state = {
			winCon: null,
			currentPlayer: "R",
			squaresFilled: 0

			//initialize a grid representing the game.
		};_this.squareTracker = {};
		for (var i = 0; i < _this.size; i++) {
			for (var j = 0; j < _this.size; j++) {
				_this.squareTracker[[i, j]] = null;
			}
		}
		console.log(_this.squareTracker);

		return _this;
	}

	_createClass(Board, [{
		key: 'handleColumnClick',
		value: function handleColumnClick() {}
	}, {
		key: 'render',
		value: function render() {
			return _react2.default.createElement(
				'div',
				null,
				_react2.default.createElement(
					'div',
					null,
					'Hello World'
				),
				_react2.default.createElement(
					'div',
					null,
					Object.keys(this.squareTracker).map(function (square) {
						if (square[2] === JSON.stringify(6)) {
							return _react2.default.createElement(
								'span',
								null,
								_react2.default.createElement(
									'span',
									{ id: square },
									square
								),
								_react2.default.createElement('div', null)
							);
						} else {
							return _react2.default.createElement(
								'span',
								{ id: square },
								square
							);
						}
						/*return <Square square={square}/>*/
					})
				)
			);
		}
	}]);

	return Board;
}(_react2.default.Component);

if (typeof window !== 'undefined') {
	(0, _reactDom.render)(_react2.default.createElement(Board, null), document.getElementById('app'));
}

//******************Views**************************

//make a square component.
var Square = function Square(props) {
	return _react2.default.createElement(
		'div',
		null,
		'i am this'
	);
};

//****************Tests****************************
