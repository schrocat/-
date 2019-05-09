'use strict';

const Service = require('egg').Service;
const ACADEMIES = 'academies';
class AcademysService extends Service {
  async index() {
    return await this.ctx.helper.index(ACADEMIES);
  }

  async create(params) {
    return await this.ctx.helper.create(ACADEMIES, params);
  }
  async show(mid) {
    const rs = await this.ctx.helper.show(ACADEMIES,mid);
    return rs;
  }
  async destroy (mid) {
    return await this.ctx.helper.destroy(ACADEMIES,mid)
  }
}

module.exports = AcademysService;
