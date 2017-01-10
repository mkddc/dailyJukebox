var React = require('react');
require('./css/Button.css');

var Button = React.createClass({
	render: function () {
		return(<button id="randomBtn" className="btn btn-primary btn-lg" onClick={this.props.onClick}>Random</button>);
	}
});

module.exports = Button;