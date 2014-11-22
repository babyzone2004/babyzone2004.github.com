(function() {
  var isReady = false;
  var DomReady = function(fn) {
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
    if (document.readyState === "complete") {
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


