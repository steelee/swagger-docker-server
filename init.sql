CREATE DATABASE /*!32312 IF NOT EXISTS*/ `api` /*!40100 DEFAULT CHARACTER SET latin1 */;
USE `api`;

DROP TABLE IF EXISTS `api`;

CREATE TABLE `api` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `url` VARCHAR(2084) DEFAULT NULL,
  `name` VARCHAR(64) DEFAULT NULL,
  `rating` int(5) DEFAULT 3,
  `owner` VARCHAR(64) DEFAULT NULL,
  `contact` VARCHAR(64) DEFAULT NULL,
  `api_group` VARCHAR(64) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=latin1;

DROP TABLE IF EXISTS `feedback`;

CREATE TABLE `feedback` (
		`fb_id`    INT(11)            NOT NULL AUTO_INCREMENT,
		`api_id`   INT(11)
		`name`     VARCHAR (255)      NOT NULL,
		`email`    VARCHAR (100)      NOT NULL,
		`comments` VARCHAR (2000)     NOT NULL,
		`rating`   INT(5) DEFAULT 0   NOT NULL,
		`date`     DATE               NOT NULL,
		`time`     TIME               NOT NULL,
		PRIMARY KEY (`fb_id`),
		FOREIGN KEY (`api_id`) REFERENCES api(`id`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=latin1;
