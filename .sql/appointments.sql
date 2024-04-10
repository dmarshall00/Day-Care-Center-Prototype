CREATE TABLE Appointment (
    -- AppointmentID int NOT NULL,
    ChildID int NOT NULL,
    FacultyID int NOT NULL,
    AppointmentDate varchar(10),
    LocationID int NOT NULL,

    PRIMARY KEY (FacultyID, ChildID),
    FOREIGN KEY (FacultyID) REFERENCES FacultyInfo(FacultyID),
    FOREIGN KEY (ChildID) REFERENCES ChildInfo(ChildID),
    FOREIGN KEY (LocationID) REFERENCES Location(LocationID)
);