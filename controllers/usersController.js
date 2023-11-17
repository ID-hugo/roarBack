const User = require('../models/user');
const Alumno = require('../models/alumno');
const bcrypt = require('bcryptjs')
const { secretKey } = require('../config/configKey')
const jwt = require('jsonwebtoken')
const admin = require('firebase-admin');

module.exports = {

    register(req, res) {

        const user = req.body; // capturo datos enviados desde el cliente

        User.create(user, (err, data) => {

            if(err){
                return res.status(501).json({
                    succes: false,
                    message: 'Hubo un error con el registro del usuario',
                    error: err
                });
            }

            return res.status(201).json({
                succes: true,
                message: 'El registro se realizo correctamente',
                data: data
            });
            
        });


    },

    login(req, res) {

        const email = req.body.email;
        const password = req.body.password;

        User.findByEmail(email, async (err, data) => {


            if(err){
                return res.status(501).json({
                    success: false,
                    message: 'Hubo un error con el registro de usuario',
                    error: err 
                });
            }

            if(!data) {
                return res.status(401).json({// el cliente no tiene autorizacion para la peticion
                    success: false,
                    message: 'El email no fue encontrado',
                });
            }

            const isPasswordValid = await bcrypt.compare(password, data.password);

            if(isPasswordValid){

                const token = jwt.sign({ id: data.id, email: data.email }, secretKey,{});

                return res.status(201).json({
                    success: true,
                    message: 'el Usuario fue autenticado',
                    token: token  
    
                });

            }else{

                return res.status(401).json({// el cliente no tiene autorizacion para la peticion
                    success: false,
                    message: 'El password o el email es incorrecto',
                });

            }
        });    

    },
    getUserProfile(req, res) {
        const userId = req.user.id; // El ID del usuario se obtiene del token JWT

        User.findById(userId, async (err, data) => {
            if(err){
                return res.status(501).json({
                    success: false,
                    message: 'Hubo un error con la busqueda de usuario de usuario',
                    error: err 
                });
            }
            console.log(data);
            return res.status(200).json({ 
                success: true,
                message: 'Usuario encontrado', 
                data: data,
                
            });

        });
    },
    getAlumnoProfile(req, res) {

        const userId = req.user.id; // El ID del usuario se obtiene del token JWT

        Alumno.findById(userId, async (err, data) => {
            if(err){
                return res.status(501).json({
                    success: false,
                    message: 'Hubo un error con la busqueda de usuario de usuario',
                    error: err 
                });
            }
            console.log(data);
            return res.status(200).json({ 
                success: true,
                message: 'Usuario encontrado', 
                data: data,
                
            });

        });
    },
    getUserRolAlumno(req, res) {  //DEVUEVLO LA INFORMACION DEL ROL EN ESTE CASO ALUMNO

        const userId = req.user.id; // El ID del usuario se obtiene del token JWT

        Alumno.findById(userId, async (err, data) => {
            if(err){
                return res.status(501).json({
                    success: false,
                    message: 'Hubo un error con la busqueda de usuario de usuario',
                    error: err 
                });
            }
            console.log(data);
            return res.status(200).json({ 
                success: true,
                message: 'Usuario encontrado', 
                data: data,
                
            });

        });
    },
    createAlumno(req, res){
        const userId = req.user.id;

        Alumno.create(userId, (err, data) => {

            if(err){
                return res.status(501).json({
                    succes: false,
                    message: 'Hubo un error con el registro de alumno',
                    error: err
                });
            }

            return res.status(201).json({
                succes: true,
                message: 'El registro de Alumno se realizo correctamente',
                data: data
            });

            
        });
    },
    getUsersRoles(req, res) {

        const userId = req.user.id; // El ID del usuario se obtiene del token JWT

        User.findByIdToRol(userId, async (err, data) => {
            if(err){
                return res.status(501).json({
                    success: false,
                    message: 'Hubo un error con la busqueda de usuario de usuario',
                    error: err 
                });
            }
            console.log(data);
            return res.status(200).json({ 
                success: true,
                message: 'Usuario encontrado', 
                data: data,
                
            });

        });
    },
    getAllUsers(req,res){

        User.findAllUsers(async (err, data) => {
            if(err){
                return res.status(501).json({
                    success: false,
                    message: 'Hubo un error con la busqueda de usuarios',
                    error: err 
                });
            }
            return res.status(200).json({ 
                success: true,
                message: 'usuarios encontrados', 
                data: data,
                
            });

        });
    },
    getAllAlumnos(req,res){

        Alumno.findAllAlumnos(async (err, data) => {
            if(err){
                return res.status(501).json({
                    success: false,
                    message: 'Hubo un error con la busqueda de usuarios',
                    error: err 
                });
            }
            return res.status(200).json({ 
                success: true,
                message: 'alumnos encontrados', 
                data: data,
                
            });

        });
    },

    updateUserAlumno(req,res){

        console.log(req.body);
        console.log(req.user);

        const user = req.body

        Alumno.updateAlumno(user,async (err, data) => {
            if(err){
                return res.status(501).json({
                    success: false,
                    message: 'Hubo un error al actualizar el alumno',
                    error: err 
                });
            }
            return res.status(200).json({ 
                success: true,
                message: 'alumno actualizado correctamente', 
                data: data,
                
            });

        });        
    },
    
    async update (req, res) {
        const userId = req.user.id; // Obtener el ID del usuario desde el token JWT
        const user = req.body;
        user.id = userId; // Asignar el ID del usuario al objeto user
        console.log('DATA DEL CLIENTE ', user);
        console.log("EL BICHO ", userId);

        User.update(user, userId, async(err, data) => {
            if(err){
                return res.status(501).json({
                    success: false,
                    message: 'Hubo un error con el registro del usuario',
                    error: err
                });
            }

            return res.status(201).json({
                success: true,
                message: 'Usuario actualizado correctamente',
                data: user
            });
        });
    },
    async changePassword(req, res) {
        try {
          const userId = req.user.id; // Obtener el ID del usuario desde el token JWT
          const { newPassword } = req.body;
    
          // Validar que la nueva contraseña tenga el formato adecuado o cualquier otra validación necesaria
    
          const hash = await bcrypt.hash(newPassword, 10);
    
          // Actualizar la contraseña en la base de datos
          User.changePassword(userId, hash, (err, data) => {
            if (err) {
              return res.status(500).json({
                success: false,
                message: 'Error al cambiar la contraseña.',
                error: err,
              });
            }
    
            return res.status(200).json({
              success: true,
              message: 'Contraseña cambiada con éxito.',
              data: data,
            });
          });
        } catch (error) {
          console.error('Error al cambiar la contraseña:', error);
          return res.status(500).json({
            success: false,
            message: 'Error al cambiar la contraseña.',
            error: error,
          });
        }
      },
      async checkCurrentPassword(req, res) {
        const userId = req.user.id; // El ID del usuario se obtiene del token JWT
        const { currentPassword } = req.body;
        console.log(' NOUUUU '+currentPassword);
        console.log(' SIUUU  '+userId);
    
        User.checkCurrentPassword(userId, async (err, result) => {
          if (err) {
            return res.status(501).json({
              success: false,
              message: 'Hubo un error con la búsqueda del usuario',
              error: err,
            });
          }
    
          if (!result) {
            return res.status(401).json({
              success: false,
              message: 'El usuario no fue encontrado',
            });
          }
        
          const isPasswordValid = await bcrypt.compare(currentPassword, result.password);
    
          if (isPasswordValid) {
            return res.status(200).json({
              success: true,
              message: 'La contraseña actual es válida',
            });
          } else {
            return res.status(401).json({
              success: false,
              message: 'La contraseña actual no es válida',
            });
          }
        });
      },

      
};
    

/*
async updateNotificationToken(req, res){
        
    const id = req.body.id;
    const token = req.body.token;

    console.log('ID ', id);
    console.log('TOKEN ', token);

    User.updateNotificationToken(id, token,(err, data) => {

        if(err) {
            return res.status(501).json({
                succes: false,
                message: 'ERROOOORORORORO',
                error: err
            });
        }

            return res.status(201).json({
                succes: true,
                message: 'token actualizado correctamente',
                data: id
            });
    });
  }*/