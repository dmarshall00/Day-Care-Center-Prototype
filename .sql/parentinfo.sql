CREATE TABLE ParentInfo (
    ParentID int NOT NULL UNIQUE AUTO_INCREMENT,
    LastName varchar(50),
    FirstName varchar(50),
    PhoneNumber varchar(12),
    Email varchar(60),
    ParentAddress varchar(255),

    PRIMARY KEY (ParentID)
);