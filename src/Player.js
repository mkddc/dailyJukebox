var React = require('react');

var Player = React.createClass({
	render: function () {
		return (
			<iframe frameBorder="10" width="640" height="360" allowFullScreen="true" src={this.props.src}>
			</iframe>

		);
	}
})

module.exports = Player;

