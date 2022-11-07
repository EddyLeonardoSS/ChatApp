package com.example.chat.repositories;

import org.springframework.data.jpa.repository.JpaRepository;

import com.example.chat.models.GroupChat;

public interface GroupChatRepository extends JpaRepository<GroupChat, Integer> {
    
}
