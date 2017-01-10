var React = require('react');
require('./css/Infos.css');


var Infos = React.createClass({
	render: function () {
		return(
			// <div className="container-fluid blocInfoVid" style={this.props.style}>
			<div className="blocInfoVid">

				<div className="metaInfos1">
					<p className="titre">{this.props.title}</p>
					<p className="nbVues">{this.props.views + ' vues'}</p>
				</div>
			
				<div className="metaInfos2">
					<img src={this.props.avatar} className="avatar" alt="owner_logo"></img>
					<span className="compte">par 
						<a href={'https://dailymotion.com/'+ this.props.owner} >
							{" " + this.props.owner}
						</a>
					</span>
					<p className="pays">{this.props.country}</p>
				</div>

			</div>
		);
	}
});

module.exports = Infos;