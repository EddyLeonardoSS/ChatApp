import {Grid} from "@mui/material";
import axios from 'axios';
import { useState, useEffect} from "react";


export const Layout = () => {

    const [messages, setMessages] = useState([])

    

    const getMessages = async () => {
        axios.get("http://localhost:8080/messages" )
        .then(res => setMessages(res.data))
        .catch(err => console.log(err));
    };

    useEffect(() =>{
        getMessages();
    }, [])
    return (
        <>
           
            <Grid>
            {messages.map(x => <p>{x.messageBody}</p>)}
                
            </Grid>
        </>
    )

}