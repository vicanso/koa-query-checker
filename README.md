# koa-query-checker

Query checker middlware for koa. If the query string is illegal, it will redirect with the query string.

[![Build Status](https://travis-ci.org/vicanso/koa-query-checker.svg?style=flat-square)](https://travis-ci.org/vicanso/koa-query-checker)
[![Coverage Status](https://img.shields.io/coveralls/vicanso/koa-query-checker/master.svg?style=flat)](https://coveralls.io/r/vicanso/koa-query-checker?branch=master)
[![npm](http://img.shields.io/npm/v/koa-query-checker.svg?style=flat-square)](https://www.npmjs.org/package/koa-query-checker)
[![Github Releases](https://img.shields.io/npm/dm/koa-query-checker.svg?style=flat-square)](https://github.com/vicanso/koa-query-checker)


## Installation

```bash
$ npm install koa-query-checker
```

## Examples

  View the [./examples](examples) directory for working examples.

## API

```js
const Koa = require('koa');
const koaQueryChecker = require('koa-query-checker');
const app = new Koa();
app.use(koaQueryChecker('cache=false'));
```

### param

querystring, eg:cache=false or cache=false&type=0

## License

MIT
