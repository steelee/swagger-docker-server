CREATE DATABASE /*!32312 IF NOT EXISTS*/ `api` /*!40100 DEFAULT CHARACTER SET latin1 */;
USE `api`;

DROP TABLE IF EXISTS `api`;
DROP TABLE IF EXISTS `groups`;

CREATE TABLE `groups` (
  `name` VARCHAR(64) NOT NULL,
  PRIMARY KEY (`name`)
) ENGINE=InnoDB CHARSET=latin1;
 
CREATE TABLE `api` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `url` VARCHAR(2084) DEFAULT NULL,
  `name` VARCHAR(64) DEFAULT NULL,
  `group` VARCHAR(64) DEFAULT NULL,
  PRIMARY KEY (`id`),
  CONSTRAINT `group_assign` FOREIGN KEY (`group`) REFERENCES `groups` (`name`) ON DELETE NO ACTION
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=latin1;

INSERT INTO `groups` VALUES('sample');
INSERT INTO `groups` VALUES('mobile');
INSERT INTO `api` VALUES (1,'https://raw.githubusercontent.com/OAI/OpenAPI-Specification/master/examples/v2.0/yaml/uber.yaml','Uber', 'sample');
INSERT INTO `api` VALUES (2,'http://petstore.swagger.io/v2/swagger.json','Petstore','mobile');
