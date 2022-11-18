package com.example.chat.repositories;

import org.springframework.data.jpa.repository.JpaRepository;

import com.example.chat.models.UserClass;

public interface UserRepository extends JpaRepository<UserClass, Integer>{

    public UserClass findByEmail( String email);

    public UserClass findByUsername(String username);
    
}
