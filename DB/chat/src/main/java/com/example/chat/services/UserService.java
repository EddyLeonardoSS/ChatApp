package com.example.chat.services;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.chat.models.UserClass;
import com.example.chat.repositories.UserRepository;

@Service
public class UserService {
    @Autowired
    UserRepository repo;

    public List<UserClass> findAll(){
        return repo.findAll();
    }

    public UserClass findUserByEmail(String email){
        return repo.findByEmail(email);
    }

    public UserClass findUserByUserName(String username) {
        return repo.findByUsername(username);
    }
}
