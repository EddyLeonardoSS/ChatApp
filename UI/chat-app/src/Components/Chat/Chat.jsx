import { Avatar, Box, Container, Divider, Grid, List, ListItem, ListItemAvatar, ListItemText, Stack, Typography } from "@mui/material";
import { useEffect } from "react";
import { useRef, useState } from "react";

export const Chat = ({messages}) =>{
    const [chatMessages, setMessages] = useState([])

    useEffect(() => {
    })
    return (
        <>
            
        </>
    )

}
const stackContainer = {
    height: "5em",
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