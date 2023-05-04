import {Alert, Button, TextField} from "@mui/material";
import {styled} from "@mui/material/styles";
import React, {FormEvent, useState} from "react";
import {useNavigate} from "react-router-dom";
import useUser from "../customHooks/useUser";

const FormContainer = styled('form')({
    display: 'flex',
    flexDirection: 'column',
    gap: '1rem',
});

type Props = {
    onLogin: (username: string, password: string) => Promise<boolean>
}

export const LoginPage = (props: Props) => {

    const [username, setUsername] = useState<string>('')
    const [password, setPassword] = useState<string>('')
    const {error, setError} = useUser();
    const  navigate = useNavigate()

    function onSubmit(event: FormEvent<HTMLFormElement>) {
        event.preventDefault();
        props.onLogin(username, password)
            .then((s) => {
                if (s) {
                    navigate("/games");

                } else {
                    setError(true);
                    console.log("invalid")
                }
            })
    }

    return (
        <FormContainer className="form-container" onSubmit={onSubmit} sx={{maxWidth: 400, mx: "auto"}}>
            <TextField id="input-with-sx"
                       label="Username (enter test as dummy user)"
                       variant="filled"
                       value={username}
                       InputProps={{sx: {color: "deepskyblue", fontWeight: "bold"}}}
                       InputLabelProps={{sx: {color: "Snow"}}}
                       onChange={(event) => setUsername(event.target.value)}
            />

            <TextField
                label="Password (enter test as dummy password)"
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
            {error &&
                <Alert severity="error" className="no-game-found">
                    <h3>Passwort oder Username ungültig!</h3>
                </Alert>
            }
        </FormContainer>

    )
}