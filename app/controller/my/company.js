'use strict';

const Controller = require('egg').Controller;

class CompanyController extends Controller {
  async index() {
      const {ctx} = this;
      const offset = ctx.query.offset;
      const pageSize = ctx.query.pageSize;
      console.log(`pageSize=${pageSize},offset=${offset}`)
      const rs = await this.service.my.company.index(offset,pageSize);
      ctx.helper.$success(rs)
    // return await this.ctx.helper.index1(COMPANY);
  }
  async total() {
      const {ctx} = this;
      const rs = await this.service.my.company.total();
      ctx.helper.$success(rs)
  }
  async destroy() {
      const {ctx} = this;
      const mid = ctx.params.id;
      const hasOne = await this.service.my.company.show(mid);
      if(!hasOne){
          const err = this.config.error;
          ctx.helper.$fail(err.NOT_EXISTED_OBJECT.code,err.NOT_EXISTED_OBJECT.msg);
          return;
      }
      const rs = await this.service.my.company.destroy(mid);
      ctx.helper.$success(rs);
  }
}

module.exports = CompanyController;
