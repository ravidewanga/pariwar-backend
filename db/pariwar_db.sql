-- phpMyAdmin SQL Dump
-- version 4.8.5
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Apr 13, 2021 at 07:33 PM
-- Server version: 10.1.38-MariaDB
-- PHP Version: 7.3.2

SET FOREIGN_KEY_CHECKS=0;
SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET AUTOCOMMIT = 0;
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `pariwar_db`
--

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE `users` (
  `id` int(11) NOT NULL,
  `name` varchar(150) DEFAULT NULL,
  `email` varchar(150) NOT NULL,
  `password` varchar(255) DEFAULT NULL,
  `provider` varchar(50) DEFAULT NULL,
  `provider_id` varchar(100) DEFAULT NULL,
  `provider_pic` varchar(200) NOT NULL,
  `access_token` varchar(255) DEFAULT NULL,
  `id_token` varchar(255) DEFAULT NULL,
  `createdAt` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `updatedAt` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `active` tinyint(1) NOT NULL DEFAULT '1'
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`id`, `name`, `email`, `password`, `provider`, `provider_id`, `provider_pic`, `access_token`, `id_token`, `createdAt`, `updatedAt`, `active`) VALUES
(12, 'Ravikant Dewangan', 'ravidewangan13@gmail.com', NULL, 'google', NULL, 'https://lh3.googleusercontent.com/a-/AOh14GjgFC3vu6rQFcyfSMy5vyl2S6aH_bLnsphk_ep8ew=s96-c', 'ya29.a0AfH6SMBFg5WsHdCxyp2KEL6JsYvQuKX7PrugNplGBP1k98N-3o3slkEyTfrT264wwu1mQPg7PxCKroOIBCRAL3APUk71TJBaGb9VCX0FrUGaGOLlDXUjgUKwnfIlGBFSpOmQ1f0tKzV7y9olfM8qGaOCRIClXA', 'eyJhbGciOiJSUzI1NiIsImtpZCI6Ijc3NDU3MzIxOGM2ZjZhMmZlNTBlMjlhY2JjNjg2NDMyODYzZmM5YzMiLCJ0eXAiOiJKV1QifQ.eyJpc3MiOiJhY2NvdW50cy5nb29nbGUuY29tIiwiYXpwIjoiODM3NjEzMTIyMjcwLWhkazNrNmFpa21iNHVocTkydWI0b2c4dHV1aTM4b3VzLmFwcHMuZ29vZ2xldXNlcmNvbnRlbnQuY29tIiwiYXVk', '2021-04-13 17:32:55', '2021-04-13 17:32:55', 1);

--
-- Indexes for dumped tables
--

--
-- Indexes for table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `email` (`email`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=13;
SET FOREIGN_KEY_CHECKS=1;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
