CREATE DATABASE moviesdb;

USE moviesdb;

CREATE TABLE movies (
    imdbID VARCHAR(20) PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    year VARCHAR(100) NOT NULL,
    rating DECIMAL(3,1),
    liked BOOLEAN DEFAULT 0,
    poster VARCHAR(255)
);
