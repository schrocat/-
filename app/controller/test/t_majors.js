'use strict';

const Controller = require('egg').Controller;

const create_rule = {
    name: 'string',
    info: 'string',
    // academyId: 'int',
}

class T_majorsController extends Controller {
    async index() {
        const ctx = this.ctx;
        const rs = await this.service.test.tMajors.index();
        ctx.body = {
            data: rs
        }
        ctx.status = 200;
    }
    async create() {
        const ctx = this.ctx;
        ctx.validate(create_rule,ctx.request.body);
        const params = ctx.request.body;
        params.createAt = new Date();
        const rs = await this.service.test.tMajors.create(params);
        ctx.body = {
            data:rs
        }
        ctx.status = 201;
    }
  
    async update() {
        const ctx = this.ctx;
        ctx.validate(create_rule,ctx.request.body);
        const params = ctx.request.body;
        params.id = ctx.params.id;
        params.updateAt = new Date();
        const rs = await this.service.test.tMajors.update(params);
        ctx.body = {
            data:rs
        }
        ctx.status = 200;
    }
    async destroy() {
        const ctx = this.ctx;
        const rs = await this.service.test.tMajors.destroy(ctx.params.id);
        ctx.body = {
            data:rs
        };
        ctx.status = 200;
    }
}

module.exports = T_majorsController;
