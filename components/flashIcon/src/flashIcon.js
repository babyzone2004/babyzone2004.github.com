/**
 * Canvasor.js 
 * @description icon animation
 * @author babyzone2004
 */

 var Canvasor = require('../../canvasor/src/canvasor.js');

function FlashIcon(opt) {
  this.spriteSheet = opt.spriteSheet;
  var sprite = {
   x: 1,
   update: function (ctx, fps, stageWidth, stageHeight) {
     // console.log(fps);
     this.x++;
   },
   paint: function (ctx, stageWidth, stageHeight) {
     // console.log(ctx, stageWidth, stageHeight);
     ctx.fillStyle = 'green';
     ctx.fillRect(this.x, 10, 100, 100);
   },
   visible: true
  };
  this.logo = new Canvasor(opt.contain, opt.width, opt.height);
  this.logo.addSprite(sprite);
}

FlashIcon.prototype.play = function() {
  this.logo.play();
}

FlashIcon.prototype.stop = function() {

}

FlashIcon.prototype.pause = function() {

}

function init(opt) {
  return new FlashIcon(opt);
}
 
module.exports = init;