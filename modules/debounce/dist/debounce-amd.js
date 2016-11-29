define(["exports"], function (exports) {
  "use strict";

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  /**
  * @param fn {Function} 实际要执行的函数
  * @param delay {Number} 延迟时间，也就是阈值，单位是毫秒
  * @return {Function} 
  */
  function debounce(fn, delay) {
    var timer;
    var context;
    var args;
    return function () {
      context = this;
      args = arguments;
      clearTimeout(timer);
      timer = setTimeout(function () {
        fn.apply(context, args);
      }, delay);
    };
  }

  exports.debounce = debounce;
});
