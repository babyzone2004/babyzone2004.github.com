
function id(name) {
  return document.getElementById(name);
}

import {Lazyload} from '../src/lazyload.js';

var lazyload = new Lazyload({
  extralHandler: id('J_scroll'),
  loadImmdiately: true
});
lazyload.cacheImg();
lazyload.addExtralHandler(id('J_scroll1'));