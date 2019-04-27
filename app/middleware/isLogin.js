'use strict';

module.exports = options =>{
    return async function isLogin (ctx, next) {
        console.log(ctx.request.body.token)
        await next();
    }
};

