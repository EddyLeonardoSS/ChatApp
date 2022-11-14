package com.example.chat.controllers;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestParam;
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
@CrossOrigin(value = "*")
public class ChatController {

    @Autowired
    MessageService messageService;

    @Autowired
    UserService userService;

    @Autowired
    GroupChatService groupChatService;

    @Autowired
    GroupUserService groupUserService;
    
   
    // Retrieves the messages for a specific group when click on the front-end
    @GetMapping("/messages/group")
    public ResponseEntity<List<Message>> getMessagesFromGroup(@RequestParam int id ){
        GroupChat groupChat = groupChatService.findById(id);
        return new ResponseEntity<List<Message>>(messageService.findMessagesByGroupChat(groupChat), HttpStatus.OK);
    }

    // Filters for the last message sent to each group for the current user
    @GetMapping("/lastmessage/group")
    public ResponseEntity<List<Message>> getLastMessage(@RequestParam String email){
        User user = userService.findUserByEmail(email);
        List<GroupUser> userGroups = groupUserService.findGroupChatByUser(user);
        List<Message> messages = messageService.findAll();

        ArrayList<Message> lastMessages = new ArrayList<Message>();

        userGroups.forEach(group -> {
          lastMessages.addAll( messages.stream().filter(message -> message.getGroupChat().getId() == group.getGroupChat().getId())
                                .max((o1, o2) -> o1.getId() - o2.getId()).stream().collect(Collectors.toList())) ;
        });
        return new ResponseEntity<List<Message>>(lastMessages, HttpStatus.OK);
    }

    // Receives a message from the front-end and saves it to the database
    @PostMapping("/message/send")
    public ResponseEntity<Message> sendMessage( @RequestBody Message message ){
        message.setUser(userService.findUserByEmail(message.getUser().getEmail()));
        try{
            messageService.save(new Message(message.getMessageBody(), message.getUser(), message.getGroupChat()));
            return new ResponseEntity<Message>(message, HttpStatus.CREATED);
        }
        catch (Exception e){
            return new ResponseEntity<Message>(message, HttpStatus.BAD_REQUEST);
        }
        
        
    }

    // Gets all group chats that the specified user is a part of
    @GetMapping("/groupusers")
    public ResponseEntity<List<GroupUser>> getGroupUsers(@RequestParam String email){
        User user = userService.findUserByEmail(email);
        return new ResponseEntity<List<GroupUser>>(groupUserService.findGroupChatByUser(user), HttpStatus.OK);
    }

    
}
