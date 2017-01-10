var React = require('react');
require('./css/Channel.css');

// Module de sélection des différentes catégories de vidéos (channels)
var Channel = React.createClass({
	getInitialState: function () {
		return{
			channels: []
		}
	},
	// Utilisation du fetch dans componentDidMount, afin de récupérer l'intégralité des channels
	componentDidMount: function () {
		var url = 'https://api.dailymotion.com/channels?sort=alpha';
		var that = this;
		fetch(url)
		.then(function(response) {
			if (response.status >= 400) {
				throw new Error("Bad response from server");
			}
			return response.json();
		})
		.then(function(data) {
			that.setState({
				channels: data.list
			});
			console.log(data.list);
		})
	},
	// Fonction de génération du tableau des différentes options du menu select
	createSelectItems: function (chaines) {
		var options = chaines.map(function(chaine,i) {
			return(<option key={i} value={ chaine.id }>{ chaine.name }</option>);
		});
		return options;
	},
	render: function () {
		return(
				<select id="channelChoice" className="form-control" onChange={this.props.onChange}>
					<option disabled selected>Choisissez une catégorie</option>				
					{ this.createSelectItems(this.state.channels) };
				</select>
		);
	}
});

module.exports = Channel;
