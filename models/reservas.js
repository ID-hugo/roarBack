const db = require('../config/config');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const Reserva = {};

Reserva.create = async (idClase, alumnoId, result) => {
    const insertReservaSQL = `
      INSERT INTO reservas(user_rol_alumno_id, id_clase, created_at, updated_at)
      VALUES (
          (SELECT id FROM users_rol WHERE rol_id = 2 AND user_id = ?), 
          ?, 
          ?, 
          ?
      );
    `;
  
    const updateClaseReservasSQL = `
      UPDATE clases
      SET reservas = reservas + 1
      WHERE id = ?;
    `;
  
    db.beginTransaction((err) => {
      if (err) {
        console.log('Error: ' + err);
        result(err, null);
      } else {
        db.query(
          insertReservaSQL,
          [alumnoId, idClase, new Date(), new Date()],
          (err, res) => {
            if (err) {
              db.rollback(() => {
                console.log('Error: ' + err);
                result(err, null);
              });
            } else {
              const reservaId = res.insertId;
              db.query(updateClaseReservasSQL, [idClase], (err, res) => {
                if (err) {
                  db.rollback(() => {
                    console.log('Error: ' + err);
                    result(err, null);
                  });
                } else {
                  db.commit((err) => {
                    if (err) {
                      db.rollback(() => {
                        console.log('Error: ' + err);
                        result(err, null);
                      });
                    } else {
                      console.log('Id de la reserva: ' + reservaId);
                      result(null, reservaId);
                    }
                  });
                }
              });
            }
          }
        );
      }
    });
  };
Reserva.getReservasxAlumno = async (idAlumno, result) => {
    const obtenerReservasSql = `
        SELECT 
            id_clase
        FROM reservas
        WHERE user_rol_alumno_id = (SELECT id FROM users_rol WHERE user_id = ? AND rol_id = 2);
    `;

    db.query(obtenerReservasSql, [idAlumno], async (err, reservas) => {
        if (err) {
            console.log('Error al obtener reservas: ' + err);
            result(err, null);
        } else {
            const idClasesReservadas = reservas.map(reserva => reserva.id_clase);

            if (idClasesReservadas.length === 0) {
                // No hay clases reservadas
                result(null, []);
                return;
            }

            const obtenerDetallesClasesSql = `
                SELECT 
                    id,
                    fecha,
                    hora_inicio,
                    hora_termino,
                    limite_asistentes,
                    tipo,
                    reservas
                FROM clases
                WHERE id IN (?);
            `;

            db.query(obtenerDetallesClasesSql, [idClasesReservadas], (err, detallesClases) => {
                if (err) {
                    console.log('Error al obtener detalles de clases: ' + err);
                    result(err, null);
                } else {
                    console.log('Detalles de clases para el usuario:', detallesClases);
                    result(null, detallesClases);
                }
            });
        }
    });
},
Reserva.getReservasxAlumno2 = async (idAlumno, result) => {
    const sql = `
        SELECT 
        id,
        user_rol_alumno_id,
        id_clase
        FROM reservas
        WHERE user_rol_alumno_id = (SELECT id FROM users_rol WHERE user_id = ? AND rol_id = 2);
    `;

    db.query(sql, [idAlumno], (err, res) => {
        if (err) {
            console.log('Error: ' + err);
            result(err, null);
        } else {
            console.log('reservas del alumno:', res);
            result(null, res);
        }
    });
};
Reserva.deleteReserva = async (idClase, idUser, result) => {
    const obtenerUserRolIdSql = `
        SELECT id
        FROM users_rol
        WHERE user_id = ? AND rol_id = 2;
    `;

    db.query(obtenerUserRolIdSql, [idUser], (err, userRolIdResult) => {
        if (err) {
            console.log('Error al obtener user_rol_alumno_id: ' + err);
            result(err, null);
        } else {
            const userRolId = userRolIdResult[0]?.id;

            if (!userRolId) {
                console.log('No se encontró user_rol_alumno_id para el usuario y rol especificados');
                result('No se encontró user_rol_alumno_id para el usuario y rol especificados', null);
                return;
            }

            const eliminarReservaSql = `
                DELETE FROM reservas
                WHERE user_rol_alumno_id = ? AND id_clase = ?;
            `;

            db.query(eliminarReservaSql, [userRolId, idClase], (err, deleteResult) => {
                if (err) {
                    console.log('Error al eliminar reserva: ' + err);
                    result(err, null);
                } else {
                    const actualizarReservasSql = `
                        UPDATE clases
                        SET reservas = reservas - 1
                        WHERE id = ?;
                    `;

                    db.query(actualizarReservasSql, [idClase], (err, updateResult) => {
                        if (err) {
                            console.log('Error al actualizar reservas en clases: ' + err);
                            result(err, null);
                        } else {
                            console.log('Reserva eliminada correctamente');
                            result(null, 'Reserva eliminada correctamente');
                        }
                    });
                }
            });
        }
    });
};



module.exports = Reserva;