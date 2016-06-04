'use strict';
const assert = require('assert');
const Koa = require('koa');
const request = require('supertest');
const koaQueryChecker = require('../lib/checker');
const delay = (ms) => {
  return new Promise((resolve, reject) => {
    setTimeout(resolve, ms).unref();
  });
};

describe('koa-query-checker', function() {
  it('should throw error when checkQuery is null', done => {
    try {
      koaQueryChecker();
    } catch (err) {
      assert.equal(err.message, 'check query can not be null');
      done();
    }
  });

  it('should set query checker successful', done => {
    const app = new Koa();
    app.use(koaQueryChecker('cache=false'));

    request(app.listen())
      .get('/user')
      .end(function(err, res) {
        if (err) {
          done(err);
        } else {
          assert.equal(res.status, 302);
          assert.equal(res.headers.location, '/user?cache=false');
          done();
        }
      });
  });

  it('should pass query checker successful', done => {
    const app = new Koa();
    app.use(koaQueryChecker('cache=false'));
    app.use((ctx) => {
      return delay(100).then(() => {
        ctx.body = 'OK';
      });
    });
    request(app.listen())
      .get('/user?cache=false')
      .end(function(err, res) {
        if (err) {
          done(err);
        } else {
          assert.equal(res.status, 200);
          assert.equal(res.text, 'OK');
          done();
        }
      });
  });

  it('should set the location successful when ctx.originaPath exists', done => {
    const app = new Koa();
    app.use((ctx, next) => {
      ctx.path = ctx.path.replace('/rest', '');
      next();
    });
    app.use(koaQueryChecker('cache=false'));
    app.use((ctx) => {
      ctx.body = 'OK';
    });
    request(app.listen())
      .get('/rest/user?id=vicanso')
      .end(function(err, res) {
        if (err) {
          done(err);
        } else {
          assert.equal(res.status, 302);
          done();
        }
      });
  });

  it('should pass chinese query checker', done => {
    const app = new Koa();
    app.use(koaQueryChecker('cache=不缓存'));
    app.use((ctx) => {
      ctx.body = 'OK';
    });
    request(app.listen())
      .get('/user?cache=%E4%B8%8D%E7%BC%93%E5%AD%98')
      .end(function(err, res) {
        if (err) {
          done(err);
        } else {
          assert.equal(res.status, 200);
          assert.equal(res.text, 'OK');
          done();
        }
      });
  });

});