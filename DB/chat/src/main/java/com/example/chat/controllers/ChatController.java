package com.example.chat.controllers;

import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RequestPart;
import org.springframework.web.bind.annotation.RestController;
import com.example.chat.models.GroupChat;
import com.example.chat.models.GroupUser;
import com.example.chat.models.Message;
import com.example.chat.models.UserClass;
import com.example.chat.services.GroupChatService;
import com.example.chat.services.GroupUserService;
import com.example.chat.services.MessageService;
import com.example.chat.services.UserService;
import com.fasterxml.jackson.databind.JsonNode;
import java.util.stream.Stream;

@RestController
@CrossOrigin(origins = { "http://localhost:3000" }, allowedHeaders = "*")
public class ChatController {

    private UserClass currentUser;

    PasswordEncoder encoder = new BCryptPasswordEncoder();

    @Autowired
    MessageService messageService;

    @Autowired
    UserService userService;

    @Autowired
    GroupChatService groupChatService;

    @Autowired
    GroupUserService groupUserService;

    // Handles the authentication from front-end and checks password against DB
    @PostMapping("/login")
    public ResponseEntity<?> userLogin(@RequestPart String username, @RequestPart String password) {
        UserClass user = userService.findUserByUserName(username);
        if (user != null) {
            if (encoder.matches(password, user.getPassword())) {
                this.currentUser = user;
                return new ResponseEntity<>(currentUser.getUsername(), HttpStatus.OK);
            } else {
                return new ResponseEntity<>("Incorrect Credentials", HttpStatus.PRECONDITION_FAILED);
            }
        } else {
            return new ResponseEntity<>("User Not Found", HttpStatus.NOT_FOUND);
        }
    }

    // Retrieves the messages for a specific group when click on the front-end
    @GetMapping("/messages/group")
    public ResponseEntity<List<Message>> getMessagesFromGroup(@RequestParam int id) {
        try {
            GroupChat groupChat = groupChatService.findById(id);
            return new ResponseEntity<List<Message>>(messageService.findMessagesByGroupChat(groupChat), HttpStatus.OK);
        } catch (Exception e) {
            return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
        }
    }

    // Filters for the last message sent to each group for the current user
    @GetMapping("/lastmessage/group")
    public ResponseEntity<List<Message>> getLastMessage() {

        try {

            List<GroupUser> userGroups = groupUserService.findGroupChatByUser(currentUser);
            ArrayList<Message> lastMessages = new ArrayList<Message>();

            userGroups.forEach(group -> {
                lastMessages.addAll(messageService.findAll().stream()
                        .filter(message -> message.getGroupChat().getId() == group.getGroupChat().getId())
                        .max((o1, o2) -> o1.getId() - o2.getId()).map(Stream::of).orElseGet(Stream::empty)
                        .collect(Collectors.toList()));
            });

            return new ResponseEntity<List<Message>>(lastMessages, HttpStatus.OK);

        } catch (Exception e) {
            return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
        }
    }

    // Receives a message from the front-end and saves it to the database
    @PostMapping("/message/send")
    public ResponseEntity<Message> sendMessage(@RequestBody Message message) {
        message.setUser(currentUser);
        try {
            messageService.save(new Message(message.getMessageBody(), message.getUser(), message.getGroupChat()));
            return new ResponseEntity<Message>(message, HttpStatus.CREATED);
        } catch (Exception e) {
            return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
        }
    }

    // Gets all group chats that the specified user is a part of
    @GetMapping("/groupusers")
    public ResponseEntity<List<GroupUser>> getGroupUsers() {
        try {
            return new ResponseEntity<List<GroupUser>>(groupUserService.findGroupChatByUser(currentUser),
                    HttpStatus.OK);
        } catch (Exception e) {
            return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
        }
    }

    // JSON object consist of {groupName, users}
    // groupName is a string
    // users is an array of strings containing user emails
    // Creates a new GroupChat and creates new GroupUser objects to relate each user
    // to the GroupChat
    @PostMapping("/groupchat/new")
    public ResponseEntity<List<GroupUser>> addGroups(@RequestBody JsonNode groupObject) {
        try {

            GroupChat newGroupChat = groupChatService.save(new GroupChat(groupObject.get("groupName").asText()));
            groupObject.get("users").forEach(
                    x -> groupUserService
                            .save(new GroupUser(userService.findUserByUserName(x.asText()), newGroupChat)));

            return new ResponseEntity<List<GroupUser>>(groupUserService.findGroupChatByUser(
                    currentUser), HttpStatus.CREATED);
        } catch (Exception e) {
            return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
        }
    }

    // Gets all users and filters out current user
    @GetMapping("/users")
    public ResponseEntity<List<UserClass>> getUsers() {

        try {
            List<UserClass> users = userService.findAll().stream()
                    .filter(user -> !user.getEmail().equals(currentUser.getEmail()))
                    .collect(Collectors.toList());
            return new ResponseEntity<List<UserClass>>(users, HttpStatus.OK);
        } catch (Exception e) {
            return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
        }

    }
}
