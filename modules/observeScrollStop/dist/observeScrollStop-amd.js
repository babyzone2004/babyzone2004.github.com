define(['exports', 'b_debounce'], function (exports, _b_debounce) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.observeScrollStop = undefined;


  var contains = [];
  /**
  * observeScrollStop.js 
  * @description 监听页面是否滚动停止，
  * 停止后会触发scrollStop事件
  * 并给绑定的container设置scrollStop=true
  * @author babyzone2004
  */

  var evt;
  function observeScrollStop(contain, delay) {
    delay = delay ? delay : 64;
    var pos = contains.indexOf(contain);
    if (pos !== -1) {
      return;
    }
    contains.push(contain);
    var scrollStop = function scrollStop(contain) {
      if (CustomEvent) {
        evt = new CustomEvent('scrollStop', {
          bubbles: true,
          cancelable: true
        });
      } else {
        evt = document.createEvent('CustomEvent');
        evt.initEvent('scrollStop', true, true);
      }
      contain.scrollStop = true;
      contain.dispatchEvent(evt);
    };
    var debounceScrollStop = (0, _b_debounce.debounce)(scrollStop, delay);
    contain.addEventListener('scroll', function () {
      contain.scrollStop = false;
      debounceScrollStop(contain);
    });
  }

  exports.observeScrollStop = observeScrollStop;
});
