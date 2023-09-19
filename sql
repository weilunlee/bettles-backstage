CREATE SCHEMA `bb_db` ;

CREATE TABLE `bb_db`.`customers` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `name` VARCHAR(8) NULL,
  `cell_phone` VARCHAR(12) NULL,
  `address` VARCHAR(255) NULL,
  `conv_store` VARCHAR(255) NULL,
  `last_ip` VARCHAR(45) NULL,
  PRIMARY KEY (`id`));

ALTER TABLE `bb_db`.`customers` 
    ADD COLUMN `created_at` DATETIME NULL AFTER `conv_store`,
    ADD COLUMN `updated_at` DATETIME NULL AFTER `created_at`;

ALTER TABLE `bb_db`.`customers` 
  CHANGE COLUMN `last_ip` `last_ip` VARCHAR(45) NULL DEFAULT '' AFTER `cell_phone`,
  CHANGE COLUMN `name` `name` VARCHAR(8) NULL DEFAULT '' ,
  CHANGE COLUMN `cell_phone` `cell_phone` VARCHAR(12) NULL DEFAULT '' ,
  CHANGE COLUMN `address` `address` VARCHAR(50) NULL DEFAULT '' ,
  CHANGE COLUMN `conv_store` `conv_store` VARCHAR(50) NULL DEFAULT '' ;



CREATE TABLE `bb_db`.`orders_status` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `name` VARCHAR(45) NULL DEFAULT '',
  `customer_id` VARCHAR(45) NULL DEFAULT '',
  `place_time` DATETIME NULL,
  `payment_status` INT NULL DEFAULT 0,
  `payment_time` DATETIME NULL,
  `product_status` INT NULL  DEFAULT 0,
  `shipping_status` INT NULL DEFAULT 0,
  `shipping_time` DATETIME NULL,
  `arrive_time`DATETIME NULL,
  `optional`VARCHAR(255) NULL DEFAULT '',
  `created_at` DATETIME NULL,
  `updated_at` DATETIME NULL,
  PRIMARY KEY (`id`));

-- STBDS ==> STB + DS (三+二) ==>strong bettles Dust --
CREATE TABLE `bb_db`.`orders_dust` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `name` VARCHAR(45) NULL DEFAULT '',
  `customer_id` VARCHAR(45) NULL DEFAULT '',
  `order_id` INT NULL DEFAULT 0,
  `place_time` DATETIME NULL,
  `STBDS_8L` INT NULL DEFAULT 0,
  `STBDS_4L` INT NULL DEFAULT 0,
  `STRSD_8L` INT NULL DEFAULT 0,
  `STRSD_4L` INT NULL DEFAULT 0,
  `NYNDS_8L` INT NULL DEFAULT 0,
  `NYNDS_4L` INT NULL DEFAULT 0,
  `BSCSD_12L` INT NULL DEFAULT 0,
  `BSCSD_8L` INT NULL DEFAULT 0,
  `BSCSD_4L` INT NULL DEFAULT 0,
  `BCBDS_8L` INT NULL DEFAULT 0,
  `BCBDS_4L` INT NULL DEFAULT 0,
  `SPWWD_15L` INT NULL DEFAULT 0,
  `SPWWD_13L` INT NULL DEFAULT 0,
  `SPWWD_11L` INT NULL DEFAULT 0,
  `SPWWD_9L` INT NULL DEFAULT 0,
  `SPWWD_7L` INT NULL DEFAULT 0,
  `SPWWD_B7L` INT NULL DEFAULT 0,
  `optional`VARCHAR(255) NULL DEFAULT '',
  `created_at` DATETIME NULL,
  `updated_at` DATETIME NULL,
  PRIMARY KEY (`id`));

CREATE TABLE `bb_db`.`orders_jelly` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `name` VARCHAR(45) NULL DEFAULT '',
  `customer_id` VARCHAR(45) NULL DEFAULT '',
  `place_time` DATETIME NULL,
  `JEL_BOX` INT NULL DEFAULT 0,
  `JEL_SINGLE` INT NULL DEFAULT 0,
  `CUTER` INT NULL DEFAULT 0,
  `CUTHF` INT NULL DEFAULT 0,
  `JELPF_L` INT NULL DEFAULT 0,
  `JELPF_S` INT NULL DEFAULT 0,
  `optional`VARCHAR(255) NULL DEFAULT '',
  `created_at` DATETIME NULL,
  `updated_at` DATETIME NULL,
  PRIMARY KEY (`id`));

CREATE TABLE `bb_db`.`orders_shell` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `name` VARCHAR(45) NULL DEFAULT '',
  `customer_id` VARCHAR(45) NULL DEFAULT '',
  `place_time` DATETIME NULL,
  `SHLBX_XL` INT NULL DEFAULT 0,
  `SHLBX_L` INT NULL DEFAULT 0,
  `SHLBX_M` INT NULL DEFAULT 0,
  `SHLBX_S` INT NULL DEFAULT 0,
  `SMTBX` INT NULL DEFAULT 0,
  `SWDSC_L` INT NULL DEFAULT 0,
  `SWDSC_S` INT NULL DEFAULT 0,
  `optional`VARCHAR(255) NULL DEFAULT '',
  `created_at` DATETIME NULL,
  `updated_at` DATETIME NULL,
  PRIMARY KEY (`id`));

CREATE TABLE `bb_db`.`cashflow` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `type` VARCHAR(45) NULL,
  `InorOut` TINYINT NULL,
  `amont` INT NULL,
  `created_at` DATETIME NULL,
  `updated_at` DATETIME NULL,
  PRIMARY KEY (`id`));


CREATE TABLE `bb_db`.`product_list` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `product_name` VARCHAR(45) NULL    '',
  `serial_number` VARCHAR(45) NULL DEFAULT '',
  `type` VARCHAR(45) NULL DEFAULT '',
  `volume` VARCHAR(45) NULL DEFAULT '',
  `original_price` INT NULL DEFAULT 0,
  `original_cost` INT NULL DEFAULT 0,
  PRIMARY KEY (`id`));
