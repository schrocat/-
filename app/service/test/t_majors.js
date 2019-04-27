'use strict';

const Service = require('egg').Service;

class T_majorsService extends Service {
    async index() {
        const rs = {};
        const data = await this.app.mysql.get('db2').select('majors');
        rs.code = 0;
        rs.msg = '获取成功';
        rs.data = data;
        return rs;
    }
    async create(params) {
        const rs = {};
        var hasAcademy = await this.hasAcademy(params.academyId);
        console.log(hasAcademy)
        if(!hasAcademy){
            rs.code = 1;
            rs.msg = "所属院对象不存在!";
            return rs;
        }
        var hasOne = await this.hasOneWithNameIfWithoutSelf(params,false);
        if(hasOne){
            rs.code = -1;
            rs.msg = '该系已经存在！';
            return rs;
        }
        var data = await this.app.mysql.get('db2').insert('majors',params);
        rs.code = 0;
        rs.msg = '插入成功！';
        rs.id = data.insertId;
        return rs;
    }
    async update(params) {
        const rs = {};
        var hasOne = await this.hasOneWithId(params.id);
        if(!hasOne){
            rs.code = 1;
            rs.msg = '更新失败！对象不存在';
            return rs;
        }
        var hasAcademy = await this.hasAcademy(params.academyId);
        if(!hasAcademy){
            rs.code = 2;
            rs.msg = '所属院对象不存在';
            return rs;
        }

        var hasOneWithName = await this.hasOneWithNameIfWithoutSelf(params,true);
        if(hasOneWithName){
            rs.code = -1;
            rs.msg = '该系已经存在，请重新修改！';
            return rs;
        }

        var data = await this.app.mysql.get('db2').update('majors',params);
        rs.code = 0;
        rs.msg = '更新成功！';
        rs.data = data;
        return rs;
    }
    async destroy(mid) {
        const rs = {};
        var has = await this.hasOneWithId(mid);
        if(!has){
            rs.code = 1;
            rs.msg = '删除对象不存在！';
            return rs;
        }

        var data = await this.app.mysql.get('db2').delete('majors',{id: mid});
        rs.code = 0;
        rs.msg = '删除成功！';
        rs.data = data;
        return rs;
    }

    async hasOneWithId(mid){
        var has = await this.app.mysql.get('db2').get('majors',{id: mid});
        return (has!=null);
    }

    async hasAcademy(academyId){
        var has = await this.app.mysql.get('db2').get('academies',{id: academyId});
        return (has!=null)
    }

    async hasOneWithNameIfWithoutSelf(obejct,choice){
        var has = await this.app.mysql.get('db2').get('majors',{name: obejct.name})
        if(!choice){
            return (has!=null)
        }
        return (has!=null)&&(has.id!=obejct.id)
    }
}

module.exports = T_majorsService;
