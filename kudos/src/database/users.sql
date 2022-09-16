CREATE TABLE IF NOT EXISTS 'users' (
'user_id'       int(11)         NOT NULL auto_increment     COMMENT 'the id of the user',
'username'      varchar(255)    NOT NULL                    COMMENT 'the username for log in',
'password'      varchar(255)    NOT NULL                    COMMENT 'the password for log in',
'first_name'    varchar(255)    NOT NULL                    COMMENT 'the first name of the user',
'last_name'     varchar(255)    NOT NULL                    COMMENT 'the last name of the user',
'position'      varchar(255)    NOT NULL                    COMMENT 'the work position the user has',
'reports_to'    int(11)         NULL                        COMMENT 'the id of the user this user reports to; null if above hierarchy',
PRIMARY KEY ('user_id')
) ENGINE=InnoDB AUTO_INCREMENT=1 DEFAULT CHARSET=utf8mb4 COMMENT="Contains user information";