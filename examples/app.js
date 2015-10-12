var koa = require('koa');
var app = koa();
var checker = require('../lib/checker');
var router = require('koa-router')();

app.use(checker('cache=false'));
router.get('/', function () {
  this.body = 'OK';
});
app.use(router.routes());
var port = process.env.PORT || 10000;
app.listen(port);
console.dir('server listen on:' + port);
