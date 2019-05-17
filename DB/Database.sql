-- CREATE DATABASE Resource_backend
IF EXISTS(SELECT 1 FROM sys.tables WHERE object_id = OBJECT_ID('Value'))
BEGIN;
    DROP TABLE [Value];
END;
GO

IF EXISTS(SELECT 1 FROM sys.tables WHERE object_id = OBJECT_ID('Feature'))
BEGIN;
    DROP TABLE [Feature];
END;
GO

IF EXISTS(SELECT 1 FROM sys.tables WHERE object_id = OBJECT_ID('Resource'))
BEGIN;
    DROP TABLE [Resource];
END;
GO

USE Resource_backend
IF EXISTS(SELECT 1 FROM sys.tables WHERE object_id = OBJECT_ID('Project'))
BEGIN;
    DROP TABLE [Project];
END;
GO

CREATE TABLE [Project] (
    [id] INTEGER NOT NULL IDENTITY(1, 1),
    [name] VARCHAR(100) NULL,
    PRIMARY KEY ([id])
);
GO

INSERT INTO Project([name]) VALUES('Slovakia'),('Egypt'),('Angola'),('Nigeria'),('Martinique'),('El Salvador'),('Serbia'),('Côte D''Ivoire (Ivory Coast)'),('China'),('Brunei');

-- IF EXISTS(SELECT 1 FROM sys.tables WHERE object_id = OBJECT_ID('Resource'))
-- BEGIN;
--     DROP TABLE [Resource];
-- END;
-- GO

CREATE TABLE [Resource] (
    [id] INTEGER NOT NULL IDENTITY(1, 1),
    [code] INTEGER NULL,
    [name] VARCHAR(50) NULL,
    [project_id] INTEGER NULL,
    PRIMARY KEY ([id]),
    FOREIGN KEY (project_id) REFERENCES Project(id)
);
GO

INSERT INTO Resource([code],[name],[project_id]) VALUES(101,'QLD',1),(102,'NSW',1),(103,'ON',1),(104,'Mississippi',1),(105,'Kano',1),(106,'BE',1),(107,'Bahia',1),(108,'NU',1),(109,'Guanacaste',1),(110,'Nord-Pas-de-Calais',1);
INSERT INTO Resource([code],[name],[project_id]) VALUES(111,'MT',2),(112,'ON',2),(113,'AN',2),(114,'Vlaams-Brabant',2),(115,'Leinster',2),(116,'Ontario',2),(117,'WB',2),(118,'OV',2),(119,'Bremen',2),(120,'Illes Balears',2);
INSERT INTO Resource([code],[name],[project_id]) VALUES(121,'Rio Grande do Sul',3),(122,'São Paulo',3),(123,'IX',3),(124,'Alajuela',3),(125,'Warwickshire',3),(126,'Antofagasta',3),(127,'BC',3),(128,'PE',3),(129,'Piemonte',3),(130,'British Columbia',3);
INSERT INTO Resource([code],[name],[project_id]) VALUES(131,'Toscana',4),(132,'L',4),(133,'Vlaams-Brabant',4),(134,'SA',4),(135,'Berlin',4),(136,'NI',4),(137,'MA',4),(138,'Anambra',4),(139,'Ontario',4),(140,'AK',4);
INSERT INTO Resource([code],[name],[project_id]) VALUES(141,'Oost-Vlaanderen',5),(142,'LA',5),(143,'Pomorskie',5),(144,'VII',5),(145,'HE',5),(146,'JH',5),(147,'Alaska',5),(148,'Lubuskie',5),(149,'Gl',5),(150,'Noord Holland',5);
INSERT INTO Resource([code],[name],[project_id]) VALUES(151,'AB',6),(152,'PIE',6),(153,'Ank',6),(154,'North Island',6),(155,'Puglia',6),(156,'Buckinghamshire',6),(157,'Quebec',6),(158,'VII',6),(159,'CA',6),(160,'Leinster',6);

-- IF EXISTS(SELECT 1 FROM sys.tables WHERE object_id = OBJECT_ID('Feature'))
-- BEGIN;
--     DROP TABLE [Feature];
-- END;
-- GO

CREATE TABLE [Feature] (
    [id] INTEGER NOT NULL IDENTITY(1, 1),
    [name] VARCHAR(255) NULL,
    [type] VARCHAR(255) NULL,
    [content] VARCHAR(MAX) NULL,
    [project_id] INTEGER NULL,
    PRIMARY KEY ([id]),
    FOREIGN KEY (project_id) REFERENCES Project(id)
);
GO

INSERT INTO Feature([name],[type],[content],[project_id]) VALUES('Bangor','Text','metus',1),('Manavgat','Text','erat.',1),('Porvenir','Text','Nam',1),('Tokoroa','Text','fringilla',1),('Ruette','Text','egestas',1),('Medicine Hat','Text','et',1),('Canterano','Text','augue',1),('Lake Cowichan','Text','ut',1),('Burlington','Text','vitae',1),('Lunel','Text','adipiscing',1);
INSERT INTO Feature([name],[type],[content],[project_id]) VALUES('Monte Patria','Number','consectetuer',2),('Wanzele','Number','Sed',2),('Worcester','Number','eget,',2),('Portsmouth','Number','nunc.',2),('Nandyal','Number','nec',2),('Cochrane','Number','Cras',2),('Burin','Number','Donec',2),('Chicago','Number','lorem,',2),('Southampton','Number','velit.',2),('Bhopal','Number','est.',2);
INSERT INTO Feature([name],[type],[content],[project_id]) VALUES('Smithers','Formula','metus.',3),('San Pietro al Tanagro','Formula','et',3),('Erie','Formula','urna.',3),('Tomaszów Mazowiecki','Formula','sociis',3),('Morinville','Formula','sem,',3),('Milton Keynes','Formula','vel',3),('Retie','Formula','Sed',3),('Buin','Formula','elit',3),('Hamme-Mille','Formula','elit,',3),('Moxhe','Formula','imperdiet',3);


