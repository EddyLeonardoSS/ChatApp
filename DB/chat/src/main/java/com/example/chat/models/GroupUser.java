package com.example.chat.models;

import java.util.Set;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToMany;
import javax.persistence.ManyToOne;
import javax.persistence.Table;

import org.hibernate.annotations.ManyToAny;

@Entity
@Table(name = "group_users")
public class GroupUser {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;
    
    @ManyToOne
    @JoinColumn(name = "user_id")
    private User user;

    @ManyToOne
    @JoinColumn(name = "group_id")
    private GroupChat groupChat;

    GroupUser(){};

    GroupUser(User user, GroupChat groupChat){
        this.user = user;
        this.groupChat = groupChat;
    }

    public int getId() {
        return id;
    }

    public User getUser() {
        return user;
    }

    public void setUserId(User user) {
        this.user = user;
    }

    public GroupChat getGroupChat() {
        return groupChat;
    }

    public void setGroupId(GroupChat groupChat) {
        this.groupChat = groupChat;
    }

    
    
}
