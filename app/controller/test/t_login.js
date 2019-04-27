'use strict';

const Controller = require('egg').Controller;

class T_loginController extends Controller {
    async login() {

    }

    async signup () {
        const {ctx,app} = this;
        const password = ctx.request.body.password;
        const pwdHash = ctx.helper.cryptPwd(password);
        const params = {};
        params.email = ctx.request.body.email;
        params.password = pwdHash;
        params.createdAt = new Date;
        params.updatedAt = new Date;
        console.log(params);
        const rs = await app.mysql.get('db2').insert('users',params);
        console.log(rs);
        ctx.body = rs;
        ctx.status = 200;
    }
}

module.exports = T_loginController;
