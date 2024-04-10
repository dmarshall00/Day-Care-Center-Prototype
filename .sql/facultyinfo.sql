CREATE TABLE FacultyInfo (
    FacultyID int NOT NULL AUTO_INCREMENT,
    LastName varchar(50),
    FirstName varchar(50),
    PhoneNumber varchar(12),
    Email varchar(60),
    DepartmentID int,

    PRIMARY KEY (FacultyID),
    FOREIGN KEY (DepartmentID) REFERENCES Departments(DepartmentID)
);