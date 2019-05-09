'use strict';

const Service = require('egg').Service;
const POSTS = 'posts'
class PostsService extends Service {
  async index (offset,pageSize,checked) {
      const rs = {};
      const data = await this.ctx.helper.selectOnContidition(POSTS,{
          where: {
              type: 4,
              checked: checked
          },
          orders: [['updatedAt', 'asc']],
          limit:pageSize,
          offset:offset,
      });
      const total = await this.ctx.helper.selectOnContidition(POSTS,{
          where: {
              type: 4,
              checked: checked,
          },
      })
      rs.total = total.length;
      rs.data = data;
      return rs;
  }
}

module.exports = PostsService;
