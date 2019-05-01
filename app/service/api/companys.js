'use strict';

const Service = require('egg').Service;

class CompanysService extends Service {
    async index (offset,pageSize) {
        const sql = 'select a.id, a.email,a.password,c.name as company '
                  + 'from users as a,`user-infos` as b,companies as c '
                  + 'where a.id = b.id and b.companyId = c.id '
                  + 'order by a.id '
                  + 'limit '+offset+','+pageSize;
        const rs = this.ctx.helper.query(sql);
        return rs;
    }
}

module.exports = CompanysService;
