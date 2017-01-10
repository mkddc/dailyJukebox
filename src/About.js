var React = require('react');
require('./css/About.css');

var About = React.createClass({
	render: function () {
		return(
			<div id="openAbout" className="myModal">
			    <header>
			      <h2 id="aboutTitle">A propos</h2>
			    </header>
			    <div id="aboutText">
			    	<p>DailyJukebox est une interface permettant de parcourir, par catégorie Dailymotion, les 100 vidéos les plus tendances du moment. Les contenus sélectionnés par l'interface sont exclusivement en français ou en anglais.
			    	</p>
			    	<p>En arrivant sur l'interface, la vidéo chargée par défaut est la vidéo la plus récente mise en ligne par le compte officiel Dailymotion.
			    	</p>
			    	<p>Pour commencer :
			    	</p>
			    	<p>1 - Choisir la catégorie
					</p>
					<p>2 - Appuyer sur "Random" dès que vous souhaitez zapper au hasard, parmi les 100 vidéos "trending" de la catégorie choisie.
					</p>
					<br/>
			    	<p>Ce petit projet a été fait en React.
			    	</p>
			    </div>
			      <a href="#fermer" className="closeAbout">X</a>
			</div>
 		);
	}
});


module.exports = About;