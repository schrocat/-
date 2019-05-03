'use strict';

const Controller = require('egg').Controller;

const rule = {
  year: {
    type: 'int',
    required:false,
  },
}
class StatisticsController extends Controller {
  async getWorkProperty() {
      const {ctx} = this;
      const year = ctx.query.year;
      const isInt = ctx.helper.isInt(year);
      if(!isInt&&(year)){
        const err = this.config.error;
        ctx.helper.$fail(err.INVALID_PARAMS.code,err.INVALID_PARAMS.msg);
        return;
      }
      const rs = await this.service.api.statistics.getWorkProperty(year);
      ctx.helper.$success(rs);
  }
  async getLocation(){
    const {ctx} = this;
    const year = ctx.query.year;
    const isInt = ctx.helper.isInt(year);
    if(!isInt&&(year)){
      const err = this.config.error;
      ctx.helper.$fail(err.INVALID_PARAMS.code,err.INVALID_PARAMS.msg);
      return;
    }
    const rs =await this.service.api.statistics.getLocation(year);
    ctx.helper.$success(rs)
  }
  async getPosition(){
    const {ctx} = this;
    const year = ctx.query.year;
    const isInt = ctx.helper.isInt(year);
    if(!isInt&&(year)){
      const err = this.config.error;
      ctx.helper.$fail(err.INVALID_PARAMS.code,err.INVALID_PARAMS.msg);
      return;
    }
    const rs = await this.service.api.statistics.getPosition(year);
    ctx.helper.$success(rs);
  }
  async getERate () {
    const {ctx} = this;
    var year = ctx.query.year;
    const isInt = ctx.helper.isInt(year);
    if(!isInt&&(year)){
      const err = this.config.error;
      ctx.helper.$fail(err.INVALID_PARAMS.code,err.INVALID_PARAMS.msg);
      return;
    } 
    if(!year){
      year = new Date().getFullYear();
    }
    const rs =await this.service.api.statistics.getERate(year);
    ctx.helper.$success(rs);
  }
}

module.exports = StatisticsController;
