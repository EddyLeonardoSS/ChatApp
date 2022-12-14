import { Button, Grid, Paper, TextField } from "@mui/material"
import axios from "axios"
import { useState } from "react"
import { useNavigate } from "react-router-dom"


export const Login = () => {

    const [username, setUserName] = useState("")
    const [password, setPassword] = useState("")
    const navigate = useNavigate();
    let formData = new FormData();
    
    const url = "http://localhost:8080"
    const config = {

        headers: {

        }
    }
    const handleLogin = () => {
        formData.append("username", username)
        formData.append("password", password)
        axios.post(`${url}/login`, formData, config)
            .then(res =>
                navigate('/', { state: { username: username, loggedIn: true } }))
            .catch(err => console.log(err))
    }

    return (
        <>
            <Paper elevation={5} sx={{ width: "30%", margin: "auto", marginTop: "20%" }}>
                <Grid container direction="column" spacing={3} alignItems="center">

                    <Grid item>
                        <TextField variant="standard" label="Username" value={username} onChange={e => setUserName(e.target.value)}></TextField>
                    </Grid>

                    <Grid item>
                        <TextField variant="standard" label="Password" type="password" value={password} onChange={e => setPassword(e.target.value)}></TextField>
                    </Grid>

                    <Grid item>
                        <Button sx={{ paddingTop: 3 }} onClick={() => {
                            if (username == "" || password == "") { }

                            else { handleLogin() }
                        }}>Login</Button>
                    </Grid>
                </Grid>
            </Paper>
        </>
    )
}