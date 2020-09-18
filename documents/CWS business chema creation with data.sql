CREATE DATABASE  IF NOT EXISTS `cws_business` /*!40100 DEFAULT CHARACTER SET utf8 */;
USE `cws_business`;
-- MySQL dump 10.13  Distrib 8.0.19, for macos10.15 (x86_64)
--
-- Host: 127.0.0.1    Database: cws_business
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
-- Table structure for table `accounts`
--

DROP TABLE IF EXISTS `accounts`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `accounts` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `accountNumber` varchar(25) NOT NULL,
  `accountName` varchar(100) NOT NULL,
  `openDate` datetime DEFAULT NULL,
  `debtorAge` int(11) DEFAULT '0',
  `paymentTermDays` int(11) DEFAULT '0',
  `creditLimit` decimal(10,2) DEFAULT '0.00',
  `totalBalance` decimal(10,2) DEFAULT '0.00',
  `amountDue` decimal(10,2) DEFAULT '0.00',
  `currentBalance` decimal(10,2) DEFAULT '0.00',
  `days30` decimal(10,2) DEFAULT '0.00',
  `days60` decimal(10,2) DEFAULT '0.00',
  `days90` decimal(10,2) DEFAULT '0.00',
  `days120` decimal(10,2) DEFAULT '0.00',
  `days150` decimal(10,2) DEFAULT '0.00',
  `days180` decimal(10,2) DEFAULT '0.00',
  `days180Over` decimal(10,2) DEFAULT '0.00',
  `paymentMethod` varchar(100) DEFAULT NULL,
  `paymentDueDate` int(11) DEFAULT NULL,
  `debitOrderDate` int(11) DEFAULT NULL,
  `lastPaymentDate` datetime DEFAULT NULL,
  `lastPaymentAmount` decimal(10,2) DEFAULT '0.00',
  `lastPTPDate` datetime DEFAULT NULL,
  `lastPTPAmount` decimal(10,2) DEFAULT '0.00',
  `accountNotes` varchar(1000) DEFAULT NULL,
  `accountStatus` varchar(100) NOT NULL DEFAULT 'Open',
  `arg` varchar(45) DEFAULT NULL,
  `createdDate` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `createdBy` varchar(100) NOT NULL,
  `updatedDate` datetime DEFAULT NULL,
  `updatedBy` varchar(100) DEFAULT NULL,
  `caseDate` datetime DEFAULT NULL,
  `f_customerId` varchar(25) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=2106 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `accounts`
--

