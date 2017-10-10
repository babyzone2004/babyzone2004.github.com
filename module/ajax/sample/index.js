
import ajax from '../src/ajax.js';

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

id('J_failBtn').addEventListener('click', request1);
function request1() {
  ajax({
    url: './xxx.json',
    type: 'GET',
    success: function (msg) {
      console.log('success', msg);
      id('result').innerHTML = JSON.stringify(msg);
    },
    error: function(xhr) {
      console.log('error', xhr);
      id('result').innerHTML = 'fail';
    }
  });
}

id('J_timeoutBtn').addEventListener('click', request2);
function request2() {
  ajax({
    url: './test.json',
    type: 'GET',
    timeout: 1,
    success: function (msg) {
      console.log('success', msg);
      id('result').innerHTML = JSON.stringify(msg);
    },
    error: function(xhr) {
      console.log('error', xhr);
      id('result').innerHTML = 'timeout';
    }
  });
}