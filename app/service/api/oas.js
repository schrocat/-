'use strict';

const Service = require('egg').Service;

const OAS = 'oas';

class OasService extends Service {
  async index(type,offset,pageSize) {
    var sql = '';
    const rs = {};
    if(type!='del'){
        sql = 'select a.id as id,title,content,type,email,c.name as academy from oas as a,users as b,academies as c where a.userId = b.id and a.academyId = c.id and a.deletedAt is null ';
    }else{
        sql = 'select a.id as id,title,content,type,email,c.name as academy from oas as a,users as b,academies as c where a.userId = b.id and a.academyId = c.id and a.deletedAt is not null ';
    }
    const total = await this.ctx.helper.query(sql);
    if((offset)&&(pageSize)){
        sql+=`limit ${offset},${pageSize}`;
    }
    const data =  await this.ctx.helper.query(sql);
    rs.total = total.length;
    rs.data = data;
    return rs;
  }

  async create(params, files) {
    const rs = await this.ctx.helper.create(OAS,params);
    const id = rs.insertId;
    for( var i = 0;i<files.length; i++){
      var p = files[0];
      p.oaId = id;
      this.service.api.files.create(p);
    }
    return rs;
  }

  async update(params) {
    return await this.ctx.helper.update(OAS,params)
  }

  async destroy(mid) {
    return await this.ctx.helper.destroy(OAS,mid)
  }

  async show(mid) {
    const rs = await this.ctx.helper.show(OAS, mid);
    if(rs!==null){
      const tmp_u = await this.ctx.helper.findOneByPropertys('users',{id: rs.userId});
      const tmp_a = await this.ctx.helper.findOneByPropertys('academies',{id: rs.academyId});
      rs.email = tmp_u.email;
      rs.academy_name = tmp_a.name;
      rs.files = await this.service.api.files.findAllByOaId(mid);
    }
    return rs;
  }
  
  async getAllByUserId(id, type) {
    if(type!='del'){
      const sql = `select a.id as id,title,content,type,email,c.name as academy from oas as a,users as b,academies as c where a.userId = b.id and a.academyId = c.id and a.deletedAt is null and a.userId = ${id}`;
        return await this.ctx.helper.query(sql);
      }else{
      const sql = `select a.id as id,title,content,type,email,c.name as academy from oas as a,users as b,academies as c where a.userId = b.id and a.academyId = c.id and a.deletedAt is not null and a.userId = ${id}`;
      return await this.ctx.helper.query(sql);
    }
  }
}

module.exports = OasService;
