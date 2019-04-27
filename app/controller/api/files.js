'use strict';

const Controller = require('egg').Controller;
const create_rule = {
    oaId: 'int',
    name: 'string',
    url: 'string',
};
class FilesController extends Controller {
    async create () {
        const { ctx } = this;
        ctx.validate(create_rule, ctx.request.body);
        const rs = await this.service.api.files.create(ctx.request.body);
        ctx.helper.$success(rs);
    }
    async findAllById () {
        const {ctx} = this;
        const id = ctx.query.id;
        const rs = await this.service.api.files.findAllById(id)
        ctx.helper.$success(rs)
    }
}

module.exports = FilesController;
