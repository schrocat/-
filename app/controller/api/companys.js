'use strict';

const Controller = require('egg').Controller;

class CompanysController extends Controller {
    async index() {
        const {ctx} = this;
        const rs = await this.service.api.companys.index();
        ctx.helper.$success(rs);
    }
    async create(params) {
        const {ctx} = this;
    }
}

module.exports = CompanysController;
