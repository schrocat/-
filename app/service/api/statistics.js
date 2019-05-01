'use strict';

const Service = require('egg').Service;

class StatisticsService extends Service {
  async getWorkProperty(){
      const sql = 'SELECT a.property,count(a.property) AS count '
                + 'FROM companies AS a,`user-infos` AS b '
                + 'WHERE a.id = b.companyId '
                + 'GROUP BY a.property';
      const rs = await this.ctx.helper.query(sql);
      return rs;
  }
}

module.exports = StatisticsService;
