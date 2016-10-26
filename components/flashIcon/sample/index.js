
var flashIcon = require('../src/flashIcon.js');
var domLogo = document.getElementById('logo');
var logo = flashIcon({
	contain: domLogo,
	width: 360,
	height: 360
});

// logo.addSprite(sprite);
logo.play();