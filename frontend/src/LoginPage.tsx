import {Box, TextField} from "@mui/material";
import {AccountCircle} from "@mui/icons-material";
import {styled} from "@mui/material/styles";
import {FormEvent, useState} from "react";
import axios from "axios";

const FormContainer = styled('form')({
    display: 'flex',
    flexDirection: 'column',
    gap: '1rem',
    maxWidth: '400px',
    margin: '0 auto',
});
export default function LoginPage() {

    const [username, setUsername] = useState<string>('')
    const [password, setPassword] = useState<string>('')

    function onSubmit(event: FormEvent<HTMLFormElement>){
        event.preventDefault()

        axios.post("/api/user/login", undefined, {auth: {username, password}})
            .then(response => {
                console.log(response.data)
            })
    }

    return (

        <form onSubmit={onSubmit}>
            <input value={username} placeholder='username' type='text' onChange={e => setUsername(e.target.value)}/>
            <input value={password} placeholder='password' type='password' onChange={e => setPassword(e.target.value)}/>
            <button type='submit'>Login</button>
        </form>

        // <FormContainer className="form-container" onSubmit={onsubmit} sx={{maxWidth: 600, mx: "auto"}}>
        //     <Box sx={{display: 'flex', alignItems: 'flex-end'}}>
        //         <AccountCircle sx={{color: 'action.active', mr: 1, my: 0.5}}/>
        //         <TextField id="input-with-sx"
        //                    label="User Name"
        //                    variant="filled"
        //                    InputProps={{sx: {color: "deepskyblue", fontWeight: "bold"}}}
        //                    InputLabelProps={{sx: {color: "Snow"}}}
        //                    onSubmit={}
        //         />
        //     </Box>
        // </FormContainer>
    )
}