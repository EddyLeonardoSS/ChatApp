import { Avatar, Box, Button, Chip, CircularProgress, Divider, Grid, IconButton, InputAdornment, List, ListItem, ListItemAvatar, ListItemText, MenuItem, Modal, Paper, Stack, TextField, Typography } from "@mui/material";
import axios from 'axios';
import { useState, useEffect, useCallback } from "react";
import ImageIcon from '@mui/icons-material/Image';
import { blue, grey } from "@mui/material/colors";
import SendIcon from '@mui/icons-material/Send';
import { useRef } from "react";
import AddIcon from '@mui/icons-material/Add';
import { useLocation, useNavigate } from "react-router-dom";
import { over } from 'stompjs';
import SockJS from 'sockjs-client'
import { styled } from '@mui/material/styles';

var stompClient = null;

const ListItemUsers = styled('li')(({ theme }) => ({
    margin: theme.spacing(0.5),
  }));

export const Layout = () => {

    const [messages, setMessages] = useState([])
    const [groupMessages, setGroupMessages] = useState([])
    const [groups, setGroups] = useState([])
    const [otherUsers, setOtherUsers] = useState([])
    const [isLoaded, setIsLoaded] = useState(false)
    const groupRef = useRef();
    const [sendMessage, setSendMessage] = useState("");
    const [search, setSearch] = useState("");
    const [open, setOpen] = useState(false);
    const [groupName, setGroupName] = useState("")
    const [loggedIn, setLoggedIn] = useState(false)
    const navigate = useNavigate()
    const location = useLocation()
    const [addedUsers, setAddedUsers] = useState([])
    const [currentUser, setCurrentUser] = useState();

    const token = localStorage.getItem("token")

    const url = "http://localhost:8080"

    const headers = {
        "Authorization": `Bearer ${token}`
    }
    const filterSearch = (searched, data) => {
        if (searched === "") {
            return data;
        }
        else {
            return data.filter((d) => d.toLowerCase().includes(searched))
        }
    }
    const filteredSearch = filterSearch(search, otherUsers);

    const getUsers = async (input) => {
        axios.get(`${url}/users?input=${input}`, { headers: headers })
            .then(res => setOtherUsers(res.data))
            .catch(err => navigate('/login'))
    }

    const getCurrentUser = useCallback(async () => {
        axios.get(`${url}/currentuser`, { headers: headers })
            .then(res => setCurrentUser(res.data.username))
            .catch(err => navigate('/login'))
    }, [])

    const getGroups = useCallback(async () => {
        axios.get(`${url}/groupusers`, { headers: headers })
            .then(res => {
                setGroups(res.data)

            })
            .catch(err => navigate('/login'));
        axios.get(`${url}/lastmessage/group`, { headers: headers })
            .then(res => {
                setGroupMessages(res.data)
                setIsLoaded(true)
            })
            .catch(err => navigate('/login'));
    }, []);

    const displayMessages = async (id) => {
        axios.get(`${url}/messages/group?id=${id}`, { headers: headers })
            .then(res => { setMessages(res.data) })
            .catch(err => navigate('/'));
    }

    const handleSendMessage = async (messageBody, groupChat) => {
        if (messageBody != null && groupChat != null) {
            axios.post(`${url}/message/send`, { messageBody, groupChat }, { headers: headers })
                .then(res => {
                    setMessages(prev => ([...prev, res.data]))
                    stompClient.send('/app/chat', {}, JSON.stringify(messageBody))
                })
        }

    }
    const handleAddGroup = async (groupName, users) => {

        users.includes(currentUser) ? users = [...users] : users.push(currentUser)
        axios.post(`${url}/groupchat/new`, { groupName, users }, { headers: headers })
            .then(res => {
                setGroups(res.data)
                stompClient.send('/app/chat', {}, JSON.stringify("Added Group"))
            })
    }

    const addUser = (user) => {
        if (addedUsers.includes(user)) {
            console.log("user already added");
        }
        else {
            setAddedUsers([...addedUsers, user])
            setOtherUsers(prev => prev.filter(users => users !== user))
        }
    }

    const handleOpen = () => {
        setSearch("")
        setAddedUsers(prev=> prev.filter(user=> user === undefined))
        setOpen(true)
    };

    const handleClose = () => {
        setOpen(false)
    };

    const handleDelete = (userToDelete) => {
        setAddedUsers(prev => prev.filter(users => users !== userToDelete))
        setOtherUsers([...otherUsers, otherUsers.includes(userToDelete) ? "" : userToDelete ])
    }


    useEffect(() => {
        if (token == null) {
            navigate('/login')
        }
        else {

            setLoggedIn(true)
        }

        let ws = new SockJS("http://localhost:8080/ws")
        stompClient = over(ws)
        stompClient.connect({}, onConnected, onError);

    }, [token])

    // Connecting Websocket to proper endpoints on api, currently just a means of ensuring connection to update state
    // No important information is being accessed or retrieved, so no authentication needed for /ws/** enpoints
    const onConnected = () => {
        stompClient.subscribe('/chat/public', wsCallback)
    }

    // Whenever a message is sent to server, calls this function
    // Used to update render by calling functions which update state
    const wsCallback = (payload) => {
        displayMessages(groupRef.current.id ? groupRef.current.id : 0)
    }
    const onError = (error) => {
        console.log(error);
    }

    useEffect(() => {

        getCurrentUser();
        getGroups();

    }, [getCurrentUser, getGroups, messages])

    return (
        <>

            <Modal open={open} onClose={handleClose} >
                <Box sx={createGroup}>

                    <TextField id="group-name" variant="standard" label="Group Name" onInput={e => setGroupName(e.target.value)} required></TextField>



                    <TextField variant="standard" label="Search users" onInput={e => {
                        setSearch(e.target.value)
                        getUsers(e.target.value);
                        
                        }} required sx={{ marginTop: "10px" }}></TextField>
                    {
                        filteredSearch.map((input => {
                            if (search === "" || search === null || addedUsers.includes(input) ) {
                                return (<></>)
                            }
                            else {
                                return (
                                    <Box sx={{ display: "flex", zIndex: 2, bgcolor: grey[200] }}>
                                        <MenuItem key={input.id} onClick={() => addUser(input)}
                                            sx={{ width: "100%", display: "flex", justifyContent: "center" }}>
                                            {input}
                                        </MenuItem>
                                    </Box>
                                    
                                )
                            }
                        }))
                    }
                    
                    <Paper sx={{ display: 'flex', justifyContent: 'center', listStyle: "none", p: 0.2, mt: 6 }} component="ul">
                        {addedUsers.map((data) => {
                            return (
                                <ListItemUsers key={data.key} >
                                    <Chip
                                        size="small"
                                        label={data}
                                        onDelete={() => handleDelete(data)}

                                    />
                                </ListItemUsers>
                            );
                        })}
                    </Paper>
                    <Button onClick={() => {
                        if (groupName === "" || addedUsers.length === 0) { }

                        else { handleAddGroup(groupName, addedUsers) }
                    }} >Create Group</Button>

                </Box>
            </Modal>

            <Grid container sx={mainContainer} >

                {isLoaded ?
                    <>
                        <Grid item xs={3} sx={allGroupsDiv} >
                            {/* Left column containg list of groups and add group button */}
                            <Grid container direction="column" wrap="nowrap" sx={{ height: "100%" }}>

                                {/* Grid containing the add groups button */}
                                <Grid item >
                                    <Box sx={{ backgroundColor: blue[300], justifyContent: "space-between", alignItems: "center", display: "flex", height: "100%", width: "100%", borderBottom: "1px solid black" }}>

                                        <Typography sx={{ fontWeight: "bold", margin: "auto" }}>Messages</Typography>
                                        <IconButton onClick={handleOpen}><AddIcon sx={{}} /></IconButton>
                                    </Box>
                                </Grid>

                                {/* Grid containing the list of groups */}
                                <Grid item >
                                    <List sx={[list, {}]} >
                                        {
                                            // Mapping all the group chat names for current user (user is currently hard-coded by email variable)
                                            groups.map(group => {
                                                // holds the last message sent to the group for displaying in the group list
                                                let lastMessage = groupMessages.filter(groupMessage =>
                                                    groupMessage.groupChat.id === group.groupChat.id)[0]

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
                                                                secondary={lastMessage === undefined ? lastMessage = "" : lastMessage = lastMessage.messageBody}
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
                            {/* Grid containing chat messages and the typing bar for sending messages */}
                            <Grid container direction="column" wrap="nowrap" sx={{ height: "100%" }}>
                                <Grid item >
                                    <Box sx={topBarChat}>
                                        <Typography sx={{ fontWeight: "bold", margin: "auto" }}>{groupRef.current != null ? groupRef.current.groupName : "No Group Selected"}</Typography>
                                    </Box>
                                </Grid>

                                {/* Grid containing chat messages */}
                                <Grid item xs={11.3} sx={{ maxHeight: "100%", overflow: "auto", }} >
                                    <Stack spacing={1} sx={[chatStack, { flexDirection: "column-reverse" }]} >
                                        {
                                            // Mapping all the messages for clicked group chat
                                            messages.map(message => {

                                                if (message === messages.filter(x => x.user.username === currentUser).reverse()[0]) {
                                                    return (
                                                        
                                                        <Box sx={[{ display: "flex", justifyContent: "flex-end" }]} >
                                                            
                                                            <Box sx={chatContainer} key={message.id}>
                                                                <Typography sx={tailedBubbleUser}>{message.messageBody}</Typography>
                                                            </Box>
                                                        </Box>
                                                    )
                                                }
                                                else if (message.user.username === currentUser) {
                                                    return (
                                                        <Box sx={[{ display: "flex", justifyContent: "flex-end" }]} >
                                                            <Box sx={chatContainer} key={message.id}>
                                                                <Typography sx={bubbleUser}>{message.messageBody}</Typography>
                                                            </Box>
                                                        </Box>
                                                    )
                                                }
                                                if (message === messages.filter(x => x.user.username !== currentUser).reverse()[0]) {
                                                    return (

                                                        <Box sx={chatContainer} key={message.id}>
                                                            <Typography fontSize={12} color={grey[600]}>{message.user.username}</Typography>
                                                            <Typography sx={[tailedBubbleRecp]}>{message.messageBody}</Typography>
                                                        </Box>
                                                    )
                                                }
                                                else {
                                                    return (
                                                        <Box sx={chatContainer} key={message.id}>
                                                            <Typography fontSize={12} color={grey[600]}>{message.user.username}</Typography>
                                                            <Typography sx={chatBubbleRecp}>{message.messageBody}</Typography>
                                                        </Box>
                                                    )
                                                }
                                            }).reverse()
                                        }

                                    </Stack>
                                </Grid>

                                {/* Grid containing the typing bar for sending messages */}
                                <Grid item xs={0.7} sx={{ border: "1px solid grey[100]", bgcolor: grey[500], padding: "5px" }}>
                                    <TextField
                                        margin="dense"
                                        variant="standard"
                                        size="small"
                                        value={sendMessage}
                                        placeholder="Enter Message..."
                                        onChange={(e) => setSendMessage(e.target.value)}
                                        multiline maxRows={2}
                                        InputProps={{
                                            disableUnderline: true,
                                            endAdornment: <InputAdornment position="end">
                                                <IconButton onClick={() => {
                                                    handleSendMessage(sendMessage, groupRef.current)
                                                    setSendMessage("")
                                                }}><SendIcon /></IconButton></InputAdornment>
                                        }}
                                        sx={{ maxHeight: "100%", width: "98.5%", bgcolor: grey[100], borderRadius: "5em", padding: "5px", }}></TextField>
                                </Grid>
                            </Grid>

                        </Grid>
                    </>
                    :
                    <>
                        <CircularProgress sx={{ margin: "auto" }}></CircularProgress>
                    </>
                }
            </Grid>

        </>
    )

}

// Functions that serve as CSS styling for components

const allGroupsDiv = {
    height: "100%",
    width: "100%",
    minHeight: "100%",
    overflow: "auto",
}

const chatDiv = {
    borderLeft: "solid black 2px",
    height: "100%",
    width: "100%",
    maxWidth: "100%",
    maxHeight: "100%",
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

const topBarChat = {
    backgroundColor: blue[300], justifyContent: "space-between", alignItems: "center", display: "flex", height: "100%", width: "100%", padding: "4px",
    borderBottom: "1px solid black"
}

const mainContainer = {
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
    position: 'absolute',
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

}


