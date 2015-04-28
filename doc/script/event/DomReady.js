(function() {
  var isReady = false;
  var DomReady = function(fn) {
    // 内容以及载入，执行回调
    var DOMContentLoaded = function() {
      if (document.addEventListener) {
        document.removeEventListener("DOMContentLoaded", DOMContentLoaded, false);
        fn();
      } else if (document.readyState === "complete") {
        document.detachEvent("onreadystatechange", DOMContentLoaded);
        fn();
      }
      return;
    }
    // 考虑几种情况
    // 1，document以及加载完毕，直接回调
    if (document.readyState === "complete") {
      setTimeout( fn, 1 );
    // 2,还没有加载完毕,增加标准侦听事件
    } else if (document.addEventListener) {
      // 存在两种情况,load侦听是为了防止DOMContentLoaded失效的时候yoga
      document.addEventListener("DOMContentLoaded", DOMContentLoaded, false);
      window.addEventListener("load", fn, false);
    } else {
      // IE事件处理
      document.attachEvent("onreadystatechange", DOMContentLoaded);
      window.attachEvent("onload", fn);
      
      // 在IE中，onreadystatechange事件对于iframe的来说可能会有延迟，但是却足够安全。
      // 但这个事件对于非iframe有时会不太可靠，特别是在页面中图片资源比较多的时候，
      // 可能反而在onload事件触发之后才能触发，因此对于这种情况，需要做进一步的检测
      var top = false;
      try {
        top = window.frameElement == null && document.documentElement;
      } catch(e) {}
      if ( top && top.doScroll ) {
        (function doScrollCheck() {
          if (!isReady) {
            try {
              top.doScroll("left");
            } catch(e) {
              return setTimeout( doScrollCheck, 50 );
            }
            fn();
          }
        })();
      }
    }
  };

  DomReady(function() {
    if(isReady) {
      return;
    }
    isReady = true;
    appendHeaderAndFooter();
  });
})()
// 开发者站版本：
var DomReady = function(fn) {
  var DOMContentLoaded = function() {
    if (document.addEventListener) {
      document.removeEventListener("DOMContentLoaded", DOMContentLoaded, false);
      fn();
      // interactive在oldIe有些许问题，我们只考虑现代浏览器，所以加上
      // discovered by ChrisS here: http://bugs.jquery.com/ticket/12282#comment:15
    } else if (document.readyState === "complete" || document.readyState === "interactive") {
      document.detachEvent("onreadystatechange", DOMContentLoaded);
      fn();
    }
    return;
  };
  if (document.readyState === "complete" || document.readyState === "interactive") {
    setTimeout( fn, 1 );
  } else if (document.addEventListener) {
    document.addEventListener("DOMContentLoaded", DOMContentLoaded, false);
    window.addEventListener("load", fn, false);
  } else {
    document.attachEvent("onreadystatechange", DOMContentLoaded);
    window.attachEvent("onload", fn);
    var top = false;
    try {
      top = window.frameElement == null && document.documentElement;
    } catch(e) {};
    if ( top && top.doScroll ) {
      (function doScrollCheck() {
        if (!isReady) {
          try {
            top.doScroll("left");
          } catch(e) {
            return setTimeout( doScrollCheck, 50 );
          }
          fn();
        }
      })();
    }
  }
};
