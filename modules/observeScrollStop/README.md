# 监听页面是否滚动停止

> 提供es6,amd,commonjs,umd版本

## Feature

1. 监听的container停止滚动后会触发‘scrollStop’事件
2. 给绑定的container设置scrollStop状态ture或false

## Getting Started

```shell
$ npm install b_registScrollStatus
```

## Param
| param | 描述                   |
| :---- | :------------------- |
| contain  | 传入需要监听的的dom对象 |

## Usage

```js
//es6:
import {registScrollStatus} from 'b_registScrollStatus.js';

registScrollStatus(window);
window.addEventListener('scrollStop', function() {
  console.log('scrollStop');
});

//commonjs
var registScrollStatus = require('b_registScrollStatus/dist/registScrollStatus-commonjs.js');

//amd umd
...
```

## Sample

http://babyzone2004.github.io/modules/registScrollStatus/sample/index.html