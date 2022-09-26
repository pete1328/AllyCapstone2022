'Possible database for prompts'
CREATE TABLE IF NOT EXISTS 'prompts' (
'prompt_id'     int(11)         NOT NULL auto_increment     COMMENT 'the id of the prompt',
'category'      varchar(255)    NOT NULL                    COMMENT 'the category the prompt fits in',
'prompt'        text            NOT NULL                    COMMENT 'the prompt text',
'positivity'    int(11)         NOT NULL                    COMMENT 'positivity score',
'usage'         int(11)         NULL                        COMMENT 'increment number every time it is used to determine how much its used',
PRIMARY KEY ('prompt_id')
) ENGINE=InnoDB AUTO_INCREMENT=1 DEFAULT CHARSET=utf8mb4 COMMENT="Database of prompts for the Gratitude Wizard";