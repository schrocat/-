'use strict';

/** @type Egg.EggPlugin */
//config/plugin.js
exports.mysql = {
  enable: true,
  package: 'egg-mysql',
}
exports.validate = {
  enable: true,
  package: 'egg-validate',
}
exports.cors = {
  enable: true,
  package: 'egg-cors',
}
