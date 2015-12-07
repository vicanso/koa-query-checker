'use strict';
const assert = require('assert');
const Koa = require('koa');
const request = require('supertest');
const koaQueryChecker = require('../lib/checker');


describe('koa-query-checker', function() {
	it('should throw error when checkQuery is null', function(done) {
		try {
			koaQueryChecker();
		} catch (err) {
			assert.equal(err.message, 'check query can not be null');
			done();
		}
	});

	it('should set query checker successful', function(done) {
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

	it('should pass query checker successful', function(done) {
		const app = new Koa();
		app.use(koaQueryChecker('cache=false'));
		app.use((ctx) => {
			ctx.body = 'OK';
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

});