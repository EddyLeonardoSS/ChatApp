package com.example.chat.repositories;

import org.springframework.data.jpa.repository.JpaRepository;

import com.example.chat.models.Message;

public interface MessageRepository extends JpaRepository<Message, Integer>{

}
