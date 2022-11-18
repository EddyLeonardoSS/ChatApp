DROP DATABASE IF EXISTS chatapp
CREATE DATABASE chatapp

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
