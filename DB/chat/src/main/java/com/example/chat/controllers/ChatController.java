package com.example.chat.controllers;

import java.util.List;
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
    
    // @GetMapping("/messages")
    // public ResponseEntity<List<Message>> getMessages(){
        
    //     return new ResponseEntity<List<Message>>(messageService.findAll(), HttpStatus.OK);
    // }

    @GetMapping("/messages/group")
    public ResponseEntity<List<Message>> getMessagesFromGroup(@RequestParam int id ){
        GroupChat groupChat = groupChatService.findById(id);
        return new ResponseEntity<List<Message>>(messageService.findMessagesByGroupChat(groupChat), HttpStatus.OK);
    }
    @GetMapping("/messages")
    public ResponseEntity<List<Message>> getMessages(){
        
        return new ResponseEntity<List<Message>>(messageService.findAll(), HttpStatus.OK);
    }

    @PostMapping("/message/send")
    public ResponseEntity<Message> sendMessage( @RequestBody Message message ){
        message.setUser(userService.findUserByEmail(message.getUser().getEmail()));
        if(message.getMessageBody() !=null){
            messageService.save(new Message(message.getMessageBody(), message.getUser(), message.getGroupChat()));
            return new ResponseEntity<Message>(message, HttpStatus.CREATED);
        }
        else{
            
        return new ResponseEntity<Message>(message, HttpStatus.UNPROCESSABLE_ENTITY);
        }
        
    }


    @GetMapping("/groups")
    public ResponseEntity<GroupChat> getGroupChats(@RequestParam int id){
        
        return new ResponseEntity<GroupChat>(groupChatService.findById(id), HttpStatus.OK);
    }

    // Currently used to get all group chats that the specified user is a part of
    @GetMapping("/groupusers")
    public ResponseEntity<List<GroupUser>> getGroupUsers(@RequestParam String email){
        User user = userService.findUserByEmail(email);
        return new ResponseEntity<List<GroupUser>>(groupUserService.findGroupChatByUser(user), HttpStatus.OK);
    }

    @GetMapping("/users")
    public ResponseEntity<List<User>> getUsers(){
        
        return new ResponseEntity<List<User>>(userService.findAll(), HttpStatus.OK);
    }

}
