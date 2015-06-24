var koa = require('koa');
var app = koa();
var checker = require('../lib/checker');

app.use(checker('cache=false'));
var port = process.env.PORT || 10000;
app.listen(port);
console.dir('server listen on:' + port);