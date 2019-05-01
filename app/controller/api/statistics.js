'use strict';

const Controller = require('egg').Controller;

class StatisticsController extends Controller {
  async getWorkProperty() {
      const {ctx} = this;
      const rs = await this.service.api.statistics.getWorkProperty();
      ctx.helper.$success(rs);
  }
}

module.exports = StatisticsController;
