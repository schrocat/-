'use strict';

const Service = require('egg').Service;

class StatisticsService extends Service {
  async getWorkProperty(year){
      var sql = 'SELECT a.property,count(a.property) AS count '
                + 'FROM companies AS a,`user-infos` AS b '
                + 'WHERE a.id = b.companyId and b.role = 1 ';
      if(year){
        sql+= `and year(b.graduateTime)=${year} `
      }
      sql+= 'GROUP BY a.property';
      const rs = await this.ctx.helper.query(sql);
      return rs;
  }
  async getLocation (year) {
    var sql = 'select liveLocation from `user-infos` where role = 1 ';
    if(year){
      sql+=`and year(graduateTime)=${year} `
    }
    const rs = await this.ctx.helper.query(sql);
    return rs;
  }
  async getPosition (year) {
    var sql = 'SELECT SUBSTRING_INDEX(liveAddress,\'，\',2) AS area,count(*) AS num '
            + 'FROM `user-infos` '
            + 'WHERE role = 1 ';
    if(year){
      sql += `and year(graduateTime)=${year} `
    }
    sql+= 'GROUP BY SUBSTRING_INDEX(liveAddress,\'，\',2) '
    const rs = this.ctx.helper.query(sql);
    return rs;
  }
  async getERate (year) {
    const rs = [];
    const bYear = year - 5;
    const tSql = 'SELECT year(graduateTime)AS year,count(nowStatus) as total '
              + 'FROM `user-infos` '
              + `WHERE role = 1 AND (year(graduateTime)BETWEEN ${bYear} AND ${year}) `
              + 'GROUP BY year(graduateTime)';
    const trs = await this.ctx.helper.query(tSql);
    for (let i = 0; i < trs.length; i++) {
      var e = trs[i];
      const sql = 'SELECT count(nowStatus) as noGra '
                + 'FROM `user-infos` '
                + `WHERE role = 1 AND year(graduateTime)=${e.year} AND nowStatus!=1 `;
      const nrs = await this.ctx.helper.query(sql);
      e.noWork = nrs[0].noGra >0?nrs[0].noGra:0;
      e.eRate = this.ctx.helper.formatFloat(nrs[0].noGra/e.total,4)
      e.year = e.year.toString()
      rs.push(e);
    }
    return rs;
  }
  async getModus (year) {
    var sql = 'SELECT nowStatus,count(nowStatus) AS num '
            + 'FROM `user-infos` '
            + 'WHERE role = 1 ';
    if(year){
      sql+= `and year(graduateTime)=${year} `;
    }
    sql+= 'GROUP BY nowStatus';
    const rs = [];
    const data = await this.ctx.helper.query(sql);
    for (let i = 0; i < data.length; i++) {
      const e = data[i];
      e.nowStatus = this.setNowStatus(e.nowStatus);
      rs.push(e)
    }
    return rs;
  }
  setNowStatus(s){
    switch (s) {
      case 1:
        return '待就业';
      case 2:
        return '签协议';
      case 3: 
        return '签合同';
      case 4:
        return '升学';
      case 5: 
        return '留学、深造';
      case 6:
        return '自主创业';
      case 7: 
        return '不就业';
      default:
        return '其他'
    }
  }
}

module.exports = StatisticsService;
