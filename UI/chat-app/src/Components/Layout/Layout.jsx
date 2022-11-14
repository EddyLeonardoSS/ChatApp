import styled from "@emotion/styled";
import { Avatar, Box, Container, Divider, Grid, IconButton, InputAdornment, List, ListItem, ListItemAvatar, ListItemText, Menu, MenuItem, MenuList, Modal, Select, Stack, TextField, Typography } from "@mui/material";
import axios from 'axios';
import { useState, useEffect } from "react";
import ImageIcon from '@mui/icons-material/Image';
import { blue, grey, purple } from "@mui/material/colors";
import SendIcon from '@mui/icons-material/Send';
import { useRef } from "react";
import { createContext } from "react";
import { GroupList } from "../GroupList/GroupList";
import { Chat } from "../Chat/Chat";
import { useReducer } from "react";
import AddIcon from '@mui/icons-material/Add';
export const Layout = () => {

    const [messages, setMessages] = useState([])
    const [groupMessages, setGroupMessages] = useState([])
    const [groups, setGroups] = useState([])
    const groupRef = useRef();
    const messageRef = useRef({});
    const userRef = useRef({});
    const [open, setOpen] = useState(false);

    let value= ""

    // TEMP Solution before login is setup
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
    const displayMessages = async (id) => {
        axios.get(`http://localhost:8080/messages/group?id=${id}`)
            .then(res => { setMessages(res.data) })
            .catch(err => console.log(err));
    }

    const handleSendMessage = async (messageBody, user, groupChat) => {
        if (messageBody != null && user != null && groupChat != null) {
            axios.post(`http://localhost:8080/message/send`, { messageBody, user, groupChat })
                .then(res => setMessages([...messages, res.data]))
        }

    }
    const handleAddGroup = async (messageBody, user, groupChat) => {


    }
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    useEffect(() => {
        getGroups();
    }, [messages])

    return (
        <>
        <Modal open={open} onClose={handleClose} >
                    <Box sx={createGroup}>
                        
                        <TextField variant="standard" label="Group Name">Group Name</TextField>
                        
                        <TextField variant="standard" label="Group Name">Group Name</TextField>
                        
                    </Box>
                </Modal>
            <Grid container sx={mainContainer} >
                
                <Grid item xs={3} sx={allGroupsDiv} >
                    <Grid container direction="column" wrap="nowrap" sx={{ height: "100%" }}>
                        <Grid item xs={0.4}>
                            <Box sx={{ backgroundColor: blue[300], justifyContent: "space-between", alignItems: "center", display: "flex", height: "100%", width: "100%" }}>

                                <Typography sx={{ fontWeight: "bold", margin: "auto" }}>Messages</Typography>
                                <IconButton onClick={handleOpen}><AddIcon sx={{}} /></IconButton>

                            </Box>
                        </Grid>
                        <Grid item >
                            <List sx={[list, {}]} >
                                {
                                    // Mapping all the group chat names for current user (user is currently hard-coded by email variable)
                                    groups.map(group => {
                                        return (
                                            <>
                                                <ListItem sx={{ width: "100%", whiteSpace: 'nowrap', }}
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
                                                            groupMessage.groupChat.id = group.groupChat.id)[group.groupChat.id - 1].messageBody}
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
                    </Grid>
                </Grid>

                <Grid item xs={9} sx={chatDiv} >
                    <Grid container direction="column" wrap="nowrap" sx={{ height: "100%" }}>

                        <Grid item xs={11.3} sx={{ maxHeight: "100%", overflow: "auto", }} >
                            <Stack spacing={1} sx={[chatStack, { flexDirection: "column-reverse" }]} >
                                {
                                    // Mapping all the messages for clicked group chat
                                    messages.map(message => {

                                        if (message == messages.filter(x => x.user.id === 1).reverse()[0]) {
                                            return (
                                                <Box sx={[{ display: "flex", justifyContent: "flex-end" }]} >
                                                    <Box sx={chatContainer} key={message.id}>
                                                        <Typography sx={tailedBubbleUser}>{message.messageBody}</Typography>
                                                    </Box>
                                                </Box>
                                            )
                                        }
                                        else if (message.user.id == 1) {
                                            return (
                                                <Box sx={[{ display: "flex", justifyContent: "flex-end" }]} >
                                                    <Box sx={chatContainer} key={message.id}>
                                                        <Typography sx={bubbleUser}>{message.messageBody}</Typography>
                                                    </Box>
                                                </Box>
                                            )
                                        }
                                        if (message == messages.filter(x => x.user.id === 2).reverse()[0]) {
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
                                    }).reverse()
                                }

                            </Stack>

                        </Grid>
                        <Grid item xs={0.7} sx={{ border: "1px solid grey[100]", bgcolor: grey[500], padding: "5px" }}>
                            <TextField
                                margin="dense"
                                variant="standard"
                                size="small"
                                onChange={(e) => messageRef.current = e.target.value}
                                multiline maxRows={2}
                                InputProps={{
                                    disableUnderline: true,
                                    endAdornment: <InputAdornment position="end">
                                        <IconButton onClick={() => handleSendMessage(messageRef.current, email, groupRef.current)}><SendIcon /></IconButton></InputAdornment>
                                }}
                                sx={{ maxHeight: "100%", width: "98.5%", bgcolor: grey[100], borderRadius: "5em", padding: "5px", }}></TextField>
                        </Grid>
                    </Grid>

                </Grid>

            </Grid>

        </>
    )

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
    paddingBottom: "1em",
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
        background: "white",
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

const createGroup = {
    position: 'absolute' ,
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: "20%",
  height: "50%",
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
  display: "flex",
  flexDirection: "column",
  justifyContent: "space-between"
  
}


