CREATE TABLE ChildInfo (
    ChildID int NOT NULL AUTO_INCREMENT,
    ParentID int NOT NULL UNIQUE,
    LastName varchar(50) NOT NULL,
    FirstName varchar(50) NOT NULL,
    Age int NOT NULL,
    Medication varchar(255),

    PRIMARY KEY (ChildID),
    FOREIGN KEY (ParentID) REFERENCES ParentInfo(ParentID)
);