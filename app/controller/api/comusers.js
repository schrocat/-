'use strict';

const Controller = require('egg').Controller;

class ComusersController extends Controller {
  async index() {
      const {ctx} = this;
      const offset = parseInt(ctx.query.offset);
      const pageSize = parseInt(ctx.query.pageSize);
      const rs = await this.service.api.comusers.index(offset,pageSize);
      for(let i = 0;i<rs.length; i++){
        const company = await this.service.api.companys.show(rs[i].companyId);
        rs[i].company = company.name?company.name:'';
        const password = await this.service.api.user.show(rs[i].id);
        rs[i].password = password.password;
      }
      ctx.helper.$success(rs);
  }
  async create() {
      const {ctx} = this;
      const params = ctx.request.body;
      const password = ctx.helper.cryptPwd(params.password)
      const user = {
          email: params.email,
          password: password,
          createdAt: new Date,
          updatedAt: new Date
      }
      const com = params.company;
      com.createdAt = new Date;
      com.updatedAt = new Date;
      const info = {
          email:params.email,
          role:4,
          certifyType:1,
          createdAt: new Date,
          updatedAt: new Date
      }
      const hasOne = await this.service.api.user.findOneByProperties({email:user.email});
      const hasOneCom = await this.service.api.companys.findOneByProperties({name:com.name})
      if(hasOne || hasOneCom){
        const err = this.config.error;
        ctx.helper.$fail(err.EXISTED_OBJECT.code,err.EXISTED_OBJECT.msg);
        return;
      }
      const rs = await this.service.api.comusers.create(user,info,com)
      ctx.helper.$success(rs)
  }
  async update() {
    const {ctx} = this;
    const params = ctx.request.body;
    const mid = ctx.params.id;
    const findOne = await this.service.api.user.show(mid)
    const findOneInfo = await this.service.api.comusers.show(mid)
    if(!findOne || !findOneInfo){
      const err = this.config.error;
      ctx.helper.$fail(err.NOT_EXISTED_OBJECT.code,err.NOT_EXISTED_OBJECT.msg);
      return;
    }
    const user = {
      id:mid,
      email: params.email?params.email:findOne.email,
      password: params.password?ctx.helper.cryptPwd(params.password):findOne.password,
      updatedAt:new Date()
    }
    const info = {
      id:mid,
      email:user.email,
      updatedAt:new Date()
    }
    const com = {};
    com.id = findOneInfo.companyId;
    com.name = params.company.name;
    com.updatedAt = new Date();
    const hasOne = await this.service.api.user.findOneByProperties({email:user.email});
    const hasOneCom = await this.service.api.companys.findOneByProperties({name:com.name});
    if((hasOne&&hasOne.id!=user.id)||(hasOneCom&&hasOneCom.id!=com.id)){
      const err = this.config.error;
      ctx.helper.$fail(err.EXISTED_OBJECT.code,err.EXISTED_OBJECT.msg);
      return;
    }
    await this.service.api.comusers.update(user,info,com);
    ctx.helper.$success();
  }
  async destroy() {
    const {ctx} = this;
    const mid = ctx.params.id
    const hasOne = await this.service.api.comusers.show(mid);
    if(!hasOne){
      const err = this.config.error;
      ctx.helper.$fail(err.NOT_EXISTED_OBJECT.code,err.NOT_EXISTED_OBJECT.msg);
      return;
    }
    const cid = hasOne.companyId;
    console.log(cid)
    const rs = await this.service.api.comusers.destroy(mid,cid);
    ctx.helper.$success(rs);
  }
}

module.exports = ComusersController;
