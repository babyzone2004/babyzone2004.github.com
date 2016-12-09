
/**
* observe.js 
* @description 监听元素是否在视口之内的基类
* @author babyzone2004
*/

var win = window;

function Observer(handler, selector) {
  if(handler) {
    var me = this;
    this.cache = {};
    this.selector = selector;
    this.positions = [];
    this.handler = handler;
    if (handler === win) {
      this.container = document.body;
    } else {
      this.container = handler;
    }
    this.offsetTop = this.handler === win? 0 : this.handler.getBoundingClientRect().top;
    this.updateContainSize();
    handler.addEventListener('scroll', function(e) {
      me.scrollStop = false;
      me.scrollCb(e);
    });
  }
}

Observer.prototype.mix = function(ori, dest) {
  for(var i in dest) {
    ori[i] = dest[i];
  }
  return ori;
};


Observer.prototype.cacheElem = function(cache, positions, elem, scrollTop) {
  var rect = elem.getBoundingClientRect();
  var top = Math.round(rect.top + scrollTop - this.offsetTop);
  var left = rect.left;
  if (!cache[top]) {
    positions.push(top);
    cache[top] = [];
  }
  var domCache = {
    dom: elem,
    left: left,
    right: rect.right,
    bottom: rect.bottom
  };
  cache[top].push(domCache);
  elem.classList.remove(this.selector);
};

/*
 * 更新加载数据，放到缓存中
 * @Param {NodeList} elems，图片
 * */
Observer.prototype.update = function() {
  var doms = this.container.querySelectorAll(this.selector);
  if (!doms.length) return;
  var cache = this.cache;
  var positions = this.positions;
  var scrollTop = this.getScrollTop();
  for (var i = 0, ii = doms.length; i < ii; i++) {
    var dom = doms[i];
    this.cacheElem(cache, positions, dom, scrollTop);
  }
};

/*
 * 更新加载数据，放到缓存中
 * @Param {NodeList} elems，图片
 * */
Observer.prototype.updateCache = function() {
  var cache = this.cache;
  var scrollTop = this.getScrollTop();
  var newCache = {};
  var newPosition = [];
  for(var i in cache) {
    var items = cache[i];
    for (var j = 0, jj = items.length; j < jj; j++) {
      var dom = items[j].dom;
      this.cacheElem(newCache, newPosition, dom, scrollTop);
    }
  }
  this.cache = newCache;
  this.positions = newPosition;
};

// 清除指定范围的图片内存
Observer.prototype.clearMemory = function(top, bottom) {
  var me = this;
  var cache = me.cache;
  top = Math.round(top);
  bottom = Math.round(bottom);
  top -= this.offsetTop;
  bottom -= this.offsetTop;
  me.positions = me.positions.filter(function(position) {
    var match = position >= top && position < bottom;
    if (match) {
      cache[position] = [];
    }
    return !match;
  });
};

// 更新容器尺寸
Observer.prototype.updateContainSize = function() {
  var handler = this.handler;
  if (handler === win) {
    this.handlerHeight = win.innerHeight;
    this.handlerWidth = win.innerWidth;
  } else {
    this.handlerHeight = handler.clientHeight;
    this.handlerWidth = handler.clientWidth;
  }
};

// 删除某个指定元素的缓存
Observer.prototype.clearElemMemory = function(elem) {
  var cache = this.cache;
  for(var i in cache) {
    var elems = cache[i];
    if(elems) {
      var index = elems.indexOf(elem);
      elems.splice(index, 1);
    }
  }
};

Observer.prototype.getScrollTop = function() {
  if (this.handler === win) {
    return win.scrollY;
  } else {
    return this.handler.scrollTop;
  }
};

Observer.prototype.scrollCb = function() {};

/**
 * 增加额外的横向滚动处理
 * @param {[type]} $dom [description]
 */
Observer.prototype.addExtralHandler = function(handler) {
  var me = this;
  handler.addEventListener('scroll', function(e) {
    me.scrollStop = false;
    me.scrollCb(e, true);
  });
};

export {
  Observer
};