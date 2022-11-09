package com.example.chat.repositories;

import org.springframework.data.jpa.repository.JpaRepository;

import com.example.chat.models.User;

public interface UserRepository extends JpaRepository<User, Integer>{

    public User findByEmail( String email);
    
}
