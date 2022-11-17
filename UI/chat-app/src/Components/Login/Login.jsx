import { Button, FormControl, FormGroup, FormLabel, Grid, Input, Paper, TextField, Typography } from "@mui/material"
import { Box } from "@mui/system"
import axios from "axios"
import { useState } from "react"


export const Login = () =>{
    
    const [username, setUserName] = useState("")
    const [password, setPassword] = useState("")

    let formData = new FormData();
    const config = {     
        headers: { 
            "Content-Type": "multipart/form-data",
            "Access-Control-Allow-Origin" : "*"
        }
    }
    const handleLogin = () =>{
        formData.append("username", username)
        formData.append("password", password)
        axios.post(`http://localhost:8080/login`, formData, config )
        .then(res=> console.log(res))
    } 

    return(
        <>
        <Paper elevation={5} sx={{width: "30%", margin: "auto", marginTop: "20%"}}>
            <Grid container direction="column" spacing={3} alignItems="center">
                
                    
                        <Grid item>
                            <TextField variant="standard" label="Username" value={username} onChange={e => setUserName(e.target.value)}></TextField>
                        </Grid>
                        <Grid item>
                            <TextField variant="standard" label="Password" value={password} onChange={e => setPassword(e.target.value)}></TextField>
                        </Grid>
                            
                            
                        <Grid item>
                            <Button sx={{paddingTop: 3}} onClick={() => {
                                if(username == "" || password == ""){
                                    
                                }
                                else {
                                    handleLogin()
                                }
                                
                                }
                                
                            }>Login</Button>
                        </Grid>
                        
                        
                    
                     </Grid>
                </Paper>
                    
                

           

        </>
    )
}