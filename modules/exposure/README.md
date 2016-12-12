# 监控dom曝光

> 提供es6,amd,commonjs,umd版本

## Feature

1. 只会完全露出才曝光
2. 提供window或者dom节点的滚动监控
3. 支持横向滚动监控

## Getting Started

```shell
$ npm install b_exposure
```

### Constructor

| param          | 描述                                   |
| :------------- | :----------------------------------- |
| handler        | 滚动的容器                                |
| selector       | 被监控的元素selector,被cache后，这个selector会被删除 |
| debounceTime   | 滚动后延迟的时间                        |
| callback   | 回调函数                        |

## API

### cacheItem

将新的元素更新到缓存中

### addExtralHandler

增加横向滚动的监听

| param     | 描述           |
| :-------- | :----------- |
| container | 监听横向滚动的dom容器 |

### updateCache

更新缓存元素的位置信息，通常页面位置发生变化后需要执行此操作

### clearMemory

根据提供的top和bottom，清除这一高度区域的缓存

| param  | 描述          |
| :----- | :---------- |
| top    | 元素顶部相对页面的高度 |
| bottom | 元素底部相对页面的高度 |

### updateContainSize

更新容器尺寸，通常容器发生改变执行此操作

### clearElemMemory

删除某个元素的缓存

### getScrollTop

获取页面滚动高度

## Usage

```js
//es6:
function id(name) {
  return document.getElementById(name);
}

import {Exposure} from 'b_exposure.js';

var exposure = new Exposure({
  selector: '.J_lazyload',
  extralHandler: id('J_scroll'),
  loadImmdiately: true,
  callback: function(items) {
    console.log(items);
  }
});
exposure.cacheItem();
exposure.addExtralHandler(id('J_scroll1'));

//commonjs
var Exposure = require('b_exposure/dist/exposure.js').Exposure;

//amd umd
...
```

## Sample

http://babyzone2004.github.io/modules/exposure/sample/index.html