'use strict';

const Controller = require('egg').Controller;

class CompanysController extends Controller {
    async index() {
        const {ctx} = this;
        const offset = ctx.query.offset;
        const pageSize = ctx.query.pageSize;
        const rs = await this.service.api.companys.index(offset,pageSize);
        ctx.helper.$success(rs);
    }
    async create() {

    }
}

module.exports = CompanysController;
