
var flashIcon = require('../src/flashIcon.js');
var domLogo = document.getElementById('logo');
var logo = flashIcon({
	contain: domLogo,
	stageWidth: 360,
	stageHeight: 360,
  spriteWidth: 100,
  spriteHeight: 100,
  count: 10,
  img: '',
  framerate: 10
});

// logo.addSprite(sprite);
logo.play();