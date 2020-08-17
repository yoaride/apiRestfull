CREATE DATABASE IF NOT EXISTS datapersons;

USE datapersons;

CREATE TABLE persons (
id INT(11) NOT NULL AUTO_INCREMENT,
fullname TEXT DEFAULT NULL,
birth DATE DEFAULT NULL,
mother TEXT DEFAULT NULL,
father TEXT DEFAULT NULL,
children TEXT DEFAULT NULL,
PRIMARY KEY(id)
);

DESCRIBE persons;

insert into persons values
	(1,'Pedro Gaviria','1881-05-29',null,null,'Carlos Gaviria - Helena Gaviria'),
    (2,'Maria Rodriguez','1884-08-08',null,null,'Carlos Gaviria - Helena Gaviria'),
    (3,'Helena Gaviria','1999-04-14','Pedro Gaviria','Maria Rodriguez','Carlos Gaviria'),
    (4,'Carlos Gaviria','2004-11-27','Pedro Gaviria','Maria Rodriguez','Helena Gaviria');

select * from persons;