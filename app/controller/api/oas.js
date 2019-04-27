'use strict';

const Controller = require('egg').Controller;

const create_rule = {
  title: 'string',
  content: 'string',
  type: 'int',
  userId: 'int',
  academyId: 'int',
  files: 'array'
}
const rule = {
  title: {
    type: 'string',
    required: false,
  },
  content: {
    type: 'string',
    required: false,
  },
  type: {
    type: 'int',
    required: false,
  },
  userId: {
    type: 'int',
    required: false,
  },
  academyId: {
    type: 'int',
    required: false
  },
  files: {
    type: 'array',
    required: false,
  }
};
class OasController extends Controller {
  async index() {
    const {ctx} = this;
    const type = ctx.query.type;
    const rs = await this.service.api.oas.index(type);
    ctx.helper.$success(rs);
  }

  async create() {
    const {ctx} = this;
    ctx.validate(create_rule,ctx.request.body);
    const params = {};
    params.title = ctx.request.body.title;
    params.content = ctx.request.body.content;
    params.type = ctx.request.body.type;
    params.academyId = ctx.request.body.academyId;
    params.userId = ctx.request.body.userId;
    params.createdAt = new Date();
    params.updatedAt = new Date();
    const files = ctx.request.body.files;
    const rs = await this.service.api.oas.create(params, files);
    const data = {id: rs.insertId}
    ctx.helper.$success(data);
  }

  async update() {
    const { ctx } = this;
    // ctx.validate(create_rule,ctx.request.body);
    ctx.validate(rule,ctx.request.body);
    const params = ctx.request.body;
    params.updatedAt = new Date();
    params.id = ctx.params.id;
    const hasOne = await this.service.api.oas.show(params.id)
    if(hasOne==null){
      const err = this.config.error;
      ctx.helper.$fail(err.NOT_EXISTED_OBJECT.code,err.NOT_EXISTED_OBJECT.msg);
      return;
    }
    const rs = await this.service.api.oas.update(params);
    ctx.helper.$success(rs,0,'ok',204);
  }

  async destroy() {
    const { ctx } = this;
    const mid = ctx.params.id;
    const hasOne = await this.service.api.oas.show(mid);
    if(hasOne==null){
      const err = this.config.error;
      ctx.helper.$fail(err.NOT_EXISTED_OBJECT.code,err.NOT_EXISTED_OBJECT.msg);
      return;
    }
    const rs = await this.service.api.oas.destroy(mid);
    ctx.helper.$success(rs)
  }

  async show() {
    const { ctx } = this;
    const mid = ctx.params.id;
    const rs = await this.service.api.oas.show(mid);
    ctx.helper.$success(rs);
  }

  async delete() {
    const { ctx } = this;
    const mid = ctx.params.id;
    const hasOne = await this.service.api.oas.show(mid);
    if(hasOne==null){
      const err = this.config.error;
      ctx.helper.$fail(err.NOT_EXISTED_OBJECT.code,err.NOT_EXISTED_OBJECT.msg);
      return;
    }
    const params = {id: mid};
    params.deletedAt = new Date();
    const rs = await this.service.api.oas.update(params)
    ctx.helper.$success(rs);
  }
  async getAllByUserId () {
    const { ctx } = this;
    const id = ctx.request.body.id;
    const type = ctx.request.body.type;
    const rs = await this.service.api.oas.getAllByUserId(id,type);
    ctx.helper.$success(rs)
  }
}

module.exports = OasController;
