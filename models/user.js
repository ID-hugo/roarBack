const db = require('../config/config');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const Alumno = require('./alumno')

const User = {};


User.create = async (user, result) => {

    const hash = await bcrypt.hash(user.password, 10);

    const sql = `

        INSERT INTO
            users(email,name,lastname,phone,image,password,created_at,updated_at)
            VALUES(?,?,?,?,?,?,?,?)
    
    `;

    db.query(
        sql,[user.email,
            user.name,
            user.lastname,
            user.phone,
            user.image,
            hash,
            new Date(),
            new Date()
        ],
        (err, res) => {
            if(err){
                console.log('Error: ' + err);
                result(err,null);
            }else{
                console.log('Id del nuevo usuario: ' + res.insertId);

                Alumno.create(res.insertId, (alumnoErr, alumnoData) => {
                    if (alumnoErr) {
                        console.log('Error al crear el Alumno: ' + alumnoErr);
                        result(alumnoErr, null);
                    } else {
                        console.log('Alumno creado: ' + alumnoData.insertId);
                        result(null, res.insertId);
                    }
                });


            }    
            
        }

    )
    

},

User.findByEmail = (email, result) => {
    const sql = `
    
    SELECT
        id,
        email,
        name,
        lastname,
        image,
        password
    FROM
        users
    WHERE
        email = ?            

    `;

    db.query(
        sql,
        [email],
        (err, user) => {
            if(err) {
                console.log('Error:', err);
                result(err,null);
            }else{
                console.log('Usuario Obtenido : ', user[0]);
                result(null,user[0]);
            }
        }

    )
}

User.findById = (id, result) => {
    const sql = `
    
    SELECT
        id,
        email,
        name,
        lastname,
        phone,
        image,
        password

    FROM
        users
    WHERE
    id = ?            

    `;

    db.query(
        sql,
        [id],
        (err, user) => {
            if(err) {
                console.log('Error:', err);
                result(err,null);
            }else{
                console.log('Usuario Obtenido : ', user[0]);
                result(null,user[0]);
            }
        }

    )
},

User.findByIdToRol = (id, result) => {
    const sql = `
    
    SELECT
        id,
        rol_id

    FROM
        users_rol
    WHERE
    user_id = ?            

    `;

    db.query(
        sql,
        [id],
        (err, users) => {
            if(err) {
                console.log('Error:', err);
                result(err,null);
            }else{
                console.log('Usuarios Obtenidos : ', users);
                result(null,users);
            }
        }

    )
}

User.update = (user, userId, result) => {
    console.log('CR7', user.id);
    const sql = `
    UPDATE
        users
    SET
        name = ?,
        lastname = ?,
        phone = ?,
        updated_at = ?
    WHERE
        id = ?
    `;

    db.query
    (
        sql,
        [
            user.name,
            user.lastname,
            user.phone,
            new Date(),
            userId
        ],
        (err, res) => {
            if(err) {
                console.log('ERROR: ', err);
                result(err, null);
            }else{
                console.log('Datos actualizados: ', res);
                result(null, res);
            }
            
        }
    )
},
User.findAllUsers = (result) => {
    const sql = `
    
    SELECT
    id,
    email,
    name,
    lastname

    FROM
        users         

    `;

    db.query(
        sql,
        (err, clases) => {
            if(err) {
                console.log('Error:', err);
                result(err,null);
            }else{
                console.log('usuarios Obtenidos : ', clases);
                result(null,clases);
            }
        }

    )
},

User.changePassword = async (userId, newPassword, result) => {
    try {
      const hash = await bcrypt.hash(newPassword, 10);
  
      const sql = `
        UPDATE
          users
        SET
          password = ?,
          updated_at = ?
        WHERE
          id = ?
      `;
  
      db.query(sql, [hash, new Date(), userId], (err, res) => {
        if (err) {
          console.log('Error al cambiar la contraseña: ', err);
          result(err, null);
        } else {
          console.log('Contraseña cambiada con éxito.');
          result(null, res);
        }
      });
    } catch (error) {
      console.log('Error al encriptar la nueva contraseña:', error);
      result(error, null);
    }
  };

  User.checkCurrentPassword = async (userId, result) => {


    const sql = `
      SELECT
        id,
        password
      FROM
        users
      WHERE
        id = ?
    `;
  
    db.query(
      sql,
      [userId],
      async (err, res) => {
        if (err) {
          console.log('Error:', err);
          result(err, null);
          
        } else {
          
            result(null, res)
        
        }
      }
    )
    
  },

module.exports = User;