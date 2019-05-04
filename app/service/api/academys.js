'use strict';

const Service = require('egg').Service;
const ACADEMIES = 'academies';
class AcademysService extends Service {
  async index() {
    const { ctx } = this;
    const rs = await ctx.helper.index('academies');
    return rs;
  }

  async create(params) {
    const {app} = this;
    const rs = await app.mysql.get('db2').insert('academy',params);
    return rs;
  }
  async show(mid) {
    const rs = await this.ctx.helper.show(ACADEMIES,mid);
    return rs;
  }
}

module.exports = AcademysService;
