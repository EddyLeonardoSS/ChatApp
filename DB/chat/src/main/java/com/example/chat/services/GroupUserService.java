package com.example.chat.services;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.chat.models.GroupUser;
import com.example.chat.models.User;
import com.example.chat.repositories.GroupUserRepository;

@Service
public class GroupUserService {
    @Autowired
    GroupUserRepository repo;

    public List<GroupUser> findAll(){
        return repo.findAll();
    }

    public List<GroupUser> findGroupChatByUser(User user){
        return repo.findByUser(user);
    }
    
    public Object save(GroupUser groupUser) {
        return repo.save(groupUser);
    }
}
