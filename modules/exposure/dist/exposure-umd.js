(function (global, factory) {
  if (typeof define === "function" && define.amd) {
    define(['exports', 'b_debounce', 'b_observer'], factory);
  } else if (typeof exports !== "undefined") {
    factory(exports, require('b_debounce'), require('b_observer'));
  } else {
    var mod = {
      exports: {}
    };
    factory(mod.exports, global.b_debounce, global.b_observer);
    global.exposure = mod.exports;
  }
})(this, function (exports, _b_debounce, _b_observer) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.Exposure = undefined;
  /**
   * 曝光统计
   * @author: babyzone2004
   */

  /**
   * @param {String} selector 需要检测曝光的selector
   * @param {Number} debounceTime 曝光的间隔，即隔几秒开始曝光
   * @param {Number} handler 滚动的容器
   * @param {String} callback 曝光回调
   */

  var Exposure = function Exposure(opt) {
    var me = this;
    me.scrollStop = true;
    opt = this.opt = this.mix({
      selector: '.J_exposure',
      debounceTime: '1000',
      handler: window,
      callback: function callback() {}
    }, opt);
    _b_observer.Observer.call(this, opt.handler, opt.selector);
    me.debounceExposure = (0, _b_debounce.debounce)(me.exposureApp, opt.debounceTime);
  };

  Exposure.prototype = new _b_observer.Observer();
  Exposure.prototype.constructor = Exposure;

  Exposure.prototype.scrollCb = function (e, isExtra) {
    this.debounceExposure(e, isExtra);
  };

  /*
   * 更新加载数据，放到缓存中
   * @Param {NodeList} elems，图片
   * */
  Exposure.prototype.cacheItem = function () {
    this.update();
    this.debounceExposure();
  };

  // 加载符合条件的图片
  Exposure.prototype.exposureApp = function (e, horizon) {
    var me = this;
    var cache = me.cache;
    var top = me.getScrollTop();
    var handlerWidth = me.handlerWidth;

    // 返回要加载的索引
    var activeBottom = top + this.handlerHeight;
    var LoadIndexs = this.positions.filter(function (pos) {
      if (pos > top && pos < activeBottom) {
        return true;
      }
    });

    // 处理横滑的情况
    var scrollLeft = 0;
    if (horizon) {
      var target = e.target;
      scrollLeft = target.scrollLeft;
      var targetHeight = target.clientHeight;
      var targetTop = Math.round(target.getBoundingClientRect().top);
      LoadIndexs = LoadIndexs.filter(function (item) {
        if (targetTop + top <= item && item <= targetTop + top + targetHeight) {
          return true;
        }
      });
    }
    var exposureItems = [];

    for (var i = 0, ii = LoadIndexs.length; i < ii; i++) {
      var elems = cache[LoadIndexs[i]];
      for (var j = 0, jj = elems.length; j < jj; j++) {
        var elem = elems[j];
        if (elem.left - scrollLeft >= 0 && elem.right - scrollLeft <= handlerWidth && elem.bottom <= activeBottom) {
          var dom = elem.dom;
          exposureItems.push(dom);
        }
      }
    }
    me.opt.callback(exposureItems);
  };

  exports.Exposure = Exposure;
});
