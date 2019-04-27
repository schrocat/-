'use strict';

const Service = require('egg').Service;

class T_academysService extends Service {
    async index() {
        const rs = {};
        var data = await this.app.mysql.get('db2').select('academies');
        rs.code = 0;
        rs.msg = '获取成功';
        rs.data = data;
        return rs;
    }
    async create(params) {
        const rs = {};
        var has = await this.hasOneWithNameWhetherWithoutSelf(params,false);
        if(has){
            rs.code = -1;
            rs.msg = '该学院已经存在，请勿重复添加';
            return rs;
        }; 
        var data = await this.app.mysql.get('db2').insert('academies',params);
        rs.id = data.insertId;
        rs.code = 0;
        rs.msg = "插入成功";
        return rs;
    }
  
    async update(params) {
        var hasOne = await this.hasOneWithId(params.id)
        const rs = {};
        if(!hasOne){
            rs.code = 1;
            rs.msg = '更新失败，找不到该对象';
            console.log(rs);
            return rs;
        }

        var hasName = await this.hasOneWithNameWhetherWithoutSelf(params,true)

        if(hasName){
            rs.code = -1;
            rs.msg = '该学院已经存在，请勿重复添加';
            return rs; 
        }

        var data = await this.app.mysql.get('db2').update('academies',params);
        // console.log(data);
        rs.code = 0;
        rs.msg = '更新成功';
        rs.data = data;
        return rs;
    }
    async destroy(mid) {
        var has = await this.hasOneWithId(mid);
        const rs = {};
        if(!has){
            rs.code = -1;
            rs.msg = '对不起，删除对象不存在'
            return rs;
        }
        const data = await this.app.mysql.get('db2').delete('academies',{id: mid});
        rs.code = 0;
        rs.msg = '删除成功！';
        rs.data = data;
        return rs;
    }

    // 数据库当中是否有id为mid的数据元组
    async hasOneWithId(mid) {
        var has = await this.app.mysql.get('db2').get('academies',{id: mid});
        return (has!=null);
    }

    // 数据库当中是否有name为params.name的数据元组
    async hasOneWithNameWhetherWithoutSelf(params,choice){
        var has = await this.app.mysql.get('db2').get('academies',{name: params.name});
        if(!choice){
            return (has!=null);
        }
        return (has!=null)&&(has.id!=params.id);  
    }
}

module.exports = T_academysService;
