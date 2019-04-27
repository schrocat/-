'use strict';

const Service = require('egg').Service;

class T_oasService extends Service {
    async index() {
        const rs = {};
        var data = await this.app.mysql.get('db2').select('oas');
        rs.code = 0;
        rs.msg = '获取成功',
        rs.data = data;
        return rs;
    }

    async show(mid){
        const rs = {};
        var data = await this.app.mysql.get('db2').get('oas',{id: mid});
        rs.code = 0;
        rs.msg = '获取成功';
        rs.data = data;
        return rs;
    }
    async create(params) {
        const rs = {};
        var data = await this.app.mysql.get('db2').insert('oas',params);
        rs.code  = 0;
        rs.msg = '插入成功',
        rs.id = data.insertId;
        return rs;
    }
  
    async update(params) {
        const rs = {};
        var has = await this.hasOneWithId(params.id);
        if(!has){
            rs.code = -1;
            rs.msg = '更新失败，对象不存在';
            return rs;
        }
        var data = await this.app.mysql.get('db2').update('oas',params);
        rs.code = 0;
        rs.msg = '更新成功',
        rs.data = data;
        return rs;
    }
    async destroy(mid) {
        const rs = {};
        var has = await this.hasOneWithId(mid);
        if(!has){
            rs.code = -1;
            rs.msg = '永久删除失败，对象不存在';
            return rs;
        }
        var data = await this.app.mysql.get('db2').delete('oas',{id:mid});
        rs.code = 0;
        rs.msg = '永久删除成功';
        rs.data = data;
        return rs;
    }
    async delete(params){
        const rs = {};
        var has = await this.hasOneWithId(params.id);
        if(!has){
            rs.code = -1;
            rs.msg = '删除失败，对象不存在';
            return rs;
        }
        var data = await this.app.mysql.get('db2').update(params);
        rs.code = 0;
        rs.msg = '删除成功';
        rs.data = data;
        return rs;
    }
    async hasOneWithId(mid) {
        const has = await this.app.mysql.get('db2').get('oas',{id: mid});
        return (has!=null);
    }
}

module.exports = T_oasService;
