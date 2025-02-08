CREATE DATABASE  IF NOT EXISTS `gym_schedule_exame` /*!40100 DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci */ /*!80016 DEFAULT ENCRYPTION='N' */;
USE `gym_schedule_exame`;
-- MySQL dump 10.13  Distrib 8.0.41, for Win64 (x86_64)
--
-- Host: 127.0.0.1    Database: gym_schedule_exame
-- ------------------------------------------------------
-- Server version	8.0.40

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
-- Table structure for table `Feedback`
--

DROP TABLE IF EXISTS `Feedback`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `Feedback` (
  `id` int NOT NULL AUTO_INCREMENT,
  `schedule_id` int NOT NULL,
  `user_id` int NOT NULL,
  `rating` int DEFAULT NULL,
  `comment` text,
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  KEY `schedule_id` (`schedule_id`),
  KEY `user_id` (`user_id`),
  CONSTRAINT `Feedback_ibfk_1` FOREIGN KEY (`schedule_id`) REFERENCES `Schedules` (`id`) ON DELETE CASCADE,
  CONSTRAINT `Feedback_ibfk_2` FOREIGN KEY (`user_id`) REFERENCES `Users` (`id`) ON DELETE CASCADE,
  CONSTRAINT `Feedback_chk_1` CHECK ((`rating` between 1 and 5))
) ENGINE=InnoDB AUTO_INCREMENT=98 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `Feedback`
--

