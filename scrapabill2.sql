-- phpMyAdmin SQL Dump
-- version 5.0.2
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: May 05, 2021 at 03:59 PM
-- Server version: 10.4.13-MariaDB
-- PHP Version: 7.4.7

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `scrapabill2`
--

-- --------------------------------------------------------

--
-- Table structure for table `adonis_schema`
--

CREATE TABLE `adonis_schema` (
  `id` int(10) UNSIGNED NOT NULL,
  `name` varchar(255) DEFAULT NULL,
  `batch` int(11) DEFAULT NULL,
  `migration_time` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `adonis_schema`
--

INSERT INTO `adonis_schema` (`id`, `name`, `batch`, `migration_time`) VALUES
(1, '1503248427885_user', 1, '2021-04-19 10:24:57'),
(2, '1503248427886_token', 1, '2021-04-19 10:24:57'),
(3, '1619606091176_post_schema', 2, '2021-04-28 10:37:39'),
(4, '1619606372298_feed_schema', 3, '2021-04-28 10:39:46'),
(5, '1619607530860_test_schema', 4, '2021-04-28 11:28:35'),
(6, '1619757979099_comment_schema', 5, '2021-04-30 04:46:40'),
(7, '1620036782243_reply_schema', 6, '2021-05-03 10:13:21'),
(8, '1620122549577_reaction_schema', 7, '2021-05-04 10:02:46');

-- --------------------------------------------------------

--
-- Table structure for table `comments`
--

CREATE TABLE `comments` (
  `id` int(10) UNSIGNED NOT NULL,
  `user_id` int(10) UNSIGNED NOT NULL,
  `feed_id` int(10) UNSIGNED NOT NULL,
  `commentTxt` text DEFAULT NULL,
  `fileType` varchar(255) DEFAULT NULL,
  `created_at` datetime DEFAULT NULL,
  `updated_at` datetime DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `comments`
--

INSERT INTO `comments` (`id`, `user_id`, `feed_id`, `commentTxt`, `fileType`, `created_at`, `updated_at`) VALUES
(1, 62, 42, 'test comment', NULL, '2021-04-30 12:17:40', '2021-04-30 12:17:40'),
(4, 62, 41, 'this is an almirah', NULL, '2021-05-03 08:34:50', '2021-05-03 08:34:50'),
(5, 62, 41, 'second comment', NULL, '2021-05-03 08:57:24', '2021-05-03 08:57:24'),
(6, 62, 41, 'third comment edited', NULL, '2021-05-03 08:58:04', '2021-05-03 16:09:07'),
(7, 62, 42, 'test comment two', NULL, '2021-05-03 08:58:36', '2021-05-03 08:58:36'),
(18, 62, 43, 'ook', NULL, '2021-05-04 00:16:56', '2021-05-04 15:59:27'),
(19, 62, 48, 'dfdads', NULL, '2021-05-05 15:28:16', '2021-05-05 15:28:16'),
(20, 62, 48, 'sdfadfa', NULL, '2021-05-05 15:33:13', '2021-05-05 15:33:13'),
(21, 62, 42, 'sdfa', NULL, '2021-05-05 15:35:49', '2021-05-05 15:35:49'),
(22, 63, 52, 'new comment', NULL, '2021-05-05 18:17:42', '2021-05-05 18:17:42');

-- --------------------------------------------------------

--
-- Table structure for table `comment_likes`
--

CREATE TABLE `comment_likes` (
  `id` int(11) NOT NULL,
  `user_id` int(11) NOT NULL,
  `comment_id` int(11) NOT NULL,
  `created_at` datetime DEFAULT NULL,
  `updated_at` datetime DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Table structure for table `feeds`
--

CREATE TABLE `feeds` (
  `id` int(10) UNSIGNED NOT NULL,
  `user_id` int(10) UNSIGNED NOT NULL,
  `feedTxt` text DEFAULT NULL,
  `images` text CHARACTER SET utf8mb4 COLLATE utf8mb4_bin DEFAULT NULL,
  `metaData` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_bin DEFAULT NULL,
  `type` varchar(10) NOT NULL DEFAULT 'feed',
  `created_at` datetime DEFAULT NULL,
  `updated_at` datetime DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `feeds`
--

INSERT INTO `feeds` (`id`, `user_id`, `feedTxt`, `images`, `metaData`, `type`, `created_at`, `updated_at`) VALUES
(41, 62, 'Deserunt amet ea su', '[\"http://127.0.0.1:3333/uploads/1619757243608.png\"]', NULL, 'feed', '2021-04-30 10:34:11', '2021-04-30 10:34:11'),
(42, 62, 'Eaque sequi est tem', '\"\"', NULL, 'feed', '2021-04-30 10:38:26', '2021-04-30 10:38:26'),
(43, 62, 'This is my second post', '[]', NULL, 'feed', '2021-04-30 15:17:30', '2021-05-04 23:15:16'),
(48, 62, 'dfsdfasdfa dadfa d', '[\"http://127.0.0.1:3333/uploads/1620206700195.jpeg\",\"http://127.0.0.1:3333/uploads/1620206710015.png\"]', NULL, 'feed', '2021-05-05 15:25:12', '2021-05-05 15:25:12'),
(49, 62, 'new post', '[]', NULL, 'feed', '2021-05-05 16:37:54', '2021-05-05 16:37:54'),
(52, 62, 'testing new', '[\"http://127.0.0.1:3333/uploads/1620212799340.jpeg\"]', NULL, 'feed', '2021-05-05 17:06:45', '2021-05-05 19:52:08'),
(55, 63, 'new testing post', '[]', NULL, 'feed', '2021-05-05 18:07:32', '2021-05-05 18:07:32');

-- --------------------------------------------------------

--
-- Table structure for table `likes`
--

CREATE TABLE `likes` (
  `id` int(11) NOT NULL,
  `feed_id` int(11) UNSIGNED NOT NULL,
  `user_id` int(11) NOT NULL,
  `created_at` datetime DEFAULT NULL,
  `updated_at` datetime DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `likes`
--

INSERT INTO `likes` (`id`, `feed_id`, `user_id`, `created_at`, `updated_at`) VALUES
(22, 41, 62, '2021-05-05 15:18:56', '2021-05-05 15:18:56'),
(27, 42, 62, '2021-05-05 16:18:58', '2021-05-05 16:18:58');

-- --------------------------------------------------------

--
-- Table structure for table `reactions`
--

CREATE TABLE `reactions` (
  `id` int(10) UNSIGNED NOT NULL,
  `created_at` datetime DEFAULT NULL,
  `updated_at` datetime DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Table structure for table `replies`
--

CREATE TABLE `replies` (
  `id` int(10) UNSIGNED NOT NULL,
  `user_id` int(10) UNSIGNED NOT NULL,
  `comment_id` int(10) UNSIGNED NOT NULL,
  `replyTxt` text NOT NULL,
  `created_at` datetime DEFAULT NULL,
  `updated_at` datetime DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `replies`
--

INSERT INTO `replies` (`id`, `user_id`, `comment_id`, `replyTxt`, `created_at`, `updated_at`) VALUES
(1, 62, 15, 'my first reply', '2021-05-03 17:49:57', '2021-05-03 17:49:57'),
(2, 62, 2, 'reply two', '2021-05-03 17:50:25', '2021-05-03 17:50:25'),
(3, 62, 7, 'What is test comment two ??', '2021-05-03 17:50:47', '2021-05-04 08:39:55'),
(4, 62, 7, 'This is test reply two.', '2021-05-03 21:50:06', '2021-05-04 08:40:29'),
(5, 62, 18, 'new reply Editing', '2021-05-04 00:22:47', '2021-05-04 08:39:20'),
(12, 62, 7, 'it\'s cool', '2021-05-04 08:40:49', '2021-05-04 08:40:49'),
(13, 62, 17, 'dsafa', '2021-05-05 00:25:50', '2021-05-05 00:25:50'),
(17, 62, 19, 'fdsds', '2021-05-05 15:29:16', '2021-05-05 15:29:16'),
(18, 63, 19, 'testing reply', '2021-05-05 18:02:43', '2021-05-05 18:02:43');

-- --------------------------------------------------------

--
-- Table structure for table `reply_likes`
--

CREATE TABLE `reply_likes` (
  `id` int(11) NOT NULL,
  `user_id` int(11) NOT NULL,
  `reply_id` int(11) NOT NULL,
  `created_at` datetime DEFAULT NULL,
  `updated_at` datetime DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Table structure for table `tokens`
--

CREATE TABLE `tokens` (
  `id` int(10) UNSIGNED NOT NULL,
  `user_id` int(10) UNSIGNED DEFAULT NULL,
  `token` varchar(255) NOT NULL,
  `type` varchar(80) NOT NULL,
  `is_revoked` tinyint(1) DEFAULT 0,
  `created_at` datetime DEFAULT NULL,
  `updated_at` datetime DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE `users` (
  `id` int(10) UNSIGNED NOT NULL,
  `firstName` varchar(255) NOT NULL,
  `lastName` varchar(255) NOT NULL,
  `username` varchar(255) NOT NULL,
  `email` varchar(255) NOT NULL,
  `phone` varchar(20) DEFAULT NULL,
  `password` varchar(255) NOT NULL,
  `provider` varchar(255) DEFAULT NULL,
  `provider_id` varchar(255) DEFAULT NULL,
  `is_active` tinyint(1) NOT NULL DEFAULT 0,
  `is_agree` tinyint(1) NOT NULL DEFAULT 0,
  `token` varchar(255) DEFAULT NULL,
  `token_created_at` timestamp NULL DEFAULT NULL,
  `country` varchar(50) DEFAULT NULL,
  `birthDate` varchar(50) DEFAULT NULL,
  `profilePic` varchar(255) DEFAULT 'http://127.0.0.1:3333/uploads/1619716735234.jpeg',
  `facebook` varchar(255) DEFAULT NULL,
  `twitter` varchar(255) DEFAULT NULL,
  `youtube` varchar(255) DEFAULT NULL,
  `instagram` varchar(255) DEFAULT NULL,
  `linkedin` varchar(255) DEFAULT NULL,
  `gender` varchar(255) NOT NULL,
  `created_at` datetime DEFAULT NULL,
  `updated_at` datetime DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`id`, `firstName`, `lastName`, `username`, `email`, `phone`, `password`, `provider`, `provider_id`, `is_active`, `is_agree`, `token`, `token_created_at`, `country`, `birthDate`, `profilePic`, `facebook`, `twitter`, `youtube`, `instagram`, `linkedin`, `gender`, `created_at`, `updated_at`) VALUES
(62, 'Hero', 'Alam', 'hero_alam', 'dymy@mailinator.com', '01922060350', '$2a$10$SAy2kFHCuWq/wSjFuloaOeVndXdgJzDNow5qdzZJRdnsotPnB4mx2', NULL, NULL, 1, 1, NULL, NULL, 'Albania', '2021-04-06T18:00:00.000Z', 'http://127.0.0.1:3333/uploads/profilePic/1620206834641.jpeg', 'www.facebook.com', 'www.twittwer.com', 'www.youtube.com', 'www.instagram.com', 'www.linkedin.com', 'male', '2021-04-24 12:35:37', '2021-05-05 19:44:43'),
(63, 'Md', 'sadik', 'Voluptas dignissimos_Et distinctio Eaque', 'musamanu@mailinator.com', NULL, '$2a$10$8ba.qDeu9zh8J.X3vaHRTet6sVnPjsT2jn8IeUyIgswv0dKfh/l.O', NULL, NULL, 1, 1, NULL, NULL, NULL, NULL, NULL, 'www.facebook.com', 'www.twitter.com', 'www.youtube.com', 'www.instagram.com', 'www.linkedin.com', '', '2021-04-25 11:42:07', '2021-04-25 19:54:31'),
(70, 'FirstName', 'LastName', 'FirstName_LastName', 'kofeha@mailinator.com', NULL, '$2a$10$g1tF8YSRfO1vvbsQbOn29eEf8INgOobq0FjB8aabSCura0qqTiI92', NULL, NULL, 0, 1, '611607', '2021-05-01 09:05:09', NULL, NULL, 'http://127.0.0.1:3333/uploads/1619716735234.jpeg', NULL, NULL, NULL, NULL, NULL, '', '2021-05-01 15:05:09', '2021-05-01 15:05:09'),
(71, 'subhe sadek', '', 'subhe sadek', 'subhesadek89990@gmail.com', NULL, '$2a$10$KoOvsz32LCymoq6o50RYHu0amcLsIghGO4trWXPZLqccNDxVtrgD.', 'google', '107873650303924687944', 0, 0, NULL, NULL, NULL, NULL, 'https://lh3.googleusercontent.com/a-/AOh14GhhHgchRyD6AaR-vdUlzZOpPSzHqm5BZQ190AiO=s96-c', NULL, NULL, NULL, NULL, NULL, '', '2021-05-04 11:15:57', '2021-05-04 11:15:57');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `adonis_schema`
--
ALTER TABLE `adonis_schema`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `comments`
--
ALTER TABLE `comments`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `comment_likes`
--
ALTER TABLE `comment_likes`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `feeds`
--
ALTER TABLE `feeds`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `likes`
--
ALTER TABLE `likes`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `reactions`
--
ALTER TABLE `reactions`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `replies`
--
ALTER TABLE `replies`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `reply_likes`
--
ALTER TABLE `reply_likes`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `tokens`
--
ALTER TABLE `tokens`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `tokens_token_unique` (`token`),
  ADD KEY `tokens_user_id_foreign` (`user_id`),
  ADD KEY `tokens_token_index` (`token`);

--
-- Indexes for table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `users_user_name_unique` (`username`),
  ADD UNIQUE KEY `users_email_unique` (`email`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `adonis_schema`
--
ALTER TABLE `adonis_schema`
  MODIFY `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=9;

--
-- AUTO_INCREMENT for table `comments`
--
ALTER TABLE `comments`
  MODIFY `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=23;

--
-- AUTO_INCREMENT for table `comment_likes`
--
ALTER TABLE `comment_likes`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=8;

--
-- AUTO_INCREMENT for table `feeds`
--
ALTER TABLE `feeds`
  MODIFY `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=57;

--
-- AUTO_INCREMENT for table `likes`
--
ALTER TABLE `likes`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=29;

--
-- AUTO_INCREMENT for table `reactions`
--
ALTER TABLE `reactions`
  MODIFY `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `replies`
--
ALTER TABLE `replies`
  MODIFY `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=19;

--
-- AUTO_INCREMENT for table `reply_likes`
--
ALTER TABLE `reply_likes`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=9;

--
-- AUTO_INCREMENT for table `tokens`
--
ALTER TABLE `tokens`
  MODIFY `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users`
  MODIFY `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=74;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `tokens`
--
ALTER TABLE `tokens`
  ADD CONSTRAINT `tokens_user_id_foreign` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
