-- MySQL dump 10.13  Distrib 8.0.31, for Win64 (x86_64)
--
-- Host: 127.0.0.1    Database: semes
-- ------------------------------------------------------
-- Server version	8.0.31

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `image_entity`
--

DROP TABLE IF EXISTS `image_entity`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `image_entity` (
  `file_id` bigint NOT NULL AUTO_INCREMENT,
  `file_dir` varchar(50) NOT NULL,
  `origin_name` varchar(100) NOT NULL,
  `save_name` varchar(200) NOT NULL,
  PRIMARY KEY (`file_id`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `image_entity`
--

LOCK TABLES `image_entity` WRITE;
/*!40000 ALTER TABLE `image_entity` DISABLE KEYS */;
INSERT INTO `image_entity` VALUES (1,'a','a','a');
/*!40000 ALTER TABLE `image_entity` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `ohtcheck_entity`
--

DROP TABLE IF EXISTS `ohtcheck_entity`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `ohtcheck_entity` (
  `oht_check_id` bigint NOT NULL AUTO_INCREMENT,
  `good_count_total` int NOT NULL,
  `lose_count_total` int NOT NULL,
  `oht_check_end_datetime` datetime(6) NOT NULL,
  `oht_check_start_datetime` datetime(6) NOT NULL,
  `out_count_total` int NOT NULL,
  `unclassified_count_total` int NOT NULL,
  `oht_id` bigint DEFAULT NULL,
  PRIMARY KEY (`oht_check_id`),
  KEY `FK3fcbo60mk9eu1fnncdhh4l05i` (`oht_id`),
  CONSTRAINT `FK3fcbo60mk9eu1fnncdhh4l05i` FOREIGN KEY (`oht_id`) REFERENCES `ohtentity` (`oht_id`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `ohtcheck_entity`
--

LOCK TABLES `ohtcheck_entity` WRITE;
/*!40000 ALTER TABLE `ohtcheck_entity` DISABLE KEYS */;
INSERT INTO `ohtcheck_entity` VALUES (2,44,0,'2023-04-19 10:12:01.000000','2023-04-19 10:12:01.000000',0,0,1),(3,41,1,'2023-04-19 10:12:25.000000','2023-04-19 10:12:25.000000',1,1,2);
/*!40000 ALTER TABLE `ohtcheck_entity` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `ohtentity`
--

DROP TABLE IF EXISTS `ohtentity`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `ohtentity` (
  `oht_id` bigint NOT NULL AUTO_INCREMENT,
  `oht_sn` varchar(10) NOT NULL,
  `change_date` datetime(6) DEFAULT NULL,
  `check_date` datetime(6) DEFAULT NULL,
  PRIMARY KEY (`oht_id`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `ohtentity`
--

LOCK TABLES `ohtentity` WRITE;
/*!40000 ALTER TABLE `ohtentity` DISABLE KEYS */;
INSERT INTO `ohtentity` VALUES (1,'P1','2023-04-19 10:12:01.000000','2023-04-19 10:12:01.000000'),(2,'P2','2023-04-19 10:12:01.000000','2023-04-19 10:12:01.000000');
/*!40000 ALTER TABLE `ohtentity` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `user_entity`
--

DROP TABLE IF EXISTS `user_entity`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `user_entity` (
  `user_idx` bigint NOT NULL AUTO_INCREMENT,
  `user_id` varchar(20) NOT NULL,
  `user_name` varchar(20) NOT NULL,
  `user_pwd` varchar(20) NOT NULL,
  `user_role` varchar(10) NOT NULL DEFAULT '사용자',
  PRIMARY KEY (`user_idx`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `user_entity`
--

LOCK TABLES `user_entity` WRITE;
/*!40000 ALTER TABLE `user_entity` DISABLE KEYS */;
INSERT INTO `user_entity` VALUES (1,'admin','관리자','ssafy!1234','ADMIN'),(2,'semes','김민식','ssafy!1234','USER');
/*!40000 ALTER TABLE `user_entity` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `wheel_check_confirm_entity`
--

DROP TABLE IF EXISTS `wheel_check_confirm_entity`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `wheel_check_confirm_entity` (
  `check_id` bigint NOT NULL AUTO_INCREMENT,
  `check_date` datetime(6) NOT NULL,
  `user_idx` bigint DEFAULT NULL,
  `wheel_chcek_id` bigint DEFAULT NULL,
  PRIMARY KEY (`check_id`),
  KEY `FK8rq1xxrsvaw1kqf7utsm5oq6g` (`user_idx`),
  KEY `FKh6ky1rksqtinp9veieaslgyog` (`wheel_chcek_id`),
  CONSTRAINT `FK8rq1xxrsvaw1kqf7utsm5oq6g` FOREIGN KEY (`user_idx`) REFERENCES `user_entity` (`user_idx`),
  CONSTRAINT `FKh6ky1rksqtinp9veieaslgyog` FOREIGN KEY (`wheel_chcek_id`) REFERENCES `wheel_check_entity` (`wheel_chcek_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `wheel_check_confirm_entity`
--

LOCK TABLES `wheel_check_confirm_entity` WRITE;
/*!40000 ALTER TABLE `wheel_check_confirm_entity` DISABLE KEYS */;
/*!40000 ALTER TABLE `wheel_check_confirm_entity` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `wheel_check_entity`
--

DROP TABLE IF EXISTS `wheel_check_entity`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `wheel_check_entity` (
  `wheel_chcek_id` bigint NOT NULL AUTO_INCREMENT,
  `bolt_good_count` int NOT NULL,
  `bolt_lose_count` int NOT NULL,
  `bolt_out_count` int NOT NULL,
  `wheel_check_date` datetime(6) NOT NULL,
  `wheel_check_result` int NOT NULL,
  `bolt_unclassified_count` int NOT NULL,
  `wheel_position` varchar(255) NOT NULL,
  `file_id` bigint DEFAULT NULL,
  `oht_check_id` bigint DEFAULT NULL,
  PRIMARY KEY (`wheel_chcek_id`),
  KEY `FKiy6so46kwduphuooh7ussc3dh` (`file_id`),
  KEY `FKn5tsf185etfgo3rfloyy0rfnt` (`oht_check_id`),
  CONSTRAINT `FKiy6so46kwduphuooh7ussc3dh` FOREIGN KEY (`file_id`) REFERENCES `image_entity` (`file_id`),
  CONSTRAINT `FKn5tsf185etfgo3rfloyy0rfnt` FOREIGN KEY (`oht_check_id`) REFERENCES `ohtcheck_entity` (`oht_check_id`)
) ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `wheel_check_entity`
--

LOCK TABLES `wheel_check_entity` WRITE;
/*!40000 ALTER TABLE `wheel_check_entity` DISABLE KEYS */;
INSERT INTO `wheel_check_entity` VALUES (3,11,0,0,'2023-04-19 10:12:01.000000',0,0,'FL',1,2),(4,11,0,0,'2023-04-19 10:12:01.000000',0,0,'FL',1,3),(5,11,0,0,'2023-04-19 13:12:04.000000',0,0,'FR',1,2),(6,11,0,0,'2023-04-19 13:12:04.000000',0,0,'FR',1,3);
/*!40000 ALTER TABLE `wheel_check_entity` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `wheel_info_entity`
--

DROP TABLE IF EXISTS `wheel_info_entity`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `wheel_info_entity` (
  `wheel_info_id` bigint NOT NULL AUTO_INCREMENT,
  `count` int NOT NULL,
  `label` int NOT NULL,
  PRIMARY KEY (`wheel_info_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `wheel_info_entity`
--

LOCK TABLES `wheel_info_entity` WRITE;
/*!40000 ALTER TABLE `wheel_info_entity` DISABLE KEYS */;
/*!40000 ALTER TABLE `wheel_info_entity` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2023-04-26 14:27:16
