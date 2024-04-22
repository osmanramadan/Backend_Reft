CREATE TABLE IF NOT EXISTS hall_book (

    ID           SERIAL PRIMARY KEY,
    USER_ID      INT NOT NULL,
    HALL_USER_ID INT NOT NULL,
    HALL_ID      INT NOT NULL,
    IS_INTERVAL  boolean NOT NULL,
    DATE_FROM    DATE DEFAULT NULL,
    DATE_TO      DATE DEFAULT NULL,
    DATE         DATE DEFAULT CURRENT_DATE,
    DAY          INT NOT NULL,
    MONTH        INT NOT NULL,
    YEAR         INT NOT NULL,
    HOUR         INT NOT NULL,
    CODE         VARCHAR(255) NOT NULL,

    
    CONSTRAINT FK_user_hall_book
        FOREIGN KEY (USER_ID)
        REFERENCES users(ID)
        ON DELETE CASCADE
        ON UPDATE CASCADE,
        
    CONSTRAINT FK_userhall_hall_book
        FOREIGN KEY (HALL_USER_ID)
        REFERENCES users(ID)  
        ON DELETE CASCADE
        ON UPDATE CASCADE,
        
    CONSTRAINT FK_hall_id_book
        FOREIGN KEY (HALL_ID)
        REFERENCES hall(ID)  
        ON DELETE CASCADE
        ON UPDATE CASCADE
);