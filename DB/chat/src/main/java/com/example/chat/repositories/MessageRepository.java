package com.example.chat.repositories;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import com.example.chat.models.GroupChat;
import com.example.chat.models.Message;
import com.example.chat.models.User;

public interface MessageRepository extends JpaRepository<Message, Integer>{
    
    @Query("SELECT m FROM Message m WHERE m.groupChat = :group")
    public List<Message> findMessagesByGroupChat(@Param("group") GroupChat groupChat);

    
}
