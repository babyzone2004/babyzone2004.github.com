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
    global.throttle = mod.exports;
  }
})(this, function (exports) {
  "use strict";

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  /**
  * 截流函数
  * @param fn {Function} 实际要执行的函数
  * @param delay {Number} 间隔执行时间，单位是毫秒
  * @param immediately {Number} 
  * 是否需要立即执行一次，像lazyload这种情况，没必要设置true
  * 如果开启，最后一次执行可能会被setTimeout abort调
  * 
  * @return {Function} 
  */

  // 针对chromium内核优化,https://github.com/GoogleChrome/devtools-docs/issues/53
  function setArgs(newArgs, oldArgs) {
    for (var i = 0, ii = oldArgs.length; i < ii; i++) {
      newArgs.push(oldArgs[i]);
    }
  }
  function throttle(fn, time, immediately) {
    var timer;
    var context;
    var args = [];
    var _arguments;
    return function () {
      context = this;
      if (immediately && !timer) {
        setArgs(args, arguments);
        fn.apply(context, args);
        args = [];
      }
      if (!timer) {
        _arguments = arguments;
        timer = setTimeout(function () {
          setArgs(args, _arguments);
          !immediately && fn.apply(context, args);
          args = [];
          timer = null;
        }, time);
      }
    };
  }

  exports.throttle = throttle;
});
