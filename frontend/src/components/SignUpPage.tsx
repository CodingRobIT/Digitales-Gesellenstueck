import {Button, TextField} from "@mui/material";
import React, {ChangeEvent, FormEvent, useState} from "react";
import {useNavigate} from "react-router-dom";
import {UserModel} from "../model/User";
import {styled} from "@mui/material/styles";

type createUserProps = {
    createUser: (user: UserModel) => Promise<boolean>;
}

const FormContainer = styled('form')({
    display: 'flex',
    flexDirection: 'column',
    gap: '1rem',
});

export const SignUpPage = (props: createUserProps) => {

    const initial: UserModel = {
        username: "",
        password: "",
        confirmPassword: "",
    }
    const [user, setUser] = useState<UserModel>(initial);
    const [passwordsMatch] = useState(true);
    const navigate = useNavigate();

    function onChange(event: ChangeEvent<HTMLInputElement>) {
        const targetName: string = event.target.name;
        const value: string = event.target.value;
        setUser({
            ...user,
            [targetName]: value
        })
    }

    function onSubmit(event: FormEvent<HTMLFormElement>) {
        if (user.username && user.password && user.password === user.confirmPassword) {
            event.preventDefault();
            props.createUser(user).then((success) => {
                if (success) {
                    setUser(initial);
                    navigate('/login');
                } else {
                    console.log("error adding new User")
                }
            })
        }
    }

    return (

        <FormContainer className="form-container" onSubmit={onSubmit} sx={{maxWidth: 400, mx: "auto"}}>
            <TextField id="input-with-sx"
                       required
                       label="Username"
                       variant="filled"
                       name="username"
                       value={user.username}
                       InputProps={{sx: {color: "deepskyblue", fontWeight: "bold"}}}
                       InputLabelProps={{sx: {color: "Snow"}}}
                       onChange={onChange}

            />
            <TextField
                required
                variant="filled"
                name="password"
                type="password"
                label="Password"
                value={user.password}
                InputProps={{sx: {color: "deepskyblue", fontWeight: "bold"}}}
                InputLabelProps={{sx: {color: "Snow"}}}
                onChange={onChange}
            />
            <TextField
                required
                variant="filled"
                name="confirmPassword"
                type="password"
                label="Confirm Password"
                value={user.confirmPassword}
                onChange={onChange}
                error={!passwordsMatch}
                helperText={!passwordsMatch && "Passwords don't match"}
                InputProps={{sx: {color: "deepskyblue", fontWeight: "bold"}}}
                InputLabelProps={{sx: {color: "Snow"}}}
            />
            <Button variant="contained"
                    type="submit"
                    sx={{
                        bgcolor: "deepskyblue",
                        color: "black",
                        fontWeight: "bold",
                        minWidth: "100px",
                        maxWidth: "200px",
                        mx: "auto",
                        "&:hover": {
                            color: "green",
                            bgcolor: "black"
                        },
                    }}>
                Anmelden
            </Button>
            <Button variant="contained"
                    sx={{
                        bgcolor: "black",
                        color: "red",
                        fontWeight: "bold",
                        minWidth: "100px",
                        maxWidth: "200px",
                        mx: "auto",
                        "&:hover": {
                            color: "snow",
                            bgcolor: "#9D1911"
                        },
                    }}
                    size="small"
                    onClick={() => navigate(`/login`)}
            >
                Abbrechen
            </Button>
        </FormContainer>
    );
}