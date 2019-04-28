'use strict';

const Controller = require('egg').Controller;

const create_rule = {
    email: 'email',
    password: 'string',
    academyId: 'int',
    majorId: 'int',
};
class AdministratorController extends Controller {
  async index() {
      const { ctx } = this;
      const rs = await this.service.api.administrator.index();
      ctx.helper.$success(rs);
  }
  async create() {
      const { ctx } = this;
      const user = {};
      const info = {};
      ctx.validate(create_rule,ctx.request.body);
      const tmp = ctx.request.body;
      user.email = tmp.email;
      user.password = ctx.helper.cryptPwd(tmp.email);
      user.createdAt = new Date();
      user.updatedAt =  new Date();
      info.email = tmp.email;
      info.academyId = tmp.academyId;
      info.majorId = tmp.majorId;
      info.role = 5;
      info.createdAt = new Date();
      info.updatedAt = new Date();
      const hasOne =await this.service.api.administrator.findOneByProperties({email:user.email});
      if(hasOne!=null){
          const err = this.config.error;
          ctx.helper.$fail(err.EXISTED_OBJECT.code,err.EXISTED_OBJECT.msg);
          return;
      }
      const rs = await this.service.api.administrator.create(user,info);
      return ctx.helper.$success(rs);
  }

  async destroy() {
      const {ctx} = this;
      const mid = ctx.params.id;
      const hasOne = await this.service.api.administrator.findOneByProperties({id:mid})
      if(hasOne===null){
          const err = this.config.error;
          ctx.helper.$fail(err.NOT_EXISTED_OBJECT.code,err.NOT_EXISTED_OBJECT.msg);
          return;
      }
      const rs = await this.service.api.administrator.destroy(mid);
      return ctx.helper.$success(rs);
  }
}

module.exports = AdministratorController;
