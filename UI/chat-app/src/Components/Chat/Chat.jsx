import { Avatar, Box, Container, Divider, Grid, List, ListItem, ListItemAvatar, ListItemText, Stack, Typography } from "@mui/material";
import { useRef } from "react";

export const Chat = () =>{

    let ref = []
    return (
        <>
            <Stack spacing={3} justifyContent="flex-end" sx={chatStack} >
                        {
                            
                            // Mapping all the messages for clicked group chat
                            ref.map(message => {

                                
                                return (
                                    <>
                                    
                                        {
                                            
                                            message.user.id == 1 ? 
                                            
                                                <Box sx={[chatContainer, { textAlign: "right"}]} key={message.id}>
                                                    <Typography sx={bubbleUser}>{message.messageBody}</Typography>
                                                    
                                                </Box>
                                                
                                                :
                                                <Box sx={[chatContainer, { textAlign: "left"}]} key={message.id}>
                                                    <Typography sx={chatBubbleRecp}>{message.messageBody}</Typography>
                                                </Box>
                                        }
                                    </>
                                )
                            })
                        }
                    </Stack>
        </>
    )

}
const stackContainer = {
    height: "5em",
    width: "100%",

}
const chatStack = {
    margin: "auto",
    height: "100%",
    width: "100%",
}
const chatContainer = {
    paddingLeft: '1em',
    paddingRight: '1em',
    position: "relative"
}
const chatBubbleRecp = {
    padding: '0.8em',
    backgroundColor: "#2fa8f8",
    borderRadius: '1em',
    color: 'white',
    display: 'inline',
    '&:before': {
        content: '""',
        position: "absolute",
        right: "44.3em",
        bottom: "6.6em",
        zIndex: "-1",
        height: "20px",
        width: "15px",
        background: "linear-gradient(to bottom, #2fa8f8 0%, #2fa8f8 100%)",
        backgroundAttachment: "fixed",
        borderBottomRightRadius: "10px",
    },
    '&:after': {
        content: '""',
        position: "absolute",
        right: "44.8em",
        bottom: "6.6em",
        zIndex: "-1",
        height: "20px",
        width: "10px",
        background:"white",
        borderBottomRightRadius: "10px",
    }
}

const bubbleUser = {
    padding: "0.8em",
    backgroundColor: "#2fa8f8",
    borderRadius: "1em",
    color: "white",
    display: "inline",
    '&:before': {
        content: '""',
        position: "absolute",
        right: "0.4em",
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
        right: "0.4em",
        bottom: "0em",
        zIndex: "-1",
        height: "20px",
        width: "10px",
        background: "white",
        borderBottomLeftRadius: "10px",
    }
}