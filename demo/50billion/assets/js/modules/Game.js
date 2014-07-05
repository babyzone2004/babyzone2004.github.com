/**
* game 小游戏，按鼠标切换动画
* author: yangweixian
* @description: 
*/
define(function(require) {
  var $ = require('jquery')
  , $body = $('body');
  /**
  * @param {String} timeContainer 倒计时容器
  * @param {String} scoreContainer 得分容器
  * @param {String} animal1 第一帧动画
  * @param {String} animal2 第2帧动画
  * @param {int} time 倒计时初始值
  * @param {String} resultContainer 展示结果容器
  * @param {int} timerWrap 倒计时容器的父容器
  */
  var Game = function(opt) {
    this.timeContainer = $(opt.timeContainer);
    this.scoreContainer = $(opt.scoreContainer);
    this.animal1 = $(opt.animal1);
    this.animal2 = $(opt.animal2);
    this.time = opt.time;
    this.resultContainer = opt.resultContainer;
    this.timerWrap = opt.timerWrap;
  }
  Game.prototype.end = function() {
    $body.off();
    clearInterval(this.itv);
    $(this.resultContainer).show();
  }
  Game.prototype.play = function() {
    var animal1 = this.animal1;
    var animal2 = this.animal2;
    var timeContainer = this.timeContainer;
    var scoreContainer = this.scoreContainer;
    var clickAccount = 0;
    var _self = this;

    $body.off();
    timeContainer.text(this.time);
    scoreContainer.text(0);
    $(this.timerWrap).show();

    this.itv = setInterval(function() {
      timeContainer.text(--_self.time);
      if(_self.time <= 0) {
        _self.end();
      }
    }, 1000);
    $body.on("keyup", function(e) {
      if(e.keyCode == 32) {
        clickAccount ++;
        if (clickAccount % 2 == 0) {
          animal2.show();
          animal1.hide();
        } else {
          animal1.show();
          animal2.hide();
        }
        if (clickAccount % 2 == 0) {
          scoreContainer.text(clickAccount / 2);
        };
      }
    })
  }
  return Game;
})