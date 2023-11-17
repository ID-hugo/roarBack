const usersController = require('../controllers/usersController');
const clasesController = require('../controllers/clasesController');
const verifyToken = require('../middlewares/verifyTokens');
const reservasController = require ('../controllers/reservasController');

module.exports = (app) => {

  app.post('/api/users/create', usersController.register);
  app.post('/api/users/login', usersController.login);


  app.get('/api/users/profile', verifyToken, usersController.getUserProfile);
  
  app.get('/api/users/alumno', verifyToken, usersController.getUserRolAlumno);

  app.post('/api/reservas/create', verifyToken, reservasController.createReserva);
  app.get('/api/reservas/alumno/getreservas', verifyToken, reservasController.getReservas);
  app.get('/api/reservas/reservasAlumno', verifyToken, reservasController.getReservas2);

  
  app.put('/api/users/update/useralumno', verifyToken, usersController.updateUserAlumno);

  app.post('/api/clases/createClaseCopia', verifyToken, clasesController.createClaseCopia);
  app.get('/api/clases/reservasAlumno', verifyToken, clasesController.getClasesUser);



  app.get('/api/clases', verifyToken, clasesController.getAllClases);
 
  app.post('/api/clases/create', verifyToken, clasesController.createClase);
  
  app.get('/api/reservas/reservasAlumno', verifyToken, clasesController.getClasesUser);

  app.delete('/api/reservas/deletereserva', verifyToken, reservasController.deleteReserva);

  app.get('/api/users/profile/alumno', verifyToken, usersController.getAlumnoProfile);
  app.get('/api/users/usersRoles', verifyToken, usersController.getUsersRoles);
  app.get('/api/users/allusers', verifyToken, usersController.getAllUsers);
  app.get('/api/users/allAlumnos', verifyToken, usersController.getAllAlumnos);

  app.get('/api/clases', verifyToken, clasesController.getAllClases);
  app.get('/api/clasesCopia', verifyToken, clasesController.getAllClasesCopia);
  
  app.put('/api/users/update-profile', verifyToken, usersController.update)

  
  app.get('/api/clasesCopia', verifyToken, clasesController.getAllClasesCopia);
  


  app.post('/api/users/change-password', verifyToken, usersController.changePassword);
  app.post('/api/users/check-current-password', verifyToken, usersController.checkCurrentPassword);

  
}