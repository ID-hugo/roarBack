const Clase = require('../models/clases');
const Reserva = require('../models/reservas');
const bcrypt = require('bcryptjs')
const { secretKey } = require('../config/configKey')
const jwt = require('jsonwebtoken')

module.exports = {

    getAllClases(req,res){

        Clase.findAllClases(async (err, data) => {
            if(err){
                return res.status(501).json({
                    success: false,
                    message: 'Hubo un error con la busqueda de clases',
                    error: err 
                });
            }
            return res.status(200).json({ 
                success: true,
                message: 'clases encontradas', 
                data: data,
                
            });

        });
    },
    getAllClasesCopia(req,res){

        Clase.findAllClasesCopia(async (err, data) => {
            if(err){
                return res.status(501).json({
                    success: false,
                    message: 'Hubo un error con la busqueda de clasesCopia',
                    error: err 
                });
            }
            return res.status(200).json({ 
                success: true,
                message: 'clasesCopia encontradas', 
                data: data,
                
            });

        });
    },
    getClasesxFechas(req,res){

        const fecha = req.headers['fecha'];

        Clase.findClasexFecha(fecha, async (err, data) => {
            if(err){
                return res.status(501).json({
                    success: false,
                    message: 'Hubo un error con la busqueda de clases',
                    error: err 
                });
            }
            return res.status(200).json({ 
                success: true,
                message: 'clases encontradas', 
                data: data,
                
            });

        });
    },
    creatReserva(req,res){
        Reserva.create(async (err, data) => {
            if(err){
                return res.status(501).json({
                    success: false,
                    message: 'Hubo un error con la busqueda de clases',
                    error: err 
                });
            }
            return res.status(200).json({ 
                success: true,
                message: 'clases encontradas', 
                data: data,
                
            });

        });
    },

    createClaseCopia(req,res){

        const claseCopia = req.body;

        Clase.createClaseCopia(claseCopia, async (err, data) => {
            if(err){
                return res.status(501).json({
                    success: false,
                    message: 'Hubo un error con la creacion de la copiaClase',
                    error: err 
                });
            }
            return res.status(200).json({ 
                success: true,
                message: 'Generado', 
                data: data,
                
            });

        });
    },

    createClase(req,res){

        const clase = req.body;

        Clase.createClase(clase, async (err, data) => {
            if(err){
                return res.status(501).json({
                    success: false,
                    message: 'Hubo un error con la creacion de la copiaClase',
                    error: err 
                });
            }
            return res.status(200).json({ 
                success: true,
                message: 'Generado', 
                data: data,
                
            });

        });
    },

    getReservasUser(req,res){

        const idUser = req.user.id;

        Reserva.getReservasxAlumno(idUser,async (err, data) => {
            if(err){
                return res.status(501).json({
                    success: false,
                    message: 'Hubo un error al obtener la reservas del alumno',
                    error: err 
                });
            }
            return res.status(200).json({ 
                success: true,
                message: 'reserva con exito', 
                data: data,
            
            });

        });
    },
    getClasesUser(req,res){

        const idClases = req.headers['id-clases'];
        const idUser = req.user.id;

        console.log(idClases + "-------------------------------------------------");

        Clase.getClasesReservaUser(idUser,idClases,async (err, data) => {
            if(err){
                return res.status(501).json({
                    success: false,
                    message: 'Hubo un error al obtener la reservas del alumno',
                    error: err 
                });
            }
            return res.status(200).json({ 
                success: true,
                message: 'reserva con exito', 
                data: data,
            
            });
        });


    },

}