-- IF EXISTS(SELECT 1 FROM sys.tables WHERE object_id = OBJECT_ID('Value'))
-- BEGIN;
--     DROP TABLE [Value];
-- END;
-- GO

CREATE TABLE [Value] (
    [id] INTEGER NOT NULL IDENTITY(1, 1),
    [value] VARCHAR(MAX) NULL,
    [project_id] INTEGER NULL,
    [resource_id] INTEGER NULL,
    [feature_id] INTEGER NULL,
    PRIMARY KEY ([id]),
    FOREIGN KEY (project_id) REFERENCES Project(id),
    FOREIGN KEY (resource_id) REFERENCES Resource(id),
    FOREIGN KEY (feature_id) REFERENCES Feature(id)
);
GO

INSERT INTO Value([value],[project_id],[resource_id],[feature_id]) VALUES('293',1,1,1),('625',1,1,2),('779',1,1,3),('622',1,1,4),('860',1,1,5),('413',1,1,6),('841',1,1,7),('603',1,1,8),('546',1,1,9),('290',1,1,10);
INSERT INTO Value([value],[project_id],[resource_id],[feature_id]) VALUES('319',1,2,1),('569',1,2,2),('831',1,2,3),('404',1,2,4),('563',1,2,5),('501',1,2,6),('979',1,2,7),('494',1,2,8),('194',1,2,9),('906',1,2,10);
INSERT INTO Value([value],[project_id],[resource_id],[feature_id]) VALUES('768',1,3,1),('377',1,3,2),('189',1,3,3),('667',1,3,4),('324',1,3,5),('126',1,3,6),('729',1,3,7),('272',1,3,8),('312',1,3,9),('82',1,3,10);
INSERT INTO Value([value],[project_id],[resource_id],[feature_id]) VALUES('207',2,3,1),('351',2,3,2),('365',2,3,3),('435',2,3,4),('639',2,3,5),('711',2,3,6),('951',2,3,7),('330',2,3,8),('324',2,3,9),('56',2,3,10);
INSERT INTO Value([value],[project_id],[resource_id],[feature_id]) VALUES('997',2,2,1),('339',2,2,2),('732',2,2,3),('119',2,2,4),('301',2,2,5),('174',2,2,6),('213',2,2,7),('638',2,2,8),('777',2,2,9),('423',2,2,10);
INSERT INTO Value([value],[project_id],[resource_id],[feature_id]) VALUES('489',2,1,1),('973',2,1,2),('653',2,1,3),('929',2,1,4),('416',2,1,5),('376',2,1,6),('971',2,1,7),('152',2,1,8),('171',2,1,9),('191',2,1,10);
INSERT INTO Value([value],[project_id],[resource_id],[feature_id]) VALUES('938',3,1,1),('445',3,1,2),('519',3,1,3),('768',3,1,4),('424',3,1,5),('923',3,1,6),('270',3,1,7),('362',3,1,8),('710',3,1,9),('284',3,1,10);
INSERT INTO Value([value],[project_id],[resource_id],[feature_id]) VALUES('185',3,2,1),('989',3,2,2),('194',3,2,3),('968',3,2,4),('364',3,2,5),('188',3,2,6),('169',3,2,7),('876',3,2,8),('615',3,2,9),('949',3,2,10);
INSERT INTO Value([value],[project_id],[resource_id],[feature_id]) VALUES('864',3,3,1),('915',3,3,2),('798',3,3,3),('798',3,3,4),('290',3,3,5),('841',3,3,6),('449',3,3,7),('596',3,3,8),('371',3,3,9),('64',3,3,10);


IF EXISTS(SELECT 1 FROM sys.tables WHERE object_id = OBJECT_ID('Users'))
BEGIN;
    DROP TABLE [Users];
END;
GO

CREATE TABLE [Users] (
    [Id] INTEGER NOT NULL IDENTITY(1, 1),
    [Firstname] VARCHAR(255) NULL,
    [Lastname] VARCHAR(255) NULL,
    [Email] VARCHAR(255) NULL,
    [Password] VARCHAR(255) NULL,
    [Roles] VARCHAR(255) NULL,
    PRIMARY KEY ([Id])
);
GO

INSERT INTO Users([Firstname],[Lastname],[Email],[Password],[Roles]) VALUES('Stephen','Rowan','hendrerit@leo.org','admin','USER');
-- INSERT INTO Users([Firstname],[Lastname],[Email],[Password],[Roles]) VALUES('Raja','Camilla','egestas.Aliquam@tristiquesenectus.org','admin','USER'),('Alfonso','Jamalia','velit.eget.laoreet@duiaugueeu.ca','admin','USER'),('Kevyn','Jasper','pharetra.nibh.Aliquam@consequatpurusMaecenas.com','admin','USER'),('Marvin','Leonard','ligula.Aenean.gravida@ipsumprimis.org','admin','USER'),('Cain','Salvador','enim.Etiam.gravida@Sedeu.ca','admin','USER'),('Kamal','Daria','convallis.convallis.dolor@adipiscing.ca','admin','USER'),('Keaton','Felix','et.eros.Proin@nibhAliquamornare.net','admin','USER'),('Camille','Sharon','at@eu.net','admin','USER'),('Ulric','Harrison','Nulla@sitametorci.net','admin','USER');