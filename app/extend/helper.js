'use strict';

const crypto = require('crypto');

const DB2 = 'db2';

module.exports =  {
    cryptPwd(password){
        const { ctx } = this;
        const { pwdSecrect } = ctx.app.config;
        const md5 = crypto.createHmac('md5',pwdSecrect);
        return md5.update(password).digest('hex');
    },


    //***************数据库操作---begin-----***************************** */
    // 获取数据表的所有数据元组
    async index(table) {
        const { app } = this;
        const rs = await app.mysql.get(DB2).select(table);
        return rs;
    },
    // 向表中插入一条数据
    async create(table,params) {
        const { app } = this;
        const rs = await app.mysql.get(DB2).insert(table,params);
        return rs;
    },
    // 更新数据
    async update(table,params) {
        const { app } = this;
        const rs = await app.mysql.get(DB2).update(table,params);
        return rs;
    },
    // 删除id为mid的数据（id为主键）
    async destroy(table,mid) {
        const { app } = this;
        const rs = await app.mysql.get(DB2).delete(table,{id: mid});
        return rs;
    },
    // 获取id为mid的数据元组
    async show(table,mid) {
        const { app } = this;
        const rs = await app.mysql.get(DB2).get(table,{id: mid});
        return rs;
    },
    async findOneByPropertys(table,params) {
        const { app } = this;
        const rs = await app.mysql.get(DB2).get(table,params);
        return rs;
    },
    async selectOnContidition(table,conditions) {
        const { app } = this;
        const rs = await app.mysql.get(DB2).select(table,conditions);
        return rs;
    },

    async query(sql){
        const {app} = this;
        const rs = await app.mysql.get(DB2).query(sql);
        return rs;
    },
    async query2(sql,arr){
        const {app} = this;
        const rs = await app.mysql.get(DB2).query(sql,arr);
        return rs;
    },
    //***************数据库操作---end-----***************************** */

    // **************response to frontEnd*****************************//
    $success(data = {} ,code = 0,msg = 'ok',status = 200){
        const {ctx} = this;
        ctx.body = {code,msg,data};
        ctx.status = status;
    },

    $fail(errcode = 400,msg = "BAD_REQUEST") {
        const {ctx} = this;
        ctx.body = {code:errcode,msg};
    }
    //================================================================//
};
