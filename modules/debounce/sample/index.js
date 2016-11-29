
function id(name) {
  return document.getElementById(name);
}

import {debounce} from '../src/debounce.js';

id('btn').addEventListener('click', debounce(function() {
  console.log('在设置的时间内连续的点击，只会执行一次');
}, 300));