-- phpMyAdmin SQL Dump
-- version 4.8.5
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Apr 13, 2021 at 07:53 PM
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
  `access_token` text,
  `id_token` text,
  `createdAt` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `updatedAt` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `active` tinyint(1) NOT NULL DEFAULT '1'
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`id`, `name`, `email`, `password`, `provider`, `provider_id`, `provider_pic`, `access_token`, `id_token`, `createdAt`, `updatedAt`, `active`) VALUES
(14, 'Ravikant Dewangan', 'ravidewangan13@gmail.com', NULL, 'google', NULL, 'https://lh3.googleusercontent.com/a-/AOh14GjgFC3vu6rQFcyfSMy5vyl2S6aH_bLnsphk_ep8ew=s96-c', 'ya29.a0AfH6SMAgPs2zL_w8QtRpwrCHxW7hbDZSv6AomlHQwmUnl6kkH7NHc9_B2bDbLWPa2rPHOpsSFiTyFWic45_9oTB8V4x9De2T89o2U0d50Y7YxgDSeGV76LWAKCe5iXZ97o2Ii9Ynyhwod8zXNOAunakfegizTA', 'eyJhbGciOiJSUzI1NiIsImtpZCI6Ijc3NDU3MzIxOGM2ZjZhMmZlNTBlMjlhY2JjNjg2NDMyODYzZmM5YzMiLCJ0eXAiOiJKV1QifQ.eyJpc3MiOiJhY2NvdW50cy5nb29nbGUuY29tIiwiYXpwIjoiODM3NjEzMTIyMjcwLWhkazNrNmFpa21iNHVocTkydWI0b2c4dHV1aTM4b3VzLmFwcHMuZ29vZ2xldXNlcmNvbnRlbnQuY29tIiwiYXVkIjoiODM3NjEzMTIyMjcwLWhkazNrNmFpa21iNHVocTkydWI0b2c4dHV1aTM4b3VzLmFwcHMuZ29vZ2xldXNlcmNvbnRlbnQuY29tIiwic3ViIjoiMTA2MTg1NDkwNDIxNDQ0NzE4NDIxIiwiZW1haWwiOiJyYXZpZGV3YW5nYW4xM0BnbWFpbC5jb20iLCJlbWFpbF92ZXJpZmllZCI6dHJ1ZSwiYXRfaGFzaCI6InNFZ2psOURIN2ZjWTA3cE42QWpZNGciLCJuYW1lIjoiUmF2aWthbnQgRGV3YW5nYW4iLCJwaWN0dXJlIjoiaHR0cHM6Ly9saDMuZ29vZ2xldXNlcmNvbnRlbnQuY29tL2EtL0FPaDE0R2pnRkMzdnU2clFGY3lmU015NXZ5bDJTNmFIX2JMbnNwaGtfZXA4ZXc9czk2LWMiLCJnaXZlbl9uYW1lIjoiUmF2aWthbnQiLCJmYW1pbHlfbmFtZSI6IkRld2FuZ2FuIiwibG9jYWxlIjoiZW4iLCJpYXQiOjE2MTgzMzU1ODgsImV4cCI6MTYxODMzOTE4OCwianRpIjoiOTBhNTZiMjUyN2U5MWIwZGUyNjg3YTNhMGRmMzE3NWJjMzVlNmE5YiJ9.KuijrvdZPoIgC_yHDX33thEIqsqVb7EZz3rvjHdWapka9vceyreoMQSVxjC5NvIGJlagbrdx32gWeNe8WQLZZDDzM1jthB3V_N_ukoy1skqQQ71KzvLQd_lBVpGhnLudndlrY-cbE6lZC3o-m-FKFgsM5vWhiY_H8ZBGPLGlEpzKoB1-Gyda4p5FrwITpreGm-Kk2dHIaY_8f5a29xgjyLyUfMgd7ad2kuhNTezQ8IJ56z8NjJ-MgWIn1oGtV07Ac_Mn9CwOUjJTOOXodxj2-5-MTdNEQWVp_ivSGTEtIb1YdeBF5HROjDcwAWwNPnqrMY0QQNTlYmEzrEEd1uvHgA', '2021-04-13 17:39:48', '2021-04-13 17:39:48', 1),
(15, 'Ravikant Dewangan', 'ravikant.lspl@gmail.com', NULL, 'google', NULL, 'https://lh4.googleusercontent.com/-HFa1xgewRQ4/AAAAAAAAAAI/AAAAAAAAAAA/AMZuuclEmQSRVf-fz7ZeuC63opHBjOb6pA/s96-c/photo.jpg', 'ya29.a0AfH6SMB8MbK30i4yNewR78oNWAFaRmV2uRXc22jeBkIiw8r7ag_UAUFHtM5iPkhaFJabeT7zo54l3127VcHY37e05OYVMMFZ9_bcFiBFXkrYDMJrVZmCErC-lutzmY5uYTsQLd0dxNOyuztOeYPBN7TT_oBa3A', 'eyJhbGciOiJSUzI1NiIsImtpZCI6Ijc3NDU3MzIxOGM2ZjZhMmZlNTBlMjlhY2JjNjg2NDMyODYzZmM5YzMiLCJ0eXAiOiJKV1QifQ.eyJpc3MiOiJhY2NvdW50cy5nb29nbGUuY29tIiwiYXpwIjoiODM3NjEzMTIyMjcwLWhkazNrNmFpa21iNHVocTkydWI0b2c4dHV1aTM4b3VzLmFwcHMuZ29vZ2xldXNlcmNvbnRlbnQuY29tIiwiYXVkIjoiODM3NjEzMTIyMjcwLWhkazNrNmFpa21iNHVocTkydWI0b2c4dHV1aTM4b3VzLmFwcHMuZ29vZ2xldXNlcmNvbnRlbnQuY29tIiwic3ViIjoiMTEyODQyNDI0MDQ2NDI1MjExNzU2IiwiZW1haWwiOiJyYXZpa2FudC5sc3BsQGdtYWlsLmNvbSIsImVtYWlsX3ZlcmlmaWVkIjp0cnVlLCJhdF9oYXNoIjoibTN0TkRNdnhSSG1ESTdfZ2JPM0l1ZyIsIm5hbWUiOiJSYXZpa2FudCBEZXdhbmdhbiIsInBpY3R1cmUiOiJodHRwczovL2xoNC5nb29nbGV1c2VyY29udGVudC5jb20vLUhGYTF4Z2V3UlE0L0FBQUFBQUFBQUFJL0FBQUFBQUFBQUFBL0FNWnV1Y2xFbVFTUlZmLWZ6N1pldUM2M29wSEJqT2I2cEEvczk2LWMvcGhvdG8uanBnIiwiZ2l2ZW5fbmFtZSI6IlJhdmlrYW50IiwiZmFtaWx5X25hbWUiOiJEZXdhbmdhbiIsImxvY2FsZSI6ImVuIiwiaWF0IjoxNjE4MzM1OTcxLCJleHAiOjE2MTgzMzk1NzEsImp0aSI6IjFiZDUyYmRiNTI1MDQzZjE4Mjc1ZmUyYjE5NzBmZGE0MDY4NDk3NjAifQ.VK8kRddLgG-6zfPVfhFc8x-U2Ui_ZH6owlkTdfe1Il0RVPSaxQzGz4_5z7_IJDVWgqu3M33WrrlBatxa7qpxGQNyhN_R4pYPl2u2BUXmrpCy58qSnojiVB1PWxZdh_-4ZSaNfV8AZfJ8_t-XBfXMNmgzAijbBnmdhZaJMOZ-6u7Tqt7OJu2WFwY2dZnDIseu9PUe5AparIXhCR2sBuIYWojVERgeTceCm6lMVuuupQabSDK1_52gKWEbhEVAPdMsY1JaprAnjavI8e_K5C6sxUDH2Ez8xNfXZBUTxuPIt5CDIJank2d5bwI037t9mjcLFoSaMRQDcc90i6JGhbn8OQ', '2021-04-13 17:46:12', '2021-04-13 17:46:12', 1);

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
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=16;
SET FOREIGN_KEY_CHECKS=1;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
