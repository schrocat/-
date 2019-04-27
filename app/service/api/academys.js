'use strict';

const Service = require('egg').Service;

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

  async update(params) {
    
  }
}

module.exports = AcademysService;
