# query checker middlware for koa


## Installation

```bash
$ npm install koa-query-checker
```

## API

```js
var Koa = require('koa');
var koaQueryChecker = require('koa-query-checker');
var app = new Koa();
app.use(koaQueryChecker('cache=false'));
```

### param

querystring, eg:cache=false or cache=false&type=0

## License

MIT
