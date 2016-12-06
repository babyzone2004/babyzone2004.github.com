(function (global, factory) {
  if (typeof define === "function" && define.amd) {
    define(['exports'], factory);
  } else if (typeof exports !== "undefined") {
    factory(exports);
  } else {
    var mod = {
      exports: {}
    };
    factory(mod.exports);
    global.canvasor = mod.exports;
  }
})(this, function (exports) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  /**
   * Canvasor.js 
   * @description a simple & effective animator for canvas
   * @author babyzone2004
   */
  var raf = window.requestAnimationFrame || window.webkitRequestAnimationFrame || window.mozRequestAnimationFrame || window.oRequestAnimationFrame || window.msRequestAnimationFrame;
  if (!raf) {
    var lastTime = 0;
    raf = function raf(callback) {
      var currTime = Date.now();
      var timeToCall = Math.max(0, 16 - (currTime - lastTime));
      lastTime = currTime + timeToCall;
      setTimeout(function () {
        callback(lastTime);
      }, timeToCall);
    };
  }
  var dpi = window.devicePixelRatio || 1;

  var Canvasor = function Canvasor(contain, width, height) {
    var canvas = document.createElement('canvas');
    this.ctx = canvas.getContext('2d');
    // 适配高清屏幕
    canvas.width = this.stageWidth = width * dpi;
    canvas.height = this.stageHeight = height * dpi;
    this.ctx.globalCompositeOperation = 'destination-over';
    canvas.style.width = width + 'px';
    canvas.style.height = height + 'px';
    this.ctx.scale(dpi, dpi);
    this.sprites = [];
    this.lastTime = 0;
    contain.appendChild(canvas);
  };

  Canvasor.prototype = {
    play: function play() {
      var self = this;
      this.pause = false;
      raf(function (time) {
        self.animate(time);
      });
    },

    animate: function animate(time) {
      if (this.pause) {
        return;
      }
      this.fps = 0.5 + 1000 / (time - this.lastTime) << 0;
      this.ctx.clearRect(0, 0, this.stageWidth, this.stageHeight);
      var i;
      // 分开两个循环，优化渲染效率
      for (i = this.sprites.length - 1; i >= 0; i--) {
        if (!this.sprites[i].visible) {
          this.sprites.splice(i);
          continue;
        }
        this.sprites[i].update(this.ctx, this.fps, this.stageWidth, this.stageHeight);
      }
      for (i = this.sprites.length - 1; i >= 0; i--) {
        this.sprites[i].paint(this.ctx, this.stageWidth, this.stageHeight);
      }

      this.lastTime = time;
      var self = this;
      raf(function (time) {
        self.animate(time);
      });
    },

    stop: function stop() {
      this.pause = true;
    },

    addSprite: function addSprite(sprite) {
      this.sprites.push(sprite);
    }
  };

  exports.Canvasor = Canvasor;
});
