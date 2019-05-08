'use strict';

const Service = require('egg').Service;
const USER_INFOS = 'user-infos';
const COMPANIES = 'companies';
const USERS = 'users';
class ComusersService extends Service {
  async index (offset,pageSize) {
      const comuser = await this.ctx.helper.selectOnContidition(USER_INFOS,{
        where: {
            role:4,
        },
        limit:pageSize,
        offset:offset
      })
      return comuser
  }
  async create (user,info,com) {
    const conn = await this.ctx.helper.transaction();
    try {
        const ur = await conn.insert(USERS,user);
        const cr = await conn.insert(COMPANIES,com);
        info.id = ur.insertId;
        info.companyId = cr.insertId;
        // console.log(info)
        const ir = await conn.insert(USER_INFOS,info);
        await conn.commit();
        return ir;
    } catch (e) {
        await conn.rollback();
    }
  }
  async update(user,info,com){
    const conn = await this.ctx.helper.transaction();
    try {
        await conn.update(USERS,user);
        await conn.update(USER_INFOS,info);
        await conn.update(COMPANIES,com);
        await conn.commit();
    } catch (e) {
        await conn.rollback();
    }
  }
  async destroy(mid,cid){
    const conn = await this.ctx.helper.transaction();
    try {
      await conn.delete(COMPANIES,{id:cid});
      await conn.delete(USER_INFOS,{id:mid});
      await conn.delete(USERS,{id:mid});
      await conn.commit();
    } catch (e) {
      await conn.rollback();
    }
  }
  async findOneByProperties (params) {
      return await this.ctx.helper.findOneByPropertys(USER_INFOS,params)
  }
  async show (mid) {
      return await this.ctx.helper.show(USER_INFOS,mid);
  }
}

module.exports = ComusersService;
