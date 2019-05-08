'use strict';

const Service = require('egg').Service;
const RECRUIMENT = 'recruitment'
class RecruimentService extends Service {
    async index(offset,pageSize,status){
        return await this.ctx.helper.selectOnContidition1(RECRUIMENT,{
            where: {
                status: status,
                type: 4
            },
            limit: pageSize,
            offset: offset,
        })
    }
    async update(params){
        return await this.ctx.helper.update1(RECRUIMENT,params);
    }
    async total(){
        const sql = 'select count(*) as total from recruitment where status = 0'
        return await this.ctx.helper.query1(sql);
    }
}

module.exports = RecruimentService;
