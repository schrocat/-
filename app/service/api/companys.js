'use strict';

const Service = require('egg').Service;

class CompanysService extends Service {
    async index (offset,pageSize) {
        const rs = {};
        var sql = 'select a.id, a.email,a.password,c.name as company '
                  + 'from users as a,`user-infos` as b,companies as c '
                  + 'where a.id = b.id and b.companyId = c.id '
                  + 'order by a.id ';
        const com = await this.ctx.helper.query(sql);
        if((offset) && (pageSize)){
          sql+= 'limit '+offset+','+pageSize;
        }
        const data = await this.ctx.helper.query(sql);
        rs.total = com.length;
        rs.data = data;
        return rs;
    }
    async create(params) {
      
    }
}

module.exports = CompanysService;
