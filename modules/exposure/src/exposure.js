/**
 * 应用曝光统计，把当前元素（应用、专题等）停留一秒的应用往客户端打点
 * 对于横划的应用，如果出现在feed流里面，可能会出现统计不准
 * @author: babyzone2004
 * @date: 2016/4/18
 */

/**
 * @param {Boolean} contain 设置容器
 * @param {Boolean} global 是否是全局lazy
 * @param {String} apps 需要检测曝光的应用
 * @param {Number} timeout 滚动的间隔
 * @param {Number} offsetTop 偏离顶部的位移
 * @param {String} extralDoms 是否需要监听内部dom的滚动事件
 */
var win = window;
var itemData = require('/assets/js/module/itemData.js');
var displayWidth = win.innerWidth;

var Exposure = function(opt) {
  var me = this;
  this.opt = opt = $.extend({
    apps: '.J_exposure',
    buffer: 0,
    timeout: 800,
    bufferWidth: 0
  }, opt);
  var contain = opt.contain;
  displayWidth += opt.bufferWidth;
  this.offsetTop = 0;
  if (!contain) {
    contain = document.body;
    var $handler = $(win);
    me.containHeight = $handler.height();
  } else {
    var $handler = $(contain);
    this.offsetTop = contain.getBoundingClientRect().top;
    me.containHeight = $handler.height();
  }
  me.$handler = $handler;
  me.contain = contain;

  me.buffer = opt.buffer;
  me.apps = opt.apps;
  me.timeout = opt.timeout;
  me.cache = {}; // 缓存需要延迟加载的图片dom
  me.positions = []; //保存需要延迟加载的图片位置（高度）信息
  var timer;
  $handler.on('scroll.exposure', function(e) {
    clearTimeout(timer);
    timer = setTimeout(function() {
      me.exposureApp();
    }, opt.timeout);
  });

  // 处理横向滚动场景
  var extralDoms = opt.extralDoms;
  if (extralDoms) {
    me.addExtralDoms($(extralDoms));
  }
  globle.registerViewStatus(function(visible) {
    console.log('-----------visible', visible);
    if (visible) {
      clearTimeout(timer);
      timer = setTimeout(function() {
        me.exposureApp();
      }, me.timeout);
    } else {
      clearTimeout(timer);
    }
  });
};

/**
 * 增加额外的横向滚动处理
 * @param {[type]} $dom [description]
 */
Exposure.prototype.addExtralDoms = function($dom) {
  var timer;
  var me = this;
  $dom.on('scroll.exposure', function(e) {
    if (!timer) {
      timer = setTimeout(function() {
        me.exposureApp(e);
        timer = null;
      }, me.timeout);
    }
  });
}
/**
 * @description 更新lazyload的数据
 */
var updateTimer;
Exposure.prototype.update = function() {
  var me = this;
  var apps = me.contain.querySelectorAll(me.apps);
  if (apps.length) {
    me.updateIndexData(apps);
  }

  clearTimeout(updateTimer);
  console.log('positions', this.positions);
  updateTimer = setTimeout(function() {
    me.exposureApp();
  }, me.timeout);
};

// 读取scrollTop会引起页面reflow，性能不稳定，1-100ms消耗
// 若contain被非containdow对象赋值，则只有scrollTop属性
function getScrollTop(elem) {
  return (elem.scrollTop || win.scrollY);
}

/*
 * 返回要加载的索引
 * */
var activeTop = 0;
var activeBottom = 0;
Exposure.prototype.getLoadIndex = function(top, buffer) {
  var me = this;
  var positions = me.positions;
  var containHeight = me.containHeight;
  // 需要执行加载的数组
  var LoadIndexs = [];
  activeTop = top - buffer;
  activeBottom = top + containHeight + buffer;
  for (var i = 0, len = positions.length; i < len; i++) {
    var position = positions[i];
    if (position >= activeTop && position <= activeBottom) {
      LoadIndexs.push(position);
    }
  }
  return LoadIndexs;
}

/*
 * 更新延迟加载数据，放到缓存中
 * @Param {NodeList} apps，图片
 * */
