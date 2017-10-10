
var Nightmare = require('nightmare');
var expect = require('chai').expect;
var fork = require('child_process').fork;

describe('ajax模块测试', function () {
  var child;

  before(function(done) {
    child = fork('./test/server.js');
    child.on('message', function(msg) {
      if(msg === 'listening') {
        done();
      }
    })
  });

  after(function() {
    child.kill();
  });

  it('获取一个成功请求', function(done) {
    this.timeout(3000);
    var nightmare = Nightmare();
    nightmare
     .goto('http://127.0.0.1:8088/index.html')
     .click('#btn')
     .wait(1000)
     .evaluate(function () {
       return document.querySelector('#result').textContent;
     })
     .end()
     .then(function(text) {
        expect(text).to.match(/hello/)
        done();
     })
  });

  it('获取一个失败请求', function(done) {
    this.timeout(3000);
    var nightmare = Nightmare();
    nightmare
     .goto('http://127.0.0.1:8088/index.html')
     .click('#J_failBtn')
     .wait(1000)
     .evaluate(function () {
       return document.querySelector('#result').textContent;
     })
     .end()
     .then(function(text) {
        expect(text).to.match(/fail/)
        done();
     })
  });

  it('获取一个超时请求', function(done) {
    this.timeout(3000);
    var nightmare = Nightmare();
    nightmare
     .goto('http://127.0.0.1:8088/index.html')
     .click('#J_timeoutBtn')
     .wait(1000)
     .evaluate(function () {
       return document.querySelector('#result').textContent;
     })
     .end()
     .then(function(text) {
        expect(text).to.match(/timeout/)
        done();
     })
  });

})
