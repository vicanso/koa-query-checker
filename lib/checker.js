'use strict';

const url = require('url');
const querystring = require('querystring');
const _ = require('lodash');
const debug = require('debug')('jt.koa-query-checker');

module.exports = queryChecker;

/**
 * [queryChecker description]
 * @param  {[type]} checkQuery [description]
 * @return {[type]}            [description]
 */
function queryChecker(checkQuery) {
  /* istanbul ignore if  */
  if (!checkQuery) {
    throw new Error('checkQuery can not be null');
  }
  debug('query checker conditions:%s', checkQuery);
  let arr = checkQuery.split('&');
  let checkParams = {};
  _.forEach(arr, function (str) {
    let tmpArr = str.split('=');
    checkParams[tmpArr[0]] = tmpArr[1];
  });
  return function* (next) {
    let ctx = this;
    let query = ctx.query;
    let valid = true;
    _.forEach(checkParams, function (v, k) {
      if (valid && query[k] !== v) {
        valid = false;
      }
    });
    if (valid) {
      yield * next;
    } else {
      let originalUrl = ctx.request.originalUrl;
      let urlInfo = url.parse(originalUrl);
      console.info('query checker:%s, url:%s', checkQuery, originalUrl);
      _.extend(query, checkParams);
      ctx.status = 302;
      ctx.set({
        'Cache-Control': 'no-cache, no-store, max-age=0'
      });
      ctx.redirect(urlInfo.pathname + '?' + querystring.stringify(query));
    }
  };
}
