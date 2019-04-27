'use strict';

const Controller = require('egg').Controller;

class HomeController extends Controller {
  async index() {
    const { ctx } = this;
    ctx.body = 'hi, egg';
  }
  async users() {
    this.ctx.body = await this.app.mysql.query("select * from academy","");
  }
  // async addUser() {
  //   const rs = await this.app.mysql.insert('users',{id: '1'});
  //   console.log(rs);
  // }
}

module.exports = HomeController;
