-- =============================================================================
-- Base de datos: oficina
-- Servidor: VM3 (Ubuntu Server con MySQL  /  CentOS con MariaDB)
-- Importar desde phpMyAdmin:  Importar -> elegir este archivo -> Continuar
-- O desde terminal:           sudo mysql -u root -p < schema.sql
-- =============================================================================

CREATE DATABASE IF NOT EXISTS oficina
  CHARACTER SET utf8mb4
  COLLATE utf8mb4_unicode_ci;

USE oficina;

-- -----------------------------------------------------------------------------
-- Tabla principal
-- -----------------------------------------------------------------------------
DROP TABLE IF EXISTS articulos;

CREATE TABLE articulos (
  id        INT AUTO_INCREMENT PRIMARY KEY,
  nombre    VARCHAR(120)   NOT NULL,
  categoria VARCHAR(80)    NOT NULL,
  precio    DECIMAL(10, 2) NOT NULL,
  stock     INT            NOT NULL DEFAULT 0,
  creado_en TIMESTAMP      NOT NULL DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- -----------------------------------------------------------------------------
-- Datos iniciales (los mismos que tenía la API en memoria)
-- -----------------------------------------------------------------------------
INSERT INTO articulos (nombre, categoria, precio, stock) VALUES
  ('Resma papel A4',             'Papelería',   4.50, 120),
  ('Bolígrafos azul (caja 50)',  'Escritura',   8.90,  40),
  ('Grapadora metálica',         'Oficina',    12.00,  15),
  ('Carpetas folio (pack 10)',   'Archivo',     6.25,  60),
  ('Toner impresora HP',         'Consumibles',45.00,   8);

-- -----------------------------------------------------------------------------
-- Usuario para la API (lo usará el backend en la VM2)
-- Cambia la contraseña por una propia y úsala también en el .env del backend
-- -----------------------------------------------------------------------------
CREATE USER IF NOT EXISTS 'apiuser'@'%' IDENTIFIED BY 'Api12345*';
GRANT SELECT ON oficina.* TO 'apiuser'@'%';
FLUSH PRIVILEGES;

-- Verificación rápida
SELECT COUNT(*) AS total_articulos FROM articulos;
