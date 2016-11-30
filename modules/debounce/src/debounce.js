/**
* @param fn {Function} 实际要执行的函数
* @param delay {Number} 延迟时间，也就是阈值，单位是毫秒
* @return {Function} 
*/
function debounce(fn, delay) {
  var timer;
  var tTimer;
  var context;
  var args = [];
  var _argumentsr;
  return function () {
    context = this;
    _argumentsr = arguments;
    // 增加throttle处理，避免频繁执行clearTimer的开销
    if(!tTimer) {
      tTimer = setTimeout(function() {
        clearTimeout(timer);
        timer = setTimeout(function () {
          // 针对chromium内核优化,https://github.com/GoogleChrome/devtools-docs/issues/53
          for (var i = 0, ii = _argumentsr.length; i < ii; i++) {
            args.push(_argumentsr[i]);
          }
          fn.apply(context, args);
          args = [];
        }, delay);
        tTimer = null;
      }, 32);
    }
  };
}

export {
  debounce
};