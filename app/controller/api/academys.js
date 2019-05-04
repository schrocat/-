'use strict';

const Controller = require('egg').Controller;

const rule = {
  name: 'string',
  info: 'string',
};

const ACADEMIES = 'academies';

class AcademysController extends Controller {
    async index() {
      const {ctx} = this;
      const rs = await ctx.helper.index(ACADEMIES);
      ctx.helper.$success(rs);
    }

    async create() {
      const { ctx } = this;
      ctx.validate(rule,ctx.request.body);
      const params = ctx.request.body;
      params.createdAt = new Date();
      params.updatedAt = new Date();
      const hasOne = await ctx.helper.findOneByPropertys(ACADEMIES,{name: params.name});
      // console.log(hasOne!=null)
      if(hasOne!=null){
        const err = this.config.error;
        ctx.helper.$fail(err.EXISTED_OBJECT.code,err.EXISTED_OBJECT.msg);
        return;
      }
      const rs = await ctx.helper.create(ACADEMIES,params);
      ctx.helper.$success(rs.insertId,0,'插入成功',201)
    }

    async update() {
      const { ctx } = this;
      ctx.validate(rule,ctx.request.body);
      const params = ctx.request.body;
      params.id = ctx.params.id;
      params.updatedAt = new Date();
      const hasOne = await ctx.helper.show(ACADEMIES,params.id);
      const err = this.config.error; 
      if(hasOne==null){
        ctx.helper.$fail(err.NOT_EXISTED_OBJECT.code,err.NOT_EXISTED_OBJECT.msg);
        return;
      }
      const findOne = await ctx.helper.findOneByPropertys(ACADEMIES,{name: params.name});
      if(findOne!=null && findOne.id!=params.id){
        ctx.helper.$fail(err.EXISTED_OBJECT.code,err.EXISTED_OBJECT.msg);
        return;
      }
      await ctx.helper.update(ACADEMIES,params);
      ctx.helper.$success();
    }

    async destroy () {
      const { ctx } = this;//<==> const ctx = this.ctx;
      const mid = ctx.params.id;
      const hasOne = await ctx.helper.show(ACADEMIES,mid);
      if(hasOne==null){
        const err = this.config.error;
        ctx.helper.$fail(err.NOT_EXISTED_OBJECT.code,err.NOT_EXISTED_OBJECT.msg);
        return;
      }
      const rs = await ctx.helper.destroy(ACADEMIES,mid);
      ctx.helper.$success(rs);
    }
    async show () {
      const {ctx} = this;
      const mid = ctx.params.id;
      const rs = await this.service.api.academys.show(mid);
      ctx.helper.$success(rs)
    }
}

module.exports = AcademysController;
