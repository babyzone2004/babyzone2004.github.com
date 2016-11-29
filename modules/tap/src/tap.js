/**
 * tap.js 
 * @description a simple & effective tap,support passive=true,scroll smooth
 * @author babyzone2004
 */

// https://github.com/WICG/EventListenerOptions/blob/gh-pages/explainer.md
var listenerParam;
try {
  var opts = Object.defineProperty({}, 'passive', {
    get: function() {
      listenerParam = {passive: true};
    }
  });
  addEventListener('test', null, opts);
} catch (e) {
  listenerParam = false;
}

var touches;
var startTx;
var startTy;
var onsTouchStart = function(e) {
  touches = e.touches[0];
  startTx = touches.clientX;
  startTy = touches.clientY;
};

var changedTouches;
var evt;
var onTouchEnd = function(e) {
  changedTouches = e.changedTouches[0];
  if (Math.abs(startTx - changedTouches.clientX) < 5 && Math.abs(startTy - changedTouches.clientY) < 5) {
    if (CustomEvent) {
      evt = new CustomEvent('tap', {
        bubbles: true,
        cancelable: true
      });    
    } else {
      evt = document.createEvent('CustomEvent');
      evt.initEvent('tap', true, true);
    }
    e.target.dispatchEvent(evt);
  }
};
var attach = function(elem) {
  elem.addEventListener('touchstart', onsTouchStart, listenerParam);
  elem.addEventListener('touchend', onTouchEnd, listenerParam);
};

export {
  attach
};