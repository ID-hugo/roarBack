const bcrypt = require('bcryptjs')
const { secretKey } = require('../config/configKey')
const jwt = require('jsonwebtoken')

module.exports = {

    getAllMembresias(res) {

        Membresias.findAll( async (err, data) => {
            if(err){
                return res.status(501).json({
                    success: false,
                    message: 'Hubo un error con la busqueda de usuario de usuario',
                    error: err 
                });
            }
            console.log(data[{}]);
            return res.status(200).json({ 
                success: true,
                message: 'Usuario encontrado', 
                data: data[{}],
                
            });

        });
    },

}