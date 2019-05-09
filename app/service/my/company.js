'use strict';

const Service = require('egg').Service;
const COMPANY = 'company'
class CompanyService extends Service {
  async index(offset,pageSize) {
    const rs = {}
    const data = await this.ctx.helper.selectOnContidition1(COMPANY,{
      limit: pageSize,
      offset: offset,
    });
    const total = await this.ctx.helper.index1(COMPANY);
    rs.total = total.length;
    rs.data = data;
    return rs;
  }
  async destroy(mid){
    return await this.ctx.helper.destroy1(COMPANY,mid)
  }
  async show(mid){
    return await this.ctx.helper.show1(COMPANY,mid);
  }
}

module.exports = CompanyService;
