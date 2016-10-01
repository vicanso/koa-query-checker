'use strict';

const debug = require('debug')('jt.koa-query-checker');
const url = require('url');
const qs = require('querystring');

/**
 * [queryChecker description]
 * @param  {[type]} checkQuery query string
 * @return {[type]}            [description]
 */
function queryChecker(checkQuery) {
  if (!checkQuery) {
    throw new Error('check query can not be null');
  }
  debug('query checker conditions:%s', checkQuery);
  const arr = checkQuery.split('&');
  const checkParams = {};
  const checkKeys = [];
  arr.forEach((str) => {
    const tmpArr = str.split('=');
    const key = tmpArr[0];
    checkKeys.push(key);
    checkParams[key] = tmpArr[1];
  });

  return (ctx, next) => {
    const query = ctx.query;
    debug('query:%j', query);
    let valid = true;
    checkKeys.forEach((key) => {
      if (valid && query[key] !== checkParams[key]) {
        valid = false;
      }
    });

    if (valid) {
      return next();
    }
    const originalUrl = ctx.originalUrl;
    const urlInfo = url.parse(originalUrl);
    checkKeys.forEach((key) => {
      query[key] = checkParams[key];
    });
    /* eslint no-param-reassign:0 */
    ctx.status = 302;
    ctx.set('Cache-Control', 'no-cache, no-store, max-age=0');
    ctx.redirect(`${urlInfo.pathname}?${qs.stringify(query)}`);
    return null;
  };
}

module.exports = queryChecker;
