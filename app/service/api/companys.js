'use strict';

const Service = require('egg').Service;
const COMPANIES = 'companies'
class CompanysService extends Service {
    async index () {
      return this.ctx.helper.index(COMPANIES);
    }
    async create(params) {
      const rs = await this.ctx.helper.create(COMPANIES,params);
      return rs.InsertId;
    }
    async update(params) {
      const rs = await this.ctx.helper.update(COMPANIES,params);
      return rs;
    }
    async destroy(mid) {
      const rs = await this.ctx.helper.destroy(COMPANIES,mid);
      return rs;
    }
    async show(mid){
      const rs = await this.ctx.helper.show(COMPANIES,mid);
      return rs;
    }
    async findOneByProperties(params){
      return await this.ctx.helper.findOneByPropertys(COMPANIES,params);
    }
}

module.exports = CompanysService;
