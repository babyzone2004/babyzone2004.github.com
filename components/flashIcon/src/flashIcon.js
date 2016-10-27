/**
 * Canvasor.js 
 * @description icon animation
 * @author babyzone2004
 */

var Canvasor = require('../../canvasor/src/canvasor.js');

function FlashIcon(opt) {
  this.spriteSheet = opt.spriteSheet;
  var spriteWidth = opt.spriteWidth;
  var spriteHeight = opt.spriteHeight;
  var img = opt.img;
  var count = opt.count;
  var sY = spriteHeight;
  var logo = this.logo = new Canvasor(opt.contain, opt.stageWidth, opt.stageHeight);
  this.sprite = {
    index: 0,
    frameTime: 1/opt.framerate,
    runTime: 0,
    stop: false,
    update: function (ctx, fps, stageWidth, stageHeight) {
      if(this.stop && this.index === 1) {
        logo.stop();
        return;
      }
      this.runTime += 1/fps;
      if(this.runTime >= this.frameTime) {
        this.sX = spriteWidth * this.index;
        this.index++;
        this.runTime = 0;
        if(this.index === count) {
          this.index = 0;
        }
      }
    },
    paint: function (ctx, stageWidth, stageHeight) {
      ctx.drawImage(img, this.sX, 0, spriteWidth, spriteHeight, 0, 0, spriteWidth, spriteHeight);
    },
    visible: true
  };
  
  logo.addSprite(this.sprite);
}

FlashIcon.prototype.play = function() {
  this.sprite.stop = false;
  this.logo.play();
}

FlashIcon.prototype.stop = function() {
  this.sprite.stop = true;
}

FlashIcon.prototype.pause = function() {
  this.logo.stop();
}

function init(opt) {
  return new FlashIcon(opt);
}
 
module.exports = init;