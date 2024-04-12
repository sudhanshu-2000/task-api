-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Apr 12, 2024 at 01:33 PM
-- Server version: 10.4.32-MariaDB
-- PHP Version: 8.0.30

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `sparrow_task`
--

-- --------------------------------------------------------

--
-- Table structure for table `agents_statement`
--

CREATE TABLE `agents_statement` (
  `id` int(11) NOT NULL,
  `mobile` varchar(100) NOT NULL,
  `amount` varchar(100) NOT NULL,
  `discription` varchar(100) NOT NULL,
  `date` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `agents_statement`
--

INSERT INTO `agents_statement` (`id`, `mobile`, `amount`, `discription`, `date`) VALUES
(55, '8898765437', '0.14', 'Level 1', '2024-02-24 10:07:22'),
(56, '8898765437', '0.08', 'Level 1', '2024-02-24 10:07:22');

-- --------------------------------------------------------

--
-- Table structure for table `assign_module`
--

CREATE TABLE `assign_module` (
  `id` int(11) NOT NULL,
  `role` int(11) NOT NULL,
  `module` int(11) NOT NULL,
  `position` int(11) DEFAULT NULL,
  `status` varchar(1) NOT NULL DEFAULT 'Y',
  `date` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `assign_module`
--

INSERT INTO `assign_module` (`id`, `role`, `module`, `position`, `status`, `date`) VALUES
(395, 6, 1, 152, 'Y', '2024-04-08 12:37:00'),
(396, 6, 13, 153, 'Y', '2024-04-08 12:37:00'),
(397, 6, 18, 154, 'Y', '2024-04-08 12:37:00'),
(398, 6, 25, 155, 'Y', '2024-04-08 12:37:00'),
(399, 6, 26, 156, 'Y', '2024-04-08 12:37:00'),
(400, 6, 33, 158, 'Y', '2024-04-08 12:37:00'),
(401, 6, 28, 157, 'Y', '2024-04-08 12:37:00'),
(402, 6, 34, 159, 'Y', '2024-04-08 12:37:00'),
(403, 3, 34, 168, 'Y', '2024-04-08 12:37:08'),
(404, 3, 1, 160, 'Y', '2024-04-08 12:37:08'),
(405, 3, 18, 161, 'Y', '2024-04-08 12:37:08'),
(406, 3, 20, 162, 'Y', '2024-04-08 12:37:08'),
(407, 3, 25, 163, 'Y', '2024-04-08 12:37:08'),
(408, 3, 26, 164, 'Y', '2024-04-08 12:37:08'),
(409, 3, 28, 165, 'Y', '2024-04-08 12:37:08'),
(410, 3, 33, 167, 'Y', '2024-04-08 12:37:08'),
(411, 3, 30, 166, 'Y', '2024-04-08 12:37:08'),
(412, 3, 35, 169, 'Y', '2024-04-08 12:37:08'),
(424, 5, 33, 178, 'Y', '2024-04-12 06:30:59'),
(425, 5, 1, 170, 'Y', '2024-04-12 06:30:59'),
(426, 5, 13, 171, 'Y', '2024-04-12 06:30:59'),
(427, 5, 20, 173, 'Y', '2024-04-12 06:30:59'),
(428, 5, 18, 172, 'Y', '2024-04-12 06:30:59'),
(429, 5, 25, 174, 'Y', '2024-04-12 06:30:59'),
(430, 5, 35, 180, 'Y', '2024-04-12 06:30:59'),
(431, 5, 34, 179, 'Y', '2024-04-12 06:30:59'),
(432, 5, 26, 175, 'Y', '2024-04-12 06:30:59'),
(433, 5, 28, 176, 'Y', '2024-04-12 06:30:59'),
(434, 5, 36, 181, 'Y', '2024-04-12 06:30:59'),
(435, 5, 30, 177, 'Y', '2024-04-12 06:30:59');

-- --------------------------------------------------------

--
-- Table structure for table `assign_task`
--

CREATE TABLE `assign_task` (
  `id` int(11) NOT NULL,
  `user_id` int(11) NOT NULL,
  `task_id` int(11) NOT NULL,
  `username` varchar(100) DEFAULT NULL,
  `url` varchar(200) DEFAULT NULL,
  `status` varchar(100) NOT NULL DEFAULT 'Pending',
  `approved_declined_by` varchar(100) DEFAULT NULL,
  `expire_date` timestamp NULL DEFAULT current_timestamp(),
  `date` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `assign_task`
--

INSERT INTO `assign_task` (`id`, `user_id`, `task_id`, `username`, `url`, `status`, `approved_declined_by`, `expire_date`, `date`) VALUES
(1, 75, 1, 'thats_tarun.soni', NULL, 'Completed', 'Admin', '2024-04-10 12:01:57', '2024-04-10 12:01:57'),
(2, 75, 3, 'thats_tarun.soni', NULL, 'Failed', 'Admin', '2024-04-10 12:01:57', '2024-04-10 12:01:57'),
(3, 75, 5, 'thats_tarun.soni', NULL, 'Verifying', NULL, '2024-04-10 12:02:14', '2024-04-10 12:02:14'),
(4, 75, 7, 'thats_tarun.soni', NULL, 'Verifying', NULL, '2024-04-10 12:02:14', '2024-04-10 12:02:14'),
(5, 75, 2, 'thats_tarun.soni', NULL, 'Verifying', NULL, '2024-04-10 12:01:57', '2024-04-10 12:01:57'),
(6, 75, 4, 'thats_tarun.soni', NULL, 'Verifying', NULL, '2024-04-10 12:01:57', '2024-04-10 12:01:57'),
(7, 75, 6, 'thats_tarun.soni', NULL, 'Verifying', NULL, '2024-04-10 12:02:14', '2024-04-10 12:02:14'),
(8, 75, 8, 'thats_tarun.soni', NULL, 'Verifying', NULL, '2024-04-10 12:02:14', '2024-04-10 12:02:14'),
(9, 75, 27, NULL, 'https://sparrowsports.com/image/file_example_MP4_480_1_5MG.mp4', 'Verifying', NULL, '2024-04-10 12:02:14', '2024-04-10 12:02:14'),
(10, 75, 28, NULL, 'https://youtu.be/FoVNS7WWjdU?si=-9c9D5SLBg_36B4q', 'Verifying', NULL, '2024-04-10 12:02:14', '2024-04-10 12:02:14'),
(11, 75, 29, NULL, 'https://sparrowsports.com/image/file_exple_MP4_480_1_5MG.mp4', 'Verifying', NULL, '2024-04-10 12:02:14', '2024-04-10 12:02:14'),
(12, 75, 30, NULL, NULL, 'Pending', NULL, '2024-04-10 12:02:14', '2024-04-10 12:02:14'),
(13, 76, 1, NULL, NULL, 'Pending', NULL, '2024-04-10 12:01:57', '2024-04-10 12:01:57');

-- --------------------------------------------------------

--
-- Table structure for table `bank_details`
--

CREATE TABLE `bank_details` (
  `id` int(11) NOT NULL,
  `user_name` varchar(200) NOT NULL,
  `account_number` varchar(200) NOT NULL,
  `IFSC_code` varchar(200) NOT NULL,
  `bank_name` varchar(200) NOT NULL,
  `status` varchar(1) NOT NULL DEFAULT 'Y',
  `action` varchar(200) NOT NULL,
  `date` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `buy_plan`
--

CREATE TABLE `buy_plan` (
  `id` int(11) NOT NULL,
  `user_id` varchar(100) NOT NULL,
  `plan_id` int(11) NOT NULL,
  `expire_date` datetime NOT NULL,
  `date` timestamp NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `buy_plan`
--

INSERT INTO `buy_plan` (`id`, `user_id`, `plan_id`, `expire_date`, `date`) VALUES
(1, '8690708302', 4, '2024-05-11 00:00:00', '2024-04-11 10:59:29'),
(2, '8690708302', 4, '2024-05-11 00:00:00', '2024-04-11 10:59:39'),
(3, '8690708302', 4, '2024-05-11 00:00:00', '2024-04-11 10:59:42'),
(4, '8690708302', 3, '2024-05-11 00:00:00', '2024-04-11 11:04:43'),
(5, '8690708302', 4, '2024-05-11 00:00:00', '2024-04-11 12:00:09'),
(6, '8690708302', 3, '2024-05-11 00:00:00', '2024-04-11 12:07:55'),
(7, '8690708302', 4, '2024-05-11 00:00:00', '2024-04-11 12:08:14'),
(8, '8690708302', 4, '2024-05-11 00:00:00', '2024-04-11 12:08:19'),
(9, '8690708302', 4, '2024-05-11 00:00:00', '2024-04-11 12:08:25'),
(10, '8690708302', 4, '2024-05-11 00:00:00', '2024-04-11 12:08:31'),
(11, '8690708302', 3, '2024-05-11 00:00:00', '2024-04-11 12:09:18'),
(12, '8690708302', 4, '2024-05-12 00:00:00', '2024-04-12 07:01:56'),
(13, '8690708302', 3, '2024-05-12 00:00:00', '2024-04-12 07:04:01'),
(14, '8690708302', 3, '2024-05-12 00:00:00', '2024-04-12 07:04:23'),
(15, '8690708302', 4, '2024-05-12 00:00:00', '2024-04-12 07:05:18'),
(16, '8690708302', 3, '2024-05-12 00:00:00', '2024-04-12 10:31:43');

-- --------------------------------------------------------

--
-- Table structure for table `commets`
--

CREATE TABLE `commets` (
  `id` int(11) NOT NULL,
  `details` varchar(500) NOT NULL,
  `date` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `commets`
--

INSERT INTO `commets` (`id`, `details`, `date`) VALUES
(1, 'Your smile is contagious.', '2024-04-11 06:02:17'),
(2, 'You are really cute.', '2024-04-11 06:02:17'),
(3, 'beautiful 😍 Cute 🥰 Lovely 🌹', '2024-04-11 06:02:17'),
(4, 'Stop being so perfect.', '2024-04-11 06:02:17'),
(5, 'Fantastically awesome.', '2024-04-11 06:02:17'),
(6, 'This looks so beautiful.', '2024-04-11 06:02:17'),
(7, 'The beauty in this picture is simply mesmerizing. It\'s a work of art.', '2024-04-11 06:02:17'),
(8, 'The colors in this picture are so vibrant and alive. It\'s like a burst of joy', '2024-04-11 06:02:17');

-- --------------------------------------------------------

--
-- Table structure for table `contact`
--

CREATE TABLE `contact` (
  `id` int(11) NOT NULL,
  `email` varchar(200) NOT NULL,
  `subject` varchar(200) NOT NULL,
  `message` varchar(300) NOT NULL,
  `image` varchar(200) DEFAULT NULL,
  `status` varchar(100) NOT NULL DEFAULT 'Pending',
  `date` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `contact`
--

INSERT INTO `contact` (`id`, `email`, `subject`, `message`, `image`, `status`, `date`) VALUES
(1, 'tarun@gmail.com', 'Withdraw', 'My withdrawal is still pending', 'image-1712916729806-860214565.png', 'Pending', '2024-04-12 10:12:09'),
(2, 'tarun@gmail', 'Deposit', 'deposit pending.', 'image-1712917303444-710175830.png', 'Pending', '2024-04-12 10:21:43'),
(3, 'tarun@gmail', 'Deposit', 'deposit pending.', 'image-1712917309899-900671667.png', 'Pending', '2024-04-12 10:21:49'),
(4, 'tarun@gmail', 'Deposit', 'deposit pending.', 'image-1712917382574-247177532.png', 'Pending', '2024-04-12 10:23:02'),
(5, 'tarun@gmail', 'sdfds', 'jjjj', 'image-1712920080524-662859443.png', 'Pending', '2024-04-12 11:08:00');

-- --------------------------------------------------------

--
-- Table structure for table `deposit`
--

CREATE TABLE `deposit` (
  `id` int(11) NOT NULL,
  `user_name` varchar(200) NOT NULL,
  `balance` varchar(200) NOT NULL,
  `image` varchar(200) DEFAULT NULL,
  `image_path` varchar(250) DEFAULT NULL,
  `transaction_id` varchar(50) DEFAULT NULL,
  `payment_type` varchar(50) NOT NULL,
  `upi_id` varchar(100) DEFAULT NULL,
  `status` varchar(50) NOT NULL DEFAULT 'Pending',
  `reason` varchar(45) DEFAULT NULL,
  `Approved_declined_By` varchar(50) NOT NULL DEFAULT 'Not Approved',
  `paymethod_id` int(11) DEFAULT NULL,
  `coupan` varchar(100) DEFAULT NULL,
  `date` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `deposit`
--

INSERT INTO `deposit` (`id`, `user_name`, `balance`, `image`, `image_path`, `transaction_id`, `payment_type`, `upi_id`, `status`, `reason`, `Approved_declined_By`, `paymethod_id`, `coupan`, `date`) VALUES
(107, '8690708302', '2999', 'd_image-1712405628046-546214406.png', 'image/deposit/', '2145852645', 'Deposit', NULL, 'Canceled', '.', 'test', 1, NULL, '2024-04-06 12:13:48'),
(108, '8690708302', '3000', 'd_image-1712405654644-405950513.png', 'image/deposit/', '2145852645', 'Deposit', NULL, 'Success', NULL, 'Superadmin', 1, NULL, '2024-04-06 12:14:14'),
(109, '8690708302', '500', NULL, NULL, NULL, 'Withdrawal', '8690708302152@paytm', 'Canceled', '.', 'Superadmin', NULL, NULL, '2024-04-08 05:55:59'),
(110, '8690708302', '500', NULL, NULL, NULL, 'Withdrawal', '8690708302152@paytm', 'Canceled', '.', 'Superadmin', NULL, NULL, '2024-04-08 05:56:11'),
(111, '9794368090', '2500', 'd_image-1712574016486-876854279.png', 'image/deposit/', 'Tanjsske4kszjdhsjf', 'Deposit', NULL, 'Success', NULL, 'Superadmin', 1, NULL, '2024-04-08 11:00:16'),
(112, '9794368090', '500', NULL, NULL, NULL, 'Withdrawal', NULL, 'Success', NULL, 'Superadmin', NULL, NULL, '2024-04-08 11:01:24'),
(113, '9794368090', '500', NULL, NULL, NULL, 'Plan Buy', NULL, 'Success', NULL, 'Not Approved', NULL, NULL, '2024-04-08 11:04:42'),
(114, '8690708302', '3000', 'd_image-1712574326628-124700872.png', 'image/deposit/', '4753675863', 'Deposit', NULL, 'Success', NULL, 'Superadmin', 1, NULL, '2024-04-08 11:05:26'),
(115, '8690708302', '500', NULL, NULL, NULL, 'Plan Buy', NULL, 'Success', NULL, 'Not Approved', NULL, NULL, '2024-04-08 11:06:04'),
(116, '8690708302', '400', NULL, NULL, NULL, 'Withdrawal', '8690708302@ipl', 'Success', NULL, 'test', NULL, NULL, '2024-04-10 12:24:28'),
(117, '8690708302', '2000', NULL, NULL, NULL, 'Withdrawal', '8690708302@ipl', 'Pending', NULL, 'Not Approved', NULL, NULL, '2024-04-10 12:26:42'),
(118, '8690708302', '200', NULL, NULL, NULL, 'Plan Buy', NULL, 'Success', NULL, 'Not Approved', NULL, NULL, '2024-04-10 12:27:51'),
(119, '8690708302', '100', NULL, NULL, NULL, 'Withdrawal', '8690708302@ipl', 'Canceled', '.', 'By User', NULL, NULL, '2024-04-10 12:31:37'),
(120, '8690708302', '200', NULL, NULL, NULL, 'Plan Buy', NULL, 'Success', NULL, 'Not Approved', NULL, NULL, '2024-04-11 07:31:16'),
(121, '8690708302', '500', NULL, NULL, NULL, 'Plan Buy', NULL, 'Success', NULL, 'Not Approved', NULL, NULL, '2024-04-11 07:31:45'),
(122, '8690708302', '200', NULL, NULL, NULL, 'Plan Buy', NULL, 'Success', NULL, 'Not Approved', NULL, NULL, '2024-04-11 07:35:45'),
(123, '8690708302', '200', NULL, NULL, NULL, 'Plan Buy', NULL, 'Success', NULL, 'Not Approved', NULL, NULL, '2024-04-11 07:35:59'),
(124, '8690708302', '100', NULL, NULL, NULL, 'Withdrawal', '8690708302@ipl', 'Canceled', '.', 'By User', NULL, NULL, '2024-04-11 09:28:59'),
(125, '8690708302', '200', NULL, NULL, NULL, 'Plan Buy', NULL, 'Success', NULL, 'Not Approved', NULL, NULL, '2024-04-11 09:35:29'),
(126, '8690708302', '49998', 'd_image-1712829820219-736113548.png', 'image/deposit/', '2145852645', 'Deposit', NULL, 'Success', NULL, 'test', 1, NULL, '2024-04-11 10:03:40'),
(127, '8690708302', '100', NULL, NULL, NULL, 'Plan Buy', NULL, 'Success', NULL, 'Not Approved', NULL, NULL, '2024-04-11 10:13:08'),
(128, '8690708302', '20000', 'd_image-1712831141237-868813195.png', 'image/deposit/', '2145852645', 'Deposit', NULL, 'Canceled', '.', 'test', 1, NULL, '2024-04-11 10:25:41'),
(129, '8690708302', '50000', 'd_image-1712831163655-261201278.png', 'image/deposit/', '2145852645', 'Deposit', NULL, 'Canceled', '.', 'test', 0, NULL, '2024-04-11 10:26:03'),
(130, '8690708302', '100', NULL, NULL, NULL, 'Plan Buy', NULL, 'Success', NULL, 'Not Approved', NULL, NULL, '2024-04-11 10:39:33'),
(131, '8690708302', '100', NULL, NULL, NULL, 'Plan Buy', NULL, 'Success', NULL, 'Not Approved', NULL, NULL, '2024-04-11 10:40:50'),
(132, '8690708302', '200', NULL, NULL, NULL, 'Plan Buy', NULL, 'Success', NULL, 'Not Approved', NULL, NULL, '2024-04-11 10:40:57'),
(133, '8690708302', '200', NULL, NULL, NULL, 'Plan Buy', NULL, 'Success', NULL, 'Not Approved', NULL, NULL, '2024-04-11 10:46:05'),
(134, '8690708302', '200', NULL, NULL, NULL, 'Plan Buy', NULL, 'Success', NULL, 'Not Approved', NULL, NULL, '2024-04-11 10:46:23'),
(135, '8690708302', '200', NULL, NULL, NULL, 'Plan Buy', NULL, 'Success', NULL, 'Not Approved', NULL, NULL, '2024-04-11 10:46:34'),
(136, '8690708302', '500', NULL, NULL, NULL, 'Plan Buy', NULL, 'Success', NULL, 'Not Approved', NULL, NULL, '2024-04-11 10:59:29'),
(137, '8690708302', '500', NULL, NULL, NULL, 'Plan Buy', NULL, 'Success', NULL, 'Not Approved', NULL, NULL, '2024-04-11 10:59:39'),
(138, '8690708302', '500', NULL, NULL, NULL, 'Plan Buy', NULL, 'Success', NULL, 'Not Approved', NULL, NULL, '2024-04-11 10:59:42'),
(139, '8690708302', '100', NULL, NULL, NULL, 'Withdrawal', '8690708302@ipl', 'Pending', NULL, 'Not Approved', NULL, NULL, '2024-04-11 11:02:05'),
(140, '8690708302', '100', NULL, NULL, NULL, 'Withdrawal', '8690708302@ipl', 'Pending', NULL, 'Not Approved', NULL, NULL, '2024-04-11 11:02:35'),
(141, '8690708302', '12000', 'd_image-1712833428700-808010259.png', 'image/deposit/', '2145852645', 'Deposit', NULL, 'Canceled', '.', 'test', 1, NULL, '2024-04-11 11:03:48'),
(142, '8690708302', '1000', 'd_image-1712833455236-326792825.png', 'image/deposit/', '2145852645', 'Deposit', NULL, 'Canceled', '.', 'test', 1, NULL, '2024-04-11 11:04:15'),
(143, '8690708302', '200', NULL, NULL, NULL, 'Plan Buy', NULL, 'Success', NULL, 'Not Approved', NULL, NULL, '2024-04-11 11:04:43'),
(144, '8690708302', '500', NULL, NULL, NULL, 'Plan Buy', NULL, 'Success', NULL, 'Not Approved', NULL, NULL, '2024-04-11 12:00:09'),
(145, '8690708302', '200', NULL, NULL, NULL, 'Plan Buy', NULL, 'Success', NULL, 'Not Approved', NULL, NULL, '2024-04-11 12:07:55'),
(146, '8690708302', '500', NULL, NULL, NULL, 'Plan Buy', NULL, 'Success', NULL, 'Not Approved', NULL, NULL, '2024-04-11 12:08:14'),
(147, '8690708302', '500', NULL, NULL, NULL, 'Plan Buy', NULL, 'Success', NULL, 'Not Approved', NULL, NULL, '2024-04-11 12:08:19'),
(148, '8690708302', '500', NULL, NULL, NULL, 'Plan Buy', NULL, 'Success', NULL, 'Not Approved', NULL, NULL, '2024-04-11 12:08:25'),
(149, '8690708302', '500', NULL, NULL, NULL, 'Plan Buy', NULL, 'Success', NULL, 'Not Approved', NULL, NULL, '2024-04-11 12:08:31'),
(150, '8690708302', '200', NULL, NULL, NULL, 'Plan Buy', NULL, 'Success', NULL, 'Not Approved', NULL, NULL, '2024-04-11 12:09:18'),
(151, '8690708302', '100', NULL, NULL, NULL, 'Withdrawal', '8690708302@ipl', 'Canceled', '.', 'By User', NULL, NULL, '2024-04-12 04:46:26'),
(152, '8690708302', '5000', 'd_image-1712904392836-609073636.png', 'image/deposit/', 'Guhjlhj', 'Deposit', NULL, 'Pending', NULL, 'Not Approved', 1, NULL, '2024-04-12 06:46:33'),
(153, '8690708302', '100', NULL, NULL, NULL, 'Withdrawal', '8690708302@ipl', 'Canceled', '.', 'By User', NULL, NULL, '2024-04-12 06:51:59'),
(154, '8690708302', '500', NULL, NULL, NULL, 'Plan Buy', NULL, 'Success', NULL, 'Not Approved', NULL, NULL, '2024-04-12 07:01:56'),
(155, '8690708302', '200', NULL, NULL, NULL, 'Plan Buy', NULL, 'Success', NULL, 'Not Approved', NULL, NULL, '2024-04-12 07:04:01'),
(156, '8690708302', '200', NULL, NULL, NULL, 'Plan Buy', NULL, 'Success', NULL, 'Not Approved', NULL, NULL, '2024-04-12 07:04:23'),
(157, '8690708302', '500', NULL, NULL, NULL, 'Plan Buy', NULL, 'Success', NULL, 'Not Approved', NULL, NULL, '2024-04-12 07:05:18'),
(158, '8690708302', '200', NULL, NULL, NULL, 'Plan Buy', NULL, 'Success', NULL, 'Not Approved', NULL, NULL, '2024-04-12 10:31:43'),
(159, '8690708302', '100', NULL, NULL, NULL, 'Withdrawal', '8690708302@ipl', 'Pending', NULL, 'Not Approved', NULL, NULL, '2024-04-12 10:34:26'),
(160, '8690708302', '2000', NULL, NULL, NULL, 'Withdrawal', '8690708302@ipl', 'Pending', NULL, 'Not Approved', NULL, NULL, '2024-04-12 11:03:07'),
(161, '8690708302', '100', NULL, NULL, NULL, 'Withdrawal', '8690708302@ipl', 'Pending', NULL, 'Not Approved', NULL, NULL, '2024-04-12 11:22:59');

-- --------------------------------------------------------

--
-- Table structure for table `login`
--

CREATE TABLE `login` (
  `id` int(11) NOT NULL,
  `name` varchar(10) NOT NULL,
  `username` varchar(100) NOT NULL,
  `password` varchar(100) NOT NULL,
  `is_active` varchar(1) NOT NULL DEFAULT 'N',
  `status` varchar(1) NOT NULL DEFAULT 'Y',
  `date` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `login`
--

INSERT INTO `login` (`id`, `name`, `username`, `password`, `is_active`, `status`, `date`) VALUES
(14, 'Kumar Ji', 'Superadmin', '$2b$12$JZZL/FuFOD.ibnxlComhVuWe7YzDq1zswgezphrzLk.Auq1wLuqGW', 'N', 'Y', '2022-07-29 00:02:44'),
(15, 'testing', 'test', '$2b$10$mh/WZV1LwVEnxzoTa5rKiuUOZT2urb81itGLIV73yiJ/rAgmwSHDi', 'Y', 'Y', '2023-03-03 06:05:15');

-- --------------------------------------------------------

--
-- Table structure for table `module`
--

CREATE TABLE `module` (
  `id` int(11) NOT NULL,
  `module_name` varchar(200) NOT NULL,
  `url` varchar(200) NOT NULL,
  `status` varchar(1) NOT NULL DEFAULT 'Y',
  `date` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `module`
--

INSERT INTO `module` (`id`, `module_name`, `url`, `status`, `date`) VALUES
(1, 'Dashboard', '/home/dashboard', 'Y', '2022-07-26 05:55:10'),
(13, 'module', '/home/module', 'Y', '2022-07-26 05:55:10'),
(18, 'role', '/home/role', 'Y', '2022-08-03 00:44:23'),
(20, 'activity mapping', '/home/activity-mapping', 'Y', '2022-08-05 00:35:20'),
(25, 'Withdrawal', '/home/withdrawal', 'Y', '2022-10-10 11:56:54'),
(26, 'Deposit', '/home/deposit', 'Y', '2022-10-10 11:57:34'),
(28, 'User Details', '/home/user-details', 'Y', '2022-10-19 05:26:14'),
(30, 'Sub-Admin', '/home/sub-admin', 'Y', '2023-02-16 09:55:26'),
(33, 'Bonus-tables', '/home/bonus-tables', 'Y', '2023-10-02 11:44:42'),
(34, 'Platform', '/home/platform', 'Y', '2024-04-08 11:27:31'),
(35, 'Task', '/home/task', 'Y', '2024-04-08 12:31:15'),
(36, 'Assign-Task', '/home/assign-task', 'Y', '2024-04-12 06:29:59');

-- --------------------------------------------------------

--
-- Table structure for table `new_payment_details`
--

CREATE TABLE `new_payment_details` (
  `id` int(11) NOT NULL,
  `upi_id` varchar(100) NOT NULL,
  `qr_code` varchar(100) NOT NULL,
  `number` varchar(10) NOT NULL,
  `status` varchar(1) NOT NULL DEFAULT 'N',
  `date` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `new_payment_details`
--

INSERT INTO `new_payment_details` (`id`, `upi_id`, `qr_code`, `number`, `status`, `date`) VALUES
(1, '999999999@upi', 'https://sparrowsports.com/image/task_deposit.png', '999999999', 'Y', '2024-04-06 04:51:38');

-- --------------------------------------------------------

--
-- Table structure for table `otp`
--

CREATE TABLE `otp` (
  `id` int(11) NOT NULL,
  `otp` varchar(200) NOT NULL,
  `number` varchar(200) NOT NULL,
  `date` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `otp`
--

INSERT INTO `otp` (`id`, `otp`, `number`, `date`) VALUES
(1, '$2b$12$TglLt6z92f96hdA9GIyLjek8Qbj40NBSrh0ddm3WIVH07kodGEXxO', '763048935345', '2022-09-03 04:15:02'),
(2, '$2b$12$ckXI902TvWih/CapMTjfFOXu0jRFP.U3YdnKzIXatM5UnzKOCNHC2', '855485896365', '2022-09-20 00:16:24');

-- --------------------------------------------------------

--
-- Table structure for table `payment_bonus`
--

CREATE TABLE `payment_bonus` (
  `id` int(11) NOT NULL,
  `offer_name` varchar(100) NOT NULL,
  `amount_start` varchar(100) NOT NULL,
  `amount_end` varchar(100) NOT NULL,
  `percentage` varchar(50) NOT NULL,
  `times` varchar(100) NOT NULL,
  `status` varchar(1) NOT NULL DEFAULT 'N',
  `end_date` date NOT NULL,
  `date` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `payment_bonus`
--

INSERT INTO `payment_bonus` (`id`, `offer_name`, `amount_start`, `amount_end`, `percentage`, `times`, `status`, `end_date`, `date`) VALUES
(4, 'First', '200', '500000', '50', '1', 'Y', '2050-12-31', '2024-02-24 10:31:34'),
(5, 'Second', '200', '500000', '30', '1', 'Y', '2050-12-31', '2024-02-24 10:32:41'),
(6, 'third', '200', '500000', '20', '1', 'Y', '2050-12-31', '2024-02-24 10:33:13'),
(7, 'fourth', '200', '500000', '10', '1', 'Y', '2050-12-31', '2024-02-24 10:33:38'),
(8, 'fifth', '200', '500000', '5', '1', 'Y', '2050-12-31', '2024-02-24 10:34:15'),
(9, 'bonus10', '500', '3000', '10', '10000', 'Y', '2050-12-31', '2024-02-24 10:35:48'),
(10, 'bonus15', '3001', '8000', '15', '10000', 'Y', '2050-12-31', '2024-02-24 10:38:42'),
(11, 'bonus18', '8001', '15000', '18', '10000', 'Y', '2050-12-31', '2024-02-24 10:39:21'),
(12, 'bonus20', '15001', '50000', '20', '10000', 'Y', '2050-12-31', '2024-02-24 10:41:23');

-- --------------------------------------------------------

--
-- Table structure for table `plan`
--

CREATE TABLE `plan` (
  `id` int(11) NOT NULL,
  `name` varchar(200) NOT NULL,
  `price` varchar(100) NOT NULL,
  `total_video` varchar(100) NOT NULL,
  `total_comment` varchar(100) NOT NULL,
  `total_like` varchar(100) NOT NULL,
  `total_video_price` varchar(100) NOT NULL,
  `total_video_comment` varchar(100) NOT NULL,
  `total_video_like` varchar(100) NOT NULL,
  `earn_upto` varchar(50) NOT NULL,
  `date` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `plan`
--

INSERT INTO `plan` (`id`, `name`, `price`, `total_video`, `total_comment`, `total_like`, `total_video_price`, `total_video_comment`, `total_video_like`, `earn_upto`, `date`) VALUES
(1, 'Free', '0', '3', '4', '5', '5', '3', '2', '300', '2024-04-02 06:45:47'),
(2, 'Basic', '100', '6', '8', '10', '10', '6', '4', '600', '2024-04-02 06:45:47'),
(3, 'Silver', '200', '12', '16', '20', '20', '12', '8', '1200', '2024-04-02 06:46:22'),
(4, 'Gold', '500', '30', '40', '50', '50', '30', '20', '3000', '2024-04-02 06:46:22');

-- --------------------------------------------------------

--
-- Table structure for table `platforms`
--

CREATE TABLE `platforms` (
  `id` int(11) NOT NULL,
  `name` varchar(100) NOT NULL,
  `status` varchar(1) NOT NULL DEFAULT 'Y',
  `date` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `platforms`
--

INSERT INTO `platforms` (`id`, `name`, `status`, `date`) VALUES
(1, 'Instagram', 'Y', '2024-04-08 11:41:32'),
(2, 'Facebook', 'Y', '2024-04-08 12:06:41'),
(3, 'Twitter', 'Y', '2024-04-08 12:06:49'),
(4, 'Linkdin', 'Y', '2024-04-08 12:06:59'),
(5, 'Youtube', 'Y', '2024-04-08 12:07:07');

-- --------------------------------------------------------

--
-- Table structure for table `reffal_level`
--

CREATE TABLE `reffal_level` (
  `id` int(11) NOT NULL,
  `user_reffral` varchar(100) NOT NULL,
  `level_1` varchar(100) DEFAULT NULL,
  `level_2` varchar(100) DEFAULT NULL,
  `level_3` varchar(100) DEFAULT NULL,
  `level_4` varchar(100) DEFAULT NULL,
  `level_5` varchar(100) DEFAULT NULL,
  `level_6` varchar(100) DEFAULT NULL,
  `date` timestamp NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `reffal_level`
--

INSERT INTO `reffal_level` (`id`, `user_reffral`, `level_1`, `level_2`, `level_3`, `level_4`, `level_5`, `level_6`, `date`) VALUES
(10, 'GJpQpVEO', 'vxnr5WJu', NULL, NULL, NULL, NULL, NULL, '2024-04-08 09:14:43'),
(11, 'GJpQpVEO', 'pEByfmbr', NULL, NULL, NULL, NULL, NULL, '2024-04-08 09:14:47'),
(12, 'GJpQpVEO', 'pEByfmbr', 'NUY8MYHx', NULL, NULL, NULL, NULL, '2024-04-08 09:17:45'),
(13, 'GJpQpVEO', 'pEByfmbr', 'NUY8MYHx', 'YfVSx7xY', NULL, NULL, NULL, '2024-04-08 09:33:40'),
(14, 'pEByfmbr', 'NUY8MYHx', 'YfVSx7xY', 'uaEQinSz', NULL, NULL, NULL, '2024-04-08 09:38:29'),
(15, 'GJpQpVEO', 'E8SnHGy3', NULL, NULL, NULL, NULL, NULL, '2024-04-11 10:57:47'),
(16, 'GJpQpVEO', 'zCx13fCS', NULL, NULL, NULL, NULL, NULL, '2024-04-11 10:58:19');

-- --------------------------------------------------------

--
-- Table structure for table `reffer_bonus`
--

CREATE TABLE `reffer_bonus` (
  `id` int(11) NOT NULL,
  `referral` varchar(100) NOT NULL,
  `applier` varchar(100) NOT NULL,
  `status` varchar(1) NOT NULL DEFAULT 'N',
  `date` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `reffer_bonus`
--

INSERT INTO `reffer_bonus` (`id`, `referral`, `applier`, `status`, `date`) VALUES
(1, '250', '200', 'N', '2023-09-30 08:52:42'),
(5, '250', '20', 'Y', '2023-12-14 10:06:06');

-- --------------------------------------------------------

--
-- Table structure for table `role`
--

CREATE TABLE `role` (
  `id` int(11) NOT NULL,
  `name` varchar(100) NOT NULL,
  `display_name` varchar(100) NOT NULL,
  `view` varchar(100) NOT NULL,
  `delete_d` varchar(100) NOT NULL,
  `update_d` varchar(100) NOT NULL,
  `role_assign` varchar(1) NOT NULL DEFAULT 'N',
  `status` varchar(1) NOT NULL DEFAULT 'N',
  `date` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `role`
--

INSERT INTO `role` (`id`, `name`, `display_name`, `view`, `delete_d`, `update_d`, `role_assign`, `status`, `date`) VALUES
(3, 'Super Admin', 'Super Administration', 'true', 'true', 'true', 'Y', 'N', '2022-07-23 00:43:22'),
(5, 'Developer', 'For developer', 'true', 'true', 'true', 'Y', 'N', '2023-02-17 06:14:26'),
(6, 'View Admin', 'View Only', 'true', 'false', 'false', 'Y', 'N', '2023-03-01 10:36:21');

-- --------------------------------------------------------

--
-- Table structure for table `role_assign`
--

CREATE TABLE `role_assign` (
  `id` int(11) NOT NULL,
  `user_id` int(11) NOT NULL,
  `role_id` int(11) NOT NULL,
  `status` varchar(1) NOT NULL DEFAULT 'Y',
  `date` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `role_assign`
--

INSERT INTO `role_assign` (`id`, `user_id`, `role_id`, `status`, `date`) VALUES
(4, 14, 3, 'Y', '2023-02-16 09:07:07'),
(5, 15, 5, 'Y', '2023-03-03 06:05:15');

-- --------------------------------------------------------

--
-- Table structure for table `statement`
--

CREATE TABLE `statement` (
  `id` int(11) NOT NULL,
  `username` varchar(50) DEFAULT NULL,
  `bet_or_type` varchar(50) DEFAULT NULL,
  `period` varchar(50) DEFAULT NULL,
  `Select` varchar(50) DEFAULT NULL,
  `bet_from` varchar(50) DEFAULT NULL,
  `bet_balance` varchar(50) DEFAULT NULL,
  `total_balance` varchar(50) DEFAULT NULL,
  `status` varchar(50) NOT NULL DEFAULT 'Y',
  `date` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `tasks_with_name`
--

CREATE TABLE `tasks_with_name` (
  `id` int(11) NOT NULL,
  `task_url` varchar(200) NOT NULL,
  `type` varchar(100) NOT NULL,
  `platform_id` int(11) NOT NULL,
  `comment_details` varchar(200) DEFAULT NULL,
  `date` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `tasks_with_name`
--

INSERT INTO `tasks_with_name` (`id`, `task_url`, `type`, `platform_id`, `comment_details`, `date`) VALUES
(1, 'https://www.instagram.com/p/Cx0h2Zzx_6l/?utm_source=ig_web_copy_link&igsh=MzRlODBiNWFlZA==', 'LIKE', 1, NULL, '2024-04-10 09:51:17'),
(2, 'https://fb.watch/rmfAgR-0sI/', 'COMMENT', 2, NULL, '2024-04-10 11:06:11'),
(3, 'https://www.instagram.com/p/CqLrMMFytHe/?utm_source=ig_web_copy_link&igsh=MzRlODBiNWFlZA==', 'LIKE', 1, NULL, '2024-04-10 11:25:05'),
(4, 'https://www.instagram.com/p/CqLrMMFytHe/?utm_source=ig_web_copy_link&igsh=MzRlODBiNWFlZA==', 'COMMENT', 1, NULL, '2024-04-10 11:25:45'),
(5, 'https://www.instagram.com/reel/C5inGM1vPj0/?utm_source=ig_web_copy_link', 'LIKE', 1, NULL, '2024-04-10 11:26:24'),
(6, 'https://www.instagram.com/reel/C5inGM1vPj0/?utm_source=ig_web_copy_link', 'COMMENT', 1, NULL, '2024-04-10 11:26:37'),
(7, 'https://www.instagram.com/reel/C5gCOKyPTRC/?utm_source=ig_web_copy_link&igsh=MzRlODBiNWFlZA==', 'LIKE', 1, NULL, '2024-04-10 11:27:01'),
(8, 'https://www.instagram.com/reel/C5gCOKyPTRC/?utm_source=ig_web_copy_link&igsh=MzRlODBiNWFlZA==', 'COMMENT', 1, NULL, '2024-04-10 11:27:09'),
(9, 'https://www.instagram.com/reel/C5a5gQ8xbQb/?utm_source=ig_web_copy_link&igsh=MzRlODBiNWFlZA==', 'LIKE', 1, NULL, '2024-04-10 11:27:43'),
(10, 'https://www.instagram.com/reel/C5a5gQ8xbQb/?utm_source=ig_web_copy_link&igsh=MzRlODBiNWFlZA==', 'COMMENT', 1, NULL, '2024-04-10 11:27:57'),
(11, 'https://www.instagram.com/reel/C5TKTMmxWK8/?utm_source=ig_web_copy_link&igsh=MzRlODBiNWFlZA==', 'LIKE', 1, NULL, '2024-04-10 11:28:31'),
(12, 'https://www.instagram.com/reel/C5TKTMmxWK8/?utm_source=ig_web_copy_link&igsh=MzRlODBiNWFlZA==', 'COMMENT', 1, NULL, '2024-04-10 11:28:40'),
(13, 'https://www.instagram.com/reel/C5OABgCx_ld/?utm_source=ig_web_copy_link&igsh=MzRlODBiNWFlZA==', 'LIKE', 1, NULL, '2024-04-10 11:28:59'),
(14, 'https://www.instagram.com/reel/C5OABgCx_ld/?utm_source=ig_web_copy_link&igsh=MzRlODBiNWFlZA==', 'COMMENT', 1, NULL, '2024-04-10 11:29:09'),
(15, 'https://www.instagram.com/p/Cx0h2Zzx_6l/?utm_source=ig_web_copy_link&igsh=MzRlODBiNWFlZA==', 'COMMENT', 1, 'Hello, testing Person', '2024-04-11 06:57:31'),
(16, 'https://www.instagram.com/p/Cx0h2Zzx_6l/?utm_source=ig_web_copy_link&igsh=MzRlODBiNWFlZA==', 'LIKE', 2, NULL, '2024-04-11 07:06:07'),
(25, 'https://www.instagram.com/p/Cx0h2Zzx_6l/?utm_source=ig_web_copy_link&igsh=MzRlODBiNWFlZA==', 'COMMENT', 1, 'The colors in this picture are so vibrant and alive. It\'s like a burst of joy', '2024-04-11 07:17:06'),
(26, 'https://www.instagram.com/p/Cx0h2Zzx_6l/?utm_source=ig_web_copy_link&igsh=MzRlODBiNWFlZA==', 'COMMENT', 2, NULL, '2024-04-11 07:17:32'),
(27, 'image/video/video-1712820427897-429632752.mp4', 'VIDEO', 1, NULL, '2024-04-11 07:27:07'),
(28, 'image/video/video-1712820584291-173642796.mp4', 'VIDEO', 1, NULL, '2024-04-11 07:29:44'),
(29, 'image/video/video-1712820631986-473334909.mp4', 'VIDEO', 4, NULL, '2024-04-11 07:30:31'),
(30, 'image/video/video-1712820651211-738930095.mp4', 'VIDEO', 5, NULL, '2024-04-11 07:30:51'),
(31, 'https://www.instagram.com/p/Cx0h2Zzx_6l/?utm_source=ig_web_copy_link&igsh=MzRlODBiNWFlZA==', 'COMMENT', 1, 'The colors in this picture are so vibrant and alive. It\'s like a burst of joy', '2024-04-11 07:55:44'),
(32, 'https://www.instagram.com/p/Cx0h2Zzx_6l/?utm_source=ig_web_copy_link&igsh=MzRlODBiNWFlZA==', 'COMMENT', 1, 'Hello, Testing Gays', '2024-04-11 07:56:17');

-- --------------------------------------------------------

--
-- Table structure for table `user_details`
--

CREATE TABLE `user_details` (
  `id` int(11) NOT NULL,
  `username` varchar(200) NOT NULL,
  `mobile` varchar(200) NOT NULL,
  `password` varchar(200) NOT NULL,
  `email` varchar(100) DEFAULT NULL,
  `pincode` varchar(100) DEFAULT NULL,
  `uid` varchar(50) NOT NULL,
  `is_active` varchar(1) NOT NULL DEFAULT 'N',
  `reffer_by` varchar(200) DEFAULT NULL,
  `reffer_code` varchar(200) DEFAULT NULL,
  `plan_type` int(11) DEFAULT 1,
  `upi_id` varchar(100) DEFAULT NULL,
  `bank_name` varchar(100) DEFAULT NULL,
  `ifsc_code` varchar(100) DEFAULT NULL,
  `ac_no` varchar(100) DEFAULT NULL,
  `ac_name` varchar(100) DEFAULT NULL,
  `date` timestamp NOT NULL DEFAULT current_timestamp(),
  `purchase_date` datetime NOT NULL DEFAULT current_timestamp(),
  `plan_expire` timestamp NOT NULL DEFAULT current_timestamp(),
  `status` varchar(1) DEFAULT 'Y'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `user_details`
--

INSERT INTO `user_details` (`id`, `username`, `mobile`, `password`, `email`, `pincode`, `uid`, `is_active`, `reffer_by`, `reffer_code`, `plan_type`, `upi_id`, `bank_name`, `ifsc_code`, `ac_no`, `ac_name`, `date`, `purchase_date`, `plan_expire`, `status`) VALUES
(62, 'admin', '8898765437', '$2b$12$3XdC4y9AeVqqs7Sfyboiy.NvROr9SCZO01uKQ.jqDherUH2PD6U7q', 'admin@gmail.com', '302029', '100001', 'Y', '', 'GJpQpVEO', 4, NULL, NULL, NULL, NULL, NULL, '2024-04-05 05:43:24', '2024-04-08 00:00:00', '2024-05-07 18:30:00', 'Y'),
(75, 'Tarun', '8690708302', '$2b$12$XwG0KViaHPXr68devrGr4OOgt0R44OeJ29keQ2T90hFmOgPxWWH7W', 'tarun@gmail', '302029', '100002', 'Y', 'GJpQpVEO', 'vxnr5WJu', 3, '8690708302@ipl', 'SBI', 'SBIN000000', '9874563214', 'TEJPAL SONI', '2024-04-08 09:14:43', '2024-04-11 00:00:00', '2024-05-10 18:30:00', 'Y'),
(76, 'Sudhanshu Maurya', '9794368090', '$2b$12$81neqeylB0UdzdScKYv4jeic4IKweN4vaeCkepMZPTCJs5CoPvuF.', 'sudhanshumaurya@gmail.com', NULL, '100003', 'Y', 'GJpQpVEO', 'pEByfmbr', 4, NULL, NULL, NULL, NULL, NULL, '2024-04-08 09:14:47', '2024-04-08 00:00:00', '2024-05-07 18:30:00', 'Y');

-- --------------------------------------------------------

--
-- Table structure for table `user_level`
--

CREATE TABLE `user_level` (
  `id` int(11) NOT NULL,
  `user_reffral` varchar(100) DEFAULT NULL,
  `level_1` varchar(100) DEFAULT NULL,
  `level_2` varchar(100) DEFAULT NULL,
  `level_3` varchar(100) DEFAULT NULL,
  `level_4` varchar(100) DEFAULT NULL,
  `level_5` varchar(100) DEFAULT NULL,
  `level_6` varchar(100) DEFAULT NULL,
  `date` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `user_level`
--

INSERT INTO `user_level` (`id`, `user_reffral`, `level_1`, `level_2`, `level_3`, `level_4`, `level_5`, `level_6`, `date`) VALUES
(14, 'GJpQpVEO', NULL, NULL, NULL, NULL, NULL, NULL, '2024-04-08 06:29:59'),
(25, 'vxnr5WJu', 'GJpQpVEO', NULL, NULL, NULL, NULL, NULL, '2024-04-08 09:14:43'),
(26, 'pEByfmbr', 'GJpQpVEO', NULL, NULL, NULL, NULL, NULL, '2024-04-08 09:14:47'),
(27, 'NUY8MYHx', 'pEByfmbr', 'GJpQpVEO', NULL, NULL, NULL, NULL, '2024-04-08 09:17:45'),
(28, 'YfVSx7xY', 'NUY8MYHx', 'pEByfmbr', 'GJpQpVEO', NULL, NULL, NULL, '2024-04-08 09:33:40'),
(29, 'uaEQinSz', 'YfVSx7xY', 'NUY8MYHx', 'pEByfmbr', NULL, NULL, NULL, '2024-04-08 09:38:29'),
(30, 'E8SnHGy3', 'GJpQpVEO', NULL, NULL, NULL, NULL, NULL, '2024-04-11 10:57:47'),
(31, 'zCx13fCS', 'GJpQpVEO', NULL, NULL, NULL, NULL, NULL, '2024-04-11 10:58:19');

-- --------------------------------------------------------

--
-- Table structure for table `wallet`
--

CREATE TABLE `wallet` (
  `id` int(11) NOT NULL,
  `user_name` varchar(200) NOT NULL,
  `wallet_balance` varchar(200) NOT NULL,
  `winning_wallet` varchar(10) NOT NULL DEFAULT '0',
  `status` varchar(1) NOT NULL DEFAULT 'Y',
  `date` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `wallet`
--

INSERT INTO `wallet` (`id`, `user_name`, `wallet_balance`, `winning_wallet`, `status`, `date`) VALUES
(46, '8898765437', '800', '0', 'Y', '2024-04-05 05:43:24'),
(67, '8690708302', '40398', '0', 'Y', '2024-04-08 09:14:43'),
(68, '9794368090', '1500', '0', 'Y', '2024-04-08 09:14:47'),
(69, '92745724271', '0', '0', 'Y', '2024-04-08 09:17:45'),
(70, '765434567890', '0', '0', 'Y', '2024-04-08 09:33:40'),
(71, '7643234567234', '0', '0', 'Y', '2024-04-08 09:38:29'),
(72, '5555522222', '0', '0', 'Y', '2024-04-11 10:57:47'),
(73, '8521478525', '0', '0', 'Y', '2024-04-11 10:58:19');

-- --------------------------------------------------------

--
-- Table structure for table `withdrawal`
--

CREATE TABLE `withdrawal` (
  `id` int(11) NOT NULL,
  `user_name` varchar(200) NOT NULL,
  `balance` varchar(200) NOT NULL,
  `Approved_declined_By` varchar(50) NOT NULL DEFAULT 'Not Approved',
  `status` varchar(50) NOT NULL DEFAULT 'Pending',
  `paymethod_id` int(11) NOT NULL,
  `paytype` varchar(50) NOT NULL,
  `reason` varchar(200) DEFAULT NULL,
  `date` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Indexes for dumped tables
--

--
-- Indexes for table `agents_statement`
--
ALTER TABLE `agents_statement`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `assign_module`
--
ALTER TABLE `assign_module`
  ADD PRIMARY KEY (`id`),
  ADD KEY `module` (`module`),
  ADD KEY `role_x` (`role`);

--
-- Indexes for table `assign_task`
--
ALTER TABLE `assign_task`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `bank_details`
--
ALTER TABLE `bank_details`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `account_number` (`account_number`);

--
-- Indexes for table `buy_plan`
--
ALTER TABLE `buy_plan`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `commets`
--
ALTER TABLE `commets`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `contact`
--
ALTER TABLE `contact`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `deposit`
--
ALTER TABLE `deposit`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `login`
--
ALTER TABLE `login`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `user` (`username`);

--
-- Indexes for table `module`
--
ALTER TABLE `module`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `module_name` (`module_name`);

--
-- Indexes for table `new_payment_details`
--
ALTER TABLE `new_payment_details`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `number` (`number`),
  ADD UNIQUE KEY `upi_id` (`upi_id`);

--
-- Indexes for table `otp`
--
ALTER TABLE `otp`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `number` (`number`);

--
-- Indexes for table `payment_bonus`
--
ALTER TABLE `payment_bonus`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `offer_name` (`offer_name`);

--
-- Indexes for table `plan`
--
ALTER TABLE `plan`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `name` (`name`);

--
-- Indexes for table `platforms`
--
ALTER TABLE `platforms`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `reffal_level`
--
ALTER TABLE `reffal_level`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `reffer_bonus`
--
ALTER TABLE `reffer_bonus`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `role`
--
ALTER TABLE `role`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `display_name` (`display_name`);

--
-- Indexes for table `role_assign`
--
ALTER TABLE `role_assign`
  ADD PRIMARY KEY (`id`),
  ADD KEY `user_id` (`user_id`),
  ADD KEY `role` (`role_id`);

--
-- Indexes for table `statement`
--
ALTER TABLE `statement`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `tasks_with_name`
--
ALTER TABLE `tasks_with_name`
  ADD PRIMARY KEY (`id`),
  ADD KEY `platform_id` (`platform_id`);

--
-- Indexes for table `user_details`
--
ALTER TABLE `user_details`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `uid` (`uid`),
  ADD UNIQUE KEY `mobile` (`mobile`),
  ADD UNIQUE KEY `reffer_code` (`reffer_code`),
  ADD UNIQUE KEY `email` (`email`);

--
-- Indexes for table `user_level`
--
ALTER TABLE `user_level`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `wallet`
--
ALTER TABLE `wallet`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `user_name` (`user_name`);

--
-- Indexes for table `withdrawal`
--
ALTER TABLE `withdrawal`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `agents_statement`
--
ALTER TABLE `agents_statement`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=57;

--
-- AUTO_INCREMENT for table `assign_module`
--
ALTER TABLE `assign_module`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=436;

--
-- AUTO_INCREMENT for table `assign_task`
--
ALTER TABLE `assign_task`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=14;

--
-- AUTO_INCREMENT for table `bank_details`
--
ALTER TABLE `bank_details`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `buy_plan`
--
ALTER TABLE `buy_plan`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=17;

--
-- AUTO_INCREMENT for table `commets`
--
ALTER TABLE `commets`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=9;

--
-- AUTO_INCREMENT for table `contact`
--
ALTER TABLE `contact`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- AUTO_INCREMENT for table `deposit`
--
ALTER TABLE `deposit`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=162;

--
-- AUTO_INCREMENT for table `login`
--
ALTER TABLE `login`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=16;

--
-- AUTO_INCREMENT for table `module`
--
ALTER TABLE `module`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=37;

--
-- AUTO_INCREMENT for table `new_payment_details`
--
ALTER TABLE `new_payment_details`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT for table `otp`
--
ALTER TABLE `otp`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT for table `payment_bonus`
--
ALTER TABLE `payment_bonus`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=13;

--
-- AUTO_INCREMENT for table `plan`
--
ALTER TABLE `plan`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT for table `platforms`
--
ALTER TABLE `platforms`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- AUTO_INCREMENT for table `reffal_level`
--
ALTER TABLE `reffal_level`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=17;

--
-- AUTO_INCREMENT for table `reffer_bonus`
--
ALTER TABLE `reffer_bonus`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- AUTO_INCREMENT for table `role`
--
ALTER TABLE `role`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;

--
-- AUTO_INCREMENT for table `role_assign`
--
ALTER TABLE `role_assign`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- AUTO_INCREMENT for table `statement`
--
ALTER TABLE `statement`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=1288;

--
-- AUTO_INCREMENT for table `tasks_with_name`
--
ALTER TABLE `tasks_with_name`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=33;

--
-- AUTO_INCREMENT for table `user_details`
--
ALTER TABLE `user_details`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=82;

--
-- AUTO_INCREMENT for table `user_level`
--
ALTER TABLE `user_level`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=32;

--
-- AUTO_INCREMENT for table `wallet`
--
ALTER TABLE `wallet`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=74;

--
-- AUTO_INCREMENT for table `withdrawal`
--
ALTER TABLE `withdrawal`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=14;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `assign_module`
--
ALTER TABLE `assign_module`
  ADD CONSTRAINT `module` FOREIGN KEY (`module`) REFERENCES `module` (`id`),
  ADD CONSTRAINT `role_x` FOREIGN KEY (`role`) REFERENCES `role` (`id`);

--
-- Constraints for table `role_assign`
--
ALTER TABLE `role_assign`
  ADD CONSTRAINT `role` FOREIGN KEY (`role_id`) REFERENCES `role` (`id`),
  ADD CONSTRAINT `user_id` FOREIGN KEY (`user_id`) REFERENCES `login` (`id`);

--
-- Constraints for table `tasks_with_name`
--
ALTER TABLE `tasks_with_name`
  ADD CONSTRAINT `platform_id` FOREIGN KEY (`platform_id`) REFERENCES `platforms` (`id`);

--
-- Constraints for table `user_details`
--
ALTER TABLE `user_details`
  ADD CONSTRAINT `plan_type` FOREIGN KEY (`plan_type`) REFERENCES `plan` (`id`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
