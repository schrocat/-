'use strict';

/**
 * @param {Egg.Application} app - egg application
 */

module.exports = app => {
  const { router, controller } = app;
  // const isLogin = app.middleware.isLogin();
  const isLogin = app.middleware.isLogin();
  router.post('/',isLogin, controller.home.index);

  router.resources('academys','/api/academys',controller.api.academys)
  router.resources('oas','/api/oas',controller.api.oas);
  router.resources('major','/api/majors',controller.api.majors);

  router.post('/api/files',controller.api.files.create);
  router.post('/api/getOas',controller.api.oas.getAllByUserId);
  router.delete('/api/oas/del/:id',controller.api.oas.delete)
};
