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
    var sql = 'select liveLocation, count(liveLocation) as count from `user-infos` where role = 1 and liveLocation is not null ';
    if(year){
      sql+=`and year(graduateTime)=${year} `
    }
    sql+= 'group by liveLocation'
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
                + `WHERE role = 1 AND year(graduateTime)=${e.year} AND nowStatus!=1 and nowStatus!=8 `;
      const nrs = await this.ctx.helper.query(sql);
      e.noWork = nrs[0].noGra >0?nrs[0].noGra:0;
      e.eRate = this.ctx.helper.formatFloat(nrs[0].noGra/e.total,4)
      e.year = e.year.toString()
      rs.push(e);
    }
    return rs;
  }
  // 就业去向
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
  // 深造、创业、升职（总）
  async getDeepTotal(){
    const rs = {}
    const tsql = 'select count(nowStatus) as total '
              + 'from `user-infos` '
              + 'where role = 1 ';
    const total = await this.ctx.helper.query(tsql);
    rs.total = total[0].total;
    const sql = 'select nowStatus,count(nowStatus) as num '
              + 'from `user-infos` '
              + 'where role = 1 and nowStatus in (5,6,7) '
              + 'group by nowStatus';
    const data = [];
    const tmp = await this.ctx.helper.query(sql);
    // console.log(tmp)
    for (let i = 0; i < tmp.length; i++) {
      const e = tmp[i];
      e.nowStatus = this.setNowStatus(e.nowStatus)
      data.push(e)
    }
    rs.data = data;
    return rs;
  }
  async getDeep(year){
    const rs = [];
    const bYear = year - 5;
    const tSql = 'SELECT year(graduateTime)AS year,count(nowStatus) as total '
              + 'FROM `user-infos` '
              + `WHERE role = 1 AND (year(graduateTime)BETWEEN ${bYear} AND ${year}) `
              + 'GROUP BY year(graduateTime)';
    const trs = await this.ctx.helper.query(tSql);
    for (let i = 0; i < trs.length; i++) {
      const e = trs[i];
      const sql = 'SELECT nowStatus, count(nowStatus) as noGra '
                + 'FROM `user-infos` '
                + `WHERE role = 1 AND year(graduateTime)=${e.year} AND nowStatus in (5,6,7) `
                + 'group by nowStatus';
      const nrs = await this.ctx.helper.query(sql);
      var d5 = 0
      var d6 = 0
      var d7 = 0
      for (let i = 0; i < nrs.length; i++) {
        const t = nrs[i];
        if(t.nowStatus === 5){
          d5 = t.noGra
        }
        if(t.nowStatus === 6){
          d6 = t.noGra
        }
        if(t.nowStatus === 7){
          d7 = t.noGra
        }
      }
      
      // e.data = nrs;
      const r = {}
      r.year = e.year.toString()
      r.abroad = this.ctx.helper.formatFloat(d5/e.total,4)
      r.business = this.ctx.helper.formatFloat(d6/e.total,4)
      r.promotion= this.ctx.helper.formatFloat(d7/e.total,4)
      rs.push(r);
    }
    return rs;
  }
  async getYSalary (year) {
    var sql = 'SELECT elt('
            + 'INTERVAL(ySalary,'
            + '30000,40000,50000,60000,70000,80000,90000,100000,110000,120000,130000,140000,150000,160000,170000,180000,190000,200000,400000,600000),'
            + '\'<30k\',\'30k-40k\',\'40k-50k\',\'50k-60k\',\'60k-70k\',\'70k-80k\',\'80k-90k\',\'90k-100k\',\'100k-110k\',\'110k-120k\',\'120k-130k\',\'130k-140k\',\'140k-150k\',\'150k-160k\',\'170k-180k\',\'180k-190k\',\'190k-200k\',\'200k-400k\',\'400k-600k\',\'>=600k\') AS salary_level,count(ySalary) AS count '
            + 'FROM `user-infos` '
            + 'WHERE role = 1 and elt('
            + 'INTERVAL(ySalary,'
            + '30000,40000,50000,60000,70000,80000,90000,100000,110000,120000,130000,140000,150000,160000,170000,180000,190000,200000,400000,600000),'
            + '\'<30k\',\'30k-40k\',\'40k-50k\',\'50k-60k\',\'60k-70k\',\'70k-80k\',\'80k-90k\',\'90k-100k\',\'100k-110k\',\'110k-120k\',\'120k-130k\',\'130k-140k\',\'140k-150k\',\'150k-160k\',\'170k-180k\',\'180k-190k\',\'190k-200k\',\'200k-400k\',\'400k-600k\',\'>=600k\') is not null '
    if(year) {
      sql+= `and year(graduateTime)=${year} `;
    }
    sql+= 'GROUP BY elt('
        + 'INTERVAL(ySalary,'
        + '30000,40000,50000,60000,70000,80000,90000,100000,110000,120000,130000,140000,150000,160000,170000,180000,190000,200000,400000,600000),'
        + '\'<30k\',\'30k-40k\',\'40k-50k\',\'50k-60k\',\'60k-70k\',\'70k-80k\',\'80k-90k\',\'90k-100k\',\'100k-110k\',\'110k-120k\',\'120k-130k\',\'130k-140k\',\'140k-150k\',\'150k-160k\',\'170k-180k\',\'180k-190k\',\'190k-200k\',\'200k-400k\',\'400k-600k\',\'>=600k\')'
    // console.log(sql)
    const rs =  await this.ctx.helper.query(sql);
    return rs;
  }
  async getEmployment(year){
    var sql = 'SELECT b.name as company,count(*) as num '
            + 'FROM `user-infos` AS a,companies as b '
            + 'WHERE a.companyId = b.id and a.role = 1 ';
    if(year){
      sql+= `and year(graduateTime)=${year} `;
    }
    sql+= 'GROUP BY a.companyId';
    const rs = await this.ctx.helper.query(sql);
    return rs;
  }
  async getEvaluate (year) {
    var sql = 'SELECT evaluate,count(evaluate) AS num '
            + 'FROM `user-infos` '
            + 'WHERE role = 1 ';
    if(year){
      sql+= `and year(graduateTime)=${year} `;
    }
    sql += 'GROUP BY evaluate';
    const rs = await this.ctx.helper.query(sql);
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
      case 8: 
        return '不就业';
      case 7:
        return '升职'
      default:
        return '其他'
    }
  }
}

module.exports = StatisticsService;
