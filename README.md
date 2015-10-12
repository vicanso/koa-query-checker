# query checker  middlware for koa


## Installation

```bash
$ npm install koa-query-checker
```

## API

```js
var koa = require('koa');
var koaQueryChecker = require('koa-query-checker');
var app = koa();
app.use(koaQueryChecker('cache=false'));
```

### param

querystring, eg:cache=false or cache=false&type=0

## License

MIT
