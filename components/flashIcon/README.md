# Url Query工具

> 提供es6,amd,commonjs,umd版本

## Getting Started

```shell
$ npm install @mi/query
```
## API
### add

| option  | 描述                                       |
| ------- | :--------------------------------------- |
| `url`   | 操作的url                                   |
| `key`   | 可传入两种参数：1. Object：直接序列化；2. String：需要增加第三个value参数； |
| `value` | query key                                |

### get
| option | 描述       |
| ------ | :------- |
| `name` | 获取query值 |

## Usage

```js
//es6:
import * as query from '../query.js';
query.add('http://mi.com', 'name', 'hello');
query.add('name', {
	name: 'hello',
	page: 1
});
query.get('name');

//commonjs
var query = require('../query-commonjs.js');
query.add('http://mi.com', 'name', 'hello');
query.add('name', {
	name: 'hello',
	page: 1
});
query.get('name');

//amd umd
...
```

