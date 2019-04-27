'use strict';

const Service = require('egg').Service;

const MAJORS = 'majors';
class MajorsService extends Service {
  async index() {
    const rs = await this.ctx.helper.index(MAJORS);
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
    const rs = await this.ctx.helper.findOneByPropertys(params);
    return rs;
  }
}

module.exports = MajorsService;
