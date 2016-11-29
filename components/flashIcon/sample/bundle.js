/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};

/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {

/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;

/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};

/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);

/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;

/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}


/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;

/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;

/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";

/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var flashIcon = __webpack_require__(1);
	var domLogo = document.getElementById('logo');
	var img = new Image();
	img.src = 'sprite.png';
	img.onload = function () {
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

	  document.getElementById('stop').onclick = function () {
	    logo.stop();
	  };
	  document.getElementById('start').onclick = function () {
	    logo.play();
	  };
	  document.getElementById('pause').onclick = function () {
	    logo.pause();
	  };
	};

	// logo.addSprite(sprite);

/***/ },
/* 1 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	/**
	 * Canvasor.js 
	 * @description icon animation
	 * @author babyzone2004
	 */

	var Canvasor = __webpack_require__(2);

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
	    frameTime: 1 / opt.framerate,
	    runTime: 0,
	    stop: false,
	    update: function update(ctx, fps, stageWidth, stageHeight) {
	      if (this.stop && this.index === 1) {
	        logo.stop();
	        return;
	      }
	      this.runTime += 1 / fps;
	      if (this.runTime >= this.frameTime) {
	        this.sX = spriteWidth * this.index;
	        this.index++;
	        this.runTime = 0;
	        if (this.index === count) {
	          this.index = 0;
	        }
	      }
	    },
	    paint: function paint(ctx, stageWidth, stageHeight) {
	      ctx.drawImage(img, this.sX, 0, spriteWidth, spriteHeight, 0, 0, spriteWidth, spriteHeight);
	    },
	    visible: true
	  };

	  logo.addSprite(this.sprite);
	}

	FlashIcon.prototype.play = function () {
	  this.sprite.stop = false;
	  this.logo.play();
	};

	FlashIcon.prototype.stop = function () {
	  this.sprite.stop = true;
	};

	FlashIcon.prototype.pause = function () {
	  this.logo.stop();
	};

	function init(opt) {
	  return new FlashIcon(opt);
	}

	module.exports = init;

/***/ },
/* 2 */
/***/ function(module, exports) {

	'use strict';

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
	  canvas.style.width = width + 'px';
	  canvas.style.height = height + 'px';
	  this.ctx.scale(dpi, dpi);

	  this.sprites = [];

	  this.lastTime = 0;
	  contain.appendChild(canvas);
	};

	Canvasor.prototype = {
	  play: function play() {
	    console.log('play');
	    var self = this;
	    this.pause = false;
	    raf(function (time) {
	      console.log(this);
	      self.animate(time);
	    });
	  },

	  animate: function animate(time) {
	    if (this.pause) {
	      return;
	    }
	    this.fps = 0.5 + 1000 / (time - this.lastTime) << 0;
	    this.ctx.clearRect(0, 0, this.stageWidth, this.stageHeight);
	    var spritesLen = this.sprites.length;
	    // 分开两个循环，优化渲染效率
	    for (var i = 0; i < spritesLen; i++) {
	      this.sprites[i].update(this.ctx, this.fps, this.stageWidth, this.stageHeight);
	    };
	    for (var i = 0; i < spritesLen; i++) {
	      if (this.sprites[i].visible) {
	        this.sprites[i].paint(this.ctx, this.stageWidth, this.stageHeight);
	      }
	    };

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

	module.exports = Canvasor;

/***/ }
/******/ ]);