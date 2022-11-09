import { Container, Divider, Grid, Stack, Typography } from "@mui/material";
import axios from 'axios';
import { useState, useEffect } from "react";


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
                    <Stack spacing={0.2} divider={<Divider />} sx={stack} >
                        {
                            // Mapping all the group chat names for current user (user is currently hard-coded by email variable)
                            groups.map(group => {
                                return (
                                    <Container sx={stackContainer} onClick={() => displayMessages(group.groupChat.id)} key={group.groupChat.id}>
                                        <Typography>{group.groupChat.groupName}</Typography>
                                    </Container>
                                )
                            })
                        }
                    </Stack>
                </Grid>

                <Grid item xs={9} sx={chatDiv}>
                    <Stack spacing={0.2} justifyContent="flex-end" sx={stack} >
                        {
                            // Mapping all the messages for clicked group chat
                            messages.map(message => {
                                return (
                                    <>
                                        {
                                            message.user.id == 1 ?
                                                <Container sx={[{ textAlign: "right" }]} key={message.id}>
                                                    <Typography>{message.messageBody}</Typography>
                                                </Container>
                                                :
                                                <Container sx={[{ textAlign: "left" }]} key={message.id}>
                                                    <Typography>{message.messageBody}</Typography>
                                                </Container>
                                        }
                                    </>
                                )
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
    padding: "0px",
    height: "100%",
    width: "100%",
}
const chatDiv = {
    border: "solid black 2px",
    height: "100%",
    width: "100%",
}
const stackContainer = {
    height: "5em",
    width: "100%",

}
const stack = {
    margin: "auto",
    height: "100%",
    width: "100%",
}
const mainContainer = {
    padding: "2em",
    position: "fixed",
    height: "100%",
    width: "100%"
}