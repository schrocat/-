'use strict';

module.exports = appInfo => {
  const config = {};

  /**
   * @member Config#mysql
   * @property {String} KEY - description
   */
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
  };
  return config;
};
