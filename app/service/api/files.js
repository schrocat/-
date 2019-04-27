'use strict';

const Service = require('egg').Service;

const OA_FILES = 'oa_files';

class FilesService extends Service {
    async create (params) {
        const rs = this.ctx.helper.create(OA_FILES, params);
        return rs;
    }

    async findAllByOaId (id) {
        const rs = this.ctx.helper.selectOnContidition(OA_FILES,{
            where: {oaid: id}
        });
        return rs;
    }
}

module.exports = FilesService;
