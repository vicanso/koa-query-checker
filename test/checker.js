"use strict";
const assert = require('assert');
const koa = require('koa');
const router = require('koa-router')();
const koaQueryChecker = require('../lib/checker');
const request = require('superagent');
const http = require('http');

describe('koa-query-checker', function () {
  it('should set query checker successful', function (done) {
    let app = koa();
    app.use(koaQueryChecker('cache=false'));
    router.get('/', function () {
      this.body = 'OK';
    });
    app.use(router.routes());
    let port = process.env.PORT || 10000;
    let httpServer = http.createServer(app.callback()).listen(port);
    console.info('server listen on:' + port);
    let url = 'http://localhost:' + port + '/';
    request.get(url).end(function (err,
      res) {
      let redirectUrl = url + '?cache=false';
      assert.equal(res.redirects.join(''), redirectUrl);
      done();
      httpServer.close();
    });
  });
});
