
import {ajax} from '../src/ajax.js';

function id(name) {
  return document.getElementById(name);
}

id('btn').addEventListener('click', request);
function request() {
  ajax({
    url: './test.json',
    type: 'GET',
    data: {
      a: 1,
      b: 2
    },
    success: function (msg) {
      console.log('success', msg);
      id('result').innerHTML = JSON.stringify(msg);
    },
    error: function(xhr) {
      console.log('error', xhr);
    }
  });
}

