import {Button, TextField} from "@mui/material";
import {styled} from "@mui/material/styles";
import React, {FormEvent, useState} from "react";
import {useNavigate} from "react-router-dom";

const FormContainer = styled('form')({
    display: 'flex',
    flexDirection: 'column',
    gap: '1rem',
});

type Props = {
    onLogin: (username: string, password: string) => Promise<void>
}

export default function LoginPage(props: Props) {

    const [username, setUsername] = useState<string>('')
    const [password, setPassword] = useState<string>('')

    const  navigate = useNavigate()

    function onSubmit(event: FormEvent<HTMLFormElement>) {
        event.preventDefault()

        props.onLogin(username, password)
            .then(() => {navigate("/games")})
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
                            color: "snow",
                            bgcolor: "#119D13"
                        },
                    }}>
                Login
            </Button>
        </FormContainer>

    )
}