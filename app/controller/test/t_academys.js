'use strict';

const Controller = require('egg').Controller;

const createRule = {
  name: 'string',
  info: 'string',
}

class T_academysController extends Controller {
  async index() {
    const ctx = this.ctx;
    const rs = await this.service.test.tAcademys.index();
    ctx.body = {
      data: rs
    };
    ctx.status = 200;
  }

  async create() {
    const ctx = this.ctx;
    ctx.validate(createRule,ctx.request.body);
    var params = ctx.request.body;
    params.createdAt = new Date();
    params.updatedAt = new Date();
    const rs = await this.service.test.tAcademys.create(params);
    ctx.body = {
      data: rs
    }
    ctx.status = 201;
  }
  async update() {
    // console.log('has put');
    const ctx = this.ctx;
    const params = {};
    params.id = parseInt(ctx.params.id);
    ctx.validate(createRule,ctx.request.body);
    params.name = ctx.request.body.name;
    params.info = ctx.request.body.info;
    params.updatedAt = new Date();
    // console.log(params)
    const rs = await this.service.test.tAcademys.update(params);
    console.log(rs)
    ctx.body = {
      data: rs
    }
    ctx.status = 200;
  }
  async destroy() {
    const ctx = this.ctx;
    const rs = await this.service.test.tAcademys.destroy(ctx.params.id);
    ctx.body = {
      data:rs
    }
    ctx.status = 202;
  }
}

module.exports = T_academysController;
