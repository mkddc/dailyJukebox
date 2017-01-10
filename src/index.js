var React = require('react');
var ReactDOM = require('react-dom');
var App = require('./App');

// Chargement de la feuille de style du projet :
require('./css/style.css');


ReactDOM.render(
	<App />, 
	document.getElementById('root')
);