Exposure.prototype.updateIndexData = function(apps) {
  var cache = this.cache;
  var positions = this.positions;
  var scrollTop = getScrollTop(this.contain);
  for (var i = 0, ii = apps.length; i < ii; i++) {
    var elem = apps[i];
    var elemRect = elem.getBoundingClientRect();
    var top = Math.round(elemRect.top + scrollTop - this.offsetTop);
    var left = elemRect.left;
    if (!cache[top]) {
      positions.push(top);
      cache[top] = [];
    }
    cache[top].push({
      dom: elem,
      isLoad: false,
      isLoading: false,
      left: left,
      right: left + elemRect.width,
      bottom: top + elemRect.height
    });
    elem.classList.remove('J_exposure');
  };
}

// 加载符合条件的图片
Exposure.prototype.exposureApp = function(e) {
  if (!globle.viewStatus) {
    return
  }
  console.time('exposureApp');
  var me = this;
  var cache = me.cache;
  var scrollTop = getScrollTop(me.contain);
  var LoadIndexs = me.getLoadIndex(scrollTop, me.buffer);
  var scrollLeft = 0;
  if (e !== undefined) {
    scrollLeft = e.target.scrollLeft;
    var targetHeight = e.target.clientHeight;
    var targetTop = Math.floor(e.target.getBoundingClientRect().top);
    var scrollTop = getScrollTop(this.contain);
    LoadIndexs = LoadIndexs.filter(function(item){
      if(targetTop + scrollTop <= item && item <= targetTop + scrollTop + targetHeight){
        return true;
      }
    });
  }
  var exposureItems = [];
  for (var i = 0, ii = LoadIndexs.length; i < ii; i++) {
    var top = LoadIndexs[i];
    var elems = cache[top];
    for (var j = 0, jj = elems.length; j < jj; j++) {
      var elem = elems[j];
      if (elem.left - scrollLeft >= 0 && elem.right - scrollLeft <= displayWidth && elem.bottom <= activeBottom) {
        var dom = elem.dom;
        var dataset = dom.dataset;
        var cacheItem = itemData.get(dataset.cacheid) || {};
        exposureItems.push({
          rId: cacheItem.rId || dataset.rid,
          appId: cacheItem.id,
          ad: cacheItem.ads,
          pos: cacheItem.pos,
          refPosition: cacheItem.position,
          installed: cacheItem.installed,
          pagePos: {
            l: elem.left,
            t: top
          },
          sid: $(dom).closest('.J_feed').data('sid')
        });
      }
    }
  }
  if (exposureItems.length !== 0) {
    // 曝光应用
    win.marketAd && win.marketAd.trackAdAction('mimarket_adfeedback', 'exposure', JSON.stringify({
      items: exposureItems,
      context: {
        scroll: scrollTop,
        ref: ref,
        refs: ajaxData.refs,
        screenSize: screenSize,
        extraParam: exposureParam
      }
    }));
  }
  console.log('abcdefgxxx:' + ajaxData.refs);
  console.log('...............exposureApp:', {
    items: exposureItems,
    context: {
      scroll: scrollTop,
      ref: ref,
      refs: ajaxData.refs,
      screenSize: screenSize,
      extraParam: exposureParam
    }
  });
  console.timeEnd('exposureApp');
}

// 清除指定范围的图片内存
Exposure.prototype.clearMemory = function(top, bottom) {
  var me = this;
  var cache = me.cache;
  top = Math.round(top);
  bottom = Math.round(bottom);
  top -= this.offsetTop;
  bottom -= this.offsetTop;
  me.positions = me.positions.filter(function(position) {
    var match = position >= top && position < bottom;
    if (match) {
      cache[position] = null;
    }
    return !match;
  })
}

// 更新容器尺寸
Exposure.prototype.updateContainSize = function() {
  displayWidth = win.innerWidth + this.opt.bufferWidth;
  this.containHeight = this.$handler.height();
}

// 删除某个指定元素的缓存
Exposure.prototype.clearElemMemory = function(elem) {
  var cache = this.cache;
  for(var i in cache) {
    var elems = cache[i];
    if(elems) {
      var index = elems.indexOf(elem);
      elems.splice(index, 1);
    }
  }
}

module.exports = Exposure