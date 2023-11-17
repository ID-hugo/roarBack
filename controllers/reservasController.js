const Reserva = require('../models/reservas');
const bcrypt = require('bcryptjs')
const { secretKey } = require('../config/configKey')
const jwt = require('jsonwebtoken')

module.exports = {

    createReserva(req,res){

        const idClase = req.body.idClase;
        const alumnoId = req.user.id;

        console.log(idClase + " " + alumnoId);

        Reserva.create(idClase,alumnoId, async (err, data) => {
            if(err){
                return res.status(501).json({
                    success: false,
                    message: 'Hubo un error al crear la reserva',
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
    getReservas(req,res){

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
    getReservas2(req,res){

        const idUser = req.user.id;
        

        Reserva.getReservasxAlumno2(idUser,async (err, data) => {
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
    deleteReserva(req,res){

        const idClase = req.headers['id-clase'];  
        const idUser = req.user.id;


        Reserva.deleteReserva(idClase,idUser,async (err, data) => {
            if(err){
                return res.status(501).json({
                    success: false,
                    message: 'Hubo un error al eliminar la reserva',
                    error: err 
                });
            }
            return res.status(200).json({ 
                success: true,
                message: 'eliminado con exito', 
                data: data,

            });

        });
    },
}