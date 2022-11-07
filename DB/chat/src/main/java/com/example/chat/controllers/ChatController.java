package com.example.chat.controllers;

import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;
import com.example.chat.models.GroupChat;
import com.example.chat.models.GroupUser;
import com.example.chat.models.Message;
import com.example.chat.models.User;
import com.example.chat.services.GroupChatService;
import com.example.chat.services.GroupUserService;
import com.example.chat.services.MessageService;
import com.example.chat.services.UserService;

@RestController
public class ChatController {

    @Autowired
    MessageService messageService;

    @Autowired
    UserService userService;

    @Autowired
    GroupChatService groupChatService;

    @Autowired
    GroupUserService groupUserService;
    
    @GetMapping("/messages")
    public ResponseEntity<List<Message>> getMessages(){
        
        return new ResponseEntity<List<Message>>(messageService.findAll(), HttpStatus.OK);
    }

    @GetMapping("/groups")
    public ResponseEntity<List<GroupChat>> getGroupChats(){
        
        return new ResponseEntity<List<GroupChat>>(groupChatService.findAll(), HttpStatus.OK);
    }
    @GetMapping("/groupusers")
    public ResponseEntity<List<GroupUser>> getGroupUsers(){
        
        return new ResponseEntity<List<GroupUser>>(groupUserService.findAll(), HttpStatus.OK);
    }
    @GetMapping("/users")
    public ResponseEntity<List<User>> getUsers(){
        
        return new ResponseEntity<List<User>>(userService.findAll(), HttpStatus.OK);
    }

}
