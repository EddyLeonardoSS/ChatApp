import styled from "@emotion/styled";
import { Avatar, Box, Container, Divider, Grid, List, ListItem, ListItemAvatar, ListItemText, Stack, Typography } from "@mui/material";
import axios from 'axios';
import { useState, useEffect } from "react";
import ImageIcon from '@mui/icons-material/Image';


export const Layout = () => {

    const [messages, setMessages] = useState([])
    const [groups, setGroups] = useState([])

    // TEMP Solution before login is setup
    const email = "user1@gmail.com"

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

    const displayMessages = async (id) => {
        axios.get(`http://localhost:8080/messages?id=${id}`)
            .then(res => setMessages(res.data))
            .catch(err => console.log(err));


    }

    useEffect(() => {
        getGroups();
    }, [])
    return (
        <>

            <Grid container sx={mainContainer}>

                <Grid item xs={3} sx={allGroupsDiv}>
                    <List sx={[list, {backgroundColor: "azure"}]} >
                        {
                            // Mapping all the group chat names for current user (user is currently hard-coded by email variable)
                            groups.map(group => {
                                return (
                                    <>
                                        <ListItem sx={{ overflow: "hidden"}}>
                                            <ListItemAvatar>
                                                <Avatar>
                                                    <ImageIcon></ImageIcon>
                                                </Avatar>
                                            </ListItemAvatar>
                                            <ListItemText sx={{wordBreak: "keep-all"}} onClick={() => displayMessages(group.groupChat.id)} key={group.groupChat.id}
                                                primary={group.groupChat.groupName} secondary="Latest Message here">
                                            </ListItemText>
                                        </ListItem>
                                        <Divider variant="inset" component="li" />
                                    </>
                                )
                            })
                        }
                    </List>
                </Grid>

                <Grid item xs={9} sx={chatDiv}>

                    <Stack spacing={1}  sx={chatStack} >
                        {
                            // Mapping all the messages for clicked group chat
                            messages.map(message => {

                                if (message == Array.from(messages.filter(x => x.user.id === 1)).reverse()[0]) {
                                    return (
                                        <Box sx={[{ display: "flex", justifyContent: "flex-end"}]} >
                                        <Box sx={[chatContainer, {textAlign: "right" , maxWidth: "40%"}]} key={message.id}>
                                            <Typography sx={tailedBubbleUser}>{message.messageBody}</Typography>
                                        </Box>
                                        </Box>
                                    )
                                }
                                else if (message.user.id == 1) {
                                    return (
                                        <Box sx={[{ display: "flex", justifyContent: "flex-end"}]} >

                                        <Box sx={[chatContainer, { textAlign: "right" , maxWidth: "40%"}]} key={message.id}>
                                            <Typography sx={bubbleUser}>{message.messageBody}</Typography>
                                        </Box>
                                        </Box>
                                    )
                                }
                                if (message == Array.from(messages.filter(x => x.user.id === 2)).reverse()[0]) {
                                    return (
                                        
                                        <Box sx={[chatContainer, { textAlign: "left", maxWidth: "40%" }]} key={message.id}>
                                            <Typography sx={tailedBubbleRecp}>{message.messageBody}</Typography>
                                        </Box>
                                    )
                                }
                                else {
                                    return (
                                        <Box sx={[chatContainer, { textAlign: "left", maxWidth: "40%" }]} key={message.id}>
                                            <Typography sx={chatBubbleRecp}>{message.messageBody}</Typography>
                                        </Box>
                                    )
                                }
                            })
                        }
                    </Stack>
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
    backgroundColor: "azure",
    overflow: "auto",
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
    // '&:before': {
    //     content: '""',
    //     position: "absolute",
    //     right: "43.5em",
    //     bottom: "0em",
    //     zIndex: "0",
    //     height: "20px",
    //     width: "20px",
    //     background: "linear-gradient(to bottom, #656566 0%, #656566 100%)",
    //     backgroundAttachment: "fixed",
    //     borderBottomRightRadius: "10px",
    // },
    // '&:after': {
    //     content: '""',
    //     position: "absolute",
    //     right: "44.5em",
    //     bottom: "0em",
    //     zIndex: "0",
    //     height: "20px",
    //     width: "10px",
    //     background:"white",
    //     borderBottomRightRadius: "10px",
    // }
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
        right: "0.7ch",
        bottom: "0em",
        zIndex: "0",
        height: "20px",
        width: "20px",
        background: "linear-gradient(to bottom, #2fa8f8 0%, #2fa8f8 100%)",
        backgroundAttachment: "fixed",
        borderBottomLeftRadius: "10px",
    },
    '&:after': {
        content: '""',
        position: "absolute",
        right: "0.7ch",
        bottom: "0em",
        zIndex: "0",
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





