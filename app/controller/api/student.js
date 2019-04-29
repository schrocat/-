'use strict';

const Controller = require('egg').Controller;
const create_rule = {
    email: 'email',
    password: 'string',
    academyId: 'int',
    majorId: 'int',
    role: 'int',
};
const update_rule = {
    email: {
        type: 'email',
        required: false,
    },
    password: {
        type: 'string',
        required: false,
    },
    academyId: {
        type: 'int',
        required: false,
    },
    majorId: {
        type: 'int',
        required: false,
    },
    role: {
        type: 'int',
        required: false,
    },
};
class StudentController extends Controller {
    async getStudents() {

    }
    async create() {
        const { ctx } = this;
        const user = {};
        const info = {};
        ctx.validate(create_rule,ctx.request.body);
        const tmp = ctx.request.body;
        user.email = tmp.email;
        user.password = ctx.helper.cryptPwd(tmp.email);
        user.createdAt = new Date();
        user.updatedAt =  new Date();
        info.email = tmp.email;
        info.academyId = tmp.academyId;
        info.majorId = tmp.majorId;
        info.role = tmp.role;
        info.createdAt = new Date();
        info.updatedAt = new Date();
        const hasOne =await this.service.api.student.findOneByProperties({email:user.email});
        if(hasOne!=null){
            const err = this.config.error;
            ctx.helper.$fail(err.EXISTED_OBJECT.code,err.EXISTED_OBJECT.msg);
            return;
        }
        const rs = await this.service.api.student.create(user,info);
        return ctx.helper.$success(rs);
    }
    async update() {
        const {ctx} = this;
        const user = {};
        const info = {};
        ctx.validate(update_rule,ctx.request.body)
        const tmp = ctx.request.body;
        const mid = ctx.params.id;
        user.id = mid;
        info.id = mid;
        if (tmp.email) {
            user.email = tmp.email;
            info.email = tmp.email;
        }
        if(tmp.password){
            user.password = ctx.helper.cryptPwd(tmp.password);
        }
        if(tmp.academyId) {
            info.academyId = tmp.academyId;
        }
        if(tmp.majorId) {
            info.majorId = tmp.majorId;
        }
        if(tmp.role) {
            info.role = tmp.role;
        }
        user.updatedAt = new Date();
        info.updatedAt = new Date();
        const hasOne = await this.service.api.student.findOneByProperties({id:mid});
        const err = this.config.error;
        if (hasOne === null) {
          ctx.helper.$fail(err.NOT_EXISTED_OBJECT.code,err.NOT_EXISTED_OBJECT.msg);
          return;
        }
        if(user.email) {
            const findOne = await this.service.api.student.findOneByProperties({email:user.email});
            if(findOne!=null && findOne.id!=user.id){
                ctx.helper.$fail(err.EXISTED_OBJECT.code,err.EXISTED_OBJECT.msg);
                return;
            }
        }
        const rs = await this.service.api.student.update(user,info);
        ctx.helper.$success(rs);
  
    }
    async destroy() {
        const {ctx} = this;
        const mid = ctx.params.id;
        const hasOne = await this.service.api.student.findOneByProperties({id:mid})
        if(hasOne===null){
            const err = this.config.error;
            ctx.helper.$fail(err.NOT_EXISTED_OBJECT.code,err.NOT_EXISTED_OBJECT.msg);
            return;
        }
        const rs = await this.service.api.student.destroy(mid);
        return ctx.helper.$success(rs);
    }
}

module.exports = StudentController;
