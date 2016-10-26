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
  this.sprite = {
    index: 0,
    frameTime: 1/opt.count,
    runTime: 0,
    update: function (ctx, fps, stageWidth, stageHeight) {
      this.runTime += 1/fps;
      if(this.runTime >= this.frameTime) {
        this.index++;
        this.runTime = 0;
        if(this.index === count) {
          this.index = 0;
        }
        this.sY = spriteHeight * this.index;
      }
    },
    paint: function (ctx, stageWidth, stageHeight) {
      ctx.drawImage(img, 0, 0, spriteWidth, sY, 0, 0, spriteWidth, spriteHeight);
    },
    visible: true
  };
  this.logo = new Canvasor(opt.contain, opt.width, opt.height);
  this.logo.addSprite(this.sprite);
}

FlashIcon.prototype.play = function() {
  this.logo.play();
}

FlashIcon.prototype.stop = function() {
  this.sprite.index = 0;
  var self = this;
  setTimeout(function() {
    self.logo.pause();
  })
}

FlashIcon.prototype.pause = function() {
  this.logo.pause();
}

function init(opt) {
  return new FlashIcon(opt);
}
 
module.exports = init;