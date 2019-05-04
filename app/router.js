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
  router.resources('majors','/api/majors',controller.api.majors);
  router.resources('administrators','/api/administrators',controller.api.administrator);
  router.resources('students','/api/students',controller.api.student);
  router.resources('companies','/api/companies',controller.api.companys)

  router.post('/api/files',controller.api.files.create);
  router.post('/api/getOas',controller.api.oas.getAllByUserId);
  router.delete('/api/oas/del/:id',controller.api.oas.delete);
  router.post('/api/getStudents',controller.api.student.getStudents);
  router.get('/api/getStuTotal',controller.api.student.getTotal);
  router.get('/api/workProperty',controller.api.statistics.getWorkProperty);
  router.get('/api/location',controller.api.statistics.getLocation);
  router.get('/api/position',controller.api.statistics.getPosition);
  router.get('/api/eRate',controller.api.statistics.getERate);
  router.get('/api/modus',controller.api.statistics.getModus);
};
