const db = require('../config/config');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const Clase = {};

Clase.findAllClases = (result) => {
    const sql = `
    
    SELECT
    id,
    fecha,
    hora_inicio,
    hora_termino,
    limite_asistentes,
    tipo,
    reservas

    FROM
        clases         

    `;

    db.query(
        sql,
        (err, clases) => {
            if(err) {
                console.log('Error:', err);
                result(err,null);
            }else{
                console.log('Clases Obtenidos : ', clases);
                result(null,clases);
            }
        }

    )
},
Clase.findAllClasesCopia = (result) => {
    const sql = `
    
    SELECT
    id,
    hora_inicio,
    hora_termino,
    limite_asistentes,
    tipo,
    dias

    FROM
        clasesCopia       

    `;

    db.query(
        sql,
        (err, clases) => {
            if(err) {
                console.log('Error:', err);
                result(err,null);
            }else{
                console.log('ClasesCopia Obtenidos : ', clases);
                result(null,clases);
            }
        }

    )
},
Clase.findClasexFecha = (fecha, result) => {

    const fechaISO8601 = fecha;

    const sql = `
    
    SELECT
    id,
    fecha,
    hora_inicio,
    hora_termino,
    limite_asistentes,
    tipo,
    reservas

    FROM
        clases  
    WHERE
    fecha = ?           

    `;

    db.query(
        sql,[fechaISO8601],
        (err, clases) => {
            if(err) {
                console.log('Error:', err);
                result(err,null);
            }else{
                console.log('Clases Obtenidos : ', clases);
                result(null,clases);
            }
        }

    )
},

Clase.create = async (user, result) => {


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

Clase.createClaseCopia = async (claseCopia, result) => {


    const sql = `

        INSERT INTO
            clasesCopia(user_rol_coach_id, hora_inicio, hora_termino, limite_asistentes, tipo, dias, created_at, updated_at)
            VALUES(?,?,?,?,?,?,?,?)
    
    `;

    db.query(
        sql,['4',
            claseCopia.hora_inicio,
            claseCopia.hora_termino,
            claseCopia.limite_asistentes,
            claseCopia.tipo,
            claseCopia.dias,
            new Date(),
            new Date()
        ],
        (err, res) => {
            if(err){
                console.log('Error: ' + err);
                result(err,null);
            }else{
                console.log('Success ' + res)
               result(null, res);

            }    
            
        }

    )
    

},

Clase.createClase = async (claseCopia, result) => {
    const tipos = claseCopia.tipo.split(',').map((tipo) => tipo.trim()); // Dividir y eliminar espacios en blanco
    const fechaString = claseCopia.fecha; // Suponiendo que claseCopia.fecha es una cadena en formato 'DD/MM/YYYY'
    const [dia, mes, anio] = fechaString.split('/');

    // Construir el objeto Date
    const fechaObj = new Date(`${anio}-${mes}-${dia}`);

    // Verificar si la fecha es válida
    if (isNaN(fechaObj.getTime())) {
        return result('Error: Fecha no válida', null);
    }

    // Formatear la fecha a 'YYYY-MM-DD'
    const formattedFecha = fechaObj.toISOString().split('T')[0];


    const sql = `
        INSERT INTO
            clases(user_rol_coach_id, fecha, hora_inicio, hora_termino, limite_asistentes, tipo, reservas, created_at, updated_at)
            VALUES(?,?,?,?,?,?,?,?,?)
    `;

    tipos.forEach((tipo) => {
        db.query(
            sql, [
                '4',
                formattedFecha,
                claseCopia.hora_inicio,
                claseCopia.hora_termino,
                claseCopia.limite_asistentes,
                tipo,
                claseCopia.reservas,
                new Date(),
                new Date(),
            ],
            (err, res) => {
                if (err) {
                    console.log('Error: ' + err);
                    result(err, null);
                } else {
                    console.log('Success ' + res);
                    // Puedes hacer algo con el resultado si es necesario
                }
            }
        );
    });

    result(null, "Inserciones exitosas"); // Otra lógica de retorno si es necesario
};

Clase.getClasesReservaUser = async (idUser,idClases, result) => {

    const sql = `

    SELECT * FROM clases 
    
    `;

    db.query(
        sql,[idClases
        ],
        (err, res) => {
            if(err){
                console.log('Error: ' + err);
                result(err,null);
            }else{
                console.log('clases del usuario segun su reserva ', res);
               result(null, res);

            }    
            
        }

    )
    

},




module.exports = Clase;