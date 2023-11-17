const db = require('../config/config');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const Alumno = require('./alumno')

const Membresia = {};



Membresia.findAll = (result) => {
    const sql = `
    
    SELECT
    tipo,clases_totales,costo

    FROM
        membresias        

    `;

    db.query(
        sql,
        [id],
        (err, data) => {
            if(err) {
                console.log('Error:', err);
                result(err,null);
            }else{
                console.log('Usuario Obtenido : ', data[{}]);
                result(null,data[0]);
            }
        }
    )    
}
    
    module.exports = Membresia;    