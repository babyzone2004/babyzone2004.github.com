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

	var _tap = __webpack_require__(1);

	var tap = _interopRequireWildcard(_tap);

	function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

	function id(name) {
	  return document.getElementById(name);
	}


	var bd = document.body;

	tap.attach(bd);

	bd.addEventListener('tap', function () {
	  if (id('handlerDelay').checked) {
	    jank(500);
	  }
	  console.log('tap fire');
	});
	var box = document.getElementById('box');
	var deg = 0;
	var lastJank = 0;
	var jankTime = 500;

	function animate() {
	  window.requestAnimationFrame(function () {
	    if (id('delay').checked) {
	      if (Date.now() > lastJank + jankTime) {
	        jank(jankTime);
	        lastJank = Date.now();
	      }
	    }
	    deg += 5;
	    box.style.transform = 'rotate(' + deg + 'deg)';
	    animate();
	  });
	}

	function jank(delayTime) {
	  var start = Date.now();
	  while (Date.now() < start + delayTime) {}
	}

	animate();

/***/ },
/* 1 */
/***/ function(module, exports) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	/**
	 * tap.js 
	 * @description a simple & effective tap,support passive=true,scroll smooth
	 * @author babyzone2004
	 */
	var startTx;
	var startTy;
	var touches;
	var win = window;
	// https://github.com/WICG/EventListenerOptions/blob/gh-pages/explainer.md
	var listenerParam;
	try {
	  var opts = Object.defineProperty({}, 'passive', {
	    get: function get() {
	      listenerParam = { passive: true };
	    }
	  });
	  win.addEventListener('test', null, opts);
	} catch (e) {
	  listenerParam = false;
	}

	var onsTouchStart = function onsTouchStart(e) {
	  touches = e.touches[0];
	  startTx = touches.clientX;
	  startTy = touches.clientY;
	};

	var onTouchEnd = function onTouchEnd(e) {
	  var touches = e.changedTouches[0];
	  var endTx = touches.clientX;
	  var endTy = touches.clientY;
	  // 部分设备touch 事件比较灵敏，导致按下和松开手指时的事件坐标会出现一点点变化
	  if (Math.abs(startTx - endTx) < 5 && Math.abs(startTy - endTy) < 3) ;{
	    var evt = new win.CustomEvent('tap', {
	      bubbles: true,
	      cancelable: true
	    });
	    e.target.dispatchEvent(evt);
	  }
	};
	var attach = function attach(elem) {
	  elem.addEventListener('touchstart', onsTouchStart, listenerParam);
	  elem.addEventListener('touchend', onTouchEnd, listenerParam);
	};

	exports.attach = attach;

/***/ }
/******/ ]);