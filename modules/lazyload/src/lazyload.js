/**
 * @name: layzload
 * @overview: 延迟加载
 * @description: 配合domlazy做内存优化
 * @author: babyzone2004
 */

/**
 * @param {Boolean} contain 设置容器
 * @param {String} images 需要延迟加载的图片
 * @param {Number} buffer 缓冲高度
 * @param {Number} bufferWidth 缓冲宽度
 * @param {Number} timeout 滚动的间隔
 * @param {Boolean} fadeIn 是否渐显
 * @param {String} extralDoms 是否需要监听内部dom的滚动事件
 */

function mix(ori, dest) {
  for(var i in dest) {
    ori[i] = dest[i];
  }
  return ori;
}

function getContainHeight(contain) {
  if (contain === win) {
    return win.innerHeight;
  } else {
    return contain.height;
  }
}

function getScrollHandler(contain) {
  if (contain === win) {
    return win;
  } else {
    return contain;
  }
}

function render(imgCache, fadeIn) {
  var img = imgCache.img;
  // 支持img和背景图
  if(img.tagName.toLowerCase() === 'img') {
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
var win = window;
var displayWidth = win.innerWidth;
var Lazyload = function(opt) {
  var me = this;
  this.opt = opt = mix({
    images: '.J_lazyload',
    buffer: 450,
    timeout: 150,
    fadeIn: true,
    bufferWidth: 10,
    loadImmdiately: true,
    contain: document.body
  }, opt);

  var contain = me.contain = opt.contain;
  displayWidth += opt.bufferWidth;
  me.containHeight = getContainHeight(contain);
  var scrollHandler = getScrollHandler(contain);

  var timeout = me.timeout = opt.timeout;
  me.buffer = opt.buffer;
  me.images = opt.images;
  var fadeIn = me.fadeIn = opt.fadeIn;
  me.cache = {}; // 缓存需要延迟加载的图片dom
  me.positions = []; //保存需要延迟加载的图片位置（高度）信息
  // 给全局注入一个滚动标记，给其他模块用，以后会采用更好的暴露方式
  win.scrolling = false; 
  me.loadImmdiately = opt.loadImmdiately;
  // 已经下载但没显示的图片
  var downloadedImgs = me.downloadedImgs = [];
  var timer;
  var loadImgs = function() {
    me.loadImg(fadeIn);
    timer = null;
  };
  scrollHandler.addEventListener('scroll', function() {
    if (!timer) {
      timer = setTimeout(loadImgs, timeout);
    }
  });
  me.contain = contain;

  // 监听滚动停止
  var listenTimer;
  var loadCachedImgs = function() {
    while(downloadedImgs.length !== 0) {
      render(downloadedImgs.shift(), fadeIn);
    }
    win.scrolling = false;
  }
  
  scrollHandler.addEventListener('scroll', function() {
    win.scrolling = true;
    clearTimeout(listenTimer);
    listenTimer = setTimeout(loadCachedImgs, 32);
  })

  // 处理横向滚动场景
  // var extralDoms = opt.extralDoms;
  // if (extralDoms) {
  //   me.addExtralDoms($(extralDoms));
  // }
};

/**
 * 增加额外的横向滚动处理
 * @param {[type]} $dom [description]
 */
Lazyload.prototype.addExtralDoms = function(dom) {
  var timer;
  var me = this;
  dom.addEventListener('scroll', function(e) {
    if (!timer) {
      timer = setTimeout(function() {
        me.loadImg(true, e);
        timer = null;
      }, me.timeout);
    }
  });
}
/**
 * @description 更新lazyload的数据
 */
Lazyload.prototype.update = function(fadeIn) {
  var images = this.contain.querySelectorAll(this.images);
  if (!images.length) return;
  // 如果外部指定显示方式，优先采用
  if (fadeIn === undefined) {
    fadeIn = this.fadeIn;
  }
  this.updateIndexData(images, fadeIn);
  this.loadImg(fadeIn);
};

// 读取scrollTop会引起页面reflow，性能不稳定，1-100ms消耗
// 若contain被非containdow对象赋值，则只有scrollTop属性
function getScrollTop(elem) {
  return elem.scrollTop || win.scrollY
}

/*
 * 加载图片
 * */
Lazyload.prototype.load = function(imgCache, fadeIn) {
  var me = this;
  if (!imgCache.isLoad && !imgCache.isLoading) {
    var img = imgCache.img;
    var startTime = Date.now();
    var handler = function(imgCache) {
      return function(e) {
        // 缓存或者加载特别快的图片，不用渐现，与dom render一起渲染
        if(Date.now() - startTime < 48 && !imgCache.lazy) {
          fadeIn = false;
        }
        // 如果延迟显示
        if(!imgCache.lazy || (imgCache.lazy && !win.scrolling)) {
          render(imgCache, fadeIn);
        } else {
          me.downloadedImgs.push(imgCache);
          imgCache.isLoading = false;
        }
      }
    }(imgCache);
    var handlerErr = function(imgCache) {
      return function() {
        imgCache.isLoading = false;
      }
    }(imgCache);
    imgCache.isLoading = true;
    var _img = new Image();
    _img.src = img.dataset.src;
    _img.onload = handler;
    _img.onerror = handlerErr;
  }
}

/*
 * 返回要加载的索引
 * */
Lazyload.prototype.getLoadIndex = function(top, buffer) {
  var me = this;
  var positions = me.positions;
  var containHeight = me.containHeight;
  // 需要执行加载的数组
  var LoadIndexs = [];
  var activeTop = top - buffer;
  var activeBottom = top + containHeight + buffer;
  for (var i = 0, len = positions.length; i < len; i++) {
    var position = positions[i];
    if (position > activeTop && position < activeBottom) {
      LoadIndexs.push(position);
    }
  }
  return LoadIndexs;
}

/*
 * 更新延迟加载数据，放到缓存中
 * @Param {NodeList} images，图片
 * */
Lazyload.prototype.updateIndexData = function(images, fadeIn) {
  console.time('update');
  var cache = this.cache;
  var positions = this.positions;
  var scrollTop = getScrollTop(this.contain);
  for (var i = 0, ii = images.length; i < ii; i++) {
    var elem = images[i];
    var elemRect = elem.getBoundingClientRect();
    var top = parseInt(elemRect.top + scrollTop);
    var left = elemRect.left;
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
    if(this.loadImmdiately && !lazy && left < displayWidth) {
      this.load(imgCache, fadeIn);
    }
  };
  console.timeEnd('update');
}

// 加载符合条件的图片
Lazyload.prototype.loadImg = function(fadeIn, e) {
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
  for (var i = 0, ii = LoadIndexs.length; i < ii; i++) {
    var elems = cache[LoadIndexs[i]];
    for (var j = 0, jj = elems.length; j < jj; j++) {
      var elem = elems[j];
      if (elem.left - scrollLeft < displayWidth) {
        me.load(elem, fadeIn);
      }
    }
  }
};

/**
 * @description 立即加载图片
 * @Param {Boolean} placeholder
 */
Lazyload.prototype.show = function(keepPlaceholder) {
  var images = this.contain.querySelectorAll('.J_lazyload');
  for (var i = 0, ii = images.length; i < ii; i++) {
    var elem = images[i];
    if(elem.tagName.toLowerCase() === 'img') {
      elem.src = elem.dataset.src;
    } else {
      elem.style['background-image'] = 'url(' + elem.dataset.src + ')'
    }
    var elemClass = elem.classList;
    elemClass.remove('J_lazyload');
    elemClass.remove('lazyload');
    if (!keepPlaceholder) {
      elem.parentNode.classList.add('lazyload-nobg');
    }
  };
}

// 清除指定范围的图片内存
Lazyload.prototype.clearMemory = function(top, bottom) {
  var me = this;
  var cache = me.cache;
  me.positions = me.positions.filter(function(position) {
    var match = position >= top && position < bottom;
    if (match) {
      cache[position] = null;
    }
    return !match;
  })
}

// 更新容器尺寸
Lazyload.prototype.updateContainSize = function() {
  displayWidth = win.innerWidth + this.opt.bufferWidth;
  this.containHeight = this.contain.height();
}

export {
  Lazyload
};