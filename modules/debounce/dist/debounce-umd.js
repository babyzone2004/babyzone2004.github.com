(function (global, factory) {
  if (typeof define === "function" && define.amd) {
    define(["exports"], factory);
  } else if (typeof exports !== "undefined") {
    factory(exports);
  } else {
    var mod = {
      exports: {}
    };
    factory(mod.exports);
    global.debounce = mod.exports;
  }
})(this, function (exports) {
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
