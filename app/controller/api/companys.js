'use strict';

const Controller = require('egg').Controller;

class CompanysController extends Controller {
    async index() {
        const {ctx} = this;
        const rs = await this.service.api.companys.index(0,10);
        ctx.helper.$success(rs);
    }
}

module.exports = CompanysController;
