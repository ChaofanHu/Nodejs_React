CREATE DATABASE my_blog;
USE my_blog;

drop table if exists tb_user;

CREATE TABLE tb_user(
    id INT PRIMARY KEY AUTO_INCREMENT,
    username VARCHAR(45) NOT NULL,
    email VARCHAR(255) NOT NULL,
    password VARCHAR(256) NOT NULL,
    img VARCHAR(255)
); 

DROP TABLE IF EXISTS tb_posts;

CREATE TABLE tb_posts(
    id INT PRIMARY KEY AUTO_INCREMENT,
    title VARCHAR(255) NOT NULL,
    description VARCHAR(255) NOT NULL,
    img VARCHAR(255),
    user_id INT NOT NULL,
    FOREIGN KEY (user_id) REFERENCES tb_user(id)
);

ALTER TABLE tb_posts ADD COLUMN date DATE;
ALTER TABLE tb_posts ADD COLUMN cat VARCHAR(55);
