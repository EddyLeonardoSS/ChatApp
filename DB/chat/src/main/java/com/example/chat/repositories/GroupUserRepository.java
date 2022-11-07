package com.example.chat.repositories;

import org.springframework.data.jpa.repository.JpaRepository;

import com.example.chat.models.GroupUser;

public interface GroupUserRepository extends JpaRepository<GroupUser, Integer>{
    
}
