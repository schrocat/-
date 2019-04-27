'use strict';

const Controller = require('egg').Controller;

const create_rule = {
  name: 'string',
  info: 'string',
  academyId: 'int',
};
const update_rule = {
  name: 'string',
  academyId: 'int',
  info: {
    type: 'string',
    required: false,
  }
}
class MajorsController extends Controller {
  async index() {
    const {ctx} = this;
    const rs = await this.service.api.majors.index();
    ctx.helper.$success(rs);
  }

  async create() {
    const {ctx} = this;
    ctx.validate(create_rule,ctx.request.body);
    const params = ctx.request.body;
    params.createdAt = new Date();
    params.updatedAt = new Date();
    const hasOne = await this.service.api.majors.findOneByProperties({name: params.name});
    if(hasOne!=null){
      const err = this.config.error;
      ctx.helper.$fail(err.EXISTED_OBEJCT.code,err.EXISTED_OBEJCT.msg);
      return;
    }
    const rs = await this.service.api.majors.create(params);
    ctx.helper.$success(rs);
  }

  async update() {
    const {ctx} = this;
    ctx.validate(update_rule,ctx.request.body);
    const params = ctx.request.body;
    params.id = ctx.params.id;
    params.updatedAt = new Date();
    const hasOne = await this.service.api.majors.show(params.id);
    if(hasOne==null) {
      const err = this.config.error;
      ctx.helper.$fail(err.NOT_EXISTED_OBJECT.code,err.NOT_EXISTED_OBJECT.msg);
      return;
    }
    const findOne = await this.service.api.majors.findOneByProperties({name: params.name})
    if(findOne!=null && findOne.id!=params.id) {
      const err = this.config.error;
      ctx.helper.$fail(err.EXISTED_OBEJCT.code,err.EXISTED_OBEJCT.msg);
      return;
    }
    const rs = await this.service.api.majors.update(params);
    ctx.helper.$success(rs);
  }

  async destroy() {
    const { ctx } = this;
    const mid = ctx.params.id;
    const hasOne = await this.service.api.majors.show(mid);
    if(hasOne==null){
      const err = this.config.error;
      ctx.helper.$fail(err.NOT_EXISTED_OBJECT.code,err.NOT_EXISTED_OBJECT.msg);
      return;
    }
    const rs = await this.service.api.majors.destroy(mid);
    ctx.helper.$success(rs);
  }
}

module.exports = MajorsController;
