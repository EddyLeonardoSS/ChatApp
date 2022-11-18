package com.example.chat.repositories;

import javax.transaction.Transactional;
import org.springframework.data.jpa.repository.JpaRepository;
import com.example.chat.models.GroupChat;

@Transactional
public interface GroupChatRepository extends JpaRepository<GroupChat, Integer> {

    public GroupChat findById(int id);
    
}
