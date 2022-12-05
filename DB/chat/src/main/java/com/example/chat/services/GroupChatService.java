package com.example.chat.services;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.chat.models.GroupChat;
import com.example.chat.repositories.GroupChatRepository;

@Service
public class GroupChatService {
    @Autowired
    GroupChatRepository repo;

    public List<GroupChat> findAll(){
        return repo.findAll();
    }

    public GroupChat findById(int id) {
        return repo.findById(id);
    }

    public GroupChat save(GroupChat groupChat) {
        return repo.save(groupChat);
    }

    
}
