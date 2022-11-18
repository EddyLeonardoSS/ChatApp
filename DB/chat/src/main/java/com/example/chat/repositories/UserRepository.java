package com.example.chat.repositories;

import javax.transaction.Transactional;
import org.springframework.data.jpa.repository.JpaRepository;
import com.example.chat.models.UserClass;

@Transactional
public interface UserRepository extends JpaRepository<UserClass, Integer>{

    public UserClass findByEmail( String email);

    public UserClass findByUsername(String username);
    
}
