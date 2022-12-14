package com.example.chat.models;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.Table;

@Entity
@Table(name = "group_users")
public class GroupUser {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;
    
    @ManyToOne
    @JoinColumn(name = "user_id")
    private UserClass userId;

    @ManyToOne
    @JoinColumn(name = "group_id")
    private GroupChat groupChat;

    GroupUser(){};

    public GroupUser(UserClass userId, GroupChat groupChat){
        this.userId = userId;
        this.groupChat = groupChat;
    }

    public int getId() {
        return id;
    }

    public UserClass getUserId() {
        return userId;
    }

    public void setUserId(UserClass userId) {
        this.userId = userId;
    }

    public GroupChat getGroupChat() {
        return groupChat;
    }

    public void setGroupId(GroupChat groupChat) {
        this.groupChat = groupChat;
    }
}
