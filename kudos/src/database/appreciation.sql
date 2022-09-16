CREATE TABLE IF NOT EXISTS 'appreciations' (
'appreciation_id'   int(11)         NOT NULL auto_increment     COMMENT 'the id for the created message',
'user_id'           int(11)         NOT NULL                    COMMENT 'the id of the user who was sent a kudos',
'user_recieve_id'   int(11)         NOT NULL                    COMMENT 'the id of the user who recieved the kudos from the above sender',
'kudos_points'      int(11)         NOT NULL                    COMMENT 'the amount of kudos points sent',
'date'              datetime        NOT NULL                    COMMENT 'the date and time the kudos was sent',
'image'             varchar(2048)   NULL                        COMMENT 'url of the attatched image',
'message'           text            NOT NULL                    COMMENT 'sent message',
PRIMARY KEY ('appreciation_id'),
FOREIGN KEY (user_id) REFERENCES users(user_id)
) ENGINE=InnoDB AUTO_INCREMENT=1 DEFAULT CHARSET=utf8mb4 COMMENT="Contains information of the appreciation sent";