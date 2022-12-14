package com.example.chat.services;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.chat.models.GroupChat;
import com.example.chat.models.Message;
import com.example.chat.repositories.MessageRepository;

@Service
public class MessageService {

    @Autowired
    MessageRepository repo;

    public List<Message> findAll(){
        return repo.findAll();
    }

    public List<Message> findMessagesByGroupChat(GroupChat group){
        return repo.findMessagesByGroupChat(group);
    }

    public void save(Message message) {
        repo.save(message);
    }

    
}
