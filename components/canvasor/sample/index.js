
import {Canvasor} from '../src/canvasor.js';
var domLogo = document.getElementById('logo');
var logo = new Canvasor(domLogo, 360, 360);

function easeIn (t, b, c, d) {
  return c * (t /= d) * t + b;
}
var sprite = {
  x: 1,
  time: 0,
  update: function(ctx, fps, stageWidth, stageHeight) {
    // console.log(fps);
    // this.x += 60/fps;
    this.time += 1/fps;
    this.x = easeIn(this.time, 1, 120, 2);
    if(this.x > 120) {
      this.x = 0;
      this.time = 0;
    }
    // if (this.x > 50) {
    //   this.visible = false;
    // }
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