-- phpMyAdmin SQL Dump
-- version 4.1.14
-- http://www.phpmyadmin.net
--
-- Servidor: 127.0.0.1
-- Tiempo de generación: 07-12-2015 a las 22:53:00
-- Versión del servidor: 5.6.17
-- Versión de PHP: 5.5.12

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8 */;

--
-- Base de datos: `gestionproyectos`
--
CREATE DATABASE IF NOT EXISTS `gestionproyectos` DEFAULT CHARACTER SET utf8 COLLATE utf8_general_ci;
USE `gestionproyectos`;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `estudiantes`
--

CREATE TABLE IF NOT EXISTS `estudiantes` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `nombre` varchar(255) NOT NULL,
  `primerApellido` varchar(255) NOT NULL,
  `segundoApellido` varchar(255) DEFAULT NULL,
  `tituloProyecto` varchar(255) NOT NULL,
  `tutor1` varchar(255) NOT NULL,
  `tutor2` varchar(255) DEFAULT NULL,
  `estadoProyecto` varchar(255) NOT NULL,
  `fechaPresentacionProyecto` varchar(255) DEFAULT NULL,
  `calificacionProyecto` float DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB  DEFAULT CHARSET=utf8 AUTO_INCREMENT=167 ;

--
-- Volcado de datos para la tabla `estudiantes`
--

INSERT INTO `estudiantes` (`id`, `nombre`, `primerApellido`, `segundoApellido`, `tituloProyecto`, `tutor1`, `tutor2`, `estadoProyecto`, `fechaPresentacionProyecto`, `calificacionProyecto`) VALUES
(124, 'Jordi', 'Cuello', 'Ramírez', 'Realidad Aumentada', 'Juan Carlos Acosta Encinas', '', 'en desarrollo', '', NULL),
(125, 'Laura', 'Concepción', 'Tejero', 'Librería videojuegos C++', 'Gonzalo Vivancos Nieves', 'María Luisa Cabanillas Ros', 'en desarrollo', '', NULL),
(126, 'Nuria', 'Albedalejo', 'Cara', 'Monitor de funciones vitales Android', 'Ana Isabel Jorge Oliveros', '', 'presentado', '21-11-2015', 8.9),
(127, 'María Luisa', 'Viejo', 'Naranjo', 'Red social turística', 'Josefina Gijón Megías', '', 'presentado', '12-06-2015', 7.3),
(128, 'José Manuel', 'Aldea', 'Mayor', 'Termómetro online', 'Andrés Lema Oviedo', 'Óscar Salom Hermina', 'en desarrollo', '', NULL),
(129, 'María Victoria', 'Valencia', 'Llácer', 'Clon Tripadvisor Cádiz', 'Gonzalo Vivancos Nieves', '', 'presentado', '02-03-2014', 6.8),
(130, 'Carla', 'Morell', 'Parada', 'Web culinaria', 'Sebastián Santos Hoz', '', 'presentado', '08-09-2015', 9.6),
(131, 'Daniel', 'Filgueira', 'Macías', 'Repositorio online para hospitales', 'María Luisa Cabanillas Ros', 'Andrés Lema Oviedo', 'en desarrollo', '', NULL),
(132, 'Miguel Ángel', 'Fresco', 'Cortés', 'Aplicación de turismo Realidad Virtual', 'Sebastián Santos Hoz', '', 'en desarrollo', '', NULL),
(133, 'Lorenzo', 'Reguera', 'Mayoral', 'Control remoto', 'Juan Carlos Acosta Encinas', '', 'presentado', '07-05-2014', 9.9),
(134, 'Jason', 'Kyle', '', 'Web hospital', 'Ana Isabel Jorge Oliveros', '', 'presentado', '16-01-2015', 8.9),
(135, 'Ángel', 'López', 'López', 'Distribución de medicamentos', 'Juan Carlos Acosta Encinas', '', 'en desarrollo', '', NULL),
(158, 'Francisco', 'Sánchez', 'de Mendizábal', 'Web de turismo de Cádiz', 'Isabel Gómez', NULL, 'presentado', '22-01-2015', 8.78);

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