LOCK TABLES `Feedback` WRITE;
/*!40000 ALTER TABLE `Feedback` DISABLE KEYS */;
INSERT INTO `Feedback` VALUES (63,3,3,5,'Musculação com ótimo instrutor, excelente!','2025-01-25 10:59:01'),(65,5,2,4,'Zumba animada, mas música um pouco alta.','2025-01-25 10:59:01'),(66,6,3,5,'Spinning perfeito, energia incrível do instrutor.','2025-01-25 10:59:01'),(67,7,4,4,'HIIT bem puxado, muito bom!','2025-01-25 10:59:01'),(68,8,5,5,'Yoga avançado tranquilo e instrutor muito atencioso.','2025-01-25 10:59:01'),(70,10,2,5,'Aula de Natação excelente, super recomendo!','2025-01-25 10:59:01'),(71,1,3,4,'Pilates clínico muito bom, ótimo para relaxar.','2025-01-25 10:59:01'),(73,3,5,3,'Treino funcional eficaz, mas o tempo foi curto.','2025-01-25 10:59:01'),(75,5,2,5,'Musculação avançada com equipamentos excelentes!','2025-01-25 10:59:01'),(76,6,3,5,'Crossfit Kids foi ótimo para meu filho, ele amou.','2025-01-25 10:59:01'),(77,7,4,4,'Zumba Kids divertida, mas música poderia ser mais infantil.','2025-01-25 10:59:01'),(78,8,5,5,'Alongamento muito relaxante, excelente!','2025-01-25 10:59:01'),(80,10,2,3,'Body Combat legal, mas prefiro outro horário.','2025-01-25 10:59:01'),(81,1,3,5,'Yoga para gestantes foi perfeito, adorei!','2025-01-25 10:59:01'),(83,3,5,5,'Treino pré-campeonato focado, gostei do método.','2025-01-25 10:59:01'),(85,5,2,4,'Ginástica funcional bem planejada, muito bom!','2025-01-25 10:59:01'),(86,6,3,5,'Step tranquilo e instrutor simpático.','2025-01-25 10:59:01'),(87,7,4,4,'Boxe foi ótimo, mas o espaço estava pequeno.','2025-01-25 10:59:01'),(88,8,5,5,'Treino iniciante bem explicado, ótimo para quem está começando.','2025-01-25 10:59:01'),(90,10,2,5,'Aula incrível de HIIT, recomendo muito!','2025-01-25 10:59:01'),(92,6,6,5,'Ótima aula!','2025-01-25 17:38:53'),(93,1,6,5,'Ótima aula!','2025-01-25 17:40:44'),(95,3,3,5,'Ótima aula!','2025-01-25 17:42:27'),(96,3,3,5,'Ótima aula!','2025-01-25 17:47:14'),(97,3,3,4,'Ótima aula!','2025-01-25 17:47:16');
/*!40000 ALTER TABLE `Feedback` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `Instructors`
--

DROP TABLE IF EXISTS `Instructors`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `Instructors` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(100) NOT NULL,
  `specialty` varchar(100) NOT NULL,
  `email` varchar(100) DEFAULT NULL,
  `phone` varchar(15) DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `email` (`email`)
) ENGINE=InnoDB AUTO_INCREMENT=79 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `Instructors`
--

LOCK TABLES `Instructors` WRITE;
/*!40000 ALTER TABLE `Instructors` DISABLE KEYS */;
INSERT INTO `Instructors` VALUES (1,'André Silva','Yoga','andre.silva@example.com','912345678'),(3,'Carlos Mendes','Musculação Atualizado','carlos.mendes@example.com','934567890'),(4,'Daniela Costa','Crossfit','daniela.costa@example.com','945678901'),(5,'Eduardo Santos','Spinning','eduardo.santos@example.com','956789012'),(6,'Fernanda Oliveira','Zumba','fernanda.oliveira@example.com','967890123'),(7,'Gustavo Nogueira','Boxe','gustavo.nogueira@example.com','978901234'),(8,'Helena Duarte','Step','helena.duarte@example.com','989012345'),(9,'Igor Ferreira','HIIT','igor.ferreira@example.com','991234567'),(10,'Juliana Pereira','Yoga Avançado','juliana.pereira@example.com','992345678'),(11,'Kátia Martins','Pilates Clínico','katia.martins@example.com','993456789'),(12,'Leonardo Rocha','Funcional','leonardo.rocha@example.com','994567890'),(13,'Marisa Torres','Treino Feminino','marisa.torres@example.com','995678901'),(14,'Nélson Carvalho','Musculação Avançada','nelson.carvalho@example.com','996789012'),(15,'Osvaldo Almeida','Natação','osvaldo.almeida@example.com','997890123'),(16,'Patrícia Lopes','Body Pump','patricia.lopes@example.com','998901234'),(17,'Rogério Moreira','Spinning Avançado','rogerio.moreira@example.com','999012345'),(18,'Sofia Correia','Zumba Kids','sofia.correia@example.com','991234567'),(19,'Thiago Martins','Boxe Profissional','thiago.martins@example.com','992345678'),(20,'Vânia Silva','Alongamento','vania.silva@example.com','993456789'),(21,'Xuxa Alves','Crossfit Kids','xuxa.alves@example.com','994567890'),(22,'Yuri Gomes','HIIT Avançado','yuri.gomes@example.com','995678901'),(23,'Zilda Ramos','Body Combat','zilda.ramos@example.com','996789012'),(24,'Arthur Lima','Ginástica Funcional','arthur.lima@example.com','997890123'),(25,'Bia Torres','Natação Avançada','bia.torres@example.com','998901234'),(26,'Camila Ferreira','Yoga para Gestantes','camila.ferreira@example.com','999012345'),(27,'Douglas Rocha','Pilates para Idosos','douglas.rocha@example.com','991234567'),(28,'Ester Nunes','Treino Pré-Campeonato','ester.nunes@example.com','992345678'),(29,'Fernando Castro','Step Dance','fernando.castro@example.com','993456789'),(30,'Gisele Lopes','HIIT Iniciante','gisele.lopes@example.com','994567890'),(31,'Mário Gomes','Yoga','mario.gomes@example.com','912345000'),(32,'Ana Souza','Yoga','ana.souza@example.com','912345001'),(33,'Beatriz Cunha','Yoga','beatriz.cunha@example.com','912345002'),(34,'Joana Nunes','Yoga','joana.nunes@example.com','912345003'),(35,'Luís Almeida','Yoga','luis.almeida@example.com','912345004'),(36,'Patrícia Rocha','Pilates','patricia.rocha@example.com','923456000'),(37,'Ricardo Mendes','Pilates','ricardo.mendes@example.com','923456001'),(38,'Leonor Costa','Pilates','leonor.costa@example.com','923456002'),(39,'Fernanda Silva','Pilates','fernanda.silva@example.com','923456003'),(40,'Marcos Torres','Pilates','marcos.torres@example.com','923456004'),(41,'Fábio Correia','Musculação','fabio.correia@example.com','934567000'),(42,'Helena Santos','Musculação','helena.santos@example.com','934567001'),(43,'André Pereira','Musculação','andre.pereira@example.com','934567002'),(44,'Sofia Martins','Musculação','sofia.martins@example.com','934567003'),(45,'Tiago Monteiro','Musculação','tiago.monteiro@example.com','934567004'),(76,'Bruna Lima 2 ','Pilates','bruna2.lima@example.com','923456789'),(78,'Bruna Lima 2 ','Pilates','bruna3.lima@example.com','923456789');
/*!40000 ALTER TABLE `Instructors` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `Schedules`
--

DROP TABLE IF EXISTS `Schedules`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `Schedules` (
  `id` int NOT NULL AUTO_INCREMENT,
  `class_name` varchar(100) NOT NULL,
  `date` date NOT NULL,
  `date_time` datetime NOT NULL,
  `reserved_by` int DEFAULT NULL,
  `instructor_id` int NOT NULL,
  PRIMARY KEY (`id`),
  KEY `reserved_by` (`reserved_by`),
  KEY `instructor_id` (`instructor_id`),
  CONSTRAINT `Schedules_ibfk_1` FOREIGN KEY (`reserved_by`) REFERENCES `Users` (`id`) ON DELETE SET NULL,
  CONSTRAINT `Schedules_ibfk_2` FOREIGN KEY (`instructor_id`) REFERENCES `Instructors` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=32 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `Schedules`
--

LOCK TABLES `Schedules` WRITE;
/*!40000 ALTER TABLE `Schedules` DISABLE KEYS */;
INSERT INTO `Schedules` VALUES (1,'Yoga Básico','2024-11-01','2024-11-01 09:00:00',5,1),(3,'Musculação','2024-11-02','2024-11-02 08:00:00',3,3),(4,'Crossfit','2024-11-03','2024-11-03 07:00:00',4,4),(5,'Zumba','2024-11-04','2024-11-04 11:00:00',5,5),(6,'Spinning','2024-11-05','2024-11-05 12:00:00',6,6),(7,'HIIT','2024-11-06','2024-11-06 18:00:00',7,7),(8,'Yoga Avançado','2024-11-07','2024-11-07 19:00:00',8,8),(9,'Body Pump','2024-11-08','2024-11-08 20:00:00',9,9),(10,'Natação','2024-11-09','2024-11-09 08:30:00',10,10),(11,'Pilates Clínico','2024-11-10','2024-11-10 09:30:00',11,11),(12,'Step Dance','2024-11-11','2024-11-11 10:30:00',12,12),(13,'Treino Funcional','2024-11-12','2024-11-12 14:00:00',13,13),(14,'Treino Feminino','2024-11-13','2024-11-13 15:00:00',14,14),(15,'Musculação Avançada','2024-11-14','2024-11-14 16:00:00',15,15),(16,'Crossfit Kids','2024-11-15','2024-11-15 16:30:00',16,16),(17,'Zumba Kids','2024-11-16','2024-11-16 17:30:00',17,17),(18,'Alongamento','2024-11-17','2024-11-17 18:30:00',18,18),(19,'HIIT Avançado','2024-11-18','2024-11-18 19:30:00',19,19),(20,'Body Combat','2024-11-19','2024-11-19 20:30:00',20,20),(21,'Yoga para Gestantes','2024-11-20','2024-11-20 08:00:00',21,21),(22,'Pilates para Idosos','2024-11-21','2024-11-21 09:00:00',22,22),(23,'Treino Pré-Campeonato','2024-11-22','2024-11-22 10:00:00',23,23),(24,'Spinning Avançado','2024-11-23','2024-11-23 11:00:00',24,24),(25,'Ginástica Funcional','2024-11-24','2024-11-24 12:00:00',25,25),(26,'Step','2024-11-25','2024-11-25 13:00:00',26,26),(27,'Boxe','2024-11-26','2024-11-26 14:00:00',27,27),(29,'Futebol','2024-11-02','2024-11-02 09:00:00',6,1);
/*!40000 ALTER TABLE `Schedules` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `Users`
--

DROP TABLE IF EXISTS `Users`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `Users` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(100) NOT NULL,
  `email` varchar(100) NOT NULL,
  `password` varchar(255) NOT NULL,
  `role` enum('admin','member') NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `email` (`email`)
) ENGINE=InnoDB AUTO_INCREMENT=38 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `Users`
--

LOCK TABLES `Users` WRITE;
/*!40000 ALTER TABLE `Users` DISABLE KEYS */;
INSERT INTO `Users` VALUES (2,'Bruno Lima','bruno.lima@example.com','hashed_password_2','admin'),(3,'Carla Oliveira','carlateste.oliveira@example.com','hashed_password_3','member'),(4,'Daniel Rocha','daniel.rocha@example.com','hashed_password_4','member'),(5,'Eduarda Soares','eduarda.soares@example.com','hashed_password_5','member'),(6,'Fábio Mendes','fabio.mendes@example.com','hashed_password_6','admin'),(7,'Gabriela Costa','gabriela.costa@example.com','hashed_password_7','member'),(8,'Henrique Silva','henrique.silva@example.com','hashed_password_8','member'),(9,'Isabel Duarte','isabel.duarte@example.com','hashed_password_9','member'),(10,'João Pereira','joao.pereira@example.com','hashed_password_10','admin'),(11,'Karina Lopes','karina.lopes@example.com','hashed_password_11','member'),(12,'Lucas Ferreira','lucas.ferreira@example.com','hashed_password_12','member'),(13,'Mariana Almeida','mariana.almeida@example.com','hashed_password_13','member'),(14,'Nuno Torres','nuno.torres@example.com','hashed_password_14','admin'),(15,'Olívia Correia','olivia.correia@example.com','hashed_password_15','member'),(16,'Pedro Santos','pedro.santos@example.com','hashed_password_16','member'),(17,'Rafaela Neves','rafaela.neves@example.com','hashed_password_17','member'),(18,'Sara Martins','sara.martins@example.com','hashed_password_18','admin'),(19,'Tiago Moreira','tiago.moreira@example.com','hashed_password_19','member'),(20,'Vanessa Carvalho','vanessa.carvalho@example.com','hashed_password_20','member'),(21,'Wagner Almeida','wagner.almeida@example.com','hashed_password_21','admin'),(22,'Xavier Cruz','xavier.cruz@example.com','hashed_password_22','member'),(23,'Yasmin Cardoso','yasmin.cardoso@example.com','hashed_password_23','member'),(24,'Zé Ricardo','ze.ricardo@example.com','hashed_password_24','member'),(25,'Anabela Reis','anabela.reis@example.com','hashed_password_25','admin'),(26,'Bárbara Duarte','barbara.duarte@example.com','hashed_password_26','member'),(27,'Cristina Nogueira','cristina.nogueira@example.com','hashed_password_27','member'),(28,'Diogo Faria','diogo.faria@example.com','hashed_password_28','member'),(29,'Rodrigo Pereira','rodrigo@gmail.com','hashed_password_29','admin'),(30,'Miguel Caetano','miguel@example.com','hashed_password_30','admin'),(31,'TEste','teste@gmail.com','1234','admin'),(32,'João Silva','joao@email.com','123456','member'),(34,'Daniel Rocha','danielteste.rocha@example.com','hashed_password_4','member'),(35,'Daniel Rocha 2','daniel2.rocha@example.com','hashed_password_4','member'),(37,'Daniel Rocha 3','daniel3.rocha@example.com','hashed_password_4','member');
/*!40000 ALTER TABLE `Users` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2025-01-27 23:13:55
