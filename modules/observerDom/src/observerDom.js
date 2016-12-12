/**
 * 模拟IntersectionObserver API，实现部分方法，
 * 兼容参数：root, threshold，target，rootBounds，intersectionRatio，boundingClientRect
 * 新增截流函数处理，避免执行次数过多，通过delay配置
 */
var throttle = require('b_throttle/dist/throttle-commonjs.js').throttle;
function judgeCallback(callback, targets, root, threshold) {
  var fitTargets = [];
  var rootBounds = getRootRect(root);
  
  for (var i = 0, ii = targets.length; i < ii; i++) {
    var target = targets[i];
    var rect = target.getBoundingClientRect();
    var visibleWidth;
    if(rect.right < rootBounds.left || rect.left > rootBounds.right) {
      visibleWidth = 0;
    } else if(rect.left < rootBounds.left) {
      visibleWidth = rect.right - rootBounds.left;
    } else if(rect.right > rootBounds.right) {
      visibleWidth = rootBounds.right - rect.left;
    } else {
      visibleWidth = rect.width;
    }

    var visibleHeight;
    if(rect.bottom < rootBounds.top || rect.top > rootBounds.bottom) {
      visibleHeight = 0;
    } else if(rect.top < rootBounds.top) {
      visibleHeight = rect.bottom - rootBounds.top;
    } else if(rect.bottom > rootBounds.bottom) {
      visibleHeight = rootBounds.bottom - rect.top;
    } else { 
      visibleHeight = rect.height;
    }
    var intersectionRatio = (visibleWidth * visibleHeight) / (rect.width * rect.height);

    if(intersectionRatio >= threshold) {
      fitTargets.push({
        boundingClientRect: rect,
        rootBounds: rootBounds,
        intersectionRatio: intersectionRatio,
        target: target,
      });
    }
  }
  fitTargets.length && callback(fitTargets);
}

function getRootRect(root) {
  var rootRect;
  if (root) {
    rootRect = root.getBoundingClientRect();
  } else {
    var html = document.documentElement;
    var body = document.body;
    rootRect = {
      top: 0,
      left: 0,
      right: html.clientWidth || body.clientWidth,
      width: html.clientWidth || body.clientWidth,
      bottom: html.clientHeight || body.clientHeight,
      height: html.clientHeight || body.clientHeight
    };
  }
  return rootRect;
}

function ObserverEntry(callback, options) {
  var root = options.root;
  var self = this;
  this.options = options;
  this.callback = callback;
  
  if(root) {
    root.addEventListener('scroll', throttle(function() {
      judgeCallback(callback, self.targets, root, options.threshold);
    }, options.delay));
  } else {
    window.addEventListener('scroll', throttle(function() {
      judgeCallback(callback, self.targets, root, options.threshold);
    }, options.delay));
  }
  this.targets = [];
  judgeCallback(callback, self.targets, root, options.threshold);
}

ObserverEntry.prototype.observe = function(target) {
  this.targets.push(target);
};


function observerDom(callback, options) {
  return new ObserverEntry(callback, options);
}

export {
  observerDom
};