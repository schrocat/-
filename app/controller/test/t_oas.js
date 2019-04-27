'use strict';

const Controller = require('egg').Controller;

const create_rule = {
    title: 'string',
    content: 'string',
    type: 'int',
    userId: 'int',
}
class T_oasController extends Controller {
    async index() {
        const ctx = this.ctx;
        const rs = await this.service.test.tOas.index();
        ctx.body = {
            data: rs
        };
        ctx.status = 200;
    }
    // 获取一条数据
    async show() {
        const ctx = this.ctx;
        const rs = await this.service.test.tOas.show(ctx.params.id);
        ctx.body = {
            data: rs
        }
        ctx.status = 200;
    }
    async create() {
        const ctx = this.ctx;
        ctx.validate(create_rule,ctx.request.body);
        var params = ctx.request.body;
        params.createdAt = new Date();
        params.updatedAt = new Date();
        const rs = await this.service.test.tOas.create(params);
        ctx.body = {
            data:rs
        }
        ctx.status = 201;
    }
  
    async update() {
        const ctx = this.ctx;
        ctx.validate(create_rule,ctx.request.body);
        var params = ctx.request.body;
        params.id = ctx.params.id;
        params.updatedAt = new Date();
        const rs = await this.service.test.tOas.update(params);
        ctx.body = {
            data:rs
        };
        ctx.status = 200;
        
    }
    async destroy() {
        const ctx = this.ctx;
        const rs = await this.service.test.tOas.destroy(ctx.params.id);
        ctx.body = {
            data: rs
        };
        ctx.status = 200;
    }
    // 暂时性删除
    async delete(){
        const ctx = this.ctx;
        var params = {};
        params.id = ctx.params.id;
        params.deletedAt = new Date();
        const rs =  await this.service.test.tOas.delete(params);
        ctx.body = {
            data:rs
        };
        ctx.status = 200;
    }

}

module.exports = T_oasController;
