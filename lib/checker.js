'use strict';
const debug = require('debug')('jt.koa-query-checker');
const url = require('url');
const qs = require('querystring');

module.exports = queryChecker;

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
		let valid = true;
		checkKeys.forEach(function(key) {
			if (valid && query[key] !== checkParams[key]) {
				valid = false;
			}
		});

		if (valid) {
			return next();
		} else {
			const originalUrl = ctx.originalUrl;
			const urlInfo = url.parse(originalUrl);
			console.info(`query checker:${checkQuery}, url:${originalUrl}`);
			checkKeys.forEach(function(key) {
				query[key] = checkParams[key];
			});
			ctx.status = 302;
			ctx.set('Cache-Control', 'no-cache, no-store, max-age=0');
			ctx.redirect(urlInfo.pathname + '?' + qs.stringify(query));
		}
	};
}

// const url = require('url');
// const querystring = require('querystring');
// const _ = require('lodash');
// const debug = require('debug')('jt.koa-query-checker');

// module.exports = queryChecker;

// /**
//  * [queryChecker description]
//  * @param  {[type]} checkQuery [description]
//  * @return {[type]}            [description]
//  */
// function queryChecker(checkQuery) {
//   /* istanbul ignore if  */
//   if (!checkQuery) {
//     throw new Error('checkQuery can not be null');
//   }
//   debug('query checker conditions:%s', checkQuery);
//   let arr = checkQuery.split('&');
//   let checkParams = {};
//   _.forEach(arr, function (str) {
//     let tmpArr = str.split('=');
//     checkParams[tmpArr[0]] = tmpArr[1];
//   });
//   return function* (next) {
//     let ctx = this;
//     let query = ctx.query;
//     let valid = true;
//     _.forEach(checkParams, function (v, k) {
//       if (valid && query[k] !== v) {
//         valid = false;
//       }
//     });
//     if (valid) {
//       yield * next;
//     } else {
//       let originalUrl = ctx.request.originalUrl;
//       let urlInfo = url.parse(originalUrl);
//       console.info('query checker:%s, url:%s', checkQuery, originalUrl);
//       _.extend(query, checkParams);
//       ctx.status = 302;
//       ctx.set({
//         'Cache-Control': 'no-cache, no-store, max-age=0'
//       });
//       ctx.redirect(urlInfo.pathname + '?' + querystring.stringify(query));
//     }
//   };
// }