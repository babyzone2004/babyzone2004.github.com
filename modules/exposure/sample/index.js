
function id(name) {
  return document.getElementById(name);
}

import {Exposure} from '../src/exposure.js';

var exposure = new Exposure({
  selector: '.J_lazyload',
  extralHandler: id('J_scroll'),
  loadImmdiately: true,
  callback: function(items) {
    console.log(items);
  }
});
exposure.cacheItem();
exposure.addExtralHandler(id('J_scroll1'));