/**
 * debounce.js 
 * @author babyzone2004
 * 
 * @param fn {Function} 实际要执行的函数
 * @param delay {Number} 延迟时间，单位是毫秒
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

export {
  debounce
};