CREATE SCHEMA IF NOT EXISTS `pocketpay` ;
USE `pocketpay` ;

CREATE TABLE `bank_master`
(
 `id`       int NOT NULL ,
 `name`     varchar(120) NOT NULL ,
 `logo_src` varchar(120) NOT NULL ,

PRIMARY KEY (`id`)
);
CREATE TABLE `business_category_master`
(
 `id`          int NOT NULL ,
 `name`        varchar(120) NOT NULL ,
 `parent`      int NOT NULL ,
 `description` text NOT NULL ,

PRIMARY KEY (`id`)
);

CREATE TABLE `business`
(
 `id`               int NOT NULL ,
 `name`             varchar(120) NOT NULL ,
 `registration_num` varchar(120) NOT NULL ,
 `reg_address`      mediumtext NOT NULL ,
 `subcategory_id`   int NOT NULL ,
 `business_size`    enum('1-50,50-100,100-1000') NOT NULL ,
 `created_by`       int NOT NULL ,
 `modified_by`      int NOT NULL ,
 `created_on`       datetime NOT NULL ,
 `modified_on`      datetime NOT NULL ,
 `category_id`      int NOT NULL ,

PRIMARY KEY (`id`),
KEY `FK_1` (`category_id`),
CONSTRAINT `FK_10` FOREIGN KEY `FK_1` (`category_id`) REFERENCES `business_category_master` (`id`)
);

CREATE TABLE `country_master`
(
 `id`       int NOT NULL ,
 `name`     varchar(45) NOT NULL ,
 `flag_src` varchar(120) NOT NULL ,

PRIMARY KEY (`id`)
);


CREATE TABLE `currency_master`
(
 `id`            int NOT NULL ,
 `currency_code` varchar(45) NOT NULL ,
 `country_id`    int NOT NULL ,

PRIMARY KEY (`id`),
KEY `FK_1` (`country_id`),
CONSTRAINT `FK_6` FOREIGN KEY `FK_1` (`country_id`) REFERENCES `country_master` (`id`)
);

CREATE TABLE `pocketpay_purpose_master`
(
 `id`      int NOT NULL ,
 `purpose` text NOT NULL ,

PRIMARY KEY (`id`)
);

CREATE TABLE `recipient`
(
 `id`             int NOT NULL ,
 `email`          varchar(120) NOT NULL ,
 `first_name`     varchar(120) NOT NULL ,
 `last_name`      varchar(120) NOT NULL ,
 `account_number` varchar(120) NOT NULL ,
 `ifsc`           varchar(45) NOT NULL ,

PRIMARY KEY (`id`)
);

CREATE TABLE `trading_address`
(
 `id`          int NOT NULL ,
 `address`     mediumtext NOT NULL ,
 `business_id` int NOT NULL ,
 `created_at`  datetime NOT NULL ,
 `modified_at` datetime NOT NULL ,
 `created_by`  int NOT NULL ,
 `modified_by` int NOT NULL ,

PRIMARY KEY (`id`),
KEY `FK_1` (`business_id`),
CONSTRAINT `FK_2` FOREIGN KEY `FK_1` (`business_id`) REFERENCES `business` (`id`)
);


CREATE TABLE `user`
(
 `id`                int NOT NULL ,
 `email`             varchar(120) NOT NULL ,
 `password`          varchar(120) NOT NULL ,
 `first_name`        varchar(120) NOT NULL ,
 `last_name`         varchar(120) NOT NULL ,
 `dob`               date NOT NULL ,
 `home_address`      mediumtext NOT NULL ,
 `registration_type` enum('regular,google') NOT NULL ,
 `account_type`      enum('personal,business') NOT NULL ,
 `phone`             varchar(45) NOT NULL ,
 `verification_code` varchar(45) NOT NULL ,
 `valid_till_in_sec` int NOT NULL ,
 `business_id`       int NOT NULL ,
 `country_id`        int NOT NULL ,

PRIMARY KEY (`id`),
KEY `FK_1` (`business_id`),
CONSTRAINT `FK_1` FOREIGN KEY `FK_1` (`business_id`) REFERENCES `business` (`id`),
KEY `FK_2` (`country_id`),
CONSTRAINT `FK_5` FOREIGN KEY `FK_2` (`country_id`) REFERENCES `country_master` (`id`)
);

CREATE TABLE `transaction`
(
 `id`               int NOT NULL ,
 `from_currency`    varchar(45) NOT NULL ,
 `to_currency`      varchar(45) NOT NULL ,
 `amount`           double NOT NULL ,
 `converted_amount` double NOT NULL ,
 `sender_id`        int NOT NULL ,
 `recipient_id`     int NOT NULL ,
 `purpose`          text NOT NULL ,
 `transaction_date` datetime NOT NULL ,
 `pay_with`         enum('bank_transfer,credit_card,debit_card') NOT NULL ,
 `sending_to`       enum('business,business_or_charity,others') NOT NULL ,
 `transaction_fee`  double NOT NULL ,
 `card_number`      varchar(45) NOT NULL ,
 `bank_id`          int NOT NULL ,
 `status`           enum('pending,cancelled,success') NOT NULL ,

PRIMARY KEY (`id`),
KEY `FK_1` (`sender_id`),
CONSTRAINT `FK_7` FOREIGN KEY `FK_1` (`sender_id`) REFERENCES `user` (`id`),
KEY `FK_2` (`recipient_id`),
CONSTRAINT `FK_8` FOREIGN KEY `FK_2` (`recipient_id`) REFERENCES `recipient` (`id`),
KEY `FK_3` (`bank_id`),
CONSTRAINT `FK_9` FOREIGN KEY `FK_3` (`bank_id`) REFERENCES `bank_master` (`id`)
);

CREATE TABLE `payment_tracker`
(
 `id`             int NOT NULL ,
 `transaction_id` int NOT NULL ,
 `track_time`     datetime NOT NULL ,
 `track_info`     text NOT NULL ,

PRIMARY KEY (`id`),
KEY `FK_1` (`transaction_id`),
CONSTRAINT `FK_12` FOREIGN KEY `FK_1` (`transaction_id`) REFERENCES `transaction` (`id`)
);

CREATE TABLE `business_owner`
(
 `id`             int NOT NULL ,
 `first_name`     varchar(120) NOT NULL ,
 `last_name`      varchar(120) NOT NULL ,
 `dob`            date NOT NULL ,
 `role`           enum('director','shareholder') NOT NULL ,
 `transaction_id` int NOT NULL ,
 `country_id`     int NOT NULL ,
 `created_at`     datetime NOT NULL ,
 `modified_at`    datetime NOT NULL ,
 `created_by`     int NOT NULL ,
 `modified_by`    int NOT NULL ,

PRIMARY KEY (`id`),
KEY `FK_1` (`transaction_id`),
CONSTRAINT `FK_3` FOREIGN KEY `FK_1` (`transaction_id`) REFERENCES `transaction` (`id`),
KEY `FK_2` (`country_id`),
CONSTRAINT `FK_4` FOREIGN KEY `FK_2` (`country_id`) REFERENCES `country_master` (`id`)
);