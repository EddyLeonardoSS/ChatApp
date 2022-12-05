DROP DATABASE IF EXISTS chatapp;
CREATE DATABASE chatapp;
use chatapp;
CREATE TABLE users(
	id INT AUTO_INCREMENT PRIMARY KEY,
	username VARCHAR(100) NOT NULL,
	email VARCHAR(100) NOT NULL,
	password VARCHAR(100) NOT NULL
);
CREATE TABLE group_chat(
	id INT AUTO_INCREMENT PRIMARY KEY,
	group_name VARCHAR(100)
);


CREATE TABLE messages(
	id INT AUTO_INCREMENT PRIMARY KEY,
	message_body VARCHAR(2000) NOT NULL,
	parent_user_id INT,
	group_id INT,
	date_sent DATE,
	FOREIGN KEY (parent_user_id) REFERENCES users(id),
	FOREIGN KEY (group_id) REFERENCES group_chat(id)
);


CREATE TABLE group_users(
	id INT AUTO_INCREMENT PRIMARY KEY,
	user_id INT NOT NULL,
	group_id INT NOT NULL,
	FOREIGN KEY (user_id) REFERENCES users(id),
	FOREIGN KEY (group_id) REFERENCES group_chat(id)
);

INSERT INTO users
VALUES (1, "user1", "user1@gmail.com", '$2a$10$2zQOFQDm5ZgRxk9B.AtIsevLICAwCfH8.l9JDAmLMkqqeV9e5aX/2');

INSERT INTO users
VALUES (2, "user2", "user2@gmail.com", '$2y$10$qcOKxmU38noN/tLB5kUnhO1F9by2lkYm.6yjVKTWIM1rgfQiz5dOe');

INSERT INTO users
VALUES (3, "user3", "user3@gmail.com", '$2y$10$t1G9cxDfMvoOjUV.ewxMoessUQglLhMWm.go3QtpPEQOlhRMgCuOy');

INSERT INTO group_chat
VALUES (1, "user1 and user2") ;

INSERT INTO group_chat
VALUES (2, "user1 and user3") ; 

INSERT INTO messages
VALUES (1, "Hello", 1, 1, CURTIME() );

INSERT INTO messages
VALUES (2, "Hi, how are you", 2, 1, CURTIME() ) ;  


INSERT INTO group_users
VALUES (1, 1, 1) ; 

INSERT INTO group_users
VALUES (2, 2, 1) ; 

INSERT INTO group_users
VALUES (3, 1, 2)  ;

INSERT INTO group_users
VALUES (4, 3, 2)  ;