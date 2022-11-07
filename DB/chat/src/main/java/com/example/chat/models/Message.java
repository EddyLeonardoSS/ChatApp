package com.example.chat.models;

import java.sql.Date;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.Table;


@Entity
@Table(name = "messages")
public class Message {
    
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;

    @Column(name = "message_body")
    private String messageBody;

    @ManyToOne
    @JoinColumn(name = "parent_user_id")
    private User user;

    @ManyToOne
    @JoinColumn(name = "group_id")
    private GroupChat groupChat;

    @Column(name = "date_sent")
    private Date dateSent;

    Message(){};

    Message(String messageBody){
        this.messageBody = messageBody;
    }

    public int getId() {
        return id;
    }

    public String getMessageBody() {
        return messageBody;
    }

    public void setMessageBody(String messageBody) {
        this.messageBody = messageBody;
    }

    public User getUser(){
        return user;
    }

    public void setUser(User user){
        this.user = user;
    }

    public GroupChat getGroupChat(){
        return groupChat;
    }

    public void setGroupChat(GroupChat groupChat){
        this.groupChat = groupChat;
    }

    public Date getDateSent(){
        return dateSent;
    }

    public void setDateSent(Date dateSent){
        this.dateSent = dateSent;
    }

    public String toString(){
        return "Message: " + this.messageBody + " Parent_user_id: " + this.user + " Group_id " + this.groupChat
        + " Date Sent: " + this.dateSent;
    }

    

}
