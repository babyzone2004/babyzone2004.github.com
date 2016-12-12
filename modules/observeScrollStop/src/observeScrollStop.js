
/**
* observeScrollStop.js 
* @description 监听页面是否滚动停止，
* 停止后会触发scrollStop事件
* 并给绑定的container设置scrollStop=true
* @author babyzone2004
*/

import {debounce} from 'b_debounce';

var contains = [];
var evt;
function observeScrollStop(contain, delay) {
  var pos = contains.indexOf(contain);
  if(pos !== -1) {
    return;
  }
  delay = delay? delay : 64;
  contains.push(contain);
  var scrollStop = function(contain) {
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
  var debounceScrollStop = debounce(scrollStop, delay);
  contain.addEventListener('scroll', function() {
    contain.scrollStop = false;
    debounceScrollStop(contain);
  });
}

export {
  observeScrollStop
};