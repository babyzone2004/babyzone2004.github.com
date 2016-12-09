# 监听元素是否在视口之内的基类

> 提供es6,amd,commonjs,umd版本

## Feature

1. 只会在缓存dom节点的时候一次性读取位置信息，更高效
2. 提供window或者dom节点的滚动监控
3. 支持横向滚动监控

## Getting Started

```shell
$ npm install b_observer
```

### Constructor

| param    | 描述             |
| :------- | :------------- |
| handler  | 滚动的容器          |
| selector | 被监控的元素selector |

## API

### cacheElem

缓存单个元素到cache和positions中

| param     | 描述                   |
| :-------- | :------------------- |
| cache     | dom将缓存在cache中        |
| positions | dom的位置将缓存在positions中 |
| elem      | 需要缓存的dom             |
| scrollTop | 当前的滚动位置              |

### update

将新的元素更新到缓存中

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

### scrollCb

滚动执行的回调

## Usage

使用attach绑定到dom上，通过事件侦听‘tap’事件

```js
//es6:
import {Observer} from '../src/observer.js';
var observer = new Observer(window, '.J_lazyload');
observer.update();
observer.scrollCb = function() {
  console.log(this.cache, this.positions);
};

//commonjs
var tap = require('b_observer/dist/observer.js');

//amd umd
...
```

## Sample

http://babyzone2004.github.io/modules/observer/sample/index.html