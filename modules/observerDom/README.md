# observerDom

> 提供es6,amd,commonjs,umd版本

## Feature
实时监听dom元素是否在视口之内，模拟IntersectionObserver API，实现部分方法。每次都会操作getBoundingClientRect引起reflow，实验模块，请谨慎使用

```js
//es6:
function id(name) {
  return document.getElementById(name);
}

import {observerDom} from '../src/observerDom.js';

var options = {
  root: document.getElementById('J_screenshot'),
  threshold: 0.95,
  delay: 150
};
var callback = function(entries) { 
  console.log(entries);
};
var observer = observerDom(callback, options);
```

## Sample

http://babyzone2004.github.io/modules/tap/sample/index.html