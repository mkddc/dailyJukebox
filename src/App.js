var React = require('react');
var Player = require('./Player');
var Button = require('./Button');
var Channel = require('./Channel');
var Infos = require('./Infos');
var About = require('./About');

require('./css/App.css');

	// OBJECTIF :
	// Appel de l'API afin de récupérer toutes les vidéos (JDG)
	// Création d'une fonction de sélection random pour sélectionner une vidéo au hasard dans le pool de vidéos suite à la pression d'un bouton random
	
var App = React.createClass({
	getInitialState: function () {
		return {
			src: "",
			videoPool: "",
			channel: "",
			// infos vidéos souhaitées
			title: "",
			owner: "",
			owner_avatar_60_url: "",
			country: "",
			views: "",
			// Montre-ton le bloc info vidéo ?  Au début pas de vidéo, donc non.
			showInfo : false 
				};
		},

	// Récupération de la première vidéo à s'afficher :
	// choix : la vidéo la plus récente du compte officiel Dailymotion
	componentDidMount: function () {
		var urlZero = 'https://api.dailymotion.com/videos?fields=country,id,owner.screenname,owner.avatar_60_url,title,views_total,&no_live=1&owners=Dailymotion&sort=recent&limit=1';

		var that = this;
		fetch(urlZero)
		.then(function(response) {
			if (response.status >= 400) {
				console.log('response.status :');
				console.log(response);
				throw new Error("Bad response from server");
			}
			return response.json();
		})
		.then(function(data) {
			console.log(data);
			that.setState({
				src: '//www.dailymotion.com/embed/video/' + data.list[0].id,
				title: data.list[0].title,
				owner: data.list[0]['owner.screenname'],
				owner_avatar_60_url: data.list[0]['owner.avatar_60_url'],
				country: data.list[0].country,
				views: data.list[0].views_total
			});
		})
	},

	// Utilisation du fetch  afin de récupérer l'intégralité des vidéos
	// du channel qui nous intéresse
	handleChange: function(e) {
		var channelNew = e.target.value;

		this.setState({
			channel: channelNew
		});
		// Ce qui nous intéresse, ce sont les 100 vidéos trending à l'instant t,
		// pour un channel donné :
		// var url = 'https://api.dailymotion.com/channel/'+ channelNew +'/videos?fields=country,id,owner.screenname,title,views_total,&sort=visited-today&limit=100';
		var url = 'https://api.dailymotion.com/videos?fields=country,id,owner.screenname,owner.avatar_60_url,title,views_total,&channel='+ channelNew +'&languages=fr,en&no_live=1&sort=trending&limit=100';

		var that = this;
		fetch(url)
		.then(function(response) {
			if (response.status >= 400) {
				console.log('response.status :');
				console.log(response);
				throw new Error("Bad response from server");
			}
			return response.json();
		})
		.then(function(data) {
			console.log('data');
			console.log(data);
			// Choix d'un indice au hasard dans la catégorie :
			var initnbVideo = data.list.length;
			var initVideoIndice = Math.floor(Math.random() * (initnbVideo - 0 +1)) + 0;

			that.setState({
				videoPool: data,
				// Au changement de channel/catégorie, on reset le lecteur sur une 
				// vidéo au hasard du channel sélectionné ainsi que les infos associées :
				src: '//www.dailymotion.com/embed/video/' + data.list[initVideoIndice].id + "?autoPlay=1",
				title: data.list[initVideoIndice].title,
				owner: data.list[initVideoIndice]['owner.screenname'],
				owner_avatar_60_url: data.list[initVideoIndice]['owner.avatar_60_url'],
				country: data.list[initVideoIndice].country,
				views: data.list[initVideoIndice].views_total
			});
			// Au chargement de l'application, le bloc info n'est pas visible.
			// Il n'apparaît qu'au chargement de catégorie.
			// if(that.state.showInfo !== true){
			// 	that.setState({
			// 		showInfo: true
			// 	})
			// }
		})
	},

	// Cette fonction doit prendre une nouvelle source vidéo dans le pool vidéo du channel
	// sélectionné, et mettre à jour la vidéo dans le player
	handleClick: function () {
		console.log('videopool :');
		console.log(this.state.videoPool);

		var nbVideo = this.state.videoPool['list'].length;
		var randomVideoIndice = Math.floor(Math.random() * (nbVideo - 0 +1)) + 0;

		// Récupération des infos de la vidéo lue :
		var idNew = this.state.videoPool['list'][randomVideoIndice]['id'];
		var srcNew = "//www.dailymotion.com/embed/video/" + idNew + "?autoPlay=1";
		var titleNew = this.state.videoPool['list'][randomVideoIndice]['title'];
		var ownerNew = this.state.videoPool['list'][randomVideoIndice]['owner.screenname'];
		var ownerAvatarNew = this.state.videoPool['list'][randomVideoIndice]['owner.avatar_60_url'];
		var countryNew = this.state.videoPool['list'][randomVideoIndice]['country'];
		var viewsNew = this.state.videoPool['list'][randomVideoIndice]['views_total'];

		// Mise à jour dans le player de la nouvelle vidéo et de ses infos :
		this.setState({
			src: srcNew,
			title: titleNew,
			owner: ownerNew,
			owner_avatar_60_url: ownerAvatarNew,
			country: countryNew,
			views: viewsNew
		});
		console.log('title :');
		console.log(this.state.title);
	},

	render: function () {
		return (
			<div>
				<nav className="navBar">
					<a href="#" className="title">dailyJukebox</a>
					<a id="aboutLink" href="#openAbout">A propos</a>
				</nav>

				<About />

				<div className="videoWrapper">
					<Player src={this.state.src} />	
				</div>

				<Infos title={this.state.title} avatar={this.state.owner_avatar_60_url} owner={this.state.owner} country={this.state.country} views={this.state.views} />

				<div className="jukeBlock">				
					<Channel onChange={this.handleChange} 
							 value={this.state.channel} />
				
					<Button onClick={this.handleClick} />
				</div>
			</div>
		);
	}
});

module.exports = App;