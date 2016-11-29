
function id(name) {
  return document.getElementById(name);
}

import {throttle} from '../src/throttle.js';

id('btn').addEventListener('click', throttle(function() {
  console.log('连续点击，只会每隔1000毫秒执行一次');
}, 1000, true));
