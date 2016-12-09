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
    global.tap = mod.exports;
  }
})(this, function (exports) {
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
});
