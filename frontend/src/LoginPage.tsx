import {Box, Button, TextField} from "@mui/material";
import {AccountCircle} from "@mui/icons-material";
import {styled} from "@mui/material/styles";
import React, {FormEvent, useState} from "react";
import axios from "axios";

const FormContainer = styled('form')({
    display: 'flex',
    flexDirection: 'column',
    gap: '1rem',
    // maxWidth: '800px',
    // margin: '0 auto',
});

export default function LoginPage() {

    const [username, setUsername] = useState<string>('')
    const [password, setPassword] = useState<string>('')

    function onSubmit(event: FormEvent<HTMLFormElement>) {
        event.preventDefault()

        axios.post("/api/user/login", undefined, {auth: {username, password}})
            .then(response => {
                console.log(response.data)
            })
    }

    return (
        <FormContainer className="form-container" onSubmit={onSubmit} sx={{maxWidth: 400, mx: "auto"}}>
            {/*<Box sx={{display: 'flex', alignItems: 'flex-end', mx: "auto"}}>*/}
            {/*<AccountCircle sx={{color: 'snow', mr: 0, my: 2}}/>*/}
            <TextField id="input-with-sx"
                       label="Username"
                       variant="filled"
                       value={username}
                       InputProps={{sx: {color: "deepskyblue", fontWeight: "bold"}}}
                       InputLabelProps={{sx: {color: "Snow"}}}
                       onChange={(event) => setUsername(event.target.value)}
            />
                {/*</Box>*/}

            <TextField
                label="Password"
                variant="filled"
                value={password}
                onChange={(event) => setPassword(event.target.value)}
                InputProps={{sx: {color: "deepskyblue", fontWeight: "bold"}, type: "password"}}
                InputLabelProps={{sx: {color: "Snow"}}}
            />

            <Button variant="contained"
                    type="submit"
                    sx={{
                        bgcolor: "black",
                        color: "green",
                        fontWeight: "bold",
                        minWidth: "100px",
                        maxWidth: "200px",
                        mx: "auto",
                        "&:hover": {
                            color: "snow",
                            bgcolor: "#119D13"
                        },
                    }}>
                Login
            </Button>
        </FormContainer>
    )
}