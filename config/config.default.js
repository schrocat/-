/* eslint valid-jsdoc: "off" */

'use strict';

/**
 * @param {Egg.EggAppInfo} appInfo app info
 */
module.exports = appInfo => {
  /**
   * built-in config
   * @type {Egg.EggAppConfig}
   **/
  const config = {};

  // use for cookie sign key, should change to your own and keep security
  config.keys = appInfo.name + '_1552613374706_3674';

  // add your middleware config here
  config.middleware = ['errorHandler'];
  config.errorHandler = {
    match: '/api'
  }
  // config params for egg-mysql
  config.mysql = {
    clients: {
      db2: {
        host: '182.254.231.154',
        port: '3306',
        user: 'root',
        password: 'remote14glwu',
        database: 'stuer',
      },
    },
    app: true,
    agent: false
  }

  config.pwdSecrect = 'thisisapwdsecrect';

  config.security = {
    csrf: {
      enable: false,
      ignoreJSON: true
    },
    domainWhiteList: ['*']
  };
  config.cors = {
    origin: '*',
    allowMethods: 'GET,HEAD,PUT,POST,DELETE,PATCH'
  };

  config.error = {
    INVALID_AUTH_TOKEN: {
      code: 1001,
      name: 'INVALID_AUTH_TOKEN',
      msg: 'auth_token校验失败',
    },

    EXISTED_OBJECT: {
      code: 1002,
      name: 'EXISTED_OBJECT',
      msg: '对象已经存在',
    },

    NOT_EXISTED_OBJECT: {
      code: 1003,
      name: 'NOT_EXISTED_OBJECT',
      msg: '对象不存在',
    },
    PASSWORD_ERROR: {
      code: 1004,
      name: 'PASSWORD_ERROR',
      msg: '密码错误！',
    },
    USERNAME_ERROR: {
      code: 1005,
      name: 'USERNAME_ERROR',
      msg: '用户名不存在',
    }
  }

  // add your user config here
  const userConfig = {
    // myAppName: 'egg',
  };

  return {
    ...config,
    ...userConfig,
  };
};
