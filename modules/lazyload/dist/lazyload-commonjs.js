'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Lazyload = undefined;

var _b_throttle = require('b_throttle');

var _b_debounce = require('b_debounce');

var _b_observer = require('b_observer');

Lazyload.prototype = new _b_observer.Observer();
/**
* lazyload.js 
* @description 图片懒加载 lazyload img
* @author babyzone2004
*/

/**
增加以下css
.lazyload {
  opacity: 0;
}
.lazyload-show {
  opacity: 1;
}
.lazyload-fadein {
  position: relative;
  z-index: 1;
  transition: opacity .2s ease-in;
  opacity: 1;
}
 */

Lazyload.prototype.constructor = Lazyload;

function render(imgCache, fadeIn) {
  var img = imgCache.img;
  if (img.tagName.toLowerCase() === 'img') {
    img.src = img.dataset.src;
  } else {
    img.style['background-image'] = 'url(' + img.dataset.src + ')';
  }
  if (fadeIn) {
    img.classList.add('lazyload-fadein');
  } else {
    img.classList.add('lazyload-show');
  }
  imgCache.isLoad = true;
  imgCache.isLoading = false;
}

function Lazyload(opt) {
  var me = this;
  me.scrollStop = true;
  opt = this.opt = this.mix({
    selector: '.J_lazyload',
    buffer: 450,
    interval: 150,
    fadeIn: true,
    bufferWidth: 10,
    loadImmdiately: true,
    handler: window
  }, opt);
  this.loadImmdiately = opt.loadImmdiately;
  this.buffer = opt.buffer;
  this.fadeIn = opt.fadeIn;
  _b_observer.Observer.call(this, opt.handler, opt.selector);

  this.throttleLoad = (0, _b_throttle.throttle)(function (e, isExtra) {
    me.loadImg(e, isExtra);
  }, opt.interval);

  var downloadedImgs = me.downloadedImgs = [];
  var renderCacheImgs = function renderCacheImgs(fadeIn) {
    me.scrollStop = true;
    while (downloadedImgs.length !== 0) {
      render(downloadedImgs.shift(), fadeIn);
    }
  };
  this.debounceRender = (0, _b_debounce.debounce)(renderCacheImgs, 64);
}

Lazyload.prototype.scrollCb = function (e, isExtra) {
  this.throttleLoad(e, isExtra);
  this.debounceRender(e, isExtra);
};

Lazyload.prototype.cacheElem = function (cache, positions, elem, scrollTop) {
  var rect = elem.getBoundingClientRect();
  var top = Math.round(rect.top + scrollTop - this.offsetTop);
  var left = rect.left;
  if (!cache[top]) {
    positions.push(top);
    cache[top] = [];
  }
  var lazy = elem.dataset.lazy;
  var imgCache = {
    img: elem,
    isLoad: false,
    isLoading: false,
    left: left,
    lazy: lazy
  };
  cache[top].push(imgCache);
  elem.classList.remove('J_lazyload');
  if (this.loadImmdiately && !lazy && left < this.handlerWidth) {
    this.load(imgCache);
  }
};

/*
 * 更新加载数据，放到缓存中
 * @Param {NodeList} elems，图片
 * */
Lazyload.prototype.cacheImg = function () {
  this.update();
  this.loadImg();
};

// 加载符合条件的图片
Lazyload.prototype.loadImg = function (e, horizon) {
  var me = this;
  var cache = me.cache;
  var fadeIn = me.fadeIn;
  var top = me.getScrollTop();
  var handlerWidth = me.handlerWidth;

  // 返回要加载的索引
  var activeTop = top - this.buffer;
  var activeBottom = top + this.handlerHeight + this.buffer;
  var LoadIndexs = this.positions.filter(function (pos) {
    if (pos > activeTop && pos < activeBottom) {
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
  for (var i = 0, ii = LoadIndexs.length; i < ii; i++) {
    var elems = cache[LoadIndexs[i]];
    for (var j = 0, jj = elems.length; j < jj; j++) {
      var elem = elems[j];
      if (elem.left - scrollLeft < handlerWidth) {
        me.load(elem, fadeIn);
      }
    }
  }
};

/*
 * 加载图片
 * */
Lazyload.prototype.load = function (imgCache, fadeIn) {
  var me = this;
  if (!imgCache.isLoad && !imgCache.isLoading) {
    var img = imgCache.img;
    var startTime = Date.now();
    var handler = function (imgCache) {
      return function () {
        // 缓存或者加载特别快的图片，不用渐现，与dom render一起渲染
        if (Date.now() - startTime < 48 && !imgCache.lazy) {
          fadeIn = false;
        }
        // 如果延迟显示
        if (!imgCache.lazy || imgCache.lazy && me.scrollStop) {
          render(imgCache, fadeIn);
        } else {
          me.downloadedImgs.push(imgCache);
          imgCache.isLoading = false;
        }
      };
    }(imgCache);
    var handlerErr = function (imgCache) {
      return function () {
        imgCache.isLoading = false;
      };
    }(imgCache);
    imgCache.isLoading = true;
    var _img = new Image();
    _img.src = img.dataset.src;
    _img.onload = handler;
    _img.onerror = handlerErr;
  }
};

/**
 * @description 立即加载图片
 * @Param {Boolean} placeholder
 */
Lazyload.show = function (handler, selector) {
  handler = handler || document.body;
  var imgs = handler.querySelectorAll(selector);
  for (var i = 0, ii = imgs.length; i < ii; i++) {
    var elem = imgs[i];
    if (elem.tagName.toLowerCase() === 'img') {
      elem.src = elem.dataset.src;
    } else {
      elem.style['background-image'] = 'url(' + elem.dataset.src + ')';
    }
    var elemClass = elem.classList;
    elemClass.remove(selector);
  }
};

exports.Lazyload = Lazyload;
