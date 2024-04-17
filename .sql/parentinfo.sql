CREATE TABLE ParentInfo (
    ParentID int NOT NULL UNIQUE AUTO_INCREMENT,
    UserName varchar(50) NOT NULL,
    Password varchar(50) NOT NULL,
    LastName varchar(50),
    FirstName varchar(50),
    PhoneNumber varchar(12),
    Email varchar(60) NOT NULL,
    ParentAddress varchar(255),

    PRIMARY KEY (ParentID)
);