package com.example.chat.repositories;

import java.util.List;
import javax.transaction.Transactional;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import com.example.chat.models.GroupUser;
import com.example.chat.models.UserClass;

@Transactional
public interface GroupUserRepository extends JpaRepository<GroupUser, Integer>{

    @Query( "SELECT g FROM GroupUser g WHERE g.userId = :id")
    List<GroupUser> findByUser(@Param("id") UserClass id);
}
