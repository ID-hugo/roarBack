USE hangar_bd;

CREATE TABLE users(
id BIGINT PRIMARY KEY AUTO_INCREMENT,
email VARCHAR(200) NOT NULL UNIQUE,
name VARCHAR(90) NOT NULL,
lastname VARCHAR(90) NOT NULL,
phone VARCHAR(15) NOT NULL,
image VARCHAR(255) NULL,
password VARCHAR(90) NOT NULL,
created_at TIMESTAMP(0) NOT NULL,
updated_at TIMESTAMP(0) NOT NULL

);

CREATE TABLE roles(
	id BIGINT PRIMARY KEY AUTO_INCREMENT,
    name VARCHAR(100) NOT NULL,
	created_at TIMESTAMP(0) NOT NULL,
	updated_at TIMESTAMP(0) NOT NULL

);

INSERT INTO roles (name, created_at, updated_at) VALUES
('Admin', NOW(), NOW()),
('Alumno', NOW(), NOW()),
('Coach', NOW(), NOW());

-- Creación de la tabla "Alumnos"
CREATE TABLE users_rol (
    id BIGINT PRIMARY KEY AUTO_INCREMENT,
    user_id BIGINT NOT NULL, -- Clave foránea que hace referencia a la tabla "Users"
    rol_id BIGINT NOT NULL,
    estado ENUM('activo', 'desactivado') NOT NULL,
	created_at TIMESTAMP(0) NOT NULL,
updated_at TIMESTAMP(0) NOT NULL
);

-- Creación de la tabla "Membresías"
CREATE TABLE membresias (
    id BIGINT PRIMARY KEY AUTO_INCREMENT,
    clases_totales INT NOT NULL,
    costo BIGINT NOT NULL,
    created_at TIMESTAMP(0) NOT NULL,
	updated_at TIMESTAMP(0) NOT NULL
);

CREATE TABLE contratos (
	id BIGINT PRIMARY KEY AUTO_INCREMENT,
	user_rol_alumno_id	BIGINT NULL,
    membresia_id BIGINT NULL, -- Clave foránea que hace referencia a la tabla "Membresías"
	clases_tomadas INT NULL,
    fecha_inicio DATE NULL,
    fecha_termino DATE NULL,
    created_at TIMESTAMP(0) NOT NULL,
	updated_at TIMESTAMP(0) NOT NULL

);

CREATE TABLE clases (
    id BIGINT PRIMARY KEY AUTO_INCREMENT,
	user_rol_coach_id BIGINT NULL,
    fecha DATE NULL,
    hora_inicio TIME NULL,
    hora_termino TIME NULL,
    limite_asistentes INT NULL,
    created_at TIMESTAMP(0) NOT NULL,
	updated_at TIMESTAMP(0) NOT NULL

);

CREATE TABLE reservas (
	id BIGINT PRIMARY KEY AUTO_INCREMENT,
    user_rol_alumno_id BIGINT NOT NULL,
    id_clase BIGINT NOT NULL,
    created_at TIMESTAMP(0) NOT NULL,
	updated_at TIMESTAMP(0) NOT NULL
);

-- Agregar una restricción de clave foránea para relacionar "user_rol" con "users"
ALTER TABLE users_rol
ADD CONSTRAINT fk_users
FOREIGN KEY (user_id)
REFERENCES users(id);

-- Agregar una restricción de clave foránea para relacionar "user_rol" con "roles"
ALTER TABLE users_rol
ADD CONSTRAINT fk_roles
FOREIGN KEY (rol_id)
REFERENCES roles(id);

-- Agregar una restricción de clave foránea para relacionar "contratos" con "membresias"
ALTER TABLE contratos
ADD CONSTRAINT fk_membresias
FOREIGN KEY (membresia_id)
REFERENCES membresias(id);

-- Agregar una restricción de clave foránea para relacionar "contratos" con "user_rol"
ALTER TABLE contratos
ADD CONSTRAINT fk_user_alumno
FOREIGN KEY (user_rol_alumno_id)
REFERENCES users_rol(id);

-- Agregar una restricción de clave foránea para relacionar "clases" con "user_rol"
ALTER TABLE clases
ADD CONSTRAINT fk_user_coach
FOREIGN KEY (user_rol_coach_id)
REFERENCES users_rol(id);

ALTER TABLE reservas
ADD CONSTRAINT fk_user_alumno_reserva
FOREIGN KEY (user_rol_alumno_id)
REFERENCES users_rol(id);

ALTER TABLE reservas
ADD CONSTRAINT fk_clases
FOREIGN KEY (id_clase)
REFERENCES clases(id);

