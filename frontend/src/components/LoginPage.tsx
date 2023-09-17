import {Button, TextField} from "@mui/material";
import {styled} from "@mui/material/styles";
import React, {FormEvent, useState} from "react";
import {useNavigate} from "react-router-dom";
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';

const FormContainer = styled('form')({
    display: 'flex',
    flexDirection: 'column',
    gap: '1rem',
});

type Props = {
    onLogin: (username: string, password: string) => Promise<void>
}


export const LoginPage = (props: Props) => {

    const [username, setUsername] = useState<string>('')
    const [password, setPassword] = useState<string>('')

    const  navigate = useNavigate()

    function onSubmit(event: FormEvent<HTMLFormElement>) {
        event.preventDefault();

        props.onLogin(username, password)
            .then(() => {navigate("/games")})
            .catch((error) =>{
                console.error("Error occurred:", error)
            })
    }

    return (
        <FormContainer className="form-container" onSubmit={onSubmit} sx={{maxWidth: 400, mx: "auto"}}>
            <TextField id="input-with-sx"
                       label="Username"
                       variant="filled"
                       value={username}
                       InputProps={{sx: {color: "deepskyblue", fontWeight: "bold"}}}
                       InputLabelProps={{sx: {color: "Snow"}}}
                       onChange={(event) => setUsername(event.target.value)}
            />

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
                            color: "black",
                            bgcolor: "deepskyblue"
                        },
                    }}>
                Login
            </Button>
            <Button
                sx={{
                    bgcolor: "black",
                    color: "deepskyblue",
                    fontWeight: "bold",
                    minWidth: "100px",
                    maxWidth: "200px",
                    mx: "auto",
                    "&:hover": {
                        color: "black", bgcolor: "deepskyblue"
                    },
                }}
                size="small"
                onClick={() => navigate(`/signup`)}
            >
                Anmelden
            </Button>
            <Paper elevation={7} sx={{
                bgcolor: "darkgrey"}}>
                <Typography variant="h6">Willkommen auf meiner Website.</Typography>
                <Typography>
                    Damit Sie sich nicht erst einloggen müssen, können Sie sich hier anmelden,
                </Typography>
                <Typography>Username: test</Typography>
                <Typography>und Passwort: test</Typography>
                <Typography>einloggen, um zu sehen, wie die Seite aufgebaut ist.</Typography>
            </Paper>
        </FormContainer>

    )
}