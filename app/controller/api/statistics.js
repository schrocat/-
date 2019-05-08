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
  async getModus() {
    const {ctx} = this;
    const year = ctx.query.year;
    const isInt = ctx.helper.isInt(year);
    if(!isInt&&(year)){
      const err = this.config.error;
      ctx.helper.$fail(err.INVALID_PARAMS.code,err.INVALID_PARAMS.msg);
      return;
    }
    const rs = await this.service.api.statistics.getModus(year);
    ctx.helper.$success(rs);
  }
  async getDeepTotal() {
    const {ctx} = this;
    const rs = await this.service.api.statistics.getDeepTotal();
    ctx.helper.$success(rs);
  }
  async getDeep(){
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
    const rs =await this.service.api.statistics.getDeep(year);
    ctx.helper.$success(rs);
  }
  async getYSalary(){
    const {ctx} = this;
    var year = ctx.query.year;
    const isInt = ctx.helper.isInt(year);
    if(!isInt&&(year)){
      const err = this.config.error;
      ctx.helper.$fail(err.INVALID_PARAMS.code,err.INVALID_PARAMS.msg);
      return;
    }
    const rs =await this.service.api.statistics.getYSalary(year);
    ctx.helper.$success(rs);
  }
  async getEmployment (){
    const {ctx} = this;
    var year = ctx.query.year;
    const isInt = ctx.helper.isInt(year);
    if(!isInt&&(year)){
      const err = this.config.error;
      ctx.helper.$fail(err.INVALID_PARAMS.code,err.INVALID_PARAMS.msg);
      return;
    }
    const rs =await this.service.api.statistics.getEmployment(year);
    ctx.helper.$success(rs);
  }
  async getEvaluate() {
    const {ctx} = this;
    var year = ctx.query.year;
    const isInt = ctx.helper.isInt(year);
    if(!isInt&&(year)){
      const err = this.config.error;
      ctx.helper.$fail(err.INVALID_PARAMS.code,err.INVALID_PARAMS.msg);
      return;
    }
    const rs =await this.service.api.statistics.getEvaluate(year);
    ctx.helper.$success(rs);
  }
}

module.exports = StatisticsController;