LOCK TABLES `accounts` WRITE;
/*!40000 ALTER TABLE `accounts` DISABLE KEYS */;
INSERT INTO `accounts` VALUES (2056,'3RD101','BAKGATLA BA KGAFELA INVESTMENT HOLDINGS (BBKIH)',NULL,0,7,0.00,0.00,0.00,0.00,0.00,0.00,0.00,0.00,0.00,0.00,0.00,NULL,NULL,NULL,NULL,0.00,'2020-09-11 00:00:00',1211.00,NULL,'Open',NULL,'2020-09-04 21:12:03','System','2020-09-04 22:40:41','email@email.com','2020-09-04 21:13:00','3RD101'),(2057,'5OH012','JUERGEN SCHREIBER',NULL,0,7,0.00,0.00,0.00,0.00,0.00,0.00,0.00,0.00,0.00,0.00,0.00,NULL,NULL,NULL,NULL,0.00,NULL,0.00,NULL,'Open',NULL,'2020-09-04 21:12:03','System',NULL,NULL,'2020-09-04 21:13:00','5OH012'),(2058,'AEO101','AEONOVA 360',NULL,0,0,0.00,16915.78,0.00,0.00,0.00,0.00,0.00,0.00,0.00,0.00,16915.78,NULL,NULL,NULL,NULL,0.00,NULL,0.00,NULL,'Open',NULL,'2020-09-04 21:12:03','System','2020-09-12 15:57:59','email@email.com','2020-09-04 21:13:00','AEO101'),(2059,'AIM101','MATTER INVESTMENTS (PTY) LTD','2020-09-04 00:00:00',0,30,0.00,29934.84,0.00,0.00,0.00,0.00,0.00,0.00,0.00,0.00,29934.84,NULL,NULL,NULL,NULL,0.00,'2020-09-30 00:00:00',56234.00,NULL,'Open',NULL,'2020-09-04 21:12:03','System','2020-09-08 19:35:33','email@email.com','2020-09-04 21:13:00','AIM101'),(2060,'ALJ101','ALJ CONSULTING','2020-09-04 00:00:00',0,30,0.00,34658.08,0.00,0.00,0.00,0.00,0.00,0.00,0.00,0.00,34658.08,NULL,NULL,NULL,NULL,0.00,NULL,0.00,NULL,'Open',NULL,'2020-09-04 21:12:03','System',NULL,NULL,'2020-09-04 21:13:00','ALJ101'),(2061,'ATT102','BRONWYN BOTHA',NULL,0,30,0.00,8889.50,0.00,0.00,0.00,0.00,0.00,0.00,0.00,0.00,8889.50,NULL,NULL,NULL,NULL,0.00,NULL,0.00,NULL,'Open',NULL,'2020-09-04 21:12:03','System',NULL,NULL,'2020-09-04 21:13:00','ATT102'),(2062,'BAC101','LUKE JOHN BACKOS',NULL,0,0,0.00,5000.01,0.00,0.00,0.00,0.00,0.00,0.00,0.00,0.00,5000.01,NULL,NULL,NULL,NULL,0.00,NULL,0.00,NULL,'Open',NULL,'2020-09-04 21:12:03','System',NULL,NULL,'2020-09-04 21:13:00','BAC101'),(2063,'BBQ101','BBQ WORKSHOP','2020-09-04 00:00:00',0,30,0.00,23913.85,0.00,0.00,0.00,0.00,0.00,0.00,0.00,0.00,23913.85,NULL,NULL,NULL,NULL,0.00,NULL,0.00,NULL,'Open',NULL,'2020-09-04 21:12:03','System',NULL,NULL,'2020-09-04 21:13:00','BBQ101'),(2064,'BON102','BONTIWORX (PTY) LTD',NULL,0,30,0.00,14947.70,0.00,0.00,0.00,0.00,0.00,0.00,0.00,0.00,14947.70,NULL,NULL,NULL,NULL,0.00,NULL,0.00,NULL,'Open',NULL,'2020-09-04 21:12:03','System',NULL,NULL,'2020-09-04 21:13:00','BON102'),(2065,'CAP104','CAPRICORN INVESTMENT GROUP (PTY) LTD','2020-09-04 00:00:00',0,30,0.00,8746.28,0.00,0.00,0.00,0.00,0.00,0.00,0.00,0.00,8746.28,NULL,NULL,NULL,NULL,0.00,NULL,0.00,NULL,'Open',NULL,'2020-09-04 21:12:03','System',NULL,NULL,'2020-09-04 21:13:00','CAP104'),(2066,'CEN102','CENTRAL PARK',NULL,0,0,0.00,87175.63,0.00,0.00,0.00,0.00,0.00,0.00,0.00,0.00,87175.63,NULL,NULL,NULL,NULL,0.00,NULL,0.00,NULL,'Open',NULL,'2020-09-04 21:12:03','System',NULL,NULL,'2020-09-04 21:13:00','CEN102'),(2067,'CH0243','CHERISE ANSARA',NULL,0,0,0.00,5694.43,0.00,0.00,0.00,0.00,0.00,0.00,0.00,0.00,5694.43,NULL,NULL,NULL,NULL,0.00,NULL,0.00,NULL,'Open',NULL,'2020-09-04 21:12:03','System',NULL,NULL,'2020-09-04 21:13:00','CH0243'),(2068,'CJS101','CRAZY JELLY STORE (PTY) LTD',NULL,0,30,0.00,5100.00,0.00,0.00,0.00,0.00,0.00,0.00,0.00,0.00,5100.00,NULL,NULL,NULL,NULL,0.00,NULL,0.00,NULL,'Open',NULL,'2020-09-04 21:12:03','System',NULL,NULL,'2020-09-04 21:13:00','CJS101'),(2069,'COA101','ROCKING CONNECT PTY LTD',NULL,0,30,0.00,7343.87,0.00,0.00,0.00,0.00,0.00,0.00,0.00,0.00,7343.87,NULL,NULL,NULL,NULL,0.00,NULL,0.00,NULL,'Open',NULL,'2020-09-04 21:12:03','System',NULL,NULL,'2020-09-04 21:13:00','COA101'),(2070,'COO104','COOL IDEAS SERVICE PROVIDER',NULL,0,30,0.00,32478.88,0.00,0.00,0.00,0.00,0.00,0.00,0.00,0.00,32478.88,NULL,NULL,NULL,NULL,0.00,NULL,0.00,NULL,'Open',NULL,'2020-09-04 21:12:03','System',NULL,NULL,'2020-09-04 21:13:00','COO104'),(2071,'DGH101','D & G HOLDINGS (PTY) LTD/ D AND G HOLDINGS',NULL,0,30,0.00,4325.84,0.00,0.00,0.00,0.00,0.00,0.00,0.00,0.00,4325.84,NULL,NULL,NULL,NULL,0.00,NULL,0.00,NULL,'Open',NULL,'2020-09-04 21:12:03','System',NULL,NULL,'2020-09-04 21:13:00','DGH101'),(2072,'DOR101','DORON DIAMONDS',NULL,0,30,0.00,19108.42,0.00,0.00,0.00,0.00,0.00,0.00,0.00,0.00,19108.42,NULL,NULL,NULL,NULL,0.00,NULL,0.00,NULL,'Open',NULL,'2020-09-04 21:12:03','System',NULL,NULL,'2020-09-04 21:13:00','DOR101'),(2073,'DV1144','CANDICE ZAAIMAN','2020-09-04 00:00:00',0,0,0.00,12075.93,0.00,0.00,0.00,0.00,0.00,0.00,0.00,0.00,12075.93,NULL,NULL,NULL,NULL,0.00,NULL,0.00,NULL,'Open',NULL,'2020-09-04 21:12:03','System',NULL,NULL,'2020-09-04 21:13:00','DV1144'),(2074,'GAT101','N GATTOO INC T/A GATTOO ATTORNEYS','2020-09-04 00:00:00',0,30,0.00,29895.40,0.00,0.00,0.00,0.00,0.00,0.00,0.00,0.00,29895.40,NULL,NULL,NULL,NULL,0.00,NULL,0.00,NULL,'Open',NULL,'2020-09-04 21:12:03','System',NULL,NULL,'2020-09-04 21:13:00','GAT101'),(2075,'GRA078','ODIEGWU TIMOTHY EKENE',NULL,0,7,0.00,4810.00,0.00,0.00,0.00,0.00,0.00,0.00,0.00,0.00,4810.00,NULL,NULL,NULL,NULL,0.00,NULL,0.00,NULL,'Open',NULL,'2020-09-04 21:12:03','System',NULL,NULL,'2020-09-04 21:13:00','GRA078'),(2076,'GRA297','KIMENGWA NGAMBI','2020-09-04 00:00:00',0,0,0.00,5495.00,0.00,0.00,0.00,0.00,0.00,0.00,0.00,0.00,5495.00,NULL,NULL,NULL,NULL,0.00,NULL,0.00,NULL,'Open',NULL,'2020-09-04 21:12:03','System',NULL,NULL,'2020-09-04 21:13:00','GRA297'),(2077,'GRA586','KATE MODIMA BODIBA',NULL,0,0,0.00,5206.00,0.00,0.00,0.00,0.00,0.00,0.00,0.00,0.00,5206.00,NULL,NULL,NULL,NULL,0.00,NULL,0.00,NULL,'Open',NULL,'2020-09-04 21:12:03','System',NULL,NULL,'2020-09-04 21:13:00','GRA586'),(2078,'GRO101','PROPERTY HELPLINE (PTY) LTD','2020-09-04 00:00:00',0,30,0.00,21699.96,0.00,0.00,0.00,0.00,0.00,0.00,0.00,0.00,21699.96,NULL,NULL,NULL,NULL,0.00,NULL,0.00,NULL,'Open',NULL,'2020-09-04 21:12:03','System',NULL,NULL,'2020-09-04 21:13:00','GRO101'),(2079,'HUA101','HUAMIN TRADING','2020-09-04 00:00:00',0,30,0.00,7355.44,0.00,0.00,0.00,0.00,0.00,0.00,0.00,0.00,7355.44,NULL,NULL,NULL,NULL,0.00,NULL,0.00,NULL,'Open',NULL,'2020-09-04 21:12:04','System',NULL,NULL,'2020-09-04 21:13:00','HUA101'),(2080,'HVB101','HVB SERVICES SOUTH AFRICA (PTY LTD',NULL,0,30,0.00,5030.64,0.00,0.00,0.00,0.00,0.00,0.00,0.00,0.00,5030.64,NULL,NULL,NULL,NULL,0.00,NULL,0.00,NULL,'Open',NULL,'2020-09-04 21:12:04','System',NULL,NULL,'2020-09-04 21:13:00','HVB101'),(2081,'ILK101','ILKA FINANCE (PTY) LTD',NULL,0,30,0.00,0.00,0.00,0.00,0.00,0.00,0.00,0.00,0.00,0.00,0.00,NULL,NULL,NULL,NULL,0.00,NULL,0.00,NULL,'Open',NULL,'2020-09-04 21:12:04','System',NULL,NULL,'2020-09-04 21:13:00','ILK101'),(2082,'IMA102','IMAGINE IPS','2020-09-04 00:00:00',0,30,0.00,6325.00,0.00,0.00,0.00,0.00,0.00,0.00,0.00,0.00,6325.00,NULL,NULL,NULL,NULL,0.00,NULL,0.00,NULL,'Open',NULL,'2020-09-04 21:12:04','System',NULL,NULL,'2020-09-04 21:13:00','IMA102'),(2083,'INT103','INTDEV Internet Technologies',NULL,0,30,0.00,24150.00,0.00,0.00,0.00,0.00,0.00,0.00,0.00,0.00,24150.00,NULL,NULL,NULL,NULL,0.00,NULL,0.00,NULL,'Open',NULL,'2020-09-04 21:12:04','System',NULL,NULL,'2020-09-04 21:13:00','INT103'),(2084,'JAB101','JAB DRIED FRUIT PRODUCTS (PTY) LTD','2020-09-04 00:00:00',0,0,0.00,37986.80,0.00,0.00,0.00,0.00,0.00,0.00,0.00,0.00,37986.80,NULL,NULL,NULL,NULL,0.00,NULL,0.00,NULL,'Open',NULL,'2020-09-04 21:12:04','System',NULL,NULL,'2020-09-04 21:13:00','JAB101'),(2085,'LBV001','TANIA DU PLESSIS',NULL,0,0,0.00,6963.41,0.00,0.00,0.00,0.00,0.00,0.00,0.00,0.00,6963.41,NULL,NULL,NULL,NULL,0.00,NULL,0.00,NULL,'Open',NULL,'2020-09-04 21:12:04','System',NULL,NULL,'2020-09-04 21:13:00','LBV001'),(2086,'MCC104','JUSTIN MCCALLUM',NULL,0,0,0.00,6863.01,0.00,0.00,0.00,0.00,0.00,0.00,0.00,0.00,6863.01,NULL,NULL,NULL,NULL,0.00,NULL,0.00,NULL,'Open',NULL,'2020-09-04 21:12:04','System',NULL,NULL,'2020-09-04 21:13:00','MCC104'),(2087,'MLS101','SIMPLYFAI',NULL,0,30,0.00,0.00,0.00,0.00,0.00,0.00,0.00,0.00,0.00,0.00,0.00,NULL,NULL,NULL,NULL,0.00,NULL,0.00,NULL,'Open',NULL,'2020-09-04 21:12:04','System',NULL,NULL,'2020-09-04 21:13:00','MLS101'),(2088,'MON101','MDF MANAGEMENT HOLDINGS (PTY) LTD','2020-09-04 00:00:00',0,30,0.00,6367.36,0.00,0.00,0.00,0.00,0.00,0.00,0.00,0.00,6367.36,NULL,NULL,NULL,NULL,0.00,NULL,0.00,NULL,'Open',NULL,'2020-09-04 21:12:04','System',NULL,NULL,'2020-09-04 21:13:00','MON101'),(2089,'MOS103','MUTSI PHAKISO MOSOEU','2020-09-04 00:00:00',0,0,0.00,5116.70,0.00,0.00,0.00,0.00,0.00,0.00,0.00,0.00,5116.70,NULL,NULL,NULL,NULL,0.00,NULL,0.00,NULL,'Open',NULL,'2020-09-04 21:12:04','System',NULL,NULL,'2020-09-04 21:13:00','MOS103'),(2090,'MYE046','NIKALYE OLDJOHN','2020-09-04 00:00:00',0,7,0.00,4743.31,0.00,0.00,0.00,0.00,0.00,0.00,0.00,0.00,4743.31,NULL,NULL,NULL,NULL,0.00,NULL,0.00,NULL,'Open',NULL,'2020-09-04 21:12:04','System',NULL,NULL,'2020-09-04 21:13:00','MYE046'),(2091,'NEP101','NEPIC (PTY) LTD',NULL,0,0,0.00,193540.40,0.00,0.00,0.00,0.00,0.00,0.00,0.00,0.00,193540.40,NULL,NULL,NULL,NULL,0.00,NULL,0.00,NULL,'Open',NULL,'2020-09-04 21:12:04','System',NULL,NULL,'2020-09-04 21:13:00','NEP101'),(2092,'NKA101','NKANYISO ICT (See Bureau report for Bukosini)',NULL,0,30,0.00,6325.00,0.00,0.00,0.00,0.00,0.00,0.00,0.00,0.00,6325.00,NULL,NULL,NULL,NULL,0.00,NULL,0.00,NULL,'Open',NULL,'2020-09-04 21:12:04','System',NULL,NULL,'2020-09-04 21:13:00','NKA101'),(2093,'ONE201','ONELOGIX VDS',NULL,0,0,0.00,30395.82,0.00,0.00,0.00,0.00,0.00,0.00,0.00,0.00,30395.82,NULL,NULL,NULL,NULL,0.00,NULL,0.00,NULL,'Open',NULL,'2020-09-04 21:12:04','System',NULL,NULL,'2020-09-04 21:13:00','ONE201'),(2094,'PAM101','DR PUCKS/COMOLINA',NULL,0,7,0.00,0.00,0.00,0.00,0.00,0.00,0.00,0.00,0.00,0.00,0.00,NULL,NULL,NULL,NULL,0.00,NULL,0.00,NULL,'Open',NULL,'2020-09-04 21:12:04','System',NULL,NULL,'2020-09-04 21:13:00','PAM101'),(2095,'PAT101','PATACHOU PATISSERIE (PTY) LTD',NULL,0,30,0.00,8301.21,0.00,0.00,0.00,0.00,0.00,0.00,0.00,0.00,8301.21,NULL,NULL,NULL,NULL,0.00,NULL,0.00,NULL,'Open',NULL,'2020-09-04 21:12:04','System',NULL,NULL,'2020-09-04 21:13:00','PAT101'),(2096,'REV101','REVIEWKING (PTY) LTD',NULL,0,30,0.00,40919.90,0.00,0.00,0.00,0.00,0.00,0.00,0.00,0.00,40919.90,NULL,NULL,NULL,NULL,0.00,NULL,0.00,NULL,'Open',NULL,'2020-09-04 21:12:04','System',NULL,NULL,'2020-09-04 21:13:00','REV101'),(2097,'RNS101','RADIO NETWORK SOLUTIONS','2020-09-04 00:00:00',0,30,0.00,0.00,0.00,0.00,0.00,0.00,0.00,0.00,0.00,0.00,0.00,NULL,NULL,NULL,NULL,0.00,NULL,0.00,NULL,'Open',NULL,'2020-09-04 21:12:04','System',NULL,NULL,'2020-09-04 21:13:00','RNS101'),(2098,'SAI102','SAICOM VOICE SERVICES (PTY) LTD','2020-09-04 00:00:00',0,30,0.00,7116.00,0.00,0.00,0.00,0.00,0.00,0.00,0.00,0.00,7116.00,NULL,NULL,NULL,NULL,0.00,NULL,0.00,NULL,'Open',NULL,'2020-09-04 21:12:04','System',NULL,NULL,'2020-09-04 21:13:00','SAI102'),(2099,'SIB210','PAUL USIRI',NULL,0,0,0.00,6469.35,0.00,0.00,0.00,0.00,0.00,0.00,0.00,0.00,6469.35,NULL,NULL,NULL,NULL,0.00,NULL,0.00,NULL,'Open',NULL,'2020-09-04 21:12:04','System',NULL,NULL,'2020-09-04 21:13:00','SIB210'),(2100,'SLI035','LYNETTE WATSON',NULL,0,0,0.00,5227.20,0.00,0.00,0.00,0.00,0.00,0.00,0.00,0.00,5227.20,NULL,NULL,NULL,NULL,0.00,NULL,0.00,NULL,'Open',NULL,'2020-09-04 21:12:04','System',NULL,NULL,'2020-09-04 21:13:00','SLI035'),(2101,'SUP104','SUPERSPORT INTERNATIONAL',NULL,0,0,0.00,9348.00,0.00,0.00,0.00,0.00,0.00,0.00,0.00,0.00,9348.00,NULL,NULL,NULL,NULL,0.00,NULL,0.00,NULL,'Open',NULL,'2020-09-04 21:12:04','System',NULL,NULL,'2020-09-04 21:13:00','SUP104'),(2102,'TLA141','FARREN PRETORIUS',NULL,0,0,0.00,8202.00,0.00,0.00,0.00,0.00,0.00,0.00,0.00,0.00,8202.00,NULL,NULL,NULL,NULL,0.00,NULL,0.00,NULL,'Open',NULL,'2020-09-04 21:12:04','System',NULL,NULL,'2020-09-04 21:13:00','TLA141'),(2103,'TW0113','OSENI SAMUEL','2020-09-04 00:00:00',0,0,0.00,8634.10,0.00,0.00,0.00,0.00,0.00,0.00,0.00,0.00,8634.10,NULL,NULL,NULL,NULL,0.00,NULL,0.00,NULL,'Open',NULL,'2020-09-04 21:12:04','System',NULL,NULL,'2020-09-04 21:13:00','TW0113'),(2104,'TW0247','RAJI MOSHOOD KOLAWOLE',NULL,0,7,0.00,5131.25,0.00,0.00,0.00,0.00,0.00,0.00,0.00,0.00,5131.25,NULL,NULL,NULL,NULL,0.00,NULL,0.00,NULL,'Open',NULL,'2020-09-04 21:12:04','System',NULL,NULL,'2020-09-04 21:13:00','TW0247'),(2105,'TWA292','MATTHEW PEARCE','2020-09-04 00:00:00',0,0,0.00,5495.00,0.00,0.00,0.00,0.00,0.00,0.00,0.00,0.00,5495.00,NULL,NULL,NULL,NULL,0.00,NULL,0.00,NULL,'Open',NULL,'2020-09-04 21:12:04','System',NULL,NULL,'2020-09-04 21:13:00','TWA292');
/*!40000 ALTER TABLE `accounts` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `applications`
--

DROP TABLE IF EXISTS `applications`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `applications` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(100) DEFAULT NULL,
  `type` varchar(100) DEFAULT NULL,
  `regNumber` varchar(15) DEFAULT NULL,
  `telephone` varchar(15) DEFAULT NULL,
  `email` varchar(100) DEFAULT NULL,
  `address1` varchar(45) DEFAULT NULL,
  `address2` varchar(45) DEFAULT NULL,
  `address3` varchar(45) DEFAULT NULL,
  `address4` varchar(45) DEFAULT NULL,
  `address5` varchar(45) DEFAULT NULL,
  `bankCode` varchar(10) DEFAULT NULL,
  `bankAccount` varchar(45) DEFAULT NULL,
  `revenue` int(11) DEFAULT '0',
  `expenses` int(11) DEFAULT '0',
  `bureauScore` int(11) DEFAULT '0',
  `currentStatus` varchar(45) DEFAULT NULL,
  `limit` decimal(5,0) DEFAULT '0',
  `agentComments` varchar(2000) DEFAULT NULL,
  `storeComments` varchar(2000) DEFAULT NULL,
  `supervisorComments` varchar(2000) DEFAULT NULL,
  `createdBy` varchar(45) DEFAULT NULL,
  `createdDate` datetime DEFAULT NULL,
  `updatedBy` varchar(45) DEFAULT NULL,
  `updatedDate` datetime DEFAULT NULL,
  `closedBy` varchar(45) DEFAULT NULL,
  `closedDate` datetime DEFAULT NULL,
  `bookedDate` datetime DEFAULT NULL,
  `f_clientId` int(11) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `Secondary` (`createdBy`,`createdDate`,`updatedBy`,`updatedDate`,`regNumber`)
) ENGINE=InnoDB AUTO_INCREMENT=574 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `applications`
--

LOCK TABLES `applications` WRITE;
/*!40000 ALTER TABLE `applications` DISABLE KEYS */;
/*!40000 ALTER TABLE `applications` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `cases`
--

DROP TABLE IF EXISTS `cases`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `cases` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `caseNumber` int(11) DEFAULT '0',
  `createdDate` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `createdBy` varchar(100) NOT NULL,
  `currentAssignment` varchar(100) NOT NULL DEFAULT 'Unassigned',
  `initialAssignment` varchar(100) DEFAULT NULL,
  `updatedDate` datetime DEFAULT NULL,
  `updatedBy` varchar(100) DEFAULT NULL,
  `reopenedDate` datetime DEFAULT NULL,
  `reopenedBy` varchar(100) DEFAULT NULL,
  `reassignedDate` datetime DEFAULT NULL,
  `reassignedBy` varchar(100) DEFAULT NULL,
  `caseNotes` varchar(1000) DEFAULT NULL,
  `currentStatus` varchar(45) NOT NULL DEFAULT 'Open',
  `nextVisitDateTime` datetime DEFAULT NULL,
  `pendReason` varchar(100) DEFAULT NULL,
  `resolution` varchar(100) DEFAULT NULL,
  `caseReason` varchar(100) DEFAULT NULL,
  `lockedDatetime` datetime DEFAULT NULL,
  `f_accountNumber` varchar(45) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=401 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `cases`
--

LOCK TABLES `cases` WRITE;
/*!40000 ALTER TABLE `cases` DISABLE KEYS */;
INSERT INTO `cases` VALUES (351,1,'2020-07-27 18:00:01','robson@sabco.za.com','eugener@sabco.za.com',NULL,'2020-08-01 03:00:01','eugener@sabco.za.com',NULL,NULL,NULL,NULL,NULL,'Open','2020-08-05 19:00:00',NULL,NULL,NULL,'2020-09-12 16:04:00','3RD101'),(352,2,'2020-07-27 18:00:02','robson@sabco.za.com','eugener@sabco.za.com',NULL,'2020-08-01 03:00:11','eugener@sabco.za.com',NULL,NULL,NULL,NULL,NULL,'Pended','2020-08-05 19:00:00',NULL,NULL,NULL,NULL,'5OH012'),(353,3,'2020-07-27 18:00:03','robson@sabco.za.com','eugener@sabco.za.com',NULL,'2020-09-12 15:57:59','email@email.com',NULL,NULL,NULL,NULL,'Try and Trace Archie Cassim. Possible Owner. Previous email was a360cloud.com','Open','2020-10-02 00:00:00',NULL,NULL,NULL,'2020-09-12 15:58:08','AEO101'),(354,4,'2020-07-27 18:00:04','robson@sabco.za.com','eugener@sabco.za.com',NULL,'2020-09-08 19:35:33','email@email.com',NULL,NULL,NULL,NULL,'ARNAV JHUNJHUNWALA - ID Z3664792','Open','2020-10-01 00:00:00',NULL,NULL,NULL,'2020-09-08 19:35:43','AIM101'),(355,5,'2020-07-27 18:00:05','robson@sabco.za.com','eugener@sabco.za.com',NULL,'2020-08-01 03:00:41','eugener@sabco.za.com',NULL,NULL,NULL,NULL,NULL,'Pended','2020-08-05 19:00:00',NULL,NULL,NULL,NULL,'ALJ101'),(356,6,'2020-07-27 18:00:06','robson@sabco.za.com','eugener@sabco.za.com',NULL,'2020-08-01 03:00:51','eugener@sabco.za.com',NULL,NULL,NULL,NULL,NULL,'Pended','2020-08-05 19:00:00',NULL,NULL,NULL,NULL,'ATT102'),(357,7,'2020-07-27 18:00:07','robson@sabco.za.com','eugener@sabco.za.com',NULL,'2020-08-01 03:01:01','eugener@sabco.za.com',NULL,NULL,NULL,NULL,NULL,'Pended','2020-08-05 19:00:00',NULL,NULL,NULL,NULL,'BAC101'),(358,8,'2020-07-27 18:00:08','robson@sabco.za.com','eugener@sabco.za.com',NULL,'2020-08-01 03:01:11','eugener@sabco.za.com',NULL,NULL,NULL,NULL,'ZORAN PECELJ, 681023XXXX08X | DIMITRIOS ARVANITIS, 560820XXX08X','Pended','2020-08-05 19:00:00',NULL,NULL,NULL,NULL,'BBQ101'),(359,9,'2020-07-27 18:00:09','robson@sabco.za.com','eugener@sabco.za.com',NULL,'2020-08-01 03:01:21','eugener@sabco.za.com',NULL,NULL,NULL,NULL,NULL,'Pended','2020-08-05 19:00:00',NULL,NULL,NULL,NULL,'BON102'),(360,10,'2020-07-27 18:00:10','robson@sabco.za.com','eugener@sabco.za.com',NULL,'2020-08-01 03:01:31','eugener@sabco.za.com',NULL,NULL,NULL,NULL,'https://www.capricorn.com.na/Lists/ContactUs/NewCustomFormModal.aspx?Source=/','Pended','2020-08-05 19:00:00',NULL,NULL,NULL,NULL,'CAP104'),(361,11,'2020-07-27 18:00:11','robson@sabco.za.com','eugener@sabco.za.com',NULL,'2020-08-01 03:01:41','eugener@sabco.za.com',NULL,NULL,NULL,NULL,'Multiple companies with similar name. Central Park Homeowners Assoc.stopped being managed by Trafalgar in 2012. Now Im tracking Stonewood Property Management','Open','2020-08-05 19:00:00',NULL,NULL,NULL,NULL,'CEN102'),(362,12,'2020-07-27 18:00:12','robson@sabco.za.com','eugener@sabco.za.com',NULL,'2020-08-01 03:01:51','eugener@sabco.za.com',NULL,NULL,NULL,NULL,NULL,'Pended','2020-08-05 19:00:00',NULL,NULL,NULL,NULL,'CH0243'),(363,13,'2020-07-27 18:00:13','robson@sabco.za.com','eugener@sabco.za.com',NULL,'2020-08-01 03:02:01','eugener@sabco.za.com',NULL,NULL,NULL,NULL,'GUO DONG RICHARD JIANG, 910120XXXX08X','Open','2020-08-05 19:00:00',NULL,NULL,NULL,NULL,'CJS101'),(364,14,'2020-07-27 18:00:14','robson@sabco.za.com','eugener@sabco.za.com',NULL,'2020-08-01 03:02:11','eugener@sabco.za.com',NULL,NULL,NULL,NULL,NULL,'Pended','2020-08-05 19:00:00',NULL,NULL,NULL,NULL,'COA101'),(365,15,'2020-07-27 18:00:15','robson@sabco.za.com','eugener@sabco.za.com',NULL,'2020-08-01 03:02:21','eugener@sabco.za.com',NULL,NULL,NULL,NULL,'JOOSTE ANDRE JACOBUS Director | DIEDERICKS, ROELOF FREDERIK Director | BUTSCHI, PAUL Director | REES-GIBBS, SHANE VICTOR Director','Pended','2020-08-05 19:00:00',NULL,NULL,NULL,NULL,'COO104'),(366,16,'2020-07-27 18:00:16','robson@sabco.za.com','eugener@sabco.za.com',NULL,'2020-08-01 03:02:31','eugener@sabco.za.com',NULL,NULL,NULL,NULL,'LANCELOT DENHERE, 700414XXXX08X | CHEGETAI BRIAN GUMBEZE, FN172795','Open','2020-08-05 19:00:00',NULL,NULL,NULL,NULL,'DGH101'),(367,17,'2020-07-27 18:00:17','robson@sabco.za.com','eugener@sabco.za.com',NULL,'2020-08-01 03:02:41','eugener@sabco.za.com',NULL,NULL,NULL,NULL,NULL,'Pended','2020-08-05 19:00:00',NULL,NULL,NULL,NULL,'DOR101'),(368,18,'2020-07-27 18:00:18','robson@sabco.za.com','eugener@sabco.za.com',NULL,'2020-08-01 03:02:51','eugener@sabco.za.com',NULL,NULL,NULL,NULL,NULL,'Pended','2020-08-05 19:00:00',NULL,NULL,NULL,NULL,'DV1144'),(369,19,'2020-07-27 18:00:19','robson@sabco.za.com','eugener@sabco.za.com',NULL,'2020-08-01 03:03:01','eugener@sabco.za.com',NULL,NULL,NULL,NULL,NULL,'Pended','2020-08-05 19:00:00',NULL,NULL,NULL,NULL,'GAT101'),(370,20,'2020-07-27 18:00:20','robson@sabco.za.com','eugener@sabco.za.com',NULL,'2020-08-01 03:03:11','eugener@sabco.za.com',NULL,NULL,NULL,NULL,NULL,'Pended','2020-08-05 19:00:00',NULL,NULL,NULL,NULL,'GRA078'),(371,21,'2020-07-28 18:00:20','robson@sabco.za.com','eugener@sabco.za.com',NULL,'2020-08-01 03:03:21','eugener@sabco.za.com',NULL,NULL,NULL,NULL,NULL,'Pended','2020-08-05 19:00:00',NULL,NULL,NULL,NULL,'GRA297'),(372,22,'2020-07-28 18:00:25','robson@sabco.za.com','eugener@sabco.za.com',NULL,'2020-08-01 03:03:31','eugener@sabco.za.com',NULL,NULL,NULL,NULL,NULL,'Pended','2020-08-05 19:00:00',NULL,NULL,NULL,NULL,'GRA586'),(373,23,'2020-07-28 18:00:29','robson@sabco.za.com','eugener@sabco.za.com',NULL,'2020-08-01 03:03:41','eugener@sabco.za.com',NULL,NULL,NULL,NULL,NULL,'Pended','2020-08-05 19:00:00',NULL,NULL,NULL,NULL,'GRO101'),(374,24,'2020-07-28 18:00:34','robson@sabco.za.com','eugener@sabco.za.com',NULL,'2020-08-01 03:03:51','eugener@sabco.za.com',NULL,NULL,NULL,NULL,'Name not found on CIPC records. Website is https://menusonline.co.za/huamin-chinese-takeaway-and-sushi-bar-emmarentia/menu/  .service is active - suspend and force client to contract afresh','Pended','2020-08-05 19:00:00',NULL,NULL,NULL,NULL,'HUA101'),(375,25,'2020-07-28 18:00:39','robson@sabco.za.com','eugener@sabco.za.com',NULL,'2020-08-01 03:04:01','eugener@sabco.za.com',NULL,NULL,NULL,NULL,NULL,'Pended','2020-08-05 19:00:00',NULL,NULL,NULL,NULL,'HVB101'),(376,26,'2020-07-28 18:00:44','robson@sabco.za.com','eugener@sabco.za.com',NULL,'2020-08-01 03:04:11','eugener@sabco.za.com',NULL,NULL,NULL,NULL,NULL,'Pended','2020-08-05 19:00:00',NULL,NULL,NULL,NULL,'ILK101'),(377,27,'2020-07-28 18:00:49','robson@sabco.za.com','eugener@sabco.za.com',NULL,'2020-08-01 03:04:21','eugener@sabco.za.com',NULL,NULL,NULL,NULL,'Account is either for Entimex Education (https://www.entimex.com/contact/) or Imagine IPS (https://www.imagine.co.za/)','Pended','2020-08-05 19:00:00',NULL,NULL,NULL,NULL,'IMA102'),(378,28,'2020-07-28 18:00:54','robson@sabco.za.com','eugener@sabco.za.com',NULL,'2020-08-01 03:04:31','eugener@sabco.za.com',NULL,NULL,NULL,NULL,NULL,'Pended','2020-08-05 19:00:00',NULL,NULL,NULL,NULL,'INT103'),(379,29,'2020-07-28 18:00:59','robson@sabco.za.com','eugener@sabco.za.com',NULL,'2020-08-01 03:04:41','eugener@sabco.za.com',NULL,NULL,NULL,NULL,NULL,'Pended','2020-08-05 19:00:00',NULL,NULL,NULL,NULL,'JAB101'),(380,30,'2020-07-28 18:01:04','robson@sabco.za.com','eugener@sabco.za.com',NULL,'2020-08-01 03:04:51','eugener@sabco.za.com',NULL,NULL,NULL,NULL,'No contract once off invoice','Pended','2020-08-05 19:00:00',NULL,NULL,NULL,NULL,'LBV001'),(381,31,'2020-07-28 18:01:09','robson@sabco.za.com','eugener@sabco.za.com',NULL,'2020-08-01 03:05:01','eugener@sabco.za.com',NULL,NULL,NULL,NULL,NULL,'Pended','2020-08-05 19:00:00',NULL,NULL,NULL,NULL,'MCC104'),(382,32,'2020-07-28 18:01:14','robson@sabco.za.com','eugener@sabco.za.com',NULL,'2020-08-01 03:05:11','eugener@sabco.za.com',NULL,NULL,NULL,NULL,'SIMPLYFAI - reg name is IGROUP SOLUTIONS','Pended','2020-08-05 19:00:00',NULL,NULL,NULL,NULL,'MLS101'),(383,33,'2020-07-28 18:01:19','robson@sabco.za.com','eugener@sabco.za.com',NULL,'2020-08-01 03:05:21','eugener@sabco.za.com',NULL,NULL,NULL,NULL,'LOURENS VAN RENSBURG, 690318XXXX08X | VAN DER WESTHUIZEN JACQUES HENRY, 731214XXXX08X','Pended','2020-08-05 19:00:00',NULL,NULL,NULL,NULL,'MON101'),(384,34,'2020-07-28 18:01:24','robson@sabco.za.com','eugener@sabco.za.com',NULL,'2020-08-01 03:05:31','eugener@sabco.za.com',NULL,NULL,NULL,NULL,NULL,'Pended','2020-08-05 19:00:00',NULL,NULL,NULL,NULL,'MOS103'),(385,35,'2020-07-28 18:01:29','robson@sabco.za.com','eugener@sabco.za.com',NULL,'2020-08-01 03:05:41','eugener@sabco.za.com',NULL,NULL,NULL,NULL,NULL,'Pended','2020-08-05 19:00:00',NULL,NULL,NULL,NULL,'MYE046'),(386,36,'2020-07-28 18:01:34','robson@sabco.za.com','eugener@sabco.za.com',NULL,'2020-08-01 03:05:51','eugener@sabco.za.com',NULL,NULL,NULL,NULL,'To be handed back to SADV. Do not action','Closed','2020-08-05 19:00:00',NULL,NULL,NULL,NULL,'NEP101'),(387,37,'2020-07-28 18:01:39','robson@sabco.za.com','eugener@sabco.za.com',NULL,'2020-08-01 03:06:01','eugener@sabco.za.com',NULL,NULL,NULL,NULL,'NKANYISO ICT (See Bureau report for Bukosini)','Pended','2020-08-05 19:00:00',NULL,NULL,NULL,NULL,'NKA101'),(388,38,'2020-07-28 18:01:44','robson@sabco.za.com','eugener@sabco.za.com',NULL,'2020-08-01 03:06:11','eugener@sabco.za.com',NULL,NULL,NULL,NULL,'NOT ON CRM/NO INFO ON ANY SYSTEM.. https://www.vdsgroup.co.za/… one logix vds in kempton park, 46 tulbach road - does vehicle delivery services - 011 396 9040','Pended','2020-08-05 19:00:00',NULL,NULL,NULL,NULL,'ONE201'),(389,39,'2020-07-28 18:01:49','robson@sabco.za.com','eugener@sabco.za.com',NULL,'2020-08-01 03:06:21','eugener@sabco.za.com',NULL,NULL,NULL,NULL,'Contract signed by Pam Golding representative.\r\nThe unsigned/not accepted quote is made out to COMOLINA SA (Pty) ltd 2012/166767/07 for wifi access point at Unit 115 Forty on Oak, Melrose Arch. Dlamini Ndihuwo would have signed','Pended','2020-08-05 19:00:00',NULL,NULL,NULL,NULL,'PAM101'),(390,40,'2020-07-29 18:00:38','robson@sabco.za.com','eugener@sabco.za.com',NULL,'2020-08-01 03:06:31','eugener@sabco.za.com',NULL,NULL,NULL,NULL,NULL,'Pended','2020-08-05 19:00:00',NULL,NULL,NULL,NULL,'PAT101'),(391,41,'2020-07-29 18:00:52','robson@sabco.za.com','eugener@sabco.za.com',NULL,'2020-08-01 03:06:41','eugener@sabco.za.com',NULL,NULL,NULL,NULL,'WENTZEL, LINCOLN PATRICK Director','Pended','2020-08-05 19:00:00',NULL,NULL,NULL,NULL,'REV101'),(392,42,'2020-07-29 18:01:05','robson@sabco.za.com','eugener@sabco.za.com',NULL,'2020-08-01 03:06:51','eugener@sabco.za.com',NULL,NULL,NULL,NULL,NULL,'Pended','2020-08-05 19:00:00',NULL,NULL,NULL,NULL,'RNS101'),(393,43,'2020-07-29 18:01:19','robson@sabco.za.com','eugener@sabco.za.com',NULL,'2020-08-01 03:07:01','eugener@sabco.za.com',NULL,NULL,NULL,NULL,NULL,'Pended','2020-08-05 19:00:00',NULL,NULL,NULL,NULL,'SAI102'),(394,44,'2020-07-29 18:01:33','robson@sabco.za.com','eugener@sabco.za.com',NULL,'2020-08-01 03:07:11','eugener@sabco.za.com',NULL,NULL,NULL,NULL,'2 Passports','Pended','2020-08-05 19:00:00',NULL,NULL,NULL,NULL,'SIB210'),(395,45,'2020-07-29 18:01:47','robson@sabco.za.com','eugener@sabco.za.com',NULL,'2020-08-01 03:07:21','eugener@sabco.za.com',NULL,NULL,NULL,NULL,NULL,'Pended','2020-08-05 19:00:00',NULL,NULL,NULL,NULL,'SLI035'),(396,46,'2020-07-29 18:02:01','robson@sabco.za.com','eugener@sabco.za.com',NULL,'2020-08-01 03:07:31','eugener@sabco.za.com',NULL,NULL,NULL,NULL,'2separate companies of same name with same directors & address','Pended','2020-08-05 19:00:00',NULL,NULL,NULL,NULL,'SUP104'),(397,47,'2020-07-29 18:02:15','robson@sabco.za.com','eugener@sabco.za.com',NULL,'2020-08-01 03:07:41','eugener@sabco.za.com',NULL,NULL,NULL,NULL,NULL,'Pended','2020-08-05 19:00:00',NULL,NULL,NULL,NULL,'TLA141'),(398,48,'2020-07-29 18:02:29','robson@sabco.za.com','eugener@sabco.za.com',NULL,'2020-08-01 03:07:51','eugener@sabco.za.com',NULL,NULL,NULL,NULL,NULL,'Pended','2020-08-05 19:00:00',NULL,NULL,NULL,NULL,'TW0113'),(399,49,'2020-07-29 18:02:43','robson@sabco.za.com','eugener@sabco.za.com',NULL,'2020-08-01 03:08:01','eugener@sabco.za.com',NULL,NULL,NULL,NULL,NULL,'Pended','2020-08-05 19:00:00',NULL,NULL,NULL,NULL,'TW0247'),(400,50,'2020-07-29 18:02:57','robson@sabco.za.com','eugener@sabco.za.com',NULL,'2020-08-01 03:08:11','eugener@sabco.za.com',NULL,NULL,NULL,NULL,NULL,'Pended','2020-08-05 19:00:00',NULL,NULL,NULL,NULL,'TWA292');
/*!40000 ALTER TABLE `cases` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `clientservices`
--

DROP TABLE IF EXISTS `clientservices`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `clientservices` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `f_id` int(11) NOT NULL,
  `service` varchar(45) NOT NULL,
  `type` varchar(45) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=9 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `clientservices`
--

LOCK TABLES `clientservices` WRITE;
/*!40000 ALTER TABLE `clientservices` DISABLE KEYS */;
/*!40000 ALTER TABLE `clientservices` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `comments`
--

DROP TABLE IF EXISTS `comments`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `comments` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `username` varchar(45) NOT NULL,
  `dateComment` datetime NOT NULL,
  `comment` varchar(250) NOT NULL,
  `likes` int(11) DEFAULT '0',
  `f_blogId` int(11) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `comments`
--

LOCK TABLES `comments` WRITE;
/*!40000 ALTER TABLE `comments` DISABLE KEYS */;
/*!40000 ALTER TABLE `comments` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `contacts`
--

DROP TABLE IF EXISTS `contacts`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `contacts` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `primaryContactName` varchar(100) DEFAULT NULL,
  `primaryContactNumber` varchar(13) DEFAULT NULL,
  `primaryContactEmail` varchar(100) DEFAULT NULL,
  `representativeName` varchar(100) DEFAULT NULL,
  `representativeNumber` varchar(13) DEFAULT NULL,
  `representativeEmail` varchar(100) DEFAULT NULL,
  `alternativeRepName` varchar(100) DEFAULT NULL,
  `alternativeRepNumber` varchar(13) DEFAULT NULL,
  `alternativeRepEmail` varchar(100) DEFAULT NULL,
  `otherNumber1` varchar(13) DEFAULT NULL,
  `otherNumber2` varchar(13) DEFAULT NULL,
  `otherNumber3` varchar(13) DEFAULT NULL,
  `otherNumber4` varchar(13) DEFAULT NULL,
  `otherNumber5` varchar(13) DEFAULT NULL,
  `otherEmail1` varchar(100) DEFAULT NULL,
  `otherEmail2` varchar(100) DEFAULT NULL,
  `otherEmail3` varchar(100) DEFAULT NULL,
  `otherEmail4` varchar(100) DEFAULT NULL,
  `otherEmail5` varchar(100) DEFAULT NULL,
  `dnc1` varchar(100) DEFAULT NULL,
  `dnc2` varchar(100) DEFAULT NULL,
  `dnc3` varchar(100) DEFAULT NULL,
  `dnc4` varchar(100) DEFAULT NULL,
  `dnc5` varchar(100) DEFAULT NULL,
  `f_accountNumber` varchar(25) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=389 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `contacts`
--

LOCK TABLES `contacts` WRITE;
/*!40000 ALTER TABLE `contacts` DISABLE KEYS */;
INSERT INTO `contacts` VALUES (339,NULL,'0113808099',NULL,'RINA VAN DER WESTHUIZEN','0745337046','rina@bbkih.com',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,'noah@bbkih.com',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,'3RD101'),(340,NULL,NULL,'ndi.nelwamondo@pamgolding.co.za','JUERGEN SCHREIBER','0116842995',NULL,'Cindy de Beer',NULL,'cindy.debeer@pamgolding.co.za',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,'5OH012'),(341,NULL,NULL,'support@a360.com',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,'AEO101'),(342,NULL,NULL,'ss.matterinvestments@gmail.com',NULL,'0764231609',NULL,'Aman',NULL,'aman@matterinv.com',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,'AIM101'),(343,NULL,NULL,NULL,'SCHEKTER',NULL,'schekter@urbanitelounge.co.za',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,'0790600367',NULL,NULL,NULL,NULL,'ALJ101'),(344,NULL,NULL,NULL,'BRONWYN BOTHA','0828932387','bronwyn.botha@attooh.co.za',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,'ATT102'),(345,NULL,NULL,NULL,'LUKE JOHN BACKOS','0836087774','luke.backos@piratemotors.co.za',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,'BAC101'),(346,NULL,'0119531305',NULL,'Melody','0825557107','melody@arvanitis.co.za','ZORAN PECELJ',NULL,'stefanp@mweb.co.za',NULL,NULL,NULL,NULL,NULL,'ellis@arvanitis.co.za',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,'BBQ101'),(347,NULL,NULL,NULL,'ALROY','0214621844','alroy@ccgosa.com',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,'invoices@ccgosa.com',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,'BON102'),(348,NULL,NULL,NULL,'Josie Gubeon','082 772 0084',NULL,'KOBUS HOUGH','0823302075',NULL,NULL,NULL,NULL,NULL,NULL,' Jeconia.Kapia@capricorn.com.na','Nikola.Fahrbach@capricorn.com.na',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,'CAP104'),(349,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,'CEN102'),(350,NULL,NULL,NULL,'CHERISE ANSARA','0711539876','cherise@property-100.co.za',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,'CH0243'),(351,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,'CJS101'),(352,NULL,NULL,NULL,'SHAWN JOOSTE','0791081920','shawn@rockingconnect.co.za',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,'COA101'),(353,NULL,NULL,NULL,'Michael van Onselen','0114474360','michael@coolideas.co.za',NULL,NULL,'michell@coolideas.co.za',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,'COO104'),(354,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,'DGH101'),(355,NULL,NULL,'accounts@dorondiamonds.co.za; ','Ben','0213003954','BEN@DORONDIAMONDS.CO.ZA',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,'info@dorondiamonds.co.za',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,'DOR101'),(356,NULL,NULL,'candicezaaiman@gmail.com','CANDICE ZAAIMAN','0796759340','candice.paulus@gmail.com',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,'DV1144'),(357,NULL,'0114826568',NULL,'RAHEEMA','0784239998','raheema@gattooattorneys.co.za',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,'GAT101'),(358,NULL,NULL,NULL,'ODIEGWU TIMOTHY EKENE','0620414261',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,'ismaila0104@gmail.com',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,'GRA078'),(359,NULL,NULL,'tk@joile.co.za','KIMENGWA NGAMBI','0731537419',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,'tk@torque.co.zm',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,'GRA297'),(360,NULL,NULL,NULL,'KATE MODIMA BODIBA','0781430609','katemodima@gmail.com',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,'GRA586'),(361,NULL,NULL,NULL,'ANGELIQUE STEENKAMP','0832826606','angelique@group7properties.co.za',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,'info@group7properties.co.za',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,'GRO101'),(362,NULL,NULL,NULL,'KELLY WU','0725119556','kellywu2009@icloud.com',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,'kirsten.zellmer@unicreditgroup.co.za',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,'HUA101'),(363,NULL,NULL,NULL,'Dr Christian Nagele','0829020114',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,'HVB101'),(364,NULL,'0765589154',NULL,'RONEL PRETORIUS','0100203601','ronel@ilkafinance.co.za','Brandon/Raymond/Kenneth Scheepers','0820712165','brandon@ilkafinance.co.za',NULL,NULL,NULL,NULL,NULL,'kenneth@ilkafinance.co.za','raymond@ilkafinance.co.za','brandon@ilkafinance.co.za',NULL,NULL,NULL,NULL,NULL,NULL,NULL,'ILK101'),(365,NULL,'0112147600',NULL,'Sabina Ramushu',NULL,'sabina@imagine.co.za','JANET LOTRIET','0112147600','accounts@entimex.com',NULL,NULL,NULL,NULL,NULL,'sales@imagine.co.za','helpdesk@imagine.co.za','jitesh.r@entimex.com','info@entimex.com',NULL,NULL,NULL,NULL,NULL,NULL,'IMA102'),(366,NULL,NULL,'support@intdev.co.za','SUPPORT','0110822727',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,'INT103'),(367,NULL,NULL,'invoices@jabfruit.co.za','JACO ROUX','0137472161',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,'JAB101'),(368,NULL,'0827325125',NULL,'TANIA DU PLESSIS','0218829633','tania.dp.24@gmail.com',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,'LBV001'),(369,NULL,NULL,NULL,'JUSTIN MCCALLUM','0845995032','justin@mackabel.co.za',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,'MCC104'),(370,NULL,NULL,NULL,'CHANTELLE',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,'marc@aisimple.com','johanita@simplyfai.com',NULL,NULL,NULL,'0105906244',NULL,NULL,NULL,NULL,'MLS101'),(371,NULL,NULL,NULL,'TIAAN PEENS','0636865022','tiaan@montagusnacks.co.za','Endri','0236141360','endri@montagusnacks.co.za',NULL,NULL,NULL,NULL,NULL,'Endri@mdfn.co.za','tiaan@mdfn.co.za',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,'MON101'),(372,NULL,NULL,NULL,'MUTSI PHAKISO MOSOEU','0828174329','mutsim@nobolex.com',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,'MOS103'),(373,NULL,NULL,NULL,'NIKALYE OLDJOHN','0734405505','Nikalyej@gmail.com',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,'MYE046'),(374,NULL,NULL,'accounts@nepic.co.za','JAN KEYSER','0119797038',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,'denise@nepic.co.za','tarryn@nepic.co.za',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,'NEP101'),(375,NULL,NULL,NULL,'PHUMLANI BUKOSINI','0718630543','phumlani@nkanyiso.co.za',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,'NKA101'),(376,NULL,'0113969040',NULL,'LINDA GOVENDER',NULL,'linda.govender@vdsgroup.co.za',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,'ONE201'),(377,NULL,'0116842996',NULL,'Onako',NULL,NULL,'Ndivhuwo Nelwamondo','0116842996','ndi.nelwamondo@pamgolding.co.za',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,'PAM101'),(378,NULL,NULL,'accounts@patachou.co.za','Lloyd Barker','0118802610',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,'PAT101'),(379,NULL,NULL,'sales@reviewking.co.za','Lincoln Wentzel','0786737791',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,'accounts@reviewking.co.za',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,'REV101'),(380,NULL,'0824460199',NULL,'VANESSA','0117942227','vanessa@radionetworksolution.com',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,'RNS101'),(381,NULL,NULL,'accounts@saicomvoice.co.za','ANNETTE SPRULES','0112830552','annette@saicomvoice.co.za',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,'mercy@saicomvoice.co.za',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,'SAI102'),(382,NULL,NULL,NULL,'PAUL USIRI','0719313156','pusiri63@gmail.com',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,'SIB210'),(383,NULL,NULL,NULL,'Lynette Watson',NULL,'watson.lynette@gmail.com',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,'0829298240',NULL,NULL,NULL,NULL,'SLI035'),(384,NULL,'0718832465',NULL,'KOSIE KOTZE','0116866879','kosie.kotze@supersport.com',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,'sean.everett@supersport.co.za',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,'SUP104'),(385,NULL,NULL,NULL,'FARREN PRETORIUS','0726234326','farrenpmofokeng@gmail.com',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,'TLA141'),(386,NULL,NULL,NULL,'OSENI SAMUEL','0631219337','sammyhector@icloud.com',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,'TW0113'),(387,NULL,NULL,NULL,'RAJI MOSHOOD KOLAWOLE','0813947660','moshoodkolawole1@gmail.com',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,'TW0247'),(388,NULL,NULL,NULL,NULL,'0614766463',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,'TWA292');
/*!40000 ALTER TABLE `contacts` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `customers`
--

DROP TABLE IF EXISTS `customers`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `customers` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `operatorShortCode` varchar(45) DEFAULT NULL,
  `customerRefNo` varchar(25) NOT NULL,
  `customerName` varchar(100) NOT NULL,
  `customerEntity` varchar(45) NOT NULL,
  `regIdNumber` varchar(45) DEFAULT NULL,
  `customerType` varchar(100) DEFAULT NULL,
  `productType` varchar(100) DEFAULT NULL,
  `address1` varchar(45) DEFAULT NULL,
  `address2` varchar(45) DEFAULT NULL,
  `address3` varchar(45) DEFAULT NULL,
  `address4` varchar(45) DEFAULT NULL,
  `address5` varchar(45) DEFAULT NULL,
  `createdBy` varchar(45) NOT NULL,
  `createdDate` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updatedBy` varchar(45) DEFAULT NULL,
  `updatedDate` datetime DEFAULT NULL,
  `closedBy` varchar(45) DEFAULT NULL,
  `closedDate` datetime DEFAULT NULL,
  `regIdStatus` varchar(100) DEFAULT NULL,
  `f_clientId` int(11) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `Secondary` (`createdBy`,`createdDate`,`updatedBy`,`updatedDate`,`regIdNumber`)
) ENGINE=InnoDB AUTO_INCREMENT=2005 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `customers`
--

LOCK TABLES `customers` WRITE;
/*!40000 ALTER TABLE `customers` DISABLE KEYS */;
INSERT INTO `customers` VALUES (1974,NULL,'3RD101','BAKGATLA BA KGAFELA INVESTMENT HOLDINGS (BBKIH)','','2013/103761/07',NULL,NULL,NULL,NULL,NULL,NULL,NULL,'System','2020-09-04 21:11:28','email@email.com','2020-09-04 22:40:41','email@email.com','2020-09-04 22:40:41','In Business',1),(1975,NULL,'AEO101','AEONOVA 360','',NULL,'Business client',NULL,NULL,NULL,NULL,NULL,NULL,'System','2020-09-04 21:11:28',NULL,NULL,NULL,NULL,NULL,1),(1976,NULL,'AIM101','MATTER INVESTMENTS (PTY) LTD','','2015/347727/07',NULL,'Business Unshaped Platinum',NULL,NULL,NULL,NULL,NULL,'System','2020-09-04 21:11:28',NULL,NULL,NULL,NULL,'In Business',1),(1977,NULL,'ALJ101','ALJ CONSULTING','','2016/330994/07',NULL,'Fibre Basics Business Uncapped',NULL,NULL,NULL,NULL,NULL,'System','2020-09-04 21:11:28',NULL,NULL,NULL,NULL,'AR Deregistration Process',1),(1978,NULL,'BBQ101','BBQ WORKSHOP','','2016/402942/07',NULL,'Retail Silver Extreme Capped 10Mb 100Gb1,024.86',NULL,NULL,NULL,NULL,NULL,'System','2020-09-04 21:11:28',NULL,NULL,NULL,NULL,'In Business',1),(1979,NULL,'BON102','BONTIWORX (PTY) LTD','','2015/032922/07','P30',NULL,NULL,NULL,NULL,NULL,NULL,'System','2020-09-04 21:11:28',NULL,NULL,NULL,NULL,'In Business',1),(1980,NULL,'CAP104','CAPRICORN INVESTMENT GROUP (PTY) LTD','','2016/076408/07',NULL,'Business Services Online Signup',NULL,NULL,NULL,NULL,NULL,'System','2020-09-04 21:11:28',NULL,NULL,NULL,NULL,'In Business',1),(1981,NULL,'CEN102','CENTRAL PARK','',NULL,'Business client','Once Installation',NULL,NULL,NULL,NULL,NULL,'System','2020-09-04 21:11:28',NULL,NULL,NULL,NULL,NULL,1),(1982,NULL,'CJS101','CRAZY JELLY STORE (PTY) LTD','','2013/182168/07',NULL,NULL,NULL,NULL,NULL,NULL,NULL,'System','2020-09-04 21:11:28',NULL,NULL,NULL,NULL,'In Business',1),(1983,NULL,'COA101','ROCKING CONNECT PTY LTD','','2013/047237/07','P30',NULL,NULL,NULL,NULL,NULL,NULL,'System','2020-09-04 21:11:28',NULL,NULL,NULL,NULL,'In Business',1),(1984,NULL,'COO104','COOL IDEAS SERVICE PROVIDER','','2016/046103/07','ISP',NULL,NULL,NULL,NULL,NULL,NULL,'System','2020-09-04 21:11:28',NULL,NULL,NULL,NULL,'In Business',1),(1985,NULL,'DGH101','D & G HOLDINGS (PTY) LTD/ D AND G HOLDINGS','','2018/547039/07',NULL,NULL,NULL,NULL,NULL,NULL,NULL,'System','2020-09-04 21:11:28',NULL,NULL,NULL,NULL,'In Business',1),(1986,NULL,'DOR101','DORON DIAMONDS','','2001/085397/23','FTTB',NULL,NULL,NULL,NULL,NULL,NULL,'System','2020-09-04 21:11:28',NULL,NULL,NULL,NULL,'In Business',1),(1987,NULL,'GAT101','N GATTOO INC T/A GATTOO ATTORNEYS','','2009/019143/21',NULL,'Business Shaped Uncapped 50MB',NULL,NULL,NULL,NULL,NULL,'System','2020-09-04 21:11:28',NULL,NULL,NULL,NULL,NULL,1),(1988,NULL,'GRO101','PROPERTY HELPLINE (PTY) LTD','','2015/097337/07',NULL,'Business Shaped Uncapped 50MB',NULL,NULL,NULL,NULL,NULL,'System','2020-09-04 21:11:28',NULL,NULL,NULL,NULL,'In Business',1),(1989,NULL,'HUA101','HUAMIN TRADING','','2011/113336/07',NULL,'Retail Silver Extreme Capped 10Mb 100Gb',NULL,NULL,NULL,NULL,NULL,'System','2020-09-04 21:11:28',NULL,NULL,NULL,NULL,NULL,1),(1990,NULL,'HVB101','HVB SERVICES SOUTH AFRICA (PTY LTD','','2000/020353/07',NULL,NULL,NULL,NULL,NULL,NULL,NULL,'System','2020-09-04 21:11:28',NULL,NULL,NULL,NULL,NULL,1),(1991,NULL,'ILK101','ILKA FINANCE (PTY) LTD','','2005/027222/07','Business client',NULL,NULL,NULL,NULL,NULL,NULL,'System','2020-09-04 21:11:28',NULL,NULL,NULL,NULL,'AR Deregistration Process',1),(1992,NULL,'IMA102','IMAGINE IPS','',NULL,NULL,'Package not available',NULL,NULL,NULL,NULL,NULL,'System','2020-09-04 21:11:28',NULL,NULL,NULL,NULL,NULL,1),(1993,NULL,'INT103','INTDEV Internet Technologies','','2003/030511/07','P30',NULL,NULL,NULL,NULL,NULL,NULL,'System','2020-09-04 21:11:28',NULL,NULL,NULL,NULL,'In Business',1),(1994,NULL,'JAB101','JAB DRIED FRUIT PRODUCTS (PTY) LTD','','2006/006974/07',NULL,'Fibre Paced Business Uncapped 20Mb',NULL,NULL,NULL,NULL,NULL,'System','2020-09-04 21:11:28',NULL,NULL,NULL,NULL,'Final Liquidation',1),(1995,NULL,'MLS101','SIMPLYFAI','','2015/137696/07','Business client',NULL,NULL,NULL,NULL,NULL,NULL,'System','2020-09-04 21:11:28',NULL,NULL,NULL,NULL,'In Business',1),(1996,NULL,'MON101','MDF MANAGEMENT HOLDINGS (PTY) LTD','','2010/006836/07',NULL,'Business Services Online Signup',NULL,NULL,NULL,NULL,NULL,'System','2020-09-04 21:11:28',NULL,NULL,NULL,NULL,'In Business',1),(1997,NULL,'NEP101','NEPIC (PTY) LTD','','2014/024218/07','ISP',NULL,NULL,NULL,NULL,NULL,NULL,'System','2020-09-04 21:11:28',NULL,NULL,NULL,NULL,NULL,1),(1998,NULL,'NKA101','NKANYISO ICT (See Bureau report for Bukosini)','','2015232312/07',NULL,NULL,NULL,NULL,NULL,NULL,NULL,'System','2020-09-04 21:11:28',NULL,NULL,NULL,NULL,NULL,1),(1999,NULL,'ONE201','ONELOGIX VDS','',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,'System','2020-09-04 21:11:28',NULL,NULL,NULL,NULL,NULL,1),(2000,NULL,'PAT101','PATACHOU PATISSERIE (PTY) LTD','','2015/198200/07',NULL,NULL,NULL,NULL,NULL,NULL,NULL,'System','2020-09-04 21:11:28',NULL,NULL,NULL,NULL,'Voluntary Liquidation',1),(2001,NULL,'REV101','REVIEWKING (PTY) LTD','','2016/179836/07','P30',NULL,NULL,NULL,NULL,NULL,NULL,'System','2020-09-04 21:11:28',NULL,NULL,NULL,NULL,'In Business',1),(2002,NULL,'RNS101','RADIO NETWORK SOLUTIONS','','2002/002514/07',NULL,'Package not available',NULL,NULL,NULL,NULL,NULL,'System','2020-09-04 21:11:28',NULL,NULL,NULL,NULL,'In Business',1),(2003,NULL,'SAI102','SAICOM VOICE SERVICES (PTY) LTD','','2000/000684/07',NULL,'Managed access Local Contended',NULL,NULL,NULL,NULL,NULL,'System','2020-09-04 21:11:28',NULL,NULL,NULL,NULL,'In Business',1),(2004,NULL,'SUP104','SUPERSPORT INTERNATIONAL','',NULL,'Business client',NULL,NULL,NULL,NULL,NULL,NULL,'System','2020-09-04 21:11:28',NULL,NULL,NULL,NULL,NULL,1);
/*!40000 ALTER TABLE `customers` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2020-09-14 14:42:23
