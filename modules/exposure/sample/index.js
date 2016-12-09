
function id(name) {
  return document.getElementById(name);
}

import * as tap from '../src/tap.js';
tap.attach(document.body);
id('btn').addEventListener('tap', function() {
	alert('tap event');
});