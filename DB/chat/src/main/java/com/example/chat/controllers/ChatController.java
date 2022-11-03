package com.example.chat.controllers;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;

import com.example.chat.models.Message;
import com.example.chat.services.MessageService;

@RestController
public class ChatController {

    @Autowired
    MessageService messageService;
    
    @GetMapping("/messages")
    public ResponseEntity<List<Message>> getMessages(){
        
        return new ResponseEntity<List<Message>>(messageService.findAll(), HttpStatus.OK);
    }
}
