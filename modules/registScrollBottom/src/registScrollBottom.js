/*
 * 监听滚动到底部事件
 * @param {Function} callBack 回调
 * @opt {Object} 回调参数
 *
 */

import {observeScrollStop} from 'observe-scroll-stop';

var win = window;
var bd = document.body;
var getScrollTop = function(contain) {
  if (contain === win) {
    return win.scrollY;
  } else {
    return contain.scrollTop;
  }
};

var registScrollBottom = function(callBack, opt, contain, distance) {
  contain = contain? contain : win;
  distance = distance? distance : 140;
  var containHeight;
  var scrollHeight;
  if (contain === win) {
    containHeight = win.innerHeight;
    scrollHeight = bd.scrollHeight;
  } else {
    containHeight = win.clientHeight;
    scrollHeight = opt.contain.scrollHeight;
  }
  observeScrollStop(contain);
  var detectBottom = function() {
    if (getScrollTop(contain) + containHeight > scrollHeight - distance) {
      contain.removeEventListener('scrollStop', detectBottom);
      callBack(opt);
    }
  };
  contain.removeEventListener('scrollStop', detectBottom);
  contain.addEventListener('scrollStop', detectBottom);
}

export {
  registScrollBottom
};
