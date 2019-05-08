'use strict';

const Service = require('egg').Service;
const USERS = 'users';
class UserService extends Service {
  async show(mid) {
    return await this.ctx.helper.show(USERS,mid)
  }
  async create(params) {
    return await this.ctx.helper.create(USERS,params) 
  }
  async findOneByProperties(params){
    return await this.ctx.helper.findOneByPropertys(USERS,params)
  }
}

module.exports = UserService;
