package com.example.chat.repositories;

import java.util.List;


import org.springframework.data.jpa.repository.JpaRepository;

import com.example.chat.models.GroupChat;
import com.example.chat.models.UserClass;

public interface GroupChatRepository extends JpaRepository<GroupChat, Integer> {

    public GroupChat findById(int id);
    
}
