CREATE DATABASE  IF NOT EXISTS `cws_admin` /*!40100 DEFAULT CHARACTER SET utf8 */;
USE `cws_admin`;
-- MySQL dump 10.13  Distrib 8.0.19, for macos10.15 (x86_64)
--
-- Host: 127.0.0.1    Database: cws_admin
-- ------------------------------------------------------
-- Server version	8.0.12

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
-- Table structure for table `accountstatuses`
--

DROP TABLE IF EXISTS `accountstatuses`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `accountstatuses` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `accountStatus` varchar(65) NOT NULL,
  `shortCode` varchar(45) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=9 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `accountstatuses`
--

LOCK TABLES `accountstatuses` WRITE;
/*!40000 ALTER TABLE `accountstatuses` DISABLE KEYS */;
INSERT INTO `accountstatuses` VALUES (6,'Active','Active'),(7,'Cancelled','Cancelled'),(8,'Suspended','Suspended');
/*!40000 ALTER TABLE `accountstatuses` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `cipcStatuses`
--

DROP TABLE IF EXISTS `cipcStatuses`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `cipcStatuses` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `cipcStatus` varchar(65) NOT NULL,
  `shortCode` varchar(45) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=8 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `cipcStatuses`
--

LOCK TABLES `cipcStatuses` WRITE;
/*!40000 ALTER TABLE `cipcStatuses` DISABLE KEYS */;
INSERT INTO `cipcStatuses` VALUES (6,'In Business','In Business'),(7,'Final Deregistration','Final Deregistration');
/*!40000 ALTER TABLE `cipcStatuses` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `clients`
--

DROP TABLE IF EXISTS `clients`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `clients` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(100) NOT NULL,
  `regNum` varchar(45) DEFAULT NULL,
  `mainContact` varchar(100) NOT NULL,
  `phone` varchar(45) NOT NULL,
  `email` varchar(100) NOT NULL,
  `themes` varchar(45) DEFAULT NULL,
  `policies` varchar(45) DEFAULT NULL,
  `hasPaid` int(11) NOT NULL DEFAULT '1',
  `createdDate` datetime DEFAULT NULL,
  `createdBy` varchar(100) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=8 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `clients`
--

LOCK TABLES `clients` WRITE;
/*!40000 ALTER TABLE `clients` DISABLE KEYS */;
INSERT INTO `clients` VALUES (1,'Sabco','2017/315489/07','Adrian Robson','+27 82 558 8888','robson@sabco.za.com',NULL,NULL,1,'2020-04-28 00:00:00','Darryll');
/*!40000 ALTER TABLE `clients` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `clientservices`
--

DROP TABLE IF EXISTS `clientservices`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `clientservices` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `f_clientId` int(11) NOT NULL,
  `service` varchar(45) NOT NULL,
  `type` varchar(45) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=10 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `clientservices`
--

LOCK TABLES `clientservices` WRITE;
/*!40000 ALTER TABLE `clientservices` DISABLE KEYS */;
INSERT INTO `clientservices` VALUES (9,1,'collections','business');
/*!40000 ALTER TABLE `clientservices` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `pendreasons`
--

DROP TABLE IF EXISTS `pendreasons`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `pendreasons` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `pendreason` varchar(65) NOT NULL,
  `shortCode` varchar(45) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `pendreasons`
--

LOCK TABLES `pendreasons` WRITE;
/*!40000 ALTER TABLE `pendreasons` DISABLE KEYS */;
INSERT INTO `pendreasons` VALUES (1,'Reason 1','code1'),(2,'Reason 2','code2'),(3,'Reason 3','code3');
/*!40000 ALTER TABLE `pendreasons` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `resolutions`
--

DROP TABLE IF EXISTS `resolutions`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `resolutions` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `resolution` varchar(65) NOT NULL,
  `shortCode` varchar(45) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `resolutions`
--

LOCK TABLES `resolutions` WRITE;
/*!40000 ALTER TABLE `resolutions` DISABLE KEYS */;
INSERT INTO `resolutions` VALUES (1,'Customer requested a callback','callback'),(2,'Customer requested additional information','info'),(3,'Payment already made','paid'),(4,'Customer made PTP','ptp'),(5,'Customer disputed account','dispute');
/*!40000 ALTER TABLE `resolutions` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `transactiontypes`
--

DROP TABLE IF EXISTS `transactiontypes`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `transactiontypes` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `transactiontype` varchar(65) NOT NULL,
  `shortCode` varchar(45) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=9 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `transactiontypes`
--

LOCK TABLES `transactiontypes` WRITE;
/*!40000 ALTER TABLE `transactiontypes` DISABLE KEYS */;
INSERT INTO `transactiontypes` VALUES (6,'Admin','admin'),(7,'Call','call'),(8,'Email','email');
/*!40000 ALTER TABLE `transactiontypes` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `users`
--

DROP TABLE IF EXISTS `users`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `users` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `firstName` varchar(100) NOT NULL,
  `surname` varchar(100) NOT NULL,
  `email` varchar(100) NOT NULL,
  `phone` varchar(100) NOT NULL,
  `password` varchar(100) DEFAULT NULL,
  `role` varchar(45) NOT NULL,
  `type` varchar(45) NOT NULL,
  `storeId` int(11) NOT NULL,
  `createdDate` datetime NOT NULL,
  `updatedDate` datetime DEFAULT NULL,
  `updatedBy` varchar(100) DEFAULT NULL,
  `f_clientId` int(11) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=54 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `users`
--

LOCK TABLES `users` WRITE;
/*!40000 ALTER TABLE `users` DISABLE KEYS */;
INSERT INTO `users` VALUES (35,'Sabco','Testing','sabco@email.com','01111','$2a$10$o9R9BOl25O748ZrfDWOfU.PCjOZR.ReEs4z45k8yx23IfL8biNUSy','agent','business',1,'2020-07-21 11:55:00',NULL,NULL,1),(36,'Darryll','Robinson','email@email.com','0111','$2a$10$LjJ0P4.rifyXD8SFrAAKWOtxQA8arXK3LZCBTGddp9s3JXy8eo9ja','superuser','business',1,'2020-07-23 09:14:00',NULL,NULL,1),(44,'Test','Testing','sittest@thesystem.co.za','01111','$2a$10$lKUOWl38noQz9fFJU4CpoOOlPhtuNAa0o5.85pQ/kmGNk7qYYXhha','superuser','business',1,'2020-08-07 17:08:32',NULL,NULL,1),(47,'test','test','test@email.com','12121','$2a$10$RPBJoNK5DkTq6PF1UhIYAe3355UzzQUBmACRW9b6/oQOwAUrxrBFS','agent','business',1,'2020-09-03 17:39:24',NULL,NULL,1),(48,'Darryll','Robinson','darryllrobinson@icloud.com','0421853016','$2a$10$BxDcol56e1x0p2N.AF.ozewzoFsUbDlQTio4RVK3Xi1zEDQwnhD36','superuser','business',1,'2020-09-03 17:43:00','2020-09-04 19:45:10','darryllrobinson@icloud.com',1),(50,'Darryll','Robinson','tet@isscloud.com','0421853016','$2a$10$3cL7iQnnowJbk4jesuzhPOB.T8TTcVxvhQFCCj7W9iqQT43Q0jwra','agent','business',1,'2020-09-03 20:51:51','2020-09-11 15:33:29','tet@isscloud.com',1),(52,'Test','Client','darryll@stillproud.com','01111','$2a$10$s4sSBOdp9ZdV1qvDcBxZu.gupsUx/l5e9n0GHhT2qCkahmf1Z7JjG','client','business',1,'2020-09-08 15:02:13',NULL,NULL,1);
/*!40000 ALTER TABLE `users` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2020-09-14 14:43:00
