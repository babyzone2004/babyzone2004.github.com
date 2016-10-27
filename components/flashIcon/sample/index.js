
var flashIcon = require('../src/flashIcon.js');
var domLogo = document.getElementById('logo');
var img = new Image();
img.src = 'sprite.png';
img.onload = function() {
  var logo = flashIcon({
    contain: domLogo,
    stageWidth: 360,
    stageHeight: 360,
    spriteWidth: 76,
    spriteHeight: 86,
    count: 4,
    img: img,
    framerate: 10
  });
  logo.play();

  document.getElementById('stop').onclick = function() {
    logo.stop();
  }
  document.getElementById('start').onclick = function() {
    logo.play();
  }
  document.getElementById('pause').onclick = function() {
    logo.pause();
  }
}


// logo.addSprite(sprite);
