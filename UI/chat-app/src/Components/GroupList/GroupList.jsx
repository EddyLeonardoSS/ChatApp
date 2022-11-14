import { Avatar, Box, Container, Divider, Grid, IconButton, InputAdornment, List, ListItem, ListItemAvatar, ListItemText, Stack, TextField, Typography } from "@mui/material";
import ImageIcon from '@mui/icons-material/Image';
import { useState, useEffect, useRef} from "react";
import axios from 'axios';




export const GroupList = ({messages}) =>{
    
    const [newMessages, setMessages] = useState([])
    const [groupMessages, setGroupMessages] = useState([])
    const [groups, setGroups] = useState([])
    const groupRef = useRef([]);
    const email = "user1@gmail.com"

   

    const getGroups = async () => {
        axios.get(`http://localhost:8080/groupusers?email=${email}`)
            .then(res => {
                setGroups(res.data)
            })
            .catch(err => console.log(err));
        axios.get(`http://localhost:8080/lastmessage/group?email=${email}`)
            .then(res => {
                setGroupMessages(res.data)
                
            })
            .catch(err => console.log(err));
            
    };
    const displayMessages = (id) => {
        axios.get(`http://localhost:8080/messages/group?id=${id}`)
            .then(res => {setMessages(res.data)
            })
            .catch(err => console.log(err));
            messages(newMessages)
    }
    
    useEffect(()=>{
        getGroups();
    },[newMessages])
    return(
        <>
        <List sx={[list, {  }]} >
                        {
                            // Mapping all the group chat names for current user (user is currently hard-coded by email variable)
                            groups.map(group => {
                                return (
                                    <>
                                        <ListItem sx={{ width: "100%", whiteSpace: 'nowrap' }}
                                         onClick={() => {
                                            groupRef.current = group.groupChat
                                            displayMessages(group.groupChat.id)
                                            
                                            }}>
                                            <ListItemAvatar>
                                                <Avatar>
                                                    <ImageIcon></ImageIcon>
                                                </Avatar>
                                            </ListItemAvatar>
                                            <ListItemText key={group.groupChat.id}
                                                primary={group.groupChat.groupName}
                                                secondary={groupMessages.filter(groupMessage => 
                                                    groupMessage.groupChat.id = group.groupChat.id )[group.groupChat.id - 1].messageBody}
                                                primaryTypographyProps={{ style: { textOverflow: 'ellipsis', overflow: "hidden" } }}
                                                secondaryTypographyProps={{ style: { textOverflow: 'ellipsis', overflow: "hidden" } }}>
                                            </ListItemText>
                                        </ListItem>
                                        <Divider variant="inset" component="li" />
                                    </>
                                )
                            })
                        }
                    </List>
        </>
    )
}
const list = {
    margin: "auto",
    height: "98%",
    width: "100%",

}