import { Avatar, Box, Button, CircularProgress, Divider, Grid, IconButton, InputAdornment, List, ListItem, ListItemAvatar, ListItemText, MenuItem, Modal, Stack, TextField, Typography } from "@mui/material";
import axios from 'axios';
import { useState, useEffect } from "react";
import ImageIcon from '@mui/icons-material/Image';
import { blue, grey, purple } from "@mui/material/colors";
import SendIcon from '@mui/icons-material/Send';
import { useRef } from "react";
import AddIcon from '@mui/icons-material/Add';
import { useLocation, useNavigate } from "react-router-dom";
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

    const filterSearch = (searched, data) => {
        
        if(searched === ""){
            return data;
        }
        else {
            return data.filter((d) => d.username.toLowerCase().includes(searched) )
        }
    }
    const filteredSearch = filterSearch(search, otherUsers);

    const getUsers = async () => {
        axios.get(`http://localhost:8080/users`)
        .then(res => setOtherUsers(res.data))
        .catch(err => console.log(err))

    }
    const getGroups = async () => {
        axios.get(`http://localhost:8080/groupusers?`)
            .then(res => {
                setGroups(res.data)
                
            })
            .catch(err => console.log(err));
        axios.get(`http://localhost:8080/lastmessage/group`)
            .then(res => {
                setGroupMessages(res.data)
                setIsLoaded(true)
            })
            .catch(err => console.log(err));
            
    };
    const displayMessages = async (id) => {
        axios.get(`http://localhost:8080/messages/group?id=${id}`)
            .then(res => { setMessages(res.data) })
            .catch(err => console.log(err));
    }

    const handleSendMessage = async (messageBody, groupChat) => {
        if (messageBody != null && groupChat != null) {
            axios.post(`http://localhost:8080/message/send`, { messageBody, groupChat })
                .then(res => setMessages([...messages, res.data]))
        }

    }
    const handleAddGroup = async (groupName, users) => {
        axios.post(`http://localhost:8080/groupchat/new`, { groupName, users} )
        .then(res => {
            setGroups(res.data)
        })
    }

    const addUser = (user) => {
        
        if(addedUsers.includes(user)){
            console.log("user already added");
        }
        else {
            setAddedUsers([...addedUsers, user])
        }
    }
    
    const handleOpen = () => {
        getUsers();
        setOpen(true)
    };

    const handleClose = () => setOpen(false);
    useEffect(()=>{
        if(location.state == null){
            navigate('/login')
        }
        else{
            setAddedUsers([...addedUsers, location.state.username])
            setLoggedIn(true)
        }
    }, [])
    
    useEffect(() => {
        getGroups();
    }, [messages])
    
    return (
        <>
        
            <Modal open={open} onClose={handleClose} >
                <Box sx={createGroup}>

                    <TextField id="group-name" variant="standard" label="Group Name" onInput={e => setGroupName(e.target.value)} required></TextField>
                    
                    <TextField variant="standard" label="Search users" onInput={e => setSearch(e.target.value)} required></TextField>
                        {
                            filteredSearch.map((input => {
                                if(search === "" || search === null){
                                    return(<></>)
                                }
                                else{
                                    return(
                                        <Box sx ={{display: "flex", zIndex: 2}}>
                                            <MenuItem key={input.id} onClick={() => addUser(input.username)}>{input.username}</MenuItem>
                                        </Box>
                                       )
                                }
                            }))
                        }
                    <Button onClick={() => {
                        if(groupName === "" || addedUsers.length === 1){}

                        else{ handleAddGroup(groupName, addedUsers) }
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
                            <Box sx={{ backgroundColor: blue[300], justifyContent: "space-between", alignItems: "center", display: "flex", height: "100%", width: "100%", borderBottom: "1px solid black"}}>

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

                                        if (message === messages.filter(x => x.user.username === location.state.username).reverse()[0]) {
                                            return (
                                                <Box sx={[{ display: "flex", justifyContent: "flex-end" }]} >
                                                    <Box sx={chatContainer} key={message.id}>
                                                        <Typography sx={tailedBubbleUser}>{message.messageBody}</Typography>
                                                    </Box>
                                                </Box>
                                            )
                                        }
                                        else if (message.user.username === location.state.username) {
                                            return (
                                                <Box sx={[{ display: "flex", justifyContent: "flex-end" }]} >
                                                    <Box sx={chatContainer} key={message.id}>
                                                        <Typography sx={bubbleUser}>{message.messageBody}</Typography>
                                                    </Box>
                                                </Box>
                                            )
                                        }
                                        if (message === messages.filter(x => x.user.username !== location.state.username).reverse()[0]) {
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
            <CircularProgress sx={{margin: "auto"}}></CircularProgress>
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
    backgroundColor: blue[300], justifyContent: "space-between", alignItems: "center", display: "flex", height: "100%", width: "100%" , padding: "4px",
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


