CREATE TABLE ParentInfo (
    ParentID int NOT NULL UNIQUE AUTO_INCREMENT,
    LastName varchar(50) NOT NULL,
    FirstName varchar(50) NOT NULL,
    PhoneNumber varchar(12) NOT NULL,
    Email varchar(60) NOT NULL,
    ParentAddress varchar(255),

    PRIMARY KEY (ParentID)
);