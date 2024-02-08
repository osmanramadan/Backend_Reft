

CREATE TABLE IF NOT EXISTS user_message (
    
    ID      SERIAL PRIMARY KEY,
    NAME    VARCHAR(255) NOT NULL ,
    PHONE   VARCHAR(255) NOT NULL ,
    EMAIL   VARCHAR(255) NOT NULL ,
    MESSAGE TEXT NOT NULL,
    USER_ID INT NOT NULL,
     
    CONSTRAINT FK_user_message
    FOREIGN KEY (USER_ID)
    REFERENCES users(ID)  -- Use double quotes to specify the case-sensitive table name
    ON DELETE CASCADE
    ON UPDATE CASCADE
);

