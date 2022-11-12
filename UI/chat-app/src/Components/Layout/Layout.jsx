import styled from "@emotion/styled";
import { Avatar, Box, Container, Divider, Grid, IconButton, InputAdornment, List, ListItem, ListItemAvatar, ListItemText, Stack, TextField, Typography } from "@mui/material";
import axios from 'axios';
import { useState, useEffect } from "react";
import ImageIcon from '@mui/icons-material/Image';
import { grey, purple } from "@mui/material/colors";
import SendIcon from '@mui/icons-material/Send';
import { useRef } from "react";

export const Layout = () => {

    const [messages, setMessages] = useState([])
    const [groupMessages, setGroupMessages] = useState([])
    const [groups, setGroups] = useState([])
    const groupRef = useRef({});
    const messageRef = useRef({});
    const userRef = useRef({});
    

    // TEMP Solution before login is setup
    const email = "user2@gmail.com"

    const getMessages = async () => {
        axios.get("http://localhost:8080/messages")
            .then(res => setMessages(res.data))
            .catch(err => console.log(err));
    };

    const getGroups = async () => {
        axios.get(`http://localhost:8080/groupusers?email=${email}`)
            .then(res => {
                setGroups(res.data)
            })
            .catch(err => console.log(err));
    };

    const displayMessages = () => {
        setGroupMessages(messages.filter(message =>  message.groupChat.id === groupRef.current.id))
        
    }

    const handleSendMessage = (messageBody, user, groupChat) =>{
        if(messageBody != null && user != null && groupChat != null){
            axios.post(`http://localhost:8080/message/send`, {messageBody, user, groupChat})
        }
        
    }

    useEffect(() => {
        getMessages();
        getGroups();
        displayMessages();
    }, [messages])
    return (
        <>

            <Grid container sx={mainContainer} >

                <Grid item xs={3} sx={allGroupsDiv} >
                    
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
                                                secondary={Array.from(messages.filter(message => message.groupChat.id == group.groupChat.id)).reverse()[0].messageBody}
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
                </Grid>

                <Grid item xs={9} sx={chatDiv} >
                    <Grid container direction="column"  wrap="nowrap" sx={{  height: "100%"}}>

                        <Grid item xs={11.3} sx={{  }} >
                            <Stack spacing={1} sx={chatStack} >
                                {
                                    // Mapping all the messages for clicked group chat
                                    groupMessages.map(message => {

                                        if (message == Array.from(groupMessages.filter(x => x.user.id === 2)).reverse()[0]) {
                                            return (
                                                <Box sx={[{ display: "flex", justifyContent: "flex-end" }]} >
                                                    <Box sx={chatContainer} key={message.id}>
                                                        <Typography sx={tailedBubbleUser}>{message.messageBody}</Typography>
                                                    </Box>
                                                </Box>
                                            )
                                        }
                                        else if (message.user.id == 2) {
                                            return (
                                                <Box sx={[{ display: "flex", justifyContent: "flex-end" }]} >
                                                    <Box sx={chatContainer} key={message.id}>
                                                        <Typography sx={bubbleUser}>{message.messageBody}</Typography>
                                                    </Box>
                                                </Box>
                                            )
                                        }
                                        if (message == Array.from(messages.filter(x => x.user.id === 1)).reverse()[0]) {
                                            return (

                                                <Box sx={chatContainer} key={message.id}>
                                                    <Typography sx={[tailedBubbleRecp]}>{message.messageBody}</Typography>
                                                </Box>
                                            )
                                        }
                                        else {
                                            return (
                                                <Box sx={chatContainer} key={message.id}>
                                                    <Typography sx={chatBubbleRecp}>{message.messageBody}</Typography>
                                                </Box>
                                            )
                                        }
                                    })
                                }

                            </Stack>
                        </Grid>

                        <Grid item xs={0.7}  sx={{ border: "1px solid grey[100]",bgcolor: grey[500],  padding: "5px"}}>
                            <TextField 
                            margin="dense"
                             variant="standard" 
                             size="small" 
                             onChange={(e) => messageRef.current = e.target.value}
                             multiline maxRows={2} 
                             InputProps={{disableUnderline: true, 
                                endAdornment: <InputAdornment position="end">
                                    <IconButton onClick={()=> handleSendMessage(messageRef.current, email, groupRef.current)}><SendIcon/></IconButton></InputAdornment>
                            }}
                             sx={{ maxHeight: "100%", width: "98.5%", bgcolor: grey[100], borderRadius: "5em", padding: "5px",}}></TextField>
                        </Grid>
                    </Grid>

                </Grid>

            </Grid>

        </>
    )

    {/* {messages.map(x => <p>{x.messageBody}</p>)} */ }
}

const allGroupsDiv = {
    border: "solid black 2px",
    height: "100%",
    width: "100%",
    minHeight: "100%",
    overflow: "auto",
}
const chatDiv = {
    border: "solid black 2px",
    height: "100%",
    width: "100%",
    maxWidth: "100%",
    maxHeight: "100%",
}
const stackContainer = {
    height: "100%",
    width: "100%",
    overflow: "auto"
}
const list = {
    margin: "auto",
    height: "98%",
    width: "100%",

}

const chatStack = {
    margin: "auto",
    paddingTop: "1em",
    height: "98%",
    width: "100%",
    maxHeight: "100%",
    overflow: "auto",
}

const mainContainer = {
    padding: "2em",
    position: "fixed",
    height: "100%",
    width: "100%",

}
const chatContainer = {
    paddingLeft: '1em',
    paddingRight: '1em',
    position: "relative",
    maxWidth: "40%",
    
}

const chatBubbleRecp = {
    padding: '0.6em',
    backgroundColor: "#656566",
    borderRadius: '1em',
    color: 'white',
    display: 'inline-block',
}
const tailedBubbleRecp = {
    
    padding: '0.6em',
    borderRadius: '1em',
    backgroundColor: "#656566",
    color: 'white',
    display: 'inline-block',
    
    '&:before': {
        content: '""',
        position: "absolute",
        left: "0.38em",
        bottom: "0em",
        zIndex: "-1",
        height: "20px",
        width: "20px",
        background: "linear-gradient(to bottom, #656566 0%, #656566 100%)",
        backgroundAttachment: "fixed",
        borderBottomRightRadius: "10px",
    },
    '&:after': {
        content: '""',
        position: "absolute",
        left: "0.38em",
        bottom: "0em",
        zIndex: "-1",
        height: "20px",
        width: "10px",
        background:"white",
        borderBottomRightRadius: "10px",
    }
}

const tailedBubbleUser = {
    padding: "0.6em",
    backgroundColor: "#2fa8f8",
    borderRadius: "1em",
    color: "white",
    display: 'inline-block',
    '&:before': {
        content: '""',
        position: "absolute",
        right: "0.35em",
        bottom: "0em",
        zIndex: "-1",
        height: "20px",
        width: "20px",
        background: "linear-gradient(to bottom, #2fa8f8 0%, #2fa8f8 100%)",
        backgroundAttachment: "fixed",
        borderBottomLeftRadius: "10px",
    },
    '&:after': {
        content: '""',
        position: "absolute",
        right: "0.35em",
        bottom: "0em",
        zIndex: "-1",
        height: "20px",
        width: "10px",
        background: "white",
        borderBottomLeftRadius: "10px",
    }
}
const bubbleUser = {
    padding: "0.6em",
    backgroundColor: "#2fa8f8",
    borderRadius: "1em",
    color: "white",
    display: 'inline-block',


}





