'use strict';

const Service = require('egg').Service;
const USER = 'users';
const USER_INFO = 'user-infos';
class AdministratorService extends Service {
  async index() {
    const sql = 'SELECT a.id,a.email,a.password,c.name AS academy,d.name AS major, b.role,b.id as infoId '+
                'FROM users AS a,`user-infos` AS b,academies AS c,majors AS d '+
                'WHERE a.id = b.id AND b.academyId = c.id AND b.majorId = d.id AND b.role = 5';
    const rs = await this.ctx.helper.query(sql);
    return rs;
  }
  async create (user,info) {
    const rs = await this.ctx.helper.create(USER,user);
    console.log(rs.affectedRows);
    if(rs.affectedRows === 1) {
        info.Id = rs.insertId;
        this.ctx.helper.create(USER_INFO,info);
    }
    return rs;
  }
  async update(user,info) {
    const rs = await this.ctx.helper.update(USER,user)
    this.ctx.helper.update(USER_INFO,info);
    return rs;
  }
  async destroy(mid) {
      const rs = await this.ctx.helper.destroy(USER_INFO,mid);
      if (rs.affectedRows === 1) {
        this.ctx.helper.destroy(USER,mid)
      }
  }
  async findOneByProperties(params){
    const rs = this.ctx.helper.findOneByPropertys(USER,params);
    return rs;
  }
}

module.exports = AdministratorService;
