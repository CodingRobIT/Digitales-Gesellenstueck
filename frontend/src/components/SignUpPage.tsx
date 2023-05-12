import {Button,TextField} from "@mui/material";
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
        username: "", password: ""
    }
    const [user, setUser] = useState<UserModel>(initial);
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
        if (user.username && user.password) {
            event.preventDefault();
            props.createUser(user).then((s) => {
                if (s) {
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
                    <TextField
                        name="username"
                        type="text"
                        required
                        label="Username"
                        value={user.username}
                        onChange={onChange}
                        placeholder="UserName"
                        style={{marginBottom: '10px'}}
                    />
                    <TextField
                        name="password"
                        type="password"
                        required
                        label="Password"
                        value={user.password}
                        onChange={onChange}
                        placeholder="Password"
                        style={{marginBottom: '10px'}}
                    />
                    <Button variant="contained" type="submit" size="small">
                        Sign Up
                    </Button>
        </FormContainer>
    );

}