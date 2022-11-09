package com.example.chat.services;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.chat.models.User;
import com.example.chat.repositories.UserRepository;

@Service
public class UserService {
    @Autowired
    UserRepository repo;

    public List<User> findAll(){
        return repo.findAll();
    }

    public User findUserByEmail(String email){
        return repo.findByEmail(email);
    }
}
