'use strict';

const Controller = require('egg').Controller;

class CompanyController extends Controller {
  async index() {
      const {ctx} = this;
      const offset = ctx.query.offset?parseInt(ctx.query.offset):0;
      const pageSize = ctx.query.pageSize?parseInt(ctx.query.pageSize):1000000;
      const rs = await this.service.my.company.index(offset,pageSize);
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
