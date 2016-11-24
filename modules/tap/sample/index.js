
function id(name) {
  return document.getElementById(name);
}

import * as tap from '../src/tap.js';

var bd = document.body;
tap.attach(bd);

bd.addEventListener('tap', function () {
  if(id('handlerDelay').checked) {
    jank(500);
  }
  console.log('tap fire');
});


var box = document.getElementById('box');
var deg = 0;
var lastJank = 0;
var jankTime = 500;


function animate() {
  window.requestAnimationFrame(function() {
    if(id('delay').checked) {
      if(Date.now() > lastJank + jankTime) {
        jank(jankTime);
        lastJank = Date.now();
      }
    }
    deg += 5;
    box.style.transform = 'rotate(' + deg + 'deg)';
    animate();
  });
}

function jank(delayTime) {
  var start = Date.now();
  while (Date.now() < start + delayTime) {

  }
}

animate();