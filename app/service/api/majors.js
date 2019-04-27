'use strict';

const Service = require('egg').Service;

const MAJORS = 'majors';
class MajorsService extends Service {
  async index() {
    const sql = 'SELECT a.id ,a.name,a.info,a.academyId,b.name AS academy_name FROM  majors as a,academies AS b WHERE a.academyId = b.id';
    const rs = await this.ctx.helper.query(sql);
    return rs;
  }

  async create(params) {
    const rs = await this.ctx.helper.create(MAJORS,params);
    return rs;
  }

  async update(params) {
    const rs = await this.ctx.helper.update(MAJORS,params);
    return rs;
  }

  async destroy(mid) {
    const rs = await this.ctx.helper.destroy(MAJORS,mid);
    return rs;
  }
  async show(mid) {
    const rs =await this.ctx.helper.show(MAJORS,mid);
    return rs;
  }
  async findOneByProperties(params) {
    const rs = await this.ctx.helper.findOneByPropertys(MAJORS,params);
    return rs;
  }
}

module.exports = MajorsService;
