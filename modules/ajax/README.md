# 模拟移动端tap事件

> 提供es6,amd,commonjs,umd版本

适配移动端，轻便简单的ajax

## Getting Started

```shell
$ npm install b_ajax
```

## OPTION

| param           | 描述          |
| :-------------- | :---------- |
| url             | url         |
| type            | GET \| POST |
| data            | 传输的数据       |
| success         | 成功回调        |
| error           | 失败回调        |
| withCredentials | 跨域参数        |

## Usage

使用attach绑定到dom上，通过事件侦听‘tap’事件

```js
//es6:
import * as tap from 'b_ajax';
ajax({
    url: './test.json',
    type: 'GET',
    data: {
      a: 1,
      b: 2
    },
    success: function (msg) {
      console.log('success', msg);
      id('result').innerHTML = JSON.stringify(msg);
    },
    error: function(xhr) {
      console.log('error', xhr);
    }
  });

//commonjs
var tap = require('bTap/dist/ajax-commonjs.js');

//amd umd
...
```

## Sample

http://babyzone2004.github.io/modules/ajax/sample/index.html