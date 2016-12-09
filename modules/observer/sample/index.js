
function id(name) {
  return document.getElementById(name);
}

import {Lazyload} from '../src/lazyload.js';

var observer = new Lazyload();
observer.update();
observer.scrollCb = function() {
  console.log(this.cache, this.positions);
};