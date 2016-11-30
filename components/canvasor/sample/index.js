
import {Canvasor} from '../src/canvasor.js';
var domLogo = document.getElementById('logo');
var logo = new Canvasor(domLogo, 360, 360);


var sprite = {
  x: 1,
  update: function(ctx, fps, stageWidth, stageHeight) {
    console.log(fps);
    this.x++;
    if (this.x > 50) {
      this.visible = false;
    }
  },
  paint: function(ctx, stageWidth, stageHeight) {
    ctx.fillStyle = 'green';
    ctx.fillRect(this.x, 10, 100, 100);
  },
  visible: true
};
logo.addSprite(sprite);
logo.play();

document.getElementById('stop').onclick = function() {
  logo.stop();
};
document.getElementById('start').onclick = function() {
  logo.play();
};