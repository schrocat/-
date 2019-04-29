'use strict';

const Service = require('egg').Service;

const USER = 'users';
const USER_INFO = 'user-infos';

class StudentService extends Service {
  async getStudents(params) {
    const sql = 'SELECT a.id,a.email,c.name AS academy,d.name AS major,b.role '
                + 'FROM users as a,`user-infos`AS b,academies as c,majors AS d '
                + 'WHERE a.id = b.id AND b.academyId =c.id AND  b.academyId = d.id AND (b.role = 1 OR b.role = 2)';
    if(params.academyId){
        sql += ` and b.academyId = ${params.academyId}`;
    }
    if(params.majorId) {
        sql += ` and b.majorId = ${params.majorId}`;
    }
    const rs = this.ctx.helper.query(sql)
    return rs;
  }

  async create (user,info) {
    const conn = await this.ctx.helper.transaction();
    console.log(conn)
    try {
        const rs = await conn.insert(USER,user);
        console.log(rs)
        if(rs.affectedRows === 1){
            info.id = rs.insertId;
            await conn.insert(USER_INFO,info);
        }
        await conn.commit();
        return rs;
    } catch (e) {
        await conn.rollback();
    }
    return null;
  }
  async update(user,info) {
    const conn = await this.ctx.helper.transaction();
    try {
        const rs = await conn.update(USER,user);
        if(rs.affectedRows === 1){
            await conn.update(USER_INFO,info);
        }
        await conn.commit();
        return rs;
    } catch (e) {
        await conn.rollback();
    }
    return null;
  }
  async destroy(mid) {
      const conn = await this.ctx.helper.transaction();
      try {
          const rs = await conn.delete(USER_INFO,{id:mid})
          console.log(rs)
          if(rs.affectedRows === 1) {
            const tmp = await conn.delete(USER,{id:mid})
            console.log(tmp)
          }
          await conn.commit();
          return rs;
      } catch (e) {
          await conn.rollback();
      }
      return null;
  }
  async findOneByProperties(params){
    const rs = this.ctx.helper.findOneByPropertys(USER,params);
    return rs;
  }
}

module.exports = StudentService;