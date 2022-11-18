INSERT INTO users
VALUES ('user1', 'user1@gmail.com', '$2a$10$2zQOFQDm5ZgRxk9B.AtIsevLICAwCfH8.l9JDAmLMkqqeV9e5aX/2');

INSERT INTO users
VALUES ('user2', 'user2@gmail.com', '$2y$10$qcOKxmU38noN/tLB5kUnhO1F9by2lkYm.6yjVKTWIM1rgfQiz5dOe');

INSERT INTO users
VALUES ('user3', 'user3@gmail.com', '$2y$10$t1G9cxDfMvoOjUV.ewxMoessUQglLhMWm.go3QtpPEQOlhRMgCuOy');

INSERT INTO group_chat
VALUES ( 'user1 and user2') ;

INSERT INTO group_chat
VALUES ('user1 and user3') ; 

INSERT INTO messages
VALUES ('Hello', 1, 1, CURRENT_TIMESTAMP );

INSERT INTO messages
VALUES ('Hi, how are you', 2, 1, CURRENT_TIMESTAMP ) ;  


INSERT INTO group_users
VALUES ( 1, 1) ; 

INSERT INTO group_users
VALUES ( 2, 1) ; 

INSERT INTO group_users
VALUES ( 1, 2)  ;

INSERT INTO group_users
VALUES ( 3, 2)  ;