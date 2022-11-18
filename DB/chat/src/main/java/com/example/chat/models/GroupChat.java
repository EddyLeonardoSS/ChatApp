package com.example.chat.models;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Table;

@Entity
@Table(name = "group_chat")
public class GroupChat {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;

    @Column(name = "group_name")
    private String groupName;

    GroupChat(){}

    public GroupChat(String groupName){
        this.groupName = groupName;
    }

    public int getId(){
        return id;
    }

    public String getGroupName(){
        return groupName;
    }

    public void setGroupName(String groupName){
        this.groupName = groupName;
    }

    @Override
    public String toString() {
        return "GroupChat [id=" + id + ", groupName=" + groupName + "]";
    }
    
}
