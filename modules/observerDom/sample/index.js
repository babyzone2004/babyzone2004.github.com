
function id(name) {
  return document.getElementById(name);
}

import {observerDom} from '../src/observerDom.js';

var options = {
  root: document.getElementById('J_screenshot'),
  threshold: 0.95,
  delay: 150
};
var callback = function(entries) { 
  console.log(entries);
};
var observer = observerDom(callback, options);


var options1 = {
  threshold: 0.95,
  delay: 150
};
var callback1 = function(entries) { 
  console.log(entries);
};
var observer1 = observerDom(callback1, options1);
var imgs = document.querySelectorAll('.screenshot');
var taps = document.querySelectorAll('.tap');

imgs.forEach(function(elem) {
  observer.observe(elem);
  observer1.observe(elem);
});


var observer2 = observerDom(callback, {
  root: document.querySelector('#J_relativeApp ul'),
  threshold: 0.95,
  delay: 150
});

var observer3 = observerDom(callback, {
  root: document.querySelector('#J_relativeHotApp ul'),
  threshold: 0.95,
  delay: 150
});

taps.forEach(function(elem) {
  observer1.observe(elem);
  observer2.observe(elem);
  observer3.observe(elem);
});



