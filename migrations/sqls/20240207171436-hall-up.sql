
CREATE TABLE IF NOT EXISTS hall (
    ID                    SERIAL PRIMARY KEY,
    NAME                  VARCHAR(255) NOT NULL,
    CAPACITY              VARCHAR(255) NOT NULL,
    CITY                  VARCHAR(255) NOT NULL,
    LOCATION              VARCHAR(255) NOT NULL,
    DETAILS               TEXT NOT NULL,
    IMAGES                VARCHAR(2000)[] NOT NULL,  -- Use VARCHAR(2000)[] for array of VARCHAR(2000)
    COVER_IMAGE           VARCHAR(500) NOT NULL,
    PDF                   VARCHAR(500) NOT NULL,
    VIDEO                 VARCHAR(500) NOT NULL,
    USER_ID               INT NOT NULL,

    CONSTRAINT FK_hall_user
    FOREIGN KEY (USER_ID)
    REFERENCES users(ID)  -- Use double quotes to specify the case-sensitive table name
    ON DELETE CASCADE
    ON UPDATE CASCADE
);
