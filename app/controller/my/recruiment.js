'use strict';

const Controller = require('egg').Controller;

class RecruimentController extends Controller {
  async index() {
    const {ctx} = this;
    const status = ctx.query.status?ctx.query.status:0;
    const offset = ctx.query.offset?ctx.query.offset:0;
    const pageSize = ctx.query.pageSize?ctx.query.pageSize:1000000;
    const rs = await this.service.my.recruiment.index(offset,pageSize,status);
    ctx.helper.$success(rs);
  }
  async update(){
      const {ctx} = this;
      const params = ctx.request.body;
      params.id = ctx.params.id;
      const rs = await this.service.my.recruiment.update(params);
      ctx.helper.$success(rs);
  }
  async total() {
      const {ctx} = this;
      const rs = await this.service.my.recruiment.total();
      ctx.helper.$success(rs);
  }
}

module.exports = RecruimentController;
