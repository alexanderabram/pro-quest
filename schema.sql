DROP DATABASE IF EXISTS missions;
CREATE DATABASE missions;

USE missions;

CREATE TABLE missions (
    id INT AUTO_INCREMENT NOT NULL,
    name VARCHAR(50) NOT NULL,
    description VARCHAR(300) NOT NULL,
    owners VARCHAR(50) NOT NULL,
    status BOOLEAN NOT NULL,
    createdAt DATETIME NOT NULL,
    due VARCHAR(25) NOT NULL,
    PRIMARY KEY (id)
);

CREATE TABLE quests (
    id INT AUTO_INCREMENT NOT NULL,
    name VARCHAR(50) NOT NULL,
    description VARCHAR(300) NOT NULL,
    owners VARCHAR(50) NOT NULL,
    status BOOLEAN NOT NULL,
    createdAt DATE NOT NULL,
    due VARCHAR(25) NOT NULL,
    PRIMARY KEY (id)
);