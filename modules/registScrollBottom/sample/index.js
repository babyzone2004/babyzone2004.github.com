
function id(name) {
  return document.getElementById(name);
}

import {registScrollBottom} from '../src/registScrollBottom.js';

function cb (opt) {
  console.log('reachBottom', opt);
}
registScrollBottom(cb, {a:1});
