'use strict';

const Service = require('egg').Service;
const COMPANY = 'company'
class CompanyService extends Service {
  async index(offset,pageSize) {
    // console.log(offset)
    return await this.ctx.helper.selectOnContidition1(COMPANY,{
      limit: pageSize,
      offset: offset,
    })
  }
  async total(){
    const sql = 'select count(*) as total from company';
    return await this.ctx.helper.query1(sql);
  }
  async destroy(mid){
    return await this.ctx.helper.destroy1(COMPANY,mid)
  }
  async show(mid){
    return await this.ctx.helper.show1(COMPANY,mid);
  }
}

module.exports = CompanyService;
