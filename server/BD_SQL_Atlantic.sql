-- MySQL dump 10.13  Distrib 8.0.44, for Win64 (x86_64)
--
-- Host: localhost    Database: atlantic_city_crm
-- ------------------------------------------------------
-- Server version	8.0.44

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
-- Table structure for table `auth_group`
--

DROP TABLE IF EXISTS `auth_group`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `auth_group` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(150) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `name` (`name`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `auth_group`
--

LOCK TABLES `auth_group` WRITE;
/*!40000 ALTER TABLE `auth_group` DISABLE KEYS */;
/*!40000 ALTER TABLE `auth_group` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `auth_group_permissions`
--

DROP TABLE IF EXISTS `auth_group_permissions`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `auth_group_permissions` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `group_id` int NOT NULL,
  `permission_id` int NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `auth_group_permissions_group_id_permission_id_0cd325b0_uniq` (`group_id`,`permission_id`),
  KEY `auth_group_permissio_permission_id_84c5c92e_fk_auth_perm` (`permission_id`),
  CONSTRAINT `auth_group_permissio_permission_id_84c5c92e_fk_auth_perm` FOREIGN KEY (`permission_id`) REFERENCES `auth_permission` (`id`),
  CONSTRAINT `auth_group_permissions_group_id_b120cbf9_fk_auth_group_id` FOREIGN KEY (`group_id`) REFERENCES `auth_group` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `auth_group_permissions`
--

LOCK TABLES `auth_group_permissions` WRITE;
/*!40000 ALTER TABLE `auth_group_permissions` DISABLE KEYS */;
/*!40000 ALTER TABLE `auth_group_permissions` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `auth_permission`
--

DROP TABLE IF EXISTS `auth_permission`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `auth_permission` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(255) NOT NULL,
  `content_type_id` int NOT NULL,
  `codename` varchar(100) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `auth_permission_content_type_id_codename_01ab375a_uniq` (`content_type_id`,`codename`),
  CONSTRAINT `auth_permission_content_type_id_2f476e4b_fk_django_co` FOREIGN KEY (`content_type_id`) REFERENCES `django_content_type` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=61 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `auth_permission`
--

LOCK TABLES `auth_permission` WRITE;
/*!40000 ALTER TABLE `auth_permission` DISABLE KEYS */;
INSERT INTO `auth_permission` VALUES (1,'Can add log entry',1,'add_logentry'),(2,'Can change log entry',1,'change_logentry'),(3,'Can delete log entry',1,'delete_logentry'),(4,'Can view log entry',1,'view_logentry'),(5,'Can add permission',3,'add_permission'),(6,'Can change permission',3,'change_permission'),(7,'Can delete permission',3,'delete_permission'),(8,'Can view permission',3,'view_permission'),(9,'Can add group',2,'add_group'),(10,'Can change group',2,'change_group'),(11,'Can delete group',2,'delete_group'),(12,'Can view group',2,'view_group'),(13,'Can add user',4,'add_user'),(14,'Can change user',4,'change_user'),(15,'Can delete user',4,'delete_user'),(16,'Can view user',4,'view_user'),(17,'Can add content type',5,'add_contenttype'),(18,'Can change content type',5,'change_contenttype'),(19,'Can delete content type',5,'delete_contenttype'),(20,'Can view content type',5,'view_contenttype'),(21,'Can add session',6,'add_session'),(22,'Can change session',6,'change_session'),(23,'Can delete session',6,'delete_session'),(24,'Can view session',6,'view_session'),(25,'Can add Token',8,'add_token'),(26,'Can change Token',8,'change_token'),(27,'Can delete Token',8,'delete_token'),(28,'Can view Token',8,'view_token'),(29,'Can add Token',9,'add_tokenproxy'),(30,'Can change Token',9,'change_tokenproxy'),(31,'Can delete Token',9,'delete_tokenproxy'),(32,'Can view Token',9,'view_tokenproxy'),(33,'Can add Atención',10,'add_atencioncliente'),(34,'Can change Atención',10,'change_atencioncliente'),(35,'Can delete Atención',10,'delete_atencioncliente'),(36,'Can view Atención',10,'view_atencioncliente'),(37,'Can add Cliente',7,'add_cliente'),(38,'Can change Cliente',7,'change_cliente'),(39,'Can delete Cliente',7,'delete_cliente'),(40,'Can view Cliente',7,'view_cliente'),(41,'Can add Interacción',11,'add_interaccion'),(42,'Can change Interacción',11,'change_interaccion'),(43,'Can delete Interacción',11,'delete_interaccion'),(44,'Can view Interacción',11,'view_interaccion'),(45,'Can add Juego',12,'add_juego'),(46,'Can change Juego',12,'change_juego'),(47,'Can delete Juego',12,'delete_juego'),(48,'Can view Juego',12,'view_juego'),(49,'Can add Promoción',13,'add_promocion'),(50,'Can change Promoción',13,'change_promocion'),(51,'Can delete Promoción',13,'delete_promocion'),(52,'Can view Promoción',13,'view_promocion'),(53,'Can add Visita',14,'add_visita'),(54,'Can change Visita',14,'change_visita'),(55,'Can delete Visita',14,'delete_visita'),(56,'Can view Visita',14,'view_visita'),(57,'Can add Transacción',15,'add_transaccion'),(58,'Can change Transacción',15,'change_transaccion'),(59,'Can delete Transacción',15,'delete_transaccion'),(60,'Can view Transacción',15,'view_transaccion');
/*!40000 ALTER TABLE `auth_permission` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `auth_user`
--

DROP TABLE IF EXISTS `auth_user`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `auth_user` (
  `id` int NOT NULL AUTO_INCREMENT,
  `password` varchar(128) NOT NULL,
  `last_login` datetime(6) DEFAULT NULL,
  `is_superuser` tinyint(1) NOT NULL,
  `username` varchar(150) NOT NULL,
  `first_name` varchar(150) NOT NULL,
  `last_name` varchar(150) NOT NULL,
  `email` varchar(254) NOT NULL,
  `is_staff` tinyint(1) NOT NULL,
  `is_active` tinyint(1) NOT NULL,
  `date_joined` datetime(6) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `username` (`username`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `auth_user`
--

LOCK TABLES `auth_user` WRITE;
/*!40000 ALTER TABLE `auth_user` DISABLE KEYS */;
INSERT INTO `auth_user` VALUES (1,'pbkdf2_sha256$1200000$LUGfmcTPCn4CjuibWTjChM$eXRhxqq2ekcg8cGuBqXgjlkF6LgDT17PfxEJ1obwLbA=','2026-01-10 16:59:32.376626',1,'andres','','','',1,1,'2026-01-10 16:57:17.588936'),(2,'pbkdf2_sha256$1200000$pNVJlnpjyeA6OlkZeZO7nQ$w51D1Wh93vYSgUHu4QBnJ9mVB7WPkIrTzwabjDuNqOU=',NULL,1,'arteaga','','','',1,1,'2026-01-21 01:10:46.044684'),(3,'pbkdf2_sha256$1200000$HSMV5hnrzpbNWlrUrGqH69$MDUSUjF4HWYBv+acWcQXh+k1RTzqOQGtAVnQrxHpNU8=','2026-01-30 15:35:24.064219',1,'artan','','','',1,1,'2026-01-26 16:34:49.138429'),(4,'pbkdf2_sha256$1200000$CC4EGJMpYuc2Tv0S9FzBB0$PKbIbix2Vl6QdCmygpmL2dlQGS9LQXN9eDASthE5CHw=',NULL,0,'Admin1','','','',0,1,'2026-01-30 15:37:01.156833');
/*!40000 ALTER TABLE `auth_user` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `auth_user_groups`
--

DROP TABLE IF EXISTS `auth_user_groups`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `auth_user_groups` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `user_id` int NOT NULL,
  `group_id` int NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `auth_user_groups_user_id_group_id_94350c0c_uniq` (`user_id`,`group_id`),
  KEY `auth_user_groups_group_id_97559544_fk_auth_group_id` (`group_id`),
  CONSTRAINT `auth_user_groups_group_id_97559544_fk_auth_group_id` FOREIGN KEY (`group_id`) REFERENCES `auth_group` (`id`),
  CONSTRAINT `auth_user_groups_user_id_6a12ed8b_fk_auth_user_id` FOREIGN KEY (`user_id`) REFERENCES `auth_user` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `auth_user_groups`
--

LOCK TABLES `auth_user_groups` WRITE;
/*!40000 ALTER TABLE `auth_user_groups` DISABLE KEYS */;
/*!40000 ALTER TABLE `auth_user_groups` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `auth_user_user_permissions`
--

DROP TABLE IF EXISTS `auth_user_user_permissions`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `auth_user_user_permissions` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `user_id` int NOT NULL,
  `permission_id` int NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `auth_user_user_permissions_user_id_permission_id_14a6b632_uniq` (`user_id`,`permission_id`),
  KEY `auth_user_user_permi_permission_id_1fbb5f2c_fk_auth_perm` (`permission_id`),
  CONSTRAINT `auth_user_user_permi_permission_id_1fbb5f2c_fk_auth_perm` FOREIGN KEY (`permission_id`) REFERENCES `auth_permission` (`id`),
  CONSTRAINT `auth_user_user_permissions_user_id_a95ead1b_fk_auth_user_id` FOREIGN KEY (`user_id`) REFERENCES `auth_user` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `auth_user_user_permissions`
--

LOCK TABLES `auth_user_user_permissions` WRITE;
/*!40000 ALTER TABLE `auth_user_user_permissions` DISABLE KEYS */;
/*!40000 ALTER TABLE `auth_user_user_permissions` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `authtoken_token`
--

DROP TABLE IF EXISTS `authtoken_token`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `authtoken_token` (
  `key` varchar(40) NOT NULL,
  `created` datetime(6) NOT NULL,
  `user_id` int NOT NULL,
  PRIMARY KEY (`key`),
  UNIQUE KEY `user_id` (`user_id`),
  CONSTRAINT `authtoken_token_user_id_35299eff_fk_auth_user_id` FOREIGN KEY (`user_id`) REFERENCES `auth_user` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `authtoken_token`
--

LOCK TABLES `authtoken_token` WRITE;
/*!40000 ALTER TABLE `authtoken_token` DISABLE KEYS */;
INSERT INTO `authtoken_token` VALUES ('1db891413af3d5e7e677a2849bb59af8f11d77e5','2026-01-26 16:35:31.813480',3),('a76c9e92e1a1bb211940cffe1a682f61b64a0f14','2026-01-21 01:13:57.398179',2);
/*!40000 ALTER TABLE `authtoken_token` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `django_admin_log`
--

DROP TABLE IF EXISTS `django_admin_log`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `django_admin_log` (
  `id` int NOT NULL AUTO_INCREMENT,
  `action_time` datetime(6) NOT NULL,
  `object_id` longtext,
  `object_repr` varchar(200) NOT NULL,
  `action_flag` smallint unsigned NOT NULL,
  `change_message` longtext NOT NULL,
  `content_type_id` int DEFAULT NULL,
  `user_id` int NOT NULL,
  PRIMARY KEY (`id`),
  KEY `django_admin_log_content_type_id_c4bce8eb_fk_django_co` (`content_type_id`),
  KEY `django_admin_log_user_id_c564eba6_fk_auth_user_id` (`user_id`),
  CONSTRAINT `django_admin_log_content_type_id_c4bce8eb_fk_django_co` FOREIGN KEY (`content_type_id`) REFERENCES `django_content_type` (`id`),
  CONSTRAINT `django_admin_log_user_id_c564eba6_fk_auth_user_id` FOREIGN KEY (`user_id`) REFERENCES `auth_user` (`id`),
  CONSTRAINT `django_admin_log_chk_1` CHECK ((`action_flag` >= 0))
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `django_admin_log`
--

LOCK TABLES `django_admin_log` WRITE;
/*!40000 ALTER TABLE `django_admin_log` DISABLE KEYS */;
INSERT INTO `django_admin_log` VALUES (1,'2026-01-10 17:12:18.855171','1','Isabel Ramirez',1,'[{\"added\": {}}]',7,1),(2,'2026-01-30 15:37:01.660902','4','Admin1',1,'[{\"added\": {}}]',4,3);
/*!40000 ALTER TABLE `django_admin_log` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `django_content_type`
--

DROP TABLE IF EXISTS `django_content_type`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `django_content_type` (
  `id` int NOT NULL AUTO_INCREMENT,
  `app_label` varchar(100) NOT NULL,
  `model` varchar(100) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `django_content_type_app_label_model_76bd3d3b_uniq` (`app_label`,`model`)
) ENGINE=InnoDB AUTO_INCREMENT=16 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `django_content_type`
--

LOCK TABLES `django_content_type` WRITE;
/*!40000 ALTER TABLE `django_content_type` DISABLE KEYS */;
INSERT INTO `django_content_type` VALUES (1,'admin','logentry'),(2,'auth','group'),(3,'auth','permission'),(4,'auth','user'),(8,'authtoken','token'),(9,'authtoken','tokenproxy'),(5,'contenttypes','contenttype'),(10,'crm_api','atencioncliente'),(7,'crm_api','cliente'),(11,'crm_api','interaccion'),(12,'crm_api','juego'),(13,'crm_api','promocion'),(15,'crm_api','transaccion'),(14,'crm_api','visita'),(6,'sessions','session');
/*!40000 ALTER TABLE `django_content_type` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `django_migrations`
--

DROP TABLE IF EXISTS `django_migrations`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `django_migrations` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `app` varchar(255) NOT NULL,
  `name` varchar(255) NOT NULL,
  `applied` datetime(6) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=25 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `django_migrations`
--

LOCK TABLES `django_migrations` WRITE;
/*!40000 ALTER TABLE `django_migrations` DISABLE KEYS */;
INSERT INTO `django_migrations` VALUES (1,'contenttypes','0001_initial','2026-01-10 16:55:54.431678'),(2,'auth','0001_initial','2026-01-10 16:55:54.881972'),(3,'admin','0001_initial','2026-01-10 16:55:54.989543'),(4,'admin','0002_logentry_remove_auto_add','2026-01-10 16:55:54.994793'),(5,'admin','0003_logentry_add_action_flag_choices','2026-01-10 16:55:54.999917'),(6,'contenttypes','0002_remove_content_type_name','2026-01-10 16:55:55.098833'),(7,'auth','0002_alter_permission_name_max_length','2026-01-10 16:55:55.267382'),(8,'auth','0003_alter_user_email_max_length','2026-01-10 16:55:55.285971'),(9,'auth','0004_alter_user_username_opts','2026-01-10 16:55:55.291814'),(10,'auth','0005_alter_user_last_login_null','2026-01-10 16:55:55.346472'),(11,'auth','0006_require_contenttypes_0002','2026-01-10 16:55:55.348503'),(12,'auth','0007_alter_validators_add_error_messages','2026-01-10 16:55:55.357948'),(13,'auth','0008_alter_user_username_max_length','2026-01-10 16:55:55.411018'),(14,'auth','0009_alter_user_last_name_max_length','2026-01-10 16:55:55.459764'),(15,'auth','0010_alter_group_name_max_length','2026-01-10 16:55:55.476199'),(16,'auth','0011_update_proxy_permissions','2026-01-10 16:55:55.482666'),(17,'auth','0012_alter_user_first_name_max_length','2026-01-10 16:55:55.550818'),(18,'sessions','0001_initial','2026-01-10 16:55:55.586988'),(19,'authtoken','0001_initial','2026-01-21 01:08:33.310092'),(20,'authtoken','0002_auto_20160226_1747','2026-01-21 01:08:33.329713'),(21,'authtoken','0003_tokenproxy','2026-01-21 01:08:33.333458'),(22,'authtoken','0004_alter_tokenproxy_options','2026-01-21 01:08:33.337073'),(23,'crm_api','0001_initial','2026-01-21 01:08:33.341630'),(24,'crm_api','0002_alter_cliente_options_transaccion','2026-01-26 19:49:17.951109');
/*!40000 ALTER TABLE `django_migrations` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `django_session`
--

DROP TABLE IF EXISTS `django_session`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `django_session` (
  `session_key` varchar(40) NOT NULL,
  `session_data` longtext NOT NULL,
  `expire_date` datetime(6) NOT NULL,
  PRIMARY KEY (`session_key`),
  KEY `django_session_expire_date_a5c62663` (`expire_date`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `django_session`
--

LOCK TABLES `django_session` WRITE;
/*!40000 ALTER TABLE `django_session` DISABLE KEYS */;
INSERT INTO `django_session` VALUES ('nj3k9g3z4827abnjuwfpmlre5hr5mpp7','.eJxVjDEOwjAMAP_iGUW4IU3SkZ03RHbskgJKpaadEH9HlTrAene6NyTa1pK2pkuaBAawcPplTPmpdRfyoHqfTZ7rukxs9sQctpnbLPq6Hu3foFArMIAyemLNmd3o0Dofcow6BstdR4gSxSPSOahKz1Y8hT5r6NBGdBrcBT5fB584Ow:1vlqWq:SdPooiG7N74jKQfSVPJzhSeXmL0Vz9ZbxKDq0FiReXc','2026-02-13 15:35:24.070172'),('y5hrutgtos4d89fagv3azufg8o6oaqg7','.eJxVjEEKwyAQAP-y5yIaV6k59t43yK5ratqiEJNT6N9LIIf2OjPMDpG2tcSt5yXOAiMYuPwypvTK9RDypPpoKrW6LjOrI1Gn7ereJL9vZ_s3KNQLjKA1YXCOKWuiq_UDo09WByvZJM8S0Gjngx08WyZLEhwa9jrJhBNigM8X03o3iQ:1vecJI:PzKMlFdWYJ2-96PDJftf2gZC6vd6npXImarCDH4uY7k','2026-01-24 16:59:32.379074');
/*!40000 ALTER TABLE `django_session` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `tb_asignacion_promociones`
--

DROP TABLE IF EXISTS `tb_asignacion_promociones`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `tb_asignacion_promociones` (
  `idAsignacion` int NOT NULL AUTO_INCREMENT,
  `idCliente` int NOT NULL,
  `idPromocion` int NOT NULL,
  `fechaAsignacion` datetime NOT NULL,
  `estado` varchar(50) NOT NULL,
  PRIMARY KEY (`idAsignacion`),
  KEY `idCliente` (`idCliente`),
  KEY `idPromocion` (`idPromocion`),
  CONSTRAINT `tb_asignacion_promociones_ibfk_1` FOREIGN KEY (`idCliente`) REFERENCES `tb_cliente` (`idCliente`),
  CONSTRAINT `tb_asignacion_promociones_ibfk_2` FOREIGN KEY (`idPromocion`) REFERENCES `tb_promociones` (`idPromocion`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `tb_asignacion_promociones`
--

LOCK TABLES `tb_asignacion_promociones` WRITE;
/*!40000 ALTER TABLE `tb_asignacion_promociones` DISABLE KEYS */;
/*!40000 ALTER TABLE `tb_asignacion_promociones` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `tb_atencion_cliente`
--

DROP TABLE IF EXISTS `tb_atencion_cliente`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `tb_atencion_cliente` (
  `idAtencion` int NOT NULL AUTO_INCREMENT,
  `idCliente` int NOT NULL,
  `fechaAtencion` datetime NOT NULL,
  `tipoSolicitud` varchar(50) NOT NULL,
  `descripcion` text NOT NULL,
  `estado` varchar(50) NOT NULL,
  PRIMARY KEY (`idAtencion`),
  KEY `idCliente` (`idCliente`),
  CONSTRAINT `tb_atencion_cliente_ibfk_1` FOREIGN KEY (`idCliente`) REFERENCES `tb_cliente` (`idCliente`)
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `tb_atencion_cliente`
--

LOCK TABLES `tb_atencion_cliente` WRITE;
/*!40000 ALTER TABLE `tb_atencion_cliente` DISABLE KEYS */;
INSERT INTO `tb_atencion_cliente` VALUES (1,2,'2026-02-03 01:50:10','Reclamo de Pagos','Maquina retuvo el pago al cliente, revisar maquina para validar ganancia y pagar en caja al cliente','Cerrado'),(3,6,'2026-02-03 02:32:43','Canje de Puntos','desea canjear puntos ganados en sorteo X','Cerrado'),(4,8,'2026-02-03 03:25:32','Consulta General','maquina se trabó','Abierto'),(5,15,'2026-02-04 01:24:25','Consulta General','Necesita información de como acceder a la Promoción X','Abierto');
/*!40000 ALTER TABLE `tb_atencion_cliente` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `tb_cliente`
--

DROP TABLE IF EXISTS `tb_cliente`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `tb_cliente` (
  `idCliente` int NOT NULL AUTO_INCREMENT,
  `nombres` varchar(100) NOT NULL,
  `apellidos` varchar(100) NOT NULL,
  `dni` varchar(15) NOT NULL,
  `direccion` varchar(255) DEFAULT NULL,
  `email` varchar(150) DEFAULT NULL,
  `celular` varchar(20) DEFAULT NULL,
  `nivel` varchar(50) DEFAULT 'Nuevo',
  `es_vetado` tinyint(1) DEFAULT '0',
  PRIMARY KEY (`idCliente`),
  UNIQUE KEY `dni` (`dni`),
  UNIQUE KEY `email` (`email`)
) ENGINE=InnoDB AUTO_INCREMENT=21 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `tb_cliente`
--

LOCK TABLES `tb_cliente` WRITE;
/*!40000 ALTER TABLE `tb_cliente` DISABLE KEYS */;
INSERT INTO `tb_cliente` VALUES (1,'Isabel','Ramirez','10203040','URB Las Mercedez MZ G lt 3','jaingenieriaconsultoria@gmail.com','966458874','Nuevo',0),(2,'Andrés','Arteaga','004509660',NULL,'librat.27.02@gmial.com','933116718','Platinum',0),(3,'cesar','aguirre','121342424',NULL,'hola@gmail.com','1234442434','VETADO',1),(4,'Angie','Sanchez','7296554',NULL,'angie@gmail.com','966145866','Gold',0),(5,'Diana isabela','Arteaga','000000',NULL,'libsasas@gmail.com','933116178','VETADO',1),(6,'Brian','Benitez','00450874',NULL,'lalala@gmail.com','0424404231','Bronce',0),(7,'Leonel','Messi','98312334',NULL,'soymessi@gmail.com','933221230','Gold',0),(8,'Andrés','Cajan','23456',NULL,'librat@lacebolla.com','987852951','Gold',0),(12,'Cristiano','Ronaldo','308712',NULL,'elbicho@gmail.com','988766752','Nuevo',0),(13,'Diego','Ordinola','234156',NULL,'Gordinola@gmail.com','988765431','Silver',0),(14,'Hardy','Alamo','889921',NULL,'LArry@gmail.com','988123491','Bronce',0),(15,'Manuel','Espinoza','34411234',NULL,'CAqre@mmgvo.com','998765149','Nuevo',0),(16,'Lamine','Yamal','3265598',NULL,'lamintamall@barca.com','966987941','Bronce',0),(17,'ELVETADO','POR tramposo','1111111',NULL,'tramposo@gmail.com','985561412','VETADO',1),(18,'Luis','Suarez','875456',NULL,'9@lucho.com','986954789','Platinum',0),(19,'Juan','Arteaga','45698723',NULL,'','900876234','Nuevo',0),(20,'Francisco','Pereyra','222222',NULL,'Francisco@gmail.com','954751426','Nuevo',0);
/*!40000 ALTER TABLE `tb_cliente` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `tb_interacciones`
--

DROP TABLE IF EXISTS `tb_interacciones`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `tb_interacciones` (
  `idInteraccion` int NOT NULL AUTO_INCREMENT,
  `idVisita` int NOT NULL,
  `idJuego` int DEFAULT NULL,
  `idPromocion` int DEFAULT NULL,
  `montoGasto` decimal(10,2) DEFAULT NULL,
  `fechaHoraRegistro` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`idInteraccion`),
  KEY `idVisita` (`idVisita`),
  KEY `idJuego` (`idJuego`),
  KEY `idPromocion` (`idPromocion`),
  CONSTRAINT `tb_interacciones_ibfk_1` FOREIGN KEY (`idVisita`) REFERENCES `tb_visitas` (`idVisita`),
  CONSTRAINT `tb_interacciones_ibfk_2` FOREIGN KEY (`idJuego`) REFERENCES `tb_juegos` (`idJuego`),
  CONSTRAINT `tb_interacciones_ibfk_3` FOREIGN KEY (`idPromocion`) REFERENCES `tb_promociones` (`idPromocion`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `tb_interacciones`
--

LOCK TABLES `tb_interacciones` WRITE;
/*!40000 ALTER TABLE `tb_interacciones` DISABLE KEYS */;
/*!40000 ALTER TABLE `tb_interacciones` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `tb_juegos`
--

DROP TABLE IF EXISTS `tb_juegos`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `tb_juegos` (
  `idJuego` int NOT NULL AUTO_INCREMENT,
  `nombreJuego` varchar(100) NOT NULL,
  `categoria` varchar(50) NOT NULL,
  PRIMARY KEY (`idJuego`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `tb_juegos`
--

LOCK TABLES `tb_juegos` WRITE;
/*!40000 ALTER TABLE `tb_juegos` DISABLE KEYS */;
/*!40000 ALTER TABLE `tb_juegos` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `tb_promociones`
--

DROP TABLE IF EXISTS `tb_promociones`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `tb_promociones` (
  `idPromocion` int NOT NULL AUTO_INCREMENT,
  `nombrePromocion` varchar(150) NOT NULL,
  `descripcion` text,
  `fechaInicio` date NOT NULL,
  `fechaFin` date NOT NULL,
  PRIMARY KEY (`idPromocion`)
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `tb_promociones`
--

LOCK TABLES `tb_promociones` WRITE;
/*!40000 ALTER TABLE `tb_promociones` DISABLE KEYS */;
INSERT INTO `tb_promociones` VALUES (2,'Bono de Bienvenida','Valido para clientes nuevos','2026-01-31','2026-12-31'),(3,'Menú gratis','Valido para clientes Gold y Platinium','2026-02-02','2026-02-07'),(5,'50 giros gratis para clientes','Valido solo para clientes GOLD','2026-01-28','2026-02-02');
/*!40000 ALTER TABLE `tb_promociones` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `tb_transacciones`
--

DROP TABLE IF EXISTS `tb_transacciones`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `tb_transacciones` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `monto` decimal(10,2) NOT NULL,
  `tipo` varchar(20) NOT NULL,
  `fecha` datetime(6) NOT NULL,
  `idCliente` int NOT NULL,
  PRIMARY KEY (`id`),
  KEY `tb_transacciones_idCliente_79e59b97_fk_tb_cliente_idCliente` (`idCliente`),
  CONSTRAINT `tb_transacciones_idCliente_79e59b97_fk_tb_cliente_idCliente` FOREIGN KEY (`idCliente`) REFERENCES `tb_cliente` (`idCliente`)
) ENGINE=InnoDB AUTO_INCREMENT=45 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `tb_transacciones`
--

LOCK TABLES `tb_transacciones` WRITE;
/*!40000 ALTER TABLE `tb_transacciones` DISABLE KEYS */;
INSERT INTO `tb_transacciones` VALUES (1,500.00,'RECARGA_TARJETA','2026-01-26 20:41:17.076776',2),(2,100.00,'COMPRA_FICHAS','2026-01-26 21:49:44.762922',6),(3,300.00,'RECARGA_TARJETA','2026-01-26 21:50:14.781928',4),(4,300.00,'COMPRA_FICHAS','2026-01-26 21:56:27.285372',3),(5,600.00,'RECARGA_TARJETA','2026-01-26 22:38:48.747648',1),(6,300.00,'COMPRA_FICHAS','2026-01-26 22:39:13.034768',1),(7,500.00,'COMPRA_FICHAS','2026-01-26 22:39:35.304047',5),(8,200.00,'COMPRA_FICHAS','2026-01-27 00:35:23.782589',8),(9,600.00,'COMPRA_FICHAS','2026-01-27 00:39:21.779731',8),(10,600.00,'RECARGA_TARJETA','2026-01-27 00:39:39.206068',8),(11,1000.00,'RECARGA_TARJETA','2026-01-27 00:39:53.060408',8),(12,3000.00,'COMPRA_FICHAS','2026-01-27 00:56:23.126648',2),(13,5000.00,'COMPRA_FICHAS','2026-01-27 00:57:21.110307',2),(14,8500.00,'RECARGA_TARJETA','2026-01-28 02:11:23.603806',13),(15,5000.00,'RECARGA_TARJETA','2026-01-30 16:13:02.503308',16),(16,2500.00,'RECARGA_TARJETA','2026-01-30 16:16:29.220939',14),(17,1500.00,'COMPRA_FICHAS','2026-01-30 16:16:48.446070',14),(18,2000.00,'COMPRA_FICHAS','2026-01-30 16:17:02.284107',14),(19,5000.00,'COMPRA_FICHAS','2026-01-30 16:37:41.557752',18),(20,2000.00,'RECARGA_TARJETA','2026-01-30 16:38:37.649545',18),(21,1000.00,'RECARGA_TARJETA','2026-01-30 16:38:45.140198',18),(22,1000.00,'COMPRA_FICHAS','2026-01-30 16:41:30.399442',18),(23,2000.00,'COMPRA_FICHAS','2026-01-30 16:41:35.269899',18),(24,2000.00,'COMPRA_FICHAS','2026-01-30 16:42:02.225537',18),(25,2000.00,'COMPRA_FICHAS','2026-01-30 16:42:06.001542',18),(26,5000.00,'RECARGA_TARJETA','2026-01-30 16:42:43.913692',2),(27,5000.00,'RECARGA_TARJETA','2026-01-30 16:42:49.692905',2),(28,100.00,'RECARGA_TARJETA','2026-01-30 17:07:42.854671',6),(29,300.00,'RECARGA_TARJETA','2026-02-03 02:52:21.906236',2),(30,500.00,'RECARGA_TARJETA','2026-02-03 03:37:57.410337',14),(31,855.00,'RECARGA_TARJETA','2026-02-03 03:40:44.171022',19),(32,345.00,'COMPRA_FICHAS','2026-02-03 03:41:03.747331',18),(33,345.00,'COMPRA_FICHAS','2026-02-03 03:41:16.697631',16),(34,678.00,'RECARGA_TARJETA','2026-02-03 03:41:29.700099',15),(35,500.00,'COMPRA_FICHAS','2026-02-03 03:41:52.522249',13),(36,200.00,'RECARGA_TARJETA','2026-02-03 03:42:19.615289',1),(37,600.00,'RECARGA_TARJETA','2026-02-03 03:42:41.479309',2),(38,600.00,'COMPRA_FICHAS','2026-02-03 03:42:55.919978',4),(39,6000.00,'RECARGA_TARJETA','2026-02-03 03:43:13.381168',6),(40,5000.00,'COMPRA_FICHAS','2026-02-03 03:43:26.736702',4),(41,7000.00,'COMPRA_FICHAS','2026-02-03 03:43:44.573641',4),(42,600.00,'COMPRA_FICHAS','2026-02-03 03:44:12.011780',8),(43,8000.00,'COMPRA_FICHAS','2026-02-03 03:44:18.408282',8),(44,600.00,'RECARGA_TARJETA','2026-02-04 00:04:51.067144',2);
/*!40000 ALTER TABLE `tb_transacciones` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `tb_visitas`
--

DROP TABLE IF EXISTS `tb_visitas`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `tb_visitas` (
  `idVisita` int NOT NULL AUTO_INCREMENT,
  `idCliente` int NOT NULL,
  `fechaVisita` date NOT NULL,
  `horaVisita` time NOT NULL,
  PRIMARY KEY (`idVisita`),
  KEY `idCliente` (`idCliente`),
  CONSTRAINT `tb_visitas_ibfk_1` FOREIGN KEY (`idCliente`) REFERENCES `tb_cliente` (`idCliente`)
) ENGINE=InnoDB AUTO_INCREMENT=355 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `tb_visitas`
--

LOCK TABLES `tb_visitas` WRITE;
/*!40000 ALTER TABLE `tb_visitas` DISABLE KEYS */;
INSERT INTO `tb_visitas` VALUES (3,5,'2025-08-11','23:46:00'),(4,7,'2025-08-18','15:54:00'),(5,7,'2025-08-02','19:52:00'),(6,5,'2025-08-24','16:21:00'),(7,3,'2025-08-04','16:06:00'),(8,6,'2025-08-03','16:35:00'),(9,2,'2025-08-22','20:18:00'),(10,4,'2025-08-09','17:56:00'),(11,2,'2025-08-17','15:17:00'),(12,6,'2025-08-27','22:38:00'),(13,1,'2025-08-06','21:50:00'),(14,1,'2025-08-05','15:30:00'),(15,5,'2025-08-26','17:32:00'),(16,2,'2025-08-12','19:06:00'),(17,3,'2025-08-22','19:15:00'),(18,2,'2025-08-26','20:34:00'),(19,2,'2025-08-07','21:36:00'),(20,3,'2025-08-21','23:17:00'),(21,1,'2025-08-15','14:06:00'),(22,7,'2025-08-13','19:17:00'),(23,2,'2025-08-11','17:03:00'),(24,2,'2025-08-09','14:53:00'),(25,2,'2025-08-22','23:47:00'),(26,2,'2025-08-27','15:47:00'),(27,1,'2025-08-17','15:02:00'),(28,2,'2025-08-13','17:21:00'),(29,4,'2025-08-04','22:50:00'),(30,7,'2025-08-21','22:09:00'),(31,5,'2025-08-01','15:23:00'),(32,6,'2025-08-01','21:03:00'),(33,2,'2025-08-07','14:28:00'),(34,4,'2025-08-03','21:12:00'),(35,7,'2025-08-25','22:07:00'),(36,5,'2025-08-13','15:27:00'),(37,4,'2025-08-04','15:59:00'),(38,1,'2025-08-07','23:55:00'),(39,3,'2025-08-01','19:18:00'),(40,3,'2025-08-22','14:40:00'),(41,6,'2025-08-07','20:15:00'),(42,2,'2025-08-06','19:22:00'),(43,7,'2025-08-10','14:11:00'),(44,7,'2025-08-03','18:34:00'),(45,5,'2025-08-03','16:47:00'),(46,2,'2025-08-21','19:02:00'),(47,6,'2025-08-18','15:31:00'),(48,3,'2025-08-09','21:00:00'),(49,6,'2025-08-13','20:59:00'),(50,1,'2025-08-18','17:38:00'),(51,7,'2025-08-04','18:39:00'),(52,3,'2025-08-12','18:40:00'),(53,7,'2025-08-18','23:24:00'),(54,6,'2025-08-11','20:21:00'),(55,1,'2025-08-16','19:22:00'),(56,7,'2025-08-05','21:04:00'),(57,4,'2025-08-18','17:34:00'),(58,3,'2025-08-07','17:23:00'),(59,7,'2025-08-01','19:38:00'),(60,6,'2025-08-19','16:10:00'),(61,6,'2025-08-05','22:14:00'),(62,6,'2025-08-28','19:59:00'),(63,7,'2025-08-26','18:01:00'),(64,7,'2025-08-09','22:38:00'),(65,6,'2025-08-17','16:08:00'),(66,2,'2025-08-03','20:40:00'),(67,5,'2025-08-07','15:28:00'),(68,4,'2025-08-27','15:06:00'),(69,6,'2025-08-09','17:30:00'),(70,4,'2025-08-21','14:54:00'),(71,6,'2025-08-06','21:38:00'),(72,7,'2025-08-17','18:48:00'),(73,5,'2025-08-08','18:24:00'),(74,2,'2025-08-19','19:03:00'),(75,1,'2025-08-05','17:19:00'),(76,5,'2025-08-25','14:02:00'),(77,1,'2025-09-23','18:13:00'),(78,4,'2025-09-15','21:18:00'),(79,6,'2025-09-02','18:51:00'),(80,3,'2025-09-08','15:24:00'),(81,1,'2025-09-19','21:20:00'),(82,1,'2025-09-10','15:06:00'),(83,1,'2025-09-09','15:58:00'),(84,5,'2025-09-07','16:21:00'),(85,1,'2025-09-27','22:01:00'),(86,4,'2025-08-31','14:29:00'),(87,7,'2025-09-25','22:52:00'),(88,1,'2025-09-03','14:35:00'),(89,7,'2025-08-31','23:28:00'),(90,4,'2025-09-14','21:46:00'),(91,6,'2025-09-16','23:03:00'),(92,4,'2025-09-08','21:50:00'),(93,1,'2025-09-05','22:59:00'),(94,5,'2025-09-22','22:37:00'),(95,5,'2025-09-11','19:03:00'),(96,1,'2025-09-19','23:05:00'),(97,7,'2025-09-15','22:37:00'),(98,4,'2025-09-16','22:09:00'),(99,1,'2025-09-03','22:53:00'),(100,3,'2025-09-04','21:06:00'),(101,4,'2025-09-15','15:10:00'),(102,7,'2025-09-24','21:14:00'),(103,5,'2025-09-10','15:17:00'),(104,7,'2025-09-12','18:42:00'),(105,5,'2025-09-09','23:13:00'),(106,4,'2025-09-20','22:17:00'),(107,2,'2025-08-31','19:08:00'),(108,2,'2025-09-08','23:21:00'),(109,3,'2025-09-01','22:33:00'),(110,2,'2025-09-19','22:26:00'),(111,3,'2025-09-09','16:20:00'),(112,1,'2025-09-25','15:12:00'),(113,3,'2025-09-05','17:30:00'),(114,1,'2025-09-02','22:21:00'),(115,2,'2025-09-16','22:02:00'),(116,1,'2025-09-22','16:36:00'),(117,6,'2025-09-25','23:58:00'),(118,5,'2025-09-14','21:29:00'),(119,6,'2025-09-17','22:09:00'),(120,5,'2025-09-03','22:17:00'),(121,1,'2025-09-25','20:09:00'),(122,1,'2025-09-24','18:50:00'),(123,3,'2025-09-19','19:53:00'),(124,5,'2025-09-12','15:43:00'),(125,1,'2025-09-05','18:06:00'),(126,3,'2025-09-13','15:19:00'),(127,6,'2025-09-19','20:02:00'),(128,2,'2025-09-14','18:13:00'),(129,4,'2025-09-28','16:06:00'),(130,2,'2025-09-22','21:43:00'),(131,7,'2025-09-10','23:27:00'),(132,5,'2025-09-17','14:12:00'),(133,3,'2025-09-25','16:45:00'),(134,5,'2025-09-02','21:24:00'),(135,5,'2025-09-04','19:33:00'),(136,2,'2025-09-23','19:35:00'),(137,5,'2025-09-14','16:21:00'),(138,3,'2025-09-16','20:08:00'),(139,1,'2025-09-24','17:05:00'),(140,2,'2025-09-09','17:49:00'),(141,2,'2025-09-01','18:06:00'),(142,5,'2025-10-28','15:53:00'),(143,6,'2025-10-14','17:21:00'),(144,6,'2025-10-10','17:57:00'),(145,7,'2025-10-14','17:34:00'),(146,5,'2025-10-05','21:25:00'),(147,6,'2025-10-19','18:17:00'),(148,5,'2025-10-25','15:58:00'),(149,1,'2025-10-25','16:30:00'),(150,5,'2025-10-13','23:19:00'),(151,2,'2025-10-16','18:25:00'),(152,4,'2025-10-13','18:57:00'),(153,7,'2025-10-15','18:31:00'),(154,5,'2025-10-26','20:58:00'),(155,2,'2025-10-25','19:01:00'),(156,5,'2025-10-11','18:21:00'),(157,3,'2025-10-06','19:55:00'),(158,1,'2025-10-23','19:38:00'),(159,4,'2025-10-13','18:32:00'),(160,3,'2025-10-16','22:21:00'),(161,1,'2025-10-20','15:15:00'),(162,4,'2025-09-30','21:59:00'),(163,1,'2025-10-04','15:18:00'),(164,3,'2025-10-15','16:29:00'),(165,1,'2025-10-27','15:52:00'),(166,5,'2025-10-03','23:26:00'),(167,3,'2025-10-18','19:02:00'),(168,3,'2025-10-10','15:19:00'),(169,6,'2025-10-05','18:56:00'),(170,7,'2025-10-26','15:18:00'),(171,5,'2025-10-03','18:48:00'),(172,6,'2025-10-06','15:10:00'),(173,4,'2025-10-14','14:19:00'),(174,3,'2025-10-16','19:06:00'),(175,6,'2025-10-20','21:46:00'),(176,1,'2025-10-15','18:36:00'),(177,1,'2025-10-14','18:43:00'),(178,7,'2025-10-22','20:11:00'),(179,3,'2025-10-25','23:15:00'),(180,3,'2025-10-22','16:58:00'),(181,6,'2025-09-30','16:32:00'),(182,1,'2025-10-09','18:26:00'),(183,1,'2025-10-12','18:20:00'),(184,4,'2025-10-11','15:11:00'),(185,6,'2025-10-17','17:44:00'),(186,3,'2025-10-11','23:48:00'),(187,1,'2025-09-30','17:40:00'),(188,3,'2025-10-06','14:23:00'),(189,7,'2025-10-22','22:22:00'),(190,4,'2025-10-11','23:31:00'),(191,2,'2025-10-21','21:04:00'),(192,2,'2025-10-25','17:42:00'),(193,5,'2025-10-26','15:07:00'),(194,2,'2025-10-24','21:53:00'),(195,7,'2025-11-17','14:27:00'),(196,3,'2025-10-30','19:47:00'),(197,1,'2025-11-10','20:09:00'),(198,6,'2025-11-12','18:08:00'),(199,5,'2025-11-21','20:14:00'),(200,4,'2025-11-23','18:49:00'),(201,7,'2025-11-08','15:53:00'),(202,7,'2025-11-13','22:59:00'),(203,1,'2025-11-16','23:28:00'),(204,4,'2025-11-21','14:25:00'),(205,2,'2025-11-27','20:57:00'),(206,1,'2025-11-26','17:53:00'),(207,7,'2025-11-08','19:49:00'),(208,4,'2025-11-06','21:28:00'),(209,3,'2025-11-10','22:18:00'),(210,4,'2025-11-17','18:50:00'),(211,2,'2025-10-31','14:12:00'),(212,2,'2025-11-13','17:00:00'),(213,6,'2025-11-22','14:36:00'),(214,4,'2025-11-07','20:11:00'),(215,2,'2025-11-24','18:27:00'),(216,5,'2025-11-25','15:59:00'),(217,7,'2025-11-06','18:42:00'),(218,2,'2025-11-02','15:42:00'),(219,5,'2025-11-09','15:27:00'),(220,7,'2025-11-05','16:22:00'),(221,5,'2025-11-18','17:11:00'),(222,3,'2025-10-30','18:46:00'),(223,6,'2025-11-22','15:05:00'),(224,6,'2025-11-24','18:23:00'),(225,7,'2025-11-07','18:57:00'),(226,3,'2025-11-21','19:58:00'),(227,1,'2025-11-20','18:00:00'),(228,3,'2025-11-15','17:06:00'),(229,5,'2025-11-18','16:05:00'),(230,5,'2025-11-12','22:41:00'),(231,6,'2025-11-14','14:21:00'),(232,2,'2025-11-13','17:59:00'),(233,7,'2025-11-09','15:22:00'),(234,6,'2025-11-03','19:35:00'),(235,6,'2025-12-17','16:03:00'),(236,3,'2025-12-08','18:13:00'),(237,3,'2025-12-13','20:44:00'),(238,5,'2025-12-03','22:20:00'),(239,7,'2025-12-27','19:27:00'),(240,7,'2025-12-08','21:36:00'),(241,5,'2025-12-22','23:11:00'),(242,4,'2025-12-15','20:16:00'),(243,5,'2025-12-04','22:28:00'),(244,7,'2025-12-25','15:37:00'),(245,7,'2025-12-15','23:09:00'),(246,5,'2025-12-18','23:36:00'),(247,6,'2025-12-27','22:49:00'),(248,7,'2025-12-25','17:21:00'),(249,5,'2025-12-15','18:50:00'),(250,6,'2025-12-03','16:31:00'),(251,5,'2025-12-05','20:29:00'),(252,4,'2025-12-19','18:09:00'),(253,1,'2025-12-27','16:01:00'),(254,7,'2025-11-29','20:35:00'),(255,1,'2025-12-16','22:50:00'),(256,5,'2025-12-05','14:34:00'),(257,7,'2025-12-05','18:24:00'),(258,4,'2025-12-08','20:00:00'),(259,6,'2025-12-05','14:01:00'),(260,4,'2025-11-29','20:47:00'),(261,7,'2025-12-19','23:49:00'),(262,4,'2025-12-26','14:06:00'),(263,7,'2025-12-23','20:21:00'),(264,1,'2025-12-19','18:08:00'),(265,7,'2025-12-14','14:56:00'),(266,2,'2025-12-09','20:30:00'),(267,6,'2025-12-03','23:56:00'),(268,3,'2025-12-26','19:45:00'),(269,2,'2025-12-20','17:31:00'),(270,3,'2025-12-04','18:00:00'),(271,5,'2025-12-19','21:32:00'),(272,4,'2025-12-20','22:40:00'),(273,3,'2025-12-19','14:19:00'),(274,6,'2025-12-23','20:04:00'),(275,4,'2025-12-07','14:53:00'),(276,1,'2025-12-21','18:15:00'),(277,6,'2025-12-18','22:31:00'),(278,4,'2025-12-27','15:48:00'),(279,5,'2025-12-19','15:43:00'),(280,1,'2025-12-07','16:05:00'),(281,5,'2025-12-27','21:47:00'),(282,2,'2025-12-11','18:48:00'),(283,3,'2025-12-13','20:00:00'),(284,7,'2025-12-06','18:39:00'),(285,6,'2025-12-20','19:54:00'),(286,1,'2025-12-20','20:44:00'),(287,5,'2025-12-08','21:39:00'),(288,7,'2025-12-01','20:01:00'),(289,3,'2025-12-12','16:20:00'),(290,2,'2025-12-22','22:52:00'),(291,1,'2025-12-24','22:17:00'),(292,3,'2025-12-20','23:47:00'),(293,6,'2025-12-21','19:37:00'),(294,2,'2025-12-04','17:16:00'),(295,4,'2025-12-23','16:11:00'),(296,7,'2025-12-03','16:53:00'),(297,1,'2025-12-27','16:14:00'),(298,2,'2025-12-24','22:49:00'),(299,3,'2025-12-19','15:41:00'),(300,6,'2025-12-08','23:44:00'),(301,2,'2025-12-03','14:45:00'),(302,6,'2025-12-17','17:59:00'),(303,3,'2025-12-21','16:14:00'),(304,6,'2026-01-02','17:29:00'),(305,3,'2026-01-17','22:51:00'),(306,5,'2026-01-03','22:48:00'),(307,4,'2025-12-30','23:35:00'),(308,1,'2026-01-14','19:02:00'),(309,4,'2026-01-07','17:23:00'),(310,4,'2025-12-30','22:01:00'),(311,6,'2026-01-17','23:22:00'),(312,4,'2026-01-05','14:59:00'),(313,3,'2026-01-13','18:39:00'),(314,7,'2026-01-11','17:18:00'),(315,7,'2026-01-09','21:21:00'),(316,7,'2026-01-12','18:04:00'),(317,3,'2026-01-03','18:16:00'),(318,4,'2026-01-10','20:36:00'),(319,5,'2026-01-01','15:44:00'),(320,5,'2026-01-01','15:29:00'),(321,2,'2026-01-26','23:23:00'),(322,5,'2026-01-03','21:21:00'),(323,5,'2026-01-14','21:09:00'),(324,5,'2026-01-19','22:43:00'),(325,7,'2026-01-17','23:23:00'),(326,7,'2026-01-05','20:46:00'),(327,3,'2026-01-26','15:49:00'),(328,5,'2025-12-30','16:03:00'),(329,1,'2026-01-07','18:47:00'),(330,4,'2026-01-09','15:02:00'),(331,7,'2026-01-20','20:15:00'),(332,2,'2025-12-29','19:38:00'),(333,7,'2026-01-11','20:20:00'),(334,1,'2026-01-08','18:27:00'),(335,6,'2026-01-25','21:45:00'),(336,4,'2026-01-17','17:54:00'),(337,1,'2026-01-12','14:38:00'),(338,7,'2026-01-12','16:25:00'),(339,6,'2026-01-06','16:08:00'),(340,4,'2026-01-10','22:22:00'),(341,8,'2026-01-27','00:35:24'),(342,2,'2026-01-27','00:56:23'),(343,2,'2026-02-03','02:52:22'),(344,14,'2026-02-03','03:37:57'),(345,19,'2026-02-03','03:40:44'),(346,18,'2026-02-03','03:41:04'),(347,16,'2026-02-03','03:41:17'),(348,15,'2026-02-03','03:41:30'),(349,13,'2026-02-03','03:41:53'),(350,1,'2026-02-03','03:42:20'),(351,4,'2026-02-03','03:42:56'),(352,6,'2026-02-03','03:43:13'),(353,8,'2026-02-03','03:44:12'),(354,2,'2026-02-04','00:04:51');
/*!40000 ALTER TABLE `tb_visitas` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2026-02-03 21:05:22
