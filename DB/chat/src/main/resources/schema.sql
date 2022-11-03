CREATE TABLE messages(
	id INT AUTO_INCREMENT PRIMARY KEY,
	message VARCHAR(2000) NOT NULL
)

INSERT INTO messages (message)
VALUES("Test message")     