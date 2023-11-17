const db = require('../config/config');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const Alumno = {};

Alumno.create = async (userId, result) => {

    const sql = `

        INSERT INTO
            users_rol(user_id,rol_id,estado,created_at,updated_at)
            VALUES(?,?,?,?,?)
    
    `;

    db.query(
        sql,[userId,
            '2',
            'desactivado',
            new Date(),
            new Date()
        ],
        (err, res) => {
            if(err){
                console.log('Error: ' + err);
                result(err,null);
            }else{
                console.log('Id del nuevo alumno: ' + res.insertId);
                result(null,res);
            }    
            
        }

    )
    

},
Alumno.findById = (id, result) => {
    const sql = `
    
    SELECT
        user_id,
        estado,
        tipo

    FROM
        users_rol
    WHERE
    user_id = ? AND rol_id = 2            

    `;

    db.query(
        sql,
        [id],
        (err, user) => {
            if(err) {
                console.log('Error:', err);
                result(err,null);
            }else{
                console.log('Alumno Obtenido : ', user[0]);
                result(null,user[0]);
            }
        }

    )
},
Alumno.findAllAlumnos = (result) => {
    const sql = `
    
    SELECT
    id,
    user_id,
    rol_id,
    estado,
    tipo

    FROM
        users_rol    
        
    WHERE
    rol_id = 2           

    `;

    db.query(
        sql,
        (err, alumnos) => {
            if(err) {
                console.log('Error:', err);
                result(err,null);
            }else{
                console.log('alumnos Obtenidos : ', alumnos);
                result(null,alumnos);
            }
        }

    )
},
Alumno.updateAlumno = (user,result) =>{
    const sql = `
    
    UPDATE
    users_rol
SET
    tipo = ?,
    estado = ?,
    updated_at = ?
WHERE
    id = ?           

    `;

    db.query(
        sql,[
            user.tipo,
            user.estado,
            new Date(),
            user.id
        ],
        (err, res) => {
            if(err) {
                console.log('Error:', err);
                result(err,null);
            }else{
                console.log('alumnos Obtenidos : ', res);
                console.log('update : ', res);
                result(null,res);
            }
        }

    )
}

module.exports = Alumno;