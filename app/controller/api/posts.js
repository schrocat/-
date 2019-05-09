'use strict';

const Controller = require('egg').Controller;

class PostsController extends Controller {
    async index(){
        const {ctx} = this;
        const checked = ctx.query.checked?parseInt(ctx.query.checked):1;
        const offset = ctx.query.offset?parseInt(ctx.query.offset):0;
        const pageSize = ctx.query.pageSize?parseInt(ctx.query.pageSize):1000000
        const rs = await this.service.api.posts.index(offset,pageSize,checked);
        ctx.helper.$success(rs);
    }
}

module.exports = PostsController;
